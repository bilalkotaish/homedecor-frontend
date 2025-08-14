import "./style.css";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { myContext } from "../../App";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [search, setSearch] = useState("");
  const context = useContext(myContext);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value !== "") {
      postData("/api/product/search", { query: value }).then((res) => {
        context.setSearchData(res.data);
        console.log(res.data);
      });
    } else {
      context.setSearchData([]);
    }
  };

  const handleSearch = () => {
    navigate(`/search`);
    setSearch("");
    context.setSearchData([]);
  };

  return (
    <div className="searchbox w-full h-[50px] bg-cream rounded-[80px] relative">
      <input
        value={search}
        onChange={onChangeInput}
        className="w-full h-[50px] focus:outline-none !text-[#D6AC8C] bg-inherit rounded-[80px] p-4 text-[15px] border border-gray-300 placeholder:text-gray-500"
        placeholder="Search For Products..."
        type="text"
      />

      <Button
        onClick={handleSearch}
        className="!absolute top-[7px] right-[5px] !text-primary z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full"
      >
        <IoSearch className="text-primary text-[20px]" />
      </Button>

      {/* Search Results Dropdown */}
      {search && context?.searchData?.length > 0 && (
        <div className="absolute top-[55px] left-0 w-full bg-white shadow-lg rounded-md z-40 max-h-[300px] overflow-y-auto">
          {context.searchData.map((item, index) => (
            <div
              key={index}
              className="p-3 border-b hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                navigate(`/productDetails/${item._id}`);
                setSearch("");
                context.setSearchData([]);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
