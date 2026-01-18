import { Link } from 'react-router-dom';

const PartnerCard = ({ title, highlight, description, plans, image, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} 
        items-center gap-6 md:gap-10 bg-[#F4E2FC] rounded-2xl p-6 md:p-10 mb-8 shadow-sm`}
      data-aos="fade-up"
    >
      {/* Text Section */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <h3 className="text-xl md:text-2xl font-extrabold">
          {title} <span className="text-[#520075]">{highlight}</span>
        </h3>
        <p className="text-gray-700">{description}</p>

        {/* Plans with Lucide Icons */}
        {plans && plans.map((plan, idx) => (
          <div 
            key={idx} 
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-2"
          >
            <div className="flex items-center gap-2 text-sm sm:text-base">
              {plan.icon}
              <span>{plan.label}</span>
            </div>
            <button className="px-3 py-1 border rounded-lg text-[#520075] border-[#520075] hover:bg-[#520075] cursor-pointer hover:text-white transition w-full sm:w-auto">
              Download brochure
            </button>
          </div>
        ))}

        {/* Contact Us Button */}
        <Link to={'/contact'}>
          <button className="mt-4 w-full sm:w-fit bg-[#520075] text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-[#3b005c] transition-all duration-300">
            Contact Us
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="flex justify-center w-full md:w-1/2">
        <img 
          src={image} 
          alt={title} 
          className="rounded-xl w-full max-w-xs sm:max-w-sm md:w-96 object-cover shadow-lg" 
        />
      </div>
    </div>
  );
};

export default PartnerCard;
