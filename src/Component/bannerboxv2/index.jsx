import "./../bannerboxv2/style.css";
import { Link } from "react-router-dom";
export default function Bannerboxv2(props) {
  return (
    <>
      <div className="bannerboxv2 w-[full] rounded-md group overflow-hidden relative">
        <img
          src={props.image}
          alt=""
          className="w-full transition-all duration-200 group-hover:scale-105"
        />
        <div
          className={`info absolute p-5 top-0 ${
            props.info === "left" ? "left-0" : "right-0"
          } w-[50%] h-full z-50 justify-center flex-col gap-2`}
        >
          {props.info === "left" ? (
            <>
              <h2 className="text-[18px] font-[500]">
                Buy the Latest iPhone at an Unbeatable Price
              </h2>
              <span className="text-[25px] text-primary font-[600] w-full">
                999$
              </span>
              <div>
                <Link to="/" className="link text-[16px] font-[500]">
                  Shop Now
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[18px] font-[500]">
                Buy Men's Footwear with Low Price
              </h2>
              <span className="text-[25px] text-primary font-[600] w-full">
                15$
              </span>
              <div>
                <Link to="/" className="link text-[16px] font-[500]">
                  Shop Now
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
