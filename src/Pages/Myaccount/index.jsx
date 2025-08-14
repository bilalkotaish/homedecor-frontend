import { MdCloudUpload } from "react-icons/md";
import Button from "@mui/material/Button";
import { FaRegUser } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Accountsidebar from "../../Component/AccountSidebar";
import CircularProgress from "@mui/material/CircularProgress";

import { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import { editData } from "../../utils/api";
import { postData } from "../../utils/api";
export default function Myaccount() {
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [isclick, setisclick] = useState(false);
  const [phone, setPhone] = useState("");
  const [userId, setuserId] = useState("");
  const [formfield, setformfield] = useState({
    name: "",
    email: "",
    Mobile: "",
  });
  const [changePassword, setchangePassword] = useState({
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const context = useContext(myContext);
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === null) {
      history("/");
    }
  }, [context?.islogin]);
  const validValue = Object.values(formfield).every((el) => el);
  const validValue2 = Object.values(changePassword).every((el) => el);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setuserId(context?.userData?._id);
      setformfield({
        name: context?.userData?.name,
        email: context?.userData?.email,
        Mobile: context?.userData?.Mobile,
      });
      const ph = `"${context?.userData?.Mobile}"`;
      setPhone(ph);
      setchangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setformfield(() => {
      return {
        ...formfield,
        [name]: value,
      };
    });

    setchangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };
  const handlesubmit = (e) => {
    setisLoading(true);
    e.preventDefault();

    if (formfield.email === "") {
      context.Alertbox("error", "Please Provide Your Email");
      return false;
    }
    if (formfield.name === "") {
      context.Alertbox("error", "Please Provide Your Password");
      return false;
    }
    if (formfield.Mobile === "") {
      context.Alertbox("error", "Please Provide Your Mobile Number");
      return false;
    }

    editData(`/api/user/${userId}`, formfield, { withCredentials: true }).then(
      (res) => {
        if (res.error !== true) {
          setisLoading(false);
          context.Alertbox("success", res.message);
          console.log(res);
        } else {
          context.Alertbox("error", res.message);
          setisLoading(false);
        }
      }
    );
  };

  const handlesubmitChange = (e) => {
    setisLoading(true);
    e.preventDefault();

    if (changePassword.oldPassword === "") {
      context.Alertbox("error", "Please Provide Your Old Password");
      return false;
    }
    if (changePassword.password === "") {
      context.Alertbox("error", "Please Provide Your New Password");
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.Alertbox("error", "Please Confirm Your Password");
      return false;
    }
    if (changePassword.confirmPassword !== changePassword.password) {
      context.Alertbox("error", "Password Does Not Match");
      return false;
    }

    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      console.log("Response:", res);
      if (res.error !== true) {
        setisLoading(false);
        context.Alertbox("success", res.message);
        console.log(res);
      } else {
        context.Alertbox("error", res.message);
        setisLoading(false);
      }
    });
  };

  return (
    <>
      <section className="py-14 bg-[#f9f9fb] min-h-screen">
  <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-6">
    {/* Sidebar */}
    <aside className="w-full lg:w-[22%]">
      <Accountsidebar />
    </aside>

    {/* Profile Section */}
    <main className="w-full lg:w-[60%]">
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl px-6 md:px-8 py-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FaRegUser className="text-xl text-primary" /> My Profile
          </h2>
          <Button
            variant="outlined"
            onClick={() => setisclick(!isclick)}
            className="!text-primary !border-primary hover:!bg-primary hover:!text-white"
          >
            Change Password
          </Button>
        </div>

        <form onSubmit={handlesubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-5">
            <TextField
              label="Full Name"
              name="name"
              size="small"
              disabled={isLoading}
              variant="outlined"
              className="w-full"
              value={formfield.name}
              onChange={onChangeInput}
            />
            <TextField
              label="Email"
              name="email"
              size="small"
              disabled
              variant="outlined"
              className="w-full"
              value={formfield.email}
            />
          </div>

          <div className="w-full">
            <PhoneInput
              type="text"
              defaultCountry="lb"
              className="!w-full !h-[56px]"
              disabled={isLoading}
              value={phone}
              onChange={(val) => {
                setPhone(val);
                setformfield((prev) => ({ ...prev, Mobile: val }));
              }}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={!validValue}
              className="!bg-primary !border-primary hover:!bg-gradient-to-r !from-tan !to-beige !text-white hover:!shadow-lg w-full sm:w-32"
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password Panel */}
      <Collapse isOpened={isclick}>
        <div className="bg-white shadow-xl rounded-2xl px-6 md:px-8 py-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <GoChecklist className="text-xl text-primary" /> Change Password
          </h2>

          <form onSubmit={handlesubmitChange} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-5">
              {context.userData?.SignUpGoogle === false && (
                <TextField
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                  size="small"
                  variant="outlined"
                  className="w-full"
                  value={changePassword.oldPassword}
                  onChange={onChangeInput}
                />
              )}
              <TextField
                label="New Password"
                name="password"
                type="password"
                size="small"
                variant="outlined"
                className="w-full"
                value={changePassword.password}
                onChange={onChangeInput}
              />
            </div>

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              size="small"
              variant="outlined"
              className="w-full"
              value={changePassword.confirmPassword}
              onChange={onChangeInput}
            />

            <div>
              <Button
                type="submit"
                disabled={!validValue2}
                className="!bg-primary !border-primary hover:!bg-gradient-to-r !from-tan !to-beige !text-white hover:!shadow-lg w-full sm:w-40"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </main>
  </div>
</section>

    </>
  );
}
