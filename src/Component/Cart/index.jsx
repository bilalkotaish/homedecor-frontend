import { useContext } from "react";
import { myContext } from "../../App";
import CartItems from "./CartItems";
import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsBagCheck } from "react-icons/bs";
import logo from "../../assets/emptycarts.png";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const context = useContext(myContext);
  const history = useNavigate();
  window.scrollTo(0, 0);

  const totalPrice = context.cartData?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleCheckout = () => {
    if (context.islogin) {
      history("/checkout");
    } else {
      history("/login");
    }
  };

  return (
    <section className="bg-white py-12 min-h-screen">
    <div className="container mx-auto flex flex-col lg:flex-row gap-10 px-6">
      {/* Cart Items */}
      <div className="w-full lg:w-[70%] bg-cream rounded-2xl shadow-md p-6">
        <div className="bg-cream rounded-2xl shadow-sm p-6">
          <div className="border-b border-gray-400 pb-4 mb-6">
            <h2 className="text-2xl font-serif text-gray-900 flex items-center gap-2 mb-6">
              <BsBagCheck className="text-gray-700 text-[22px]" />
              <span>Shopping Cart</span>
            </h2>
  
            <p className="text-sm text-gray-500 mt-1">
              There is {context.cartData.length} item(s) in your cart
            </p>
          </div>
  
          {context.cartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <img
                src={logo}
                alt="Empty Cart"
                className="w-32 mb-4 opacity-70"
              />
              <p className="text-gray-600 mb-4 text-sm">
                Your cart is currently empty.
              </p>
              <Link to="/">
                <Button
                  className="!bg-gray-900 hover:!bg-gray-800 !text-white rounded-md px-6 py-2 capitalize"
                  onClick={() => context.toggleCartPanel(false)}
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            context.cartData.map((item) => (
              <CartItems
                key={item._id}
                data={item}
                qty={item.quantity}
                size="S"
              />
            ))
          )}
        </div>
      </div>
  
      {/* Summary */}
      <div className="w-full lg:w-[30%]">
        <div className="bg-cream rounded-2xl shadow-sm p-6 sticky top-20">
          <h3 className="text-xl font-serif mb-4 text-gray-800">Summary</h3>
          <div className="space-y-3 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated for</span>
              <span>Lebanon</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t border-gray-400 text-base text-gray-800">
              <span>Total</span>
              <span className="text-primary">${totalPrice}</span>
            </div>
          </div>
  
          <Button
            onClick={handleCheckout}
            className="!bg-primary transition-all !text-white w-full !h-[48px] !rounded-lg flex items-center justify-center gap-2 !text-base font-medium"
          >
            Checkout <IoBagCheckOutline className="text-lg" />
          </Button>
        </div>
      </div>
    </div>
  </section>
  
  );
}
