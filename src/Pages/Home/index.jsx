import Adsslider from "../../Component/Adsslider/index.jsx";
import Catslider from "../../Component/Catslider/index.jsx";
import HomeSlider from "../../Component/Homeslider/index.jsx";
import Bannerboxv2 from "../../Component/bannerboxv2/index.jsx";
import Blogitem from "../../Component/Blogitem/index.jsx";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import "./../../index.css";
import { FaShippingFast } from "react-icons/fa";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import ProductSlider from "../../Component/ProductSlider/index.jsx";
import Slider from "react-slick";
import Homev2 from "../../Component/homesliderv2/index.jsx";
import { fetchData } from "../../utils/api.js";
import { useContext } from "react";
import { myContext } from "../../App.jsx";
import ProductLoader from "../../Component/Productloader/index.jsx";
import { Link } from "react-router-dom";
// import { Pagination } from "@mui/material";
export default function Home() {
  const [value, setValue] = useState(0);
  const [catData, setCatData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [popproductData, setpopProductData] = useState([]);
  const [allproductData, setallProductData] = useState([]);
  const [bannersv1, setBannersv1] = useState([]);
  const [BlogData, setBlogData] = useState([]);

  const [Featured, setFeatured] = useState([]);
  const context = useContext(myContext);

  useEffect(() => {
    setCatData(context.catData || []);
    fetchData("/api/homebanner/get").then((res) => {
      console.log("Fetched Home Banner data:", res);
      setBannerData(res.banners || []);
      console.log(bannerData);
    });
    fetchData("/api/product/products").then((res) => {
      setallProductData([]);

      console.log("Fetched All Product data:", res);
      setallProductData(res.data || []);
    });
    fetchData("/api/product/isFeatured").then((res) => {
      setFeatured([]);
      console.log("Fetched Featured Product data:", res);
      setFeatured(res.data || []);
    });
    fetchData("/api/bannerv1/get").then((res) => {
      console.log("Banner response:", res);
      setBannersv1(res.data || []);
    });
    fetchData("/api/blog/get").then((res) => {
      console.log("Fetched Blog data:", res);
      setBlogData(res.data || []);
    });
    window.scrollTo(0, 0);
  }, [context.catData]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setpopProductData([]);
    fetchData(`/api/product/products/${id}`).then((res) => {
      console.log("Fetched Product data:", res);
      setpopProductData(res.data || []);
    });
  };
  const handleClickProject = (id) => {
    history();
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesToShow = 3;

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
    speed: 500,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div>
    {/* Banner */}
    {bannerData.length !== 0 && <HomeSlider data={bannerData} />}
    {context.catData.length !== 0 && <Catslider data={context.catData} />}
  
    {/* Popular Products Section */}
    <section className="bg-white py-5 lg:py-12">
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            <div className="lg:leftsec items-center">
              <h2 className=" text-[20px] pl-16 lg:pl-0 items-center lg:text-[25px] font-[600]">Popular Products</h2>
              <p className="text-[12px] text-gray-600 lg:text-black lg:text-[15px] font-[600]">Shop the latest products and get our free delivery</p>
            </div>

            <div className="rightsec pb-2 w-full lg:w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {context.catData.length !== 0 &&
                  context.catData.map((item, index) => (
                    <Tab
                      key={index}
                      label={item.name}
                      onClick={() => filterByCatId(item._id)}
                    />
                  ))}
              </Tabs>
            </div>
          </div>
          {popproductData.length === 0 && <ProductLoader />}

          {popproductData.length !== 0 && (
            <ProductSlider items={5} data={popproductData} />
          )}
        </div>
      </section>

  
    {/* Blog Section */}
    <div className="w-full bg-white py-8 sm:py-10">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-gray-900 mb-6 sm:mb-8 text-center">
            Our Latest Projects
          </h2>
        </div>
          {
            context.windowWidth >992 ?
            <Slider
          {...{
            ...settings,
            responsive: [
              { breakpoint: 1024, settings: { slidesToShow: 3 } },
              { breakpoint: 768, settings: { slidesToShow: 2 } },
              { breakpoint: 480, settings: { slidesToShow: 1 } },
            ],
          }}
        >
          {BlogData.map((item, index) => {
            const centerIndex = currentSlide + Math.floor(slidesToShow / 2);
            const isActive = index === centerIndex % BlogData.length;
  
            return (
              <div key={index} className="px-2">
                <div
                  className={`rounded-md bg-white p-4 mb-6 sm:mb-8 transition-all duration-300 ${
                    isActive ? "scale-105 shadow-lg" : "opacity-50 scale-95"
                  }`}
                >
                  <img
                    src={item.image[0].url}
                    alt={item.title}
                    className="w-full mb-4 h-40 sm:h-48 object-cover object-center rounded-md"
                  />
                  {isActive && (
                    <>
                      <Link
                        to={`/blog/${item._id}`}
                        className="block text-base sm:text-lg font-semibold mb-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.description
                          .replace(/<[^>]+>/g, " ")
                          .replace(/&nbsp;/g, " ")
                          .replace(/\s+/g, " ")
                          .trim()
                          .substring(0, 300)
                          .replace(/\s+\S*$/, "") +
                          (item.description.length > 200 ? "..." : "")}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </Slider>:
        <Slider
        {...{
          infinite: true,
          centerMode: true, // <-- THIS centers the active slide
          centerPadding: "0px", // removes side padding for perfect centering
          slidesToShow: 3, // odd number for proper center alignment
          speed: 500,
          beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                centerMode: true,
                centerPadding: "0px",
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "0px",
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "0px",
              },
            },
          ],
        }}
      >
        {BlogData.map((item, index) => {
          const isActive = index === currentSlide;
      
          return (
            <div key={index} className="px-2">
              <div
                className={`rounded-md bg-white p-4 mb-6 sm:mb-8 transition-all duration-300 ${
                  isActive ? "scale-105 shadow-lg" : "opacity-50 scale-95"
                }`}
              >
                <img
                  src={item.image[0].url}
                  alt={item.title}
                  className="w-full mb-4 h-40 sm:h-48 object-cover object-center rounded-md"
                />
                {isActive && (
                  <>
                    <Link
                      to={`/blog/${item._id}`}
                      className="block text-base sm:text-lg font-semibold mb-2"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description
                        .replace(/<[^>]+>/g, " ")
                        .replace(/&nbsp;/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()
                        .substring(0, 300)
                        .replace(/\s+\S*$/, "") +
                        (item.description.length > 200 ? "..." : "")}
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
      
          }
        {/* Slider */}
        
      </div>
    </div>
  </div>
  
  );
}
