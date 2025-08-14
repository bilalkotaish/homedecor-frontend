import {
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { myContext } from "../../App";
import { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { postData, fetchData, editData, deleteData } from "../../utils/api";

export default function AddressPanel() {
  const [formfield, setformfield] = useState({
    Address_line: "",
    City: "",
    State: "",
    Pincode: "",
    Country: "",
    Mobile: "",
    Address_Type: "",
    landmark: "",
  });
  const context = useContext(myContext);
  const [isLoading, setisLoading] = useState(false);
  const [address, setaddress] = useState([]);

  const [phone, setPhone] = useState("");
  //   const [mode, setmode] = useState("add");
  const [addressId, setaddressId] = useState("");
  const [isOpen, setOpen] = useState(false);

  const [Addresstype, setAddresstype] = useState("");
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setformfield(() => {
      return {
        ...formfield,
        [name]: value,
      };
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChangeAddresstype = (e) => {
    setAddresstype(e.target.value);
    setformfield({ ...formfield, Address_Type: e.target.value });
  };

  useEffect(() => {
    if (context.addressmode === "edit") {
      fetchData(`/api/address/${context.AddressId}`, {
        withCredentials: true,
      }).then((res) => {
        setformfield({
          Address_line: res.data?.Address_line,
          City: res.data?.City,
          State: res.data?.State,
          Pincode: res.data?.Pincode,
          Country: res.data?.Country,
          Mobile: res.data?.Mobile,
          Address_Type: res.data?.Address_Type,
          landmark: res.data?.landmark,
        });
        setAddresstype(res.data?.Address_Type);
        setPhone(res.data?.Mobile);
      });
    }
  }, [context.addressmode, context.addressId]);

  const handlesubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    // setmode("add");

    if (formfield.Address_line === "") {
      context.Alertbox("error", "Please Provide Your Address");
      return;
    }
    if (formfield.City === "") {
      context.Alertbox("error", "Please Provide Your City");
      return;
    }
    if (formfield.Mobile === "") {
      context.Alertbox("error", "Please Provide Your Mobile Number");
      return;
    }
    if (formfield.State === "") {
      context.Alertbox("error", "Please Provide Your state");
      return;
    }
    if (formfield.Pincode === "") {
      context.Alertbox("error", "Please Provide Your Pincode");
      return;
    }
    if (formfield.Country === "") {
      context.Alertbox("error", "Please Provide Your Country");
      return;
    }
    if (formfield.landmark === "") {
      context.Alertbox("error", "Please Provide Your Landmark");
      return;
    }
    if (formfield.Address_Type === "") {
      context.Alertbox("error", "Please Provide Your Address Type");
      return;
    }
    if (context.addressmode === "add") {
      postData(`/api/address/add`, formfield, { withCredentials: true }).then(
        (res) => {
          setisLoading(false);
          if (res.error !== true) {
            context.Alertbox("success", res.message);
            console.log(res);

            context.toggleaddressPanel(false);
            context.getuserDetails();
            fetchData(`/api/address/get?${context?.userData?._id}`, {
              withCredentials: true,
            }).then((res) => {
              console.log(res.data);
              setaddress(res.data);
              context.toggleaddressPanel(false)();
              setformfield({
                Address_line: "",
                City: "",
                State: "",
                Pincode: "",
                Country: "",
                Mobile: "",
                Address_Type: "",
                landmark: "",
              });
              setAddresstype("");
              setPhone("");
            });
          } else {
            context.Alertbox("error", res.message);
          }
        }
      );
    } else if (context.addressmode === "edit") {
      editAddress();
      editData(`/api/address/update/${context.AddressId}`, formfield, {
        withCredentials: true,
      }).then((res) => {
        setisLoading(false);
        if (res.error !== true) {
          context.Alertbox("success", res.message);
          context.toggleaddressPanel(false)();
          context.getuserDetails();

          fetchData(`/api/address/get?${context?.userData?._id}`, {
            withCredentials: true,
          }).then((res) => {
            console.log(res.data);
            setaddress(res.data);
            setformfield({
              Address_line: "",
              City: "",
              State: "",
              Pincode: "",
              Country: "",
              Mobile: "",
              Address_Type: "",
              landmark: "",
            });
            setAddresstype("");
            setPhone("");
          });
        } else {
          context.Alertbox("error", res.message);
        }
      });
    }
  };

  const editAddress = (id) => {
    setisLoading(true);
    setaddressId(id);
    fetchData(`/api/address/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setformfield({
        Address_line: res.data?.Address_line,
        City: res.data?.City,
        State: res.data?.State,
        Pincode: res.data?.Pincode,
        Country: res.data?.Country,
        Mobile: res.data?.Mobile,
        Address_Type: res.data?.Address_Type,
        landmark: res.data?.landmark,
      });
      setAddresstype(res.data?.Address_Type);
      setPhone(res.data?.Mobile);
      setisLoading(false);
    });
  };

  return (
    <form action="" className="p-8 py-3 pb-8 " onSubmit={handlesubmit}>
      <div className="flex items-center gap-3 pb-5">
        <TextField
          className="w-full"
          id="outlined-basic"
          name="Address_line"
          value={formfield.Address_line}
          onChange={onChangeInput}
          label="Address_line"
          variant="outlined"
        />
      </div>
      <div className="flex items-center gap-3 pb-5">
        <TextField
          className="w-1/2"
          id="outlined-basic"
          value={formfield.Country}
          name="Country"
          label="Country"
          onChange={onChangeInput}
          variant="outlined"
        />
        <TextField
          className="w-1/2"
          id="outlined-basic"
          name="City"
          label="City"
          value={formfield.City}
          onChange={onChangeInput}
          variant="outlined"
        />{" "}
      </div>
      <div className="flex items-center gap-3 pb-5">
        <TextField
          className="w-full"
          id="outlined-basic"
          value={formfield.State}
          name="State"
          label="State"
          onChange={onChangeInput}
          variant="outlined"
        />
        <TextField
          className="w-full"
          id="outlined-basic"
          value={formfield.Pincode}
          name="Pincode"
          onChange={onChangeInput}
          label="Pincode"
          variant="outlined"
        />
      </div>
      <div className="flex items-center gap-3 pb-5">
        <div className="w-1/2">
          <PhoneInput
            type="text"
            disabled={isLoading}
            defaultCountry="lb"
            className="!w-full !h-[56px]"
            value={phone}
            name="Mobile"
            inputStyle={{
              width: "100%",

              border: "!3px !solid !rgba(0,0,0,0.7)",
            }}
            containerStyle={{
              width: "100%",

              border: "!3px !solid !rgba(0,0,0,0.7)",
              borderRadius: "6px",
            }}
            onChange={(phone) => {
              setPhone(phone);
              setformfield((prev) => ({ ...prev, Mobile: phone }));
            }}
          />
        </div>

        <div className="w-1/2">
          <TextField
            className="w-full"
            id="outlined-basic"
            value={formfield.landmark}
            name="landmark"
            label="landmark"
            onChange={onChangeInput}
            variant="outlined"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 pb-5">
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Address Type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={Addresstype}
            onChange={onChangeAddresstype}
          >
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            <FormControlLabel
              value="Office"
              control={<Radio />}
              label="Office"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="flex items-center gap-3 pb-5">
        <Button
          type="submit"
          className="btn-org w-full  flex-1 !h-[50px] !text-[16px] font-semibold"
        >
          {context?.addressmode === "edit" ? "Edit Address" : "Add Address"}
        </Button>
        <Button
          onClick={handleClose}
          className="btn-org btn-border w-full  flex-1 !h-[50px] !text-[16px] font-semibold"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
