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

<script
  src="https://kit.fontawesome.com/03920cb664.js"
  crossorigin="anonymous"
></script>;

const Login = () => {
  // const userRef = useRef();
  // const errRef = useRef();
  // const [error, setError] = useState(false);
  // const [validated, setValidated] = useState(false);
  // const [email, setEmail] = useState("");
  // const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (token) {
  //     // navigate("/home");
  //   }
  // }, [navigate]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await axios.post("http://172.16.26.97:8088/operator/login", {
  //       email,
  //       password,
  //     });
  //     if (data.status === 200) {
  //       localStorage.setItem("access_token", data.data.token);
  //       // navigate("/home");
  //       console.log(data);
  //     } else {
  //       console.log(data);
  //     }
  //   } catch (err) {
  //     if (err.response.status === 401) {
  //       alert("Invalid email or password");
  //     }
  //     console.log(err);
  //   }
  // };

  return (
    <div className="body">
      <div className="containerLogin">
        <div className="forms-container">
          <div className="signin">
            <form className="formSign">
              <div className="input-field">
                <h2 className="title">Sign In</h2>
                <FontAwesomeIcon icon={faUser} />
                <input type="text" placeholder="Username or Email" />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} />
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" className="btn solid" />

              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faFacebookF} />{" "}
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faTwitter} />{" "}
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faGoogle} />{" "}
                </a>
                <a href="#" className="social-icon">
                  <FontAwesomeIcon icon={faLinkedin} />{" "}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
