//1
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user')

//회원가입
router.post('/register', (req, res) => {

    // 등록여부(email) 유무체크
    userModel
        .findOne({ email: req.body.email })
        //.findOne({ username: req.body.username })
        .then(user => {
            if(user) {
                return res.json({
                    message : "email already used"
                });
            } else {
                // password 암호화
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                        // 암호화 성공시 database에 저장
                        const user = new userModel({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(user => {
                                res.json({
                                    message: "Registered OK",
                                    userInfo: user
                                });
                            })
                            .catch(err => {
                                res.json({
                                    error: err.message
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                error: err.message
            });
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