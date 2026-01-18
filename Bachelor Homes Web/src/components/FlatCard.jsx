import React from 'react';
import { Home, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const FlatCard = ({ flat, id }) => {
  const navigate = useNavigate();
  const { slug } = useParams(); // ✅ Get city slug from route

  // Google Maps Search URL
  const getGoogleMapsLink = () => {
    const query = encodeURIComponent(`${flat.name}, ${flat.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 border rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition bg-white">
      
      {/* Flat Image */}
      <img
        src={flat.img}
        alt={flat.name}
        className="w-full md:w-72 h-48 object-cover rounded-xl"
      />

      {/* Flat Details */}
      <div className="flex-1 flex flex-col gap-3">
        <div>
          <h3 className="text-xl font-bold">{flat.name}</h3>
          <p className="text-gray-600">{flat.address}</p>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-2">
          {flat.facilities.map((facility, i) => (
            <span key={i} className="px-3 py-1 text-sm bg-purple-100 text-[#520075] rounded-md">
              {facility}
            </span>
          ))}
        </div>

        {/* BHK Types */}
        <div className="flex flex-wrap gap-2">
          {flat.bhkTypes.map((type, i) => (
            <span key={i} className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 rounded-md">
              <Home className="w-4 h-4" /> {type}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="font-semibold">
          Start from <span className="text-xl">{flat.price}</span>
        </p>
      </div>

      {/* Right Side Buttons */}
      <div className="flex flex-col items-center gap-3 md:gap-5 lg:gap-12 md:w-40" onClick={(e) => e.stopPropagation()}>
        
        {/* View Directions */}
        <a
          href={getGoogleMapsLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#520075] hover:underline text-sm"
        >
          <MapPin className="w-5 h-5" /> View Directions
        </a>

        {/* ✅ View Details Button (Navigates to Combined URL) */}
        <button
          className="bg-[#520075] text-white px-4 py-2 rounded-lg hover:bg-[#3b005c] transition w-full cursor-pointer"
          onClick={() => navigate(`/showpg/${slug}/flat/${id}`)}
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default FlatCard;
