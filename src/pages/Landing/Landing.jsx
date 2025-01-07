// original landing 
import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import classes from "./landing.module.css";
import { Link } from "react-router-dom";
// import PwChange from "../PwChange/PwChange";
import PwChangeRequest from "../PwChange/PwChangeRequest";

const Landing = () => {
  // State to track which form to show (Login, Register, or PasswordReset)
  const [currentForm, setCurrentForm] = useState("login"); // Default form is login

  // State to track the current form
  const [animationDirection, setAnimationDirection] = useState("");

  // Track reset token state
  const [resetToken, setResetToken] = useState(null); // This will hold the reset token after the user submits the reset password request

  const [confirmPassword, setConfirmPassword] = useState(""); // Store confirm password input
  // Function to switch to login form
  const switchToLogin = () => {
    setAnimationDirection("slide-in-left");
    setTimeout(() => setCurrentForm("login"), 300);
  };

  // Function to switch to register form
  const switchToRegister = () => {
    setAnimationDirection("slide-in-right");
    setTimeout(() => setCurrentForm("register"), 300);
  };

  // Function to switch to password reset form
  const switchToPasswordReset = () => {
    setAnimationDirection("slide-in-left");
    setTimeout(() => setCurrentForm("passwordReset"), 300);
  };

  // Function to handle the password reset request and set the token
  const handlePasswordReset = async (email) => {
    // Simulating an API request for password reset (replace with actual backend call)
    try {
      // Replace with actual API call that generates and returns a reset token
      const response = await axios.post("/users/requestPasswordReset", {
        email,
      });
      setResetToken(response.data.token); // Set the reset token after successful request
    } catch (error) {
      console.error("Error during password reset request:", error);
    }
  };

  // Reset password logic with token
  const resetPassword = async () => {
    try {
      // Make the API call to reset the password using the token
      const response = await axios.post(`/users/resetPassword/${resetToken}`, {
        newPassword,
        confirmPassword,
      });

      // Clear the reset token after successful password reset
      setResetToken(null);

      // Optionally, log out the user by clearing the JWT token from localStorage
      localStorage.removeItem("token");

      // Optionally, redirect the user after password reset
      // e.g., window.location.href = '/login'; // or navigate to login page

      console.log(response.data.msg); // Display the success message
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className={classes["main__wrapper"]}>
      <main className={classes["main__container"]}>
        <div className={classes["form-container"]}>
          <div
            className={`${classes["form-wrapper"]} ${classes[animationDirection]}`}
          >
            {currentForm === "login" && (
              <Login
                switchToRegister={switchToRegister}
                switchToPasswordReset={switchToPasswordReset}
              />
            )}
            {currentForm === "register" && (
              <Register switchToLogin={switchToLogin} />
            )}
            {currentForm === "passwordReset" && (
              <PwChangeRequest
                switchToLogin={switchToLogin}
                switchToRegister={switchToRegister}
                handlePasswordReset={handlePasswordReset}
              />
            )}
          </div>
        </div>

        {/* Conditionally render the reset password link if resetToken is available */}
        {resetToken && (
          <div>
            <h3>If you have received a reset link, click below:</h3>
            <Link to={`/resetPassword/${resetToken}`}>Reset your password</Link>
          </div>
        )}

        <div className={classes.info}>
          <h4>About</h4>
          <h1>Evangadi Networks Q & A</h1>
          <p>
            No matter what stage of life you are in, whether you are just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button>
            <Link to={"/howItWorks"}>HOW IT WORKS </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Landing;


// import React, { useState } from "react";
// import Login from "../Login/Login";
// import Register from "../Register/Register";
// import classes from "./landing.module.css";
// import { Link } from "react-router-dom";
// // import PwChange from "../PwChange/PwChange";
// import PwChangeRequest from "../PwChange/PwChangeRequest";

// const Landing = () => {
//   // State to track which form to show (Login, Register, or PasswordReset)
//   const [currentForm, setCurrentForm] = useState("login"); // Default form is login

//   // State to track the current form
//   const [animationDirection, setAnimationDirection] = useState("");

//   // Function to switch to login form
//   const switchToLogin = () => {
//     setAnimationDirection("slide-in-left");
//     setTimeout(() => setCurrentForm("login"), 300);
//   };

//   // Function to switch to register form
//   const switchToRegister = () => {
//     setAnimationDirection("slide-in-right");
//     setTimeout(() => setCurrentForm("register"), 300);
//   };

//   // Function to switch to password reset form
//   const switchToPasswordReset = () => {
//     setAnimationDirection("slide-in-left");
//     setTimeout(() => setCurrentForm("passwordReset"), 300);
//   };

//   return (
//     <div className={classes["main__wrapper"]}>
//       <main className={classes["main__container"]}>
//         <div className={classes["form-container"]}>
//           <div
//             className={`${classes["form-wrapper"]} ${classes[animationDirection]}`}
//           >
//             {currentForm === "login" && (
//               <Login
//                 switchToRegister={switchToRegister}
//                 switchToPasswordReset={switchToPasswordReset}
//               />
//             )}
//             {currentForm === "register" && (
//               <Register switchToLogin={switchToLogin} />
//             )}
//             {currentForm === "passwordReset" && (
//               <PwChangeRequest
//                 switchToLogin={switchToLogin}
//                 switchToRegister={switchToRegister}
//               />
//             )}
//           </div>
//         </div>

//         <div className={classes.info}>
//           <h4>About</h4>
//           <h1>Evangadi Networks Q & A</h1>
//           <p>
//             No matter what stage of life you are in, whether you are just
//             starting elementary school or being promoted to CEO of a Fortune 500
//             company, you have much to offer to those who are trying to follow in
//             your footsteps.
//           </p>
//           <p>
//             Whether you are willing to share your knowledge or you are just
//             looking to meet mentors of your own, please start by joining the
//             network here.
//           </p>
//           <button>
//             <Link to={"/howItWorks"}>HOW IT WORKS </Link>
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Landing;





// import React, { useState } from "react";
// import Login from "../Login/Login";
// import Register from "../Register/Register";
// import classes from "./landing.module.css";
// import { Link } from "react-router-dom";

// import PwChangeRequest from "../PwChange/PwChangeRequest";
// import PwChangeNewPw from "../PwChange/PwChangeNewPw";

// const Landing = () => {
//   // State to track which form to show (Login, Register, or PasswordReset)
//   const [currentForm, setCurrentForm] = useState("login"); // Default form is login

//   // State to track animationDirection; it manages the direction of the sliding animation (either "slide-in-left" or "slide-in-right").

//   const [animationDirection, setAnimationDirection] = useState("");

//   const [resetStep, setResetStep] = useState("pwChangeRequest"); // New state for password reset step; by default it is request

//   // Function to switch to login form
//   const switchToLogin = () => {
//     setAnimationDirection("slide-in-left");
//     setTimeout(() => setCurrentForm("login"), 300); //setTimeout for a small delay (300ms) to ensure animation plays before switching the form
//   };

//   // Function to switch to register form
//   const switchToRegister = () => {
//     setAnimationDirection("slide-in-right");
//     setTimeout(() => setCurrentForm("register"), 300);
//   };

//   // Function to switch to password reset request form
//   const switchToPwResetRequest = () => {
//     setAnimationDirection("slide-in-left");
//     setTimeout(() => {
//       setCurrentForm("passwordChange");
//       setResetStep("pwChangeRequest"); // Show the password reset request form
//     }, 300);
//   };

//   // Function to switch to password reset new password form
//   const switchToPwResetNewPw = () => {
//     setAnimationDirection("slide-in-right");
//     setTimeout(() => {
//       setResetStep("pwChangeNewPw"); // Show the new password form
//     }, 300);
//   };

//   return (
//     <div className={classes["main__wrapper"]}>
//       <main className={classes["main__container"]}>
//         <div className={classes["form-container"]}>
//           <div
//             className={`${classes["form-wrapper"]} ${classes[animationDirection]}`}
//           >
//             {currentForm === "login" && (
//               <Login
//                 switchToRegister={switchToRegister}
//                 switchToPwResetRequest={switchToPwResetRequest}
//               />
//             )}
//             {currentForm === "register" && (
//               <Register switchToLogin={switchToLogin} />
//             )}

//             {currentForm === "passwordChange" &&
//               resetStep === "pwChangeRequest" && (
//                 <PwChangeRequest
//                   switchToLogin={switchToLogin}
//                   switchToRegister={switchToRegister}
//                   // switchToPwResetNewPw={switchToPwResetNewPw}  //user won't be able to invoke switchToPwResetNewPw directly from the PwChangeRequest form. so not needed ; switchToPwResetNewPw function is to be called after the user clicks on the confirmation link in the email
//                 />
//               )}
//             {currentForm === "passwordChange" &&
//               resetStep === "pwChangeNewPw" && (
//                 <PwChangeNewPw switchToLogin={switchToLogin} />
//               )}
//           </div>
//         </div>

//         <div className={classes.info}>
//           <h4>About</h4>
//           <h1>Evangadi Networks Q & A</h1>
//           <p>
//             No matter what stage of life you are in, whether you are just
//             starting elementary school or being promoted to CEO of a Fortune 500
//             company, you have much to offer to those who are trying to follow in
//             your footsteps.
//           </p>
//           <p>
//             Whether you are willing to share your knowledge or you are just
//             looking to meet mentors of your own, please start by joining the
//             network here.
//           </p>
//           <button>
//             <Link to={"/howItWorks"}>HOW IT WORKS</Link>
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Landing;

// import React, { useState } from "react";
// import Login from "../Login/Login";
// import Register from "../Register/Register";
// import classes from "./landing.module.css";
// import { Link } from "react-router-dom";

// import PwChangeRequest from "../PwChange/PwChangeRequest";
// import PwChangeNewPw from "../PwChange/PwChangeNewPw";

// const Landing = () => {
//   // State to track which form to show (Login, Register, or PasswordReset)
//   const [currentForm, setCurrentForm] = useState("login"); // Default form is login
//   const [animationDirection, setAnimationDirection] = useState(""); // For slide animation
//   const [resetStep, setResetStep] = useState("pwChangeRequest"); // For password reset step
//   const [emailStatus, setEmailStatus] = useState(""); // New state for email submission status message

//   // Function to switch to login form
//   const switchToLogin = () => {
//     setAnimationDirection("slide-in-left");
//     setTimeout(() => setCurrentForm("login"), 300); // setTimeout for animation delay
//   };

//   // Function to switch to register form
//   const switchToRegister = () => {
//     setAnimationDirection("slide-in-right");
//     setTimeout(() => setCurrentForm("register"), 300);
//   };

//   // Function to handle password reset request
//   const handlePwResetRequest = async (email) => {
//     try {
//       const response = await fetch("/requestPasswordReset", {
//         method: "POST",
//         body: JSON.stringify({ email }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // If email is valid, show success message
//         setEmailStatus("A reset link has been sent to your email.");
//       } else {
//         // If email is invalid, show error message
//         setEmailStatus(data.msg || "Error sending reset link.");
//       }
//     } catch (error) {
//       console.error("Error during password reset request:", error);
//       setEmailStatus("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className={classes["main__wrapper"]}>
//       <main className={classes["main__container"]}>
//         <div className={classes["form-container"]}>
//           <div
//             className={`${classes["form-wrapper"]} ${classes[animationDirection]}`}
//           >
//             {currentForm === "login" && (
//               <Login
//                 switchToRegister={switchToRegister}
//                 switchToPwResetRequest={() => setCurrentForm("passwordChange")}
//               />
//             )}
//             {currentForm === "register" && (
//               <Register switchToLogin={switchToLogin} />
//             )}

//             {currentForm === "passwordChange" &&
//               resetStep === "pwChangeRequest" && (
//                 <PwChangeRequest
//                   switchToLogin={switchToLogin}
//                   switchToRegister={switchToRegister}
//                   handlePwResetRequest={handlePwResetRequest} // Pass handlePwResetRequest as a prop
//                 />
//               )}
//             {currentForm === "passwordChange" &&
//               resetStep === "pwChangeNewPw" && (
//                 <PwChangeNewPw switchToLogin={switchToLogin} />
//               )}

//             {/* Display email status (success or error) */}
//             {emailStatus && (
//               <div className={classes["email-status"]}>{emailStatus}</div>
//             )}
//           </div>
//         </div>

//         <div className={classes.info}>
//           <h4>About</h4>
//           <h1>Evangadi Networks Q & A</h1>
//           <p>
//             No matter what stage of life you are in, whether you are just
//             starting elementary school or being promoted to CEO of a Fortune 500
//             company, you have much to offer to those who are trying to follow in
//             your footsteps.
//           </p>
//           <p>
//             Whether you are willing to share your knowledge or you are just
//             looking to meet mentors of your own, please start by joining the
//             network here.
//           </p>
//           <button>
//             <Link to={"/howItWorks"}>HOW IT WORKS</Link>
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Landing;
