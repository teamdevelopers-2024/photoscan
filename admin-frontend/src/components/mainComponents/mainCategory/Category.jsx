import React from 'react';
import PropertyDetailsModal from '../../modal/Modal';

function MainMomento() {
  const categories = [
    { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/100', count: 20 },
    { id: 2, name: 'Books', image: 'https://via.placeholder.com/100', count: 15 },
    { id: 3, name: 'Clothing', image: 'https://via.placeholder.com/100', count: 30 },
    { id: 4, name: 'Home Appliances', image: 'https://via.placeholder.com/100', count: 12 },
    { id: 5, name: 'Sports', image: 'https://via.placeholder.com/100', count: 8 },
    { id: 6, name: 'Toys', image: 'https://via.placeholder.com/100', count: 25 },
    // Add more categories as needed
    { id: 7, name: 'Furniture', image: 'https://via.placeholder.com/100', count: 5 },
    { id: 8, name: 'Groceries', image: 'https://via.placeholder.com/100', count: 22 },
    { id: 9, name: 'Jewelry', image: 'https://via.placeholder.com/100', count: 10 },
    { id: 10, name: 'Stationery', image: 'https://via.placeholder.com/100', count: 18 },
    { id: 11, name: 'Footwear', image: 'https://via.placeholder.com/100', count: 14 },
    { id: 12, name: 'Health & Beauty', image: 'https://via.placeholder.com/100', count: 9 },
    // More categories for demonstration
  ];

  const handleAction = (id) => {
    console.log(`Action for category with ID: ${id}`);
    // Here you can toggle the action between Hide/Unlist if needed
  };

  return (
    <div className="m-4 p-4 bg-transparent rounded-lg shadow-lg">
        <div className='flex justify-between'>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Categories</h2>
      <div className='flex gap-5'>
      <button
          onClick={''}
          className="text-white mb-3 bg-yellow-600 rounded px-4 py-2 hover:bg-yellow-700 transition duration-150"
        >
          Unlisted Categories
        </button>
       <button
          onClick={''}
          className="text-white mb-3 bg-green-600 rounded px-4 py-2 hover:bg-green-700 transition duration-150"
          >
          Add Category
        </button>
        </div>
        </div>

      <div className="overflow-x-auto max-h-[550px]">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 p-3 text-left">Image</th>
              <th className="border border-gray-400 p-3 text-left">Category Name</th>
              <th className="border border-gray-400 p-3 text-left">Item Count</th>
              <th className="border border-gray-400 p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-100 transition duration-150">
                <td className="border border-gray-400 p-3">
                  <img src={category.image} alt={category.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="border font-bold border-gray-400 p-3 text-gray-700">{category.name}</td>
                <td className="border font-bold border-gray-400 p-3 text-gray-700">{category.count}</td>
                <td className="border border-gray-400 p-3 flex justify-center">
                  <button
                    onClick={() => handleAction(category.id)}
                    className="text-white bg-blue-600 rounded px-4 py-2 hover:bg-blue-700 transition duration-150"
                  >
                    Hide/Unlist
                  </button>
                  <PropertyDetailsModal />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainMomento;
