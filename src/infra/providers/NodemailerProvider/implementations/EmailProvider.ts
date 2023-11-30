import * as nodemailer from 'nodemailer';
import * as Mail from "nodemailer/lib/mailer";
import { IEmailProvider, IMensagemEmail, ITransporterEmail } from "../IEmailProvider";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailProvider implements IEmailProvider {
    private transporter: Mail;

    constructor() {}

    async enviarEmail(email: IMensagemEmail, dataTransporter: ITransporterEmail): Promise<void> {

        try {            
            // cria ao tranportador
            this.transporter = nodemailer.createTransport({
                host: dataTransporter.host,
                port: dataTransporter.port,
                secure: dataTransporter.secure,
                auth: {
                    user: dataTransporter.auth.user,
                    pass: dataTransporter.auth.pass
                },
                tls: {
                    rejectUnauthorized: false,
                },
                connectionTimeout: dataTransporter.connectionTimeout
            });
            // envia o email
            await this.transporter.sendMail({
                from: {
                    address: dataTransporter.from.address,
                    name: dataTransporter.from.name
                },
                to: email.para,
                cc: email.paraCC,
                bcc: email.paraCCO,
                subject: email.assunto,
                text: email.texto,
                html: email.html,
                attachments: email.anexos
            })
        } catch (err) {
            throw { message: 'Falha ao enviar email. Detalhes: ' + err }
        }
    }
}