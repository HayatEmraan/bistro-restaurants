import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });
  useEffect(() => {
    axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        config.headers.authorization = `${token}`;
      }
      return config;
    });

    axiosInstance.interceptors.response.use((res) => res, async (err) => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          await logOut();
          localStorage.removeItem("token");
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
  }, [logOut, axiosInstance, navigate]);
  return [axiosInstance];
};

export default useAxiosSecure;
