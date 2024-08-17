import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import images from "../../../config";
import base_url from "../../Utils/Url";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [nameMissingError, setNameMissingError] = useState(false);
  const [emailMissingError, setEmailMissingError] = useState(false);
  const [passwordMissingError, setPasswordMissingError] = useState(false);

  const router = useNavigate();

  const handleRegistration = () => {
    setError(false);
    setEmailMissingError(false);
    setPasswordMissingError(false);
    setNameMissingError(false);

    if (!name) {
      setNameMissingError(true);
      return;
    }
    if (!email) {
      setEmailMissingError(true);
      return;
    }
    if (!password) {
      setPasswordMissingError(true);
      return;
    }
    const data = { name, email, password };

    axios.post(`${base_url}/register`, data).then((res) => {
      if (res.data.msg === "success") {
        router("/auth/login");
        toast.success("Registration Done");
      } else {
        setError(true);
      }
    });
  };
  return (
    <div className="bg-gray-300 min-h-screen flex items-center py-12">
      <div className="bg-white w-[90%]  lg:w-[50%] mx-auto flex flex-col gap-y-12 items-center justify-center px-5 py-5">
        {/* profile image */}
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={images.proPic}
            alt="login profile logo"
            className="object-cover object-center w-16 h-16"
          />
        </div>
        {/* form  start*/}
        <div className="w-full flex flex-col gap-y-5">
          <div className="w-[100%] md:w-[60%] mx-auto px-3 py-1 rounded-md relative ">
            <label
              htmlFor="name"
              className="absolute -top-2 left-5 z-40 bg-white px-2 font-bold"
            >
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              // placeholder="Write your name"
              className="w-full px-3 py-2 rounded   outline-none mb-0 border-2 border-gray-800 focus:border-blue-700"
              type="text"
            />
            {nameMissingError && (
              <span className="text-red-500 block mt-3">Name required</span>
            )}
          </div>
          <div className="w-[100%] md:w-[60%] mx-auto px-3 py-1 rounded-md relative">
            <label
              htmlFor="email"
              className="absolute -top-2 left-5 z-40 bg-white px-2 font-bold"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              // placeholder="Write your mail"
              className="w-full px-3 py-2 rounded   outline-none mb-0 border-2 border-gray-800 focus:border-blue-700"
              type="email"
            />
            {emailMissingError && (
              <span className="text-red-500 block mt-3">Email required</span>
            )}
          </div>
          <div className="w-[100%] md:w-[60%] mx-auto px-3 py-1 rounded-md  relative">
            <label
              htmlFor="password"
              className="absolute -top-2 left-5 z-40 bg-white px-2 font-bold"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              // placeholder="Type Password"
              className="w-full px-3 py-2 rounded   outline-none mb-0 border-2 border-gray-800 focus:border-blue-700"
              type="password"
            />
            {passwordMissingError && (
              <span className="text-red-500 block mt-3">Password required</span>
            )}
          </div>
          {error && (
            <span className="w-[100%] md:w-[60%] mx-auto text-red-500">
              Already registered.
            </span>
          )}
        </div>
        {/* form  end*/}

        {/* login Button start*/}
        <div
          onClick={handleRegistration}
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
          className=" mx-auto px-5 py-2 bg-black text-white hover:bg-white hover:border hover:border-black hover:text-black rounded-md  font-extrabold text-center cursor-pointer"
        >
          <span>Create Account</span>
        </div>
        {/* login Button end*/}

        <div>
          <span>
            Already have an account? Please{" "}
            <Link className="text-blue-900 underline" to="/auth/login">
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
