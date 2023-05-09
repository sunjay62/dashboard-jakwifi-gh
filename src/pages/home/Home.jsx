import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Navbar from "../../components/navbar/Navbar";
import withAuth from "../../components/withAuth";
import WidgetTwo from "../../components/widgettwo/WidgetTwo";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import Chart from "../../components/chart/Chart";

const Home = () => {
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
    <div className="home">
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
              Dashboard
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="widgets" handleClick={handleClick}>
          <Widget type="upload" />
          <Widget type="list" />
          <Widget type="status" />
          <Widget type="user" />
        </div>
        <div className="mainContainer">
          <div className="charts">
            <Featured />
            <Chart />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Create Site</div>
            <Table />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
