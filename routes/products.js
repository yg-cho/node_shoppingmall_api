// 1
const express = require('express');
const router = express.Router();
const productModel = require('../models/products')

// product 정보 불러오기
router.get('/', (req, res) => {
    productModel
        .find()
        .then(docs => {
            res.json({
                message : "product total get",
                count : docs.length,
                products : docs
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });



    // res.json({
    //     message: 'product total get'
    // });
});

// product 상세데이터 불러오는 api

router.get('/:productId', (req,res) => {
    const id = req.params.productId;

    productModel
        .findById(id)
        .then(doc  => {
            if(doc){
                res.json({
                    message : "Successful product detail get",
                    productinfo : doc
                });
            }else{
                res.json({
                    message : "no product Id"
                });
            }

        })
        .catch(err => {
            res.json({
                error : err.message
            });
        })

});



// product 정보 등록하기
router.post('/', (req, res) => {

    // const product = {
    //     name : req.body.productName,
    //     price : req.body.productPrice
    // }

    const product = new productModel({
        name : req.body.productName,
        price : req.body.productPrice
    });

    product
        .save()
        .then(result => {
            res.json({
                message : "Registered product",
                createdProduct : result
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });


    //
    // res.json({
    //     message: 'product post',
    //     productInfo: product
    // });
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