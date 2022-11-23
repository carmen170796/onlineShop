const Cart =require('../model/cart.model');

function startCart(req,res,next){
    let cart;

    if (!req.session.cart){
        cart=new Cart();
    }
    else {
        const session=req.session.cart;
        cart=new Cart(
            session.items,
            session.totalQuantity,
            session.totalAmount
            );
    }

    res.locals.cart=cart;
    next();
}

module.exports=startCart