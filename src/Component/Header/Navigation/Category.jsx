import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import { VscDiffAdded } from "react-icons/vsc";
import "../Navigation/style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PiMinusSquareLight } from "react-icons/pi";
import Categorycollapse from "../../categorycollapse";
const Category = (props) => {
  const [submenuIndex, setsubmenuIndex] = useState(null);
  const [subinnermenuIndex, setinnersubmenuIndex] = useState(null);
  const toggleDrawer = (value) => () => {
    props.setisOpenCatPanel(value);
  };
  const opensubmenu = (index) => {
    if (submenuIndex === index) {
      setsubmenuIndex(null);
    } else {
      setsubmenuIndex(index);
    }
  };
  const openinnersubmenu = (index) => {
    if (subinnermenuIndex === index) {
      setinnersubmenuIndex(null);
    } else {
      setinnersubmenuIndex(index);
    }
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="category">
      <h3 className="p-2 text-[16px] text-center flex items-center justify-between">
        Shop By Categories
        <IoMdClose
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[20px]"
        />
      </h3>
      {props.data.length !== 0 && <Categorycollapse data={props.data} />}
    </Box>
  );

  return (
    <div>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};
export default Category;
