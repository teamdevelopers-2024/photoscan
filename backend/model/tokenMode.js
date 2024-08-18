import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 86400 // Expires after 30 days
    }
});

const TokenDb = mongoose.model("Token", userTokenSchema);

export default TokenDb;
