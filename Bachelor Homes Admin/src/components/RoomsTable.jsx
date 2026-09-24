import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const RoomsTable = ({
    rooms,
    setOpen,
    setSelectedRoom,
    setIsEditing,
    setDeleteModalOpen,
    setRoomToDelete,
    setDeleteTitle
}) => {
    return (
        <div className="bg-white rounded-md shadow-md">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 bg-[#520075] rounded-t-md">
                <h2 className="text-xl font-semibold text-white">All Rooms</h2>
                <button
                    onClick={() => {
                        setSelectedRoom(null);
                        setIsEditing(false);
                        setOpen(true);
                    }}
                    className="bg-white text-[#520075] font-medium px-4 py-2 rounded-md hover:bg-[#f7eafd] transition cursor-pointer"
                >
                    Add New Room
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#6C3483]/30 box-border rounded-b-md">
                <TableContainer component={Paper} className="shadow-none">
                    <Table className="min-w-full divide-y divide-[#6C3483]/10 text-sm text-left">
                        <TableHead className="bg-[#6C3483]/10">
                            <TableRow>
                                <TableCell>Room ID</TableCell>
                                <TableCell>Images</TableCell>
                                <TableCell>Occupancy</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody className="divide-y divide-[#6C3483]/5">
                            {rooms.map((room) => (
                                <TableRow key={room.room_id} className="hover:bg-[#6C3483]/5 transition">
                                    <TableCell>{room.room_id}</TableCell>

                                    {/* Show first image only */}
                                    <TableCell>
                                        {room.images.length > 0 ? (
                                            <img
                                                src={room.images[0]}
                                                alt="room"
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        ) : (
                                            <span className="text-gray-400 italic">No Image</span>
                                        )}
                                    </TableCell>

                                    <TableCell>{room.occupancy}</TableCell>
                                    <TableCell>{room.location}</TableCell>
                                    <TableCell>{room.status}</TableCell>

                                    {/* ✅ Edit Room */}
                                    <TableCell>
                                        <button
                                            className="text-[#8E44AD] hover:text-[#520075] transition-colors p-2 cursor-pointer"
                                            onClick={() => {
                                                setSelectedRoom(room);
                                                setIsEditing(true);
                                                setOpen(true);
                                            }}
                                        >
                                            <FiEdit2 size={20} />
                                        </button>
                                    </TableCell>

                                    {/* ✅ Delete Room */}
                                    <TableCell>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-colors p-2 cursor-pointer"
                                            onClick={() => {
                                                setRoomToDelete(room);
                                                setDeleteModalOpen(true);
                                                setDeleteTitle('room');
                                            }}
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default RoomsTable;
