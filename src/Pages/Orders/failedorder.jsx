import { useNavigate } from "react-router-dom";

export default function Failedorder() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <img
            src="https://img.icons8.com/fluency/96/cancel.png"
            className="w-[100px] mx-auto h-[100px]"
            alt="Order Failed"
          />
        </div>
        <h2 className="text-2xl font-bold text-red-700 mb-2">Order Failed!</h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your order could not be processed at this time. Please
          try again later or contact support.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-2 rounded-xl font-medium shadow"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
