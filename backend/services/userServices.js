import validator from 'validator';

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
