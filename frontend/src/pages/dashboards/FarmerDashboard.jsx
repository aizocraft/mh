import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Overview from './farmer/Overview';
import MyCrops from './farmer/MyCrops';
import Consultations from './farmer/Consultations';
import Knowledge from './farmer/Knowledge';
import { Activity, Sprout, Users, BookOpen, MapPin, Star } from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
              <p className="text-emerald-100 text-lg mb-4">
                Welcome back, {user?.name || 'John Farmer'}! Ready to grow your farming knowledge?
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center space-x-1 px-3 py-1 bg-white/20 rounded-full text-sm">
                  <MapPin size={14} />
                  <span>Nyeri County</span>
                </div>
                <div className="inline-flex items-center space-x-1 px-3 py-1 bg-white/20 rounded-full text-sm">
                  <Star size={14} />
                  <span>Intermediate Farmer</span>
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
              <Activity size={18} />
              <span>Overview</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'crops' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveTab('crops')}
            >
              <Sprout size={18} />
              <span>My Crops</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'consultations' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveTab('consultations')}
            >
              <Users size={18} />
              <span>Consultations</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'knowledge' ? 'nav-tab-active' : ''}`}
              onClick={() => setActiveTab('knowledge')}
            >
              <BookOpen size={18} />
              <span>Knowledge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'crops' && <MyCrops />}
        {activeTab === 'consultations' && <Consultations />}
        {activeTab === 'knowledge' && <Knowledge />}
      </div>
    </div>
  );
};

export default FarmerDashboard;