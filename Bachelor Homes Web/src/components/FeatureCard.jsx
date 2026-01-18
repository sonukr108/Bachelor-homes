const FeatureCard = ({ title, highlight, description, image, reverse }) => {
  return (
    <div
      className={`grid md:grid-cols-2 gap-3 md:gap-5 items-center md:px-10 py-10`}
      data-aos="fade-up"
    >
      {/* Image Section */}
      <div className={`grid grid-cols-1 ${reverse ? 'md:order-2' : ''}`}>
        <img
          src={image}
          alt={title}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div
        className={`md:px-5 lg:px-10 flex flex-col gap-2 md:gap-5 ${reverse ? 'md:order-1' : ''}`}
      >
        <p className="text-2xl lg:text-3xl font-extrabold text-center md:text-start">
          {title} <span className="text-[#520075]">{highlight}</span>
        </p>
        <p className="text-sm lg:text-lg text-center md:text-start leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
