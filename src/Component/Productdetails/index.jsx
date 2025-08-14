import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
// Import Select and MenuItem from Material-UI for the dropdown
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import ProductSlider from "../ProductSlider";
import { fetchData } from "../../utils/api";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../../App";

import Qtybox from "../Qtybox";

// Import custom styles for a classy and cozy look
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setproduct] = useState({});
  const [slideindex, setslideindex] = useState(0);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const context = useContext(myContext);
  const [quantity, setQuantity] = useState(1);

  // Unused states, kept for completeness from original code but not directly used in this version
  const [buttonindex, setbuttonindex] = useState(null);
  const [ActiveTab, setActiveTab] = useState(0);
  const [buttonindex1, setbuttonindex1] = useState(null);
  const [buttonindex2, setbuttonindex2] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(0);
  // activeTabs is no longer needed for size, but kept for RAM/Weight if they remain buttons
  const [activeTabs, setactiveTabs] = useState(null);

  // State for selected options
  const [selectedTabSize, setSelectedTabSize] = useState(""); // Initialize as empty string for dropdown
  const [selectedTabWeight, setSelectedTabWeight] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");

  const handleSelectQty = (qty) => {
    setQuantity(qty);
  };

  // Modified handle for Size dropdown
  const handleChangeSize = (event) => {
    setSelectedTabSize(event.target.value);
  };

  // Existing handlers for RAM and Weight (if they remain buttons)
  const handleclickcolor = (index, color) => {
    setactiveTabs(index); // Still needed if RAM/Weight use buttons
    setSelectedColor(color);
  };
  const handleclickweight = (index, weight) => {
    setactiveTabs(index); // Still needed if RAM/Weight use buttons
    setSelectedTabWeight(weight);
  };

  const reviewsRef = useRef();
  const usezoom1 = useRef();
  const usezoom2 = useRef();

  const Goto = (index) => {
    setslideindex(index);
    usezoom1.current.swiper.slideTo(index);
    usezoom2.current.swiper.slideTo(index);
  };

  useEffect(() => {
    fetchData(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setproduct(res?.data);
        fetchData(`/api/product/productSub/${res?.data?.subcatId}`).then(
          (res) => {
            if (res?.error === false) {
              const filtered = res?.data?.filter((item) => item._id !== id);
              setrelatedProducts(filtered);
            } else {
              console.log("Error fetching related products");
            }
          }
        );
      } else {
        console.log("Error fetching product details");
      }
    });

    window.scrollTo(0, 0);
  }, [id]);
  const Addtocart = (product, userId, quantity) => {
    const hasSizeOptions =
      Array.isArray(product?.size) && product.size.length > 0;
    const hasColorOptions =
      Array.isArray(product?.productColor) && product.productColor.length > 0;

    // Validate size selection
    if (hasSizeOptions && !selectedTabSize) {
      context.Alertbox("error", "Please select a Size to add to cart.");
      return;
    }

    // Validate color selection
    if (hasColorOptions && !selectedColor) {
      context.Alertbox("error", "Please select a Color to add to cart.");
      return;
    }

    // If validation passes, build the cart item
    const productItems = {
      ...product,
      size: selectedTabSize,
      color: selectedColor,
    };

    context?.AddtoCart(productItems, userId, quantity);
    context.Alertbox("success", "Product added to cart!");

    // Reset selections if you want
    setSelectedTabSize("");
    setSelectedColor(null);
  };

  return (
    <>
      <section className="py-5">
        <div className="container bg-cream text-white  rounded-md">
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/" className="link">
                Home
              </Link>
              {product?.category?.name && (
                <Link
                  underline="hover"
                  color="inherit"
                  to={`/products?catId=${product.category._id}`}
                  className="text-gray-600 hover:text-brown-700 transition-colors"
                >
                  {product?.category?.name}
                </Link>
              )}
              <span className="text-gray-800 font-medium">{product?.name}</span>
            </Breadcrumbs>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        {product?.images?.length > 0 && (
          <div className="container mx-auto px-4 pb-12 lg:px-10 flex flex-col lg:flex-row gap-12 product-detail-layout">
            {/* Left: Product Image (NO ZOOM) + Thumbnails */}
            <div className="w-full lg:w-[55%] product-images-section">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Vertical Thumbnails */}
                <div className="hidden md:block w-full md:w-[15%] product-thumbnails">
                  <Swiper
                    ref={usezoom1}
                    direction={"vertical"}
                    slidesPerView={4}
                    spaceBetween={15}
                    className="h-[500px] product-swiper-vertical"
                    modules={[Navigation]}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                  >
                    {product?.images?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className={`thumbnail-item ${
                            slideindex === index
                              ? "border-brown-600 shadow-md"
                              : "border-gray-200"
                          }`}
                          onClick={() => Goto(index)}
                        >
                          <img
                            src={item.url}
                            alt={`Thumb ${index}`}
                            className="thumbnail-image"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                    {/* Add navigation buttons for vertical swiper */}
                    <div className="swiper-button-prev !top-0 !left-1/2 !-translate-x-1/2 !w-8 !h-8 !mt-2 !transform !rotate-90 !text-brown-600"></div>
                    <div className="swiper-button-next !bottom-0 !left-1/2 !-translate-x-1/2 !w-8 !h-8 !mb-2 !transform !rotate-90 !text-brown-600"></div>
                  </Swiper>
                </div>

                {/* Main Image */}
                <div className="w-full md:w-[85%] main-image-container">
                  <Swiper
                    slidesPerView={1}
                    ref={usezoom2}
                    spaceBetween={0}
                    navigation={true}
                    className="product-main-swiper"
                  >
                    {product?.images?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={item.url}
                          alt={product?.name || `Product image ${index}`}
                          className="w-full h-full object-cover main-product-image"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-[45%] product-info-section">
              {/* Title */}
              <h1 className="text-4xl font-serif text-gray-900 mb-3 leading-tight">
                {product?.name}
              </h1>

              {/* Rating and Reviews */}
              {/* <div className="flex items-center gap-4 mb-4">
                <Rating
                  value={product?.rating || 0}
                  precision={0.5}
                  readOnly
                  size="medium"
                  className="text-yellow-500"
                />
                <span className="text-sm text-gray-600 font-light">
                  ({reviewsCount || 0} reviews)
                </span>
              </div> */}

              {/* Brand */}
              {product?.brand && (
                <div className="text-md text-gray-700 mb-2">
                  Brand:{" "}
                  <span className="font-semibold text-gray-900">
                    {product?.brand}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="text-4xl font-bold text-brown-700 my-4 flex items-baseline">
                ${product?.price?.toFixed(2)}
                {product.oldprice && (
                  <span className="ml-4 line-through text-gray-400 text-xl font-normal">
                    ${product.oldprice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="text-md font-medium mb-4">
                <span
                  className={
                    product?.countInStock > 0
                      ? "text-green-700"
                      : "text-red-600"
                  }
                >
                  {product?.countInStock > 0
                    ? `In stock (${product?.countInStock} available)`
                    : "Out of stock"}
                </span>
              </div>

              {/* Description */}
              <div className="mb-6 border-t border-b border-gray-200 py-5">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Description
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-light">
                  {product?.description ||
                    "A beautifully crafted piece designed to elevate any living space. Experience comfort and style combined."}
                </p>
              </div>

              <div className="my-4">
  <div className="flex flex-wrap gap-3 items-center">
    <h3 className="text-[16px] lg:text-[18px] pt-2 font-semibold text-gray-700">
      Color:
    </h3>
    {product.productColor?.map((color, index) => (
      <button
        key={index}
        onClick={() => setSelectedColor(color)}
        className={`w-7 h-7 lg:w-9 lg:h-9 rounded-full border-2 transition-all duration-200 ease-in-out flex items-center justify-center
          ${
            selectedColor === color
              ? "ring-3 ring-offset-2 ring-blue-500 border-blue-600 shadow-md"
              : "border-gray-300 hover:border-gray-500 hover:shadow-sm"
          }
        `}
        style={{ backgroundColor: color }}
        aria-label={`Color ${color}`}
      >
        {selectedColor === color && (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </button>
    ))}
  </div>
</div>


              {/* Size Options (Now a Dropdown) */}
              {product?.size?.length > 0 && (
                <div className="mb-5 flex items-center gap-4">
                  <h3 className=" text-[16px] lg:text-[18px] font-semibold text-gray-700 whitespace-nowrap">
                    Dimensions:
                  </h3>
                  <FormControl className="w-[30%]">
                    <Select
                      id="size-select"
                      value={selectedTabSize}
                      label="Size"
                      onChange={handleChangeSize}
                      className="!rounded-lg"
                      sx={{
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--brown-500)", // Brown on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--brown-700)", // Darker brown on focus
                        },
                        "& .MuiSelect-select": {
  padding: context.windowWidth > 992 ? "12px 14px" : "6px 10px",
  fontSize: "1rem",
},

                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Select a size</em>
                      </MenuItem>
                      {product?.size.map((size, i) => (
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
                <Qtybox
                  handleSelectQty={handleSelectQty}
                  initialQuantity={quantity}
                />
                <Button
                  variant="contained"
                  className="!bg-primary !text-white hover:!bg-brown-800 !py-3 !px-8 !rounded-lg !text-base !font-semibold !shadow-md !transition-colors !duration-300"
                  onClick={() =>
                    Addtocart(product, context.userData?._id, quantity)
                  }
                  disabled={product?.countInStock === 0}
                >
                  <MdOutlineAddShoppingCart className="text-xl mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="container mx-auto px-4  lg:px-10 pt-32">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">
            You Might Also Like
          </h2>
          {relatedProducts?.length > 0 ? (
            <ProductSlider data={relatedProducts} />
          ) : (
            <p className="text-center text-gray-600">
              No related products found.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
