//1
const express = require('express');
const router = express.Router();


//회원가입
router.post('/register', (req, res) => {
   res.json({
       message: "회원가입 성공"
   });
});

//로그인
router.post('/login', (req, res) => {
    res.json({
        message: "로그인 성공"
    });
});

//현재 유저정보
router.get('/:userId', (req, res) => {
    res.json({
        message: "현재 유저정보"
    });
});



//2
module.exports = router;