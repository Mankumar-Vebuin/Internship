"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// Sync
fs_1.default.writeFileSync("./text.txt", "Hello");
const result = fs_1.default.readFileSync("./text.txt", "utf-8");
console.log(result);
fs_1.default.appendFileSync("./text.txt", "This and that");
// Async
fs_1.default.writeFile("./text.txt", "Hello", (e) => { });
fs_1.default.readFile("./text.txt", "utf-8", (err, result) => {
    console.log(result);
});
