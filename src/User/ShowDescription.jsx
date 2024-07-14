import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const ShowDescription = () => {
  const location = useLocation();
  const [shows, setShows] = useState([]); // Initialize shows state with an empty array

  useEffect(() => {
    if (location.state) {
      const { title, language, format, cityName, town } = location.state;

      const getShows = async () => {
        try {
          if (title && language && format && cityName) {
            console.log("town is ", town);
            const response = await axios.get(
              `http://localhost:5459/api/v1/get-shows/${town}/${title}/${language}/${format}`
            );
            console.log("Fetched shows:", response.data);
            setShows(response.data); // Set shows state with the response data array
          }
        } catch (error) {
          console.log("Error fetching shows:", error);
        }
      };

      getShows();
    }
  }, [location.state]);

  if (!location.state) {
    return <div>Loading...</div>; // Handle case where location state is not yet available
  }

  return (
    <div>
      {shows.map((showMap) => (
        <div key={showMap.theatreName}>
          <span className="m-2">{showMap.theatreName}</span>
          {/* Convert show startTime to Date object and format */}
          {(() => {
            const date = new Date(showMap.show.startTime);
            const formattedTime = format(date, "h:mm aa");
            return (
              <>
                <span className="m-6">{formattedTime}</span>
                {/* Render other details of each show */}
                <p>{showMap.show.otherDetail}</p>
              </>
            );
          })()}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ShowDescription;
