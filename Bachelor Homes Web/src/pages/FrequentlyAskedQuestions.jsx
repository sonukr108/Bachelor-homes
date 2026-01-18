import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is Bachelor Homes?",
    answer: "Bachelor Homes is a co-living platform offering fully furnished rooms, managed rentals, and modern amenities for students and working professionals."
  },
  {
    question: "Are meals and utilities included in the rent?",
    answer: "Yes! Our monthly rent is all-inclusive, covering meals, electricity, Wi-Fi, housekeeping, and maintenance with no hidden charges."
  },
  {
    question: "Is there any brokerage or security deposit?",
    answer: "No brokerage is charged. A minimal refundable security deposit is required at the time of booking."
  },
  {
    question: "Can I schedule a property visit before booking?",
    answer: "Absolutely! You can contact us to schedule a guided tour of our properties before finalizing your booking."
  },
  {
    question: "What safety measures are in place?",
    answer: "Our properties have 24x7 security, CCTV surveillance, biometric access, and regular sanitization to ensure complete safety."
  }
];

const FAQItem = ({ question, answer, isOpen, toggle }) => (
  <div className="border-b py-3">
    <button
      onClick={toggle}
      className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 focus:outline-none"
    >
      {question}
      <ChevronDown className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && <p className="mt-2 text-gray-600 leading-relaxed">{answer}</p>}
  </div>
);

const FrequentlyAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] px-[5%] py-10 xl:px-[15%]">
        
        {/* Header */}
        <div className="text-center mt-20 mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            Frequently Asked <span className="text-[#520075]">Questions</span>
          </h2>
          <p className="mt-2 text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Here are some common questions about Bachelor Homes. If you have more queries, feel free to contact us.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-purple-50 rounded-xl shadow-md p-6 md:p-10 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FrequentlyAskedQuestions;
