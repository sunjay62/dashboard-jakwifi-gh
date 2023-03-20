import React, { useState, useEffect } from "react";
import "./myservice.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import WidgetTwo from "../widgettwo/WidgetTwo";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const Myservice = () => {
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
    <>
      <div className="homeService">
        <Sidebar />
        <div className="homeContainer" handleClick={handleClick}>
          <Navbar handleClick={handleClick} />
          <div className="widgettwo" handleClick={handleClick}>
            <WidgetTwo />
          </div>
          <div className="mainContainer">
            <div className="breadCrumbsContainer">
              <div role="presentation">
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
                    Products
                  </Typography>
                </Breadcrumbs>
              </div>
            </div>

            <div className="secondContent">SECOND CONTENT</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myservice;
