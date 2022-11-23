//change value below
const stripe = require('stripe')('your own key from Stripe')
const db  = require('mongodb');
const Order = require('../model/order.model');
const User=require('../model/user.model');

async function getOrders(req,res,next){
    let orderList
    try{
        orderList = await Order.ordersFromUser(res.locals.uid)
    } 
    catch(error){
        next(error);
        return;
    }
    res.render('customer/orders/all-orders',{orderList:orderList})
}
async function addOrders(req,res,next){
    const result=[...res.locals.cart.items];
    const finalresult =result.filter(item=>item.finalPrice>0);
    res.locals.cart.items=finalresult;
    const cart=res.locals.cart;
    
    let userData;
    let orderData;
    try{
        userData= await User.getById(res.locals.uid);
        orderData=new Order(cart,userData);
        orderData.save();
    }

    catch(error){
        next(error);
        return;
    }

    req.session.cart=null 

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.items.map(function(item) {
          return  {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.product.title
              },
              unit_amount: +item.product.price.toFixed(2) * 100
            },
            quantity: item.quantity,
          }
        }),
        mode: 'payment',
        //change   code below
        success_url: `www.yourOwnUrl/orders/success`,
        cancel_url: `www.yourOwnUrl/orders/failure`
      });
      
    res.redirect(303, session.url);
}

function getSuccess (req,res){
    res.render('customer/orders/success')
}

function getFailure (req,res){
    res.render('customer/orders/failure')
}

module.exports={
    getOrders:getOrders,
    addOrders:addOrders,
    getSuccess:getSuccess,
    getFailure:getFailure
}

