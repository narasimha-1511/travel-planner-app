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
    <form onSubmit={handleSubmit} className="px-8 py-4 flex flex-col space-y-4 rounded-custom shadow-lg">
      <h2 className="text-center text-[#FBFBEF] font-bold text-[28px] lg:text-[40px]">Add New Trip</h2>
      <input
        className="rounded-lg p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        className="rounded-lg p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        className="rounded-lg p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button className="hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] font-bold border-[#FBFBEF] border-4 justify-center flex mx-auto rounded-custom-button bg-[#151E41] w-52 py-1 text-[#FBFBEF] text-[24px] lg:text-[36px]" type="submit">Confirm</button>
    </form>
  );
}

export default TripForm;
