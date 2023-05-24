import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookie from "js-cookie";
import axios from "axios";
import DevicesIcon from "@mui/icons-material/Devices";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import jwtDecode from "jwt-decode";
import Tooltip from "@material-ui/core/Tooltip";

const Navbar = ({ handleClick }) => {
  // INI CSS UNTUK ROTATE ICON HIDE SIDEBAR, CUMA ADA BUG

  // const [rotate, setRotate] = useState(false);

  // const handleClickTwo = () => {
  //   setRotate(!rotate);
  // };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fungsi untuk menampilkan atau menyembunyikan dropdown
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Fungsi untuk menutup dropdown ketika pengguna mengklik di luar dropdown
  const handleClickOutside = (event) => {
    if (
      showDropdown &&
      !event.target.matches(".avatar") &&
      !event.target.matches(".dropdown a")
    ) {
      setShowDropdown(false);
    }
  };

  // Pasang event listener untuk menutup dropdown ketika pengguna mengklik di luar dropdown
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // REMOVE TOKEN UNTUK LOGOUT

  const logout = async () => {
    const accessToken = localStorage.getItem("access_token");

    try {
      const refreshToken = localStorage.getItem("refresh_token");
      console.log(refreshToken);
      const data = await axios.post(
        "http://172.16.26.97:5000/administrator/logout",
        { refresh_token: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        }
      );

      console.log(data);

      if (data.status === 200) {
        localStorage.removeItem("access_token");
        Cookie.remove("access_token");
        localStorage.removeItem("refresh_token");
        Cookie.remove("refresh_token");
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }

    setLoading(true);
    // Simulate API request to logout
    setTimeout(() => {
      setLoading(false);
      setLogoutSuccess(true);
      localStorage.removeItem("access_token");
      Cookie.remove("access_token");
      localStorage.removeItem("refresh_token");
      Cookie.remove("refresh_token");
      navigate("/");
      // Clear logout success message after 2 seconds
      setTimeout(() => {
        setLogoutSuccess(false);
      }, 1);
    }, 1);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      Cookie.remove("access_token");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // INI UNTUK DECODE TOKEN AGAR BISA MENAMPILKAN DATA

  const [decodedData, setDecodedData] = useState(null);

  useEffect(() => {
    // Ambil token JWT dari localStorage
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      // Dekode token
      const decoded = jwtDecode(accessToken);
      // Simpan data yang diambil dari token ke dalam state
      setDecodedData(decoded);
    }
  }, []);

  const formatLocalTime = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  };

  const extractBrowserName = (deviceString) => {
    const regex = /(Chrome|Firefox|Safari|Edge|Opera)(?=\/[\d.]+)/;
    const matches = deviceString.match(regex);
    if (matches && matches.length > 0) {
      return matches[0];
    }
    return "";
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {
            // INI CSS UNTUK ROTATE ICON HIDE SIDEBAR, CUMA ADA BUG
            /* <div className="item" onClick={handleClickTwo}>  */
          }
          <div className="item">
            <MenuOpenIcon
              // className={`icon toggle-button arrow ${rotate ? "rotated" : ""}`} // INI CSS UNTUK ROTATE ICON HIDE SIDEBAR, CUMA ADA BUG

              className="icon toggle-button arrow"
              onClick={handleClick}
            />
          </div>
          <div className="item">
            <FullscreenIcon className="icon" />
          </div>
        </div>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsActiveOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>

          <div className="item">
            <img
              src={process.env.PUBLIC_URL + "/avatar.jpg"}
              alt="avatar"
              className="avatar"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown">
                {decodedData && (
                  <Tooltip title="User" arrow>
                    <a onClick={() => alert("Profile clicked")}>
                      <PersonOutlineIcon className="dropdownIcon" />
                      {decodedData.name}
                    </a>
                  </Tooltip>
                )}
                {decodedData && (
                  <Tooltip title="Expired Time" arrow>
                    <a onClick={() => alert("Setting clicked")}>
                      <AccessTimeIcon className="dropdownIcon" />
                      {formatLocalTime(decodedData.expired)}
                    </a>
                  </Tooltip>
                )}
                {decodedData && (
                  <Tooltip title="Browser" arrow>
                    <a onClick={() => alert("Setting clicked")}>
                      <DevicesIcon className="dropdownIcon" />
                      {extractBrowserName(decodedData.device)}
                    </a>
                  </Tooltip>
                )}
                <hr />
                <a onClick={logout}>
                  {loading && (
                    <div className="loading-overlay">
                      <div className="loading-spinner"></div>
                    </div>
                  )}
                  {logoutSuccess && (
                    <div className="success">Logout successful!</div>
                  )}
                  <LogoutIcon
                    className="dropdownIcon"
                    style={{ transform: "rotate(180deg)" }}
                  />
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
