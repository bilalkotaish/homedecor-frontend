import TextField from "@mui/material/TextField";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from "../../firebase";
import logo from "../../assets/logofurn.png";

const auth = getAuth(firebaseapp);
const Googleprovider = new GoogleAuthProvider();

export default function Register() {
  const context = useContext(myContext);
  const history = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [ShowPassword, setShowPasword] = useState(false);

  const [formFields, setfromFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setfromFields({ ...formFields, [name]: value });
  };

  const validValue = Object.values(formFields).every((el) => el);

  const handlesubmit = (e) => {
    e.preventDefault();
    setisLoading(true);

    const { name, email, password } = formFields;
    if (!name || !email || !password) {
      context.Alertbox("error", "All fields are required");
      setisLoading(false);
      return;
    }

    postData("/api/user/register", formFields).then((res) => {
      setisLoading(false);
      if (!res.error) {
        context.Alertbox("success", res.message);
        localStorage.setItem("userEmail", formFields.email);
        setfromFields({ name: "", email: "", password: "" });
        history("/verify");
      } else {
        context.Alertbox("error", res.message);
      }
    });
  };

  const authWithGoogle = () => {
    signInWithPopup(auth, Googleprovider)
      .then((result) => {
        const user = result.user;

        const field = {
          name: user.displayName,
          email: user.email,
          password: null,
          Avatar: user.photoURL,
          Mobile: user.phoneNumber,
          Role: "User",
        };

        postData("/api/user/googleauth", field).then((res) => {
          if (!res.error) {
            localStorage.setItem("userEmail", field.email);
            localStorage.setItem("accesstoken", res.data.accesstoken);
            localStorage.setItem("refreshtoken", res.data.refreshToken);
            context.setislogin(true);
            context.Alertbox("success", res.message);
            history("/");
          } else {
            context.Alertbox("error", res.message);
          }
        });
      })
      .catch((error) => {
        console.error("Google Auth Error:", error);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#fefaf6] px-3 sm:px-6 lg:px-8 font-['Outfit']">
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-md bg-cream rounded-2xl shadow-lg border border-[#e8e5e0] 
                    p-5 sm:p-8">
      {/* Logo & Heading */}
      <div className="text-center mb-4 sm:mb-6">
        <img
          src={logo}
          alt="Furniture Logo"
          className="w-40 sm:w-40 mx-auto mb-2"
        />
        <h1 className="text-lg sm:text-2xl font-semibold text-[#3c2f2f]">
          Create Your Account
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Start your cozy shopping journey
        </p>
      </div>
  
      {/* Form */}
      <form onSubmit={handlesubmit} className="space-y-3 sm:space-y-5">
        {/* Name */}
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Full Name"
          value={formFields.name}
          onChange={onChangeInput}
          disabled={isLoading}
          className="w-full h-10 sm:h-12 rounded-full px-3 sm:px-4 bg-[#f6f4f1] border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-[#c4a484] transition text-sm sm:text-base"
        />
  
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formFields.email}
          onChange={onChangeInput}
          disabled={isLoading}
          className="w-full h-10 sm:h-12 rounded-full px-3 sm:px-4 bg-[#f6f4f1] border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-[#c4a484] transition text-sm sm:text-base"
        />
  
        {/* Password */}
        <div className="relative">
          <input
            type={ShowPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formFields.password}
            onChange={onChangeInput}
            disabled={isLoading}
            className="w-full h-10 sm:h-12 rounded-full px-3 sm:px-4 bg-[#f6f4f1] border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-[#c4a484] transition text-sm sm:text-base"
          />
          <Button
            type="button"
            onClick={() => setShowPasword(!ShowPassword)}
            className="!absolute !top-[7px] sm:!top-[10px] !right-[10px] !min-w-[30px] !h-[30px] 
                       sm:!min-w-[35px] sm:!h-[35px] !rounded-full !text-gray-600"
          >
            {ShowPassword ? <IoMdEye /> : <IoMdEyeOff />}
          </Button>
        </div>
  
        {/* Submit */}
        <Button
          type="submit"
          disabled={!validValue}
          className="w-full h-10 sm:h-12 !rounded-full !bg-beige hover:!bg-primary !text-black 
                     hover:!text-white flex items-center justify-center text-sm sm:text-lg font-semibold transition"
        >
          Sign Up{" "}
          {isLoading && (
            <CircularProgress size={18} color="inherit" className="ml-2" />
          )}
        </Button>
  
        {/* Login Link */}
        <div className="text-xs sm:text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#8b6f4e] font-medium hover:underline"
          >
            Login
          </Link>
        </div>
  
        {/* Divider */}
        <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4 text-center text-gray-400 text-xs sm:text-sm">
          Or register with
        </div>
  
        {/* Google Sign Up */}
        <Button
          onClick={authWithGoogle}
          className="w-full h-10 sm:h-12 !rounded-full !bg-beige hover:!bg-primary !text-black 
                     hover:!text-white flex items-center justify-center text-sm sm:text-lg font-semibold transition"
        >
          <FcGoogle className="text-base sm:text-xl" />{" "}
          <span className="ml-2">Sign up with Google</span>
        </Button>
      </form>
    </div>
  </section>
  
  
  );
}
