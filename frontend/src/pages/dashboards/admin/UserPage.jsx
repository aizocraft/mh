import React, { useState, useEffect } from 'react';
import { userAPI } from '../../../api';
import { 
  Users, 
  Plus, 
  Download, 
  Upload, 
  Filter, 
  Search, 
  RefreshCw,
  BarChart3,
  UserCheck,
  UserCog,
  Sprout,
  Shield,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, roleFilter, statusFilter, sortBy]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userAPI.getAllUsers();
      
      if (response.data?.success && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else {
        setError('Unexpected data format received from server');
        setUsers([]);
      }
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = users;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Apply status filter (you might need to add status field to your user model)
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name?.localeCompare(b.name);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'active':
          return (b.lastActive || 0) - (a.lastActive || 0);
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  };

  const getRoleStats = () => {
    const totalUsers = users.length;
    const admins = users.filter(user => user.role === 'admin').length;
    const experts = users.filter(user => user.role === 'expert').length;
    const farmers = users.filter(user => user.role === 'farmer').length;

    return {
      totalUsers,
      admins,
      experts,
      farmers,
      adminPercentage: totalUsers > 0 ? (admins / totalUsers * 100).toFixed(1) : 0,
      expertPercentage: totalUsers > 0 ? (experts / totalUsers * 100).toFixed(1) : 0,
      farmerPercentage: totalUsers > 0 ? (farmers / totalUsers * 100).toFixed(1) : 0
    };
  };

  const stats = getRoleStats();

  const StatCard = ({ title, value, percentage, icon: Icon, color, trend }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {percentage}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">of total</p>
            </div>
          </div>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} ml-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const UserCard = ({ user }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
            alt={user.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Role</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
            user.role === 'expert' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
            'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
          }`}>
            {user.role}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Joined</span>
          <span className="text-sm text-gray-900 dark:text-white">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-900 dark:text-white">Active</span>
          </span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  User Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                  Comprehensive overview and management of all platform users
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium">
                <Upload className="w-5 h-5" />
                <span>Import</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg shadow-emerald-500/25">
                <Plus className="w-5 h-5" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            percentage={100}
            icon={Users}
            color="bg-blue-500"
            trend="+12% this month"
          />
          <StatCard
            title="Administrators"
            value={stats.admins}
            percentage={stats.adminPercentage}
            icon={UserCog}
            color="bg-purple-500"
            trend="+2 this month"
          />
          <StatCard
            title="Experts"
            value={stats.experts}
            percentage={stats.expertPercentage}
            icon={UserCheck}
            color="bg-orange-500"
            trend="+8 this month"
          />
          <StatCard
            title="Farmers"
            value={stats.farmers}
            percentage={stats.farmerPercentage}
            icon={Sprout}
            color="bg-emerald-500"
            trend="+24 this month"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Filters and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Role Filter */}
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="expert">Expert</option>
                <option value="farmer">Farmer</option>
              </select>

              {/* Sort By */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Sort by Name</option>
                <option value="active">Most Active</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-600 shadow-sm text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-600 shadow-sm text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <Users className="w-5 h-5" />
                </button>
              </div>

              {/* Refresh */}
              <button 
                onClick={fetchUsers}
                className="flex items-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors duration-200 font-medium"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
                            alt={user.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                          user.role === 'expert' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                          'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-900 dark:text-white">Active</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && !loading && (
          <div className="text-center py-16">
            <Users className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No users found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              No users match your current search criteria. Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg">
                <Plus className="w-5 h-5 inline mr-2" />
                Add New User
              </button>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;