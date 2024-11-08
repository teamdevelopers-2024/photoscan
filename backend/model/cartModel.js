import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", 
    },
    productID: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true,
    }],
    images: [{
        type: String,
        required: false,
    }],
    texts: [{
        type: String,
        required: false,
    }],
}, {
    timestamps: true, 
});


const CartDb = mongoose.model("Cart", cartSchema);

export default CartDb;

