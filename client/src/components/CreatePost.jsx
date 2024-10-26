import React, { useContext, useState } from "react";
import { PostList } from "../store/post-list-store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const CreatePost = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  const { addPost } = useContext(PostList);
  const [formData, setFormData] = useState({
    userId: "",
    postTitle: "",
    reactions: "",
    birthPlace: "",
    burial: "",
    plot: "",
    dateOfBirth: "",
    deathDate: "",
    postBody: "",
    tags: "",
    postImg: null,
  });
  const navigate = useNavigate(); // this is used to navigate to a dynamic url after doing any task

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("owner", formData.userId);
    data.append("title", formData.postTitle);
    data.append("description", formData.postBody);
    data.append("reactions", formData.reactions);
    data.append("birthPlace", formData.birthPlace);
    data.append("burial", formData.burial);
    data.append("plot", formData.plot);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("deathDate", formData.deathDate);
    data.append("tags", formData.tags);
    data.append("postImg", formData.postImg);

    try {
      const response = await axios.post("api/v1/posts", data, {
        headers: {
          Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
        },
      });
      // console.log(response.data);
      alert("Post Created Successfully");

      navigate("/");
    } catch (error) {
      console.error("Error during creating post:", error.response.data);
      alert("Error creating post, please try again.");
    }

    // Call addPost with correct parameters
    addPost(
      formData.userId,
      formData.postTitle,
      formData.reactions,
      formData.birthPlace,
      formData.burial,
      formData.plot,
      formData.dateOfBirth,
      formData.deathDate,
      formData.postBody,
      formData.tags
    );
  };

  return (
    <div className="create__post">
      <form className="form create_post__form" onSubmit={handleSubmit}>
        <h1 className="text-center bg-transparent">Add Rip</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Rip Name
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="postTitle"
            value={formData.postTitle}
            onChange={handleChange}
            placeholder="George Washington..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="deathDate" className="form-label">
            Death
          </label>
          <input
            type="date"
            className="form-control"
            id="deathDate"
            name="deathDate"
            value={formData.deathDate}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="birthPlace" className="form-label">
            Birth Place
          </label>
          <input
            type="text"
            className="form-control"
            id="birthPlace"
            name="birthPlace"
            value={formData.birthPlace}
            onChange={handleChange}
            placeholder="Toronto Canada.."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="burial" className="form-label">
            Burial
          </label>
          <input
            type="text"
            className="form-control"
            id="burial"
            name="burial"
            value={formData.burial}
            onChange={handleChange}
            placeholder="NY USA.."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="plot" className="form-label">
            Plot
          </label>
          <input
            type="text"
            className="form-control"
            id="plot"
            name="plot"
            value={formData.plot}
            onChange={handleChange}
            placeholder="madrid span... "
          />
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Discription
          </label>
          <textarea
            rows="4"
            cols="50"
            className="form-control"
            id="body"
            name="postBody"
            value={formData.postBody}
            onChange={handleChange}
            placeholder="Tell us more about him/her"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Enter Traits you like about him
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Please enter the traits using space"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            Number of Flowers
          </label>
          <input
            type="text"
            className="form-control"
            id="reactions"
            name="reactions"
            value={formData.reactions}
            onChange={handleChange}
            placeholder="number of flowers..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="postImg" className="form-label">
            Choose Rip Image
          </label>
          <input
            type="file"
            className="form-control"
            id="postImg"
            name="postImg"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-secondary">
          Add Rip
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
