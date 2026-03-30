import React, { useState, useEffect } from 'react';
import {
  User,
  CreditCard,
  Percent,
  Truck,
  Users,
  MapPin,
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
  Home,
  CheckCircle2,
  XCircle,
  LucideIcon
} from 'lucide-react';

interface EditOnlineAdmissionProps {
    record: any;
    onClose: () => void;
}

export default function EditOnlineAdmission({ record, onClose }: EditOnlineAdmissionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    admissionNo: record?.refNo || '',
    rollNo: '',
    class: record?.class?.split('(')[0]?.trim() || '',
    section: record?.class?.match(/\(([^)]+)\)/)?.[1] || '',
    firstName: record?.name?.split(' ')[0] || '',
    lastName: record?.name?.split(' ').slice(1).join(' ') || '',
    gender: record?.gender || '',
    dob: record?.dob || '',
    category: record?.category || '',
    religion: '',
    caste: '',
    mobile: record?.mobile || '',
    email: '',
    admissionDate: new Date().toISOString().split('T')[0],
    
    // Step 2: Fees
    selectedFees: [] as string[],
    
    // Step 3: Discounts
    selectedDiscounts: [] as string[],
    
    // Step 4: Transport
    routeList: '',
    pickupPoint: '',
    transportFees: '0.00',
    
    // Step 5: Parent/Guardian
    fatherName: record?.father || '',
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

    // Step 6: Address
    currentAddress: '',
    permanentAddress: '',
    sameAsCurrent: false,
    details: ''
  });

  const steps = [
    { id: 1, title: 'Basic Info', icon: User },
    { id: 2, title: 'Fees Details', icon: CreditCard },
    { id: 3, title: 'Discounts', icon: Percent },
    { id: 4, title: 'Transport', icon: Truck },
    { id: 5, title: 'Parents', icon: Users },
    { id: 6, title: 'Address', icon: MapPin }
  ];

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Online Admission Record Updated Successfully!');
    onClose();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
            >
                <ChevronLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Edit Online Admission</h1>
                <p className="text-[10px] font-black text-indigo-600 mt-1 uppercase tracking-[0.2em]">Reference: {record?.refNo}</p>
            </div>
         </div>
         <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${record?.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {record?.paymentStatus}
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${record?.formStatus.includes('Submitted') ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'}`}>
                {record?.formStatus}
            </div>
         </div>
      </div>

      {/* Stepper Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between relative px-4">
            {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center relative z-10">
                             <div 
                                onClick={() => setCurrentStep(step.id)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border-2 cursor-pointer ${
                                    isActive ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100 scale-110 text-white' : 
                                    isCompleted ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-50' : 
                                    'bg-gray-50 border-gray-100 text-gray-400 hover:border-indigo-200'
                                }`}
                             >
                                {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                             </div>
                             <span className={`text-[8px] font-black uppercase mt-2 tracking-widest whitespace-nowrap ${isActive ? 'text-indigo-600' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`}>
                                {step.title}
                             </span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 -mt-6 transition-all duration-700 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
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
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">General Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <InputField label="Admission No" value={formData.admissionNo} onChange={(v) => setFormData({...formData, admissionNo: v})} icon={Hash} />
                    <InputField label="Roll Number" value={formData.rollNo} onChange={(v) => setFormData({...formData, rollNo: v})} />
                    
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Class</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20" value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})}>
                            <option value="Class 1">Class 1</option>
                            <option value="Class 2">Class 2</option>
                            <option value="Class 5">Class 5</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Section</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20" value={formData.section} onChange={(e) => setFormData({...formData, section: e.target.value})}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <InputField label="First Name" value={formData.firstName} onChange={(v) => setFormData({...formData, firstName: v})} />
                    <InputField label="Last Name" value={formData.lastName} onChange={(v) => setFormData({...formData, lastName: v})} />
                    
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <InputField label="Date Of Birth" type="date" value={formData.dob} onChange={(v) => setFormData({...formData, dob: v})} icon={Calendar} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputField label="Category" value={formData.category} onChange={(v) => setFormData({...formData, category: v})} />
                    <InputField label="Mobile Number" value={formData.mobile} onChange={(v) => setFormData({...formData, mobile: v})} />
                    <InputField label="Email Address" value={formData.email} onChange={(v) => setFormData({...formData, email: v})} />
                </div>

                <div className="space-y-1.5 mt-6">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Details / Remarks</label>
                    <textarea 
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-gray-900"
                        placeholder="Additional student information or remarks..."
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                    ></textarea>
                </div>
            </div>
          )}

          {/* STEP 2: FEES DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Fee Assignments</h3>
                </div>

                <div className="space-y-3">
                    {[
                        { id: 'f1', label: 'Class 1 General', amount: '6,700.00' },
                        { id: 'f2', label: 'Class 1 Lump Sum', amount: '150.00' },
                        { id: 'f3', label: 'Class 1-I Installment', amount: '300.00' }
                    ].map(fee => (
                        <div key={fee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white transition-all cursor-pointer group" onClick={() => {
                            const updated = formData.selectedFees.includes(fee.id) ? formData.selectedFees.filter(id => id !== fee.id) : [...formData.selectedFees, fee.id];
                            setFormData({...formData, selectedFees: updated});
                        }}>
                            <div className="flex items-center space-x-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${formData.selectedFees.includes(fee.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-200'}`}>
                                    {formData.selectedFees.includes(fee.id) && <Plus size={12} />}
                                </div>
                                <span className="text-xs font-black text-gray-700 uppercase">{fee.label}</span>
                            </div>
                            <span className="text-xs font-black font-mono text-gray-900">₹{fee.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {/* STEP 3: DISCOUNT DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center space-x-2 border-l-4 border-amber-500 pl-4 py-1">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Available Discounts</h3>
                </div>

                <div className="space-y-3">
                    {[
                        { id: 'd1', label: 'Early Bird Discount', amount: '10%' },
                        { id: 'd2', label: 'Sibling Discount', amount: '₹500.00' },
                        { id: 'd3', label: 'Scholarship (Grade A)', amount: '₹2,000.00' }
                    ].map(discount => (
                        <div key={discount.id} className="flex items-center justify-between p-4 bg-amber-50/30 rounded-2xl border border-amber-100 hover:bg-white transition-all cursor-pointer group" onClick={() => {
                            const updated = formData.selectedDiscounts.includes(discount.id) ? formData.selectedDiscounts.filter(id => id !== discount.id) : [...formData.selectedDiscounts, discount.id];
                            setFormData({...formData, selectedDiscounts: updated});
                        }}>
                            <div className="flex items-center space-x-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${formData.selectedDiscounts.includes(discount.id) ? 'bg-amber-500 border-amber-500 text-white' : 'border-amber-200'}`}>
                                    {formData.selectedDiscounts.includes(discount.id) && <Plus size={12} />}
                                </div>
                                <span className="text-xs font-black text-amber-900 uppercase">{discount.label}</span>
                            </div>
                            <span className="text-xs font-black font-mono text-amber-600">{discount.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {/* STEP 4: TRANSPORT DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center space-x-2 border-l-4 border-blue-600 pl-4 py-1">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Transport Fleet & Logistics</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Route List</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" value={formData.routeList} onChange={(e) => setFormData({...formData, routeList: e.target.value})}>
                            <option value="">Select Route</option>
                            <option value="Route 1">Route 1 (Main City)</option>
                            <option value="Route 2">Route 2 (Suburbs)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pickup Point</label>
                        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" value={formData.pickupPoint} onChange={(e) => setFormData({...formData, pickupPoint: e.target.value})}>
                            <option value="">Select Point</option>
                            <option value="Point A">Point A</option>
                            <option value="Point B">Point B</option>
                        </select>
                    </div>
                    <InputField label="Transport Fees" value={formData.transportFees} onChange={(v) => setFormData({...formData, transportFees: v})} icon={Activity} />
                </div>
                
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-center space-x-4">
                     <div className="p-3 bg-white rounded-xl shadow-sm">
                        <Truck className="text-blue-600" size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Logistics Note</p>
                        <p className="text-xs font-bold text-blue-900 mt-1 uppercase italic tracking-tight">Active fleet tracking enabled for this selection.</p>
                     </div>
                </div>
            </div>
          )}

          {/* STEP 5: PARENT/GUARDIAN */}
          {currentStep === 5 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Father's Details</h3>
                        </div>
                        <InputField label="Name" value={formData.fatherName} onChange={(v) => setFormData({...formData, fatherName: v})} />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Phone" value={formData.fatherPhone} onChange={(v) => setFormData({...formData, fatherPhone: v})} />
                            <InputField label="Occupation" value={formData.fatherOccupation} onChange={(v) => setFormData({...formData, fatherOccupation: v})} />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2 border-l-4 border-rose-500 pl-4 py-1">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Mother's Details</h3>
                        </div>
                        <InputField label="Name" value={formData.motherName} onChange={(v) => setFormData({...formData, motherName: v})} />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField label="Phone" value={formData.motherPhone} onChange={(v) => setFormData({...formData, motherPhone: v})} />
                            <InputField label="Occupation" value={formData.motherOccupation} onChange={(v) => setFormData({...formData, motherOccupation: v})} />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 border-l-4 border-emerald-500 pl-4 py-1">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Guardian Info</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <InputField label="Guardian Name" value={formData.guardianName} onChange={(v) => setFormData({...formData, guardianName: v})} />
                        <InputField label="Relation" value={formData.guardianRelation} onChange={(v) => setFormData({...formData, guardianRelation: v})} />
                        <InputField label="Phone" value={formData.guardianPhone} onChange={(v) => setFormData({...formData, guardianPhone: v})} />
                        <InputField label="Email" value={formData.guardianEmail} onChange={(v) => setFormData({...formData, guardianEmail: v})} />
                    </div>
                </div>
            </div>
          )}

          {/* STEP 6: ADDRESS & OTHER */}
          {currentStep === 6 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Residential Footprint</h3>
                </div>

                <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Address</label>
                        <textarea 
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            value={formData.currentAddress}
                            onChange={(e) => setFormData({...formData, currentAddress: e.target.value})}
                        ></textarea>
                     </div>

                     <div className="flex items-center space-x-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <input 
                            type="checkbox" 
                            id="same"
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-0" 
                            checked={formData.sameAsCurrent}
                            onChange={(e) => setFormData({...formData, sameAsCurrent: e.target.checked})}
                        />
                        <label htmlFor="same" className="text-[10px] font-black text-gray-500 uppercase tracking-widest cursor-pointer">Permanent address is same as current address</label>
                     </div>

                     {!formData.sameAsCurrent && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Permanent Address</label>
                            <textarea 
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                value={formData.permanentAddress}
                                onChange={(e) => setFormData({...formData, permanentAddress: e.target.value})}
                            ></textarea>
                        </div>
                     )}
                </div>
            </div>
          )}

        </form>

        {/* Action Buttons Footer */}
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
             <button 
                type="button"
                onClick={handlePrevious}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    currentStep === 1 
                    ? 'text-gray-300 pointer-events-none' 
                    : 'text-gray-600 hover:bg-white hover:border-gray-300 border border-transparent active:scale-95'
                }`}
             >
                <ChevronLeft size={16} />
                <span>Go Back</span>
             </button>

             <div className="flex items-center space-x-3">
                <button 
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
                >
                    Cancel Edit
                </button>
                {currentStep < 6 ? (
                    <button 
                        type="button"
                        onClick={handleNext}
                        className="flex items-center space-x-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        <span>Next Leg</span>
                        <ChevronRight size={16} />
                    </button>
                ) : (
                    <button 
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-10 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all"
                    >
                        <Save size={16} />
                        <span>Confirm Updates</span>
                    </button>
                )}
             </div>
        </div>
      </div>
    </div>
  );
}

{/* Helper Components */}
interface InputFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    icon?: LucideIcon;
    className?: string;
}

function InputField({ label, value, onChange, type = 'text', icon: Icon, className = '' }: InputFieldProps) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative group">
                {Icon && <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />}
                <input 
                    type={type} 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className={`w-full ${Icon ? 'pl-9' : 'px-4'} pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-gray-900 group-focus-within:bg-white`}
                />
            </div>
        </div>
    );
}
