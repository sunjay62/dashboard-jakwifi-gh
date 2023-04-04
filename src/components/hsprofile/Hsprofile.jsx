import "./hsprofile.scss";
import { DataGrid } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import withAuth from "../WithAuth";
import { Box } from "@mui/material";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import WidgetTwo from "../../components/widgettwo/WidgetTwo";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import { Tooltip, IconButton } from "@material-ui/core";
import Cookies from "js-cookie";
import useHandleRefreshToken from "../refreshtoken/Refreshtoken";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

const Hstemplate = () => {
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
  const [name, setName] = useState("");
  const [access_token, setAccessToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [template, setTemplate] = useState("");
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleRefreshToken = useHandleRefreshToken();
  const [file, setFile] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    // Ambil access token dari local storage
    const storedToken = localStorage.getItem("access_token");
    setAccessToken(storedToken);
  }, []);

  // INI UNTUK VIEW KE PROFILE BERDASARKAN IDNYA

  const handleShowEdit = (id) => {
    setId(id);
    navigate(`/viewprofile/${id}`);
  };

  // FUNCTION GETAPI INI UNTUK MELAKUKAN GET DATA LAGI KE API JIKA BERHASIL REGISTRASI AKUN BARU

  function getApi() {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // console.log(token);

        const response = await axios.get(
          "http://172.16.26.97:5000/hotspot_profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        setProfile(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" && template === "") {
      setIsNameEmpty(true);
    } else {
      // Lakukan sesuatu jika form valid

      e.preventDefault();
      const postData = { name };
      try {
        const token = localStorage.getItem("access_token");

        const response = await axios.post(
          "http://172.16.26.97:5000/hotspot_profile",
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
          setName("");
          getApi();
          toast.success("Registered Successfully.");
        } else if (response.status === 409) {
          toast.error("User already exists.");
        } else {
          setError("Failed to register, please try again.");
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          toast.error("User already exists.");
        } else {
          setError("Failed to register, please try again.");
          await handleRefreshToken();
        }
        if (error.response && error.response.status === 401) {
          // toast.error("You not have access!");
        } else {
          setError("Failed to register, please try again.");
          await handleRefreshToken();
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      setLoading(true);
      try {
        const response = await axios.get(
          "http://172.16.26.97:5000/hotspot_profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          }
        );

        console.log("test");
        setProfile(response.data.data);
        console.log(response.data.data);
        console.log(JSON.stringify(response.data.data));
      } catch (e) {
        console.log(e);
        await handleRefreshToken();
        console.log("access token sudah expired");
      }
    };

    fetchData();
  }, []);

  // INI UNTUK DELETE USER

  const deleteAccount = async (id) => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.delete(
        `http://172.16.26.97:5000/hotspot_profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: {
            id: `${id}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Deleted Successfuly.");
        // toast.error("Deleted Successfuly!", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        getApi();
      } else {
        toast.error("Failed to delete user, please try again.");
        await handleRefreshToken();
      }
    } catch (err) {
      if (error.response && error.response.status === 401) {
        // toast.error("You not have access!");
      } else {
        setError("Failed to register, please try again.");
        await handleRefreshToken();
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 125,
      renderCell: (rowData) => {
        return (
          <>
            <div className="cellAction">
              <Tooltip title="View" arrow>
                <div className="viewButtonOperator">
                  <RateReviewIcon
                    className="viewIcon"
                    onClick={() => handleShowEdit(rowData.id)}
                  />
                </div>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <div>
                  <Popconfirm
                    className="cellAction"
                    title="Delete Account"
                    description="Are you sure to delete this profile?"
                    onConfirm={() => deleteAccount(rowData.id)}
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                    }
                  >
                    <div className="deleteButtonOperator">
                      <DeleteForeverIcon />
                    </div>
                  </Popconfirm>
                </div>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  // INI UNTUK TABEL
  const userColumnsNew = [
    {
      field: "no",
      headerName: "No",
      width: 25,
    },
    { field: "id", headerName: "ID", width: 75 },
    { field: "name", headerName: "Name", width: 200 },
  ];

  // INI UNTUK PEMBUATAN NOMOR URUT SECARA OTOMATIS
  const addIndex = (array) => {
    return array.map((item, index) => {
      item.no = index + 1;
      return item;
    });
  };

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
            <ToastContainer />
            <h1>Hotspot Profile</h1>
          </div>
          <div className="containerForm">
            <div className="leftForm">
              <div className="formSection">
                <h1>Add New Hotspot Profile</h1>
                <Form onSubmit={handleSubmit} className="formHs">
                  <div className="formInput">
                    {/* <label htmlFor="profile-name">Profile Name :</label> */}
                    {/* <input
                      type="text"
                      id="profile-name"
                      name="profile-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    /> */}

                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Profile Name :</Form.Label>
                      <Form.Control
                        type="text"
                        id="profile-name"
                        name="profile-name"
                        placeholder="Profile Name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      />
                    </Form.Group>
                  </div>

                  <div className="formInput">
                    <label htmlFor="template">Template Plan :</label>
                    <select
                      id="template"
                      name="template"
                      required
                      value={template}
                      onChange={(e) => {
                        setTemplate(e.target.value);
                        setIsNameEmpty(false);
                      }}
                    >
                      <option></option>
                      <option value="template1">Template 1</option>
                      <option value="template2">Template 2</option>
                      <option value="template3">Template 3</option>
                      <option value="template4">Template 4</option>
                    </select>
                  </div>

                  <button type="submit">Create Profile</button>
                </Form>
              </div>
            </div>
            <div className="rightForm">
              <div className="listSection">
                <h1>List Hotspot Profile</h1>
                <div className="tableSection">
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  />

                  <DataGrid
                    columns={userColumnsNew.concat(actionColumn)}
                    rows={addIndex(profile)}
                    // rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    pageSize={10}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mrgBtm"></div>
        </div>
      </div>
    </>
  );
};

export default Hstemplate;
