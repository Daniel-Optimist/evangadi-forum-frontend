import React, { useState, useEffect } from "react";
import axios from "../../Api/axiosConfig"; // Importing axios instance with base URL
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import classes from "./pwChange.module.css";
// import Layout from "../../components/Layout/Layout"; // Import Layout component

const PwChangeNewPw = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Ensure this state is defined for confirmation
  const [message, setMessage] = useState("");
 
  const { resetToken } = useParams(); // Grab reset token from the URL
  console.log("Reset token:", resetToken); // Added for debugging (comment out when done debugging)
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Function to validate the reset token
  const validateToken = async () => {
    try {
      const tokenResponse = await axios.post("/users/validateResetToken", {
        token: resetToken,
      });

      // Debugging response from token validation
      console.log("Token validation response:", tokenResponse);

      if (tokenResponse.data.msg === "Valid token") {
        setMessage("Token is valid. You can reset your password.");
      } else {
        setMessage("Invalid or expired token.");
        navigate("/"); // Redirect to landing page if token is invalid
      }
    } catch (error) {
      setMessage("Error validating token. Please try again.");
      navigate("/"); // Redirect to landing page if there was an error
    }
  };

  // Call token validation when the component mounts
  useEffect(() => {
    validateToken();
  }, [resetToken]);

  // Handle form submission for resetting the password
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Check if newPassword is not empty
    if (!newPassword || !confirmPassword) {
      setMessage(
        "Please enter both the new password and confirmation password."
      );
      return;
    }
    try {
      // Proceed with resetting the password if the token is valid
      const response = await axios.post(`/users/resetPassword/${resetToken}`, {
        newPassword,
        confirmPassword, // Send both newPassword and confirmPassword to the server
      });

      if (response.data.msg === "Password has been successfully reset") {
        setMessage("Password has been successfully reset.");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after successful password reset
      } else {
        setMessage("Error resetting password. Please try again.");
      }
    } catch (error) {
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
   
      <section className={classes["container"]}>
        <div className={classes["form"]}>
          <h2>Reset Your Password</h2>
          <p>Enter your new password below.</p>

          {/* Display message if any */}
          {message && <p className={classes["message"]}>{message}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password" // autoComplete="new-password" is used to disable autofill for the password field, which makes sense in a password reset context to ensure the user sets a new password manually.
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password" // Correct autocomplete for a new password field
            />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </section>
    
  );
};

export default PwChangeNewPw;

// import React, { useState, useEffect } from "react";
// import axios from "../../Api/axiosConfig"; // Importing axios instance with base URL
// import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
// import classes from "./pwChange.module.css";

// const PwChangeNewPw = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const { resetToken } = useParams(); // Grab reset token from the URL
//   console.log("Reset token:", resetToken); // added for debugging ( comment out when debugging is over)
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

//   // Function to validate the reset token
//   const validateToken = async () => {
//     try {
//       const tokenResponse = await axios.post("/users/validate-reset-token", {
//         token: resetToken,

//       });

//       if (tokenResponse.data.msg === "Valid token") {
//         setMessage("Token is valid. You can reset your password.");
//       } else {
//         setMessage("Invalid or expired token.");

//         navigate("/"); // Redirect to landing page if token is invalid (dkg: is this necessary)
//       }
//     } catch (error) {
//       setMessage("Error validating token. Please try again.");
//       navigate("/"); // Redirect to landing page if there was an error
//     }
//   };

//   // Call token validation when the component mounts
//   useEffect(() => {
//     validateToken();
//   }, [resetToken]);

//   // Handle form submission for resetting the password
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newPassword) {
//       setMessage("Please enter a new password.");
//       return;
//     }

//     try {
//       // Proceed with resetting the password if the token is valid
//       const response = await axios.post("/users/reset-password", {
//         token: resetToken,
//         newPassword,
//       });

//       if (response.data.msg === "Password has been successfully reset") {
//         setMessage("Password has been successfully reset.");
//         setTimeout(() => navigate("/login"), 2000); // Use navigate() instead of history.push
//       } else {
//         setMessage("Error resetting password. Please try again.");
//       }
//     } catch (error) {
//       setMessage("Error resetting password. Please try again.");
//     }
//   };

//   return (
//     <section className={classes["container"]}>
//       <div className={classes["form"]}>
//         <h2>Reset Your Password</h2>
//         <p>Enter your new password below.</p>

//         {/* Display message if any */}
//         {message && <p className={classes["message"]}>{message}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Reset Password</button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default PwChangeNewPw;
