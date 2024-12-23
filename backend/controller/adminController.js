
import BannerDb from "../model/bannerModal.js";
import CategoryDb from "../model/Category.js";
import OfferDb from "../model/offerModel.js";
import UserDb from "../model/userModel.js";
import productDB from "../model/prodectModel.js"
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken'
import OrderDb from "../model/orderModal.js";

cloudinary.config({
  cloud_name: 'dpjzt7zwf',
  api_key: '442368726761269',
  api_secret: 'DueiTABSuPgrkBrs5OJeSBQMNTQ',
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const isEmail = process.env.ADMIN_USERNAME;
    const isPassword = process.env.ADMIN_PASSWORD;

    if (email != isEmail) {
      return res
        .status(400)
        .json({ error: true, message: "email is incorrect" })
    }
    if (password != isPassword) {
      return res
        .status(400)
        .json({ error: true, message: "password is incorrect" })
    }


    const token = jwt.sign({ isAdmin: true }, process.env.ACCESS_TOKEN_PRIVAT_KEY, { expiresIn: "1h" });
    res.cookie("token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
     });
    res.status(200).json({
      error: false,
      message: `admin Logged in Successfull`
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: "internel server error"
    })
  }
}
const status = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Get the token from cookie or Authorization header

  if (!token) {
    console.log(token , "token is undefined")
      return res.status(401).json({ loggedIn: false }); // No token provided
  }

  try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVAT_KEY);
      
      // Check if the token payload has an `isAdmin` field (set when the token is created during login)
      if (decoded.isAdmin) {
          return res.status(200).json({ loggedIn: true });
      } else {
        console.log("inside decoded.admin")
          return res.status(401).json({ loggedIn: false });
      }
  } catch (error) {
    console.log(error)
      // If verification fails, respond with loggedIn: false
      return res.status(401).json({ loggedIn: false });
  }
};


const addBanner = async (req, res) => {
  if (req.body) {
    try {
      const data = req.body.data;
      (data);
      const newBanner = new BannerDb({
        image: data.imageUrl,
        publicId: data.publicId
      });
      await newBanner.save();
      res.status(201).json({ message: 'Banner added successfully' });

    } catch (error) {
      console.error('Error saving banner:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    console.error('Request body is missing');
    res.status(400).json({ error: 'Request body is missing' });
  }
};
const addProduct = async (req, res) => {
  if (req.body) {
    try {
      const {
        productName,
        category,
        sizes,
        description,
        actualPrice,
        offerPrice,
        images,
        numberOfTextFields,
        includeLogo,
        imageCount
      } = req.body;
      const newProduct = new productDB({
        productName,
        category,
        sizes,
        description,
        actualPrice,
        offerPrice,
        images,
        status: true,
        catoffer: 0,
        catstatus: true,
        includelogo: includeLogo,
        textfeild: numberOfTextFields,
        imageCount
      });

      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully' });

    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    console.error('Request body is missing');
    res.status(400).json({ error: 'Request body is missing' });
  }
};

const getBanners = async (req, res) => {
  try {
    const data = await BannerDb.find();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Internal Server Error. Error while getting Banners' });
  }
};
const getProducts = async (req, res) => {
  try {
    const { status } = req.query
    const data = await productDB.find({ status: status });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Products:', error);
    res.status(500).json({ error: 'Internal Server Error. Error while getting Products' });
  }
};
const deleteBanner = async (req, res) => {
  const publicId = req.body.publicId;
  try {
    const result1 = await BannerDb.deleteOne({ publicId: publicId })
    const result = await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ success: true, result, result1 });
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


    const users = await UserDb.find().skip(startIndex).limit(limit);

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
    console.error(error);
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
    if (!name) {
      return res.status(400).json({
        error: true,
        message: "Name is required",
      });
    }
    const exist = await CategoryDb.findOne({ name: name });
    if (exist) {
      return res.status(400).json({
        error: true,
        message: "Category already exists",
      });
    }
    if (subcategories) {
      if (!Array.isArray(subcategories)) {
        return res.status(400).json({
          error: true,
          message: "Subcategories should be an array",
        });
      }
      subcategories = [...new Set(subcategories.map(sub => sub.toUpperCase()))];
    }


    await CategoryDb.create({
      name: name,
      subcategories: subcategories.map(sub => ({ name: sub })),
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
    await productDB.updateMany({ category: categoryName }, { catoffer: discountPercentage });
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
    const data = await OfferDb.find();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Internal Server Error. Error while getting Banners' });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Offer ID is required"
      });
    }
    const categoryName = await OfferDb.findOne({ _id: id });
    const deletedOffer = await OfferDb.findByIdAndDelete(id);

    await productDB.updateMany({ category: categoryName.categoryName }, { catoffer: 0 })

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
    if (active) {
      obj = {
        isActive: active
      }
    }
    const data = await CategoryDb.find(obj)
    res.status(200).json({
      error: false,
      data: data
    })
  } catch (error) {
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
      [{ $set: { isActive: { $not: "$isActive" } } }]
    );
    const activeststus = !data.isActive

    await productDB.updateMany({ category: data.name }, { catstatus: activeststus });

    res.status(200).json({
      error: false,
      message: "active status updated successfully"
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}
async function logout(req, res) {
  try {
      // Clear the token by setting an empty cookie with an immediate expiry
      res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      
      res.status(200).json({
          error: false,
          message: "Admin logged out successfully"
      });
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
    res.status(500).json({
      error: true,
      message: "Internal server error",
      error,
    });
  }
}

async function updateFeatured(req, res) {
  try {
    const { id, detail } = req.body
    await productDB.updateOne({ _id: id }, { $set: detail })
    res.status(200).json({
      error: false,
      message: "successfull"
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "internel Server error"
    })
  }

}
async function getCardData(req, res) {
  try {
    const totalCustomers = await UserDb.countDocuments();

    const totalOrders = await OrderDb.countDocuments();


    const orders = await OrderDb.find({})
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);


    res.status(200).json({
      error: false,
      data: { totalCustomers, totalOrders, totalSales, orders },
    });
  } catch (error) {
    console.error("Error fetching card data:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
}


async function updateProductStatus(req, res) {
  try {
    const { id } = req.body
    if (!id) {
      return res.status(403).json({
        error: true,
        message: "id is required"
      })
    }

    await productDB.findOneAndUpdate(
      { _id: id },
      [{ $set: { status: { $not: ["$status"] } } }],
      { new: true }
    );


    res.status(200).json({
      error: false,
      message: "product status updated successfully"
    })
  } catch (error) {
    res.status(500).json({
      error: false,
      message: "internel Server error"
    })
  }
}
async function updateProduct(req, res) {
  const { id, product } = req.body
  try {
    await productDB.updateOne({ _id: id }, {
      productName: product.productName,
      description: product.description,
      actualPrice: product.actualPrice,
      offerPrice: product.offerPrice,
    })

    res.status(200).json({
      error: false,
      message: "product  updated successfully"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: false,
      message: "internel Server error"
    })
  }
}
// Controller function for getting orders with pagination
async function getOrder(req, res) {
  try {
    
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = 7; // Set the number of orders per page
    const skip = (page - 1) * limit; // Calculate the number of orders to skip
    console.log(req.query , " this is page")
    // Find orders and paginate using skip and limit
    const orders = await OrderDb.find().skip(skip).limit(limit);

    // Get total number of orders to calculate total pages
    const totalOrders = await OrderDb.countDocuments();

    // Send response with orders and pagination info
    res.status(200).json({
      error: false,
      data: orders,
      totalOrders: totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { id, status } = req.body

    await OrderDb.updateOne({ orderId: id }, { status: status });
    const data = await OrderDb.findOne({ orderId: id })
    console.log(data);

    res.status(200).json({
      error: false,
      data: data
    })
  } catch (error) {
    res.status(500).json({
      error: false,
      message: "internel Server error"
    })
  }
}
// Get sales data
const getGraphData = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const pastYears = Array.from({ length: 5 }, (_, i) => currentYear - (4 - i)); // Generate array of years from 5 years ago to current year

    // Fetch categories from the CategoryDb collection
    const categories = await CategoryDb.find({});

    // Aggregate query to get total sales for each month in the last 5 years
    const salesData = await OrderDb.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(`${pastYears[0]}-01-01`), // Start of the 5th past year
            $lt: new Date(`${currentYear + 1}-01-01`) // Start of the next year
          }
        }
      },
      {
        $project: {
          year: { $year: "$orderDate" },
          month: { $month: "$orderDate" },
          totalAmount: 1,
          products: 1 // Include products for category aggregation
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalSales: { $sum: "$totalAmount" },
          products: { $push: "$products" } // Collect all products for aggregation
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": 1 } // Sort by year descending, month ascending
      }
    ]);
    const topData = await OrderDb.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(`${pastYears[0]}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $unwind: "$products"
      },
      {
        $group: {
          _id: "$products.productId", // Group by product ID
          productName: { $first: "$products.productName" }, // Assuming each product has a name
          totalSalesCount: { $count: {} }, // Count the product occurrences as the total quantity sold
          totalSalesAmount: { $sum: "$products.price" } // Sum of prices for total sales revenue
        }
      },
      {
        $sort: { totalSalesCount: -1 } // Sort by total sales amount in descending order
      },
      {
        $limit: 5 // Limit to top 5 products
      }
    ]);
    const topSellingProducts = topData.map((product) => ({
      productId: product._id,
      productName: product.productName,
      totalQuantity: product.totalSalesCount,
      totalSales: product.totalSalesAmount
    }));

    // Structure data for monthly and yearly sales
    const monthlyData = {};
    const categoryData = {}; // To store category-based sales data
    let categoryNames;
    let categoryValues;

    salesData.forEach(row => {
      const { year, month } = row._id;
      const { products } = row;

      // Monthly data aggregation
      if (!monthlyData[year]) {
        monthlyData[year] = Array(12).fill(0); // Initialize array for months
      }
      monthlyData[year][month - 1] = row.totalSales; // Populate the sales amount for the month

      // Category-wise aggregation
      products?.forEach(productList => {
        productList.forEach(product => {
          // Assuming the product has a category field, adjust if necessary
          const categoryName = product.productId.category;
          console.log("products category" , product)

          if (!categoryData[categoryName]) {
            categoryData[categoryName] = 0; // Initialize category sales if not present
          }
          categoryData[categoryName] += product.productId.offerPrice; // Add the product price to the corresponding category
        });
      });
      categoryNames = Object.keys(categoryData)
      categoryValues = Object.values(categoryData)
    });

    // Prepare the response data
    const responseData = {
      monthlyData,
      yearlyData: pastYears.map(year => ({
        year,
        totalSales: monthlyData[year] ? monthlyData[year].reduce((acc, curr) => acc + curr, 0) : 0
      })),
      categoryData, // Add category-based sales data
      categoryNames,
      categoryValues,
      topSellingProducts
    };

    console.log("Fetched monthly, yearly, and category sales data:", responseData);
    return res.status(200).json({
      error: false,
      data: responseData
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return res.status(500).json({ error: 'Error fetching sales data' });
  }
};


export default {
  login,
  status,
  getUsers,
  addBanner,
  getBanners,
  getCardData,
  getGraphData,
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
  updateFeatured,
  updateProductStatus,
  updateProduct,
  getOrder,
  updateOrderStatus
}