import Button from "@mui/material/Button";
import { VscDiffAdded } from "react-icons/vsc";
import { PiMinusSquareLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CategoryCollapse(props) {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [subInnerMenuIndex, setSubInnerMenuIndex] = useState(null);

  const toggleSubmenu = (index) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
    setSubInnerMenuIndex(null); // reset inner submenu when changing main
  };

  const toggleInnerSubmenu = (index) => {
    setSubInnerMenuIndex(subInnerMenuIndex === index ? null : index);
  };

  return (
    <div className="scroll w-full">
      <ul className="w-full">
        {props.data?.length !== 0 &&
          props.data?.map((item, index) => {
            return (
              <li className="list-none flex flex-col relative" key={index}>
                <Button
                  className="w-full !text-left !justify-between !text-black/90 !px-4 hover:bg-gray-100"
                  onClick={() => toggleSubmenu(index)}
                >
                  {item.name}
                  {submenuIndex === index ? (
                    <PiMinusSquareLight className="text-xl" />
                  ) : (
                    <VscDiffAdded className="text-xl" />
                  )}
                </Button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    submenuIndex === index ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <ul className="pl-6 bg-gray-50">
                    {item.children.length !== 0 &&
                      item.children.map((subcat, index) => (
                        <li className="list-none relative" key={index}>
                          <Button
                            className="w-full !text-left !justify-between !text-black/80 !px-4 hover:bg-gray-200"
                            onClick={() => toggleInnerSubmenu(index)}
                          >
                            {subcat.name}
                            {subInnerMenuIndex === index ? (
                              <PiMinusSquareLight className="text-xl" />
                            ) : (
                              <VscDiffAdded className="text-xl" />
                            )}
                          </Button>

                          {/* Fashion Inner Submenu */}
                          <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              subInnerMenuIndex === 0
                                ? "max-h-[500px]"
                                : "max-h-0"
                            }`}
                          >
                            <ul className="pl-6 bg-gray-100">
                              {subcat.children.map((third, index) => (
                                <li
                                  key={index}
                                  className="list-none mb-2 flex items-center"
                                >
                                  <Link
                                    to="/"
                                    className="w-full text-[13px] text-black/80 hover:text-black hover:underline transition"
                                  >
                                    {third.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
