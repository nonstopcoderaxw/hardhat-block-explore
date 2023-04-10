import type { JsonRpcSigner, BigNumberish } from "ethers";
import ethers, { JsonRpcProvider, TransactionReceipt, Log, TransactionResponse, Block } from "ethers";
import { Address } from "./Address";
import * as dotenv from 'dotenv';
dotenv.config();

export type EnhancedBlock = {
	block: Block,
	transactions: TransactionResponse[]
	transactionReceipts: TransactionReceipt[]
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
			throw (e.toString());
		}
    }

    get deployer(): Promise<JsonRpcSigner> {
    	return (async () => {
	      try {
	         const signers: JsonRpcSigner[] = await this.provider.listAccounts();
	         return signers[signers.length - 1];
	      } catch(e: any) {
	        throw (e.toString());
	      }
	    })();
    }

    get signers(): Promise<JsonRpcSigner[]> {
    	return (async () => {
	      try {
	         return await this.provider.listAccounts();
	      } catch(e: any) {
	        throw (e.toString());
	      }
	    })();
    }

    get blockNumber(): Promise<bigint> {
    	return (async () => {
	      try {
	         return BigInt(await this.provider.getBlockNumber());
	      } catch(e: any) {
	        throw (e.toString());
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
			throw (e.toString());
		}
	}

	async getEnhancedBlock(bn: bigint): Promise<EnhancedBlock> {

		try {
			const _block: Block | null  = await this.provider.getBlock(bn);
			if (!_block) throw ("Null Block");
			const block = _block as Block;
			const transactions: TransactionResponse[] = [];
			const transactionReceipts: TransactionReceipt[] = [];
			for(let i = 0; i < block.transactions.length; i++) {
				const tx: TransactionResponse | null = await this.provider.getTransaction(block.transactions[i]);
				if(!tx) throw ("Null Tx");
				const receipt: TransactionReceipt | null = await this.provider.getTransactionReceipt(tx.hash);
				if(!receipt) throw("Null Receipt");
				
				transactions.push(tx as TransactionResponse);
				transactionReceipts.push(receipt as TransactionReceipt);
			}

			return { block: block, transactions: transactions, transactionReceipts: transactionReceipts};
		} catch (e: any) {
			throw (e.toString());
		}
	}

	getFirstBlockNumber(): bigint {
		if (process.env.FORKING == "true" && !process.env.BLOCK_NUMBER) throw ("Block_Number_Not_Set");
		
		if(process.env.FORKING == "false") return BigInt(0);
		
		return BigInt(process.env.BLOCK_NUMBER as string) + BigInt(1);
	}
}
