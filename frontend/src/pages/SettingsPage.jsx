import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>Settings</h1>
        
        <div className="settings-sections">
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="setting-item">
              <label>Theme</label>
              <div className="theme-toggle-large">
                <button 
                  onClick={toggleTheme}
                  className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                >
                  Light Mode
                </button>
                <button 
                  onClick={toggleTheme}
                  className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                >
                  Dark Mode
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Notifications</h3>
            <div className="setting-item">
              <label>Email Notifications</label>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
            </div>
            <div className="setting-item">
              <label>Push Notifications</label>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
            </div>
          </div>

          <div className="settings-section">
            <h3>Account</h3>
            <div className="setting-item">
              <label>Language</label>
              <select defaultValue="en">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;