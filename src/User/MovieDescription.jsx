import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export function MovieDescription() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure props from location.state
  const { title, cityName, town, posterUrl, genres, languagetoFormat, rating } =
    location.state;

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  async function handleTicket(e) {
    e.preventDefault();
    const value = e.target.value;
    const [language, format1] = value.split("-");
    // try {
    //   console.log("Fetching shows for town:", town); // Log the town once
    //   const response = await axios.get(
    //     `http://localhost:5459/api/v1/get-shows/${town}/${title}/${language}/${format1}`
    //   );
    //   console.log("Fetched shows:", response.data); // Log fetched shows once
    //   setShows(response.data); // Set shows state with the fetched data
    // } catch (error) {
    //   console.log("Error fetching shows:", error);
    // }
    navigate(
      `/buytickets/${title}/${language}/${format1}/${cityName}/movie-MT`,
      {
        state: {
          title: title,
          cityName: cityName,
          language: language,
          format1: format1,
          town: town,
        },
      }
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-cover bg-no-repeat bg-gradient-to-r from-cyan-500 to-blue-500 bg-center w-screen h-96 m-4 flex flex-row overflow-hidden">
        <div className="object-fill">
          <img src={posterUrl} alt="The dark night" />
        </div>
        <div className="flex flex-col align-middle m-6">
          <h1 className="font-bold text-white text-4xl m-4">The dark night</h1>
          <div className="bg-gray-700 flex flex-row justify-normal p-4 w-60 m-4">
            <h2>{rating}/10</h2>
            <button className="bg-gray-200 text-gray-950 m-4">Rate Now</button>
          </div>
          <button
            onClick={openPopup}
            className="bg-red-500 px-4 py-2 text-white rounded-md"
          >
            Book Tickets
          </button>
        </div>
      </div>

      {showPopup && languagetoFormat && (
        <div className="popup fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            {Object.entries(languagetoFormat).map(([language, formats]) => (
              <div key={language}>
                <h3>{language}</h3>
                <form>
                  {formats.map((format) => (
                    <div
                      key={format}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                      <button
                        onClick={handleTicket}
                        className="bg-red-500 text-white m-2"
                        id={`${language}-${format}`}
                        name={`${language}-formats`}
                        value={`${language}-${format}`}
                      >
                        {format}
                      </button>
                    </div>
                  ))}
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
