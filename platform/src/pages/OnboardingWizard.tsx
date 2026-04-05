import { useState } from 'react';
import {
  Sparkles, Users, Rocket, ChevronRight, ChevronLeft, Check,
  Brain, FileText, Megaphone, Store, Wifi, TrendingUp,
  BarChart3, Heart, Calendar, UserCheck, ArrowRight, Star,
  Lightbulb, Zap
} from 'lucide-react';

const NEIGHBORHOODS = [
  'Delmar / The Loop', 'Downtown', 'North City', 'Tower Grove',
  'Central West End', 'Cherokee Street', 'Grand Center',
  'Bevo Mill', 'Natural Bridge', 'South Grand'
];

const HEAR_OPTIONS = [
  'Community event', 'Social media', 'Friend/family',
  'City website', 'News article', 'Other'
];

const STAGES = [
  'Just an idea',
  'Side project',
  'Registered but not launched',
  'Already operating',
  'Looking to grow'
];

const INDUSTRIES = [
  'Retail/Commerce', 'Food & Beverage', 'Professional Services',
  'Creative/Media', 'Tech/SaaS', 'Social Enterprise',
  'Healthcare', 'Education', 'Real Estate', 'Manufacturing', 'Other'
];

const CHALLENGES = [
  "Don't know where to start",
  'Need a business plan',
  'Need customers',
  'Need funding',
  'Need legal help',
  'Need marketing',
  'Need technology help',
  'Need mentorship'
];

const STEP_LABELS = [
  'Welcome', 'About You', 'Assessment', 'Your Plan',
  'Tool Access', 'Connect', 'Launch'
];

function generateDDID() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `DD-2026-${num}`;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  neighborhood: string;
  hearAbout: string;
  businessIdea: string;
  stage: string;
  industry: string;
  challenges: string[];
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [ddid] = useState(generateDDID);
  const [toolsActivated, setToolsActivated] = useState<boolean[]>([false, false, false, false, false, false]);
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    neighborhood: '', hearAbout: '',
    businessIdea: '', stage: '', industry: '', challenges: []
  });

  const totalSteps = 7;
  const progress = ((step + 1) / totalSteps) * 100;

  const updateForm = (field: keyof FormData, value: string | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleChallenge = (c: string) => {
    setForm(prev => ({
      ...prev,
      challenges: prev.challenges.includes(c)
        ? prev.challenges.filter(x => x !== c)
        : [...prev.challenges, c]
    }));
  };

  const simulateActivation = () => {
    setToolsActivated([false, false, false, false, false, false]);
    [0, 1, 2, 3, 4, 5].forEach(i => {
      setTimeout(() => {
        setToolsActivated(prev => {
          const copy = [...prev];
          copy[i] = true;
          return copy;
        });
      }, 400 * (i + 1));
    });
  };

  const next = () => {
    if (step < totalSteps - 1) {
      const nextStep = step + 1;
      setStep(nextStep);
      if (nextStep === 4) simulateActivation();
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const getRecommendedTools = () => {
    if (form.stage === 'Just an idea') {
      return [
        { icon: <Brain size={24} />, name: 'AI Business Planner', desc: 'Turn your idea into a structured business plan with AI guidance.' },
        { icon: <FileText size={24} />, name: 'Legal Document Generator', desc: 'Create LLC filings, contracts, and compliance docs instantly.' },
        { icon: <Megaphone size={24} />, name: 'Marketing Assistant', desc: 'Build your brand, create social posts, and find your first customers.' },
        { icon: <Store size={24} />, name: 'Marketplace Listing', desc: 'Get listed in the Digital District directory from day one.' },
      ];
    }
    if (form.stage === 'Already operating' || form.stage === 'Looking to grow') {
      return [
        { icon: <TrendingUp size={24} />, name: 'Growth Dashboard', desc: 'Track revenue, customers, and growth metrics in one place.' },
        { icon: <Megaphone size={24} />, name: 'AI Marketing Suite', desc: 'Automate campaigns, SEO, and social media at scale.' },
        { icon: <UserCheck size={24} />, name: 'Mentor Match', desc: 'Get paired with experienced mentors in your industry.' },
        { icon: <BarChart3 size={24} />, name: 'Financial Tools', desc: 'Cash flow forecasting, invoicing, and bookkeeping assistance.' },
        { icon: <Store size={24} />, name: 'Marketplace Boost', desc: 'Premium placement and promotional tools in the directory.' },
      ];
    }
    return [
      { icon: <Brain size={24} />, name: 'AI Business Planner', desc: 'Refine your plan with AI-powered market analysis.' },
      { icon: <FileText size={24} />, name: 'Legal Document Generator', desc: 'Handle registration, contracts, and compliance docs.' },
      { icon: <Megaphone size={24} />, name: 'Marketing Assistant', desc: 'Build awareness and attract your first customers.' },
      { icon: <UserCheck size={24} />, name: 'Mentor Match', desc: 'Connect with someone who has been where you are.' },
      { icon: <Store size={24} />, name: 'Marketplace Listing', desc: 'Get discovered by customers across the Digital District.' },
      { icon: <Wifi size={24} />, name: 'Community Wi-Fi', desc: 'Free high-speed internet at all District locations.' },
    ];
  };

  const getEstimatedDays = () => {
    if (form.stage === 'Just an idea') return 14;
    if (form.stage === 'Side project') return 10;
    if (form.stage === 'Registered but not launched') return 5;
    if (form.stage === 'Already operating') return 3;
    return 7;
  };

  const getMentors = () => {
    const all = [
      { name: 'Patricia Williams', specialty: 'Business Strategy & Finance', industry: 'Professional Services', avatar: 'PW' },
      { name: 'David Chen', specialty: 'Tech & Product Development', industry: 'Tech/SaaS', avatar: 'DC' },
      { name: 'Maria Gonzalez', specialty: 'Food & Retail Operations', industry: 'Food & Beverage', avatar: 'MG' },
      { name: 'James Washington', specialty: 'Creative Industries & Media', industry: 'Creative/Media', avatar: 'JW' },
      { name: 'Sandra Okafor', specialty: 'Healthcare & Social Enterprise', industry: 'Healthcare', avatar: 'SO' },
    ];
    const matched = all.filter(m => m.industry === form.industry);
    if (matched.length >= 2) return matched.slice(0, 3);
    return [matched[0] || all[0], all[1], all[2]];
  };

  const communityGroups = [
    { name: `${form.neighborhood || 'Delmar / The Loop'} Entrepreneurs`, members: 84, desc: 'Connect with business owners in your neighborhood.' },
    { name: 'New Business Owners', members: 312, desc: 'A supportive group for those just getting started.' },
    { name: `${form.industry || 'General'} Network`, members: 156, desc: 'Industry-specific discussions and resource sharing.' },
  ];

  const upcomingEvents = [
    { name: 'Community Workshop: AI Tools for Business', date: 'April 12, 2026', time: '10:00 AM', location: 'Delmar Innovation Hub' },
    { name: 'Entrepreneur Meetup & Networking', date: 'April 18, 2026', time: '6:00 PM', location: 'Grand Center Co-Work Space' },
  ];

  const toolChecklist = [
    { name: 'Digital Identity', desc: 'Auto-created' },
    { name: 'AI Business Planner', desc: 'Ready' },
    { name: 'Document Generator', desc: 'Ready' },
    { name: 'Marketing Assistant', desc: 'Ready' },
    { name: 'Community Wi-Fi Access', desc: 'Ready' },
    { name: 'Marketplace Directory Listing', desc: 'Ready' },
  ];

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Entrepreneurs</span>
        <h1>Start Your Business Journey</h1>
        <p>From idea to launched business in hours, not months. This wizard walks you through every step.</p>
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        {STEP_LABELS.map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              onClick={() => { if (i < step) setStep(i); }}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                cursor: i < step ? 'pointer' : 'default',
                background: i < step ? 'var(--success)' : i === step ? 'var(--accent)' : 'var(--bg-card)',
                color: i <= step ? 'white' : 'var(--text-muted)',
                border: i <= step ? 'none' : '1px solid var(--border)',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
            >
              {i < step ? <Check size={16} /> : i + 1}
            </div>
            <span style={{
              fontSize: 12,
              color: i === step ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: i === step ? 600 : 400,
              display: i <= step ? 'inline' : 'none',
              whiteSpace: 'nowrap',
            }}>
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <div style={{
                width: 24,
                height: 2,
                background: i < step ? 'var(--success)' : 'var(--border)',
                borderRadius: 1,
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ marginBottom: 32, height: 6 }}>
        <div className="progress-fill" style={{ width: `${progress}%`, background: 'var(--accent-light)' }} />
      </div>

      {/* ── Step 0: Welcome ── */}
      {step === 0 && (
        <div>
          <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <Sparkles size={48} style={{ color: 'var(--accent-light)', marginBottom: 16 }} />
            <h2 style={{ fontSize: 26, marginBottom: 16 }}>Welcome to the Digital District</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.7 }}>
              The Digital District gives you free access to AI business tools, community Wi-Fi,
              mentorship, and a marketplace — from any neighborhood.
            </p>
          </div>

          <div className="grid-3" style={{ marginBottom: 32 }}>
            <div className="card" style={{ textAlign: 'center', padding: 28 }}>
              <Lightbulb size={32} style={{ color: 'var(--accent-light)', marginBottom: 12 }} />
              <h3 style={{ marginBottom: 8 }}>Free AI Tools</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                Business planning, marketing, legal documents — all powered by AI, all completely free.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 28 }}>
              <Users size={32} style={{ color: 'var(--purple)', marginBottom: 12 }} />
              <h3 style={{ marginBottom: 8 }}>Community Network</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                Mentors, peers, and events to keep you supported and connected every step of the way.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 28 }}>
              <Rocket size={32} style={{ color: 'var(--success)', marginBottom: 12 }} />
              <h3 style={{ marginBottom: 8 }}>Instant Launch</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                Go from registered to revenue in days, not months. Everything you need in one place.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={next} style={{ padding: '14px 36px', fontSize: 16 }}>
              Get Started <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 1: About You ── */}
      {step === 1 && (
        <div className="card" style={{ maxWidth: 640, padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 4 }}>Tell Us About Yourself</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: 14 }}>
            We will use this to personalize your experience. Nothing is shared without your permission.
          </p>

          <div className="grid-2">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={form.firstName} onChange={e => updateForm('firstName', e.target.value)} placeholder="First name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={form.lastName} onChange={e => updateForm('lastName', e.target.value)} placeholder="Last name" />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => updateForm('email', e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" value={form.phone} onChange={e => updateForm('phone', e.target.value)} placeholder="(314) 555-0000" />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Neighborhood / Ward</label>
              <select value={form.neighborhood} onChange={e => updateForm('neighborhood', e.target.value)}>
                <option value="">Select your neighborhood</option>
                {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>How Did You Hear About Us?</label>
              <select value={form.hearAbout} onChange={e => updateForm('hearAbout', e.target.value)}>
                <option value="">Select one</option>
                {HEAR_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Business Assessment ── */}
      {step === 2 && (
        <div className="card" style={{ maxWidth: 640, padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 4 }}>Business Assessment</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: 14 }}>
            Help us understand where you are so we can build you a personalized plan.
          </p>

          <div className="form-group">
            <label>Tell Us About Your Business Idea</label>
            <textarea
              value={form.businessIdea}
              onChange={e => updateForm('businessIdea', e.target.value)}
              placeholder="Describe your business idea or what you are working on..."
              style={{ minHeight: 100 }}
            />
          </div>

          <div className="form-group">
            <label>What Stage Are You At?</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {STAGES.map(s => (
                <label key={s} style={{
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                  fontSize: 14,
                  color: form.stage === s ? 'var(--text)' : 'var(--text-muted)',
                  padding: '8px 12px', borderRadius: 8,
                  border: `1px solid ${form.stage === s ? 'var(--accent)' : 'var(--border)'}`,
                  background: form.stage === s ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                  transition: 'all 0.15s',
                }}>
                  <input
                    type="radio" name="stage" value={s}
                    checked={form.stage === s}
                    onChange={e => updateForm('stage', e.target.value)}
                    style={{ accentColor: 'var(--accent)' }}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>What Industry?</label>
            <select value={form.industry} onChange={e => updateForm('industry', e.target.value)}>
              <option value="">Select your industry</option>
              {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>What Are Your Biggest Challenges Right Now?</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
              {CHALLENGES.map(c => (
                <label key={c} style={{
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                  fontSize: 13,
                  color: form.challenges.includes(c) ? 'var(--text)' : 'var(--text-muted)',
                  padding: '8px 12px', borderRadius: 8,
                  border: `1px solid ${form.challenges.includes(c) ? 'var(--accent)' : 'var(--border)'}`,
                  background: form.challenges.includes(c) ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                  transition: 'all 0.15s',
                }}>
                  <input
                    type="checkbox"
                    checked={form.challenges.includes(c)}
                    onChange={() => toggleChallenge(c)}
                    style={{ accentColor: 'var(--accent)' }}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3: Personalized Plan ── */}
      {step === 3 && (
        <div>
          <div className="card" style={{ padding: 32, marginBottom: 20, borderLeft: '3px solid var(--accent-light)' }}>
            <h2 style={{ fontSize: 22, marginBottom: 4 }}>Your Personalized Plan</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 8 }}>
              Based on your answers, here is what we recommend to get you moving.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 20,
              background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)',
              fontSize: 14, fontWeight: 600, marginTop: 4,
            }}>
              <Zap size={16} /> Based on your answers, you could be operational in {getEstimatedDays()} days
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: 20 }}>
            {getRecommendedTools().map((tool, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: 16, padding: 20, alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-light)', flexShrink: 0,
                }}>
                  {tool.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 15, marginBottom: 4 }}>{tool.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5 }}>{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, marginBottom: 12 }}>Your Recommended Path</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {getRecommendedTools().map((tool, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="tag tag-blue">{tool.name}</span>
                  {i < arr.length - 1 && <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 4: Tool Access ── */}
      {step === 4 && (
        <div className="card" style={{ maxWidth: 540, padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 4 }}>Activating Your Tools</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>
            We are setting everything up for you. This only takes a moment.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {toolChecklist.map((tool, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '12px 16px', borderRadius: 10,
                background: toolsActivated[i] ? 'rgba(16, 185, 129, 0.06)' : 'transparent',
                border: `1px solid ${toolsActivated[i] ? 'var(--success)' : 'var(--border)'}`,
                transition: 'all 0.4s ease',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: toolsActivated[i] ? 'var(--success)' : 'var(--border)',
                  transition: 'all 0.4s ease', flexShrink: 0,
                }}>
                  {toolsActivated[i]
                    ? <Check size={14} color="white" />
                    : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-muted)' }} />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 600,
                    color: toolsActivated[i] ? 'var(--text)' : 'var(--text-muted)',
                    transition: 'color 0.3s',
                  }}>
                    {tool.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{tool.desc}</div>
                </div>
                {toolsActivated[i] && (
                  <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>Active</span>
                )}
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center', padding: '20px 24px', borderRadius: 12,
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}>
            <div style={{
              fontSize: 12, color: 'var(--text-muted)', marginBottom: 4,
              textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600,
            }}>
              Your Digital District ID
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent-light)', letterSpacing: 2 }}>
              {ddid}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 5: Connect ── */}
      {step === 5 && (
        <div>
          {/* Mentors */}
          <div className="card" style={{ padding: 28, marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, marginBottom: 4 }}>Get Matched with a Mentor</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
              Based on your industry, we recommend these mentors.
            </p>
            <div className="grid-3">
              {getMentors().map((m, i) => (
                <div key={i} style={{ padding: 20, borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 12px', fontWeight: 700, fontSize: 16, color: 'white',
                  }}>
                    {m.avatar}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{m.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 12 }}>{m.specialty}</div>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                    Request Match
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Community Groups */}
          <div className="card" style={{ padding: 28, marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, marginBottom: 4 }}>Join Your Neighborhood Group</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
              Connect with entrepreneurs near you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {communityGroups.map((g, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 18px', borderRadius: 10, border: '1px solid var(--border)',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{g.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                      {g.desc}{' '}
                      <span className="tag tag-blue" style={{ marginLeft: 6 }}>{g.members} members</span>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm">Join</button>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="card" style={{ padding: 28 }}>
            <h2 style={{ fontSize: 20, marginBottom: 4 }}>Upcoming Events</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>
              Meet your community in person.
            </p>
            <div className="grid-2">
              {upcomingEvents.map((ev, i) => (
                <div key={i} style={{ padding: 20, borderRadius: 12, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <Calendar size={18} style={{ color: 'var(--accent-light)' }} />
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{ev.name}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 4 }}>
                    {ev.date} at {ev.time}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
                    {ev.location}
                  </div>
                  <button className="btn btn-secondary btn-sm">RSVP</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Step 6: Launch ── */}
      {step === 6 && (
        <div>
          {/* Celebration card with gradient border */}
          <div style={{
            position: 'relative', borderRadius: 'var(--radius)',
            padding: 2, marginBottom: 24,
            background: 'linear-gradient(135deg, var(--accent-light), var(--purple), var(--success), var(--accent-light))',
          }}>
            <div style={{
              background: 'var(--bg-card)', borderRadius: 'calc(var(--radius) - 2px)',
              textAlign: 'center', padding: '48px 32px',
            }}>
              <Star size={48} style={{ color: 'var(--warning)', marginBottom: 16 }} />
              <h2 style={{ fontSize: 28, marginBottom: 8 }}>You are Ready to Launch!</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
                Congratulations{form.firstName ? `, ${form.firstName}` : ''}! Your Digital District
                account is set up and your tools are ready.
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>Your Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                  Name
                </div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>
                  {form.firstName || form.lastName ? `${form.firstName} ${form.lastName}`.trim() : '\u2014'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                  Digital District ID
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent-light)' }}>{ddid}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                  Business Idea
                </div>
                <div style={{ fontSize: 14 }}>{form.businessIdea || '\u2014'}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
                  Industry
                </div>
                <div style={{ fontSize: 14 }}>{form.industry || '\u2014'}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                  Recommended Tools
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {getRecommendedTools().map((t, i) => (
                    <span key={i} className="tag tag-blue">{t.name}</span>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                  Mentor Match
                </div>
                <div style={{ fontSize: 14 }}>
                  {getMentors()[0]?.name} — {getMentors()[0]?.specialty}
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>What's Next</h3>
          <div className="grid-3">
            <div className="card" style={{ textAlign: 'center', padding: 28, cursor: 'pointer' }}>
              <Brain size={32} style={{ color: 'var(--accent-light)', marginBottom: 12 }} />
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Open AI Business Planner</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                Start building your business plan with AI-powered guidance.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 28, cursor: 'pointer' }}>
              <Store size={32} style={{ color: 'var(--purple)', marginBottom: 12 }} />
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Browse the Marketplace</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                Explore local businesses and find your place in the directory.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 28, cursor: 'pointer' }}>
              <Heart size={32} style={{ color: 'var(--success)', marginBottom: 12 }} />
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Meet Your Mentor</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                Schedule your first conversation with your matched mentor.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      {step > 0 && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)',
        }}>
          <button className="btn btn-secondary" onClick={back}>
            <ChevronLeft size={16} /> Back
          </button>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {(step === 1 || step === 5) && (
              <button
                className="btn btn-secondary"
                onClick={next}
                style={{ color: 'var(--text-muted)', fontSize: 13 }}
              >
                Skip
              </button>
            )}
            {step < totalSteps - 1 && (
              <button className="btn btn-primary" onClick={next}>
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
