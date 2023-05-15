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
exports.ABIServices = void 0;
const datasource_rest_1 = require("@apollo/datasource-rest");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class ABIServices extends datasource_rest_1.RESTDataSource {
    constructor() {
        super();
        this.baseURL = `${process.env.ABI_SERVICE_ENDPOINT}`;
    }
    findABI(address, cache) {
        return this.get(`findABI/${address}/${cache}`);
    }
    importABIs(addresses, names, abis) {
        return this.post(`importABIs`, {
            body: {
                addresses: addresses,
                names: names,
                abis: abis
            }
        });
    }
    decodeLogs(fromList, logs) {
        return this.post(`decodeLogs`, {
            body: {
                fromList: fromList,
                logs: logs
            }
        });
    }
}
exports.ABIServices = ABIServices;
