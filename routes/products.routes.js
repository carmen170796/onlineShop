const express=require('express');
const productsControllers=require('../controllers/products.controllers')
const router=express.Router();

router.get('/products', productsControllers.getProducts);
router.get('/products/:id',productsControllers.getSingleProduct);


module.exports=router;