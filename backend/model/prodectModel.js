import mongoose from "mongoose";

const frameSchema = new mongoose.Schema({
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
    }
});

const FrameDb = mongoose.model("Frames", frameSchema);

export default FrameDb;