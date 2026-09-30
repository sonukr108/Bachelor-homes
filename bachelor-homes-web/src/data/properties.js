import { Bed } from "lucide-react";

const PGImg =
    "https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/pg.svg";

const FlatImg =
    "https://bhbsgnvafbmrtwrgslek.supabase.co/storage/v1/object/public/static-images/pg.svg";

const properties = [
    // =====================================================
    // FLAT 1
    // =====================================================
    {
        id: 1,
        type: "flat",

        name: "Green Residency",

        address: "Sector 21, New Delhi",

        // Used for Google Maps
        mapLocation: "Green Residency, Sector 21, New Delhi",

        images: [
            "https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fasset-cdn.stanzaliving.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fe_improve%2Fe_sharpen%3A10%2Fe_saturation%3A10%2Fv1669280523%2FWebsite%2FCMS-Uploads%2FJWS00993_4_5_ofwypu.jpg&w=1920&q=75",

            "https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fasset-cdn.stanzaliving.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fe_improve%2Fe_sharpen%3A10%2Fe_saturation%3A10%2Fv1669280523%2FWebsite%2FCMS-Uploads%2FJWS00993_4_5_ofwypu.jpg&w=1920&q=75",
        ],

        // Flat pricing
        pricing: [
            {
                type: "1 BHK",
                price: "₹ 15,000/mo*",
            },
            {
                type: "2 BHK",
                price: "₹ 20,000/mo*",
            },
            {
                type: "3 BHK",
                price: "₹ 25,000/mo*",
            },
        ],

        facilities: ["Lift", "24x7 Security", "Parking"],

        services: [
            "Gym",
            "Swimming Pool",
            "Power Backup",
            "Security",
        ],

        details:
            "Green Residency offers premium flats with modern amenities and security. Perfect for families and working professionals.",

        // Used by FlatCard
        img: FlatImg,
    },

    // =====================================================
    // FLAT 2
    // =====================================================
    {
        id: 2,
        type: "flat",

        name: "Skyline Apartments",

        address: "Rohini, Delhi",

        mapLocation: "Skyline Apartments, Rohini, Delhi",

        images: [
            "https://tse2.mm.bing.net/th/id/OIP.tskwjQRcYYQE12dsScdXpgHaEC?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",

            "https://tse2.mm.bing.net/th/id/OIP.tskwjQRcYYQE12dsScdXpgHaEC?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        ],

        pricing: [
            {
                type: "2 BHK",
                price: "₹ 20,000/mo*",
            },
            {
                type: "3 BHK",
                price: "₹ 25,000/mo*",
            },
        ],

        facilities: ["Gym", "Swimming Pool", "Parking"],

        services: [
            "Power Backup",
            "Security",
            "Parking",
        ],

        details:
            "Skyline Apartments provides spacious flats with modern facilities and convenient connectivity.",

        img: FlatImg,
    },

    // =====================================================
    // PG 1
    // =====================================================
    {
        id: 3,
        type: "pg",

        name: "Sonu House",

        address: "Preet Vihar Gali No. 12",

        mapLocation: "Sonu House, Preet Vihar Gali No. 12, Delhi",

        images: [
            "https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fasset-cdn.stanzaliving.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fe_improve%2Fe_sharpen%3A10%2Fe_saturation%3A10%2Fv1669280523%2FWebsite%2FCMS-Uploads%2FJWS00993_4_5_ofwypu.jpg&w=1920&q=75",

            "https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fasset-cdn.stanzaliving.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fe_improve%2Fe_sharpen%3A10%2Fe_saturation%3A10%2Fv1669280523%2FWebsite%2FCMS-Uploads%2FJWS00993_4_5_ofwypu.jpg&w=1920&q=75",

            "https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fasset-cdn.stanzaliving.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fe_improve%2Fe_sharpen%3A10%2Fe_saturation%3A10%2Fv1669280523%2FWebsite%2FCMS-Uploads%2FJWS00993_4_5_ofwypu.jpg&w=1920&q=75",
        ],

        gender: "Unisex",

        // PG pricing
        pricing: [
            {
                type: "2 Sharing",
                price: "₹ 6,499/mo*",
                icon: Bed,
            },
            {
                type: "3 Sharing",
                price: "₹ 4,999/mo*",
                icon: Bed,
            },
            {
                type: "4 Sharing",
                price: "₹ 3,999/mo*",
                icon: Bed,
            },
        ],

        facilities: [
            "Attached washroom",
            "Attached balcony",
        ],

        services: [
            "Hot and Delicious Meals",
            "High-Speed WIFI",
            "Laundry Service",
            "Professional Housekeeping",
            "24x7 Security Surveillance",
        ],

        details:
            "Sonu House is a comfortable PG with meals, WiFi, housekeeping and security. Designed for comfort, convenience and community.",

        img: PGImg,
    },

    // =====================================================
    // PG 2
    // =====================================================
    {
        id: 4,
        type: "pg",

        name: "Bachelor Homes PG",

        address: "Laxmi Nagar, Delhi",

        mapLocation: "Bachelor Homes PG, Laxmi Nagar, Delhi",

        images: [
            "https://www.stanzaliving.com/_next/image?url=https%3A%2F%2Fasset-cdn.stanzaliving.com%2Fstanza-living%2Fimage%2Fupload%2Ff_auto%2Cq_auto%2Fe_improve%2Fe_sharpen%3A10%2Fe_saturation%3A10%2Fv1669280523%2FWebsite%2FCMS-Uploads%2FJWS00993_4_5_ofwypu.jpg&w=1920&q=75",
        ],

        gender: "Unisex",

        pricing: [
            {
                type: "2 Sharing",
                price: "₹ 7,000/mo*",
                icon: Bed,
            },
            {
                type: "3 Sharing",
                price: "₹ 5,500/mo*",
                icon: Bed,
            },
            {
                type: "4 Sharing",
                price: "₹ 4,500/mo*",
                icon: Bed,
            },
        ],

        facilities: [
            "Attached washroom",
            "Attached balcony",
            "Common Kitchen",
        ],

        services: [
            "WiFi",
            "Food",
            "Laundry",
            "Housekeeping",
            "24x7 Security",
        ],

        details:
            "Bachelor Homes PG provides comfortable accommodation for students and working professionals with essential facilities and services.",

        img: PGImg,
    },
];

export default properties;