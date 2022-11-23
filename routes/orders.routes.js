const express=require('express');
//exporting the functions from auth.controller.js to routes 
const ordersControllers=require('../controllers/orders.controller')
const router=express.Router();

router.get('/',ordersControllers.getOrders);
router.post('/',ordersControllers.addOrders);
router.get('/success',ordersControllers.getSuccess)
router.get('/failure',ordersControllers.getFailure)

module.exports=router;