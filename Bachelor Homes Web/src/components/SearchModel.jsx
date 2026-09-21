import SearchBox from '../components/SearchBox';
import { X } from "lucide-react";
import cityImg from '../assets/city.png';
import { useNavigate } from "react-router-dom";

const cities = [
    { name: "DELHI", country: "INDIA", img: cityImg },
    { name: "AHMEDABAD", country: "INDIA", img: cityImg },
    { name: "MUMBAI", country: "INDIA", img: cityImg },
    { name: "KOLKATA", country: "INDIA", img: cityImg },
    { name: "SURAT", country: "INDIA", img: cityImg },
];

const SearchModel = ({ isSearchOpen, setIsSearchOpen }) => {
    const navigate = useNavigate();

    if (!isSearchOpen) return null;

    const handleCityClick = (cityName) => {
        setIsSearchOpen(false); // close modal
        navigate(`/showpg/${encodeURIComponent(cityName.toLowerCase())}`);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-start bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-[#F4E2FC] py-4 mx-2 md:mx-0 rounded-2xl relative top-20 shadow-xl">
                {/* Close Button */}
                <div onClick={() => setIsSearchOpen(false)} className="flex items-center justify-end px-2 md:px-4 mb-2">
                    <X className="h-5 w-5 md:w-7 md:h-7 lg:h-10 lg:w-10 cursor-pointer" />
                </div>

                {/* Search Box */}
                <div className="mx-3 md:mx-0">
                    <SearchBox />
                </div>

                {/* Popular Cities */}
                <div className="flex justify-center flex-col px-4 lg:px-10 py-2">
                    <p className="font-bold text-md py-2">Popular cities</p>

                    <div className="items-center gap-1 lg:gap-3">
                        <div className="flex flex-wrap gap-1 lg:gap-3 overflow-x-auto scrollbar-hide">
                            {cities.map((city, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCityClick(city.name)}
                                    className="bg-white rounded-xl p-2 xl:p-3 shadow-sm xl:w-[150px] text-center cursor-pointer"
                                >
                                    <img src={city.img} alt={city.name} className="hidden xl:flex h-25 w-full object-contain mb-2" />
                                    <h4 className="font-bold">{city.name}</h4>
                                    <p className="text-sm text-gray-500">{city.country}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SearchModel;
