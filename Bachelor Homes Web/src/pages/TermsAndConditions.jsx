import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Mail, Phone } from 'lucide-react';

const TermsAndConditions = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-200px)] px-[5%] py-10 xl:px-[15%]">

                {/* Header */}
                <div className="text-center mt-20 mb-10">
                    <h2 className="text-2xl md:text-4xl font-extrabold">
                        <span className="text-[#520075]">Terms </span>and <span className="text-[#520075]">Conditions</span>
                    </h2>
                    <p className="mt-2 text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
                        Please read these Terms and Conditions carefully before using Bachelor Homes services.
                    </p>
                </div>

                {/* Terms Content */}
                <div className="bg-purple-50 shadow-md rounded-xl p-6 md:p-10 leading-relaxed space-y-6 text-gray-700">

                    <p><strong>Effective Date:</strong> 29 July 2025</p>
                    <p>
                        Welcome to <strong>Bachelor Homes</strong> ("we," "our," or "us"). By accessing or using our website,
                        mobile application, or services, you agree to comply with and be bound by these Terms.
                        If you do not agree, you must discontinue use of our services.
                    </p>

                    <h3 className="text-lg font-bold text-[#520075]">1. Acceptance of Terms</h3>
                    <p>By using Bachelor Homes, you confirm that you are at least 18 years old and legally capable of entering into binding contracts.</p>

                    <h3 className="text-lg font-bold text-[#520075]">2. Services Offered</h3>
                    <p>Bachelor Homes provides fully furnished co-living spaces, property rentals, and technology-enabled accommodation management.</p>

                    <h3 className="text-lg font-bold text-[#520075]">3. User Responsibilities</h3>
                    <ul className="list-disc pl-6">
                        <li>Provide accurate and complete information during booking and registration.</li>
                        <li>Maintain cleanliness and abide by house rules.</li>
                        <li>Avoid illegal or disruptive activities on the property.</li>
                    </ul>

                    <h3 className="text-lg font-bold text-[#520075]">4. Bookings and Payments</h3>
                    <p>All bookings are subject to confirmation and availability. Payments must be made via approved methods. Refunds will follow our Refund Policy.</p>

                    <h3 className="text-lg font-bold text-[#520075]">5. House Rules</h3>
                    <p>Residents must respect property rules, maintain discipline, and avoid unlawful activities. Damages to property may result in penalties.</p>

                    <h3 className="text-lg font-bold text-[#520075]">6. Intellectual Property</h3>
                    <p>All content, logos, and trademarks on the Bachelor Homes platform are our property. Unauthorized use is prohibited.</p>

                    <h3 className="text-lg font-bold text-[#520075]">7. Limitation of Liability</h3>
                    <p>We are not liable for losses, theft, or damages beyond our reasonable control, except where required by law.</p>

                    <h3 className="text-lg font-bold text-[#520075]">8. Privacy</h3>
                    <p>Your personal data will be handled according to our Privacy Policy.</p>

                    <h3 className="text-lg font-bold text-[#520075]">9. Termination</h3>
                    <p>We reserve the right to suspend or terminate services if you violate these Terms or engage in unlawful activities.</p>

                    <h3 className="text-lg font-bold text-[#520075]">10. Modifications</h3>
                    <p>Bachelor Homes may update these Terms at any time. Continued use means you accept the updated Terms.</p>

                    <h3 className="text-lg font-bold text-[#520075]">11. Governing Law</h3>
                    <p>These Terms are governed by the laws of India. Disputes will be subject to the jurisdiction of courts in Hazaribagh, Jharkhand.</p>

                    <h3 className="text-lg font-bold text-[#520075]">12. Contact Us</h3>
                    <p className="space-y-2">
                        <span className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#520075]" />
                            Bachelor Homes Corporate Office, Nutan Nagar, Near Shiv Mandir Road, Hazaribagh, Jharkhand – 825301
                        </span>

                        <span className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-[#520075]" />
                            bachelorhomes@gmail.com
                        </span>

                        <span className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-[#520075]" />
                            +91-7857883654
                        </span>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
