import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    count: {
      type: Number,
      default: 0
    },
    subcategories: [
      {
        name: {
          type: String,
          required: true
        },
        isActive: {
          type: Boolean,
          default: true
        },
        count: {
          type: Number,
          default: 0
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const CategoryDb = mongoose.model("Category", categorySchema);

export default CategoryDb;
