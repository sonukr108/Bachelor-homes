import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PartnerCard from '../components/PartnerCard';
import { Building2, Home, GraduationCap, Package } from 'lucide-react';

const propertyImg = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/partnerwithus/1.svg';
const peopleImg = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/partnerwithus/2.svg';
const productImg = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/partnerwithus/3.svg';

const PartnerWithUs = () => {
  const sections = [
    {
      title: "Your property in the",
      highlight: "right hands",
      description:
        "No matter what you're looking to lease out - an apartment, a house, an under-construction building, an existing hostel/PG or something else altogether, we have a plan for it. We can not only help your property mint money for you but also turn it into a local landmark.",
      plans: [
        { label: "For your building/plot :", icon: <Building2 className="w-5 h-5 text-[#520075]" /> },
        { label: "For your apartment :", icon: <Home className="w-5 h-5 text-[#520075]" /> },
      ],
      image: propertyImg,
      reverse: false,
    },
    {
      title: "Your people in the",
      highlight: "right care",
      description:
        "You care for your people, and so do we. Let's give them more than just four walls and a roof. From safety to amenities, we'll leave them wanting nothing. Partner with us (and your people will thank you for it).",
      plans: [{ label: "For college hostels :", icon: <GraduationCap className="w-5 h-5 text-[#520075]" /> }],
      image: peopleImg,
      reverse: true,
    },
    {
      title: "Your product with the",
      highlight: "right consumer",
      description:
        "As a growing company, we're always looking for people who can take care of our supply needs. Contact us and see your business have a pan India presence in no time.",
      plans: [{ label: "For suppliers :", icon: <Package className="w-5 h-5 text-[#520075]" /> }],
      image: productImg,
      reverse: false,
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] px-[5%] py-10 xl:px-[15%]">
        {/* Header */}
        <div className="text-center mt-20 mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            'You've come to the <span className="text-[#520075]">right place</span>, partner
          </h2>
          <p className="mt-2 text-sm md:text-lg max-w-3xl mx-auto">
            Whatever we've achieved in the past few years has been made possible due to the mutual support and cooperation of the people we proudly call our partners. If you too wish to make your property earn to the best of its ability, find captive mainspace for your products or services, and/or provide the best living experience for your people, you've come to the right place.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-12">
          {sections.map((section, i) => (
            <PartnerCard key={i} {...section} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnerWithUs;
