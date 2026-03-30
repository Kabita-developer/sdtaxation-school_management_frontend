import React from 'react';
import Layout from '../components/Layout';
import {
  Users,
  UserCheck,
  UserMinus,
  Clock,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Briefcase,
  MapPin
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'on-leave' | 'terminated';
  joinDate: string;
  location: string;
}

const mockEmployees: Employee[] = [
  { id: 'EMP001', name: 'John Doe', position: 'Senior Accountant', department: 'Finance', email: 'john.doe@example.com', phone: '+91 98765 43210', status: 'active', joinDate: '2023-01-15', location: 'Mumbai' },
  { id: 'EMP002', name: 'Sarah Smith', position: 'HR Manager', department: 'Human Resources', email: 'sarah.smith@example.com', phone: '+91 87654 32109', status: 'active', joinDate: '2022-06-20', location: 'Delhi' },
  { id: 'EMP003', name: 'Michael Brown', position: 'Tax Consultant', department: 'Legal', email: 'michael.b@example.com', phone: '+91 76543 21098', status: 'on-leave', joinDate: '2023-11-01', location: 'Bangalore' },
  { id: 'EMP004', name: 'Emily Davis', position: 'Data Analyst', department: 'Operations', email: 'emily.d@example.com', phone: '+91 65432 10987', status: 'active', joinDate: '2024-02-10', location: 'Pune' },
  { id: 'EMP005', name: 'David Wilson', position: 'Junior Accountant', department: 'Finance', email: 'david.w@example.com', phone: '+91 54321 09876', status: 'terminated', joinDate: '2021-03-05', location: 'Mumbai' },
];

const getStatusStyles = (status: Employee['status']) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-700';
    case 'on-leave': return 'bg-amber-100 text-amber-700';
    case 'terminated': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function HRMS() {
  const { theme } = useTheme();

  const hrmShortcuts = [
    { label: 'Add Staff', icon: Plus, onClick: () => console.log('Add Staff clicked') },
    { label: 'Attendance', icon: Clock, onClick: () => console.log('Staff Attendance clicked') },
    { label: 'Leave Management', icon: UserMinus, onClick: () => console.log('Leave clicked') },
  ];

  return (
    <Layout title="Staff Management (HRM)" shortcuts={hrmShortcuts}>
      <div className="space-y-6">

        {/* HR Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Staff" value="156" change="+4" icon={<Users className={`text-${theme.colors.primary}`} size={24} />} />
          <StatCard title="Present Today" value="142" change="+2" icon={<UserCheck className="text-green-600" size={24} />} />
          <StatCard title="On Leave" value="8" change="-1" icon={<Clock className="text-amber-600" size={24} />} />
          <StatCard title="Pending Approvals" value="2" change="0" icon={<UserMinus className="text-red-600" size={24} />} />
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search staff members..."
                className={`pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-${theme.colors.primary.split('-')[0]}-500 w-full md:w-80`}
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 bg-white">
              <Filter size={20} />
            </button>
          </div>
          <button className={`flex items-center justify-center space-x-2 px-4 py-2 bg-${theme.colors.primary} text-white rounded-lg hover:bg-${theme.colors.primaryDark} transition-colors font-medium`}>
            <Plus size={18} />
            <span>Add Staff Member</span>
          </button>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Campus</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full bg-${theme.colors.primaryLight} text-${theme.colors.primary} flex items-center justify-center font-bold mr-3`}>
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-400">ID: {emp.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center text-sm text-gray-900">
                          <Briefcase size={14} className="mr-1.5 text-gray-400" />
                          {emp.position}
                        </div>
                        <p className="text-xs text-gray-500 ml-5">{emp.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <Mail size={12} className="mr-1.5" />
                          {emp.email}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Phone size={12} className="mr-1.5" />
                          {emp.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(emp.status)}`}>
                        {emp.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1.5 text-gray-400" />
                        {emp.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className={`text-${theme.colors.primary} hover:text-${theme.colors.primaryDark} font-medium text-sm`}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
      <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <span className={`text-xs font-bold ${isPositive ? 'text-green-600' : change === '0' ? 'text-gray-400' : 'text-red-600'}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}