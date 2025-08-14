import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { CiShare1 } from "react-icons/ci";
import { IoExpandOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { myContext } from "../../App";
import { deleteData, editData } from "../../utils/api";
import { IoCloseSharp } from "react-icons/io5";

export default function ProductItem(props) {
  const context = useContext(myContext);
  const { item } = props;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [ActiveTab, setActiveTab] = useState(null);

  const [isShow, setIsShow] = useState(false);

  const [selectedTabSize, setSelectedTabSize] = useState(null);
  const [selectedTabWeight, setSelectedTabWeight] = useState(null);
  const [selectedTabRam, setSelectedTabRam] = useState(null);

  const primaryImage = item?.images?.[0]?.url;
  const secondaryImage = item?.images?.[1]?.url;

  const categoryName =
    typeof item?.category === "object" ? item?.category?.name : item?.category;

  const Addtocart = (product, userId, quantity) => {
    const productItems = {
      ...product,
      size: selectedTabSize,
      weight: selectedTabWeight,
      productRam: selectedTabRam,
    };

    if (
      item.size?.length !== 0 ||
      item.weight?.length !== 0 ||
      item.ram?.length !== 0
    ) {
      setIsShow(true);
    } else {
      context?.AddtoCart(productItems, userId, quantity);
      setIsAdded(true);
      setQuantity(1);
      setIsShow(false);
    }

    if (ActiveTab !== null) {
      context?.AddtoCart(productItems, userId, quantity);
      setIsAdded(true);
      setQuantity(1);
      setIsShow(false);
    }
  };

  useEffect(() => {
    if (!item?._id || !context?.cartData) return;
    console.log("cartData example:", context.cartData[0]);

    const items = context?.cartData?.filter(
      (item2) =>
        item2.productId?.toString() === item._id?.toString() ||
        item2.productId?._id?.toString() === item._id?.toString()
    );

    if (items.length !== 0) {
      setCartItems(items);
      console.log("AddedItem:", items);
      setIsAdded(true);
      setQuantity(items[0]?.quantity);
    } else {
      setIsAdded(false);
    }
  }, [context?.cartData, item?._id]);
  const handleDecrement = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(1);
    }
    if (quantity === 1) {
      deleteData(`/api/cart/deletecart/${cartItems[0]?._id}`).then((res) => {
        if (res.error) {
          context.Alertbox("error", res.error);
          return;
        } else {
          context.Alertbox("success", res.message);
          setIsAdded(false);
          setIsShow(false);
          setActiveTab(null);
          context.getCart();
        }
      });
    } else {
      const obj = {
        _id: cartItems[0]?._id,
        qty: quantity - 1,
        subTotal: cartItems[0]?.price * (quantity - 1),
        // countInStock: cartItems[0]?.countInStock - quantity + 1,
      };

      editData(`/api/cart/updateCart`, obj).then((res) => {
        console.log(res);
        if (res.error) {
          context.Alertbox("error", res.error);
          return;
        } else {
          context.Alertbox("success", res.message);
        }
      });
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    const obj = {
      _id: cartItems[0]?._id,
      qty: quantity + 1,
      subTotal: cartItems[0]?.price * (quantity + 1),
      // countInStock: cartItems[0]?.countInStock - (quantity + 1),
    };

    editData(`/api/cart/updateCart`, obj).then((res) => {
      console.log(res);
      if (res.error) {
        context.Alertox("error", res.error);
        return;
      } else {
        context.Alertbox("success", res.message);
      }
    });
  };

  const handleActiveTab = (index, name, type) => {
    setActiveTab(index);

    if (type === "size") {
      setSelectedTabSize(name);
    } else if (type === "weight") {
      setSelectedTabWeight(name);
    } else if (type === "ram") {
      setSelectedTabRam(name);
    }
  };

  const handleWishlist = (item) => {
    context.handleWishlist(item);
    context.getList();
  };

  return (
    <div className="relative w-full max-w-[230px] lg:h-[300px] h-[250px] rounded-2xl overflow-hidden shadow-lg bg-white group transition-transform hover:scale-105">
  {/* Full Image */}
  <Link to={`/productdetails/${item?.id || item?._id}`}>
    <img
      src={
        item?.images?.[0]?.url ||
        "https://ik.imagekit.io/zkfk9j5s6/Banners/furb1_SrGMkEY1U.jpg"
      }
      alt={item?.name || "Product image"}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
  </Link>

  {/* Tooltip Buttons */}
  <div className="absolute top-3 sm:top-4 right-2 sm:right-3 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
    <Tooltip title="Add to wishlist">
      <Button
        onClick={() => handleWishlist(item)}
        className="!p-1 sm:!p-2 !rounded-full w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] !bg-white text-gray-600 hover:!bg-primary hover:!text-white transition-all duration-300"
      >
        {context.isInWishlist(item._id) ? (
          <IoMdHeart className="drop-shadow-md !text-primary hover:!text-white" size={18} />
        ) : (
          <IoMdHeartEmpty className="text-gray-400 hover:text-primary drop-shadow-md" size={18} />
        )}
      </Button>
    </Tooltip>

    <Tooltip title="Quick view">
      <Button
        onClick={() => context.handleOpen(true, item)}
        className="!p-1 sm:!p-2 !rounded-full w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] !bg-white text-gray-600 hover:!bg-primary hover:!text-white transition-all duration-300"
      >
        <IoExpandOutline size={16} className="text-gray-400 hover:text-white drop-shadow-md" />
      </Button>
    </Tooltip>
  </div>

  {/* Bottom overlay content */}
  <div className="absolute bottom-2  sm:bottom-6 right-3 sm:right-6 flex flex-col !items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
    <div className="relative w-[100%] sm:w-[95%] px-4  sm:px-5 py-3 sm:py-4 bg-white bg-opacity-90 rounded-xl shadow-lg flex flex-col gap-2 sm:gap-3 items-start">
      {/* Category Badge */}
      <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1 rounded-full shadow-md">
        {typeof item.category === "object"
          ? item.category.name
          : item.category || "Default"}
      </span>

      {/* Name and Price */}
      <div className="w-full flex justify-between items-center">
        <span className="text-[12px] sm:text-[14px] font-semibold text-primary truncate pr-2 sm:pr-4">
          {item.name || "Minimalist Lamp"}
        </span>
        <span className="text-green-800 font-semibold text-xs sm:text-sm">
          ${item.price || "34"}
        </span>
      </div>
    </div>
  </div>
</div>

  );
}
