import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
    FolderTree,
    BookOpen,
    FileText,
    Target,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    ChevronRight,
    Save,
    X
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AccountMaster = () => {
    const { theme, themeName } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Sync activeSection with URL
    useEffect(() => {
        if (location.pathname.endsWith('/groups')) {
            setActiveSection('groups');
        } else if (location.pathname.endsWith('/ledgers')) {
            setActiveSection('ledgers');
        } else if (location.pathname.endsWith('/vouchers')) {
            setActiveSection('vouchers');
        } else if (location.pathname.endsWith('/cost-centres')) {
            setActiveSection('cost-centres');
        } else {
            setActiveSection(null);
        }
    }, [location.pathname]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingGroup, setIsAddingGroup] = useState(false);

    const [groups] = useState([
        { id: 'GRP-001', name: 'Fixed Assets', parent: 'Primary', type: 'Asset', status: 'Active' },
        { id: 'GRP-002', name: 'Current Liabilities', parent: 'Primary', type: 'Liability', status: 'Active' },
        { id: 'GRP-003', name: 'Direct Expenses', parent: 'Primary', type: 'Expense', status: 'Active' },
        { id: 'GRP-004', name: 'Indirect Incomes', parent: 'Primary', type: 'Income', status: 'Active' },
        { id: 'GRP-005', name: 'Bank Accounts', parent: 'Current Assets', type: 'Asset', status: 'Active' },
    ]);

    const accountActions = [
        { 
            label: 'Groups', 
            icon: FolderTree, 
            onClick: () => navigate(activeSection === 'groups' ? '/master/account_create' : '/master/account_create/groups'), 
            color: `text-${theme.colors.primary}`, 
            bg: `bg-${theme.colors.primaryLight}`,
            isActive: activeSection === 'groups'
        },
        { 
            label: 'Ledgers', 
            icon: BookOpen, 
            onClick: () => navigate(activeSection === 'ledgers' ? '/master/account_create' : '/master/account_create/ledgers'),
            color: 'text-purple-600', 
            bg: 'bg-purple-50',
            isActive: activeSection === 'ledgers'
        },
        { 
            label: 'Voucher', 
            icon: FileText, 
            onClick: () => navigate(activeSection === 'vouchers' ? '/master/account_create' : '/master/account_create/vouchers'),
            color: 'text-rose-600', 
            bg: 'bg-rose-50',
            isActive: activeSection === 'vouchers'
        },
        { 
            label: 'Cost Centres', 
            icon: Target, 
            onClick: () => navigate(activeSection === 'cost-centres' ? '/master/account_create' : '/master/account_create/cost-centres'),
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50',
            isActive: activeSection === 'cost-centres'
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 text-left">
            {/* Simple Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Account Master</h1>
                <p className="text-sm text-gray-500 mt-1">Configure your primary financial architecture through groups, ledgers, and voucher protocols.</p>
            </div>

            {/* Compact Action Shortcuts Grid */}
            <div className="flex flex-wrap items-center gap-3">
                {accountActions.map((action) => (
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

            {/* In-page Groups UI Section */}
            {activeSection === 'groups' && (
                <div className="animate-in slide-in-from-top-4 duration-500 space-y-4 pt-4">
                    
                    {/* Groups Header & Add Trigger */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 bg-${theme.colors.primaryLight} text-${theme.colors.primary} rounded-lg`}>
                                <FolderTree size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Account Groups Registry</h2>
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

                    {/* Conditional Form - Shown only when adding/editing */}
                    {(isAddingGroup || isEditing) && (
                        <div className="animate-in fade-in zoom-in-95 duration-300">
                            <div className={`bg-white rounded-2xl shadow-sm border border-${theme.colors.primaryLight} overflow-hidden`}>
                                <div className={`bg-${theme.colors.primaryLight}/50 px-6 py-3 border-b border-${theme.colors.primaryLight} flex items-center justify-between`}>
                                    <div className={`flex items-center space-x-2 text-${theme.colors.primary} font-bold text-sm`}>
                                        <Plus size={16} />
                                        <span>{isEditing ? 'Update Group Details' : 'Initialize New Account Group'}</span>
                                    </div>
                                    <button onClick={() => { setIsAddingGroup(false); setIsEditing(false); }} className="text-gray-400 hover:text-gray-600">
                                        <X size={16} />
                                    </button>
                                </div>
                                <form className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-semibold text-gray-500 ml-1">Group Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Current Assets"
                                            className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary} focus:bg-white transition-all underline-none`}
                                        />
                                    </div>

                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-semibold text-gray-500 ml-1">Parent Category</label>
                                        <select className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary} appearance-none`}>
                                            <option>Primary Group</option>
                                            <option>Current Assets</option>
                                            <option>Fixed Assets</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5 text-left">
                                        <label className="text-xs font-semibold text-gray-500 ml-1">Classification Type</label>
                                        <div className="flex items-center space-x-2">
                                            {['Asset', 'Liability', 'Income', 'Expense'].map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all border ${
                                                        type === 'Asset' 
                                                        ? (themeName === 'white' ? 'bg-white border-black text-black' : `bg-${theme.colors.primary} text-white border-${theme.colors.primary}`) 
                                                        : `bg-white text-gray-400 border-gray-200 hover:border-${theme.colors.primaryLight}`
                                                    }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:col-span-3 flex justify-end space-x-3 pt-2">
                                        <button className={`px-8 py-2 ${themeName === 'white' ? 'bg-white text-black border border-gray-400 hover:border-black' : `bg-${theme.colors.primary} text-white`} rounded-xl text-sm font-bold transition-all shadow-sm flex items-center space-x-2`}>
                                            <Save size={16} />
                                            <span>{isEditing ? 'Update Configuration' : 'Confirm & Save Group'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Table Section - Always Shown as the 'List' */}
                    <div className="bg-white rounded-2xl shadow-sm border border-black overflow-hidden">
                        <div className="px-8 py-4 border-b border-black flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Active Groups List</h2>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Quick search..."
                                        className={`pl-9 pr-4 py-1.5 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none focus:bg-white focus:border-${theme.colors.primary} transition-all w-56 shadow-sm`}
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
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Reference ID</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Group Name</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Parent Hierarchy</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Taxonomy Type</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200 text-right pr-12">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {groups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).map((group) => (
                                        <tr key={group.id} className="hover:bg-indigo-50/10 transition-all group">
                                            <td className="px-8 py-4 border-b border-gray-50">
                                                <span className={`text-sm font-medium text-${theme.colors.primary}`}>{group.id}</span>
                                            </td>
                                            <td className="px-8 py-4 border-b border-gray-50">
                                                <span className="text-sm font-medium text-gray-900">{group.name}</span>
                                            </td>
                                            <td className="px-8 py-4 border-b border-gray-50">
                                                <div className="flex items-center space-x-1 text-sm font-medium text-gray-500">
                                                    <span>{group.parent}</span>
                                                    <ChevronRight size={14} className="text-gray-300" />
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 border-b border-gray-50">
                                                <span className={`px-3 py-1 rounded-lg text-[11px] font-semibold ${
                                                    group.type === 'Asset' ? 'bg-indigo-50 text-indigo-600' :
                                                    group.type === 'Liability' ? 'bg-amber-50 text-amber-600' :
                                                    group.type === 'Expense' ? 'bg-rose-50 text-rose-600' :
                                                    'bg-emerald-50 text-emerald-600'
                                                }`}>
                                                    {group.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-right pr-12 border-b border-gray-50">
                                                <div className="flex items-center justify-end space-x-1">
                                                    <button 
                                                        onClick={() => {
                                                            setIsEditing(true);
                                                            setIsAddingGroup(false);
                                                        }}
                                                        className={`p-2 text-gray-400 hover:text-${theme.colors.primary} hover:bg-${theme.colors.primaryLight} rounded-lg transition-all`}
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
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
            )}

            {/* In-page Ledgers UI Section */}
            {activeSection === 'ledgers' && (
                <div className="animate-in slide-in-from-top-4 duration-500 space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 bg-purple-50 text-purple-600 rounded-lg`}>
                                <BookOpen size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Account Ledgers Registry</h2>
                        </div>
                        <button 
                            onClick={() => setIsAddingGroup(!isAddingGroup)}
                            className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${
                                isAddingGroup 
                                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                                : (themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : `bg-purple-600 border-purple-600 text-white hover:bg-purple-700`)
                            }`}
                        >
                            {isAddingGroup ? <X size={18} /> : <Plus size={18} />}
                            <span className="text-xs font-bold">{isAddingGroup ? 'Cancel' : 'Add New Ledger'}</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-black overflow-hidden">
                        <div className="px-8 py-4 border-b border-black flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Active Ledgers List</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50/30">
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Ledger Name</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Under Group</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Opening Balance</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200 text-right pr-12">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { id: 1, name: 'HDFC Bank Account', group: 'Bank Accounts', balance: '₹ 45,00,000.00 Dr' },
                                        { id: 2, name: 'Cash in Hand', group: 'Cash-in-hand', balance: '₹ 1,20,500.00 Dr' },
                                    ].map((ledger) => (
                                        <tr key={ledger.id} className="hover:bg-purple-50/10 transition-all group font-medium">
                                            <td className="px-8 py-4 border-b border-gray-50 text-sm">{ledger.name}</td>
                                            <td className="px-8 py-4 border-b border-gray-50 text-sm text-gray-600">{ledger.group}</td>
                                            <td className="px-8 py-4 border-b border-gray-50 text-sm text-gray-900">{ledger.balance}</td>
                                            <td className="px-8 py-4 text-right pr-12 border-b border-gray-50">
                                                <div className="flex items-center justify-end space-x-1">
                                                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"><Edit size={16} /></button>
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* In-page Voucher UI Section */}
            {activeSection === 'vouchers' && (
                <div className="animate-in slide-in-from-top-4 duration-500 space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 bg-rose-50 text-rose-600 rounded-lg`}>
                                <FileText size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Voucher Types Registry</h2>
                        </div>
                        <button className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'}`}>
                            <Plus size={18} />
                            <span className="text-xs font-bold">Add Voucher Type</span>
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-black overflow-hidden">
                        <div className="px-8 py-4 border-b border-black flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Active Vouchers List</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50/30">
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Voucher Name</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Voucher Type</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Numbering</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200 text-right pr-12">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { id: 1, name: 'Sales Invoice', type: 'Sales', method: 'Automatic' },
                                        { id: 2, name: 'Purchase Voucher', type: 'Purchase', method: 'Manual' },
                                    ].map((v) => (
                                        <tr key={v.id} className="hover:bg-rose-50/10 transition-all group font-medium">
                                            <td className="px-8 py-4 border-b border-gray-50 text-sm">{v.name}</td>
                                            <td className="px-8 py-4 border-b border-gray-50 text-sm text-gray-600">{v.type}</td>
                                            <td className="px-8 py-4 border-b border-gray-50 text-sm text-gray-900">{v.method}</td>
                                            <td className="px-8 py-4 text-right pr-12 border-b border-gray-50">
                                                <div className="flex items-center justify-end space-x-1">
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Edit size={16} /></button>
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* In-page Cost Centres UI Section */}
            {activeSection === 'cost-centres' && (
                <div className="animate-in slide-in-from-top-4 duration-500 space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 bg-emerald-50 text-emerald-600 rounded-lg`}>
                                <Target size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Cost Centres Registry</h2>
                        </div>
                        <button className={`p-2.5 rounded-xl border transition-all flex items-center space-x-2 shadow-sm ${themeName === 'white' ? 'bg-white border-gray-400 text-black hover:border-black' : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'}`}>
                            <Plus size={18} />
                            <span className="text-xs font-bold">Add Cost Centre</span>
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-black overflow-hidden">
                        <div className="px-8 py-4 border-b border-black flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Active Cost Centres List</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-0">
                                <thead>
                                    <tr className="bg-gray-50/30">
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Centre Name</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">Category</th>
                                        <th className="px-8 py-4 text-sm font-medium text-gray-900 border-b border-gray-200 text-right pr-12">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { id: 1, name: 'Marketing Dept', cat: 'Departments' },
                                        { id: 2, name: 'Sales Betul', cat: 'Regions' },
                                    ].map((c) => (
                                        <tr key={c.id} className="hover:bg-emerald-50/10 transition-all group font-medium">
                                            <td className="px-8 py-4 border-b border-gray-50 text-sm">{c.name}</td>
                                            <td className="px-8 py-4 border-b border-gray-50 text-sm text-gray-600">{c.cat}</td>
                                            <td className="px-8 py-4 text-right pr-12 border-b border-gray-50">
                                                <div className="flex items-center justify-end space-x-1">
                                                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Edit size={16} /></button>
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountMaster;
