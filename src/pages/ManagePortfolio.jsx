import { Edit2, Trash2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "../components/DeleteConfirmationPopup";
import { useService } from "../hooks/useService";
import {
  createPortfolio,
  deletePortfolio,
  getPortfolio,
  updatePortfolio,
} from "../services/portfolioService";

const ManagePortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    services: { id: "" },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { services } = useService();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const response = await getPortfolio();
      setPortfolioItems(response);
    };
    fetchPortfolio();
  }, []);

  useEffect(() => {
    return () => {
      if (formData.imageUrl instanceof File) {
        URL.revokeObjectURL(formData.imageUrl);
      }
    };
  }, [formData.imageUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "services" ? { id: value } : value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: file,
      }));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      imageUrl: item.imageUrl,
      services: { id: item.services.id },
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteItemId) {
      await deletePortfolio(deleteItemId);
      setShowDeleteModal(false);
      setDeleteItemId(null);
      const updatedPortfolio = await getPortfolio();
      setPortfolioItems(updatedPortfolio);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, imageUrl, services } = formData;

    if (!title.trim() || !services.id || (!imageUrl && !editingItem)) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formPayload = new FormData();

    // ✅ FIXED STRUCTURE: Use serviceId instead of nested services
    const formattedData = {
      title: title.trim(),
      serviceId: services.id,
    };

    formPayload.append("portfolio", JSON.stringify(formattedData));

    if (formData.imageUrl instanceof File) {
      formPayload.append("image", formData.imageUrl);
    }

    try {
      setLoading(true);
      if (editingItem) {
        await updatePortfolio(editingItem.id, formPayload);
      } else {
        await createPortfolio(formPayload);
      }
      setLoading(false);
      const updatedPortfolio = await getPortfolio();
      setPortfolioItems(updatedPortfolio);
      resetForm();
    } catch (error) {
      console.error("Error saving portfolio:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (formData.imageUrl instanceof File) {
      URL.revokeObjectURL(formData.imageUrl);
    }
    setFormData({
      title: "",
      imageUrl: "",
      services: { id: "" },
    });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
          Manage Portfolio
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          <Upload className="w-4 h-4 mr-2" /> Add New Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={item.imageUrl}
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
                  onClick={() => handleDeleteClick(item.id)}
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {services.find((s) => s.id === item.services.id)?.name ||
                  "Unknown"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm"
                  placeholder="Enter title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="services"
                  value={formData.services.id}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm"
                  required
                >
                  <option value="">Select a Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>

                {/* Preview always comes from formData.imageUrl (URL or File) */}
                {formData.imageUrl && (
                  <img
                    src={
                      formData.imageUrl instanceof File
                        ? URL.createObjectURL(formData.imageUrl)
                        : formData.imageUrl
                    }
                    alt="Preview"
                    className="mt-2 w-full h-32 object-cover rounded-md"
                  />
                )}

                {/* File input to replace the image (only when selecting new one) */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Revoke the old blob URL if exists
                      if (formData.imageUrl instanceof File) {
                        URL.revokeObjectURL(formData.imageUrl);
                      }
                      setFormData((prevData) => ({
                        ...prevData,
                        imageUrl: file,
                      }));
                    }
                  }}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
                  disabled={
                    !formData.title.trim() ||
                    !formData.services.id ||
                    (!formData.imageUrl && !editingItem)
                  }
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      {editingItem ? "Saving..." : "Adding..."}
                    </span>
                  ) : editingItem ? (
                    "Save Changes"
                  ) : (
                    "Add Item"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManagePortfolio;
