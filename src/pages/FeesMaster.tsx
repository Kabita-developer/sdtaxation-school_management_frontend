import { 
    Home, 
    Receipt, 
    ChevronRight, 
    Plus,
    Filter
} from 'lucide-react';

const months = [
    "April", "May", "June", "July", "August", "September", 
    "October", "November", "December", "January", "February", "March"
];

const feeData = [
    { id: 1, dueDate: "10/04", fineType: "Fixed", values: Array(12).fill("2000"), updatedBy: "admin@school.com" },
    { id: 2, dueDate: "15/04", fineType: "Percent", values: Array(12).fill("5000"), updatedBy: "admin@school.com" },
    { id: 3, dueDate: "20/04", fineType: "Fixed", values: Array(12).fill("1500"), updatedBy: "admin@school.com" },
    { id: 4, dueDate: "25/04", fineType: "Percent", values: Array(12).fill("500"), updatedBy: "admin@school.com" },
    { id: 5, dueDate: "30/04", fineType: "None", values: Array(12).fill("800"), updatedBy: "admin@school.com" },
];

export default function FeesMaster() {
    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-hidden font-sans">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-medium text-gray-800">Fees Management</h1>
                    <span className="text-gray-400 text-sm">Control Panel</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Home size={14} />
                    <span className="hover:text-blue-600 cursor-pointer">Home</span>
                    <ChevronRight size={12} />
                    <Receipt size={14} />
                    <span className="hover:text-blue-600 cursor-pointer">Fees</span>
                    <ChevronRight size={12} />
                    <span className="text-gray-400">Fees Master List</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 overflow-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-700">Fees Structure List</h2>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                                <Plus size={16} />
                                <span>Add New Fee</span>
                            </button>
                            <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-md transition-colors">
                                <Filter size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#438EB9] text-white">
                                    <th className="px-1 py-6 text-base font-semibold border border-white/20 min-w-[50px] h-32 align-bottom pb-4">
                                        <div className="flex justify-center -rotate-90 whitespace-nowrap origin-center translate-y-[-10px]">
                                            Due Date
                                        </div>
                                    </th>
                                    <th className="px-1 py-6 text-base font-semibold border border-white/20 min-w-[50px] h-32 align-bottom pb-4">
                                        <div className="flex justify-center -rotate-90 whitespace-nowrap origin-center translate-y-[-10px]">
                                            Fine Type
                                        </div>
                                    </th>
                                    {months.map(month => (
                                        <th key={month} className="px-1 py-6 text-[13px] font-semibold border border-white/20 min-w-[45px] h-32 align-bottom pb-4">
                                            <div className="flex justify-center -rotate-90 whitespace-nowrap origin-center translate-y-[-10px]">
                                                {month}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {feeData.map((item, idx) => (
                                    <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-2 py-2 text-base font-medium text-gray-800 border-r border-gray-100 text-center text-sm">{item.dueDate}</td>
                                        <td className="px-2 py-2 text-[11px] font-bold text-indigo-600 uppercase tracking-tighter border-r border-gray-100 text-center">{item.fineType}</td>
                                        {item.values.map((val, vIdx) => (
                                            <td key={vIdx} className="px-1 py-2 text-[15px] font-medium text-gray-700 text-center border-r border-gray-100">{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination or Footer Summary */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-medium">
                        <span>Showing {feeData.length} entries</span>
                        <div className="flex items-center space-x-2">
                             <span className="px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-white transition-colors">Previous</span>
                             <span className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded">1</span>
                             <span className="px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-white transition-colors">Next</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
