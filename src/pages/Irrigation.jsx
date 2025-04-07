import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Irrigation.css";
import fieldImage from "../assets/land.png";


const validationSchema = Yup.object().shape({
  waterSource: Yup.string().required("Water Source is required"),
  borewellDischarge: Yup.string().required("Borewell Discharge is required"),
  summerDischarge: Yup.string().required("Summer Discharge is required"),
  borewellLocation: Yup.string().required("Borewell Location is required"),
});

const Irrigation= () => {
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
      .get("https://api.example.com/irrigation-info", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;
        setValue("waterSource", data.waterSource);
        setValue("borewellDischarge", data.borewellDischarge);
        setValue("summerDischarge", data.summerDischarge);
        setValue("borewellLocation", data.borewellLocation);
      })
      .catch((error) => console.error("Error fetching irrigation info:", error));
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.post("https://api.example.com/irrigation-info/update", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      alert("Irrigation Details updated successfully!");
    } catch (error) {
      console.error("Error updating irrigation info:", error);
      alert("Failed to update information.");
    }
  };

  return (
    <div className="irrigation-container">

      <div className="irrigationmain-frame">
        <form className="irrigation-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Irrigation Details</h2>

          
          <div className="irrigationform-group">
            <label>Water Source <span className="irrigationrequired">*</span></label>
            <select {...register("waterSource")}>
              <option value="">Select</option>
              <option value="Borewell">Borewell</option>
              <option value="Open Well">Open Well</option>
              <option value="Canal">Canal</option>
              <option value="Tank">Tank</option>
              <option value="River">River</option>
              <option value="Drip">Drip</option>
            </select>
            <p className="irrigationerror">{errors.waterSource?.message}</p>
          </div>

          <div className="irrigationform-group">
            <label>Borewell wise Discharge in LPH <span className="irrigationrequired">*</span></label>
            <input type="text" {...register("borewellDischarge")} />
            <p className="error">{errors.borewellDischarge?.message}</p>
          </div>

          
          <div className="irrigationform-group">
            <label>Discharge during summer months <span className="irrigationrequired">*</span></label>
            <input type="text" {...register("summerDischarge")} />
            <p className="error">{errors.summerDischarge?.message}</p>
          </div>

          
          <div className="irrigationform-group">
            <label>Borewell location <span className="irrigationrequired">*</span></label>
            <input type="text" {...register("borewellLocation")} />
            <p className="error">{errors.borewellLocation?.message}</p>
          </div>

          <button type="submit" className="irrigationsubmit-btn">Submit</button>
        </form>

        <div className="irrigationimage-section">
          <img src={fieldImage} alt="Field Image" className="irrigationfield-image" />
        </div>
      </div>
    </div>
  );
};

export default Irrigation;
