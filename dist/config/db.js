"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    const db = process.env.MONGODB_URL;
    try {
        await mongoose_1.default.connect(db);
        console.log('MongoDB Connected...');
    }
    catch (error) {
        console.log(error);
    }
};
exports.connect = connect;
