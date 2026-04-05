import { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const neighborhoods = ['Delmar / The Loop', 'North City', 'Cherokee Street', 'Tower Grove', 'Downtown', 'Central West End', 'Grand Center', 'Bevo Mill', 'Natural Bridge', 'South Grand'];
const industries = ['Retail/Commerce', 'Food & Beverage', 'Professional Services', 'Creative/Media', 'Tech/SaaS', 'Social Enterprise', 'Healthcare', 'Education', 'Real Estate', 'Manufacturing', 'Other'];
const stages = ['Just an idea', 'Side project', 'Registered but not launched', 'Already operating', 'Looking to grow'];
const challenges = ['Don\'t know where to start', 'Need a business plan', 'Need customers', 'Need funding', 'Need legal help', 'Need marketing', 'Need technology help', 'Need mentorship'];
const hearAbout = ['Community event', 'Social media', 'Friend/family', 'City website', 'News article', 'Other'];

function getRecommendedTools(stage: string, selectedChallenges: string[]) {
  const tools: { name: string; desc: string; icon: string }[] = [];
  if (stage === 'Just an idea' || selectedChallenges.includes('Don\'t know where to start') || selectedChallenges.includes('Need a business plan')) {
    tools.push({ name: 'AI Business Planner', desc: 'Turn your idea into a structured plan with financial projections', icon: '1' });
  }
  if (selectedChallenges.includes('Need legal help') || stage === 'Just an idea' || stage === 'Side project') {
    tools.push({ name: 'Legal Document Generator', desc: 'LLC filing, contracts, privacy policies — generated in minutes', icon: '2' });
  }
  if (selectedChallenges.includes('Need marketing') || selectedChallenges.includes('Need customers')) {
    tools.push({ name: 'AI Marketing Assistant', desc: 'Social posts, email campaigns, and ad copy tailored to your audience', icon: '3' });
  }
  if (stage === 'Already operating' || stage === 'Looking to grow') {
    tools.push({ name: 'Growth Dashboard', desc: 'Track revenue, customers, and trends with AI-powered insights', icon: '4' });
  }
  if (selectedChallenges.includes('Need funding')) {
    tools.push({ name: 'Grant & Funding Finder', desc: 'AI matches you with grants, loans, and investors for your business type', icon: '5' });
  }
  if (selectedChallenges.includes('Need mentorship')) {
    tools.push({ name: 'Mentor Match', desc: 'Get paired with an experienced mentor in your industry', icon: '6' });
  }
  if (tools.length < 4) {
    tools.push({ name: 'Marketplace Listing', desc: 'Get your business visible to customers across the city', icon: '7' });
  }
  return tools.slice(0, 6);
}

function getTimeline(stage: string) {
  if (stage === 'Just an idea') return '2-4 weeks';
  if (stage === 'Side project') return '1-2 weeks';
  if (stage === 'Registered but not launched') return '3-7 days';
  if (stage === 'Already operating') return '1-3 days';
  return '1-3 days';
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    neighborhood: '', hearAbout: '',
    idea: '', stage: '', industry: '', challenges: [] as string[],
  });

  const ddId = `DD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const tools = getRecommendedTools(form.stage, form.challenges);
  const timeline = getTimeline(form.stage);

  const activatedTools = [
    'Digital Identity', 'AI Business Planner', 'Document Generator',
    'Marketing Assistant', 'Community Wi-Fi Access', 'Marketplace Listing',
  ];

  const mentors = [
    { name: 'Marcus Johnson', industry: 'Tech/SaaS', rating: 4.9 },
    { name: 'Maria Santos', industry: 'Retail/Commerce', rating: 4.9 },
    { name: 'Dr. Fatima Al-Rashid', industry: 'Professional Services', rating: 4.8 },
  ];

  const toggleChallenge = (c: string) => {
    setForm(f => ({
      ...f,
      challenges: f.challenges.includes(c) ? f.challenges.filter(x => x !== c) : [...f.challenges, c],
    }));
  };

  const stepTitles = ['Welcome', 'About You', 'Your Business', 'Your Plan', 'Tool Access', 'Connect', 'Launch'];

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Entrepreneurs</span>
        <h1>Start Your Business Journey</h1>
        <p>From idea to launched business in hours, not months. This wizard walks you through every step.</p>
      </div>

      {/* Step Indicators */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
        {stepTitles.map((title, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', margin: '0 auto 4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700,
              background: i < step ? 'var(--success)' : i === step ? 'var(--accent)' : 'var(--border)',
              color: i <= step ? '#fff' : 'var(--text-muted)',
              transition: 'all 0.2s',
            }}>
              {i < step ? <CheckCircle2 size={16} /> : i + 1}
            </div>
            <div style={{ fontSize: 10, color: i === step ? 'var(--accent-light)' : 'var(--text-muted)' }}>{title}</div>
          </div>
        ))}
      </div>

      {/* Step 0: Welcome */}
      {step === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <Sparkles size={48} color="var(--accent-light)" style={{ marginBottom: 16 }} />
          <h2 style={{ marginBottom: 12, fontSize: 28 }}>Welcome to the Digital District</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 32px', fontSize: 16 }}>
            Free AI tools, community Wi-Fi, mentorship, and a marketplace — from any neighborhood.
          </p>
          <div className="grid-3" style={{ maxWidth: 700, margin: '0 auto 32px' }}>
            {[
              { label: 'Free AI Tools', desc: 'Business planning, marketing, legal docs' },
              { label: 'Community Network', desc: 'Mentors, peers, events, support' },
              { label: 'Instant Launch', desc: 'Register to revenue in days, not months' },
            ].map((v, i) => (
              <div key={i} style={{ padding: 16, background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{v.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: About You */}
      {step === 1 && (
        <div className="card">
          <h2 style={{ marginBottom: 16 }}>Tell Us About Yourself</h2>
          <div className="grid-2">
            <div className="form-group">
              <label>First Name</label>
              <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="Maria" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Gonzalez" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="maria@example.com" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(314) 555-0123" />
            </div>
            <div className="form-group">
              <label>Neighborhood</label>
              <select value={form.neighborhood} onChange={e => setForm({ ...form, neighborhood: e.target.value })}>
                <option value="">Select...</option>
                {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>How did you hear about us?</label>
              <select value={form.hearAbout} onChange={e => setForm({ ...form, hearAbout: e.target.value })}>
                <option value="">Select...</option>
                {hearAbout.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Business Assessment */}
      {step === 2 && (
        <div className="card">
          <h2 style={{ marginBottom: 16 }}>Your Business Idea</h2>
          <div className="form-group">
            <label>Describe your business idea</label>
            <textarea value={form.idea} onChange={e => setForm({ ...form, idea: e.target.value })} placeholder="I want to open a..." style={{ minHeight: 80 }} />
          </div>
          <div className="form-group">
            <label>What stage are you at?</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {stages.map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer', padding: '6px 0' }}>
                  <input type="radio" name="stage" checked={form.stage === s} onChange={() => setForm({ ...form, stage: s })} style={{ accentColor: 'var(--accent)' }} />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Industry</label>
            <select value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
              <option value="">Select...</option>
              {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>What are your biggest challenges? (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {challenges.map(c => (
                <button key={c} className={`btn btn-sm ${form.challenges.includes(c) ? 'btn-primary' : 'btn-secondary'}`} onClick={() => toggleChallenge(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Personalized Plan */}
      {step === 3 && (
        <div className="card">
          <h2 style={{ marginBottom: 8 }}>Your Personalized Plan</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
            Based on your answers, here's your recommended toolkit and timeline.
          </p>
          <div className="card" style={{ background: 'var(--bg)', borderColor: 'var(--accent)', marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Estimated time to operational</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--accent-light)' }}>{timeline}</div>
          </div>
          <div className="grid-3">
            {tools.map((tool, i) => (
              <div key={i} style={{ padding: 16, background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{tool.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{tool.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Tool Access */}
      {step === 4 && (
        <div className="card">
          <h2 style={{ marginBottom: 16 }}>Activating Your Tools</h2>
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Your Digital District ID</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-light)', letterSpacing: 2 }}>{ddId}</div>
          </div>
          {activatedTools.map((tool, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < activatedTools.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <CheckCircle2 size={20} color="var(--success)" />
              <span style={{ fontSize: 15, fontWeight: 500 }}>{tool}</span>
              <span className="tag tag-green" style={{ marginLeft: 'auto' }}>Activated</span>
            </div>
          ))}
        </div>
      )}

      {/* Step 5: Connect */}
      {step === 5 && (
        <div>
          <div className="card">
            <h2 style={{ marginBottom: 16 }}>Connect with Your Community</h2>
            <h3>Recommended Mentors</h3>
            <div className="grid-3" style={{ marginBottom: 16 }}>
              {mentors.map((m, i) => (
                <div key={i} style={{ padding: 16, background: 'var(--bg)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 700 }}>
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.industry}</div>
                  <div style={{ color: 'var(--warning)', fontSize: 13, margin: '4px 0' }}>{'★'.repeat(Math.floor(m.rating))} {m.rating}</div>
                  <button className="btn btn-sm btn-secondary" style={{ marginTop: 4 }}>Request Match</button>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Upcoming Events</h3>
            {[
              { name: 'Entrepreneur Workshop: AI Tools for Your Business', date: 'May 15, 2026 · 6:00 PM', location: 'Delmar Library' },
              { name: 'Monthly Entrepreneur Meetup', date: 'May 22, 2026 · 5:30 PM', location: 'Cherokee Street Community Center' },
            ].map((e, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i === 0 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{e.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{e.date} · {e.location}</div>
                </div>
                <button className="btn btn-sm btn-secondary">RSVP</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Launch */}
      {step === 6 && (
        <div className="card" style={{ textAlign: 'center', padding: 48, border: '2px solid var(--success)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05))' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🚀</div>
          <h2 style={{ fontSize: 28, marginBottom: 8 }}>You're Ready to Launch!</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto 24px' }}>
            {form.firstName ? `${form.firstName}, your` : 'Your'} Digital District tools are active. Your ID is <strong style={{ color: 'var(--accent-light)' }}>{ddId}</strong>. Here's what to do next.
          </p>
          <div className="grid-3" style={{ maxWidth: 700, margin: '0 auto' }}>
            {[
              { label: 'Open AI Planner', desc: 'Turn your idea into a business plan', color: 'var(--accent-light)' },
              { label: 'Browse Marketplace', desc: 'See what others are building', color: 'var(--purple)' },
              { label: 'Meet Your Mentor', desc: 'Get matched with an expert', color: 'var(--success)' },
            ].map((a, i) => (
              <div key={i} style={{ padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'transform 0.15s' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: a.color, marginBottom: 4 }}>{a.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        {step > 0 ? (
          <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>
            <ArrowLeft size={16} /> Back
          </button>
        ) : <div />}
        {step < 6 ? (
          <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>
            {step === 0 ? 'Get Started' : 'Next'} <ArrowRight size={16} />
          </button>
        ) : (
          <button className="btn btn-success" onClick={() => setStep(0)}>
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}
