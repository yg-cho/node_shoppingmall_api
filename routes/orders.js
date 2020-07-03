//1
const express = require('express');
const router = express.Router();


const checkAuth = require('../config/check-auth');

const {
    orders_get_all,
    orders_get_order,
    orders_create_order,
    orders_update_order,
    orders_delete_order
} = require('../controllers/orders');


// order 전체정보 불러오기
router.get('/', checkAuth, orders_get_all);

//order 상세데이터 불러오는 api

router.get('/:orderId', checkAuth, orders_get_order);

// order 정보 등록하기
router.post('/', checkAuth, orders_create_order);

// order 정보 수정하기
router.patch('/:orderId', checkAuth, orders_update_order);

// order 정보 삭제하기
router.delete('/:orderId', checkAuth, orders_delete_order);

//2
module.exports = router;
