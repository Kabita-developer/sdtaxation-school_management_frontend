import { useState, useEffect, useRef } from 'react';
import {
    Plus,
    Search,
    LayoutGrid,
    Edit,
    Trash2,
    Save,
    X,
    ChevronDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ClassGroupCreate() {
    const { theme, themeName } = useTheme();
    const [isAddingGroup, setIsAddingGroup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className="animate-in slide-in-from-top-4 duration-500 space-y-4 pt-2 text-left relative">
            
            {/* Modal Overlay */}
            {(isAddingGroup || isEditing) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
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
                                    className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm font-medium outline-none transition-all ${
                                        formData.groupName ? `border-${theme.colors.primary}` : 'border-gray-200 focus:border-indigo-400'
                                    }`}
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
                                        className="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-sm font-medium text-gray-700 outline-none focus:border-indigo-400 transition-all appearance-none pr-10"
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
                                    className="w-full px-4 py-2.5 border-2 border-gray-100 rounded-xl text-sm font-medium outline-none focus:border-indigo-400 transition-all"
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
                                                            : 'border-gray-300 group-hover:border-gray-400'
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
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm font-medium outline-none focus:border-indigo-400 transition-all min-h-[100px] resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button 
                                onClick={() => { setIsAddingGroup(false); setIsEditing(false); }}
                                className={`px-8 py-2.5 bg-${theme.colors.primary} text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

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


            {/* Table Section - Always Shown as the 'List' */}
            <div className="bg-white rounded-2xl shadow-sm border border-black overflow-hidden">
                <div className={`px-8 py-3 border-b border-black flex flex-wrap items-center justify-between gap-4 bg-indigo-50/50`}>
                    <h2 className="text-sm font-black text-indigo-900 uppercase tracking-wider">Subject Group List</h2>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={14} />
                            <input
                                type="text"
                                placeholder="Quick search..."
                                className={`pl-9 pr-4 py-2.5 bg-white border-2 border-gray-300 rounded-xl text-xs font-bold text-gray-800 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all w-64 shadow-sm`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-gray-50/30">
                                <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Name</th>
                                <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Class (Section)</th>
                                <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100">Subject</th>
                                <th className="px-8 py-4 text-sm font-bold text-gray-900 border-b border-gray-200 border-t border-gray-100 text-right pr-12">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).map((group) => (
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
                                    <td className="px-8 py-6 text-right pr-12 border-b-2 border-gray-200 align-middle">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button 
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setIsAddingGroup(false);
                                                }}
                                                className={`p-2 text-white bg-${theme.colors.primary} hover:bg-${theme.colors.primaryDark} rounded-lg transition-all shadow-sm`}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button className={`p-2 text-white bg-${theme.colors.primary} hover:bg-${theme.colors.primaryDark} rounded-lg transition-all shadow-sm`}>
                                                <X size={16} />
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
    );
}
