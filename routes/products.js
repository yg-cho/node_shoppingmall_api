// 1
const express = require('express');
const router = express.Router();


// product 정보 불러오기
router.get('/', (req, res) => {
    res.json({
        message: 'product total get'
    });
});

// product 정보 등록하기
router.post('/', (req, res) => {
    res.json({
        message: 'product post'
    });
});

// product 정보 수정하기

router.put('/', (req, res) => {
    res.json({
        message: 'product put'
    });
});



// product 정보 삭제하기

router.delete('/', (req, res) => {
    res.json({
        message: 'product delete'
    });
});






// 2
module.exports = router;