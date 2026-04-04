import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const neighborhoodData = [
  { name: 'Delmar', businesses: 67, income: 'Below Median' },
  { name: 'Downtown', businesses: 45, income: 'Above Median' },
  { name: 'North City', businesses: 52, income: 'Below Median' },
  { name: 'Tower Grove', businesses: 38, income: 'Below Median' },
  { name: 'Central West End', businesses: 42, income: 'Above Median' },
  { name: 'Cherokee', businesses: 35, income: 'Below Median' },
  { name: 'Grand Center', businesses: 28, income: 'Above Median' },
  { name: 'Bevo Mill', businesses: 35, income: 'Below Median' },
];

const ethnicityData = [
  { name: 'Black/African American', value: 34, color: '#3b82f6' },
  { name: 'White', value: 32, color: '#94a3b8' },
  { name: 'Hispanic/Latino', value: 18, color: '#8b5cf6' },
  { name: 'Asian', value: 9, color: '#06b6d4' },
  { name: 'Other', value: 7, color: '#ec4899' },
];

const ageData = [
  { range: '18-24', count: 42 },
  { range: '25-34', count: 98 },
  { range: '35-44', count: 87 },
  { range: '45-54', count: 62 },
  { range: '55-64', count: 38 },
  { range: '65+', count: 15 },
];

const spotlights = [
  {
    name: 'Maria\'s Kitchen',
    owner: 'Maria Gonzalez',
    neighborhood: 'Cherokee Street',
    description: 'Used AI tools to create a marketing plan and online ordering system. Revenue up 40% in 3 months.',
  },
  {
    name: 'TechBridge Consulting',
    owner: 'James Washington',
    neighborhood: 'North City',
    description: 'Launched an IT consulting business using DD proposal and contract generators. Now employs 3 people.',
  },
  {
    name: 'Artful Living Design',
    owner: 'Sarah Chen',
    neighborhood: 'Tower Grove',
    description: 'Interior design studio that used the AI marketing tools to build a client pipeline. Booked 6 months out.',
  },
];

export default function CommunityDashboard() {
  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Tier 2</span>
        <h1>Community Dashboard</h1>
        <p>Public-facing impact metrics showing how the Digital District is serving every neighborhood.</p>
      </div>

      {/* Hero Stat */}
      <div className="card" style={{ textAlign: 'center', padding: 40, marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>Economic Inclusion Index</p>
        <div style={{
          fontSize: 80, fontWeight: 800, lineHeight: 1,
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>67</div>
        <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '16px auto 0', fontSize: 14 }}>
          Our Digital District scores 67 out of 100 on economic inclusion. This measures whether
          business creation, revenue, and opportunities are reaching every neighborhood equitably.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>342</div>
          <div className="stat-label">Businesses Created</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--purple)' }}>89</div>
          <div className="stat-label">Jobs Created</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--cyan)' }}>43%</div>
          <div className="stat-label">In Underserved Areas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-light)' }}>890</div>
          <div className="stat-label">Active Users</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h3>Businesses by Neighborhood</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={neighborhoodData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={100} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
              <Bar dataKey="businesses" radius={[0, 4, 4, 0]}>
                {neighborhoodData.map((entry, i) => (
                  <Cell key={i} fill={entry.income === 'Below Median' ? '#3b82f6' : '#1e293b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, justifyContent: 'center' }}>
            <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, background: '#3b82f6' }} /> Below Median Income
            </span>
            <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: 2, background: '#1e293b', border: '1px solid #94a3b8' }} /> Above Median Income
            </span>
          </div>
        </div>

        <div className="card">
          <h3>Founder Demographics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ethnicityData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value"
                   label={({ name, value }) => `${name}: ${value}%`}>
                {ethnicityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h3>Entrepreneurs by Age</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="range" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8 }} />
              <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Business Spotlights</h3>
          {spotlights.map((s, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < spotlights.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.owner} — {s.neighborhood}</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>{s.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Join */}
      <div className="card">
        <h3>Join the Digital District</h3>
        <div className="grid-3" style={{ textAlign: 'center' }}>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--accent-light)' }}>1</div>
            <p style={{ fontWeight: 600, marginTop: 8 }}>Sign Up Free</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Create your digital identity in minutes. No fees, no expertise required.</p>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--purple)' }}>2</div>
            <p style={{ fontWeight: 600, marginTop: 8 }}>Get AI Tools</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Instant access to business planning, marketing, legal, and financial AI tools.</p>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--success)' }}>3</div>
            <p style={{ fontWeight: 600, marginTop: 8 }}>Grow Your Business</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Get listed in the directory, connect with mentors, and track your growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
