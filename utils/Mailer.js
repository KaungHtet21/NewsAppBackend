var _ = require('lodash');	
var nodemailer = require('nodemailer');

var config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'kaunghtetkyaw.dev@gmail.com',
        pass: 'mfqkwvygefngbjqx'
    }
};
    
var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: 'kaunghtetkyaw.dev@gmail.com',
    text: 'test text',
};


const send = (to, subject, html) => {
    // use default setting
    mail = _.merge({html}, defaultMail, to);
    
    // send email
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
}
module.exports = {
    send
}