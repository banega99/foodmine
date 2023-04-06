"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var express_1 = __importDefault(require("express"));
// import cors from "cors"
// import { sample_foods, sample_tags, sample_users } from "./data"
var food_router_1 = __importDefault(require("./routers/food.router"));
var user_router_1 = __importDefault(require("./routers/user.router"));
var order_router_1 = __importDefault(require("./routers/order.router"));
var database_config_1 = require("./configs/database.config");
(0, database_config_1.dbConnect)();
var cors = require("cors");
var corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(cors(corsOptions));
app.use("/api/foods", food_router_1["default"]);
app.use("/api/users", user_router_1["default"]);
app.use("/api/orders", order_router_1["default"]);
var port = 5000;
app.listen(port, function () {
    console.log("Website served in http://localhost:" + port);
});
//MongoDB Atlas password: 936OSdMqD1dov1ld
