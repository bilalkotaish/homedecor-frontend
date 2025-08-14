import React, { useState } from "react";
import { Button } from "@mui/material";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
export default function Qtybox(props) {
  const [qtyValue, setqtyValue] = useState(1);

  const plusqty = () => {
    setqtyValue(qtyValue + 1);
    props.handleSelectQty(qtyValue + 1);
  };
  const minusqty = () => {
    if (qtyValue === 1) {
      setqtyValue(1);
      props.handleSelectQty(1);
    } else {
      setqtyValue(qtyValue - 1);
      props.handleSelectQty(qtyValue - 1);
    }
  };

  return (
    <div className="qtybox flex items-center relative">
      <input
        type="number"
        placeholder="qty"
        className="w-full h-[40px] pl-5 text-[15px]  p-2 focus:outline-none !border border-[rgba(0,0,0,0.1)]"
        value={qtyValue}
      />

      <div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-50 ">
        <Button
          className="!min-w-[20px] !h-[20px] !text-black !rounded-none !hover:bg-[#f1f1f1]"
          onClick={plusqty}
        >
          <IoIosArrowUp className="text-[12px] opacity-55" />
        </Button>
        <Button
          className="!min-w-[20px] !h-[20px] !text-black !rounded-none !hover:bg-[#f1f1f1]"
          onClick={minusqty}
        >
          <IoIosArrowDown className="text-[12px] opacity-55" />
        </Button>
      </div>
    </div>
  );
}
