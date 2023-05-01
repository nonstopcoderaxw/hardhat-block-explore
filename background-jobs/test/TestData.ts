import { HardhatNodeServices, EnhancedBlock } from "../src/HardHatNodeServices";
import { JsonRpcSigner, TransactionReceipt, TransactionResponse } from "ethers";
import { File } from "./utils/utils";
import { PrismaClient } from '@prisma/client';


export class TestData {
	private prisma: PrismaClient;
	private hh: HardhatNodeServices;

	constructor(hardhatEndPoint: string, prisma: PrismaClient) {
		this.hh = new HardhatNodeServices(hardhatEndPoint);;
		this.prisma = prisma;
	}

	async generateMockSigners(): Promise<void> {
		File.write("test/data/signers.json", JSON.stringify(await this.hh.signers, null, 4));
	}

 	async generateMockEnhancedBlock(): Promise<void> {		
		var bytecode;
		bytecode = "608060405234801561001057600080fd5b506127106000819055507fcf78cf0d6f3d8371e1075c69c492ab4ec5d8cf23a1a239b6a51a1d00be7ca312306040516100499190610097565b60405180910390a16100b2565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061008182610056565b9050919050565b61009181610076565b82525050565b60006020820190506100ac6000830184610088565b92915050565b6101bf806100c16000396000f3fe6080604052600436106100295760003560e01c80633e58c58c1461002e57806367e919b61461004a575b600080fd5b61004860048036038101906100439190610128565b610075565b005b34801561005657600080fd5b5061005f6100bf565b60405161006c919061016e565b60405180910390f35b8073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156100bb573d6000803e3d6000fd5b5050565b60005481565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100f5826100ca565b9050919050565b610105816100ea565b811461011057600080fd5b50565b600081359050610122816100fc565b92915050565b60006020828403121561013e5761013d6100c5565b5b600061014c84828501610113565b91505092915050565b6000819050919050565b61016881610155565b82525050565b6000602082019050610183600083018461015f565b9291505056fea2646970667358221220165d43cad3af5cb99d4bf9da07cfbd57a33bf4f73d4062147f0cc38016b80e2164736f6c63430008120033";
		await this.deployContract(this.hh, bytecode);

		const result:EnhancedBlock  = await this.hh.getEnhancedBlock(await this.hh.blockNumber);

		File.write("test/data/enhancedBlock.json", JSON.stringify(result, null, 4));
	}

 	async cleardb(_showlog: boolean = true) {
		await this.prisma.account.deleteMany({});
		await this.prisma.block.deleteMany({});
	  	await this.prisma.transactionReceipt.deleteMany({});
	  	await this.prisma.transaction.deleteMany({});
	 	await this.prisma.log.deleteMany({});

	 	if (_showlog) console.log("DEV: db data cleared!");
	}

 	async deployContract(hh: HardhatNodeServices, bytecode: string): Promise<string> {
		const deployer: JsonRpcSigner = await this.hh.deployer;
		const address: string = await deployer.getAddress();
		const txCount: number = await this.hh.provider.getTransactionCount(address);
		const chainId: bigint = (await this.hh.provider.getNetwork()).chainId;

		// raw
		const rawTx0 = {
		  from: address,
		  data: "0x" + bytecode,
	      nonce: txCount,
	      value: "0x0",
	      maxPriorityFeePerGas: "0x0"
		}

		// estimate
		const estimatedGas: bigint = await this.hh.provider.estimateGas(rawTx0);
		const rawTx = {
			...rawTx0,
			maxFeePerGas: (await this.hh.provider.getFeeData()).maxFeePerGas,
			gasLimit: estimatedGas
		}

		// send
		const tx = await deployer.sendTransaction(rawTx);	
		return (await this.hh.provider.getTransactionReceipt(tx.hash) as TransactionReceipt).contractAddress as string;
	}
}





