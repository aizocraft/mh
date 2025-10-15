import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Overview from './expert/Overview';
import Consultations from './expert/Consultations';
import Questions from './expert/Questions';
import Schedule from './expert/Schedule';
import { BarChart3, MessageCircle, Users, Calendar, Star, DollarSign, Shield } from 'lucide-react';

const ExpertDashboard = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'EJ'}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">Expert Dashboard</h1>
                <p className="text-purple-100 text-lg mb-3">
                  Welcome back, {user?.name || 'Dr. Jane Expert'}!
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center space-x-1 px-3 py-1 bg-white/20 rounded-full text-sm">
                    <Shield size={14} />
                    <span>Verified Agronomist</span>
                  </div>
                  <div className="inline-flex items-center space-x-1 px-3 py-1 bg-white/20 rounded-full text-sm">
                    <Star size={14} className="fill-current" />
                    <span>10 years experience</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button 
              className={`nav-tab ${activeTab === 'overview' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart3 size={18} />
              <span>Overview</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'consultations' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveTab('consultations')}
            >
              <MessageCircle size={18} />
              <span>Consultations</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'questions' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              <Users size={18} />
              <span>Questions</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'schedule' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              <Calendar size={18} />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'consultations' && <Consultations />}
        {activeTab === 'questions' && <Questions />}
        {activeTab === 'schedule' && <Schedule />}
      </div>
    </div>
  );
};

export default ExpertDashboard;