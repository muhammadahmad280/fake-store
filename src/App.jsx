import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartsDashboard from "./components/carts/CartsDashboard";
import UsersDashboard from "./components/users/UsersDashboard";
import Login from "./components/auth/Login";
import ProductsDashboard from "./components/products/ProductsDashboard";
import Logout from './components/auth/Logout';

import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    
    <Router>
      <div className="min-h-screen    text-gray-900 dark:text-gray-100 font-medium">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="products" element={<ProductsDashboard />} />
            <Route path="carts" element={<CartsDashboard />} />
            <Route path="users" element={<UsersDashboard />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
