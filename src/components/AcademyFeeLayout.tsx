import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Layers,
    LayoutGrid,
    SplitSquareVertical,
    BookMarked,
    GraduationCap,
    List,
    UserCheck,
} from 'lucide-react';

const AcademyFeeLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const hideShortcuts = 
        location.pathname.includes('/admission-create') || 
        location.pathname.includes('/student-list') ||
        location.pathname.includes('/disabled-students');

    const academyActions = [
        { label: 'Class Group Create', icon: LayoutGrid, onClick: () => navigate('/fees-management/academy/class_group'), color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Class Name Create', icon: Layers, onClick: () => navigate('/fees-management/academy/class-create'), color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Section Create', icon: SplitSquareVertical, onClick: () => navigate('/fees-management/academy/section-create'), color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Subject Create', icon: BookMarked, onClick: () => navigate('/fees-management/academy/subject-create'), color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Student Admission Create', icon: GraduationCap, onClick: () => navigate('/fees-management/academy/admission-create'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Student List (Class-wise & Section-wise)', icon: List, onClick: () => navigate('/fees-management/academy/student-list'), color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Assign Class Teacher', icon: UserCheck, onClick: () => navigate('/fees-management/academy/assign-teacher'), color: 'text-cyan-600', bg: 'bg-cyan-50' },
    ];

    return (
        <div className="space-y-6">
            {/* Academy Action Buttons - Persistent */}
            {!hideShortcuts && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {academyActions.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col items-center text-center group"
                    >
                        <div className={`p-2 rounded-lg ${action.bg} ${action.color} mb-2 group-hover:scale-110 transition-transform`}>
                            <action.icon size={18} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 leading-tight">{action.label}</span>
                    </button>
                ))}
            </div>
            )}

            {/* Content Area */}
            <Outlet />
        </div>
    );
};

export default AcademyFeeLayout;
