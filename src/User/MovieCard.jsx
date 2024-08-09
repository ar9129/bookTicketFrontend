// src/components/MovieCard.js
import { StarIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieCard = ({
  town,
  title,
  releaseDate,
  overview,
  posterUrl,
  genres,
  languagetoFormat,
  formats,
  rating,
  cityName,
}) => {
  // let { city } = useParams();
  const navigate = useNavigate();

  function goToDescription() {
    navigate(`/movies/${cityName}/movie-description/${title}`, {
      state: {
        town: town,
        cityName: cityName, // Ensure to include town in state
        title: title,
        releaseDate: releaseDate,
        overview: overview,
        posterUrl: posterUrl,
        genres: genres,
        languagetoFormat: languagetoFormat,
        rating: rating,
        formats: formats,
      },
    });
  }

  return (
    <div
      className="bg-red-500
    -500 rounded-lg overflow-hidden shadow-lg "
    >
      <img
        onClick={goToDescription}
        className="w-full  h-100 object-cover object-center transition-transform duration-300 hover:scale-105"
        src={posterUrl}
        alt={title}
      />
      <div className=" bg-black flex justify-start  text-white  px-1">
        <StarIcon className="w-4 h-4" />
        <p className="text-gray-700 text-sm mb-2py-0.5   text-white ">
          {" "}
          {releaseDate}/5
        </p>
      </div>
      <div className="p-2">
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        {/* <h2 className="text-xl font-bold mb-2">{town}</h2> */}

        {/* <p className="text-gray-600">{formats}</p> */}
        {/* <p className="text-gray-600">{languagetoFormat}</p> */}
        {/* <p className="text-gray-600">{languages}</p> */}
        {/* <p className="text-gray-600">{genres}</p> */}
        {/* {Object.entries(languagetoFormat).map(([language, formats]) => (
          <div key={language}>
            <h3>{language}</h3>

            {formats.map((format, index) => (
              <span
                className="text-gray-600"
                key={format}
                type="checkbox"
                id={`${language}- ${formats}`}
                name={`${language}-formats`}
                value={format}
              >
                {format} {index !== genres.length - 1 ? "/ " : ""}
              </span>
            ))}
          </div>
        ))} */}

        <p>
          {genres.map((genre, index) => (
            <span className="text-gray-600" key={index}>
              {genre}
              {index !== genres.length - 1 ? "/ " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
