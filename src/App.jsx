import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard/Dashboard";
import QueueRegister from "./pages/Dashboard/QueueRegister";
import QueueListing from "./pages/Dashboard/QueueListing";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordRequest from "./pages/ForgotPasswordRequest";
import ProfileVerified from "./pages/Profile/ProfileVerified";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/profile-verified" element={<ProfileVerified />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-password-request"
          element={<ForgotPasswordRequest />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/queue-listing" element={<QueueListing />} />
          <Route path="/queue-register" element={<QueueRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
