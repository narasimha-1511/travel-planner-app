import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItineraryItem from "./ItineraryItem";
import Weather from "./Weather";
import Map from "./Map";
import PackingList from "./PackingList";
import BudgetTracker from "./BudgetTracker";

function TripDetails({ trips, updateTrip }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({ activity: "", date: "" });

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

  const handleNewItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addItineraryItem = () => {
    if (newItem.activity && newItem.date) {
      const updatedTrip = {
        ...trip,
        itinerary: [...(trip.itinerary || []), { ...newItem, id: Date.now() }],
      };
      setTrip(updatedTrip);
      updateTrip(updatedTrip);
      setNewItem({ activity: "", date: "" });
    }
  };

  const deleteItineraryItem = (itemId) => {
    const updatedTrip = {
      ...trip,
      itinerary: trip.itinerary.filter((item) => item.id !== itemId),
    };
    setTrip(updatedTrip);
    updateTrip(updatedTrip);
  };

  const updatePackingList = (newPackingList) => {
    const updatedTrip = { ...trip, packingList: newPackingList };
    setTrip(updatedTrip);
    updateTrip(updatedTrip);
  };

  const updateBudget = (newBudget) => {
    const updatedTrip = { ...trip, budget: newBudget };
    setTrip(updatedTrip);
    updateTrip(updatedTrip);
  };

  const [isSettingBudget, setIsSettingBudget] = useState(false);
  const [totalBudget, setTotalBudget] = useState(
    trip?.budget?.totalBudget || 0
  );

  const handleSetBudget = () => {
    const updatedBudget = {
      ...trip.budget,
      totalBudget: parseFloat(totalBudget),
    };
    updateBudget(updatedBudget);
    setIsSettingBudget(false);
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

      <Weather destination={trip.destination} />

      <div className="map-container">
        <h3>Destination Map</h3>
        <Map destination={trip.destination} />
      </div>

      <PackingList
        packingList={trip.packingList || []}
        updatePackingList={updatePackingList}
      />

      {isSettingBudget ? (
        <div className="set-budget">
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            placeholder="Enter total budget"
          />
          <button onClick={handleSetBudget}>Set Budget</button>
        </div>
      ) : (
        <button onClick={() => setIsSettingBudget(true)}>
          {trip.budget?.totalBudget ? "Update Budget" : "Set Budget"}
        </button>
      )}

      {trip.budget?.totalBudget && (
        <BudgetTracker budget={trip.budget} updateBudget={updateBudget} />
      )}

      <h3>Itinerary</h3>
      <div className="itinerary-form">
        <input
          type="text"
          name="activity"
          value={newItem.activity}
          onChange={handleNewItemChange}
          placeholder="Activity"
        />
        <input
          type="date"
          name="date"
          value={newItem.date}
          onChange={handleNewItemChange}
        />
        <button onClick={addItineraryItem}>Add Item</button>
      </div>
      <ul className="itinerary-list">
        {trip.itinerary &&
          trip.itinerary.map((item) => (
            <ItineraryItem
              key={item.id}
              item={item}
              onDelete={() => deleteItineraryItem(item.id)}
            />
          ))}
      </ul>
    </div>
  );
}

export default TripDetails;
