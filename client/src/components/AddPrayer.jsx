import React, { useContext, useState } from "react";
// import { FlowerStore } from "../store/flower-list-store"; // Adjust store import as per your structure
import { PrayerStore } from "../store/post-list-store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const AddFlower = () => {
  const { currentUser } = useContext(AuthContext);
  const { addPrayer } = useContext(PrayerStore); // Adjust according to your context structure
  const [formData, setFormData] = useState({
    name: "",
    prayerText: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("prayerText", formData.prayerText);

    try {
      const response = await axios.post("api/v1/prayers", data, {
        headers: {
          Authorization: `Bearer ${currentUser?.data.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Prayer Created Successfully");

      // Navigate to another route if necessary
      // navigate("/flowers"); // Example route
    } catch (error) {
      console.error("Error during flower creation:", error.response?.data);
      alert("Error creating flower, please try again.");
    }

    // Call addFlower to update your context/store if needed
    addFlower(formData.name, formData.flowerImg);
  };

  return (
    <div className="create__flower">
      <form className="form create_flower__form" onSubmit={handleSubmit}>
        <h1 className="text-center bg-transparent">Add Flower</h1>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Flower Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter flower name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="flowerImg" className="form-label">
            Choose Flower Image
          </label>
          <input
            type="file"
            className="form-control"
            id="flowerImg"
            name="flowerImg"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-secondary">
          Add Flower
        </button>
      </form>
    </div>
  );
};

export default AddFlower;
