import React from 'react';
import { Bed, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const PGCard = ({ pg, id }) => {
  const navigate = useNavigate();
  const { slug } = useParams(); // ✅ Get city slug from the current route

  // Google Maps Search URL
  const getGoogleMapsLink = () => {
    const query = encodeURIComponent(`${pg.name}, ${pg.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 border rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition bg-white">
      
      {/* PG Image */}
      <img
        src={pg.img}
        alt={pg.name}
        className="w-full md:w-72 h-48 object-cover rounded-xl"
      />

      {/* PG Details */}
      <div className="flex-1 flex flex-col gap-3">
        <div>
          <h3 className="text-xl font-bold">{pg.name}</h3>
          <p className="text-gray-600">{pg.address}</p>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-2">
          {pg.facilities.map((facility, i) => (
            <span key={i} className="px-3 py-1 text-sm bg-purple-100 text-[#520075] rounded-md">
              {facility}
            </span>
          ))}
        </div>

        {/* Room Types */}
        <div className="flex flex-wrap gap-2">
          {pg.roomTypes.map((type, i) => (
            <span key={i} className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 rounded-md">
              <Bed className="w-4 h-4" /> {type}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="font-semibold">
          Start from <span className="text-xl">{pg.price}</span>
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center gap-3 md:w-40" onClick={(e) => e.stopPropagation()}>
        {/* Gender */}
        <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
          {pg.gender} ♂ ♀
        </span>

        {/* View Directions */}
        <a
          href={getGoogleMapsLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#520075] hover:underline text-sm"
        >
          <MapPin className="w-4 h-4" /> View Directions
        </a>

        {/* ✅ Navigate to Combined URL */}
        <button
          className="bg-[#520075] text-white px-4 py-2 rounded-lg hover:bg-[#3b005c] transition w-full cursor-pointer"
          onClick={() => navigate(`/showpg/${slug}/pg/${id}`)}
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default PGCard;
