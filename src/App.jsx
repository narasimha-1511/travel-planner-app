import React, { useState } from "react";
import TripList from "./components/TripList";
import TripForm from "./components/TripForm";
import "./App.css";

function App() {
  const [trips, setTrips] = useState([]);

  const addTrip = (newTrip) => {
    setTrips([...trips, { ...newTrip, id: Date.now() }]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Travel Planner</h1>
      </header>
      <main>
        <TripForm addTrip={addTrip} />
        <TripList trips={trips} />
      </main>
    </div>
  );
}

export default App;
