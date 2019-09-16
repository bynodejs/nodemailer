'use strict'

// require modules
const router = require('express').Router();

// require lib
const emailer = require('../lib/nodemailer');

/**
 * @url BASE_URL/email/
 * @type POST
 * @description 이메일 전송
 * @param {(body) string} [receiveEmail] 받는 사람 이메일 주소
 * @param {(body) string} [subject] 이메일 제목
 * @param {(body) string} [htmlName] 보낼 HTML 파일 이름( 확장자 불포함)
 * @param {(body) object} [htmlData] HTML에 담을 데이터 (JSON)
 */
router.post('/', (req, res, next) => {
    const data = req.body;

    emailer
        .send(data)
        .then(() => {
            console.log('[EMAIL] : SUCCESS');
            res.sendStatus(200);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
