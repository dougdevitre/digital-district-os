import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const eiiHistory = [
  { month: 'Oct', score: 42 }, { month: 'Nov', score: 48 }, { month: 'Dec', score: 53 },
  { month: 'Jan', score: 57 }, { month: 'Feb', score: 62 }, { month: 'Mar', score: 67 },
];

const businessFormation = [
  { month: 'Oct', businesses: 32 }, { month: 'Nov', businesses: 48 },
  { month: 'Dec', businesses: 61 }, { month: 'Jan', businesses: 87 },
  { month: 'Feb', businesses: 105 }, { month: 'Mar', businesses: 142 },
];

const equityData = [
  { name: 'Below Median Income', value: 43, color: '#3b82f6' },
  { name: 'Above Median Income', value: 57, color: '#1e293b' },
];

const diversityData = [
  { name: 'Minority Founders', value: 51, color: '#8b5cf6' },
  { name: 'Women Founders', value: 38, color: '#ec4899' },
  { name: 'Other', value: 11, color: '#1e293b' },
];

const corridorData = [
  { name: 'Delmar', businesses: 142, users: 890, wifi: 94 },
  { name: 'Cherokee', businesses: 67, users: 340, wifi: 78 },
  { name: 'Grand', businesses: 45, users: 210, wifi: 65 },
  { name: 'Natural Bridge', businesses: 38, users: 180, wifi: 58 },
  { name: 'S. Grand', businesses: 50, users: 260, wifi: 72 },
];

const aiUsage = [
  { month: 'Oct', sessions: 420 }, { month: 'Nov', sessions: 890 },
  { month: 'Dec', sessions: 1420 }, { month: 'Jan', sessions: 2800 },
  { month: 'Feb', sessions: 4100 }, { month: 'Mar', sessions: 6200 },
];

const infraMetrics = [
  { label: 'Wi-Fi Uptime', value: '99.7%', target: '99.5%', status: 'good' },
  { label: 'API Response (p95)', value: '340ms', target: '500ms', status: 'good' },
  { label: 'API Error Rate', value: '0.3%', target: '1%', status: 'good' },
  { label: 'Identity Availability', value: '99.95%', target: '99.9%', status: 'good' },
  { label: 'Security Incidents', value: '0', target: '0 critical', status: 'good' },
  { label: 'Cloud Cost / User', value: '$3.20', target: '$5.00', status: 'good' },
];

type ViewType = 'executive' | 'operational' | 'community';

export default function Dashboard() {
  const [view, setView] = useState<ViewType>('executive');

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Tier 1</span>
        <h1>Leadership Dashboard</h1>
        <p>Real-time KPIs tracking the Economic Inclusion Index and ecosystem health.</p>
      </div>

      <div className="tabs">
        <button className={`tab ${view === 'executive' ? 'active' : ''}`} onClick={() => setView('executive')}>Executive</button>
        <button className={`tab ${view === 'operational' ? 'active' : ''}`} onClick={() => setView('operational')}>Operational</button>
        <button className={`tab ${view === 'community' ? 'active' : ''}`} onClick={() => setView('community')}>Community</button>
      </div>

      {view === 'executive' && (
        <>
          <div className="grid-4">
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--accent-light)' }}>67</div>
              <div className="stat-label">EII Score</div>
              <div className="stat-trend trend-up">+5 this month</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--success)' }}>342</div>
              <div className="stat-label">Businesses Registered</div>
              <div className="stat-trend trend-up">+37 this month</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--purple)' }}>89</div>
              <div className="stat-label">Jobs Created</div>
              <div className="stat-trend trend-up">+14 this quarter</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--cyan)' }}>1</div>
              <div className="stat-label">Active Corridors</div>
              <div className="stat-trend">4 planned</div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 20 }}>
            <div className="card">
              <h3>Economic Inclusion Index (EII) Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={eiiHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                EII = (Business Formation x 0.25) + (Revenue x 0.25) + (Equity x 0.30) + (Sustainability x 0.20)
              </p>
            </div>

            <div className="card">
              <h3>Business Formation</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={businessFormation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
                  <Bar dataKey="businesses" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 20 }}>
            <div className="card">
              <h3>Equity Distribution</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <ResponsiveContainer width="50%" height={180}>
                  <PieChart>
                    <Pie data={equityData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ value }) => `${value}%`}>
                      {equityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div>
                  <p style={{ fontSize: 13 }}><strong>43%</strong> of businesses in below-median-income neighborhoods</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Target: 40%+</p>
                  <span className="tag tag-green" style={{ marginTop: 8 }}>On Track</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Founder Diversity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <ResponsiveContainer width="50%" height={180}>
                  <PieChart>
                    <Pie data={diversityData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ value }) => `${value}%`}>
                      {diversityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div>
                  <p style={{ fontSize: 13 }}><strong>51%</strong> minority founders</p>
                  <p style={{ fontSize: 13, marginTop: 4 }}><strong>38%</strong> women founders</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Target: 50%+ non-majority</p>
                  <span className="tag tag-green" style={{ marginTop: 8 }}>On Track</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {view === 'operational' && (
        <>
          <div className="grid-3">
            {infraMetrics.map((m) => (
              <div className="stat-card" key={m.label}>
                <div className="stat-value" style={{ color: 'var(--success)', fontSize: 24 }}>{m.value}</div>
                <div className="stat-label">{m.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Target: {m.target}</div>
              </div>
            ))}
          </div>

          <div className="grid-2" style={{ marginTop: 20 }}>
            <div className="card">
              <h3>AI Tool Sessions</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={aiUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4, fill: '#8b5cf6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3>Corridor Performance</h3>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Corridor</th>
                      <th>Businesses</th>
                      <th>Users</th>
                      <th>Wi-Fi %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {corridorData.map((c) => (
                      <tr key={c.name}>
                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                        <td>{c.businesses}</td>
                        <td>{c.users}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="progress-bar" style={{ width: 60 }}>
                              <div className="progress-fill" style={{
                                width: `${c.wifi}%`,
                                background: c.wifi >= 80 ? 'var(--success)' : 'var(--warning)',
                              }} />
                            </div>
                            {c.wifi}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {view === 'community' && (
        <>
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <h2 style={{ marginBottom: 8 }}>Economic Inclusion Index</h2>
            <div style={{
              fontSize: 72, fontWeight: 800, lineHeight: 1,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>67</div>
            <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '16px auto 0' }}>
              This score measures whether our Digital District is delivering equitable economic outcomes
              across all neighborhoods. A score of 100 means perfect economic inclusion.
            </p>
          </div>

          <div className="grid-3" style={{ marginTop: 20 }}>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--success)' }}>342</div>
              <div className="stat-label">Businesses Created</div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                New businesses started using Digital District tools and infrastructure.
              </p>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--purple)' }}>89</div>
              <div className="stat-label">Jobs Created</div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                Full-time equivalent positions created by DD-registered businesses.
              </p>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ color: 'var(--cyan)' }}>890</div>
              <div className="stat-label">Active Users</div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                Residents actively using the Digital District platform this month.
              </p>
            </div>
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <h3>How to Join</h3>
            <div className="grid-3">
              <div style={{ textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>1</div>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Sign Up</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Create your free Digital District identity online.</p>
              </div>
              <div style={{ textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>2</div>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Access Tools</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Get instant access to AI tools, Wi-Fi, and business services.</p>
              </div>
              <div style={{ textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>3</div>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>Start Building</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Launch your business with AI-powered guidance and support.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
