import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import "../styles/ProfessionalInfo.css"; 
import farmImage from "../assets/farmImage.png"


const validationSchema = Yup.object().shape({
  education: Yup.string().required("Education is required"),
  experience: Yup.string().required("Experience is required"),
});

const ProfessionalInfo = () => {
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
      .get("https://api.example.com/professional-info", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const data = response.data;
        setValue("education", data.education);
        setValue("experience", data.experience);
      })
      .catch((error) => console.error("Error fetching professional info:", error));
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.post("https://api.example.com/professional-info/update", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Professional Information updated successfully!");
    } catch (error) {
      console.error("Error updating professional info:", error);
      alert("Failed to update professional information.");
    }
  };

  return (
    <div className="prof-container">

      
      <div className="profmain-frame">
        <form className="prof-form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Professional Details</h2>

        
          <div className="form-group">
            <label>Education <span className="required">*</span></label>
            <select {...register("education")}>
              <option value="">Select</option>
              <option value="Primary Schooling">Primary Schooling</option>
              <option value="High School">High School</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Degree">Degree</option>
              <option value="Graduate">Graduate</option>
              <option value="Post-Graduate">Post-Graduate</option>
            </select>
            <p className="error">{errors.education?.message}</p>
          </div>

          
          <div className="form-group">
            <label>Experience <span className="required">*</span></label>
            <input type="text" {...register("experience")} placeholder="e.g. 15 Years" />
            <p className="error">{errors.experience?.message}</p>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

     
        <div className="image-section">
          <img src={farmImage} alt="Crop Field" className="crop-image" />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
