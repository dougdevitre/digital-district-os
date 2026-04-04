import { useState } from 'react';
import { corridorCriteria, getRecommendation } from '../data/corridors';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';

export default function Corridor() {
  const [name, setName] = useState('');
  const [scores, setScores] = useState<number[]>(corridorCriteria.map(() => 1));

  const weightedScore = corridorCriteria.reduce((sum, c, i) => sum + scores[i] * c.weight, 0);
  const recommendation = getRecommendation(weightedScore);

  const weakest = corridorCriteria.reduce((min, _c, i) =>
    scores[i] < scores[min.idx] ? { idx: i, score: scores[i] } : min,
    { idx: 0, score: scores[0] }
  );

  const radarData = corridorCriteria.map((c, i) => ({
    dimension: c.name.split(' ').slice(0, 2).join(' '),
    score: scores[i],
    fullMark: 5,
  }));

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Tier 1</span>
        <h1>Corridor Selector Tool</h1>
        <p>Score candidate corridors on 7 weighted dimensions to find the best location for your Digital Mainstreet.</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className="card">
            <div className="form-group">
              <label>Corridor Name</label>
              <input
                type="text"
                placeholder="e.g., Delmar Boulevard / The Loop"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {corridorCriteria.map((criteria, idx) => (
            <div className="card" key={criteria.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                <div>
                  <h3 style={{ marginBottom: 4 }}>{criteria.name}</h3>
                  <span className="tag tag-purple">Weight: {(criteria.weight * 100)}%</span>
                </div>
                <span style={{
                  fontWeight: 700, fontSize: 24,
                  color: scores[idx] <= 2 ? 'var(--danger)' : scores[idx] <= 3 ? 'var(--warning)' : 'var(--success)',
                }}>
                  {scores[idx]}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{criteria.description}</p>
              <input
                type="range"
                min={1}
                max={5}
                value={scores[idx]}
                onChange={(e) => {
                  const next = [...scores];
                  next[idx] = Number(e.target.value);
                  setScores(next);
                }}
              />
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                {criteria.levels[scores[idx] - 1]}
              </p>
            </div>
          ))}
        </div>

        <div style={{ position: 'sticky', top: 32 }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h2>{name || 'Unnamed Corridor'}</h2>
            <div className="score-ring" style={{
              border: `4px solid ${recommendation.color}`,
              marginTop: 16,
            }}>
              <span className="score-value" style={{ color: recommendation.color }}>{weightedScore.toFixed(2)}</span>
              <span className="score-max">/ 5.00</span>
            </div>
            <p style={{
              fontSize: 14, fontWeight: 600,
              color: recommendation.color,
              marginTop: 8,
            }}>
              {recommendation.text}
            </p>
          </div>

          <div className="card">
            <h3>Radar View</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
                <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ borderColor: 'var(--warning)' }}>
            <h3>Weakest Dimension</h3>
            <p style={{ fontSize: 14, fontWeight: 600 }}>
              {corridorCriteria[weakest.idx].name} (score: {weakest.score})
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
              This must be addressed before proceeding. Low scores in this area can undermine the entire deployment.
            </p>
          </div>

          <div className="card">
            <h3>Disqualifying Factors</h3>
            <ul style={{ fontSize: 13, color: 'var(--text-muted)', paddingLeft: 16, lineHeight: 1.8 }}>
              <li>Active gentrification/displacement occurring</li>
              <li>No community organization willing to partner</li>
              <li>Wi-Fi deployment is cost-prohibitive</li>
              <li>Major construction scheduled in next 18 months</li>
              <li>Institutional politics block cross-sector work</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
