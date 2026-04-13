import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
    Search, 
    ChevronDown, 
    Copy, 
    FileSpreadsheet, 
    FileText, 
    Printer, 
    Eye,
    RotateCcw,
    LayoutGrid,
    Users,
    Trash2,
    Calendar,
    ArrowRightCircle,
    Download,
    Check
} from 'lucide-react';

const FeesCarryForward = () => {
    const { theme } = useTheme();
    
    // Selection States
    const [selectedClass, setSelectedClass] = useState('Class 1');
    const [selectedSection, setSelectedSection] = useState('A');
    const [showVisibility, setShowVisibility] = useState(false);
    
    // Column Visibility State
    const [visibleColumns, setVisibleColumns] = useState({
        studentName: true,
        admissionNo: true,
        admissionDate: true,
        rollNo: true,
        father: true,
        balance: true,
        status: true
    });

    const toggleColumn = (col: keyof typeof visibleColumns) => {
        setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
    };

    const resetColumns = () => {
        setVisibleColumns({
            studentName: true,
            admissionNo: true,
            admissionDate: true,
            rollNo: true,
            father: true,
            balance: true,
            status: true
        });
    };

    const dummyStudents = [
        { name: 'Edward Thomas', admissionNo: '1800011', admissionDate: '04/01/2026', rollNo: '001', father: 'Olivier Thomas', balance: '0.00', status: 'Not Assigned' },
        { name: 'Hariom Yadav', admissionNo: '003', admissionDate: '04/01/2026', rollNo: '', father: '', balance: '0.00', status: 'Not Assigned' },
        { name: 'Hariom Yadav', admissionNo: 'A003', admissionDate: '04/01/2026', rollNo: '', father: '', balance: '0.00', status: 'Not Assigned' },
        { name: 'Mary Festus', admissionNo: 'RP2001', admissionDate: '', rollNo: '', father: 'festus', balance: '0.00', status: 'Not Assigned' },
        { name: 'Nisha', admissionNo: 'A004', admissionDate: '04/01/2026', rollNo: '', father: '', balance: '0.00', status: 'Not Assigned' },
        { name: 'Niya', admissionNo: 'A41003', admissionDate: '04/01/2026', rollNo: '', father: '', balance: '0.00', status: 'Not Assigned' },
        { name: 'Sneha Patel', admissionNo: '002', admissionDate: '', rollNo: '', father: 'Ramesh Patel', balance: '0.00', status: 'Not Assigned' },
    ];

    const exportOptions = [
        { icon: Copy, label: 'Copy' },
        { icon: FileSpreadsheet, label: 'Excel' },
        { icon: FileText, label: 'CSV' },
        { icon: FileText, label: 'PDF' },
        { icon: Printer, label: 'Print' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans relative">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fees Carry Forward</h1>
                    <p className="text-gray-900 text-sm mt-1 font-medium italic">Transfer previous session balances to the current academic year</p>
                </div>
            </div>

            <div className="space-y-6">
                
                {/* Select Criteria Section */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transform transition-all duration-300">
                    <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                             <div className="p-2 bg-purple-600 text-white rounded-lg shadow-md shadow-purple-200">
                                <ArrowRightCircle size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Select Criteria</h2>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-200/50 transition-all active:scale-95">
                            <Trash2 size={14} />
                            <span>Delete Carry Forward</span>
                        </button>
                    </div>
                    
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5 text-sm font-bold text-gray-900 ml-1">Class <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-600 appearance-none transition-all cursor-pointer">
                                        <option value="Class 1">Class 1</option>
                                        <option value="Class 2">Class 2</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors"><ChevronDown size={18} /></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5 text-sm font-bold text-gray-900 ml-1">Section <span className="text-red-500">*</span></label>
                                <div className="relative group">
                                    <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-2xl text-sm font-medium text-gray-700 outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-600 appearance-none transition-all cursor-pointer">
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors"><ChevronDown size={18} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button className="flex items-center gap-2 px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-2xl shadow-xl shadow-purple-200 transition-all active:scale-95 group">
                                <Search size={18} className="group-hover:scale-110 transition-transform" />
                                <span>Search</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Previous Session Balance Section */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transform transition-all duration-300">
                    <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-600 text-white rounded-lg shadow-md shadow-purple-200">
                                <Users size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 tracking-tight">Previous Session Balance Fees</h2>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 border border-rose-100 rounded-xl">
                            <Calendar size={14} className="text-rose-500" />
                            <span className="text-xs font-bold text-rose-600 tracking-tight">Due date: 06/08/2026</span>
                        </div>
                    </div>

                    {/* Table Toolbar */}
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border-b border-gray-50">
                        <div className="relative group max-w-xs w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors"><Search size={16} /></div>
                            <input type="text" className="block w-full pl-11 pr-4 py-2.5 bg-[#fcfdff] border border-gray-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-purple-500/10 focus:border-purple-600 outline-none transition-all placeholder:text-gray-400" placeholder="Search by student details..." />
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-3 bg-[#fcfdff] px-4 py-2 border border-gray-200 rounded-xl">
                                <span className="text-xs font-bold text-gray-500 tracking-tight">Rows</span>
                                <select className="bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer appearance-none pr-6">
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <ChevronDown size={14} className="-ml-6 pointer-events-none text-gray-500" />
                            </div>
                            
                            <div className="flex items-center gap-1 relative">
                                {exportOptions.map((opt, i) => (
                                    <button key={i} title={opt.label} className="p-2.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all active:scale-90"><opt.icon size={18} /></button>
                                ))}
                                
                                {/* Column Visibility Button */}
                                <button 
                                    onClick={() => setShowVisibility(!showVisibility)}
                                    title="Column Visibility" 
                                    className={`p-2.5 rounded-xl transition-all active:scale-90 relative ${showVisibility ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'}`}
                                >
                                    <LayoutGrid size={18} />
                                </button>

                                {/* Column Visibility Dropdown */}
                                {showVisibility && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
                                            <span className="text-sm font-bold text-purple-600">Column Visibility</span>
                                            <button onClick={resetColumns} className="text-[10px] font-black uppercase text-purple-600 hover:underline">Reset All</button>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            {Object.keys(visibleColumns).map((col) => (
                                                <button 
                                                    key={col}
                                                    onClick={() => toggleColumn(col as keyof typeof visibleColumns)}
                                                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-purple-50 transition-colors group"
                                                >
                                                    <span className="capitalize">{col.replace(/([A-Z])/g, ' $1')}</span>
                                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all ${visibleColumns[col as keyof typeof visibleColumns] ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-200'}`}>
                                                        {visibleColumns[col as keyof typeof visibleColumns] && <Check size={12} strokeWidth={4} />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#fcfdff] border-y border-gray-100 text-sm">
                                    {visibleColumns.studentName && <th className="px-6 py-4 text-left border-x border-gray-50/50 whitespace-nowrap"><span className="font-bold text-gray-600 tracking-tight">Student Name</span></th>}
                                    {visibleColumns.admissionNo && <th className="px-6 py-4 text-left border-x border-gray-50/50 whitespace-nowrap"><span className="font-bold text-gray-600 tracking-tight">Admission No</span></th>}
                                    {visibleColumns.admissionDate && <th className="px-6 py-4 text-left border-x border-gray-50/50 whitespace-nowrap"><span className="font-bold text-gray-600 tracking-tight">Admission Date</span></th>}
                                    {visibleColumns.rollNo && <th className="px-6 py-4 text-left border-x border-gray-50/50 whitespace-nowrap"><span className="font-bold text-gray-600 tracking-tight">Roll Number</span></th>}
                                    {visibleColumns.father && <th className="px-6 py-4 text-left border-x border-gray-50/50 whitespace-nowrap"><span className="font-bold text-gray-600 tracking-tight">Father Name</span></th>}
                                    {visibleColumns.balance && <th className="px-6 py-4 text-left border-x border-gray-50/50 min-w-[150px] whitespace-nowrap"><span className="font-bold text-gray-600 tracking-tight">Balance ($)</span></th>}
                                    {visibleColumns.status && <th className="px-6 py-4 text-left border-x border-gray-50/50 whitespace-nowrap"><span className="font-bold text-gray-600 tracking-tight">Status</span></th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 italic font-medium">
                                {dummyStudents.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-purple-50/20 transition-all duration-200">
                                        {visibleColumns.studentName && <td className="px-6 py-4 text-sm text-gray-900 border-x border-gray-50/50 font-bold not-italic whitespace-nowrap">{row.name}</td>}
                                        {visibleColumns.admissionNo && <td className="px-6 py-4 text-sm text-gray-600 border-x border-gray-50/50 font-mono text-[11px] whitespace-nowrap">{row.admissionNo}</td>}
                                        {visibleColumns.admissionDate && <td className="px-6 py-4 text-sm text-gray-600 border-x border-gray-50/50 whitespace-nowrap">{row.admissionDate || '-'}</td>}
                                        {visibleColumns.rollNo && <td className="px-6 py-4 text-sm text-gray-600 border-x border-gray-50/50 text-center font-bold text-purple-600 whitespace-nowrap">{row.rollNo || '-'}</td>}
                                        {visibleColumns.father && <td className="px-6 py-4 text-sm text-gray-600 border-x border-gray-50/50 whitespace-nowrap">{row.father || '-'}</td>}
                                        {visibleColumns.balance && (
                                            <td className="px-6 py-4 border-x border-gray-50/50 whitespace-nowrap">
                                                <div className="relative group/input">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-purple-600 transition-colors"><span className="text-[10px] font-bold">$</span></div>
                                                    <input type="text" defaultValue={row.balance} className="block w-full pl-7 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:border-purple-600 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all shadow-sm" />
                                                </div>
                                            </td>
                                        )}
                                        {visibleColumns.status && (
                                            <td className="px-6 py-4 text-sm border-x border-gray-50/50 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight ${row.status === 'Not Assigned' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="px-8 py-6 border-t border-gray-50 bg-[#fcfdff] flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <p className="text-sm font-bold text-gray-500 italic">Showing 1 to {dummyStudents.length} of {dummyStudents.length} entries</p>
                            <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
                            <button className="flex items-center gap-1.5 text-xs font-bold tracking-tight text-purple-600 hover:text-purple-700 transition-colors">
                                <Download size={14} />
                                <span>Export all data</span>
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center space-x-1.5">
                                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-white hover:border-purple-600 hover:text-purple-600 transition-all active:scale-90">&lt;</button>
                                <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-purple-600 text-white font-black text-sm shadow-lg shadow-purple-200 transition-all active:scale-95">1</button>
                                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-white hover:border-purple-600 hover:text-purple-600 transition-all active:scale-90">&gt;</button>
                            </div>
                            <button className="px-10 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl shadow-xl shadow-purple-200 transition-all active:scale-95">Save settings</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeesCarryForward;
