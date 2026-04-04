import { useState } from 'react';
import { Copy, Check, FileDown } from 'lucide-react';

export default function Proposal() {
  const [form, setForm] = useState({
    cityName: '',
    stateName: '',
    population: '',
    corridor: '',
    district: '',
    champion: '',
    championTitle: '',
    seedFunding: '$250,000',
    phase1Timeline: '6 months',
    topPriority: 'business-formation',
    anchors: '',
    equityGoal: '40% businesses in underserved neighborhoods',
  });
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const proposal = `
DIGITAL DISTRICT PROPOSAL
${form.cityName ? form.cityName.toUpperCase() : '[CITY NAME]'}, ${form.stateName || '[STATE]'}
${'='.repeat(60)}

EXECUTIVE SUMMARY

${form.cityName || '[City]'} proposes to deploy a Digital District — an AI-powered, cloud-native ecosystem that provides every entrepreneur in the city with instant access to business tools, intelligence, and infrastructure — regardless of neighborhood.

The pilot deployment will center on ${form.corridor || '[corridor name]'}, connecting to ${form.district || '[existing Innovation District]'} and expanding citywide over 24 months.

THE OPPORTUNITY

${form.cityName || '[City]'} has a population of ${form.population || '[population]'} and an existing innovation ecosystem anchored by ${form.district || '[district]'}. However, the benefits of this ecosystem remain geographically concentrated.

A Digital District extends these benefits to every neighborhood through:
  - Community Wi-Fi infrastructure on key corridors
  - AI-powered business tools (planning, legal, marketing, financial)
  - A shared digital identity connecting all city services
  - Open APIs enabling third-party innovation
  - Real-time metrics dashboards tracking equitable outcomes

PROPOSED CORRIDOR: ${(form.corridor || '[CORRIDOR]').toUpperCase()}

The ${form.corridor || '[corridor]'} corridor was selected based on a 7-factor weighted assessment covering cultural identity, transit connectivity, business density, socioeconomic diversity, physical suitability, community trust, and strategic significance.

ANCHOR INSTITUTIONS
${form.anchors || '- [University name]\n- [Hospital/health system]\n- [Innovation district]\n- [Community organization]'}

PHASED IMPLEMENTATION

Phase 1: Street to System (${form.phase1Timeline || '3-6 months'})
  - Deploy corridor Wi-Fi mesh (80%+ coverage)
  - Provision cloud infrastructure (AWS)
  - Deploy identity/auth system
  - Launch 3+ AI business tools
  - Onboard 10+ pilot businesses
  - Establish community advisory board
  Budget: ${form.seedFunding || '$100K-$400K'}

Phase 2: Connect Districts (6-12 months)
  - Link ${form.district || '[district]'} as a specialized node
  - Deploy identity federation (SSO across nodes)
  - Launch 5+ cross-node APIs
  Budget: $180K-$570K

Phase 3: Citywide Layer (12-24 months)
  - Expand Wi-Fi to 5+ corridors
  - Deploy 20+ AI tools across verticals
  - Integrate 5+ municipal services via API
  - Launch application marketplace
  Budget: $1.25M-$4.3M

Phase 4: Enable Entrepreneurs (18-24 months)
  - Zero-friction onboarding pipeline
  - 3+ vertical acceleration tracks
  - AI copilot for entrepreneur guidance
  - 500+ entrepreneurs onboarded
  Budget: $500K-$2M

TOTAL INVESTMENT: $2M-$7.3M over 24 months

For comparison: A single building in a legacy Innovation District typically costs $5M-$50M and serves one neighborhood.

EQUITY COMMITMENT

Goal: ${form.equityGoal || '40% of businesses in underserved neighborhoods'}

Every metric will be disaggregated by:
  - Geography (neighborhood/ward/census tract)
  - Race/ethnicity
  - Gender
  - Income level
  - Age

All metrics will be published on a public dashboard.

SUCCESS METRICS (Year 1 Targets)

  - Businesses registered: 500
  - Time to first revenue: < 30 days (median)
  - AI tool adoption: > 40%
  - 12-month business retention: > 60%
  - Jobs created: 200
  - Entrepreneurs from underserved areas: > 40%

LEADERSHIP

Champion: ${form.champion || '[Name]'}, ${form.championTitle || '[Title]'}

OPEN SOURCE

This proposal is based on the Digital District Operating System (DDOS), an open-source playbook available at github.com/digital-district-os. ${form.cityName || '[City]'} will contribute improvements back to the standard.

${'='.repeat(60)}
Prepared for ${form.cityName || '[City]'} leadership.
Based on the Digital District OS framework.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Tier 2</span>
        <h1>City Proposal Builder</h1>
        <p>Generate a complete Digital District proposal customized for your city.</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className="card">
            <h3>City Information</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>City Name</label>
                <input value={form.cityName} onChange={(e) => update('cityName', e.target.value)} placeholder="e.g., St. Louis" />
              </div>
              <div className="form-group">
                <label>State</label>
                <input value={form.stateName} onChange={(e) => update('stateName', e.target.value)} placeholder="e.g., Missouri" />
              </div>
              <div className="form-group">
                <label>Population</label>
                <input value={form.population} onChange={(e) => update('population', e.target.value)} placeholder="e.g., 300,000" />
              </div>
              <div className="form-group">
                <label>Existing Innovation District</label>
                <input value={form.district} onChange={(e) => update('district', e.target.value)} placeholder="e.g., Cortex" />
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Deployment Details</h3>
            <div className="form-group">
              <label>Target Corridor</label>
              <input value={form.corridor} onChange={(e) => update('corridor', e.target.value)} placeholder="e.g., Delmar Boulevard" />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Seed Funding</label>
                <input value={form.seedFunding} onChange={(e) => update('seedFunding', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phase 1 Timeline</label>
                <input value={form.phase1Timeline} onChange={(e) => update('phase1Timeline', e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Anchor Institutions (one per line)</label>
              <textarea value={form.anchors} onChange={(e) => update('anchors', e.target.value)} placeholder="- Washington University&#10;- BJC Healthcare&#10;- Cortex Innovation Community&#10;- Urban League of Metropolitan St. Louis" />
            </div>
          </div>

          <div className="card">
            <h3>Leadership</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Champion Name</label>
                <input value={form.champion} onChange={(e) => update('champion', e.target.value)} placeholder="e.g., Jane Smith" />
              </div>
              <div className="form-group">
                <label>Champion Title</label>
                <input value={form.championTitle} onChange={(e) => update('championTitle', e.target.value)} placeholder="e.g., Chief Innovation Officer" />
              </div>
            </div>
            <div className="form-group">
              <label>Equity Goal</label>
              <input value={form.equityGoal} onChange={(e) => update('equityGoal', e.target.value)} />
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => setGenerated(true)} style={{ width: '100%', justifyContent: 'center' }}>
            <FileDown size={16} /> Generate Proposal
          </button>
        </div>

        <div style={{ position: 'sticky', top: 32 }}>
          {generated && (
            <div className="card">
              <div className="card-header">
                <h3 style={{ marginBottom: 0 }}>Generated Proposal</h3>
                <button className="btn btn-sm btn-secondary" onClick={handleCopy}>
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div className="message-output" style={{ maxHeight: 600, overflowY: 'auto', fontSize: 13 }}>
                {proposal}
              </div>
            </div>
          )}

          {!generated && (
            <div className="card" style={{ textAlign: 'center', padding: 40 }}>
              <FileDown size={48} color="var(--text-muted)" style={{ marginBottom: 16 }} />
              <h3>Fill in the form and click Generate</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Your proposal will include executive summary, phased implementation, budget estimates, equity commitments, and success metrics.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
