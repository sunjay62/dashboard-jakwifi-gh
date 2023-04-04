import "./datatable.scss";
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

//INI UNTUK UPDATE DATA

const Loading = () => {
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
  return (
    <div className="loadingContainer" onClick={handleClick}>
      <div className="loading"></div>
    </div>
  );
};

const Datatable = (props) => {
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
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [validated, setValidated] = useState(false);
  const [administrator, setAdministrator] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const [show, setShow] = useState(false);
  const [access_token, setAccessToken] = useState("");

  // const [deleteShow, setDeleteShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [showText, setShowText] = useState(false);
  const handleRefreshToken = useHandleRefreshToken();

  // UNTUK KE HALAMAN ADD CLIENT
  const toClient = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/reseller/new");
      setIsLoading(false);
    }, 1000);
  };

  // INI UNTUK UPDATE DATA

  const handleCloseEdit = () => {
    setShowEdit(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    setStatus("");
    setAdministrator("");
    setValidated(false);
  };

  const handleShowEdit = (id) => {
    setId(id);
    navigate(`/viewreseller/${id}`);
  };

  // INI UNTUK UPDATE USER

  const handleUpdate = async () => {
    // INI UNTUK VALIDASI FORM JUGA NAMUN MANUAL

    try {
      // const token = localStorage.getItem("access_token");

      const res = await axios.put(
        `http://172.16.26.97:5000/administrator`,
        changePassword
          ? {
              username: username,
              email: email,
              password: password,
              id: `${id}`,
            }
          : {
              username: username,
              email: email,
              id: `${id}`,
            },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Updated Successfuly.");
        getApi();
        setUsername("");
        setEmail("");
        setPassword("");
        setChangePassword("");
        handleCloseEdit();
      } else {
        toast.error("Failed to update user, please try again.");
      }
    } catch (err) {
      console.log(err);
      await handleRefreshToken();
    }
  };

  // INI UNTUK MEMUNCULKAN DAN MENUTUP MODAL REGISTRASI
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    setStatus("");
    setAdministrator("");
    setValidated(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      setLoading(true);
      try {
        const res = await axios.get("http://172.16.26.97:5000/administrator", {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });

        setUsers(res.data.data);
      } catch (e) {
        console.log("access token sudah expired");
        await handleRefreshToken();
      }
    };

    fetchData();
  }, []);

  // FUNCTION GETAPI INI UNTUK MELAKUKAN GET DATA LAGI KE API JIKA BERHASIL REGISTRASI AKUN BARU

  function getApi() {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // console.log(token);

        const res = await axios.get("http://172.16.26.97:5000/administrator", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setUsers(res.data.data);
      } catch (err) {
        console.log(err);
        await handleRefreshToken();
      }
    };
    fetchAllUsers();
  }

  // INI UNTUK DELETE USER

  const deleteAccount = async (id) => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.delete(`http://172.16.26.97:5000/administrator`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: {
          id: `${id}`,
        },
      });
      if (res.status === 200) {
        toast.success("Deleted Successfuly.");
        getApi();
      } else {
        toast.error("Failed to delete user, please try again.");
      }
    } catch (err) {
      console.log(err);
      await handleRefreshToken();
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
                    description="Are you sure to delete this account?"
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
      width: 50,
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "fullname", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "active", headerName: "Status", width: 130 },
    // { field: "username", headerName: "", width: 60 },
    // {field: 'username', headerName:'Name', width:60},
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
      {isLoading && <Loading />}
      <div className="home">
        <Sidebar />
        <div className="homeContainer" handleClick={handleClick}>
          <div className="navbarContainer">
            <Navbar handleClick={handleClick} />
          </div>
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
                Dashboard
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="datatable">
            <ToastContainer />

            <button className="new-account" onClick={toClient}>
              <GroupAddIcon className="iconAdd" />
              <span className="textAdd">Add New User</span>{" "}
            </button>

            <Box
              sx={{
                width: "100%",
              }}
            />

            <DataGrid
              columns={userColumnsNew.concat(actionColumn)}
              rows={addIndex(users)}
              // rowsPerPageOptions={[5, 10, 25, 50, 100]}
              pageSize={10}
            />
            {/* <Modal show={showEdit} onHide={handleCloseEdit}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User :</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Check
                      type="checkbox"
                      label="Change password"
                      className="checkboxChange"
                      checked={changePassword}
                      onChange={(e) => setChangePassword(e.target.checked)}
                    />
                    {changePassword && (
                      <Form.Control
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleUpdate}
                  disabled={!username || !email}
                  id="editButton"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal> */}
          </div>
          <div className="mrgBottom"></div>
        </div>
      </div>
    </>
  );
};

export default Datatable;
