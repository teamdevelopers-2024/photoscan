import argon2 from "argon2";
import UserDb from "../model/userModel.js";
import generateToken from "../services/generateToken.js";
import validator from "validator";
import { decodeToken, isEmailisExist, isverifyOtp, loginValidation, registerValidation } from "../services/userServices.js";
import { sendOPTVerificationEmail } from "../services/generateOtp.js";
import OtpDb from "../model/otpModel.js";
import TokenDb from "../model/tokenMode.js";
import jwt from 'jsonwebtoken'
import verifyRefreshTokenFn from "../services/verifyRefreshTokenFn.js";
import "dotenv/config"
import path from "path";


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the login input
    const result = await loginValidation(email, password, res);
    if (result !== false) return;

    // Find the user in the database
    const isUser = await UserDb.findOne({ email: email });


    const passResult = await argon2.verify(isUser.password , password)
    if (!isUser) {
      return res.status(400).json({
        error: true,
        message: 'User does not exist',
        field: 'email'
      });
    }
    
    if(!passResult){
      return res.status(400).json({
        error: true,
        message: 'incorrect password',
        field: 'password'
      });
    }
    // Generate tokens
    const tokens = await generateToken(isUser);
    const { accessToken, refreshToken } = tokens;

    // Set the tokens as HTTP-only cookies
    // Set a cookie that expires in 30 days
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/user/refresh-token',
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict',
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
    const { email, password, name, confirmPassword, phoneNumber } = req.body;
    console.log('coming here')
    const errors = await registerValidation(req.body)
    if (errors.length > 0) {
      return res.status(400).json({ error: true, message: errors[0] });
    }


    const result = await isEmailisExist(email, "user");

    if (result) {
      return res.status(409).json({ error: true, field: 'email', message: "User already exists" });
    }


    const hashedpassword = await argon2.hash(password);


    const newUser = new UserDb({
      email,
      password: hashedpassword, // Note: you should hash the password before saving it
      name,
      phoneNumber: phoneNumber
    });

    console.log(newUser);
    const token = await generateToken(newUser);
    console.log(token);
    // Set the tokens as HTTP-only cookies
    // Set a cookie that expires in 30 days
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
}


const getOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmail = await isEmailisExist(email)

    if (isEmail) {
      return res.status(400).json({
        error: true,
        message: 'user is already exist'
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


const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    console.log(req.body);

    console.log(otp, email);
    const result = await isverifyOtp(email);
    if (result) {
      const otpResult = await argon2.verify(result.otp, otp);
      if (otpResult) {
        await UserDb.updateOne({ email: email }, { verificationStatus: true });
        await OtpDb.deleteOne({ userEmail: email });
        res.status(200).json({
          error: false,
          message: "otp successfully verified",
        });
      } else {
        res.status(400).json({
          error: true,
          message: "Invalid Otp",
        });
      }
    } else {
      res.status(403).json({
        error: true,
        message: "otp is expired please resent otp",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Internal Server error",
    });
  }
}




const checkAuthenticate = async (req, res) => {
  try {
    // Extract accessToken from cookies
    const accessToken = req.cookies.accessToken;
    const id = req.query.id;
    console.log('Access Token from Cookie:', accessToken);

    // Verify the access token
    if (!accessToken) {
      return res.status(400).json({
        error: true,
        message: 'Access token is required',
      });
    }

    // Use the secret key to verify the JWT
    const secretKey = process.env.ACCESS_TOKEN_PRIVAT_KEY;

    jwt.verify(accessToken, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: true,
          message: 'Invalid or expired access token',
        });
      }

      // Extract userId from decoded token
      const userId = decoded.userId;

      // Check if the refresh token exists in the database
      const tokenInDb = await TokenDb.findOne({ userId: userId });
      const user = await UserDb.findOne({_id:userId})
      if (tokenInDb) {
        console.log('User authenticated successfully');
        return res.status(200).json({
          error: false,
          message: 'User authenticated',
          user:user
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
    // Extract refreshToken from cookies
    const refreshToken = req.cookies.refreshToken;
    console.log('Inside refreshToken verification function');

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
    const token = req.cookies.accessToken
    const userDetails = await decodeToken(token)
    const user = await UserDb.findOne({ _id: userDetails.userId })
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "token is invalid or user is not exist "
      })
    }

    res.status(200).json({
      error: false,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
}


const logout = async (req, res) => {
  try {

    const data = await decodeToken(req.cookies.accessToken)
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true if you use HTTPS
      sameSite: 'strict'
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true if you use HTTPS
      sameSite: 'strict'
    });
    await UserDb.updateOne({ _id: data.userId }, { $set: { active: false } })
    await TokenDb.deleteOne({ userId: data.userId , token : req.cookies.refreshToken })
    res.status(200).json({ error: false, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: true, message: 'Logout failed' });
  }
}


export default {
  login,
  register,
  getOtp,
  verifyOtp,
  checkAuthenticate,
  verifyRefreshToken,
  logout
}
