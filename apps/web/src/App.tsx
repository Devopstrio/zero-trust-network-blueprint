import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ZeroTrustDashboard from './pages/ZeroTrustDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400 max-w-md mx-auto">The Zero Trust policy engine is currently evaluating real-time telemetry and orchestrating identity-driven access controls. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<ZeroTrustDashboard />} />
          <Route path="/identity" element={<Placeholder name="Identity Verification Hub" />} />
          <Route path="/policies" element={<Placeholder name="Adaptive Policy Orchestration" />} />
          <Route path="/graph" element={<Placeholder name="Real-time Access Topology Graph" />} />
          <Route path="/posture" element={<Placeholder name="Device Posture & Health Scoring" />} />
          <Route path="/logs" element={<Placeholder name="Immutable Security & Policy Logs" />} />
          <Route path="/risk" element={<Placeholder name="Behavioral Risk & Threat Analytics" />} />
          <Route path="/alerts" element={<Placeholder name="Security Incident & Alerts Hub" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
