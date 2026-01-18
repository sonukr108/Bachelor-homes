const TeamMemberCard = ({ name, role, description, image, reverse }) => {
  return (
    <div
      className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-10 px-4 md:px-10 py-10 hover:bg-[#F4E2FC] rounded-xl"
      data-aos="fade-up"
    >
      {/* Image Section */}
      <div
        className={`flex justify-center ${reverse ? 'md:order-2' : ''} w-full md:w-1/2 xl:w-[40%]`}
      >
        <img
          src={image}
          alt={name}
          className="rounded-xl w-full xl:h-105 object-cover shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div
        className={`flex flex-col gap-3 text-center md:text-left w-full md:w-1/2 ${reverse ? 'md:order-1' : ''}`}
      >
        <h3 className="text-xl md:text-2xl font-extrabold text-[#520075]">{name}</h3>
        <p className="font-semibold">{role}</p>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
