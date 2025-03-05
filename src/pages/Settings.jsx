import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addAdmin,
  addDomain,
  deleteDomain,
  fetchAdmins,
  fetchSettings,
  getDomain,
  updateAdmin,
  updateDomain,
  updateSettings,
} from "./../services/settingsService";
import { useAdmin } from "../hooks/useAdmin";
import { uploadImage } from "../services/serviceService";

const SettingsPage = () => {
  const { admin, setAdminInfo } = useAdmin();
  const [activeTab, setActiveTab] =
    useState("general");

  const [formData, setFormData] = useState({
    appName: "",
    email: "",
    phone: "",
    logoUrl: "",
    homeBannerUrl: "",
    portfolioBannerUrl: "",
    instaUrl: "",
    fbUrl: "",
    xurl: "",
  });
  const [domains, setDomains] = useState([]);
  const [admins, setAdmins] = useState([
    {
      name: "",
      phone: "",
      email: "",
    },
  ]);
  const [showAddAdminForm, setShowAddAdminForm] =
    useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [
    showEditAdminForm,
    setShowEditAdminForm,
  ] = useState(false);
  const [editedAdminIndex, setEditedAdminIndex] =
    useState(null);
  const [editedAdmin, setEditedAdmin] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [showDomainForm, setShowDomainForm] =
    useState(false);
  const [domainForm, setDomainForm] = useState({
    protocol: "https://",
    domainUrl: "",
    isPrimary: false,
    status: "Pending",
  });
  const [editDomainIndex, setEditDomainIndex] =
    useState(null);
  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);
  const [
    domainToDeleteIndex,
    setDomainToDeleteIndex,
  ] = useState(null);

  // Fetch settings data
  const getSettings = async () => {
    const data = await fetchSettings();

    setFormData({
      id: data.id,
      appName: data.appName,
      logoUrl: data.logoUrl,
      homeBannerUrl: data.homeBannerUrl,
      portfolioBannerUrl: data.portfolioBannerUrl,
      email: data.email,
      phone: data.phone,
      instaUrl: data.instaUrl,
      fbUrl: data.fbUrl,
      xurl: data.xurl,
    });
  };

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    const getDomainInfo = async () => {
      try {
        const domain = await getDomain();
        console.log(domain);

        setDomains(domain); // Wrap it inside an array
      } catch (error) {
        console.error(
          "Error fetching domain info:",
          error
        );
      }
    };

    getDomainInfo();
  }, []);

  // Reset the form to inittial state

  const handleReset = () => {
    getSettings(); // Re-fetch data from API
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (
    e,
    fieldName
  ) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setFormData((prevData) => ({
          ...prevData,
          [fieldName]: imageUrl, // Update correct field
        }));
      } catch (error) {
        console.error(
          "Image upload failed:",
          error
        );
      }
    }
  };

  const getAllAdmins = async () => {
    const response = await fetchAdmins();
    setAdmins(response);
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (
      !newAdmin.name ||
      !newAdmin.email ||
      !newAdmin.phone ||
      !newAdmin.password
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const adminData = {
      name: newAdmin.name,
      email: newAdmin.email,
      phone: newAdmin.phone,
      role: "ADMIN",
      password: newAdmin.password,
    };

    try {
      await addAdmin(adminData); // Send data to the API
      alert("Admin added successfully!");

      setAdmins([...admins, adminData]); // Update state to reflect the new admin
      setNewAdmin({
        name: "",
        phone: "",
        email: "",
        password: "",
      }); // Reset form
      setShowAddAdminForm(false);
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Failed to add admin.");
    }
  };

  const handleEditAdmin = (index) => {
    setEditedAdminIndex(index);
    setEditedAdmin(admins[index]);
    setShowEditAdminForm(true);
  };

  const handleUpdateAdmin = async () => {
    try {
      const payload = {
        id: editedAdmin.id,
        name: editedAdmin.name,
        email: editedAdmin.email,
        phone: editedAdmin.phone,
      };
      const updatedAdmin = await updateAdmin(
        payload
      );

      // Update the admins state with the updated admin data
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin.id === updatedAdmin.id
            ? updatedAdmin
            : admin
        )
      );

      setShowEditAdminForm(false);
    } catch (error) {
      console.error(
        "Error updating admin:",
        error
      );
      alert("Failed to update admin.");
    }
  };

  const handleDeleteAdmin = (index) => {
    const updatedAdmins = admins.filter(
      (_, i) => i !== index
    );
    setAdmins(updatedAdmins);
  };

  const handleAddDomain = async () => {
    try {
      const requestData = {
        domainUrl: `${domainForm.protocol}${domainForm.domainUrl}`,
        isPrimary: domainForm.isPrimary,
        status: domainForm.status,
      };

      // If setting a domain as primary, ensure only this one is primary
      if (domainForm.isPrimary) {
        setDomains((prevDomains) =>
          prevDomains.map((domain) => ({
            ...domain,
            isPrimary: false,
          }))
        );
      }

      await addDomain(requestData);
      alert("Domain added successfully!");
      const updatedDomains = await getDomain();
      setDomains(updatedDomains);
      setShowDomainForm(false);
      setDomainForm({
        protocol: "https://",
        domainUrl: "",
        isPrimary: false,
        status: "Pending",
      });
    } catch (error) {
      console.error(
        "Error adding domain:",
        error
      );
      alert("Failed to add domain.");
    }
  };

  const handleEditDomain = (index) => {
    setEditDomainIndex(index);
    setDomainForm(domains[index]);
    setShowDomainForm(true);
  };

  const handleDeleteDomainConfirmation = (
    index
  ) => {
    setDomainToDeleteIndex(index);
    setShowDeleteConfirmation(true);
  };
  const handleDeleteDomain = async () => {
    try {
      await deleteDomain(domainToDeleteIndex);
      alert("Domain deleted successfully!");
      const updatedDomains = await getDomain();
      setDomains(updatedDomains);
      setShowDeleteConfirmation(false);
      setDomainToDeleteIndex(null);
    } catch (error) {
      console.error(
        "Error deleting domain:",
        error
      );
      alert("Failed to delete domain.");
    }
  };

  const handleUpdateDomain = async () => {
    try {
      const requestData = {
        id: domainForm.id,
        domainUrl: `${domainForm.protocol}${domainForm.domainUrl}`,
        isPrimary: domainForm.isPrimary,
        status: domainForm.status,
      };

      if (domainForm.isPrimary) {
        setDomains((prevDomains) =>
          prevDomains.map((domain) => ({
            ...domain,
            isPrimary:
              domain.id === domainForm.id,
          }))
        );
      }
      await updateDomain(
        domainForm.id,
        requestData
      );
      alert("Domain updated successfully!");
      const updatedDomains = await getDomain();
      setDomains(updatedDomains);
      setShowDomainForm(false);
      setDomainForm({
        protocol: "https://",
        domainUrl: "",
        isPrimary: false,
        status: "Pending",
      });
    } catch (error) {
      console.error(
        "Error updating domain:",
        error
      );
      alert("Failed to update domain.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSettings(formData.id, formData);
  };

  // Domain

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-center mb-6">
        Settings
      </h2>

      <div className="flex flex-wrap justify-center mb-6">
        {["general", "user", "domain"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mx-1 mb-2 rounded-md transition text-sm sm:text-base ${
                activeTab === tab
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {tab === "general"
                ? "General"
                : tab === "user"
                ? "User Management"
                : "Domain Settings"}
            </button>
          )
        )}
      </div>

      {activeTab === "general" && (
        <div className="p-4 bg-white rounded-md shadow">
          <h3 className="text-xl font-semibold mb-3">
            General Settings
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium">
                Website Name
              </label>
              <input
                type="text"
                name="appName"
                value={formData.appName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {[
              {
                label: "Website Logo",
                state: formData.logoUrl,
                field: "logoUrl",
              },
              {
                label: "Home Banner",
                state: formData.homeBannerUrl,
                field: "homeBannerUrl",
              },
              {
                label: "Portfolio Banner",
                state:
                  formData.portfolioBannerUrl,
                field: "portfolioBannerUrl",
              },
            ].map(({ label, state, field }) => (
              <div
                className="mb-4"
                key={label}
              >
                <label className="block font-medium">
                  {label}
                </label>
                <div
                  className={`relative w-full ${
                    label === "Home Banner" ||
                    label === "Portfolio Banner"
                      ? "h-48"
                      : "h-32 sm:w-32"
                  } border rounded-lg overflow-hidden flex items-center justify-center bg-gray-100`}
                >
                  <img
                    src={
                      state || "/placeholder.png"
                    }
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      handleImageChange(e, field)
                    }
                  />
                  <button className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
                    <Edit />
                  </button>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block font-medium">
                  Instagram
                </label>
                <input
                  type="text"
                  name="instaUrl"
                  value={formData.instaUrl}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">
                  Facebook
                </label>
                <input
                  type="text"
                  name="fbUrl"
                  value={formData.fbUrl}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">
                  X
                </label>
                <input
                  type="text"
                  name="xurl"
                  value={formData.xurl}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row p-3 space-y-3 sm:space-y-0 sm:space-x-5">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
      {activeTab === "user" && (
        <div className="p-4 bg-white rounded-md shadow">
          <h3 className="text-xl font-semibold mb-3">
            User Management
          </h3>
          <p className="text-gray-600">
            Manage admin users here.
          </p>
          <div className="mt-4">
            <h4 className="font-semibold">
              Logged-in Admin
            </h4>
            <div className="border p-4 rounded-md">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <p>Name: {admin.name}</p>
                  <p>Email: {admin.email}</p>
                  <p>Phone: {admin.phone}</p>
                </div>
                <button
                  onClick={() =>
                    handleEditAdmin(0)
                  }
                  className="text-blue-500 hover:underline mt-2 sm:mt-0" // Added margin for mobile
                >
                  <Edit />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              setShowAddAdminForm(true)
            }
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Admin
          </button>

          {showAddAdminForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h4 className="font-semibold mb-2">
                  Add Admin
                </h4>
                <input
                  type="text"
                  placeholder="Name"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={newAdmin.phone}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      phone: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      password: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddAdmin}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() =>
                      setShowAddAdminForm(false)
                    }
                    className="ml-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showEditAdminForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h4 className="font-semibold mb-2">
                  Edit Admin
                </h4>
                <input
                  type="text"
                  placeholder="Name"
                  value={editedAdmin.name}
                  onChange={(e) =>
                    setEditedAdmin({
                      ...editedAdmin,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editedAdmin.email}
                  onChange={(e) =>
                    setEditedAdmin({
                      ...editedAdmin,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={editedAdmin.phone}
                  onChange={(e) =>
                    setEditedAdmin({
                      ...editedAdmin,
                      phone: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleUpdateAdmin}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      setShowEditAdminForm(false)
                    }
                    className="ml-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {activeTab === "domain" && (
        <div className="p-4 bg-white rounded-md shadow overflow-x-auto">
          <h3 className="text-xl font-semibold mb-3">
            Domain Settings
          </h3>
          <table className="min-w-full border-collapse border text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border whitespace-nowrap">
                  Domain Name
                </th>
                <th className="p-2 border whitespace-nowrap">
                  Primary
                </th>
                <th className="p-2 border whitespace-nowrap">
                  Status
                </th>
                <th className="p-2 border whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(domains) &&
                domains.map((domain, index) => (
                  <tr
                    key={domain.id || index}
                    className="border"
                  >
                    <td className="p-2 whitespace-nowrap">
                      {domain?.domainUrl ??
                        "No URL"}
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                      {domain?.isPrimary
                        ? "✔"
                        : ""}
                    </td>
                    <td
                      className={`p-2 whitespace-nowrap ${
                        domain?.status ===
                        "Active"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {domain?.status ??
                        "Unknown"}
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setShowDomainForm(true);
                          setEditDomainIndex(
                            domain.id
                          );
                          setDomainForm({
                            id: domain.id,
                            protocol:
                              domain.domainUrl.startsWith(
                                "https://"
                              )
                                ? "https://"
                                : "http://",
                            domainUrl:
                              domain.domainUrl.replace(
                                /^https?:\/\//,
                                ""
                              ),
                            isPrimary:
                              domain.isPrimary,
                            status: domain.status,
                          });
                        }}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      {!domain?.isPrimary && (
                        <button
                          onClick={() =>
                            handleDeleteDomainConfirmation(
                              domain?.id
                            )
                          }
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              setShowDomainForm(true);
              setEditDomainIndex(null);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Domain
          </button>

          {showDomainForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h4 className="font-semibold mb-2">
                  {editDomainIndex !== null
                    ? "Edit Domain"
                    : "Add New Domain"}
                </h4>
                <div className="flex mb-2">
                  <select
                    value={domainForm.protocol}
                    onChange={(e) =>
                      setDomainForm({
                        ...domainForm,
                        protocol: e.target.value,
                      })
                    }
                    className="p-2 border rounded mr-2"
                  >
                    <option value="http://">
                      http://
                    </option>
                    <option value="https://">
                      https://
                    </option>
                  </select>
                  <input
                    type="text"
                    placeholder="Domain URL"
                    value={domainForm.domainUrl}
                    onChange={(e) =>
                      setDomainForm({
                        ...domainForm,
                        domainUrl: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>

                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={domainForm.isPrimary}
                    onChange={(e) => {
                      setDomainForm({
                        ...domainForm,
                        isPrimary:
                          e.target.checked,
                      });
                      if (e.target.checked) {
                        setDomains(
                          (prevDomains) =>
                            prevDomains.map(
                              (item) => ({
                                ...item,
                                isPrimary: false,
                              })
                            )
                        );
                      }
                    }}
                    className="mr-2"
                  />
                  Primary
                </label>

                <select
                  value={domainForm.status}
                  onChange={(e) =>
                    setDomainForm({
                      ...domainForm,
                      status: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                >
                  <option value="Pending">
                    Pending
                  </option>
                  <option value="Active">
                    Active
                  </option>
                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

                <button
                  onClick={
                    editDomainIndex !== null
                      ? handleUpdateDomain
                      : handleAddDomain
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editDomainIndex !== null
                    ? "Update"
                    : "Save"}
                </button>

                <button
                  onClick={() =>
                    setShowDomainForm(false)
                  }
                  className="ml-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {showDeleteConfirmation && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-md shadow-md">
                <p className="mb-4">
                  Are you sure you want to delete
                  this domain?
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={handleDeleteDomain}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() =>
                      setShowDeleteConfirmation(
                        false
                      )
                    }
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
