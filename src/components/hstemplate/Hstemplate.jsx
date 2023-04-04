import "./hstemplate.scss";
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
  const [listTemplate, setListTemplate] = useState("");
  const navigate = useNavigate();
  const [template, setTemplate] = useState("template1");
  const [users, setUsers] = useState([]);
  const handleRefreshToken = useHandleRefreshToken();
  const [name, setName] = useState("");
  const [expired, setExpired] = useState(0);
  const [kuota, setKuota] = useState(0);
  const [limitShared, setLimitShared] = useState(0);
  const [price, setPrice] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isNameEmpty, setIsNameEmpty] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" && template === "") {
      setIsNameEmpty(true);
    } else {
      e.preventDefault();
      const postData = {
        name,
        expired,
        kuota,
        limitShared,
        price,
        typeId,
        uptime,
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
      width: 175,
      renderCell: (rowData) => {
        return (
          <>
            <div className="cellAction">
              <Tooltip title="View" arrow>
                <div className="viewButtonOperator">
                  <RateReviewIcon
                    className="viewIcon"
                    // onClick={() => handleShowEdit(rowData.id)}
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
    { field: "fullname", headerName: "Name", width: 150 },
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
            <h1>Hotspot Template</h1>
          </div>
          <div className="containerTemplate">
            <div className="leftTemplate">
              <div className="templateSection">
                <h1>Add New Hotspot Template</h1>
                <div className="templateInput">
                  <form className="formTemplate">
                    <div className="formInput">
                      <label>Name</label>
                      <input
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
                    <div className="formInput">
                      <label>Kuota</label>
                      <input
                        type="number"
                        placeholder="Kuota"
                        required="required"
                        value={kuota}
                        onChange={(e) => {
                          setKuota(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      />
                    </div>
                    <div className="formInput">
                      <label>Limit Shared</label>
                      <input
                        type="number"
                        placeholder="Limit Shared"
                        required="required"
                        value={limitShared}
                        onChange={(e) => {
                          setLimitShared(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      />
                    </div>
                    <div className="formInput">
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
                    <div className="formInput">
                      <label>Uptime</label>
                      <input
                        type="number"
                        placeholder="Uptime"
                        required="required"
                        value={uptime}
                        onChange={(e) => {
                          setUptime(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      />
                    </div>
                    <div className="formInput">
                      <label>Type</label>
                      <input
                        type="number"
                        placeholder="Type"
                        required="required"
                        value={typeId}
                        onChange={(e) => {
                          setTypeId(e.target.value);
                          setIsNameEmpty(false);
                        }}
                      />
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                      Create User
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="rightTemplate">
              <div className="listSection">
                <h1>List Hotspot Template</h1>
                <div className="tableSection">
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
    </>
  );
};

export default Hstemplate;
