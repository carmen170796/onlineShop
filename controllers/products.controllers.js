const db  = require('mongodb');
const Product=require('../model/product.model');

async function getProducts(req,res,next){
    try{
        const products=await Product.fetchAll();
        res.render('customer/products/all-products',{products:products})
        }
    catch(error){
        console.log(error)
        next(error);
        return;
        }
}

async function getSingleProduct(req,res,next){

    try{
        const product=await Product.fetchOne(req.params.id)
        res.render('customer/products/singleProduct',{product:product})
    }

    catch (error){
        next(error);
        return;
    }
}


module.exports={
    getProducts:getProducts,
    getSingleProduct:getSingleProduct,
}