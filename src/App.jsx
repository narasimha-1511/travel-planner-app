import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TripList from "./components/TripList";
import TripForm from "./components/TripForm";
import TripDetails from "./components/TripDetails";

function App() {
  const [trips, setTrips] = useState([]);

  const addTrip = (newTrip) => {
    setTrips([
      ...trips,
      {
        ...newTrip,
        id: Date.now(),
        itinerary: [],
        packingList: [],
        budget: { totalBudget: 0, expenses: [] },
        photos: [],
      },
    ]);
  };

  const updateTrip = (updatedTrip) => {
    setTrips(
      trips.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip))
    );
  };

  return (
    <Router>
      <div className="pb-10 flex flex-col min-h-screen items-center justify-center bg-[url('assets/Map.svg')] bg-cover bg-fixed">
        <header className="text-[#FBFBEF] pt-10 pb-10 sm:pb-5 sm:pt-5 text-center flex w-full justify-center content-center items-center mx-auto">
          <Link to="/">
            <img src="TravelLogo.png" alt="Travel Logo" className="h-auto w-80" />
          </Link>
        </header>
        <main className="flex-grow flex flex-col items-center pt-5 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="bg-[#5A617E] border-white border-4 rounded-custom-div font-outfit w-[90%] sm:w-[68%] md:w-[58%] lg:w-[50%] lg2:w-[45%] custom-xl:w-[34%] shadow-lg">
                    <TripForm addTrip={addTrip} />
                  </div>
                  <div className="bg-[#5A617E] border-white border-4 rounded-custom-div font-outfit w-[90%] sm:w-[68%] md:w-[58%] lg:w-[50%] lg2:w-[45%] custom-xl:w-[34%] shadow-lg mt-5">
                    <TripList trips={trips} />
                  </div>
                </>
              }
            />
            <Route
              path="/trip/:id"
              element={<TripDetails trips={trips} updateTrip={updateTrip} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;