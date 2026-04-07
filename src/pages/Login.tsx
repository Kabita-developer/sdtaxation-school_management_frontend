import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  BookOpen
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
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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

  const ServiceCard = ({ icon: Icon, title, description, color, subHeader }: { icon: any, title: string, description: string, color: string, subHeader?: boolean }) => (
    <div className={`flex ${subHeader ? 'flex-row items-center space-x-6 p-6' : 'flex-col items-center text-center p-6'} border border-gray-100 rounded-[1.2rem] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 relative overflow-hidden group h-full`}>
      <div className={`${subHeader ? '' : 'mb-5'} transition-transform duration-500 group-hover:scale-110`}>
        <Icon size={subHeader ? 56 : 52} style={{ color }} />
      </div>
      <div className={subHeader ? 'text-left' : ''}>
        <h3 className={`${subHeader ? 'text-xl' : 'text-base'} font-black uppercase tracking-tight`} style={{ color }}>{title}</h3>
        <p className="text-[11px] text-gray-500 font-extrabold leading-tight mt-1.5 uppercase opacity-80 whitespace-pre-line">
          {description.replace('\\n', '\n')}
        </p>
      </div>
      <div className="absolute top-0 right-0 p-1.5 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none">
         <Icon size={48} style={{ color }} />
      </div>
    </div>
  );

  const RoleCard = ({ role, subtext, icon: Icon, color }: { role: string, subtext: string, icon: any, color: string }) => (
    <button
      onClick={() => handleRoleLogin(role)}
      className="flex flex-col items-center justify-center p-5 rounded-[1.2rem] border-b-[4px] hover:scale-[1.04] transition-all h-full w-full shadow-sm active:scale-95 group relative overflow-hidden"
      style={{ backgroundColor: `${color}12`, borderBottomColor: `${color}` }}
    >
      <div className="mb-3.5 transition-transform group-hover:rotate-12" style={{ color: color }}>
        <Icon size={30} fill={color} fillOpacity={0.2} />
      </div>
      <span className="text-[12px] font-black uppercase text-gray-900 tracking-tight">{role}</span>
      <span className="text-[10px] text-gray-400 font-black mt-1 uppercase tracking-tighter opacity-80">{subtext}</span>
      <div className="absolute -bottom-2 -right-2 opacity-10 transition-transform group-hover:translate-y-[-5px]">
         <Icon size={24} style={{ color }} />
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-0 md:p-6 lg:p-8 font-sans relative overflow-hidden selection:bg-[#0B2149] selection:text-white">
      
      {/* Background Subtle Gradient & Mesh */}
      <div className="absolute inset-0 bg-white -z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4F8FB] via-white to-[#EBF3FB] opacity-100 -z-10"></div>
      <div className="absolute inset-0 opacity-[0.02] -z-10" style={{ backgroundImage: 'radial-gradient(#0B2149 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
      
      {/* Container Overall Card */}
      <div className="max-w-[1440px] w-full bg-white/95 backdrop-blur-3xl shadow-[0_60px_150px_-30px_rgba(11,33,73,0.3)] rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row relative z-10 border border-white/60">
        
        {/* LEFT SECTION (65% WIDTH) */}
        <div className="lg:w-[65%] p-10 md:p-16 lg:p-24 flex flex-col space-y-14 bg-white relative">
          
          {/* Detailed Image-Match Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-8 md:space-y-0 md:space-x-14">
            <div className="relative">
              <div className="w-[160px] h-[160px] rounded-full border-[14px] border-[#D4AF37] p-2 flex items-center justify-center bg-gradient-to-br from-[#0c2d48] to-[#1e4463] shadow-2xl relative z-10 transition-all duration-700 hover:rotate-12 cursor-pointer group">
                 <div className="text-8xl font-black text-[#D4AF37] tracking-tighter drop-shadow-2xl select-none transform scale-y-110">SD</div>
              </div>
              {/* Detailed Gold Crown & Wreath Overlays */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[#D4AF37] z-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] animate-bounce font-black">
                <Crown size={48} fill="currentColor" strokeWidth={0} />
              </div>
              <div className="absolute inset-x-[-22px] inset-y-[-18px] border-[#D4AF37]/35 border-[6px] rounded-full scale-[1.06] pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.2)]"></div>
              {/* Circular text or subtle wreath could go here */}
            </div>
            
            <div className="flex-1 space-y-5">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-[#0B2149] tracking-tighter leading-[0.75] uppercase select-none drop-shadow-sm">
                S. D. TAXATION <br />
                <div className="flex items-center space-x-10 mt-6 mb-2">
                   <div className="h-[4px] flex-grow bg-[#D4AF37] rounded-full shadow-sm"></div>
                   <span className="text-[#D4AF37] tracking-[0.45em] text-4xl md:text-5xl font-black drop-shadow-md">ASSOCIATE</span>
                   <div className="h-[4px] flex-grow bg-[#D4AF37] rounded-full shadow-sm"></div>
                </div>
              </h1>
              
              <div className="flex flex-wrap gap-6 text-[15px] font-black text-[#0B2149] uppercase tracking-[0.45em] opacity-80 justify-center md:justify-start">
                <span>TAX</span> • <span className="text-[#D4AF37]">COMPLIANCE</span> • <span>ACCOUNTING</span> • <span className="text-[#D4AF37]">ADVISORY</span>
              </div>
              
              <p className="text-[#0B2149] italic font-serif text-3xl md:text-4xl tracking-tight opacity-100 font-black drop-shadow-md pb-2">
                "Your Trusted Partner in Compliance & Growth"
              </p>
            </div>
          </div>

          {/* Precision Software Grid Area */}
          <div className="w-full bg-[#F4F9FF] rounded-[3rem] p-12 border border-blue-50/50 shadow-[inset_0_10px_40px_rgba(11,33,73,0.03)] relative overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0B2149 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            <div className="bg-[#0B2149] text-white text-center py-4 px-24 rounded-full text-lg font-black uppercase tracking-[0.55em] mx-auto mb-16 w-fit shadow-[0_15px_30px_rgba(11,33,73,0.3)] border-t border-white/25 transform -translate-y-4 relative z-10">
              Complete Business Management Software
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
              <ServiceCard icon={Users} title="HR" description="Manage Employennts,\n& Organization" color="#3182ce" />
              <ServiceCard icon={Wallet} title="PAYROLL" description="Salary Processing, Payslips\n& Benefits" color="#2f855a" />
              <ServiceCard icon={ShieldAlert} title="EPF" description="Provident Fund\nManagement" color="#c53030" />
              <ServiceCard icon={Building2} title="ESIC" description="Employees' State\nInsurance" color="#2c7a7b" />
              <ServiceCard icon={Briefcase} title="PT" description="Professional Tax\nManagement" color="#7c4dff" />
              <ServiceCard icon={FileText} title="TDS" description="Tax Deducted at\nSource" color="#f1a100" />
              <ServiceCard icon={TrendingUp} title="GST" description="GST Returns, Invoices\n& Compliance" color="#38a169" />
              <ServiceCard icon={GraduationCap} title="FEES MANAGEMENT" description="School / Institution Fees\nCollection & Reports" color="#1a7fc1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-14 pt-14 border-t-2 border-gray-200/40 relative z-10">
               <ServiceCard subHeader icon={Calculator} title="Accounting" description="Ledgers, Journal Entries, Reports & Financial\nManagement" color="#3182ce" />
               <ServiceCard subHeader icon={BarChart3} title="Reports" description="Analytics, MIS, &\nStatutory Reports" color="#7c4dff" />
            </div>
          </div>

          {/* High-Fidelity Slogan Footer Text */}
          <div className="w-full flex items-center justify-center pt-6">
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-gray-200 rounded-full"></div>
            <span className="mx-14 text-[18px] font-black text-[#0B2149] uppercase tracking-[0.65em] opacity-70 whitespace-nowrap">
              ONE PLATFORM • MULTIPLE SOLUTIONS • ENDLESS POSSIBILITIES
            </span>
            <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* RIGHT SECTION (35% WIDTH - LOGIN CARD) */}
        <div className="lg:w-[35%] bg-[#0B2149] flex flex-col p-4 overflow-hidden relative">
          
          {/* Card Body with precise inward curves */}
          <div className="bg-white rounded-[3rem] flex-grow flex flex-col shadow-2xl relative z-10 overflow-hidden shadow-[inset_0_2px_10px_rgba(255,255,255,1)]">
            
            {/* Header with Perfect Inward Deep Curve Styling */}
            <div className="bg-[#0B2149] text-white pt-20 pb-24 px-14 text-center relative overflow-hidden transition-all duration-1000">
              {/* Pattern Background for Right Card Header */}
              <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }}></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a3d6e]/50 to-transparent"></div>
              
              <h2 className="text-5xl font-black uppercase tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] relative z-10 animate-in fade-in slide-in-from-top-10 duration-1000">WELCOME BACK</h2>
              <p className="text-white text-opacity-80 text-xl mt-4 font-black tracking-tight relative z-10 opacity-70">Sign in to Your Account</p>
              
              {/* The Distinctive Inward Curve - Image Match */}
              <div className="absolute -bottom-1.5 left-0 right-0 h-14 bg-white rounded-t-[100%] scale-x-[1.3] translate-y-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"></div>
            </div>

            {/* Login Context & Form */}
            <div className="px-14 py-14 space-y-12 flex-grow flex flex-col">
              
              {displayError && (
                <div className="p-5 bg-red-50 text-red-600 rounded-2xl text-[15px] font-black border-2 border-red-100 text-center animate-shake py-4 shadow-sm flex items-center justify-center space-x-3">
                   <ShieldAlert size={20} />
                   <span>{displayError}</span>
                </div>
              )}

              {/* Exact Role Grid Implementation */}
              <div className="text-center space-y-10 flex-grow">
                <h4 className="text-[17px] font-black text-[#0B2149] uppercase tracking-[0.6em] opacity-80">LOGIN AS</h4>
                <div className="grid grid-cols-3 gap-6">
                  <RoleCard role="SUPER ADMIN" subtext="Full Access" icon={Crown} color="#8b5cf6" />
                  <RoleCard role="ADMIN" subtext="System Admin" icon={ShieldCheck} color="#3b82f6" />
                  <RoleCard role="HR" subtext="Manage Staff" icon={Users} color="#10b981" />
                  <RoleCard role="EMPLOYEE" subtext="Self Service" icon={Briefcase} color="#f59e0b" />
                  <RoleCard role="ACCOUNTANT" subtext="Finance Mgmt" icon={Calculator} color="#06b6d4" />
                  <RoleCard role="OTHER" subtext="Limited Access" icon={BarChart3} color="#64748b" />
                </div>
              </div>

              {/* Official Brand Identity Footer */}
              <div className="pt-12 border-t-2 border-gray-50 flex flex-col items-center space-y-8">
                 <div className="text-center space-y-2">
                    <p className="text-[20px] font-black text-[#0B2149] uppercase tracking-wide">S. D. TAXATION ASSOCIATE</p>
                    <p className="text-[14px] text-gray-400 font-black uppercase tracking-[0.15em] opacity-80">Complete Business Management Software</p>
                 </div>
                 
                 <div className="flex flex-col space-y-4 w-full text-gray-600 font-black text-[15px] tracking-tight">
                    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 space-y-4 md:space-y-0">
                       <div className="flex items-center space-x-4 transition-all duration-300 hover:text-blue-500 hover:scale-105 cursor-pointer">
                          <Mail size={24} className="text-[#0B2149] opacity-70" />
                          <span className="uppercase font-extrabold tracking-tight">info@sdtaxation.com</span>
                       </div>
                       <div className="hidden md:block h-6 w-[2.5px] bg-gray-200 rounded-full"></div>
                       <div className="flex items-center space-x-4 transition-all duration-300 hover:text-blue-500 hover:scale-105 cursor-pointer">
                          <Phone size={24} className="text-[#0B2149] opacity-70" />
                          <span className="uppercase font-extrabold tracking-tight">+91 98765 43210</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 transition-all duration-300 hover:text-blue-500 hover:scale-105 cursor-pointer group">
                       <Globe size={26} className="text-[#0B2149] opacity-70 group-hover:rotate-12 transition-transform" />
                       <span className="uppercase tracking-[0.35em] border-b-2 border-transparent hover:border-blue-500 font-black">www.sdtaxation.com</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE BOTTOM RIBBON - EXACT MATCH */}
      <div className="fixed bottom-0 left-0 right-0 h-16 md:h-20 bg-[#0B2149] border-t-8 border-[#D4AF37] flex items-center justify-center overflow-hidden z-[60] shadow-[0_-20px_60px_-10px_rgba(11,33,73,0.6)]">
         <div className="flex items-center space-x-28 whitespace-nowrap animate-marquee">
            {['ACCURATE', 'RELIABLE', 'COMPLIANT', 'SECURE'].map((label, i) => (
               <div key={i} className="flex items-center space-x-12 px-14 group">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37] group-hover:scale-150 transition-transform"></div>
                  <span className="text-[20px] md:text-[24px] font-black text-white uppercase tracking-[0.65em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{label}</span>
               </div>
            ))}
            {/* Duplicates for perfect loop */}
            {['ACCURATE', 'RELIABLE', 'COMPLIANT', 'SECURE'].map((label, i) => (
               <div key={`dup-${i}`} className="flex items-center space-x-12 px-14 group">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37] group-hover:scale-150 transition-transform"></div>
                  <span className="text-[20px] md:text-[24px] font-black text-white uppercase tracking-[0.65em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{label}</span>
               </div>
            ))}
         </div>
      </div>

      {/* Golden Wave Ribbon Layer (Bottom Left) */}
      <div className="absolute bottom-0 left-[-15%] right-0 h-[150px] pointer-events-none z-[1] select-none">
          <svg viewBox="0 0 1440 320" className="w-[130%] h-[220px] transform translate-y-24">
            <path fill="#D4AF37" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,234.7C384,245,480,235,576,202.7C672,171,768,117,864,112C960,107,1056,149,1152,170.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 45s linear infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.25s ease-in-out 0s 2;
        }
        ::placeholder {
           color: #cbd5e1 !important;
           opacity: 1 !important;
           font-weight: 900 !important;
           letter-spacing: -0.025em;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active  {
           -webkit-box-shadow: 0 0 0 60px #F9FBFF inset !important;
           -webkit-text-fill-color: #0B2149 !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
           width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
           background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
           background: #D4AF3730;
           border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
