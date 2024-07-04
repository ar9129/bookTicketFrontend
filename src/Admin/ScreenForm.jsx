import React, { useState, useEffect } from "react";
import axios from "axios";
import SeatForm from "./SeatForm";

export default function ScreenForm({ theatreID }) {
  const [showSeatForm, setShowSeatForm] = useState(false);
  const [ScreenForm, setScreenForm] = useState({
    name: "",
    theatreID: 0,
    categoryTOSeatNumber: {},
  });

  const handleSeatData = (data) => {
    setScreenForm({ ...setScreenForm, categoryTOSeatNumber: data });
    axios
      .post("http://localhost:5459/api/v1/create-screen", ScreenForm)
      .then((response) => {
        console.log("screen added : " + response.data);
        setScreenForm({ name: "", theatreID: 0, categoryTOSeatNumber: {} });
      })
      .catch((error) => console.error(error));
  };

  const toggleSeatForm = () => {
    setShowSeatForm(!showSeatForm); // Toggle showSubForm state
  };

  const handleChange3 = (event) => {
    setScreenForm({ ...setScreenForm, name: event.target.value });
  };

  const handleScreenClick = () => {
    setScreenForm({ ...ScreenForm, theatreID: theatreID });
    toggleSeatForm();
  };

  const handleSubmit2 = () => {
    console.log("screen form added");
  };

  return (
    <div>
      <h3>Screen-Form</h3>
      <form onSubmit={handleSubmit2}>
        {/* Form fields */}
        <label>
          ScreenName:
          <input type="text" name="field1" onChange={handleChange3} />
        </label>
        <br />
        <button type="button" onClick={handleScreenClick}>
          Save
        </button>
        <br />
      </form>

      {showSeatForm && <SeatForm onData={handleSeatData} />}
    </div>
  );
}
