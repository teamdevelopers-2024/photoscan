import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    offerType:{
      type:String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,

    },
    categoryName:{
      type: String,
      required: true,
      // unique:true,
    }
  }
);

const OfferDb = mongoose.model('Offer', offerSchema);

export default OfferDb;
