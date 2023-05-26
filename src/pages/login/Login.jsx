import { useRef, useState, useEffect } from "react";
import "./login.scss";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { fontSize } from "@mui/system";
import Cookies from "js-cookie";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [error, setError] = useState(false);
  const [remember, setRemember] = useState(false);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [refreshTokenTimeoutId, setRefreshTokenTimeoutId] = useState(null);

  const handleRememberMeChange = (event) => {
    setRemember(event.target.checked);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://172.16.26.97:5000/administrator/login",
        {
          email,
          password,
          remember,
        }
      );

      console.log(data);

      if (data.status === 200) {
        setTokens(data.data.access_token, data.data.refresh_token);
        navigate("/home");
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert("Invalid email or password");
      }
      console.log(err);
    }
  };

  const setTokens = (accessToken, refreshToken) => {
    // Set access token in local storage
    localStorage.setItem("access_token", accessToken);

    // Set refresh token in local storage
    localStorage.setItem("refresh_token", refreshToken);

    // Schedule a timeout to refresh the access token before it expires
    const tokenExpiration = parseJwt(accessToken).exp * 1000; // Expiration time in milliseconds
    const currentTime = Date.now();
    const timeUntilExpiration = tokenExpiration - currentTime;
    const refreshTime = timeUntilExpiration - 60000; // Refresh the token 1 minute before it expires

    if (refreshTokenTimeoutId) {
      clearTimeout(refreshTokenTimeoutId);
    }

    const timeoutId = setTimeout(refreshAccessToken, refreshTime);
    setRefreshTokenTimeoutId(timeoutId);
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post(
        "http://172.16.26.97:5000/administrator/refresh_token",
        {
          refresh_token: refreshToken,
        }
      );

      const { access_token, refresh_token } = response.data;

      // Update access token in local storage
      localStorage.setItem("access_token", access_token);

      // Update refresh token in local storage if a new refresh token is provided
      if (refresh_token) {
        localStorage.setItem("refresh_token", refresh_token);
      }

      // Set the new access token in the axios default headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    } catch (error) {
      console.log("Failed to refresh access token:", error);
      // Handle error, such as logging out the user
    }
  };
  // Handle login with Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  // Add interceptor to handle 401 errors
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          refreshAccessToken();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <div className="container">
      <div className="flexContainer">
        <div className="leftLogin"></div>
        <div className="logo-tachyon">
          <img src="../../images/logotachyon-new.png" alt=""></img>
        </div>
        <div className="rightLogin">
          <div className="containerLogin">
            <div className="boxTwo">
              <div className="box">
                <form
                  className="form"
                  noValidate
                  validated={validated}
                  onSubmit={handleLogin}
                >
                  {error && (
                    <span className="wrong-user">Wrong Email or Password!</span>
                  )}
                  <h2>Sign In</h2>
                  <div className="inputBox">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required="required"
                      id=""
                    />
                    <span>Username or Email</span>
                    <i></i>
                  </div>
                  <div className="inputBox">
                    <input
                      type="password"
                      id=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required="required"
                      onKeyDown={handleKeyDown} // Handle Enter key press
                    />
                    <span>Password</span>
                    <i></i>
                  </div>
                  <div className="links">
                    <div className="remember">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        onChange={handleRememberMeChange}
                        checked={remember}
                      />
                      <label htmlFor="remember">&nbsp;&nbsp;Remember me</label>
                    </div>
                    <div className="forget">
                      <a href="#">Sign Up</a>
                    </div>
                  </div>
                  <button type="submit" className="btn-login">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
