import axios from "axios";
import Cookies from "js-cookie";

const handleRefreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("Refresh token not found");
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
  }
};

export default handleRefreshToken;
