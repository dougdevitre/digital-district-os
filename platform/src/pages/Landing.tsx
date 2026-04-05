import { Link } from 'react-router-dom';
import {
  Play, CalendarDays, UserCheck, Megaphone, Presentation,
  ClipboardCheck, BarChart3, MapPin, ListChecks,
  MessageSquare, FileText, Users, Globe, BookOpen,
  ArrowRight, Radio, ShieldQuestion
} from 'lucide-react';
import { workflowSteps, phaseNames } from '../data/workflow';

export default function Landing() {
  const totalSteps = workflowSteps.length;
  const completedSteps = workflowSteps.filter((s) => s.status === 'completed').length;
  const phases = Object.entries(phaseNames);
  const nextStep = workflowSteps.find((s) => s.status !== 'completed');

  return (
    <div>
      <div className="hero">
        <h1>Digital District Operating System</h1>
        <p>
          Your step-by-step assistant for building a Digital District — from first meeting
          to citywide launch. Every workflow, timeline, presentation, and stakeholder
          conversation, guided and coordinated.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/mission-control" className="btn btn-primary"><Radio size={16} /> Mission Control</Link>
          <Link to="/workflow" className="btn btn-secondary"><Play size={16} /> Start Workflow</Link>
        </div>
      </div>

      {/* Live Progress Strip */}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="status-strip" style={{ marginBottom: 32 }}>
          <div className="status-strip-item">
            <div className="strip-value" style={{ color: 'var(--success)' }}>{completedSteps}/{totalSteps}</div>
            <div className="strip-label">Steps Complete</div>
          </div>
          {phases.map(([key, val]) => {
            const phaseSteps = workflowSteps.filter((s) => s.phase === Number(key));
            const done = phaseSteps.filter((s) => s.status === 'completed').length;
            const pct = phaseSteps.length > 0 ? Math.round((done / phaseSteps.length) * 100) : 0;
            return (
              <div key={key} className="status-strip-item">
                <div className="strip-value" style={{ color: val.color }}>{pct}%</div>
                <div className="strip-label">P{key}: {val.name}</div>
              </div>
            );
          })}
        </div>

        {nextStep && (
          <div className="card" style={{ borderColor: 'var(--accent)', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <ArrowRight size={16} color="var(--accent-light)" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Next Step</span>
            </div>
            <p style={{ fontWeight: 600, fontSize: 16 }}>{nextStep.title}</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{nextStep.description}</p>
            <div style={{ marginTop: 8 }}>
              <Link to="/workflow" className="btn btn-sm btn-primary">Open Workflow</Link>
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="card" style={{ marginBottom: 32, textAlign: 'center' }}>
          <h2 style={{ marginBottom: 16 }}>How This Platform Works</h2>
          <div className="grid-3">
            <div style={{ padding: 12 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent-light)' }}>1</div>
              <p style={{ fontWeight: 600, marginTop: 4 }}>Follow the Workflow</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                Step-by-step guidance from building the case through citywide deployment. Each step has tasks, meetings, and deliverables.
              </p>
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--purple)' }}>2</div>
              <p style={{ fontWeight: 600, marginTop: 4 }}>Coordinate Your Team</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                Gantt timelines, stakeholder tracking, meeting agendas, and PR calendars keep everyone aligned.
              </p>
            </div>
            <div style={{ padding: 12 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--success)' }}>3</div>
              <p style={{ fontWeight: 600, marginTop: 4 }}>Generate & Present</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                Stakeholder pitches, council briefings, investor decks, press materials, and city proposals — all customized and ready.
              </p>
            </div>
          </div>
        </div>

        {/* Workflow Assistant - PRIMARY */}
        <div className="tier-section">
          <span className="page-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>Start Here</span>
          <h2>Workflow Assistant</h2>
          <p className="tier-desc">Your guided path from idea to operational Digital District. Tasks, meetings, presentations, and PR — all sequenced.</p>
          <div className="grid-2">
            <Link to="/workflow" className="feature-card" style={{ borderColor: 'var(--success)', borderWidth: 2 }}>
              <h3><Play size={18} /> Guided Workflow <ArrowRight size={14} /></h3>
              <p>Step-by-step walkthrough of every phase. Complete tasks, prep for meetings, generate deliverables — in order.</p>
            </Link>
            <Link to="/timeline" className="feature-card">
              <h3><CalendarDays size={18} /> Timeline & Tasks</h3>
              <p>Gantt-style timeline showing all tasks, meetings, and milestones with owners and dependencies.</p>
            </Link>
            <Link to="/stakeholders" className="feature-card">
              <h3><UserCheck size={18} /> Stakeholder Tracker</h3>
              <p>Track every stakeholder: influence, interest, engagement status, and next actions. Quadrant analysis built in.</p>
            </Link>
            <Link to="/communications" className="feature-card">
              <h3><Megaphone size={18} /> PR & Comms Calendar</h3>
              <p>Sequenced communications plan: internal briefings, media outreach, community updates, and social media.</p>
            </Link>
          </div>
          <div className="grid-2" style={{ marginTop: 12 }}>
            <Link to="/presentations" className="feature-card">
              <h3><Presentation size={18} /> Presentation Generator</h3>
              <p>Slide-ready content with speaker notes for kickoffs, council briefings, investor pitches, and more.</p>
            </Link>
            <Link to="/objections" className="feature-card">
              <h3><ShieldQuestion size={18} /> Objection Handler</h3>
              <p>Instant responses to stakeholder pushback on cost, technology, equity, and politics.</p>
            </Link>
          </div>
        </div>

        {/* Assess & Plan */}
        <div className="tier-section">
          <span className="page-badge badge-tier1">Assess & Plan</span>
          <h2>Diagnostic & Planning Tools</h2>
          <p className="tier-desc">Assess readiness, select corridors, track KPIs, and monitor implementation.</p>
          <div className="grid-2">
            <Link to="/scorecard" className="feature-card">
              <h3><ClipboardCheck size={18} /> Readiness Scorecard</h3>
              <p>8-dimension diagnostic with radar charts and bottleneck analysis.</p>
            </Link>
            <Link to="/dashboard" className="feature-card">
              <h3><BarChart3 size={18} /> Leadership Dashboard</h3>
              <p>Economic Inclusion Index, business formation, equity metrics — executive, operational, and community views.</p>
            </Link>
            <Link to="/corridor" className="feature-card">
              <h3><MapPin size={18} /> Corridor Selector</h3>
              <p>7-factor weighted scoring to choose the right corridor.</p>
            </Link>
            <Link to="/tracker" className="feature-card">
              <h3><ListChecks size={18} /> Implementation Tracker</h3>
              <p>Phase 1-4 exit criteria checklists with workstream details.</p>
            </Link>
          </div>
        </div>

        {/* Communicate */}
        <div className="tier-section">
          <span className="page-badge badge-tier2">Communicate</span>
          <h2>Communication Engine</h2>
          <p className="tier-desc">Generate stakeholder messaging, full proposals, and public dashboards.</p>
          <div className="grid-3">
            <Link to="/messaging" className="feature-card">
              <h3><MessageSquare size={18} /> Messaging Generator</h3>
              <p>Customized pitches for 15+ audience types.</p>
            </Link>
            <Link to="/proposal" className="feature-card">
              <h3><FileText size={18} /> Proposal Builder</h3>
              <p>Full city proposals with budget and equity commitments.</p>
            </Link>
            <Link to="/community" className="feature-card">
              <h3><Users size={18} /> Community Dashboard</h3>
              <p>Public-facing impact metrics and business spotlights.</p>
            </Link>
          </div>
        </div>

        {/* Scale */}
        <div className="tier-section">
          <span className="page-badge badge-tier3">Scale</span>
          <h2>Multi-City Network</h2>
          <p className="tier-desc">Connect districts, share learnings, and replicate nationwide.</p>
          <div className="grid-2">
            <Link to="/directory" className="feature-card">
              <h3><Globe size={18} /> City Directory</h3>
              <p>Registry of Digital Districts with DDIS conformance and metrics.</p>
            </Link>
            <Link to="/network" className="feature-card">
              <h3><BookOpen size={18} /> Peer Network</h3>
              <p>Cross-city discussions, benchmarks, and replication playbook.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
