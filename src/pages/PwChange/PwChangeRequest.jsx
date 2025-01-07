import React, { useState } from "react";
import axios from "../../Api/axiosConfig"; // Importing axios instance with base URL
import classes from "./pwChange.module.css";
import { Link } from "react-router-dom";

const PwChangeRequest = ({ switchToLogin, switchToRegister }) => {
  // State to manage email input and status messages
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // For displaying response messages
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false); // Loading state

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Start loading

    try {
      // const response = await axios.post("/api/requestPasswordReset", { email });
      // Send the request using the axios instance
      const response = await axios.post("/users/requestPasswordReset", {
        email,
      });
      // If request is successful, display a success message
      if (response.data.msg) {
        setMessage(response.data.msg);
        setMessageType("success");
        setEmail(""); // Reset email field after successful request
      } else {
        setMessage("Unexpected error. Please try again later.");
        setMessageType("error");
      }
    } catch (error) {
      // Handle errors (e.g., email not found or server issues)
      if (error.response && error.response.data.msg) {
        setMessage(error.response.data.msg);
        setMessageType("error");
      } else {
        setMessage("An error occurred. Please try again.");
        setMessageType("error");
      }
    }

    setLoading(false); // Stop loading
  };

  return (
    <section className={classes["container"]}>
      <div className={classes["form"]}>
        <h2> Request Password Reset</h2>
        <p>
          Enter your e-mail address below and we will send you an email with
          further instructions to reset your password.
        </p>

        {/* Display message if any */}
        {message && (
          // <p className={classes["message"]}>{message}</p>}

          <p
            className={`${classes["message"]} ${
              messageType === "success" ? classes.success : classes.error
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Request Password Reset"}
          </button>
        </form>

        <h6 onClick={switchToLogin}>Already have an account?</h6>
        <h6 onClick={switchToRegister}>Don't have an account?</h6>
      </div>
    </section>
  );
};

export default PwChangeRequest;









// import React, { useRef, useState } from "react";
// // import axios from "../../Api/axiosConfig";
// import classes from "./pwChange.module.css";
// import { Link } from "react-router-dom";


// const PwChange = ({ switchToLogin, switchToRegister }) => {
  
//   return (
//     <section className={classes["container"]}>
//       <div className={classes["form"]}>
//         <h2>Reset Your Password</h2>

//         <p>
//           Fill in your e-mail address below and we will send you an email with
//           further instructions
//         </p>

//          <form>
//           <input
//             //   ref={emailDom}
//             type="email"
//             placeholder="Enter your email"
//             required
//           />
//           <button type="submit">Reset Password</button>
//         </form>
//         <h6 onClick={switchToLogin}>Already have an account?</h6>
//         <h6 onClick={switchToRegister}>Don't have an account?</h6>
//       </div>
//     </section>
//   );
// };

// export default PwChange;
