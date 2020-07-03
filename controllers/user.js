const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');



exports.user_register = (req, res) => {
    const { username, email, password } = req.body;
    // 등록여부(email) 유무체크
    userModel
        .findOne({ email })
        //.findOne({ username: req.body.username })
        .then(user => {
            if(user) {
                return res.json({
                    message : "email already used"
                });
            } else {
                // password 암호화
                bcrypt.hash(password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                        // 암호화 성공시 database에 저장
                        const user = new userModel({
                            username, email,
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
};

exports.user_login = (req, res) => {

    const { email, password } = req.body;
    // email 유무체크 -> password 체킹 -> jsonwebtoken 반환
    userModel
        .findOne({ email })
        .then(user => {
            if(!user){
                return res.json({
                    message : "email not found"
                });
            } else {
                // password 체킹
                //console.log(user);
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err || result === false)  {
                        return res.json({
                            message: "password incorrect"
                        });
                    } else {
                        // 로그인성공시 token 반환
                        const token = jwt.sign(
                            {
                                email: user.email,
                                userId: user._id
                            },
                            process.env.SECRET_KEY,
                            { expiresIn: "1h" }
                        );
                        res.json({
                            message: "Auth successful",
                            tokenInfo: "bearer " + token
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
};

exports.user_get_current = (req, res) => {
    res.json({
        message: "현재 유저정보"
    });
};