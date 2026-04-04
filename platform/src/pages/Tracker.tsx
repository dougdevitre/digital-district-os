import { useState } from 'react';
import { phases } from '../data/phases';
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

export default function Tracker() {
  const [phaseData, setPhaseData] = useState(phases);
  const [expandedPhase, setExpandedPhase] = useState(1);
  const [expandedWorkstreams, setExpandedWorkstreams] = useState<Record<string, boolean>>({});

  const toggleCriteria = (phaseId: number, criteriaId: string) => {
    setPhaseData((prev) =>
      prev.map((p) =>
        p.id === phaseId
          ? {
              ...p,
              exitCriteria: p.exitCriteria.map((c) =>
                c.id === criteriaId ? { ...c, checked: !c.checked } : c
              ),
            }
          : p
      )
    );
  };

  const toggleWorkstream = (key: string) => {
    setExpandedWorkstreams((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Tier 1</span>
        <h1>Implementation Tracker</h1>
        <p>Track your progress through all 4 phases of Digital District deployment.</p>
      </div>

      {/* Phase overview cards */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {phaseData.map((phase) => {
          const completed = phase.exitCriteria.filter((c) => c.checked).length;
          const total = phase.exitCriteria.length;
          const pct = total > 0 ? (completed / total) * 100 : 0;
          return (
            <div
              key={phase.id}
              className="stat-card"
              style={{
                cursor: 'pointer',
                borderColor: expandedPhase === phase.id ? 'var(--accent)' : undefined,
              }}
              onClick={() => setExpandedPhase(phase.id)}
            >
              <div className="stat-label" style={{ marginBottom: 4 }}>Phase {phase.id}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{phase.name}</div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${pct}%`,
                    background: pct === 100 ? 'var(--success)' : 'var(--accent)',
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                {completed}/{total} criteria
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded phase detail */}
      {phaseData
        .filter((p) => p.id === expandedPhase)
        .map((phase) => (
          <div key={phase.id}>
            <div className="card">
              <div className="card-header">
                <div>
                  <h2>Phase {phase.id}: {phase.name}</h2>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{phase.subtitle}</p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span className="tag tag-blue">{phase.duration}</span>
                  <span className="tag tag-purple">{phase.budgetLow} - {phase.budgetHigh}</span>
                </div>
              </div>
            </div>

            {/* Exit Criteria */}
            <div className="card">
              <h3>Exit Criteria</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                All must be true to proceed to Phase {phase.id + 1}.
              </p>
              {phase.exitCriteria.map((criteria) => (
                <div
                  key={criteria.id}
                  className={`checkbox-item ${criteria.checked ? 'checked' : ''}`}
                  onClick={() => toggleCriteria(phase.id, criteria.id)}
                >
                  {criteria.checked
                    ? <CheckCircle2 size={18} color="var(--success)" />
                    : <Circle size={18} color="var(--text-muted)" />
                  }
                  <label style={{ cursor: 'pointer', fontSize: 14 }}>{criteria.text}</label>
                </div>
              ))}
            </div>

            {/* Workstreams */}
            <div className="card">
              <h3>Workstreams</h3>
              {phase.workstreams.map((ws) => {
                const key = `${phase.id}-${ws.name}`;
                const isOpen = expandedWorkstreams[key] ?? false;
                return (
                  <div className="accordion-item" key={key}>
                    <div className="accordion-header" onClick={() => toggleWorkstream(key)}>
                      <span>{ws.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="tag tag-blue">{ws.tasks.length} tasks</span>
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="accordion-body">
                        <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
                          {ws.tasks.map((task, i) => (
                            <li key={i} style={{ fontSize: 14 }}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
}
