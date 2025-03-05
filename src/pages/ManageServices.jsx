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
    useState(false);
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
    setExpanded((prev) => ({
      [id]: !prev[id],
    }));

    if (!expanded[id]) {
      const subServices = await fetchSubServices(
        id
      );
      const fullServiceDetails = services.find(
        (service) => service.id === id
      );

      if (fullServiceDetails) {
        setSelectedService({
          ...fullServiceDetails,
          subServices,
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
      setSelectedService(
        (prevSelectedService) => ({
          ...prevSelectedService,
          subServices:
            prevSelectedService.subServices.filter(
              (sub) => sub.id !== subServiceId
            ),
        })
      );
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
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
          Manage Services
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Add
          New Service
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left text-sm">
                Service
              </th>
              <th className="px-4 py-2 text-left text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service) => (
              <React.Fragment key={service.id}>
                <tr className="border-b">
                  <td className="px-4 py-3 font-semibold text-sm">
                    {service.name}
                  </td>
                  <td className="px-4 py-3 flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingService(
                          service
                        );
                        setIsUpdateModalOpen(
                          true
                        );
                      }}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(service.id)
                      }
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService(
                          service
                        );
                        setIsSubserviceModalOpen(
                          true
                        );
                      }}
                      className="text-green-600 hover:text-green-900 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        toggleExpand(service.id);
                      }}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      {expanded[service.id] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
                {expanded[service.id] && (
                  <tr>
                    <td
                      colSpan="3"
                      className="bg-gray-50 p-2 sm:p-4"
                    >
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="px-3 py-2 text-left text-sm">
                              Sub Service
                            </th>
                            <th className="px-3 py-2 text-left text-sm">
                              Price
                            </th>
                            <th className="px-3 py-2 text-left text-sm">
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
                                <td className="px-3 py-2 text-sm">
                                  {sub.name}
                                </td>
                                <td className="px-3 py-2 text-sm">
                                  {sub.price}
                                </td>
                                <td className="px-3 py-2 flex space-x-2">
                                  <button
                                    onClick={() => {
                                      setSelectedSubService(
                                        sub
                                      );
                                      setIsUpdateSubServiceModalOpen(
                                        true
                                      );
                                    }}
                                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                  >
                                    <Edit className="w-4 h-4" />
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
                                    <Trash2 className="w-4 h-4" />
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Add New Service
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
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
