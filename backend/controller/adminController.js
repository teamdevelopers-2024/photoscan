
import FrameDb from "../model/prodectModel.js";
import UserDb from "../model/userModel.js";



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
  const addframes = async (req, res) => {
    if (req.body) {
        try {
          
            // Extract properties from request body
            const data = req.body.data;
            console.log(data);

            // Create a new frame document
            const newFrame = new FrameDb({
                productname: data.productName,
                productdescription: data.description,
                productprice: data.price,
                image: data.image
            });

            // Save the new frame to the database
            await newFrame.save();

            // Send success response
            res.status(201).json({ message: 'Product saved successfully' });

        } catch (error) {
            // Log the error and send a response with the error details
            console.error('Error saving product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Send a response indicating that the request body is missing
        console.error('Request body is missing');
        res.status(400).json({ error: 'Request body is missing' });
    }
};

const getframes = async (req, res) => {
  try {
    // Retrieve all frames from the database
    const data = await FrameDb.find();
    
    // Send a success response with the retrieved data
    res.status(200).json(data);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error fetching frames:', error);
    res.status(500).json({ error: 'Internal Server Error. Error while getting frames' });
  }
};



const getUsers = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;


    const startIndex = (page - 1) * limit;

    // Fetch users with pagination
    const users = await UserDb.find().skip(startIndex).limit(limit);
    console.log(users);
    
    const totalUsers = await UserDb.countDocuments(); 

    if (!users.length) {
      return res.status(200).json({
        error: false,
        users: [],
        message: "No users found",
      });
    }

    res.status(200).json({
      error: false,
      message: "Users fetched successfully",
      users: users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers: totalUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
};



export default {
    login,
    status,
    getUsers,
    addframes,
    getframes,
}