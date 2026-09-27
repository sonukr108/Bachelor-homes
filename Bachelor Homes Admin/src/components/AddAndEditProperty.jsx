import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import Loader from "./Loader";
import toast from "react-hot-toast";
import api from "../middleware/authIntercepter";
import usePropertyStore from "../store/propertyStore";

const MAX_IMAGES = 4;

const getPricingOptions = (type) => {
    if (type === "pg") {
        return ["2 Sharing", "3 Sharing", "4 Sharing"];
    }

    return ["1 BHK", "2 BHK", "3 BHK"];
};

const createPricing = (type, existingPricing = []) => {
    const options = getPricingOptions(type);

    return options.map((option) => {
        const existing = existingPricing.find(
            (item) => item.type === option
        );

        return {
            type: option,
            price: existing?.price ?? "",
        };
    });
};

const createEmptyForm = () => ({
    type: "pg",
    name: "",
    address: {
        locality: "",
        city: "",
        state: "",
        pincode: "",
    },
    map_location: "",
    gender: "male",
    pricing: createPricing("pg"),
    facilities: [],
    services: [],
    status: "available",
    details: "",
});

const normalizeImages = (images = []) => {
    return images
        .map((image) => {
            if (typeof image === "string") {
                return image;
            }

            return image?.url || "";
        })
        .filter(Boolean);
};

const AddAndEditProperty = ({
    room = null,
    setOpen,
    isEditing,
}) => {
    const addProperty = usePropertyStore(
        (state) => state.addProperty
    );

    const updateProperty = usePropertyStore(
        (state) => state.updateProperty
    );

    const [formData, setFormData] = useState(createEmptyForm());
    const [imageSlots, setImageSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isEditing && room) {
            const existingImages = normalizeImages(room.images);

            setFormData({
                type: room.type || "pg",
                name: room.name || "",
                address: {
                    locality: room.address?.locality || "",
                    city: room.address?.city || "",
                    state: room.address?.state || "",
                    pincode: room.address?.pincode || "",
                },
                map_location: room.map_location || "",
                gender: room.gender || "male",
                pricing: createPricing(
                    room.type || "pg",
                    room.pricing || []
                ),
                facilities: room.facilities || [],
                services: room.services || [],
                status: room.status || "available",
                details: room.details || "",
            });

            setImageSlots(
                existingImages.map((url) => ({
                    type: "existing",
                    url,
                }))
            );
        } else {
            setFormData(createEmptyForm());
            setImageSlots([]);
        }

        setErrorMessage("");
    }, [isEditing, room]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value,
            },
        }));
    };

    const handleTypeChange = (e) => {
        const type = e.target.value;

        setFormData((prev) => ({
            ...prev,
            type,
            gender: type === "pg" ? prev.gender || "male" : "",
            pricing: createPricing(type),
        }));
    };

    const handlePricingChange = (index, value) => {
        setFormData((prev) => ({
            ...prev,
            pricing: prev.pricing.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        price: value,
                    }
                    : item
            ),
        }));
    };

    const handleArrayChange = (name, value) => {
        const arrayValue = value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        setFormData((prev) => ({
            ...prev,
            [name]: arrayValue,
        }));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files || []);

        if (!files.length) return;

        if (imageSlots.length + files.length > MAX_IMAGES) {
            toast.error(`Maximum ${MAX_IMAGES} images are allowed.`);
            e.target.value = "";
            return;
        }

        const validFiles = [];

        for (const file of files) {
            if (file.size > 4 * 1024 * 1024) {
                toast.error(
                    `${file.name} must be less than 4 MB`
                );
                continue;
            }

            const preview = URL.createObjectURL(file);

            validFiles.push({
                type: "new",
                file,
                preview,
            });
        }

        if (validFiles.length) {
            setImageSlots((prev) => [
                ...prev,
                ...validFiles,
            ]);

            setErrorMessage("");
        }

        e.target.value = "";
    };

    const removeImage = (index) => {
        if (isEditing && imageSlots.length <= 1) {
            setErrorMessage(
                "You must keep at least one image while editing."
            );
            return;
        }

        const image = imageSlots[index];

        if (image?.type === "new" && image.preview) {
            URL.revokeObjectURL(image.preview);
        }

        setImageSlots((prev) =>
            prev.filter((_, i) => i !== index)
        );

        setErrorMessage("");
    };

    const uploadNewImages = async () => {
        const newImages = imageSlots.filter(
            (image) => image.type === "new"
        );

        if (!newImages.length) {
            return [];
        }

        const formData = new FormData();

        newImages.forEach((image) => {
            formData.append("images", image.file);
        });

        const response = await api.post(
            "/image/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (!response.data?.success) {
            throw new Error(
                response.data?.message ||
                "Image upload failed"
            );
        }

        return response.data.images || [];
    };

    const buildFinalImages = (uploadedImages) => {
        let uploadedIndex = 0;

        return imageSlots
            .map((image) => {
                if (image.type === "existing") {
                    return image.url;
                }

                const uploadedImage =
                    uploadedImages[uploadedIndex];

                uploadedIndex += 1;

                return uploadedImage?.url || "";
            })
            .filter(Boolean);
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            return "Property name is required.";
        }

        if (!formData.address.locality.trim()) {
            return "Locality is required.";
        }

        if (!formData.address.city.trim()) {
            return "City is required.";
        }

        if (!formData.address.state.trim()) {
            return "State is required.";
        }

        if (!formData.address.pincode.trim()) {
            return "Pincode is required.";
        }

        if (!formData.map_location.trim()) {
            return "Map location is required.";
        }

        if (imageSlots.length === 0) {
            return "Please upload at least one image.";
        }

        const invalidPricing = formData.pricing.some(
            (item) =>
                item.price === "" ||
                item.price === null ||
                Number(item.price) <= 0
        );

        if (invalidPricing) {
            return "Please enter a valid price for all pricing options.";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);
        setErrorMessage("");

        try {
            /*
             * STEP 1
             * Upload only newly selected images.
             */
            const uploadedImages = await uploadNewImages();

            /*
             * STEP 2
             * Get image URLs from upload response.
             *
             * Existing images are already URLs.
             * New images get URLs from response.data.images.
             */
            const finalImages =
                buildFinalImages(uploadedImages);

            if (!finalImages.length) {
                throw new Error(
                    "No image URL received."
                );
            }

            /*
             * STEP 3
             * Build final property object.
             */
            const propertyData = {
                type: formData.type,
                name: formData.name.trim(),

                address: {
                    locality:
                        formData.address.locality.trim(),
                    city: formData.address.city.trim(),
                    state: formData.address.state.trim(),
                    pincode:
                        formData.address.pincode.trim(),
                },

                map_location:
                    formData.map_location.trim(),

                ...(formData.type === "pg" && {
                    gender: formData.gender,
                }),

                pricing: formData.pricing.map((item) => ({
                    type: item.type,
                    price: Number(item.price),
                })),

                facilities: formData.facilities,

                services: formData.services,

                status: formData.status,

                details: formData.details.trim(),

                images: finalImages,
            };

            /*
             * STEP 4
             * Create or update property.
             */
            if (isEditing) {
                const response = await api.put(
                    `/properties/${room.id}`,
                    propertyData
                );

                if (!response.data?.success) {
                    throw new Error(
                        response.data?.message ||
                        "Property update failed"
                    );
                }

                const updatedProperty =
                    response.data.property;

                updateProperty(updatedProperty);

                toast.success(
                    "Property updated successfully!"
                );
            } else {
                const response = await api.post(
                    "/properties",
                    propertyData
                );

                if (!response.data?.success) {
                    throw new Error(
                        response.data?.message ||
                        "Property creation failed"
                    );
                }

                const createdProperty =
                    response.data.property;

                addProperty(createdProperty);

                toast.success(
                    "Property added successfully!"
                );
            }

            /*
             * Clean preview URLs.
             */
            imageSlots.forEach((image) => {
                if (
                    image.type === "new" &&
                    image.preview
                ) {
                    URL.revokeObjectURL(image.preview);
                }
            });

            setOpen(false);
        } catch (error) {
            console.error(
                "Property submit failed:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to save property.";

            setErrorMessage(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center overflow-y-auto py-5">
            <div className="bg-white text-[#6C3483] rounded-md p-6 w-[95%] md:w-[65%] lg:w-[55%] max-h-[95vh] overflow-y-auto shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#6C3483] pb-3">
                    <p className="font-semibold text-xl">
                        {isEditing
                            ? "Edit Property"
                            : "Add New Property"}
                    </p>

                    <IoClose
                        className="cursor-pointer hover:text-[#8E44AD] transition"
                        onClick={() =>
                            !loading && setOpen(false)
                        }
                        size={25}
                    />
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 mt-5"
                >
                    {/* Images */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="font-medium">
                                Property Images
                            </label>

                            <span className="text-sm text-gray-500">
                                {imageSlots.length}/4
                            </span>
                        </div>

                        <div className="flex gap-3 mt-2 flex-wrap">
                            {imageSlots.map(
                                (image, index) => {
                                    const imageSrc =
                                        image.type ===
                                            "existing"
                                            ? image.url
                                            : image.preview;

                                    return (
                                        <div
                                            key={`${imageSrc}-${index}`}
                                            className="relative w-24 h-24 bg-[#f3e6fa] rounded-md overflow-hidden"
                                        >
                                            <img
                                                src={imageSrc}
                                                alt={`Property ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />

                                            <IoClose
                                                className="absolute top-1 right-1 bg-white rounded-full text-red-500 cursor-pointer shadow-md"
                                                size={18}
                                                onClick={() =>
                                                    !loading &&
                                                    removeImage(
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                    )
                                }
                            )}

                            {imageSlots.length <
                                MAX_IMAGES && (
                                    <div className="relative w-24 h-24 bg-[#f3e6fa] rounded-md flex items-center justify-center">
                                        <FiPlus className="text-[#6C3483] text-xl" />

                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={
                                                handleFileUpload
                                            }
                                            disabled={loading}
                                        />
                                    </div>
                                )}
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm">
                            {errorMessage}
                        </p>
                    )}

                    {/* Property Type */}
                    <div>
                        <label className="font-medium">
                            Property Type
                        </label>

                        <select
                            value={formData.type}
                            onChange={handleTypeChange}
                            disabled={loading}
                            className="w-full mt-1 p-2 border border-[#6C3483] rounded-md outline-none"
                        >
                            <option value="pg">
                                PG
                            </option>
                            <option value="flat">
                                Flat
                            </option>
                        </select>
                    </div>

                    {/* Property Name */}
                    <div>
                        <label className="font-medium">
                            Property Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Property Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full mt-1 p-2 border border-[#6C3483] rounded-md outline-none"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="font-medium">
                            Address
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                            <input
                                type="text"
                                name="locality"
                                placeholder="Locality"
                                value={
                                    formData.address
                                        .locality
                                }
                                onChange={
                                    handleAddressChange
                                }
                                required
                                disabled={loading}
                                className="p-2 border border-[#6C3483] rounded-md outline-none"
                            />

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={
                                    formData.address.city
                                }
                                onChange={
                                    handleAddressChange
                                }
                                required
                                disabled={loading}
                                className="p-2 border border-[#6C3483] rounded-md outline-none"
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={
                                    formData.address.state
                                }
                                onChange={
                                    handleAddressChange
                                }
                                required
                                disabled={loading}
                                className="p-2 border border-[#6C3483] rounded-md outline-none"
                            />

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={
                                    formData.address.pincode
                                }
                                onChange={
                                    handleAddressChange
                                }
                                required
                                maxLength={6}
                                disabled={loading}
                                className="p-2 border border-[#6C3483] rounded-md outline-none"
                            />
                        </div>
                    </div>

                    {/* Map Location */}
                    <div>
                        <label className="font-medium">
                            Google Map Location
                        </label>

                        <input
                            type="url"
                            name="map_location"
                            placeholder="https://maps.google.com/?q=..."
                            value={
                                formData.map_location
                            }
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full mt-1 p-2 border border-[#6C3483] rounded-md outline-none"
                        />
                    </div>

                    {/* Gender - PG only */}
                    {formData.type === "pg" && (
                        <div>
                            <label className="font-medium">
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={
                                    formData.gender
                                }
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full mt-1 p-2 border border-[#6C3483] rounded-md outline-none"
                            >
                                <option value="male">
                                    Male
                                </option>
                                <option value="female">
                                    Female
                                </option>
                                <option value="any">
                                    Any
                                </option>
                            </select>
                        </div>
                    )}

                    {/* Pricing */}
                    <div>
                        <label className="font-medium">
                            {formData.type === "pg"
                                ? "Sharing Price"
                                : "BHK Price"}
                        </label>

                        <div className="flex flex-col gap-3 mt-2">
                            {formData.pricing.map(
                                (item, index) => (
                                    <div
                                        key={item.type}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-1/2 p-2 bg-[#f7eafd] rounded-md">
                                            {item.type}
                                        </div>

                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Price"
                                            value={
                                                item.price
                                            }
                                            onChange={(e) =>
                                                handlePricingChange(
                                                    index,
                                                    e.target
                                                        .value
                                                )
                                            }
                                            disabled={loading}
                                            className="w-1/2 p-2 border border-[#6C3483] rounded-md outline-none"
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Facilities */}
                    <div>
                        <label className="font-medium">
                            Facilities
                        </label>

                        <input
                            type="text"
                            placeholder="WiFi, AC, Parking, Washing Machine"
                            value={formData.facilities.join(
                                ", "
                            )}
                            onChange={(e) =>
                                handleArrayChange(
                                    "facilities",
                                    e.target.value
                                )
                            }
                            disabled={loading}
                            className="w-full mt-1 p-2 border border-[#6C3483] rounded-md outline-none"
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Separate multiple facilities
                            with commas.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <label className="font-medium">
                            Services
                        </label>

                        <input
                            type="text"
                            placeholder="Food, Housekeeping, CCTV Camera"
                            value={formData.services.join(
                                ", "
                            )}
                            onChange={(e) =>
                                handleArrayChange(
                                    "services",
                                    e.target.value
                                )
                            }
                            disabled={loading}
                            className="w-full mt-1 p-2 border border-[#6C3483] rounded-md outline-none"
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Separate multiple services
                            with commas.
                        </p>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="font-medium">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full mt-1 p-2 border border-[#6C3483] rounded-md outline-none"
                        >
                            <option value="available">
                                Available
                            </option>

                            <option value="not available">
                                Not Available
                            </option>
                        </select>
                    </div>

                    {/* Details */}
                    <div>
                        <label className="font-medium">
                            Property Details
                        </label>

                        <textarea
                            name="details"
                            rows="4"
                            placeholder="Write property details..."
                            value={formData.details}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full mt-1 p-2 border border-[#6C3483] rounded-md outline-none resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#6C3483] text-white rounded-md px-5 py-2 font-semibold hover:bg-[#8E44AD] transition disabled:opacity-50 flex justify-center"
                    >
                        {loading ? (
                            <Loader />
                        ) : isEditing ? (
                            "Update Property"
                        ) : (
                            "Save Property"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAndEditProperty;