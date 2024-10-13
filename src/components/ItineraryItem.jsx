import React from "react";

function ItineraryItem({ item, onDelete }) {
  return (
    <li className="flex justify-between items-center mb-6">
      <span className="text-2xl md:text-3xl lg:text-4xl">
        {item.date}: {item.activity}
      </span>
      <button onClick={onDelete} className="font-bold text-2xl md:text-3xl lg:text-4xl hover:text-red-600">
        X
      </button>
    </li>
  );
}

export default ItineraryItem;