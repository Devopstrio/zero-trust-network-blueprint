import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Shield, 
  Lock, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Database,
  Cpu,
  ChevronRight,
  CheckCircle,
  Zap,
  Fingerprint,
  Monitor
} from 'lucide-react';

const verificationData = [
  { name: '00:00', requests: 45, denials: 2 },
  { name: '04:00', requests: 12, denials: 0 },
  { name: '08:00', requests: 250, denials: 12 },
  { name: '12:00', requests: 580, denials: 34 },
  { name: '16:00', requests: 490, denials: 15 },
  { name: '20:00', requests: 120, denials: 5 },
];

const KPI_CARDS = [
  { title: 'Active Identities', value: '1,250', trend: '+12', color: 'zinc', icon: Fingerprint },
  { title: 'Verified Sessions', value: '842', trend: 'Optimum', color: 'zinc', icon: Shield },
  { title: 'Access Denials', value: '5.2%', trend: '+0.2%', color: 'zinc', icon: Lock },
  { title: 'Avg Verification', value: '12.4ms', trend: '-2.1ms', color: 'zinc', icon: Activity },
];

const ZeroTrustDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Zero Trust Security Console</h1>
          <p className="text-slate-400">Enterprise-grade continuous verification, identity-driven micro-segmentation, and policy orchestration.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-slate-800">
            Export Audit Record
          </button>
          <button className="bg-zinc-600 hover:bg-zinc-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-zinc-600/20">
            Rotate Security Keys
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-zinc-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-zinc-400`} />
              </div>
              <div className={`text-xs font-medium text-zinc-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Trends */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Continuous Verification Velocity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={verificationData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#71717a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#71717a" fill="url(#colorRequests)" name="Verified Requests" />
                <Area type="monotone" dataKey="denials" stroke="#ef4444" fill="none" name="Policy Denials" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Posture Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Device Posture Scoring</h3>
          <div className="flex-1 space-y-6">
            {[
              { label: 'High Trust (Verified)', score: 75, color: 'bg-zinc-500', status: 'OPTIMAL' },
              { label: 'Medium Trust (Warning)', score: 20, color: 'bg-zinc-600', status: 'AUDIT' },
              { label: 'Low Trust (Critical)', score: 5, color: 'bg-red-600', status: 'BLOCKED' },
            ].map((node) => (
              <div key={node.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{node.label}</span>
                  <span className="text-slate-400 font-bold">{node.score}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${node.color}`} style={{ width: `${node.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-zinc-500/10 border border-zinc-500/20 rounded-xl flex gap-3">
            <Zap className="text-zinc-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Posture Engine: <span className="text-zinc-400 font-bold">Real-time Telemetry</span> active. All access requests are cross-referenced with device health signals.</p>
          </div>
        </div>
      </div>

      {/* Policy Log Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Real-time Policy Decisions</h3>
          <button className="text-zinc-400 hover:text-zinc-300 text-sm font-medium">View Full Audit</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Identity</th>
                <th className="px-6 py-4 font-semibold">Resource</th>
                <th className="px-6 py-4 font-semibold">Postured Score</th>
                <th className="px-6 py-4 font-semibold">Decision</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { identity: 'admin@corp.com', resource: 'vault-api-prod', posture: '3.0/3.0', decision: 'ALLOW', method: 'mTLS + JWT' },
                { identity: 'dev-01@corp.com', resource: 'code-repo-internal', posture: '2.4/3.0', decision: 'ALLOW', method: 'JWT + POSTURE' },
                { identity: 'untrusted-src', resource: 'db-cluster-core', posture: '0.2/3.0', decision: 'DENY', method: 'IP_BLOCK' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-200">{row.identity}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.resource}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.posture}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.decision === 'ALLOW' ? 'text-zinc-400 border-zinc-500/20 bg-zinc-500/10' : 
                      'text-red-400 border-red-500/20 bg-red-500/10'
                    }`}>
                      {row.decision}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">{row.method}</td>
                  <td className="px-6 py-4">
                    <button className="text-zinc-400 hover:text-zinc-300 text-xs font-bold uppercase tracking-wider">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ZeroTrustDashboard;
