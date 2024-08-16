
const adminAuth = async (req,res,next)=>{
    try {
        console.log('Session in adminAuth middleware:', req.session); // Debug statement
        if(req.session.isAdmin){
           return next()
        }else{
            res.status(403).json({
                error:true ,
                message:"Access Denied : Admin is not Authenticated"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true ,
            message:"internel Server Error"
        })
    }
}

export default adminAuth