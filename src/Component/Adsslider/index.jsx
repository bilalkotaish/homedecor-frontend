import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Bannerbox from "../BannerBox";
import Bannerboxv2 from "../bannerboxv2";
export default function Adsslider(props) {
  return (
    <div className=" w-full bg-white py-16">
      <Swiper
        slidesPerView={props.data?.length}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="smlbtn"
      >
        {props.data?.map((item, index) => (
          <SwiperSlide key={index}>
            <Bannerbox
              item={item}
              info={item.info}
              img
              src={item.image?.[0]?.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
