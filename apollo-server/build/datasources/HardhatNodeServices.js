"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatNodeServices = void 0;
const ethers_1 = require("ethers");
const Address_1 = require("./Address");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class HardhatNodeServices {
    constructor(rpc_endpoint) {
        this.rpc_endpoint = rpc_endpoint;
    }
    get provider() {
        try {
            return new ethers_1.JsonRpcProvider(this.rpc_endpoint);
        }
        catch (e) {
            throw (e);
        }
    }
    async send(data, value, from, to) {
        const provider = this.provider;
        const signers = await provider.listAccounts();
        var signerIndex = 0;
        for (let i = 0; i < signers.length; i++) {
            if (new Address_1.Address(signers[i].address).equal(new Address_1.Address(from))) {
                signerIndex = i;
                break;
            }
        }
        const signer = signers[signerIndex];
        const txCount = await provider.getTransactionCount(signer.address);
        const chainId = (await provider.getNetwork()).chainId;
        // raw
        const rawTx0 = {
            from: signer.address,
            to: to ? (new Address_1.Address(to)).value : undefined,
            data: data,
            nonce: txCount,
            value: value,
            maxPriorityFeePerGas: "0x0"
        };
        // estimate
        const estimatedGas = await provider.estimateGas(rawTx0);
        const rawTx = {
            ...rawTx0,
            maxFeePerGas: (await provider.getFeeData()).maxFeePerGas,
            gasLimit: estimatedGas
        };
        const tx = await signer.sendTransaction(rawTx);
        return tx.hash;
    }
    async read(contractAddress, funcName, abi, params, blockTag, address) {
        const provider = this.provider;
        const signers = await provider.listAccounts();
        var signerIndex = 0;
        for (let i = 0; i < signers.length; i++) {
            if (new Address_1.Address(signers[i].address).equal(new Address_1.Address(address))) {
                signerIndex = i;
                break;
            }
        }
        const signer = signers[signerIndex];
        const contract = new ethers_1.Contract(contractAddress, JSON.parse(abi), signer);
        const resp = await contract[funcName].staticCall(...JSON.parse(params), { blockTag: blockTag });
        return resp.toString();
    }
}
exports.HardhatNodeServices = HardhatNodeServices;
// > let ABI = [
//     "function transfer(address to, uint amount)"
// ];
// > let iface = new ethers.utils.Interface(ABI);
// > iface.encodeFunctionData("transfer", [ "0x1234567890123456789012345678901234567890", parseEther("1.0") ])
// '0xa9059cbb00000000000000000000000012345678901234567890123456789012345678900000000000000000000000000000000000000000000000000de0b6b3a7640000'
