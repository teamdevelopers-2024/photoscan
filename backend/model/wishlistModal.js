import mongoose from "mongoose";

// Define the cart schema
const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", // Reference to the User model
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product", // Reference to the Product model
                    required: true,
                },
                image: {  // Changed from images to a single image
                    type: String,
                    required: false,
                },
                publicid:{
                    type:String
                },
                textInput: {  // Changed from textInput array to a single textInput
                    type: String,
                    required: false,
                },
            },
        ],
        
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Create the Cart model from the schema
const wishlistDb = mongoose.model("wishlist", wishlistSchema);

export default wishlistDb;
