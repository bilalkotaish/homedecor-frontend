import { useNavigate } from "react-router-dom";

export default function Successorder() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/fluency/96/delivery.png"
            className="w-[100px] mx-auto h-[100px]"
            alt="Delivery Success"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order is being processed and you’ll
          receive a confirmation shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-red-600 transition-all text-white px-6 py-2 rounded-xl font-medium shadow"
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
}
