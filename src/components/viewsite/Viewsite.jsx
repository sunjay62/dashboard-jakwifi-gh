import React, { useState, useEffect, useRef } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./viewsite.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import WidgetTwo from "../widgettwo/WidgetTwo";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import Typography from "@mui/material/Typography";
import { EffectCoverflow, Pagination } from "swiper";
import { Tooltip } from "@material-ui/core";
import axios from "axios";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Viewsite = () => {
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

  // INI AWAL GET API UNTUK PROFILE SET

  // INI UNTUK AMBIL ID DARI URL
  // const { id: idFromUrl } = useParams(); // Ambil ID dari URL menggunakan useParams()
  // const [idUrl, setIdUrl] = useState(idFromUrl); // Simpan ID ke dalam state

  // useEffect(() => {
  //   setIdUrl(idFromUrl); // Ketika nilai ID dari URL berubah, ubah nilai state
  // }, [idFromUrl]);

  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const [siteName, setSiteName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [landingName, setLandingName] = useState("");
  const [selectedProfileId, setSelectedProfileId] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");

  // FUNCTION GETAPI INI UNTUK MELAKUKAN GET DATA LAGI KE API JIKA BERHASIL REGISTRASI AKUN BARU

  function getApi() {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // console.log(token);

        const res = await axios.get(
          `http://172.16.26.97:5000/site/${id}/plan`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        setPackages(res.data);
      } catch (err) {
        console.log(err);
        // await handleRefreshToken();
      }
    };
    fetchAllUsers();
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    axios
      .get(`http://172.16.26.97:5000/site/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        setUserData(res.data.id);
        setSiteName(res.data.name);
        setLatitude(res.data.latitude);
        setLongtitude(res.data.longtitude);
        setLandingName(res.data.landing_name);
        setSelectedProfileId(res.data.profile_id);
        setSelectedProfile(res.data.profile_info.name);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleIdSite = (event) => {
    setIdSite(event.target.value);
  };
  const handleLandingSite = (event) => {
    setLandingName(event.target.value);
  };
  const handleNameSite = (event) => {
    setSiteName(event.target.value);
  };
  const handleLatitudeSite = (event) => {
    setLatitude(event.target.value);
  };
  const hanldeLongtitudeSite = (event) => {
    setLongtitude(event.target.value);
  };

  // INI AKHIR GET API UNTUK PROFILE SET

  // INI AWAL PUT API UNTUK PROFILE SET

  const [idSite, setIdSite] = useState("");
  const [error, setError] = useState("");

  const handleSubmitEditSite = (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    const updatedUserData = {
      id,
      landing_name: landingName,
      latitude: latitude,
      longtitude: longtitude,
      name: siteName,
      profile_id: selectedProfileId,
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
        } else {
          setError("Failed to update, please try again.");
        }
      })
      .catch((err) => console.log(err));
  };
  // INI AKHIR PUT API UNTUK PROFILE SET

  // INI AWAL UNTUK GET CARD PAKET BERDASARKAN ID

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    axios
      .get(`http://172.16.26.97:5000/site/${id}/plan`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      })
      .then((res) => {
        const convertedPackages = convertPackages(res.data);
        setPackages(convertedPackages);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const convertPackages = (packagesData) => {
    const convertedList = packagesData.map((pkg) => {
      const convertedPkg = { ...pkg };
      convertedPkg.price = "Rp. " + pkg.price.toLocaleString();
      convertedPkg.kuota = pkg.kuota + " Kbps";
      convertedPkg.limit_shared = pkg.limit_shared + " Device";
      convertedPkg.expired = Math.floor(pkg.expired / 86400) + " Hari";
      convertedPkg.uptime = Math.floor(pkg.uptime / 86400) + " Hari";
      return convertedPkg;
    });
    return convertedList;
  };

  // INI AKHIR UNTUK GET CARD PAKET BERDASARKAN ID

  // INI AWAL UNTUK DELETE CARD PAKET BERDASARKAN ID

  const deletePaket = async (id_registered) => {
    try {
      const token = localStorage.getItem("access_token");
      // console.log(id_registered);
      const res = await axios.delete(
        `http://172.16.26.97:5000/hotspot_plan/plan_site`,
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

  // INI AKHIR UNTUK DELETE CARD PAKET BERDASARKAN ID

  return (
    <div>
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
        <ToastContainer />

        <div className="wrapContainer">
          <div className="siteContainerUp">
            <div className="siteProfile">
              <h1>Profile Site</h1>
            </div>
            <form className="formViewSite">
              <div className="formEditViewSite">
                <label htmlFor="">Landing Page Name</label>
                <input
                  type="text"
                  value={landingName}
                  onChange={handleLandingSite}
                  required="required"
                />
              </div>

              <div className="formEditViewSite">
                <label htmlFor="">Name Site</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={handleNameSite}
                  required="required"
                />
              </div>
              <div className="formEditViewSite">
                <label htmlFor="">Titik Koordinat</label>
                <input
                  type="number"
                  placeholder="Longtitude"
                  value={longtitude}
                  onChange={hanldeLongtitudeSite}
                  required="required"
                />
                <input
                  type="number"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={handleLatitudeSite}
                  required="required"
                />
              </div>
              <div className="formEditViewSite">
                <label htmlFor="">Hotspot Profile Name</label>
                <input disabled value={selectedProfile} />
              </div>
              <button type="submite" onClick={handleSubmitEditSite}>
                Update
              </button>
            </form>
          </div>
          <div className="siteContainerDown">
            <div className="paketUp">
              <h1>Daftar Paket</h1>
              <button className="new-site">
                <AddCircleOutlineIcon className="iconAdd" />
                <span className="textAdd">Add New Paket</span>
              </button>{" "}
            </div>
            <div className="paketDown">
              <div className="containerPaket">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  // pagination={true}
                  modules={[EffectCoverflow, Pagination]}
                  className="xpaket"
                >
                  {packages.map((pkg) => (
                    <SwiperSlide className="slideSwiper" key={pkg.id}>
                      <img
                        src={
                          process.env.PUBLIC_URL + "/images/logotachyon-new.png"
                        }
                        alt="Tachyon Logo"
                        className="d-inline-block align-top"
                      />
                      <div className="underLine"></div>
                      <h2>
                        <strong>{pkg.name}</strong>
                      </h2>
                      <div className="underLine"></div>
                      <div className="text">
                        <h4>Harga : {pkg.price}</h4>
                        <h6>Kuota : {pkg.kuota}</h6>
                        <h6>Expired : {pkg.expired}</h6>
                        <h6>Shared : {pkg.limit_shared}</h6>
                        <h6>Uptime : {pkg.uptime}</h6>
                      </div>
                      <Popconfirm
                        className="cellAction"
                        title="Delete Paket"
                        description="Are you sure to delete this paket?"
                        onConfirm={() => deletePaket(pkg.id)}
                        icon={
                          <QuestionCircleOutlined
                            style={{
                              color: "red",
                            }}
                          />
                        }
                      >
                        <HighlightOffIcon className="buttonDelete" />
                      </Popconfirm>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewsite;
