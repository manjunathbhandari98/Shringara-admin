import React, { useState } from "react";
import {
  Upload,
  Trash2,
  Edit2,
  X,
} from "lucide-react";

const ManagePortfolio = () => {
  const [portfolioItems, setPortfolioItems] =
    useState([
      {
        id: "1",
        title: "Luxury Wedding Setup",
        category: "Wedding",
        image:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        date: "2024-03-15",
      },
      {
        id: "2",
        title: "Corporate Event",
        category: "Corporate",
        image:
          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
        date: "2024-03-10",
      },
      {
        id: "3",
        title: "Birthday Decoration",
        category: "Birthday",
        image:
          "https://images.unsplash.com/photo-1478146896981-b80fe463b330",
        date: "2024-03-05",
      },
    ]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [editingItem, setEditingItem] =
    useState(null);

  const handleDelete = (id) => {
    setPortfolioItems(
      portfolioItems.filter(
        (item) => item.id !== id
      )
    );
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Portfolio
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                {item.category}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingItem
                  ? "Edit Portfolio Item"
                  : "Add New Portfolio Item"}
              </h2>
              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="Wedding">
                    Wedding
                  </option>
                  <option value="Corporate">
                    Corporate
                  </option>
                  <option value="Birthday">
                    Birthday
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  {editingItem
                    ? "Save Changes"
                    : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePortfolio;
