// import React, { useEffect, useState } from "react";
// import MovieCard from "./MovieCard";
// import { Movies } from "./Movies";
// import axios from "axios";
// import { MovieDescription } from "./MovieDescription";
// import { useNavigate } from "react-router-dom";

// const MoviePage = () => {
//   const filters = {
//     languages: ["English", "Hindi", "Kannada"],
//     genres: ["Action", "Drama"],
//     formats: ["2D", "3D"],
//   };

//   const [cities, setCities] = useState([]);
//   const [selectedValue, setSelectedValue] = useState("");
//   const [selectedName, setSelectedName] = useState("");
//   const [moviesData, setMoviesData] = useState([]);
//   const navigate = useNavigate();

//   const getCities = async (e) => {
//     try {
//       const response = await axios.get("http://localhost:5459/api/v1/get-city");
//       console.log("cities are {}", response.data);
//       setCities(response.data);
//     } catch (error) {
//       console.log("error while getting cities is {}", error);
//     }
//   };

//   const handleCity = (event) => {
//     event.preventDefault();
//     setSelectedValue(event.target.value);
//     setSelectedName(event.target.options[event.target.selectedIndex].text);
//     console.log("selected city", event.target.name);
//     console.log(selectedName);
//     axios
//       .get(`http://localhost:5459/api/v1/get-movies/${selectedName}`)
//       .then((response) => {
//         console.log(
//           "list of movies in city",
//           { selectedValue },
//           "is",
//           response.data
//         );
//         setMoviesData(response.data);
//         navigate(`/movies/${selectedName}`);
//       })
//       .catch((error) => {
//         console.log("error while fetching cities", error);
//       });
//   };

//   useEffect(() => {
//     getCities();
//   }, []);

//   return (
//     <div className="container mx-auto my-8">
//       <div className="flex flex-col md:flex-row">
//         <aside className="w-full md:w-1/4 p-4">
//           <div className="mb-4">
//             <div className="font-semibold mb-2  hover:getCities()">
//               Choose your City :
//               <select value={selectedValue} onChange={handleCity}>
//                 {cities.map((city, index) => (
//                   <option key={city.id} name={city.value} value={city.id}>
//                     {city.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* //                 <option value="platinum">Platinum</option>
// //                 <option value="gold">gold</option>
// //                 <option value="silver">Silver</option>
// //   */}

//             <h2 className="font-bold mb-2">Filters</h2>
//             {Object.keys(filters).map((filterKey) => (
//               <div key={filterKey}>
//                 <h3 className="font-semibold">
//                   {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
//                 </h3>
//                 {filters[filterKey].map((option) => (
//                   <label key={option} className="inline-flex items-center mt-3">
//                     <input
//                       type="checkbox"
//                       className="form-checkbox h-5 w-5 text-gray-600"
//                     />
//                     <span className="ml-2 text-gray-700">{option}</span>
//                   </label>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </aside>

//         <section className="w-full md:w-3/4 p-0">
//           <h2 className="font-bold mb-4">Movies in city</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {/* Add Explore Upcoming Movies button here */}
//             {/* Add Movies Grid/List here */}
//             {/* For each movie in movies array, map over them and create a MovieCard component */}
//             {/* <div className="bg-white rounded-lg overflow-hidden shadow-lg">
//             <img
//               className="w-1/4 h-30 object-cover object-center"
//               src="https://stat5.bollywoodhungama.in/wp-content/uploads/2016/03/Tere-Naam-306x393.jpg"
//               alt="tere naam"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-bold mb-2">Tere Naam</h2>
//               <p className="text-gray-700 text-sm mb-2">UA</p>
//               <p className="text-gray-600">Hindi, English</p>
//             </div>
//           </div> */}

//             {moviesData.map((movie, index) => (
//               <MovieCard
//                 town={selectedValue}
//                 title={movie.name}
//                 releaseDate={movie.duration}
//                 overview={movie.description}
//                 posterUrl={movie.url}
//                 genres={movie.genre}
//                 languagetoFormat={movie.languageFormat}
//                 formats={movie.format}
//                 rating={movie.rating}
//               />
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default MoviePage;

import React, { useEffect, useState, useCallback, useRef } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon, FunnelIcon } from "@heroicons/react/20/solid";
import GoogleLoginButton from "../Auth/GoogleLoginButton";
import GoogleSignIn from "../Auth/GoogleSignIn";
import { getData } from "../API-Integeration/API";

const username = "user";
const password = "sa";

const credentials = btoa(`${username}:${password}`);

const MoviePage = () => {
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("104");
  const [moviesData, setMoviesData] = useState([]);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [Button, setButton] = useState(false);

  const [cityName, setCityName] = useState("Nalanda");
  const [searchTerm, setSearchTerm] = useState("");
  const [signinPopup, setSigninPopup] = useState(false);
  const filters = {
    languages: ["English", "Hindi", "Kannada"],
    genres: ["Action", "Drama"],
    formats: ["2D", "3D"],
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = moviesData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCities = async () => {
    try {
      const response = await getData("get-city");
      setCities(response.data);
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  const getMovies = async () => {
    try {
      const response = await getData("get-movies/Nalanda");
      setMoviesData(response.data);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const openPopup = () => {
    setSigninPopup(true);
  };

  const closePopup = () => {
    setSigninPopup(false);
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleCity = (event) => {
    event.preventDefault();
    const selectedId = event.target.value;
    setSelectedCityId(selectedId);

    const selectedCity = cities.find(
      (city) => city.id === parseInt(selectedId)
    );
    setCityName(selectedCity.name);
    console.log(cityName);
    if (selectedCity) {
      axios
        .get(`http://localhost:5459/api/v1/get-movies/${selectedCity.name}`, {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        })
        .then((response) => {
          setMoviesData(response.data);
          console.log("fetched movies are", response.data);
          navigate(`/movies/${selectedCity.name}`);
        })
        .catch((error) => {
          console.log("Error fetching movies:", error);
        });
    }
  };

  // const showButton = (e) => {
  //   e.preventDefault();
  //   setButton(true);
  // };

  const callApi = async () => {
    window.location.href = "http://localhost:5459/";
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="flex justify-around p-2 bg-slate-400">
        <div>BookyourTicket By Aditya</div>
        <select
          value={selectedCityId}
          onChange={handleCity}
          className="cursor-pointer"
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="container mx-auto my-8">
        <div className="flex flex-row md:flex-row">
          {/* <aside className="w-full md:w-1/4 p-4">
            <div className="mb-4"></div>
          </aside> */}

          <div className="font-semibold mb-2 border"></div>

          <section className="w-full md:w-3/4 p-0">
            {/* <h2 className="font-bold mb-4">
            Movies in {selectedCityId && `City`}
          </h2> */}
            <div className=" flex">
              <div className="relative">
                <FunnelIcon
                  className="w-8 h-8 p-1 border cursor-pointer z-40"
                  onClick={handleFilter}
                />

                <div
                  className={`absolute bg-white p-6 rounded shadow-lg ${
                    showFilter ? "block" : "hidden"
                  }`}
                >
                  <div className="flex justify-between bg-slate-400 ">
                    <h2 className="font-bold mb-2">Filters</h2>
                    <XMarkIcon className="w-6 h-6 " onClick={handleFilter} />
                  </div>
                  {Object.keys(filters).map((filterKey) => (
                    <div key={filterKey}>
                      <h3 className="font-semibold">
                        {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                      </h3>
                      {filters[filterKey].map((option) => (
                        <label
                          key={option}
                          className="inline-flex items-center mt-3"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600"
                          />
                          <span className="ml-2 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <input
                className=" p-2 border rounded w-1/2"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search movie..."
              />
              <button
                className="bg-rose-600 mx-20 px-2 text-right rounded hover:bg-red-800"
                onClick={openPopup}
              >
                Sign in
              </button>
              {searchTerm && (
                <ul>
                  {filteredItems.map((item, index) => (
                    <li className="bg-gray-300 w-1/2 p-1 mt-0" key={index}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
              {(filteredItems ? filteredItems : moviesData).map((movie) => (
                <MovieCard
                  key={movie.id}
                  town={selectedCityId}
                  title={movie.name}
                  releaseDate={movie.duration}
                  overview={movie.description}
                  posterUrl={movie.url}
                  genres={movie.genre}
                  languagetoFormat={movie.languageFormat}
                  formats={movie.format}
                  rating={movie.rating}
                  cityName={cityName}
                />
              ))}
            </div>
          </section>
        </div>

        {signinPopup && (
          <div className="popup fixed inset-0 flex items-center justify-center   z-50 bg-black bg-opacity-50">
            <div className="bg-white  rounded-lg">
              <div className="flex justify-between align-middle text-center m-2">
                <div className="font-semibold m-4">Get Started</div>

                <XMarkIcon className="w-5 h-5" onClick={closePopup} />
              </div>

              <input
                // onClick={showButton}
                type="tel"
                placeholder="Continue with mobile number"
                className="border-b-black px-4 hover:bg-slate-200"
              ></input>

              <div className="px-4 m-4 border border-black hover:bg-slate-200">
                <Link to="/signin">sign in with google </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MoviePage;
