

const productModel = require('../models/products');



exports.products_get_all = (req, res) => {
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

};


exports.products_create_product = (req, res) => {

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
                    createdAt: result.createdAt,
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

};

exports.products_get_product =  (req,res) => {
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
                        createdAt: doc.createdAt,
                        updatedAt: doc.updatedAt,
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

};

exports.products_update_product = (req, res) => {

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

};

exports.products_delete_product = (req, res) => {
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

};