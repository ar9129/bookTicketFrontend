import axios from "axios";
import React, { useEffect } from "react";

const GoogleSignIn = () => {
  useEffect(() => {
    const initializeGsi = () => {
      window.google.accounts.id.initialize({
        client_id:
          "283032120974-2m9lbltifunqativerrstjkargslkdp7.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt(); // Show the One Tap UI
    };

    const handleCredentialResponse = async (response) => {
      if (response.error) {
        console.error("Login failed:", response.error);
        return;
      }
      const idToken = response.tokenId;

      // Send the ID token to your backend
      //   fetch('http://localhost:5459/api/auth/google', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ idToken }),
      //   })
      //       .then(response => response.json())
      //       .then(data => console.log('Success:', data))
      //       .catch(error => console.error('Error:', error));
      //     };

      axios
        .post(
          "http://localhost:5459/api/auth/google",
          { idToken },
          {
            withCredentials: true, // Include credentials (cookies) in the request
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Success:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    // Ensure the script has loaded before initialization
    if (window.google && window.google.accounts) {
      initializeGsi();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGsi;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div id="g_id_signin"></div>
    </div>
  );
};

export default GoogleSignIn;
