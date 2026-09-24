import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BookingTable from "../components/BookingTable";
import DeleteOwnerConfirmationModal from "../components/DeleteConfirmationModal";
import toast from "react-hot-toast";

const Booking = () => {
    const [bookings, setBookings] = useState([
        { user_name: "Sonu Kumar Verma", room_id: 101, phone: "+91 0123456789", status: "checked-in" },
        { user_name: "Shubham Kumar Verma", room_id: 102, phone: "+91 0123456780", status: "checked-out" },
    ]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);
    const [deleteTitle, setDeleteTitle] = useState("booking");
    const [isDeleting, setIsDeleting] = useState(false);

    // ✅ Change booking status
    const handleChangeStatus = (booking) => {
        setBookings((prev) =>
            prev.map((b) =>
                b.room_id === booking.room_id
                    ? { ...b, status: b.status === "checked-in" ? "checked-out" : "checked-in" }
                    : b
            )
        );
        toast.success(`Booking status changed to ${booking.status === "checked-in" ? "checked-out" : "checked-in"}!`);
    };

    // ✅ Delete booking
    const handleDelete = async (booking) => {
        setIsDeleting(true);
        setTimeout(() => {
            setBookings((prev) => prev.filter((b) => b.room_id !== booking.room_id));
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setBookingToDelete(null);
            toast.success("Booking deleted successfully!");
        }, 800);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="bg-[#FAEEFF] flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-hidden py-5 px-2 md:px-4">
                    <BookingTable
                        bookings={bookings}
                        handleChangeStatus={handleChangeStatus}
                        setDeleteModalOpen={setDeleteModalOpen}
                        setBookingToDelete={setBookingToDelete}
                        setDeleteTitle={setDeleteTitle}
                    />

                    {/* ✅ Delete Confirmation Modal */}
                    {deleteModalOpen && (
                        <DeleteOwnerConfirmationModal
                            setDeleteModalOpen={setDeleteModalOpen}
                            setOwnerToDelete={setBookingToDelete}
                            handleDelete={handleDelete}
                            ownerToDelete={bookingToDelete}
                            isLoading={isDeleting}
                            deleteTitle={deleteTitle}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;
