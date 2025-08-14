import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsBoxArrowInUpRight } from "react-icons/bs";
export default function Blogitem(props) {
  return (
    <div className="blogitem group">
      <div className="item !p-3 !py-2 w-full h-full overflow-hidden !px-3 !rounded-md  cursor-pointer">
        <img
          src={props.item.image[0].url}
          className="rounded-md w-full transition-all group-hover:scale-105 group-hover:rotate-1"
        />
        <span className="flex items-center text-[14px] justify-center bg-cream p-2 rounded-md absolute gap-2 top-[15px] right-[15px] z-50">
          <MdAccessTime />
          <span>
            {new Date(props.item.createdAt).toISOString().split("T")[0]}
          </span>
        </span>
      </div>
      <div className="info ">
        <h3 className="title font-bold text-center">
          <Link to="/" className="link">
            {" "}
            {props.item.title}
          </Link>
        </h3>
        <p className="justify-between text-[rgba(0,0,0,0.7)] mb-4">
          {props.item.description
            .replace(/<[^>]+>/g, " ")
            .replace(/&nbsp;/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .substring(0, 200)
            .replace(/\s+\S*$/, "") +
            (props.item.description.length > 200 ? "..." : "")}
        </p>
        <Link
          to={`/blog/${props.item._id}`}
          className="link font-[500] text-[15px] flex gap-1"
        >
          {" "}
          Read More
          <BsBoxArrowInUpRight />
        </Link>
      </div>
    </div>
  );
}
