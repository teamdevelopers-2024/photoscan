import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    productprice: {
        type: Number
    },
    images: {
        type: Array
    },
    category: {
        type:String 
    },
    actualPrice:{
        type:Number
    },
    offerPrice:{
        type:Number
    }
    ,
    sizes:{
        type:Array
    }
});

const ProductDb = mongoose.model("Product", productSchema);

export default ProductDb;