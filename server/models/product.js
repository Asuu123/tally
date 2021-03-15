const mongoose =require('mongoose')
const {ObjectId}=mongoose.Schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        min:3,
        max:160,
    },
      bill:{
        type:String,
        trim:true,
        required:true,
    },
        amount:{
        type:Number,
    },
        debit:{
        type:String,
        trim:true,
    },
        credit:{
        type:String,
        trim:true,
    },
    },
    {timestamps:true}
);

module.exports =mongoose.model('Product',productSchema);