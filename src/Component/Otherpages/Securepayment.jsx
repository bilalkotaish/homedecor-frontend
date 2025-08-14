import React from "react";
import {
  FaLock,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaShieldAlt,
} from "react-icons/fa";

export default function SecurePayments() {
  return (
    <section className="bg-white text-gray-800 min-h-screen">
      {/* Trust Section */}
      <div className="max-w-5xl mx-auto py-12 px-4 text-center">
        <FaLock className="text-4xl text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Your Payment Is Protected</h2>
        <p className="text-gray-600 text-lg">
          We use industry-leading encryption and fraud protection tools to
          ensure your data is safe. All transactions are processed through
          trusted and certified gateways.
        </p>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">We Accept</h3>
          <div className="flex justify-center gap-10 text-5xl text-gray-700">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
          <p className="text-gray-500 text-sm mt-4">
            And many other major payment methods
          </p>
        </div>
      </div>

      {/* Safety Standards */}
      <div className="max-w-5xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlagjS5JxW80HJLHMprgGlexaBy-PEygfdFA&s"
            alt="SSL"
            className="rounded-lg w-[90%] shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-4">End-to-End Encryption</h4>
          <p className="text-gray-600 mb-4">
            All payment information is encrypted with 256-bit SSL
            security—ensuring your personal and financial data never falls into
            the wrong hands.
          </p>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>PCI-DSS Compliant</li>
            <li>HTTPS Secure Checkout</li>
            <li>Two-Factor Authentication Support</li>
            <li>Fraud Detection & Prevention</li>
          </ul>
        </div>
      </div>

      {/* Final Trust Badge */}
      <div className="bg-green-100 py-10 px-4 text-center">
        <FaShieldAlt className="text-4xl text-green-700 mx-auto mb-3" />
        <h5 className="text-xl font-semibold text-green-900">
          You're in safe hands.
        </h5>
        <p className="text-green-800 mt-1">
          Shop with confidence at YourStoreName.
        </p>
      </div>
    </section>
  );
}
