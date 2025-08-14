import Accountsidebar from "../../Component/AccountSidebar";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
// import Radio from "@mui/material/Radio";
// import React from "react";
import { myContext } from "../../App";
import { useContext } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import Select from "@mui/material/Select";
// import { RiDeleteBin2Line } from "react-icons/ri";
// import DialogTitle from "@mui/material/DialogTitle";
import { postData, fetchData, editData, deleteData } from "../../utils/api";
// import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
// import {
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   RadioGroup,
// } from "@mui/material";
import Addressmenu from "./addressmenu";
import { MdLocationOn } from "react-icons/md";
import { LiaMapMarkedSolid, LiaPlusSolid } from "react-icons/lia";

export default function Address() {
  const [isLoading, setisLoading] = useState(false);

  const [address, setaddress] = useState([]);
  const context = useContext(myContext);
  const [phone, setPhone] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [userId, setuserId] = useState("");
  const [addressId, setaddressId] = useState("");
  const [Addresstype, setAddresstype] = useState("");
  const [mode, setmode] = useState("add");

  // const [status, setStatus] = useState(false);
  //   const ph = `"${context?.userData?.Mobile}"`;
  //   setPhone(ph);
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
  // const handleChange = (event) => {
  //   const selectedId = event.target.value;
  //   setSelectedValue(selectedId);

  //   // Call single backend route to handle selection logic
  //   editData(`/api/address/update/${selectedId}`, {});
  // };

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setuserId(context?.userData?._id);
      fetchData(`/api/address/get?${context?.userData?._id}`, {
        withCredentials: true,
      }).then((res) => {
        console.log(res.data);
        setaddress(res.data);
        setSelectedValue(res.data);
      });
    }
  }, [context?.userData]);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setformfield(() => {
      return {
        ...formfield,
        [name]: value,
      };
    });
  };
  // const handleChangeStatus = (event) => {
  //   setStatus(event.target.value);
  //   setformfield({ ...formfield, Status: event.target.value });
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {
      context.Alertbox("success", res.message);
      // Refetch updated address list
      fetchData(`/api/address/get?userId=${context.userData._id}`, {
        withCredentials: true,
      }).then((res) => {
        setaddress(res.data);
      });
    });
  };

  const handlesubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setmode("add");

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
    if (mode === "add") {
      postData(`/api/address/add`, formfield, { withCredentials: true }).then(
        (res) => {
          setisLoading(false);
          if (res.error !== true) {
            context.Alertbox("success", res.message);
            console.log(res);

            setOpen(false);
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
        }
      );
    } else if (mode === "edit") {
      editAddress();
      editData(`/api/address/update/${addressId}`, formfield, {
        withCredentials: true,
      }).then((res) => {
        setisLoading(false);
        if (res.error !== true) {
          context.Alertbox("success", res.message);
          setOpen(false);
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
    setmode("edit");

    setOpen(true);
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
  const onChangeAddresstype = (e) => {
    setAddresstype(e.target.value);
    setformfield({ ...formfield, Address_Type: e.target.value });
  };

  return (
    <>
    <section className="py-14 bg-[#f9f9fb] min-h-screen font-sans">
  <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-6">
    {/* Sidebar */}
    <aside className="w-full lg:w-[22%]">
      <Accountsidebar />
    </aside>

    {/* Main Content */}
    <div className="w-full lg:w-[60%]">
      <div className="bg-white shadow-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <LiaMapMarkedSolid className="text-primary" />
            My Address
          </h2>
        </div>

        <hr className="mb-5 border-gray-200" />

        {/* Add Address */}
        <div
          onClick={() => context.toggleaddressPanel(true)}
          className="flex items-center justify-center text-sm font-medium text-gray-700 mt-3 p-5 cursor-pointer bg-[#f1faff] hover:bg-[#e7f3f9] border border-dashed border-gray-300 rounded-md transition-all duration-300 gap-2"
        >
          <LiaPlusSolid /> Add New Address
        </div>

        {/* Address List */}
        <div className="flex flex-col gap-4 mt-6">
          {address?.length > 0 ? (
            address.map((address, index) => (
              <div
                key={address._id || index}
                className="p-4 bg-[#fafafa] border border-gray-200 rounded-md shadow-sm transition hover:shadow-md cursor-pointer flex gap-3"
              >
                <LiaMapMarkedSolid
                  className="text-primary mt-1"
                  size={24}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded">
                      {address.Address_Type}
                    </span>
                    <Addressmenu
                      address={address}
                      setmode={setmode}
                      editAddress={editAddress}
                    />
                  </div>

                  <h4 className="text-sm font-semibold text-gray-800">
                    {context?.userData?.name} — {address.Mobile}
                  </h4>

                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {address.Address_line}, {address.City},{" "}
                    {address.Country}, {address.Pincode}
                    {address.landmark ? `, ${address.landmark}` : ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm text-center mt-6">
              No address found. Please add one.
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</section>


    </>
  );
}
