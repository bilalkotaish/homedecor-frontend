import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useRef, useState } from "react";

export default function Productzoom(props) {
  const [slideindex, setslideindex] = useState(0);
  const usezoom1 = useRef();
  const usezoom2 = useRef();
  const Goto = (index) => {
    setslideindex(index);
    usezoom1.current.swiper.slideTo(index);
    usezoom2.current.swiper.slideTo(index);
  };
  return (
    <div className="flex gap-3 ">
      <div className="slider w-[15%]">
        <Swiper
          ref={usezoom1}
          direction={"vertical"}
          slidesPerView={4} // Number of slides visible at a time
          spaceBetween={5} // Space between slides
          navigation={false} // Enable navigation buttons (next/prev)
          modules={[Navigation]} // Import navigation module
          className="zoomthumbs h-[500px]"
        >
          {props.images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className={`item  rounded-md !overflow-hidden cursor-pointer group ${
                    slideindex === index ? "opacity-1" : "opacity-30"
                  }`}
                  onClick={() => {
                    Goto(index);
                  }}
                >
                  <img
                    src={item.url}
                    alt="Product 1"
                    className=" w-full transition-full rounded-lg group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {
        <div className="zoomcontainer w-[85%] h-[500px] overflow-hidden rounded-md">
          <Swiper
            slidesPerView={1}
            ref={usezoom2}
            spaceBetween={0}
            navigation={false}
          >
            {props.images?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <InnerImageZoom
                    src={item.url}
                    zoomType="hover"
                    zoomScale={1}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      }
    </div>
  );
}
