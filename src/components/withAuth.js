// import React, { Component } from "react";
// import { Navigate } from "react-router-dom";
// import Cookie from "js-cookie";

// const withAuth = (WrappedComponent) => {
//   return class extends Component {
//     render() {
//       const token = Cookie.get("jwt_token"); // ambil token dari cookie
//       const isAuthenticated = !!token; // periksa apakah token tersedia
//       if (!isAuthenticated) {
//         return <Navigate to="/" />;
//       }
//       return (
//         <WrappedComponent {...this.props} isAuthenticated={isAuthenticated} />
//       );
//     }
//   };
// };

// export default withAuth;

//INI UNTUK GET TOKEN DAN AKAN DIRECT KE DASHBOARD

import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const withAuth = (WrappedComponent) => {
  return class extends Component {
    render() {
      // const tokenOld = Cookie.get("access_token"); // ambil token dari local storage
      const token = localStorage.getItem("access_token"); // ambil token dari local storage
      if (!token) {
        return <Navigate to="/" />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
