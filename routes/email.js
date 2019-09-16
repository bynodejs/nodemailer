'use strict'

const router = require('express').Router();
const emailer = require('../lib/nodemailer');

router.post('/', (req, res, next) => {

    emailer
        .send()
        .then(() => {
            console.log('[EMAIL] : SUCCESS');
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(`[ERROR] : ${error}`);
            next(error);
        });
});

module.exports = router;
