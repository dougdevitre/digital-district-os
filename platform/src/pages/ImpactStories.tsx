import { useState } from 'react';
import {
  Copy, MapPin, Rocket, TrendingUp, Heart, GraduationCap, Building2,
  Users, DollarSign, Briefcase, Quote
} from 'lucide-react';

type StoryCategory = 'All Stories' | 'Business Launches' | 'Growth Stories' | 'Community Impact' | 'Student Projects';

interface ImpactStory {
  id: number;
  name: string;
  business: string;
  category: 'Business Launch' | 'Growth Story' | 'Community Impact' | 'Student Project';
  neighborhood: string;
  before: string;
  toolsUsed: string[];
  after: string;
  impactMetrics: { label: string; value: string }[];
  quote: string;
  tags: string[];
}

const stories: ImpactStory[] = [
  {
    id: 1,
    name: 'Maria Gonzalez',
    business: "Maria's Kitchen",
    category: 'Business Launch',
    neighborhood: 'Cherokee Street',
    before: 'Maria had been cooking for her neighborhood for years but had no business plan, no marketing, and no way to reach customers beyond word of mouth.',
    toolsUsed: ['AI Business Planner', 'Document Generator (LLC filing)', 'Marketing Assistant'],
    after: 'Within 3 weeks of joining the DD, Maria had an LLC, a marketing plan, an online ordering system, and a listing in the Digital District marketplace.',
    impactMetrics: [
      { label: 'Revenue Growth', value: '+340%' },
      { label: 'Employees Hired', value: '2' },
      { label: 'Media Features', value: 'Local News' },
    ],
    quote: "I didn\u2019t think technology was for people like me. The AI helped me write a business plan in an afternoon \u2014 something I\u2019d been putting off for 3 years.",
    tags: ['Food & Beverage', 'Latina-owned', 'Below-median-income neighborhood'],
  },
  {
    id: 2,
    name: 'James Washington',
    business: 'TechBridge Consulting',
    category: 'Growth Story',
    neighborhood: 'North City',
    before: 'James had IT skills but no business experience. He was doing freelance work with no contracts, no invoicing system, and no way to scale.',
    toolsUsed: ['Contract Generator', 'AI Proposal Writer', 'CRM', 'Mentor Match'],
    after: 'James now runs a 3-person IT consulting firm with recurring contracts and a pipeline of DD-referred clients.',
    impactMetrics: [
      { label: 'First-Year Revenue', value: '$180K' },
      { label: 'FTE Jobs', value: '3' },
      { label: 'Businesses Served', value: '12' },
    ],
    quote: 'My mentor showed me how to price my services. The AI wrote my first contract. Within a month, I went from freelancer to business owner.',
    tags: ['Tech/SaaS', 'Black-owned', 'North City'],
  },
  {
    id: 3,
    name: 'Sarah Chen',
    business: 'Artful Living Design',
    category: 'Growth Story',
    neighborhood: 'Tower Grove',
    before: "Sarah had design talent but couldn\u2019t find clients consistently. She was spending all her time on marketing instead of designing.",
    toolsUsed: ['AI Marketing Assistant', 'Portfolio Builder', 'Social Media Content Generator'],
    after: "Sarah\u2019s client pipeline is now 6 months deep. She spends 80% of her time designing, not marketing.",
    impactMetrics: [
      { label: 'Revenue Growth', value: '+200%' },
      { label: 'Booked Out', value: '6 months' },
      { label: 'Design Awards', value: '2' },
    ],
    quote: 'The AI writes my social media posts and email campaigns. I just approve and post. It gave me my creative time back.',
    tags: ['Creative/Media', 'Asian-owned', 'Women-owned'],
  },
  {
    id: 4,
    name: 'Rev. Thomas Greene',
    business: 'Community Bridge Foundation',
    category: 'Community Impact',
    neighborhood: 'Delmar',
    before: 'Our nonprofit was drowning in grant paperwork. We spent more time writing reports than serving the community.',
    toolsUsed: ['Grant Writer AI', 'Impact Report Generator', 'Volunteer Management'],
    after: 'We doubled our grant success rate and cut reporting time by 75%. More money, more time for actual community work.',
    impactMetrics: [
      { label: 'New Grants Secured', value: '$450K' },
      { label: 'Volunteer Hours', value: '200+' },
      { label: 'New Programs', value: '3' },
    ],
    quote: "This isn\u2019t about technology. It\u2019s about giving community organizations the same tools that big institutions have always had.",
    tags: ['Social Enterprise', 'Nonprofit', 'Community anchor'],
  },
  {
    id: 5,
    name: 'Amir Patel',
    business: 'Patel Family Pharmacy',
    category: 'Business Launch',
    neighborhood: 'Natural Bridge',
    before: "I wanted to open a pharmacy in a neighborhood that hadn\u2019t had one in years. But the business planning and regulatory paperwork was overwhelming.",
    toolsUsed: ['Business Planner', 'Regulatory Compliance AI', 'Financial Projections'],
    after: 'The AI helped me navigate pharmacy licensing, write my business plan, and project my first-year financials. I opened 4 months ahead of schedule.',
    impactMetrics: [
      { label: 'Only Pharmacy Within', value: '2 miles' },
      { label: 'Residents Served', value: '500+' },
      { label: 'Staff Hired', value: '4' },
    ],
    quote: "My neighborhood needed a pharmacy, not another dollar store. The Digital District made it possible for a first-generation entrepreneur to make it happen.",
    tags: ['Healthcare', 'South Asian-owned', 'Healthcare desert'],
  },
  {
    id: 6,
    name: 'Keisha Brooks',
    business: "K\u2019s Beauty Academy",
    category: 'Student Project',
    neighborhood: 'Grand Center',
    before: 'I was a cosmetology student with a dream of opening my own academy but zero business experience.',
    toolsUsed: ['Entrepreneurship in Residence program', 'AI Business Planner', 'Mentor Match', 'Marketing Assistant'],
    after: 'Through the student program, I built my entire business plan, got matched with a mentor who owns 3 salons, and launched a mobile beauty training service.',
    impactMetrics: [
      { label: 'Students Trained', value: '15' },
      { label: 'First-Year Revenue', value: '$45K' },
      { label: 'Showcase Feature', value: 'Yes' },
    ],
    quote: 'I went from student to business owner while still in school. My professors gave me credit for it.',
    tags: ['Education', 'Black-owned', 'Women-owned', 'Student project'],
  },
  {
    id: 7,
    name: 'Carlos Mendez',
    business: 'Mendez Construction',
    category: 'Growth Story',
    neighborhood: 'Cherokee',
    before: "I had a small construction crew but couldn\u2019t bid on bigger jobs because I didn\u2019t have professional proposals or financial documentation.",
    toolsUsed: ['Proposal Generator', 'Financial Dashboard', 'Contract Templates'],
    after: 'The AI proposal writer helped me bid on city contracts. I won my first $50K job within 2 months.',
    impactMetrics: [
      { label: 'Revenue Change', value: '3x' },
      { label: 'Crew Size', value: '3 to 8' },
      { label: 'City Contracts', value: '1st awarded' },
    ],
    quote: "I know how to build things. I didn\u2019t know how to write proposals. Now the AI does that part and I do what I\u2019m good at.",
    tags: ['Manufacturing/Construction', 'Latino-owned', 'Veteran-owned'],
  },
  {
    id: 8,
    name: 'Dr. Amara Osei',
    business: 'Osei Wellness Collective',
    category: 'Community Impact',
    neighborhood: 'Delmar',
    before: "I wanted to create a holistic wellness practice that served the whole community, not just those who could afford it. But I couldn\u2019t figure out the sliding-scale model.",
    toolsUsed: ['Financial Modeling AI', 'Community Health Metrics', 'Business Planner'],
    after: 'The AI helped me build a sustainable sliding-scale pricing model. I now serve 200+ clients across 5 income tiers.',
    impactMetrics: [
      { label: 'Clients Served', value: '200+' },
      { label: 'Below Poverty Line', value: '40%' },
      { label: 'Practitioners Hired', value: '3' },
    ],
    quote: "Every person deserves access to wellness. The Digital District helped me build a business model that makes equity sustainable, not charitable.",
    tags: ['Healthcare', 'Black-owned', 'Women-owned', 'Equity model'],
  },
];

const categoryIcon = (category: string) => {
  switch (category) {
    case 'Business Launch': return <Rocket size={14} />;
    case 'Growth Story': return <TrendingUp size={14} />;
    case 'Community Impact': return <Heart size={14} />;
    case 'Student Project': return <GraduationCap size={14} />;
    default: return <Briefcase size={14} />;
  }
};

const categoryColor = (category: string) => {
  switch (category) {
    case 'Business Launch': return 'tag-blue';
    case 'Growth Story': return 'tag-green';
    case 'Community Impact': return 'tag-purple';
    case 'Student Project': return 'tag-cyan';
    default: return 'tag-blue';
  }
};

const filterMap: Record<StoryCategory, string | null> = {
  'All Stories': null,
  'Business Launches': 'Business Launch',
  'Growth Stories': 'Growth Story',
  'Community Impact': 'Community Impact',
  'Student Projects': 'Student Project',
};

export default function ImpactStories() {
  const [activeFilter, setActiveFilter] = useState<StoryCategory>('All Stories');

  const filtered = activeFilter === 'All Stories'
    ? stories
    : stories.filter(s => s.category === filterMap[activeFilter]);

  const filters: StoryCategory[] = ['All Stories', 'Business Launches', 'Growth Stories', 'Community Impact', 'Student Projects'];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <span className="page-badge badge-tier2">Impact</span>
        <h1>Impact Stories</h1>
        <p>Real entrepreneurs. Real neighborhoods. Real results. These are the stories behind the numbers.</p>
      </div>

      {/* Stats Strip */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-light)' }}>
            <Building2 size={20} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            342
          </div>
          <div className="stat-label">Businesses Created</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>
            <DollarSign size={20} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            $4.2M
          </div>
          <div className="stat-label">Revenue Generated</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--purple)' }}>
            <Users size={20} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            89
          </div>
          <div className="stat-label">Jobs Created</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--warning)' }}>
            <MapPin size={20} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            43%
          </div>
          <div className="stat-label">In Underserved Areas</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tabs">
        {filters.map(f => (
          <button
            key={f}
            className={`tab${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Story Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {filtered.map(story => (
          <div key={story.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Card Header */}
            <div style={{
              padding: '24px 28px 20px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span className={`tag ${categoryColor(story.category)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {categoryIcon(story.category)} {story.category}
                  </span>
                  <span className="tag tag-yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} /> {story.neighborhood}
                  </span>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>{story.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>{story.business}</p>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                style={{ whiteSpace: 'nowrap', marginTop: 4 }}
                onClick={() => {}}
              >
                <Copy size={14} /> Share This Story
              </button>
            </div>

            <div style={{ padding: '24px 28px 28px' }}>
              {/* Before Section */}
              <div style={{
                background: 'rgba(148, 163, 184, 0.06)',
                borderRadius: 8,
                padding: '16px 20px',
                marginBottom: 20,
                borderLeft: '3px solid var(--text-muted)',
              }}>
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: 1.5,
                  color: 'var(--text-muted)',
                  marginBottom: 6,
                }}>Before</div>
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
                  {story.before}
                </p>
              </div>

              {/* Tools Used */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: 1.5,
                  color: 'var(--text-muted)',
                  marginBottom: 8,
                }}>DD Tools Used</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {story.toolsUsed.map(tool => (
                    <span key={tool} className="tag tag-cyan">{tool}</span>
                  ))}
                </div>
              </div>

              {/* After Section */}
              <div style={{
                marginBottom: 24,
                padding: '16px 20px',
                borderRadius: 8,
                borderLeft: '3px solid var(--success)',
                background: 'rgba(16, 185, 129, 0.04)',
              }}>
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: 1.5,
                  color: 'var(--success)',
                  marginBottom: 6,
                }}>After</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>{story.after}</p>
              </div>

              {/* Impact Metrics */}
              <div style={{
                display: 'flex',
                gap: 16,
                marginBottom: 28,
                flexWrap: 'wrap',
              }}>
                {story.impactMetrics.map(metric => (
                  <div key={metric.label} style={{
                    flex: '1 1 140px',
                    background: 'var(--bg)',
                    borderRadius: 8,
                    padding: '14px 18px',
                    border: '1px solid var(--border)',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent-light)', lineHeight: 1.2 }}>
                      {metric.value}
                    </div>
                    <div style={{
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase' as const,
                      letterSpacing: 0.5,
                      marginTop: 4,
                    }}>{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Pull Quote */}
              <div style={{
                borderLeft: '4px solid var(--purple)',
                padding: '20px 24px',
                margin: '0 0 24px',
                background: 'rgba(139, 92, 246, 0.05)',
                borderRadius: '0 8px 8px 0',
              }}>
                <Quote size={24} style={{ color: 'var(--purple)', marginBottom: 8, opacity: 0.6 }} />
                <p style={{
                  fontSize: 17,
                  fontStyle: 'italic',
                  lineHeight: 1.8,
                  color: 'var(--text)',
                  fontWeight: 500,
                }}>
                  &ldquo;{story.quote}&rdquo;
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 8 }}>
                  &mdash; {story.name}, {story.business}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {story.tags.map(tag => (
                  <span key={tag} className="tag tag-purple" style={{ opacity: 0.8 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
