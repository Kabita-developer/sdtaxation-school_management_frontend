import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  Database,
  Package,
  Truck,
  ShoppingCart,
  Warehouse,
  FileText,
  TrendingUp,
  AlertCircle,
  MoreVertical,
  Plus,
  Search,
  Filter,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Premium Office Desk', sku: 'OD-1024', category: 'Furniture', stock: 45, status: 'In Stock', lastUpdated: '2025-02-18' },
  { id: '2', name: 'Ergonomic Chair', sku: 'EC-2048', category: 'Furniture', stock: 12, status: 'Low Stock', lastUpdated: '2025-02-18' },
  { id: '3', name: 'Wireless Mouse', sku: 'WM-3096', category: 'Electronics', stock: 156, status: 'In Stock', lastUpdated: '2025-02-17' },
  { id: '4', name: 'Mechanical Keyboard', sku: 'MK-4012', category: 'Electronics', stock: 0, status: 'Out of Stock', lastUpdated: '2025-02-16' },
  { id: '5', name: 'Dual Monitor Stand', sku: 'MS-5025', category: 'Accessories', stock: 28, status: 'In Stock', lastUpdated: '2025-02-18' },
];



export default function ERP() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const erpShortcuts = [
    { label: 'Classes', icon: Warehouse, onClick: () => console.log('Classes clicked') },
    { label: 'Sections', icon: ShoppingCart, onClick: () => console.log('Sections clicked') },
    { label: 'Subjects', icon: Truck, onClick: () => console.log('Subjects clicked') },
    { label: 'Exams', icon: FileText, onClick: () => console.log('Exams clicked') },
    { label: 'Timetable', icon: Package, onClick: () => console.log('Timetable clicked') },
    { label: 'Performance', icon: BarChart3, onClick: () => console.log('Performance clicked') },
  ];

  return (
    <Layout title="Classes & Sections" shortcuts={erpShortcuts}>
      <div className="space-y-6">

        {/* Module Fast Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <ModuleCard icon={<Warehouse size={20} />} label="Classes" active />
          <ModuleCard icon={<ShoppingCart size={20} />} label="Sections" />
          <ModuleCard icon={<Truck size={20} />} label="Subjects" />
          <ModuleCard icon={<FileText size={20} />} label="Exams" />
          <ModuleCard icon={<Package size={20} />} label="Timetable" />
          <ModuleCard icon={<BarChart3 size={20} />} label="Performance" />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatWidget
            title="Avg Attendance"
            value="92.4%"
            change="+4.2%"
            trend="up"
            color="blue"
          />
          <StatWidget
            title="Total Sections"
            value="42"
            change="+2.4%"
            trend="up"
            color="purple"
          />
          <StatWidget
            title="Active Subjects"
            value="156"
            change="-1.1%"
            trend="down"
            color="teal"
          />
        </div>

        {/* Inventory Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Class Status</h2>
                <p className="text-sm text-gray-500 mt-1">Manage and track your academic classes</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search Class or Name..."
                    className={`pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary.split('-')[0]}-500 w-full md:w-64`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                  <Filter size={20} />
                </button>
                <button className={`flex items-center space-x-2 px-4 py-2 bg-${theme.colors.primary} text-white rounded-lg hover:bg-${theme.colors.primaryDark} transition-colors text-sm font-medium`}>
                  <Plus size={18} />
                  <span>Add Class</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stream/Group</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Student Count</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="text-xs text-gray-400">Code: {item.sku}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-900">{item.stock}</span>
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${item.stock > 100 ? 'bg-green-500 w-full' : item.stock > 10 ? 'bg-blue-500 w-1/2' : 'bg-red-500 w-1/4'}`}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${item.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {item.stock > 0 ? 'Active' : 'Archived'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp size={18} className="mr-2 text-blue-600" />
              Latest Exam Schedules
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">#E{i}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Unit Test - {1020 + i}</p>
                      <p className="text-xs text-gray-500">Scheduled in 2 days</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase">Processing</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle size={18} className="mr-2 text-red-600" />
              Administrative Alerts
            </h3>
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-start space-x-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-bold text-red-900">Affiliation Renewal Due</p>
                <p className="text-xs text-red-700 mt-1">Your state board affiliation for Primary Unit-B expires in 25 days. Please update documents.</p>
                <button className="text-xs font-bold text-red-800 underline mt-2">Update Documents</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ModuleCard({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  const { theme } = useTheme();
  return (
    <button className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${active ? `bg-${theme.colors.primary} border-${theme.colors.primary} text-white shadow-md` : `bg-white border-gray-200 text-gray-600 hover:border-${theme.colors.primary.split('-')[0]}-400 hover:text-${theme.colors.primary}`
      }`}>
      {icon}
      <span className="text-xs font-bold mt-2">{label}</span>
    </button>
  );
}

function StatWidget({ title, value, change, trend, color }: { title: string, value: string, change: string, trend: 'up' | 'down', color: string }) {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    purple: 'text-purple-600 bg-purple-50',
    teal: 'text-teal-600 bg-teal-50',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className={`flex items-center space-x-1 text-xs font-bold mt-2 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{change} From last month</span>
        </div>
      </div>
      <div className={`p-4 rounded-full ${colors[color]}`}>
        <Database size={24} />
      </div>
    </div>
  );
}