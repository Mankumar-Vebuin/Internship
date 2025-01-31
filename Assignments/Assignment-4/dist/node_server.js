"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const port = 3000;
const fetchDataFromAPI = (apiUrl) => {
    return new Promise((resolve, reject) => {
        https_1.default
            .get(apiUrl, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve(data);
            });
        })
            .on("error", (err) => {
            reject(err.message);
        });
    });
};
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = "https://google.com";
    try {
        const apiResponse = yield fetchDataFromAPI(apiUrl);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(apiResponse);
    }
    catch (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end(`Error fetching API data: ${error}`);
    }
}));
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
