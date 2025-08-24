// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";
// import AppRoutes from "./routes/AppRoutes"; // ✅ Ensure this import is present
// import LoginSignup from "./pages/auth/LoginSignup";


// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         {!isAuthenticated ? (
//           <>
//             <Route path="/auth" element={<LoginSignup setAuth={setIsAuthenticated} />} />
//             <Route path="*" element={<Navigate to="/auth" />} />
//           </>
//         ) : (
//           <Route path="*" element={<AppRoutes />} /> // ✅ Now it will work!
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "../pages/dashboard/Dashboard";

// import Profile from "../pages/dashboard/Profile";
// import Orders from "../pages/dashboard/Orders";
import Products from "./pages/dashboard/Products.js";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
import LoginSignup from "./pages/auth/LoginSignup.js";

function App() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    return (
      <Router>
        <Routes>
          <Route path="/auth" element={<LoginSignup/>} />
          <Route path="/dashboard-shopowner/productmanagement" element={<Products/>} />
        </Routes>
      </Router>
    );
  };
  
  export default App;