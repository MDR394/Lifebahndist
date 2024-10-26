import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    avatar: null,
    // coverImage: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("userName", formData.userName);
    data.append("password", formData.password);
    data.append("avatar", formData.avatar);
    // data.append("coverImage", formData.coverImage);

    try {
      const response = await axios.post("api/v1/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data);
      alert("User Registered Successfully");

      navigate("/login");
    } catch (error) {
      // console.error("Error during signup:", error.response.data);
      // alert();

      if (error.response && error.response.status === 408) {
        alert("Email Already Exist");
      } else if (error.response && error.response.status === 409) {
        alert("Username Already Exist");
      } else {
        console.error("Error during signup:", error.response.data);
        alert("An error occurred during sign-up. Please try again.");
      }
    }
  };

  return (
    <section className="vh-70 bg-image">
      <form className="form" onSubmit={handleSubmit}>
        <p id="heading">Create an account</p>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="Username"
            className="input-field"
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="text"
            id="name"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            className="input-field"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            className="input-field"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            type="file"
            id="avatar"
            name="avatar"
            className="input-field"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-5">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form2Example3cg"
          />
          <label className="form-check-label" htmlFor="form2Example3g">
            I agree to all statements in{" "}
            <a href="#!" className="text-body ">
              <u className="text-warning">Terms of service</u>
            </a>
          </label>
        </div>
        <div className="btn">
          <button className="button1" type="submit">
            Register
          </button>
          <button className="button2" onClick={() => setIsSignUp(true)}>
            Login
          </button>
        </div>
        <button className="button3">Forgot Password</button>
      </form>
    </section>
  );
};

export default SignUp;
