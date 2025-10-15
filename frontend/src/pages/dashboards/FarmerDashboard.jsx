import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Overview from './farmer/Overview';
import MyCrops from './farmer/MyCrops';
import Consultations from './farmer/Consultations';
import Knowledge from './farmer/Knowledge';
import { 
  Activity, 
  Sprout, 
  Users, 
  BookOpen, 
  MapPin, 
  Star, 
  CheckCircle,
  Sun,
  Moon,
  ChevronDown,
  Settings,
  Bell
} from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'crops', label: 'My Crops', icon: Sprout },
    { id: 'consultations', label: 'Consultations', icon: Users },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 space-y-4 lg:space-y-0">
            {/* Left Section - Title and User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
                  Farmer Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base mt-1">
                  Welcome back, <span className="font-semibold text-emerald-600 dark:text-emerald-400">{user?.name || 'Farmer'}</span>
                </p>
              </div>
            </div>

            {/* Right Section - Badges and Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Status Badges */}
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-2 px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl text-sm font-medium border border-emerald-200 dark:border-emerald-800">
                  <Sprout size={16} />
                  <span className="hidden sm:inline">Active Farmer</span>
                  <span className="sm:hidden">Farmer</span>
                </span>
                <span className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium border border-blue-200 dark:border-blue-800">
                  <MapPin size={16} />
                  <span>Nyeri County</span>
                </span>
                <span className="inline-flex items-center space-x-2 px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-xl text-sm font-medium border border-amber-200 dark:border-amber-800">
                  <Star size={16} className="fill-current" />
                  <span>Intermediate</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 relative">
                  <Bell size={18} className="text-gray-600 dark:text-gray-400" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </button>

                {/* Theme Toggle */}
                <button 
                  onClick={toggleTheme}
                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 group"
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <div className="relative w-5 h-5">
                    <Sun 
                      size={20} 
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        theme === 'light' 
                          ? 'rotate-0 scale-100 text-orange-500' 
                          : 'rotate-90 scale-0 text-gray-400'
                      }`} 
                    />
                    <Moon 
                      size={20} 
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'rotate-0 scale-100 text-blue-400' 
                          : '-rotate-90 scale-0 text-gray-400'
                      }`} 
                    />
                  </div>
                </button>

                {/* Settings */}
                <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200">
                  <Settings size={18} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg border-b-2 transition-all duration-200 flex-shrink-0 min-w-0 ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="font-medium text-sm whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'crops' && <MyCrops />}
          {activeTab === 'consultations' && <Consultations />}
          {activeTab === 'knowledge' && <Knowledge />}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;