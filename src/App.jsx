import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import Preferences from './pages/preferences/Preferences';
import Events from './pages/events/Events';  // Events component
import Sidebar from './components/Sidebar';
import CreateEvent from './pages/events/CreateEvent';
import EditEvent from './pages/events/EditEvent';
import EventList from './pages/eventList/EventList';
import CalendarView from './pages/Availability/CalendarView';
import Settings from './pages/settings/Settings';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const location = useLocation();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      document.body.classList.add("logged-in");
    } else {
      document.body.classList.remove("logged-in");
    }
  }, [token]);

  return (
    <div className="app-container">
      
      {(location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/preferences' && location.pathname !== '/') && <Sidebar />}

      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/preferences" element={<Preferences />} />

          {/* All Routes */}
          <Route path="/events" element={<Events />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/edit/:eventId" element={<EditEvent />} />
          <Route path="/events/list" element={<EventList />} />
          <Route path="/events/calendar" element={<CalendarView />} />
          <Route path="/settings" element={<Settings />} />

          {/* Fallback Redirect to SignIn */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppWrapper;
