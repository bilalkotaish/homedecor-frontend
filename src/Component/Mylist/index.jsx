import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";
import { useContext, useState } from "react";

import { IoMdClose } from "react-icons/io";
import Listitems from "./Listitems";
import Accountsidebar from "../AccountSidebar";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md"; // Add this for the icon

export default function MyList() {
  const context = useContext(myContext);
  return (
    <section className="py-14 bg-[#f9f9fb] min-h-screen">
  <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-6">
    {/* Sidebar */}
    <aside className="w-full lg:w-[22%]">
      <Accountsidebar />
    </aside>

    {/* Main Content */}
    <div className="w-full lg:w-[70%]">
      <div className="shadow-md rounded-xl bg-white overflow-hidden">
        {/* Header */}
        <div className="py-5 px-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <MdFavoriteBorder className="text-primary text-xl" />
            My List
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            There are{" "}
            <span className="text-primary font-bold">
              {context?.listData?.length} Product
            </span>{" "}
            In Your List
          </p>
        </div>

        {/* List Items */}
        {context?.listData?.length !== 0 &&
          context?.listData?.map((item, index) => {
            return <Listitems key={index} item={item} />;
          })}

        {/* Empty State */}
        {context?.listData?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[300px] p-6 text-center">
            <img
              src="src/assets/emptylist.png"
              alt="Empty List"
              className="w-32 opacity-80 mb-4"
            />
            <h4 className="text-lg font-medium text-gray-700">
              Your List is Currently Empty
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Browse the store and add your favorite products.
            </p>
            <Link to="/">
              <Button className="!bg-primary whitespace-nowrap !w-[100%] !mt-2 !border-primary hover:!bg-gradient-to-r !from-tan !to-beige !text-white hover:!shadow-lg w-32">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
</section>

  );
}
