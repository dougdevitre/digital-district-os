import { useState } from 'react';
import { Search, Copy, Check, Shield, DollarSign, Cpu, Users, Landmark, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

interface Objection {
  id: number;
  category: string;
  objection: string;
  response: string;
  tips: string;
}

const objections: Objection[] = [
  {
    id: 1,
    category: 'Cost & Budget',
    objection: 'We can\'t afford this',
    response: 'Phase 1 costs $101K-$402K — less than one road resurfacing project. A building in a legacy Innovation District costs $5M-$50M. Digital Districts serve 100x more people at 1% the cost.',
    tips: 'Lead with the road resurfacing comparison — it reframes the scale immediately. Have the exact Phase 1 budget breakdown ready as a follow-up.',
  },
  {
    id: 2,
    category: 'Cost & Budget',
    objection: 'The ROI isn\'t proven',
    response: 'The EII framework measures ROI in real-time: business formation, revenue generation, job creation, all by neighborhood. Every dollar is tracked publicly. No more waiting 15 years to see if a building generates returns.',
    tips: 'Contrast with the Innovation District timeline. Ask: "How long did it take to measure ROI on the last infrastructure project?" The answer is usually "we didn\'t."',
  },
  {
    id: 3,
    category: 'Cost & Budget',
    objection: 'What happens when funding runs out?',
    response: 'Phase 1 proves the model. Phase 2 demonstrates scale. By Phase 3, revenue comes from: SaaS premium features, consulting fees from replication cities, and sustainable cloud costs under $5/user/month.',
    tips: 'Acknowledge the concern directly — it\'s legitimate. Then walk through the three-phase sustainability path. Emphasize the $5/user/month number.',
  },
  {
    id: 4,
    category: 'Technology Concerns',
    objection: 'AI isn\'t ready / trustworthy',
    response: 'We\'re using AI for specific, bounded tasks: writing business plans, generating legal templates, creating marketing copy. These aren\'t autonomous decisions — they\'re tools that a human entrepreneur controls. We\'re not replacing judgment, we\'re accelerating execution.',
    tips: 'Name the specific tasks. Avoid abstract AI promises. If possible, demo a tool live — show someone generating a business plan in 60 seconds.',
  },
  {
    id: 5,
    category: 'Technology Concerns',
    objection: 'What about privacy and surveillance?',
    response: 'No tracking. No data selling. The privacy policy is public. The community advisory board has veto power over data practices. Wi-Fi usage is anonymized. AI interactions are not stored without consent.',
    tips: 'Start with "No tracking. No data selling." — the directness builds trust. Mention the community advisory board veto power as the governance safeguard.',
  },
  {
    id: 6,
    category: 'Technology Concerns',
    objection: 'This will be outdated in 5 years',
    response: 'The 4-layer stack is designed for this. Infrastructure (Layer 1) is commodity cloud — it evolves automatically. Intelligence (Layer 2) swaps AI models as better ones emerge. Applications (Layer 3) are modular. The architecture is future-proof because it\'s not dependent on any single technology.',
    tips: 'Use the smartphone analogy: "Your phone\'s apps update constantly, but the phone still works." The 4-layer stack works the same way.',
  },
  {
    id: 7,
    category: 'Equity & Community',
    objection: 'This will accelerate gentrification',
    response: 'Digital infrastructure is the opposite of real estate development. It doesn\'t raise property values — it raises capabilities. We\'re not building buildings that attract transplants. We\'re giving existing residents tools to build wealth where they already are.',
    tips: 'This is the most emotionally charged objection. Pause before responding. Validate the concern. Then make the distinction between physical and digital infrastructure.',
  },
  {
    id: 8,
    category: 'Equity & Community',
    objection: 'The community wasn\'t consulted',
    response: 'Three community listening sessions before any technology deploys. A community advisory board with voting governance power. Equity metrics disaggregated by neighborhood, race, gender, and income — all public. This is co-designed, not imposed.',
    tips: 'If the sessions haven\'t happened yet, say "will happen before any deployment." Never oversell past engagement. Offer to schedule one on the spot.',
  },
  {
    id: 9,
    category: 'Equity & Community',
    objection: 'This only helps tech-savvy people',
    response: 'The AI tools are designed for non-technical users. You don\'t need to know how AI works to use an AI business planner. Digital literacy programs run in every ward. Tier 0 support is instant AI help. Tier 1-3 adds human mentors and professionals.',
    tips: 'Offer a live demo. Hand someone your phone and let them try the business planner. The simplicity speaks for itself.',
  },
  {
    id: 10,
    category: 'Political & Institutional',
    objection: 'Why not just expand the Innovation District?',
    response: 'Because the Innovation District model has a ceiling. It\'s bounded by geography, costs hundreds of millions, and takes 15+ years. A Digital District extends the same capabilities to the whole city for 1% of the cost. We\'re not replacing the district — we\'re making it a node on a citywide network.',
    tips: 'Frame as "and" not "or." The Digital District doesn\'t compete with the Innovation District — it extends it. Use the phrase "node on a citywide network."',
  },
  {
    id: 11,
    category: 'Political & Institutional',
    objection: 'Other cities haven\'t done this',
    response: 'That\'s the point. Someone has to go first. The open-source model means if it works, every city benefits. The reputational value of being first is enormous. And the risk is low — Phase 1 costs less than most pilot programs.',
    tips: 'Lean into the first-mover advantage. Reference other "first" initiatives the city has done. Connect to civic pride.',
  },
  {
    id: 12,
    category: 'Political & Institutional',
    objection: 'This is just a tech project, not economic development',
    response: 'The metrics prove otherwise. We\'re tracking businesses formed, jobs created, revenue generated, and equity distribution — the same KPIs as any economic development program. The only difference is the delivery mechanism: cloud instead of concrete.',
    tips: 'Have the KPI list ready. Name the exact metrics. If they track the same things as traditional econ dev, the delivery mechanism is irrelevant.',
  },
];

const categories = ['Cost & Budget', 'Technology Concerns', 'Equity & Community', 'Political & Institutional'];

const categoryIcons: Record<string, typeof DollarSign> = {
  'Cost & Budget': DollarSign,
  'Technology Concerns': Cpu,
  'Equity & Community': Users,
  'Political & Institutional': Landmark,
};

const categoryTags: Record<string, string> = {
  'Cost & Budget': 'tag-green',
  'Technology Concerns': 'tag-blue',
  'Equity & Community': 'tag-purple',
  'Political & Institutional': 'tag-red',
};

interface Scenario {
  id: string;
  title: string;
  description: string;
  objectionIds: number[];
}

const scenarios: Scenario[] = [
  {
    id: 'council',
    title: 'City Council Q&A',
    description: 'The 5 objections council members are most likely to raise during a budget or policy session.',
    objectionIds: [1, 2, 10, 12, 3],
  },
  {
    id: 'townhall',
    title: 'Community Town Hall',
    description: 'The 5 objections residents and community leaders will raise at a public meeting.',
    objectionIds: [7, 8, 9, 5, 1],
  },
  {
    id: 'investor',
    title: 'Investor Due Diligence',
    description: 'The 5 objections funders and investors will push hardest on.',
    objectionIds: [2, 3, 6, 11, 12],
  },
];

export default function Objections() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>(categories[0]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = objections.filter((o) => {
    if (!search) return o.category === activeTab;
    const q = search.toLowerCase();
    return (
      o.objection.toLowerCase().includes(q) ||
      o.response.toLowerCase().includes(q) ||
      o.category.toLowerCase().includes(q)
    );
  });

  const showingSearch = search.length > 0;

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Adoption Toolkit</span>
        <h1>Objection Handler</h1>
        <p>
          When someone pushes back on the Digital District concept, find the right response instantly. Search by keyword or browse by category.
        </p>
      </div>

      {/* Search */}
      <div className="form-group" style={{ marginBottom: 24, position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search objections... (e.g. &quot;gentrification&quot;, &quot;ROI&quot;, &quot;privacy&quot;)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: 36, width: '100%' }}
        />
      </div>

      {/* Stats */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Shield size={20} style={{ color: 'var(--accent-light)' }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent-light)' }}>{objections.length}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Objections Covered</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MessageSquare size={20} style={{ color: 'var(--success)' }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--success)' }}>{categories.length}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Categories</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {!showingSearch && (
        <div className="tabs" style={{ marginBottom: 20 }}>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <button
                key={cat}
                className={`tab ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                <Icon size={14} style={{ marginRight: 6 }} />
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {showingSearch && filtered.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 32 }}>
          <p style={{ color: 'var(--text-muted)' }}>No objections match your search. Try a different keyword.</p>
        </div>
      )}

      {/* Objections list */}
      {filtered.map((o) => (
        <div key={o.id} className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              {showingSearch && (
                <span className={`tag ${categoryTags[o.category]}`} style={{ marginBottom: 8, display: 'inline-block' }}>
                  {o.category}
                </span>
              )}
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
                &ldquo;{o.objection}&rdquo;
              </div>
              <div className="message-output" style={{ marginBottom: 12 }}>
                {o.response}
              </div>
              <div style={{
                background: 'rgba(59, 130, 246, 0.06)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                borderRadius: 8,
                padding: '10px 14px',
                fontSize: 13,
                color: 'var(--text-secondary)',
              }}>
                <strong style={{ color: 'var(--accent-light)' }}>Delivery Tips:</strong> {o.tips}
              </div>
            </div>
            <button
              className="btn btn-sm"
              onClick={() => handleCopy(`Objection: "${o.objection}"\n\nResponse: ${o.response}\n\nDelivery Tips: ${o.tips}`, o.id)}
              style={{ flexShrink: 0 }}
            >
              {copiedId === o.id ? <Check size={14} /> : <Copy size={14} />}
              {copiedId === o.id ? 'Copied' : 'Copy Response'}
            </button>
          </div>
        </div>
      ))}

      {/* Scenarios */}
      <div style={{ marginTop: 40 }}>
        <h2 style={{ marginBottom: 8 }}>Roleplay Scenarios</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
          Prepare for specific meetings by reviewing the most likely objections for each audience.
        </p>

        {scenarios.map((scenario) => {
          const isOpen = expandedScenario === scenario.id;
          const scenarioObjections = scenario.objectionIds.map((id) => objections.find((o) => o.id === id)!);
          return (
            <div key={scenario.id} className="card" style={{ marginBottom: 12 }}>
              <button
                onClick={() => setExpandedScenario(isOpen ? null : scenario.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: 0,
                  font: 'inherit',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{scenario.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{scenario.description}</div>
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isOpen && (
                <div style={{ marginTop: 16 }}>
                  {scenarioObjections.map((o, idx) => (
                    <div
                      key={o.id}
                      style={{
                        padding: '12px 0',
                        borderTop: idx === 0 ? '1px solid var(--border)' : 'none',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: 'rgba(59, 130, 246, 0.15)',
                          color: 'var(--accent-light)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 2,
                        }}>
                          {idx + 1}
                        </span>
                        <div style={{ flex: 1 }}>
                          <span className={`tag ${categoryTags[o.category]}`} style={{ marginBottom: 6, display: 'inline-block' }}>
                            {o.category}
                          </span>
                          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                            &ldquo;{o.objection}&rdquo;
                          </div>
                          <div className="message-output" style={{ marginBottom: 8 }}>
                            {o.response}
                          </div>
                          <div style={{
                            background: 'rgba(59, 130, 246, 0.06)',
                            border: '1px solid rgba(59, 130, 246, 0.15)',
                            borderRadius: 8,
                            padding: '8px 12px',
                            fontSize: 12,
                            color: 'var(--text-secondary)',
                          }}>
                            <strong style={{ color: 'var(--accent-light)' }}>Tips:</strong> {o.tips}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
