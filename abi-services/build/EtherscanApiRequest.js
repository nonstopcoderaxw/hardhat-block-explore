"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherscanApiRequest = void 0;
const axios_1 = __importDefault(require("axios"));
class EtherscanApiRequest {
    constructor(apiKey) {
        this.ENDPOINT = "https://api.etherscan.io/api";
        this.apiKey = apiKey;
    }
    async findABI(address) {
        const url = `${this.ENDPOINT}?module=contract&action=getabi&address=${address.value}&apikey=${this.apiKey}`;
        try {
            const result = await axios_1.default.get(url);
            if (result.data.status == "0")
                throw (new Error("ETHERSCAN_ABI_NOT_FOUND"));
            return JSON.parse(result.data.result);
        }
        catch (e) {
            throw (e);
        }
    }
}
exports.EtherscanApiRequest = EtherscanApiRequest;
