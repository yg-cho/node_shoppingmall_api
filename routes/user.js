//1
const express = require('express');
const router = express.Router();



const checkAuth = require('../config/check-auth');

const {
    user_register,
    user_login,
    user_get_current, token_refresh
} = require('../controllers/user');

//회원가입
router.post('/register', user_register);

//로그인
router.post('/login', user_login);

//토큰재발급
router.post('/token_refresh', token_refresh);

//현재 유저정보
router.get('/current', checkAuth, user_get_current);

//2
module.exports = router;