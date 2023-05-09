import React from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ViewListIcon from "@mui/icons-material/ViewList";
import PausePresentationIcon from "@mui/icons-material/PausePresentation";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DnsIcon from "@mui/icons-material/Dns";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

const Widget = ({ type }) => {
  //temporary

  const amount = 100;
  const diff = 20;

  let data;

  switch (type) {
    case "upload":
      data = {
        title: "HOTSPOT PROFILE",
        value: false,
        link: "New Profile",
        icon: (
          <ManageAccountsIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.300)",
            }}
          />
        ),
      };
      break;
    case "list":
      data = {
        title: "TYPE PLAN",
        value: false,
        link: "View All Plan",
        icon: (
          <ViewListIcon
            className="icon"
            style={{
              color: "orangered",
              backgroundColor: "rgba(255, 113, 62, 0.300)",
            }}
          />
        ),
      };
      break;
    case "status":
      data = {
        title: "HOTSPOT TEMPLATE",
        value: true,
        link: "View All Template",
        icon: (
          <ContentPasteIcon
            className="icon"
            style={{
              color: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.300)",
            }}
          />
        ),
      };
      break;
    case "user":
      data = {
        title: "HOTSPOT SERVER",
        value: true,
        link: "See All Server",
        icon: (
          <DnsIcon
            className="icon"
            style={{
              color: "red",
              backgroundColor: "rgba(255, 0, 0, 0.300)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.value} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
