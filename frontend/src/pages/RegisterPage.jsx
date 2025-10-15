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
  User, 
  ArrowRight, 
  Sparkles,
  Shield,
  Target,
  CheckCircle,
  XCircle,
  Users,
  Leaf
} from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    role: 'farmer'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please use a stronger password.');
      toast.error('Password is too weak');
      return;
    }

    setIsLoading(true);
    try {
      const { repeatPassword, ...submitData } = formData;
      const response = await authAPI.register(submitData);
      const { user, token } = response.data;

      login(user, token);
      toast.success(`Welcome to Mkulima Hub, ${user.name}! Account created successfully.`);

      if (user.role === 'admin') navigate('/dashboard/admin');
      else if (user.role === 'farmer') navigate('/dashboard/farmer');
      else if (user.role === 'expert') navigate('/dashboard/expert');
      else navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () => setShowRepeatPassword(!showRepeatPassword);

  const getRoleIcon = (role) => {
    const icons = { farmer: "🌱", expert: "💡", admin: "👑" };
    return icons[role] || "👤";
  };

  const getRoleDescription = (role) => {
    const descriptions = {
      farmer: 'Manage crops & get expert advice',
      expert: 'Help farmers & share knowledge',
      admin: 'Manage platform & users'
    };
    return descriptions[role] || '';
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'One number', met: /[0-9]/.test(formData.password) },
    { text: 'One special character', met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 transition-all duration-500 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
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

      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-3 animate-fade-in">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-2">
              <div className="flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="MkulimaHub" 
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Mkulima<span className="text-emerald-600">Hub</span>
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Agricultural Intelligence</p>
              </div>
            </Link>
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Join Our Community</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Start your agricultural journey today</p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="animate-slide-up">
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
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white text-sm transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white text-sm transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Create a strong password"
                      className="w-full pl-10 pr-12 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white text-sm transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Password Strength */}
                  {formData.password && (
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Password Strength:</span>
                        <span className={
                          passwordStrength <= 2 ? 'text-red-500' :
                          passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                        }>
                          {getPasswordStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Repeat Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type={showRepeatPassword ? "text" : "password"}
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-12 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white text-sm transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={toggleRepeatPasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {showRepeatPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formData.repeatPassword && formData.password !== formData.repeatPassword && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Your Role</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['farmer', 'expert', 'admin'].map((role) => (
                      <label
                        key={role}
                        htmlFor={role}
                        className={`flex flex-col items-center p-3 rounded-xl cursor-pointer border text-center transition-all duration-200 group ${
                          formData.role === role
                            ? 'bg-emerald-500 text-white shadow-lg border-emerald-500 scale-105'
                            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600'
                        }`}
                      >
                        <input
                          type="radio"
                          id={role}
                          name="role"
                          value={role}
                          checked={formData.role === role}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">
                          {getRoleIcon(role)}
                        </div>
                        <span className="text-xs font-medium capitalize mb-1">{role}</span>
                        <span className="text-[10px] opacity-80 leading-tight">
                          {getRoleDescription(role)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-4 text-center text-xs text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 inline-flex items-center gap-1 group"
                >
                  Sign in
                  <Sparkles className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <Users className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Community</p>
            </div>
            <div className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <Target className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Precision</p>
            </div>
            <div className="p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
              <Leaf className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Sustainable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;