import { useState } from "react";

const helpTopics = [
  {
    title: "Orders & Payments",
    articles: [
      "How can I track my order?",
      "What payment methods are accepted?",
      "Can I cancel or change my order?",
    ],
  },
  {
    title: "Shipping & Delivery",
    articles: [
      "What are the delivery charges?",
      "When will my order arrive?",
      "Do you ship internationally?",
    ],
  },
  {
    title: "Returns & Refunds",
    articles: [
      "What is your return policy?",
      "How do I request a refund?",
      "Where do I send returned items?",
    ],
  },
  {
    title: "Account & Security",
    articles: [
      "How do I reset my password?",
      "How do I update my account info?",
      "Is my personal data secure?",
    ],
  },
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Help Center</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for help..."
        className="w-full p-3 border rounded-md mb-8"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {helpTopics.map((topic, index) => (
          <div key={index} className="bg-white shadow p-5 rounded-md">
            <h2 className="text-xl font-semibold mb-3">{topic.title}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {topic.articles
                .filter((a) => a.toLowerCase().includes(search.toLowerCase()))
                .map((article, i) => (
                  <li key={i} className="cursor-pointer hover:underline">
                    {article}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 mb-2">
          Can't find what you're looking for?
        </p>
        <a
          href="/contactus"
          className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
}
