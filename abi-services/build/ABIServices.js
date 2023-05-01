"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABIServices = void 0;
const ioredis_1 = require("ioredis");
const abi_decoder_typescript_1 = __importDefault(require("abi-decoder-typescript"));
const ERC20_json_1 = __importDefault(require("./abis/ERC20.json"));
const ERC721_json_1 = __importDefault(require("./abis/ERC721.json"));
// preload abis - ERC20, ERC721
const abiDecoder = new abi_decoder_typescript_1.default();
abiDecoder.addABI(ERC20_json_1.default);
abiDecoder.addABI(ERC721_json_1.default);
class ABIServices {
    constructor(etherscanApiRequest) {
        this.etherscanApiRequest = etherscanApiRequest;
    }
    async findABI(address, options = { cache: true }) {
        // if cache = true, find it from redis, if redis says no, then find from etherscan, then save it into redis
        try {
            const redis = new ioredis_1.Redis();
            var abi;
            // find from cache
            if (options.cache) {
                // find from internal
                abi = JSON.parse((await redis.hget("abi:internal:abis", address)));
                if (abi) {
                    await redis.quit();
                    return { abi: abi, cache: true };
                }
                abi = JSON.parse((await redis.hget("abi:external", address)));
                if (abi) {
                    await redis.quit();
                    return { abi: abi, cache: true };
                }
            }
            // if cache = false, find it from etherscan, then save it into resdis
            if (!abi) {
                abi = await this.etherscanApiRequest.findABI(address);
                if (abi) {
                    // cache
                    await redis.hmset("abi:external", address, JSON.stringify(abi));
                    await redis.quit();
                    return { abi: abi, cache: false };
                }
            }
            return null;
        }
        catch (e) {
            throw (e);
        }
    }
    // function: decode log
    // return: null when no abi found for decoding
    // return: array for decoded logs
    async decodeLogs(fromAddresses, logs) {
        try {
            for (let i = 0; i < fromAddresses.length; i++) {
                let abiRes;
                try {
                    abiRes = await this.findABI(fromAddresses[i].value);
                }
                catch {
                    abiRes = null;
                }
                if (!abiRes)
                    continue;
                abiDecoder.addABI(JSON.parse(JSON.stringify(abiRes.abi)));
            }
            return abiDecoder.decodeLogs(logs);
        }
        catch (e) {
            throw (e);
        }
    }
    // function: import ABI from HH
    static async importABIs(addresses, names, abis) {
        try {
            const redis = new ioredis_1.Redis();
            for (let i = 0; i < addresses.length; i++) {
                const item = addresses[i];
                await redis.hmset("abi:internal:names", item.value, names[i]);
                await redis.hmset("abi:internal:abis", item.value, abis[i]);
            }
            await redis.quit();
        }
        catch (e) {
            throw (new Error(e));
        }
    }
    static async clearCache() {
        try {
            const redis = new ioredis_1.Redis();
            await this.clearRedisKeys(redis, "abi:external");
            await this.clearRedisKeys(redis, "abi:internal");
            await redis.quit();
        }
        catch (e) {
            throw (e);
        }
    }
    static async clearRedisKeys(redis, key) {
        try {
            const keys = Object.keys(await redis.hgetall(key));
            if (keys.length > 0)
                await redis.hdel(key, ...keys);
        }
        catch (e) {
            throw (e);
        }
    }
}
exports.ABIServices = ABIServices;
