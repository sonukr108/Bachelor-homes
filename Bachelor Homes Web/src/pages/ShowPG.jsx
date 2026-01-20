import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { Home, Building2 } from 'lucide-react';
import PGCard from '../components/PGCard';
import FlatCard from '../components/FlatCard';

const PGImg = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/pg.svg';
const FlatImg = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/pg.svg';

// PG Data with IDs
const pgList = [
  {
    id: 1,
    name: "Sonu House",
    address: "Preet Vihar Gali No. 12",
    price: "₹ 5,999/mo*",
    facilities: ["Attached washroom", "Attached balcony"],
    roomTypes: ["Single", "Double"],
    gender: "Unisex",
    img: PGImg
  },
  {
    id: 2,
    name: "Sonu House",
    address: "Preet Vihar Gali No. 12",
    price: "₹ 5,999/mo*",
    facilities: ["Attached washroom", "Attached balcony"],
    roomTypes: ["Single", "Double", "Triple"],
    gender: "Unisex",
    img: PGImg
  }
];

// Flats Data with IDs
const flatList = [
  {
    id: 1,
    name: "Green Residency",
    address: "Sector 21, New Delhi",
    price: "₹ 15,000/mo*",
    facilities: ["Lift", "24x7 Security", "Parking"],
    bhkTypes: ["1 BHK", "2 BHK"],
    img: FlatImg
  },
  {
    id: 2,
    name: "Skyline Apartments",
    address: "Rohini, Delhi",
    price: "₹ 20,000/mo*",
    facilities: ["Gym", "Swimming Pool", "Parking"],
    bhkTypes: ["2 BHK", "3 BHK"],
    img: FlatImg
  }
];

const ShowPG = () => {
  const { slug } = useParams();
  const [view, setView] = useState("pg"); // 'pg' or 'flat'

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] px-[5%] py-10 xl:px-[15%]">

        {/* Header */}
        <div className="text-center mt-20 mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            PG / Flats in <span className="text-[#520075] capitalize">{slug}</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setView("pg")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              view === "pg" ? "bg-[#520075] text-white" : "border border-[#520075] text-[#520075] hover:bg-[#F4E2FC]"
            }`}
          >
            <Home className="w-4 h-4" /> PG / Hostel
          </button>

          <button
            onClick={() => setView("flat")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              view === "flat" ? "bg-[#520075] text-white" : "border border-[#520075] text-[#520075] hover:bg-[#F4E2FC]"
            }`}
          >
            <Building2 className="w-4 h-4" /> Flats
          </button>
        </div>

        {/* Count */}
        <p className="text-center mb-6 font-medium">
          {view === "pg" ? pgList.length : flatList.length} {view === "pg" ? "PGs" : "Flats"} waiting to be yours in <span className="text-[#520075]">{slug}</span>
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {view === "pg"
            ? pgList.map((pg) => <PGCard key={pg.id} pg={pg} id={pg.id} />)
            : flatList.map((flat) => <FlatCard key={flat.id} flat={flat} id={flat.id} />)}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default ShowPG;
