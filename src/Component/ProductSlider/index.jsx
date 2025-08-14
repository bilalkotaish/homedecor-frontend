import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem/index.jsx";
import { useContext } from "react";
import { myContext } from "../../App.jsx";
export default function ProductSlider(props) {
  const context=useContext(myContext)

  return (
    <div className="productslider py-1">
      <Swiper
        navigation={context.windowWidth>992 ?true:false}
        modules={[Navigation]}
        spaceBetween={context.windowWidth<992?10:30}
      className="mySwiper"
      slidesPerView={context.windowWidth<992?2:5}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2.5,
          spaceBetween: 12,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }}
      >
        {props.data?.length !== 0 &&
          props.data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="item h-[300px] w-[100%] flex">
                  <ProductItem item={item} />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
