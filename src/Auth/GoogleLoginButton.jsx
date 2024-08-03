// // src/components/GoogleLoginButton.js
// import React from "react";
// import { GoogleLogin } from "react-google-login";
// import axios from "axios";

// const GoogleLoginButton = () => {
//   const handleSuccess = async (response) => {
//     try {
//       const { tokenId } = response;
//       // Send the tokenId to the backend for verification and processing
//       const result = await axios.post("http://localhost:5459/api/auth/google", {
//         idToken: tokenId,
//       });
//       // Handle successful response from backend
//       console.log(result.data);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const handleFailure = (error) => {
//     console.error("Login failed:", error);
//   };

//   return (
//     <GoogleLogin
//       clientId="283032120974-2m9lbltifunqativerrstjkargslkdp7.apps.googleusercontent.com" // Replace with your Google Client ID
//       buttonText="Login with Google"
//       onSuccess={handleSuccess}
//       onFailure={handleFailure}
//       cookiePolicy={"single_host_origin"}
//     />
//   );
// };

// export default GoogleLoginButton;
