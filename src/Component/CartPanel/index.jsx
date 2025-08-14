import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { myContext } from "../../App";
import { deleteData } from "../../utils/api";

export default function CartPanel(props) {
  const context = useContext(myContext);

  const handleDelete = (id) => {
    deleteData(`/api/cart/deletecart/${id}`).then((res) => {
      if (res.error) {
        context.Alertbox("error", res.error);
      } else {
        context.Alertbox("success", res.message);
        context.getCart(); // Refresh cart data
      }
    });
  };

  const getTotal = () => {
    return context.cartData.length !== 0
      ? context.cartData
          .map((item) => parseInt(item.price) * item.quantity)
          .reduce((total, value) => total + value, 0)
      : 0;
  };

  return (
    <>
      <div className="w-full max-h-[300px] overflow-y-auto overflow-x-hidden py-3 px-3">
        {props.data.length === 0 ? (
          <div className="text-center text-[14px] font-[500] text-[#0000007a]">
            No Item Found
            <img
              src="/assets/emptycarts.png"
              alt="empty"
              className="mx-auto mt-2 w-[100px] h-[100px] "
            />
          </div>
        ) : (
          props.data.map((item) => (
            <div
              key={item._id}
              className="w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 pt-4"
            >
              <div className="w-[25%] overflow-hidden h-[80px] rounded-md">
                <Link
                  to={`/productdetails/${item.productId._id}`}
                  className="block group"
                >
                  <img
                    src={item.image}
                    alt={item.ProductTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <div className="w-[75%] pr-5 relative">
                <h4 className="text-[14px] font-[500] leading-snug">
                  <Link
                    to={`/productdetails/${item.productId._id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item.ProductTitle.substring(0, 30)}
                  </Link>
                </h4>
                <p className="flex items-center gap-5 mt-1 mb-4 text-[14px]">
                  <span>
                    Qty: <strong>{item.quantity}</strong>
                  </span>
                  <span className="text-primary">
                    Price: <strong>${item.price}</strong>
                  </span>
                </p>

                <MdDeleteOutline
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] hover:text-primary transition-all"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Summary Section */}
      <div className="absolute bottom-[10px] left-0 w-full px-4">
        <div className="border-t border-[rgba(0,0,0,0.1)] py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-[500]">
              {props.data.length} Item{props.data.length > 1 ? "s" : ""}:
            </span>
            <span className="text-primary font-semibold">{getTotal()}$</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[16px] font-[500]">Shipping:</span>
            <span className="text-primary">Free</span>
          </div>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.1)] py-3">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-[500]">Total (tax Excl.):</span>
            <span className="text-primary font-semibold">{getTotal()}$</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link to="/cart" className="w-1/2">
            <Button
              className="btn-org w-full !h-[50px] !text-[16px] font-semibold"
              onClick={() => context.toggleCartPanel(false)}
            >
              View Cart
            </Button>
          </Link>

          <Link to="/checkout" className="w-1/2">
            <Button className="btn-org btn-border w-full !h-[50px] !text-[16px] font-semibold">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
