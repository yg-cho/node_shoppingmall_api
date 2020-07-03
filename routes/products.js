// 1
const express = require('express');
const router = express.Router();

const checkAuth = require('../config/check-auth');

const {
    products_get_all,
    products_create_product,
    products_get_product,
    products_update_product,
    products_delete_product
} = require('../controllers/products');


// product 정보 불러오기
// 누구나 접근가능
router.get('/', products_get_all);

// product 상세데이터 불러오는 api
// login한 사용자만 사용가능
router.get('/:productId', checkAuth, products_get_product);

// product 정보 등록하기
// login한 사용자만 사용가능
router.post('/', checkAuth, products_create_product);

// product 정보 수정하기
router.patch('/:productId', checkAuth, products_update_product);

// product 정보 삭제하기
router.delete('/:productId', checkAuth, products_delete_product);


// 2
module.exports = router;