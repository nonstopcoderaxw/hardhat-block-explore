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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ABIServices_1 = require("./ABIServices");
const EtherscanApiRequest_1 = require("./EtherscanApiRequest");
const Address_1 = require("./Address");
const log_config_1 = require("./log.config");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Take a port 3000 for running server.
const port = 3010;
// use log instead
app.get('/findABI/:address/:cache', async (_req, _res) => {
    try {
        const address = _req.params.address;
        const cache = _req.params.cache;
        const abiServices = new ABIServices_1.ABIServices(new EtherscanApiRequest_1.EtherscanApiRequest(process.env.ETHERSCAN_API_KEY));
        const result = await abiServices.findABI(address, { cache: cache == "true" ? true : false });
        if (!result) {
            // logging:error
            log_config_1.backgroundJobLog.error(() => JSON.stringify({ endpoint: "/findABI", params: _req.params, errors: "ABI_Not_Found" }));
            _res.status(404);
            _res.end("ABI_Not_Found");
        }
        if (result) {
            _res.status(200);
            log_config_1.backgroundJobLog.info(() => JSON.stringify({ endpoint: "/findABI", params: _req.params }));
            _res.setHeader('Content-Type', 'application/json');
            _res.end(JSON.stringify(result));
        }
        // logging:info
    }
    catch (e) {
        // logging:error
        log_config_1.backgroundJobLog.error(() => JSON.stringify({ endpoint: "/findABI", params: _req.params, errors: e.toString() }));
        _res.status(404);
        _res.setHeader('Content-Type', 'text/json');
        _res.end(e.toString());
    }
});
app.post("/decodeLogs", async (_req, _res) => {
    try {
        const logs = _req.body.logs;
        const fromAddresses = _req.body.fromList.map((item) => {
            return new Address_1.Address(item);
        });
        const abiServices = new ABIServices_1.ABIServices(new EtherscanApiRequest_1.EtherscanApiRequest(process.env.ETHERSCAN_API_KEY));
        const decoodedLogs = await abiServices.decodeLogs(fromAddresses, logs);
        log_config_1.backgroundJobLog.info(() => JSON.stringify({ endpoint: "/decodeLogs", params: _req.body }));
        _res.status(200);
        _res.setHeader('Content-Type', 'application/json');
        if (decoodedLogs)
            _res.end(JSON.stringify(decoodedLogs));
        if (!decoodedLogs)
            _res.end(null);
    }
    catch (e) {
        log_config_1.backgroundJobLog.error(() => JSON.stringify({ endpoint: "/decodeLogs", params: _req.body, errors: e.toString() }));
        _res.status(404);
        _res.setHeader('Content-Type', 'text/json');
        _res.end("FAILED");
    }
});
app.post("/importABIs", async (_req, _res) => {
    try {
        const addresses = _req.body.addresses.map((item) => {
            return new Address_1.Address(item);
        });
        const names = _req.body.names;
        const abis = _req.body.abis;
        await ABIServices_1.ABIServices.importABIs(addresses, names, abis);
        log_config_1.backgroundJobLog.info(() => JSON.stringify({ endpoint: "/importABIs", params: _req.body }));
        _res.status(200);
        _res.end("success");
    }
    catch (e) {
        log_config_1.backgroundJobLog.error(() => JSON.stringify({ endpoint: "/importABIs", params: _req.params, errors: e.toString() }));
        _res.status(404);
        _res.end("FAILED");
    }
});
app.listen(port, () => {
    console.log(`The server is up at http://localhost:${port}/`);
});
