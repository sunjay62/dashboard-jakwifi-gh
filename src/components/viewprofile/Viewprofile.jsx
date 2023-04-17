import "./viewprofile.scss";
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
import { DataGrid } from "@mui/x-data-grid";
import { Popconfirm } from "antd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@material-ui/core";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const Viewprofile = () => {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access_token, setAccessToken] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Ambil access token dari local storage
    const storedToken = localStorage.getItem("access_token");
    setAccessToken(storedToken);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    axios
      .get(`http://172.16.26.97:5000/hotspot_profile/${id}/template`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setUsers(res.data.template_plan);
        // console.log(res.data.template_plan);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    // Ambil access token dari local storage
    const storedToken = localStorage.getItem("access_token");
    setAccessToken(storedToken);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    axios
      .get(`http://172.16.26.97:5000/hotspot_profile/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setUserData(res.data.id);
        setName(res.data.name);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
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
    const updatedUserData = { id, name };
    axios
      .put(`http://172.16.26.97:5000/hotspot_profile`, updatedUserData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated Successfully.");
          navigate(`/viewprofile/${id}`);
        } else {
          setError("Failed to update, please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  // FUNCTION GETAPI INI UNTUK MELAKUKAN GET DATA LAGI KE API JIKA BERHASIL REGISTRASI AKUN BARU

  function getApi() {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // console.log(token);

        const res = await axios.get(
          `http://172.16.26.97:5000/hotspot_profile/${id}/template`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        setUsers(res.data.template_plan);
        console.log(res.data.template_plan);
      } catch (err) {
        console.log(err);
        // await handleRefreshToken();
      }
    };
    fetchAllUsers();
  }

  // INI UNTUK DELETE USER

  const deleteAccount = async (id_registered) => {
    try {
      const token = localStorage.getItem("access_token");
      // console.log(id_registered);
      const res = await axios.delete(
        `http://172.16.26.97:5000/hotspot_profile/template`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: {
            id: `${id_registered}`,
          },
        }
      );
      console.log(res.data.id);

      if (res.status === 200) {
        toast.success("Deleted Successfuly.");
        getApi();
      } else {
        toast.error("Failed to delete user, please try again.");
      }
    } catch (err) {
      console.log(err);
      // await handleRefreshToken();
    }
  };

  const [file, setFile] = useState("");

  // INI AWAL CODE UNTUK LIST TABLE TEMPLATE PROFILE

  const columns = [
    { field: "id_registered", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "type_id", headerName: "Plan ID", width: 100 },
    { field: "expired", headerName: "Expired", width: 100 },
    { field: "kuota", headerName: "Kuota", width: 100 },
    { field: "uptime", headerName: "Uptime /s", width: 100 },
    { field: "limit_shared", headerName: "Shared", width: 100 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (rowData) => {
        return (
          <>
            <div className="cellAction">
              {/* <Tooltip title="View" arrow>
                <div className="viewButtonOperator">
                  <RateReviewIcon
                    className="viewIcon"
                    onClick={() => handleShowEdit(rowData.id)}
                  />
                </div>
              </Tooltip> */}
              <Tooltip title="Delete" arrow>
                <div>
                  <Popconfirm
                    className="cellAction"
                    title="Delete Account"
                    description="Are you sure to delete this account?"
                    onConfirm={() => deleteAccount(rowData.row.id_registered)}
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

  // INI AKHIR CODE UNTUK LIST TABLE TEMPLATE PROFILE

  //INI UNTUK MODAL EDIT TEMPLATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mainContainer">
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
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
                      value={name}
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
            <div className="listContainer">
              <div className="listTop">
                <h2>List Template Used</h2>
                <button onClick={showModal}>Add New Template</button>
              </div>
              <div className="listBottom">
                <div
                  style={{ height: 371, width: "100%", overflowY: "hidden" }}
                >
                  <DataGrid
                    rows={users}
                    columns={columns.concat(actionColumn)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                  />
                </div>
              </div>
            </div>
            <div className="mrgBtn"></div>
          </div>
        </div>

        <div className="mrgBottom"></div>
      </div>
    </>
  );
};

export default Viewprofile;
