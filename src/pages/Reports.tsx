import React from 'react';
import Layout from '../components/Layout';
import {
  BarChart,
  PieChart,
  LineChart,
  Download,
  Filter,
  Calendar,
  FileText,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Search
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Reports() {
  const { theme } = useTheme();

  const reportsShortcuts = [
    { label: 'Generate Custom', icon: ArrowRight, onClick: () => console.log('Generate clicked'), variant: 'primary' as const },
    { label: 'Export All', icon: Download, onClick: () => console.log('Export All clicked'), variant: 'white' as const },
    { label: 'Filter Reports', icon: Filter, onClick: () => console.log('Filter clicked'), variant: 'white' as const },
  ];

  return (
    <Layout title="Academic & Admin Reports" shortcuts={reportsShortcuts}>
      <div className="space-y-6">

        {/* Report Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <HighlightCard
            title="Fees Collection"
            value="₹45.2L"
            trend="+12.5% vs last term"
            chartType="line"
            color="blue"
          />
          <HighlightCard
            title="Student Attendance"
            value="92.4%"
            trend="+1.2% this month"
            chartType="bar"
            color="green"
          />
          <HighlightCard
            title="Avg. Exam Score"
            value="78.5%"
            trend="+2.1% this session"
            chartType="pie"
            color="purple"
          />
        </div>

        {/* Available Reports Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Available Reports</h2>
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Find a report..."
                  className={`pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:ring-1 focus:ring-${theme.colors.primary.split('-')[0]}-500 rounded-lg text-sm w-64 transition-all`}
                />
              </div>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ReportItem
              icon={<FileText className={`text-${theme.colors.primary}`} size={24} />}
              title="Student Report"
              desc="Comprehensive student demographic and enrollment data."
            />
            <ReportItem
              icon={<TrendingUp className="text-green-600" size={24} />}
              title="Attendance Report"
              desc="Daily, monthly, and yearly attendance tracking for all classes."
            />
            <ReportItem
              icon={<PieChart className="text-purple-600" size={24} />}
              title="Result Report"
              desc="Detailed breakdown of exam scores and academic performance."
            />
            <ReportItem
              icon={<BarChart className="text-orange-600" size={24} />}
              title="Teacher Report"
              desc="Staff performance metrics and workload analysis."
            />
            <ReportItem
              icon={<Calendar className="text-teal-600" size={24} />}
              title="Syllabus Progress"
              desc="Status reports on curriculum completion for each subject."
            />
            <ReportItem
              icon={<LineChart className="text-indigo-600" size={24} />}
              title="Fee Outstanding"
              desc="Predictive analysis and list of pending fee payments."
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center space-x-2 group">
            <span>Generate Custom Report</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Layout>
  );
}

function HighlightCard({ title, value, trend, color }: { title: string, value: string, trend: string, chartType: string, color: string }) {
  const { theme } = useTheme();
  const colorMap: Record<string, string> = {
    blue: `border-${theme.colors.primary.split('-')[0]}-200 bg-${theme.colors.primaryLight}/50 text-${theme.colors.primary.split('-')[0]}-900`,
    green: 'border-green-200 bg-green-50/50 text-green-900',
    purple: 'border-purple-200 bg-purple-50/50 text-purple-900',
  };

  return (
    <div className={`p-6 rounded-2xl border-2 shadow-sm ${colorMap[color]}`}>
      <h3 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-1">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <p className="text-3xl font-black">{value}</p>
        <TrendingUp size={20} className="opacity-40" />
      </div>
      <p className="text-sm font-bold mt-2 italic opacity-80">{trend}</p>

      {/* Mock chart visual */}
      <div className="mt-6 flex items-end space-x-1 h-12 opacity-30">
        {[40, 60, 45, 90, 65, 80, 50, 95].map((h, i) => (
          <div key={i} className="flex-1 bg-current rounded-t" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function ReportItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  const { theme } = useTheme();
  return (
    <div className={`p-4 rounded-xl border border-gray-100 hover:border-${theme.colors.primary.split('-')[0]}-200 hover:shadow-md transition-all group flex items-start space-x-4 bg-white cursor-pointer translate-y-0 hover:-translate-y-1`}>
      <div className={`p-3 bg-gray-50 rounded-xl group-hover:bg-${theme.colors.primaryLight} transition-colors`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</h4>
          <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500" />
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</p>
        <button className="mt-3 flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-blue-600 opacity-60 group-hover:opacity-100">
          <Download size={12} />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}