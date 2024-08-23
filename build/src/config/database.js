"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTypes = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var sequelize_2 = require("sequelize");
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_2.DataTypes; } });
const logger = logger_1.default.logger;
let DATABASE = process.env.DB_NAME;
let USERNAME = process.env.DB_USER;
let PASSWORD = process.env.DB_PASSWORD;
let HOST = process.env.DB_HOST;
let PORT = parseInt(process.env.DB_PORT);
const sequelize = new sequelize_1.Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log // Enable logging
});
sequelize
    .authenticate()
    .then(() => {
    logger.info('Connected to the database.');
})
    .catch((error) => {
    logger.error('Could not connect to the database.', error);
});
sequelize.sync();
exports.default = sequelize;
