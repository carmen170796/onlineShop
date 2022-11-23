const res = require('express/lib/response');
const Cart=require('../model/cart.model');
const Product=require('../model/product.model');

function getCart(req,res){
    res.render('customer/cart/cart')
}
async function addItem (req,res,next){
    let product 

    try { 
        product=await Product.fetchOne(req.body.productId);
    }

    catch(error){
        
        next(error);
        return;
    }
    const shop =res.locals.cart
    shop.addtoCart(product);
    req.session.cart=shop
    res.status(201).json({
        message:"item added",
        totalItems: shop.totalQuantity
    }); 

    }

    function updateItem(req,res){
        const cart=res.locals.cart;
        const updatedItem=cart.updateItem(req.body.productId, +req.body.newQuantity);
        req.session.cart=cart;
        
        res.status(201).json({
            message:'item has been updated',
            updatedCartData:{
                newTotalQuantity:cart.totalQuantity,
                newTotalAmount:cart.totalAmount,
                updatedItemPrice: updatedItem.updatedItemPrice
            }
        })
    }



module.exports={
    getCart:getCart,
    addItem:addItem,
    updateItem:updateItem
}