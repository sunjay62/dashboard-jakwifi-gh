import "./hsplan.scss";
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
import useHandleRefreshToken from "../refreshtoken/Refreshtoken";
import {
  Modal,
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";

const Hsplan = () => {
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
  const navigate = useNavigate();
  const [template, setTemplate] = useState("template1");
  const [listPlan, setListPlan] = useState([]);
  const [name, setName] = useState("");
  const [enable_expired, setEnable_Expired] = useState(false);
  const [enable_kuota, setEnable_Kuota] = useState(false);
  const [enable_limit_shared, setEnable_Limit_Shared] = useState(false);
  const [enable_uptime, setEnable_Uptime] = useState(false);
  const [userData, setUserData] = useState({});
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const handleRefreshToken = useHandleRefreshToken();
  const [loading, setLoading] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [id, setId] = useState("");
  const [componentSize, setComponentSize] = useState("default");
  const [options, setOptions] = useState([]);
  const [nameEdit, setNameEdit] = useState("");
  const [enable_expiredEdit, setEnable_ExpiredEdit] = useState(false);
  const [enable_kuotaEdit, setEnable_KuotaEdit] = useState(false);
  const [enable_limit_sharedEdit, setEnable_Limit_SharedEdit] = useState(false);
  const [enable_uptimeEdit, setEnable_UptimeEdit] = useState(false);

  useEffect(() => {
    // Ambil access token dari local storage
    const storedToken = localStorage.getItem("access_token");
    setAccessToken(storedToken);
  }, []);

  // INI UNTUK GET DATA UPDATE

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    axios
      .get(`http://172.16.26.97:5000/hotspot_plan/plan_type/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        // console.log(res.data.name);

        setUserData(res.data.id);
        setNameEdit(res.data.name);
        setEnable_ExpiredEdit(res.data.enable_expired);
        setEnable_KuotaEdit(res.data.enable_kuota);
        setEnable_Limit_SharedEdit(res.data.enable_limit_shared);
        setEnable_UptimeEdit(res.data.enable_uptime);
      })
      .catch((err) => console.log(err));

    // Set options for enable_expired select
    const formattedOptions = [
      { value: true, label: "Enable" },
      { value: false, label: "Disable" },
    ];
    setOptions(formattedOptions);
  }, [id]);

  const handleStatusChange = (event) => {
    setEnable_ExpiredEdit(event.target.value === "true"); // konversi nilai string menjadi boolean
  };

  // INI UNTUK ON CHANGE DI SELECT

  const handleNameChange = (event) => {
    setNameEdit(event.target.value);
  };

  const handleExpiredChange = (event) => {
    setEnable_ExpiredEdit(event.target.value);
  };
  const handleKuotaChange = (event) => {
    setEnable_KuotaEdit(event.target.value);
  };
  const handleSharedChange = (event) => {
    setEnable_Limit_SharedEdit(event.target.value);
  };
  const handleUptimeChange = (event) => {
    setEnable_UptimeEdit(event.target.value);
  };

  // INI UNTUK PUT UPDATE DATA

  const handleUpdatePlan = () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const updatedUserData = {
      id,
      name: nameEdit,
      enable_expired: enable_expiredEdit,
      enable_kuota: enable_kuotaEdit,
      enable_limit_shared: enable_limit_sharedEdit,
      enable_uptime: enable_uptimeEdit,
    };
    axios
      .put(`http://172.16.26.97:5000/hotspot_plan/plan_type`, updatedUserData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated Successfully.");
          getApi();
          handleOk();
          handleCancel();
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
      // Lakukan sesuatu jika form valid
      e.preventDefault();
      const postData = {
        name,
        enable_expired,
        enable_kuota,
        enable_limit_shared,
        enable_uptime,
      };
      try {
        const token = localStorage.getItem("access_token");

        const response = await axios.post(
          "http://172.16.26.97:5000/hotspot_plan/plan_type",
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
          setEnable_Expired(false);
          setEnable_Kuota(false);
          setEnable_Limit_Shared(false);
          setEnable_Uptime(false);
          toast.success("Registered Successfully.");
        } else if (response.status === 409) {
          toast.error("User already exists.");
        } else {
          setError("Failed to register, please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          toast.error("Plan already exists!");
        } else {
          setError("Failed to register, please try again.");
          await handleRefreshToken();
        }
      }
    }
  };

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

        setListPlan(response.data.data);
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

  // FUNCTION GETAPI INI UNTUK MELAKUKAN GET DATA LAGI KE API JIKA BERHASIL REGISTRASI AKUN BARU

  function getApi() {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // console.log(token);

        const response = await axios.get(
          "http://172.16.26.97:5000/hotspot_plan/plan_type",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        setListPlan(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }

  // INI UNTUK DELETE USER

  const deletePlan = async (id) => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.delete(
        "http://172.16.26.97:5000/hotspot_plan/plan_type",
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
        toast.error("You do not have access!");
      } else if ((error.response && error.response.status === 403) || 500) {
        toast.error("Plan Type Used!");
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
      width: 175,
      renderCell: (rowData) => {
        return (
          <>
            <div className="cellAction">
              <Tooltip title="View" arrow>
                <div className="viewButtonOperator">
                  <RateReviewIcon
                    className="viewIcon"
                    onClick={() => showModalAnt(rowData.id)}
                  />
                </div>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <div>
                  <Popconfirm
                    className="cellAction"
                    title="Delete Account"
                    description="Are you sure to delete this account?"
                    onConfirm={() => deletePlan(rowData.id)}
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
    { field: "name", headerName: "Name", width: 150 },
  ];

  // INI UNTUK PEMBUATAN NOMOR URUT SECARA OTOMATIS
  const addIndex = (array) => {
    return array.map((item, index) => {
      item.no = index + 1;
      return item;
    });
  };

  // UNTUK MODAL UPDATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModalAnt = (id) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("clicked");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.setFieldsValue({
      name: "",
      kuota: "",
      uptime: "",
      shared: "",
      expired: "",
    });
  };

  return (
    <>
      <div className="mainContainer">
        <Modal
          title="Edit Hotspot Plan"
          visible={isModalOpen}
          onOk={handleUpdatePlan}
          onCancel={handleCancel}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form>
              <Form.Item label="Name" style={{ width: "95%" }}>
                <Input value={nameEdit} onChange={handleNameChange} />
              </Form.Item>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Form.Item
                  label="Kuota"
                  style={{ flexBasis: "45%", marginRight: "20px" }}
                >
                  <Select
                    value={enable_kuotaEdit}
                    onChange={(value) => setEnable_KuotaEdit(value)}
                  >
                    {options.map((option) => (
                      <Select.Option value={option.value} key={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Uptime"
                  style={{ flexBasis: "45%", marginRight: "20px" }}
                >
                  <Select
                    value={enable_uptimeEdit}
                    onChange={(value) => setEnable_UptimeEdit(value)}
                  >
                    {options.map((option) => (
                      <Select.Option value={option.value} key={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Shared"
                  style={{ flexBasis: "45%", marginRight: "20px" }}
                >
                  <Select
                    value={enable_limit_sharedEdit}
                    onChange={(value) => setEnable_Limit_SharedEdit(value)}
                  >
                    {options.map((option) => (
                      <Select.Option value={option.value} key={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Expired"
                  style={{ flexBasis: "45%", marginRight: "20px" }}
                >
                  <Select
                    value={enable_expiredEdit}
                    onChange={(value) => setEnable_ExpiredEdit(value)}
                  >
                    {options.map((option) => (
                      <Select.Option value={option.value} key={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </div>
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
              <h1>Hotspot Type Plan</h1>
            </div>
            <div className="containerForm">
              <div className="leftForm">
                <div className="formSection">
                  <h1>Add New Hotspot Plan</h1>
                  <form onSubmit={handleSubmit} className="formPlan">
                    <div className="formInputPlan">
                      <label>Name</label>
                      <input
                        className="inputNamePlan"
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

                    <div className="formInputPlan">
                      <label>Kuota</label>
                      <select
                        value={enable_kuota}
                        onChange={(e) => {
                          setEnable_Kuota(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      >
                        <option value={true}>Enable</option>
                        <option value={false}>Disable</option>
                      </select>
                    </div>
                    <div className="formInputPlan">
                      <label>Limit Shared</label>
                      <select
                        value={enable_limit_shared}
                        onChange={(e) => {
                          setEnable_Limit_Shared(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      >
                        {" "}
                        <option value={true}>Enable</option>
                        <option value={false}>Disable</option>
                      </select>
                    </div>
                    <div className="formInputPlan">
                      <label>Uptime</label>
                      <select
                        value={enable_uptime}
                        onChange={(e) => {
                          setEnable_Uptime(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      >
                        {" "}
                        <option value={true}>Enable</option>
                        <option value={false}>Disable</option>
                      </select>
                    </div>
                    <div className="formInputPlan">
                      <label>Expired</label>
                      <select
                        value={enable_expired}
                        onChange={(e) => {
                          setEnable_Expired(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      >
                        {" "}
                        <option value={true}>Enable</option>
                        <option value={false}>Disable</option>
                      </select>
                    </div>

                    <button type="submit">Create Plan Type</button>
                  </form>
                </div>
              </div>
              <div className="rightForm">
                <div className="listSection">
                  <h1>List Hotspot Plan</h1>
                  <div className="tableSection">
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    />

                    <DataGrid
                      columns={userColumnsNew.concat(actionColumn)}
                      rows={addIndex(listPlan)}
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

export default Hsplan;
