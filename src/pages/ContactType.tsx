import { useState } from 'react';
import Layout from '../components/Layout';
import {
  GitMerge,
  Layers,
  Handshake,
  Globe,
  Tag,
  Settings2,
  Plus,
  Search,
  User,
  Users,
  Building2,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactType() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    baseline: '0',
    security: 'Level 1',
    description: ''
  });

  const crmShortcuts = [
    { label: 'Pipline', icon: GitMerge, onClick: () => navigate('/crm/PIPLINE'), variant: 'primary' as const },
    { label: 'Lead', icon: Layers, onClick: () => navigate('/crm/LEAD'), variant: 'primary' as const },
    { label: 'Deal', icon: Handshake, onClick: () => navigate('/crm/DEAL'), variant: 'primary' as const },
    { label: 'Sources', icon: Globe, onClick: () => navigate('/crm/Sources'), variant: 'primary' as const },
    { label: 'Labels', icon: Tag, onClick: () => navigate('/crm/Labels'), variant: 'primary' as const },
    { label: 'Contact Type', icon: Settings2, onClick: () => navigate('/crm/Contact_type'), variant: 'primary' as const },
  ];

  const typeSummary = [
    { name: 'Individual', count: 1240, icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Corporate', count: 452, icon: Building2, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'SME / MSME', count: 865, icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Partnership', count: 124, icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  const contactTypes = [
    { id: 'CT001', name: 'Individual Taxpayer', slug: 'individual', totalContacts: 1240, activeLeads: 156, growth: '+5%', security: 'Level 1' },
    { id: 'CT002', name: 'Private Limited Company', slug: 'pvt_ltd', totalContacts: 312, activeLeads: 45, growth: '+12%', security: 'Level 3' },
    { id: 'CT003', name: 'Partnership Firm', slug: 'partnership', totalContacts: 124, activeLeads: 18, growth: '+2%', security: 'Level 2' },
    { id: 'CT004', name: 'Proprietorship', slug: 'proprietorship', totalContacts: 865, activeLeads: 92, growth: '+8%', security: 'Level 1' },
    { id: 'CT005', name: 'Non-Profit / NGO', slug: 'ngo', totalContacts: 45, activeLeads: 5, growth: '0%', security: 'Level 2' },
    { id: 'CT006', name: 'Government Agency', slug: 'govt', totalContacts: 28, activeLeads: 2, growth: '+1%', security: 'Level 4' },
  ];

  return (
    <Layout title="CRM" shortcuts={crmShortcuts}>
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest">Contact_type</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {typeSummary.map((type) => (
            <div key={type.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all hover:translate-y-[-2px] hover:shadow-md">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${type.bg}`}>
                  <type.icon size={20} className={type.color} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-gray-900 leading-none">{type.count}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Contacts</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-bold text-gray-700">{type.name}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center text-sm uppercase tracking-wider">
              <Settings2 size={16} className="mr-2 text-indigo-600" />
              Contact Classification
            </h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  placeholder="Find classification..."
                  className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-xs font-bold leading-none"
              >
                <Plus size={14} />
                <span>ADD TYPE</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Classification Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Identifier String</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Total Baseline</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Active Funnel</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Growth</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contactTypes.filter(ct => ct.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ct) => (
                  <tr key={ct.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-900">{ct.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-mono">{ct.slug}</code>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-gray-900">{ct.totalContacts}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-indigo-600">{ct.activeLeads}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <span className={`text-[11px] font-bold ${ct.growth.startsWith('+') ? 'text-green-600' : 'text-gray-400'}`}>{ct.growth}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 px-2 text-[10px] font-black uppercase text-gray-400 hover:text-indigo-600 transition-colors tracking-tighter">
                        Settings
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Contact Type Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300 font-sans">
            <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white font-black uppercase tracking-widest flex items-center text-sm">
                <Plus size={18} className="mr-2" />
                Create Contact Type
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-indigo-100 hover:text-white transition-colors"
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Classification Name</label>
                  <div className="relative">
                    <Settings2 className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <input
                      type="text"
                      placeholder="Example: Individual Taxpayer, NGO..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Identifier String (Slug)</label>
                  <div className="relative">
                    <GitMerge className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <input
                      type="text"
                      placeholder="example_slug"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50 font-mono"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Security Level</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
                    <select
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black appearance-none"
                      value={formData.security}
                      onChange={(e) => setFormData({ ...formData, security: e.target.value })}
                    >
                      <option>Level 1</option>
                      <option>Level 2</option>
                      <option>Level 3</option>
                      <option>Level 4</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-1.5">
                <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Classification Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the characteristics of this classification..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-black placeholder:text-black/50"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="mt-8 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all active:scale-95"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(false);
                  }}
                  className="flex-2 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 px-10"
                >
                  Create Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
