import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { workflowSteps, phaseNames, getWeekDate, formatDate } from '../data/workflow';
import type { WorkflowStep, StepType } from '../data/workflow';
import {
  CheckCircle2, Clock, AlertTriangle, Users, Calendar,
  ArrowRight, Megaphone, Presentation, Flag, ChevronRight,
  Activity, Zap, MessageSquare, FileText, BarChart3, Target,
  Radio, Eye, TrendingUp
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const typeConfig: Record<StepType, { icon: typeof Clock; color: string; label: string }> = {
  task: { icon: Clock, color: 'var(--accent-light)', label: 'Task' },
  meeting: { icon: Users, color: 'var(--purple)', label: 'Meeting' },
  presentation: { icon: Presentation, color: 'var(--cyan)', label: 'Presentation' },
  pr: { icon: Megaphone, color: 'var(--pink)', label: 'PR / Comms' },
  milestone: { icon: Flag, color: 'var(--success)', label: 'Milestone' },
};

export default function MissionControl() {
  const [startDate] = useState('2026-05-01');
  const start = new Date(startDate + 'T00:00:00');
  const today = new Date();

  const steps = workflowSteps;

  const computed = useMemo(() => {
    const totalSteps = steps.length;
    const completedSteps = steps.filter((s) => s.status === 'completed');
    const blockedSteps = steps.filter((s) => s.status === 'blocked');
    const completedCount = completedSteps.length;
    const pctComplete = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

    // Days since project start
    const daysSinceStart = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // Current phase: the phase of the first uncompleted step
    const firstUncompleted = steps.find((s) => s.status !== 'completed');
    const currentPhase = firstUncompleted ? firstUncompleted.phase : 2;
    const currentPhaseName = phaseNames[currentPhase]?.name ?? 'Unknown';

    // Next deadline
    const nextDeadlineStep = steps.find((s) => s.status !== 'completed');
    let nextDeadlineDate: Date | null = null;
    if (nextDeadlineStep) {
      const weekDate = getWeekDate(start, nextDeadlineStep.week);
      weekDate.setDate(weekDate.getDate() + nextDeadlineStep.durationDays);
      nextDeadlineDate = weekDate;
    }

    // This week's steps: find the current week number
    const currentWeekNumber = Math.max(1, Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1);
    const thisWeekSteps = steps.filter((s) => {
      const stepStart = s.week;
      const stepEndWeek = s.week + Math.ceil(s.durationDays / 7);
      return currentWeekNumber >= stepStart && currentWeekNumber <= stepEndWeek;
    });
    const meetingsThisWeek = thisWeekSteps.filter((s) => s.type === 'meeting');
    const commsThisWeek = thisWeekSteps.filter((s) => s.type === 'pr');
    const blockedThisWeek = thisWeekSteps.filter((s) => s.status === 'blocked');

    // Next 3 uncompleted steps
    const nextThree = steps.filter((s) => s.status !== 'completed').slice(0, 3);

    // Recent completed (last 5)
    const recentCompleted = [...completedSteps].reverse().slice(0, 5);

    // Phase progress
    const phaseProgress = [0, 1, 2].map((phase) => {
      const phaseSteps = steps.filter((s) => s.phase === phase);
      const phaseCompleted = phaseSteps.filter((s) => s.status === 'completed').length;
      const phasePct = phaseSteps.length > 0 ? Math.round((phaseCompleted / phaseSteps.length) * 100) : 0;
      return {
        phase,
        name: phaseNames[phase].name,
        color: phaseNames[phase].color,
        description: phaseNames[phase].description,
        completed: phaseCompleted,
        total: phaseSteps.length,
        pct: phasePct,
      };
    });

    // Chart data for phase progress
    const phaseChartData = phaseProgress.map((p) => ({
      name: `Phase ${p.phase}`,
      completed: p.pct,
      color: p.color,
    }));

    return {
      totalSteps,
      completedCount,
      pctComplete,
      daysSinceStart,
      currentPhase,
      currentPhaseName,
      nextDeadlineStep,
      nextDeadlineDate,
      currentWeekNumber,
      thisWeekSteps,
      meetingsThisWeek,
      commsThisWeek,
      blockedThisWeek,
      blockedSteps,
      nextThree,
      recentCompleted,
      phaseProgress,
      phaseChartData,
    };
  }, [steps, start, today]);

  const getStepDate = (step: WorkflowStep): string => {
    const weekDate = getWeekDate(start, step.week);
    return formatDate(weekDate);
  };

  const getStepEndDate = (step: WorkflowStep): string => {
    const weekDate = getWeekDate(start, step.week);
    weekDate.setDate(weekDate.getDate() + step.durationDays);
    return formatDate(weekDate);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <span
          className="page-badge"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            color: '#fff',
          }}
        >
          Mission Control
        </span>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Radio size={28} style={{ color: 'var(--accent-light)' }} />
          Mission Control
        </h1>
        <p>Your daily command center. Everything happening across the Digital District, at a glance.</p>
      </div>

      {/* Section 1: Today's Status Bar */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card), color-mix(in srgb, var(--accent-light) 8%, var(--bg-card)))',
          marginBottom: '1.5rem',
        }}
      >
        <div className="grid-4">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Current Phase
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: phaseNames[computed.currentPhase]?.color }}>
              {computed.currentPhaseName}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {computed.pctComplete}% complete
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Project Day
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-light)' }}>
              {computed.daysSinceStart > 0 ? `Day ${computed.daysSinceStart}` : `T-${Math.abs(computed.daysSinceStart)} days`}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              since {formatDate(start)}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Steps Done
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>
              {computed.completedCount} / {computed.totalSteps}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {computed.totalSteps - computed.completedCount} remaining
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Next Deadline
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--warning)' }}>
              {computed.nextDeadlineDate ? formatDate(computed.nextDeadlineDate) : 'None'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {computed.nextDeadlineStep?.title ? computed.nextDeadlineStep.title.slice(0, 30) + (computed.nextDeadlineStep.title.length > 30 ? '...' : '') : 'All done'}
            </div>
          </div>
        </div>
        {/* Overall progress bar */}
        <div style={{ marginTop: '1rem' }}>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${computed.pctComplete}%`, background: 'var(--accent-light)' }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: This Week + What's Next */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>

        {/* Section 2: This Week */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Calendar size={18} style={{ color: 'var(--accent-light)' }} />
            This Week
            <span className="tag tag-blue" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>
              Week {computed.currentWeekNumber}
            </span>
          </h3>

          {computed.thisWeekSteps.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {computed.daysSinceStart < 0
                ? `Project starts ${formatDate(start)}. ${Math.abs(computed.daysSinceStart)} days to go.`
                : 'No tasks scheduled this week.'}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {computed.thisWeekSteps.map((step) => {
                const cfg = typeConfig[step.type];
                const Icon = cfg.icon;
                return (
                  <div
                    key={step.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      background: 'var(--bg)',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <Icon size={14} style={{ color: cfg.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontWeight: 500 }}>{step.title}</span>
                    <span
                      className={`tag ${
                        step.status === 'completed' ? 'tag-green' :
                        step.status === 'blocked' ? 'tag-red' :
                        step.status === 'in_progress' ? 'tag-yellow' : 'tag-blue'
                      }`}
                      style={{ fontSize: '0.65rem' }}
                    >
                      {step.status === 'not_started' ? 'To Do' :
                       step.status === 'in_progress' ? 'Active' :
                       step.status === 'completed' ? 'Done' : 'Blocked'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Summary row */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--purple)' }}>
              <Users size={13} />
              {computed.meetingsThisWeek.length} meetings
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--pink)' }}>
              <Megaphone size={13} />
              {computed.commsThisWeek.length} comms
            </div>
            {computed.blockedThisWeek.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--danger)' }}>
                <AlertTriangle size={13} />
                {computed.blockedThisWeek.length} blocked
              </div>
            )}
          </div>
        </div>

        {/* Section 3: What's Next */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Target size={18} style={{ color: 'var(--warning)' }} />
            What's Next
          </h3>

          {computed.nextThree.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All steps complete.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {computed.nextThree.map((step, i) => {
                const cfg = typeConfig[step.type];
                const Icon = cfg.icon;
                return (
                  <div
                    key={step.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: 'var(--bg)',
                      border: `1px solid ${i === 0 ? cfg.color : 'var(--border)'}`,
                      borderLeftWidth: '3px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <Icon size={14} style={{ color: cfg.color }} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', flex: 1 }}>{step.title}</span>
                      {i === 0 && (
                        <span className="tag tag-yellow" style={{ fontSize: '0.6rem' }}>UP NEXT</span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      {step.owner} &middot; {getStepDate(step)} &ndash; {getStepEndDate(step)}
                    </div>
                    {step.linkedTool && (
                      <Link
                        to={step.linkedTool}
                        className="btn btn-sm btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', marginTop: '0.25rem' }}
                      >
                        Open Tool <ChevronRight size={12} />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Section 4 + 5: Stakeholder Pulse + Phase Progress */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>

        {/* Section 4: Stakeholder Pulse */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Eye size={18} style={{ color: 'var(--cyan)' }} />
            Stakeholder Pulse
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'color-mix(in srgb, var(--danger) 8%, var(--bg))',
                border: '1px solid color-mix(in srgb, var(--danger) 20%, var(--border))',
              }}
            >
              <AlertTriangle size={18} style={{ color: 'var(--danger)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>3 stakeholders overdue for follow-up</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last contacted 14+ days ago</div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'color-mix(in srgb, var(--warning) 8%, var(--bg))',
                border: '1px solid color-mix(in srgb, var(--warning) 20%, var(--border))',
              }}
            >
              <Clock size={18} style={{ color: 'var(--warning)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>2 stakeholders need contact this week</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scheduled outreach pending</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
              <Link to="/stakeholders" className="btn btn-sm btn-primary" style={{ fontSize: '0.8rem' }}>
                Open Tracker <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Section 5: Phase Progress */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <BarChart3 size={18} style={{ color: 'var(--accent-light)' }} />
            Phase Progress
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {computed.phaseProgress.map((p) => (
              <div key={p.phase}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    <span style={{ color: p.color }}>Phase {p.phase}:</span> {p.name}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {p.completed}/{p.total} ({p.pct}%)
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${p.pct}%`, background: p.color }}
                  />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {p.description}
                </div>
              </div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div style={{ marginTop: '1rem', height: '100px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={computed.phaseChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} hide />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.8rem' }}
                  formatter={(value) => [`${value}%`, 'Complete']}
                />
                <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
                  {computed.phaseChartData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section 6: Recent Activity Feed */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Activity size={18} style={{ color: 'var(--success)' }} />
          Recent Activity
        </h3>

        {computed.recentCompleted.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No completed steps yet. Activity will appear here as you make progress.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {computed.recentCompleted.map((step) => {
              const cfg = typeConfig[step.type];
              const Icon = cfg.icon;
              return (
                <div
                  key={step.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <CheckCircle2 size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />
                  <Icon size={14} style={{ color: cfg.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: '0.85rem', fontWeight: 500 }}>{step.title}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{step.owner}</span>
                  <span className="tag tag-green" style={{ fontSize: '0.65rem' }}>Done</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 7: Quick Actions */}
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Zap size={18} style={{ color: 'var(--warning)' }} />
          Quick Actions
        </h3>

        <div className="grid-3" style={{ gap: '0.75rem' }}>
          <Link to="/workflow" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
            <Calendar size={16} />
            Prep Next Meeting
          </Link>
          <Link to="/messaging" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
            <MessageSquare size={16} />
            Generate Pitch
          </Link>
          <Link to="/stakeholders" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
            <Users size={16} />
            Update Stakeholders
          </Link>
          <Link to="/communications" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
            <FileText size={16} />
            Draft Press Release
          </Link>
          <Link to="/presentations" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
            <Presentation size={16} />
            Build Presentation
          </Link>
          <Link to="/workflow" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem' }}>
            <TrendingUp size={16} />
            View Full Workflow
          </Link>
        </div>
      </div>
    </div>
  );
}
