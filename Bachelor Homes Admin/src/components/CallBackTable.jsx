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

const CallbackTable = ({ callbacklist, handleChangeStatus, setDeleteModalOpen, setCallbackToDelete, setDeleteTitle }) => {
    return (
        <div className="bg-white rounded-md shadow-md">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 bg-[#520075] rounded-t-md">
                <h2 className="text-xl font-semibold text-white">All Callback Requests</h2>
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
                                <TableCell>Message</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Change Status</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody className="divide-y divide-[#6C3483]/5">
                            {callbacklist.map((callback, index) => (
                                <TableRow key={index} className="hover:bg-[#6C3483]/5 transition">
                                    <TableCell>{callback.user_name}</TableCell>
                                    <TableCell>{callback.phone}</TableCell>
                                    <TableCell>{callback.room_id}</TableCell>
                                    <TableCell>
                                        {callback.message.split(" ").length > 4
                                            ? callback.message.split(" ").slice(0, 4).join(" ") + "..."
                                            : callback.message}
                                    </TableCell>
                                    <TableCell>{callback.status}</TableCell>

                                    {/* ✅ Change Status Button */}
                                    <TableCell>
                                        <button
                                            onClick={() => handleChangeStatus(callback)}
                                            className="bg-[#520075] text-white px-3 py-2 rounded-md hover:bg-[#8E44AD] transition cursor-pointer"
                                        >
                                            Change status
                                        </button>
                                    </TableCell>

                                    {/* ✅ Delete Callback Request */}
                                    <TableCell>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-colors p-2 cursor-pointer"
                                            onClick={() => {
                                                setCallbackToDelete(callback);
                                                setDeleteModalOpen(true);
                                                setDeleteTitle("callback request");
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

export default CallbackTable;
