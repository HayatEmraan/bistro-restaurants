import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import authentication from "../../assets/others/authentication2.png";

import "./authentication.css";
import useGogole from "../../hooks/useGoogle";
const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleGoogle = () => {
    signInWithGoogle().then((result) => {
      const user = result.user;
      if (user) {
        useGogole(user.displayName, user.email, user.photoURL);
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate("/");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div className="flex flex-row-reverse justify-around items-center p-12 authentication">
        <div className="w-1/3">
          <h2 className="font-inter font-bold text-4xl text-center">LogIn</h2>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter here..."
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleValidateCaptcha}
                type="text"
                name="captcha"
                placeholder="type the captcha above"
                className="input input-bordered"
              />
            </div>
            {/* TODO: make button disabled for captcha */}
            <div className="form-control mt-6">
              <input
                disabled={disabled}
                className="btn btn-primary"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <p className="text-center text-[#D1A054] text-xl font-medium">
            <small>
              New Here? <Link to="/signup">Create an account</Link>{" "}
            </small>
          </p>
          <div className="divider">Or sign in with</div>
          <div className="flex gap-4 justify-center mb-4">
            <div
              onClick={handleGoogle}
              className="text-2xl bg-[#F1F2F4] p-1 border bottom-3 border-black rounded-full cursor-pointer"
            >
              <FaGoogle />
            </div>
            <div className="text-2xl bg-[#F1F2F4] p-1 border bottom-3 border-black rounded-full cursor-pointer">
              <FaTwitter />
            </div>
            <div className="text-2xl bg-[#F1F2F4] p-1 border bottom-3 border-black rounded-full">
              <FaGithub />
            </div>
          </div>
        </div>
        <div>
          <img className="" src={authentication} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
