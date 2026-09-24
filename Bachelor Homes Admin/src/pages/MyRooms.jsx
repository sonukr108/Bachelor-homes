import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RoomsTable from '../components/RoomsTable';
import AddAndEditRoom from '../components/AddAndEditRoom';
import DeleteOwnerConfirmationModal from '../components/DeleteConfirmationModal';
import toast from "react-hot-toast";

const MyRooms = () => {
    const [open, setOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteTitle, setDeleteTitle] = useState();

    const [rooms, setRooms] = useState([
        {
            room_id: 101,
            images: [
                "https://images.pexels.com/photos/24293798/pexels-photo-24293798.png",
                "https://images.pexels.com/photos/24293798/pexels-photo-24293798.png",
                "https://images.pexels.com/photos/24293798/pexels-photo-24293798.png",
            ],
            occupancy: "Single",
            location: "Hazaribag, JH",
            status: "Available",
        },
        {
            room_id: 102,
            images: [
                "https://images.pexels.com/photos/24293798/pexels-photo-24293798.png",
                "https://images.pexels.com/photos/24293798/pexels-photo-24293798.png",
                "https://images.pexels.com/photos/24293798/pexels-photo-24293798.png",
            ],
            occupancy: "Double",
            location: "Hazaribag, JH",
            status: "Booked",
        },
    ]);

    // ✅ Add or Edit Room
    const handleSubmit = (formData) => {
        return new Promise((resolve) => {
            if (isEditing) {
                setRooms((prev) =>
                    prev.map((room) =>
                        room.room_id === selectedRoom.room_id ? { ...room, ...formData } : room
                    )
                );
            } else {
                const newRoom = { room_id: Date.now(), ...formData };
                setRooms((prev) => [...prev, newRoom]);
            }
            setOpen(false);
            setSelectedRoom(null);
            setIsEditing(false);
            resolve();
        });
    };

    // ✅ Delete Room with Toast
    const handleDelete = async (room) => {
        setIsDeleting(true);
        setTimeout(() => {
            setRooms((prev) => prev.filter((r) => r.room_id !== room.room_id));
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setRoomToDelete(null);
            toast.success("Room deleted successfully!");
        }, 800);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="bg-[#FAEEFF] flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-hidden py-5 px-2 md:px-4">

                    {/* ✅ Rooms Table */}
                    <RoomsTable
                        rooms={rooms}
                        setOpen={setOpen}
                        setSelectedRoom={setSelectedRoom}
                        setIsEditing={setIsEditing}
                        setDeleteModalOpen={setDeleteModalOpen}
                        setRoomToDelete={setRoomToDelete}
                        setDeleteTitle={setDeleteTitle}
                    />

                    {/* ✅ Add / Edit Room Modal */}
                    {open && (
                        <AddAndEditRoom
                            room={selectedRoom}        // ✅ FIXED
                            setOpen={setOpen}
                            isEditing={isEditing}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {/* ✅ Delete Confirmation Modal */}
                    {deleteModalOpen && (
                        <DeleteOwnerConfirmationModal
                            setDeleteModalOpen={setDeleteModalOpen}
                            setOwnerToDelete={setRoomToDelete}  // ✅ Can rename to setRoomToDelete inside modal
                            handleDelete={handleDelete}
                            ownerToDelete={roomToDelete}       // ✅ Pass correct state
                            isLoading={isDeleting}
                            deleteTitle={deleteTitle}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyRooms;
