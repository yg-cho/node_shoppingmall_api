const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');



exports.user_register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        // 이메일 중복 체크
        const existingUser = await userModel.findOne({ where: email });
        console.log("existingUser: ",existingUser)
        if (existingUser) {
            return res.status(400).json({ message: "Email already used" });
        }
        console.log(req.body)
        // 패스워드 암호화
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        // 새 유저 생성 및 저장
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        return res.status(201).json({
            message: "Registered OK",
            userInfo: savedUser
        });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.user_login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 이메일 유무 체크
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Email not found"
            });
        }

        // 패스워드 체크
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Password incorrect"
            });
        }

        // 로그인 성공 시 토큰 생성
        const accessToken = jwt.sign(
            {
                email: user.email,
                userId: user._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' } // Access Token 유효 기간
        );

        const refreshToken = jwt.sign(
            {
                email: user.email,
                userId: user._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // Refresh Token 유효 기간
        );

        // Refresh Token을 HTTP-only 쿠키에 저장
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서는 true로 설정
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7일
        });

        // 응답 헤더에 Access Token 추가
        res.header('Authorization', 'Bearer ' + accessToken);

        // 응답 본문에 메시지와 함께 Access Token 정보 추가
        res.status(200).json({
            message: "Auth successful",
            accessToken: "Bearer " + accessToken,
            user: email
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


exports.user_change_password =  async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // 기존 비밀번호 확인
        const validPassword = await req.user.comparePassword(oldPassword);
        if (!validPassword) return res.status(400).send('Invalid current password.');

        // 새 비밀번호 유효성 검사 (예: 최소 길이)
        if (newPassword.length < 6) return res.status(400).send('Password must be at least 6 characters long.');

        // 새 비밀번호 암호화 및 저장
        req.user.password = newPassword;
        await req.user.save();

        res.send('Password changed successfully.');
    } catch (err) {
        res.status(500).send('Server error.');
    }
};

exports.user_get_current = (req, res) => {
    res.json({
        message: "현재 유저정보"
    });
};

exports.token_refresh = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh Token not provided' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        }

        const newAccessToken = jwt.sign(
          { email: user.email, userId: user.userId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );

        res.header('Authorization', 'Bearer ' + newAccessToken);
        res.status(200).json({
            message: "New Access Token issued",
            accessToken: "Bearer " + newAccessToken
        });
    });
};