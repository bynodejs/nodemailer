'use strict';

const nodemailer = require('nodemailer');

const _transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yourEmail@gmail.com',
        pass: 'yourPassword'
    }
});

exports.send = () => (
    new Promise((resolve, reject) => {
        _transporter.sendMail({
            from: {
                name: 'senderName',
                address: 'senderEmail',
            },
            to: {
                address: 'receiverEmail',
            },
            subject: 'Title',
            text: 'Hello, World!'
        }, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    })
);
