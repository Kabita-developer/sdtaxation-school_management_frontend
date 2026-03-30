import React, { useState } from 'react';
import {
  User,
  Image as ImageIcon,
  Truck,
  CreditCard,
  Users,
  ChevronRight,
  ChevronLeft,
  Save,
  Plus,
  Upload,
  Calendar,
  Hash,
  School,
  Layers,
  Activity,
  MapPin,
  Home,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AdmissionCreate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    admissionNo: '',
    rollNo: '',
    class: '',
    section: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    category: '',
    religion: '',
    caste: '',
    mobile: '',
    email: '',
    admissionDate: new Date().toISOString().split('T')[0],
    
    // Step 2: Additional Info
    bloodGroup: '',
    house: '',
    height: '',
    weight: '',
    measurementDate: new Date().toISOString().split('T')[0],
    medicalHistory: '',
    
    // Step 3: Transport & Hostel
    routeList: '',
    pickupPoint: '',
    hostel: '',
    roomNo: '',
    
    // Step 4: Fees (selection)
    selectedFees: [] as string[],
    
    // Step 5: Parent/Guardian
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    motherName: '',
    motherPhone: '',
    motherOccupation: '',
    guardianIs: 'father',
    guardianName: '',
    guardianRelation: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianOccupation: '',
    guardianAddress: '',
    details: ''
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: User },
    { id: 2, title: 'Additional Info', icon: Plus },
    { id: 3, title: 'Transport & Hostel', icon: Truck },
    { id: 4, title: 'Fees Details', icon: CreditCard },
    { id: 5, title: 'Parent/Guardian', icon: Users }
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Student Admission Data Saved Successfully!');
    console.log(formData);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Student Admission</h1>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">New Student Enrollment Wizard</p>
         </div>
         <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
            <Upload size={14} />
            <span>IMPORT STUDENT</span>
         </button>
      </div>

      {/* Stepper Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between relative px-8">
            {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center relative z-10 transition-all duration-500">
                             <div 
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                                    isActive ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100 scale-110' : 
                                    isCompleted ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-50' : 
                                    'bg-gray-50 border-gray-100 text-gray-400'
                                }`}
                             >
                                {isCompleted ? <CheckCircle2 size={24} className="text-white" /> : <Icon size={20} className={isActive ? 'text-white' : ''} />}
                             </div>
                             <span className={`text-[10px] font-black uppercase mt-3 tracking-widest ${isActive ? 'text-indigo-600' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`}>
                                {step.title}
                             </span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 -mt-7 transition-all duration-700 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
        <form onSubmit={handleSave} className="flex-1 p-8">
          
          {/* STEP 1: BASIC INFO */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Step 1: Primary Identification</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Admission No <span className="text-red-500">*</span></label>
                        <div className="relative group">
                            <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input 
                                type="text" value={formData.admissionNo} 
                                onChange={(e) => setFormData({...formData, admissionNo: e.target.value})}
                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-mono"
                                placeholder="ADM-0001"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Roll Number</label>
                        <input 
                            type="text" value={formData.rollNo} 
                            onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Class <span className="text-red-500">*</span></label>
                        <div className="relative group">
                           <School size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                           <select 
                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none"
                                value={formData.class}
                                onChange={(e) => setFormData({...formData, class: e.target.value})}
                           >
                                <option value="">Select</option>
                                <option value="I">Class I</option>
                                <option value="X">Class X</option>
                           </select>
                           <ChevronDownIcon />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Section <span className="text-red-500">*</span></label>
                        <div className="relative group">
                           <Layers size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                           <select 
                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none"
                                value={formData.section}
                                onChange={(e) => setFormData({...formData, section: e.target.value})}
                           >
                                <option value="">Select</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                           </select>
                           <ChevronDownIcon />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">First Name <span className="text-red-500">*</span></label>
                        <input 
                            type="text" placeholder="John"
                            value={formData.firstName} 
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-sans italic"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Last Name</label>
                        <input 
                            type="text" placeholder="Doe"
                            value={formData.lastName} 
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-sans italic"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Gender <span className="text-red-500">*</span></label>
                        <select 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                            value={formData.gender}
                            onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Date Of Birth <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="date" value={formData.dob} 
                                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Category</label>
                        <select 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="">Select</option>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                            <option value="SC/ST">SC/ST</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Religion</label>
                        <input 
                            type="text" value={formData.religion} 
                            onChange={(e) => setFormData({...formData, religion: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Mobile Number</label>
                        <input 
                            type="tel" value={formData.mobile} 
                            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                        />
                    </div>
                    <div className="space-y-1.5 lg:col-span-2">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Email</label>
                        <input 
                            type="email" value={formData.email} 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                            placeholder="student@school.com"
                        />
                    </div>
                </div>
                
                <div className="space-y-1.5 mt-6">
                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Details / Remarks</label>
                    <textarea 
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all italic text-gray-500"
                        placeholder="Additional student information or remarks..."
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                    ></textarea>
                </div>
            </div>
          )}

          {/* STEP 2: ADDITIONAL INFO */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Step 2: Bio-Metric & Additional Details</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     {/* Photo Upload Zone */}
                     <div className="lg:col-span-1 space-y-4">
                        <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Student Photo (100x100px)</label>
                        <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 bg-gray-50/50 hover:bg-indigo-50/30 hover:border-indigo-200 transition-all cursor-pointer group">
                             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-300 group-hover:text-indigo-600 shadow-sm transition-colors">
                                <ImageIcon size={32} />
                             </div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center group-hover:text-indigo-600">Drag and drop a file here or click</p>
                        </div>
                     </div>

                     {/* Other Additional Info */}
                     <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Blood Group</label>
                            <select 
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none"
                                value={formData.bloodGroup}
                                onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                            >
                                <option value="">Select</option>
                                <option value="A+">A+</option>
                                <option value="O+">O+</option>
                                <option value="B+">B+</option>
                                <option value="AB+">AB+</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">House</label>
                            <select 
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none"
                                value={formData.house}
                                onChange={(e) => setFormData({...formData, house: e.target.value})}
                            >
                                <option value="">Select</option>
                                <option value="Red">Red House</option>
                                <option value="Blue">Blue House</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Height (cm)</label>
                            <input 
                                type="text" value={formData.height} 
                                onChange={(e) => setFormData({...formData, height: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Weight (kg)</label>
                            <input 
                                type="text" value={formData.weight} 
                                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none"
                            />
                        </div>
                     </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Medical History</label>
                         <button className="flex items-center space-x-1 text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform">
                            <Plus size={12} />
                            <span>Add Sibling</span>
                         </button>
                    </div>
                    <textarea 
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all italic text-gray-500"
                        placeholder="Detail any allergies, chronic conditions, or previous operations..."
                        value={formData.medicalHistory}
                        onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                    ></textarea>
                </div>
            </div>
          )}

          {/* STEP 3: TRANSPORT & HOSTEL */}
          {currentStep === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-6">
                    <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Transport Fleet Assignment</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Route List</label>
                            <div className="relative group">
                                <Truck size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                                <select 
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none"
                                    value={formData.routeList}
                                    onChange={(e) => setFormData({...formData, routeList: e.target.value})}
                                >
                                    <option value="">Select</option>
                                    <option value="Route 1">Route 1 (Main City)</option>
                                </select>
                                <ChevronDownIcon />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Pickup Point</label>
                            <div className="relative group">
                                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                                <select 
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none"
                                    value={formData.pickupPoint}
                                    onChange={(e) => setFormData({...formData, pickupPoint: e.target.value})}
                                >
                                    <option value="">Select</option>
                                    <option value="Point A">Point A</option>
                                </select>
                                <ChevronDownIcon />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Residential (Hostel) Setup</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Hostel</label>
                            <div className="relative group">
                                <Home size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none">
                                    <option value="">Select</option>
                                </select>
                                <ChevronDownIcon />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Room No.</label>
                            <div className="relative group">
                                <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none">
                                    <option value="">Select</option>
                                </select>
                                <ChevronDownIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {/* STEP 4: FEES DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Fee Group Allocation</h3>
                </div>

                <div className="space-y-3">
                     {[
                        { id: 'f1', label: 'Class 1 General', amount: '6,700.00' },
                        { id: 'f2', label: 'Class 1 Lump Sum', amount: '150.00' },
                        { id: 'f3', label: 'Class 1- I Installment', amount: '300.00' },
                        { id: 'f4', label: 'Class 2 General', amount: '6,550.00' },
                        { id: 'f5', label: 'Class 2 Lump Sum', amount: '350.00' },
                        { id: 'f6', label: 'Balance Master', amount: '0.00' },
                        { id: 'f7', label: 'Class 3 General', amount: '7,800.00' },
                        { id: 'f8', label: 'Class 4 General', amount: '8,900.00' },
                        { id: 'f9', label: 'Exam', amount: '250.00' },
                        { id: 'f10', label: 'Fees', amount: '0.00' },
                        { id: 'f11', label: 'Class 5 General', amount: '10,100.00' },
                        { id: 'f12', label: 'Edword Fees Group 2', amount: '500.00' },
                        { id: 'f13', label: 'RKS Fees Test One', amount: '600.00' }
                     ].map((fee) => (
                        <div key={fee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-white transition-all group active:scale-[0.99]">
                             <div className="flex items-center space-x-3">
                                 <div className="w-6 h-6 bg-white border-2 border-indigo-100 rounded-lg flex items-center justify-center text-white transition-colors">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 text-indigo-600 rounded focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                        checked={formData.selectedFees.includes(fee.id)}
                                        onChange={(e) => {
                                            const updated = e.target.checked 
                                                ? [...formData.selectedFees, fee.id]
                                                : formData.selectedFees.filter(id => id !== fee.id);
                                            setFormData({...formData, selectedFees: updated});
                                        }}
                                    />
                                 </div>
                                 <Plus size={14} className="text-gray-300 group-hover:text-indigo-400" />
                                 <span className="text-xs font-black text-gray-700 uppercase tracking-wide">{fee.label}</span>
                             </div>
                             <span className="text-xs font-black text-gray-900 font-mono">₹{fee.amount}</span>
                        </div>
                     ))}
                </div>

                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white">
                            <Activity size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total Allocated Sum</p>
                            <p className="text-xl font-black text-indigo-900 leading-none mt-1 uppercase italic">Structural Calculation Pending</p>
                        </div>
                     </div>
                     <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100 hover:bg-indigo-50 transition-colors">Apply Discount</button>
                </div>
            </div>
          )}

          {/* STEP 5: PARENT/GUARDIAN */}
          {currentStep === 5 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Parents Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2 border-l-4 border-blue-600 pl-4 py-1">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Father's Identification</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <InputField label="Father Name" value={formData.fatherName} onChange={(v) => setFormData({...formData, fatherName: v})} />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Phone" value={formData.fatherPhone} onChange={(v) => setFormData({...formData, fatherPhone: v})} />
                                <InputField label="Occupation" value={formData.fatherOccupation} onChange={(v) => setFormData({...formData, fatherOccupation: v})} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2 border-l-4 border-rose-600 pl-4 py-1">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Mother's Identification</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <InputField label="Mother Name" value={formData.motherName} onChange={(v) => setFormData({...formData, motherName: v})} />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Phone" value={formData.motherPhone} onChange={(v) => setFormData({...formData, motherPhone: v})} />
                                <InputField label="Occupation" value={formData.motherOccupation} onChange={(v) => setFormData({...formData, motherOccupation: v})} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guardian Section */}
                <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Guardian Authorization</h3>
                        </div>
                        <div className="flex items-center space-x-6">
                             {['father', 'mother', 'other'].map((opt) => (
                                <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                                    <input 
                                        type="radio" name="guardian" 
                                        className="w-4 h-4 text-indigo-600 focus:ring-0" 
                                        checked={formData.guardianIs === opt}
                                        onChange={() => setFormData({...formData, guardianIs: opt})}
                                    />
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors uppercase">{opt}</span>
                                </label>
                             ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <InputField label="Guardian Name" value={formData.guardianName} onChange={(v) => setFormData({...formData, guardianName: v})} />
                        <InputField label="Relationship" value={formData.guardianRelation} onChange={(v) => setFormData({...formData, guardianRelation: v})} />
                        <InputField label="Email Address" value={formData.guardianEmail} onChange={(v) => setFormData({...formData, guardianEmail: v})} />
                        <InputField label="Primary Contact" value={formData.guardianPhone} onChange={(v) => setFormData({...formData, guardianPhone: v})} />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <InputField label="Occupation" className="lg:col-span-1" value={formData.guardianOccupation} onChange={(v) => setFormData({...formData, guardianOccupation: v})} />
                        <div className="lg:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Full Guardian Address</label>
                            <input 
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                                value={formData.guardianAddress}
                                onChange={(e) => setFormData({...formData, guardianAddress: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>
          )}

        </form>

        {/* Action Buttons Footer */}
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
             <button 
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    currentStep === 1 
                    ? 'text-gray-300 border border-gray-100 cursor-not-allowed' 
                    : 'text-gray-600 border border-gray-200 hover:bg-white hover:border-gray-300 active:scale-95'
                }`}
             >
                <ChevronLeft size={16} />
                <span>Previous</span>
             </button>

             <div className="flex items-center space-x-3">
                {currentStep < 5 ? (
                    <button 
                        type="button"
                        onClick={handleNext}
                        className="flex items-center space-x-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        <span>Next Step</span>
                        <ChevronRight size={16} />
                    </button>
                ) : (
                    <button 
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-10 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                        <Save size={16} />
                        <span>Authorize Admission</span>
                    </button>
                )}
             </div>
        </div>
      </div>
    </div>
  );
}

{/* Helper Components */}
function InputField({ label, value, onChange, className = '', placeholder = '' }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">{label}</label>
            <input 
                type="text" value={value} 
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-sans"
            />
        </div>
    );
}

function ChevronDownIcon() {
    return <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />;
}
