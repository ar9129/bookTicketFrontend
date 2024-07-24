import { useEffect, useState } from "react";
import React from "react";
import QRcode from "./QRcode.png";

const PaymentStatus = () => {
  const [seconds, setSeconds] = useState(180); // 180 seconds = 3 minutes
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isActive && seconds > 0) {
      intervalId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000); // Decrease seconds by 1 every 1000 milliseconds (1 second)
    }

    return () => clearTimeout(intervalId);
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setIsActive(false);
      // Handle timer completion, e.g., show a message or trigger an action
      console.log("Timer completed!");
    }
  }, [seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(180); // Reset seconds to 180 (3 minutes)
    setIsActive(false); // Pause the timer after reset
  };

  // Format seconds into minutes and seconds for display
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex  justify-center align-middle h-full  w-1/3 m-auto">
      <div className="flex flex-col m-5 p-4">
        <div className="mt-4">
          Please wait while your payment is being processed{" "}
        </div>
        <div className="py-3 font-semibold">
          Scan the QR Code from One of the below mentioned Supported UPI apps.
          Pay Before It's time out!
        </div>
        <div className="border-t-2 border-black"></div>
        <div className="ml-32 p-2"> Time remaining</div>
        <div>
          <h1 className="ml-40 p-2">
            {minutes}:{remainingSeconds < 10 ? "0" : ""}
            {remainingSeconds}
          </h1>
        </div>
        <div className="border-t-2 border-black"></div>
        <img src={QRcode} alt="QRcode"></img>
        <div className="border-t-2 border-black mt-10"></div>
      </div>
    </div>
  );
};

export default PaymentStatus;
