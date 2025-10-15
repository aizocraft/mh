import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  User,
  Send,
  Clock,
  Globe,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert('Thank you for your message! Our agricultural experts will contact you within 2 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <MessageCircle className="w-4 h-4" />,
      title: "Live Chat",
      description: "Instant farming advice",
      details: "Start chatting now",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Phone className="w-4 h-4" />,
      title: "Phone Support",
      description: "Direct expert consultation",
      details: "+254 711 123 456",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Mail className="w-4 h-4" />,
      title: "Email",
      description: "Detailed inquiries",
      details: "support@mkulimahub.com",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const supportFeatures = [
    {
      icon: <Clock className="w-3 h-3" />,
      text: "2-4 hour response time"
    },
    {
      icon: <Globe className="w-3 h-3" />,
      text: "Multilingual support"
    },
    {
      icon: <CheckCircle className="w-3 h-3" />,
      text: "Certified experts"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 transition-colors duration-300 pt-16">
    
      {/* Main Content - Single Screen Layout */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Contact Methods - Left Side */}
            <div className="lg:col-span-1 space-y-4">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${method.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200`}>
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                        {method.description}
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-xs">
                        {method.details}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Support Features */}
              <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl p-4 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" />
                  <h3 className="font-semibold text-sm">Premium Support</h3>
                </div>
                <div className="space-y-2">
                  {supportFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {feature.icon}
                      <span className="text-blue-100 text-xs">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Send us a Message</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">We'll connect you with the right expert</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      What do you need help with? *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm"
                    >
                      <option value="">Select topic</option>
                      <option value="pest-control">Pest & Disease Control</option>
                      <option value="soil-management">Soil Management</option>
                      <option value="crop-planning">Crop Planning</option>
                      <option value="irrigation">Irrigation Systems</option>
                      <option value="market-access">Market Access</option>
                      <option value="other">Other Agricultural Issue</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Describe your farming challenge *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-sm resize-none"
                      placeholder="Tell us about your specific farming situation, crops, and challenges..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Connecting to Expert...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Connect with Expert
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 dark:text-gray-400 text-xs">
                    We'll match you with a certified agricultural specialist within 2 hours
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
              <MapPin className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600 dark:text-gray-400">Based in</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Nairobi, Kenya</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
              <Clock className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600 dark:text-gray-400">Response Time</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">2-4 Hours</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
              <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <div className="text-xs text-gray-600 dark:text-gray-400">Experts Available</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">2000+ Certified</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;