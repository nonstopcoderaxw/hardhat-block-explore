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
    get deployer() {
        return (async () => {
            try {
                const signers = await this.provider.listAccounts();
                return signers[signers.length - 1];
            }
            catch (e) {
                throw (e);
            }
        })();
    }
    get signers() {
        return (async () => {
            try {
                return await this.provider.listAccounts();
            }
            catch (e) {
                throw (e);
            }
        })();
    }
    get blockNumber() {
        return (async () => {
            try {
                return BigInt(await this.provider.getBlockNumber());
            }
            catch (e) {
                throw (e);
            }
        })();
    }
    async getBalances(addresses) {
        const balances = [];
        try {
            for (let i = 0; i < addresses.length; i++) {
                const item = addresses[i];
                const b = await this.provider.getBalance(item.value);
                balances.push(BigInt(b.toString()));
            }
            return balances;
        }
        catch (e) {
            throw (e);
        }
    }
    async getEnhancedBlock(bn) {
        try {
            const _block = await this.provider.getBlock(bn);
            if (!_block)
                throw (new Error("Null Block"));
            const block = _block;
            const transactions = [];
            const transactionReceipts = [];
            for (let i = 0; i < block.transactions.length; i++) {
                const tx = await this.provider.getTransaction(block.transactions[i]);
                if (!tx)
                    throw (new Error("Null Tx"));
                const receipt = await this.provider.getTransactionReceipt(tx.hash);
                if (!receipt)
                    throw (new Error("Null Receipt"));
                transactions.push(tx);
                transactionReceipts.push(receipt);
            }
            return { block: block, transactions: transactions, transactionReceipts: transactionReceipts };
        }
        catch (e) {
            throw (e);
        }
    }
    static getFirstBlockNumber() {
        if (process.env.FORKING == "true" && !process.env.BLOCK_NUMBER)
            throw (new Error("Block_Number_Not_Set"));
        if (process.env.FORKING == "false")
            return BigInt(0);
        return BigInt(process.env.BLOCK_NUMBER) + BigInt(1);
    }
}
exports.HardhatNodeServices = HardhatNodeServices;
