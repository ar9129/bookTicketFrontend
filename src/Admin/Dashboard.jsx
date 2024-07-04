import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [inputValue, setInputValue] = useState(""); // State to hold current input value
  const [valueList, setValueList] = useState([]); // State to hold list of values
  const [showScreenForm, setShowScreenForm] = useState(false); // State to toggle sub-form visibility
  const [showSeatForm, setShowSeatForm] = useState(false);

  const toggleScreenForm = () => {
    setShowScreenForm(!showScreenForm); // Toggle showSubForm state
  };

  const toggleSeatForm = () => {
    setShowSeatForm(!showSeatForm); // Toggle showSubForm state
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    console.log(e.target.value);
  };

  // Function to handle input value change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle form submission
  const handleThaetre = (event) => {
    event.preventDefault();
    // if (inputValue.trim() !== '') {
    //   setValueList([...valueList, inputValue.trim()]); // Add input value to list
    //   setInputValue(''); // Clear input field
    // }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (inputValue.trim() !== '') {
    //   setValueList([...valueList, inputValue.trim()]); // Add input value to list
    //   setInputValue(''); // Clear input field
    //console.log(city);
    console.log("Main Form submitted");
    //  <ul>
    //   {valueList.map((value, index) => (
    //     console.log(<li key={index}>{value}</li>)
    //   ))}
    //   </ul>
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log("Screen Form submitted");
  };

  // useEffect(() => {
  //   // Fetch data from Spring Boot backend
  //   axios
  //     .get("/api/v1/get-city") // Adjust URL as per your setup
  //     .then((response) => {
  //       setDropdownValues(response.data); // Assuming response.data is an array of dropdown values
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching dropdown values:", error);
  //     }),
  //     [];
  // });

  return (
    <form onSubmit={handleSubmit}>
      <label>
        City:
        {/* <input type="text" value={city} onChange={handleChange} /> */}
      </label>
      <br />
      <label>
        {" "}
        Theatre:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Theatre Name"
        />
      </label>
      <button type="button" onClick={toggleScreenForm}>
        save{" "}
      </button>
      <br />
      {showScreenForm && (
        <div>
          <h3>Screen-Form</h3>
          <form onSubmit={handleSubmit2}>
            {/* Form fields */}
            <label>
              ScreenName:
              <input type="text" name="field1" />
            </label>
            <br />
            <button type="button" onClick={toggleSeatForm}>
              Save
            </button>
            <br />
          </form>
        </div>
      )}

      {showSeatForm && (
        <div>
          <h3>Seat-Form</h3>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <label>
              Category
              <select name="Category">
                <option value="platinum">Platinum</option>
                <option value="gold">gold</option>
                <option value="silver">Silver</option>
              </select>
            </label>
            <br />
            <label>
              Row Number:
              <input type="text" name="Row" />
            </label>
            <br />

            <label>
              Seat Number:
              <input type="text" name="SeatNo." />
            </label>

            <br />
          </form>
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
