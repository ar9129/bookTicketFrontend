import React, { useState, useEffect } from "react";
import axios from "axios";
import ScreenForm from "./ScreenForm";

export default function Test() {
  const [dropdownValues, setDropdownValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [formData, setFormData] = useState({ cityID: 0, name: "" });
  const [showScreenForm, setShowScreenForm] = useState(false);
  const [theatreID, setTheatreID] = useState(0);

  useEffect(() => {
    // Fetch data from Spring Boot backend
    axios
      .get("http://localhost:5459/api/v1/get-city") // Adjust URL as per your setup
      .then((response) => {
        setDropdownValues(response.data); // Assuming response.data is an array of dropdown values
      })
      .catch((error) => {
        console.error("Error fetching dropdown values:", error);
      });
  }, []); // Empty dependency array to run effect only once

  const toggleScreenForm = () => {
    setShowScreenForm(!showScreenForm); // Toggle showSubForm state
  };

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({ ...formData, name: event.target.value });
    console.log(formData);
  };

  const handleChange2 = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
    setFormData({ ...formData, cityID: event.target.value });
    console.log(formData);
  };

  const handleClick = (event) => {
    event.preventDefault();
    // Handle form submission or further processing with selectedValue
    console.log("Selected value:", formData);
    axios
      .post("http://localhost:5459/api/v1/create-theatre", formData)
      .then((response) => {
        console.log(response.data);

        setFormData({ cityID: 0, name: "" });
        setTheatreID(response.data.id);
      })
      .catch((error) => {
        console.error("Error creating Thetare :" + error);
      });
    toggleScreenForm();
  };

  const handleSubmit = () => {
    console.log("Thank you for being partner🤩");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>City:</label>
        <select name="cityId" value={selectedValue} onChange={handleChange2}>
          <option value="">Select...</option>
          {dropdownValues.map((dropvalue) => (
            <option key={dropvalue.id} value={dropvalue.id}>
              {dropvalue.name}
            </option>
          ))}
          console.log("Value retrieved" ) ;
        </select>

        <br />
        <label>
          Theatre:
          <input name="name" type="text" onChange={handleChange}></input>
        </label>
        <button type="click" onClick={handleClick}>
          Save
        </button>
      </form>
      {showScreenForm && <ScreenForm theatreID={theatreID} />}
    </div>
  );
}
