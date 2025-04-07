import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Currentcrop.css";
import logo1 from "../assets/leftlogo.png";
import logo2 from "../assets/rightlogo.png";
import cropImage from "../assets/ricecrop.png"; 


const validationSchema = Yup.object().shape({
  surveyNumber: Yup.string().required("Survey Number is required"),
  totalLandHolding: Yup.string().required("Total Land Holding is required"),
  geoTag: Yup.string().required("Geo-tag is required"),
  selectCrop: Yup.string().required("Crop selection is required"),
  netIncome: Yup.string().required("Net Income is required"),
  soilTest: Yup.string().required("Soil Test is required"),
  soilTestCertificate: Yup.mixed().required("Soil Test Certificate is required"),
});

const CurrentCrop = () => {
  const navigate = useNavigate();

  
 // useEffect(() => {
   // const token = localStorage.getItem("token");
   // if (!token) {
    //  alert("You are not logged in! Redirecting to login.");
    //  navigate("/login");
   // }
   // }, [navigate]);

 
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
      .get("https://api.example.com/crop-info", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;
        setValue("surveyNumber", data.surveyNumber);
        setValue("totalLandHolding", data.totalLandHolding);
        setValue("geoTag", data.geoTag);
        setValue("selectCrop", data.selectCrop);
        setValue("netIncome", data.netIncome);
        setValue("soilTest", data.soilTest);
      })
      .catch((error) => console.error("Error fetching crop data:", error));
  }, [setValue]);

 
  const onSubmit = async (data) => {
    try {
      await axios.post("https://api.example.com/crop-info/update", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Crop Information updated successfully!");
    } catch (error) {
      console.error("Error updating crop info:", error);
      alert("Failed to update crop information.");
    }
  };
  const [image, setImage] = useState(null);

  // Function to handle file selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  return (
    <div className="crop-maincontainer">

      <div className="cropmain-frame">
        
        <form className="crop-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Current Crop Information</h2>
          <div className="cropform-grid">
          <div className="cropform-columnleft">
         
          <div className="form-group">
            <label>Photo <span className="required">*</span></label>
            <div className="photo-box">
             {image ? (
             <img src={image} alt="Uploaded Farmer" className="uploaded-photo" />
            ) : (
              <p>Upload Farmer Photo</p>
            )}
          </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="photo-input"
            />
          </div>

          <div className="form-group">
            <label>Survey Numbers <span className="required">*</span></label>
            <input type="text" {...register("surveyNumber")} />
            <p className="error">{errors.surveyNumber?.message}</p>
          </div>

          <div className="form-group">
            <label>Total Land Holding (In Acres Nos) <span className="required">*</span></label>
            <input type="text" {...register("totalLandHolding")} />
            <p className="error">{errors.totalLandHolding?.message}</p>
          </div>

          <div className="form-group">
            <label>Geo-tag <span className="required">*</span></label>
            <input type="text" {...register("geoTag")} />
            <p className="error">{errors.geoTag?.message}</p>
          </div>
          </div>
          <div className="cropform-columnright">
          <div className="form-group">
            <label>Select Crop <span className="required">*</span></label>
            <select {...register("selectCrop")}>
              <option value="">Select</option>
              <option value="Grains">Grains</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Cotton">Cotton</option>
            </select>
            <p className="error">{errors.selectCrop?.message}</p>
          </div>

          <div className="form-group">
            <label>Net Income (As per Current Crop/Yr) <span className="required">*</span></label>
            <input type="text" {...register("netIncome")} />
            <p className="error">{errors.netIncome?.message}</p>
          </div>

          <div className="form-group">
            <label>Soil Test <span className="required">*</span></label>
            <select {...register("soilTest")}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <p className="error">{errors.soilTest?.message}</p>
          </div>

          <div className="form-group">
            <label>Soil Test Certificate <span className="required">*</span></label>
            <input type="file" {...register("soilTestCertificate")} />
            <p className="error">{errors.soilTestCertificate?.message}</p>
          </div>
          </div>
          </div>
          <button type="submit" className="submit-btn">Submit</button>

        </form>
        <div className="cropimage-section">
          <img src={cropImage} alt="Crop Field" className="crop-imageright" />
        </div>
      </div>
    </div>
  );
};

export default CurrentCrop; 


