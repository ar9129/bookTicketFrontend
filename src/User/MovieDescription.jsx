import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export function MovieDescription() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  // Destructure props from location.state
  const { title, posterUrl, genres, languagetoFormat, rating } = location.state;

  const openPopup = () => {
    console.log({ languagetoFormat });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-cover bg-no-repeat bg-gradient-to-r from-cyan-500 to-blue-500 bg-center w-screen h-96 m-4 flex flex-row overflow-hidden">
        <div className="object-fill">
          <img src={posterUrl} alt={title} />
        </div>
        <div className="flex flex-col align-middle m-6">
          <h1 className="font-bold text-white text-4xl m-4">{title}</h1>
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
            {/* <h3 className="text-xl font-bold mb-4">Select Languages</h3> */}
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
                        className="bg-red-500 text-white m-2 "
                        id={`${language}- ${formats}`}
                        name={`${language}-formats`}
                        value={format}
                      >
                        {format}
                      </button>
                      {/* <label htmlFor={`${language}- ${formats}`}>
                        {format}
                      </label> */}
                    </div>
                  ))}
                </form>
              </div>
            ))}{" "}
            {/* <h3 className="text-xl font-bold mt-6 mb-4">Select Formats</h3>
            <form>
              {formats.map((format) => (
                <div key={format}>
                  <input
                    type="checkbox"
                    id={format}
                    name="formats"
                    value={format}
                  />
                  <label htmlFor={format}>{format}</label>
                </div>
              ))}
            </form> */}
          </div>
        </div>
      )}
    </div>
  );
}
