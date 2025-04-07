import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Proposed.css";
import cropImage from "../assets/greencrop.png";


const validationSchema = Yup.object().shape({
  surveyNumber: Yup.string().required("Survey Number is required"),
  geoTag: Yup.string().required("Geo-tag is required"),
  cropType: Yup.string().required("Crop Type is required"),
  soilTest: Yup.string().required("Soil Test selection is required"),
  totalLandHolding: Yup.string().required("Total Land Holding is required"),
  netIncome: Yup.string().required("Net Income is required"),
  soilTestCertificate: Yup.mixed().required("Soil Test Certificate is required"),
});

const Proposed = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.example.com/crop-info", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;
        setValue("surveyNumber", data.surveyNumber);
        setValue("geoTag", data.geoTag);
        setValue("cropType", data.cropType);
        setValue("soilTest", data.soilTest);
        setValue("totalLandHolding", data.totalLandHolding);
        setValue("netIncome", data.netIncome);
      })
      .catch((error) => console.error("Error fetching crop info:", error));
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("surveyNumber", data.surveyNumber);
      formData.append("geoTag", data.geoTag);
      formData.append("cropType", data.cropType);
      formData.append("soilTest", data.soilTest);
      formData.append("totalLandHolding", data.totalLandHolding);
      formData.append("netIncome", data.netIncome);
      formData.append("soilTestCertificate", file);

      await axios.post("https://api.example.com/crop-info/update", formData, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        },
      });

      alert("Proposed Crop Information updated successfully!");
    } catch (error) {
      console.error("Error updating crop info:", error);
      alert("Failed to update information.");
    }
  };

  return (
    <div className="Proposed-container">

      
      <div className="Proposedmain-frame">
        <form className="Proposed-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Proposed Crop Information</h2>

          <div className="Proposedform-grid">
          <div className="Proposedform-columnleft">
          <div className="Proposedform-group">
            <label>Survey Numbers <span className="required">*</span></label>
            <input type="text" {...register("surveyNumber")} />
            <p className="error">{errors.surveyNumber?.message}</p>
          </div>

          
          <div className="Proposedform-group">
            <label>Geo-tag <span className="required">*</span></label>
            <input type="text" {...register("geoTag")} placeholder="Latitude, Longitude" />
            <p className="error">{errors.geoTag?.message}</p>
          </div>

         
          <div className="Proposedform-group">
            <label>Select Crop <span className="required">*</span></label>
            <select {...register("cropType")}>
              <option value="">Select</option>
              <option value="Grains">Grains</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Cotton">Cotton</option>
            </select>
            <p className="error">{errors.cropType?.message}</p>
          </div>

          <div className="Proposedform-group">
            <label>Soil Test <span className="required">*</span></label>
            <select {...register("soilTest")}>
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <p className="error">{errors.soilTest?.message}</p>
          </div>
          </div> 
          
          <div className="Proposedform-columnright">
          <div className="form-group">
            <label>Total Land Holding (In Acres) <span className="required">*</span></label>
            <input type="text" {...register("totalLandHolding")} />
            <p className="error">{errors.totalLandHolding?.message}</p>
          </div>

         
          <div className="Proposedform-group">
            <label>Net Income (Per Crop/Yr) <span className="required">*</span></label>
            <input type="text" {...register("netIncome")} />
            <p className="error">{errors.netIncome?.message}</p>
          </div>

          
          <div className="Proposedform-group">
            <label>Soil Test Certificate <span className="required">*</span></label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <p className="error">{errors.soilTestCertificate?.message}</p>
          </div>
          </div>
          </div>

          <button type="submit" className="Proposedsubmit-btn">Submit</button>
        </form>

        
        <div className="Proposedimage-section">
          <img src={cropImage} alt="Crop Field" className="Proposed-image" />
        </div>
      </div>
    </div>
  );
};

export default Proposed;
