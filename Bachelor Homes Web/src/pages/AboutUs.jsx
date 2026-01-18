import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

import img1 from '../assets/aboutuspage/1.svg';
import img2 from '../assets/aboutuspage/2.svg';
import img3 from '../assets/aboutuspage/3.svg';
import img4 from '../assets/aboutuspage/4.svg';
import img5 from '../assets/aboutuspage/5.svg';
import img6 from '../assets/aboutuspage/6.svg';

const featuresData = [
  {
    title: "Comfortable",
    highlight: "Living",
    description:
      "Our homes are designed for maximum comfort, with fully furnished rooms, cozy bedding, air conditioning, high-speed Wi-Fi, and attached washrooms. Daily housekeeping ensures your space stays clean and welcoming — all you have to do is relax and focus on your work or studies.",
    image: img1,
    reverse: false,
  },
  {
    title: "All-Inclusive &",
    highlight: "Hassle-Free",
    description:
      "Say goodbye to surprise bills and hidden costs. Your monthly rent covers meals, cleaning, laundry, maintenance, and even electricity. We don’t charge brokerage fees, so moving in is simple, transparent, and stress-free — exactly the way modern co-living should be.",
    image: img2,
    reverse: true,
  },
  {
    title: "Community",
    highlight: "Vibes",
    description:
      "More than just a place to stay — Bachelor Homes offers a vibrant community. Enjoy weekend events, movie nights, festive celebrations, and networking opportunities. Meet people from different backgrounds and build lifelong friendships in a fun, welcoming environment where everyone feels like family.",
    image: img3,
    reverse: false,
  },
  {
    title: "Tech-Enabled",
    highlight: "Convenience",
    description:
      "Manage everything from our easy-to-use app — from rent payments and maintenance requests to event updates. Enjoy biometric access, digital check-ins, smart locks, and 24x7 customer support. We combine technology and hospitality to give you a smarter, smoother living experience.",
    image: img4,
    reverse: true,
  },
  {
    title: "Prime",
    highlight: "Locations",
    description:
      "Each Bachelor Home is located close to major colleges, IT parks, metro stations, and public transport. This means you save time on travel, stay connected to the city’s pulse, and have everything you need — from groceries to gyms — within walking distance.",
    image: img5,
    reverse: false,
  },
  {
    title: "Safe &",
    highlight: "Secure",
    description:
      "Your safety is our top priority. All our properties are monitored with CCTV, have 24x7 security personnel, biometric entry systems, and regular sanitization. Whether you're studying late or working nights, you can rest easy knowing your home is protected round the clock.",
    image: img6,
    reverse: true,
  },
];

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] px-[5%] py-10 xl:px-[15%]">
        {/* Header */}
        <div className="text-center mt-20 mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            About <span className="text-[#520075]">Bachelor Homes</span>
          </h2>
          <p className="mt-2 text-sm md:text-lg max-w-3xl mx-auto">
            A place that’s not just a stay, but a lifestyle — your true second home.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="flex flex-col gap-12">
          {featuresData.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
