import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    FolderTree,
    BookOpen,
    FileText,
    Target
} from 'lucide-react';

const AccountLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide persistent shortcuts only on the Account Master dashboard to avoid duplication
    const hideShortcuts = location.pathname === '/master/account_create' || location.pathname === '/master/account_create/';

    const accountActions = [
        { label: 'Groups', icon: FolderTree, path: '/master/account_create/account-groups', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Ledgers', icon: BookOpen, path: '/master/account_create/account-ledgers', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Voucher', icon: FileText, path: '/master/account_create/account-vouchers', color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Cost Centres', icon: Target, path: '/master/account_create/account-cost-centres', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Persistent Shortcut Cards - Matches User's Compact Style */}
            {!hideShortcuts && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 transition-all">
                    {accountActions.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => navigate(action.path)}
                            className={`bg-white p-3 rounded-xl border shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex flex-col items-center text-center group ${
                                location.pathname.includes(action.path) ? 'border-indigo-600 shadow-lg' : 'border-gray-100'
                            }`}
                        >
                            <div className={`p-2 rounded-lg ${action.bg} ${action.color} mb-2 group-hover:scale-110 transition-transform`}>
                                <action.icon size={18} />
                            </div>
                            <span className={`text-[10px] font-bold leading-tight tracking-tight uppercase ${
                                location.pathname.includes(action.path) ? 'text-indigo-600' : 'text-gray-700'
                            }`}>{action.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Sub-page Content */}
            <Outlet />
        </div>
    );
};

export default AccountLayout;
