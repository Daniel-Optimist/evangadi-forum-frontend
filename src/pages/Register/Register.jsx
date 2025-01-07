// import React, { useState } from "react";
// import axios from "../../Api/axiosConfig";
// import { Link } from "react-router-dom";
// import classes from "./register.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";

// const Register = ({ switchToLogin }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [signupMessage, setSignupMessage] = useState("");
//   const [messageType, setMessageType] = useState(""); // "success" or "error"

//   // Handle input changes and update state
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle password visibility toggle
//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data, status } = await axios.post("/users/register", formData);
//       if (status === 201 && data?.msg) {
//         setSignupMessage(data.msg || "Signup successful");
//         setMessageType("success");
//         setTimeout(() => switchToLogin(), 4000);
//       } else {
//         setSignupMessage(data?.msg);
//         setMessageType("error");
//       }
//     } catch (error) {
//       setSignupMessage(error?.response?.data?.msg || "Signup failed. Please try again.");
//       setMessageType("error");
//     }
//   };

//   return (
//     <div className={classes.form}>
//       <h2>Join the network</h2>
//       {/* Display signup message */}
//       {signupMessage && (
//         <p className={messageType === "error" ? classes.errorMessage : classes.successMessage}>
//           {signupMessage}
//         </p>
//       )}
//       <p>
//         Already have an account?
//         <span className={classes.toggleLink} onClick={switchToLogin}>
//           Sign in
//         </span>
//       </p>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="username"
//           value={formData.username}
//           onChange={handleInputChange}
//           type="text"
//           placeholder="Username"
//           required
//         />
//         <div className={classes.nameContainer}>
//           <input
//             name="firstname"
//             value={formData.firstname}
//             onChange={handleInputChange}
//             type="text"
//             placeholder="First Name"
//             required
//           />
//           <input
//             name="lastname"
//             value={formData.lastname}
//             onChange={handleInputChange}
//             type="text"
//             placeholder="Last Name"
//             required
//           />
//         </div>
//         <input
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           type="email"
//           placeholder="Email"
//           required
//         />
//         <div className={classes.passwordContainer}>
//           <input
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             required
//           />
//           <span className={classes.togglePasswordIcon} onClick={handleTogglePassword}>
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
//         <div className={classes.termsContainer}>
//           I agree to the <Link to="/privacy">privacy policy</Link> and{" "}
//           <Link to="/termsAndConditions">terms of service</Link>.
//         </div>
//         <button type="submit">Agree and Join</button>
//       </form>
//     </div>
//   );
// };

// export default Register;









import React, { useRef, useState } from "react";
import axios from "../../Api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = ({ switchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  // State to handle messages for login and signup
  const [signupMessage, setSignupMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  // password show and hide function
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    try {
      const { data, status } = await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      if (status === 201 && data?.msg) {
        // If response is OK (status 201 for successful signup), set success message
        setSignupMessage(data.msg || "Signup successful");
        setMessageType("success");

        setTimeout(() => {
          switchToLogin();
        }, 4000);
      } else {
        // If response is not successful, set error message
        // setSignupMessage(data?.msg || "Signup failed. Please try again.");
        setSignupMessage(data?.msg); 
        setMessageType("error");
      }
    } catch (error) {
      const errorMessage =
        // error?.response?.data?.msg || "Signup failed. Please try again.";
        error?.response?.data?.msg 
      setSignupMessage(errorMessage);
      setMessageType("error");
    }
  }

  return (
    <>
      <div className={classes["form"]} id={classes["sign-up-form"]}>
        <h2>Join the network</h2>
        {/* Display signup message */}
        {signupMessage && (
          <p
            style={{
              color: messageType === "error" ? "red" : "green",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {signupMessage}
          </p>
        )}
        <p>
          Already have an account?
          <span className={classes["toggle-link"]} onClick={switchToLogin}>
            Sign in
          </span>
        </p>
        <form onSubmit={handleSubmit} action="">
          <input
            ref={usernameDom}
            type="text"
            placeholder="User name"
            required
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              style={{ width: "45%" }}
              ref={firstnameDom}
              type="text"
              placeholder="First name"
              required
            />
            <input
              style={{ width: "45%" }}
              ref={lastnameDom}
              type="text"
              placeholder="Last name"
              required
            />
          </div>
          <input
            ref={emailDom}
            type="email"
            placeholder="Email address"
            required
          />
          <div className={classes["password-container"]}>
            <input
              ref={passwordDom}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className={classes["toggle-password-icon"]}
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div
            style={{
              display: "block",
              textAlign: "center",
              margin: "10px",
              fontSize: "13px",
            }}
          >
            I agree to the <Link to="/privacy">privacy policy</Link> and{" "}
            <Link to="/termsAndConditions">terms of service</Link>.
          </div>
          <button type="submit">Agree and Join</button>
        </form>
      </div>
    </>
  );
};

export default Register;
