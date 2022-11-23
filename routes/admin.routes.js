const express=require('express');
const configureMulterMiddleware=require('../middlewares/imageUpload');
const adminControllers=require('../controllers/admin.controller');
const router=express.Router();

router.get('/products',adminControllers.getManageProducts);
router.get('/products/new',adminControllers.getAddProduct);
router.post('/products', configureMulterMiddleware, adminControllers.saveProduct);
router.get('/products/:id',adminControllers.getSingleProduct);
router.post('/products/:id',configureMulterMiddleware,adminControllers.updateProduct);
router.post('/products/:id/delete',adminControllers.deleteProduct);
router.get('/orders',adminControllers.getOrders)
router.patch('/orders/:id',adminControllers.updateOrders)

module.exports=router;