import React, { useState, useEffect } from "react";
import axios from "axios";
import ScreenForm from "./ScreenForm";

export default function SeatForm(props) {
  const [data, setData] = useState(new Map());
  const [category, setCategory] = useState("");
  const [row, setRow] = useState("");
  const [seat, setSeat] = useState(0);

  const L = [];
  const ls = new Map();

  const sendtoScreenForm = () => {
    props.onData(data);
  };

  const handleChange4 = (event) => {
    setCategory(event.target.value);
  };
  const handleChange5 = (event) => {
    setRow(event.target.value);
  };
  const handleChange6 = (event) => {
    setSeat(event.target.value);
  };

  const handleSubmit4 = (event) => {
    for (let i = 0; i < seat; i++) {
      L.push(<li key={i}>Row+"i"</li>);
    }
    ls.set(category, L);
    setData(ls);
    sendtoScreenForm();
    console.log("seat and category created along with screen");
  };

  console.log("seat form submitted");

  return (
    <div>
      <h3>Seat-Form</h3>
      <form onSubmit={handleSubmit4}>
        {/* Form fields */}
        <label>
          Category
          <select name="Category" value={category} onChange={handleChange4}>
            <option value="platinum">Platinum</option>
            <option value="gold">gold</option>
            <option value="silver">Silver</option>
          </select>
        </label>
        <br />
        <label>
          Row Number:
          <input type="text" name="Row" onChange={handleChange5} />
        </label>
        <br />

        <label>
          Seat Number:
          <input type="text" name="SeatNo." onChange={handleChange6} />
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
