import { IoMdHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Qtybox from "../../Component/Qtybox";
import { useContext, useEffect, useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { fetchData } from "../../utils/api";
import { myContext } from "../../App";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function ProductModal(props) {
  const [selectedTabSize, setSelectedTabSize] = useState(null);
  const [selectedTabWeight, setSelectedTabWeight] = useState(null);
  const [selectedTabRam, setSelectedTabRam] = useState(null);
  const [activeTabs, setactiveTabs] = useState(null);
  const context = useContext(myContext);
  const [quantity, setQuantity] = useState(1);

  const handleSelectQty = (qty) => {
    setQuantity(qty);
  };
  const handleChangeSize = (event) => {
    setSelectedTabSize(event.target.value);
  };

  const handleclick = (index, size) => {
    setactiveTabs(index);
    setSelectedTabSize(size);
  };
  const handleclickram = (index, ram) => {
    setactiveTabs(index);
    setSelectedTabRam(ram);
  };
  const handleclickweight = (index, weight) => {
    setactiveTabs(index);
    setSelectedTabWeight(weight);
  };

  const [ReviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    fetchData(`/api/user/Reviews?productId=${props.item?._id}`)
      .then((res) => {
        if (res?.success) {
          setReviewsCount(res?.data?.length || 0);
        } else {
          setReviewsCount(0);
        }
      })
      .catch(() => {
        setReviewsCount(0);
      });
  }, [props.item?._id]);
  const Addtocart = (product, userId, quantity) => {
    const productItems = {
      ...product,
      size: selectedTabSize,
      weight: selectedTabWeight,
      productRam: selectedTabRam,
    };
    if (activeTabs !== null) {
      context?.AddtoCart(productItems, userId, quantity);
      setactiveTabs(null);
      context.handleClose();
    } else {
      if (productItems.size?.length !== 0) {
        context.Alertbox("error", "Please select a Size to add to cart");
      } else if (productItems.weight?.length !== 0) {
        context.Alertbox("error", "Please select a Weight to add to cart");
      } else if (productItems.productRam?.length !== 0) {
        context.Alertbox("error", "Please select a Ram to add to cart");
      }
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-between product-info-section">
      {/* Title */}
      <h1 className="text-4xl font-serif text-gray-900 mb-3 leading-tight">
        {props.item?.name}
      </h1>

      {/* Rating and Reviews */}
      {/* <div className="flex items-center gap-4 mb-4">
        <Rating
          value={props.item?.rating || 0}
          precision={0.5}
          readOnly
          size="medium"
          className="text-yellow-500"
        />
        <span className="text-sm text-gray-600 font-light">
          ({props.item?.reviewsCount || 0} reviews)
        </span>
      </div> */}

      {/* Brand */}
      {props.item?.brand && (
        <div className="text-md text-gray-700 mb-2">
          Brand:{" "}
          <span className="font-semibold text-gray-900">
            {props.item?.brand}
          </span>
        </div>
      )}

      {/* Price */}
      <div className="text-4xl font-bold text-brown-700 my-4 flex items-baseline">
        ${props.item?.price?.toFixed(2)}
        {props.item?.oldprice && (
          <span className="ml-4 line-through text-gray-400 text-xl font-normal">
            ${props.item?.oldprice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Stock */}
      <div className="text-md font-medium mb-4">
        <span
          className={
            props.item?.countInStock > 0 ? "text-green-700" : "text-red-600"
          }
        >
          {props.item?.countInStock > 0
            ? `In stock (${props.item?.countInStock} available)`
            : "Out of stock"}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6 border-t border-b border-gray-200 py-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">
          Description
        </h3>
        <p className="text-base text-gray-700 leading-relaxed font-light">
          {props.item?.description ||
            "A beautifully crafted piece designed to elevate any living space. Experience comfort and style combined."}
        </p>
      </div>

      {/* Size Options (Now a Dropdown) */}
      {props.item?.size?.length > 0 && (
        <div className="mb-5">
          <FormControl fullWidth className="!mb-2">
            <InputLabel
              id="size-select-label"
              className="!text-gray-700 !font-semibold items-center !justify-center"
            >
              Size
            </InputLabel>
            <Select
              labelId="size-select-label"
              id="size-select"
              value={selectedTabSize}
              label="Size"
              onChange={handleChangeSize}
              className="!rounded-lg w-[30%]"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#d1d5db", // light gray border
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--brown-500)", // Brown on hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--brown-700)", // Darker brown on focus
                },
                "& .MuiSelect-select": {
                  padding: "12px 14px",
                  fontSize: "1rem",
                },
              }}
            >
              <MenuItem value="" disabled>
                <em>Select a size</em>
              </MenuItem>
              {props.item?.size.map((size, i) => (
                <MenuItem key={i} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {/* RAM Options (Remains Buttons for now)
              {product?.productRam?.length > 0 && (
                <div className="mb-5">
                  <label className="font-semibold text-md text-gray-800 mb-2 block">
                    RAM:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product?.productRam.map((ram, i) => (
                      <Button
                        key={i}
                        onClick={() => handleclickram(i, ram)}
                        className={`!rounded-full !px-5 !py-2 !transition-all !duration-300 !text-sm !font-medium ${
                          activeTabs === i
                            ? "!bg-brown-700 !text-white !shadow-lg"
                            : "!text-gray-800 !border !border-gray-300 hover:!border-brown-500 hover:!text-brown-500"
                        }`}
                        variant={activeTabs === i ? "contained" : "outlined"}
                      >
                        {ram}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Weight Options (Remains Buttons for now) */}
      {/* {product?.productweight?.length > 0 && (
                <div className="mb-6">
                  <label className="font-semibold text-md text-gray-800 mb-2 block">
                    Weight:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product?.productweight.map((w, i) => (
                      <Button
                        key={i}
                        onClick={() => handleclickweight(i, w)}
                        className={`!rounded-full !px-5 !py-2 !transition-all !duration-300 !text-sm !font-medium ${
                          activeTabs === i
                            ? "!bg-brown-700 !text-white !shadow-lg"
                            : "!text-gray-800 !border !border-gray-300 hover:!border-brown-500 hover:!text-brown-500"
                        }`}
                        variant={activeTabs === i ? "contained" : "outlined"}
                      >
                        {w}
                      </Button>
                    ))}
                  </div>
                </div>
              )} */}

      {/* Quantity + Add to Cart */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
        <Qtybox handleSelectQty={handleSelectQty} initialQuantity={quantity} />
        <Button
          variant="contained"
          className="!bg-primary !text-white hover:!bg-brown-800 !py-3 !px-8 !rounded-lg !text-base !font-semibold !shadow-md !transition-colors !duration-300"
          onClick={() => Addtocart(product, context.userData?._id, quantity)}
          disabled={props.item?.countInStock === 0}
        >
          <MdOutlineAddShoppingCart className="text-xl mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
