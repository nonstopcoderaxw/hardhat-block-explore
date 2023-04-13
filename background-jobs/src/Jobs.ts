import { JsonRpcProvider, JsonRpcSigner, TransactionReceipt as Receipt, TransactionResponse, Block} from "ethers";
import { Address } from "./Address";
import { PrismaClientServices } from "./PrismaClientServices";
import { HardhatNodeServices, EnhancedBlock } from "./HardhatNodeServices";
import { Account, TransactionReceipt } from '@prisma/client';

 
// Summary:
// Import: hardhat raw data into db
// Transform: transform db data to UI friendly(aka. graphql)
export class ImportJob {
	public prismaClientServices: PrismaClientServices;
	public hardhatNodeServices: HardhatNodeServices;
	
	constructor(hardhatNodeServices: HardhatNodeServices, prismaClientServices: PrismaClientServices) {
		this.hardhatNodeServices = hardhatNodeServices;
		this.prismaClientServices = prismaClientServices;
	}

	getAddresses(signers: JsonRpcSigner[]): Address[] {
		const addresses: Address[] = [];
		for (var i = 0; i < signers.length; i++) {
			addresses.push(new Address(signers[i].address));
		}

		return addresses; 
	}
 
	async upsertAccounts(addresses: Address[], balances: bigint[], isContracts: boolean[]): Promise<void> {
		
		try {
			const accounts: Account[] = await this.prismaClientServices.prisma.account.findMany({});
			const accountsToCreate: Address[] = [];
			const balancesToCreate: string[] = [];
			const accountsToUpdate: Address[] = [];
			const balancesToUpdate: string[] = [];

			if (accounts.length == 0) {
				addresses.map((item) => {
					accountsToCreate.push(item);
				})
				balances.map((item) => {
					balancesToCreate.push(item.toString());
				})
			} 

			if (accounts.length > 0) {
				// find out creates
				addresses.map((a, i) => {
					let isExist: boolean = false;
					accounts.map((b) => {
						if ( a.equal(new Address(b.address)) ) {
							isExist = true;
						} 
					})

					if (!isExist) {
						accountsToCreate.push(a);
						balancesToCreate.push(balances[i].toString());
					}
				})

				// find out updates
				addresses.map((a, i) => {
					accounts.map((b) => {
						if ( a.equal(new Address(b.address)) && balances[i] != BigInt(b.balance) ) {
							accountsToUpdate.push(a);
							balancesToUpdate.push(balances[i].toString());
						}
					})
				})
			}
			
			// exec create
			if (accountsToCreate.length > 0) {
				await this.prismaClientServices.create.accounts(accountsToCreate, balancesToCreate, isContracts, false);
			}

			// exec update
			if (accountsToUpdate.length > 0) {
				accountsToUpdate.map(async (item, i) => {
					await this.prismaClientServices.update.account(item, balancesToUpdate[i]);
				})
			}
		} catch (e: any) {
			throw (e);
		}
	}

	async importJobExec(bn: bigint): Promise<void> {
		try {	

			// upsert accounts		
			const addresses: Address[] = this.getAddresses(
				await this.hardhatNodeServices.signers
			);

			await this.upsertAccounts(
				addresses,
				await this.hardhatNodeServices.getBalances(addresses),
				addresses.map(() => {
					return false;
				})
			)

			// create block, with transaction, with receipt, with log
			const enhancedBlock: EnhancedBlock = await this.hardhatNodeServices.getEnhancedBlock(bn);
			const data = {
				number: enhancedBlock.block.number,
				baseFeePerGas: BigInt(enhancedBlock.block.baseFeePerGas as bigint),
			  	difficulty: BigInt(enhancedBlock.block.difficulty),
			  	extraData: enhancedBlock.block.extraData,
			  	gasLimit: BigInt(enhancedBlock.block.gasLimit),
			  	gasUsed: BigInt(enhancedBlock.block.gasUsed),
			  	hash: enhancedBlock.block.hash as string,
			  	miner: enhancedBlock.block.miner,
			  	nonce: enhancedBlock.block.nonce,
			  	parentHash: enhancedBlock.block.parentHash,
			  	timestamp: enhancedBlock.block.timestamp,
				transactions: {
					create: 
						enhancedBlock.transactions.map((item, i) => {
							return {
							  	chainId: BigInt(item.chainId),
							 	data: item.data,
							  	from: item.from,
							  	gasLimit: BigInt(item.gasLimit),
							  	gasPrice: BigInt(item.gasPrice),
							  	maxFeePerGas: BigInt(item.maxFeePerGas as bigint),
							  	maxPriorityFeePerGas: BigInt(item.maxPriorityFeePerGas as bigint),
							  	nonce: item.nonce,
							  	to: item.to,
							  	type: item.type,
							  	value: BigInt(item.value),
							  	r: item.signature.r,
							  	s: item.signature.s,
							  	v: item.signature.v,
								transactionReceipt: {
									create: {
										hash: enhancedBlock.transactionReceipts[i].hash,
										blockHash: enhancedBlock.transactionReceipts[i].blockHash,
									  	blockNumber: enhancedBlock.transactionReceipts[i].blockNumber,
									  	contractAddress: enhancedBlock.transactionReceipts[i].contractAddress,
									  	cumulativeGasUsed: BigInt(enhancedBlock.transactionReceipts[i].cumulativeGasUsed),
									  	from: enhancedBlock.transactionReceipts[i].from,
									  	gasPrice: BigInt(enhancedBlock.transactionReceipts[i].gasPrice),
									  	gasUsed: BigInt(enhancedBlock.transactionReceipts[i].gasUsed),
									  	index: enhancedBlock.transactionReceipts[i].index,
									  	logsBloom: enhancedBlock.transactionReceipts[i].logsBloom,
									  	status: Number(enhancedBlock.transactionReceipts[i].status as number),
									  	to: enhancedBlock.transactionReceipts[i].to,
										logs: {
											create:
												enhancedBlock.transactionReceipts[i].logs.map((_item) => {
													return {														
														index: _item.index,
														transactionIndex: _item.transactionIndex,
														blockHash: _item.blockHash,
													  	blockNumber: _item.blockNumber,
													  	address: _item.address,
													  	data: _item.data,
													  	topics: _item.topics as string[]
													}
												})
										}
									}
								}
							}
						})
				}
			}

			await this.prismaClientServices.prisma.block.create({
				data: data
			})
			
		} catch(e: any) {
			throw (e);
		}
	}

	async transformJobExec(bn: bigint): Promise<void> {
		try { 
			await this.createContracts(bn) 
		} catch (e: any) {
			throw (e);
		}
	}

	async createContracts(bn: bigint): Promise<void> {
		try {
			// load raw tx, tx receipt form db
			const contractAddresses: { contractAddress: string | null }[] = await this.prismaClientServices.prisma.transactionReceipt.findMany({
				where: {
					AND: [
						{ 
							blockNumber: { equals: bn } 
						}, 
						{ 
							contractAddress: { not: null } 
						},
						{ 
							contractAddress: { not: undefined } 
						}
					]
				},
				select: {
					contractAddress: true
				}
			})
			
			// save contract addresses into Account
			const addresses: Address[] = [];
			contractAddresses.map((item) => {
				 addresses.push(new Address(item.contractAddress as string));
			})

			await this.upsertAccounts(
				addresses,
				await this.hardhatNodeServices.getBalances(addresses),
				addresses.map(() => {
					return true;
				})
			)
		} catch (e: any) {
			throw (e)
		}
	}
}






