import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import UserManagement from '../../components/UserManagement';
import Overview from './admin/Overview';
import Weather from './admin/Weather';
import { BarChart3, Users, Cloud, Shield, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={`admin-dashboard ${theme}`}>
      {/* Header with Theme Toggle */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name || 'Admin User'}! Here's your platform overview.</p>
          </div>
          <div className="header-actions">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                <Shield size={14} />
                <span>Administrator</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                <CheckCircle size={14} />
                <span>All Access</span>
              </span>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <button 
          className={`nav-item ${activeTab === 'overview' ? 'nav-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={18} />
          Overview
        </button>
        <button 
          className={`nav-item ${activeTab === 'users' ? 'nav-active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} />
          User Management
        </button>
        <button 
          className={`nav-item ${activeTab === 'weather' ? 'nav-active' : ''}`}
          onClick={() => setActiveTab('weather')}
        >
          <Cloud size={18} />
          Weather
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'weather' && <Weather />}
      </div>
    </div>
  );
};

export default AdminDashboard;