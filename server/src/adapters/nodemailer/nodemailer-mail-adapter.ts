import {MailAdapter, SendMailData} from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7c64110711a025",
        pass: "c48fcd11ff823e"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feeget <oi@feeget.com>',
            to: 'Matheus Sholl <matheus@dev.com>',
            subject: subject,
            html: body
        })
    };
}