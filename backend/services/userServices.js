import validator from 'validator';
import UserDb from '../model/userModel.js';
import OtpDb from '../model/otpModel.js';
import jwt from 'jsonwebtoken'


export async function loginValidation(email, password , res) {


    if (!email) {
       return res.status(400).json({
            error:true ,
            message:'email is required',
            field:'email'
        })
    } else if (!validator.isEmail(email)) {
       return res.status(400).json({
            error:true ,
            message:'invalid email address',
            field:'email'
        })
    }

    // Password validation
    if (!password) {
        return res.status(400).json({
            error:true ,
            message:'password is required',
            field:'password'
        })
    } else if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({
            error:true ,
            message:'password must need 6 or more letters',
            field:'password'
        })
    }


    return false
}





export async function registerValidation(body,res){
    try {
        console.log(body)
        const { email, password, firstName,lastName, confirmPassword } = body;
        
        // Validation checks
        let errors = [];
        
        if(!email || !validator.isEmail(email)){
            errors.push('invalid email or email not found')
        }

         if (!firstName || validator.isEmpty(firstName.trim())) {
            errors.push('user name is required.');
        }

        if (!password || password.length < 6) {
            errors.push('Password must be at least 6 characters long.');
        }

        if (password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }

        return errors

    } catch (error) {
        console.log(error)
    }
}



export async function isEmailisExist( email ){
    try {
            const result = await UserDb.findOne({ email:email})
            return result
    } catch (error) {
        console.log(error)
    }
}



export async function isverifyOtp(email) {
    try{
        console.log(email);
        const result=await OtpDb.findOne({userEmail:email})
        return result
    }
    catch(error){
        console.log(error);
    }
    
}




export async function decodeToken(token){
    try {
     const result =  jwt.verify(token,process.env.ACCESS_TOKEN_PRIVAT_KEY)
     console.log('decode result :  ' ,result)
     return result
    } catch (error) {
        console.log(error)
    }
}