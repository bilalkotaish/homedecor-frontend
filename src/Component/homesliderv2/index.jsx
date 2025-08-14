import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation, EffectFade, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Homev2(props) {
  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      effect={"fade"}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className="homesliderv2"
    >
      {props.data.map((item, index) => {
        if (item.IsDisplayedHome) {
          return (
            <SwiperSlide key={index}>
              <div className="w-full rounded-md item overflow-hidden ">
                <img src={item?.bannerImage[0]} />
                <div
                  className="info absolute top-0  -right-[100%] w-[50%] opacity-0 duration-700 
            transition-all h-[100%] z-50 p-8 items-center flex flex-col justify-center"
                >
                  <h4 className="text-[20px] w-full font-[500] text-left opacity-0 relative -right-[100%] ">
                    {item.bannerTitle}
                  </h4>
                  <h2 className="text-[30px] mt-6 font-[650] opacity-0 relative -right-[100%] ">
                    {item.name}
                  </h2>
                  <h5 className="text-[20px] w-full font-[500] opacity-0 relative -right-[100%] flex items-center gap-5 text-left mt-4">
                    Starting At{" "}
                    <span className="text-primary text-[30px] !mr-4">
                      {item.price}$
                    </span>
                  </h5>
                  <div className="w-full opacity-0 relative -right-[100%] btn_">
                    <Link to={`/products?catId=${item._id}`}>
                      <Button className="!text-white !bg-primary">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
}
