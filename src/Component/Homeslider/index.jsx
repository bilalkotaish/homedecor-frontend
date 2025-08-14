import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";

export default function HomeSlider(props) {
  return (
    <div className="homeslider pt-0 lg:pt-5 pb-2 lg:pb-5 bg-white w-full">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={0}
        className="sliderhome"
      >
        {props.data.length !== 0 &&
          props.data?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="w-screen overflow-hidden">
                  <img
                    src={item.images?.[0]?.url}
                    className="w-screen h-[150px] lg:h-auto object-cover"
                    alt="bannerslide"
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
