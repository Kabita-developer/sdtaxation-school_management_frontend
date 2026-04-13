import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
    Search, 
    ChevronDown, 
    Filter,
    FileSpreadsheet,
    Copy,
    FileText,
    Printer,
    Eye,
    XCircle,
    MoreVertical,
    DollarSign
} from 'lucide-react';

const SearchDueFees = () => {
    const { theme } = useTheme();
    const [isFeesGroupOpen, setIsFeesGroupOpen] = useState(false);
    const [selectedFeesGroups, setSelectedFeesGroups] = useState<string[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

    const feesGroups = [
        { id: 'apr-month-fees', label: 'April Month Fees' },
        { id: 'admission-fees', label: 'Admission Fees' },
        { id: 'may-month-fees', label: 'May Month Fees' },
        { id: 'june-month-fees', label: 'June Month Fees' },
        { id: 'transport-fees', label: 'Transport Fees' }
    ];

    const dummyData = [
        { class: 'Class 1-A', admNo: '003', name: 'Hariom Yadav', group: 'Class 1 General (Admission Fees : admission-fees)', amount: '2,500.00', paid: '0.00', discount: '0.00', fine: '0.00', balance: '2,500.00' },
        { class: 'Class 1-A', admNo: 'A003', name: 'Hariom Yadav', group: 'Class 1 General (Admission Fees : admission-fees)', amount: '2,500.00', paid: '0.00', discount: '0.00', fine: '0.00', balance: '2,500.00' },
        { class: 'Class 1-A', admNo: 'A004', name: 'Nisha', group: 'Class 1 General (Admission Fees : admission-fees)', amount: '2,500.00', paid: '0.00', discount: '0.00', fine: '0.00', balance: '2,500.00' },
        { class: 'Class 1-A', admNo: 'A41003', name: 'niya', group: 'Class 1 General (Admission Fees : admission-fees)', amount: '2,500.00', paid: '0.00', discount: '0.00', fine: '0.00', balance: '2,500.00' },
        { class: 'Class 1-A', admNo: '002', name: 'Sneha Patel', group: 'Class 1 General (Admission Fees : admission-fees)', amount: '2,500.00', paid: '0.00', discount: '0.00', fine: '0.00', balance: '2,500.00' },
    ];

    const toggleFeesGroup = (id: string) => {
        setSelectedFeesGroups(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedFeesGroups(feesGroups.map(g => g.id));
        } else {
            setSelectedFeesGroups([]);
        }
    };

    const exportOptions = [
        { icon: Copy, label: 'Copy' },
        { icon: FileSpreadsheet, label: 'Excel' },
        { icon: FileText, label: 'CSV' },
        { icon: FileText, label: 'PDF' },
        { icon: Printer, label: 'Print' },
        { icon: Eye, label: 'Visibility' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Search Due Fees</h1>
                    <p className="text-gray-900 text-sm mt-1 font-medium italic">Monitor and manage outstanding student fees</p>
                </div>
            </div>

            {/* Select Criteria Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 mb-8 transform transition-all hover:shadow-2xl duration-300 relative z-30 font-sans">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30 rounded-t-2xl">
                    <h2 className="text-lg font-bold text-gray-800">Select Criteria</h2>
                </div>
                
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Fees Group - Custom Multi-select */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Fees Group <span className="text-red-500">*</span>
                            </label>
                            <button 
                                onClick={() => setIsFeesGroupOpen(!isFeesGroupOpen)}
                                className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-400 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all h-[42px]"
                            >
                                <span className="truncate">
                                    {selectedFeesGroups.length === 0 
                                        ? 'Select' 
                                        : `${selectedFeesGroups.length} Groups Selected`}
                                </span>
                                <ChevronDown size={18} className={`transition-transform duration-200 ${isFeesGroupOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isFeesGroupOpen && (
                                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-2xl py-2 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-2 border-b border-gray-50 bg-gray-50/50 mb-1 sticky top-0">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedFeesGroups.length === feesGroups.length}
                                                onChange={(e) => handleSelectAll(e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                                            />
                                            <span className="text-sm font-bold text-gray-900">Select All</span>
                                        </label>
                                    </div>
                                    <div className="px-4 py-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Class 1 General</p>
                                        <div className="space-y-1">
                                            {feesGroups.map((group) => (
                                                <label key={group.id} className="flex items-center gap-3 px-1 py-1.5 hover:bg-purple-50 rounded-md cursor-pointer transition-colors">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedFeesGroups.includes(group.id)}
                                                        onChange={() => toggleFeesGroup(group.id)}
                                                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                                                    />
                                                    <span className="text-sm text-gray-900 font-medium">{group.label} ({group.id})</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Class */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Class</label>
                            <select 
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-400 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all h-[42px] cursor-pointer"
                            >
                                <option value="">Select</option>
                                <option value="1">Class 1</option>
                                <option value="2">Class 2</option>
                                <option value="3">Class 3</option>
                            </select>
                        </div>

                        {/* Section */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Section</label>
                            <select 
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-400 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all h-[42px] cursor-pointer"
                            >
                                <option value="">Select</option>
                                <option value="A">Section A</option>
                                <option value="B">Section B</option>
                                <option value="C">Section C</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button className={`bg-${theme.colors.primary} hover:bg-${theme.colors.primaryDark} text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-200/50 flex items-center gap-2 active:scale-95`}>
                            <Search size={18} />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Student List Table Section */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transform transition-all duration-300 font-sans">
                <div className="px-6 py-4 border-b border-gray-100 bg-white">
                    <h2 className="text-lg font-bold text-gray-700">Student List</h2>
                </div>

                {/* Table Controls */}
                <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                    <div className="relative group min-w-[200px]">
                        <input 
                            type="text"
                            className="block w-full px-4 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-gray-400"
                            placeholder="Search"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <select className="bg-white border border-gray-300 rounded px-3 py-1 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all cursor-pointer">
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                            </select>
                            <ChevronDown size={14} className="-ml-6 pointer-events-none text-gray-400" />
                        </div>
                        
                        <div className="flex items-center bg-white space-x-2">
                            {exportOptions.map((opt, i) => (
                                <button key={i} title={opt.label} className="p-1.5 text-gray-500 hover:text-purple-600 transition-all">
                                    <opt.icon size={18} />
                                </button>
                            ))}
                            <button className="p-1.5 text-gray-500 border-l border-gray-200 pl-3">
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Area */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-white border-y border-gray-200">
                                {[
                                    'Class', 'Admission No', 'Student Name', 'Fees Group', 'Amount ($)', 
                                    'Paid ($)', 'Discount ($)', 'Fine ($)', 'Balance ($)', 'Action'
                                ].map((head, i) => (
                                    <th key={i} className="px-4 py-3 text-left border-x border-gray-100">
                                        <div className="flex items-center justify-between group cursor-pointer">
                                            <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{head}</span>
                                            {head !== 'Action' && head !== 'Fees Group' && (
                                                <div className="flex flex-col text-gray-200">
                                                    <ChevronDown size={10} className="rotate-180" />
                                                    <ChevronDown size={10} />
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {dummyData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 border-x border-gray-100">{row.class}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 border-x border-gray-100">{row.admNo}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 border-x border-gray-100">{row.name}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-600 border-x border-gray-100 max-w-xs">{row.group}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 border-x border-gray-100 text-right">{row.amount}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 border-x border-gray-100 text-right">{row.paid}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 border-x border-gray-100 text-right">{row.discount}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 border-x border-gray-100 text-right">{row.fine}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700 border-x border-gray-100 text-right">{row.balance}</td>
                                    <td className="px-4 py-3 text-sm text-center border-x border-gray-100">
                                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded shadow-sm flex items-center gap-1.5 transition-all active:scale-95 mx-auto">
                                            <span className="text-xs">₹</span>
                                            <span className="text-xs font-bold whitespace-nowrap">Add Fees</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <p className="text-sm font-medium text-gray-600">Showing 1 to {dummyData.length} of {dummyData.length} entries</p>
                    <div className="flex items-center space-x-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">&lt;</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-purple-600 text-white font-bold text-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDueFees;
