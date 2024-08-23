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
exports.sendEmail = sendEmail;
//src>index.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function sendEmail(mail, token) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail', // Replace with your email provider
            auth: {
                user: process.env.EMAIL_USER, // Email address from environment variables
                pass: process.env.EMAIL_PASS, // Email password from environment variables
            },
        });
        let mailOptions = {
            from: `"Gautam IT Solutions Pvt. Ltd." <${process.env.EMAIL_USER}>`, // Sender address
            to: mail,
            subject: 'Forget Password Token', // Subject line
            text: '',
            html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/${token}">click here</a></h1>`
        };
        try {
            let info = yield transporter.sendMail(mailOptions);
            console.log('Email sent: %s', info.messageId);
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    });
}
//sendEmail();
