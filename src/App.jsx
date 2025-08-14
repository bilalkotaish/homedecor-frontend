import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import Home from "./Pages/Home";
import Productlisting from "./Pages/Productlisting";
import Footer from "./Component/Footer";
import ProductDetails from "./Component/Productdetails";
import { createContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { RiCloseLine } from "react-icons/ri";
import Productzoom from "./Component/ProductZoom";
import ProductModal from "./Component/ProductModal";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Component/Cart";
import Emailverify from "./Pages/verification";
import toast, { Toaster } from "react-hot-toast";
import Forgetpass from "./Component/Forgetpass";
import Checkout from "./Pages/Checkout";
import Myaccount from "./Pages/Myaccount";
import MyList from "./Component/Mylist";
import Orders from "./Pages/Orders";
import Address from "./Pages/Myaccount/address";
import Successorder from "./Pages/Orders/successorder";
import Failedorder from "./Pages/Orders/failedorder";
import SearchPage from "./Pages/SearchPage";
import HelpCenter from "./Component/Otherpages/Helpcenter";
import ContactUs from "./Component/Otherpages/ContactUs";
import AboutUs from "./Component/Otherpages/Aboutus";
import SecurePayments from "./Component/Otherpages/Securepayment";
import LegalNotice from "./Component/Otherpages/legalnotice";
import TermsAndConditions from "./Component/Otherpages/Termofuse";
import DeliveryInfo from "./Component/Otherpages/Delivery";
import BlogDetailsPage from "./Component/Otherpages/Blogdetails/blog.details";
import { deleteData, fetchData, postData } from "./utils/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import "./responsive.css";


export const myContext = createContext();

function App() {
  const [openProduct, setOpenProduct] = useState({ open: false, item: {} });
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth] = useState(true);
  const [openCartPanel, setopenCartPanel] = useState(false);
  const [openaddressPanel, setopenaddressPanel] = useState(false);
  const [addressmode, setaddressmode] = useState("add");
  const [AddressId, setAddressId] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [allproductData, setallProductData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [islogin, setislogin] = useState(false);
  const [userData, setuserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const[filterbtnshow,setfilterbtnshow]=useState(false)
  const [OpenSearch,setOpenSearch]=useState(false)
  const [openFilter,setopenFilter]=useState(false)

  const [Addedlist, setAddedlist] = useState(false);
  const [listData, setListData] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const Alertbox = (status, msg) => {
    status === "success" ? toast.success(msg) : toast.error(msg);
  };

  // 🔹 Check login token on mount
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      setislogin(true);
      getuserDetails();
    } else {
      setislogin(false);
    }
  }, []);

  // 🔹 Fetch categories only once on app load
  useEffect(() => {
    fetchData("/api/category/getcategory").then((res) => {
      console.log("Fetched category data:", res);
      setCatData(res.categories || []);
    });
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 🔹 When login is confirmed, fetch necessary data
  useEffect(() => {
    if (islogin) {
      getAllproducts();
      getCart();
      getList();
      getuserDetails();
      fetchData("/api/category/getcategory").then((res) => {
        console.log("Fetched category data:", res);
        setCatData(res.categories || []);
      });
    }
  }, [islogin]);

  // 🔹 Get wishlist again if user data updates
  useEffect(() => {
    if (userData) getList();
  }, [userData]);

  const getAllproducts = () => {
    fetchData("/api/product/products").then((res) => {
      setallProductData(res.data || []);
      console.log("Fetched All Product data:", res);
    });
  };

  const getuserDetails = () => {
    fetchData(`/api/user/userdetails`)
      .then((res) => {
        if (res.error) throw res;
        setuserData(res.data);
      })
      .catch((err) => {
        const message = err?.message || err?.response?.data?.message;
        if (message === "You Are Not Logged In") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshToken");
          Alertbox("error", "Your session has expired");
          setislogin(false);
        } else {
          Alertbox("error", "An error occurred while fetching user data");
        }
      });
  };

  const toggleCartPanel = (newOpen) => () => {
    setopenCartPanel(newOpen);
  };

  const toggleaddressPanel = (newOpen) => () => {
    if (newOpen === false) {
      setaddressmode("add");
    }
    setopenaddressPanel(newOpen);
  };

  const handleClose = () => {
    setOpenProduct({ open: false, item: {} });
  };

  const handleOpen = (status, item) => {
    setOpenProduct({ open: status, item });
  };

  const AddtoCart = (product, userId, quantity) => {
    if (!userId) {
      Alertbox("error", "Please Login First");
      return;
    }

    const subTotal = Number(product.price) * Number(quantity);
    const Data = {
      ProductTitle: product.name,
      image: product?.images?.[0]?.url,
      productId: product._id,
      quantity: Number(quantity),
      price: Number(product.price),
      subTotal,
      countInStock: product.countInStock,
      rating: product.rating,
      userId,
      cartData,
      size: product.size,
      weight: product.productweight,
      ram: product.productRam,
    };

    postData("/api/cart/add", Data).then((res) => {
      res.error
        ? Alertbox("error", res.message)
        : (Alertbox("success", res.message), getCart());
    });
  };

  const getCart = () => {
    fetchData(`/api/cart/getCart`).then((res) => {
      res.error ? Alertbox("error", res.message) : setCartData(res.data);
    });
  };

  const handleWishlist = (item) => {
    if (!userData) {
      Alertbox("error", "Please Login First");
      return;
    }

    const existingItem = listData.find(
      (wishlistItem) => wishlistItem.productId === item._id
    );

    if (existingItem) {
      deleteData(`/api/mylist/delete/${existingItem._id}`).then((res) => {
        res.error
          ? Alertbox("error", res.message)
          : (Alertbox("success", "Removed from wishlist"), getList());
      });
    } else {
      const Data = {
        productId: item._id,
        userId: userData._id,
        image: item?.images?.[0]?.url,
        productTitle: item.name,
        price: item.price,
        rating: item.rating,
        oldprice: item.oldprice,
        brand: item.brand,
        discount: item.discount,
      };

      postData("/api/mylist/add", Data).then((res) => {
        res.error
          ? Alertbox("error", res.message)
          : (Alertbox("success", "Added to wishlist"), getList());
      });
    }
  };

  const isInWishlist = (productId) => {
    return listData.some((item) => item.productId === productId);
  };

  const getList = () => {
    fetchData(`/api/mylist/getList`).then((res) => {
      res.error ? Alertbox("error", res.message) : setListData(res.data);
    });
  };

  const values = {
    setOpenProduct,
    setopenCartPanel,
    openCartPanel,
    openaddressPanel,
    setopenaddressPanel,
    toggleaddressPanel,
    toggleCartPanel,
    handleOpen,
    handleClose,
    getuserDetails,
    addressmode,
    setaddressmode,
    AddressId,
    setAddressId,
    Alertbox,
    islogin,
    AddtoCart,
    setislogin,
    setuserData,
    userData,
    catData,
    setCatData,
    cartData,
    setCartData,
    getCart,
    handleWishlist,
    listData,
    setAddedlist,
    isInWishlist,
    Addedlist,
    setListData,
    getList,
    searchData,
    windowWidth,
    setWindowWidth,
    setSearchData,
    openFilter,
    setopenFilter,
    filterbtnshow,setfilterbtnshow,
    OpenSearch,setOpenSearch
  };

  return (
    <>
      <BrowserRouter>
        <myContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" exact element={<Productlisting />} />
            <Route
              path="/productdetails/:id"
              exact
              element={<ProductDetails />}
            />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/Register" exact element={<Register />} />
            <Route path="/Cart" exact element={<Cart />} />
            <Route path="/verify" exact element={<Emailverify />} />
            <Route path="/Resetpassword" exact element={<Forgetpass />} />
            <Route path="/checkout" exact element={<Checkout />} />
            <Route path="/myaccount" exact element={<Myaccount />} />
            <Route path="/mylist" exact element={<MyList />} />
            <Route path="/myorders" exact element={<Orders />} />
            <Route path="/orders/success" exact element={<Successorder />} />
            <Route path="/orders/failed" exact element={<Failedorder />} />
            <Route path="/address" exact element={<Address />} />
            <Route path="/search" exact element={<SearchPage />} />
            <Route path="/helpcenter" exact element={<HelpCenter />} />
            <Route path="/contactus" exact element={<ContactUs />} />
            <Route path="/Aboutus" exact element={<AboutUs />} />
            <Route path="/securepayment" exact element={<SecurePayments />} />
            <Route path="/legalnotice" exact element={<LegalNotice />} />
            <Route path="/terms" exact element={<TermsAndConditions />} />
            <Route path="/delivery" exact element={<DeliveryInfo />} />
            <Route path="/blog/:id" exact element={<BlogDetailsPage />} />
          </Routes>
          <Footer />

          <Dialog
            open={openProduct.open}
            onClose={handleClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            className="productdetailsmodal"
          >
            <DialogContent>
              <div className="flex items-center w-full productdetailsmodal container relative">
                <Button
                  onClick={handleClose}
                  className="!w-[40px] !h-[40px] !min-w-[40px] !text-[25px] !rounded-full !text-black !absolute top-[15px] right-[0px]"
                >
                  <RiCloseLine />
                </Button>
                {openProduct.item && (
                  <>
                    <div className="col-1 w-[40%] ">
                      <Productzoom images={openProduct.item?.images} />
                    </div>
                    <div className="col-2 w-[60%] py-2 px-6 pr-1">
                      <ProductModal item={openProduct.item} />
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </myContext.Provider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
