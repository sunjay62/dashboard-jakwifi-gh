import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useHandleRefreshToken = () => {
  const navigate = useNavigate();

  const handleRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("Refresh token not found");
        navigate("/");
      }

      const data = await axios.post(
        "http://172.16.26.97:5000/administrator/@refresh_token",
        {
          refresh_token: refreshToken,
        }
      );

      console.log(data);

      if (data.status === 200) {
        // Set access token in cookie, which will be deleted when the browser is closed
        Cookies.set("access_token", data.data.access_token, {
          expires: 0,
          sameSite: "strict",
          secure: true,
        });

        // Set access token and refresh token in local storage
        localStorage.setItem("access_token", data.data.access_token);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  return handleRefreshToken;
};

export default useHandleRefreshToken;
