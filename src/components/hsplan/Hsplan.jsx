import "./hsplan.scss";
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
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [expired, setExpired] = useState(0);
  const [kuota, setKuota] = useState(0);
  const [limitShared, setLimitShared] = useState(0);
  const [price, setPrice] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Ambil access token dari local storage
    const storedToken = localStorage.getItem("access_token");
    setAccessToken(storedToken);
  }, []);

  const handleSubmit = async (e) => {
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
        "http://localhost:3001/hotspot_profile",
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
                    // onConfirm={() => deleteAccount(rowData.id)}
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
            <h1>Hotspot Plan Type</h1>
          </div>
          <div className="containerTemplate">
            <div className="leftTemplate">
              <div className="templateSection">
                <h1>Add New Hotspot Plan Type</h1>
                <div className="templateInput">
                  <form className="formTemplate">
                    <div className="formInput">
                      <label>Name</label>
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="formInput">
                      <label>Kuota</label>
                      <select name="" id="">
                        <option value="true">Enable</option>
                        <option value="False">Disable</option>
                      </select>
                    </div>
                    <div className="formInput">
                      <label>Limit Shared</label>
                      <select name="" id="">
                        <option value="true">Enable</option>
                        <option value="False">Disable</option>
                      </select>
                    </div>
                    <div className="formInput">
                      <label>Uptime</label>
                      <select name="" id="">
                        <option value="true">Enable</option>
                        <option value="False">Disable</option>
                      </select>
                    </div>
                    <button type="submit" onClick={handleSubmit}>
                      Create Plan Type
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
                    rows={addIndex(users)}
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

export default Hsplan;
