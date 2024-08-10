import React from "react";

function ItineraryItem({ item, onDelete }) {
  return (
    <li className="itinerary-item">
      <span>
        {item.date}: {item.activity}
      </span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default ItineraryItem;
