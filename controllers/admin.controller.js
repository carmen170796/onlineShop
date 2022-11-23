const db  = require('mongodb');
const Product=require('../model/product.model');
const Order=require('../model/order.model');

async function getManageProducts(req,res,next){
    try{
    const products=await Product.fetchAll();
    res.render('admin/products/all-products',{products:products})
    }
    catch(error){
        next(error);
        return;
    }
}

function getAddProduct(req,res){

    res.render('admin/products/addProduct')
}

async function getSingleProduct(req,res,next){
    try{
    const product= await Product.fetchOne(req.params.id);
    res.render('admin/products/singleProduct',{product:product})
    }
    catch(error){
        next(error);
    }
}

async function saveProduct (req,res,next){
    const product= new Product({
        ...req.body,
        img:req.file.location
    });
    try{
        await product.saveItem();
    }
    
    catch (error){
        next(error);
        return;
    }
    res.redirect('/admin/products')
}

 async function updateProduct(req,res,next){
    const product= new Product({
        ...req.body,
        _id:req.params.id
    });

    if (req.file){
        try{
            await Product.updateImage(req.file.location,req.params.id);
        }
        catch(error){
            next(error);
        }
    }

    try{
        const test=await product.saveItem();
        
    }
    catch(error){
        next(error);
        return;
    }
    res.redirect('/admin/products')
}

async function deleteProduct(req,res,next){
    try{
    await Product.delete(req.params.id);
    res.redirect('/admin/products')
    }
    catch(error){
        next(error);
    }
}

async function getOrders(req,res,next){
    let orderList
    try{
        orderList= await Order.allOrders();
    }
    
    catch(error){
        next(error);
        return;
    }
 
    res.render('admin/orders/all-orders',{orderList:orderList})
}

async function updateOrders(req,res,next){
    const orderid=req.params.id;
    console.log(orderid)
    const newStatus=req.body.newStatus;
    
    try{
    const order= await Order.getOrderId(orderid)
    order.status=newStatus
    await order.save();
    }

    catch(error){
        next(error);
        return;
    }
    res.status(201).json({
        message:'Order has been updated',
        newStatus:newStatus
    });

}
module.exports={
    getManageProducts:getManageProducts,
    getAddProduct:getAddProduct,
    getSingleProduct:getSingleProduct,
    saveProduct:saveProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct,
    getOrders:getOrders,
    updateOrders:updateOrders
}