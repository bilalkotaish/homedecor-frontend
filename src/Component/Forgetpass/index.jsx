import TextField from "@mui/material/TextField";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";

export default function forgetPassword() {
  const [ShowPassword, setShowPasword] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [ShowPassword2, setShowPasword2] = useState(false);
  const [formfield, setformfield] = useState({
    email: localStorage.getItem("userEmail"),
    newPassword: "",
    confirmPassword: "",
  });
  const context = useContext(myContext);
  const history = useNavigate();
  const validValue = Object.values(formfield).every((el) => el);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setformfield(() => {
      return {
        ...formfield,
        [name]: value,
      };
    });
  };
  const handlesubmit = (e) => {
    setisLoading(true);
    e.preventDefault();

    if (formfield.newPassword === "") {
      context.Alertbox("error", "Please Provide Your Password");
      setisLoading(false);
      return false;
    }

    if (formfield.confirmPassword === "") {
      context.Alertbox("error", "Please Provide Your Confirm Password");
      setisLoading(false);
      return false;
    }
    if (formfield.confirmPassword !== formfield.newPassword) {
      context.Alertbox("error", "Password doesn't match");
      setisLoading(false);
      return false;
    }
    postData(`/api/user/reset-password`, {
      email: localStorage.getItem("userEmail"),
      password: formfield.newPassword,
      confirmPassword: formfield.confirmPassword,
    }).then((res) => {
      if (res.error === false) {
        console.log(res);
        localStorage.removeItem("userEmail");
        localStorage.removeItem("action-type");
        context.Alertbox("success", "Password Reset Successfully");
        setisLoading(false);
        history("/login");
      } else {
        context.Alertbox("error", res.message);
      }
    });
  };

  return (
    <>
      <section className="section py-10">
        <div className="container">
          <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-12">
            <img
              src="src\assets\RESET.png"
              className="w-[80px] mx-auto h-auto mb-2"
            />

            <h3 className=" !text-center text-[18px] mb-5 font-[600]">
              {" "}
              Reset Your Password
            </h3>
            <form className="w-full" onSubmit={handlesubmit}>
              <div className="formgroup w-full mb-3 relative">
                <input
                  id="newPassword"
                  type={ShowPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  disabled={isLoading}
                  value={formfield.newPassword}
                  label="New Password"
                  variant="outlined"
                  className="w-full h-12 rounded-full px-4 bg-[#f6f4f1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c4a484] transition"
                  onChange={onChangeInput}
                />
                <Button
                  className="!absolute  !top-[10px] !right-[10px] !z-50 !w-[35px] !min-w-[35px] !h-[35px]
              !rounded-full !text-black"
                  onClick={() => setShowPasword(!ShowPassword)}
                >
                  {ShowPassword === true ? (
                    <IoMdEye className="text-[20px]" />
                  ) : (
                    <IoMdEyeOff />
                  )}
                </Button>
              </div>
              <div className="formgroup w-full mb-3 relative">
                <input
                  id="confirmPassword"
                  type={ShowPassword2 ? "text" : "password"}
                  name="confirmPassword"
                  placeholder=" Confirm Password"
                  disabled={isLoading}
                  value={formfield.confirmPassword}
                  label="confirm Password"
                  variant="outlined"
                  className="w-full h-12 rounded-full px-4 bg-[#f6f4f1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c4a484] transition"
                  onChange={onChangeInput}
                />

                <Button
                  className="!absolute  !top-[10px] !right-[10px] !z-50 !w-[35px] !min-w-[35px] !h-[35px]
              !rounded-full !text-black"
                  onClick={() => setShowPasword2(!ShowPassword2)}
                >
                  {ShowPassword2 === true ? (
                    <IoMdEye className="text-[20px]" />
                  ) : (
                    <IoMdEyeOff />
                  )}
                </Button>
              </div>

              <div className="flex !items-center mt-3 mb-3">
                <Button type="submit" className="btn-org w-full gap-3">
                  Reset Password
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    ""
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
