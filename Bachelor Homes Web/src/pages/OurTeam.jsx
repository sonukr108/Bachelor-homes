import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamMemberCard from '../components/TeamMemberCard';

const img1 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/ourteampage/1.svg';
const img2 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/ourteampage/1.svg';
const img3 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/ourteampage/1.svg';
const img4 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/ourteampage/1.svg';
const img5 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/ourteampage/1.svg';
const img6 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/ourteampage/1.svg';
const img7 = 'https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/ourteampage/1.svg';

const teamMembers = [
  {
    name: "Sonu Kumar Verma",
    role: "UI/UX Designer • Group Leader",
    description:
      "Lead designer and full-stack developer behind Bachelor Homes, ensuring an intuitive user experience, clean design, and smooth functionality, while also managing team collaboration and project execution.",
    image: img1,
    reverse: false,
  },
  {
    name: "Ajay Kumar",
    role: "Frontend Developer",
    description:
      "React developer behind Bachelor Homes, ensuring an intuitive user experience, clean design, and smooth functionality, while also managing team collaboration and project execution.",
    image: img2,
    reverse: true,
  },
  {
    name: "Rahul Kumar",
    role: "Backend Developer",
    description:
      "Lead designer and full-stack developer behind Bachelor Homes, ensuring an intuitive user experience, clean design, and smooth functionality, while also managing team collaboration and project execution.",
    image: img3,
    reverse: false,
  },
  {
    name: "Shubham Kumar Verma",
    role: "Data Architect",
    description:
      "React developer behind Bachelor Homes, ensuring an intuitive user experience, clean design, and smooth functionality, while also managing team collaboration and project execution.",
    image: img4,
    reverse: true,
  },
  {
    name: "Abhijeet Kumar",
    role: "Database Administrator",
    description:
      "Lead designer and full-stack developer behind Bachelor Homes, ensuring an intuitive user experience, clean design, and smooth functionality, while also managing team collaboration and project execution.",
    image: img5,
    reverse: false,
  },
  {
    name: "Premjeet Kumar Verma",
    role: "Frontend Developer",
    description:
      "React developer behind Bachelor Homes, ensuring an intuitive user experience, clean design, and smooth functionality, while also managing team collaboration and project execution.",
    image: img6,
    reverse: true,
  },
  {
    name: "Ahmad Raza",
    role: "Frontend Developer",
    description:
      "Lead designer and full-stack developer behind Bachelor Homes, ensuring an intuitive user experience, clean design, and smooth functionality, while also managing team collaboration and project execution.",
    image: img7,
    reverse: false,
  },
];

const OurTeam = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-200px)] px-[5%] py-10 xl:px-[15%]">
        {/* Header */}
        <div className="text-center mt-20 mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            The Stars of the <span className="text-[#520075]">“BachelorVerse”</span>
          </h2>
          <p className="mt-2 text-sm md:text-lg max-w-3xl mx-auto">
            From late-night brainstorming to bug-squashing marathons — this 7-member dream team made Bachelor Homes come to life. Designers, coders, problem-solvers, and coffee-powered creators who turned a vision into a brand that feels like home.
          </p>
        </div>

        {/* Team Members */}
        {teamMembers.map((member, i) => (
          <TeamMemberCard key={i} {...member} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default OurTeam;
