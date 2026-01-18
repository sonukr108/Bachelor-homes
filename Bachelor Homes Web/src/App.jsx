import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import OurTeam from './pages/OurTeam';
import PartnetWithUs from './pages/PartnetWithUs';
import ScrollToTop from "./components/ScrollToTop";
import ContactUs from './pages/ContactUs';
import TermsAndConditions from './pages/TermsAndConditions';
import FrequentlyAskedQuestions from './pages/FrequentlyAskedQuestions';
import ShowPG from './pages/ShowPG';
import PGDetails from './pages/PGDetails';
import FlatDetails from './pages/FlatDetails';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 2500,
      once: true,
      offset: 120,
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/partner" element={<PartnetWithUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/tandc" element={<TermsAndConditions />} />
        <Route path="/faqs" element={<FrequentlyAskedQuestions />} />

        {/* Parent route */}
        <Route path="/showpg/:slug" element={<ShowPG />} />

        {/* Nested routes */}
        <Route path="/showpg/:slug/pg/:id" element={<PGDetails />} />
        <Route path="/showpg/:slug/flat/:id" element={<FlatDetails />} />

        {/* Add more routes as needed */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
