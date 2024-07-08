import React, { useState } from "react";
import NavBar from './components/NavBar';
import AllEntries from './routes/AllEntries';
import NewEntry from './routes/NewEntry';
import EditEntry from './routes/EditEntry';
import { EntryProvider } from './utilities/globalContext';
import { ThemeProvider } from './contexts/ThemeContext';
import SettingsDialog from './components/SettingsDialog';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900">
      <ThemeProvider>
        <Router>
          <EntryProvider>
            <NavBar />
            <div className="absolute top-0 right-0 m-3">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"
              >
                Settings
              </button>
            </div>
            <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <Routes>
              <Route path="/" element={<AllEntries />} />
              <Route path="create" element={<NewEntry />} />
              <Route path="edit/:id" element={<EditEntry />} />
            </Routes>
          </EntryProvider>
        </Router>
      </ThemeProvider>
    </section>
  );
}