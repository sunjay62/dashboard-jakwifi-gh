import React, { useState, useEffect } from "react";
import "./sidebar.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import AddchartIcon from "@mui/icons-material/Addchart";
import ExtensionIcon from "@mui/icons-material/Extension";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LogoutIcon from "@mui/icons-material/Logout";

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

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const accessToken = localStorage.getItem("access_token");
  //     const refreshToken = localStorage.getItem("refresh_token");

  //     try {
  //       const res = await axios.get("http://172.16.26.97:8088/operator/@me", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `${accessToken} ${refreshToken}`,
  //         },
  //       });

  //       setUsers(res.data.username);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const toClient = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/reseller/new");
      setIsLoading(false);
    }, 1000);
  };

  const toHsprofile = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/hotspot/profile");
      setIsLoading(false);
    }, 1000);
  };

  const toHstemplate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/hotspot/template");
      setIsLoading(false);
    }, 1000);
  };

  const toHsplan = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/hotspot/type");
      setIsLoading(false);
    }, 1000);
  };

  const toProductsNew = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/products/new");
      setIsLoading(false);
    }, 1000);
  };

  const toService = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/service");
      setIsLoading(false);
    }, 1000);
  };

  const toDatatable = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/reseller/list");
      setIsLoading(false);
    }, 1000);
  };

  const toSite = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/site");
      setIsLoading(false);
    }, 1000);
  };

  const home = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/home");
      setIsLoading(false);
    }, 1000);
  };

  const toHsServer = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/hotspot/server");
      setIsLoading(false);
    }, 1000);
  };

  //   const [sidebarVisibility, setSidebarVisibility] = useState(true);

  //   useEffect(() => {
  //     const toggleButton = document.querySelector(".toggle-button");
  //     toggleButton.addEventListener("click", toggleSidebar);
  //     return () => toggleButton.removeEventListener("click", toggleSidebar);
  //   }, []);

  //   const toggleSidebar = () => {
  //     setSidebarVisibility(!sidebarVisibility);
  //     const sidebar = document.querySelector(".sidebar");
  //     sidebar.classList.toggle("close");
  //   };
  //   let arrow = document.querySelectorAll(".arrow");

  //   for (let i = 0; i < arrow.length; i++) {
  //     arrow[i].addEventListener("click", (e) => {
  //       let arrowParent = e.target.parentElement.parentElement;
  //       // console.log(arrowParent);
  //       arrowParent.classList.toggle("showMenu");
  //     });
  //   }

  //   let sidebar = document.querySelector(".sidebar");
  //   let sidebarBtn = document.querySelector(".bx-menu");
  //   console.log(sidebarBtn);
  //   sidebarBtn.addEventListener("click", () => {
  //     sidebar.classList.toggle("close");
  //   });

  //   let mainContent = document.querySelector(".main-content");
  //   console.log(mainContent);

  //   sidebarBtn.addEventListener("click", () => {
  //     mainContent.classList.toggle("close");
  //   });

  //   const navigate = useNavigate();
  //   const [users, setUsers] = useState("");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const token = localStorage.getItem("access_token");

  //       try {
  //         const res = await axios.get("http://172.16.26.97:8088/operator/@me", {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: token,
  //           },
  //         });

  //         setUsers(res.data.username);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   // REMOVE TOKEN UNTUK LOGOUT
  //   const logout = () => {
  //     localStorage.removeItem("access_token");
  //     navigate("/");
  //   };

  //   // TO HOME
  //   const home = () => {
  //     navigate("/home");
  //   };

  //   // TO USERS
  //   const operator = () => {
  //     navigate("/users");
  //   };

  // INI UNTUK TOGLE DROPDOWN
  const handleClickArrow = () => {
    const arrow2 = document.querySelector(".test");
    arrow2.classList.toggle("showMenu");
  };

  const handleClickArrow2 = () => {
    const arrow2 = document.querySelector(".test2");
    arrow2.classList.toggle("showMenu");
  };

  const handleClickArrow3 = () => {
    const arrow3 = document.querySelector(".test3");
    arrow3.classList.toggle("showMenu");
  };
  const handleClickArrow4 = () => {
    const arrow3 = document.querySelector(".test4");
    arrow3.classList.toggle("showMenu");
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className="sidebar">
        <div className="logo-details" onClick={home}>
          {/* <i className="bx bxs-cube-alt"></i> */}
          {/* <ViewInArIcon className="i" onClick={home} />
          <span className="logo-name" onClick={home}>
            JakWiFi&nbsp;Apps
          </span> */}
          <img
            src="../../images/logotachyon-new.png"
            onClick={home}
            alt=""
          ></img>
        </div>
        <ul className="nav-links">
          <li onClick={home}>
            <a href="#" onClick={home}>
              {/* <i className="bx bx-grid-alt"></i> */}
              <GridViewIcon className="i" onClick={home} />
              <span className="link-name" onClick={home}>
                Dashboard
              </span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link-name" href="#">
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
          <li className="test" onClick={handleClickArrow}>
            <div className="icon-link">
              <a href="#">
                {/* <i className="bx bxs-objects-horizontal-left"></i> */}
                <DisplaySettingsIcon className="i" />
                <span className="link-name">Products</span>
              </a>
              {/* <i className="bx bx-chevron-down arrow"></i> */}
              <KeyboardArrowDownIcon className="arrow" />
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link-name" href="#">
                  Products
                </a>
              </li>
              <li onClick={toProductsNew}>
                <a href="#" onClick={toProductsNew}>
                  Add Product
                </a>
              </li>
              <li>
                <a href="#">View Products</a>
              </li>
            </ul>
          </li>
          <li className="test2" onClick={handleClickArrow2}>
            <div className="icon-link">
              <a href="#">
                {/* <i className="bx bxs-user-detail"></i> */}
                <ManageAccountsIcon className="i" />
                <span className="link-name">Reseller</span>
              </a>
              {/* <i className="bx bx-chevron-down arrow"></i> */}
              <KeyboardArrowDownIcon className="arrow " />
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link-name" href="#">
                  Reseller
                </a>
              </li>
              <li onClick={toClient}>
                <a href="#" onClick={toClient}>
                  Add Reseller
                </a>
              </li>
              <li onClick={toDatatable}>
                <a href="#" onClick={toDatatable}>
                  List Reseller
                </a>
              </li>
            </ul>
          </li>

          <li onClick={toHsServer}>
            <a href="#" onClick={toHsServer}>
              {/* <i className="bx bxs-bar-chart-alt-2"></i> */}
              <AddchartIcon className="i" onClick={toHsServer} />
              <span className="link-name" onClick={toHsServer}>
                Hotspot Server
              </span>
            </a>
            <ul className="sub-menu blank" onClick={toHsServer}>
              <li onClick={toHsServer}>
                <a className="link-name" href="#" onClick={toHsServer}>
                  Hotspot Server
                </a>
              </li>
            </ul>
          </li>
          <li className="test4" onClick={handleClickArrow4}>
            <div className="icon-link">
              <a href="#">
                {/* <i className="bx bxs-user-detail"></i> */}
                <DonutSmallIcon className="i" />
                <span className="link-name">Site</span>
              </a>
              {/* <i className="bx bx-chevron-down arrow"></i> */}
              <KeyboardArrowDownIcon className="arrow " />
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link-name" href="#">
                  Site
                </a>
              </li>
              <li onClick={toSite}>
                <a href="#" onClick={toSite}>
                  Add Site
                </a>
              </li>
              <li onClick={toSite}>
                <a href="#" onClick={toSite}>
                  List Site
                </a>
              </li>
            </ul>
          </li>
          <li className="test3" onClick={handleClickArrow3}>
            <div className="icon-link">
              <a href="#">
                {/* <i className="bx bxs-plug"></i> */}
                <ExtensionIcon className="i" />
                <span className="link-name">Hotspot</span>
              </a>
              {/* <i className="bx bx-chevron-down arrow"></i> */}
              <KeyboardArrowDownIcon className="arrow" />
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link-name" href="#">
                  Hotspot
                </a>
              </li>
              <li onClick={toHsprofile}>
                <a href="#" onClick={toHsprofile}>
                  Profile
                </a>
              </li>
              <li onClick={toHstemplate}>
                <a href="#" onClick={toHstemplate}>
                  Template
                </a>
              </li>
              <li onClick={toHsplan}>
                <a href="#" onClick={toHsplan}>
                  Type Plan
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              {/* <i className="bx bxs-cog"></i>  */}
              <SettingsSuggestIcon className="i" />
              <span className="link-name">Setting</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link-name" href="#">
                  Setting
                </a>
              </li>
            </ul>
          </li>
          <div className="end"></div>

          {/* <li>
            <div className="profile-details">
              <div className="profile-content">
                <img src="./image/avatar.jpg" alt="profile" />
              </div>

              <div className="name-job">
                <div className="profile-name">Sunan Jaya</div>
                <div className="job">Administrator</div>
              </div>
              <LogoutIcon className="i" />
            </div>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
