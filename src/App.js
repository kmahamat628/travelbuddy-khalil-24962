import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./component/LandingPage";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";
import AdminMenu from "./component/AdminMenu";
import UsersList from "./component/UsersList";
import EditUserForm from "./component/EditUserForm";
import AddUserForm from "./component/AddUserForm";
import ResetPassword from "./component/ResetPassword";
import ForgotPassword from "./component/ForgotPassword";
import Dashboard from "./component/Dashboard";
import Settings from "./component/Settings";


// Import the missing components
import BookTrip from "./component/BookTrip";
import TripHistory from "./component/TripHistory";
import BookingConfirmation from "./component/BookingConfirmation";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminMenu />} />
        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/edit-user-form" element={<EditUserForm />} />
        <Route path="/admin/add-user-form" element={<AddUserForm />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/book-trip" element={<BookTrip />} />
        <Route path="/trip-history" element={<TripHistory />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
