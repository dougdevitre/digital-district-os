import { cities } from '../data/cities';
import { Globe, Shield, Zap } from 'lucide-react';

const conformanceBadge = (level: 1 | 2 | 3) => {
  const config = {
    1: { label: 'Level 1: Observable', class: 'tag-yellow', icon: <Globe size={12} /> },
    2: { label: 'Level 2: Connectable', class: 'tag-blue', icon: <Shield size={12} /> },
    3: { label: 'Level 3: Composable', class: 'tag-green', icon: <Zap size={12} /> },
  };
  const c = config[level];
  return (
    <span className={`tag ${c.class}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      {c.icon} {c.label}
    </span>
  );
};

const statusBadge = (status: string) => {
  const config: Record<string, string> = {
    operational: 'tag-green',
    pilot: 'tag-blue',
    planning: 'tag-yellow',
  };
  return <span className={`tag ${config[status] || 'tag-yellow'}`}>{status}</span>;
};

export default function Directory() {
  const totalBusinesses = cities.reduce((s, c) => s + c.businesses, 0);
  const totalCorridors = cities.reduce((s, c) => s + c.corridors, 0);
  const avgEII = Math.round(cities.reduce((s, c) => s + c.eiiScore, 0) / cities.length);

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier3">Tier 3</span>
        <h1>City Directory & Interoperability Hub</h1>
        <p>Registry of Digital Districts with conformance levels, metrics, and interoperability status per the DDIS v1.0 standard.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--cyan)' }}>{cities.length}</div>
          <div className="stat-label">Districts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{totalBusinesses}</div>
          <div className="stat-label">Total Businesses</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--purple)' }}>{totalCorridors}</div>
          <div className="stat-label">Corridors</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-light)' }}>{avgEII}</div>
          <div className="stat-label">Avg. EII Score</div>
        </div>
      </div>

      <div className="grid-2">
        {cities.map((city) => (
          <div key={city.id} className="city-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h3>{city.name}, {city.state}</h3>
                <div className="city-meta">{city.specialization}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {statusBadge(city.status)}
                {conformanceBadge(city.conformanceLevel)}
              </div>
            </div>

            <div className="grid-3" style={{ marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>EII Score</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent-light)' }}>{city.eiiScore}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Businesses</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--success)' }}>{city.businesses}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Corridors</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{city.corridors}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>Nodes</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {city.nodes.map((node) => (
                  <span key={node.name} className="tag tag-purple">{node.name} ({node.type})</span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--bg)', borderRadius: 8, fontSize: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Manifest</div>
              <code style={{ fontSize: 11, color: 'var(--text-muted)', background: 'none', padding: 0 }}>
                https://{city.name.toLowerCase().replace(/\s/g, '')}.digitaldistrict.city/.well-known/digital-district.json
              </code>
            </div>
          </div>
        ))}
      </div>

      {/* DDIS Standard Info */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3>Conformance Levels (DDIS v1.0)</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Name</th>
                <th>Requirements</th>
                <th>Capability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{conformanceBadge(1)}</td>
                <td style={{ fontWeight: 600 }}>Observable</td>
                <td>Publish district manifest + public API catalog</td>
                <td>"We exist and here's what we offer"</td>
              </tr>
              <tr>
                <td>{conformanceBadge(2)}</td>
                <td style={{ fontWeight: 600 }}>Connectable</td>
                <td>Identity federation + 3+ shared API endpoints</td>
                <td>"Our users can access your services"</td>
              </tr>
              <tr>
                <td>{conformanceBadge(3)}</td>
                <td style={{ fontWeight: 600 }}>Composable</td>
                <td>Full API interop + data sharing + shared metrics</td>
                <td>"Our ecosystems work as one network"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
