import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const UpdatePost = () => {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [postImg, setPostImg] = useState([]);
  const [post, setPost] = useState({ title: "", description: "" });

  const navigate = useNavigate();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { title, description } = Object.fromEntries(formData);

    try {
      if (title || description || postImg[0]) {
        const postRes = await axios.put(
          `api/v1/posts/${selectedPost._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`,
            },
          }
        );
        console.log(postRes.data);
      }
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      {selectedPost && (
        <form onSubmit={handleUpdateSubmit} className="update-form">
          <h3>Update Post</h3>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="postImg">Image</label>
            <input
              type="file"
              id="postImg"
              onChange={(e) => setPostImg(e.target.files[0])}
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setSelectedPost(null)}>
            Cancel
          </button>
        </form>
      )}
    </>
  );
};

export default UpdatePost;
