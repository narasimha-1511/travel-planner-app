import React from "react";

function DeleteTripConfirmation({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-bold">Confirm Deletion</h3>
        <p>Are you sure you want to delete this trip?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-4 bg-gray-300 text-black rounded-lg px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 text-white rounded-lg px-4 py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTripConfirmation;