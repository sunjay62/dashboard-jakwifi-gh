import "./viewreseller.scss";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import WidgetTwo from "../widgettwo/WidgetTwo";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import Typography from "@mui/material/Typography";

const Viewreseller = () => {
  const handleClick = () => {
    const loadingContainer = document.querySelector(".loadingContainer");
    const loading = document.querySelector(".loading");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".widgets");
    const homeContainer = document.querySelector(".homeContainer");
    sidebar.classList.toggle("close");
    mainContent.classList.toggle("close");
    homeContainer.classList.toggle("close");
    loadingContainer.classList.toggle("close");
    loading.classList.toggle("close");
  };
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access_token, setAccessToken] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Ambil access token dari local storage
    const storedToken = localStorage.getItem("access_token");
    setAccessToken(storedToken);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    console.log(accessToken);

    axios
      .get(`http://172.16.26.97:5000/administrator/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setUserData(res.data.id);
        setFullname(res.data.fullname);
        setEmail(res.data.email);
        setPassword(res.data.password);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleNameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const updatedUserData = { id, fullname, email, password };
    axios
      .put(`http://172.16.26.97:5000/administrator`, updatedUserData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated Successfully.");
          navigate(`/viewreseller/${id}`);
        } else {
          setError("Failed to update, please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  const [file, setFile] = useState("");

  return (
    <>
      <div className="homeService">
        <Sidebar />
        <div className="homeContainer" handleClick={handleClick}>
          <Navbar handleClick={handleClick} />
          <div className="widgettwo" handleClick={handleClick}>
            <WidgetTwo />
          </div>
          <div className="breadCrumbs">
            <Breadcrumbs
              aria-label="breadcrumb"
              // separator={<NavigateNextIcon fontSize="small" />} ini kalo mau rubah garis miring pake panah next
            >
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                href="/home"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>

              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="text.primary"
              >
                <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Profile
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="top">
            <ToastContainer />

            <h1>Update Profile</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    Image : &nbsp;
                    <DriveFolderUploadIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="formInput">
                  <label>Username</label>
                  <input type="text" placeholder="First Name" />
                </div>
                <div className="formInput">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={handleNameChange}
                    required="required"
                  />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="name@tachyon.net.id"
                    value={email}
                    onChange={handleEmailChange}
                    required="required"
                  />
                </div>
                <div className="formInput">
                  <label>Phone</label>
                  <input type="number" placeholder="+62 891 1234 1234" />
                </div>

                <div className="formInput">
                  <div className="formPwd">
                    <label className="labelPwd">Change Password </label>
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={handleToggle}
                      className="togglePwd"
                    />
                  </div>
                  {isActive && (
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required="required"
                    />
                  )}
                </div>

                <div className="selectContainer">
                  <div className="col-status">
                    <label>Status&nbsp;</label>
                    <select required="required">
                      <option>--list--</option>
                      <option value={1}>Active</option>
                      <option value={2}>Disable</option>
                      <option value={3}>Posponed</option>
                    </select>
                  </div>
                  <div className="col-access">
                    <label>Access&nbsp;</label>
                    <select required="required" id="administratorId">
                      <option>--list--</option>
                      <option value={true}>Admin</option>
                      <option value={false}>Users</option>
                    </select>
                  </div>
                </div>
                <div className="buttonContainer">
                  <button type="submit" onClick={handleSubmit}>
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mrgBottom"></div>
    </>
  );
};

export default Viewreseller;
