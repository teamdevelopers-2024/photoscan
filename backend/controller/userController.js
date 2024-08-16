import UserDb from "../model/userModel.js";
import { loginValidation } from "../services/userServices.js";


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
        res.status(200).json({
            error:false,
            message:"user logged in Successfully",
            user:isUser
        })
    } catch (error) {
        console.log(error)
    }
}



export default {
    login
}