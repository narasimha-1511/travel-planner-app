import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

function TripList() {
  const [trips, setTrips] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTrips = async () => {
      const tripsRef = collection(db, "trips");
      const q = query(tripsRef, where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedTrips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(fetchedTrips);
    };

    fetchTrips();
  }, [currentUser]);

  return (
    <div className="trip-list">
      <h2>Your Trips</h2>
      {trips.length === 0 ? (
        <p>No trips planned yet. Add a new trip to get started!</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <Link to={`/trip/${trip.id}`}>
                <h3>{trip.destination}</h3>
                <p>
                  {trip.startDate} - {trip.endDate}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/new-trip" className="add-trip-button">
        Add New Trip
      </Link>
    </div>
  );
}

export default TripList;
