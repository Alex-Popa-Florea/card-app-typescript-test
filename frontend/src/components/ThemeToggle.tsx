import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    toggleTheme(event.target.value as 'light' | 'dark');
  };

  return (
    <select
      value={theme}
      onChange={handleThemeChange}
      className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded"
    >
      <option value="light">Light Mode</option>
      <option value="dark">Dark Mode</option>
    </select>
  );
};

export default ThemeToggle;