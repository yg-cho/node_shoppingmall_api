//1
const express = require('express');
const router = express.Router();
const orderModel = require('../models/orders');




// order 전체정보 불러오기
router.get('/', (req, res) => {
    orderModel
        .find()
        .populate("product", "name price")
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return{
                        id: doc._id,
                        product: doc.product,
                        quntity: doc.quntity,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/order/"+doc._id
                        }
                    }
                })
            }
            res.json(response);
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });
});

//order 상세데이터 불러오는 api

router.get('/:orderId', (req,res) =>{
   const id = req.params.orderId;

   orderModel
       .findById(id)
       .populate("product","name price")
       .then(doc => {
           if(doc){
               return res.json({
                   message: "Successful order detail get",
                   orderInfo: {
                       id: doc._id,
                       product: doc.product,
                       quntity: doc.quntity,
                       request: {
                           type: "GET",
                           url: "http://localhost:5000/order"
                       }
                   }
               });
           }else{
               res.json({
                   message: "no order Id"
               });
           }
       })
       .catch(err => {
           res.json({
               error: err.message
           });
       });
});


// order 정보 등록하기
router.post('/', (req, res) => {

    const order = new orderModel({
        product: req.body.productId,
        quantity: req.body.qty
    });

    order
        .save()
        //populate 하는방법 찾아보기
        .then(result => {
            res.json({
                message: "Successful order stored",
                orderInfo : {
                    id: order._id,
                    product: order.product,
                    quntity: order.quntity,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/order/"+order._id
                    }
                }

            });
        })
        .catch(err =>{
            res.json({
                error : err.message
            });
        });

});

// order 정보 수정하기
router.patch('/:orderId',(req,res) => {

    //update할 대상
    const id = req.params.orderId;

    //update 내용
    const updatedOps = {};
    for(const ops of req.body) {
        updatedOps[ops.propName] = ops.value;
    }

    orderModel
        .findByIdAndUpdate(id,{ $set: updatedOps })
        .then(() => {
            res.json({
                message: "updated order",
                request: {
                    type: "GET",
                    url: "http://localhost:5000/order/"+id
                }
            });
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        })
});

// order 정보 삭제하기
router.delete('/:orderId',(req,res) => {
    const id = req.params.orderId;

    orderModel.
        findByIdAndDelete(id)
        .then(() => {
            res.json({
                message: "Deleted order",
                request: {
                    type: "GET",
                    url: "http://localhost:5000/order"
                }
            })
        })
        .catch(err => {
            res.json({
                error : err.message
            });
        })
});

//order 전체 삭제하기

router.delete("/",(req,res) => {
    orderModel
        .delete()
        .then()
        .catch();
});

//2
module.exports = router;
