import { useState, useEffect, useRef } from 'react';
import { 
  List, 
  LayoutGrid, 
  ChevronDown, 
  FileSearch, 
  Edit, 
  Printer, 
  FileSpreadsheet, 
  FileText, 
  Phone, 
  Truck,
  Plus, 
  Search, 
  FileDown, 
  Filter, 
  Trash2, 
  Eye, 
  MoreVertical, 
  X, 
  ChevronRight, 
  User, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  ImageIcon, 
  AlertCircle, 
  MapPin, 
  Home, 
  Hash, 
  School, 
  Layers, 
  Activity, 
  CheckCircle2,
  Save
} from 'lucide-react';

export default function StudentList() {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editStep, setEditStep] = useState(1);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionId(null);
      }
    };
    if (openActionId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openActionId]);

  const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const sections = ['A', 'B', 'C', 'D'];

  const dummyStudents = [
    {
      admissionNo: '1001',
      studentName: 'John Doe',
      rollNo: '101',
      class: 'I - A',
      fatherName: 'Richard Doe',
      dob: '2015-05-12',
      gender: 'Male',
      category: 'General',
      mobile: '+91 9876543210',
      profileImage: 'https://i.pravatar.cc/150?u=1001'
    },
    {
      admissionNo: '1002',
      studentName: 'Jane Smith',
      rollNo: '102',
      class: 'I - A',
      fatherName: 'Robert Smith',
      dob: '2015-08-22',
      gender: 'Female',
      category: 'OBC',
      mobile: '+91 9876543211',
      profileImage: 'https://i.pravatar.cc/150?u=1002'
    },
    {
      admissionNo: '1003',
      studentName: 'Alice Johnson',
      rollNo: '103',
      class: 'I - B',
      fatherName: 'Michael Johnson',
      dob: '2015-11-05',
      gender: 'Female',
      category: 'General',
      mobile: '+91 9876543212',
      profileImage: 'https://i.pravatar.cc/150?u=1003'
    },
    { admissionNo: '1004', studentName: 'Michael Brown', rollNo: '104', class: 'II - A', fatherName: 'William Brown', dob: '2014-03-15', gender: 'Male', category: 'General', mobile: '+91 9876543213', profileImage: 'https://i.pravatar.cc/150?u=1004' },
    { admissionNo: '1005', studentName: 'Emily Davis', rollNo: '105', class: 'II - B', fatherName: 'George Davis', dob: '2014-06-20', gender: 'Female', category: 'SC', mobile: '+91 9876543214', profileImage: 'https://i.pravatar.cc/150?u=1005' },
    { admissionNo: '1006', studentName: 'David Wilson', rollNo: '106', class: 'III - A', fatherName: 'Thomas Wilson', dob: '2013-09-10', gender: 'Male', category: 'General', mobile: '+91 9876543215', profileImage: 'https://i.pravatar.cc/150?u=1006' },
    { admissionNo: '1007', studentName: 'Sarah Miller', rollNo: '107', class: 'III - B', fatherName: 'James Miller', dob: '2013-12-05', gender: 'Female', category: 'OBC', mobile: '+91 9876543216', profileImage: 'https://i.pravatar.cc/150?u=1007' },
    { admissionNo: '1008', studentName: 'James Taylor', rollNo: '108', class: 'IV - A', fatherName: 'Robert Taylor', dob: '2012-02-28', gender: 'Male', category: 'General', mobile: '+91 9876543217', profileImage: 'https://i.pravatar.cc/150?u=1008' },
    { admissionNo: '1009', studentName: 'Linda Anderson', rollNo: '109', class: 'IV - B', fatherName: 'John Anderson', dob: '2012-05-15', gender: 'Female', category: 'SC', mobile: '+91 9876543218', profileImage: 'https://i.pravatar.cc/150?u=1009' },
    { admissionNo: '1010', studentName: 'Robert Thomas', rollNo: '110', class: 'V - A', fatherName: 'Charles Thomas', dob: '2011-08-10', gender: 'Male', category: 'General', mobile: '+91 9876543219', profileImage: 'https://i.pravatar.cc/150?u=1010' },
    { admissionNo: '1011', studentName: 'Patricia Jackson', rollNo: '111', class: 'V - B', fatherName: 'Steven Jackson', dob: '2011-12-25', gender: 'Female', category: 'OBC', mobile: '+91 9876543220', profileImage: 'https://i.pravatar.cc/150?u=1011' },
    { admissionNo: '1012', studentName: 'Jennifer Garcia', rollNo: '112', class: 'VI - A', fatherName: 'Paul Garcia', dob: '2010-04-12', gender: 'Female', category: 'General', mobile: '+91 9876543221', profileImage: 'https://i.pravatar.cc/150?u=1012' },
    { admissionNo: '1013', studentName: 'Christopher Martinez', rollNo: '113', class: 'VI - B', fatherName: 'Mark Martinez', dob: '2010-07-18', gender: 'Male', category: 'General', mobile: '+91 9876543222', profileImage: 'https://i.pravatar.cc/150?u=1013' }
  ];

  const filteredStudents = dummyStudents.filter(student => 
    student.studentName.toLowerCase().includes(tableSearch.toLowerCase()) ||
    student.admissionNo.includes(tableSearch) ||
    student.rollNo.includes(tableSearch) ||
    student.mobile.includes(tableSearch)
  );

  const columns = [
    'Admission No',
    'Student Name',
    'Roll No',
    'Class',
    'Father Name',
    'Date Of Birth',
    'Gender',
    'Category',
    'Mobile Number',
    'Action'
  ];

  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setIsEditing(true);
    setEditStep(1);
    setOpenActionId(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  if (isEditing) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 pb-20">
        {/* Edit Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <button 
                onClick={handleCancelEdit}
                className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-gray-100"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                 <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Edit Student</h1>
                 <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Updating details for {editingStudent.studentName}</p>
              </div>
           </div>
           <div className="flex items-center space-x-3">
              <button 
                onClick={handleCancelEdit}
                className="px-6 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => { alert('Changes Saved!'); setIsEditing(false); }}
                className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
              >
                 <Save size={14} />
                 <span>Save Changes</span>
              </button>
           </div>
        </div>

        {/* Stepper Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between relative px-8">
              {[
                  { id: 1, title: 'Student info', icon: User },
                  { id: 2, title: 'Parent Info', icon: Plus },
                  { id: 3, title: 'Transport & Hostel', icon: Truck },
                  { id: 4, title: 'Fees Details', icon: CreditCard },
                  { id: 5, title: 'Address & Misc', icon: MapPin }
              ].map((step, idx, arr) => {
                  const Icon = step.icon;
                  const isActive = editStep === step.id;
                  const isCompleted = editStep > step.id;
                  
                  return (
                      <div key={step.id} className="flex-1 flex items-center">
                          <div className="flex flex-col items-center relative z-10">
                               <div 
                                  onClick={() => setEditStep(step.id)}
                                  className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 cursor-pointer ${
                                      isActive ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-100 scale-110' : 
                                      isCompleted ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-50' : 
                                      'bg-gray-50 border-gray-100 text-gray-400 hover:border-indigo-200'
                                  }`}
                               >
                                  {isCompleted ? <CheckCircle2 size={24} className="text-white" /> : <Icon size={20} className={isActive ? 'text-white' : ''} />}
                               </div>
                               <span className={`text-[9px] md:text-[10px] font-black uppercase mt-3 tracking-widest ${isActive ? 'text-indigo-600' : isCompleted ? 'text-emerald-600' : 'text-gray-400'}`}>
                                  {step.title}
                               </span>
                          </div>
                          {idx < arr.length - 1 && (
                              <div className={`flex-1 h-0.5 mx-4 -mt-7 transition-all duration-700 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
                          )}
                      </div>
                  );
              })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
           <div className="p-8">
              {/* Step 1: Student Details */}
              {editStep === 1 && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Primary Student Details</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Admission No <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input 
                                    type="text" 
                                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all" 
                                    defaultValue={editingStudent.admissionNo} 
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Roll Number</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" defaultValue={editingStudent.rollNo} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Class <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <School size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                                <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none" defaultValue={editingStudent.class.split(' ')[0]}>
                                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Section <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <Layers size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                                <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none" defaultValue={editingStudent.class.split(' ')[2]}>
                                    {sections.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">First Name <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" defaultValue={editingStudent.studentName.split(' ')[0]} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Last Name</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" defaultValue={editingStudent.studentName.split(' ')[1] || ''} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Gender <span className="text-red-500">*</span></label>
                            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" defaultValue={editingStudent.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Date Of Birth <span className="text-red-500">*</span></label>
                            <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" defaultValue={editingStudent.dob} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Category</label>
                            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none" defaultValue={editingStudent.category}>
                                <option value="General">General</option>
                                <option value="OBC">OBC</option>
                                <option value="SC/ST">SC/ST</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Religion</label>
                            <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold " placeholder="Hinduism" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Mobile Number</label>
                            <input type="tel" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" defaultValue={editingStudent.mobile} />
                        </div>


              {editStep === 2 && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
                    <div className="flex items-center space-x-2 border-l-4 border-emerald-600 pl-4 py-1">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Step 2: Parent & Guardian Identification</h3>
                    </div>
                    
                    <div className="space-y-10">
                        {/* Father Info */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Father Name</label>
                                <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" defaultValue={editingStudent.fatherName} />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone No</label>
                                <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Occupation</label>
                                <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Father Photo (100x100px)</label>
                                <div className="border border-indigo-100/50 bg-indigo-50/20 rounded-xl px-4 py-1.5 flex items-center space-x-2 text-[10px] font-bold text-indigo-400 group cursor-pointer hover:bg-white transition-all">
                                    <Upload size={12} />
                                    <span className="flex-1 truncate">Drag and drop a file or click</span>
                                </div>
                            </div>
                        </div>

                        {/* Mother Info */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end border-t border-gray-50 pt-6">
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mother Name</label>
                                <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone No</label>
                                <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Occupation</label>
                                <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold" />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mother Photo (100x100px)</label>
                                <div className="border border-indigo-100/50 bg-indigo-50/20 rounded-xl px-4 py-1.5 flex items-center space-x-2 text-[10px] font-bold text-indigo-400 group cursor-pointer hover:bg-white transition-all">
                                    <Upload size={12} />
                                    <span className="flex-1 truncate">Drag and drop a file or click</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50/30 p-8 rounded-3xl border border-indigo-100 space-y-8 mt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-indigo-100/50 pb-6 space-y-4 md:space-y-0">
                            <h4 className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] relative pl-4 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-4 after:bg-indigo-600 after:rounded-full">Guardian Identification</h4>
                            <div className="flex items-center space-x-6 bg-white/50 px-6 py-2.5 rounded-2xl border border-indigo-50 shadow-sm">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">If Guardian Is:</span>
                                {['Father', 'Mother', 'Other'].map((opt, i) => (
                                    <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                                        <input type="radio" name="guardian" className="text-indigo-600 focus:ring-0 w-3.5 h-3.5" defaultChecked={i === 0} />
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Guardian Name <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full px-4 py-2 bg-white border border-indigo-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-100 transition-all font-mono italic" defaultValue={editingStudent.fatherName} />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Relationship</label>
                                <input type="text" className="w-full px-4 py-2 bg-white border border-indigo-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-100 transition-all" defaultValue="Father" />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Guardian Email</label>
                                <input type="email" className="w-full px-4 py-2 bg-white border border-indigo-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-100" />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Guardian Photo</label>
                                <div className="border border-emerald-100 bg-emerald-50/20 rounded-xl px-4 py-1.5 flex items-center space-x-2 text-[10px] font-bold text-emerald-600 group cursor-pointer hover:bg-white transition-all">
                                    <ImageIcon size={12} />
                                    <span className="flex-1 truncate">Drag and drop photo...</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Guardian Phone <span className="text-red-500">*</span></label>
                                <input type="tel" className="w-full px-4 py-2 bg-white border border-indigo-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-100 transition-all font-mono" defaultValue={editingStudent.mobile} />
                            </div>
                            <div className="space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Occupation</label>
                                <input type="text" className="w-full px-4 py-2 bg-white border border-indigo-100 rounded-xl text-xs font-bold" />
                            </div>
                            <div className="md:col-span-2 space-y-1 text-left">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Address</label>
                                <input type="text" className="w-full px-4 py-2 bg-white border border-indigo-100 rounded-xl text-xs font-bold" placeholder="Full residential address..." />
                            </div>
                        </div>
                    </div>
                 </div>
              )}

              {/* Step 3: Transport & Hostel */}
              {editStep === 3 && (
                 <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="space-y-6">
                         <div className="flex items-center space-x-2 border-l-4 border-orange-500 pl-4 py-1">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Transport Fleet Assignment</h3>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             <div className="space-y-1.5">
                                 <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Route List</label>
                                 <div className="relative group">
                                     <Truck size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                                     <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none">
                                         <option value="">VH1001 - Main Route</option>
                                     </select>
                                 </div>
                             </div>
                             <div className="space-y-1.5">
                                 <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Pickup Point</label>
                                 <div className="relative group">
                                     <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                                     <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none">
                                         <option value="">Brooklyn South</option>
                                     </select>
                                 </div>
                             </div>
                         </div>
                    </div>

                    <div className="space-y-6">
                         <div className="flex items-center space-x-2 border-l-4 border-indigo-500 pl-4 py-1">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Residential (Hostel) Details</h3>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             <div className="space-y-1.5">
                                 <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Hostel</label>
                                 <div className="relative group">
                                     <Home size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                                     <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none">
                                         <option value="">Select Hostel</option>
                                     </select>
                                 </div>
                             </div>
                             <div className="space-y-1.5">
                                 <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Room No.</label>
                                 <div className="relative group">
                                     <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" />
                                     <select className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:outline-none appearance-none">
                                         <option value="">Select Room</option>
                                     </select>
                                 </div>
                             </div>
                         </div>
                    </div>
                 </div>
              )}

              {/* Step 4: Fees details */}
              {editStep === 4 && (
                 <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between border-l-4 border-indigo-600 pl-4 py-1">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Fee Group Allocation</h3>
                        <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-1.5 rounded-xl border border-indigo-100">
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Current Balance:</span>
                            <span className="text-sm font-black text-indigo-900 font-mono">₹6,900.00</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                         {[
                            { id: 'f1', label: 'Class 2 Lump Sum', amount: '350.00' },
                            { id: 'f2', label: 'Class 2 General', amount: '6,550.00' },
                            { id: 'f3', label: 'Class 5 General', amount: '10,100.00' },
                            { id: 'f4', label: 'Edword Fees Group 2', amount: '500.00' },
                            { id: 'f5', label: 'RKS Fees Test One', amount: '600.00' }
                         ].map((fee) => (
                            <div key={fee.id} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all hover:bg-white group cursor-pointer">
                                 <div className="flex items-center space-x-3">
                                     <div className="w-6 h-6 bg-white border-2 border-indigo-100 rounded-lg flex items-center justify-center">
                                        <input type="checkbox" className="text-indigo-600 rounded focus:ring-0" defaultChecked={fee.id === 'f1' || fee.id === 'f2'} />
                                     </div>
                                     <span className="text-xs font-black text-gray-700 uppercase tracking-wide">{fee.label}</span>
                                 </div>
                                 <span className="text-xs font-black text-gray-900 font-mono italic opacity-60 group-hover:opacity-100 transition-opacity">₹{fee.amount}</span>
                            </div>
                         ))}
                    </div>

                    <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl space-y-4">
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Fees Discount Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                             {['Sibling Discount', 'Class Topper Discount', 'Sport Scholarship'].map(disc => (
                                <div key={disc} className="flex items-center space-x-3 p-3 bg-white/80 rounded-xl border border-indigo-100/50">
                                   <input type="checkbox" className="text-indigo-600 rounded focus:ring-0" />
                                   <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{disc}</span>
                                </div>
                             ))}
                        </div>
                    </div>
                 </div>
              )}

              {/* Step 5: Address & Misc Details */}
              {editStep === 5 && (
                 <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
                    <div className="space-y-6">
                       <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                           <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Address Details</h3>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                               <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-2xl border border-dashed border-indigo-200">
                                   <input type="checkbox" className="text-indigo-600 rounded focus:ring-0 w-3.5 h-3.5 cursor-pointer shadow-sm" />
                                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Guardian address is same as current address</span>
                               </div>
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Current Address</label>
                                   <div className="relative">
                                       <MapPin size={14} className="absolute left-4 top-4 text-indigo-400" />
                                       <textarea rows={3} className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-3xl text-xs font-bold text-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all shadow-inner" placeholder="Street name, City, State, ZIP..."></textarea>
                                   </div>
                               </div>
                           </div>
                           <div className="space-y-4">
                               <div className="flex items-center space-x-3 bg-white/50 p-3 rounded-2xl border border-dashed border-indigo-200">
                                   <input type="checkbox" className="text-indigo-600 rounded focus:ring-0 w-3.5 h-3.5 cursor-pointer shadow-sm" />
                                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Permanent address is same as current address</span>
                               </div>
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Permanent Address</label>
                                   <div className="relative">
                                       <MapPin size={14} className="absolute left-4 top-4 text-indigo-400" />
                                       <textarea rows={3} className="w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-3xl text-xs font-bold text-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 transition-all shadow-inner" placeholder="Complete permanent address..."></textarea>
                                   </div>
                               </div>
                           </div>
                       </div>
                    </div>

                    <div className="space-y-8 pt-6 border-t border-gray-50">
                       <div className="flex items-center space-x-2 border-l-4 border-emerald-600 pl-4 py-1">
                           <Activity size={18} className="text-emerald-600" />
                           <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Miscellaneous & Administrative Details</h3>
                       </div>
                       
                       <div className="bg-gray-50/30 rounded-3xl p-8 border border-gray-100">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Bank Account Number</label>
                                   <input type="text" className="w-full px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-black tracking-widest font-mono shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all" placeholder="0000 0000 0000 0000" />
                               </div>
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Bank Name</label>
                                   <input type="text" className="w-full px-5 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold shadow-sm outline-none" placeholder="e.g. State Bank of India" />
                               </div>
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">IFSC Code</label>
                                   <input type="text" className="w-full px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-black uppercase font-mono shadow-sm outline-none" placeholder="SBIN0000000" />
                               </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">National ID Number</label>
                                   <input type="text" className="w-full px-5 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold shadow-sm outline-none" />
                               </div>
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Local ID Number</label>
                                   <input type="text" className="w-full px-5 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold shadow-sm outline-none" />
                               </div>
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">RTE Status</label>
                                   <div className="flex items-center space-x-6 h-[48px] bg-white rounded-2xl px-6 border border-gray-100 shadow-sm">
                                       <label className="flex items-center space-x-2 cursor-pointer group">
                                           <input type="radio" name="rte_v2" className="text-emerald-500 focus:ring-0 w-4 h-4 shadow-inner" />
                                           <span className="text-[10px] font-black text-gray-500 group-hover:text-emerald-600 transition-colors uppercase tracking-widest">Yes</span>
                                       </label>
                                       <label className="flex items-center space-x-2 cursor-pointer group">
                                           <input type="radio" name="rte_v2" className="text-red-500 focus:ring-0 w-4 h-4 shadow-inner" defaultChecked />
                                           <span className="text-[10px] font-black text-gray-500 group-hover:text-red-600 transition-colors uppercase tracking-widest">No</span>
                                       </label>
                                   </div>
                               </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Previous School Details</label>
                                   <textarea rows={2} className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs font-bold italic shadow-sm focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all" placeholder="History of previous schooling..."></textarea>
                               </div>
                               <div className="space-y-1.5 text-left">
                                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Office Note</label>
                                   <textarea rows={2} className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 italic shadow-sm outline-none" placeholder="Confidential office notes..."></textarea>
                               </div>
                           </div>
                       </div>
                    </div>
                 </div>
              )}

           </div>

           {/* Footer Buttons */}
           <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button 
                onClick={() => editStep > 1 && setEditStep(editStep - 1)}
                disabled={editStep === 1}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    editStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100 shadow-sm'
                }`}
              >
                 <ChevronDown size={14} className="rotate-90" />
                 <span>Previous Step</span>
              </button>
              
              <div className="flex space-x-3">
                  {editStep < 5 ? (
                      <button 
                        onClick={() => setEditStep(editStep + 1)}
                        className="flex items-center space-x-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-50"
                      >
                         <span>Next Step</span>
                         <ArrowRight size={14} />
                      </button>
                  ) : (
                    <button 
                        onClick={() => { alert('Student profile updated successfully!'); setIsEditing(false); }}
                        className="flex items-center space-x-2 px-8 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-50"
                    >
                        <CheckCircle2 size={14} />
                        <span>Finish Editing</span>
                    </button>
                  )}
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Criteria Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-50 pb-4">
          <FileSearch size={18} className="text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">Select Criteria</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Class & Section Form */}
          <div className="flex items-end space-x-4">
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      {classes.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 pointer-events-none transition-colors" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                    Section
                  </label>
                  <div className="relative group">
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      {sections.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 pointer-events-none transition-colors" />
                  </div>
                </div>
              </div>

              {/* Search Button for Class & Section */}
              <button className="flex-none flex items-center justify-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
                <Search size={16} />
                <span>SEARCH</span>
              </button>
          </div>

          {/* Right: Search by Keyword Form WITH button */}
          <div className="flex items-end space-x-4">
              <div className="space-y-1.5 flex-1 lg:flex-none lg:w-[320px]">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                  Search By Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Keyword..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Keyword Search Button */}
              <button className="flex-none flex items-center justify-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
                <Search size={16} />
                <span>SEARCH</span>
              </button>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center space-x-2 px-8 py-4 text-sm font-bold tracking-wide transition-all border-b-2 ${
              activeTab === 'list' 
                ? 'border-blue-600 text-blue-600 bg-blue-50/30' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <List size={18} />
            <span>LIST VIEW</span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex items-center space-x-2 px-8 py-4 text-sm font-bold tracking-wide transition-all border-b-2 ${
              activeTab === 'details' 
                ? 'border-blue-600 text-blue-600 bg-blue-50/30' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid size={18} />
            <span>DETAILS VIEW</span>
          </button>
        </div>

        {/* Data Container */}
        <div className="relative">
          {activeTab === 'list' ? (
            <>
              {/* Table Toolbar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                 {/* Left side: Search input */}
                 <div className="w-64">
                    <input 
                       type="text" 
                       placeholder="Search..." 
                       value={tableSearch}
                       onChange={(e) => setTableSearch(e.target.value)}
                       className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 placeholder:text-gray-400 shadow-sm"
                    />
                 </div>
                 
                 {/* Right side: Items per page & Actions */}
                 <div className="flex items-center space-x-6">
                     {/* Pagination Count Select */}
                     <div className="flex items-center relative group">
                        <select className="pl-3 pr-8 py-2 bg-transparent text-sm font-bold text-gray-700 focus:outline-none appearance-none cursor-pointer hover:text-blue-600 transition-colors">
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="All">All</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-blue-600 transition-colors" />
                     </div>

                     {/* Export Actions */}
                     <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
                        <button className="text-gray-400 hover:text-green-600 hover:bg-green-50 p-1.5 rounded transition-all" title="Export to Excel">
                            <FileSpreadsheet size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-all" title="Export to CSV">
                            <FileText size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded transition-all" title="Export to PDF">
                            <FileDown size={16} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-800 hover:bg-gray-100 p-1.5 rounded transition-all" title="Print">
                            <Printer size={16} />
                        </button>
                     </div>
                 </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#fcfdff] border-b border-gray-100">
                    <tr>
                      {columns.map((col) => (
                        <th key={col} className="px-6 py-4 text-[11px] font-black text-gray-500 uppercase tracking-wider">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-xs font-bold text-gray-700">{student.admissionNo}</td>
                        <td className="px-6 py-4 text-xs font-bold text-blue-600 cursor-pointer hover:underline">{student.studentName}</td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-700">{student.rollNo}</td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-700">{student.class}</td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-700">{student.fatherName}</td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-700">{student.dob}</td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-700">{student.gender}</td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-700">
                          <span className="px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-600 uppercase tracking-widest">{student.category}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-gray-700">{student.mobile}</td>
                        <td className="px-6 py-4 relative">
                          <button 
                             onClick={() => setOpenActionId(openActionId === student.admissionNo ? null : student.admissionNo)}
                             className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openActionId === student.admissionNo && (
                              <div 
                                  ref={actionMenuRef}
                                  className="absolute right-8 top-10 w-40 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-50 flex flex-col space-y-1"
                              >
                                  <button className="flex items-center space-x-3 w-full px-3 py-2 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg transition-colors group">
                                      <Eye size={14} className="group-hover:scale-110 transition-transform" />
                                      <span className="text-[10px] font-black uppercase tracking-widest text-left flex-1">View</span>
                                  </button>
                                  <button 
                                      onClick={() => handleEdit(student)}
                                      className="flex items-center space-x-3 w-full px-3 py-2 hover:bg-orange-50 text-gray-600 hover:text-orange-600 rounded-lg transition-colors group"
                                  >
                                      <Edit size={14} className="group-hover:scale-110 transition-transform" />
                                      <span className="text-[10px] font-black uppercase tracking-widest text-left flex-1">Edit</span>
                                  </button>
                                  <button className="flex items-center space-x-3 w-full px-3 py-2 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 rounded-lg transition-colors group">
                                      <CreditCard size={14} className="group-hover:scale-110 transition-transform" />
                                      <span className="text-[10px] font-black uppercase tracking-widest text-left flex-1">Add Fees</span>
                                  </button>
                                  <button className="flex items-center space-x-3 w-full px-3 py-2 hover:bg-purple-50 text-gray-600 hover:text-purple-600 rounded-lg transition-colors group">
                                      <Printer size={14} className="group-hover:scale-110 transition-transform" />
                                      <span className="text-[10px] font-black uppercase tracking-widest text-left flex-1">Print</span>
                                  </button>
                              </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
               {filteredStudents.map((student) => (
                  <div key={student.admissionNo} className="p-6 pb-10 border-b border-gray-100 flex items-start space-x-6 relative hover:bg-gray-50/50 transition-all group">
                    {/* Left: Avatar */}
                    <div className="w-24 h-24 rounded-lg border-2 border-gray-200 overflow-hidden bg-white shadow-sm flex items-center justify-center flex-none group-hover:border-indigo-200 transition-colors">
                       {student.profileImage ? (
                          <img 
                             src={student.profileImage} 
                             alt={student.studentName} 
                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                       ) : (
                          <User size={48} className="text-gray-400 opacity-60 group-hover:text-indigo-400 transition-colors" />
                       )}
                    </div>

                    {/* Middle: Info Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                      {/* Column 1 */}
                      <div className="space-y-1">
                        <h3 className="text-indigo-600 font-black text-base md:text-lg mb-2 tracking-tight">{student.studentName}</h3>
                        <div className="flex items-center text-[12px] md:text-[13px] font-bold text-gray-800">
                          <span className="text-gray-900 w-28 md:w-32 flex-none">Class:</span>
                          <span className="text-gray-500 font-medium font-sans italic">Class {student.class}</span>
                        </div>
                        <div className="flex items-center text-[12px] md:text-[13px] font-bold text-gray-800">
                          <span className="text-gray-900 w-28 md:w-32 flex-none">Admission No:</span>
                          <span className="text-gray-500 font-medium font-sans">{student.admissionNo}</span>
                        </div>
                        <div className="flex items-center text-[12px] md:text-[13px] font-bold text-gray-800">
                          <span className="text-gray-900 w-28 md:w-32 flex-none">Date Of Birth:</span>
                          <span className="text-gray-500 font-medium font-sans">{student.dob}</span>
                        </div>
                        <div className="flex items-center text-[12px] md:text-[13px] font-bold text-gray-800">
                          <span className="text-gray-900 w-28 md:w-32 flex-none">Gender:</span>
                          <span className="text-gray-500 font-medium font-sans">{student.gender}</span>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-1 pt-0 md:pt-9">
                        <div className="flex items-center text-[12px] md:text-[13px] font-bold text-gray-800">
                          <span className="text-gray-900 w-44 md:w-52 flex-none">Local Identification No:</span>
                          <span className="text-gray-500 font-medium font-sans">-</span>
                        </div>
                        <div className="flex items-center text-[12px] md:text-[13px] font-bold text-gray-800">
                          <span className="text-gray-900 w-44 md:w-52 flex-none">Guardian Name:</span>
                          <span className="text-gray-500 font-medium font-sans">{student.fatherName}</span>
                        </div>
                        <div className="flex items-center text-[12px] md:text-[13px] font-bold text-gray-800 text-nowrap">
                          <span className="text-gray-900 w-44 md:w-52 flex-none">Guardian Phone:</span>
                          <span className="text-gray-500 font-medium font-sans flex items-center">
                            <Phone size={12} className="mr-1 text-gray-400 rotate-12" /> {student.mobile}
                          </span>
                        </div>
                        <div className="flex items-center text-[12px] md:text-[13px] font-bold text-gray-800">
                          <span className="text-gray-900 w-44 md:w-52 flex-none">Current Address:</span>
                          <span className="text-gray-500 font-medium font-sans">Not Specified</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: Bottom Right */}
                    <div className="absolute bottom-3 right-5 flex items-center space-x-1.5 opacity-80 hover:opacity-100 transition-opacity">
                       <button className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100" title="View Detail">
                          <List size={13} />
                       </button>
                       <button 
                          onClick={() => handleEdit(student)}
                          className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100" title="Edit Student"
                       >
                          <Edit size={13} />
                       </button>
                       <button className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100" title="Add Fee">
                          <span className="font-bold text-[10px]">$</span>
                       </button>
                       <button className="w-7 h-7 flex items-center justify-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-100" title="Print Profile">
                          <Printer size={13} />
                       </button>
                    </div>

                    {/* Right Accent Bar */}
                    <div className="absolute inset-y-0 right-0 w-1 bg-gray-200 group-hover:bg-indigo-300 transition-colors rounded-r-xl"></div>
                  </div>
               ))}
               {filteredStudents.length === 0 && (
                  <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-sm">
                    No results found matching your search criteria.
                  </div>
               )}
            </div>
          )}

          {/* Footer Info */}
          <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {filteredStudents.length > 0 ? 1 : 0} to {filteredStudents.length} of {filteredStudents.length} entries
            </p>
            <div className="flex items-center space-x-2">
              <button disabled className="px-4 py-1.5 bg-gray-100 text-gray-400 rounded-md text-[10px] font-black uppercase tracking-wider cursor-not-allowed">Previous</button>
              <button disabled className="px-4 py-1.5 bg-gray-100 text-gray-400 rounded-md text-[10px] font-black uppercase tracking-wider cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
