import React, { useState } from "react";
import "./Auth.css"; // Ensure styles are properly linked
import PasswordMessage from "./PasswordMessage"; // Ensure this file exists in auth folder
import OtpModal from "./OtpModal";
import Notification from "./Notification";
import LoginOtpModal from "./LoginOtpModal";
import logo from "../../components/trans coloured (2) (1).png"; // Ensure this image exists

const LoginSignup = ({ setAuth }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [notification, setNotification] = useState({ message: "", type: "" });

  const [isLoginOtpModalOpen, setIsLoginOtpModalOpen] = useState(false);

  const MOCK_OTP = "123456"; // Mock OTP for demo purposes

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification("Invalid email format", "error");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      showNotification("Invalid phone number. Must be 10 digits", "error");
      return;
    }

    showNotification("OTP sent to email and phone", "success");
    setIsOtpModalOpen(true);
  };

  const handleValidateOtp = (enteredEmailOtp, enteredPhoneOtp) => {
    if (enteredEmailOtp !== MOCK_OTP) {
      showNotification("Invalid Email OTP", "error");
      return;
    }
    if (enteredPhoneOtp !== MOCK_OTP) {
      showNotification("Invalid Phone OTP", "error");
      return;
    }

    setEmailVerified(true);
    setPhoneVerified(true);
    showNotification("OTP validation successful", "success");
    setIsOtpModalOpen(false);
  };

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  const handleLogin = (e) => {
    e.preventDefault();
    showNotification("OTP sent to email", "success");
    setIsLoginOtpModalOpen(true);
  };

  const handleValidateLoginOtp = (enteredOtp) => {
    if (enteredOtp !== MOCK_OTP) {
      showNotification("Invalid OTP", "error");
      return;
    }
    showNotification("Login successful", "success");
    setIsLoginOtpModalOpen(false);
    setAuth(true); // Mark user as authenticated
  };

  return (
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
      {/* Sign Up Container */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSendOtp} noValidate>
          <h2>Register</h2>
          <div className="signupscroll">

          <div className="formflex">
            <div className="formitem">
              <label htmlFor="firstName">
                <b>First Name:</b>
              </label>
              <input type="text" id="firstName" placeholder="First Name" required />
            </div>
            <div className="formitem">
              <label htmlFor="lastName">
                <b>Last Name:</b>
              </label>
              <input type="text" id="lastName" placeholder="Last Name" required />
            </div>
          </div>

          <div className="formflex">
            <div className="formitem">
              <label htmlFor="email">
                <b>Email:</b>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="formitem">
              <label htmlFor="phone">
                <b>Phone Number:</b>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="formflex">
            <div className="formitem">
              <label htmlFor="password">
                <b>Password:</b>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordMessage(true)} // Show message on focus
                onBlur={() => setShowPasswordMessage(false)} // Hide message on blur
              />
              <PasswordMessage password={password} show={showPasswordMessage} />


            </div>
            <div className="formitem">
              <label htmlFor="confirmPassword">
                <b>Re-Enter Password:</b>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-Enter Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters" required
              />
            </div>
          </div>

          <div className="formflex">
            <div className="formitem">
              <label htmlFor="storeId">
                <b>Store ID:</b>
              </label>
              <input type="text" id="storeId" placeholder="Store ID" required />
            </div>
            <div className="formitem">
              <label htmlFor="storeName">
                <b>Store Name:</b>
              </label>
              <input type="text" id="storeName" placeholder="Store Name" required />
            </div>
          </div>

          <div className="formflex">
            <div className="formitem">
              <label htmlFor="location">
                <b>Google Map Location:</b>
              </label>
              <input type="text" id="location" placeholder="Lat, Long" required />
            </div>
            <div className="formitem">
              <label htmlFor="address">
                <b>Address:</b>
              </label>
              <textarea id="address" placeholder="Enter Address" required></textarea>
            </div>
          </div>
          </div>

          <div className="last">
            <button type="submit" onClick={handleSendOtp}>
              Register
            </button>
          </div>
        </form>
        

      </div>

      {/* Sign In Container */}
      <div className="form-container sign-in-container">
      <div className="signincont">
        <form onSubmit={handleLogin} noValidate>
          
          <h1 className="head">Sign in</h1>
          <input type="text" placeholder="Enter Store ID" required />
          <input type="password" placeholder="Enter Password" required />
          <input type="text" placeholder="Enter Security Key" required />

          <div className="anchor">
            <a href="#">Locate Me</a></div>
          

          <button type="submit">Sign In</button>
        </form>
        </div>
      </div>

      {/* Overlay Container */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <div className="image">
              <img src={logo} alt="Logo" />
            </div>
            <h1>Welcome Back!</h1>
            <p>
              Ready to continue your journey with us? <br />
              Log in now & pick up right where you left off.
            </p>
            <button className="ghost" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <div className="image">
              <img src={logo} alt="Logo" />
            </div>
            <h1>Join our journey!</h1>
            <p>
              Want to be a part of our journey? <br />
              Join us now and unlock endless possibilities. <br />
              Your adventure begins here!
            </p>
            <button className="ghost" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* OTP Modals */}
      {isOtpModalOpen && (
        <OtpModal email={email} phone={phone} emailOtp={emailOtp} phoneOtp={phoneOtp} 
          setEmailOtp={setEmailOtp} setPhoneOtp={setPhoneOtp} handleValidateOtp={handleValidateOtp} 
          closeModal={() => setIsOtpModalOpen(false)} />
      )}

      {isLoginOtpModalOpen && (
        <LoginOtpModal handleValidateLoginOtp={handleValidateLoginOtp} closeModal={() => setIsLoginOtpModalOpen(false)} />
      )}

      {/* Notification */}
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />
    </div>
  );
};

export default LoginSignup;
