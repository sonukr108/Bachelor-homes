import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { Home, Building2 } from "lucide-react";

import PGCard from "../components/PGCard";
import FlatCard from "../components/FlatCard";

import properties from "../data/properties";

const AfterSearch = () => {
  const { slug } = useParams();

  const [view, setView] = useState("pg");

  // Filter properties according to selected type
  const filteredProperties = properties.filter(
    (property) => property.type === view
  );

  return (
    <div>
      <Navbar />

      <div className="min-h-[calc(100vh-200px)] px-[5%] py-10 xl:px-[15%]">

        {/* Header */}
        <div className="text-center mt-20 mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            PG / Flats in{" "}
            <span className="text-[#520075] capitalize">
              {slug}
            </span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 justify-center mb-6">

          {/* PG */}
          <button
            onClick={() => setView("pg")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              view === "pg"
                ? "bg-[#520075] text-white"
                : "border border-[#520075] text-[#520075] hover:bg-[#F4E2FC]"
            }`}
          >
            <Home className="w-4 h-4" />

            PG / Hostel
          </button>

          {/* Flat */}
          <button
            onClick={() => setView("flat")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              view === "flat"
                ? "bg-[#520075] text-white"
                : "border border-[#520075] text-[#520075] hover:bg-[#F4E2FC]"
            }`}
          >
            <Building2 className="w-4 h-4" />

            Flats
          </button>

        </div>

        {/* Count */}
        <p className="text-center mb-6 font-medium">
          {filteredProperties.length}{" "}
          {view === "pg" ? "PGs" : "Flats"} waiting to be yours in{" "}
          <span className="text-[#520075]">
            {slug}
          </span>
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-6">

          {filteredProperties.map((property) => {

            if (property.type === "pg") {

              const pgData = {
                ...property,

                roomTypes: property.pricing.map(
                  (item) => item.type
                ),

                // Existing PGCard expects price
                price: property.pricing[0]?.price || "",
              };

              return (
                <PGCard
                  key={property.id}
                  pg={pgData}
                  id={property.id}
                />
              );
            }

            const flatData = {
              ...property,

              bhkTypes: property.pricing.map(
                (item) => item.type
              ),

              // Existing FlatCard expects price
              price: property.pricing[0]?.price || "",
            };

            return (
              <FlatCard
                key={property.id}
                flat={flatData}
                id={property.id}
              />
            );
          })}

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default AfterSearch;