import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import Loader from "./Loader";
import toast from "react-hot-toast";

const AddAndEditRoom = ({ room = {}, setOpen, isEditing, handleSubmit }) => {
    const [formData, setFormData] = useState({
        room_id: "",
        images: [],
        occupancy: "",
        location: "",
        status: "",
    });

    const [loading, setLoading] = useState(false);
    const [errormessage, setErrorMessage] = useState("");

    // ✅ Prefill data on edit
    useEffect(() => {
        if (isEditing && room) {
            setFormData({
                room_id: room.room_id || "",
                images: room.images || [],
                occupancy: room.occupancy || "",
                location: room.location || "",
                status: room.status || "",
            });
        } else {
            setFormData({ room_id: "", images: [], occupancy: "", location: "", status: "" });
        }
    }, [isEditing, room]);

    // ✅ Handle text/select inputs
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle file upload
    const handleFileUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                toast.error("Image size must be less than 4 MB");
                return;
            }
            const imageURL = URL.createObjectURL(file);
            const newImages = [...formData.images];
            newImages[index] = imageURL;
            setFormData((prev) => ({ ...prev, images: newImages }));
            // ✅ Clear error when at least one image exists
            if (newImages.length > 0) {
                setErrorMessage("");
            }
        }
    };

    // ✅ Remove image (error remains only if editing rule is violated)
    const removeImage = (index) => {
        if (isEditing && formData.images.length <= 1) {
            setErrorMessage("You must keep at least one image while editing.");
            return;
        }
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, images: updatedImages }));
    };

    // ✅ Submit form with validation
    const onSubmit = async (e) => {
        e.preventDefault();

        if (formData.images.length === 0) {
            setErrorMessage("Please upload at least one image.");
            return;
        }

        setLoading(true);
        try {
            await handleSubmit(formData);
            setOpen(false);
            toast.success(isEditing ? "Room updated successfully!" : "Room added successfully!");
        } catch (err) {
            console.error("Room submit failed:", err);
            toast.error("Failed to save room. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white text-[#6C3483] rounded-md p-6 w-[95%] md:w-[40%] shadow-xl">
                {/* ✅ Header */}
                <div className="flex items-center justify-between border-b border-[#6C3483] pb-3">
                    <p className="font-semibold text-xl">{isEditing ? "Edit Room" : "Add New Room"}</p>
                    <IoClose
                        className="cursor-pointer hover:text-[#8E44AD] transition"
                        onClick={() => setOpen(false)}
                        size={25}
                    />
                </div>

                {/* ✅ Form */}
                <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">

                    {/* ✅ Room Images */}
                    <div>
                        <label className="font-medium">Room Images</label>
                        <div className="flex gap-3 mt-2 flex-wrap">
                            {[...Array(4)].map((_, index) => {
                                const img = formData.images[index];
                                return (
                                    <div key={index} className="relative w-20 h-20 bg-[#f3e6fa] rounded-md flex items-center justify-center overflow-hidden">
                                        {img ? (
                                            <>
                                                <img src={img} alt="room" className="w-full h-full object-cover rounded-md" />
                                                <IoClose
                                                    className="absolute top-1 right-1 bg-white rounded-full text-red-500 cursor-pointer shadow-md"
                                                    size={18}
                                                    onClick={() => removeImage(index)}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <FiPlus className="text-[#6C3483] text-xl" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={(e) => handleFileUpload(e, index)}
                                                />
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {errormessage && <p className="text-red-500">{errormessage}</p>}
                    {/* ✅ Room ID */}
                    <input
                        type="text"
                        name="room_id"
                        placeholder="Room ID"
                        className="p-2 border border-[#6C3483] rounded-md outline-none"
                        value={formData.room_id}
                        onChange={onChange}
                        required
                        disabled={loading}
                    />

                    {/* ✅ Occupancy */}
                    <select
                        name="occupancy"
                        className="p-2 border border-[#6C3483] rounded-md outline-none"
                        value={formData.occupancy}
                        onChange={onChange}
                        required
                        disabled={loading}
                    >
                        <option value="">Select Occupancy</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Triple">Triple</option>
                    </select>

                    {/* ✅ Location */}
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        className="p-2 border border-[#6C3483] rounded-md outline-none"
                        value={formData.location}
                        onChange={onChange}
                        required
                        disabled={loading}
                    />

                    {/* ✅ Status */}
                    <select
                        name="status"
                        className="p-2 border border-[#6C3483] rounded-md outline-none"
                        value={formData.status}
                        onChange={onChange}
                        required
                        disabled={loading}
                    >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Booked">Booked</option>
                    </select>

                    {/* ✅ Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#6C3483] text-white rounded-md px-5 py-2 font-semibold hover:bg-[#8E44AD] transition disabled:opacity-50 flex justify-center"
                    >
                        {loading ? <Loader /> : isEditing ? "Update Room" : "Save Room"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAndEditRoom;
