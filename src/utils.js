require("dotenv").config();

import { adjectives, nouns } from "./words";
import nodemailer  from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

console.log(process.env.SENDGRID_USERNAME,
    process.env.SENDGRID_PASSWORD)

export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
          }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "Jy@prismagram.com",
        to: adress,
        subject: "Login Secret for Prismagram🔒",
        html: `Hello! Your login secret it ${secret}.<br/>Copy psate on the app/web to log in`
    };
    return sendMail(email);
};