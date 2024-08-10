import React from "react";

function TripList({ trips }) {
  return (
    <div className="trip-list">
      <h2>Your Trips</h2>
      {trips.length === 0 ? (
        <p>No trips planned yet. Add a new trip to get started!</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <h3>{trip.destination}</h3>
              <p>
                {trip.startDate} - {trip.endDate}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TripList;
