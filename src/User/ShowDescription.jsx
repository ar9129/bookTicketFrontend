import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { getData } from "../API-Integeration/API";

const ShowDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState();

  const username = "user";
  const password = "sa";

  const credentials = btoa(`${username}:${password}`);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state) {
        const { title, language, format1, town } = location.state;
        console.log(location.state);
        try {
          console.log("Fetching shows for town:", town); // Log the town once
          const response = await getData(
            "get-shows/${town}/${title}/${language}/${format1}"
          );

          console.log("Fetched shows:", response.data); // Log fetched shows once
          setShows(response.data); // Set shows state with the fetched data
        } catch (error) {
          console.log("Error fetching shows:", error);
        }
      }
    };

    fetchData();
  }, [location.state]); // Only run useEffect when location.state changes

  const handleSeat = async (showId) => {
    try {
      if (location.state) {
        const { title, language, format1, cityName } = location.state;
        // setSelectedShow(showId);
        console.log("selectdShow is", { showId });
        navigate(
          `/buytickets/${title}/${language}/${format1}/${cityName}/movie-MT/seatLayout`,
          {
            state: {
              selectedShow: showId,
            },
          }
        );
      }
    } catch (error) {
      console.log("Error navigating to SeatLayout", error);
    }
  };

  return (
    <div>
      {shows.map((showMap) => (
        <div key={showMap.theatreName}>
          <span className="m-2">{showMap.theatreName}</span>
          {(() => {
            const date = new Date(showMap.show.startTime);
            const formattedTime = format(date, "h:mm aa");
            console.log(showMap.show.id);
            return (
              <>
                <button
                  className="m-6"
                  onClick={() => handleSeat(showMap.show.id)}
                >
                  {formattedTime}
                </button>
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
