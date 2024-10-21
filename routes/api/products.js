const express = require('express');
const router = express.Router();
const productsData = require('../../Controllers/ProductsController');


router.route('/')
   .get(productsData.getAllProducts)
   .post(productsData.createNewProduct)
   .put(productsData.updateProduct)
   .delete(productsData.deleteProduct);

router.route('/:id')
    .get(productsData.getSingleProduct);

module.exports = router;
