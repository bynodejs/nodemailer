'use strict';

const pdf = require('html-pdf');
const _options = { 'format': 'Tabloid' };

exports.create = (htmlCode) => (
    new Promise((resolve, reject) => {
        pdf.create(htmlCode, _options).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    })
);
