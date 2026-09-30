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

const PropertyTable = ({
    properties,
    setOpen,
    setSelectedRoom,
    setIsEditing,
    setDeleteModalOpen,
    setRoomToDelete,
    setDeleteTitle,
    setSelectedProperty,
    setDetailsOpen,
}) => {
    return (
        <div className="bg-white rounded-md shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 bg-[#520075] rounded-t-md">
                <h2 className="text-xl font-semibold text-white">
                    All Properties
                </h2>

                <button
                    onClick={() => {
                        setSelectedRoom(null);
                        setIsEditing(false);
                        setOpen(true);
                    }}
                    className="bg-white text-[#520075] font-medium px-4 py-2 rounded-md hover:bg-[#f7eafd] transition cursor-pointer"
                >
                    Add New Property
                </button>
            </div>

            <div className="overflow-x-auto border border-[#6C3483]/30 box-border rounded-b-md">
                <TableContainer component={Paper} className="shadow-none">
                    <Table className="min-w-full divide-y divide-[#6C3483]/10 text-sm text-left">
                        <TableHead className="bg-[#6C3483]/10">
                            <TableRow>
                                <TableCell>Sl no.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {properties.map((property, index) => (
                                <TableRow
                                    key={property.id}
                                    className="cursor-pointer hover:bg-[#6C3483]/5 transition"
                                    onDoubleClick={() => {
                                        setSelectedProperty(property);
                                        setDetailsOpen(true);
                                    }}
                                >
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {property.name || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        {property.images?.length > 0 ? (
                                            <img
                                                src={property.images[0]}
                                                alt={property.name || "Property"}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                        ) : (
                                            <span className="text-gray-400 italic">
                                                No Image
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {property.address?.locality || "N/A"},{" "}
                                        {property.address?.city || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        {property.type
                                            ? property.type.toUpperCase()
                                            : "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        {property.status || "Available"}
                                    </TableCell>

                                    <TableCell>
                                        <button
                                            className="text-[#8E44AD] hover:text-[#520075] transition-colors p-2 cursor-pointer"
                                            onClick={() => {
                                                setSelectedRoom(property);
                                                setIsEditing(true);
                                                setOpen(true);
                                            }}
                                        >
                                            <FiEdit2 size={20} />
                                        </button>
                                    </TableCell>

                                    <TableCell>
                                        <button
                                            className="text-red-500 hover:text-red-700 transition-colors p-2 cursor-pointer"
                                            onClick={() => {
                                                setRoomToDelete(property);
                                                setDeleteModalOpen(true);
                                                setDeleteTitle("property");
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

export default PropertyTable;