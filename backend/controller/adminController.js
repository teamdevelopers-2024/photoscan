
import BannerDb from "../model/bannerModal.js";
import CategoryDb from "../model/Category.js";
import OfferDb from "../model/offerModel.js";
import UserDb from "../model/userModel.js";
import productDB from "../model/prodectModel.js"
import { v2 as cloudinary } from 'cloudinary';
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
    req.session.isAdmin = true
    res.status(200).json({
      error: false,
      message: "admin logged in successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: true,
      message: "internel server error"
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
      const data = req.body.data;
      console.log(data);
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
        images
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
        catstatus: true
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
    console.log('adminController', id)

    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Offer ID is required"
      });
    }
    console.log('offer deleted')
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
      [{ $set: { isActive: { $not: "$isActive" } } }]
    );
    const activeststus = !data.isActive

    await productDB.updateMany({ category: data.name }, { catstatus: activeststus });

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

async function updateFeatured(req, res) {
  try {
    const { id, detail } = req.body
    console.log(id, detail)
    await productDB.updateOne({ _id: id }, { $set: detail })
    res.status(200).json({
      error: false,
      message: "successfull"
    })
  } catch (error) {
    console.log(error)
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

    console.log('Total customers:', totalCustomers);
    console.log('Total orders:', totalOrders);
    console.log('Total sales:', totalSales);

    res.status(200).json({
      error: false,
      data: { totalCustomers, totalOrders, totalSales },
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
    console.log(error)
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
async function getOrder(req, res) {
  try {
    const Order = await OrderDb.find();
    res.status(200).json({
      error: false,
      data: Order
    })
  } catch (error) {
    res.status(500).json({
      error: false,
      message: "internel Server error"
    })
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
          totalAmount: 1
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalSales: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": 1 } // Sort by year descending, month ascending
      }
    ]);

    // Structure data for frontend
    const monthlyData = {};
    salesData.forEach(row => {
      const { year, month } = row._id;
      if (!monthlyData[year]) {
        monthlyData[year] = Array(12).fill(0); // Initialize array for months
      }
      monthlyData[year][month - 1] = row.totalSales; // Populate the sales amount for the month
    });

    // Prepare the response data
    const responseData = {
      monthlyData,
      yearlyData: pastYears.map(year => ({
        year,
        totalSales: monthlyData[year] ? monthlyData[year].reduce((acc, curr) => acc + curr, 0) : 0
      }))
    };
    console.log("fetched monthly data ", responseData)
    return res.status(200).json({
      error: false,
      data: responseData
    })
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