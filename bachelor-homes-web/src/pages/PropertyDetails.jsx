import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

import {
    MapPin,
    Home,
    Bed,
    Shield,
} from "lucide-react";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import {
    Navigation,
    Pagination,
    Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import properties from "../data/properties";


const PropertyDetails = () => {

    const { id, type } = useParams();

    const [formType, setFormType] = useState("callback");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        option: "",
    });


    // =====================================================
    // FIND PROPERTY
    // =====================================================

    const property = properties.find(
        (item) =>
            item.id === Number(id) &&
            item.type === type
    );


    // =====================================================
    // PROPERTY NOT FOUND
    // =====================================================

    if (!property) {
        return (
            <div>
                <Navbar />

                <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                    <div className="text-center">

                        <h2 className="text-2xl font-bold">
                            Property not found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            The property you are looking for does not exist.
                        </p>

                    </div>
                </div>

                <Footer />
            </div>
        );
    }


    // =====================================================
    // PROPERTY TYPE
    // =====================================================

    const isPG = property.type === "pg";

    const isFlat = property.type === "flat";


    // =====================================================
    // GOOGLE MAP
    // =====================================================

    const googleMapsUrl =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            property.mapLocation ||
            property.name + ", " + property.address
        )}`;


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // =====================================================
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = () => {

        if (
            !formData.name ||
            !formData.phone ||
            (formType !== "callback" && !formData.option)
        ) {

            alert("Please fill in all required fields.");

            return;
        }


        alert(
            `Submitted ${formType} form: ${JSON.stringify(
                formData
            )}`
        );


        setFormData({
            name: "",
            phone: "",
            option: "",
        });

        setFormType("callback");
    };


    return (
        <div>

            <Navbar />


            <div className="min-h-[calc(100vh-200px)] px-[5%] py-8 xl:px-[15%]">


                {/* =====================================================
            HEADER
        ===================================================== */}

                <div className="mt-20 mb-6 flex flex-wrap justify-between items-center gap-2">

                    <div>

                        <h2 className="text-2xl md:text-3xl font-extrabold">
                            {property.name}
                        </h2>

                        <p className="text-gray-600">
                            {property.address}
                        </p>

                    </div>


                    {/* PG Gender */}

                    {isPG && property.gender && (

                        <span className="bg-purple-100 text-[#520075] px-3 py-1 rounded-md text-sm">
                            {property.gender} ♂ ♀
                        </span>

                    )}

                </div>


                {/* =====================================================
            MAIN LAYOUT
        ===================================================== */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                    {/* =====================================================
              LEFT COLUMN
          ===================================================== */}

                    <div className="lg:col-span-2 flex flex-col gap-6">


                        {/* =====================================================
                IMAGE SLIDER
            ===================================================== */}

                        <div className="w-full max-w-full">

                            <Swiper
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Autoplay,
                                ]}
                                autoplay={{
                                    delay: 3000,
                                }}
                                className="rounded-lg shadow-md"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                }}
                            >

                                {property.images.map((img, index) => (

                                    <SwiperSlide key={index}>

                                        <div className="flex justify-center">

                                            <img
                                                src={img}
                                                alt={
                                                    isPG
                                                        ? "PG"
                                                        : "Flat"
                                                }
                                                className="w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                                            />

                                        </div>

                                    </SwiperSlide>

                                ))}

                            </Swiper>

                        </div>


                        {/* =====================================================
                PRICE
            ===================================================== */}

                        <p className="text-base md:text-lg font-semibold">

                            Start from{" "}

                            <span className="text-lg md:text-xl">

                                {property.pricing?.[0]?.price}

                            </span>

                        </p>


                        {/* =====================================================
                PG OCCUPANCY / FLAT BHK
            ===================================================== */}

                        <div className="flex flex-col gap-3">

                            <h3 className="text-lg md:text-xl font-bold">

                                {isPG
                                    ? "Occupancy"
                                    : "BHK Types"}

                            </h3>


                            <div className="flex flex-wrap gap-3">

                                {property.pricing.map(
                                    (item, index) => {

                                        const Icon = isPG
                                            ? item.icon || Bed
                                            : Home;


                                        return (

                                            <div
                                                key={index}
                                                className={
                                                    isPG
                                                        ? "bg-purple-50 px-3 py-2 md:px-4 md:py-3 rounded-lg border flex flex-col text-sm"
                                                        : "bg-purple-50 px-3 py-2 md:px-4 md:py-3 rounded-lg border flex items-center gap-2 text-sm"
                                                }
                                            >

                                                <Icon
                                                    className={
                                                        isPG
                                                            ? "w-4 h-4 mb-1"
                                                            : "w-4 h-4"
                                                    }
                                                />

                                                {item.type}


                                                <span className="font-semibold">

                                                    {item.price}

                                                </span>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>


                        {/* =====================================================
                AMENITIES
            ===================================================== */}

                        <div className="flex flex-col gap-3">

                            <h3 className="text-lg md:text-xl font-bold">
                                Amenities
                            </h3>


                            <div className="flex flex-wrap gap-2 md:gap-3">

                                {property.facilities.map(
                                    (facility, index) => (

                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-purple-100 rounded-md text-[#520075] text-sm"
                                        >

                                            {facility}

                                        </span>

                                    )
                                )}

                            </div>

                        </div>


                        {/* =====================================================
                DETAILS
            ===================================================== */}

                        <div className="flex flex-col gap-3">

                            <h3 className="text-lg md:text-xl font-bold">
                                Details
                            </h3>


                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">

                                {property.details}

                            </p>

                        </div>


                        {/* =====================================================
                SERVICES
            ===================================================== */}

                        <div className="flex flex-col gap-3">

                            <h3 className="text-lg md:text-xl font-bold">
                                Services
                            </h3>


                            <div className="flex flex-wrap gap-2 md:gap-3">

                                {property.services.map(
                                    (service, index) => (

                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 rounded-md flex items-center gap-1 text-sm"
                                        >

                                            <Shield className="w-4 h-4" />

                                            {service}

                                        </span>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
              RIGHT COLUMN - FORM
          ===================================================== */}

                    <div className="bg-purple-50 rounded-xl shadow-md p-4 md:p-6 flex flex-col gap-3">


                        {/* =====================================================
                GOOGLE MAP
            ===================================================== */}

                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#520075] font-medium hover:underline mb-2 text-sm md:text-base"
                        >

                            <MapPin className="w-4 h-4" />

                            Show on Map

                        </a>


                        {/* =====================================================
                ACTION BUTTONS
            ===================================================== */}

                        <div className="flex gap-2">


                            {/* CALLBACK */}

                            <button
                                className={`flex-1 px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer ${formType === "callback"
                                        ? "bg-[#520075] text-white"
                                        : "border border-[#520075] text-[#520075]"
                                    }`}
                                onClick={() =>
                                    setFormType("callback")
                                }
                            >

                                {isPG
                                    ? "Request call"
                                    : "Request Callback"}

                            </button>


                            {/* BOOK / VISIT */}

                            <button
                                className={`flex-1 px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer ${formType !== "callback"
                                        ? "bg-[#520075] text-white"
                                        : "border border-[#520075] text-[#520075]"
                                    }`}
                                onClick={() =>
                                    setFormType(
                                        isPG
                                            ? "booking"
                                            : "visit"
                                    )
                                }
                            >

                                {isPG
                                    ? "Book Now"
                                    : "Schedule Visit"}

                            </button>

                        </div>


                        {/* =====================================================
                NAME
            ===================================================== */}

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#520075] outline-none"
                        />


                        {/* =====================================================
                PHONE
            ===================================================== */}

                        <input
                            type="text"
                            name="phone"
                            placeholder="+91 Enter your mobile no."
                            value={formData.phone}
                            onChange={handleChange}
                            className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#520075] outline-none"
                        />


                        {/* =====================================================
                PG SHARING SELECT
            ===================================================== */}

                        {isPG &&
                            formType === "booking" && (

                                <select
                                    name="option"
                                    value={formData.option}
                                    onChange={handleChange}
                                    className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#520075] outline-none"
                                >

                                    <option value="">
                                        Select Sharing
                                    </option>


                                    {property.pricing.map(
                                        (item, index) => (

                                            <option
                                                key={index}
                                                value={item.type}
                                            >

                                                {item.type} - {item.price}

                                            </option>

                                        )
                                    )}

                                </select>

                            )}


                        {/* =====================================================
                FLAT BHK SELECT
            ===================================================== */}

                        {isFlat &&
                            formType === "visit" && (

                                <select
                                    name="option"
                                    value={formData.option}
                                    onChange={handleChange}
                                    className="p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#520075] outline-none"
                                >

                                    <option value="">
                                        Select BHK
                                    </option>


                                    {property.pricing.map(
                                        (item, index) => (

                                            <option
                                                key={index}
                                                value={item.type}
                                            >

                                                {item.type} - {item.price}

                                            </option>

                                        )
                                    )}

                                </select>

                            )}


                        {/* =====================================================
                SUBMIT
            ===================================================== */}

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


export default PropertyDetails;