import mongoose from "mongoose";

// Define the cart schema
const cartSchema = new mongoose.Schema(
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
                images: [
                    {  
                        url: String,
                        publicId: String,
                    }
                ],
                textInput: [
                    {
                        
                    }
                ],
                orientation: {
                    type: String,
                    // enum: ["landscape", "portrait"], // Define specific orientations if applicable
                    // required: true
                },
                isCustomize: {
                    type: Boolean,
                    default: false // Default to false if not specified
                }
            },
        ],
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Create the Cart model from the schema
const CartDb = mongoose.model("Cart", cartSchema);

export default CartDb;
