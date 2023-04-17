"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const fs_1 = __importDefault(require("fs"));
class File {
    static write(name, content) {
        try {
            fs_1.default.writeFileSync(name, content);
        }
        catch (e) {
            throw (e);
        }
    }
    static read(name) {
        try {
            return fs_1.default.readFileSync(name).toString();
        }
        catch (e) {
            throw (e);
        }
    }
    static readAsJson(name) {
        return JSON.parse(this.read(name));
    }
}
exports.File = File;
