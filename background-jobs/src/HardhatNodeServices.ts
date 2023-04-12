import type { JsonRpcSigner, BigNumberish } from "ethers";
import ethers, { JsonRpcProvider, TransactionReceipt as Receipt, Log, TransactionResponse, Block } from "ethers";
import { Address } from "./Address";
import * as dotenv from 'dotenv';
dotenv.config();

export type EnhancedBlock<B, TR, R> = {
	block: B,
	transactions: TR[]
	transactionReceipts: R[]
}

export class HardhatNodeServices {
	public readonly rpc_endpoint: string;

	constructor(rpc_endpoint: string) {
		this.rpc_endpoint = rpc_endpoint;
	}

	get provider(): JsonRpcProvider {
		try {
        	return new JsonRpcProvider(this.rpc_endpoint);
		} catch (e: any) {
			throw (e);
		}
    }

    get deployer(): Promise<JsonRpcSigner> {
    	return (async () => {
	      try {
	         const signers: JsonRpcSigner[] = await this.provider.listAccounts();
	         return signers[signers.length - 1];
	      } catch(e: any) {
	        throw (e);
	      }
	    })();
    }

    get signers(): Promise<JsonRpcSigner[]> {
    	return (async () => {
	      try {
	         return await this.provider.listAccounts();
	      } catch(e: any) {
	        throw (e);
	      }
	    })();
    }

    get blockNumber(): Promise<bigint> {
    	return (async () => {
	      try {
	         return BigInt(await this.provider.getBlockNumber());
	      } catch(e: any) {
	        throw (e);
	      }
	    })(); 
    }

	async getBalances(addresses: Address[]): Promise<bigint[]> {
		const balances: bigint[] = [];
		try {
			for(let i = 0; i < addresses.length; i++) {
				const item = addresses[i];
				const b: BigNumberish = await this.provider.getBalance(item.value);
				balances.push(BigInt(b.toString()));
			}
			return balances;
		} catch (e: any) {
			throw (e);
		}
	}

	async getEnhancedBlock(bn: bigint): Promise<EnhancedBlock<Block, TransactionResponse, Receipt>> {

		try {
			const _block: Block | null  = await this.provider.getBlock(bn);
			if (!_block) throw (new Error("Null Block"));
			const block = _block as Block;
			const transactions: TransactionResponse[] = [];
			const transactionReceipts: Receipt[] = [];
			for(let i = 0; i < block.transactions.length; i++) {
				const tx: TransactionResponse | null = await this.provider.getTransaction(block.transactions[i]);
				if(!tx) throw (new Error("Null Tx"));
				const receipt: Receipt | null = await this.provider.getTransactionReceipt(tx.hash);
				if(!receipt) throw(new Error("Null Receipt"));
				
				transactions.push(tx as TransactionResponse);
				transactionReceipts.push(receipt as Receipt);
			}

			return { block: block, transactions: transactions, transactionReceipts: transactionReceipts};
		} catch (e: any) {
			throw (e);
		}
	}

	getFirstBlockNumber(): bigint {
		if (process.env.FORKING == "true" && !process.env.BLOCK_NUMBER) throw (new Error("Block_Number_Not_Set"));
		
		if(process.env.FORKING == "false") return BigInt(0);
		
		return BigInt(process.env.BLOCK_NUMBER as string) + BigInt(1);
	}
}
