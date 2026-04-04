import { Link } from 'react-router-dom';
import {
  ClipboardCheck, BarChart3, MapPin, ListChecks,
  MessageSquare, FileText, Users, Globe, BookOpen
} from 'lucide-react';

export default function Landing() {
  return (
    <div>
      <div className="hero">
        <h1>Digital District Operating System</h1>
        <p>
          The complete platform for transitioning from legacy Innovation Districts
          to AI-powered, cloud-native Digital Districts.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/scorecard" className="btn btn-primary">Start Assessment</Link>
          <Link to="/dashboard" className="btn btn-secondary">View Dashboard</Link>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Tier 1 */}
        <div className="tier-section">
          <span className="page-badge badge-tier1">Tier 1</span>
          <h2>Interactive Tools</h2>
          <p className="tier-desc">Assess, plan, and track your Digital District deployment.</p>
          <div className="grid-2">
            <Link to="/scorecard" className="feature-card">
              <h3><ClipboardCheck size={18} /> Readiness Scorecard</h3>
              <p>8-dimension diagnostic to assess your city's readiness for a Digital District.</p>
            </Link>
            <Link to="/dashboard" className="feature-card">
              <h3><BarChart3 size={18} /> Leadership Dashboard</h3>
              <p>KPI visualizations for the Economic Inclusion Index and all core metrics.</p>
            </Link>
            <Link to="/corridor" className="feature-card">
              <h3><MapPin size={18} /> Corridor Selector</h3>
              <p>7-factor weighted scoring to choose the right corridor for deployment.</p>
            </Link>
            <Link to="/tracker" className="feature-card">
              <h3><ListChecks size={18} /> Implementation Tracker</h3>
              <p>Phase-by-phase checklist from Street to System through Citywide deployment.</p>
            </Link>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="tier-section">
          <span className="page-badge badge-tier2">Tier 2</span>
          <h2>Communication Engine</h2>
          <p className="tier-desc">Generate stakeholder messaging, proposals, and public dashboards.</p>
          <div className="grid-3">
            <Link to="/messaging" className="feature-card">
              <h3><MessageSquare size={18} /> Messaging Generator</h3>
              <p>Customized elevator pitches for 15+ audience types.</p>
            </Link>
            <Link to="/proposal" className="feature-card">
              <h3><FileText size={18} /> Proposal Builder</h3>
              <p>Generate city-specific Digital District proposals.</p>
            </Link>
            <Link to="/community" className="feature-card">
              <h3><Users size={18} /> Community Dashboard</h3>
              <p>Public-facing impact metrics with equity breakdowns.</p>
            </Link>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="tier-section">
          <span className="page-badge badge-tier3">Tier 3</span>
          <h2>Multi-City Network</h2>
          <p className="tier-desc">Connect districts, share learnings, and scale nationwide.</p>
          <div className="grid-2">
            <Link to="/directory" className="feature-card">
              <h3><Globe size={18} /> City Directory</h3>
              <p>Registry of Digital Districts with interoperability status and metrics.</p>
            </Link>
            <Link to="/network" className="feature-card">
              <h3><BookOpen size={18} /> Peer Learning Network</h3>
              <p>Cross-city knowledge sharing, case studies, and benchmarking.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
