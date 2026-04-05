import { useState } from 'react';
import { UserPlus, Users, Target, Star, AlertCircle } from 'lucide-react';

interface Stakeholder {
  id: number;
  name: string;
  organization: string;
  role: string;
  category: 'Government' | 'Institution' | 'Investor' | 'Community' | 'Media';
  influence: number;
  interest: number;
  status: 'Not Contacted' | 'Scheduled' | 'Briefed' | 'Champion' | 'Opposed';
  notes: string;
  nextActionDate: string;
}

const initialStakeholders: Stakeholder[] = [
  {
    id: 1,
    name: 'Mayor Sarah Chen',
    organization: 'City of St. Louis',
    role: 'Mayor',
    category: 'Government',
    influence: 5,
    interest: 4,
    status: 'Briefed',
    notes: 'Supportive of innovation districts. Wants to see equity metrics.',
    nextActionDate: '2026-04-10',
  },
  {
    id: 2,
    name: 'Dr. James Walker',
    organization: 'Washington University',
    role: 'VP Research',
    category: 'Institution',
    influence: 4,
    interest: 5,
    status: 'Champion',
    notes: 'Actively promoting DD in university circles. Exploring joint research grants.',
    nextActionDate: '2026-04-08',
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    organization: 'Urban League',
    role: 'Director',
    category: 'Community',
    influence: 4,
    interest: 5,
    status: 'Champion',
    notes: 'Key advocate for community inclusion. Connected to neighborhood leaders.',
    nextActionDate: '2026-04-07',
  },
  {
    id: 4,
    name: 'Mark Thompson',
    organization: 'Midwest Ventures',
    role: 'Regional VC Partner',
    category: 'Investor',
    influence: 3,
    interest: 4,
    status: 'Scheduled',
    notes: 'Meeting scheduled to discuss seed investment in DD startups.',
    nextActionDate: '2026-04-12',
  },
  {
    id: 5,
    name: 'Jennifer Lee',
    organization: 'St. Louis Post-Dispatch',
    role: 'Technology Reporter',
    category: 'Media',
    influence: 3,
    interest: 3,
    status: 'Not Contacted',
    notes: 'Covers local tech ecosystem. Could amplify launch story.',
    nextActionDate: '2026-04-15',
  },
  {
    id: 6,
    name: 'Robert Kim',
    organization: 'Cortex Innovation Community',
    role: 'CEO',
    category: 'Institution',
    influence: 5,
    interest: 3,
    status: 'Briefed',
    notes: 'Interested in co-location opportunities. Wants data on economic impact.',
    nextActionDate: '2026-04-11',
  },
];

const emptyForm: Omit<Stakeholder, 'id'> = {
  name: '',
  organization: '',
  role: '',
  category: 'Government',
  influence: 3,
  interest: 3,
  status: 'Not Contacted',
  notes: '',
  nextActionDate: '',
};

const categoryColors: Record<string, string> = {
  Government: 'var(--accent)',
  Institution: 'var(--purple)',
  Investor: 'var(--success)',
  Community: 'var(--pink)',
  Media: 'var(--cyan)',
};

const statusColors: Record<string, string> = {
  'Not Contacted': 'var(--text-muted)',
  Scheduled: 'var(--warning)',
  Briefed: 'var(--accent)',
  Champion: 'var(--success)',
  Opposed: 'var(--danger)',
};

type SortKey = 'name' | 'organization' | 'category' | 'influence' | 'interest' | 'status';

export default function Stakeholders() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(initialStakeholders);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Stakeholder, 'id'>>(emptyForm);
  const [sortKey, setSortKey] = useState<SortKey>('influence');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...stakeholders].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const addStakeholder = () => {
    if (!form.name.trim()) return;
    setStakeholders((prev) => [
      ...prev,
      { ...form, id: Date.now() },
    ]);
    setForm(emptyForm);
    setShowForm(false);
  };

  // Quadrant helpers
  const getQuadrant = (s: Stakeholder) => {
    if (s.influence >= 3 && s.interest >= 3) return 'Manage Closely';
    if (s.influence >= 3 && s.interest < 3) return 'Keep Satisfied';
    if (s.influence < 3 && s.interest >= 3) return 'Keep Informed';
    return 'Monitor';
  };

  const quadrants = [
    { label: 'Manage Closely', desc: 'High Influence / High Interest', color: 'var(--danger)' },
    { label: 'Keep Satisfied', desc: 'High Influence / Low Interest', color: 'var(--warning)' },
    { label: 'Keep Informed', desc: 'Low Influence / High Interest', color: 'var(--accent)' },
    { label: 'Monitor', desc: 'Low Influence / Low Interest', color: 'var(--text-muted)' },
  ];

  // Summary stats
  const totalCount = stakeholders.length;
  const championsCount = stakeholders.filter((s) => s.status === 'Champion').length;
  const briefedCount = stakeholders.filter((s) => s.status === 'Briefed').length;
  const notContactedCount = stakeholders.filter((s) => s.status === 'Not Contacted').length;

  // Timeline: sort by nextActionDate
  const timeline = [...stakeholders]
    .filter((s) => s.nextActionDate)
    .sort((a, b) => a.nextActionDate.localeCompare(b.nextActionDate));

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    color: 'var(--text)',
    fontSize: 14,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-muted)',
    marginBottom: 4,
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Stakeholder Management</span>
        <h1>Stakeholder Engagement Tracker</h1>
        <p>Map, track, and coordinate engagement with every stakeholder needed to make your Digital District a reality.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Users size={18} style={{ color: 'var(--accent)' }} />
            <span className="stat-label">Total Stakeholders</span>
          </div>
          <div className="stat-number">{totalCount}</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Star size={18} style={{ color: 'var(--success)' }} />
            <span className="stat-label">Champions</span>
          </div>
          <div className="stat-number" style={{ color: 'var(--success)' }}>{championsCount}</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Target size={18} style={{ color: 'var(--accent)' }} />
            <span className="stat-label">Briefed</span>
          </div>
          <div className="stat-number" style={{ color: 'var(--accent)' }}>{briefedCount}</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <AlertCircle size={18} style={{ color: 'var(--warning)' }} />
            <span className="stat-label">Not Yet Contacted</span>
          </div>
          <div className="stat-number" style={{ color: 'var(--warning)' }}>{notContactedCount}</div>
        </div>
      </div>

      {/* Add Stakeholder Button / Form */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Stakeholder Registry</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <UserPlus size={16} />
            {showForm ? 'Cancel' : 'Add Stakeholder'}
          </button>
        </div>

        {showForm && (
          <div style={{ padding: '16px 20px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input
                  style={inputStyle}
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Organization</label>
                <input
                  style={inputStyle}
                  placeholder="Organization"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <input
                  style={inputStyle}
                  placeholder="Title / role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Category</label>
                <select
                  style={inputStyle}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Stakeholder['category'] })}
                >
                  <option>Government</option>
                  <option>Institution</option>
                  <option>Investor</option>
                  <option>Community</option>
                  <option>Media</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Influence (1-5)</label>
                <select
                  style={inputStyle}
                  value={form.influence}
                  onChange={(e) => setForm({ ...form, influence: Number(e.target.value) })}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Interest (1-5)</label>
                <select
                  style={inputStyle}
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: Number(e.target.value) })}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select
                  style={inputStyle}
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Stakeholder['status'] })}
                >
                  <option>Not Contacted</option>
                  <option>Scheduled</option>
                  <option>Briefed</option>
                  <option>Champion</option>
                  <option>Opposed</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Next Action Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={form.nextActionDate}
                  onChange={(e) => setForm({ ...form, nextActionDate: e.target.value })}
                />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }}
                placeholder="Key context, goals, sensitivities..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" onClick={addStakeholder}>
              Add Stakeholder
            </button>
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {([
                  ['name', 'Name'],
                  ['organization', 'Organization'],
                  ['category', 'Category'],
                  ['influence', 'Influence'],
                  ['interest', 'Interest'],
                  ['status', 'Status'],
                ] as [SortKey, string][]).map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: sortKey === key ? 'var(--accent)' : 'var(--text-muted)',
                      fontWeight: 600,
                      fontSize: 12,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      userSelect: 'none',
                    }}
                  >
                    {label} {sortKey === key ? (sortAsc ? '\u2191' : '\u2193') : ''}
                  </th>
                ))}
                <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Next Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                    {s.name}
                    {s.role && (
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>{s.role}</div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>{s.organization}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                      background: categoryColors[s.category] + '22',
                      color: categoryColors[s.category],
                    }}>
                      {s.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: n <= s.influence ? 'var(--accent)' : 'var(--border)',
                          }}
                        />
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div
                          key={n}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: n <= s.interest ? 'var(--purple)' : 'var(--border)',
                          }}
                        />
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 10px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600,
                      background: statusColors[s.status] + '22',
                      color: statusColors[s.status],
                    }}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-muted)' }}>
                    {s.nextActionDate || '\u2014'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Influence / Interest Quadrant Grid */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h2>Influence / Interest Map</h2>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}>
            {quadrants.map((q) => {
              const members = stakeholders.filter((s) => getQuadrant(s) === q.label);
              return (
                <div
                  key={q.label}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: 16,
                    background: 'var(--bg)',
                    minHeight: 120,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: q.color }} />
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{q.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                      {q.desc}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {members.length === 0 && (
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>No stakeholders</span>
                    )}
                    {members.map((m) => (
                      <span
                        key={m.id}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '4px 12px',
                          borderRadius: 16,
                          fontSize: 13,
                          fontWeight: 500,
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: categoryColors[m.category],
                        }} />
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(categoryColors).map(([cat, color]) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                {cat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Timeline */}
      <div className="card">
        <div className="card-header">
          <h2>Engagement Timeline</h2>
        </div>
        <div style={{ padding: 20 }}>
          {timeline.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>No upcoming actions scheduled.</p>
          )}
          {timeline.map((s) => {
            const isPast = s.nextActionDate < '2026-04-04';
            const isToday = s.nextActionDate === '2026-04-04';
            return (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div style={{
                  minWidth: 90,
                  fontSize: 13,
                  fontWeight: 600,
                  color: isPast ? 'var(--danger)' : isToday ? 'var(--warning)' : 'var(--text-muted)',
                }}>
                  {isPast ? 'OVERDUE' : isToday ? 'TODAY' : s.nextActionDate}
                </div>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: statusColors[s.status],
                  marginTop: 4,
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {s.name}
                    <span style={{
                      marginLeft: 8,
                      padding: '1px 8px',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      background: statusColors[s.status] + '22',
                      color: statusColors[s.status],
                    }}>
                      {s.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                    {s.organization} &middot; {s.notes}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
