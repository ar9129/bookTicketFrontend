import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SeatLayout = () => {
  const [seats, setSeats] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (location.state) {
        const { selectedShow } = location.state;
        console.log(location.state);
        try {
          console.log("Fetching shows for town:", selectedShow); // Log the town once
          const response = await axios.get(
            `http://localhost:5459/api/v1/get-seatLayout/${selectedShow}`
          );
          console.log("Fetched seats:", response.data); // Log fetched shows once
          setSeats(response.data); // Set shows state with the fetched data
        } catch (error) {
          console.log("Error fetching shows:", error);
        }
      }
    };

    fetchData();
  }, [location.state]);

  console.log(seats);

  function handleSelectedSeat() {}
  // Function to render seats in a 2D grid
  const renderSeatGrid = () => {
    // Collect all unique row identifiers (A, B, C, etc.)
    const rowIdentifiers = Array.from(
      new Set(seats.map((seat) => seat.seatNumber.charAt(0)))
    );

    console.log(rowIdentifiers);

    // Create rows array with each row containing seats of that row
    const rows = rowIdentifiers.map((rowIdentifier) => {
      // Filter seats for current row
      const rowSeats = seats.filter(
        (seat) => seat.seatNumber.charAt(0) === rowIdentifier
      );

      // Render seats for current row
      return (
        <div key={rowIdentifier} className="seat-row ">
          <div className="m-6">
            {rowIdentifier}
            {rowSeats.map((seat) => (
              <span
                onSelect={handleSelectedSeat}
                key={seat.id}
                //className={`seat ${seat.booked ? "booked" : ""}`}
                className="border-solid border-2 border-x-teal-500 pl-2 pr-2 pt-1 pb-1 m-2"
              >
                {seat.seatNumber.charAt(1)}
              </span>
            ))}
          </div>
        </div>
      );
    });

    return rows;
  };
  return <div>{renderSeatGrid()}</div>;
};

export default SeatLayout;
