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

import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const filters = {
    languages: ["English", "Hindi", "Kannada"],
    genres: ["Action", "Drama"],
    formats: ["2D", "3D"],
  };

  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [moviesData, setMoviesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    try {
      const response = await axios.get("http://localhost:5459/api/v1/get-city");
      setCities(response.data);
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  const handleCity = (event) => {
    event.preventDefault();
    const selectedId = event.target.value;
    setSelectedCityId(selectedId);

    const selectedCity = cities.find(
      (city) => city.id === parseInt(selectedId)
    );
    if (selectedCity) {
      axios
        .get(`http://localhost:5459/api/v1/get-movies/${selectedCity.name}`)
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

  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 p-4">
          <div className="mb-4">
            <div className="font-semibold mb-2">
              Choose your City:
              <select value={selectedCityId} onChange={handleCity}>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="font-bold mb-2">Filters</h2>
            {Object.keys(filters).map((filterKey) => (
              <div key={filterKey}>
                <h3 className="font-semibold">
                  {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                </h3>
                {filters[filterKey].map((option) => (
                  <label key={option} className="inline-flex items-center mt-3">
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
        </aside>

        <section className="w-full md:w-3/4 p-0">
          <h2 className="font-bold mb-4">
            Movies in {selectedCityId && `City`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {moviesData.map((movie) => (
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
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoviePage;
