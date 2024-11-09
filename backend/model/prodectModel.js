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
    },
    status:{
        type:Boolean
    },
    catoffer:{
        type:Number
    },
    catstatus:{
        type:Boolean
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    includelogo:{
        type:Boolean
    },
    textfeild:{
        type:Number
    },
    imageCount:{
        type:Number
    }
});

const ProductDb = mongoose.model("Product", productSchema);

export default ProductDb;