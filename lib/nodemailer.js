'use strict';

const nodemailer = require('nodemailer'),
    path = require('path'),
    ejs = require('ejs');

const pdf = require('./pdf');

const _transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourEmail@gmail.com',
        pass: 'yourPassword'
    }
});

exports.send = ({ receiveEmail, subject, htmlName, htmlData }) => (
    new Promise((resolve, reject) => {
        ejs.renderFile(path.join(__dirname, '../public/views', `${htmlName}.html`), htmlData, (err, htmlCode) => {
            if (err) {
                reject(err);
            } else {
                pdf.create(htmlCode)
                    .then(pdfBuffer => {
                        _transporter.sendMail({
                            from: {
                                name: 'senderName',
                                address: 'senderEmail',
                            },
                            to: {
                                address: receiveEmail,
                            },
                            subject: subject,
                            html: htmlCode,
                            attachments: [{
                                filename: `${htmlName}.pdf`,
                                content: pdfBuffer,
                            }],
                        }, (err, info) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(info);
                            }
                        });
                    });
            }
        });
    })
);
