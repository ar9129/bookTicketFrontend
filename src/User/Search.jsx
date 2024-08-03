import React, { useState } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Fig",
    "Grape",
    "Kiwi",
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
