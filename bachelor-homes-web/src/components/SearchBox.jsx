import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim() !== "") {
      navigate(`/showpg/${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="md:my-5 w-full md:w-105 lg:w-135 xl:w-200 bg-white border-1 border-gray-400 rounded-lg grid grid-cols-[1fr_7fr_2fr] md:mx-5 lg:mx-10 px-2 py-4 lg:py-6">
      {/* Icon */}
      <div className="flex items-center justify-center">
        <MapPin className="h-7 w-7 md:h-10 md:w-10 lg:h-15 lg:w-15 text-[#520075]" />
      </div>

      {/* Input */}
      <div className="flex flex-col md:gap-1 items-start justify-start px-2">
        <p className="hidden md:flex font-bold md:text-xs lg:text-sm xl:text-xl">Find your perfect stay near college or work.</p>
        <p className="md:hidden font-bold text-[12px]">Search location</p>
        <input
          type="text"
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-[12px] lg:text-sm xl:text-xl w-full outline-none"
          placeholder="Search your location"
        />
      </div>

      {/* Search Button */}
      <div className="flex items-center justify-center">
        <button
          onClick={handleSearch}
          className="bg-[#520075] text-white px-4 py-2 rounded-sm text-sm md:text-xs lg:text-sm xl:text-xl text-center leading-4 xl:leading-8"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
