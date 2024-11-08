import argon2 from "argon2";
import UserDb from "../model/userModel.js";
import generateToken from "../services/generateToken.js";
import validator from "validator";
import { decodeToken, isEmailisExist, isverifyOtp, loginValidation, registerValidation } from "../services/userServices.js";
import { sendOPTVerificationEmail } from "../services/generateOtp.js";
import OtpDb from "../model/otpModel.js";
import TokenDb from "../model/tokenMode.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose"; // Ensure mongoose is imported
import BannerDb from "../model/bannerModal.js";
import verifyRefreshTokenFn from "../services/verifyRefreshTokenFn.js";
import "dotenv/config";
import ProductDb from "../model/prodectModel.js";
import CategoryDb from "../model/Category.js";
import CartDb from "../model/cartModel.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the login input
    const result = await loginValidation(email, password, res);
    if (result !== false) return;

    // Find the user in the database
    const isUser = await UserDb.findOne({ email: email });

    if (!isUser) {
      return res.status(400).json({
        error: true,
        message: 'User does not exist',
        field: 'email'
      });
    }
    const passResult = await argon2.verify(isUser.password, password);

    if (!passResult) {
      return res.status(400).json({
        error: true,
        message: 'Incorrect password',
        field: 'password'
      });
    }


    if (isUser.isBlocked == true) {
      return res.status(400).json({
        error: true,
        message: "The User Is Blocked"
      })

    }

    // Generate tokens
    const tokens = await generateToken(isUser);
    const { accessToken, refreshToken } = tokens;

    // Set the tokens as HTTP-only cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/user/refresh-token',
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    // Respond with a success message
    res.status(200).json({
      error: false,
      message: "User logged in successfully",
      user: isUser
    });
  } catch (error) {
    console.log('Error during login:', error);
    res.status(500).json({
      error: true,
      message: 'Internal server error'
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, confirmPassword, phoneNumber } = req.body;


    const errors = await registerValidation(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ error: true, message: errors[0] });
    }

    const result = await isEmailisExist(email, "user");
    if (result) {
      return res.status(409).json({ error: true, field: 'email', message: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = new UserDb({
      email,
      password: hashedPassword, // Note: you should hash the password before saving it
      firstName,
      lastName,
      phoneNumber: phoneNumber
    });

    const token = await generateToken(newUser);

    // Set the tokens as HTTP-only cookies
    res.cookie('accessToken', token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      path: '/user/refresh-token',
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    await newUser.save();
    res.status(201).json({
      error: false,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const getOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmail = await isEmailisExist(email);

    if (isEmail) {
      return res.status(400).json({
        error: true,
        message: 'User already exists'
      });
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: true, message: 'Invalid email address' });
    }

    const result = await sendOPTVerificationEmail(email);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getOtp:', error);
    res.status(500).json({ error: true, message: 'An error occurred while processing your request' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const result = await isverifyOtp(email);
    if (result) {
      const otpResult = await argon2.verify(result.otp, otp);
      if (otpResult) {
        await UserDb.updateOne({ email: email }, { verificationStatus: true });
        await OtpDb.deleteOne({ userEmail: email });
        res.status(200).json({
          error: false,
          message: "OTP successfully verified",
        });
      } else {
        res.status(400).json({
          error: true,
          message: "Invalid OTP",
        });
      }
    } else {
      res.status(403).json({
        error: true,
        message: "OTP is expired, please resend OTP",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Internal Server error",
    });
  }
};

const checkAuthenticate = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const id = req.query.id;

    if (!accessToken) {
      return res.status(400).json({
        error: true,
        message: 'Access token is required',
      });
    }

    const secretKey = process.env.ACCESS_TOKEN_PRIVAT_KEY;

    jwt.verify(accessToken, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: 'Invalid or expired access token',
        });
      }

      const userId = decoded.userId;
      const tokenInDb = await TokenDb.findOne({ userId: userId });

      const user = await UserDb.findOne({ _id: userId })

      if (tokenInDb) {
        return res.status(200).json({
          error: false,
          message: 'User authenticated',
          user: user
        });
      } else {
        return res.status(401).json({
          error: true,
          message: 'Token not found in database',
        });
      }
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const verifyRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        error: true,
        message: 'Refresh token is required',
      });
    }

    const result = await verifyRefreshTokenFn(refreshToken);

    if (result.error) {
      return res.status(403).json(result);
    }

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'Strict', // Prevent CSRF
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error verifying refresh token:', error);
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const fetchUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Access token is required",
      });
    }

    const decoded = decodeToken(token);
    const user = await UserDb.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      error: false,
      message: "User fetched successfully",
      user: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const logout = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
      return res.status(400).json({
        error: true,
        message: 'Tokens are required for logout',
      });
    }


    // if (!accessToken ) {
    //   return res.status(400).json({
    //     error: true,
    //     message: 'Tokens are required for logout',
    //   });
    // }

    // Clear the cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', {
      path: '/user/refresh-token', // Must match the path where the cookie was set
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
    });

    res.status(200).json({
      error: false,
      message: 'User logged out successfully',
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
};

const editProfile = async (req, res) => {
  const { currentEmail, updatedField, updatedValue } = req.body; // Destructure the fields from req.body

  console.log('Request Body:', req.body);

  // Check if currentEmail is provided
  if (!currentEmail || !updatedField || !updatedValue) {
    return res.status(400).json({ message: 'Current email, field to update, and new value are required.' });
  }

  try {
    // Update user details in the database based on the email
    const updateData = {};
    updateData[updatedField] = updatedValue; // Set the field to update with the new value

    // Update user details in the database
    const updatedUser = await UserDb.findOneAndUpdate(
      { email: currentEmail }, // Find user by currentEmail
      { $set: updateData }, // Use $set to update only the specified field
      { new: true, runValidators: true } // Return the updated document and apply schema validation
    );

    console.log('Updated Fields:', updateData);

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });

    await UserDb.updateOne({ _id: data.userId }, { $set: { active: false } })
    await TokenDb.deleteOne({ userId: data.userId, token: req.cookies.refreshToken })
    res.status(200).json({ error: false, message: 'Logged out successfully' });

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

const resetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmail = await isEmailisExist(email)

    if (!isEmail) {
      return res.status(400).json({
        error: true,
        message: 'user not found'
      })
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: true, message: 'invalid email address' });
    }

    const result = await sendOPTVerificationEmail(email)

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getOtp:', error);
    res.status(500).json({ error: true, message: 'An error occurred while processing your request' });
  }
};

const newPass = async (req, res) => {
  const { password, email } = req.body;

  if (!password) {
    return res.status(400).json({ error: true, message: 'Password is required.' });
  }

  try {
    // Find the user by email
    const user = await UserDb.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found.' });
    }

    // Compare new password with existing password
    const isSamePassword = await argon2.verify(user.password, password);

    if (isSamePassword) {

      return res.status(400).json({ error: true, message: 'New password cannot be the same as the old password.' });
    }

    // Hash the new password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Update the user's password in the database
    user.password = hashedPassword; // Update the user's password field
    await user.save(); // Save the user document

    res.status(200).json({ error: false, message: 'Password updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'An error occurred while updating the password.' });
  }
};

const changePass = async (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body.body.formData;

  // Check for required fields
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: true, message: 'All fields are required.' });
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: true, message: 'New password and confirmation do not match.' });
  }

  try {
    // Find the user by email
    const user = await UserDb.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found.' });
    }

    // Verify the current password
    const isCurrentPasswordValid = await argon2.verify(user.password, currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: true, message: 'Current password is incorrect.' });
    }

    // Compare new password with existing password
    const isSamePassword = await argon2.verify(user.password, newPassword);
    if (isSamePassword) {
      return res.status(400).json({ error: true, message: 'New password cannot be the same as the old password.' });
    }

    // Hash the new password using Argon2
    const hashedPassword = await argon2.hash(newPassword);

    // Update the user's password in the database
    user.password = hashedPassword; // Update the user's password field
    await user.save(); // Save the user document

    res.status(200).json({ error: false, message: 'Password updated successfully!' });
  } catch (error) {
    console.error("Error in changePass:", error); // Log the error for debugging
    res.status(500).json({ error: true, message: 'An error occurred while updating the password.' });
  }
};

const getProducts = async (req, res) => {
  try {
    const { catName } = req.query; // Extract catName from query parameters

    let filter = {};

    // If catName is provided, filter products by category
    if (catName) {
      filter = { category: catName }; // Adjust this to match the field name in your Product model
    }

    const products = await ProductDb.find(filter); // Apply filter to find products
    res.status(200).json({ error: false, message: 'Products fetched successfully', products });
  } catch (error) {
    console.error("Error in finding products:", error);
    res.status(500).json({ error: true, message: 'An error occurred while fetching products.' });
  }
};




async function getBanners(req, res) {
  try {
    const banners = await BannerDb.find()
    const datas = banners.map((item) => {
      return item.image
    })
    console.log(banners)
    res.status(200).json({
      error: false,
      data: datas,
      message: "Banners fetched successfullly"
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'An error occurred while fetching banners.' });
  }
}


async function getSingleProduct(req, res) {
  try {
    const { id } = req.query
    const data = await ProductDb.findOne({ _id: id })
    console.log(data)
    res.status(200).json({
      error: false,
      message: "Product data fetched successfully",
      data: data
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'An error occurred while fetching Product.' });
  }
}

async function getFeaturedProducts(req, res) {
  try {
    const featuredProducts = await ProductDb.find({ isFeatured: true }).limit(4);
    res.status(200).json({ error: false, message: "Featured Products fetched successfully", featuredProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "An error occured while fetching featured products" });
  }

}


async function getCategories(req, res) {
  try {
    // Fetch the first 4 categories from catdb
    const categories = await CategoryDb.find().limit(4);

    // For each category, fetch up to 10 products
    const productsByCategory = await Promise.all(
      categories.map(async (category) => {
        const products = await ProductDb.find({ category: category.name }) // Adjust filter based on your product schema
          .limit(10);
        return products; // Only return products for each category
      })
    );

    // Send the result with separate arrays for categories and products
    res.status(200).json({
      error: false,
      message: 'Categories and products fetched successfully',
      categories: categories, // Array of category details
      productsByCategory: productsByCategory, // Array of arrays, each containing products for a category
    });
  } catch (error) {
    console.error("Error fetching categories with products:", error);
    res.status(500).json({
      error: true,
      message: 'An error occurred while fetching categories and products.',
    });
  }
}

const addToCart = async (req, res) => {
  try {
    const { userId, productId, image, textInput } = req.body; // Destructure the data from req.body

    // Validate input
    if (!productId) {
      return res.status(400).json({ error: true, message: 'Product ID(s) are required.' });
    }

    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Find or create the cart for the user
    let cart = await CartDb.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new CartDb({
        userId,
        items: [{
          productId: productObjectId,
          image: image, // Store the single image URL
          textInput: textInput // Store the single text input
        }],
      });
    } else {
      // Always push a new item to the items array
      cart.items.push({
        productId: productObjectId,
        image: image,
        textInput: textInput,
      });
    }

    await cart.save(); // Save the cart

    res.status(200).json({ error: false, message: 'Products added to cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};






// async function getCart(req, res) {
//   try {

//     const userid = req.query.userid

//     const cartData = await CartDb.findOne({ userId: userid });

//     res.status(200).json({ error: false, message: 'Cart Items Fetched Successfully', cartData })

//   } catch (error) {

//     console.error('Error fetching to cart:', error);
//     res.status(500).json({ error: true, message: 'Internal server error' });
//   }

// }


async function getCart(req, res) {
  try {
    const userId = req.query.userid; // Get the user ID from the query

    // Use aggregation to fetch cart items and their associated product details
    const cartData = await CartDb.aggregate([
      { $match: { userId:new mongoose.Types.ObjectId(userId) } }, // Match cart by user ID
      {
        $unwind: "$items" // Deconstruct the items array
      },
      {
        $lookup: {
          from: "products", // Name of the products collection
          localField: "items.productId", // Field from cart items
          foreignField: "_id", // Field from products
          as: "productDetails" // Output array field
        }
      },
      {
        $unwind: { // Deconstruct the productDetails array
          path: "$productDetails",
          preserveNullAndEmptyArrays: true // Include cart items even if no product found
        }
      },
      {
        $project: { // Project fields to include in the output
          _id: 1,
          userId: 1,
          "items.productId": 1,
          "items.image": 1,
          "items.textInput": 1,
          "productDetails.productName": "$productDetails.productName",
          "productDetails.offerPrice": "$productDetails.offerPrice",
          "productDetails.image": { $arrayElemAt: ["$productDetails.images", 0] } // Get the first image
        }
      },
      {
        $group: { // Group items back into an array
          _id: "$_id",
          userId: { $first: "$userId" },
          items: {
            $push: {
              productId: "$items.productId",
              image: "$productDetails.image",
              textInput: "$items.textInput",
              productName: "$productDetails.productName",
              productprice: "$productDetails.offerPrice"
            }
          }
        }
      }
    ]);


    // If no cart found, respond accordingly
    if (!cartData || cartData.length === 0) {
      return res.status(404).json({ error: true, message: 'Cart not found' });
    }

    // Respond with enriched cart data
    res.status(200).json({ error: false, message: 'Cart Items Fetched Successfully', cartData: cartData[0] });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
}







// Export the controller
export default {
  login,
  register,
  getOtp,
  verifyOtp,
  checkAuthenticate,
  verifyRefreshToken,
  logout,
  editProfile,
  fetchUser,
  resetOtp,
  newPass,
  changePass,
  getProducts,
  getBanners,
  getSingleProduct,
  getFeaturedProducts,
  getCategories,
  addToCart,
  getCart
}
