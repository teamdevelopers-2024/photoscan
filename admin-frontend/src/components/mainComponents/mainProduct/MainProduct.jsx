import React, { useState, useEffect } from 'react';
import './MainProduct.css';
import AddProductModal from '../productModal/ProductModal';
import api from '../../../services/api';
import ProductDetailsModal from './ProductDetailsModal';
import Loader from '../../Loader/Loader';
import Swal from 'sweetalert2';
import EditProductModal from './EditProductModal';

function MainProduct() {
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for details
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]); // Track selected products for featuring
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUnlisted , setIsUnlisted ] = useState(true)
  const [isUpdating , setIsUpdating] = useState(false)
  const handleAddProduct = () => {
    setAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
    fetchProducts();
  };

  const fetchProducts = async (isUnlisted) => {
    try {
      setLoading(true);
      const response = await api.getProducts(isUnlisted);
      let items = []
      response.map((item)=>{
        if(item.isFeatured){
          items.push(item._id)
        }
      })
      setSelectedProducts(items)
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(isUnlisted);
  }, [isUnlisted , isUpdating]);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await api.updateProduct(id, updatedData);
      setIsUpdating(!isUpdating);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDelete = async(id) => {
    console.log(id )
    console.log("prouduct ids : ", selectedProducts)
    if(selectedProducts.includes(id)) {
      Swal.fire({
        icon:"error",
        title:"error!",
        text:"The Product is Featured ! , remove From Featured Products and Continue"
      })
      return
    }
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${!isUnlisted ? "restore": "delete"} this product?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if(!result.isConfirmed) return 
    
    const response = await api.updateProductStatus(id)
    if(!response.error){
      Swal.fire({
        icon:"success",
        text:`the product ${!isUnlisted ? "showed":"hidded"} successfully`,
        title:'success!'
      })
    }else{
      Swal.fire({
        icon:"error",
        title:"error!",
        text:"error during update status"
      })
    }
    setIsUpdating(!isUpdating)
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeDetailsModal = () => {
    setSelectedProduct(null);
  };

  const handleSelectProduct = async (product) => {
    let updatedSelectedProducts;
  
    if (selectedProducts.includes(product._id)) {
      updatedSelectedProducts = selectedProducts.filter((id) => id !== product._id);
    } else if (selectedProducts.length < 4) {
      updatedSelectedProducts = [...selectedProducts, product._id];
    } else {
      Swal.fire({
        icon:"info",
        title:"error!",
        iconColor:"yellow",
        text:"Your can only select 4 featured Products"
      })
      return;
    }
  
    setSelectedProducts(updatedSelectedProducts);
    try {
      await api.updateFeatured(product._id, { isFeatured: !product.isFeatured });
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
    setIsUpdating(!isUpdating)
  };
  
  return (
    <>
      {loading && <Loader />}
      <div className="user-main block">
        <div className="main-header mb-4 flex justify-between">
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Product
          </button>
            <button
              onClick={() => setIsUnlisted(!isUnlisted)}
              className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              {isUnlisted?'Unlisted':'listed'}
            </button>
        </div>
        <div className="main-table w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">SINO</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Price</th>
                {isUnlisted &&
                <th className="border p-2">Select For Featured</th>  
                }
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2 flex">
                    <img style={{ width: 50, height: 50 }} src={product.images[0]} alt="" />
                    <div className="h-[50px] flex items-center ml-4">
                      <p className="h-[20px]">{product.productName}</p>
                    </div>
                  </td>
                  <td className="border p-2">{product.offerPrice}</td>
                  {isUnlisted &&
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={product.isFeatured}
                      onChange={() => handleSelectProduct(product)}
                      />
                  </td>
                    }
                  <td className="border p-2 text-center">
                  <button
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                      onClick={() => handleShowDetails(product)}
                    >
                      Details
                    </button>
                    <button
                      className={`${!isUnlisted ? 'bg-green-500':"bg-red-500"} text-white py-1 px-2 rounded hover:bg-red-600`}
                      onClick={() => handleDelete(product._id)}
                    >
                      {!isUnlisted ? "restore" :"delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isAddProductModalOpen && <AddProductModal closeModal={closeAddProductModal} />}
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            closeModal={closeDetailsModal}
          />
        )}
        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            closeModal={() => setEditingProduct(null)}
            updateProduct={handleUpdateProduct}
          />
        )}
      </div>
    </>
  );
}

export default MainProduct;
