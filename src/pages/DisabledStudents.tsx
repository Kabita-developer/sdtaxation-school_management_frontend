import { useState, useEffect, useRef } from 'react';
import { 
  List, 
  LayoutGrid, 
  ChevronDown, 
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
  X, 
  User, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  ImageIcon, 
  MapPin, 
  Home, 
  Hash, 
  School, 
  Layers, 
  Activity, 
  CheckCircle2,
  Users,
  Copy,
  Columns,
  Table as TableIcon,
  FolderOpen
} from 'lucide-react';

export default function DisabledStudents() {
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
      disableReason: 'Medical Leave',
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
      disableReason: 'Transfer Out',
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
      disableReason: 'Personal Reason',
      profileImage: 'https://i.pravatar.cc/150?u=1003'
    }
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
    'Class',
    'Father Name',
    'Disable Reason',
    'Gender',
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
        <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-500">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
             <div className="flex items-center space-x-4">
                <button 
                  onClick={handleCancelEdit}
                  className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-gray-100"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                   <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Edit Disabled Student</h1>
                   <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Updating details for {editingStudent.studentName}</p>
                </div>
             </div>
          </div>
  
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-indigo-50/20 border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
              <div className="px-8 py-10 bg-gray-50/50 border-b border-gray-100">
                 <div className="flex items-center justify-between max-w-4xl mx-auto">
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
                           <div key={step.id} className="flex-1 flex items-center group">
                              <div className="flex flex-col items-center space-y-2 relative">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                     isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-110' : 
                                     isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white border-2 border-gray-100 text-gray-400'
                                 }`}>
                                    {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                                 </div>
                                 <span className={`absolute -bottom-6 whitespace-nowrap text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>{step.title}</span>
                              </div>
                              {idx < arr.length - 1 && (
                                 <div className={`flex-1 h-0.5 mx-4 rounded-full transition-all duration-700 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-100'}`}></div>
                              )}
                           </div>
                        );
                    })}
                 </div>
              </div>
  
              <div className="flex-1 p-8 md:p-12 text-left">
                {editStep === 1 && (
                   <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-4 py-1">
                          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">General Identity Details</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Admission No <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" defaultValue={editingStudent.admissionNo} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Roll Number</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" defaultValue={editingStudent.rollNo} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Class <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold appearance-none" defaultValue={editingStudent.class.split(' ')[0]}>
                                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Section <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold appearance-none" defaultValue={editingStudent.class.split(' ')[2]}>
                                    {sections.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Student Name</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold" defaultValue={editingStudent.studentName} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1">Disable Reason</label>
                                <input type="text" className="w-full px-4 py-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-sm font-black text-indigo-600" defaultValue={editingStudent.disableReason} />
                            </div>
                      </div>
                   </div>
                )}
                {editStep > 1 && <div className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest">Step {editStep} Content...</div>}
              </div>
  
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                 <button onClick={() => editStep > 1 && setEditStep(editStep - 1)} disabled={editStep === 1} className="px-6 py-2.5 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400">Previous</button>
                 <div className="flex space-x-3">
                    {editStep < 5 ? (
                        <button onClick={() => setEditStep(editStep + 1)} className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100">Next Step</button>
                    ) : (
                      <button onClick={() => setIsEditing(false)} className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-50">Finish</button>
                    )}
                 </div>
              </div>
          </div>
        </div>
      );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
        {/* Page Header (Optional, but keeping for contextual title) */}
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
                <Users className="text-indigo-600" size={24} />
                <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Disabled Students</h1>
            </div>
        </div>

        {/* Perfectly Refined Select Criteria Section */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 overflow-hidden text-left mb-8 animate-in slide-in-from-top duration-700">
            <div className="px-8 py-5 border-b border-slate-50 flex items-center space-x-3 bg-white/50">
                <Search className="text-[#2062f6]" size={18} />
                <h2 className="text-[15px] font-extrabold text-slate-800 tracking-tight">Select Criteria</h2>
            </div>
            <div className="p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                    {/* Class & Section Selection */}
                    <div className="lg:col-span-6 flex items-end space-x-4">
                        <div className="flex-1 space-y-2.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Class <span className="text-rose-500">*</span></label>
                            <div className="relative group">
                                <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none pr-12 shadow-sm group-hover:bg-white">
                                    <option value="">Select</option>
                                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-2.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Section</label>
                            <div className="relative group">
                                <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none pr-12 shadow-sm group-hover:bg-white">
                                    <option value="">Select</option>
                                    {sections.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <button className="h-[52px] px-8 bg-[#2062f6] text-white rounded-xl flex items-center space-x-3 hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 active:scale-95 group">
                            <Search size={16} className="group-hover:scale-110 transition-all duration-300" />
                            <span className="text-[11px] font-black uppercase tracking-widest">Search</span>
                        </button>
                    </div>

                    {/* Search By Keyword */}
                    <div className="lg:col-span-6 space-y-2.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Search By Keyword</label>
                        <div className="flex space-x-4">
                            <div className="flex-1 relative group">
                                <input 
                                    type="text" 
                                    placeholder="Search by Keyword..." 
                                    className="w-full px-6 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm group-hover:bg-white" 
                                />
                            </div>
                            <button className="h-[52px] px-8 bg-[#6366f1] text-white rounded-xl flex items-center space-x-3 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95 group">
                                <Search size={16} className="group-hover:scale-110 transition-all duration-300" />
                                <span className="text-[11px] font-black uppercase tracking-widest">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Tabs & Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('list')}
                    className={`px-6 py-4 flex items-center space-x-2 border-b-2 transition-all ${activeTab === 'list' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/10' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <List size={16} />
                    <span className="text-xs font-bold">List View</span>
                </button>
                <button 
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-4 flex items-center space-x-2 border-b-2 transition-all ${activeTab === 'details' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/10' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <LayoutGrid size={16} />
                    <span className="text-xs font-bold">Details View</span>
                </button>
            </div>

            <div className="p-6">
                {/* Table Toolbar */}
                <div className="flex items-center justify-between mb-4">
                    <div className="w-64">
                         <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full px-3 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:border-indigo-500"
                            value={tableSearch}
                            onChange={(e) => setTableSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 mr-4">
                            <select className="px-2 py-1 border border-gray-200 rounded text-xs font-bold bg-white outline-none">
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <ChevronDown size={14} className="text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-1 border-l border-gray-100 pl-3">
                            {[Copy, FileSpreadsheet, FileText, FileDown, Printer, Columns, TableIcon].map((Icon, i) => (
                                <button key={i} className="p-1.5 text-gray-500 hover:text-indigo-600 transition-colors">
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {activeTab === 'list' ? (
                   <div className="overflow-x-auto">
                       <table className="w-full text-left border-collapse border border-gray-100">
                           <thead className="bg-[#fbfcff]">
                               <tr>
                                   {columns.map(col => (
                                       <th key={col} className="px-4 py-3 text-[12px] font-bold text-gray-700 border-b border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <span>{col}</span>
                                                {col !== 'Action' && <div className="flex flex-col space-y-[-4px] opacity-20"><ChevronDown size={10} className="rotate-180" /><ChevronDown size={10} /></div>}
                                            </div>
                                       </th>
                                   ))}
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                               {filteredStudents.length > 0 ? (
                                   filteredStudents.map((student) => (
                                       <tr key={student.admissionNo} className="hover:bg-gray-50 transition-colors group">
                                           <td className="px-4 py-3 text-xs text-gray-600">{student.admissionNo}</td>
                                           <td className="px-4 py-3">
                                               <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xs">{student.studentName}</div>
                                           </td>
                                           <td className="px-4 py-3 text-xs text-gray-600">{student.class}</td>
                                           <td className="px-4 py-3 text-xs text-gray-600">{student.fatherName}</td>
                                           <td className="px-4 py-3 text-xs text-rose-500 font-medium">{student.disableReason}</td>
                                           <td className="px-4 py-3 text-xs text-gray-600">{student.gender}</td>
                                           <td className="px-4 py-3 text-xs text-gray-600">{student.mobile}</td>
                                           <td className="px-4 py-3 text-right">
                                               <div className="flex items-center justify-end space-x-2">
                                                   <button onClick={() => handleEdit(student)} className="text-gray-400 hover:text-indigo-600"><Edit size={14} /></button>
                                                   <button className="text-gray-400 hover:text-rose-600"><Trash2 size={14} /></button>
                                               </div>
                                           </td>
                                       </tr>
                                   ))
                               ) : (
                                   <tr>
                                       <td colSpan={8} className="py-20 text-center">
                                           <div className="flex flex-col items-center justify-center space-y-4 opacity-50">
                                               <div className="w-40 h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center">
                                                   <FolderOpen size={48} className="text-gray-200" />
                                               </div>
                                               <div className="text-rose-400 text-xs font-bold uppercase tracking-widest italic">No data available in table</div>
                                           </div>
                                       </td>
                                   </tr>
                               )}
                           </tbody>
                       </table>
                       <div className="flex items-center justify-between mt-4 px-2">
                            <span className="text-[11px] text-gray-500 font-medium italic">Record created on 2024-03-30</span>
                            <div className="flex space-x-1">
                                <button className="px-3 py-1 border border-gray-200 rounded text-xs text-gray-400 hover:bg-gray-50 transition-colors uppercase font-bold">Previous</button>
                                <button className="px-3 py-1 border border-gray-200 rounded text-xs text-gray-400 hover:bg-gray-50 transition-colors uppercase font-bold">Next</button>
                            </div>
                       </div>
                   </div>
                ) : (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500 min-h-[400px]">
                       {filteredStudents.map(student => (
                           <div key={student.admissionNo} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all text-left">
                               <div className="flex items-center space-x-4 mb-4">
                                   <img src={student.profileImage} className="w-12 h-12 rounded-xl object-cover" alt="" />
                                   <div>
                                       <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{student.studentName}</h3>
                                       <p className="text-[10px] text-gray-400 font-black">ADMISSION NO: {student.admissionNo}</p>
                                   </div>
                               </div>
                               <div className="space-y-2 border-t border-gray-50 pt-4">
                                   <div className="flex justify-between text-[11px]"><span className="text-gray-400 font-bold uppercase">Class:</span> <span className="text-gray-900 font-black">{student.class}</span></div>
                                   <div className="flex justify-between text-[11px]"><span className="text-gray-400 font-bold uppercase">Father:</span> <span className="text-gray-900 font-bold">{student.fatherName}</span></div>
                                   <div className="flex justify-between text-[11px]"><span className="text-gray-400 font-bold uppercase">Reason:</span> <span className="text-rose-500 font-black">{student.disableReason}</span></div>
                               </div>
                           </div>
                       ))}
                       {filteredStudents.length === 0 && <div className="col-span-3 flex items-center justify-center p-20 text-gray-300 font-bold uppercase tracking-widest italic">No students to display in details view</div>}
                   </div>
                )}
            </div>
        </div>
    </div>
  );
}
