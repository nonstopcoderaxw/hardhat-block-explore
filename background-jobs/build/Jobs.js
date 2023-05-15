"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportJob = void 0;
const Address_1 = require("./Address");
// Summary:
// Import: hardhat raw data into db
// Transform: transform db data to UI friendly(aka. graphql)
class ImportJob {
    constructor(hardhatNodeServices, prismaClientServices) {
        this.hardhatNodeServices = hardhatNodeServices;
        this.prismaClientServices = prismaClientServices;
    }
    getAddresses(signers) {
        const addresses = [];
        for (var i = 0; i < signers.length; i++) {
            addresses.push(new Address_1.Address(signers[i].address));
        }
        return addresses;
    }
    async upsertAccounts(addresses, balances, isContracts) {
        try {
            const accounts = await this.prismaClientServices.prisma.account.findMany({});
            const accountsToCreate = [];
            const balancesToCreate = [];
            const accountsToUpdate = [];
            const balancesToUpdate = [];
            if (accounts.length == 0) {
                addresses.map((item) => {
                    accountsToCreate.push(item);
                });
                balances.map((item) => {
                    balancesToCreate.push(item.toString());
                });
            }
            if (accounts.length > 0) {
                // find out creates
                addresses.map((a, i) => {
                    let isExist = false;
                    accounts.map((b) => {
                        if (a.equal(new Address_1.Address(b.address))) {
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        accountsToCreate.push(a);
                        balancesToCreate.push(balances[i].toString());
                    }
                });
                // find out updates
                addresses.map((a, i) => {
                    accounts.map((b) => {
                        if (a.equal(new Address_1.Address(b.address)) && balances[i] != BigInt(b.balance)) {
                            accountsToUpdate.push(a);
                            balancesToUpdate.push(balances[i].toString());
                        }
                    });
                });
            }
            // exec create
            if (accountsToCreate.length > 0) {
                await this.prismaClientServices.create.accounts(accountsToCreate, balancesToCreate, isContracts, false);
            }
            // exec update
            if (accountsToUpdate.length > 0) {
                accountsToUpdate.map(async (item, i) => {
                    await this.prismaClientServices.update.account(item, balancesToUpdate[i]);
                });
            }
        }
        catch (e) {
            throw (e);
        }
    }
    async importJobExec(bn) {
        try {
            // upsert accounts		
            const addresses = this.getAddresses(await this.hardhatNodeServices.signers);
            await this.upsertAccounts(addresses, await this.hardhatNodeServices.getBalances(addresses), addresses.map(() => {
                return false;
            }));
            // create block, with transaction, with receipt, with log
            const enhancedBlock = await this.hardhatNodeServices.getEnhancedBlock(bn);
            const data = {
                number: BigInt(enhancedBlock.block.number.toString()),
                baseFeePerGas: enhancedBlock.block.baseFeePerGas.toString(),
                difficulty: enhancedBlock.block.difficulty.toString(),
                extraData: enhancedBlock.block.extraData,
                gasLimit: enhancedBlock.block.gasLimit.toString(),
                gasUsed: enhancedBlock.block.gasUsed.toString(),
                hash: enhancedBlock.block.hash,
                miner: enhancedBlock.block.miner,
                nonce: BigInt(enhancedBlock.block.nonce),
                parentHash: enhancedBlock.block.parentHash,
                timestamp: BigInt(enhancedBlock.block.timestamp.toString()),
                transactions: {
                    create: enhancedBlock.transactions.map((item, i) => {
                        return {
                            chainId: BigInt(item.chainId.toString()),
                            data: item.data,
                            from: item.from,
                            gasLimit: item.gasLimit.toString(),
                            gasPrice: item.gasPrice.toString(),
                            maxFeePerGas: item.maxFeePerGas.toString(),
                            maxPriorityFeePerGas: item.maxPriorityFeePerGas.toString(),
                            nonce: BigInt(item.nonce.toString()),
                            to: item.to,
                            type: BigInt(item.type.toString()),
                            value: item.value.toString(),
                            r: item.signature.r,
                            s: item.signature.s,
                            v: BigInt(item.signature.v.toString()),
                            transactionReceipt: {
                                create: {
                                    hash: enhancedBlock.transactionReceipts[i].hash,
                                    blockHash: enhancedBlock.transactionReceipts[i].blockHash,
                                    blockNumber: BigInt(enhancedBlock.transactionReceipts[i].blockNumber.toString()),
                                    contractAddress: enhancedBlock.transactionReceipts[i].contractAddress,
                                    cumulativeGasUsed: enhancedBlock.transactionReceipts[i].cumulativeGasUsed.toString(),
                                    from: enhancedBlock.transactionReceipts[i].from,
                                    gasPrice: enhancedBlock.transactionReceipts[i].gasPrice.toString(),
                                    gasUsed: enhancedBlock.transactionReceipts[i].gasUsed.toString(),
                                    index: BigInt(enhancedBlock.transactionReceipts[i].index.toString()),
                                    logsBloom: enhancedBlock.transactionReceipts[i].logsBloom,
                                    status: enhancedBlock.transactionReceipts[i].status.toString(),
                                    to: enhancedBlock.transactionReceipts[i].to,
                                    logs: {
                                        create: enhancedBlock.transactionReceipts[i].logs.map((_item) => {
                                            return {
                                                index: BigInt(_item.index.toString()),
                                                transactionIndex: _item.transactionIndex.toString(),
                                                blockHash: _item.blockHash,
                                                blockNumber: BigInt(_item.blockNumber.toString()),
                                                address: _item.address,
                                                data: _item.data,
                                                topics: _item.topics
                                            };
                                        })
                                    }
                                }
                            }
                        };
                    })
                }
            };
            await this.prismaClientServices.prisma.block.create({
                data: data
            });
        }
        catch (e) {
            throw (e);
        }
    }
    async transformJobExec(bn) {
        try {
            await this.createContracts(bn);
        }
        catch (e) {
            throw (e);
        }
    }
    // async decodeLogs(bn: bigint): Promise<void> {
    // 	// find out all the addresses in logs list
    // 	// call out
    // 	// update logs
    // 	try {
    // 		const logs: Log[] = await this.prismaClientServices.prisma.log.findMany({
    // 			where: {
    // 				blockNumber: bn
    // 			}
    // 		})
    // 		const fromListPayload: string[] = [];
    // 		const logsPayload: object[] = [];
    // 		logs.map((item: Log) => {
    // 			fromListPayload.push(item.address);
    // 			logsPayload.push({
    // 				address: item.address,
    // 				data: item.data,
    // 				topics: item.topics
    // 			});
    // 		})
    // 		const res: any = await axios.post(`${process.env.ABI_SERVICES_ENDPOINT}/decodeLogs`, {
    // 			fromList: fromListPayload, 
    // 			logs: logsPayload
    // 		}, {
    // 			headers: { 'Content-Type': 'application/json' }
    // 		})
    // 		if(res.status != "200") throw (new Error("DECODED_LOGS_REQUEST_FAILED"));
    // 		if(res.data) {
    // 			const prismaTxOps: Prisma.PrismaPromise<any>[] = [];
    // 			for(let i = 0; i < logs.length; i++) {
    // 				const item = logs[i];
    // 				if(!res.data[i]) continue;
    // 				prismaTxOps.push(
    // 					this.prismaClientServices.prisma.log.update({
    // 						where: {
    // 							transactionHash_index: {
    // 								transactionHash: item.transactionHash,
    // 								index: item.index
    // 							}
    // 						}, 
    // 						data: {
    // 							decodedLog: res.data[i]
    // 						}
    // 					})
    // 				)
    // 			}
    // 			await this.prismaClientServices.prisma.$transaction(prismaTxOps);
    // 		}
    // 	} catch (e: any) {
    // 		throw (e);
    // 	}
    // }
    async createContracts(bn) {
        try {
            // load raw tx, tx receipt form db
            const contractAddresses = await this.prismaClientServices.prisma.transactionReceipt.findMany({
                where: {
                    AND: [
                        { blockNumber: { equals: bn } },
                        { contractAddress: { not: null } },
                        { contractAddress: { not: undefined } }
                    ]
                },
                select: {
                    contractAddress: true
                }
            });
            // save contract addresses into Account
            const addresses = [];
            contractAddresses.map((item) => {
                addresses.push(new Address_1.Address(item.contractAddress));
            });
            // save contracts
            await this.upsertAccounts(addresses, await this.hardhatNodeServices.getBalances(addresses), addresses.map(() => {
                return true;
            }));
        }
        catch (e) {
            throw (e);
        }
    }
}
exports.ImportJob = ImportJob;
