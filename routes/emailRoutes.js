const nodemailer = require("nodemailer");
require('dotenv').config()
module.exports = (app) => {
    app.post('/email/send', async (req, res) => {

        let name = req.body.name
        let email = req.body.email
        let message = req.body.message
        if (!name || !email || !message) {
            res.status(400).json({
                error: 'bad request'
            })
            return
        }

        try {

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.gmailUsername, // generated ethereal user
                    pass: process.env.gmailPassword, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: `"${name} " <${email}>`, // sender address
                to: "hat83203@gmail.com", // list of receivers
                subject: "Portfolio Message", // Subject line
                text: "ffffffff", // plain text body
                html: `
                <h3>from : ${name} - ${email}</h3>
                <b>${message}</b>
                `, // html body
            });

            // console.log("Message sent: %s", info.messageId);
            // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            res.json({
                message:"sent successfully"
            })


        } catch (error) {
            console.log(error);
            res.status(500).json({
                error:"server error"
            })
        }

        // create reusable transporter object using the default SMTP transport

    })
}