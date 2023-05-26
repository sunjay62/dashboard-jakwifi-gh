import "./hsserver.scss";
import { DataGrid } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Grid, Select, MenuItem } from "@material-ui/core";
import { CopyTwoTone } from "@ant-design/icons";
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
import withAuth from "../../components/withAuth";
import { Modal, message, Button } from "antd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CachedIcon from "@mui/icons-material/Cached";
import { TextFormatRounded } from "@mui/icons-material";

const Hsserver = () => {
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
  // const handleRefreshToken = useHandleRefreshToken();
  const [file, setFile] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [id, setId] = useState("");
  const [templates, setTemplates] = useState([]);

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
          "http://172.16.26.97:5000/hotspot_profile/radius_server",
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

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      setLoading(true);
      try {
        const response = await axios.get(
          "http://172.16.26.97:5000/hotspot_profile/radius_server",
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
        // await handleRefreshToken();
        console.log("access token sudah expired");
      }
    };

    fetchData();
  }, []);

  // INI UNTUK DAPETIN DATA TEMPLATE
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

        setTemplates(response.data.data);
        console.log(response.data.data);
        console.log(JSON.stringify(response.data.data));
      } catch (e) {
        console.log(e);
        // await handleRefreshToken();
        console.log("access token sudah expired");
      }
    };

    fetchData();
  }, []);

  // INI UNTUK DELETE PROFILE

  const deleteAccount = async (id) => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.delete(
        `http://172.16.26.97:5000/hotspot_profile/radius_server`,
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
        // await handleRefreshToken();
      }
    } catch (err) {
      if (error.response && error.response.status === 401) {
        // toast.error("You not have access!");
      } else {
        setError("Failed to register, please try again.");
        // await handleRefreshToken();
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
                    onClick={() => showModalEdit(rowData.id)}
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
    { field: "id", headerName: "ID", width: 50 },
    { field: "host", headerName: "Host", width: 125 },
    { field: "port", headerName: "Port", width: 75 },
    {
      field: "name",
      headerName: "Name",
      width: 175,
      valueGetter: (params) => params.row.profile_info.name,
    },
  ];

  // INI UNTUK PEMBUATAN NOMOR URUT SECARA OTOMATIS
  const addIndex = (array) => {
    return array.map((item, index) => {
      item.no = index + 1;
      return item;
    });
  };

  // INI UNTUK POST DATA TAMBAH TEMPLATE DI DALAM PROFILE
  // Definisikan state untuk nilai select yang dipilih
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [port, setPort] = useState("");
  const [host, setHost] = useState("");
  const [modalData, setModalData] = useState(null);
  const [visible, setVisible] = useState(false);
  // Fungsi untuk menangani perubahan nilai select
  const handleSelectChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleSubmitServer = async (e, values) => {
    if (e) e.preventDefault();

    const postData = {
      host: values.ipAddressOrUrl,
      profile_id: selectedTemplate,
      port: values.port,
    };
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://172.16.26.97:5000/hotspot_profile/radius_server",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      console.log(response.status);
      console.log(response.data);

      if (response.status === 200) {
        toast.success("Registered Successfully.");
        getApi();
        setPort("");
        setHost("");
        setSelectedTemplate("");
        setModalData(response.data);
        setVisible(true);
      } else if (response.status === 409) {
        toast.error("Template already exists.");
      } else {
        setError("Failed to register, please try again.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error("Template already exists.");
      } else {
        setError("Failed to register, please try again.");
        console.log(error);
      }
      if (error.response && error.response.status === 401) {
        // toast.error("You not have access!");
      } else {
        setError("Failed to register, please try again.");
        console.log(error);
      }
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  // INI UNTUK FUNGSI COPY SECRET KEY
  const handleCopy = () => {
    // Copy secret key to clipboard
    const el = document.createElement("textarea");
    el.value = modalData?.secret_key || "";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    message.success("Secret key copied to clipboard");
  };

  //INI UNTUK MODAL EDIT TEMPLATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalEdit = (id) => {
    setId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setSecretKey("");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSecretKey("");
  };

  // INI UNTUK GET DATA DAN UPDATE DATA

  const [serverId, setServerId] = useState("");
  const [hostName, setHostName] = useState("");
  const [portServer, setPortServer] = useState("");

  const handleServerId = (event) => {
    setServerId(event.target.value);
  };
  const handlePortServer = (event) => {
    setPortServer(event.target.value);
  };
  const handleHostName = (event) => {
    setHostName(event.target.value);
  };

  // INI UNTUK GET DATA UPDATE

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    axios
      .get(`http://172.16.26.97:5000/hotspot_profile/radius_server/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);

        setServerId(res.data.id);
        setPortServer(res.data.port);
        setHostName(res.data.host);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // INI UNTUK UPDATE

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const updatedUserData = {
      host: hostName,
      id: id,
      port: portServer,
    };
    axios
      .put(
        `http://172.16.26.97:5000/hotspot_profile/radius_server`,
        updatedUserData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated Successfully.");
          getApi();
          handleOk();
        } else {
          setError("Failed to update, please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  // INI UNTUK VALIDASI

  const IP_ADDRESS_REGEX = /^(https?:\/\/)?(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  const URL_REGEX =
    /^(https?:\/\/)?([\da-z.-]+)\.(com|id|co.id|net.id|co)([/\w .-]*)*\/?$/i;

  const validationSchema = Yup.object().shape({
    port: Yup.number().required("Port Server is required"),
    ipAddressOrUrl: Yup.string()
      .required("IP Address or URL is required")
      .matches(
        new RegExp(`(${IP_ADDRESS_REGEX.source})|(${URL_REGEX.source})`),
        "Invalid IP Address or URL"
      ),
  });

  const initialValues = {
    profile_id: "",
    port: "",
    ipAddressOrUrl: "",
  };

  // INI UNTUK GET GENERETE SECRET KEY

  const [secretKey, setSecretKey] = useState("");

  const handleGenerateClick = () => {
    const token = localStorage.getItem("access_token");
    axios
      .get(
        `http://172.16.26.97:5000/hotspot_profile/radius_server/${id}/generate_secret`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then((response) => {
        const { id, secret_key } = response.data;
        console.log(`ID: ${id}, Secret Key: ${secret_key}`);
        setSecretKey(secret_key);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    setSecretKey(e.target.value);
  };

  const handleCopyGenerate = () => {
    navigator.clipboard.writeText(secretKey);
    message.success("Secret key copied to clipboard");
  };

  return (
    <>
      <div className="mainContainer">
        <Modal
          title="Update Hotspot Server"
          open={isModalOpen}
          onOk={handleSubmitUpdate}
          onCancel={handleCancel}
        >
          <form className="formServerEdit" onSubmit={(e) => e.preventDefault()}>
            <div className="formInputServerEdit">
              <label htmlFor="">ID</label>
              <input type="text" disabled value={serverId} />
            </div>
            <div className="formInputServerEdit">
              <label htmlFor="">Hostname</label>
              <input type="text" value={hostName} onChange={handleHostName} />
            </div>
            <div className="formInputServerEdit">
              <label htmlFor="">Port</label>
              <input
                type="number"
                value={portServer}
                onChange={handlePortServer}
              />
            </div>
            <div className="formInputServerEdit">
              <label htmlFor="">Generate Secret</label>
              <input
                type="text"
                value={secretKey}
                onChange={handleInputChange}
              />
              <button
                className="btnCopy"
                size="small"
                onClick={handleCopyGenerate}
              >
                <Tooltip className="copytitle" title="Copy" arrow>
                  <ContentCopyIcon />
                </Tooltip>
              </button>
              <button
                className="btnCopy"
                size="small"
                type="submit"
                onClick={handleGenerateClick}
              >
                <Tooltip className="copytitle" title="Generate" arrow>
                  <CachedIcon />
                </Tooltip>
              </button>
            </div>
          </form>
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
                  Hotspot Server
                </Typography>
              </Breadcrumbs>
            </div>
            <div className="topHotspotServer">
              <ToastContainer />
              <h1>Hotspot Server</h1>
            </div>
            <div className="containerForm">
              <div className="leftForm">
                <div className="formSection">
                  <h1>Add New Hotspot Server</h1>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, e) => handleSubmitServer(e, values)}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      handleChange,
                      handleBlur,
                    }) => (
                      <Form className="formHsServer">
                        <div className="formInputServer">
                          <Grid item xs={12} className="inputGrid">
                            <TextField
                              fullWidth
                              id="ipAddressOrUrl"
                              name="ipAddressOrUrl"
                              label="IP Address or URL"
                              value={values.ipAddressOrUrl}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.ipAddressOrUrl &&
                                Boolean(errors.ipAddressOrUrl)
                              }
                              helperText={
                                touched.ipAddressOrUrl && errors.ipAddressOrUrl
                              }
                              InputProps={{
                                classes: {
                                  root: "input-root",
                                  focused: "input-focused",
                                },
                                inputProps: {
                                  pattern: `(${IP_ADDRESS_REGEX.source})|(${URL_REGEX.source})`,
                                },
                              }}
                              InputLabelProps={{
                                classes: {
                                  root: "input-label-blue",
                                  focused: "input-label-blue",
                                },
                              }}
                            />
                          </Grid>
                        </div>
                        <div className="formInputServer">
                          <label htmlFor="template">Profile Name :</label>
                          <select
                            id="template"
                            name="template"
                            required
                            value={selectedTemplate}
                            onChange={handleSelectChange}
                          >
                            <option value="" disabled selected>
                              --list profile--
                            </option>
                            {templates.map((template) => (
                              <option key={template.id} value={template.id}>
                                {template.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="formInputServer">
                          <Grid item xs={12} className="inputGrid">
                            <TextField
                              fullWidth
                              type="number"
                              placeholder="Port Server"
                              label="Port Server"
                              required
                              id="port"
                              name="port"
                              value={values.port}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.port && Boolean(errors.port)}
                              helperText={touched.port && errors.port}
                            />
                          </Grid>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            handleSubmitServer(e, values);
                          }}
                        >
                          Create Profile
                        </button>{" "}
                      </Form>
                    )}
                  </Formik>
                  <Modal
                    title="Registration Success!"
                    visible={visible}
                    onOk={handleCloseModal}
                    onCancel={handleCloseModal}
                    footer={[
                      <Button
                        key="ok"
                        type="primary"
                        onClick={handleCloseModal}
                      >
                        OK
                      </Button>,
                    ]}
                    className="success-modal"
                  >
                    <table className="my-table">
                      <tr>
                        <th>
                          <span>Hostname</span>
                        </th>
                        <td>{modalData?.host}</td>
                      </tr>
                      <tr>
                        <th>
                          <span>Port</span>
                        </th>
                        <td>{modalData?.port}</td>
                      </tr>
                      <tr>
                        <th>
                          <span>ID</span>
                        </th>
                        <td>{modalData?.id}</td>
                      </tr>
                      <tr>
                        <th>
                          <span>Profile ID</span>
                        </th>
                        <td>{modalData?.profile_id}</td>
                      </tr>
                      <tr>
                        <th>
                          <span>Profile Info</span>
                        </th>
                        <td>{modalData?.profile_info.name}</td>
                      </tr>
                      <tr>
                        <th>
                          <span>Secret Key</span>
                        </th>
                        <td className="button-col">
                          {modalData?.secret_key}
                          {modalData?.secret_key && (
                            <button
                              className="btnCopy"
                              size="small"
                              onClick={handleCopy}
                            >
                              <Tooltip className="copytitle" title="Copy" arrow>
                                <ContentCopyIcon />
                              </Tooltip>
                            </button>
                          )}
                        </td>
                      </tr>
                    </table>
                  </Modal>
                </div>
              </div>
              <div className="rightForm">
                <div className="listSection">
                  <h1>List Hotspot Server</h1>
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
      </div>
    </>
  );
};

export default withAuth(Hsserver);
