import { IoClose } from "react-icons/io5";
import Loader from '../components/Loader';

const DeleteOwnerConfirmationModal = ({
  setDeleteModalOpen,
  setOwnerToDelete,
  handleDelete,
  ownerToDelete,
  isLoading,
  deleteTitle
}) => (
  <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white text-[#6C3483] text-lg rounded-md p-6 w-[98%] md:w-[400px] flex flex-col gap-4 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#6C3483] pb-3">
        <p className="font-semibold text-xl">Confirm Delete</p>
        <IoClose
          className="cursor-pointer hover:text-[#8E44AD] transition-colors"
          onClick={() => {
            setDeleteModalOpen(false);
            setOwnerToDelete(null);
          }}
          size={25}
        />
      </div>

      {/* Body */}
      <p className="text-gray-600">
        Are you sure you want to delete this <span className="font-semibold">{deleteTitle}</span>?  
        This action cannot be undone.
      </p>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-2">
        <button
          className="px-4 py-2 border-2 text-sm border-[#6C3483] text-[#6C3483] rounded-md hover:bg-gray-50 transition-colors"
          onClick={() => {
            setDeleteModalOpen(false);
            setOwnerToDelete(null);
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-[#6C3483] text-sm text-white rounded-md hover:bg-[#8E44AD] transition-colors"
          onClick={() => handleDelete(ownerToDelete)}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : `Delete ${deleteTitle}`}
        </button>
      </div>
    </div>
  </div>
);

export default DeleteOwnerConfirmationModal;
