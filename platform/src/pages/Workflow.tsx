import { useState } from 'react';
import { Link } from 'react-router-dom';
import { workflowSteps, phaseNames, getWeekDate, formatDate } from '../data/workflow';
import type { WorkflowStep, StepStatus } from '../data/workflow';
import {
  CheckCircle2, Circle, Clock, Users as UsersIcon, Presentation,
  Megaphone, Flag, ChevronDown, ChevronRight, ArrowRight, Calendar, ExternalLink
} from 'lucide-react';

const typeConfig: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  task: { icon: Clock, color: 'var(--accent-light)', label: 'Task' },
  meeting: { icon: UsersIcon, color: 'var(--purple)', label: 'Meeting' },
  presentation: { icon: Presentation, color: 'var(--cyan)', label: 'Presentation' },
  pr: { icon: Megaphone, color: 'var(--pink)', label: 'PR / Comms' },
  milestone: { icon: Flag, color: 'var(--success)', label: 'Milestone' },
};

const statusConfig: Record<StepStatus, { color: string; label: string }> = {
  not_started: { color: 'var(--text-muted)', label: 'Not Started' },
  in_progress: { color: 'var(--warning)', label: 'In Progress' },
  completed: { color: 'var(--success)', label: 'Completed' },
  blocked: { color: 'var(--danger)', label: 'Blocked' },
};

export default function Workflow() {
  const [steps, setSteps] = useState(workflowSteps);
  const [startDate, setStartDate] = useState('2026-05-01');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [filterPhase, setFilterPhase] = useState<number | 'all'>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const start = new Date(startDate + 'T00:00:00');

  const toggleExpand = (id: string) => {
    setExpandedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const cycleStatus = (id: string) => {
    const order: StepStatus[] = ['not_started', 'in_progress', 'completed', 'blocked'];
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const nextIdx = (order.indexOf(s.status) + 1) % order.length;
        return { ...s, status: order[nextIdx] };
      })
    );
  };

  const phases = Object.entries(phaseNames).map(([key, val]) => ({
    num: Number(key),
    ...val,
  }));

  const filteredSteps = steps.filter((s) => {
    if (filterPhase !== 'all' && s.phase !== filterPhase) return false;
    if (filterType !== 'all' && s.type !== filterType) return false;
    return true;
  });

  const nextStep = steps.find((s) => s.status !== 'completed');

  const getPhaseProgress = (phase: number) => {
    const phaseSteps = steps.filter((s) => s.phase === phase);
    if (phaseSteps.length === 0) return 0;
    return Math.round((phaseSteps.filter((s) => s.status === 'completed').length / phaseSteps.length) * 100);
  };

  const totalCompleted = steps.filter((s) => s.status === 'completed').length;
  const totalSteps = steps.length;

  const renderStep = (step: WorkflowStep) => {
    const config = typeConfig[step.type];
    const status = statusConfig[step.status];
    const isExpanded = expandedSteps[step.id] ?? false;
    const weekDate = getWeekDate(start, step.week);
    const endDate = new Date(weekDate);
    endDate.setDate(endDate.getDate() + step.durationDays);
    const Icon = config.icon;

    const deps = step.dependsOn
      .map((depId) => steps.find((s) => s.id === depId))
      .filter(Boolean);
    const hasBlockedDep = deps.some((d) => d && d.status !== 'completed');

    return (
      <div
        key={step.id}
        className="card"
        style={{
          borderLeft: `4px solid ${config.color}`,
          opacity: step.status === 'completed' ? 0.7 : 1,
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'start', gap: 12, cursor: 'pointer' }}
          onClick={() => toggleExpand(step.id)}
        >
          <div
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: `${config.color}22`, color: config.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <Icon size={18} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{step.title}</span>
              <span className={`tag`} style={{
                background: `${config.color}22`, color: config.color,
              }}>{config.label}</span>
              {step.linkedTool && (
                <Link
                  to={step.linkedTool}
                  className="tag tag-blue"
                  onClick={(e) => e.stopPropagation()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 3, textDecoration: 'none' }}
                >
                  Open Tool <ExternalLink size={10} />
                </Link>
              )}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{step.description}</p>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)' }}>
              <span><Calendar size={12} style={{ verticalAlign: -2 }} /> {formatDate(weekDate)} - {formatDate(endDate)}</span>
              <span>Week {step.week} · {step.durationDays}d</span>
              <span>Owner: <strong style={{ color: 'var(--text)' }}>{step.owner}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              className="btn btn-sm"
              style={{
                background: `${status.color}22`,
                color: status.color,
                border: `1px solid ${status.color}44`,
              }}
              onClick={(e) => { e.stopPropagation(); cycleStatus(step.id); }}
            >
              {step.status === 'completed' ? <CheckCircle2 size={14} /> : <Circle size={14} />}
              {status.label}
            </button>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </div>

        {isExpanded && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            {/* Deliverables */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>
                Deliverables
              </div>
              <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.8 }}>
                {step.deliverables.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Dependencies */}
            {deps.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>
                  Depends On
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {deps.map((dep) => dep && (
                    <span
                      key={dep.id}
                      className={`tag ${dep.status === 'completed' ? 'tag-green' : 'tag-yellow'}`}
                    >
                      {dep.status === 'completed' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {' '}{dep.title}
                    </span>
                  ))}
                </div>
                {hasBlockedDep && (
                  <p style={{ fontSize: 12, color: 'var(--warning)', marginTop: 6 }}>
                    Some dependencies are not yet completed.
                  </p>
                )}
              </div>
            )}

            {/* Meeting Details */}
            {step.meetingDetails && (
              <div style={{ background: 'var(--bg)', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>Duration</div>
                    <div style={{ fontSize: 14 }}>{step.meetingDetails.duration}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>Attendees</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {step.meetingDetails.attendees.map((a, i) => (
                        <span key={i} className="tag tag-purple">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>Agenda</div>
                  <ol style={{ paddingLeft: 20, fontSize: 13, lineHeight: 2 }}>
                    {step.meetingDetails.agenda.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>Prep Materials</div>
                  <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.8 }}>
                    {step.meetingDetails.prepMaterials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Workflow Engine</span>
        <h1>Digital District Workflow Assistant</h1>
        <p>Step-by-step guide through every task, meeting, presentation, and PR milestone needed to make your Digital District a reality.</p>
      </div>

      {/* Progress Overview */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            {totalCompleted}/{totalSteps}
          </div>
          <div className="stat-label">Steps Complete</div>
          <div className="progress-bar" style={{ marginTop: 8 }}>
            <div className="progress-fill" style={{
              width: `${(totalCompleted / totalSteps) * 100}%`,
              background: 'var(--success)',
            }} />
          </div>
        </div>
        {phases.map((p) => (
          <div key={p.num} className="stat-card">
            <div className="stat-value" style={{ color: p.color, fontSize: 24 }}>
              {getPhaseProgress(p.num)}%
            </div>
            <div className="stat-label">{p.name}</div>
            <div className="progress-bar" style={{ marginTop: 8 }}>
              <div className="progress-fill" style={{
                width: `${getPhaseProgress(p.num)}%`,
                background: p.color,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* What's Next */}
      {nextStep && (
        <div className="card" style={{ borderColor: 'var(--accent)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <ArrowRight size={18} color="var(--accent-light)" />
            <h3 style={{ marginBottom: 0 }}>What's Next</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600 }}>{nextStep.title}</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{nextStep.description}</p>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                Owner: {nextStep.owner} · Week {nextStep.week} · {formatDate(getWeekDate(start, nextStep.week))}
              </div>
            </div>
            {nextStep.linkedTool && (
              <Link to={nextStep.linkedTool} className="btn btn-primary btn-sm">
                Open Tool <ExternalLink size={14} />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Project Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: 180 }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Filter by Phase</label>
            <select value={filterPhase} onChange={(e) => setFilterPhase(e.target.value === 'all' ? 'all' : Number(e.target.value))} style={{ width: 200 }}>
              <option value="all">All Phases</option>
              {phases.map((p) => (
                <option key={p.num} value={p.num}>Phase {p.num}: {p.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Filter by Type</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ width: 180 }}>
              <option value="all">All Types</option>
              {Object.entries(typeConfig).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Steps by Phase */}
      {phases
        .filter((p) => filterPhase === 'all' || p.num === filterPhase)
        .map((phase) => {
          const phaseSteps = filteredSteps.filter((s) => s.phase === phase.num);
          if (phaseSteps.length === 0) return null;
          return (
            <div key={phase.num} style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `${phase.color}22`, color: phase.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 16, flexShrink: 0,
                }}>
                  {phase.num}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>Phase {phase.num}: {phase.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{phase.description}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <span className="tag" style={{
                    background: `${phase.color}22`, color: phase.color,
                    fontSize: 13, padding: '4px 12px',
                  }}>
                    {getPhaseProgress(phase.num)}% complete
                  </span>
                </div>
              </div>
              {phaseSteps.map(renderStep)}
            </div>
          );
        })}
    </div>
  );
}
