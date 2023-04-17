import "./hstemplate.scss";
import { DataGrid } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import withAuth from "../WithAuth";
import useHandleRefreshToken from "../refreshtoken/Refreshtoken";
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
import { Modal } from "antd";

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
  const [fullname, setFullname] = useState("");
  const [access_token, setAccessToken] = useState("");
  const [error, setError] = useState("");
  const [listTemplate, setListTemplate] = useState([]);
  const navigate = useNavigate();
  const [template, setTemplate] = useState("template1");
  const [users, setUsers] = useState([]);
  const handleRefreshToken = useHandleRefreshToken();
  const [name, setName] = useState("");
  const [expired, setExpired] = useState("");
  const [kuota, setKuota] = useState("");
  const [limit_shared, setLimit_Shared] = useState("");
  const [price, setPrice] = useState("");
  const [type_id, setType_Id] = useState("");
  const [uptime, setUptime] = useState("");
  const [loading, setLoading] = useState(true);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [enable_expired, setEnable_Expired] = useState(false);
  const [enable_kuota, setEnable_Kuota] = useState(false);
  const [enable_uptime, setEnable_Uptime] = useState(false);
  const [enable_limit_shared, setEnable_Limit_Shared] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [type_IdEdit, setType_IdEdit] = useState("");
  const [expiredEdit, setExpiredEdit] = useState("");
  const [kuotaEdit, setKuotaEdit] = useState("");
  const [sharedEdit, setSharedEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [uptimeEdit, setUptimeEdit] = useState("");
  const [userData, setUserData] = useState({});
  const [id, setId] = useState("");
  const [tipeId, setTipeId] = useState("");

  const [selectedUptimePost, setSelectedUptimePost] = useState("seconds");
  const [selectedExpiredPost, setSelectedExpiredPost] = useState("seconds");
  const [selectedUptime, setSelectedUptime] = useState("seconds");
  const [selectedExpired, setSelectedExpired] = useState("seconds");
  const [uptimeSecondsPost, setUptimeSecondsPost] = useState(0);
  const [expiredSecondsPost, setExpiredSecondsPost] = useState(0);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [expiredSeconds, setExpiredSeconds] = useState(0);

  useEffect(() => {
    // Ambil access token dari local storage
    const storedToken = localStorage.getItem("access_token");
    setAccessToken(storedToken);
  }, []);

  // FUNCTION GETAPI INI UNTUK MELAKUKAN GET DATA LAGI KE API JIKA BERHASIL REGISTRASI AKUN BARU

  function getApi() {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // console.log(token);

        const response = await axios.get(
          "http://172.16.26.97:5000/hotspot_plan/plan_template",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        setListTemplate(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }

  // INI UNTUK GET DATA UPDATE

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    axios
      .get(`http://172.16.26.97:5000/hotspot_plan/plan_template/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        // console.log(res.data);

        setUserData(res.data.id);
        setNameEdit(res.data.name);
        setIdEdit(res.data.id);
        setType_IdEdit(res.data.type_id);
        setExpiredEdit(res.data.expired);
        setKuotaEdit(res.data.kuota);
        setSharedEdit(res.data.limit_shared);
        setPriceEdit(res.data.price);
        setUptimeEdit(res.data.uptime);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleNameChange = (event) => {
    setNameEdit(event.target.value);
  };
  const handleUserDataChange = (event) => {
    setUserData(event.target.value);
  };
  const handleIdChange = (event) => {
    setIdEdit(event.target.value);
  };
  const handleTypeIdChange = (event) => {
    setType_IdEdit(event.target.value);
  };
  const handleExpiredChange = (event) => {
    const newExpired = event.target.value;
    setExpiredEdit(newExpired);

    let factor = 1;
    switch (selectedExpired) {
      case "month":
        factor = 60 * 60 * 24 * 30;
        break;
      case "day":
        factor = 60 * 60 * 24;
        break;
      case "hours":
        factor = 60 * 60;
        break;
      case "minutes":
        factor = 60;
        break;
      default:
        factor = 1;
    }
    const expiredSeconds = newExpired * factor;
    setExpiredSeconds(expiredSeconds);
  };

  const handleUnitExpiredChange = (event) => {
    const selected = event.target.value;
    setSelectedExpired(selected);

    let factor = 1;
    switch (selected) {
      case "month":
        factor = 60 * 60 * 24 * 30;
        break;
      case "day":
        factor = 60 * 60 * 24;
        break;
      case "hours":
        factor = 60 * 60;
        break;
      case "minutes":
        factor = 60;
        break;
      default:
        factor = 1;
    }
    const expiredSeconds = expiredEdit * factor;
    setExpiredSeconds(expiredSeconds);
  };

  const handleKuotaChange = (event) => {
    setKuotaEdit(event.target.value);
  };
  const handleSharedChange = (event) => {
    setSharedEdit(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPriceEdit(event.target.value);
  };

  const handleUptimeChange = (event) => {
    const newUptime = event.target.value;
    setUptimeEdit(newUptime);

    let factor = 1;
    switch (selectedUptime) {
      case "month":
        factor = 60 * 60 * 24 * 30;
        break;
      case "day":
        factor = 60 * 60 * 24;
        break;
      case "hours":
        factor = 60 * 60;
        break;
      case "minutes":
        factor = 60;
        break;
      default:
        factor = 1;
    }
    const uptimeSeconds = newUptime * factor;
    setUptimeSeconds(uptimeSeconds);
  };

  const handleUnitUptimeChange = (event) => {
    const selected = event.target.value;
    setSelectedUptime(selected);

    let factor = 1;
    switch (selected) {
      case "month":
        factor = 60 * 60 * 24 * 30;
        break;
      case "day":
        factor = 60 * 60 * 24;
        break;
      case "hours":
        factor = 60 * 60;
        break;
      case "minutes":
        factor = 60;
        break;
      default:
        factor = 1;
    }
    const uptimeSeconds = uptimeEdit * factor;
    setUptimeSeconds(uptimeSeconds);
  };

  // INI AKHIR DARI SCRIPT GET EDIT DATA

  //INI UNTUK HANDLE SCRIPT POST UPTIME DAN EXPIRED

  const handleUptimeChangePost = (event) => {
    const newUptimePost = event.target.value;
    setUptime(newUptimePost);
    setIsNameEmpty(false);

    let factor = 1;
    switch (selectedUptimePost) {
      case "month":
        factor = 60 * 60 * 24 * 30;
        break;
      case "day":
        factor = 60 * 60 * 24;
        break;
      case "hours":
        factor = 60 * 60;
        break;
      case "minutes":
        factor = 60;
        break;
      default:
        factor = 1;
    }
    const uptimeSecondsPost = newUptimePost * factor;
    setUptimeSecondsPost(uptimeSecondsPost);
  };

  const handleUnitUptimeChangePost = (event) => {
    const selected = event.target.value;
    setSelectedUptimePost(selected);

    let factor = 1;
    switch (selected) {
      case "month":
        factor = 60 * 60 * 24 * 30;
        break;
      case "day":
        factor = 60 * 60 * 24;
        break;
      case "hours":
        factor = 60 * 60;
        break;
      case "minutes":
        factor = 60;
        break;
      default:
        factor = 1;
    }
    const uptimeSecondsPost = uptime * factor;
    setUptimeSecondsPost(uptimeSecondsPost);
  };

  const handleExpiredChangePost = (event) => {
    const newExpiredPost = event.target.value;
    setExpired(newExpiredPost);
    setIsNameEmpty(false);

    let factor = 1;
    switch (selectedExpiredPost) {
      case "month":
        factor = 60 * 60 * 24 * 30;
        break;
      case "day":
        factor = 60 * 60 * 24;
        break;
      case "hours":
        factor = 60 * 60;
        break;
      case "minutes":
        factor = 60;
        break;
      default:
        factor = 1;
    }
    const expiredSecondsPost = newExpiredPost * factor;
    setExpiredSecondsPost(expiredSecondsPost);
  };

  const handleUnitExpiredChangePost = (event) => {
    const selected = event.target.value;
    setSelectedExpiredPost(selected);

    let factor = 1;
    switch (selected) {
      case "month":
        factor = 60 * 60 * 24 * 30;
        break;
      case "day":
        factor = 60 * 60 * 24;
        break;
      case "hours":
        factor = 60 * 60;
        break;
      case "minutes":
        factor = 60;
        break;
      default:
        factor = 1;
    }
    const expiredSecondsPost = expired * factor;
    setExpiredSecondsPost(expiredSecondsPost);
  };

  const handleSubmitUpdate = (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const updatedUserData = {
      id,
      name: nameEdit,
      expired: expiredEdit,
      kuota: kuotaEdit,
      limit_shared: sharedEdit,
      price: priceEdit,
      type_id: type_IdEdit,
      uptime: uptimeEdit,
      uptime: uptimeSeconds,
      expired: expiredSeconds,
    };
    axios
      .put(
        `http://172.16.26.97:5000/hotspot_plan/plan_template`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" && template === "") {
      setIsNameEmpty(true);
    } else {
      e.preventDefault();

      const postData = {
        name,
        expired:
          expired || (expired !== 0 && selectedTemplate.enable_expired)
            ? expired
            : "0",
        kuota:
          kuota || (kuota !== 0 && selectedTemplate.enable_kuota) ? kuota : "0",
        limit_shared:
          limit_shared ||
          (limit_shared !== 0 && selectedTemplate.enable_limit_shared)
            ? limit_shared
            : "0",
        price,
        type_id: selectedTemplate.id,
        uptime:
          uptime || (uptime !== 0 && selectedTemplate.enable_uptime)
            ? uptime
            : "0",
        uptime: uptimeSecondsPost,
        expired: expiredSecondsPost,
      };
      try {
        const token = localStorage.getItem("access_token");

        const response = await axios.post(
          "http://172.16.26.97:5000/hotspot_plan/plan_template",
          postData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          setName("");
          setExpired("");
          setKuota("");
          setPrice("");
          setLimit_Shared("");
          setUptime("");
          setTipeId("");
          setSelectedUptimePost("seconds");
          setSelectedExpiredPost("seconds");
          getApi();
          toast.success("Registered Successfully.");
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      setLoading(true);
      try {
        const response = await axios.get(
          "http://172.16.26.97:5000/hotspot_plan/plan_template",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          }
        );

        console.log("test");
        setListTemplate(response.data.data);
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

  //GET LIST PLAN TYPE
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      setLoading(true);
      try {
        const response = await axios.get(
          "http://172.16.26.97:5000/hotspot_plan/plan_type",
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
        `http://172.16.26.97:5000/hotspot_plan/plan_template`,
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
                    onClick={() => showModalEdit(rowData.id)}
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

  const handleTemplateChange = (e) => {
    const template = templates.find((t) => t.id === parseInt(e.target.value));
    setSelectedTemplate(template);
    setEnable_Kuota(template.enable_kuota);
    setEnable_Expired(template.enable_expired);
    setEnable_Uptime(template.enable_uptime);
    setEnable_Limit_Shared(template.enable_limit_shared);
    setIsNameEmpty(false);
    setTipeId(e.target.value);
  };

  //INI UNTUK MODAL EDIT TEMPLATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalEdit = (id) => {
    setId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedExpired("seconds");
    setSelectedUptime("seconds");
  };

  // INI UNTUK MENDAPATKAN NAME DARI BACKEND UNTUK SELECT TEMPLATE MENAMPILKAN NAME

  const [selectedTemplateEdit, setSelectedTemplateEdit] = useState("");

  const handleTemplateChangeEdit = (event) => {
    setSelectedTemplateEdit(event.target.value);
  };

  return (
    <>
      <div className="mainContainer">
        <Modal
          title="Edit Hotspot Template"
          open={isModalOpen}
          onOk={handleSubmitUpdate}
          onCancel={handleCancel}
          style={{ top: "5%" }}
        >
          <form className="formTemplateEdit">
            <div className="formInputTemplateEdit">
              <label>Name</label>
              <input
                className="inputName"
                type="text"
                placeholder="Name"
                required
                value={nameEdit}
                onChange={handleNameChange}
              />
            </div>
            <div className="formInputTemplateEdit">
              <label>Plan Type</label>

              <select
                name="template"
                required
                id="template"
                value={selectedTemplateEdit}
                onChange={handleTemplateChangeEdit}
              >
                <option onChange={handleNameChange} value={nameEdit}>
                  --Select Plan--
                </option>
                {templates.map((template) => (
                  <option key={template.id} value={template.name}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="formInputTemplateEdit">
              <label>Kuota</label>
              <input
                type="number"
                id="kuota"
                placeholder="Kuota"
                value={kuotaEdit}
                onChange={handleKuotaChange}
              />
            </div>
            <div className="formInputTemplateEdit">
              <label>Limit Shared</label>
              <input
                type="number"
                id="kuota"
                placeholder="Limit Shared"
                value={sharedEdit}
                onChange={handleSharedChange}
              />
            </div>
            <div className="formInputTemplateEdit">
              <label>Price</label>
              <input
                type="number"
                id="kuota"
                placeholder="Price"
                value={priceEdit}
                onChange={handlePriceChange}
              />
            </div>
            <div className="formInputTemplateEdit">
              <label>Uptime</label>
              <div className="inputContainer">
                <input
                  type="number"
                  id="uptime"
                  placeholder="Uptime"
                  value={uptimeEdit}
                  onChange={handleUptimeChange}
                />
                <div id="uptimeDisplay">
                  <select
                    value={selectedUptime}
                    onChange={handleUnitUptimeChange}
                  >
                    <option value="">Select Unit</option>
                    <option value="month">Months</option>
                    <option value="day">Days</option>
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                    <option value="seconds">Seconds</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="formInputTemplateEdit">
              <label>Expired</label>
              <div className="inputContainer">
                <input
                  type="number"
                  id="kuota"
                  placeholder="Expired"
                  value={expiredEdit}
                  onChange={handleExpiredChange}
                />
                <div id="uptimeDisplay">
                  <select
                    value={selectedExpired}
                    onChange={handleUnitExpiredChange}
                  >
                    <option value="">Select Unit</option>
                    <option value="month">Months</option>
                    <option value="day">Days</option>
                    <option value="hours">Hours</option>
                    <option value="minutes">Minutes</option>
                    <option value="seconds">Seconds</option>
                  </select>
                </div>
              </div>
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
            <div className="top">
              <ToastContainer />
              <h1>Hotspot Template</h1>
            </div>
            <div className="containerTemplateNew">
              <div className="leftTemplateNew">
                <div className="templateSection">
                  <h1>Add New Hotspot Template</h1>
                  <div className="templateInputNew">
                    <form className="formTemplateNew">
                      <div className="formInputTemplate">
                        <label>Name</label>
                        <input
                          className="inputName"
                          type="text"
                          placeholder="Name"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setIsNameEmpty(false);
                          }}
                        />
                      </div>
                      <div className="formInputTemplate">
                        <label>Plan Type</label>

                        <select
                          name="template"
                          required
                          id="template template-select"
                          onChange={handleTemplateChange}
                          value={tipeId}
                        >
                          <option
                            value=""
                            onChange={(e) => {
                              setType_Id(e.target.value);
                              setIsNameEmpty(false);
                            }}
                          >
                            --Select Plan--
                          </option>{" "}
                          {templates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="formInputTemplate">
                        <label>Kuota</label>
                        <input
                          type="number"
                          id="kuota"
                          placeholder={
                            kuota === ""
                              ? selectedTemplate?.enable_kuota
                                ? "Kuota"
                                : "0"
                              : ""
                          }
                          required={!selectedTemplate?.enable_kuota}
                          disabled={!selectedTemplate?.enable_kuota}
                          value={
                            kuota === "" && !selectedTemplate?.enable_kuota
                              ? "0"
                              : kuota
                          }
                          onChange={(e) => {
                            setKuota(e.target.value);
                            setIsNameEmpty(false);
                          }}
                        />
                      </div>
                      <div className="formInputTemplate">
                        <label>Limit Shared</label>
                        <input
                          type="number"
                          id="shared"
                          placeholder={
                            limit_shared === ""
                              ? selectedTemplate?.enable_limit_shared
                                ? "Limit Shared"
                                : "0"
                              : ""
                          }
                          required={!selectedTemplate?.enable_limit_shared}
                          disabled={!selectedTemplate?.enable_limit_shared}
                          value={
                            limit_shared === "" &&
                            !selectedTemplate?.enable_limit_shared
                              ? "0"
                              : limit_shared
                          }
                          onChange={(e) => {
                            setLimit_Shared(e.target.value);
                            setIsNameEmpty(false);
                          }}
                        />
                      </div>
                      <div className="formInputTemplate">
                        <label>Price</label>
                        <input
                          type="number"
                          placeholder="Price"
                          value={price}
                          onChange={(e) => {
                            setPrice(e.target.value);
                            setIsNameEmpty(false);
                          }}
                        />
                      </div>
                      <div className="formInputTemplate">
                        <label>Uptime</label>
                        <div className="inputContainer">
                          <input
                            type="number"
                            id="uptime"
                            placeholder={
                              uptime === ""
                                ? selectedTemplate?.enable_uptime
                                  ? "Uptime"
                                  : "0"
                                : ""
                            }
                            required={!selectedTemplate?.enable_uptime}
                            disabled={!selectedTemplate?.enable_uptime}
                            value={
                              uptime === "" && !selectedTemplate?.enable_uptime
                                ? "0"
                                : uptime
                            }
                            onChange={handleUptimeChangePost}
                          />
                          <div id="uptimeDisplay">
                            <select
                              disabled={!selectedTemplate?.enable_uptime}
                              value={selectedUptimePost}
                              onChange={handleUnitUptimeChangePost}
                            >
                              <option value="month">Months</option>
                              <option value="day">Days</option>
                              <option value="hours">Hours</option>
                              <option value="minutes">Minutes</option>
                              <option value="seconds">Seconds</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="formInputTemplate inputExpired">
                        <label>Expired</label>
                        <div className="inputContainer">
                          <input
                            type="number"
                            id="kuota"
                            placeholder={
                              expired === ""
                                ? selectedTemplate?.enable_expired
                                  ? "Expired"
                                  : "0"
                                : ""
                            }
                            required={!selectedTemplate?.enable_expired}
                            disabled={!selectedTemplate?.enable_expired}
                            value={
                              expired === "" &&
                              !selectedTemplate?.enable_expired
                                ? "0"
                                : expired
                            }
                            onChange={handleExpiredChangePost}
                          />
                          <div id="uptimeDisplay">
                            <select
                              disabled={!selectedTemplate?.enable_expired}
                              value={selectedExpiredPost}
                              onChange={handleUnitExpiredChangePost}
                            >
                              <option value="month">Months</option>
                              <option value="day">Days</option>
                              <option value="hours">Hours</option>
                              <option value="minutes">Minutes</option>
                              <option value="seconds">Seconds</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button type="submit" onClick={handleSubmit}>
                        Create Template
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="rightTemplateNew">
                <div className="listSectionNew">
                  <h1>List Hotspot Template</h1>
                  <div className="tableSectionNew">
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    />

                    <DataGrid
                      columns={userColumnsNew.concat(actionColumn)}
                      rows={addIndex(listTemplate)}
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

export default Hstemplate;
