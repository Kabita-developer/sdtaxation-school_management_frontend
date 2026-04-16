import { useState, useEffect, useRef } from 'react';
import {
    Plus,
    Search,
    LayoutGrid,
    Edit2,
    Trash2,
    Save,
    X,
    ChevronDown,
    Printer,
    Download,
    AlertTriangle,
    Loader2
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

export default function ClassGroupCreate() {
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();
    const [isAddingGroup, setIsAddingGroup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const rowsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (rowsRef.current && !rowsRef.current.contains(event.target as Node)) setIsRowsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const subjectOptions = [
        'English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 
        'French', 'Drawing', 'Computer', 'Elective 1', 'Elective 2', 'Elective 3'
    ];

    const classOptions = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsAddingGroup(false);
                setIsEditing(false);
            }
        }
        if (isAddingGroup || isEditing) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isAddingGroup, isEditing]);

    const toggleSubject = (subject: string) => {
        setSelectedSubjects(prev =>
            prev.includes(subject)
                ? prev.filter(s => s !== subject)
                : [...prev, subject]
        );
    };

    const groups = [
        { 
            id: 1, 
            name: 'Class 4 Subject', 
            classes: ['Class 4(A)', 'Class 4(B)', 'Class 4(C)', 'Class 4(D)'],
            subjects: ['English', 'Hindi', 'Mathematics', 'Science']
        },
        { 
            id: 2, 
            name: 'Class 3 Subject', 
            classes: ['Class 3(A)', 'Class 3(B)', 'Class 3(C)', 'Class 3(D)'],
            subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies']
        },
        { 
            id: 3, 
            name: 'Class 2 Subject', 
            classes: ['Class 2(A)', 'Class 2(B)', 'Class 2(C)', 'Class 2(D)'],
            subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'French']
        },
        { 
            id: 4, 
            name: 'Class 1 subject', 
            classes: ['Class 1(A)', 'Class 1(B)', 'Class 1(C)', 'Class 1(D)'],
            subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies']
        },
    ];

    const [formData, setFormData] = useState({
        groupName: '',
        description: '',
        class: '',
        sections: ''
    });

    const handleSave = () => {
        if (!formData.groupName || !formData.class || !formData.sections || selectedSubjects.length === 0) {
            showError('Missing Information', 'Please fill in all required fields marked with *');
            return;
        }

        // Simulate successful save
        showSuccess(
            isEditing ? 'Update Successful' : 'Success!', 
            isEditing ? 'Subject Group updated successfully!' : 'Subject Group added successfully!'
        );
        
        setIsAddingGroup(false);
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (!groupToDelete) return;
        
        setDeleteLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccess('Deleted!', 'Subject Group has been deleted successfully.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setGroupToDelete(null);
    };

    return (
        <>
            <style>
                {`
                    @media print {
                        @page {
                            margin: 15mm;
                            size: portrait;
                        }
                        /* Disable all animations/transitions that might break print capture */
                        * {
                            animation: none !important;
                            transition: none !important;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        body {
                            margin: 0 !important;
                            visibility: hidden !important;
                            background: white !important;
                        }
                        #print-section {
                            visibility: visible !important;
                            position: absolute !important;
                            left: 0 !important;
                            top: 0 !important;
                            width: 100% !important;
                        }
                        #print-section, #print-section * {
                            visibility: visible !important;
                            color: black !important;
                        }
                        #print-section > div {
                            border: none !important;
                            box-shadow: none !important;
                        }
                        .print-hide {
                            display: none !important;
                        }
                    }
                `}
            </style>
            {/* Modal Overlay */}
            {(isAddingGroup || isEditing) && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div 
                        ref={modalRef}
                        className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]"
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-medium text-gray-800">
                                {isEditing ? 'Edit Subject Group' : 'Add Subject Group'}
                            </h2>
                            <button 
                                onClick={() => { setIsAddingGroup(false); setIsEditing(false); }}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {/* Name Field */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">
                                    Name <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-2.5 border-2 border-gray-400 rounded-xl text-sm font-medium outline-none transition-all focus:border-indigo-400`}
                                    value={formData.groupName}
                                    onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                                />
                            </div>

                            {/* Class Field */}
                            <div className="space-y-1.5 relative">
                                <label className="text-sm font-medium text-gray-700">
                                    Class <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-2.5 bg-white border-2 border-gray-400 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-indigo-400 transition-all appearance-none pr-10"
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Sections Field */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">
                                    Sections <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. A, B, C"
                                    className="w-full px-4 py-2.5 border-2 border-gray-400 rounded-xl text-sm font-medium outline-none focus:border-indigo-400 transition-all"
                                    value={formData.sections}
                                    onChange={(e) => setFormData({ ...formData, sections: e.target.value })}
                                />
                            </div>

                             {/* Subjects Checkbox List */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">
                                    Subject <span className="text-rose-500">*</span>
                                </label>
                                <div className="space-y-2.5 pl-1">
                                    {subjectOptions.map((subject) => (
                                        <label key={subject} className="flex items-center space-x-3 group cursor-pointer">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className={`w-4 h-4 rounded border-2 transition-all appearance-none cursor-pointer ${
                                                        selectedSubjects.includes(subject)
                                                            ? `bg-${theme.colors.primary} border-${theme.colors.primary}`
                                                            : 'border-gray-400 group-hover:border-gray-500'
                                                    }`}
                                                    checked={selectedSubjects.includes(subject)}
                                                    onChange={() => toggleSubject(subject)}
                                                />
                                                {selectedSubjects.includes(subject) && (
                                                    <Plus size={10} className="absolute inset-0 m-auto text-white rotate-45" />
                                                )}
                                            </div>
                                            <span className={`text-[13px] font-medium transition-colors ${
                                                selectedSubjects.includes(subject) ? 'text-gray-900 font-semibold' : 'text-gray-600'
                                            }`}>
                                                {subject}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Description Field */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-xl text-sm font-medium outline-none focus:border-indigo-400 transition-all min-h-[100px] resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className={`px-8 py-2.5 bg-${theme.colors.primary} text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    onClick={() => setIsDeleting(false)}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                            <div className="flex items-center justify-between font-black">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <AlertTriangle className="text-white" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Delete Group</h3>
                                </div>
                                <button 
                                    onClick={() => setIsDeleting(false)}
                                    className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                        <AlertTriangle className="text-red-600" size={24} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight">
                                        Are you sure you want to delete this subject group?
                                    </h4>
                                    {groupToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5">
                                                <span className="font-bold text-gray-800 text-[10px] block opacity-50">Group Name</span> 
                                                <span className="text-gray-900">{groupToDelete.name}</span>
                                            </p>
                                        </div>
                                    )}
                                    <p className="text-xs font-semibold text-gray-500 leading-relaxed opacity-70">
                                        This action cannot be undone. All associated data will be removed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleting(false)}
                                className="px-6 py-2 text-sm font-black text-gray-700 bg-white border border-gray-400 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
                                disabled={deleteLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 text-sm font-black text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md items-center space-x-2 flex"
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertTriangle size={16} />
                                        <span>Delete</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="animate-in slide-in-from-top-4 duration-500 space-y-4 pt-2 text-left relative">
                {/* Header & Add Trigger */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-${theme.colors.primaryLight} text-${theme.colors.primary} rounded-lg`}>
                        <LayoutGrid size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">Class Group Registry</h2>
                </div>
                <button 
                    onClick={() => {
                        setIsAddingGroup(!isAddingGroup);
                        setIsEditing(false);
                    }}
                    className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${
                        isAddingGroup 
                        ? 'bg-rose-50 border-rose-200 text-rose-600' 
                        : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-${theme.colors.primary} border-${theme.colors.primary} text-white hover:bg-${theme.colors.primaryDark}`)
                    }`}
                >
                    {isAddingGroup ? <X size={18} /> : <Plus size={18} />}
                    <span className="text-xs font-bold">{isAddingGroup ? 'Cancel' : 'Add New Group'}</span>
                </button>
            </div>


            <div id="print-section">
                {/* Table Section - Always Shown as the 'List' */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">
                    <div className={`px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50`}>
                        <h2 className="text-sm font-black text-indigo-900 tracking-wider">Subject Group List</h2>
                        <div className="flex items-center space-x-3 print-hide">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={14} />
                                <input
                                    type="text"
                                    placeholder="Quick search..."
                                    className={`pl-9 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-64 shadow-sm`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative" ref={rowsRef}>
                                <div 
                                    onClick={() => setIsRowsOpen(!isRowsOpen)}
                                    className="flex items-center space-x-2 bg-white border border-gray-400 rounded-xl px-3 py-2.5 shadow-sm cursor-pointer hover:bg-gray-50 transition-all font-bold text-gray-700"
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
                            <button 
                                onClick={() => window.print()}
                                title="Print" 
                                className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"
                            >
                                <Printer size={16} />
                            </button>
                            <button title="Export" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                <Download size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-gray-50/30">
                                    <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Name</th>
                                    <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Class (Section)</th>
                                    <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Subject</th>
                                    <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 text-right pr-12 print-hide">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-bold">
                                {groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((group) => (
                                    <tr key={group.id} className={`hover:bg-${theme.colors.primaryLight}/20 transition-all group`}>
                                        <td className="px-8 py-6 border-b-2 border-gray-200 align-middle">
                                            <span className="text-sm font-medium text-gray-600">{group.name}</span>
                                        </td>
                                        <td className="px-8 py-6 border-b-2 border-gray-200 align-top">
                                            <div className="flex flex-col space-y-1 mt-1">
                                                {group.classes.map((c, i) => (
                                                    <span key={i} className="text-sm font-medium text-gray-600">{`${i + 1}. ${c}`}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 border-b-2 border-gray-200 align-top">
                                            <div className="flex flex-col space-y-1 mt-1">
                                                {group.subjects.map((s, i) => (
                                                    <span key={i} className="text-sm font-medium text-gray-600">{s}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right pr-12 border-b-2 border-gray-200 align-middle print-hide">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button 
                                                    title="Edit"
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setIsAddingGroup(false);
                                                    }}
                                                    className={`p-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all shadow-sm`}
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    title="Delete"
                                                    onClick={() => {
                                                        setGroupToDelete(group);
                                                        setIsDeleting(true);
                                                    }}
                                                    className={`p-2 text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-all shadow-sm`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
