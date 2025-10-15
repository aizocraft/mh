import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { authAPI } from '../api';
import { toast } from 'react-toastify';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles,
  Shield,
  User,
  Target,
  Leaf
} from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await authAPI.login(formData);
      const { user, token } = response.data;
      
      login(user, token, rememberMe);
      toast.success('Welcome back! Logged in successfully');
      
      if (user.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (user.role === 'farmer') {
        navigate('/dashboard/farmer');
      } else if (user.role === 'expert') {
        navigate('/dashboard/expert');
      } else {
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 transition-all duration-500 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-md w-full space-y-6">
          {/* Header */}
          <div className="text-center animate-fade-in">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
              <div className="flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="MkulimaHub" 
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Mkulima<span className="text-emerald-600">Hub</span>
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Agricultural Intelligence</p>
              </div>
            </Link>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sign in to your agricultural dashboard
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="animate-slide-up" style={{animationDelay: '100ms'}}>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/20">
              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center space-x-2 text-red-700 dark:text-red-300 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="username"
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      autoComplete="current-password"
                      className="w-full pl-10 pr-12 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3 h-3 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 text-xs"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 flex items-center justify-center gap-2 group text-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-4 flex items-center">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                <span className="px-3 text-xs text-gray-500 dark:text-gray-400">or</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    Create account
                    <Sparkles className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="animate-slide-up" style={{animationDelay: '200ms'}}>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <User className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Expert Network</p>
              </div>
              <div className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <Shield className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Secure</p>
              </div>
              <div className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
                <Target className="w-4 h-4 text-green-500 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Precision</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;