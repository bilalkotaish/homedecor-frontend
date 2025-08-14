import { NavLink } from "react-router";
import Button from "@mui/material/Button";
import { MdCloudUpload } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchData, uploadImage } from "../../utils/api";
import { LiaMapMarkedSolid } from "react-icons/lia";

export default function Accountsidebar() {
  const [preview, setpreview] = useState([]);
  const [upload, setupload] = useState(false);
  const context = useContext(myContext);

  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userData?.Avatar !== "" &&
      context?.userData?.Avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.Avatar);
      setpreview(userAvatar);
    }
  }, [context?.userData]);

  const onchangefile = async (e, apiEndPoint) => {
    try {
      setpreview([]);
      const files = e.target.files;
      setupload(true);
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            files[i].type
          )
        ) {
          formData.append("Avatar", files[i]);

          const res = await uploadImage("/api/user/user-avatar", formData);

          console.log("Response data:", res);

          if (res?.Avatar) {
            setupload(false);
            setpreview([res.Avatar]); // ✅ Set as array
            context.Alertbox("success", "Image Uploaded Successfully");
          }
        } else {
          context.Alertbox("error", "Please select only image file");
          setupload(false);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setupload(false);
    }
  };

  const logout = () => {
    fetchData(`/api/user/Logout?token=${localStorage.getItem("accesstoken")}`, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      if (res.error === false) {
        context.setislogin(false);
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        context.setCatData([]);
        context.setCartData([]);
        context.setListData([]);
        navigate("/");
      } else {
        context.setislogin(true);
      }
    });
  };
  return (
    <div className="card bg-white shadow-md rounded-md w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
  <div className="w-full p-4 sm:p-5 flex items-center justify-center flex-col">
    {/* Avatar */}
    <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden flex items-center justify-center mb-4 relative group">
      {upload ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          {preview.length > 0 ? (
            preview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ))
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktcnWbHej5LP9gi_MAZXL1HvYlEpb9MLLsA&s"
              className="w-full h-full object-cover"
              alt="default avatar"
            />
          )}
        </>
      )}

      {/* Upload overlay */}
      <div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
        <MdCloudUpload className="text-white text-[20px] sm:text-[25px]" />
        <input
          type="file"
          className="top-0 left-0 absolute w-full h-full opacity-0"
          accept="image/*"
          onChange={(e) => {
            onchangefile(e, "/api/user/user-avatar");
          }}
          name="Avatar"
        />
      </div>
    </div>

    {/* Name & email */}
    <h3 className="text-base sm:text-lg font-semibold text-center">{context?.userData?.name}</h3>
    <h6 className="text-[12px] sm:text-[14px] font-medium text-gray-600 text-center">{context?.userData?.email}</h6>
  </div>

  {/* Menu items */}
  <ul className="list-none pb-4 myaccounttabs">
    {[
      { to: "/myaccount", icon: <FaRegUser className="text-[14px] sm:text-[15px]" />, label: "My Profile" },
      { to: "/address", icon: <LiaMapMarkedSolid className="text-[16px] sm:text-[18px]" />, label: "My Address" },
      { to: "/mylist", icon: <GoChecklist className="text-[16px] sm:text-[18px]" />, label: "My List" },
      { to: "/myorders", icon: <BsBagCheck className="text-[16px] sm:text-[18px]" />, label: "My Orders" },
    ].map((item, idx) => (
      <li key={idx} className="w-full">
        <NavLink to={item.to} activeClassName="isActive" exact>
          <Button className="w-full !rounded-none flex !py-2 sm:!py-3 !px-4 sm:!px-5 !justify-start items-center !capitalize !text-[rgba(0,0,0,0.7)] gap-2 text-sm sm:text-base">
            {item.icon} {item.label}
          </Button>
        </NavLink>
      </li>
    ))}

    {/* Logout */}
    <li className="w-full">
      <NavLink onClick={logout} exact activeClassName="isActive">
        <Button
          onClick={logout}
          className="w-full !rounded-none flex !py-2 sm:!py-3 !px-4 sm:!px-5 !justify-start items-center !capitalize !text-[rgba(0,0,0,0.7)] gap-2 text-sm sm:text-base"
        >
          <RiLogoutBoxLine className="text-[16px] sm:text-[18px]" /> Logout
        </Button>
      </NavLink>
    </li>
  </ul>
</div>

  );
}
