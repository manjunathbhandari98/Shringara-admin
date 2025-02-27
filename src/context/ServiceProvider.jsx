import { useEffect, useState } from "react";
import { ServiceContext } from "./serviceContext";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getSubServices,
  getSubServiceById,
  createSubService,
  updateSubService,
  deleteSubService,
} from "../services/serviceService";

/* eslint-disable react/prop-types */
export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] =
    useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getAllServices();
      setServices(response);
    } catch (error) {
      console.error(
        "Error fetching services:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single service by ID
  const fetchServiceById = async (serviceId) => {
    setLoading(true);
    try {
      const response = await getServiceById(
        serviceId
      );
      setSelectedService(response);
    } catch (error) {
      console.error(
        "Error fetching service by ID:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Create a new service
  const addService = async (serviceData) => {
    setLoading(true);
    try {
      await createService(serviceData);
      fetchServices();
    } catch (error) {
      console.error(
        "Error creating service:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Update an existing service
  const editService = async (
    serviceId,
    updateData
  ) => {
    setLoading(true);
    try {
      await updateService(serviceId, updateData);
      fetchServices();
    } catch (error) {
      console.error(
        "Error updating service:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete a service
  const removeService = async (serviceId) => {
    setLoading(true);
    try {
      await deleteService(serviceId);
      fetchServices();
    } catch (error) {
      console.error(
        "Error deleting service:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch sub-services for a specific service ID
  const fetchSubServices = async (serviceId) => {
    setLoading(true);
    try {
      const response = await getSubServices(
        serviceId
      );
      setSelectedService(response.subServices);
    } catch (error) {
      console.error(
        "Error fetching sub-services:",
        error
      );
      setSelectedService([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single subservice by ID
  const fetchSubServiceById = async (
    subServiceId
  ) => {
    setLoading(true);
    try {
      const response = await getSubServiceById(
        subServiceId
      );
      setSelectedService(response);
    } catch (error) {
      console.error(
        "Error fetching subservice by ID:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Create a new subservice
  const addSubService = async (
    serviceId,
    subServiceData
  ) => {
    setLoading(true);
    try {
      await createSubService(
        serviceId,
        subServiceData
      );
      fetchSubServices(serviceId);
    } catch (error) {
      console.error(
        "Error creating subservice:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Update an existing subservice
  const editSubService = async (
    subServiceId,
    updateData
  ) => {
    setLoading(true);
    try {
      await updateSubService(
        subServiceId,
        updateData
      );
      fetchSubServiceById(subServiceId);
    } catch (error) {
      console.error(
        "Error updating subservice:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete a subservice
  const removeSubService = async (
    subServiceId
  ) => {
    setLoading(true);
    try {
      await deleteSubService(subServiceId);
      fetchServices();
    } catch (error) {
      console.error(
        "Error deleting subservice:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        services,
        selectedService,
        fetchServices,
        fetchServiceById,
        addService,
        editService,
        removeService,
        fetchSubServices,
        fetchSubServiceById,
        addSubService,
        editSubService,
        removeSubService,
        loading,
        setServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
