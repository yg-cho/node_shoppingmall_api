const orderModel = require('../models/orders');

exports.orders_get_all = (req, res) => {
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
                        quantity: doc.quantity,
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
};

exports.orders_get_order = (req,res) =>{
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
                        createdAt: doc.createdAt,
                        updatedAt: doc.updatedAt,
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
};

exports.orders_create_order = (req, res) => {

    const { product, quantity } = req.body;
    const order = new orderModel({
        //key == value
        product, quantity
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
                    createdAt: order.createdAt,
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
};

exports.orders_update_order = (req,res) => {

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
};

exports.orders_delete_order = (req,res) => {
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
};