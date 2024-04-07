import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { SiNamecheap } from "react-icons/si";
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
    <div className="bg-gradient-to-br from-pink-300 to-blue-300 min-h-screen px-48 py-24">
      <div className=" relative w-full flex flex-col gap-y-12 items-center justify-center px-24 py-12">
        {/* profile image */}
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={images.proPic}
            alt="login profile logo"
            className="object-cover object-center w-16 h-16"
          />
        </div>
        {/* form  start*/}
        <div className="flex flex-col gap-y-5">
          <div className="px-5 py-2 rounded-md border-2 border-blue-700 ">
            <div className="flex items-center gap-5">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                {" "}
                <SiNamecheap className="font-bold text-[18px]" />
              </div>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Write your name"
                className="px-3 py-2 rounded bg-[#DAAEE9]  outline-none mb-0"
                type="text"
              />
            </div>
          </div>
          {nameMissingError && (
            <span className="text-red-500">Name required</span>
          )}
          <div className="px-5 py-2 rounded-md border-2 border-blue-700 ">
            <div className="flex items-center gap-5">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                {" "}
                <MdOutlineEmail className="font-bold text-[18px]" />
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Write your mail"
                className="px-3 py-2 rounded  bg-[#DAAEE9]  outline-none mb-0"
                type="email"
              />
            </div>
          </div>
          {emailMissingError && (
            <span className="text-red-500">Email required</span>
          )}
          <div className="px-5 py-2 rounded-md border-2 border-blue-700 ">
            <div className="flex items-center gap-5">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                {" "}
                <FaLock />{" "}
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type Password"
                className="px-3 py-2 rounded bg-[#DAAEE9] outline-none mb-0"
                type="password"
              />
            </div>
          </div>
          {passwordMissingError && (
            <span className="text-red-500">Password required</span>
          )}
          {error && <span className="text-red-500">Already registered.</span>}
        </div>
        {/* form  end*/}

        {/* login Button start*/}
        <div
          onClick={handleRegistration}
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
          className="bg-[#4778b1] px-24 py-2 rounded-md  font-extrabold text-[20px] opacity-90 cursor-pointer"
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
