import { useState } from 'react';
import { audiences, pitchTemplates } from '../data/messaging';
import { Copy, Check } from 'lucide-react';

export default function Messaging() {
  const [audience, setAudience] = useState('universal-30');
  const [city, setCity] = useState('St. Louis');
  const [district, setDistrict] = useState('Cortex');
  const [corridor, setCorridor] = useState('Delmar Boulevard');
  const [area, setArea] = useState('North St. Louis');
  const [copied, setCopied] = useState(false);

  const template = pitchTemplates[audience] || '';
  const message = template
    .replace(/\{city\}/g, city)
    .replace(/\{district\}/g, district)
    .replace(/\{corridor\}/g, corridor)
    .replace(/\{area\}/g, area);

  const audienceObj = audiences.find((a) => a.id === audience);
  const categories = [...new Set(audiences.map((a) => a.category))];

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Tier 2</span>
        <h1>Stakeholder Messaging Generator</h1>
        <p>Generate customized elevator pitches for any audience. Fill in your city details and select an audience.</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className="card">
            <h3>City Details</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>City Name</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Innovation District</label>
                <input value={district} onChange={(e) => setDistrict(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Target Corridor</label>
                <input value={corridor} onChange={(e) => setCorridor(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Underserved Area</label>
                <input value={area} onChange={(e) => setArea(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Select Audience</h3>
            {categories.map((cat) => (
              <div key={cat} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                  {cat}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {audiences
                    .filter((a) => a.category === cat)
                    .map((a) => (
                      <button
                        key={a.id}
                        className={`btn btn-sm ${audience === a.id ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setAudience(a.id)}
                      >
                        {a.label}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'sticky', top: 32 }}>
          <div className="card">
            <div className="card-header">
              <div>
                <h3 style={{ marginBottom: 0 }}>Generated Message</h3>
                <span className="tag tag-purple" style={{ marginTop: 4 }}>
                  {audienceObj?.category} — {audienceObj?.label}
                </span>
              </div>
              <button className="btn btn-sm btn-secondary" onClick={handleCopy}>
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
            <div className="message-output">{message}</div>
          </div>

          <div className="card">
            <h3>Usage Tips</h3>
            <ul style={{ fontSize: 13, color: 'var(--text-muted)', paddingLeft: 16, lineHeight: 2 }}>
              <li>Customize the city details for your locale</li>
              <li>30-second pitches work for hallway conversations</li>
              <li>60-second pitches work for meetings and introductions</li>
              <li>2-minute pitches work for presentations and panels</li>
              <li>Always lead with the audience's interests, not your own</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
