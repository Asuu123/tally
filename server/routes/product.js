const express =require('express');
const router =express.Router();
const {create,list} = require('../controllers/product');
router.post('/product',create);
router.get('/product',list)





module.exports =router;