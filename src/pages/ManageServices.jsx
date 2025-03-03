import React, {
  useEffect,
  useState,
} from "react";
import { useService } from "./../hooks/useService";
import {
  deleteService,
  deleteSubService,
  updateSubService,
  uploadImage,
} from "./../services/serviceService";
import {
  Plus,
  Edit,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import UpdateServiceModal from "../components/UpdateServiceModal";
import CreateSubServiceModal from "../components/CreateSubServiceModal";
import UpdateSubServiceModal from "../components/UpdateSubServiceModal";

const ManageServices = () => {
  const [expanded, setExpanded] = useState({});
  const [isModalOpen, setIsModalOpen] =
    useState();
  const [editingService, setEditingService] =
    useState(null);
  const [
    isSubserviceModalOpen,
    setIsSubserviceModalOpen,
  ] = useState(false);
  const [
    isUpdateModalOpen,
    setIsUpdateModalOpen,
  ] = useState(false);
  const [
    selectedSubService,
    setSelectedSubService,
  ] = useState(null);
  const [
    isUpdateSubServiceModalOpen,
    setIsUpdateSubServiceModalOpen,
  ] = useState(false);
  const {
    services,
    fetchSubServices,
    addService,
    setServices,
    selectedService,
    setSelectedService,
  } = useService();

  const toggleExpand = async (id) => {
    setExpanded((prev) => {
      const isCurrentlyExpanded = prev[id];
      return { [id]: !isCurrentlyExpanded }; // Close others
    });

    if (!expanded[id]) {
      const subServices = await fetchSubServices(
        id
      );

      // Find the full service details from `services` array
      const fullServiceDetails = services.find(
        (service) => service.id === id
      );

      // Store full service details in `selectedService`
      if (fullServiceDetails) {
        setSelectedService({
          ...fullServiceDetails,
          subServices, // Add sub-services here
        });
      }
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e) => {
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
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.imageUrl) {
      alert(
        "Please provide a name and an image."
      );
      return;
    }

    try {
      await addService(formData);
      setIsModalOpen(false);
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error(
        "Error adding service:",
        error
      );
    }
  };

  const handleDelete = async (serviceId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this service?"
      )
    ) {
      const result = await deleteService(
        serviceId
      );
      alert(result.message);

      // Remove the service from the list
      setServices((prevServices) =>
        prevServices.filter(
          (service) => service.id !== serviceId
        )
      );
    }
  };

  const handleDeleteSubService = async (
    serviceId,
    subServiceId
  ) => {
    if (
      window.confirm(
        "Are you sure you want to delete this sub-service?"
      )
    ) {
      const result = await deleteSubService(
        serviceId,
        subServiceId
      );
      alert(result.message);

      // Update the state to remove the deleted sub-service
      setSelectedService(
        (prevSelectedService) => ({
          ...prevSelectedService,
          subServices:
            prevSelectedService.subServices.filter(
              (sub) => sub.id !== subServiceId
            ),
        })
      );

      // Also update the main services list
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === serviceId
            ? {
                ...service,
                subServices:
                  service.subServices.filter(
                    (sub) =>
                      sub.id !== subServiceId
                  ),
              }
            : service
        )
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Services
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
          New Service
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-6 py-3 text-left">
                Service
              </th>
              <th className="px-6 py-3 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service) => (
              <React.Fragment key={service.id}>
                <tr className="border-b">
                  <td className="px-6 py-4 font-semibold">
                    {service.name}
                  </td>

                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      onClick={() => {
                        setEditingService(
                          service
                        ); // Set the service to be edited
                        setIsUpdateModalOpen(
                          true
                        ); // Open the update modal
                      }}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(service.id)
                      }
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        // Set the selected service
                        setSelectedService(
                          service
                        );
                        setIsSubserviceModalOpen(
                          true
                        );
                      }}
                      className="text-green-600 hover:text-green-900 cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        toggleExpand(service.id);
                      }}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      {expanded[service.id] ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
                {expanded[service.id] && (
                  <tr>
                    <td
                      colSpan="3"
                      className="bg-gray-50"
                    >
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="px-6 py-2 text-left">
                              Sub Service
                            </th>
                            <th className="px-6 py-2 text-left">
                              Price
                            </th>

                            <th className="px-6 py-2 text-left">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {service?.subServices?.map(
                            (sub) => (
                              <tr
                                key={sub.id}
                                className="border-b"
                              >
                                <td className="px-6 py-3">
                                  {sub.name}
                                </td>
                                <td className="px-6 py-3">
                                  {sub.price}
                                </td>

                                <td className="px-6 py-3 flex space-x-3">
                                  <button
                                    onClick={() => {
                                      setSelectedSubService(
                                        sub
                                      ),
                                        setIsUpdateSubServiceModalOpen(
                                          true
                                        );
                                    }}
                                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleDeleteSubService(
                                        service.id,
                                        sub.id
                                      );
                                    }}
                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {isUpdateModalOpen && editingService && (
        <UpdateServiceModal
          service={editingService}
          onClose={() =>
            setIsUpdateModalOpen(false)
          }
          onUpdate={(updatedService) => {
            setServices((prevServices) =>
              prevServices.map((service) =>
                service.id === updatedService.id
                  ? updatedService
                  : service
              )
            );
            setIsUpdateModalOpen(false);
          }}
        />
      )}

      {isSubserviceModalOpen &&
        selectedService && (
          <CreateSubServiceModal
            service={selectedService}
            onClose={() =>
              setIsSubserviceModalOpen(false)
            }
            onSubServiceCreated={(
              newSubService
            ) => {
              setServices((prevServices) =>
                prevServices.map((service) =>
                  service.id ===
                  selectedService.id
                    ? {
                        ...service,
                        subServices: [
                          ...(service.subServices ||
                            []),
                          newSubService,
                        ],
                      }
                    : service
                )
              );
            }}
          />
        )}

      {isUpdateSubServiceModalOpen &&
        selectedService && (
          <UpdateSubServiceModal
            service={selectedService}
            subService={selectedSubService}
            onClose={() =>
              setIsUpdateSubServiceModalOpen(
                false
              )
            }
            onUpdate={(updatedSubService) => {
              setServices((prevServices) =>
                prevServices.map((service) =>
                  service.id ===
                  selectedService.id
                    ? {
                        ...service,
                        subServices:
                          service.subServices.map(
                            (sub) =>
                              sub.id ===
                              updatedSubService.id
                                ? updatedSubService
                                : sub
                          ),
                      }
                    : service
                )
              );
            }}
          />
        )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Add New Service
              </h2>
              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6 cursor-pointer" />
              </button>
            </div>
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2 text-gray-900"
                  placeholder="Enter service name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description (optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2 text-gray-900"
                  placeholder="Enter service description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  {editingService
                    ? "Save Changes"
                    : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
