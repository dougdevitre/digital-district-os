import { useState } from 'react';
import { Copy, Check, Presentation } from 'lucide-react';

type PresentationType = 'kickoff' | 'council' | 'community' | 'investor' | 'milestone' | 'media';

interface PresTemplate {
  id: PresentationType;
  label: string;
  audience: string;
  duration: string;
  slides: { title: string; bullets: string[]; speakerNotes: string }[];
}

const templates: PresTemplate[] = [
  {
    id: 'kickoff',
    label: 'Internal Kickoff',
    audience: 'Core team + institutional champions',
    duration: '30 min',
    slides: [
      {
        title: 'Why We\'re Here',
        bullets: [
          'Innovation Districts served one neighborhood. Digital Districts serve the whole city.',
          'Cloud + AI broke the proximity model — access is no longer geographic.',
          '{city} has the chance to lead this transition nationally.',
        ],
        speakerNotes: 'Open with the core thesis. Acknowledge what the legacy district accomplished, then pivot to why the model needs to evolve. Keep this under 3 minutes.',
      },
      {
        title: 'The Opportunity for {city}',
        bullets: [
          '{district} is a proven asset — we\'re extending it, not replacing it.',
          '{corridor} is the pilot corridor: cultural identity, transit, and community trust.',
          'Cost: 1-2% of a physical district. Reach: 100x more people.',
        ],
        speakerNotes: 'Make it specific to your city. Reference the corridor scorecard results. Show the cost comparison — this is always the attention-getter.',
      },
      {
        title: 'What We\'re Building',
        bullets: [
          'Layer 1: Community Wi-Fi + cloud infrastructure on {corridor}',
          'Layer 2: AI-powered business tools (planning, legal, marketing)',
          'Layer 3: Application marketplace for entrepreneurs',
          'Layer 4: Open APIs + interoperability with other cities',
        ],
        speakerNotes: 'Walk through the 4-layer stack. Don\'t go deep on technology — focus on what each layer enables for the end user.',
      },
      {
        title: 'Phase 1 Plan: Street to System',
        bullets: [
          'Timeline: {timeline} starting {startDate}',
          'Budget: {budget}',
          'Key milestones: Wi-Fi live, 10 pilot businesses, advisory board formed',
          'Exit criteria: 80% coverage, 50 users, 3 AI tools deployed',
        ],
        speakerNotes: 'This is the "what are we actually doing" slide. Be concrete. Show the timeline. Name the milestones with dates.',
      },
      {
        title: 'Team & Roles',
        bullets: [
          'Project Champion: {champion}',
          'Community Lead: Owns listening sessions and advisory board',
          'Infrastructure Lead: Wi-Fi deployment and cloud provisioning',
          'AI/Product Lead: Business tool development and pilot support',
          'Communications Lead: Stakeholder engagement and public narrative',
        ],
        speakerNotes: 'Name real people wherever possible. If roles are unfilled, say so — that\'s an action item.',
      },
      {
        title: 'What We Need From This Room',
        bullets: [
          'Commitment to the {timeline} timeline',
          'Access to institutional resources and relationships',
          'Introductions to 10 pilot business candidates on {corridor}',
          'Weekly standup cadence starting next week',
        ],
        speakerNotes: 'End with clear asks. Every person in the room should know what they\'re responsible for when they leave.',
      },
    ],
  },
  {
    id: 'council',
    label: 'City Council Briefing',
    audience: 'Elected officials + staff',
    duration: '15 min',
    slides: [
      {
        title: 'The Problem: Innovation That Doesn\'t Reach Every Ward',
        bullets: [
          '{district} invested heavily — but benefits stay in one neighborhood.',
          'Residents in other wards have no access to the same tools and infrastructure.',
          'The digital economy is growing, but not equitably across {city}.',
        ],
        speakerNotes: 'Lead with the equity gap. Council members care about their wards. Make them feel the imbalance.',
      },
      {
        title: 'The Solution: A Digital District for Every Neighborhood',
        bullets: [
          'Cloud infrastructure + AI tools accessible from any neighborhood.',
          'Free community Wi-Fi on key corridors.',
          'AI-powered business tools: planning, legal docs, marketing, invoicing.',
          'Cost: less than one road project. Reach: citywide.',
        ],
        speakerNotes: 'The "less than one road project" comparison is powerful for council members. Use it.',
      },
      {
        title: 'Equity By Design',
        bullets: [
          'Target: 40%+ of businesses in below-median-income neighborhoods.',
          'All metrics disaggregated by ward, race, gender, income.',
          'Public dashboard — full transparency, real-time.',
          'Community advisory board with voting governance.',
        ],
        speakerNotes: 'This is the slide that earns trust. They need to know this won\'t become another project that only benefits downtown.',
      },
      {
        title: 'The Ask',
        bullets: [
          'Support for pilot deployment on {corridor}.',
          'Integration with city digital services (permits, licensing).',
          'Inclusion in next budget cycle for Phase 2 expansion.',
          'Your voice: tell us which corridors matter most to your constituents.',
        ],
        speakerNotes: 'Be specific about what you need. "Support" is vague — name the budget line, the policy change, the introduction.',
      },
    ],
  },
  {
    id: 'community',
    label: 'Community Listening Session',
    audience: 'Residents, business owners, community organizations',
    duration: '60 min (20 presentation + 40 discussion)',
    slides: [
      {
        title: 'What Is a Digital District?',
        bullets: [
          'Free Wi-Fi on {corridor} — for everyone.',
          'AI tools to help you start or grow a business — no tech expertise needed.',
          'A directory that puts your business in front of the whole city.',
          'No fees. No catches. Built for this community.',
        ],
        speakerNotes: 'Use plain language. No jargon. "AI tools" is fine — but explain what they do, not how they work. Show a demo if possible.',
      },
      {
        title: 'Why {corridor}?',
        bullets: [
          'This corridor has cultural identity, history, and community.',
          'It connects neighborhoods that have been underserved.',
          'You told us this is where investment is needed most.',
          'This isn\'t a tech experiment — it\'s economic infrastructure.',
        ],
        speakerNotes: 'Reference previous community input if available. Show you listened before you built.',
      },
      {
        title: 'What We\'re NOT Doing',
        bullets: [
          'Not surveillance — no tracking, no data selling.',
          'Not gentrification — this is digital infrastructure, not real estate.',
          'Not replacing existing organizations — we\'re amplifying your work.',
          'Not making decisions without you — advisory board has real power.',
        ],
        speakerNotes: 'Address concerns head-on before they become objections. This slide builds trust.',
      },
      {
        title: 'We Need Your Input',
        bullets: [
          'What tools would help your business most?',
          'What concerns do you have about this project?',
          'Who should be on the community advisory board?',
          'How should we measure success in THIS neighborhood?',
        ],
        speakerNotes: 'STOP PRESENTING HERE. The rest of the session is listening. Take notes publicly. Promise follow-up with dates.',
      },
    ],
  },
  {
    id: 'investor',
    label: 'Investor / Funder Pitch',
    audience: 'VCs, impact investors, philanthropic foundations',
    duration: '20 min',
    slides: [
      {
        title: 'The $100B Problem',
        bullets: [
          'Cities spent $100B+ on Innovation Districts worldwide.',
          'Returns are geographically concentrated. Most residents excluded.',
          'Cloud + AI made the core model obsolete — but nobody rebuilt it.',
          'Until now.',
        ],
        speakerNotes: 'Open big. The $100B number gets attention. Then narrow to why the model is broken.',
      },
      {
        title: 'Digital District: The Platform Model',
        bullets: [
          'AI-powered, cloud-native ecosystem layered over physical corridors.',
          '4-layer stack: Infrastructure → Intelligence → Applications → Distribution.',
          'Open-source framework. MIT licensed. Forkable by any city.',
          'Unit economics: $200-500/entrepreneur vs. $200K+ for physical incubators.',
        ],
        speakerNotes: 'The unit economics slide is the one they\'ll screenshot. Make sure the comparison is clear.',
      },
      {
        title: '{city} as Proof of Concept',
        bullets: [
          '{district}: $1.3B legacy district, proven ecosystem.',
          '{corridor}: Digital Mainstreet pilot, {timeline}.',
          'Target: 500 businesses Year 1, 5,000 by Year 3.',
          'EII tracking ensures equitable distribution of outcomes.',
        ],
        speakerNotes: 'Show that you have a real city, a real corridor, and real metrics. Investors want proof this isn\'t theoretical.',
      },
      {
        title: 'The Network Effect',
        bullets: [
          'Open standard (DDIS v1.0) enables multi-city interoperability.',
          'Each city that joins makes the network more valuable.',
          '4 cities in planning. Goal: 25 cities in 3 years.',
          'Revenue model: SaaS for premium features, consulting for deployment.',
        ],
        speakerNotes: 'This is the scale story. Show the network effect — one city is a project, 25 cities is a platform.',
      },
      {
        title: 'The Ask',
        bullets: [
          'Seeking ${fundingAsk} for Phase 1-2 deployment in {city}.',
          'Funds deploy: infrastructure (40%), AI tools (25%), community (20%), ops (15%).',
          'Milestone-based disbursement tied to KPIs.',
          'All code open-source. All metrics public. Full accountability.',
        ],
        speakerNotes: 'Be specific on the number. Show the allocation. Milestone-based funding builds trust.',
      },
    ],
  },
  {
    id: 'milestone',
    label: 'Milestone Report',
    audience: 'Board, funders, government stakeholders',
    duration: '20 min',
    slides: [
      {
        title: 'Progress Summary',
        bullets: [
          'Phase: {currentPhase}',
          'Timeline status: {timelineStatus}',
          'Budget status: {budgetStatus}',
          'Key achievement this period: {achievement}',
        ],
        speakerNotes: 'Lead with status. Green/yellow/red. No surprises — if something is off track, say it here.',
      },
      {
        title: 'KPI Dashboard',
        bullets: [
          'EII Score: {eiiScore} (target: 60+)',
          'Businesses registered: {businesses}',
          'Jobs created: {jobs}',
          'Equity: {equityPct}% in underserved neighborhoods (target: 40%+)',
        ],
        speakerNotes: 'Show the numbers. Compare to targets. Celebrate wins. Be honest about misses.',
      },
      {
        title: 'Exit Criteria Status',
        bullets: [
          '{completedCriteria}/{totalCriteria} exit criteria met.',
          'On track: [list items on track]',
          'At risk: [list items at risk]',
          'Blocked: [list items blocked and why]',
        ],
        speakerNotes: 'Walk through each criterion. For anything at risk or blocked, have a mitigation plan ready.',
      },
      {
        title: 'Next Period Plan',
        bullets: [
          'Priority 1: [top priority]',
          'Priority 2: [second priority]',
          'Priority 3: [third priority]',
          'Key meeting: [next major stakeholder touchpoint]',
        ],
        speakerNotes: 'Three priorities max. If you have more than three, you don\'t have priorities.',
      },
    ],
  },
  {
    id: 'media',
    label: 'Media / Press Briefing',
    audience: 'Journalists, podcast hosts, media outlets',
    duration: '10 min + Q&A',
    slides: [
      {
        title: 'The Story: {city} Builds America\'s First Digital District',
        bullets: [
          '{city} is the first city to deploy a Digital District — an AI-powered ecosystem for entrepreneurs.',
          'Innovation Districts cost billions and serve one neighborhood. This costs 99% less and reaches everyone.',
          '{corridor} is the pilot: free Wi-Fi, AI business tools, open platform.',
        ],
        speakerNotes: 'Lead with the headline. Journalists need a story in one sentence. Give it to them.',
      },
      {
        title: 'The Human Story',
        bullets: [
          'A resident on {corridor} can now start a business in hours, not months.',
          'AI writes their business plan. Generates their legal docs. Creates their marketing.',
          'No fee. No application. No gatekeeper. Just tools.',
          '[Include 1-2 real entrepreneur stories if available]',
        ],
        speakerNotes: 'Journalists want human stories. If you have a pilot business owner willing to talk, feature them.',
      },
      {
        title: 'Why It Matters Nationally',
        bullets: [
          'Open-source model — any city can fork and deploy.',
          'Interoperability standard (DDIS v1.0) enables multi-city networks.',
          '{numCities} cities already in planning.',
          'This could be the playbook for the next era of urban economic development.',
        ],
        speakerNotes: 'Give them the national angle. Local story with national implications gets more coverage.',
      },
    ],
  },
];

export default function Presentations() {
  const [selected, setSelected] = useState<PresentationType>('kickoff');
  const [city, setCity] = useState('St. Louis');
  const [district, setDistrict] = useState('Cortex');
  const [corridor, setCorridor] = useState('Delmar Boulevard');
  const [champion, setChampion] = useState('');
  const [timeline, setTimeline] = useState('6 months');
  const [startDate, setStartDate] = useState('2026-06-01');
  const [budget, setBudget] = useState('$250,000');
  const [fundingAsk, setFundingAsk] = useState('$2M');
  const [copied, setCopied] = useState<number | null>(null);

  const template = templates.find((t) => t.id === selected)!;

  const fillTemplate = (text: string) =>
    text
      .replace(/\{city\}/g, city || '[City]')
      .replace(/\{district\}/g, district || '[District]')
      .replace(/\{corridor\}/g, corridor || '[Corridor]')
      .replace(/\{champion\}/g, champion || '[Champion Name]')
      .replace(/\{timeline\}/g, timeline)
      .replace(/\{startDate\}/g, startDate)
      .replace(/\{budget\}/g, budget)
      .replace(/\{fundingAsk\}/g, fundingAsk)
      .replace(/\{currentPhase\}/g, 'Phase 1 — Street to System')
      .replace(/\{timelineStatus\}/g, 'On Track')
      .replace(/\{budgetStatus\}/g, 'Within Budget')
      .replace(/\{achievement\}/g, '[Fill in key achievement]')
      .replace(/\{eiiScore\}/g, '67')
      .replace(/\{businesses\}/g, '342')
      .replace(/\{jobs\}/g, '89')
      .replace(/\{equityPct\}/g, '43')
      .replace(/\{completedCriteria\}/g, '5')
      .replace(/\{totalCriteria\}/g, '8')
      .replace(/\{numCities\}/g, '4');

  const exportAll = () => {
    const lines: string[] = [];
    lines.push(`PRESENTATION: ${template.label}`);
    lines.push(`Audience: ${template.audience}`);
    lines.push(`Duration: ${template.duration}`);
    lines.push('='.repeat(60));
    template.slides.forEach((slide, i) => {
      lines.push('');
      lines.push(`--- SLIDE ${i + 1}: ${fillTemplate(slide.title)} ---`);
      lines.push('');
      slide.bullets.forEach((b) => lines.push(`  - ${fillTemplate(b)}`));
      lines.push('');
      lines.push(`  SPEAKER NOTES: ${fillTemplate(slide.speakerNotes)}`);
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Tier 2</span>
        <h1>Presentation Generator</h1>
        <p>Generate slide-ready content with speaker notes for every major milestone and audience.</p>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className="card">
            <h3>Select Presentation Type</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {templates.map((t) => (
                <button
                  key={t.id}
                  className={`btn btn-sm ${selected === t.id ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelected(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-muted)' }}>
              <strong>Audience:</strong> {template.audience} | <strong>Duration:</strong> {template.duration}
            </div>
          </div>

          <div className="card">
            <h3>Customize Variables</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>City</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Innovation District</label>
                <input value={district} onChange={(e) => setDistrict(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Corridor</label>
                <input value={corridor} onChange={(e) => setCorridor(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Project Champion</label>
                <input value={champion} onChange={(e) => setChampion(e.target.value)} placeholder="e.g., Jane Smith, CIO" />
              </div>
              <div className="form-group">
                <label>Timeline</label>
                <input value={timeline} onChange={(e) => setTimeline(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Budget</label>
                <input value={budget} onChange={(e) => setBudget(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Funding Ask (investors)</label>
                <input value={fundingAsk} onChange={(e) => setFundingAsk(e.target.value)} />
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={exportAll} style={{ width: '100%', justifyContent: 'center', marginBottom: 20 }}>
            {copied === -1 ? <><Check size={16} /> Copied All Slides</> : <><Presentation size={16} /> Copy Full Presentation</>}
          </button>
        </div>

        <div style={{ position: 'sticky', top: 32 }}>
          {template.slides.map((slide, idx) => (
            <div key={idx} className="card">
              <div className="card-header">
                <div>
                  <span className="tag tag-blue" style={{ marginBottom: 6 }}>Slide {idx + 1}</span>
                  <h3 style={{ marginBottom: 0 }}>{fillTemplate(slide.title)}</h3>
                </div>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    const text = `${fillTemplate(slide.title)}\n\n${slide.bullets.map((b) => `- ${fillTemplate(b)}`).join('\n')}\n\nSpeaker Notes: ${fillTemplate(slide.speakerNotes)}`;
                    navigator.clipboard.writeText(text);
                    setCopied(idx);
                    setTimeout(() => setCopied(null), 2000);
                  }}
                >
                  {copied === idx ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
                {slide.bullets.map((bullet, bi) => (
                  <li key={bi} style={{ fontSize: 14, lineHeight: 1.8 }}>{fillTemplate(bullet)}</li>
                ))}
              </ul>
              <div style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 8, padding: 12, fontSize: 13, color: 'var(--text-muted)',
              }}>
                <strong style={{ color: 'var(--warning)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Speaker Notes
                </strong>
                <p style={{ marginTop: 4 }}>{fillTemplate(slide.speakerNotes)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
