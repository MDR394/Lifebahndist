import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Header = ({ isAuthenticated }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  //const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.data.accessToken}`,
          },
        }
      );
      alert("Logout Successful");
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "jwt expired"
      ) {
        // Handle token refresh here
        try {
          const response = await axios.post("api/v1/users/refresh-token", {
            refreshToken: currentUser?.data.refreshToken,
          });
          const { accessToken } = response.data.data;
          // Update access token and retry logout
          currentUser.data.accessToken = accessToken;
          await handleLogout();
        } catch (refreshError) {
          console.error("Error during token refresh:", refreshError);
          alert("Session expired. Please log in again.");
          setCurrentUser(null);
          navigate("/");
        }
      } else {
        console.error("Error during logout:", error);
        alert("An error occurred during logout. Please try again.");
      }
    }
  };

  return (
    <>
      <header className="bg-dark p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center text-white fw-bold mb-2 mb-lg-0 text-decoration-none"
            >
              LifeBahn Heaven
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link  fw-bold "
                  aria-current="page"
                >
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#home"></use>
                  </svg>
                  Home
                </Link>
              </li>

              {!currentUser ? (
                <>
                  <li className="nav-item">
                    <Link to={"/sign-up"} className="nav-link ">
                      <svg className="bi pe-none me-2" width="16" height="16">
                        <use xlinkHref="#table"></use>
                      </svg>
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link ">
                      <svg className="bi pe-none me-2" width="16" height="16">
                        <use xlinkHref="#grid"></use>
                      </svg>
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/memoriams"} className="nav-link px-3">
                      Memoriams
                    </Link>
                  </li>
                  {currentUser.data.roles === "sponsor" ? (
                    <li className="nav-item">
                      <Link to={"/create-post"} className="nav-link fw-bold  ">
                        <svg className="bi pe-none me-2" width="16" height="16">
                          <use xlinkHref="#speedometer2"></use>
                        </svg>
                        Add Rip
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                </>
              )}

              {/* <li>
                <Link to={"/"} className="nav-link px-3 ">
                  Groups
                </Link>
              </li> 
              <li>
                <Link to={"/about-us"} className="nav-link px-3 ">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"} className="nav-link px-3 ">
                  Contact us
                </Link>
              </li>*/}
            </ul>

            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 search__input"
              role="search"
            >
              <input
                type="search"
                className="form-control bg-dark text-white"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle text-white"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentUser ? (
                  <span className="m-2">
                    <img
                      src={
                        currentUser?.data?.user?.avatar || "default-avatar-url"
                      }
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />{" "}
                    {currentUser.data.user.userName}
                  </span>
                ) : (
                  ""
                )}
              </a>
              <ul className="dropdown-menu text-small" style={{}}>
                {currentUser ? (
                  <>
                    <li>
                      <Link
                        to={"/profile"}
                        className="dropdown-item bg-light"
                        href="#"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Sign out
                      </button>
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
