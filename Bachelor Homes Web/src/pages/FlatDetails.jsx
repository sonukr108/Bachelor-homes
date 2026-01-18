import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { MapPin, Home, Shield } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const flatDetails = {
  id: 1,
  name: "Green Residency",
  address: "Sector 21, New Delhi",
  price: "₹ 15,000/mo*",
  images: [
    "https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fasset-cdn.stanzaliving.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fe_improve%2Fe_sharpen%3A10%2Fe_saturation%3A10%2Fv1669280523%2FWebsite%2FCMS-Uploads%2FJWS00993_4_5_ofwypu.jpg&w=1920&q=75",
    "https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fasset-cdn.stanzaliving.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fe_improve%2Fe_sharpen%3A10%2Fe_saturation%3A10%2Fv1669280523%2FWebsite%2FCMS-Uploads%2FJWS00993_4_5_ofwypu.jpg&w=1920&q=75"
  ],
  bhkTypes: ["1 BHK", "2 BHK"],
  facilities: ["Lift", "24x7 Security", "Parking"],
  services: ["Gym", "Swimming Pool", "Power Backup", "Security"],
  details:
    "Green Residency offers premium flats with modern amenities and security. Perfect for families and working professionals.",
};

const FlatDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("bhk");
  const [formType, setFormType] = useState("callback"); // ✅ default request callback
  const [formData, setFormData] = useState({ name: "", phone: "", bhk: "" });

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    flatDetails.name + ", " + flatDetails.address
  )}`;

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle submit
  const handleSubmit = () => {
    if (!formData.name || !formData.phone || (formType === "visit" && !formData.bhk)) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Submitted ${formType} form: ${JSON.stringify(formData)}`);
    setFormData({ name: "", phone: "", bhk: "" });
    setFormType("callback");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] px-[5%] py-8 xl:px-[15%]">

        {/* Header */}
        <div className="mt-20 mb-6 flex flex-wrap justify-between items-center gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">{flatDetails.name}</h2>
            <p className="text-gray-600">{flatDetails.address}</p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* ✅ Swiper with Correct Sizing */}
            <div className="w-full max-w-full">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ delay: 3000 }}
                className="rounded-lg shadow-md"
                style={{ maxWidth: "100%", height: "auto" }}
              >
                {flatDetails.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="flex justify-center">
                      <img
                        src={img}
                        alt="Flat"
                        className="w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Price */}
            <p className="text-base md:text-lg font-semibold">
              Start from <span className="text-lg md:text-xl">{flatDetails.price}</span>
            </p>

            {/* Tabs */}
            <div className="flex gap-4 border-b overflow-x-auto">
              {["bhk", "amenities", "details"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 min-w-max text-sm md:text-base ${
                    activeTab === tab ? "border-b-2 border-[#520075] text-[#520075]" : "text-gray-600"
                  }`}
                >
                  {tab === "bhk" ? "BHK Types" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "bhk" && (
              <div className="flex flex-wrap gap-3">
                {flatDetails.bhkTypes.map((b, i) => (
                  <div key={i} className="bg-purple-50 px-3 py-2 md:px-4 md:py-3 rounded-lg border flex items-center gap-2 text-sm">
                    <Home className="w-4 h-4" /> {b}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "amenities" && (
              <div className="flex flex-wrap gap-2 md:gap-3">
                {flatDetails.facilities.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-100 rounded-md text-[#520075] text-sm">{f}</span>
                ))}
              </div>
            )}

            {activeTab === "details" && (
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{flatDetails.details}</p>
            )}

            {/* Services */}
            <h3 className="text-lg md:text-xl font-bold mt-4">Services</h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {flatDetails.services.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 rounded-md flex items-center gap-1 text-sm">
                  <Shield className="w-4 h-4" /> {s}
                </span>
              ))}
            </div>
          </div>

          {/* ✅ RIGHT COLUMN - Dynamic Form */}
          <div className="bg-purple-50 rounded-xl shadow-md p-4 md:p-6 flex flex-col gap-3">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#520075] font-medium hover:underline mb-2 text-sm md:text-base">
              <MapPin className="w-4 h-4" /> Show on Map
            </a>

            {/* ✅ Action Buttons in One Row */}
            <div className="flex gap-2">
              <button
                className={`flex-1 px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer ${
                  formType === "callback" ? "bg-[#520075] text-white" : "border border-[#520075] text-[#520075]"
                }`}
                onClick={() => setFormType("callback")}
              >
                Request Callback
              </button>

              <button
                className={`flex-1 px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer ${
                  formType === "visit" ? "bg-[#520075] text-white" : "border border-[#520075] text-[#520075]"
                }`}
                onClick={() => setFormType("visit")}
              >
                Schedule Visit
              </button>
            </div>

            {/* ✅ Dynamic Form */}
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#520075] outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="+91 Enter your mobile no."
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#520075] outline-none"
            />

            {/* ✅ Show BHK Select only for Schedule Visit */}
            {formType === "visit" && (
              <select
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#520075] outline-none"
              >
                <option value="">Select BHK</option>
                {flatDetails.bhkTypes.map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>
            )}

            <button
              onClick={handleSubmit}
              className="bg-[#520075] text-white py-2 rounded-lg hover:bg-[#3b005c] transition text-sm md:text-base"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlatDetails;
