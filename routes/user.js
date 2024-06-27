//1
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const checkAuth = require('../config/check-auth');

const {
    user_register,
    user_login,
    user_get_current,
    token_refresh,
    user_change_password
} = require('../controllers/user');

//회원가입
router.post('/register', user_register);

//로그인
router.post('/login', user_login);

//비밀번호변경
router.post('/change_password', auth, user_change_password)

//토큰재발급
router.post('/token_refresh', token_refresh);

//현재 유저정보
router.get('/current', checkAuth, user_get_current);

//2
module.exports = router;