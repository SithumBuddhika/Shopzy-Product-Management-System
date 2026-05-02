import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Products from "./pages/dashboard/Products.js";
import LoginSignup from "./pages/auth/LoginSignup.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to="/dashboard-shopowner/productmanagement" replace />
          }
        />

        <Route path="/auth" element={<LoginSignup />} />

        <Route
          path="/dashboard-shopowner/productmanagement"
          element={<Products />}
        />

        <Route
          path="/dashboard-shopowner/productManagement"
          element={
            <Navigate to="/dashboard-shopowner/productmanagement" replace />
          }
        />

        <Route
          path="/dashboard-shopowner/fleetManagement"
          element={<Products />}
        />

        <Route
          path="*"
          element={
            <Navigate to="/dashboard-shopowner/productmanagement" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
