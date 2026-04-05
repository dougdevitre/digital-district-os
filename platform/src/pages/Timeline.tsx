import { useState } from 'react';
import { workflowSteps, phaseNames, getWeekDate, formatDate } from '../data/workflow';
import { Calendar, Filter } from 'lucide-react';

const TOTAL_WEEKS = Math.max(80, ...workflowSteps.map((s) => s.week + Math.ceil(s.durationDays / 7)));
const ROW_HEIGHT = 36;

const typeColors: Record<string, string> = {
  task: '#3b82f6',
  meeting: '#8b5cf6',
  presentation: '#06b6d4',
  pr: '#ec4899',
  milestone: '#10b981',
};

const typeLabels: Record<string, string> = {
  task: 'Task',
  meeting: 'Meeting',
  presentation: 'Presentation',
  pr: 'PR / Comms',
  milestone: 'Milestone',
};

export default function Timeline() {
  const [startDate, setStartDate] = useState('2026-05-01');
  const [filterOwner, setFilterOwner] = useState('all');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const start = new Date(startDate + 'T00:00:00');

  const phases = Object.entries(phaseNames).map(([key, val]) => ({
    num: Number(key),
    ...val,
  }));

  const allOwners = Array.from(new Set(workflowSteps.map((s) => s.owner))).sort();

  const filteredSteps = workflowSteps.filter((s) => {
    if (filterOwner !== 'all' && s.owner !== filterOwner) return false;
    return true;
  });

  // Summary stats
  const totalTasks = workflowSteps.filter((s) => s.type === 'task').length;
  const meetingsCount = workflowSteps.filter((s) => s.type === 'meeting').length;
  const presentationsCount = workflowSteps.filter((s) => s.type === 'presentation').length;

  // Today marker
  const today = new Date();
  const diffMs = today.getTime() - start.getTime();
  const todayWeek = diffMs / (7 * 24 * 60 * 60 * 1000);
  const showTodayMarker = todayWeek >= 0 && todayWeek <= TOTAL_WEEKS;
  const todayPercent = (todayWeek / TOTAL_WEEKS) * 100;

  // Selected task details
  const selectedStep = selectedTask ? workflowSteps.find((s) => s.id === selectedTask) : null;

  // Week markers (every 4 weeks)
  const weekMarkers: number[] = [];
  for (let w = 0; w <= TOTAL_WEEKS; w += 4) {
    weekMarkers.push(w);
  }

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Planning</span>
        <h1>Project Timeline</h1>
        <p>Visual Gantt chart of every task, meeting, and milestone across all phases of your Digital District deployment.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-value">{TOTAL_WEEKS}</div>
          <div className="stat-label">Total Weeks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: typeColors.task }}>{totalTasks}</div>
          <div className="stat-label">Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: typeColors.meeting }}>{meetingsCount}</div>
          <div className="stat-label">Meetings</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: typeColors.presentation }}>{presentationsCount}</div>
          <div className="stat-label">Presentations</div>
        </div>
      </div>

      {/* Controls */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label><Calendar size={14} style={{ verticalAlign: -2, marginRight: 4 }} />Project Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: 180 }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label><Filter size={14} style={{ verticalAlign: -2, marginRight: 4 }} />Filter by Owner</label>
            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value)}
              style={{ width: 220 }}
            >
              <option value="all">All Owners</option>
              {allOwners.map((owner) => (
                <option key={owner} value={owner}>{owner}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' }}>Legend:</span>
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 16,
                height: 10,
                borderRadius: 3,
                background: color,
              }} />
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{typeLabels[type]}</span>
            </div>
          ))}
          {showTodayMarker && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 2,
                height: 14,
                background: '#ef4444',
              }} />
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Today</span>
            </div>
          )}
        </div>
      </div>

      {/* Gantt Chart */}
      {phases.map((phase) => {
        const phaseSteps = filteredSteps.filter((s) => s.phase === phase.num);
        if (phaseSteps.length === 0) return null;

        return (
          <div key={phase.num} style={{ marginBottom: 32 }}>
            {/* Phase Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `${phase.color}22`,
                color: phase.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}>
                {phase.num}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                Phase {phase.num}: {phase.name}
              </div>
            </div>

            {/* Gantt Section */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Week Header */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{
                  width: 200,
                  minWidth: 200,
                  padding: '8px 12px',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  color: 'var(--text-muted)',
                  borderRight: '1px solid var(--border)',
                  background: 'var(--bg)',
                }}>
                  Task
                </div>
                <div style={{
                  flex: 1,
                  position: 'relative',
                  minWidth: 600,
                  height: 32,
                  background: 'var(--bg)',
                }}>
                  {weekMarkers.map((w) => (
                    <div key={w} style={{
                      position: 'absolute',
                      left: `${(w / TOTAL_WEEKS) * 100}%`,
                      top: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 4,
                      fontSize: 10,
                      color: 'var(--text-muted)',
                      borderLeft: '1px solid var(--border)',
                    }}>
                      W{w}
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Rows */}
              {phaseSteps.map((step) => {
                const barLeft = (step.week / TOTAL_WEEKS) * 100;
                const durationWeeks = step.durationDays / 7;
                const barWidth = Math.max((durationWeeks / TOTAL_WEEKS) * 100, 1);
                const isSelected = selectedTask === step.id;
                const barColor = typeColors[step.type] || '#6b7280';

                return (
                  <div
                    key={step.id}
                    style={{
                      display: 'flex',
                      borderBottom: '1px solid var(--border)',
                      background: isSelected ? `${barColor}0a` : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                    onClick={() => setSelectedTask(isSelected ? null : step.id)}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                      }
                    }}
                  >
                    {/* Label */}
                    <div style={{
                      width: 200,
                      minWidth: 200,
                      padding: '0 12px',
                      display: 'flex',
                      alignItems: 'center',
                      height: ROW_HEIGHT,
                      borderRight: '1px solid var(--border)',
                      overflow: 'hidden',
                    }}>
                      <span style={{
                        fontSize: 12,
                        fontWeight: isSelected ? 600 : 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: isSelected ? barColor : 'var(--text)',
                      }}>
                        {step.title}
                      </span>
                    </div>

                    {/* Bar Area */}
                    <div style={{
                      flex: 1,
                      position: 'relative',
                      minWidth: 600,
                      height: ROW_HEIGHT,
                    }}>
                      {/* Grid lines */}
                      {weekMarkers.map((w) => (
                        <div key={w} style={{
                          position: 'absolute',
                          left: `${(w / TOTAL_WEEKS) * 100}%`,
                          top: 0,
                          bottom: 0,
                          width: 1,
                          background: 'var(--border)',
                          opacity: 0.5,
                        }} />
                      ))}

                      {/* Today marker */}
                      {showTodayMarker && (
                        <div style={{
                          position: 'absolute',
                          left: `${todayPercent}%`,
                          top: 0,
                          bottom: 0,
                          width: 2,
                          background: '#ef4444',
                          opacity: 0.6,
                          zIndex: 2,
                        }} />
                      )}

                      {/* Task bar */}
                      <div style={{
                        position: 'absolute',
                        left: `${barLeft}%`,
                        width: `${barWidth}%`,
                        top: 6,
                        height: ROW_HEIGHT - 12,
                        background: barColor,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 6,
                        paddingRight: 6,
                        overflow: 'hidden',
                        zIndex: 1,
                        boxShadow: isSelected ? `0 0 0 2px ${barColor}66` : 'none',
                      }}>
                        <span style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: '#fff',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {step.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Task Detail Panel */}
      {selectedStep && (
        <div className="card" style={{
          position: 'sticky',
          bottom: 16,
          marginTop: 24,
          borderLeft: `4px solid ${typeColors[selectedStep.type] || '#6b7280'}`,
          background: 'var(--bg-card)',
          zIndex: 10,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <h3 style={{ margin: 0 }}>{selectedStep.title}</h3>
                <span className="tag" style={{
                  background: `${typeColors[selectedStep.type]}22`,
                  color: typeColors[selectedStep.type],
                }}>
                  {typeLabels[selectedStep.type]}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{selectedStep.description}</p>
            </div>
            <button
              className="btn btn-sm"
              onClick={() => setSelectedTask(null)}
              style={{ flexShrink: 0 }}
            >
              Close
            </button>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, marginBottom: 12 }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Owner: </span>
              <strong>{selectedStep.owner}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Week: </span>
              <strong>{selectedStep.week}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Duration: </span>
              <strong>{selectedStep.durationDays} days</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Start: </span>
              <strong>{formatDate(getWeekDate(start, selectedStep.week))}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>End: </span>
              <strong>{(() => {
                const endDate = new Date(getWeekDate(start, selectedStep.week));
                endDate.setDate(endDate.getDate() + selectedStep.durationDays);
                return formatDate(endDate);
              })()}</strong>
            </div>
          </div>

          {selectedStep.deliverables.length > 0 && (
            <div>
              <div style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: 'var(--text-muted)',
                marginBottom: 6,
              }}>
                Deliverables
              </div>
              <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.8, margin: 0 }}>
                {selectedStep.deliverables.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
