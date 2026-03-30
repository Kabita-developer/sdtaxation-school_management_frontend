import React from 'react';
import Layout from '../components/Layout';
import {
  Users,
  UserPlus,
  Phone,
  Mail,
  Target,
  Briefcase,
  TrendingUp,
  GitMerge,
  Layers,
  Handshake,
  Globe,
  Tag,
  Settings2,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const mockLeads = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 98765 43210', status: 'new', source: 'Website', createdAt: '2025-02-15' },
  { id: '2', name: 'Amit Sharma', email: 'amit@example.com', phone: '+91 87654 32109', status: 'contacted', source: 'Referral', createdAt: '2025-02-14' },
  { id: '3', name: 'Priya Singh', email: 'priya@example.com', phone: '+91 76543 21098', status: 'qualified', source: 'Cold Call', createdAt: '2025-02-13' },
  { id: '4', name: 'Suresh Patel', email: 'suresh@example.com', phone: '+91 65432 10987', status: 'lost', source: 'LinkedIn', createdAt: '2025-02-12' },
  { id: '5', name: 'Vikram Mehta', email: 'vikram@example.com', phone: '+91 54321 09876', status: 'converted', source: 'Website', createdAt: '2025-02-11' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new': return 'bg-blue-50 text-blue-700 border-blue-100';
    case 'contacted': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
    case 'qualified': return 'bg-purple-50 text-purple-700 border-purple-100';
    case 'lost': return 'bg-red-50 text-red-700 border-red-100';
    case 'converted': return 'bg-green-50 text-green-700 border-green-100';
    default: return 'bg-gray-50 text-gray-700 border-gray-100';
  }
};

const recentActivities = [
  { icon: UserPlus, color: 'text-blue-600 bg-blue-50', text: 'New lead Rajesh Kumar added', time: '5 min ago' },
  { icon: CheckCircle2, color: 'text-green-600 bg-green-50', text: 'Deal with HDFC Bank marked Won', time: '1 hr ago' },
  { icon: Phone, color: 'text-orange-600 bg-orange-50', text: 'Follow-up call with Priya Singh', time: '2 hr ago' },
  { icon: AlertCircle, color: 'text-red-600 bg-red-50', text: 'Lead Suresh Patel marked Lost', time: '3 hr ago' },
  { icon: TrendingUp, color: 'text-purple-600 bg-purple-50', text: 'Pipeline value crossed ₹1Cr', time: 'Yesterday' },
];

const pipelineStages = [
  { name: 'New Enquiry', count: 42, value: '₹12.4L', color: 'bg-blue-500', width: '90%' },
  { name: 'Contacted', count: 28, value: '₹8.1L', color: 'bg-indigo-500', width: '65%' },
  { name: 'Qualified', count: 18, value: '₹6.3L', color: 'bg-purple-500', width: '45%' },
  { name: 'Proposal', count: 10, value: '₹9.8L', color: 'bg-orange-500', width: '25%' },
  { name: 'Closed Won', count: 6, value: '₹8.6L', color: 'bg-green-500', width: '15%' },
];

const crmModules = [
  { label: 'Admission Stages', icon: GitMerge, route: '/crm/PIPLINE', color: 'bg-blue-50 text-blue-600 border-blue-100', desc: 'Manage student admission stages' },
  { label: 'Prospective Students', icon: Layers, route: '/crm/LEAD', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', desc: 'Track and qualify student enquiries' },
  { label: 'Scholarships', icon: Handshake, route: '/crm/DEAL', color: 'bg-pink-50 text-pink-600 border-pink-100', desc: 'Monitor scholarship applications' },
  { label: 'Referral Sources', icon: Globe, route: '/crm/Sources', color: 'bg-teal-50 text-teal-600 border-teal-100', desc: 'Analyze lead acquisition channels' },
  { label: 'Student Categories', icon: Tag, route: '/crm/Labels', color: 'bg-yellow-50 text-yellow-600 border-yellow-100', desc: 'Manage category-wise tagging' },
  { label: 'Staff Types', icon: Settings2, route: '/crm/Contact_type', color: 'bg-orange-50 text-orange-600 border-orange-100', desc: 'Define staff classifications' },
];

export default function CRM() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const crmShortcuts = [
    { label: 'Admissions', icon: GitMerge, onClick: () => navigate('/crm/PIPLINE'), variant: 'primary' as const },
    { label: 'Students', icon: Layers, onClick: () => navigate('/crm/LEAD'), variant: 'primary' as const },
    { label: 'Scholarships', icon: Handshake, onClick: () => navigate('/crm/DEAL'), variant: 'primary' as const },
    { label: 'Sources', icon: Globe, onClick: () => navigate('/crm/Sources'), variant: 'primary' as const },
    { label: 'Categories', icon: Tag, onClick: () => navigate('/crm/Labels'), variant: 'primary' as const },
    { label: 'Staff Types', icon: Settings2, onClick: () => navigate('/crm/Contact_type'), variant: 'primary' as const },
  ];

  return (
    <Layout title="People Management" shortcuts={crmShortcuts}>
      <div className="space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: 'Total Students', value: '1,284', change: '+12.5%', trend: 'up', icon: <Users size={22} />, iconBg: 'bg-blue-50 text-blue-600' },
            { title: 'Active Teachers', value: '432', change: '+5.2%', trend: 'up', icon: <Briefcase size={22} />, iconBg: 'bg-green-50 text-green-600' },
            { title: 'Admission Rate', value: '24.8%', change: '-2.1%', trend: 'down', icon: <Target size={22} />, iconBg: 'bg-purple-50 text-purple-600' },
            { title: 'Expected Fees', value: '₹45.2L', change: '+18.4%', trend: 'up', icon: <TrendingUp size={22} />, iconBg: 'bg-orange-50 text-orange-600' },
          ].map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>{stat.icon}</div>
                <span className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* CRM Modules Quick Nav + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CRM Module Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">People Modules</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {crmModules.map((mod) => (
                <button
                  key={mod.label}
                  onClick={() => navigate(mod.route)}
                  className={`p-4 bg-white rounded-xl border ${mod.color.split(' ')[2]} shadow-sm hover:shadow-md transition-all text-left group hover:-translate-y-0.5`}
                >
                  <div className={`w-10 h-10 rounded-lg ${mod.color.split(' ')[0]} ${mod.color.split(' ')[1]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <mod.icon size={20} />
                  </div>
                  <p className="text-sm font-bold text-gray-900">{mod.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{mod.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Activity</h2>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start space-x-3 p-3.5 hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${activity.color}`}>
                    <activity.icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 leading-snug">{activity.text}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 flex items-center">
                      <Clock size={10} className="mr-1" />{activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline Funnel + Recent Leads */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Pipeline Funnel */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
              <GitMerge size={16} className="mr-2 text-blue-600" />
              Admission Funnel
            </h2>
            <div className="space-y-3">
              {pipelineStages.map((stage) => (
                <div key={stage.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-700">{stage.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-gray-400">{stage.count} students</span>
                      <span className="text-[10px] font-black text-gray-700">{stage.value}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${stage.color} rounded-full transition-all`} style={{ width: stage.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Leads Table */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 flex items-center">
                <Layers size={16} className="mr-2 text-indigo-600" />
                Recent Admissions
              </h2>
              <button
                onClick={() => navigate('/crm/LEAD')}
                className={`text-xs font-bold text-${theme.colors.primary} hover:underline`}
              >
                View All →
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {mockLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs flex-shrink-0">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{lead.name}</p>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <span className="flex items-center text-[10px] text-gray-400"><Mail size={10} className="mr-0.5" />{lead.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <span className="text-[10px] font-medium text-gray-400">{lead.source}</span>
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold capitalize ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
              <button
                onClick={() => navigate('/crm/LEAD')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View all 1,284 students
              </button>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}