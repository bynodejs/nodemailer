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

exports.send = () => (
    new Promise((resolve, reject) => {
        ejs.renderFile(path.join(__dirname, '../public/views', 'example.html'), (err, htmlCode) => {
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
                                address: 'receiverEmail',
                            },
                            subject: 'Title',
                            html: htmlCode,
                            attachments: [{
                                filename: 'example.pdf',
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
