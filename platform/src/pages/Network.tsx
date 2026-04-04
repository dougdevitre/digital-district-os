import { useState } from 'react';
import { peerTopics, cities } from '../data/cities';
import { MessageCircle, Users, TrendingUp } from 'lucide-react';

export default function Network() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'benchmarks' | 'playbook'>('discussions');

  const benchmarks = cities.map((c) => ({
    city: `${c.name}, ${c.state}`,
    eii: c.eiiScore,
    businesses: c.businesses,
    corridors: c.corridors,
    status: c.status,
    conformance: c.conformanceLevel,
  }));

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier3">Tier 3</span>
        <h1>Peer Learning Network</h1>
        <p>Cross-city knowledge sharing, case studies, and benchmarking for Digital District leaders.</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Users size={20} color="var(--accent-light)" />
            <div className="stat-value" style={{ color: 'var(--accent-light)', fontSize: 28 }}>{cities.length}</div>
          </div>
          <div className="stat-label">Cities in Network</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <MessageCircle size={20} color="var(--purple)" />
            <div className="stat-value" style={{ color: 'var(--purple)', fontSize: 28 }}>{peerTopics.length}</div>
          </div>
          <div className="stat-label">Active Discussions</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <TrendingUp size={20} color="var(--success)" />
            <div className="stat-value" style={{ color: 'var(--success)', fontSize: 28 }}>{peerTopics.reduce((s, t) => s + t.replies, 0)}</div>
          </div>
          <div className="stat-label">Total Replies</div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'discussions' ? 'active' : ''}`} onClick={() => setActiveTab('discussions')}>
          Discussions
        </button>
        <button className={`tab ${activeTab === 'benchmarks' ? 'active' : ''}`} onClick={() => setActiveTab('benchmarks')}>
          Benchmarks
        </button>
        <button className={`tab ${activeTab === 'playbook' ? 'active' : ''}`} onClick={() => setActiveTab('playbook')}>
          Replication Playbook
        </button>
      </div>

      {activeTab === 'discussions' && (
        <div>
          {peerTopics.map((topic) => (
            <div key={topic.id} className="card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: 4 }}>{topic.title}</h3>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {topic.author} — {topic.city} — {topic.date}
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {topic.tags.map((tag) => (
                      <span key={tag} className="tag tag-blue">{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13 }}>
                  <MessageCircle size={14} />
                  {topic.replies}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'benchmarks' && (
        <div className="card">
          <h3>Cross-City Benchmarks</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>City</th>
                  <th>EII Score</th>
                  <th>Businesses</th>
                  <th>Corridors</th>
                  <th>Status</th>
                  <th>DDIS Level</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((b) => (
                  <tr key={b.city}>
                    <td style={{ fontWeight: 600 }}>{b.city}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className="progress-fill" style={{
                            width: `${b.eii}%`,
                            background: b.eii >= 60 ? 'var(--success)' : b.eii >= 40 ? 'var(--warning)' : 'var(--danger)',
                          }} />
                        </div>
                        {b.eii}
                      </div>
                    </td>
                    <td>{b.businesses}</td>
                    <td>{b.corridors}</td>
                    <td><span className={`tag ${b.status === 'pilot' ? 'tag-blue' : 'tag-yellow'}`}>{b.status}</span></td>
                    <td><span className={`tag ${b.conformance >= 2 ? 'tag-green' : 'tag-yellow'}`}>Level {b.conformance}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'playbook' && (
        <div>
          <div className="card">
            <h3>How to Replicate in Your City</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
              Follow these 8 steps to fork and deploy the Digital District model in your city.
            </p>
            {[
              { step: 1, title: 'Fork the Repository', desc: 'Clone digital-district-os to your GitHub org.' },
              { step: 2, title: 'Localize the Framework', desc: 'Replace St. Louis references with your city, corridors, institutions, and demographics.' },
              { step: 3, title: 'Run the Readiness Scorecard', desc: 'Establish your baseline score across all 8 dimensions.' },
              { step: 4, title: 'Choose Your Entry Point', desc: 'Use the decision trees to determine whether to start with infrastructure, community, or policy.' },
              { step: 5, title: 'Deploy Phase 1', desc: 'Follow the Street-to-System playbook on your pilot corridor.' },
              { step: 6, title: 'Publish Your Manifest', desc: 'Create your digital-district.json at your well-known URL.' },
              { step: 7, title: 'Register with the Network', desc: 'Submit your manifest to the Digital District Registry.' },
              { step: 8, title: 'Connect', desc: 'Establish identity federation with at least one other district.' },
            ].map((s) => (
              <div key={s.step} style={{
                display: 'flex', gap: 16, alignItems: 'start',
                padding: '14px 0',
                borderBottom: s.step < 8 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(6, 182, 212, 0.15)', color: 'var(--cyan)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, flexShrink: 0,
                }}>
                  {s.step}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Estimated Time to Replication</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>City Readiness</th>
                    <th>Score</th>
                    <th>Time to Pilot</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="tag tag-green">High</span> Existing tech ecosystem, supportive policy</td>
                    <td>25+</td>
                    <td>3-6 months</td>
                  </tr>
                  <tr>
                    <td><span className="tag tag-yellow">Medium</span> Some infrastructure, willing institutions</td>
                    <td>15-24</td>
                    <td>6-12 months</td>
                  </tr>
                  <tr>
                    <td><span className="tag tag-red">Low</span> Starting from scratch</td>
                    <td>&lt;15</td>
                    <td>12-24 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3>Localization Checklist</h3>
            {[
              'City name, state, and geography updated throughout',
              'Corridor candidates identified and documented',
              'Local Innovation Districts listed as potential nodes',
              'Anchor institutions mapped',
              'Local government structure reflected in governance model',
              'Demographics and equity metrics localized',
              'Funding sources identified (local grants, federal programs, philanthropy)',
              'Community partners identified',
              'Language accessibility needs assessed',
              'Regulatory environment reviewed',
            ].map((item, i) => (
              <div key={i} className="checkbox-item">
                <input type="checkbox" />
                <label style={{ fontSize: 14 }}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
