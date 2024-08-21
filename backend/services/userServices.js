import validator from 'validator';
import UserDb from '../model/userModel.js';

export async function loginValidation(email, password , res) {


    if (!email) {
       return res.status(400).json({
            error:true ,
            message:'email is required'
        })
    } else if (!validator.isEmail(email)) {
       return res.status(400).json({
            error:true ,
            message:'invalid email address'
        })
    }

    // Password validation
    if (!password) {
        res.status(400).json({
            error:true ,
            message:'password is required'
        })
    } else if (!validator.isLength(password, { min: 6 })) {
        res.status(400).json({
            error:true ,
            message:'password must need 6 or more letters'
        })
    }


    return false
}





export async function registerValidation(body,res){
    try {
        console.log(body)
        const { email, password, name, confirmPassword } = body;
        
        // Validation checks
        let errors = [];
        
        if(!email || !validator.isEmail(email)){
            errors.push('invalid email or email not found')
        }

         if (!name || validator.isEmpty(name.trim())) {
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



export async function isEmailisExist( email  ){
    try {
            const result = await UserDb.findOne({ email:email})
            return result
    } catch (error) {
        console.log(error)
    }
}
