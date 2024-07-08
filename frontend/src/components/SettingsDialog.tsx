import React from 'react';
import ThemeToggle from './ThemeToggle';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Settings</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Theme</label>
          <ThemeToggle />
        </div>
        <button
          onClick={onClose}
          className="p-2 bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsDialog;