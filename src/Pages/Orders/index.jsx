import Accountsidebar from "../../Component/AccountSidebar";
import Listitems from "../../Component/Mylist/Listitems";
import { FaAngleDown, FaAngleUp, FaJediOrder } from "react-icons/fa6";
import Button from "@mui/material/Button";
import Badge from "../../Component/Badge";
import { useState } from "react";
import { fetchData } from "../../utils/api";
import { useContext } from "react";
import { myContext } from "../../App";
import { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { BsBagCheck } from "react-icons/bs";

export default function Orders() {
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const context = useContext(myContext);

  const handleTogglePopup = (index) => {
    if (openPopupIndex === index) {
      setOpenPopupIndex(null);
    } else {
      setOpenPopupIndex(index);
    }
  };

  useEffect(() => {
    console.log(context.userData?._id);
    const getOrderData = async () => {
      const res = await fetchData(`/api/orders/get/${context.userData._id}`);
      if (res.error) {
        context.Alertbox("error", res.message);
      } else {
        setOrderData(res.data);
        console.log("Order Data:", res.data);
      }
    };

    getOrderData();
  }, [context.Alertbox, context.userData?._id]); // Add any dependencies here if needed

  return (
    <section className="py-14 bg-[#f9f9fb] min-h-screen">
    <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-6">
      {/* Sidebar */}
      <aside className="w-full lg:w-[22%]">
        <Accountsidebar />
      </aside>
  
      {/* Main Content */}
      <main className="w-full lg:w-[70%]">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <BsBagCheck className="text-xl text-primary" /> My Orders
            </h2>
            <p className="text-sm text-gray-600">
              There are{" "}
              <span className="text-primary font-semibold">{orderData?.length}</span>{" "}
              Orders in Total
            </p>
          </div>
  
          {/* Conditional Rendering */}
          {orderData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                  <tr>
                    <th className="px-6 py-3"></th>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Payment</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3 flex items-center gap-1">Address</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Pincode</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((item, index) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <Button
                          onClick={() => handleTogglePopup(index)}
                          className="w-10 h-10 min-w-10 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                          {openPopupIndex === index ? (
                            <FaAngleUp className="text-gray-600 text-lg" />
                          ) : (
                            <FaAngleDown className="text-gray-600 text-lg" />
                          )}
                        </Button>
                      </td>
                      <td className="px-6 py-4 text-primary">{item._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.PaymentId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{context.userData.name}</td>
                      <td className="px-6 py-4">{item.deliver_address.Mobile}</td>
                      <td className="px-6 py-4 max-w-[400px]">
                        <div className="text-xs text-gray-700 whitespace-nowrap max-w-[320px]">
                          <div className="font-medium text-gray-800 mb-1">
                            {item.deliver_address.Address_Type}
                            <div>
                              {[
                                item.deliver_address.Address_line,
                                item.deliver_address.City,
                                item.deliver_address.State,
                                item.deliver_address.Country,
                                item.deliver_address.landmark,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">${item.Total}</td>
                      <td className="px-6 py-4">{item.deliver_address.Pincode}</td>
                      <td className="px-6 py-4">{context.userData.email}</td>
                      <td className="px-6 py-4">
                        <Badge status={item.orderStatus} />
                      </td>
                      <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px]">
              <img
                src="https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-2566.jpg"
                alt="No orders"
                className="w-32 mb-4 opacity-80"
              />
              <h4 className="text-lg font-medium text-gray-600">No Orders Found</h4>
              <p className="text-sm text-gray-400 mt-1">
                Your order history will appear here once you place an order.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  
    {/* Popup Modal */}
    {openPopupIndex !== null && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-5xl relative">
          <button
            className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500"
            onClick={() => setOpenPopupIndex(null)}
          >
            ×
          </button>
          <h3 className="text-lg font-bold mb-5 text-gray-800">Order Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderData[openPopupIndex]?.products?.map((product, idx) => (
                  <tr
                    key={idx}
                    className="bg-white border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-primary">{product.productId?._id}</td>
                    <td className="px-6 py-4">{product.productId?.name || "N/A"}</td>
                    <td className="px-6 py-4">
                      <img
                        src={
                          product?.productId?.images?.[0]?.url ||
                          "https://via.placeholder.com/50"
                        }
                        className="w-[50px] h-[60px] object-cover rounded-md border"
                        alt="product"
                      />
                    </td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4 font-semibold text-primary">${product.SubTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </section>
  
  );
}
