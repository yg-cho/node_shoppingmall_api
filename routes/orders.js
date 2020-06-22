//1
const express = require('express');
const router = express.Router();

// order 정보 불러오기
router.get('/', (req, res) => {
    res.json({
        message : 'order total get'
    });
});

// order 정보 등록하기
router.post('/', (req, res) => {
    res.json({
        message : 'order post'
    });
});

// order 정보 수정하기
router.put('/',(req,res) => {
    res.json({
        message : 'order put'
    });
});

// order 정보 삭제하기
router.delete('/',(req,res) => {
    res.json({
        message : 'order delete'
    })
})


//2
module.exports = router;
