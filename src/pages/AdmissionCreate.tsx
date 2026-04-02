import React, { useState } from 'react';
import {
  User,
  Truck,
  Hotel,
  Receipt,
  Users,
  Plus,
  Upload,
  Calendar,
  ChevronDown,
  Save,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Home,
  Briefcase as Miscellaneous,
  Paperclip,
  Check,
} from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

export default function AdmissionCreate() {
  const { showSuccess } = useNotification();
  const [formData, setFormData] = useState({
    // Student Info
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
    bloodGroup: '',
    house: '',
    height: '',
    weight: '',
    measurementDate: new Date().toISOString().split('T')[0],
    medicalHistory: '',
    
    // Transport
    routeList: '',
    pickupPoint: '',
    feesMonth: '',
    
    // Hostel
    hostel: '',
    roomNo: '',
    
    // Parent/Guardian
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    motherName: '',
    motherPhone: '',
    motherOccupation: '',
    guardianIs: 'Father',
    guardianName: '',
    guardianRelation: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianOccupation: '',
    guardianAddress: '',

    // More Details
    currentAddress: '',
    permanentAddress: '',
    bankAccountNo: '',
    bankName: '',
    ifscCode: '',
    nationalId: '',
    localId: '',
    rte: 'No',
    previousSchool: '',
    moreNote: '',
  });

  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeeToggle = (id: string) => {
    setSelectedFees(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleDiscountToggle = (id: string) => {
    setSelectedDiscounts(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Registration Successful', 'The student registration has been processed successfully.');
    console.log('Form Data:', formData);
    console.log('Selected Fees:', selectedFees);
    console.log('Selected Discounts:', selectedDiscounts);
  };

  const feeItems = [
    { id: 'c1g', label: 'Class 1 General', amount: '6,700.00' },
    { id: 'c1l', label: 'Class 1 Lump Sum', amount: '150.00' },
    { id: 'c1i', label: 'Class 1- I Installment', amount: '300.00' },
    { id: 'c2g', label: 'Class 2 General', amount: '6,550.00' },
    { id: 'c2l', label: 'Class 2 Lump Sum', amount: '350.00' },
    { id: 'bm', label: 'Balance Master', amount: '0.00' },
    { id: 'c3g', label: 'Class 3 General', amount: '7,800.00' },
    { id: 'c4g', label: 'Class 4 General', amount: '8,900.00' },
    { id: 'ex', label: 'Exam', amount: '250.00' },
    { id: 'fe', label: 'Fees', amount: '0.00' },
    { id: 'c5g', label: 'Class 5 General', amount: '10,100.00' },
  ];

  const discountItems = [
    { id: 'd1', label: 'RKS Discount 1 - rksdisc01' },
    { id: 'd2', label: 'Sibling Discount - sibling-disc' },
    { id: 'd3', label: 'Handicapped Discount - handicap-disc' },
    { id: 'd4', label: 'Class Topper Discount - cls-top-disc' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-indigo-100">
        <h1 className="text-2xl font-black text-gray-900 flex items-center">
          <User size={30} className="mr-3 text-indigo-600" />
          Student Admission
        </h1>
        <button className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95 group">
          <Upload size={14} className="group-hover:-translate-y-1 transition-transform" />
          <span>Import Student</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* SECTION 1: Student Admission Details */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
            <h2 className="text-sm font-black text-gray-900 flex items-center">
              <Plus size={18} className="mr-2 text-indigo-600" />
              Student Admission
            </h2>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InputField label="Admission No" value={formData.admissionNo} onChange={(v) => handleInputChange('admissionNo', v)} required />
            <InputField label="Roll Number" value={formData.rollNo} onChange={(v) => handleInputChange('rollNo', v)} />
            <SelectField label="Class" value={formData.class} options={['Class 1', 'Class 2', 'Class 3']} onChange={(v) => handleInputChange('class', v)} required />
            <SelectField label="Section" value={formData.section} options={['Section A', 'Section B', 'Section C']} onChange={(v) => handleInputChange('section', v)} required />
            <InputField label="First Name" value={formData.firstName} onChange={(v) => handleInputChange('firstName', v)} required />
            <InputField label="Last Name" value={formData.lastName} onChange={(v) => handleInputChange('lastName', v)} />
            <SelectField label="Gender" value={formData.gender} options={['Male', 'Female', 'Other']} onChange={(v) => handleInputChange('gender', v)} required />
            <DateField label="Date of Birth" value={formData.dob} onChange={(v) => handleInputChange('dob', v)} required />
            <SelectField label="Category" value={formData.category} options={['General', 'OBC', 'SC', 'ST']} onChange={(v) => handleInputChange('category', v)} />
            <InputField label="Religion" value={formData.religion} onChange={(v) => handleInputChange('religion', v)} />
            <InputField label="Caste" value={formData.caste} onChange={(v) => handleInputChange('caste', v)} />
            <InputField label="Mobile Number" value={formData.mobile} onChange={(v) => handleInputChange('mobile', v)} icon={<Phone size={14}/>} />
            <InputField label="Email" value={formData.email} onChange={(v) => handleInputChange('email', v)} icon={<Mail size={14}/>} />
            <DateField label="Admission Date" value={formData.admissionDate} onChange={(v) => handleInputChange('admissionDate', v)} />
            <FileUploadField label="Student Photo" />
            <SelectField label="Blood Group" value={formData.bloodGroup} options={['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']} onChange={(v) => handleInputChange('bloodGroup', v)} />
            <SelectField label="House" value={formData.house} options={['Red House', 'Blue House', 'Green House', 'Yellow House']} onChange={(v) => handleInputChange('house', v)} />
            <InputField label="Height" value={formData.height} onChange={(v) => handleInputChange('height', v)} placeholder="e.g. 150 cm" />
            <InputField label="Weight" value={formData.weight} onChange={(v) => handleInputChange('weight', v)} placeholder="e.g. 45 kg" />
            <DateField label="Measurement Date" value={formData.measurementDate} onChange={(v) => handleInputChange('measurementDate', v)} />
          </div>
          <div className="px-8 pb-8">
            <TextAreaField label="Medical History" value={formData.medicalHistory} onChange={(v) => handleInputChange('medicalHistory', v)} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION 2: Transport Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
              <h2 className="text-sm font-black text-gray-900 flex items-center">
                <Truck size={18} className="mr-2 text-indigo-600" />
                Transport Details
              </h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField label="Route List" value={formData.routeList} options={['Route 1', 'Route 2', 'Route 3']} onChange={(v) => handleInputChange('routeList', v)} />
              <SelectField label="Pickup Point" value={formData.pickupPoint} options={['Point A', 'Point B', 'Point C']} onChange={(v) => handleInputChange('pickupPoint', v)} />
              <div className="md:col-span-2">
                <SelectField label="Fees Month" value={formData.feesMonth} options={['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']} onChange={(v) => handleInputChange('feesMonth', v)} />
              </div>
            </div>
          </div>

          {/* SECTION 3: Hostel Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
              <h2 className="text-sm font-black text-gray-900 flex items-center">
                <Hotel size={18} className="mr-2 text-indigo-600" />
                Hostel Details
              </h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField label="Hostel" value={formData.hostel} options={['Main Hostel', 'Junior Hostel']} onChange={(v) => handleInputChange('hostel', v)} />
              <SelectField label="Room No." value={formData.roomNo} options={['101', '102', '103']} onChange={(v) => handleInputChange('roomNo', v)} />
            </div>
          </div>
        </div>

        {/* SECTION 4: Fees Details */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
            <h2 className="text-sm font-black text-gray-900 flex items-center">
              <Receipt size={18} className="mr-2 text-indigo-600" />
              Fees Details
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {feeItems.map((item) => (
              <div key={item.id} className="px-8 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-all group">
                <div className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    id={item.id}
                    checked={selectedFees.includes(item.id)}
                    onChange={() => handleFeeToggle(item.id)}
                    className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
                  />
                  <div className="flex items-center space-x-2">
                    <Plus size={14} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                    <label htmlFor={item.id} className="text-sm font-bold text-gray-800 cursor-pointer">{item.label}</label>
                  </div>
                </div>
                <span className="text-sm font-black font-mono text-gray-900 tracking-tighter">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: Fees Discount Details */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
            <h2 className="text-sm font-black text-gray-900 flex items-center">
              <TagIcon size={18} className="mr-2 text-indigo-600" />
              Fees Discount Details
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {discountItems.map((item) => (
              <div key={item.id} className="px-8 py-4 flex items-center space-x-4 hover:bg-gray-50/50 transition-all group">
                <input 
                  type="checkbox" 
                  id={item.id}
                  checked={selectedDiscounts.includes(item.id)}
                  onChange={() => handleDiscountToggle(item.id)}
                  className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
                />
                <div className="flex items-center space-x-2">
                  <Plus size={14} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                  <label htmlFor={item.id} className="text-sm font-bold text-gray-800 cursor-pointer">{item.label}</label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: Parent Guardian Detail */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
            <h2 className="text-sm font-black text-gray-900 flex items-center">
              <Users size={18} className="mr-2 text-indigo-600" />
              Parent Guardian Detail
            </h2>
          </div>
          <div className="p-8 space-y-10">
            {/* Father & Mother Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <InputField label="Father Name" value={formData.fatherName} onChange={(v) => handleInputChange('fatherName', v)} />
              <InputField label="Father Phone" value={formData.fatherPhone} onChange={(v) => handleInputChange('fatherPhone', v)} icon={<Phone size={14}/>} />
              <InputField label="Father Occupation" value={formData.fatherOccupation} onChange={(v) => handleInputChange('fatherOccupation', v)} icon={<Briefcase size={14}/>} />
              <FileUploadField label="Father Photo" />
              
              <InputField label="Mother Name" value={formData.motherName} onChange={(v) => handleInputChange('motherName', v)} />
              <InputField label="Mother Phone" value={formData.motherPhone} onChange={(v) => handleInputChange('motherPhone', v)} icon={<Phone size={14}/>} />
              <InputField label="Mother Occupation" value={formData.motherOccupation} onChange={(v) => handleInputChange('motherOccupation', v)} icon={<Briefcase size={14}/>} />
              <FileUploadField label="Mother Photo" />
            </div>

            {/* Guardian Selection */}
            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-bold text-gray-800 ml-1">If Guardian Is <span className="text-rose-500">*</span></label>
              </div>
              <div className="flex items-center space-x-6">
                {['Father', 'Mother', 'Other'].map((opt) => (
                  <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.guardianIs === opt ? 'border-indigo-600 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                      {formData.guardianIs === opt && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                    </div>
                    <input type="radio" value={opt} checked={formData.guardianIs === opt} onChange={(e) => handleInputChange('guardianIs', (e.target as HTMLInputElement).value)} className="hidden" />
                    <span className={`text-sm font-bold transition-all ${formData.guardianIs === opt ? 'text-indigo-600 scale-105' : 'text-gray-500 group-hover:text-gray-700'}`}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Guardian Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <InputField label="Guardian Name" value={formData.guardianName} onChange={(v) => handleInputChange('guardianName', v)} required />
              <InputField label="Guardian Relation" value={formData.guardianRelation} onChange={(v) => handleInputChange('guardianRelation', v)} />
              <InputField label="Guardian Email" value={formData.guardianEmail} onChange={(v) => handleInputChange('guardianEmail', v)} icon={<Mail size={14}/>} />
              <FileUploadField label="Guardian Photo" />
              <InputField label="Guardian Phone" value={formData.guardianPhone} onChange={(v) => handleInputChange('guardianPhone', v)} required icon={<Phone size={14}/>} />
              <InputField label="Guardian Occupation" value={formData.guardianOccupation} onChange={(v) => handleInputChange('guardianOccupation', v)} icon={<Briefcase size={14}/>} />
              <div className="md:col-span-2">
                <InputField label="Guardian Address" value={formData.guardianAddress} onChange={(v) => handleInputChange('guardianAddress', v)} icon={<MapPin size={14}/>} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: Add More Details Toggle */}
        <div 
          onClick={() => setShowMoreDetails(!showMoreDetails)}
          className={`rounded-2xl p-5 flex items-center justify-between border transition-all group cursor-pointer active:scale-[0.99] ${showMoreDetails ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}
        >
          <h3 className={`text-sm font-black flex items-center ${showMoreDetails ? 'text-indigo-700' : 'text-gray-500'}`}>
            <Plus size={18} className={`mr-2 transition-transform duration-300 ${showMoreDetails ? 'rotate-45' : ''}`} />
            {showMoreDetails ? 'Hide Extra Details' : 'Add More Details'}
          </h3>
          <ChevronDown size={20} className={`text-gray-400 group-hover:text-indigo-600 transition-all duration-300 ${showMoreDetails ? 'rotate-180' : ''}`} />
        </div>

        {/* EXPANDABLE CONTENT */}
        {showMoreDetails && (
          <div className="space-y-8 animate-in slide-in-from-top-4 duration-500">
            {/* Student Address Details */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
                <h2 className="text-sm font-black text-gray-900 flex items-center">
                  <Home size={18} className="mr-2 text-indigo-600" />
                  Student Address Details
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                    <span className="text-xs font-bold text-gray-600">If Guardian Address Is Current Address</span>
                  </div>
                  <div className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                    <span className="text-xs font-bold text-gray-600">If Permanent Address Is Current Address</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <TextAreaField label="Current Address" value={formData.currentAddress} onChange={(v) => handleInputChange('currentAddress', v)} />
                  <TextAreaField label="Permanent Address" value={formData.permanentAddress} onChange={(v) => handleInputChange('permanentAddress', v)} />
                </div>
              </div>
            </div>

            {/* Miscellaneous Details */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
                <h2 className="text-sm font-black text-gray-900 flex items-center">
                  <Miscellaneous size={18} className="mr-2 text-indigo-600" />
                  Miscellaneous Details
                </h2>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="Bank Account Number" value={formData.bankAccountNo} onChange={(v) => handleInputChange('bankAccountNo', v)} />
                  <InputField label="Bank Name" value={formData.bankName} onChange={(v) => handleInputChange('bankName', v)} />
                  <InputField label="IFSC Code" value={formData.ifscCode} onChange={(v) => handleInputChange('ifscCode', v)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="National Identification Number" value={formData.nationalId} onChange={(v) => handleInputChange('nationalId', v)} />
                  <InputField label="Local Identification Number" value={formData.localId} onChange={(v) => handleInputChange('localId', v)} />
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-800 ml-1 block">RTE</label>
                    <div className="flex items-center space-x-6 h-[46px]">
                      {['Yes', 'No'].map((opt) => (
                        <label key={opt} className="flex items-center space-x-3 cursor-pointer">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.rte === opt ? 'border-indigo-600 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                            {formData.rte === opt && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                          </div>
                          <input type="radio" value={opt} checked={formData.rte === opt} onChange={(e) => handleInputChange('rte', (e.target as HTMLInputElement).value)} className="hidden" />
                          <span className={`text-sm font-bold ${formData.rte === opt ? 'text-indigo-600' : 'text-gray-500'}`}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <TextAreaField label="Previous School Details" value={formData.previousSchool} onChange={(v) => handleInputChange('previousSchool', v)} />
                  <TextAreaField label="Note" value={formData.moreNote} onChange={(v) => handleInputChange('moreNote', v)} />
                </div>
              </div>
            </div>

            {/* Upload Documents Details */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-8 py-5">
                <h2 className="text-sm font-black text-gray-900 flex items-center">
                  <Paperclip size={18} className="mr-2 text-indigo-600" />
                  Upload Documents
                </h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-end space-x-4">
                      <div className="text-sm font-black text-gray-300 pb-4">{num}.</div>
                      <div className="flex-1">
                        <InputField label="Title" value="" onChange={() => {}} placeholder="Enter document title" />
                      </div>
                      <div className="flex-1">
                        <FileUploadField label="Document" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer: Save Button */}
        <div className="flex justify-end pt-6">
          <button type="submit" className="flex items-center space-x-3 px-10 py-3.5 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all group">
            <Save size={18} className="group-hover:rotate-12 transition-transform" />
            <span>Save Registration</span>
          </button>
        </div>

      </form>
    </div>
  );
}

{/* SECTION COMPONENTS */}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
}

function InputField({ label, value, onChange, icon, required = false, placeholder = '' }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-800 ml-1 block">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"
        />
        {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors">{icon}</div>}
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  required?: boolean;
}

function SelectField({ label, value, options, onChange, required = false }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-800 ml-1 block">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-5 py-3 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm appearance-none cursor-pointer"
        >
          <option value="">Select</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 pointer-events-none transition-colors" />
      </div>
    </div>
  );
}

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

function DateField({ label, value, onChange, required = false }: DateFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-800 ml-1 block">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative group">
        <input 
          type="date" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-5 pr-10 py-3 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"
        />
        <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 pointer-events-none transition-colors" />
      </div>
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function TextAreaField({ label, value, onChange }: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-800 ml-1 block">{label}</label>
      <textarea 
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 bg-white border border-gray-300 rounded-2xl text-sm font-medium text-gray-900 outline-none focus:border-indigo-500 transition-all shadow-sm resize-none placeholder:text-gray-300"
        placeholder="Provide historical context or clinical notes..."
      />
    </div>
  );
}

function FileUploadField({ label }: { label: string }) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-800 ml-1 block">{label} (100px X 100px)</label>
      <label className="border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50 hover:border-indigo-300 hover:bg-white transition-all cursor-pointer group shadow-sm">
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
          accept="image/*"
        />
        <div className="flex items-center space-x-2 text-indigo-600 mb-1">
          <Upload size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-[9px] font-black">
            {fileName ? 'Uploaded' : 'Upload'}
          </span>
        </div>
        <p className="text-[8px] text-gray-400 font-bold text-center leading-tight">
          {fileName ? fileName : 'Drag and drop or click to browse'}
        </p>
      </label>
    </div>
  );
}

function TagIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}
