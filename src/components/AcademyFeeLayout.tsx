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
import { useTheme } from '../contexts/ThemeContext';

const AcademyFeeLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, themeName } = useTheme();
    
    // Determine active path for isActive state
    const isActive = (path: string) => location.pathname.includes(path);

    const hideShortcuts = 
        location.pathname.includes('/disabled-students');

    const academyActions = [
        { label: 'Subject Group Create', icon: LayoutGrid, onClick: () => navigate(isActive('/subject_group') ? '/master/academy' : '/master/academy/subject_group'), isActive: isActive('/subject_group'), color: `text-${theme.colors.primary}`, bg: `bg-${theme.colors.primaryLight}` },
        { label: 'Class Name Create', icon: Layers, onClick: () => navigate(isActive('/class-create') ? '/master/academy' : '/master/academy/class-create'), isActive: isActive('/class-create'), color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Section Create', icon: SplitSquareVertical, onClick: () => navigate(isActive('/section-create') ? '/master/academy' : '/master/academy/section-create'), isActive: isActive('/section-create'), color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Subject Create', icon: BookMarked, onClick: () => navigate(isActive('/subject-create') ? '/master/academy' : '/master/academy/subject-create'), isActive: isActive('/subject-create'), color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Assign Class Teacher', icon: UserCheck, onClick: () => navigate(isActive('/assign-teacher') ? '/master/academy' : '/master/academy/assign-teacher'), isActive: isActive('/assign-teacher'), color: 'text-cyan-600', bg: 'bg-cyan-50' },
        { label: 'Fees Group', icon: GraduationCap, onClick: () => navigate(isActive('/fees-group') ? '/master/academy' : '/master/academy/fees-group'), isActive: isActive('/fees-group'), color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Fees Type', icon: List, onClick: () => navigate(isActive('/fees-type') ? '/master/academy' : '/master/academy/fees-type'), isActive: isActive('/fees-type'), color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* Simple Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Academy Master</h1>
                <p className="text-sm text-gray-500 mt-1">Configure your primary academic architecture through classes, sections, and fee structures.</p>
            </div>

            {/* Academy Action Buttons - Persistent */}
            {!hideShortcuts && (
            <div className="flex flex-wrap items-center gap-3">
                {academyActions.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className={`px-4 py-2 rounded-xl border shadow-sm transition-all flex items-center space-x-3 group ${
                            action.isActive 
                            ? (themeName === 'white' ? 'bg-white border-gray-400 ring-2 ring-gray-100' : `bg-${theme.colors.primary} border-${theme.colors.primary} ring-2 ring-${theme.colors.primaryLight}`) 
                            : (themeName === 'white' ? 'bg-white border-gray-400 hover:shadow-md hover:border-gray-500' : `bg-white border-gray-400 hover:shadow-md hover:border-${theme.colors.primaryLight}`)
                        }`}
                    >
                        <div className={`p-2 rounded-lg ${action.isActive ? (themeName === 'white' ? 'bg-gray-100 text-black' : 'bg-white/20 text-white') : `${action.bg} ${action.color}`} group-hover:scale-110 transition-transform`}>
                            <action.icon size={18} />
                        </div>
                        <span className={`text-sm font-medium ${action.isActive ? (themeName === 'white' ? 'text-black' : 'text-white') : 'text-gray-700'}`}>{action.label}</span>
                    </button>
                ))}
            </div>
            )}

            {/* Content Area */}
            <div className="animate-in slide-in-from-top-4 duration-500 pt-4">
                <Outlet />
            </div>
        </div>
    );
};

export default AcademyFeeLayout;
