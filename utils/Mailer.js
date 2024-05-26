import lodash from "lodash"
import nodemailer from "nodemailer"

var config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'kaunghtetkyaw.dev@gmail.com',
        pass: 'Kaunghtetkyaw@016'
    }
};

var transporter = nodemailer.createTransport(config)

var defaultMail = {
    from: 'kaunghtetkyaw.dev@gmail.com',
    text: 'test test'
}

const send = (to, subject, html) => {
    mail = lodash.merge({html}, defaultMail, to)
    transporter.sendMail(mail, function(error, info) {
        if(error) return console.log(error)
        console.log('mail sent', info.response)
    })
}

export default send