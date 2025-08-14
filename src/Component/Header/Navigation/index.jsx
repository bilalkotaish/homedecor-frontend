import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import Category from "./Category";
import { useState } from "react";
import "../Navigation/style.css";
import { useEffect } from "react";
import { fetchData } from "../../../utils/api";
import { useContext } from "react";
import { myContext } from "../../../App";

export default function Navigation() {
  const [isOpenCatPanel, setisOpenCatPanel] = useState(false);
  const [catData, setCatData] = useState([]);
  const context = useContext(myContext);

  const openCategoryPanel = () => {
    setisOpenCatPanel(true);
  };
  useEffect(() => {
    setCatData(context?.catData || []);
  }, [context?.catData]);
  return (
    <>
      <nav>
        <div className="container flex items-center justify-end gap-9 ">
          <div className="col_1 w-[20%] ">
            <Button
              className="!text-black gap-2 w-full"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill aria-hidden="true" className="text-[18px] link" />
              Shop By Categories
              <FaAngleDown
                className="text-[12px] ml-auto font-bold "
                aria-hidden="true"
              />
            </Button>
          </div>
          <div className="col_2 w-[60%]">
            <ul className="flex items-center gap-3 ">
              <li className="list-none ">
                <Link
                  to="/"
                  className="link transition  text-[13px] font-[500]"
                >
                  <Button className="link transiton hover:!bg-transparent  !py-4  font-[500]">
                    Home
                  </Button>
                </Link>
              </li>
              {catData.length !== 0 &&
                catData.map((item) => {
                  return (
                    <li className="list-none relative group " key={item._id}>
                      <Link
                        to={`/products?catId=${item._id}`}
                        className="link transition text-[13px] font-[500] hover:text-primary"
                      >
                        <Button className="!py-4 font-[500] !text-current hover:!bg-transparent w-full text-left">
                          {item.name}
                        </Button>
                      </Link>
                      {item.children.length !== 0 && (
                        <div className="submenu absolute top-full left-0 w-[200px] bg-white shadow-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          <ul>
                            {item.children.map((child) => {
                              return (
                                <li
                                  className="relative group/sub link list-none"
                                  key={child._id}
                                >
                                  <Link
                                    to={`/products?subcatId=${child._id}`}
                                    className="link transition text-[13px] font-[500] hover:text-primary"
                                  >
                                    <Button className="text-black w-full flex !justify-start !text-left">
                                      {child.name}
                                    </Button>
                                  </Link>
                                  {child.children.length !== 0 && (
                                    <div className="absolute top-0 left-full w-[200px] bg-white shadow-md opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all z-50">
                                      <ul>
                                        {child.children.map((subchild) => {
                                          return (
                                            <li
                                              className="list-none"
                                              key={subchild._id}
                                            >
                                              <Link
                                                to={`/products?subsubcatId=${subchild._id}`}
                                                className="link transition text-[13px] font-[500] hover:text-primary"
                                              >
                                                <Button className="text-black w-full text-left">
                                                  {subchild.name}
                                                </Button>
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col_3 w-[20%]">
            <p className="text-[13px] font-[500] flex items-center gap-2 link transition">
              {" "}
              <GoRocket className="text-[18px]" />
              Free International Delivery{" "}
            </p>
          </div>
        </div>
      </nav>
      {catData.length !== 0 && (
        <Category
          setisOpenCatPanel={setisOpenCatPanel}
          isOpenCatPanel={isOpenCatPanel}
          data={catData}
        />
      )}
    </>
  );
}
