import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import { IoMdClose } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from "@mui/material/Button";
import { myContext } from "../../App";
import { deleteData, fetchData } from "../../utils/api";

export default function Listitems(props) {
  const context = useContext(myContext);

  // const AddtoCart = (productId, userId, quantity) => {
  //   fetchData(`/api/product/${productId}`).then((res) => {
  //     const product = res.data;
  //   });

  // };
  const handleDelete = (id) => {
    deleteData(`/api/mylist/delete/${id}`).then((res) => {
      if (res.error) {
        context.Alertbox("error", res.message);
      } else {
        context.Alertbox("success", res.message);
        context.getList(); // Refresh list
      }
    });
  };

  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[15%] rounded-md overflow-hidden">
        <Link to={`/productdetails/${props.item?.productId}`} className="group">
          <img
            src={props.item?.image}
            className="w-full group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="info w-[85%] relative">
        <IoMdClose
          onClick={() => handleDelete(props.item?._id)}
          className="cursor-pointer absolute top-[0px] right-[0px] link transition-all text-[22px]"
        />
        <span className="text-[13px] text-gray-500">{props.item?.brand}</span>
        <h4 className="text-[16px] ">
          <Link to={`/productdetails/${props.item?._id}`}>
            {props.item?.productTitle.substring(0, 30)}
          </Link>
        </h4>

        <div className="flex items-center gap-3 mt-2">
          <span className="oldprice line-through text-gray-500 text-[14px] font-[500]">
            {props.item?.oldprice}$
          </span>
          <span className="newprice text-primary text-[14px] font-bold">
            {props.item?.price}$
          </span>
          <span className="newprice text-orange-500 text-[14px] font-bold">
            {props.item?.discount}%
          </span>
        </div>

        {/* <Button
          onClick={() =>
            AddtoCart(props.item?.productId, props.item?.userId, 1)
          }
          className="btn-org gap-2 !mt-3"
        >
          Add To Cart
          <MdOutlineShoppingCart className="text-[18px]" />
        </Button> */}
      </div>
    </div>
  );
}
