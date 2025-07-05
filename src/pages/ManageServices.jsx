import { ChevronDown, ChevronUp, Edit, Plus, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreateSubServiceModal from "../components/CreateSubServiceModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationPopup";
import UpdateServiceModal from "../components/UpdateServiceModal";
import UpdateSubServiceModal from "../components/UpdateSubServiceModal";
import { useService } from "./../hooks/useService";
import { deleteService, deleteSubService } from "./../services/serviceService";

const ManageServices = () => {
  const [expanded, setExpanded] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isSubserviceModalOpen, setIsSubserviceModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [isUpdateSubServiceModalOpen, setIsUpdateSubServiceModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { serviceId, subServiceId }

  const {
    services,
    fetchSubServices,
    addService,
    setServices,
    selectedService,
    setSelectedService,
  } = useService();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const toggleExpand = async (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (!expanded[id]) {
      const subServices = await fetchSubServices(id);
      const fullServiceDetails = services.find((service) => service.id === id);

      if (fullServiceDetails) {
        setSelectedService({
          ...fullServiceDetails,
          subServices,
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (formData.imageUrl instanceof File) {
        URL.revokeObjectURL(formData.imageUrl);
      }
    };
  }, [formData.imageUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageUrl: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.imageUrl) {
      toast.error("Please fill required fields.");
      return;
    }

    const formPayload = new FormData();
    const data = {
      name: formData.name,
      description: formData.description,
    };
    formPayload.append("service", JSON.stringify(data));
    if (formData.imageUrl instanceof File) {
      formPayload.append("image", formData.imageUrl);
    }

    try {
      await addService(formPayload);
      resetForm();
    } catch (err) {
      console.error("Error creating service:", err);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", imageUrl: "" });
    setIsModalOpen(false);
  };

  // Replace previous handleDelete
  const handleDelete = (serviceId) => {
    setDeleteTarget({ type: "service", serviceId });
    setIsDeleteModalOpen(true);
  };

  // Update existing handleDeleteSubService
  const handleDeleteSubService = (serviceId, subServiceId) => {
    setDeleteTarget({ type: "subService", serviceId, subServiceId });
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "service") {
      const result = await deleteService(deleteTarget.serviceId);
      toast.success(result.message);
      setServices((prev) =>
        prev.filter((service) => service.id !== deleteTarget.serviceId)
      );
    } else if (deleteTarget.type === "subService") {
      const { serviceId, subServiceId } = deleteTarget;
      const result = await deleteSubService(serviceId, subServiceId);
      toast.success(result.message);

      setSelectedService((prev) => {
        if (!prev || !prev.subServices) return prev;
        return {
          ...prev,
          subServices: prev.subServices.filter(
            (sub) => sub.id !== subServiceId
          ),
        };
      });

      setServices((prev) =>
        prev.map((service) => {
          if (service.id !== serviceId) return service;
          return {
            ...service,
            subServices: (service.subServices || []).filter(
              (sub) => sub.id !== subServiceId
            ),
          };
        })
      );
    }

    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
          Manage Services
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Service
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-2 text-left text-sm">Service</th>
              <th className="px-4 py-2 text-left text-sm">Actions</th>
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
                        setEditingService(service);
                        setIsUpdateModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setIsSubserviceModalOpen(true);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="text-gray-600 hover:text-gray-900"
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
                    <td colSpan="3" className="bg-gray-50 p-4">
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
                          {service?.subServices?.map((sub) => (
                            <tr key={sub.id} className="border-b">
                              <td className="px-3 py-2 text-sm">{sub.name}</td>
                              <td className="px-3 py-2 text-sm">
                                ₹{sub.price}
                              </td>
                              <td className="px-3 py-2 flex space-x-2">
                                <button
                                  onClick={() => {
                                    setSelectedSubService(sub);
                                    setIsUpdateSubServiceModalOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteSubService(service.id, sub.id)
                                  }
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Service</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm p-2"
                  required
                />
                {formData.imageUrl && (
                  <img
                    src={
                      formData.imageUrl instanceof File
                        ? URL.createObjectURL(formData.imageUrl)
                        : formData.imageUrl
                    }
                    alt="Preview"
                    className="mt-2 h-32 object-cover rounded-md w-full"
                  />
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isUpdateModalOpen && editingService && (
        <UpdateServiceModal
          service={editingService}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={(updatedService) => {
            setServices((prev) =>
              prev.map((s) => (s.id === updatedService.id ? updatedService : s))
            );
            setIsUpdateModalOpen(false);
          }}
        />
      )}

      {isSubserviceModalOpen && selectedService && (
        <CreateSubServiceModal
          service={selectedService}
          onClose={() => setIsSubserviceModalOpen(false)}
          onSubServiceCreated={(newSubService) => {
            setServices((prev) =>
              prev.map((service) =>
                service.id === selectedService.id
                  ? {
                      ...service,
                      subServices: [
                        ...(service.subServices || []),
                        newSubService,
                      ],
                    }
                  : service
              )
            );
          }}
        />
      )}

      {isUpdateSubServiceModalOpen && selectedService && (
        <UpdateSubServiceModal
          service={selectedService}
          subService={selectedSubService}
          onClose={() => setIsUpdateSubServiceModalOpen(false)}
          onUpdate={(updatedSubService) => {
            setServices((prev) =>
              prev.map((service) =>
                service.id === selectedService.id
                  ? {
                      ...service,
                      subServices: service.subServices.map((sub) =>
                        sub.id === updatedSubService.id
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

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeleteTarget(null);
          }}
          onConfirm={onConfirmDelete}
          item={deleteTarget?.type === "service" ? "service" : "sub-service"}
        />
      )}
    </div>
  );
};

export default ManageServices;
