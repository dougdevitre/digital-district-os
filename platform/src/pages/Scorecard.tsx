import { useState } from 'react';
import { dimensions, getStage, getBottleneck } from '../data/scorecard';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';

export default function Scorecard() {
  const [scores, setScores] = useState<number[]>(dimensions.map(() => 0));

  const total = scores.reduce((a, b) => a + b, 0);
  const stage = getStage(total);
  const bottleneck = getBottleneck(scores);

  const radarData = dimensions.map((d, i) => ({
    dimension: d.name.split(' ').slice(0, 2).join(' '),
    score: scores[i],
    fullMark: 5,
  }));

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Tier 1</span>
        <h1>Digital District Readiness Scorecard</h1>
        <p>Rate your city on 8 dimensions (0-5 each). This diagnostic tells you where you stand and what to focus on first.</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          {dimensions.map((dim, idx) => (
            <div className="card" key={dim.id}>
              <h3>Dimension {dim.id}: {dim.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{dim.question}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <input
                  type="range"
                  min={0}
                  max={5}
                  value={scores[idx]}
                  onChange={(e) => {
                    const next = [...scores];
                    next[idx] = Number(e.target.value);
                    setScores(next);
                  }}
                  style={{ flex: 1 }}
                />
                <span style={{
                  fontWeight: 700,
                  fontSize: 24,
                  minWidth: 40,
                  textAlign: 'center',
                  color: scores[idx] === 0 ? 'var(--text-muted)' : scores[idx] <= 2 ? 'var(--danger)' : scores[idx] <= 3 ? 'var(--warning)' : 'var(--success)',
                }}>
                  {scores[idx]}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
                {dim.indicators.map((ind) => (
                  <span key={ind} className="tag tag-blue" style={{ fontSize: 10 }}>{ind}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: 'sticky', top: 32 }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h2>Total Score</h2>
            <div className="score-ring" style={{
              border: `4px solid ${stage.color}`,
              marginTop: 16,
            }}>
              <span className="score-value" style={{ color: stage.color }}>{total}</span>
              <span className="score-max">/ 40</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <span className="tag" style={{
                background: `${stage.color}22`,
                color: stage.color,
                fontSize: 14,
                padding: '6px 16px',
              }}>
                {stage.stage}
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 16, lineHeight: 1.6 }}>
              {stage.action}
            </p>
          </div>

          <div className="card">
            <h3>Radar View</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8, fontSize: 13 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {total > 0 && (
            <div className="card" style={{ borderColor: 'var(--warning)' }}>
              <h3>Bottleneck Analysis</h3>
              <p style={{ fontSize: 13, marginBottom: 8 }}>
                <strong>Weakest dimension:</strong> {bottleneck.dimension} (score: {bottleneck.score})
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{bottleneck.advice}</p>
            </div>
          )}

          <div className="card">
            <h3>Score Breakdown</h3>
            {dimensions.map((dim, idx) => (
              <div key={dim.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {dim.name}
                </span>
                <div className="progress-bar" style={{ width: 100, flexShrink: 0 }}>
                  <div className="progress-fill" style={{
                    width: `${(scores[idx] / 5) * 100}%`,
                    background: scores[idx] <= 2 ? 'var(--danger)' : scores[idx] <= 3 ? 'var(--warning)' : 'var(--success)',
                  }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, width: 20, textAlign: 'right' }}>{scores[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
