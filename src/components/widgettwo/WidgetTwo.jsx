import React from "react";
import "./widgettwo.scss";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";

const WidgetTwo = () => {
  return (
    <div className="containerWidget">
      <div className="clients">
        <ManageAccountsOutlinedIcon className="icon" />
        Resellers
      </div>
      <div className="order">
        <ShoppingCartOutlinedIcon className="icon" />
        Produts
      </div>
      <div className="tickets">
        <LabelOutlinedIcon className="icon" />
        Sites
      </div>
      <div className="invoices">
        <PaymentsOutlinedIcon className="icon" />
        Invoices
      </div>
      <div className="inquiries">
        <FeedbackOutlinedIcon className="icon" />
        Inquiries
      </div>
    </div>
  );
};

export default WidgetTwo;
