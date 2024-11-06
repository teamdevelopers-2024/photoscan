import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,      // Ensure the name is unique
      uppercase: true     // Automatically convert to uppercase
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
          required: true,
          uppercase: true
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

categorySchema.pre("save", function (next) {
  this.name = this.name.toUpperCase();
  if (this.subcategories) {
    this.subcategories.forEach((subcategory) => {
      subcategory.name = subcategory.name.toUpperCase();
    });
  }
  next();
});

const CategoryDb = mongoose.model("Category", categorySchema);

export default CategoryDb;
