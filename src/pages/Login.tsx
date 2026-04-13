import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoImg from '../assets/logo.png';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Users,
  Wallet,
  ShieldCheck,
  Building2,
  FileText,
  TrendingUp,
  Calculator,
  BarChart3,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Globe,
  Crown,
  ShieldAlert,
  Database,
  LineChart,
  UserCheck,
  CreditCard,
  FileSearch,
  BookOpen,
  Search,
  ArrowRightLeft,
  ShoppingCart,
  Package,
  MoreHorizontal,
  Star
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  /*
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    const targetEmail = email || 'admin@test.com';
    const targetPassword = password || '123456';

    try {
      if (email && password && (email !== 'admin@test.com' || password !== '123456')) {
         setLocalError('Invalid credentials. Use admin@test.com / 123456');
         return;
      }

      const success = await login(targetEmail, targetPassword);
      if (success) {
        navigate('/dashboard');
      } else {
        setLocalError(error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setLocalError('Login failed. Please try again.');
    }
  };

  const handleRoleLogin = async (role: string) => {
    setEmail('admin@test.com');
    setPassword('123456');
    const success = await login('admin@test.com', '123456');
    if (success) navigate('/dashboard');
  };

  const displayError = localError || error;

  const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
    <div className="bg-white py-6 px-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-3 hover:shadow-md transition-shadow h-full">
      <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}20` }}>
        <Icon size={32} style={{ color }} fill={`${color}40`} strokeWidth={2.5} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-[14px] font-[900] uppercase tracking-tighter" style={{ color }}>{title}</h3>
        <p className="text-[11px] text-black font-[700] leading-tight">
          {description}
        </p>
      </div>
    </div>
  );

  const RoleCard = ({ role, subtext, icon: Icon, color, isCustomIcon }: { role: string, subtext: string, icon: any, color: string, isCustomIcon?: boolean }) => (
    <button
      onClick={() => handleRoleLogin(role)}
      className="flex flex-col items-center justify-center p-3 rounded-xl transition-all h-full w-full shadow-sm active:scale-95 group relative overflow-hidden"
      style={{ backgroundColor: `${color}15` }}
    >
      <div className="mb-1 transition-transform group-hover:scale-110" style={{ color: color }}>
        {isCustomIcon ? (
          <div className="relative">
             <ShieldCheck size={24} />
             <Star size={8} fill="currentColor" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
        ) : (
          <Icon size={24} />
        )}
      </div>
      <span className="text-[11px] font-black uppercase text-gray-900 tracking-tight leading-none">{role}</span>
      <span className="text-[9px] text-black font-bold leading-none mt-1">{subtext}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans selection:bg-[#0B2149] selection:text-white">
      
      <div className="flex-1 flex flex-col lg:flex-row w-full">
        
        {/* LEFT SECTION (Branding & Features) */}
        <div className="lg:w-[65%] p-4 md:p-8 lg:p-10 flex flex-col justify-center">
          
          {/* Header Area (Matched to Image Reference 2) */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-4 md:space-y-0 md:space-x-8 mb-0">
            {/* Business Logo Section */}
            <div className="relative flex-shrink-0 group">
               <div className="w-44 h-44 rounded-full p-0 flex items-center justify-center bg-transparent relative overflow-hidden transition-transform duration-500 hover:scale-105">
                  {/* Logo Image */}
                  <img 
                    src={logoImg} 
                    alt="S.D. Taxation Logo" 
                    className="w-full h-full object-cover relative z-10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=SD';
                    }}
                  />
               </div>
            </div>
            
            <div className="flex-1 pt-1">
              <h1 className="text-5xl md:text-6xl font-[900] text-[#0B2149] tracking-tight leading-none uppercase mb-1 drop-shadow-sm">
                S. D. TAXATION
              </h1>
              
              <div className="flex items-center w-full px-1">
                 <div className="h-[2.5px] flex-grow bg-[#D4AF37] rounded-full"></div>
                 <span className="text-[#D4AF37] px-6 text-2xl md:text-3xl font-[800] tracking-[0.25em] uppercase">
                   ASSOCIATE
                 </span>
                 <div className="h-[2.5px] flex-grow bg-[#D4AF37] rounded-full"></div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-3 text-[14px] font-[800] text-[#0B2149] uppercase tracking-wider py-1.5 opacity-90">
                <span>TAX</span> 
                <span className="text-[#D4AF37] font-black">•</span> 
                <span>COMPLIANCE</span> 
                <span className="text-[#D4AF37] font-black">•</span> 
                <span>ACCOUNTING</span> 
                <span className="text-[#D4AF37] font-black">•</span> 
                <span>ADVISORY</span>
              </div>

              <div className="relative w-fit mx-auto md:mx-0 pt-0.5">
                <p className="text-[#0B2149] italic font-serif text-lg md:text-xl font-[600] leading-tight">
                  "Your Trusted Partner in Compliance & Growth"
                </p>
              </div>
            </div>
          </div>

          {/* Feature Grid Container */}
          <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col h-fit">
            <div className="bg-[#0B2149] text-white text-center py-2.5 px-16 rounded-xl text-xl font-[900] uppercase mx-auto mb-8 w-fit shadow-xl relative z-10 border border-white/5">
              Complete Business Management Software
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              <FeatureCard icon={Users} title="HR" description="Manage Employennts, & Organization" color="#3182ce" />
              <FeatureCard icon={Wallet} title="PAYROLL" description="Salary Processing, Payslips & Benefits" color="#2f855a" />
              <FeatureCard icon={ShieldAlert} title="EPF" description="Provident Fund Management" color="#c53030" />
              <FeatureCard icon={Building2} title="ESIC" description="Employees' State Insurance" color="#2c7a7b" />
              <FeatureCard icon={Briefcase} title="PT" description="Professional Tax Management" color="#7c4dff" />
              <FeatureCard icon={FileText} title="TDS" description="Tax Deducted at Source" color="#f1a100" />
              <FeatureCard icon={TrendingUp} title="GST" description="GST Returns, Invoices & Compliance" color="#38a169" />
              <FeatureCard icon={GraduationCap} title="FEES MANAGEMENT" description="School / Institution Fees Collection & Reports" color="#1a7fc1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Calculator size={24} />
                </div>
                <div>
                  <h3 className="text-[12px] font-black text-blue-600 uppercase leading-none">Accounting</h3>
                  <p className="text-[11px] text-black font-[700] leading-tight mt-1">
                    Ledgers, Journal Entries, Reports & Financial Management
                  </p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h3 className="text-[12px] font-black text-purple-600 uppercase leading-none">ERP System</h3>
                  <p className="text-[11px] text-black font-[700] leading-tight mt-1">
                    Inventory, Stock & Resource Planning
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-0">
               <div className="bg-[#0B2149] py-4 px-6 rounded-xl text-center shadow-xl border border-white/5">
                  <span className="text-lg font-[900] text-white uppercase">
                    ONE PLATFORM • MULTIPLE SOLUTIONS • ENDLESS POSSIBILITIES
                  </span>
               </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Login Card) */}
        <div className="lg:w-[35%] w-full min-h-0 p-4 md:p-6 lg:p-10 lg:pt-12 flex items-start justify-center bg-[#F4F7FB] border-l border-gray-200 shadow-[inset_10px_0_30_rgba(0,0,0,0.05)]">
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-[0_20px_50px_rgba(11,33,73,0.15)] overflow-hidden flex flex-col border-2 border-[#0B2149]/20 ring-1 ring-black/5 relative z-10 transition-transform duration-500 hover:scale-[1.01]">
            
            {/* Header */}
            <div className="bg-[#0B2149] bg-gradient-to-br from-[#0B2149] to-[#1a3d6e] text-white py-8 px-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[length:12px_12px]"></div>
              <h2 className="text-2xl font-black uppercase tracking-tight relative z-10">WELCOME BACK</h2>
              <p className="text-white/90 text-[13px] mt-1.5 font-[700] relative z-10 uppercase tracking-widest">Sign in to Your Account</p>
            </div>

            {/* Login Form */}
            <div className="p-6 space-y-4 flex-grow">
              <form onSubmit={handleSubmit} className="space-y-4">
                {displayError && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 text-center">
                    {displayError}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0B2149] transition-colors" size={16} />
                    <input
                      type="text"
                      placeholder="Username / Email"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-gray-400 focus:ring-4 focus:ring-[#0B2149]/5 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0B2149] transition-colors" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-gray-400 focus:ring-4 focus:ring-[#0B2149]/5 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-gray-300 text-[#0B2149] focus:ring-0 cursor-pointer"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Remember Me</span>
                  </label>
                  <button type="button" className="text-[11px] font-medium text-blue-600 hover:underline">Forgot Password?</button>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0B2149] text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0c2d48] active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70"
                >
                  {loading ? 'Logging in...' : 'LOGIN'}
                </button>
              </form>

              <div className="relative flex items-center justify-center py-1">
                <div className="w-full border-t border-gray-200"></div>
                <span className="absolute px-4 bg-white text-[11px] font-[900] text-gray-600 uppercase">OR</span>
              </div>

              {/* Roles Section */}
              <div className="space-y-3">
                <h4 className="text-center text-[12px] font-[900] text-gray-600 uppercase">LOGIN AS</h4>
                <div className="grid grid-cols-3 gap-2">
                  <RoleCard role="SUPER ADMIN" subtext="Full System Access" icon={Crown} color="#8b5cf6" />
                  <RoleCard role="ADMIN" subtext="System Administration" icon={ShieldCheck} color="#3b82f6" isCustomIcon />
                  <RoleCard role="HR" subtext="Manage Employees" icon={Users} color="#10b981" />
                  <RoleCard role="EMPLOYEE" subtext="View Profile & Payslips" icon={Briefcase} color="#f59e0b" />
                  <RoleCard role="ACCOUNTANT" subtext="Accounting & Finance" icon={Calculator} color="#06b6d4" />
                  <RoleCard role="OTHER" subtext="Limited Access" icon={MoreHorizontal} color="#64748b" />
                </div>
                          {/* Brand Footer Small */}
              <div className="pt-4 border-t border-gray-100 text-center space-y-2">
                 <div className="space-y-0.5">
                   <p className="text-[18px] font-black text-black uppercase tracking-tight">S. D. TAXATION ASSOCIATE</p>
                   <p className="text-[12px] text-black font-medium">Complete Business Management Software</p>
                 </div>
                 
                 <div className="flex flex-col space-y-1 text-[13px] font-medium text-black">
                    <div className="flex items-center justify-center space-x-3">
                       <span className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer">
                          <Mail size={14} className="text-black" />
                          <span>info@sdtaxation.com</span>
                       </span>
                       <div className="h-3 w-[1px] bg-gray-300"></div>
                       <span className="flex items-center space-x-1 hover:text-blue-600 cursor-pointer">
                          <Phone size={14} className="text-black" />
                          <span>+91 98765 43210</span>
                       </span>
                    </div>
                    <span className="flex items-center justify-center space-x-1 hover:text-blue-600 cursor-pointer">
                       <Globe size={14} className="text-black" />
                       <span>www.sdtaxation.com</span>
                    </span>
                 </div>
              </div>    </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Sticky Footer */}
      <footer className="bg-[#0B2149] py-3 px-6 border-t-[4px] border-[#D4AF37] flex items-center justify-center">
         <div className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-16 gap-y-2 text-white">
            {['ACCURATE', 'RELIABLE', 'COMPLIANT', 'SECURE'].map((tag, i) => (
              <div key={i} className="flex items-center space-x-4 md:space-x-6 group">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.6)]"></div>
                <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.35em]">{tag}</span>
              </div>
            ))}
         </div>
      </footer>
    </div>
  );
}
