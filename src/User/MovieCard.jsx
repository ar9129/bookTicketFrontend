// src/components/MovieCard.js
import React from "react";

const MovieCard = ({ title, releaseDate, overview, posterUrl }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img
        className="w-full h-100 object-cover object-center"
        src={posterUrl}
        alt={title}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm mb-2">{releaseDate}</p>
        <p className="text-gray-600">{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
