

const login = async (req,res)=>{
    try {
        const {email , password } = req.body
        const isEmail = process.env.ADMIN_USERNAME;
        const isPassword = process.env.ADMIN_PASSWORD;

        if(email != isEmail){
            return res
            .status(400)
            .json({error:true , message:"email is incorrect"})
        }
        if(password != isPassword){
            return res
            .status(400)
            .json({error:true , message:"password is incorrect"})
        }
        req.session.isAdmin = true 
        res.status(200).json({
            error:false,
            message:"admin logged in successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true , 
            message:"internel server error"
        })
    }
}


const status = async (req, res) => {
    console.log("isAdmin", req.session.isAdmin);
    if (req.session.isAdmin) {
      res.status(200).json({ loggedIn: true });
    } else {
      console.log("here");
      res.status(401).json({ loggedIn: false });
    }
  };


export default {
    login,
    status
}