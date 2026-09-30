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
import AfterSearch from './pages/AfterSearch';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PropertyDetails from './pages/PropertyDetails';

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
        <Route path="/showpg/:slug" element={<AfterSearch />} />

        {/* Nested routes */}
        <Route
          path="/show/:slug/:type/:id"
          element={<PropertyDetails />}
        />

        {/* Add more routes as needed */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
