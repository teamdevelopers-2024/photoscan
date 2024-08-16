

const login = async (req,res)=>{
    try {
        const {email , password } = req.body
        const isEmail = process.env.ADMIN_EMAIL;
        const isPassword = process.env.ADMIN_PASSWORD;

        
    } catch (error) {
        
    }
}


export default {
    login
}