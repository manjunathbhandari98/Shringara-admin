/* eslint-disable react/prop-types */
import { ImagePlus, X } from "lucide-react";
import { useState } from "react";
import { updateSubService } from "../services/serviceService";

const UpdateSubServiceModal = ({ service, onClose, subService, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: subService?.name || "",
    price: subService?.price || "",
    imageUrl: subService?.imageUrl || "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: file, // Store File, not URL
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!service?.id || !subService?.id) {
      setErrorMsg("Invalid service or sub-service. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();

      const subServiceData = {
        name: formData.name,
        price: formData.price,
      };

      payload.append("subService", JSON.stringify(subServiceData));
      if (formData.imageUrl instanceof File) {
        payload.append("image", formData.imageUrl);
      }

      const response = await updateSubService(
        subService.id,
        service.id,
        payload
      );

      if (!response.ok) {
        throw new Error("Failed to update sub-service.");
      }

      const updated = await response.json();
      onUpdate(updated);
      onClose();
    } catch (error) {
      console.error("Error updating sub-service:", error);
      setErrorMsg(error.message || "Failed to update sub-service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Update Sub Service
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
        {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2 text-gray-900"
              placeholder="Enter service name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value) || "",
                })
              }
              required
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2 text-gray-900"
              placeholder="Enter Price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Image
            </label>
            <div className="relative group w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              {formData.imageUrl && !(formData.imageUrl instanceof File) ? (
                <img
                  src={formData.imageUrl}
                  alt="Service"
                  className="w-full h-full object-cover group-hover:blur-sm"
                />
              ) : formData.imageUrl instanceof File ? (
                <img
                  src={URL.createObjectURL(formData.imageUrl)}
                  alt="Service"
                  className="w-full h-full object-cover group-hover:blur-sm"
                />
              ) : (
                <ImagePlus className="w-12 h-12" />
              )}

              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 cursor-pointer transition">
                <ImagePlus className="w-8 h-8 text-white" />
                <span className="text-white text-sm mt-1">Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubServiceModal;
