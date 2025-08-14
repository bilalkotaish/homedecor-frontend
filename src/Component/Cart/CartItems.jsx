import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import { IoMdClose } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { deleteData, editData } from "../../utils/api";
import { myContext } from "../../App";

export default function CartItems(props) {
  const [sizeanchorEl, sizesetAnchorEl] = useState(null);
  const [weightanchorEl, weightsetAnchorEl] = useState(null);
  const [ramanchorEl, ramsetAnchorEl] = useState(null);
  const [qtyanchorEl, qtysetAnchorEl] = useState(null);

  const [selectedSize, setselectedSize] = useState(props.data?.size?.[0] || "");
  const [selectedweight, setselectedweight] = useState(
    props.data?.weight?.[0] || ""
  );
  const [selectedram, setselectedram] = useState(props.data?.ram?.[0] || "");
  const [selectedqty, setselectedqty] = useState(
    props.qty || props.data?.quantity
  );

  const context = useContext(myContext);

  const opensize = Boolean(sizeanchorEl);
  const openweight = Boolean(weightanchorEl);
  const openram = Boolean(ramanchorEl);
  const openqty = Boolean(qtyanchorEl);

  const handleClickSize = (event) => sizesetAnchorEl(event.currentTarget);
  const handleClickWeight = (event) => weightsetAnchorEl(event.currentTarget);
  const handleClickram = (event) => ramsetAnchorEl(event.currentTarget);
  const handleClickqty = (event) => qtysetAnchorEl(event.currentTarget);

  const handleCloseSize = () => sizesetAnchorEl(null);
  const handleCloseWeight = () => weightsetAnchorEl(null);
  const handleCloseram = () => ramsetAnchorEl(null);
  const handleCloseqty = () => qtysetAnchorEl(null);

  const UpdateCart = (SelectedVal, qty) => {
    const updatedQty = qty !== undefined ? qty : selectedqty;
    const productItems = { size: [], weight: [], ram: [] };

    if (SelectedVal !== null && SelectedVal !== undefined) {
      if (props.data?.productId?.size?.includes(SelectedVal)) {
        setselectedSize(SelectedVal);
        setselectedweight([]);
        setselectedram([]);
        productItems.size = [SelectedVal];
      } else if (props.data?.productId?.productweight?.includes(SelectedVal)) {
        setselectedweight(SelectedVal);
        setselectedSize([]);
        setselectedram([]);
        productItems.weight = [SelectedVal];
      } else if (props.data?.productId?.productRam?.includes(SelectedVal)) {
        setselectedram(SelectedVal);
        setselectedSize([]);
        setselectedweight([]);
        productItems.ram = [SelectedVal];
      }
    } else {
      // When only qty updates, keep current selections
      if (selectedSize.length > 0) productItems.size = selectedSize;
      if (selectedweight.length > 0) productItems.weight = selectedweight;
      if (selectedram.length > 0) productItems.ram = selectedram;
    }

    setselectedqty(updatedQty);

    // const previousQty = props.data?.quantity || 0;
    // const qtyDiff = updatedQty - previousQty;
    // const newStock = context.cartData[0]?.countInStock - qtyDiff;

    editData(`/api/cart/updateCart`, {
      _id: props.data._id,
      qty: updatedQty,
      // countInStock: newStock,
      ...productItems,
    }).then((res) => {
      if (res.error) {
        context.Alertbox("error", res.error);
      } else {
        context.Alertbox("success", res.message);
        context.getCart();
      }
    });
  };

  const handledeleteCart = (id) => {
    deleteData(`/api/cart/deletecart/${id}`).then((res) => {
      if (res.error) {
        context.Alertbox("error", res.error);
        return;
      } else {
        context.Alertbox("success", res.message);
        context.getCart();
      }
    });
  };
  return (
    <div className="cartItem w-full p-3 flex flex-wrap md:flex-nowrap items-start md:items-center gap-4 pb-5 border-b border-gray-400">
  <div className="img w-full md:w-[15%] rounded-md overflow-hidden">
    <Link to="/productdetails" className="group block">
      <img
        src={props.data?.image}
        alt={props.data?.ProductTitle}
        className="w-full h-auto group-hover:scale-105 transition-transform duration-300 object-cover"
      />
    </Link>
  </div>

  <div className="info w-full md:w-[85%] relative">
    <IoMdClose
      className="cursor-pointer absolute top-2 right-2 md:top-[0px] md:right-[0px] text-[22px] hover:text-red-500 transition-colors"
      onClick={() => handledeleteCart(props.data._id)}
      aria-label="Remove item"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handledeleteCart(props.data._id)}
    />
    <span className="text-[13px] text-gray-500 block mb-1">
      {props.data?.productId?.brand}
    </span>
    <h4 className="text-[16px] mb-2">
      <Link to="/productdetails" className="hover:underline">
        {props.data?.ProductTitle?.substring(0, 30)}
      </Link>
    </h4>

    <div className="flex flex-wrap gap-3 mt-2">
      {props.data?.productId?.size?.length > 0 && (
        <div className="relative">
          <span
            className="flex items-center bg-sand text-[11px] py-1 px-2 font-[600] cursor-pointer rounded-md select-none"
            onClick={handleClickSize}
          >
            Size: {selectedSize || "Select"} <GoTriangleDown />
          </span>
          <Menu anchorEl={sizeanchorEl} open={opensize} onClose={handleCloseSize}>
            {props.data?.productId?.size.map((item, index) => (
              <MenuItem
                key={index}
                className={item === selectedSize ? "!bg-primary !text-white" : ""}
                onClick={() => UpdateCart(item, selectedqty)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}

      {props.data?.productId?.productweight?.length > 0 && (
        <div className="relative">
          <span
            className="flex items-center bg-sand text-[11px] py-1 px-2 font-[600] cursor-pointer rounded-md select-none"
            onClick={handleClickWeight}
          >
            Weight: {selectedweight || "Select"} <GoTriangleDown />
          </span>
          <Menu anchorEl={weightanchorEl} open={openweight} onClose={handleCloseWeight}>
            {props.data?.productId?.productweight.map((item, index) => (
              <MenuItem
                key={index}
                className={item === selectedweight ? "!bg-primary !text-white" : ""}
                onClick={() => UpdateCart(item, selectedqty)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}

      {props.data?.productId?.productRam?.length > 0 && (
        <div className="relative">
          <span
            className="flex items-center bg-sand text-[11px] py-1 px-2 font-[600] cursor-pointer rounded-md select-none"
            onClick={handleClickram}
          >
            Ram: {selectedram || "Select"} <GoTriangleDown />
          </span>
          <Menu anchorEl={ramanchorEl} open={openram} onClose={handleCloseram}>
            {props.data?.productId?.productRam.map((item, index) => (
              <MenuItem
                key={index}
                className={item === selectedram ? "!bg-primary !text-white" : ""}
                onClick={() => UpdateCart(item, selectedqty)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}

      <div className="relative">
        <span
          className="flex items-center bg-sand text-[11px] py-1 px-2 font-[600] cursor-pointer rounded-md select-none"
          onClick={handleClickqty}
        >
          Qty: {selectedqty} <GoTriangleDown />
        </span>
        <Menu anchorEl={qtyanchorEl} open={openqty} onClose={handleCloseqty}>
          {Array.from(
            { length: props.data?.productId?.countInStock || 0 },
            (_, i) => i + 1
          ).map((num) => (
            <MenuItem key={num} onClick={() => UpdateCart(null, num)}>
              {num}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
      <span className="line-through text-gray-500 font-[500]">
        {props.data?.productId?.oldprice}$
      </span>
      <span className="text-primary font-bold">{props.data?.price}$</span>
      <span className="text-orange-500 font-bold">
        {props.data?.productId?.discount}%
      </span>
    </div>
  </div>
</div>

  );
}
