import  argon2  from "argon2";
import UserDb from "../model/userModel.js";
import generateToken from "../services/generateToken.js";
import { isEmailisExist, loginValidation, registerValidation } from "../services/userServices.js";



const login = async (req,res)=>{
    try {
        const {email , password} = req.body
        const result = await loginValidation(email , password , res)
        if(result != false) return 
        const isUser = await UserDb.findOne({email:email})
        if(!isUser){
            return res.status(404).json({
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
            refreshToken: token.refreshToken,
          });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error });
    }
}



export default {
    login,
    register
}