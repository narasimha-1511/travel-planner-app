import React, { useState } from "react";

function TripForm({ addTrip }) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination && startDate && endDate) {
      addTrip({ destination, startDate, endDate });
      setDestination("");
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <h2>Add New Trip</h2>
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button type="submit">Add Trip</button>
    </form>
  );
}

export default TripForm;
