import { useState, useRef, useEffect } from 'react';
import {
    TrendingUp,
    Search,
    Download,
    Printer,
    Check,
    AlertCircle,
    UserCircle,
    X,
    ChevronDown,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

export default function PromoteStudents() {
    const { theme } = useTheme();
    const { showSuccess } = useNotification();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const rowsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (rowsRef.current && !rowsRef.current.contains(event.target as Node)) setIsRowsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const [criteria, setCriteria] = useState({
        class: 'Class 1',
        section: 'A'
    });

    const [promoteSettings, setPromoteSettings] = useState({
        session: '2023-24',
        class: 'Class 1',
        section: 'A'
    });

    const sessions = Array.from({ length: 90 }, (_, i) => {
        const year = 2010 + i;
        const nextYearShort = String(year + 1).slice(-2);
        return `${year}-${nextYearShort}`;
    });

    const [students, setStudents] = useState([
        { id: '1', admissionNo: '1800011', name: 'Edward Thomas', fatherName: 'Olivier Thomas', dob: '04/08/2020', result: 'Pass', status: 'Continue', selected: true },
        { id: '2', admissionNo: '002', name: 'Sneha Patel', fatherName: 'Ramesh Patel', dob: '07/15/2016', result: 'Pass', status: 'Continue', selected: true },
        { id: '3', admissionNo: '003', name: 'Hariom Yadav', fatherName: '', dob: '04/08/2020', result: 'Pass', status: 'Continue', selected: true },
        { id: '4', admissionNo: 'A003', name: 'Hariom Yadav', fatherName: '', dob: '04/08/2020', result: 'Pass', status: 'Continue', selected: true },
        { id: '5', admissionNo: 'A004', name: 'Nisha', fatherName: '', dob: '04/15/2026', result: 'Pass', status: 'Continue', selected: true },
        { id: '6', admissionNo: 'A41003', name: 'niya', fatherName: '', dob: '04/22/2026', result: 'Pass', status: 'Continue', selected: true },
    ]);

    const handleSelectAll = (checked: boolean) => {
        setStudents(students.map(s => ({ ...s, selected: checked })));
    };

    const handleStudentSelect = (id: string, checked: boolean) => {
        setStudents(students.map(s => s.id === id ? { ...s, selected: checked } : s));
    };

    const handleResultChange = (id: string, result: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, result } : s));
    };

    const handleStatusChange = (id: string, status: string) => {
        setStudents(students.map(s => s.id === id ? { ...s, status } : s));
    };

    const handlePromote = () => {
        setShowConfirmModal(false);
        showSuccess('Promotion Successful', `${students.filter(s => s.selected).length} students have been promoted to the next session.`);
    };

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500 text-left relative pb-20">
            {/* Promote Confirmation Modal */}
            {showConfirmModal && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    onClick={() => setShowConfirmModal(false)}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Promote Confirmation</h3>
                            <button 
                                onClick={() => setShowConfirmModal(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            <p className="text-sm font-bold text-gray-700">
                                Are You Sure You, Want To Promote Confirm?
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handlePromote}
                                className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center space-x-3">
                <div className={`p-2 bg-gray-50 text-gray-600 rounded-lg`}>
                    <TrendingUp size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Student Promotion</h2>
            </div>

            {/* Criteria & Promotion Settings Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-400 overflow-hidden">
                <div className="px-6 py-3 border-b border-gray-400 bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center">
                        <AlertCircle size={16} className="mr-2 text-gray-500" />
                        Select Criteria
                    </h3>
                </div>
                <div className="p-5 py-4 space-y-4">
                    {/* First Row: Select Criteria */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 ml-1">Class <span className="text-rose-500">*</span></label>
                            <select 
                                className="w-full px-4 py-2 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                value={criteria.class}
                                onChange={(e) => setCriteria({ ...criteria, class: e.target.value })}
                            >
                                <option>Class 1</option>
                                <option>Class 2</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 ml-1">Section <span className="text-rose-500">*</span></label>
                            <select 
                                className="w-full px-4 py-2 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                value={criteria.section}
                                onChange={(e) => setCriteria({ ...criteria, section: e.target.value })}
                            >
                                <option>A</option>
                                <option>B</option>
                            </select>
                        </div>
                    </div>

                    {/* Divider Label */}
                    <div className="flex items-center space-x-4">
                        <h3 className="text-xs font-bold text-gray-800 flex-shrink-0">Promote Students In Next Session</h3>
                        <div className="h-px bg-gray-400 w-full"></div>
                    </div>

                    {/* Second Row: Promote In Session Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 ml-1">Promote In Session <span className="text-rose-500">*</span></label>
                            <select 
                                className="w-full px-4 py-2 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                value={promoteSettings.session}
                                onChange={(e) => setPromoteSettings({ ...promoteSettings, session: e.target.value })}
                            >
                                {sessions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 ml-1">Class <span className="text-rose-500">*</span></label>
                            <select 
                                className="w-full px-4 py-2 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                value={promoteSettings.class}
                                onChange={(e) => setPromoteSettings({ ...promoteSettings, class: e.target.value })}
                            >
                                <option>Class 1</option>
                                <option>Class 2</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 ml-1">Section <span className="text-rose-500">*</span></label>
                            <select 
                                className="w-full px-4 py-2 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                value={promoteSettings.section}
                                onChange={(e) => setPromoteSettings({ ...promoteSettings, section: e.target.value })}
                            >
                                <option>A</option>
                                <option>B</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Action */}
                    <div className="flex justify-end pt-0">
                        <button className="flex items-center space-x-2 px-8 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                            <Search size={16} />
                            <span>Search List</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Student List Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-400 overflow-hidden">
                <div className="px-8 py-4 border-b border-gray-400 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-800 flex items-center">
                        <UserCircle size={18} className="mr-2 text-gray-500" />
                        Student List
                    </h3>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Search by Student Name..."
                                className="pl-9 pr-4 py-2 bg-white border border-gray-400 rounded-xl text-xs font-bold text-gray-700 focus:border-indigo-500 outline-none transition-all w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-2 border-l border-gray-400 pl-4">
                            <div className="relative" ref={rowsRef}>
                                <div 
                                    onClick={() => setIsRowsOpen(!isRowsOpen)}
                                    className="flex items-center space-x-2 bg-white border border-gray-400 rounded-xl px-3 py-1.5 shadow-sm cursor-pointer hover:bg-gray-50 transition-all font-bold text-gray-700"
                                >
                                    <span className="text-xs">{rowsPerPage}</span>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isRowsOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {isRowsOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-20 bg-white border border-gray-400 rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                                        {[10, 25, 50, 100, 200, 300, 'All'].map(val => (
                                            <div 
                                                key={val}
                                                onClick={() => { setRowsPerPage(val); setIsRowsOpen(false); }}
                                                className={`px-4 py-2 text-xs font-bold cursor-pointer transition-colors ${rowsPerPage === val ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                {val}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-all" title="Print"><Printer size={16} /></button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-all" title="Download"><Download size={16} /></button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white border-b border-gray-400">
                                <th className="px-8 py-4 w-12">
                                    <div 
                                        onClick={() => handleSelectAll(!students.every(s => s.selected))}
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${students.every(s => s.selected) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-400 hover:border-indigo-400'}`}
                                    >
                                        {students.every(s => s.selected) && <Check size={12} className="text-white" />}
                                    </div>
                                </th>
                                <th className="px-4 py-4 text-sm font-bold text-gray-700">Admission No</th>
                                <th className="px-4 py-4 text-sm font-bold text-gray-700">Student Name</th>
                                <th className="px-4 py-4 text-sm font-bold text-gray-700">Father Name</th>
                                <th className="px-4 py-4 text-sm font-bold text-gray-700">Date Of Birth</th>
                                <th className="px-4 py-4 text-sm font-bold text-gray-700">Current Result</th>
                                <th className="px-4 py-4 text-sm font-bold text-gray-700 text-right pr-6">Next Session Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-bold">
                            {filteredStudents.slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((student) => (
                                <tr key={student.id} className={`hover:bg-gray-50/20 transition-all ${student.selected ? 'bg-gray-50/10' : ''}`}>
                                    <td className="px-8 py-4">
                                        <div 
                                            onClick={() => handleStudentSelect(student.id, !student.selected)}
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${student.selected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-400 hover:border-indigo-400'}`}
                                        >
                                            {student.selected && <Check size={12} className="text-white" />}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-bold text-gray-700">{student.admissionNo}</td>
                                    <td className="px-4 py-4 text-sm font-bold text-gray-800">{student.name}</td>
                                    <td className="px-4 py-4 text-sm font-bold text-gray-600">{student.fatherName || '---'}</td>
                                    <td className="px-4 py-4 text-sm font-bold text-gray-600">{student.dob}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <div 
                                                    onClick={() => handleResultChange(student.id, 'Pass')}
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${student.result === 'Pass' ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-gray-400 group-hover:border-indigo-400'}`}
                                                >
                                                    {student.result === 'Pass' && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                                                </div>
                                                <span className={`text-xs font-bold ${student.result === 'Pass' ? 'text-gray-700' : 'text-gray-500'}`}>Pass</span>
                                            </label>
                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <div 
                                                    onClick={() => handleResultChange(student.id, 'Fail')}
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${student.result === 'Fail' ? 'border-rose-600 ring-4 ring-rose-50' : 'border-gray-400 group-hover:border-rose-400'}`}
                                                >
                                                    {student.result === 'Fail' && <div className="w-2 h-2 rounded-full bg-rose-600" />}
                                                </div>
                                                <span className={`text-xs font-bold ${student.result === 'Fail' ? 'text-rose-600' : 'text-gray-500'}`}>Fail</span>
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <div 
                                                    onClick={() => handleStatusChange(student.id, 'Continue')}
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${student.status === 'Continue' ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-gray-400 group-hover:border-indigo-400'}`}
                                                >
                                                    {student.status === 'Continue' && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                                                </div>
                                                <span className={`text-xs font-bold ${student.status === 'Continue' ? 'text-gray-700' : 'text-gray-500'}`}>Continue</span>
                                            </label>
                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <div 
                                                    onClick={() => handleStatusChange(student.id, 'Leave')}
                                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${student.status === 'Leave' ? 'border-amber-600 ring-4 ring-amber-50' : 'border-gray-400 group-hover:border-amber-400'}`}
                                                >
                                                    {student.status === 'Leave' && <div className="w-2 h-2 rounded-full bg-amber-600" />}
                                                </div>
                                                <span className={`text-xs font-bold ${student.status === 'Leave' ? 'text-amber-600' : 'text-gray-500'}`}>Leave</span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Final Promotion Action */}
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-400 flex justify-end">
                    <button 
                        onClick={() => setShowConfirmModal(true)}
                        className="flex items-center space-x-2 px-10 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 group font-bold"
                    >
                        <span>Promote</span>
                        <TrendingUp size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
