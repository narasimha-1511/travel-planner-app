import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItineraryItem from "./ItineraryItem";
import Weather from "./Weather";
import Map from "./Map";
import PackingList from "./ PackingList";
import BudgetTracker from "./BudgetTracker";
import PhotoGallery from "./PhotoGallery";

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

  const updatePhotos = (newPhotos) => {
    const updatedTrip = { ...trip, photos: newPhotos };
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
    <div className="font-outfit w-[90%] sm:w-[68%] md:w-[58%] lg:w-[50%] lg2:w-[45%] custom-xl:w-[34%]">
      <button onClick={() => navigate("/")} className="font-bold border-[#FBFBEF] border-4 text-bold justify-center flex mx-auto rounded-custom-button bg-[#151E41] min-w-48 md:w-64 py-1 text-[#FBFBEF] hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] text-[24px] lg:text-[36px]">Back to Trips</button>
      <div className="bg-[#5A617E] border-[#FBFBEF] border-4 mt-5 text-[#FBFBEF] text-[24px] lg:text-[36px] p-5 rounded-custom-div">

        {isEditing ? (
          <>
            <div className="flex flex-col space-y-4">
              <input
                className="rounded-lg p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
                type="text"
                name="destination"
                value={trip.destination}
                onChange={handleChange}
              />
              <input
                className="rounded-lg p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleChange}
              />
              <input
                className="rounded-lg p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
                type="date"
                name="endDate"
                value={trip.endDate}
                onChange={handleChange}
              />
              <button onClick={handleSave} className="mt-3 font-bold border-[#FBFBEF] border-4 text-bold rounded-custom-button bg-[#151E41] min-w-36 md:w-40 py-1 text-[#FBFBEF] hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] text-[24px]">Save</button>
            </div>

          </>
        ) : (
          <>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">{trip.destination}</h2>
            <p className="pt-3 text-2xl lg:text-3xl">Start Date: {trip.startDate}</p>
            <p className="pt-3 text-2xl lg:text-3xl">End Date: {trip.endDate}</p>
            <button onClick={handleEdit} className="mt-3 font-bold border-[#FBFBEF] border-4 text-bold rounded-custom-button bg-[#151E41] min-w-36 md:w-40 py-1 text-[#FBFBEF] hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] text-[24px]">Edit</button>
          </>
        )}
      </div>
      <div className="bg-[#5A617E] border-[#FBFBEF] border-4 mt-5 text-[#FBFBEF] text-[24px] lg:text-[36px] p-5 rounded-custom-div">
        <Weather destination={trip.destination} />
      </div>

      <div className="bg-[#5A617E] border-[#FBFBEF] border-4 mt-5 text-[#FBFBEF] text-[24px] lg:text-[36px] p-5 rounded-custom-div">
        <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-3">Destination Map</h3>
        <Map destination={trip.destination} />
      </div>

      <div className="bg-[#5A617E] border-[#FBFBEF] border-4 mt-5 text-[#FBFBEF] text-[24px] lg:text-[36px] p-5 rounded-custom-div">
        <PackingList
          packingList={trip.packingList || []}
          updatePackingList={updatePackingList}
        />
      </div>

      <div className="bg-[#5A617E] border-[#FBFBEF] border-4 mt-5 text-[#FBFBEF] text-[24px] lg:text-[36px] p-5 rounded-custom-div">
        {isSettingBudget ? (
          <div className="set-budget">
            <input
              className="rounded-lg p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
              placeholder="Enter total budget"
            />
            <button onClick={handleSetBudget} className="my-3 font-bold border-[#FBFBEF] border-4 text-bold rounded-custom-button bg-[#151E41] min-w-40 md:w-48 py-1 text-[#FBFBEF] hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] text-[24px]">Set Budget</button>
          </div>
        ) : (
          <button onClick={() => setIsSettingBudget(true)} className="mr-5 my-3 font-bold border-[#FBFBEF] border-4 text-bold rounded-custom-button bg-[#151E41] min-w-48 md:w-52 py-1 text-[#FBFBEF] hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] text-[24px]">
            {trip.budget?.totalBudget ? "Update Budget" : "Set Budget"}
          </button>
        )}

        {trip.budget?.totalBudget && (
          <BudgetTracker budget={trip.budget} updateBudget={updateBudget} />
        )}
      </div>

      <div className="bg-[#5A617E] border-[#FBFBEF] border-4 mt-5 text-[#FBFBEF] p-5 rounded-custom-div">
        <PhotoGallery photos={trip.photos || []} updatePhotos={updatePhotos} />
      </div>

      <div className="bg-[#5A617E] border-[#FBFBEF] border-4 mt-5 text-[#FBFBEF] p-5 rounded-custom-div">
        <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-3">Itinerary</h3>
        <div>
          <input
          className="w-full rounded-lg mb-3 p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
            type="text"
            name="activity"
            value={newItem.activity}
            onChange={handleNewItemChange}
            placeholder="Activity"
          />
          <input
          className="w-full rounded-lg mb-3 p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
            type="date"
            name="date"
            value={newItem.date}
            onChange={handleNewItemChange}
          />
          <button onClick={addItineraryItem} className="w-full mt-4 font-bold border-[#FBFBEF] border-4 text-bold rounded-custom-button bg-[#151E41] py-1 text-[#FBFBEF] hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] text-[24px] lg:text-[36px]">Add Item</button>
        </div>
        <hr className="border-2 my-4 border-[#FBFBEF]"></hr>
        <ul>
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
    </div>
  );
}

export default TripDetails;
