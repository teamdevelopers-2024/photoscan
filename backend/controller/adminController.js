
import BannerDb from "../model/bannerModal.js";
import CategoryDb from "../model/Category.js";
import OfferDb from "../model/offerModel.js";
import ProductDb from "../model/prodectModel.js";
import UserDb from "../model/userModel.js";
import productDB from "../model/prodectModel.js"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dpjzt7zwf',
  api_key: '442368726761269',
  api_secret: 'DueiTABSuPgrkBrs5OJeSBQMNTQ',
});

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
        publicId: data.publicId
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
const addProduct = async (req, res) => {
  if (req.body) {
      try {
          // Extract properties from request body
          const {
              productName,
              category,
              sizes, 
              description,
              actualPrice,
              offerPrice,
              images 
          } = req.body;
          // Create a new product document
          const newProduct = new productDB({
              productName,
              category,
              sizes,
              description,
              actualPrice,
              offerPrice,
              images,
              status:true,
              catoffer:0,
              catstatus:true
          });

          // Save the new product to the database
          await newProduct.save();

          // Send success response
          res.status(201).json({ message: 'Product added successfully' });

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
const getProducts = async (req, res) => {
  try {
    // Retrieve all frames from the database
    const data = await productDB.find();
    
    // Send a success response with the retrieved data
    res.status(200).json(data);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error fetching Products:', error);
    res.status(500).json({ error: 'Internal Server Error. Error while getting Products' });
  }
};
const deleteBanner = async (req, res) => {
  const publicId=req.body.publicId;
  try {
    const result1 = await BannerDb.deleteOne({publicId:publicId})
    const result = await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ success: true, result,result1 });
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    res.status(500).json({ success: false, error });
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




async function addCategory(req, res) {
  try {
    let { name, subcategories } = req.body;
    name = name.toUpperCase();
    
    // Check if name is provided
    if (!name) {
      return res.status(400).json({
        error: true,
        message: "Name is required",
      });
    }

    // Check if the category name already exists
    const exist = await CategoryDb.findOne({ name: name });
    if (exist) {
      return res.status(400).json({
        error: true,
        message: "Category already exists",
      });
    }

    // Validate and process subcategories if provided
    if (subcategories) {
      if (!Array.isArray(subcategories)) {
        return res.status(400).json({
          error: true,
          message: "Subcategories should be an array",
        });
      }
      // Convert subcategory names to uppercase and remove duplicates
      subcategories = [...new Set(subcategories.map(sub => sub.toUpperCase()))];
    }


    await CategoryDb.create({
      name: name,
      subcategories: subcategories.map(sub => ({ name: sub })), // save each as an object with a `name` property
    });

    res.status(200).json({
      error: false,
      message: "Category added successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}

async function addOffer(req, res) {
  try {
    const { offerType, discountPercentage, categoryName } = req.body;

    if (!offerType && !discountPercentage && categoryName) {
      return res.status(400).json({
        error: true,
        message: "Everything is required",
      });
    }
    await OfferDb.create({
      offerType: offerType,
      discountPercentage: discountPercentage,
      categoryName: categoryName,
    });
    await productDB.updateMany({category:categoryName},{catoffer:discountPercentage});
    res.status(200).json({
      error: false,
      message: "Offer added successfully!",
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }



}
const getOffers = async (req, res) => {
  try {
    // Retrieve all frames from the database
    const data = await OfferDb.find();

    // Send a success response with the retrieved data
    res.status(200).json(data);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Internal Server Error. Error while getting Banners' });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const  id = req.query.id;  
    console.log('adminController', id)

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Offer ID is required"
      });
    }

    // Find and delete the offer by ID
    console.log('offer deleted')
    const categoryName=await OfferDb.findOne({_id:id});
    const deletedOffer = await OfferDb.findByIdAndDelete(id);
    
    await productDB.updateMany({category:categoryName.categoryName},{catoffer:0})

    if (!deletedOffer) {
      return res.status(404).json({
        error: true,
        message: "Offer not found"
      });
    }

    // Send success response
    res.status(200).json({
      error: false,
      message: "Offer deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({
      error: true,
      message: "Internal server error while deleting offer",
      error,
    });
  }
};






async function getCategories(req, res) {
  try {
    let obj = {}
    const active = req.query.active
    console.log(active)
    if (active) {
      obj = {
        isActive: active
      }
    }
    const data = await CategoryDb.find(obj)
    console.log(data)
    res.status(200).json({
      error: false,
      data: data
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



async function categoryActive(req, res) {
  try {
    const id = req.query.id
    const data = await CategoryDb.findOneAndUpdate(
      { _id: id },
      [{ $set: { isActive: { $not: "$isActive" } } }]  // Use aggregation to invert the isActive value
    );
    const  activeststus=!data.isActive

    await productDB.updateMany({category:data.name},{catstatus:activeststus});

    res.status(200).json({
      error: false,
      message: "active status updated successfully"
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
async function logout(req, res) {
  try {
    req.session.isAdmin = false
    res.status(200).json({
      error: false,
      message: "admin logged out successfully"
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}



async function blockUser(req, res) {
  try {
    const { id } = req.body
    if (!id) {
      return res.status(400).json({
        error: true,
        message: "id is required"
      })
    }

    const current = await UserDb.findOne({ _id: id })
    const newStatus = !current.isBlocked
    await UserDb.updateOne({ _id: id }, { $set: { isBlocked: newStatus } })
    res.status(200).json({
      error: false,
      message: "user blocked successfully"
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

async function updateFeatured(req,res) {
  try {
    const {id , detail} = req.body  
    console.log(id ,detail)
    await productDB.updateOne({_id:id },{$set:detail})
    res.status(200).json({
      error:false,
      message:"successfull"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error:false,
      message:"internel Server error"
    })
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
    categoryActive,
    blockUser,
    logout,
    deleteBanner,
    addProduct,
    getProducts,
    getOffers,
    addOffer,
    deleteOffer,
    updateFeatured
}