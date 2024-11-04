import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    productdescription: {
        type: String,
        required: true 
    },
    productprice: {
        type: Number
    },
    image: {
        type: String
    },
    category: {
        type:String 
    },
    sizes:{
        type:Array
    }
});

const ProductDb = mongoose.model("Product", productSchema);

export default ProductDb;