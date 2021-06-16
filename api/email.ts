import { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer';

export default async(request: VercelRequest, response: VercelResponse) => {
    const { name = 'World' } = request.query

    let transporter = nodemailer.createTransport({
        host: "smtp-pulse.com",
        port: 465,
        secure: true,
        auth: {
            user: "vladdexx@yandex.ru",
            pass: "g3jQDLa5TrSGJEc",
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "vladdexx@yandex.ru", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    response.status(200).send(`Email sent!`)
}