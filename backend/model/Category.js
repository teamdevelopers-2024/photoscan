import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
             type: String,
             required: true },
        image: { 
            type: String 
        },
        isActive: { 
            type: Boolean,
             default: true 
            },
            count :  {
                type:Number ,
                default : 0

            }
    },
    { 
        timestamps: true 
    }
);

const CategoryDb = mongoose.model("Category", categorySchema);

export default CategoryDb;
