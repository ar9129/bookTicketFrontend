import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SeatLayout = () => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [payPrice, setPayPrice] = useState(0);
  let totalPrice = 0;

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

  function handleSelectedSeat(seat) {
    console.log("seat is", seat);
    const newSelectedseats = new Set(selectedSeats);
    if (newSelectedseats.has(seat)) {
      newSelectedseats.delete(seat);
    } else {
      newSelectedseats.add(seat);
    }
    console.log(newSelectedseats);

    setSelectedSeats(newSelectedseats);
    const selectedSeatsArray = Array.from(newSelectedseats);
    selectedSeatsArray.map((selectedSeat) => {
      totalPrice = totalPrice + selectedSeat.price;
      console.log(selectedSeat.reserved);
    });

    setPayPrice(totalPrice);
  }

  async function handlePayment() {
    const selectedSeatsArray = Array.from(selectedSeats);
    for (const selectedSeat of selectedSeatsArray) {
      const response = await axios.post(
        `http://localhost:5459/api/v1/reserve-seat/${selectedSeat.id}`
      );
      console.log(response);
      console.log(`seat reserved ${selectedSeat.id} is ${response.data}`);
      navigate(`/Payment`, {
        state: {
          etk: "N",
          mtk: "Y",
          reload: true,
        },
      });
    }
  }

  const handleReservedSeat = () => {
    console.log("Seat is reserved");
  };
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
            {rowSeats.map((seat) => {
              const isselected = selectedSeats.has(seat);
              return (
                <span
                  onClick={() =>
                    // handleSelectedSeat(seat.reserved ? null : seat)
                    seat.reserved
                      ? handleReservedSeat()
                      : handleSelectedSeat(seat)
                  }
                  key={seat.id}
                  //className={`seat ${seat.booked ? "booked" : ""}`}
                  className={`border-solid border-2 pl-2 pr-2 pt-1 pb-1 m-2 ${
                    isselected ? "bg-teal-700" : "border-teal-500"
                  }   ${seat.reserved ? "bg-teal-700" : "border-teal-500"}`}
                >
                  {seat.seatNumber.charAt(1)}
                </span>
              );
            })}
          </div>
        </div>
      );
    });

    return rows;
  };
  return (
    <>
      <div>{renderSeatGrid()}</div>
      <button
        className="bg-red-600 ml-8 pl-20 pr-20 pt-4 pb-4 text-white font-sans font-semibold"
        onClick={() => handlePayment()}
      >
        Pay{payPrice}
      </button>
    </>
  );
};

export default SeatLayout;
