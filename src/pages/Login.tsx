import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AlertCircle,
  Loader2,
  User,
  Lock,
  RotateCcw,
  Check,
  Bell,
  UserPlus,
  BookOpen,
  Building2,
  Eye,
  ExternalLink,
  ChevronRight,
  Users,
  ChevronDown
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('MPBPL3419216000');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState('User List');
  const [captcha, setCaptcha] = useState('');
  const [localError, setLocalError] = useState('');

  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    try {
      // In a real app, email/password would be validated
      // For this demo/setup, we'll just try to login
      const success = await login(email === 'MPBPL3419216000' ? 'superadmin@gmail.com' : email,
        password === '••••••••' ? 'superadmin@123' : password);
      if (success) {
        navigate('/dashboard');
      } else {
        setLocalError(error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setLocalError('Login failed. Please try again.');
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setCaptcha('');
    setLocalError('');
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left Column: Welcome Employers !! */}
          <div className="bg-white rounded shadow-sm border border-gray-200 flex flex-col h-fit">
            <div className="bg-[#f39c12] px-4 py-3 flex items-center justify-between rounded-t">
              <h2 className="text-white font-bold text-lg">Welcome School Admin !!</h2>
              <div className="flex space-x-2 text-white/80">
                <UserPlus size={20} />
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-3">
                <Bell className="text-red-500 mt-1 flex-shrink-0" size={18} />
                <p className="text-sm leading-relaxed text-gray-800">
                  <span className="font-bold text-red-600">For all news and updates on School Board</span>, please subscribe our YouTube channel{' '}
                  <a href="#" className="text-blue-600 hover:underline">(youtube.com/@schoolboard)</a>,{' '}
                  <span className="font-bold text-red-600">Instagram</span>{' '}
                  <a href="#" className="text-blue-600 hover:underline">(instagram.com/social_school)</a>,{' '}
                  <span className="font-bold text-red-600">Twitter</span>{' '}
                  <a href="#" className="text-blue-600 hover:underline">(x.com/officialschool)</a>,{' '}
                  <span className="font-bold text-red-600">Facebook</span>{' '}
                  <a href="#" className="text-blue-600 hover:underline">(facebook.com/socialschool)</a> and{' '}
                  <span className="font-bold text-red-600">Linkedin</span>{' '}
                  <a href="#" className="text-blue-600 hover:underline">(linkedin.com/company/schoolofficial)</a>.
                </p>
              </div>
              <div className="flex gap-3 border-t pt-4">
                <div className="mt-1 text-gray-400">👍</div>
                <p className="text-sm font-bold text-gray-800">
                  New academic session registrations are now open.
                </p>
              </div>
            </div>
          </div>

          {/* Center Column: Instructions */}
          <div className="bg-white rounded shadow-sm border border-gray-200 flex flex-col h-fit">
            <div className="bg-[#e74c3c] px-4 py-3 flex items-center justify-between rounded-t">
              <h2 className="text-white font-bold text-lg">Instructions</h2>
              <div className="text-white/80">
                <BookOpen size={20} />
              </div>
            </div>
            <div className="p-5 space-y-5">
              <div className="flex gap-3">
                <div className="bg-orange-100 text-orange-600 rounded p-1 h-fit mt-0.5">
                  <ChevronRight size={14} />
                </div>
                <p className="text-sm text-gray-700">
                  Please create your permanent login id and password of your choice after the first login.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="bg-orange-100 text-orange-600 rounded p-1 h-fit mt-0.5">
                  <ChevronRight size={14} />
                </div>
                <p className="text-sm text-gray-700">
                  In case you have forgotten the password/login id, use Forgot Password link to get the same through SMS on your registered mobile number.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="bg-orange-100 text-orange-600 rounded p-1 h-fit mt-0.5">
                  <ChevronRight size={14} />
                </div>
                <p className="text-sm text-gray-700">
                  In case your account is locked due to repeated use of wrong password, use Unlock account link.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Establishment Sign In */}
          <div className="bg-white rounded shadow-sm border border-gray-200 flex flex-col relative">
            <div className="bg-[#16a085] px-4 py-3 flex items-center justify-between rounded-t">
              <h2 className="text-white font-bold text-lg text-left">School Management Sign In</h2>
              <div className="text-white/80">
                <ExternalLink size={20} />
              </div>
            </div>

            <div className="p-6 flex flex-col items-center">
              {/* Profile Icon circle */}
              <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mb-6 border-4 border-gray-200 shadow-inner">
                <Building2 className="text-white" size={40} />
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                {displayError && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded text-xs mb-2">
                    <AlertCircle className="text-red-500 flex-shrink-0" size={14} />
                    <span className="text-red-700">{displayError}</span>
                  </div>
                )}

                {/* User ID */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded bg-[#e8f0fe] focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                    placeholder="User ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    className="block w-full pl-10 pr-3 py-2 border border-blue-200 rounded bg-[#e8f0fe] focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Role Selection */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Users size={16} />
                  </div>
                  <select
                    className="block w-full pl-10 pr-10 py-2 border border-blue-200 rounded bg-[#e8f0fe] focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm appearance-none text-gray-700"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="User List" disabled>User List</option>
                    <option value="Admin">Admin</option>
                    <option value="Hr">Hr</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Employees">Employees</option>
                    <option value="Director">Director</option>
                    <option value="Oprater">Oprater</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown size={14} />
                  </div>
                </div>

                {/* Captcha Image */}
                <div className="bg-gray-200 h-10 rounded overflow-hidden flex items-center justify-center relative select-none">
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '10px 10px' }}></div>
                  <span className="font-serif italic text-2xl tracking-[0.5em] text-gray-700 font-bold drop-shadow-sm">Q H e e 7</span>
                </div>

                {/* Captcha Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Eye size={16} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                    placeholder="Enter Captcha"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#27ae60] hover:bg-[#219150] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors text-sm font-bold shadow-sm"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                    <span>Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-[#e74c3c] hover:bg-[#c0392b] text-white py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors text-sm font-bold shadow-sm"
                  >
                    <RotateCcw size={16} />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Links */}
                <div className="pt-4 flex flex-col items-center space-y-2 text-xs">
                  <div className="flex gap-2 text-gray-500">
                    <a href="#" className="hover:text-blue-600 transition-colors">Forgot Password</a>
                    <span>|</span>
                    <a href="#" className="hover:text-blue-600 transition-colors">Unlock Account</a>
                  </div>
                  <a href="#" className="text-blue-600 font-bold hover:underline">Staff Sign In</a>
                  <a href="#" className="text-blue-600 font-bold hover:underline text-center">Student / Parent Portal</a>
                </div>
              </form>
            </div>

            {/* Scroll Indicator Placeholder in Image */}
            <div className="absolute right-0 top-1/4 h-1/2 w-1.5 bg-gray-400/30 rounded-l hidden md:block"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
