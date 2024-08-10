import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TripDetails({ trips, updateTrip }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const foundTrip = trips.find((t) => t.id === parseInt(id));
    if (foundTrip) {
      setTrip(foundTrip);
    }
  }, [id, trips]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTrip(trip);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  if (!trip) return <div>Trip not found</div>;

  return (
    <div className="trip-details">
      <button onClick={() => navigate("/")}>Back to Trips</button>
      {isEditing ? (
        <>
          <input
            type="text"
            name="destination"
            value={trip.destination}
            onChange={handleChange}
          />
          <input
            type="date"
            name="startDate"
            value={trip.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            value={trip.endDate}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h2>{trip.destination}</h2>
          <p>Start Date: {trip.startDate}</p>
          <p>End Date: {trip.endDate}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default TripDetails;
