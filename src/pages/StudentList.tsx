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
  Save,
  Key,
  LogOut
} from 'lucide-react';

export default function StudentList() {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editStep, setEditStep] = useState(1);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<any>(null);
  const [viewTab, setViewTab] = useState('profile');
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  const handleView = (student: any) => {
    setViewingStudent(student);
    setIsViewing(true);
    setViewTab('profile');
    setOpenActionId(null);
  };

  const handleCancelView = () => {
    setIsViewing(false);
    setViewingStudent(null);
  };

  if (isViewing && viewingStudent) {
    const viewTabs = ['Profile', 'Fees'];
    return (
      <>
        <div className="max-w-7xl mx-auto space-y-6 pb-20">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={handleCancelView} className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-gray-100">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-black text-gray-900">Student Details</h1>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">Viewing profile for {viewingStudent.studentName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all">
              <Printer size={15} />
              <span>Print</span>
            </button>
            <button onClick={() => { handleCancelView(); handleEdit(viewingStudent); }} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              <Edit size={15} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-64 flex-none space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex flex-col items-center rounded-t-2xl">
                <div className="w-20 h-20 rounded-2xl border-4 border-white/30 bg-white/20 overflow-hidden shadow-xl">
                  <img src={viewingStudent.profileImage} alt={viewingStudent.studentName} className="w-full h-full object-cover" onError={(e: any) => { e.target.style.display='none'; }} />
                </div>
                <h2 className="mt-3 text-white font-black text-base text-center">{viewingStudent.studentName}</h2>
                <p className="text-indigo-200 text-xs font-semibold mt-0.5">Admission No <span className="text-white font-black">{viewingStudent.admissionNo}</span></p>
                <p className="text-indigo-200 text-xs font-semibold">Roll No <span className="text-white font-black">{viewingStudent.rollNo}</span></p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gray-100 py-3 px-2">
                {[
                  { icon: Printer,    label: 'Print',          bg: 'hover:bg-blue-50',   hover: 'hover:text-blue-600',   tip: 'bg-blue-600'    },
                  { icon: Edit,       label: 'Edit',           bg: 'hover:bg-orange-50', hover: 'hover:text-orange-600', tip: 'bg-orange-500'  },
                  { icon: CreditCard, label: 'Collect Fees',   bg: 'hover:bg-emerald-50',hover: 'hover:text-emerald-600',tip: 'bg-emerald-600' },
                  { icon: Key,        label: 'Login Details',  bg: 'hover:bg-purple-50', hover: 'hover:text-purple-600', tip: 'bg-purple-600'  },
                  { icon: LogOut,     label: 'student logout & disable', bg: 'hover:bg-rose-50',   hover: 'hover:text-rose-600',   tip: 'bg-rose-600'    },
                ].map(({ icon: Icon, label, bg, hover, tip }) => (
                  <div key={label} className="relative group flex flex-col items-center">
                    <button 
                      onClick={() => {
                        if (label === 'Edit') {
                          handleCancelView();
                          handleEdit(viewingStudent);
                        } else if (label === 'Login Details') {
                          setShowLoginModal(true);
                        }
                      }}
                      className={`p-2 rounded-xl ${bg} ${hover} text-gray-400 transition-all active:scale-95`}
                    >
                      <Icon size={15} />
                    </button>
                    {/* Tooltip */}
                    <div className={`absolute -top-9 left-1/2 -translate-x-1/2 ${tip} text-white text-[10px] font-black px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-y-1 group-hover:translate-y-0 shadow-lg z-10`}>
                      {label}
                      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${tip} rotate-45`} />
                    </div>
                  </div>
                ))}

                {/* 3 Dots Menu */}
                <div className="relative flex flex-col items-center">
                    <button 
                       onClick={() => setOpenActionId(openActionId === 'quick-action-menu' ? null : 'quick-action-menu')}
                       className={`p-2 rounded-xl hover:bg-gray-100 hover:text-gray-600 transition-all active:scale-95 ${openActionId === 'quick-action-menu' ? 'bg-gray-100 text-gray-600' : 'text-gray-400'}`}
                    >
                      <MoreVertical size={15} />
                    </button>
                    {openActionId === 'quick-action-menu' && (
                        <div className="absolute right-0 top-10 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <button 
                               className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 font-bold transition-colors"
                               onClick={() => setOpenActionId(null)}
                            >
                                Send Student Password
                            </button>
                            <button 
                               className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 font-bold transition-colors"
                               onClick={() => setOpenActionId(null)}
                            >
                                Send Parent Password
                            </button>
                        </div>
                    )}
                </div>
              </div>

              {/* Info Fields */}
              <div className="p-4 space-y-0">
                {[
                  { label: 'Class', value: `${viewingStudent.class.split(' - ')[0]} - (2025-26)`, color: 'text-indigo-600' },
                  { label: 'Section', value: viewingStudent.class.split(' - ')[1] || 'A', color: 'text-indigo-600' },
                  { label: 'Gender', value: viewingStudent.gender, color: viewingStudent.gender === 'Female' ? 'text-pink-500' : 'text-blue-500' },
                  { label: 'RTE', value: 'No', color: 'text-indigo-600' },
                  { label: 'Category', value: viewingStudent.category, color: 'text-emerald-600' },
                  { label: 'Behaviour Score', value: '35', color: 'text-emerald-600' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <span className="text-xs font-bold text-gray-500">{label}</span>
                    <span className={`text-xs font-black ${color}`}>{value}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center border-b border-gray-100 px-6 overflow-x-auto">
                {viewTabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setViewTab(tab.toLowerCase())}
                    className={`flex-none py-4 px-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                      viewTab === tab.toLowerCase()
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-400 hover:text-gray-700'
                    }`}
                  >{tab}</button>
                ))}
              </div>

              {/* Profile Tab */}
              {viewTab === 'profile' && (
                <div className="p-6 space-y-6">
                  {/* Student Behaviour Sub-tab */}
                  <div className="flex items-center border-b border-gray-100 pb-0">
                    <button className="pb-3 px-2 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600">Student Behaviour</button>
                  </div>

                  {/* Basic Details */}
                  <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="grid divide-y divide-gray-100">
                      {[
                        { label: 'Admission Date', value: '04/02/2024' },
                        { label: 'Date Of Birth', value: viewingStudent.dob },
                        { label: 'Category', value: viewingStudent.category },
                        { label: 'Mobile Number', value: viewingStudent.mobile },
                        { label: 'Caste', value: '—' },
                        { label: 'Religion', value: '—' },
                        { label: 'Email', value: '—' },
                        { label: 'Note', value: '—' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center px-6 py-3">
                          <span className="w-52 text-sm font-semibold text-gray-500">{label}</span>
                          <span className="text-sm font-bold text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-3 bg-gray-100/60 border-b border-gray-200">
                      <h3 className="text-sm font-black text-gray-600">Address</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {[ { label: 'Current Address', value: '—' }, { label: 'Permanent Address', value: '—' } ].map(({ label, value }) => (
                        <div key={label} className="flex items-center px-6 py-3">
                          <span className="w-52 text-sm font-semibold text-gray-500">{label}</span>
                          <span className="text-sm font-bold text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Parent Guardian Detail */}
                  <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-3 bg-gray-100/60 border-b border-gray-200">
                      <h3 className="text-sm font-black text-gray-600">Parent Guardian Detail</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      <div className="flex items-start px-6 py-4">
                        <div className="flex-1 divide-y divide-gray-100">
                          {[ { label: 'Father Name', value: viewingStudent.fatherName }, { label: 'Father Phone', value: '—' }, { label: 'Father Occupation', value: '—' } ].map(({ label, value }) => (
                            <div key={label} className="flex items-center py-2">
                              <span className="w-48 text-sm font-semibold text-gray-500">{label}</span>
                              <span className="text-sm font-bold text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="w-16 h-16 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center flex-col">
                          <User size={20} className="text-gray-300" />
                          <span className="text-[8px] text-gray-400 font-bold text-center leading-tight mt-0.5">NO IMAGE</span>
                        </div>
                      </div>
                      <div className="flex items-start px-6 py-4">
                        <div className="flex-1 divide-y divide-gray-100">
                          {[ { label: 'Mother Name', value: '—' }, { label: 'Mother Phone', value: '—' }, { label: 'Mother Occupation', value: '—' } ].map(({ label, value }) => (
                            <div key={label} className="flex items-center py-2">
                              <span className="w-48 text-sm font-semibold text-gray-500">{label}</span>
                              <span className="text-sm font-bold text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="w-16 h-16 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center flex-col">
                          <User size={20} className="text-gray-300" />
                          <span className="text-[8px] text-gray-400 font-bold text-center leading-tight mt-0.5">NO IMAGE</span>
                        </div>
                      </div>
                      <div className="flex items-start px-6 py-4">
                        <div className="flex-1 divide-y divide-gray-100">
                          {[ { label: 'Guardian Name', value: viewingStudent.fatherName }, { label: 'Guardian Email', value: '—' }, { label: 'Guardian Relation', value: 'Father' }, { label: 'Guardian Phone', value: viewingStudent.mobile }, { label: 'Guardian Occupation', value: '—' }, { label: 'Guardian Address', value: '—' } ].map(({ label, value }) => (
                            <div key={label} className="flex items-center py-2">
                              <span className="w-48 text-sm font-semibold text-gray-500">{label}</span>
                              <span className="text-sm font-bold text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="w-16 h-16 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center flex-col">
                          <User size={20} className="text-gray-300" />
                          <span className="text-[8px] text-gray-400 font-bold text-center leading-tight mt-0.5">NO IMAGE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-3 bg-gray-100/60 border-b border-gray-200">
                      <h3 className="text-sm font-black text-gray-600">Route Details</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {[ { label: 'Pick-up Point', value: 'Brooklyn North' }, { label: 'Route', value: 'Brooklyn Central' }, { label: 'Vehicle Number', value: 'VH1001' }, { label: 'Driver Name', value: 'Michel' }, { label: 'Driver Contact', value: '8667777869' } ].map(({ label, value }) => (
                        <div key={label} className="flex items-center px-6 py-3">
                          <span className="w-52 text-sm font-semibold text-gray-500">{label}</span>
                          <span className="text-sm font-bold text-indigo-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Miscellaneous Details */}
                  <div className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-3 bg-gray-100/60 border-b border-gray-200">
                      <h3 className="text-sm font-black text-gray-600">Miscellaneous Details</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {[ { label: 'Blood Group', value: '—' }, { label: 'House', value: '—' }, { label: 'Height', value: '—' }, { label: 'Weight', value: '—' }, { label: 'Measurement Date', value: '04/02/2024' }, { label: 'Previous School Details', value: '—' }, { label: 'National Identification Number', value: '—' }, { label: 'Local Identification Number', value: '—' }, { label: 'Bank Account Number', value: '—' }, { label: 'Bank Name', value: '—' }, { label: 'IFSC Code', value: '—' } ].map(({ label, value }) => (
                        <div key={label} className="flex items-center px-6 py-3">
                          <span className="w-52 text-sm font-semibold text-gray-500">{label}</span>
                          <span className="text-sm font-bold text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Fees Tab */}
              {viewTab === 'fees' && (() => {
                const feesData = [
                  { name: 'Admission Fees\n(admission-fees)', dueDate: '04/10/2025', status: 'Partial', amount: '2,500.00', fine: '50.00', discount: '500.00', fineAmt: '50.00', paid: '1,950.00', payments: [{ id: '1050/1', mode: 'Bank Transfer', date: '04/02/2025', discount: '500.00', fine: '0.00', paid: '1,200.00' }, { id: '1050/2', mode: 'Cash', date: '03/02/2026', discount: '0.00', fine: '50.00', paid: '750.00' }] },
                  { name: 'April Month Fees\n(apr-month-fees)', dueDate: '04/10/2025', status: 'Partial', amount: '350.00', fine: '35.00', discount: '0.00', fineAmt: '0.00', paid: '200.00', payments: [{ id: '1051/1', mode: 'Card', date: '04/03/2025', discount: '0.00', fine: '0.00', paid: '200.00' }] },
                  { name: 'Bus-fees\n(Bus-fees)', dueDate: '04/15/2025', status: 'Paid', amount: '200.00', fine: '50.00', discount: '0.00', fineAmt: '50.00', paid: '200.00', payments: [{ id: '1354/1', mode: 'Cash', date: '03/02/2026', discount: '0.00', fine: '50.00', paid: '200.00' }] },
                  { name: 'May Month Fees\n(may-month-fees)', dueDate: '05/10/2025', status: 'Unpaid', amount: '350.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'June Month Fees\n(jun-month-fees)', dueDate: '06/10/2025', status: 'Unpaid', amount: '350.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'July Month Fees\n(jul-month-fees)', dueDate: '07/10/2025', status: 'Unpaid', amount: '350.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'August Month Fees\n(aug-month-fees)', dueDate: '08/10/2025', status: 'Unpaid', amount: '350.00', fine: '35.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'September Month Fees\n(sep-month-fees)', dueDate: '09/10/2025', status: 'Paid', amount: '350.00', fine: '50.00', discount: '100.00', fineAmt: '0.00', paid: '250.00', payments: [{ id: '1180/1', mode: 'Paystack', date: '09/02/2025', discount: '100.00', fine: '0.00', paid: '250.00' }] },
                  { name: 'October Month Fees\n(oct-month-fees)', dueDate: '10/10/2025', status: 'Unpaid', amount: '350.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'November Month Fees\n(nov-month-fees)', dueDate: '11/10/2025', status: 'Unpaid', amount: '350.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'December Month Fees\n(dec-month-fees)', dueDate: '12/10/2025', status: 'Unpaid', amount: '350.00', fine: '35.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'January Month Fees\n(jan-month-fees)', dueDate: '01/10/2026', status: 'Unpaid', amount: '350.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'Transport Fees (June)', dueDate: '06/05/2025', status: 'Unpaid', amount: '50.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'Transport Fees (July)', dueDate: '07/05/2025', status: 'Unpaid', amount: '50.00', fine: '10.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'Transport Fees (August)', dueDate: '08/05/2025', status: 'Unpaid', amount: '50.00', fine: '5.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'Transport Fees (September)', dueDate: '09/05/2025', status: 'Unpaid', amount: '50.00', fine: '7.5', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'Transport Fees (October)', dueDate: '10/05/2025', status: 'Unpaid', amount: '50.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'Transport Fees (January)', dueDate: '01/05/2026', status: 'Unpaid', amount: '50.00', fine: '5.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'Transport Fees (February)', dueDate: '02/05/2026', status: 'Unpaid', amount: '50.00', fine: '5.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                  { name: 'Transport Fees (March)', dueDate: '03/05/2026', status: 'Unpaid', amount: '50.00', fine: '50.00', discount: '0.00', fineAmt: '0.00', paid: '0.00', payments: [] },
                ];
                const statusBadge = (s: string) => s === 'Paid'
                  ? <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-white">Paid</span>
                  : s === 'Partial'
                  ? <span className="px-2 py-0.5 rounded text-[10px] font-black bg-orange-400 text-white">Partial</span>
                  : <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-500 text-white">Unpaid</span>;
                return (
                  <div className="overflow-x-auto overflow-y-auto max-h-[520px]">
                    <table className="w-full min-w-[900px] text-left border-separate border-spacing-0">
                      <thead className="sticky top-0 z-10 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
                        <tr>
                          {['Fees', 'Due Date', 'Status', 'Amount ($)', 'Payment ID', 'Mode', 'Date', 'Discount ($)', 'Fine ($)', 'Paid ($)'].map(h => (
                            <th key={h} className="px-4 py-3 text-xs font-black text-gray-700 whitespace-nowrap border-b-2 border-gray-200 border-r border-r-gray-100 last:border-r-0">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {feesData.map((fee, i) => (
                          <><tr key={i} className={`border-b border-gray-200 ${fee.status !== 'Paid' ? 'bg-red-50/50' : 'bg-white'}`}>
                              <td className="px-4 py-3 text-xs font-bold text-blue-600 whitespace-pre-line leading-snug border-r border-gray-100">{fee.name}</td>
                              <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap border-r border-gray-100">{fee.dueDate}</td>
                              <td className="px-4 py-3 border-r border-gray-100">{statusBadge(fee.status)}</td>
                              <td className="px-4 py-3 text-xs font-bold text-gray-800 whitespace-nowrap border-r border-gray-100">{fee.amount}<span className="text-red-500 font-black"> + {fee.fine}</span></td>
                              <td className="border-r border-gray-100" /><td className="border-r border-gray-100" /><td className="border-r border-gray-100" />
                              <td className="px-4 py-3 text-xs font-bold text-gray-800 border-r border-gray-100">{fee.discount}</td>
                              <td className="px-4 py-3 text-xs font-bold text-gray-800 border-r border-gray-100">{fee.fineAmt}</td>
                              <td className="px-4 py-3 text-xs font-bold text-gray-800">{fee.paid}</td>
                            </tr>
                            {fee.payments.map((p, j) => (
                              <tr key={`${i}-p${j}`} className={`border-b border-gray-100 ${fee.status !== 'Paid' ? 'bg-red-50/30' : 'bg-gray-50/30'}`}>
                                <td className="border-r border-gray-100" /><td className="border-r border-gray-100" /><td className="border-r border-gray-100" /><td className="border-r border-gray-100" />
                                <td className="px-4 py-2 text-xs font-bold text-blue-600 whitespace-nowrap border-r border-gray-100"><span className="text-gray-400 mr-1">↳</span>{p.id}</td>
                                <td className="px-4 py-2 text-xs font-bold text-blue-600 whitespace-nowrap border-r border-gray-100">{p.mode}</td>
                                <td className="px-4 py-2 text-xs font-semibold text-gray-700 whitespace-nowrap border-r border-gray-100">{p.date}</td>
                                <td className="px-4 py-2 text-xs font-bold text-gray-700 border-r border-gray-100">{p.discount}</td>
                                <td className="px-4 py-2 text-xs font-bold text-gray-700 border-r border-gray-100">{p.fine}</td>
                                <td className="px-4 py-2 text-xs font-bold text-gray-700">{p.paid}</td>
                              </tr>
                            ))}</>
                        ))}
                        <tr className="bg-gray-100 border-t-2 border-gray-300">
                          <td colSpan={3} className="px-4 py-3 text-sm font-black text-gray-700 text-right border-r border-gray-200">Grand Total</td>
                          <td className="px-4 py-3 text-sm font-black text-gray-900 border-r border-gray-200">$9,900.01<span className="text-red-500">+1,077.5</span></td>
                          <td className="border-r border-gray-200" /><td className="border-r border-gray-200" /><td className="border-r border-gray-200" />
                          <td className="px-4 py-3 text-sm font-black text-gray-900 border-r border-gray-200">$600.00</td>
                          <td className="px-4 py-3 text-sm font-black text-gray-900 border-r border-gray-200">$100.00</td>
                          <td className="px-4 py-3 text-sm font-black text-gray-900">$2,600.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })()}

              {/* Other tabs placeholder */}
              {viewTab !== 'profile' && viewTab !== 'fees' && (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                    <FileSearch size={28} className="text-indigo-300" />
                  </div>
                  <h3 className="text-base font-black text-gray-600">No Data Available</h3>
                  <p className="text-sm text-gray-400 mt-1">This section will be populated once data is connected.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Details Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 flex flex-col scale-100 hover:scale-[1.01] transition-transform">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-6 py-4 flex items-center justify-between border-b border-white/10">
               <div>
                  <h3 className="text-white font-black text-lg tracking-tight leading-none">Access Credentials</h3>
                  <p className="text-indigo-200 text-[10px] font-bold mt-1 opacity-80 uppercase tracking-wider">Secure Portal Login</p>
               </div>
               <button 
                onClick={() => setShowLoginModal(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all hover:rotate-90 active:scale-90"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 md:p-8 bg-white">
              <div className="flex flex-col items-center mb-6 text-center">
                 <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 border-2 border-white shadow-lg shadow-indigo-100/50">
                    <Key size={28} className="text-indigo-600 animate-pulse" />
                 </div>
                 <h4 className="font-black text-gray-900 text-xl tracking-tighter">{viewingStudent.studentName}</h4>
                 <div className="flex items-center space-x-2 mt-1.5 px-3 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-black text-[9px] uppercase tracking-widest ring-1 ring-indigo-100">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ID: {viewingStudent.admissionNo}</span>
                 </div>
              </div>
              
              <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/20 bg-white">
                <table className="w-full text-left">
                  <thead className="bg-[#fcfdff] border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest w-24">Role</th>
                      <th className="px-5 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Username</th>
                      <th className="px-5 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest w-32">Access Key</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { role: 'Parent', username: `parent_${viewingStudent.admissionNo}`, pass: '••••••••', color: 'indigo' },
                      { role: 'Student', username: `std_${viewingStudent.admissionNo}`, pass: '••••••••', color: 'purple' }
                    ].map((row, idx) => (
                      <tr key={idx} className="group hover:bg-gray-50/50 transition-all cursor-default">
                        <td className="px-5 py-4">
                           <span className={`px-2 py-0.5 rounded-md bg-${row.color}-50 text-${row.color}-600 font-extrabold text-[10px] uppercase tracking-wider`}>
                              {row.role}
                           </span>
                        </td>
                        <td className="px-5 py-4">
                           <div className="flex flex-col leading-tight">
                              <span className="text-[13px] font-black text-gray-800 tracking-tight">{row.username}</span>
                              <span className="text-[9px] font-bold text-gray-400 uppercase">Portal ID</span>
                           </div>
                        </td>
                        <td className="px-5 py-4">
                           <button className="flex items-center space-x-1.5 text-indigo-600 font-bold hover:text-indigo-800 transition-colors group/btn">
                              <span className="text-xs font-black tracking-widest">{row.pass}</span>
                              <ChevronRight size={12} className="opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 w-full px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Close View
                </button>
                <button 
                   className="flex-1 w-full px-6 py-3 bg-white border border-indigo-100 text-indigo-600 rounded-xl text-xs font-black hover:bg-indigo-50 hover:border-indigo-200 transition-all group flex items-center justify-center space-x-2"
                >
                   <Printer size={14} className="group-hover:rotate-12 transition-transform" />
                   <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pb-20 fade-in duration-500">
        
        {/* Success Modal Overlay */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
             <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100/50 flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-5 border-4 border-emerald-50">
                   <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Changes Saved!</h3>
                <p className="text-sm font-medium text-gray-500 text-center">Student profile has been updated successfully.</p>
             </div>
          </div>
        )}

        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center space-x-4">
              <button 
                onClick={handleCancelEdit}
                className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-gray-100"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                 <h1 className="text-xl md:text-2xl font-black text-gray-900">Edit Student</h1>
                 <p className="text-xs font-bold text-gray-400 mt-1">Updating details for {editingStudent.studentName}</p>
              </div>
           </div>
           <div className="flex items-center space-x-3">
              <button 
                onClick={handleCancelEdit}
                className="px-6 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-black hover:bg-gray-100 transition-all border border-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setShowSuccessModal(true); setTimeout(() => { setShowSuccessModal(false); setIsEditing(false); }, 2000); }}
                className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
              >
                 <Save size={14} />
                 <span>Save Changes</span>
              </button>
           </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          
          {/* Section 1: Basic Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                <User size={18} className="text-indigo-500" />
                <h2 className="text-sm font-black text-gray-800">Primary Details</h2>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Row 1 */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Admission No <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" defaultValue={editingStudent.admissionNo} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Roll Number</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" defaultValue={editingStudent.rollNo} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Class <span className="text-red-500">*</span></label>
                    <div className="relative group">
                        <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none shadow-sm transition-all" defaultValue={editingStudent.class.split(' ')[0]}>
                            {classes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Section <span className="text-red-500">*</span></label>
                    <div className="relative group">
                        <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none shadow-sm transition-all" defaultValue={editingStudent.class.split(' ')[2]}>
                            {sections.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" defaultValue={editingStudent.studentName.split(' ')[0]} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Last Name</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" defaultValue={editingStudent.studentName.split(' ')[1] || ''} />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Gender <span className="text-red-500">*</span></label>
                    <div className="relative group">
                        <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none shadow-sm transition-all" defaultValue={editingStudent.gender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Date Of Birth <span className="text-red-500">*</span></label>
                    <input type="date" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" defaultValue={editingStudent.dob} />
                </div>

                {/* Row 3 */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Category</label>
                    <div className="relative group">
                        <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none shadow-sm transition-all" defaultValue={editingStudent.category}>
                            <option value="">Select</option>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                            <option value="SC/ST">SC/ST</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Religion</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Caste</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                    <input type="tel" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" defaultValue={editingStudent.mobile} />
                </div>
                
                {/* Row 4 */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <input type="email" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Admission Date</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" defaultValue="2024-04-02" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Student Photo (100px X 100px)</label>
                    <div className="border border-dashed border-gray-300 bg-gray-50/50 hover:bg-indigo-50/50 hover:border-indigo-300 rounded-xl px-4 py-2.5 flex items-center space-x-2 text-sm font-semibold text-gray-500 cursor-pointer transition-all shadow-sm">
                        <Upload size={16} className="text-indigo-400" />
                        <span className="flex-1 truncate">Drag and drop or click</span>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Blood Group</label>
                    <div className="relative group">
                        <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none shadow-sm transition-all">
                            <option value="">Select</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">House</label>
                    <div className="relative group">
                        <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 appearance-none shadow-sm transition-all">
                            <option value="">Select</option>
                            <option value="Red">Red House</option>
                            <option value="Blue">Blue House</option>
                            <option value="Green">Green House</option>
                            <option value="Yellow">Yellow House</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Height</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Weight</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Measurement Date</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm" defaultValue="2024-04-02" />
                </div>

                <div className="col-span-1 md:col-span-4 flex justify-end -mt-2">
                    <button className="flex items-center space-x-2 text-indigo-600 font-bold text-xs hover:text-indigo-800 transition-colors cursor-pointer">
                        <Plus size={14} />
                        <span>Add Sibling</span>
                    </button>
                </div>

                <div className="col-span-1 md:col-span-4 space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Medical History</label>
                    <textarea rows={3} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-sm"></textarea>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Section 2: Transport Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                 <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                    <Truck size={18} className="text-orange-500" />
                    <h2 className="text-sm font-black text-gray-800">Transport Details</h2>
                 </div>
                 <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-1.5 lg:col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Route List</label>
                        <div className="relative group">
                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none shadow-sm transition-all">
                                <option value="">VH1001</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-orange-500 transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-1.5 lg:col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Pickup Point</label>
                        <div className="relative group">
                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none shadow-sm transition-all">
                                <option value="">Brooklyn South</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-orange-500 transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-1.5 lg:col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Month</label>
                        <div className="relative group">
                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none shadow-sm transition-all">
                                <option value="">10 selected</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-orange-500 transition-colors" />
                        </div>
                    </div>
                 </div>
              </div>

              {/* Section 3: Hostel Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                 <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                    <Home size={18} className="text-emerald-500" />
                    <h2 className="text-sm font-black text-gray-800">Hostel Details</h2>
                 </div>
                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Hostel</label>
                        <div className="relative group">
                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none shadow-sm transition-all">
                                <option value="">Select</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Room No.</label>
                        <div className="relative group">
                            <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none shadow-sm transition-all">
                                <option value="">Select</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-emerald-500 transition-colors" />
                        </div>
                    </div>
                 </div>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Section 4: Fees Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                 <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <CreditCard size={18} className="text-blue-500" />
                        <h2 className="text-sm font-black text-gray-800">Fees Details</h2>
                    </div>
                    <span className="text-sm font-black text-gray-800 font-mono">6,900.00</span>
                 </div>
                 <div className="p-4 space-y-2">
                    {[
                        { label: 'Class 2 Lump Sum', amount: '350.00', checked: true },
                        { label: 'Class 2 General', amount: '6,550.00', checked: true },
                        { label: 'Class 5 General', amount: '10,100.00', checked: false },
                        { label: 'Edword Fees Group 2', amount: '500.00', checked: false },
                        { label: 'RKS Fees Test One', amount: '600.00', checked: false },
                        { label: 'Class 1 Lump Sum', amount: '150.00', checked: false },
                        { label: 'Class 1-I Installment', amount: '300.00', checked: false },
                        { label: 'Class 3 General', amount: '7,800.00', checked: false },
                        { label: 'Class 4 General', amount: '8,900.00', checked: false },
                        { label: 'Exam', amount: '250.00', checked: false },
                        { label: 'Fees', amount: '0.00', checked: false },
                        { label: 'Class 1 General', amount: '6,700.00', checked: false },
                    ].map((fee, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer shadow-sm">
                            <div className="flex items-center space-x-3">
                                <Plus size={14} className="text-gray-400 font-black cursor-pointer hover:text-blue-600" />
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" defaultChecked={fee.checked} />
                                <span className="text-sm font-medium text-gray-700">{fee.label}</span>
                            </div>
                            <span className="text-sm font-black text-gray-800 font-mono">{fee.amount}</span>
                        </div>
                    ))}
                 </div>
              </div>

              {/* Section 5: Fees Discount Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
                 <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                    <CreditCard size={18} className="text-purple-500" />
                    <h2 className="text-sm font-black text-gray-800">Fees Discount Details</h2>
                 </div>
                 <div className="p-4 space-y-2">
                    {[
                        { label: 'RKS Discount 1 - rksdisc01', checked: false },
                        { label: 'Sibling Discount - sibling-disc', checked: true },
                        { label: 'Handicapped Discount - handicap-disc', checked: false },
                        { label: 'Class Topper Discount - cls-top-disc', checked: true },
                    ].map((disc, i) => (
                        <div key={i} className="flex items-center space-x-3 px-4 py-3 bg-white border border-gray-100 rounded-xl hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer shadow-sm">
                            <Plus size={14} className="text-gray-400 font-black cursor-pointer hover:text-purple-600" />
                            <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" defaultChecked={disc.checked} />
                            <span className="text-sm font-medium text-gray-700">{disc.label}</span>
                        </div>
                    ))}
                 </div>
              </div>
          </div>

          {/* Section 6: Parent Guardian Detail */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                <User size={18} className="text-rose-500" />
                <h2 className="text-sm font-black text-gray-800">Parent Guardian Detail</h2>
             </div>
             <div className="p-6 space-y-8">
                 {/* Father row */}
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Father Name</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm" defaultValue="Medison" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Phone No</label>
                        <input type="tel" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Father Occupation</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Father Photo (100px X 100px)</label>
                        <div className="border border-dashed border-gray-300 bg-gray-50/50 hover:bg-rose-50/50 hover:border-rose-300 rounded-xl px-4 py-2.5 flex items-center space-x-2 text-sm font-semibold text-gray-500 cursor-pointer shadow-sm transition-all text-center">
                            <Upload size={16} className="text-gray-400" />
                            <span className="flex-1 truncate">Drag and drop a file here or ...</span>
                        </div>
                    </div>
                 </div>

                 {/* Mother row */}
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Mother Name</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Mother Phone</label>
                        <input type="tel" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Mother Occupation</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Mother Photo (100px X 100px)</label>
                        <div className="border border-dashed border-gray-300 bg-gray-50/50 hover:bg-rose-50/50 hover:border-rose-300 rounded-xl px-4 py-2.5 flex items-center space-x-2 text-sm font-semibold text-gray-500 cursor-pointer shadow-sm transition-all text-center">
                            <Upload size={16} className="text-gray-400" />
                            <span className="flex-1 truncate">Drag and drop a file here or ...</span>
                        </div>
                    </div>
                 </div>
                 
                 <div className="flex items-center space-x-6 pt-2">
                    <span className="text-sm font-medium text-gray-800">If Guardian Is <span className="text-red-500">*</span></span>
                    {['Father', 'Mother', 'Other'].map((opt, i) => (
                        <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                            <input type="radio" name="guardian_full" className="text-indigo-600 focus:ring-indigo-500 w-4 h-4 border-gray-300" defaultChecked={i === 0} />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">{opt}</span>
                        </label>
                    ))}
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Guardian Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" defaultValue="Medison" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Guardian Relation</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" defaultValue="Father" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Guardian Email</label>
                        <input type="email" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Guardian Photo (100px X 100px)</label>
                        <div className="border border-dashed border-gray-300 bg-gray-50/50 hover:bg-indigo-50/50 hover:border-indigo-300 rounded-xl px-4 py-2.5 flex items-center space-x-2 text-sm font-semibold text-gray-500 cursor-pointer shadow-sm transition-all text-center">
                            <Upload size={16} className="text-gray-400" />
                            <span className="flex-1 truncate">Drag and drop a file here or ...</span>
                        </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Guardian Phone <span className="text-red-500">*</span></label>
                        <input type="tel" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" defaultValue={"21841041840"} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Guardian Occupation</label>
                        <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700">Guardian Address</label>
                        <textarea rows={2} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm flex-1"></textarea>
                    </div>
                 </div>
             </div>
          </div>

          {/* Section 7: Address Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                <MapPin size={18} className="text-teal-500" />
                <h2 className="text-sm font-black text-gray-800">Address Details</h2>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                     <div className="flex items-center space-x-3">
                         <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 border-gray-300" />
                         <span className="text-sm font-medium text-gray-700">If Guardian Address Is Current Address</span>
                     </div>
                     <div className="space-y-1.5">
                         <label className="text-sm font-semibold text-gray-700">Current Address</label>
                         <textarea rows={3} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"></textarea>
                     </div>
                 </div>
                 <div className="space-y-4">
                     <div className="flex items-center space-x-3">
                         <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 border-gray-300" />
                         <span className="text-sm font-medium text-gray-700">If Permanent Address Is Current Address</span>
                     </div>
                     <div className="space-y-1.5">
                         <label className="text-sm font-semibold text-gray-700">Permanent Address</label>
                         <textarea rows={3} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"></textarea>
                     </div>
                 </div>
             </div>
          </div>

          {/* Section 8: Miscellaneous Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex items-center space-x-2">
                <Activity size={18} className="text-gray-500" />
                <h2 className="text-sm font-black text-gray-800">Miscellaneous Details</h2>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-1.5">
                     <label className="text-sm font-semibold text-gray-700">Bank Account Number</label>
                     <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm" />
                 </div>
                 <div className="space-y-1.5">
                     <label className="text-sm font-semibold text-gray-700">Bank Name</label>
                     <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm" />
                 </div>
                 <div className="space-y-1.5">
                     <label className="text-sm font-semibold text-gray-700">IFSC Code</label>
                     <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm" />
                 </div>
                 
                 <div className="space-y-1.5">
                     <label className="text-sm font-semibold text-gray-700">National Identification Number</label>
                     <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm" />
                 </div>
                 <div className="space-y-1.5">
                     <label className="text-sm font-semibold text-gray-700">Local Identification Number</label>
                     <input type="text" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm" />
                 </div>
                 <div className="space-y-1.5">
                     <label className="text-sm font-semibold text-gray-700">RTE Status</label>
                     <div className="flex items-center space-x-6 h-[42px] px-2">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                             <input type="radio" name="rte_status" className="text-gray-600 focus:ring-gray-500 w-4 h-4 border-gray-300" />
                             <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors">Yes</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer group">
                             <input type="radio" name="rte_status" className="text-gray-600 focus:ring-gray-500 w-4 h-4 border-gray-300" defaultChecked />
                             <span className="text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors">No</span>
                        </label>
                     </div>
                 </div>

                 <div className="space-y-1.5 md:col-span-3">
                     <label className="text-sm font-semibold text-gray-700">Previous School Details</label>
                     <textarea rows={2} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all shadow-sm flex-1"></textarea>
                 </div>
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
                  <label className="text-sm font-bold text-gray-600 block">
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
                  <label className="text-sm font-bold text-gray-600 block">
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
                <span>Search</span>
              </button>
          </div>

          {/* Right: Search by Keyword Form WITH button */}
          <div className="flex items-end space-x-4">
              <div className="space-y-1.5 flex-1 lg:flex-none lg:w-[320px]">
                <label className="text-sm font-bold text-gray-600 block">
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
                <span>Search</span>
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
            <span>List View</span>
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
            <span>Details View</span>
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

              <div className="overflow-x-auto overflow-y-auto max-h-[500px] border border-gray-300 rounded-xl">
                <table className="min-w-[1200px] w-full text-left border-separate border-spacing-0">
                  <thead className="bg-[#fcfdff] border-b border-gray-200 sticky top-0 z-10 shadow-[0_2px_2px_-1px_rgba(0,0,0,0.05)]">
                    <tr>
                      {columns.map((col) => (
                        <th key={col} className="px-4 py-2.5 text-sm font-black text-gray-700 border-r border-b border-gray-300 bg-gray-50/50">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-2.5 text-sm font-bold text-gray-900 border-r border-b border-gray-300">{student.admissionNo}</td>
                        <td className="px-4 py-2.5 text-sm font-bold text-blue-700 cursor-pointer hover:underline border-r border-b border-gray-300">{student.studentName}</td>
                        <td className="px-4 py-2.5 text-sm font-bold text-gray-900 border-r border-b border-gray-300">{student.rollNo}</td>
                        <td className="px-4 py-2.5 text-sm font-bold text-gray-900 border-r border-b border-gray-300">{student.class}</td>
                        <td className="px-4 py-2.5 text-sm font-bold text-gray-900 border-r border-b border-gray-300">{student.fatherName}</td>
                        <td className="px-4 py-2.5 text-sm font-bold text-gray-900 border-r border-b border-gray-300">{student.dob}</td>
                        <td className="px-4 py-2.5 text-sm font-bold text-gray-900 border-r border-b border-gray-300">{student.gender}</td>
                        <td className="px-4 py-2.5 text-sm font-bold text-gray-900 border-r border-b border-gray-300">
                          <span className="px-3 py-1 bg-gray-100 rounded text-xs text-gray-900 font-black">{student.category}</span>
                        </td>
                        <td className="px-4 py-2.5 text-sm font-bold text-gray-900 border-r border-b border-gray-300">{student.mobile}</td>
                        <td className="px-4 py-2.5 relative border-b border-gray-300">
                          <button 
                             onClick={() => setOpenActionId(openActionId === student.admissionNo ? null : student.admissionNo)}
                             className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openActionId === student.admissionNo && (
                              <div 
                                   ref={actionMenuRef}
                                   className="absolute right-8 top-10 w-48 bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-1.5 z-50 flex flex-col space-y-0.5 animate-in fade-in zoom-in-95 duration-200"
                               >
                                   <button className="flex items-center space-x-3 w-full px-4 py-2.5 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 rounded-xl transition-all group"
                                     onClick={() => handleView(student)}
                                   >
                                       <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                           <Eye size={16} className="text-indigo-500 group-hover:scale-110 transition-transform" />
                                       </div>
                                       <span className="text-sm font-bold flex-1 text-left">View Details</span>
                                   </button>
                                   <button 
                                       onClick={() => handleEdit(student)}
                                       className="flex items-center space-x-3 w-full px-4 py-2.5 hover:bg-orange-50 text-gray-700 hover:text-orange-600 rounded-xl transition-all group"
                                   >
                                       <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                           <Edit size={16} className="text-orange-500 group-hover:scale-110 transition-transform" />
                                       </div>
                                       <span className="text-sm font-bold flex-1 text-left">Edit Profile</span>
                                   </button>
                                   <button className="flex items-center space-x-3 w-full px-4 py-2.5 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 rounded-xl transition-all group">
                                       <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                           <CreditCard size={16} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                       </div>
                                       <span className="text-sm font-bold flex-1 text-left">Add Fees</span>
                                   </button>
                                   <button className="flex items-center space-x-3 w-full px-4 py-2.5 hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-xl transition-all group">
                                       <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                           <Printer size={16} className="text-purple-500 group-hover:scale-110 transition-transform" />
                                       </div>
                                       <span className="text-sm font-bold flex-1 text-left">Print Profile</span>
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
