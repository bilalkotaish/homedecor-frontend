import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-10">
          We’re here to help! Reach out to us through the following platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WhatsApp */}
          <a
            href="https://chat.whatsapp.com/YOUR_GROUP_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 text-white py-4 px-6 rounded-lg shadow hover:bg-green-600 transition-all duration-300"
          >
            <FaWhatsapp className="text-3xl mr-3" />
            <span className="text-lg font-semibold">Join WhatsApp Group</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/YOUR_INSTAGRAM_HANDLE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-pink-500 text-white py-4 px-6 rounded-lg shadow hover:bg-pink-600 transition-all duration-300"
          >
            <FaInstagram className="text-3xl mr-3" />
            <span className="text-lg font-semibold">Follow on Instagram</span>
          </a>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          We typically respond within 24 hours. For urgent issues, please use
          WhatsApp.
        </p>
      </div>
    </section>
  );
}
