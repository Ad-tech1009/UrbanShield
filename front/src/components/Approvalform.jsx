import { useState } from "react";
import { motion } from "framer-motion";
import { requestGuardApproval } from "@/services/guardService";

const GuardApprovalForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    contact: "",
    address: "",
    photo: "",
    governmentId: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? (value ? parseInt(value, 10) : "") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await requestGuardApproval(formData);

      onClose(); // Close modal only on successful submission
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Request Guard Approval</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL (Optional)"
            value={formData.photo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="governmentId"
            placeholder="Government ID (URL, Optional)"
            value={formData.governmentId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default GuardApprovalForm;
