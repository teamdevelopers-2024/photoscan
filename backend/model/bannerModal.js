import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    image: {
        type: String
    },
    publicId: {
        type: String
    }
});

const BannerDb = mongoose.model("Banner", bannerSchema);

export default BannerDb;