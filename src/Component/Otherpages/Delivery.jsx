import React from "react";

export default function DeliveryInfo() {
  return (
    <section className="min-h-screen bg-white text-gray-800 py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Delivery Information
        </h1>

        {/* Intro */}
        <div className="mb-6">
          <p>
            We aim to deliver your order quickly and safely. Below you’ll find
            details about our delivery process, options, and timeframes.
          </p>
        </div>

        {/* Delivery Methods */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Delivery Options</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Standard Shipping:</strong> 3–7 business days
            </li>
          </ul>
        </div>

        {/* Delivery Charges */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Shipping Costs</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Orders over $50:</strong> Free Standard Shipping
            </li>
            <li>
              <strong>Orders under $50:</strong> $5 Standard Shipping
            </li>
          </ul>
        </div>

        {/* Tracking Orders */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Order Tracking</h2>
          <p>
            Once your order is shipped, we will email you a tracking number. You
            can use this number to track your shipment on our carrier’s website
            or in your account order history.
          </p>
        </div>

        {/* International Shipping */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            International Shipping
          </h2>
          <p>
            We currently ship to selected international locations. Shipping fees
            and delivery times vary by country. Duties and taxes may apply upon
            arrival.
          </p>
        </div>

        {/* Delays Disclaimer */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Delays and Exceptions</h2>
          <p>
            Delivery times may be affected during public holidays, sale seasons,
            or due to unforeseen circumstances like weather conditions. We will
            notify you promptly of any delays.
          </p>
        </div>

        {/* Contact Support */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Need Help?</h2>
          <p>
            If you have questions about your delivery, feel free to contact our
            support team:
            <br />
            <strong>Email:</strong> support@yourstore.com
            <br />
            <strong>Phone:</strong> +1 (555) 123-4567
            <br />
            <strong>WhatsApp:</strong>{" "}
            <a
              href="https://wa.me/1234567890"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
