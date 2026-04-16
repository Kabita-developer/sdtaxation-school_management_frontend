import { useState, useRef, useEffect } from 'react';
import {
    Plus,
    Search,
    UserCheck,
    Edit2,
    Trash2,
    ChevronDown,
    Download,
    Printer,
    FileText,
    Copy,
    X,
    Filter,
    Layers,
    AlertTriangle,
    Loader2,
    Check
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';

export default function AssignTeacher() {
    const { theme, themeName } = useTheme();
    const { showSuccess, showError } = useNotification();
    
    const [formData, setFormData] = useState({
        class: '',
        section: '',
        teacher: '',
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState<number | string>(50);
    const [isAddingAssignment, setIsAddingAssignment] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Dropdown States
    const [isRowsOpen, setIsRowsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        teacher: true,
        class: true,
        section: true,
        action: true
    });

    const rowsRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (rowsRef.current && !rowsRef.current.contains(event.target as Node)) setIsRowsOpen(false);
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) setIsFilterOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const assignments = [
        { id: 'ASN001', class: 'Grade 10', section: 'A', teacher: 'Mrs. Sanchita Roy', experience: '12 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN002', class: 'Grade 10', section: 'B', teacher: 'Mr. Pradeep Kumar', experience: '8 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN003', class: 'Grade 12', section: 'C', teacher: 'Ms. Anjali Sharma', experience: '15 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN004', class: 'Grade 9', section: 'A', teacher: 'Mr. Vikram Singh', experience: '5 Yrs', status: 'On-Hold', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' },
        { id: 'ASN005', class: 'Grade 11', section: 'B', teacher: 'Mrs. Pooja Das', experience: '10 Yrs', status: 'Active', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100' },
    ];

    const handleSave = () => {
        if (!formData.class || !formData.section || !formData.teacher) {
            showError('Missing Fields', 'Please select class, section and teacher.');
            return;
        }
        
        showSuccess(
            isEditing ? 'Update Successful' : 'Saved!', 
            isEditing ? 'Assignment has been updated successfully.' : 'Teacher has been assigned as mentor successfully.'
        );
        setIsAddingAssignment(false);
        setIsEditing(false);
        setFormData({ class: '', section: '', teacher: '' });
    };

    const handleDelete = async () => {
        if (!assignmentToDelete) return;
        
        setDeleteLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccess('Deleted!', 'Assignment has been removed successfully.');
        setDeleteLoading(false);
        setIsDeleting(false);
        setAssignmentToDelete(null);
    };

    const handleEdit = (a: any) => {
        setFormData({
            class: a.class,
            section: a.section,
            teacher: a.teacher
        });
        setIsEditing(true);
        setIsAddingAssignment(false);
    };

    return (
        <>
            {/* Add/Edit Assignment Modal */}
            {(isAddingAssignment || isEditing) && (
                <div 
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-y-auto"
                    onClick={() => { 
                        setIsAddingAssignment(false); 
                        setIsEditing(false); 
                        setFormData({ class: '', section: '', teacher: '' });
                    }}
                >
                    <div 
                        className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50`}>
                            <h3 className="text-lg font-bold text-indigo-900 tracking-tight">
                                {isEditing ? 'Edit Assignment' : 'Assign New Mentor'}
                            </h3>
                            <button 
                                onClick={() => { 
                                    setIsAddingAssignment(false); 
                                    setIsEditing(false); 
                                    setFormData({ class: '', section: '', teacher: '' });
                                }}
                                className="text-gray-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Class Selection */}
                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Target Class <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 transition-all shadow-sm"
                                    value={formData.class}
                                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                >
                                    <option value="">Select Class</option>
                                    <option>Grade 9</option>
                                    <option>Grade 10</option>
                                    <option>Grade 11</option>
                                    <option>Grade 12</option>
                                </select>
                            </div>

                            {/* Section Selection */}
                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Assigned Section <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 transition-all shadow-sm"
                                    value={formData.section}
                                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                >
                                    <option value="">Select Section</option>
                                    <option>Section A</option>
                                    <option>Section B</option>
                                    <option>Section C</option>
                                </select>
                            </div>

                            {/* Teacher Selection */}
                            <div className="space-y-1.5 font-bold">
                                <label className="text-sm font-medium text-gray-700">
                                    Lead Faculty <span className="text-rose-500">*</span>
                                </label>
                                <select 
                                    className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-indigo-500 transition-all shadow-sm"
                                    value={formData.teacher}
                                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                                >
                                    <option value="">Select Teacher</option>
                                    <option>Mrs. Sanchita Roy</option>
                                    <option>Mr. Pradeep Kumar</option>
                                    <option>Ms. Anjali Sharma</option>
                                </select>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={handleSave}
                                className={`px-8 py-2.5 bg-${theme.colors.primary} text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all tracking-tight`}
                            >
                                {isEditing ? 'Update Assignment' : 'Assign Teacher'}
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
                                    <h3 className="text-xl font-bold text-white">Remove Assignment</h3>
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
                                        Are you sure you want to remove this teacher assignment?
                                    </h4>
                                    {assignmentToDelete && (
                                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-400 font-bold">
                                            <p className="text-sm text-gray-600 mb-0.5">
                                                <span className="font-bold text-gray-800 text-[10px] block opacity-50">Mentor</span> 
                                                <span className="text-gray-900">{assignmentToDelete.teacher} for {assignmentToDelete.class}({assignmentToDelete.section})</span>
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
                                        <span>Removing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={16} />
                                        <span>Remove</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-4 pt-2 text-left relative">
                {/* Header & Title */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-${theme.colors.primaryLight} text-${theme.colors.primary} rounded-lg`}>
                            <UserCheck size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Teacher Assignments Registry</h2>
                    </div>
                    <button 
                        onClick={() => {
                            setIsAddingAssignment(!isAddingAssignment);
                            setIsEditing(false);
                            setFormData({ class: '', section: '', teacher: '' });
                        }}
                        className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${
                            isAddingAssignment 
                            ? 'bg-rose-50 border-rose-200 text-rose-600' 
                            : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-${theme.colors.primary} border-${theme.colors.primary} text-white hover:bg-${theme.colors.primaryDark}`)
                        }`}
                        title={isAddingAssignment ? 'Cancel Operation' : 'Assign New Teacher'}
                    >
                        {isAddingAssignment ? <X size={18} /> : <Plus size={18} />}
                        <span className="text-xs font-bold">{isAddingAssignment ? 'Cancel' : 'Assign Teacher'}</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
                    <div className="lg:col-span-12">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">
                            <div className={`px-8 py-3 border-b border-gray-400 flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50`}>
                                <h2 className="text-sm font-black text-indigo-900 tracking-wider">Class teacher list</h2>
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={14} />
                                        <input
                                            type="text"
                                            placeholder="Quick search..."
                                            className={`pl-9 pr-4 py-2.5 bg-white border border-gray-400 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-48 shadow-sm`}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Workable Rows Per Page */}
                                    <div className="relative" ref={rowsRef}>
                                        <div 
                                            onClick={() => setIsRowsOpen(!isRowsOpen)}
                                            className="flex items-center space-x-2 bg-white border border-gray-400 rounded-xl px-3 py-2.5 shadow-sm cursor-pointer hover:bg-gray-50 transition-all" 
                                            title="Rows Per Page"
                                        >
                                            <span className="text-xs font-bold text-gray-700">{rowsPerPage}</span>
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

                                    <div className="flex items-center space-x-1">
                                        <button title="Copy to Clipboard" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                            <Copy size={14} />
                                        </button>
                                        <button title="Export to Excel" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-emerald-600 hover:border-emerald-400 transition-all shadow-sm">
                                            <FileText size={14} />
                                        </button>
                                        <button title="Export to CSV" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                            <FileText size={14} className="text-blue-500" />
                                        </button>
                                        <button title="Download PDF" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-rose-600 hover:border-rose-400 transition-all shadow-sm">
                                            <Download size={14} />
                                        </button>
                                        <button title="Print List" className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm">
                                            <Printer size={14} />
                                        </button>
                                        
                                        <div className="relative" ref={filterRef}>
                                            <button 
                                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                                title="Filter Columns" 
                                                className="p-2.5 bg-white border border-gray-400 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"
                                            >
                                                <Filter size={14} />
                                            </button>
                                            {isFilterOpen && (
                                                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-400 rounded-xl shadow-xl z-50 py-3 px-4 animate-in fade-in zoom-in-95 duration-200">
                                                    <h4 className="text-xs font-bold text-gray-500 mb-3">Visible Columns</h4>
                                                    <div className="space-y-2">
                                                        {Object.entries(visibleColumns).map(([key, value]) => (
                                                            <div 
                                                                key={key}
                                                                onClick={() => setVisibleColumns(prev => ({ ...prev, [key]: !value }))}
                                                                className="flex items-center justify-between cursor-pointer group"
                                                            >
                                                                <span className="text-xs font-bold text-black capitalize">{key}</span>
                                                                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${value ? 'bg-indigo-600' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                                                                    {value && <Check size={12} className="text-white" />}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            {visibleColumns.teacher && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Class Teacher</th>}
                                            {visibleColumns.class && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Class</th>}
                                            {visibleColumns.section && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Section</th>}
                                            {visibleColumns.action && <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 text-right pr-12">Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-bold">
                                        {assignments.filter(a => a.teacher.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, rowsPerPage === 'All' ? undefined : Number(rowsPerPage)).map((a) => (
                                            <tr key={a.id} className="hover:bg-indigo-50/30 transition-all group">
                                                {visibleColumns.teacher && (
                                                    <td className="px-8 py-6 border-b-2 border-gray-200 align-middle">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-gray-800">{a.teacher}</span>
                                                            <span className="text-[10px] font-mono font-bold text-indigo-500 uppercase">{a.id}</span>
                                                        </div>
                                                    </td>
                                                )}
                                                {visibleColumns.class && (
                                                    <td className="px-8 py-6 border-b-2 border-gray-200 align-middle">
                                                        <span className="text-sm font-bold text-gray-700">{a.class}</span>
                                                    </td>
                                                )}
                                                {visibleColumns.section && (
                                                    <td className="px-8 py-6 border-b-2 border-gray-200 align-middle">
                                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black">{a.section}</span>
                                                    </td>
                                                )}
                                                {visibleColumns.action && (
                                                    <td className="px-8 py-6 border-b-2 border-gray-200 text-right pr-12 align-middle">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button 
                                                                title="Edit Assignment"
                                                                onClick={() => handleEdit(a)}
                                                                className={`p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all shadow-sm`}
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button 
                                                                title="Remove Assignment"
                                                                onClick={() => {
                                                                    setAssignmentToDelete(a);
                                                                    setIsDeleting(true);
                                                                }}
                                                                className={`p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all shadow-sm`}
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
