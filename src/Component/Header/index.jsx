import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FaBars,
  FaSearch,
  FaShoppingBag,
  FaUser,
  FaRegUser,
  FaRegHeart,
} from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { myContext } from "../../App";
import { fetchData } from "../../utils/api";
import Drawer from "@mui/material/Drawer";
import Search from "../Search";
import logo from "../../assets/logofurn.PNG";
import Categorycollapse from "../categorycollapse";
import { IoMdClose } from "react-icons/io";
import Category from "./Navigation/Category";
import { PiMinusSquareLight } from "react-icons/pi";
import { VscDiffAdded } from "react-icons/vsc";
import { useEffect } from "react";
import Mobilenav from "./Navigation/Mobilenav";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header() {
  const context = useContext(myContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const history = useNavigate();
  const [isOpenCatPanel, setisOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setisOpenCatPanel(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const logout = () => {
    setAnchorEl(null);
    fetchData(`/api/user/Logout?token=${localStorage.getItem("accesstoken")}`, {
      withCredentials: true,
    }).then((res) => {
      if (res.error === false) {
        context.setislogin(false);
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        context.setCatData([]);
        context.setCartData([]);
        context.setListData([]);
        history("/");
      } else {
        context.setislogin(true);
      }
    });
  };
  const [catData, setCatData] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [subInnerMenuIndex, setSubInnerMenuIndex] = useState(null);

  useEffect(() => {
    if (context?.catData) {
      setCatData(context.catData);
    }
  }, [context?.catData]);

  const toggleCategoryPanel = () => {
    setShowCategories((prev) => !prev);
  };

  const toggleSubmenu = (index) => {
    setSubmenuIndex((prev) => (prev === index ? null : index));
    setSubInnerMenuIndex(null); // reset inner submenu when switching category
  };

  const toggleInnerSubmenu = (index) => {
    setSubInnerMenuIndex((prev) => (prev === index ? null : index));
  };

  return (
    <header className="bg-cream px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
    {/* Left: Hamburger */}
    <div className="text-lg sm:text-xl cursor-pointer" onClick={toggleDrawer(true)}>
      <FaBars />
    </div>
  
    {/* Drawer menu */}
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: { width: { xs: "55vw", sm: "300px" } }, // Responsive drawer width
      }}
    >
      <div className="w-full h-full flex flex-col p-4">
        <Search />
        <nav className="mt-4 flex flex-col gap-3 flex-1 overflow-y-auto scrollbar-hide">
          <Link to="/products" className="text-base sm:text-lg font-medium text-primary">
            Products
          </Link>
  
          <Link
            onClick={toggleCategoryPanel}
            className="text-base sm:text-lg font-medium text-primary cursor-pointer"
          >
            Categories
          </Link>
  
          {showCategories && (
            <div className="scroll w-full mt-2 bg-white rounded-md max-h-[50vh] overflow-auto">
              <ul className="w-full">
                {context.catData?.length > 0 &&
                  context.catData.map((item, index) => (
                    <li className="list-none flex flex-col relative" key={index}>
                      <div className="flex items-center justify-between px-4 hover:bg-gray-100 transition">
                        <Link
                          to={`/products?catId=${item._id}`}
                          className="text-black/90 py-2 w-full text-left text-sm sm:text-base"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => toggleSubmenu(index)}
                          className="text-lg sm:text-xl text-gray-600 hover:text-black"
                        >
                          {submenuIndex === index ? (
                            <PiMinusSquareLight />
                          ) : (
                            <VscDiffAdded />
                          )}
                        </button>
                      </div>
  
                      {/* Subcategories */}
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          submenuIndex === index ? "max-h-[500px]" : "max-h-0"
                        }`}
                      >
                        <ul className="pl-6 bg-gray-50">
                          {item.children?.length > 0 &&
                            item.children.map((subcat, subIndex) => (
                              <li className="list-none relative" key={subIndex}>
                                <Button
                                  className="w-full !text-left !justify-between !text-black/80 !px-4 hover:bg-gray-200"
                                  onClick={() => toggleInnerSubmenu(subIndex)}
                                >
                                  {subcat.name}
                                  {subInnerMenuIndex === subIndex ? (
                                    <PiMinusSquareLight className="text-lg sm:text-xl" />
                                  ) : (
                                    <VscDiffAdded className="text-lg sm:text-xl" />
                                  )}
                                </Button>
  
                                {/* Third-level categories */}
                                <div
                                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                    subInnerMenuIndex === subIndex
                                      ? "max-h-[500px]"
                                      : "max-h-0"
                                  }`}
                                >
                                  <ul className="pl-6 bg-gray-100">
                                    {subcat.children?.map((third, i) => (
                                      <li
                                        key={i}
                                        className="list-none mb-2 flex items-center"
                                      >
                                        <Link
                                          to={`/category/${third._id}`}
                                          className="w-full text-[12px] sm:text-[13px] text-black/80 hover:text-black hover:underline transition"
                                        >
                                          {third.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
  
          <Link to="/aboutus" className="text-base sm:text-lg font-medium text-primary">
            About Us
          </Link>
          <Link to="/contactus" className="text-base sm:text-lg font-medium text-primary">
            Contact Us
          </Link>
        </nav>
      </div>
    </Drawer>
  
    {/* Center: Logo */}
    <div className="flex-1 flex items-center justify-center px-2">
      <Link to="/" className="block">
        <img
          src={logo}
          className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] h-auto"
          alt="Logo"
        />
      </Link>
    </div>
  
    {/* Right: Icons */}
    <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
      {/* Authenticated or Not */}
      {context.islogin ? (
        <>
          <Button className="rounded-full gap-1 min-w-[36px]" onClick={handleClick}>
            <FaRegUser className="text-gray-600 text-[16px] sm:text-[18px]" />
          </Button>
  
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  mt: 1.5,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link to="/myaccount">
              <MenuItem>
                <FaRegUser className="text-sm mr-2" /> My Account
              </MenuItem>
            </Link>
            <Link to="/myorders">
              <MenuItem>
                <BsBagCheck className="text-sm mr-2" /> Orders
              </MenuItem>
            </Link>
            <Link to="/myList">
              <MenuItem>
                <GoChecklist className="text-sm mr-2" /> My List
              </MenuItem>
            </Link>
            <MenuItem onClick={logout}>
              <RiLogoutBoxLine className="text-sm mr-2" /> Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Link to="/login" className=" !text-black lg:!text-gray-600">
          <FaRegUser className="text-[16px] sm:text-[16px]" />
        </Link>
      )}
  
 
 
  {context?.windowWidth < 992 ? <Mobilenav />
  :
  
<>
      
      <Tooltip title="Cart">
        <IconButton onClick={() => context.setopenCartPanel(true)}>
          <StyledBadge
            badgeContent={context.cartData?.length}
            color="secondary"
          >
            <MdOutlineShoppingCart className="text-[16px] sm:text-[18px]" />
          </StyledBadge>
        </IconButton>
      </Tooltip>
  
      
      <Tooltip title="Wishlist">
        <Link to="/myList">
          <IconButton>
            <StyledBadge
              badgeContent={context.listData?.length}
              color="secondary"
            >
              <FaRegHeart className="text-[16px] sm:text-[18px]" />
            </StyledBadge>
          </IconButton>
        </Link>
      </Tooltip></>
      }
    </div>
  </header>
  
  );
}
