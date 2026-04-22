import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NebulaLanding from './NebulaLanding';
import Home from './pages/Home';
import Invite from './pages/Invite';
import Login from './pages/Login';
import Meeting from './pages/Meeting';
import Profile from './pages/Profile';
import Contacts from './pages/Contacts';
import Recording from './pages/Recording';
import Schedule from './pages/Schedule';
import Screenshare from './pages/Screenshare';
import Settings from './pages/Settings';
import Setup from './pages/Setup';
import Whiteboard from './pages/Whiteboard';
import DesignSystem from './pages/DesignSystem';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NebulaLanding />} />
                <Route path="/home" element={<Home />} />
                <Route path="/invite" element={<Invite />} />
                <Route path="/login" element={<Login />} />
                <Route path="/meeting" element={<Meeting />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/recording" element={<Recording />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/screenshare" element={<Screenshare />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/whiteboard" element={<Whiteboard />} />
                <Route path="/design" element={<DesignSystem />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
