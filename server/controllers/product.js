const Product =require('../models/product')
const formidable = require('formidable')
const { errorHandler } = require('../helper/dbErrorHandler')

exports.create =(req,res)=>{
 const name =req.body.name;
  const bill =req.body.bill;
   const amount =req.body.amount;
   const type = req.body.type;
    if(!name || !name.length){
        return res.status(400).json({
            error:'Name is require'
        })
    }
    if(!bill || !bill.length){
        return res.status(400).json({
            error:'Bill is Required'
        })
    }
    if(!amount || !amount.length){
        return res.status(400).json({
            error:'Amount is Required'
        })
    }
     if(!type || !type.length){
        return res.status(400).json({
            error:'Type is Required'
        })
    }
 
    let product =new Product()
    product.name=name;
    product.bill=bill;
    product.amount=amount;
    if(type == 'Credit'){
         product.credit=type;
    }else{
         product.debit=type;
    }
    product.save((err,result)=>{
        if(err){
              return res.status(400).json({
               error:errorHandler(err)
            });
             
            
        }
         res.json(result);
   
    })
  
};


exports.list =(req,res)=>{
    Product.find({})
    .select('name bill amount debit credit createdAt')
    .exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    })
}

