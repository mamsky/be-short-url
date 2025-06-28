"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const url_model_1 = require("./model/url.model");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const port = 8080;
(0, db_1.connect)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Short Url create by paste');
});
app.post('/short-link', async (req, res) => {
    try {
        const url = req.body.url;
        const callBackUrl = (0, uuid_1.v4)().slice(0, 5);
        await url_model_1.ShortUrl.create({ url, callBackUrl });
        res.json({ shortUrl: `${process.env.BASE_URL}/${callBackUrl}` });
    }
    catch (error) {
        console.log(error);
    }
});
app.get('/:callBackUrl', async (req, res) => {
    try {
        const params = req.params.callBackUrl;
        const data = await url_model_1.ShortUrl.findOne({
            callBackUrl: params,
        });
        if (data) {
            res.redirect(data.url);
        }
        else {
            res.status(404).send('URL not found');
        }
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(port, () => {
    console.log(`running at http://localhost:${port}`);
});
