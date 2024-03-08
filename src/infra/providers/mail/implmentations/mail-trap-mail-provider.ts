import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider, MailDTO } from "../mail-provider";

export class MailTrapMailProvider implements IMailProvider {

  private client!: Transporter

  constructor() {
    nodemailer.createTestAccount()
      .then(() => {

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_MAIL_HOST!,
          port: Number(process.env.SMTP_MAIL_PORT!),
          auth: {
            user: process.env.SMTP_MAIL_USER!,
            pass: process.env.SMTP_MAIL_PASS!
          },
        });

        this.client = transporter
      })
      .catch(err => console.log('MailTrapError', err))
  }

  async sendMail(data: MailDTO): Promise<void> {
    await this.client.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html
    }).then(() => {
      console.log('Email disparado')
    }).catch(err => {
      console.log("🚀 ~ MailTrapMailProvider ~ sendMail ~ err:", err)
    })
  }

}