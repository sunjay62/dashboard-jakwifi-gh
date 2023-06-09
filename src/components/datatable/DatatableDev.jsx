import "./datatable.scss";
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
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import WidgetTwo from "../../components/widgettwo/WidgetTwo";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";

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

  // const [deleteShow, setDeleteShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [showText, setShowText] = useState(false);

  // UNTUK KE CREATE ACCOUNT
  const toClient = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/operator/new");
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
    setShowEdit(true);
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

  //INI UNTUK MEMUNCULKAN DAN MENUTUP MODAL ALERT DELETE
  // const handleCloseDelete = () => setDeleteShow(false);
  // const handleShowDelete = () => setDeleteShow(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");

  //   if (!token) {
  //     // no token found, redirect to login
  //     navigate("/");
  //   } else {
  //     // check if token is valid
  //     try {
  //       const decoded = jwt_decode(token);
  //       if (decoded.exp < Date.now() / 1000) {
  //         // token has expired, redirect to login
  //         // console.log(decoded);

  //         navigate("/");
  //       }
  //     } catch (err) {
  //       // invalid token, redirect to login
  //       navigate("/");
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      setLoading(true);
      try {
        const res = await axios.get("http://172.16.26.97:5000/administrator", {
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
          },
        });

        console.log(res.data);
        console.log(res.data.data);

        setUsers(res.data.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // FUNCTION GETAPI INI UNTUK MELAKUKAN GET DATA LAGI KE API JIKA BERHASIL REGISTRASI AKUN BARU

  function getApi() {
    const fetchAllUsers = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        // console.log(token);

        const res = await axios.get("http://172.16.26.97:5000/administrator", {
          headers: {
            "Content-Type": "application/json",
            Authorization: access_token,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }

  // INI UNTUK DELETE USER

  const deleteAccount = async (id) => {
    // const token = localStorage.getItem("access_token");
    try {
      const res = await axios.delete(
        `http://172.16.26.97:5000/administrator`,

        {
          data: {
            id: `${id}`,
          },
          headers: {
            "Content-Type": "application/json",
            // Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Deleted Successfuly.");
        getApi();
      } else {
        toast.error("Failed to delete user, please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // //INI SUBMIT UNTUK POST DATA ATAU CREATE AKUN
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // setValid(validateEmail(email));

  //   //INI UNTUK VALIDASI FORM
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }

  //   setValidated(true);

  //   // INI UNTUK VALIDASI FORM JUGA NAMUN MANUAL
  //   if (
  //     !username ||
  //     !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ||
  //     !password ||
  //     !status ||
  //     !administrator
  //   ) {
  //     return;
  //   }

  //   try {
  //     // const token = localStorage.getItem("access_token");

  //     const response = await axios.post(
  //       "http://172.16.26.97:5000/administrator",
  //       {
  //         username,
  //         email,
  //         password,
  //         // confPassword,
  //         // status,
  //         administrator,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Authorization: token,
  //         },
  //       }
  //     );

  //     // console.log(response.status);

  //     if (response.status === 200) {
  //       handleClose();
  //       setUsername("");
  //       setEmail("");
  //       setPassword("");
  //       setConfPassword("");
  //       setStatus("");
  //       setAdministrator("");
  //       toast.success("Registered Successfuly.");
  //       getApi();
  //     } else if (response.status === 409) {
  //       toast.error("User already exists.");
  //     } else {
  //       setError("Failed to register, please try again.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (rowData) => {
        return (
          <>
            <div className="cellAction">
              <div className="viewButton">
                <BorderColorIcon onClick={() => handleShowEdit(rowData.id)} />
              </div>

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
                  <a href="#" className="deleteButton">
                    <DeleteForeverIcon />
                  </a>
                </Popconfirm>
              </div>
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
            {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="username"
                placeholder="full name"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required="required"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@tachyon.net.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required="required"
              />
            </Form.Group>

            <div className="row">
              <div className="col">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required="required"
                />{" "}
              </div>
              <div className="col">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  required="required"
                />{" "}
              </div>
            </div>
            <div className="row" id="status">
              <div className="col">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required="required"
                >
                  <option></option>
                  <option>Active</option>
                  <option>Disable</option>
                </Form.Select>
              </div>
              <div className="col">
                <Form.Label>Access</Form.Label>
                <Form.Select
                  value={administrator}
                  onChange={(e) => setAdministrator(e.target.value)}
                  required="required"
                  id="administratorId"
                >
                  <option></option>
                  <option value={true}>Admin</option>
                  <option value={false}>Users</option>
                </Form.Select>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="close-btn"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button className="submit-btn" type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal> */}

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
            <Modal show={showEdit} onHide={handleCloseEdit}>
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
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Datatable;
