import { FiTrash2 } from "react-icons/fi";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const BookingTable = ({ bookings, handleChangeStatus, setDeleteModalOpen, setBookingToDelete, setDeleteTitle }) => {
    return (
        <div className="bg-white rounded-md shadow-md">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 bg-[#520075] rounded-t-md">
                <h2 className="text-xl font-semibold text-white">All Bookings</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#6C3483]/30 box-border rounded-b-md">
                <TableContainer component={Paper} className="shadow-none">
                    <Table className="min-w-full divide-y divide-[#6C3483]/10 text-sm text-left">
                        <TableHead className="bg-[#6C3483]/10">
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Room ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Change Status</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody className="divide-y divide-[#6C3483]/5">
                            {bookings.map((booking, index) => (
                                <TableRow key={index} className="hover:bg-[#6C3483]/5 transition">
                                    <TableCell>{booking.user_name}</TableCell>
                                    <TableCell>{booking.phone}</TableCell>
                                    <TableCell>{booking.room_id}</TableCell>
                                    <TableCell>{booking.status}</TableCell>

                                    {/* ✅ Change Status Button */}
                                    <TableCell>
                                        <button
                                            onClick={() => handleChangeStatus(booking)}
                                            className="bg-[#520075] text-white px-3 py-2 rounded-md hover:bg-[#8E44AD] transition cursor-pointer"
                                        >
                                            Change status
                                        </button>
                                    </TableCell>

                                    {/* ✅ Delete Booking */}
                                    <TableCell>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-colors p-2 cursor-pointer"
                                            onClick={() => {
                                                setBookingToDelete(booking);
                                                setDeleteModalOpen(true);
                                                setDeleteTitle("booking");
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

export default BookingTable;
