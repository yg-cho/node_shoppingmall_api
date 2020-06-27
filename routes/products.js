// 1
const express = require('express');
const router = express.Router();
const productModel = require('../models/products')

// product 정보 불러오기
router.get('/', (req, res) => {
    productModel
        .find()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/product/"+ doc._id
                        }
                    }
                })
            }
            res.json(response);

        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });

});

// product 상세데이터 불러오는 api

router.get('/:productId', (req,res) => {
    const id = req.params.productId;

    productModel
        .findById(id)
        .then(doc  => {
            if(doc){
                return res.json({
                    message : "Successful product detail get",
                    productinfo : {
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request : {
                            type: "GET",
                            url: "http://localhost:5000/product"
                        }
                    }
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

    const product = new productModel({
        name : req.body.productName,
        price : req.body.productPrice
    });

    product
        .save()
        .then(result => {
            res.json({
                message : "Registered product",
                createdProduct : {
                    id: result._id,
                    name: result.name,
                    price: result.price,
                    request : {
                        type: "GET",
                        url: "http://localhost:5000/product/"+result._id
                    }
                }
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });

});

// product 정보 수정하기

router.patch('/:productId', (req, res) => {

    // update할 대상선언
    const id = req.params.productId;

    // update될 내용
    const updatedOps = {};
    for(const ops of req.body) {
        updatedOps[ops.propName] = ops.value;
    }

    productModel
        .findByIdAndUpdate(id,{$set: updatedOps })
        .then(() => {
            res.json({
                message : "updated product",
                request : {
                    type: "GET",
                    url: "http://localhost:5000/product/"+id
                }
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });

});



// product 정보 삭제하기
router.delete('/:productId', (req, res) => {
    const id = req.params.productId;

    productModel
        .findByIdAndDelete(id)
        .then(() => {
            res.json({
                message : "Deleted product",
                request : {
                    type : "GET",
                    url : "http://localhost:5000/product"
                }
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });

});



//product 전체 삭제
router.delete("/",(req, res) => {
    productModel
        .delete()
        .then()
        .catch();
});



// 2
module.exports = router;