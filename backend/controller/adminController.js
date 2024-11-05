
import BannerDb from "../model/bannerModal.js";
import CategoryDb from "../model/Category.js";
import ProductDb from "../model/prodectModel.js";
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
  const addBanner = async (req, res) => {
    if (req.body) {
        try {
          
            // Extract properties from request body
            const data = req.body.data;
            console.log(data);

            // Create a new frame document
            const newBanner = new BannerDb({
                image: data.imageUrl,
                publicId:data.publicId
            });

            // Save the new frame to the database
            await newBanner.save();

            // Send success response
            res.status(201).json({ message: 'Banner added successfully' });

        } catch (error) {
            // Log the error and send a response with the error details
            console.error('Error saving banner:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Send a response indicating that the request body is missing
        console.error('Request body is missing');
        res.status(400).json({ error: 'Request body is missing' });
    }
};

const getBanners = async (req, res) => {
  try {
    // Retrieve all frames from the database
    const data = await BannerDb.find();
    
    // Send a success response with the retrieved data
    res.status(200).json(data);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Internal Server Error. Error while getting Banners' });
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




async function addCategory(req,res) {
  try {
    const {name , image} = req.body
    if(!name){
       return res.status(400).json({
        error:true,
        message:"name and image is required"
       })
    }
    await CategoryDb.create({
      name:name
    })
    res.status(200).json({
      error:false,
      message:"Category Added Successfully..!"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}



async function getCategories(req,res) {
  try {
    let obj = {}
    const active = req.query.active
    console.log(active)
    if(active){
      obj = {
        isActive :active
      }
    }
    const data = await CategoryDb.find(obj)
    console.log(data)
    res.status(200).json({
      error:false,
      data:data
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}



async function updateActive(req,res) {
  try {
    const id = req.query.id
    await CategoryDb.updateOne(
      { _id: id },
      [{ $set: { isActive: { $not: "$isActive" } } }]  // Use aggregation to invert the isActive value
    );
    res.status(200).json({
      error:false,
      message:"active status updated successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}
async function logout(req,res){
  try {
    req.session.isAdmin = false
    res.status(200).json({
      error:false,
      message:"admin logged out successfully"
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}



async function blockUser(req,res) {
  try {
    const {id} = req.body
    if(!id){
      return res.status(400).json({
        error:true ,
        message:"id is required"
      })
    }

    const current = await UserDb.findOne({_id:id})
    const newStatus = !current.isBlocked
    await UserDb.updateOne({_id:id},{$set:{isBlocked:newStatus}})
    res.status(200).json({
      error:false,
      message:"user blocked successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}

export default {
    login,
    status,
    getUsers, 
    addBanner,
    getBanners,
    addCategory,
    getCategories,
    updateActive,
    blockUser,
    logout,
}