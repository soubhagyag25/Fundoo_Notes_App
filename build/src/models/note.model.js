"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//src>models>note.models.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Note extends sequelize_1.Model {
}
Note.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true,
    },
    isArchived: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isInTrash: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    CreatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Note',
});
exports.default = Note;
