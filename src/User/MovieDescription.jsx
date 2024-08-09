import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { StarIcon, XMarkIcon } from "@heroicons/react/20/solid";

export function MovieDescription() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure props from location.state
  const {
    title,
    cityName,
    town,
    posterUrl,
    genres,
    languagetoFormat,
    rating,
    overview,
  } = location.state;

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
    <div>
      <div className="bg-opacity-50  h-1/6 relative">
        <div
          className="backdrop-brightness-0 bg-gradient-to-r  bg-cover bg-center mx-auto w-1/2 h-1/6  flex flex-row overflow-hidden z-0"
          style={{
            backgroundImage:
              "url('https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/auron-mein-kahan-dum-tha-et00378240-1722408422.jpg')",
            filter: "brightness(70%)",
          }}
        >
          {/* <div className="object-none relative mx-auto ">
            <img
              className="w-screen h-1/5"
              src={posterUrl}
              alt="The dark night"
            />
          </div> */}
          <div className="flex flex-col align-middle m-6 relative z-20  ">
            <h1 className="font-bold text-white text-4xl ">{title}</h1>
            <div className="bg-gray-700 flex flex-row justify-around  align-middle p-4 w-60 my-4 h-14 rounded">
              <div className="flex items-center">
                <StarIcon className="text-red-400 h-6 w-6 mx-2" />
                <div className=" text-white">{rating}/10</div>
              </div>
              <button className="bg-gray-200 text-gray-950 font-semibold px-2 rounded">
                Rate Now
              </button>
            </div>
            <div className="bg-white rounded p-1 m-1">
              2D,3D,IMAX 2D,IMAX 3D
            </div>
            <div className="bg-white rounded p-1 m-1">
              Telugu,Hindi,Kannada,Malayalam,Tamil
            </div>
            <div className="p-2 text-white">3h 1m•Action,Sci-Fi,Thriller</div>
            <button
              onClick={openPopup}
              className="bg-red-500 p-2 w-3/4 my-5 text-white rounded-md"
            >
              Book Tickets
            </button>
          </div>
        </div>
        <div className="mx-4 sm:mx-8 lg:mx-28 xl:mx-96">
          <div className="font-semibold text-lg sm:text-xl lg:text-2xl xl:text-3xl">
            About the Movie
          </div>
          <div className="py-3 sm:py-5">{overview}</div>
          <hr className="sm:hidden" />{" "}
          {/* Hide the horizontal rule on small screens */}
          <div className="font-semibold text-lg sm:text-xl lg:text-2xl xl:text-3xl">
            Cast
          </div>
          <div className="flex justify-between text-center">
            {["Shreya", "Aditya", "Anamika", "Ragini"].map((name, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="rounded-full w-20 h-20 sm:w-32 sm:h-32 py-3 sm:py-5"
                  src="https://www.vhv.rs/dpng/d/408-4087530_person-icon-grey-grey-person-icon-png-transparent.png"
                  alt={name}
                />
                <div>{name}</div>
              </div>
            ))}
          </div>
          <hr className="sm:hidden" />
          <div className="font-semibold text-lg sm:text-xl lg:text-2xl xl:text-3xl my-3 sm:my-5">
            Top Reveiws
          </div>
          <div>
            <div className="flex justify-start">
              <div className="flex justify-start bg-red-400 text-center align-middle">
                <div>4</div>
                <StarIcon className="text-white h-4 w-4 mt-1 " />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && languagetoFormat && (
        <div className="popup fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white  rounded-lg">
            <div className="flex justify-between align-middle text-center m-2 ">
              <div className="font-semibold m-4">
                Select language and Format
              </div>
              <XMarkIcon className="w-5 h-5" onClick={closePopup} />
            </div>
            {Object.entries(languagetoFormat).map(([language, formats]) => (
              <div key={language}>
                <div className="bg-gray-200 p-1 m-1 rounded-md ">
                  {language}
                </div>
                <form>
                  {formats.map((format) => (
                    <div
                      key={format}
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    >
                      <button
                        onClick={handleTicket}
                        className="text-red-500 p-1 m-3 ml-4 rounded-xl border border-gray-300"
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
