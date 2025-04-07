import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Portal.css";
import farmImage from "../assets/farmImage.png"; 


const validationSchema = Yup.object().shape({
  role: Yup.string().required("Role/Designation is required"),
  access: Yup.string().required("Access selection is required"),
});

const PortalAccess = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("https://api.example.com/portal-access", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Portal access updated successfully!");
    } catch (error) {
      console.error("Error updating access:", error);
      alert("Failed to update portal access.");
    }
  };

  return (
    <div className="portal-container">
      <div className="portal-frame">
        <form className="portal-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Portal Access</h2>

          <div className="portal-form-group">
            <label> Role/Designation <span className="required">*</span> </label>
            <select {...register("role")}>
              <option value="">Select</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
            <p className="error">{errors.role?.message}</p>
          </div>

          
          <div className="portal-form-group">
            <label> Access <span className="required">*</span> </label>
            <select {...register("access")}>
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <p className="error">{errors.access?.message}</p>
          </div>

          <button type="submit" className="portalsubmit-btn">Submit</button>
        </form>

        <div className="portalmage-section">
          <img src={farmImage} alt="Farm Field" className="portalfarm-image" />
        </div>

      </div>
    </div>
  );
};

export default PortalAccess;
