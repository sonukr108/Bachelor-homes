import React from "react";
import { IoClose } from "react-icons/io5";
import {
    MapPin,
    ExternalLink,
    Building2,
    Tag,
    CircleCheck,
    UserRound,
    Hash,
    IndianRupee,
    Wifi,
    Wrench,
} from "lucide-react";

const PropertyDetails = ({ property, setOpen }) => {
    if (!property) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Main Modal */}
            <div className="bg-white text-[#520075] rounded-xl shadow-2xl w-[80%] md:w-[60%] lg:w-[50%] max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#d9bde8] scrollbar-track-transparent">

                {/* ================= HEADER ================= */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-md flex items-center justify-between border-b border-[#eadcf0] px-6 py-4 z-20">

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f7eafd] flex items-center justify-center">
                            <Building2
                                size={21}
                                className="text-[#520075]"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-[#520075]">
                                Property Details
                            </h2>

                            <p className="text-sm text-gray-500 mt-0.5">
                                {property.name || "Property"}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:text-[#520075] hover:bg-[#f7eafd] transition"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="p-6 space-y-7">

                    {/* ================= IMAGES ================= */}
                    <section>
                        <SectionTitle
                            icon={<Building2 size={18} />}
                            title="Property Images"
                        />

                        {property.images?.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {property.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-lg border border-[#eadcf0] bg-gray-100"
                                    >
                                        <img
                                            src={
                                                typeof image === "string"
                                                    ? image
                                                    : image?.url
                                            }
                                            alt={`${property.name} ${index + 1}`}
                                            className="w-full h-32 object-cover transition duration-300 group-hover:scale-105"
                                        />

                                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                                            Image {index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-[#d9bde8] bg-[#faf5fc] p-6 text-center">
                                <p className="text-gray-500 text-sm">
                                    No images available
                                </p>
                            </div>
                        )}
                    </section>

                    {/* ================= BASIC INFORMATION ================= */}
                    <section>
                        <SectionTitle
                            icon={<Tag size={18} />}
                            title="Basic Information"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <DetailItem
                                icon={<Building2 size={16} />}
                                label="Property Name"
                                value={property.name}
                            />

                            <DetailItem
                                icon={<Tag size={16} />}
                                label="Type"
                                value={property.type?.toUpperCase()}
                            />

                            <DetailItem
                                icon={<CircleCheck size={16} />}
                                label="Status"
                                value={property.status}
                            />

                            {property.type === "pg" && (
                                <DetailItem
                                    icon={<UserRound size={16} />}
                                    label="Gender"
                                    value={property.gender}
                                />
                            )}

                            <DetailItem
                                icon={<Hash size={16} />}
                                label="Property ID"
                                value={property.id}
                            />
                        </div>
                    </section>

                    {/* ================= ADDRESS ================= */}
                    <section>
                        <SectionTitle
                            icon={<MapPin size={18} />}
                            title="Address"
                        />

                        <div className="rounded-xl border border-[#eadcf0] bg-[#faf5fc] p-4">

                            <div className="flex gap-3">
                                <div className="w-9 h-9 shrink-0 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                    <MapPin
                                        size={19}
                                        className="text-[#520075]"
                                    />
                                </div>

                                <div className="text-sm text-gray-700 space-y-1">
                                    <p className="font-semibold text-gray-800">
                                        {property.address?.locality || "N/A"}
                                    </p>

                                    <p>
                                        {property.address?.city || "N/A"},{" "}
                                        {property.address?.state || "N/A"}
                                    </p>

                                    <p className="text-gray-500">
                                        Pincode:{" "}
                                        <span className="text-gray-700">
                                            {property.address?.pincode || "N/A"}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {property.map_location && (
                                <a
                                    href={property.map_location}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 px-3 py-2 rounded-lg bg-white border border-[#d9bde8] text-[#520075] text-sm font-medium hover:bg-[#f7eafd] transition"
                                >
                                    <MapPin size={15} />
                                    Open in Google Maps
                                    <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    </section>

                    {/* ================= PRICING ================= */}
                    <section>
                        <SectionTitle
                            icon={<IndianRupee size={18} />}
                            title={
                                property.type === "pg"
                                    ? "Sharing Pricing"
                                    : "BHK Pricing"
                            }
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {property.pricing?.length > 0 ? (
                                property.pricing.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group border border-[#eadcf0] rounded-xl p-4 bg-white hover:border-[#c99ddd] hover:shadow-md transition"
                                    >
                                        <p className="text-sm text-gray-500">
                                            {item.type}
                                        </p>

                                        <div className="flex items-center gap-1 mt-1">
                                            <IndianRupee
                                                size={18}
                                                className="text-[#520075]"
                                            />

                                            <p className="text-xl font-bold text-[#520075]">
                                                {item.price}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No pricing information available
                                </p>
                            )}
                        </div>
                    </section>

                    {/* ================= FACILITIES ================= */}
                    <section>
                        <SectionTitle
                            icon={<CircleCheck size={18} />}
                            title="Facilities"
                        />

                        {property.facilities?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {property.facilities.map(
                                    (facility, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1.5 bg-[#f7eafd] border border-[#eadcf0] px-3 py-1.5 rounded-full text-sm text-[#520075]"
                                        >
                                            <CircleCheck size={13} />
                                            {facility}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            <EmptyText text="No facilities available" />
                        )}
                    </section>

                    {/* ================= SERVICES ================= */}
                    <section>
                        <SectionTitle
                            icon={<Wrench size={18} />}
                            title="Services"
                        />

                        {property.services?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {property.services.map(
                                    (service, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1.5 bg-[#f7eafd] border border-[#eadcf0] px-3 py-1.5 rounded-full text-sm text-[#520075]"
                                        >
                                            <CircleCheck size={13} />
                                            {service}
                                        </span>
                                    )
                                )}
                            </div>
                        ) : (
                            <EmptyText text="No services available" />
                        )}
                    </section>

                    {/* ================= DETAILS ================= */}
                    <section>
                        <SectionTitle
                            icon={<Building2 size={18} />}
                            title="Details"
                        />

                        <div className="rounded-xl border border-[#eadcf0] bg-gray-50 p-4">
                            <p className="text-gray-700 leading-6 text-sm">
                                {property.details ||
                                    "No details available."}
                            </p>
                        </div>
                    </section>

                    {/* ================= FOOTER ================= */}
                    <div className="border-t border-[#eadcf0] pt-5 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="bg-[#520075] text-white rounded-lg px-6 py-2.5 font-semibold hover:bg-[#6C3483] active:scale-[0.98] transition shadow-sm"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({ icon, title }) => {
    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="text-[#520075]">
                {icon}
            </div>

            <h3 className="font-semibold text-base text-[#520075]">
                {title}
            </h3>
        </div>
    );
};

/* =========================================================
   DETAIL ITEM
========================================================= */

const DetailItem = ({ icon, label, value }) => {
    return (
        <div className="group border border-[#eadcf0] rounded-xl p-3.5 bg-white hover:bg-[#faf5fc] hover:border-[#d9bde8] transition">

            <div className="flex items-center gap-2 text-gray-500">
                <span className="text-[#8E44AD]">
                    {icon}
                </span>

                <p className="text-xs font-medium uppercase tracking-wide">
                    {label}
                </p>
            </div>

            <p className="font-semibold text-sm text-gray-800 mt-2 break-words">
                {value || "N/A"}
            </p>
        </div>
    );
};

/* =========================================================
   EMPTY TEXT
========================================================= */

const EmptyText = ({ text }) => {
    return (
        <p className="text-sm text-gray-500 bg-gray-50 border border-dashed border-gray-200 rounded-lg p-4">
            {text}
        </p>
    );
};

export default PropertyDetails;
