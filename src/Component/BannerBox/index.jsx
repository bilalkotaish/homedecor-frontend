import { Link } from "react-router-dom";
export default function Bannerbox(props) {
  return (
    <div className="bannerboxv2 w-full rounded-md group overflow-hidden relative">
      <img
        src={props.src}
        alt={props.item?.title || "banner"}
        className="w-full transition-all duration-200 group-hover:scale-105"
      />
      <div
        className={`info absolute p-5 top-0 ${
          props.info === "left" ? "left-0" : "right-0"
        } w-[50%] h-full z-50 justify-center flex-col gap-2`}
      >
        <h2 className="text-[15px] font-[500]">{props.item?.title}</h2>
        <span className="text-[25px] text-primary font-[600] w-full">
          {props.item?.price}$
        </span>
        <div>
          <Link
            to={`/products?catId=${props.item?._id}`}
            className="link text-[16px] font-[500]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
