import { Contract, JsonRpcProvider, JsonRpcSigner } from "ethers";
import { Address } from "./Address";
import * as dotenv from 'dotenv';
dotenv.config();

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

    async send(data: string, value: string, from: string, to?: string): Promise<string> {
    	const provider: JsonRpcProvider = this.provider;
    	const signers: JsonRpcSigner[] = await provider.listAccounts();

    	var signerIndex: number = 0
    	for(let i = 0; i < signers.length; i++) {
    		if (new Address(signers[i].address).equal(new Address(from))) {
    			signerIndex = i;
    			break;
    		} 
    	}

    	const signer: JsonRpcSigner = signers[signerIndex];

		const txCount: number = await provider.getTransactionCount(signer.address);
		const chainId: bigint = (await provider.getNetwork()).chainId;

		// raw
		const rawTx0 = {
		  from: signer.address,
		  to: to ? (new Address(to)).value : undefined,
		  data: data,
	      nonce: txCount,
	      value: value,
	      maxPriorityFeePerGas: "0x0"
		}

		// estimate
		const estimatedGas: bigint = await provider.estimateGas(rawTx0);
		const rawTx = {
			...rawTx0,
			maxFeePerGas: (await provider.getFeeData()).maxFeePerGas,
			gasLimit: estimatedGas
		}

		const tx = await signer.sendTransaction(rawTx);	
		return tx.hash;
	}
 
	async read(contractAddress: string, funcName: string, abi: string, params: string, blockTag: number | undefined, address: string): Promise<string> {
		const provider: JsonRpcProvider = this.provider;
    	const signers: JsonRpcSigner[] = await provider.listAccounts();
    	
    	var signerIndex: number = 0
    	for(let i = 0; i < signers.length; i++) {
    		if (new Address(signers[i].address).equal(new Address(address))) {
    			signerIndex = i;
    			break;
    		} 
    	}

    	const signer: JsonRpcSigner = signers[signerIndex];
		const contract = new Contract(contractAddress, JSON.parse(abi), signer);
		var resp;
		try {
			if (params.length > 0) {
				resp = await contract[funcName].staticCall(
					...JSON.parse(params),
					{ blockTag: blockTag }
				);
			}
			if (params === "") {
				resp = await contract[funcName].staticCall(
					{ blockTag: blockTag }
				);
			}
		} catch(e: any) {
			throw (e);
		}
		
		return resp.toString();
	}
}
