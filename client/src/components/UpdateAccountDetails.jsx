import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateAccountDetails = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  // console.log(currentUser.data.user._id);
  const navigate = useNavigate();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { fullName, email } = Object.fromEntries(formData);

    // Merge existing user data with the updated data
    const updatedUser = {
      ...currentUser.data.user, // Spread the current user details
      fullName,
      email,
    };

    // console.log(currentUser.id);
    try {
      const res = await axios.patch(
        `api/v1/users/update-account`,
        updatedUser, // Send the merged user data
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      console.log(res.data);
      // updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.responce.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdateSubmit} className="update-form">
        <h3>Update Account Details</h3>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            defaultValue={currentUser.data.user.fullName}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={currentUser.data.user.email}
            required
          />
        </div>
        <button type="submit">Update</button>
        <button type="button">Cancel</button>
      </form>
    </>
  );
};

export default UpdateAccountDetails;
