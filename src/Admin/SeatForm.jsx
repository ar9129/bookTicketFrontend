import React, { useState, useEffect } from "react";

export default function SeatForm(props) {
  const [data, setData] = useState(new Map());
  const [category, setCategory] = useState("");
  const [row, setRow] = useState("");
  const [seat, setSeat] = useState("");

  // const x = {
  //   gold: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11"],
  // };

  // const y = {
  //   Silver: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8"],
  // };

  const [categoryToSeatNumbers, setCategoryToSeatNumbers] = useState({});

  // useEffect(() => {
  //   // Simulate fetching data from an API
  //   setCategoryToSeatNumbers(y); // Simulate 2 seconds delay
  //   console.log("categoryToSeatNumbers", categoryToSeatNumbers);
  // }, []);

  // const L = [];
  // const ls = new Map();

  const sendtoScreenForm = () => {
    props.onData(categoryToSeatNumbers);
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

  // const handleSubmit4 = (event) => {
  //   console.log(seat);
  //   for (let i = 0; i < seat; i++) {
  //     L.push(<li key={i}>Row{i}</li>);
  //   }
  //   ls.set(category, L);
  //   console.log(L);
  //   setData(ls);
  //   console.log(data);
  //   console.log(ls);
  //   console.log("screen form calling");
  //   sendtoScreenForm();
  //   console.log("seat and category created along with screen");
  //   <h2>Screen form called</h2>;
  // };

  const handleSubmit4 = (event) => {
    event.preventDefault(); // Prevent default form submission

    // const rows = [];
    // for (let i = 0; i < seat; i++) {
    //   rows.push(`Row${i}`); // Push row numbers as strings
    // }
    // console.log(rows);
    // const updatedData = new Map(data); // Copy current state of data
    // updatedData.set(category, rows); // Set new category with rows

    // setData(updatedData);
    // console.log(data);
    // console.log(updatedData); // Update state with new data
    // sendtoScreenForm(); // Send updated data to parent component

    // console.log("Seat and category data created along with screen");
    const seatNumber = parseInt(seat);
    const rows = [];
    for (let i = 1; i <= seatNumber; i++) {
      rows.push(`Row${i}`);
    }
    console.log("rows", rows);

    console.log("category", category);
    console.log("row", row);
    console.log("seat", seat);
    console.log("categoryToSeatNumbers:", categoryToSeatNumbers);

    // Update categoryToSeatNumbers state
    setCategoryToSeatNumbers((prevState) => ({
      ...prevState,
      [category]: rows,
    }));

    console.log("categoryToSeatNumbers:", categoryToSeatNumbers);
    console.log(JSON.stringify(categoryToSeatNumbers));
    // Clear input fields after submission

    const dataToSend = Object.keys(categoryToSeatNumbers).reduce(
      (acc, category) => {
        acc[category] = categoryToSeatNumbers[category];
        return acc;
      },
      {}
    );

    console.log("dataTosend", dataToSend);

    sendtoScreenForm();
    setCategory("");
    setRow("");
    setSeat("");
  };

  // console.log("seat form submitted");

  return (
    <div>
      <h3>Seat-Form</h3>
      <form>
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
        <button type="button" onClick={handleSubmit4}>
          Submit
        </button>
      </form>
    </div>
  );
}
