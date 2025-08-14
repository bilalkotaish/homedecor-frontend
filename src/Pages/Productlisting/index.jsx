import Sidebar from "../../Component/sidebar/index.jsx";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../Component/ProductItem/index.jsx";
import Button from "@mui/material/Button";
import ProductItemListView from "../../Component/ProductItemlistview/index.jsx";
import { BsFillGridFill } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import ProductLoaderGrid from "../../Component/Productloader/productLoadergrid.jsx";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { postData } from "../../utils/api.js";
import { myContext } from "../../App.jsx";
import { useContext } from "react";
import { MdClose } from "react-icons/md";

export default function Productlisting() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [ItemView, SetItemView] = useState("grid");
  const [productData, setproductData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [page, setpage] = useState(1);
  const [Totalpage, setTotalpage] = useState(1);
  const [sort, setSort] = useState("Name A-Z");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const open = Boolean(anchorEl);
  const context = useContext(myContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSortBy = (name, order, products, value) => {
    setSort(value);

    const plainArray = Array.isArray(products) ? products : products?.products;

    postData("/api/product/Sort", {
      products: plainArray,
      sortBy: name,
      order: order,
    }).then((res) => {
      console.log(res);
      setproductData(res.data);
      setAnchorEl(null);
    });
  };

  return (
    <section className="py-6">
    {/* Breadcrumbs - Only for desktop */}
    {context.windowWidth > 992 && (
      <div className="container bg-cream text-white rounded-md p-3">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/" className="link">
            Home
          </Link>
          {context.catData?.length > 0 ? (
            <Link
              underline="hover"
              color="inherit"
              to={`/products?catId=${productData[0]?.category._id}`}
              className="text-gray-600 hover:text-brown-700 transition-colors"
            >
              {productData[0]?.category.name}
            </Link>
          ) : (
            <Typography color="text.primary" className="text-gray-600">
              All Products
            </Typography>
          )}
        </Breadcrumbs>
      </div>
    )}
  
    {/* Main Layout */}
    <div className="bg-white p-2 lg:mt-3">
        <div className="container flex flex-col md:flex-row gap-3">
          <div
            className={`sidebarwrapper  transition-all !fixed -bottom-[100%] left-0 z-[102]
             lg:!static lg:w-[20%]  lg:z-[100] lg:h-full   md:w-1/4 bg-white p-3 lg:opacity-100
             opacity-0
             ${context?.openFilter === true ? "open" : ""} `}
          >
            <Sidebar
              productData={productData}
              setproductData={setproductData}
              isLoading={isLoading}
              setisLoading={setisLoading}
              page={page}
              setpage={setpage}
              Totalpage={Totalpage}
              setTotalpage={setTotalpage}
            />
          </div>

          <div
            className={`overlay_filter w-full h-full bg-[rgba(0,0,0,0.7)] fixed top-0 left-0 z-[101] ${
              context.openFilter === true ? "block" : "hidden"
            } lg:hidden`}
          >
            <MdClose
              className="text-white text-[25px] top-0 ml-auto"
              onClick={() => context.setopenFilter(false)}
            />
          </div>

          <div className="rightcontent w-full lg:w-[80%] py-4">
            <div className="p-1 w-full bg-cream sticky h-auto top-0 right-0 z-10 bg-[#f1f1f1] mb-4 rounded-md flex items-center !justify-between">
              <div className="flex items-center gap-2 sm:gap-2 lg:gap-3 itemViewActions">
                {/* List View Button */}
                {/* <Button
                  className={`!rounded-full !text-black 
      sm:!w-[32px] sm:!h-[32px] sm:!p-2
      !p-0 !min-w-0 w-auto h-auto
    `}
                  onClick={() => SetItemView("list")}
                >
                  <IoMdMenu
                    className={`text-[18px] sm:text-[18px] ${
                      ItemView === "list" ? "text-primary" : "text-black"
                    }`}
                  />
                // </Button>

                {/* Grid View Button */}
                {/* <Button
                  className={`!rounded-full !text-black 
      sm:!w-[32px] sm:!h-[32px] sm:!p-2
      !p-0 !min-w-0 w-auto h-auto
    `}
                  onClick={() => SetItemView("grid")}
                >
                  <BsFillGridFill
                    className={`text-[16px] sm:text-[18px] ${
                      ItemView === "grid" ? "text-primary" : "text-black"
                    }`}
                  />
                </Button> */} 
                
                  <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-[400] text-[rgba(0,0,0,0.5)] whitespace-nowrap">
                    There are {productData?.length} products Available
                  </span>
                
              </div>

              <div className="col-2 ml-auto whitespace-nowrap flex items-center justify-end gap-2">
                <span className="text-[12px] lg:text-sm font-semibold text-gray-500">
                  Sort by
                </span>

                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!text-sm !text-gray-800 !bg-white !capitalize !border !border-gray-300 !shadow-sm hover:!bg-gray-100"
                  endIcon={open ? <FaAngleUp /> : <FaAngleDown />}
                >
                  {sort}
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    className: "!bg-white !shadow-lg !rounded-md",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleSortBy("name", "asc", productData, "Name A-Z");
                    }}
                    className="!text-sm !text-gray-800 hover:!bg-gray-100"
                  >
                    Name A-Z
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSortBy("name", "desc", productData, "Name Z-A");
                    }}
                    className="!text-sm !text-gray-800 hover:!bg-gray-100"
                  >
                    Name Z-A
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSortBy(
                        "price",
                        "asc",
                        productData,
                        "Price Low to High"
                      );
                    }}
                    className="!text-sm !text-gray-800 hover:!bg-gray-100"
                  >
                    Price Low to High
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSortBy(
                        "price",
                        "desc",
                        productData,
                        "Price High to Low"
                      );
                    }}
                    className="!text-sm !text-gray-800 hover:!bg-gray-100"
                  >
                    Price High to Low
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div
              className={`grid gap-3 ${
                ItemView === "grid"
                  ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {isLoading ? (
                <ProductLoaderGrid view={ItemView} />
              ) : (
                productData?.map((item, index) =>
                  ItemView === "grid" ? (
                    <ProductItem key={index} item={item} />
                  ) : (
                    <ProductItemListView key={index} item={item} />
                  )
                )
              )}
            </div>

            <Pagination
              className="flex justify-center mt-3 items-center"
              count={Totalpage}
              color="primary"
              showFirstButton
              showNextButton
              hidePrevButton
              page={page}
              onChange={(e, page) => {
                setpage(page);
              }}
            />
          </div>
        </div>
      </div>
  </section>
  
  );
}
