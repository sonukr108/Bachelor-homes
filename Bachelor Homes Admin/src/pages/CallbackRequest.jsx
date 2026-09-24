import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CallbackTable from "../components/CallBackTable";
import DeleteOwnerConfirmationModal from "../components/DeleteConfirmationModal";
import toast from "react-hot-toast";

const CallbackRequest = () => {
    const [callbacklist, setCallbacklist] = useState([
        { user_name: "Sonu Kumar Verma", room_id: 101, phone: "+91 0123456789", message: "I want to know about check-in process in your PG.", status: "Pending" },
        { user_name: "Shubham Kumar Verma", room_id: 102, phone: "+91 0123456780", message: "Is food service available in the PG?", status: "Resolved" },
    ]);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [callbackToDelete, setCallbackToDelete] = useState(null);
    const [deleteTitle, setDeleteTitle] = useState("callback request");
    const [isDeleting, setIsDeleting] = useState(false);

    // ✅ Change callback request status
    const handleChangeStatus = (callback) => {
        setCallbacklist((prev) =>
            prev.map((c) =>
                c.room_id === callback.room_id && c.phone === callback.phone
                    ? { ...c, status: c.status === "Pending" ? "Resolved" : "Pending" }
                    : c
            )
        );
        toast.success(`Status changed to ${callback.status === "Pending" ? "Resolved" : "Pending"}!`);
    };

    // ✅ Delete callback request
    const handleDelete = async (callback) => {
        setIsDeleting(true);
        setTimeout(() => {
            setCallbacklist((prev) =>
                prev.filter((c) => !(c.room_id === callback.room_id && c.phone === callback.phone))
            );
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setCallbackToDelete(null);
            toast.success("Callback request deleted successfully!");
        }, 800);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="bg-[#FAEEFF] flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-hidden py-5 px-2 md:px-4">
                    <CallbackTable
                        callbacklist={callbacklist}
                        handleChangeStatus={handleChangeStatus}
                        setDeleteModalOpen={setDeleteModalOpen}
                        setCallbackToDelete={setCallbackToDelete}
                        setDeleteTitle={setDeleteTitle}
                    />

                    {/* ✅ Delete Confirmation Modal */}
                    {deleteModalOpen && (
                        <DeleteOwnerConfirmationModal
                            setDeleteModalOpen={setDeleteModalOpen}
                            setOwnerToDelete={setCallbackToDelete}
                            handleDelete={handleDelete}
                            ownerToDelete={callbackToDelete}
                            isLoading={isDeleting}
                            deleteTitle={deleteTitle}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CallbackRequest;
