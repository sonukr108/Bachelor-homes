import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PropertyTable from "../components/PropertyTable";
import AddAndEditProperty from "../components/AddAndEditProperty";
import DeleteOwnerConfirmationModal from "../components/DeleteConfirmationModal";
import PropertyDetails from "../components/PropertyDetails";
import toast from "react-hot-toast";
import api from "../middleware/authIntercepter";
import usePropertyStore from "../store/propertyStore";
import Cookies from 'js-cookie';

const MyProperties = () => {
    const [open, setOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] =
        useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteTitle, setDeleteTitle] = useState();

    const {
        properties,
        error,
        removeProperty
    } = usePropertyStore();

    const handleDelete = async (property) => {
        if (!property?.id) {
            toast.error("Property ID not found.");
            return;
        }

        setIsDeleting(true);

        try {
            const accessToken = Cookies.get("ownerAccessToken");

            if (!accessToken) {
                throw new Error(
                    "Access token not found. Please login again."
                );
            }

            const response = await api.delete(
                `/properties/${property.id - 1}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.data?.success) {
                throw new Error(
                    response.data?.message ||
                    "Failed to delete property."
                );
            }

            removeProperty(property.id);

            setDeleteModalOpen(false);
            setRoomToDelete(null);

            toast.success("Property deleted successfully!");
        } catch (error) {
            console.error(
                "Delete property failed:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to delete property.";

            toast.error(message);
        } finally {
            setIsDeleting(false);
        }
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-3">
                <p className="text-red-500">{error}</p>

                <button
                    onClick={() =>
                        usePropertyStore
                            .getState()
                            .clearProperties()
                    }
                    className="px-4 py-2 bg-[#520075] text-white rounded-md"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
            <Sidebar />

            <div className="bg-[#FAEEFF] flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-hidden py-5 px-2 md:px-4">

                    <PropertyTable
                        properties={properties}
                        setOpen={setOpen}
                        setSelectedRoom={setSelectedRoom}
                        setIsEditing={setIsEditing}
                        setDeleteModalOpen={
                            setDeleteModalOpen
                        }
                        setRoomToDelete={
                            setRoomToDelete
                        }
                        setDeleteTitle={
                            setDeleteTitle
                        }
                        setSelectedProperty={setSelectedProperty}
                        setDetailsOpen={setDetailsOpen}
                    />

                    {open && (
                        <AddAndEditProperty
                            room={selectedRoom}
                            setOpen={setOpen}
                            isEditing={isEditing}
                        />
                    )}

                    {deleteModalOpen && (
                        <DeleteOwnerConfirmationModal
                            setDeleteModalOpen={
                                setDeleteModalOpen
                            }
                            setOwnerToDelete={
                                setRoomToDelete
                            }
                            handleDelete={handleDelete}
                            ownerToDelete={
                                roomToDelete
                            }
                            isLoading={isDeleting}
                            deleteTitle={deleteTitle}
                        />
                    )}

                    {detailsOpen && (
                        <PropertyDetails
                            property={selectedProperty}
                            setOpen={setDetailsOpen}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProperties;