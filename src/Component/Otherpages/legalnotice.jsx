import React from "react";

export default function LegalNotice() {
  return (
    <section className="min-h-screen bg-white text-gray-800 py-12 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6 text-center">Legal Notice</h1>

        {/* Company Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Company Information</h2>
          <p>Billy Ecommerce Ltd.</p>
          <p>Registered Address: Saida,South Lebanon, Lebanon</p>
          <p>Phone: +96178994740</p>
          <p>Email: bilalkotaish2000gmail.com</p>
          <p>Business Registration No: 987654321</p>
          <p>VAT No: XX1234567</p>
        </div>

        {/* Liability Disclaimer */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Liability Disclaimer</h2>
          <p>
            The information provided on this website is for general
            informational purposes only. We make no representations or
            warranties of any kind, express or implied, about the completeness,
            accuracy, reliability, suitability or availability of the website or
            the information.
          </p>
        </div>

        {/* Intellectual Property */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Intellectual Property</h2>
          <p>
            All content, including logos, designs, images, and text on this
            site, are the intellectual property of YourStoreName unless
            otherwise stated. Any unauthorized use is strictly prohibited.
          </p>
        </div>

        {/* External Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">External Links</h2>
          <p>
            This site may contain links to external websites. We are not
            responsible for the content or privacy practices of those websites.
          </p>
        </div>

        {/* Data Protection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Data Protection</h2>
          <p>
            We comply with data protection laws applicable in our jurisdiction.
            For more information on how we handle personal data, please refer to
            our Privacy Policy.
          </p>
        </div>

        {/* Jurisdiction */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
          <p>
            These legal terms are governed by and interpreted in accordance with
            the laws of [Insert Country]. Any disputes will be handled in the
            courts of [Insert City, Country].
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-sm text-gray-500 mt-8">
          <p>Last updated: June 12, 2025</p>
        </div>
      </div>
    </section>
  );
}
