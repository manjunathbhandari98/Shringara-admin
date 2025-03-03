/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  createSubService,
  uploadImage,
} from "../services/serviceService";
import { ImagePlus, X } from "lucide-react";

const CreateSubServiceModal = ({
  service,
  onClose,
  onSubServiceCreated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setFormData({ ...formData, imageUrl });
      } catch (error) {
        console.error(
          "Image upload failed:",
          error
        );
        setErrorMsg(
          "Image upload failed. Try again."
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    console.log("service", service);

    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!service?.id) {
      setErrorMsg(
        "Invalid service. Please try again."
      );
      setLoading(false);
      return;
    }

    try {
      const newService = await createSubService(
        service.id,
        formData
      );
      onSubServiceCreated(newService);
      console.log("Submitted Data:", formData);
      onClose();
    } catch (error) {
      console.error(
        "Error creating sub-service:",
        error
      );
      setErrorMsg(
        error.message ||
          "Failed to create sub-service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create Sub Service
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
        {errorMsg && (
          <p className="text-red-500 text-sm mb-4">
            {errorMsg}
          </p>
        )}
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
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
                  price:
                    parseFloat(e.target.value) ||
                    "",
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
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Service"
                  className="w-full h-full object-cover group-hover:blur-sm"
                />
              ) : (
                <ImagePlus className="w-12 h-12" />
              )}
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 cursor-pointer transition">
                <ImagePlus className="w-8 h-8 text-white" />
                <span className="text-white text-sm mt-1">
                  Change Image
                </span>
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
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubServiceModal;
