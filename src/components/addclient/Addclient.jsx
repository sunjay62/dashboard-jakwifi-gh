import "./addclient.scss";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { DataGrid } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import withAuth from "../WithAuth";
import { Box } from "@mui/material";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import WidgetTwo from "../widgettwo/WidgetTwo";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";

const Addclient = () => {
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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil access token dari local storage
    const storedToken = localStorage.getItem("access_token");
    setAccessToken(storedToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { fullname, email, password };
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://172.16.26.97:5000/administrator",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        setFullname("");
        setEmail("");
        setPassword("");
        navigate("/operator/list");
        toast.success("Registered Successfully.");
      } else if (response.status === 409) {
        toast.error("User already exists.");
      } else {
        setError("Failed to register, please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to register, please try again.");
    }
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
          <div className="top">
            <h1>Add New Reseller</h1>
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
                    onChange={(e) => setFullname(e.target.value)}
                    required="required"
                  />
                </div>
                <div className="formInput">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="name@tachyon.net.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required="required"
                  />
                </div>
                <div className="formInput">
                  <label>Phone</label>
                  <input type="number" placeholder="+62 891 1234 1234" />
                </div>

                <div className="formInput">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required="required"
                  />
                </div>
                {/* <div className="formInput">
                  <label>Confirm Password</label>
                  <input type="password" />
                </div> */}
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
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="mrgBtm"></div>
        </div>
      </div>
    </>
  );
};

export default Addclient;
