import  argon2  from "argon2";
import UserDb from "../model/userModel.js";
import generateToken from "../services/generateToken.js";
import validator from "validator";
import { isEmailisExist, isverifyOtp, loginValidation, registerValidation } from "../services/userServices.js";
import { sendOPTVerificationEmail } from "../services/generateOtp.js";
import OtpDb from "../model/otpModel.js";
import TokenDb from "../model/tokenMode.js";
import jwt from 'jsonwebtoken'
import verifyRefreshTokenFn from "../services/verifyRefreshTokenFn.js";
import "dotenv/config"


const login = async (req,res)=>{
    try {
        const {email , password} = req.body
        const result = await loginValidation(email , password , res)
        if(result != false) return
        const isUser = await UserDb.findOne({email:email})
        if(!isUser){
            return res.status(400).json({
                error:true,
                message:'User is not exist'
            })
        }
        const token = await generateToken(isUser);
        res.status(200).json({
            error:false,
            message:"user logged in Successfully",
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        })
    } catch (error) {
        console.log(error)
    }
}


const register = async (req,res)=>{
    try {
        const { email, password, name, confirmPassword ,phoneNumber} = req.body;
        console.log('coming here')
        const errors = await registerValidation(req.body)
        if (errors.length > 0) {
            return res.status(400).json({ error: true, message: errors[0] });
          }


          const result = await isEmailisExist(email, "user");

          if (result) {
            return res.status(409).json({ error: true ,field:'email' , message:"User already exists"});
          }


          const hashedpassword = await argon2.hash(password);


          const newUser = new UserDb({
            email,
            password: hashedpassword, // Note: you should hash the password before saving it
            name,
            phoneNumber:phoneNumber
          });

          console.log(newUser);
          const token = await generateToken(newUser);
          console.log(token);
          await newUser.save();
          res.status(201).json({
            error: false,
            message: "User registered successfully.",
            accessToken: token.accessToken,
            email: email,
            refreshToken: token.refreshToken,
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

      if(isEmail){
        return res.status(400).json({
          error:true ,
          message :'user is already exist'
        })
      }
  
      // Check if email is valid
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: true , message:'invalid email address' });
      }
  
      const result = await sendOPTVerificationEmail(email)
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getOtp:', error);
      res.status(500).json({ error: true , message:'An error occurred while processing your request' });
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
      const accessToken = req.headers['authorization'];
      const id = req.query.id;
      console.log(accessToken)
      // Verify the access token
      if (!accessToken) {
        return res.status(400).json({
          error: true,
          message: 'Access token is required',
        });
      }
  
      // Replace 'your-secret-key' with the actual secret key used to sign your JWT
      const secretKey = process.env.ACCESS_TOKEN_PRIVAT_KEY

      jwt.verify(accessToken, secretKey, async (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: true,
            message: 'Invalid or expired access token',
          });
        }   



        const userId = decoded.userId;
        console.log('userId : ', decoded)
        const tokenInDb = await TokenDb.findOne({ userId:userId});
        if (tokenInDb) {
          console.log('success')
          return res.status(200).json({
            error: false,
            message: 'User authenticated',
          });
        } else {
          return res.status(401).json({
            error: true,
            message: 'Token not found in database',
          });
        }
      });
    } catch (error) {
      console.log(error)
      console.error('Error during authentication:', error);
      res.status(500).json({
        error: true,
        message: 'Internal server error',
      });
    }
  };





  const verifyRefreshToken =async (req,res)=>{
    const { refreshToken } = req.body;
    console.log('coming inside refreshToken Function')
    const result = await verifyRefreshTokenFn(refreshToken);

    if (result.error) {
        return res.status(403).json(result);
    }

    res.status(200).json(result);
  }

export default {
    login,
    register,
    getOtp,
    verifyOtp,
    checkAuthenticate,
    verifyRefreshToken
}