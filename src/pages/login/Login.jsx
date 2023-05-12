import { useRef, useState, useEffect, useContext } from "react";
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

// //INI UNTUK REMEMBER ME
// const rememberCheckbox = document.getElementById("remember");
// const usernameInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");

// // Set the initial state of the "remember me" checkbox based on saved data
// rememberCheckbox.checked = localStorage.getItem("remember") === "true";
// usernameInput.value = localStorage.getItem("username") || "";
// passwordInput.value = localStorage.getItem("password") || "";

// // Save the "remember me" state and the username/password fields when the form is submitted
// document.querySelector("form").addEventListener("submit", (event) => {
//   if (rememberCheckbox.checked) {
//     localStorage.setItem("remember", "true");
//     localStorage.setItem("username", usernameInput.value);
//     localStorage.setItem("password", passwordInput.value);
//   } else {
//     localStorage.removeItem("remember");
//     localStorage.removeItem("username");
//     localStorage.removeItem("password");
//   }
// });

// // Update the "remember me" state when the checkbox is clicked
// rememberCheckbox.addEventListener("click", () => {
//   if (rememberCheckbox.checked) {
//     localStorage.setItem("remember", "true");
//   } else {
//     localStorage.removeItem("remember");
//   }
// });

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
        // ini untuk set jwt di dalam cookie, dan cookie akan terhapus jika browser di close

        Cookies.set("access_token", data.data.access_token, {
          expires: 0, // mengatur cookie expire ke 0
          sameSite: "strict",
          secure: true,
        });
        console.log(Cookies);
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("refresh_token", data.data.refresh_token);
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

  //untuk login with enter

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

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
                      <label for="remember">&nbsp;&nbsp;Remember me</label>
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
