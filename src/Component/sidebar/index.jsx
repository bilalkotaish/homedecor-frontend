import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./style.css"; // Ensure your custom CSS is imported
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useState, useEffect, useContext } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { myContext } from "../../App";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";
import { CiFilter } from "react-icons/ci";

export default function Sidebar(props) {
  const [isOpen, setIsopened] = useState(true); // Still open by default for this example
  const [filters, setfilters] = useState({
    catId: [],
    subcatId: [],
    thirdsubcatId: [],
    minPrice: "",
    maxPrice: "",
    rating: [],
    page: 1,
    limit: 5,
  });
  const [PriceRange, setPriceRange] = useState([0, 10000]);
  const context = useContext(myContext);
  const location = useLocation();

  const handleclick = () => {
    setIsopened(!isOpen);
  };

  const handlechangecheckbox = (field, value) => {
    context.setSearchData([]);
    const currentValue = filters[field] || [];
    const updatedValue = currentValue.includes(value)
      ? currentValue.filter((item) => item !== value)
      : [...currentValue, value];

    let newFilters = { ...filters, [field]: updatedValue };

    if (field === "catId") {
      newFilters.subcatId = [];
      newFilters.thirdsubcatId = [];
    }
    if (field === "subcatId") {
      newFilters.thirdsubcatId = [];
    }

    setfilters(newFilters);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const updatedFilters = {
      catId: [],
      subcatId: [],
      thirdsubcatId: [],
      rating: [],
      page: 1,
    };

    if (params.has("catId")) {
      updatedFilters.catId = [params.get("catId")];
    } else if (params.has("subcatId")) {
      updatedFilters.subcatId = [params.get("subcatId")];
    } else if (params.has("thirdsubcatId")) {
      updatedFilters.thirdsubcatId = [params.get("thirdsubcatId")];
    } else if (params.has("rating")) {
      updatedFilters.rating = params.get("rating").split(",").map(Number);
    }

    setfilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
  }, [location]);

  useEffect(() => {
    props.setisLoading(true);

    if (context.searchData?.length > 0) {
      props.setproductData(context.searchData);
      props.setisLoading(false);
    } else {
      postData("/api/product/filters", filters).then((res) => {
        props.setproductData(res.data);
        props.setisLoading(false);
        props.setTotalpage(res.totalPages);
      });
    }
  }, [filters, context.searchData]);

  useEffect(() => {
    setfilters((prev) => ({
      ...prev,
      minPrice: PriceRange[0],
      maxPrice: PriceRange[1],
    }));
  }, [PriceRange]);

  useEffect(() => {
    setfilters((prev) => ({
      ...prev,
      page: props.page,
    }));
  }, [props.page]);

  return (
    <aside className="sidebar  py-5 !static lg:fixed z-50  top-0 bg-white border-r border-gray-200">
    <div className="max-h-[60vh] overflow-auto lg:overflow-hidden w-full">
      <div className="box mt-0 lg:mt-3">
        <h3 className=" w-full text-[16px] mb-3 flex items-center font-[600] pr-3">
          Shop By Category{" "}
          <Button
            className="!text-black !w-[30px] !h-[30px] min-w-[30px] !ml-auto !rounded-full"
            onClick={handleclick}
          >
            {isOpen === true ? <FaAngleUp /> : <FaAngleDown />}{" "}
          </Button>{" "}
        </h3>
        <Collapse isOpened={isOpen}>
          <div className="scroll px-4 relative -left-[10px]">
            {context.catData.map((item) => (
              <FormControlLabel
                key={item._id}
                control={
                  <Checkbox
                    size="small"
                    checked={filters.catId.includes(item._id)}
                    onChange={() => handlechangecheckbox("catId", item._id)}
                  />
                }
                label={item.name}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      <div className="box mt-4">
        <h3 className=" w-full text-[16px] mb-3 flex items-center font-[600] pr-3">
          Filter By Price{" "}
        </h3>
        <RangeSlider
          min={100}
          max={10000}
          onInput={setPriceRange}
          step={5}
          value={PriceRange}
        />
        <div className="flex pt-4 pb-2 pricerange">
          <span className=" text-[13px]">
            From <strong className="text-dark"> $:{PriceRange[0]}</strong>
          </span>
          <span className=" text-[13px] ml-auto">
            To <strong className="text-dark"> $:{PriceRange[1]}</strong>
          </span>
        </div>
      </div>

      
    </div>
    <Button className="btn-org btn w-full gap-2 !mt-3 !mb-2 flex lg:!hidden">
      <CiFilter className="text-[20px]" />
      Filter
    </Button>
  </aside>
  );
}
