import "./site.scss";
import { DataGrid } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
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
import Leafletmap from "../leafletmap/Leafletmap";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Tooltip } from "@material-ui/core";
import RateReviewIcon from "@mui/icons-material/RateReview";
import fetchDataSite from "../leafletmap/Leafletmap";

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

const Site = (props) => {
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

  // UNTUK KE HALAMAN ADD CLIENT
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
  // INI UNTUK VIEW KE PROFILE BERDASARKAN IDNYA

  const handleShowEdit = (id) => {
    setId(id);
    navigate(`/viewsite/${id}`);
  };

  // INI UNTUK UPDATE USER

  // const handleUpdate = async () => {
  //   // INI UNTUK VALIDASI FORM JUGA NAMUN MANUAL

  //   try {
  //     // const token = localStorage.getItem("access_token");

  //     const res = await axios.put(
  //       `http://172.16.26.97:5000/administrator`,
  //       changePassword
  //         ? {
  //             username: username,
  //             email: email,
  //             password: password,
  //             id: `${id}`,
  //           }
  //         : {
  //             username: username,
  //             email: email,
  //             id: `${id}`,
  //           },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Authorization: token,
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       toast.success("Updated Successfuly.");
  //       getApi();
  //       setUsername("");
  //       setEmail("");
  //       setPassword("");
  //       setChangePassword("");
  //       handleCloseEdit();
  //     } else {
  //       toast.error("Failed to update user, please try again.");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
        const res = await axios.get("http://172.16.26.97:5000/site", {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        });

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
        const token = localStorage.getItem("access_token");
        // console.log(token);

        const res = await axios.get("http://172.16.26.97:5000/site", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        setUsers(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }

  // INI UNTUK DELETE USER

  const deleteAccount = async (id) => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await axios.delete(`http://172.16.26.97:5000/site`, {
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
    }
  };

  // INI UNTUK TABEL

  const columnSites = [
    {
      field: "no",
      headerName: "No",
      width: 50,
    },
    { field: "id", headerName: "ID", width: 50 },
    { field: "profile_id", headerName: "Profile ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "landing_name", headerName: "Landing Name", width: 180 },
    { field: "latitude", headerName: "Latitude", width: 150 },
    { field: "longtitude", headerName: "Longtitude", width: 150 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
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
                    title="Delete Site"
                    description="Are you sure to delete this site?"
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

  // INI UNTUK PEMBUATAN NOMOR URUT SECARA OTOMATIS
  const addIndex = (array) => {
    return array.map((item, index) => {
      item.no = index + 1;
      return item;
    });
  };

  // INI UNTUK POST DATA TAMBAH TEMPLATE DI DALAM PROFILE

  const [isModalOpenSite, setIsModalOpenSite] = useState(false);
  const showModalSite = () => {
    setIsModalOpenSite(true);
  };
  const handleOkSite = () => {
    setIsModalOpenSite(false);
    handleSubmitSite();
  };
  const handleCancelSite = () => {
    setIsModalOpenSite(false);
  };

  // ini adalah post api untuk create new site
  const [landingName, setLandingName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLandingChange = (e) => {
    setLandingName(e.target.value);
  };
  const handleSiteNameChange = (e) => {
    setSiteName(e.target.value);
  };
  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };
  const handleLongtitudeChange = (e) => {
    setLongtitude(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedProfile(e.target.value);
  };

  const handleSubmitSite = async (e) => {
    if (e) e.preventDefault();
    const postData = {
      landing_name: landingName,
      name: siteName,
      latitude: latitude,
      longtitude: longtitude,
      profile_id: selectedProfile,
    };
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://172.16.26.97:5000/site",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      // console.log(response.status);

      if (response.status === 200) {
        toast.success("Registered Successfully.");
        setLandingName("");
        setSiteName("");
        setLatitude("");
        setLongtitude("");
        getApi();
      } else if (response.status === 409) {
        toast.error("Site already exists.");
      } else {
        setError("Failed to register, please try again.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error("Site already exists.");
      } else {
        setError("Failed to register, please try again.");
        console.log(error);
      }
      if (error.response && error.response.status === 401) {
        toast.error("You not have access!");
      } else {
        setError("Failed to register, please try again.");
        console.log(error);
      }
    }
  };

  //INI UNTUK GET LIST PROFILE ID
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

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

        setProfiles(response.data.data);
        // console.log(response.data.data);
        // console.log(JSON.stringify(response.data.data));
      } catch (e) {
        console.log(e);
        console.log("access token sudah expired");
      }
    };

    fetchData();
  }, []);

  // INI UNTUK UPDATE

  //INI UNTUK MODAL EDIT TEMPLATE
  const [isModalOpenEditSite, setIsModalOpenEditSite] = useState(false);
  const showModalEditSite = (id) => {
    setIdSite(id);
    setIsModalOpenEditSite(true);
  };

  const handleCancelEditSite = () => {
    setIsModalOpenEditSite(false);
  };

  // INI UNTUK GET DATA DAN UPDATE DATA

  const [idSite, setIdSite] = useState("");
  const [landingNameEdit, setLandingNameEdit] = useState("");
  const [latitudeEdit, setLatitudeEdit] = useState("");
  const [longtitudeEdit, setLongtitudeEdit] = useState("");
  const [siteNameEdit, setSiteNameEdit] = useState("");
  const [selectedProfileEdit, setSelectedProfileEdit] = useState("");
  const [selectedProfileIdEdit, setSelectedProfileIdEdit] = useState("");

  const handleIdSite = (event) => {
    setIdSite(event.target.value);
  };
  const handleLandingSite = (event) => {
    setLandingNameEdit(event.target.value);
  };
  const handleNameSite = (event) => {
    setSiteNameEdit(event.target.value);
  };
  const handleLatitudeSite = (event) => {
    setLatitudeEdit(event.target.value);
  };
  const hanldeLongtitudeSite = (event) => {
    setLongtitudeEdit(event.target.value);
  };

  const handleSubmitEditSite = (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const updatedUserData = {
      id: idSite,
      landing_name: landingNameEdit,
      latitude: latitudeEdit,
      longtitude: longtitudeEdit,
      name: siteNameEdit,
      profile_id: selectedProfileIdEdit,
    };
    axios
      .put(`http://172.16.26.97:5000/site`, updatedUserData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          toast.success("Updated Successfully.");
          getApi();
          setIsModalOpenEditSite(false);
        } else {
          setError("Failed to update, please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  // INI UNTUK GET DATA UPDATE

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("access_token");
  //   const refreshToken = localStorage.getItem("refresh_token");
  //   axios
  //     .get(`http://172.16.26.97:5000/site/${idSite}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: accessToken,
  //       },
  //     })
  //     .then((res) => {
  //       // console.log(res.data);
  //       setIdSite(res.data.id);
  //       setSiteNameEdit(res.data.name);
  //       setLatitudeEdit(res.data.latitude);
  //       setLongtitudeEdit(res.data.longtitude);
  //       setLandingNameEdit(res.data.landing_name);
  //       setSelectedProfileIdEdit(res.data.profile_id);
  //       setSelectedProfileEdit(res.data.profile_info.name);
  //     })
  //     .catch((err) => console.log(err));
  // }, [idSite]);

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

            <button className="new-account" onClick={showModalSite}>
              <AddCircleOutlineIcon className="iconAdd" />
              <span className="textAdd">Add New Site</span>{" "}
            </button>

            <Box
              sx={{
                width: "100%",
              }}
            />

            <DataGrid
              columns={columnSites.concat(actionColumn)}
              rows={addIndex(users)}
              // rowsPerPageOptions={[5, 10, 25, 50, 100]}
              pageSize={10}
            />
            <Modal
              title="Add new site"
              open={isModalOpenSite}
              onOk={handleOkSite}
              onCancel={handleCancelSite}
            >
              <form className="formProfileNewSite">
                <div className="formInputProfileEditSite">
                  <label htmlFor="">Landing Page Name</label>
                  <input
                    type="text"
                    value={landingName}
                    onChange={handleLandingChange}
                  />
                </div>

                <div className="formInputProfileEditSite">
                  <label htmlFor="">Name Site</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={handleSiteNameChange}
                  />
                </div>
                <div className="formInputProfileEditSite">
                  <label htmlFor="">Titik Koordinat</label>
                  <input
                    type="number"
                    placeholder="Longtitude"
                    value={longtitude}
                    onChange={handleLongtitudeChange}
                  />
                  <input
                    type="number"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={handleLatitudeChange}
                  />
                </div>
                <div className="formInputProfileEditSite">
                  <label>Hotspot Profile ID</label>
                  <select value={selectedProfile} onChange={handleSelectChange}>
                    <option value="" disabled selected>
                      --Choose an option--
                    </option>

                    {profiles.map((profile) => (
                      <option key={profile.id} value={profile.id}>
                        {profile.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </Modal>
            {/* <Modal
              title="Update Site"
              open={isModalOpenEditSite}
              onOk={handleSubmitEditSite}
              onCancel={handleCancelEditSite}
            >
              <form className="formProfileNewSite">
                <div className="formInputProfileEditSite">
                  <label htmlFor="">Landing Page Name</label>
                  <input
                    type="text"
                    value={landingNameEdit}
                    onChange={handleLandingSite}
                  />
                </div>

                <div className="formInputProfileEditSite">
                  <label htmlFor="">Name Site</label>
                  <input
                    type="text"
                    value={siteNameEdit}
                    onChange={handleNameSite}
                  />
                </div>
                <div className="formInputProfileEditSite">
                  <label htmlFor="">Titik Koordinat</label>
                  <input
                    type="number"
                    placeholder="Longtitude"
                    value={longtitudeEdit}
                    onChange={hanldeLongtitudeSite}
                  />
                  <input
                    type="number"
                    placeholder="Latitude"
                    value={latitudeEdit}
                    onChange={handleLatitudeSite}
                  />
                </div>
                <div className="formInputProfileEditSite">
                  <label>Hotspot Profile Name</label>
                  <input value={selectedProfileEdit} disabled></input>
                </div>
              </form>
            </Modal> */}
          </div>
          <div className="mapContainer">
            <div className="mapContent">
              <Leafletmap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Site;
