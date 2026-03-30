import React from 'react';
import Layout from '../components/Layout';
import {
  Wallet,
  TrendingUp,
  Download,
  CheckCircle2,
  FileText,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Payroll() {
  const { theme } = useTheme();

  const payrollShortcuts = [
    { label: 'Run Payroll', icon: ArrowUpRight, onClick: () => console.log('Run Payroll clicked'), variant: 'primary' as const },
    { label: 'Download Bulk', icon: Download, onClick: () => console.log('Download clicked'), variant: 'white' as const },
    { label: 'Review Depts', icon: FileText, onClick: () => console.log('Review clicked'), variant: 'white' as const },
  ];

  return (
    <Layout title="Payroll Management" shortcuts={payrollShortcuts}>
      <div className="space-y-6">

        {/* Payroll Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Monthly Payroll"
            value="₹42.50L"
            subtitle="Processing for Feb 2025"
            icon={<Wallet className={`text-${theme.colors.primary}`} size={24} />}
          />
          <StatCard
            title="Salaries Paid"
            value="₹38.20L"
            subtitle="90% Completed"
            icon={<CheckCircle2 className="text-green-600" size={24} />}
          />
          <StatCard
            title="Tax Deducted (TDS)"
            value="₹4.30L"
            subtitle="Pending Remittance"
            icon={<FileText className="text-orange-600" size={24} />}
          />
          <StatCard
            title="Incentives Paid"
            value="₹2.15L"
            subtitle="+15% from last month"
            icon={<TrendingUp className="text-purple-600" size={24} />}
          />
        </div>

        {/* Action Control */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900">Current Cycle: Feb 01 - Feb 28</h3>
            <p className="text-sm text-gray-500">Pay date scheduled for March 1st, 2025</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className={`flex items-center space-x-2 px-4 py-2 border border-${theme.colors.primary.split('-')[0]}-200 text-${theme.colors.primary} rounded-lg hover:bg-${theme.colors.primaryLight} font-medium transition-colors`}>
              <Download size={18} />
              <span>Bulk Payslip Download</span>
            </button>
            <button className={`flex items-center space-x-2 px-6 py-2 bg-${theme.colors.primary} text-white rounded-lg hover:bg-${theme.colors.primaryDark} font-bold shadow-lg transition-all active:scale-95`}>
              <span>Run Payroll</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Departmental Payouts</h2>
            <button className={`text-${theme.colors.primary} hover:underline text-sm font-medium`}>View Detailed Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Employees</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross Salary</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Net Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { dept: 'Accounts & Finance', count: 12, gross: '12,50,000', ded: '1,20,000', net: '11,30,000', status: 'Approved' },
                  { dept: 'Human Resources', count: 5, gross: '4,80,000', ded: '35,000', net: '4,45,000', status: 'Review' },
                  { dept: 'Tax Consultation', count: 25, gross: '22,40,000', ded: '2,10,000', net: '20,30,000', status: 'Approved' },
                  { dept: 'Operations', count: 10, gross: '6,20,000', ded: '45,000', net: '5,75,000', status: 'Pending' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.dept}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">{row.count}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{row.gross}</td>
                    <td className="px-6 py-4 text-sm text-red-600">-₹{row.ded}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{row.net}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold ${row.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        row.status === 'Review' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {row.status}
                      </span>
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

function StatCard({ title, value, subtitle, icon }: { title: string, value: string, subtitle: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
        <DollarSign size={18} className="text-gray-300" />
      </div>
      <div>
        <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest leading-none mb-1">{title}</p>
        <p className="text-2xl font-black text-gray-900">{value}</p>
        <p className="text-xs text-blue-600 font-bold mt-1">{subtitle}</p>
      </div>
    </div>
  );
}