import express from "express";
import db from "../db/mysql";
import Product from "../domain/product";

const router = express.Router();

router.get("/", (req, res, next) => {

    db.query(Product.getAllProductSQL(), (err, data)=> {
        if(!err) {
            res.status(200).json({
                message:"Products listed.",
                productId:data
            });
        }
    });    
});

router.post("/add", (req, res, next) => {

    //read product information from request
    let product = new Product(req.body.prd_name, req.body.prd_price);
    console.log(req.body.prd_name, req.body.prd_price)
    db.dml(product.getAddProductSQL(), (err, data)=> {
        res.status(200).json({
            message:"Product added.",
            productId: data.insertId
        });
    });
});

router.get("/:productId", (req, res, next) => {
    let pid = req.params.productId;

    db.query(Product.getProductByIdSQL(pid), (err, data)=> {
        if(!err) {
            if(data && data.length > 0) {
                
                res.status(200).json({
                    message:"Product found.",
                    product: data
                });
            } else {
                res.status(200).json({
                    message:"Product Not found."
                });
            }
        } 
    });    
});

router.post("/delete", (req, res, next) => {

    var pid = req.body.productId;

    db.dml(Product.deleteProductByIdSQL(pid), (err, data)=> {
        if(!err) {
            if(data && data.affectedRows > 0) {
                res.status(200).json({
                    message:`Product deleted with id = ${pid}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message:"Product Not found."
                });
            }
        } 
    });   
});

module.exports = router;