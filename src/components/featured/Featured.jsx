import React from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Featured = () => {
  return (
    <div className="featured">
      <div className="topFeatured">
        <h1 className="title">Total View</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottomFeatured">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total Play Video Today</p>
        <p className="amount">2000</p>
        <p className="desc">Ini adalah hasil video yang sudah di putar</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Hours</div>
            <div className="itemresult">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">12000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Minutes</div>
            <div className="itemresult">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">120000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Seconds</div>
            <div className="itemresult">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">1200000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
