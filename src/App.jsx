import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TripList from "./components/TripList";
import TripForm from "./components/TripForm";
import TripDetails from "./components/TripDetails";
import "./App.css";

function App() {
  const [trips, setTrips] = useState([]);

  const addTrip = (newTrip) => {
    setTrips([
      ...trips,
      { ...newTrip, id: Date.now(), itinerary: [], packingList: [] },
    ]);
  };

  const updateTrip = (updatedTrip) => {
    setTrips(
      trips.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip))
    );
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Travel Planner</h1>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TripForm addTrip={addTrip} />
                  <TripList trips={trips} />
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
