import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CommItem {
  id: number;
  title: string;
  type: 'press_release' | 'social' | 'newsletter' | 'blog' | 'media_event' | 'content';
  month: number;
  week: number;
  status: 'draft' | 'ready' | 'published';
  description: string;
}

const commItems: CommItem[] = [
  { id: 1, title: 'City Announces Digital District Initiative', type: 'press_release', month: 1, week: 5, status: 'draft', description: 'Official announcement of the Digital Mainstreet pilot on the selected corridor.' },
  { id: 2, title: 'Launch Announcement Campaign', type: 'social', month: 1, week: 5, status: 'draft', description: 'Multi-platform social campaign announcing the project with corridor visuals.' },
  { id: 3, title: 'Community Newsletter #1: Project Introduction', type: 'newsletter', month: 1, week: 6, status: 'draft', description: 'First newsletter introducing the project, team, and how to get involved.' },
  { id: 4, title: 'What is a Digital Mainstreet? Explainer', type: 'blog', month: 2, week: 7, status: 'draft', description: 'Plain-language blog post explaining the concept for community members.' },
  { id: 5, title: 'Community Listening Session Highlights', type: 'social', month: 2, week: 8, status: 'draft', description: 'Photos, quotes, and key themes from community engagement sessions.' },
  { id: 6, title: 'Local Journalists Background Briefing', type: 'media_event', month: 2, week: 8, status: 'draft', description: 'Off-record briefing for local press to build understanding before coverage.' },
  { id: 7, title: 'Wi-Fi Goes Live on Corridor', type: 'press_release', month: 3, week: 12, status: 'draft', description: 'Major milestone: free community Wi-Fi is now operational on the corridor.' },
  { id: 8, title: 'Wi-Fi Launch Celebration Content', type: 'social', month: 3, week: 12, status: 'draft', description: 'Celebration posts, photos of first users, speed test results.' },
  { id: 9, title: 'Newsletter #2: Construction Update + Business Spotlights', type: 'newsletter', month: 3, week: 10, status: 'draft', description: 'Progress update with photos of Wi-Fi installation and featured pilot businesses.' },
  { id: 10, title: 'Before/After Corridor Transformation', type: 'content', month: 3, week: 13, status: 'draft', description: 'Photo and video series showing the corridor before and after digital infrastructure.' },
  { id: 11, title: 'Meet the First 10 Businesses', type: 'blog', month: 4, week: 14, status: 'draft', description: 'Profile series of each pilot business and how they\'re using Digital District tools.' },
  { id: 12, title: 'Business Owner Testimonial Series', type: 'social', month: 4, week: 15, status: 'draft', description: 'Video/quote series from pilot businesses sharing their experience.' },
  { id: 13, title: 'Newsletter #3: AI Tools Available Now', type: 'newsletter', month: 4, week: 14, status: 'draft', description: 'Announce availability of AI business tools, how to sign up, what they do.' },
  { id: 14, title: 'Quarterly Impact Report', type: 'press_release', month: 5, week: 18, status: 'draft', description: 'First full quarterly report with metrics, equity data, and community stories.' },
  { id: 15, title: 'Open House / Demo Day for Press', type: 'media_event', month: 5, week: 18, status: 'draft', description: 'Invite media to walk the corridor, meet businesses, try AI tools firsthand.' },
  { id: 16, title: 'Six-Month Milestone Celebration', type: 'social', month: 6, week: 22, status: 'draft', description: '6-month anniversary content with key stats and accomplishments.' },
  { id: 17, title: 'Newsletter #4: Six Months of Impact', type: 'newsletter', month: 6, week: 22, status: 'draft', description: 'Comprehensive 6-month impact newsletter with stats, stories, and next steps.' },
  { id: 18, title: 'Mayor\'s Op-Ed on Digital Equity', type: 'content', month: 6, week: 24, status: 'draft', description: 'Ghostwritten op-ed for the mayor on digital equity and the Digital District model.' },
];

const typeLabels: Record<string, { label: string; class: string }> = {
  press_release: { label: 'Press Release', class: 'tag-red' },
  social: { label: 'Social Media', class: 'tag-blue' },
  newsletter: { label: 'Newsletter', class: 'tag-green' },
  blog: { label: 'Blog Post', class: 'tag-purple' },
  media_event: { label: 'Media Event', class: 'tag-cyan' },
  content: { label: 'Content', class: 'tag-yellow' },
};

const statusLabels: Record<string, string> = {
  draft: 'tag-yellow',
  ready: 'tag-blue',
  published: 'tag-green',
};

const socialDrafts = [
  {
    platform: 'Twitter/X',
    posts: [
      { text: `Big news: {city} is building a Digital District on {corridor}. Free Wi-Fi, AI business tools, and a digital identity for every entrepreneur — from any neighborhood.\n\nThis is what happens when you fund bandwidth, not buildings.`, chars: 220 },
      { text: `The cost of one building renovation in an Innovation District: $5M-$50M.\n\nThe cost of a Digital District serving the entire city: $2M-$7M.\n\n100x more people. 1% of the cost. {city} is proving a new model.`, chars: 198 },
      { text: `Meet {businessName}, one of the first 10 businesses on {corridor}'s Digital Mainstreet. They used AI tools to {achievement}.\n\nThis is what digital infrastructure does for real people.`, chars: 180 },
    ],
  },
  {
    platform: 'LinkedIn',
    posts: [
      { text: `I'm excited to announce that {city} is launching a Digital District — a new model for economic development that uses AI, cloud infrastructure, and community Wi-Fi to give every entrepreneur in the city access to the tools they need to start and grow a business.\n\nFor decades, cities invested billions in physical Innovation Districts. These served important purposes, but they're geographically bounded, expensive, and slow to deploy. A Digital District costs 1% as much and reaches 100x more people.\n\nWe're starting on {corridor} and scaling citywide over 24 months. Every metric will be public. Every neighborhood will have access.\n\nThis is what equitable economic development looks like in the AI era.`, chars: 650 },
    ],
  },
  {
    platform: 'Community (Newsletter/Facebook)',
    posts: [
      { text: `Great news for {corridor}! 🎉\n\nFree Wi-Fi is coming to our neighborhood. Plus AI-powered tools to help you start a business, write marketing materials, create invoices, and more — all free.\n\nWant to be one of the first to try it? Sign up for the pilot program: [link]\n\nQuestions? Come to our community listening session on [date] at [location]. Everyone is welcome.`, chars: 360 },
    ],
  },
];

export default function Communications() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'press' | 'social'>('calendar');
  const [items, setItems] = useState(commItems);
  const [copied, setCopied] = useState<number | null>(null);

  const [prForm, setPrForm] = useState({
    headline: '', city: '', corridor: '', spokesperson: '', title: '', quote: '', businesses: '', users: '', coverage: '', body: '',
  });
  const [prCopied, setPrCopied] = useState(false);

  const toggleStatus = (id: number) => {
    const order = ['draft', 'ready', 'published'] as const;
    setItems((prev) => prev.map((item) => {
      if (item.id !== id) return item;
      const nextIdx = (order.indexOf(item.status) + 1) % order.length;
      return { ...item, status: order[nextIdx] };
    }));
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const pressRelease = `FOR IMMEDIATE RELEASE

${prForm.headline || '[HEADLINE]'}

${prForm.city || '[CITY]'} — ${prForm.body || `${prForm.city || '[City]'} today announced the launch of a Digital District on ${prForm.corridor || '[corridor]'}, a first-of-its-kind initiative that will provide every entrepreneur in the city with instant access to AI-powered business tools, free community Wi-Fi, and cloud infrastructure — regardless of neighborhood.`}

"${prForm.quote || 'This Digital District represents a fundamental shift in how we think about economic development. Instead of concentrating innovation in one building, we\'re distributing it to every neighborhood.'}" said ${prForm.spokesperson || '[Spokesperson]'}, ${prForm.title || '[Title]'}.

KEY FACTS:
• ${prForm.businesses || '[X]'} businesses already registered
• ${prForm.users || '[X]'} active users on the platform
• ${prForm.coverage || '[X]'}% Wi-Fi coverage on the corridor
• Tools include AI-powered business planning, document generation, and marketing
• All metrics published on a public dashboard for accountability

The Digital District model costs less than 1% of a traditional Innovation District while serving 100x more people. ${prForm.city || '[City]'} is the first city in the nation to deploy this open-source model.

For more information, contact: [media contact]

###`;

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Communications Engine</span>
        <h1>PR & Communications Calendar</h1>
        <p>Plan, draft, and track every press release, social post, newsletter, and media event across your Digital District journey.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-light)', fontSize: 24 }}>{items.length}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--warning)', fontSize: 24 }}>{items.filter((i) => i.status === 'draft').length}</div>
          <div className="stat-label">Drafts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-light)', fontSize: 24 }}>{items.filter((i) => i.status === 'ready').length}</div>
          <div className="stat-label">Ready</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)', fontSize: 24 }}>{items.filter((i) => i.status === 'published').length}</div>
          <div className="stat-label">Published</div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>Calendar</button>
        <button className={`tab ${activeTab === 'press' ? 'active' : ''}`} onClick={() => setActiveTab('press')}>Press Releases</button>
        <button className={`tab ${activeTab === 'social' ? 'active' : ''}`} onClick={() => setActiveTab('social')}>Social Media</button>
      </div>

      {activeTab === 'calendar' && (
        <div>
          {[1, 2, 3, 4, 5, 6].map((month) => {
            const monthItems = items.filter((i) => i.month === month);
            if (monthItems.length === 0) return null;
            return (
              <div key={month} style={{ marginBottom: 24 }}>
                <h3 style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)',
                    color: 'var(--accent-light)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700,
                  }}>{month}</span>
                  Month {month}
                </h3>
                {monthItems.map((item) => (
                  <div key={item.id} className="card" style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</span>
                          <span className={`tag ${typeLabels[item.type].class}`}>{typeLabels[item.type].label}</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.description}</p>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Week {item.week}</span>
                      </div>
                      <button
                        className={`btn btn-sm`}
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                        onClick={() => toggleStatus(item.id)}
                      >
                        <span className={`tag ${statusLabels[item.status]}`}>{item.status}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'press' && (
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div>
            <div className="card">
              <h3>Press Release Generator</h3>
              <div className="grid-2">
                <div className="form-group">
                  <label>Headline</label>
                  <input value={prForm.headline} onChange={(e) => setPrForm({ ...prForm, headline: e.target.value })} placeholder="City Launches Digital District" />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input value={prForm.city} onChange={(e) => setPrForm({ ...prForm, city: e.target.value })} placeholder="St. Louis" />
                </div>
                <div className="form-group">
                  <label>Corridor</label>
                  <input value={prForm.corridor} onChange={(e) => setPrForm({ ...prForm, corridor: e.target.value })} placeholder="Delmar Boulevard" />
                </div>
                <div className="form-group">
                  <label>Spokesperson</label>
                  <input value={prForm.spokesperson} onChange={(e) => setPrForm({ ...prForm, spokesperson: e.target.value })} placeholder="Mayor Jane Smith" />
                </div>
                <div className="form-group">
                  <label>Spokesperson Title</label>
                  <input value={prForm.title} onChange={(e) => setPrForm({ ...prForm, title: e.target.value })} placeholder="Mayor of St. Louis" />
                </div>
                <div className="form-group">
                  <label>Businesses Registered</label>
                  <input value={prForm.businesses} onChange={(e) => setPrForm({ ...prForm, businesses: e.target.value })} placeholder="342" />
                </div>
              </div>
              <div className="form-group">
                <label>Key Quote</label>
                <textarea value={prForm.quote} onChange={(e) => setPrForm({ ...prForm, quote: e.target.value })} placeholder="This represents a fundamental shift..." />
              </div>
            </div>
          </div>
          <div style={{ position: 'sticky', top: 32 }}>
            <div className="card">
              <div className="card-header">
                <h3 style={{ marginBottom: 0 }}>Generated Press Release</h3>
                <button className="btn btn-sm btn-secondary" onClick={() => { navigator.clipboard.writeText(pressRelease); setPrCopied(true); setTimeout(() => setPrCopied(false), 2000); }}>
                  {prCopied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div className="message-output" style={{ fontSize: 13, maxHeight: 500, overflowY: 'auto' }}>{pressRelease}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'social' && (
        <div>
          {socialDrafts.map((platform, pi) => (
            <div key={pi} className="card">
              <h3>{platform.platform}</h3>
              {platform.posts.map((post, idx) => {
                const id = pi * 100 + idx;
                return (
                  <div key={idx} style={{ padding: '12px 0', borderBottom: idx < platform.posts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div className="message-output" style={{ marginBottom: 8 }}>{post.text}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{post.chars} characters</span>
                      <button className="btn btn-sm btn-secondary" onClick={() => handleCopy(post.text, id)}>
                        {copied === id ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
