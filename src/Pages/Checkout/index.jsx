import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { IoBagCheckOutline } from "react-icons/io5";
import { myContext } from "../../App";
import { IoMdAdd } from "react-icons/io";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { RiEdit2Fill } from "react-icons/ri";
import { deleteData, fetchData, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const context = useContext(myContext);
  const [checked, setChecked] = useState(-1);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useNavigate();
  const editAddress = (id) => {
    context.toggleaddressPanel(true)();
    context.setaddressmode("edit");
    context.setAddressId(id);
    // props.editAddress(id);
  };
  const handleChange = (event, index) => {
    if (event.target.checked) {
      setChecked(index);
      setSelectedAddress(event.target.value);
      console.log(selectedAddress);
    }
  };

  useEffect(() => {
    let total = 0;
    context.cartData.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  }, [context.cartData]);

  // const checkout = async (e) => {
  //   e.preventDefault();

  //   const stripe = await stripePromise;

  //   const payload = {
  //     products: context.cartData,
  //     userId: context.userData._id,
  //     deliveryAddress: selectedAddress,
  //     amount: totalAmount,
  //   };

  //   try {
  //     // Await the API call and get the response object
  //     const response = await fetchData(
  //       "/api/orders/createcheckoutsession",
  //       payload
  //     );
  //     // Get the session ID from the response
  //     const sessionId = response.id;

  //     if (!response.ok) {
  //       // Show error from backend if any
  //       context.Alertbox("error", response.error || "Something went wrong");
  //       return;
  //     }

  //     // Redirect to Stripe checkout page
  //     const result = await stripe.redirectToCheckout({
  //       sessionId: sessionId,
  //     });

  //     if (result.error) {
  //       context.Alertbox("error", result.error.message);
  //     }
  //   } catch (err) {
  //     context.Alertbox(
  //       "error",
  //       "Failed to initiate checkout. Please try again."
  //     );
  //     console.error(err);
  //   }
  // };

  const checkout = async (e) => {
    e.preventDefault();
    if (context.userData.Address_details?.length === 0) {
      context.Alertbox("error", "Please add address first");
      return;
    }

    const payload = {
      userId: context.userData._id,
      products: context.cartData.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity || 1,
        price: item.price,
        SubTotal: item.price * (item.quantity || 1),
      })),
      Total: totalAmount,
      orderStatus: "pending",
      deliver_address: selectedAddress,
      Paymentstatus: "paid",
      PaymentId: "Cash on Delivery",
    };

    postData("/api/orders/create", payload)
      .then((res) => {
        if (res.error === false) {
          context.Alertbox("success", "Order Placed Successfully");
          deleteData(`/api/cart/clearCart/${context.userData._id}`).then(
            (res) => {
              if (res.error) {
                context.Alertbox("error", res.error);
                return;
              } else {
                context.Alertbox("success", res.message);
                context.getCart();
              }
            }
          );

          history("/orders/success");
        } else {
          history("/orders/failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="py-12 bg-gray-50">
      <form action="" onSubmit={checkout}>
        <div className="container mx-auto flex flex-col lg:flex-row gap-10 px-4">
          {/* Left Section - Address */}
          <div className="w-full lg:w-[65%] space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h4 className="text-[18px] font-semibold text-gray-800">
                  Select Shipping Address
                </h4>
                <Button
                  className="btn-org btn-border btn-sm"
                  onClick={() => context.toggleaddressPanel(true)()}
                >
                  <span className="flex items-center gap-2">
                    <IoMdAdd /> Add New Address
                  </span>
                </Button>
              </div>

              <div className="mt-6 space-y-4 h-auto ">
                {context.userData?.Address_details.length > 0 ? (
                  context.userData.Address_details.map((item, index) => (
                    <div
                      key={item._id}
                      className={`flex items-start gap-4 border rounded-md p-4 transition-all duration-300 ${
                        checked === index
                          ? "bg-red-100 border-red-400"
                          : "bg-white border-gray-200"
                      } shadow-sm hover:shadow-md`}
                    >
                      <Radio
                        size="small"
                        onChange={(e) => handleChange(e, index)}
                        checked={checked === index}
                        value={item._id}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold text-gray-800">
                              {context?.userData?.name}
                            </h4>
                            <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded-sm inline-block mt-1">
                              {item.Address_Type}
                            </span>
                          </div>
                          <Button
                            className="!text-primary text-sm"
                            onClick={() => editAddress(item._id)}
                          >
                            <span className="flex items-center gap-1">
                              <RiEdit2Fill size={16} /> Edit
                            </span>
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">
                          {item.Address_line}, {item.City}, {item.State},{" "}
                          {item.Pincode}, {item.Country}, {item.landmark}
                        </p>
                        <p className="text-sm text-gray-700 mb-3">
                          Phone: {item.Mobile}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col !pt-12 items-center justify-center text-gray-500 mt-10">
                    <img
                      src="/src/assets/address.png"
                      alt="No address"
                      className="w-28 h-28 mb-4 opacity-80"
                    />
                    <p className="text-lg font-medium">
                      No Shipping Address Found
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Please add an address to continue with your order.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Summary */}
          <div className="w-full lg:w-[35%] sticky top-4 h-fit">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="text-center font-semibold text-[17px] text-gray-800 mb-4">
                Your Order Summary
              </h4>

              {context.cartData.length > 0 ? (
                <>
                  <div className="flex items-center justify-between py-2 border-t border-b border-gray-200 text-sm font-semibold">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>

                  <div className="scroll mt-3 mb-4 max-h-[250px] overflow-y-auto pr-1 space-y-3">
                    {context.cartData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between border-b border-dashed pb-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-[50px] h-[50px] overflow-hidden rounded-md border">
                            <img
                              src={item?.image}
                              alt={item?.ProductTitle}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <div>
                            <h4 className="text-[13px] font-semibold text-gray-800">
                              {item.ProductTitle.substring(0, 25) + "..."}
                            </h4>
                            <p className="text-[12px] text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="text-[13px] font-medium text-primary">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t pt-3 text-[15px] font-semibold text-gray-800">
                    <span>Total</span>
                    <span>
                      $
                      {context.cartData.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="btn-org w-full flex gap-2 mt-5"
                  >
                    Cash on Delivery{" "}
                    <IoBagCheckOutline className="text-[20px]" />
                  </Button>
                </>
              ) : (
                <p className="text-center text-sm text-gray-500 py-10">
                  Your cart is empty.
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
