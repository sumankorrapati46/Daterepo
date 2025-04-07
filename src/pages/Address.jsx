import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Address.css";
import farmImage from "../assets/farmImage.png";

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  block: Yup.string().required("Block (mandal) is required"),
  village: Yup.string().required("Village is required"),
  zipcode: Yup.string()
    .required("Zipcode is required")
    .matches(/^\d{6}$/, "Zipcode must be 6 digits"),
});

const Address = () => {
  const navigate = useNavigate();

  
 // useEffect(() => {
   // const token = localStorage.getItem("token");
   // if (!token) {
    //  alert("You are not logged in! Redirecting to login.");
    //  navigate("/login");
   // }
  //}, [navigate]);

 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  
  useEffect(() => {
    axios
      .get("https://api.example.com/address", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;
        setValue("country", data.country);
        setValue("state", data.state);
        setValue("district", data.district);
        setValue("block", data.block);
        setValue("village", data.village);
        setValue("zipcode", data.zipcode);
      })
      .catch((error) => console.error("Error fetching address:", error));
  }, [setValue]);

 
  const onSubmit = async (data) => {
    try {
      await axios.post("https://api.example.com/address/update", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address.");
    }
  };

  return (
    <div className="address-container">

      <div className="addressmain-frame">
     
        <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Address</h2>

          <div className="addressform-group">
            <label>Country <span className="required">*</span></label>
            <input type="text" {...register("country")} />
            <p className="error">{errors.country?.message}</p>
          </div>

          <div className="addressform-group">
            <label>State <span className="required">*</span></label>
            <input type="text" {...register("state")} />
            <p className="error">{errors.state?.message}</p>
          </div>

          <div className="addressform-group">
            <label>District <span className="required">*</span></label>
            <input type="text" {...register("district")} />
            <p className="error">{errors.district?.message}</p>
          </div>

          <div className="addressform-group">
            <label>Block (mandal) <span className="required">*</span></label>
            <input type="text" {...register("block")} />
            <p className="error">{errors.block?.message}</p>
          </div>

          <div className="addressform-group">
            <label>Village <span className="required">*</span></label>
            <input type="text" {...register("village")} />
            <p className="error">{errors.village?.message}</p>
          </div>

          <div className="addressform-group">
            <label>Zipcode <span className="required">*</span></label>
            <input type="text" {...register("zipcode")} />
            <p className="error">{errors.zipcode?.message}</p>
          </div>

          <button type="submit" className="addresssubmit-btn">Update Address</button>
        </form>

        
        <div className="addressimage-section">
          <img src={farmImage} alt="Farm Field" className="addressfarm-image" />
        </div>
      </div>
    </div>
  );
};

export default Address; 
