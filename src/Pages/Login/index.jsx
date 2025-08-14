import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../utils/api";
import { myContext } from "../../App";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from "../../firebase";
import logo from "../../assets/logofurn.png";

const auth = getAuth(firebaseapp);
const Googleprovider = new GoogleAuthProvider();

export default function Login() {
  const [ShowPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(myContext);
  const history = useNavigate();

  const [formfield, setFormField] = useState({
    email: "",
    password: "",
  });

  const validValue = Object.values(formfield).every((el) => el);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formfield.email || !formfield.password) {
      context.Alertbox("error", "Please fill in all fields");
      setIsLoading(false);
      return;
    }

    postData("/api/user/login", formfield, { withCredentials: true }).then(
      (res) => {
        setIsLoading(false);
        if (!res.error) {
          context.Alertbox("success", res.message);
          localStorage.setItem("userEmail", formfield.email);
          localStorage.setItem("accesstoken", res.data.accesstoken);
          localStorage.setItem("refreshtoken", res.data.refreshToken);
          context.setislogin(true);
          history("/");
        } else {
          context.Alertbox("error", res.message);
        }
      }
    );
  };

  const forgetPassword = () => {
    if (!formfield.email) {
      context.Alertbox("error", "Please provide your email");
      return;
    }

    localStorage.setItem("userEmail", formfield.email);
    localStorage.setItem("action-type", "forgetPassword");

    postData("/api/user/forgetpassword", { email: formfield.email }).then(
      (res) => {
        if (res.success) {
          context.Alertbox("success", res.message);
          history("/verify");
        } else {
          context.Alertbox("error", res.message);
        }
      }
    );
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
    <div className="text-center mb-6">
      <img src={logo} alt="Furniture Logo" className="w-40 sm:w-40 mx-auto mb-2" />
      <h1 className="text-xl sm:text-2xl font-semibold text-[#3c2f2f]">
        Welcome Back
      </h1>
      <p className="text-xs sm:text-sm text-gray-500">Log in to continue shopping</p>
    </div>

    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email address"
        value={formfield.email}
        onChange={onChangeInput}
        disabled={isLoading}
        className="w-full h-11 sm:h-12 rounded-full px-4 bg-[#f6f4f1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c4a484] transition text-sm sm:text-base"
      />

      <div className="relative">
        <input
          type={ShowPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formfield.password}
          onChange={onChangeInput}
          disabled={isLoading}
          className="w-full h-11 sm:h-12 rounded-full px-4 bg-[#f6f4f1] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c4a484] transition text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!ShowPassword)}
          className="absolute top-3 sm:top-4 right-3 text-gray-500"
        >
          {ShowPassword ? <IoMdEye /> : <IoMdEyeOff />}
        </button>
      </div>

      <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
        <button
          type="button"
          onClick={forgetPassword}
          className="hover:text-[#c4a484] transition"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        disabled={!validValue}
        className="w-full h-11 sm:h-12 !rounded-full !bg-beige hover:!bg-primary font:['Outfit'] !text-black hover:!text-white flex items-center justify-center text-base sm:text-lg font-semibold transition"
      >
        Login{" "}
        {isLoading && (
          <CircularProgress size={18} sm:size={20} color="inherit" className="ml-2" />
        )}
      </Button>

      <p className="text-center text-xs sm:text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[#8b6f4e] font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>

      <div className="border-t text-center text-gray-600 text-sm sm:text-md pt-2">
        Or login with
      </div>

      <Button
        onClick={authWithGoogle}
        className="w-full h-11 sm:h-12 flex justify-center !text-black items-center gap-1 border border-gray-300 !bg-beige !rounded-full hover:!bg-primary hover:!text-white transition text-sm sm:text-base"
      >
        <FcGoogle className="text-lg sm:text-xl" /> Sign in with Google
      </Button>
    </form>
  </div>
</section>

  );
}
