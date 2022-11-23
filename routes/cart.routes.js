const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/', cartController.getCart); 
router.post('/items', cartController.addItem);
router.patch('/items',cartController.updateItem); 

module.exports = router;