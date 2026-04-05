import { useState } from 'react';
import { Star, Clock, Users, Award, Heart, Search, CheckCircle } from 'lucide-react';

interface Mentor {
  name: string;
  initials: string;
  color: string;
  industry: string;
  experience: number;
  bio: string;
  skills: string[];
  availability: 'Weekly' | 'Biweekly' | 'Monthly';
  rating: number;
}

const mentors: Mentor[] = [
  { name: 'Marcus Johnson', initials: 'MJ', color: '#3b82f6', industry: 'Tech/SaaS', experience: 15, bio: 'Former CTO, now helps first-time founders build MVPs', skills: ['Product Development', 'Technology', 'Fundraising'], availability: 'Weekly', rating: 4.9 },
  { name: 'Dr. Patricia Owens', initials: 'PO', color: '#8b5cf6', industry: 'Healthcare', experience: 20, bio: 'Health system administrator helping health-tech startups navigate regulations', skills: ['Operations', 'Legal', 'Business Planning'], availability: 'Biweekly', rating: 4.8 },
  { name: 'James Chen', initials: 'JC', color: '#10b981', industry: 'Finance', experience: 12, bio: 'Investment banker turned angel investor, focused on underrepresented founders', skills: ['Financial', 'Fundraising', 'Business Planning'], availability: 'Weekly', rating: 4.7 },
  { name: 'Maria Santos', initials: 'MS', color: '#f59e0b', industry: 'Retail/Commerce', experience: 8, bio: 'Built 3 successful restaurants, now mentoring food entrepreneurs', skills: ['Operations', 'Marketing', 'HR/Hiring'], availability: 'Weekly', rating: 4.9 },
  { name: 'Aisha Washington', initials: 'AW', color: '#ec4899', industry: 'Legal', experience: 15, bio: 'Corporate attorney specializing in small business formation and IP', skills: ['Legal', 'Business Planning', 'Operations'], availability: 'Monthly', rating: 4.6 },
  { name: 'David Kim', initials: 'DK', color: '#06b6d4', industry: 'Creative/Media', experience: 10, bio: 'Brand strategist who\'s built campaigns for Fortune 500 and local startups', skills: ['Marketing', 'Sales', 'Product Development'], availability: 'Biweekly', rating: 4.8 },
  { name: 'Rev. Thomas Greene', initials: 'TG', color: '#84cc16', industry: 'Social Enterprise', experience: 25, bio: 'Community development leader connecting nonprofits to sustainable models', skills: ['Fundraising', 'Operations', 'Business Planning'], availability: 'Weekly', rating: 4.9 },
  { name: 'Sarah Okafor', initials: 'SO', color: '#a855f7', industry: 'Tech/SaaS', experience: 7, bio: 'Full-stack developer and startup founder, Y Combinator alum', skills: ['Technology', 'Product Development', 'Fundraising'], availability: 'Biweekly', rating: 4.7 },
  { name: 'Robert Martinez', initials: 'RM', color: '#ef4444', industry: 'Manufacturing', experience: 18, bio: 'Former plant manager, helps makers scale production', skills: ['Operations', 'Financial', 'HR/Hiring'], availability: 'Monthly', rating: 4.5 },
  { name: 'Linda Park', initials: 'LP', color: '#14b8a6', industry: 'Education', experience: 12, bio: 'EdTech founder, specializes in curriculum-based businesses', skills: ['Product Development', 'Marketing', 'Business Planning'], availability: 'Weekly', rating: 4.8 },
  { name: 'Anthony Williams', initials: 'AW', color: '#f97316', industry: 'Real Estate', experience: 14, bio: 'Commercial real estate broker helping businesses find the right space', skills: ['Financial', 'Operations', 'Business Planning'], availability: 'Biweekly', rating: 4.6 },
  { name: 'Dr. Fatima Al-Rashid', initials: 'FA', color: '#e11d48', industry: 'Professional Services', experience: 16, bio: 'Management consultant helping service businesses systemize and scale', skills: ['Operations', 'Business Planning', 'Sales'], availability: 'Weekly', rating: 4.8 },
];

const industries = ['All', 'Retail/Commerce', 'Professional Services', 'Creative/Media', 'Tech/SaaS', 'Social Enterprise', 'Food & Beverage', 'Healthcare', 'Real Estate', 'Finance', 'Manufacturing', 'Education', 'Legal'];
const expertiseOptions = ['All', 'Business Planning', 'Marketing', 'Legal', 'Financial', 'Technology', 'Operations', 'Fundraising', 'HR/Hiring', 'Product Development', 'Sales'];
const availabilityOptions = ['All', 'Weekly', 'Biweekly', 'Monthly'];

const industryTagColor: Record<string, string> = {
  'Tech/SaaS': 'tag-blue',
  'Healthcare': 'tag-purple',
  'Finance': 'tag-green',
  'Retail/Commerce': 'tag-yellow',
  'Legal': 'tag-pink',
  'Creative/Media': 'tag-cyan',
  'Social Enterprise': 'tag-green',
  'Manufacturing': 'tag-red',
  'Education': 'tag-cyan',
  'Real Estate': 'tag-yellow',
  'Professional Services': 'tag-pink',
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < full ? 'var(--warning)' : i === full && hasHalf ? 'var(--warning)' : 'none'}
          stroke={i < full || (i === full && hasHalf) ? 'var(--warning)' : 'var(--text-muted)'}
          strokeWidth={2}
        />
      ))}
      <span style={{ marginLeft: 4, fontSize: 13, fontWeight: 600 }}>{rating}</span>
    </span>
  );
}

function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', background: mentor.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0,
        }}>
          {mentor.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{mentor.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
            <span className={`tag ${industryTagColor[mentor.industry] || 'tag-blue'}`} style={{ fontSize: 11 }}>
              {mentor.industry}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{mentor.experience}yr exp</span>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {mentor.bio}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {mentor.skills.map(s => (
          <span key={s} className="tag" style={{ fontSize: 11 }}>{s}</span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <StarRating rating={mentor.rating} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} /> {mentor.availability}
          </span>
        </div>
        <button className="btn btn-primary" style={{ fontSize: 13 }}>Request Match</button>
      </div>
    </div>
  );
}

export default function MentorNetwork() {
  const [tab, setTab] = useState<'find' | 'directory' | 'become'>('find');
  const [filterIndustry, setFilterIndustry] = useState('All');
  const [filterExpertise, setFilterExpertise] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');

  const filteredMentors = mentors.filter(m => {
    if (filterIndustry !== 'All' && m.industry !== filterIndustry) return false;
    if (filterExpertise !== 'All' && !m.skills.includes(filterExpertise)) return false;
    if (filterAvailability !== 'All' && m.availability !== filterAvailability) return false;
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Ecosystem</span>
        <h1>Mentor Network</h1>
        <p>Connecting entrepreneurs with experienced mentors based on industry, skills, and availability.</p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-light)' }}>48</div>
          <div className="stat-label">Active Mentors</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>156</div>
          <div className="stat-label">Matches Made</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--warning)' }}>4.7</div>
          <div className="stat-label">Avg Rating</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--purple)' }}>12</div>
          <div className="stat-label">Industries</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${tab === 'find' ? 'active' : ''}`} onClick={() => setTab('find')}>Find a Mentor</button>
        <button className={`tab ${tab === 'directory' ? 'active' : ''}`} onClick={() => setTab('directory')}>Mentor Directory</button>
        <button className={`tab ${tab === 'become' ? 'active' : ''}`} onClick={() => setTab('become')}>Become a Mentor</button>
      </div>

      {/* Find a Mentor */}
      {tab === 'find' && (
        <div>
          <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'end', marginBottom: 20 }}>
            <div className="form-group" style={{ margin: 0, flex: '1 1 180px' }}>
              <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>Industry</label>
              <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)} style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13,
              }}>
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0, flex: '1 1 180px' }}>
              <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>Expertise</label>
              <select value={filterExpertise} onChange={e => setFilterExpertise(e.target.value)} style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13,
              }}>
                {expertiseOptions.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0, flex: '1 1 180px' }}>
              <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, display: 'block' }}>Availability</label>
              <select value={filterAvailability} onChange={e => setFilterAvailability(e.target.value)} style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13,
              }}>
                {availabilityOptions.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <button className="btn btn-secondary" style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Search size={14} /> Search
            </button>
          </div>

          {filteredMentors.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
              <Users size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
              <p>No mentors match your current filters. Try broadening your search.</p>
            </div>
          ) : (
            <div className="grid-2">
              {filteredMentors.map(m => <MentorCard key={m.name} mentor={m} />)}
            </div>
          )}
        </div>
      )}

      {/* Mentor Directory */}
      {tab === 'directory' && (
        <div className="grid-3">
          {mentors.map(m => <MentorCard key={m.name} mentor={m} />)}
        </div>
      )}

      {/* Become a Mentor */}
      {tab === 'become' && (
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="card">
            <h3 style={{ marginTop: 0, marginBottom: 16 }}>Apply to Be a Mentor</h3>

            <div className="form-group">
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Name</label>
              <input type="text" placeholder="Your full name" style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13,
              }} />
            </div>

            <div className="form-group">
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email</label>
              <input type="email" placeholder="you@example.com" style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13,
              }} />
            </div>

            <div className="form-group">
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Industry</label>
              <select style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13,
              }}>
                {industries.filter(i => i !== 'All').map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Years of Experience</label>
              <input type="number" placeholder="e.g. 10" min={0} style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13,
              }} />
            </div>

            <div className="form-group">
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Bio</label>
              <textarea rows={3} placeholder="Tell us about your professional background..." style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13, resize: 'vertical',
              }} />
            </div>

            <div className="form-group">
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Expertise (select all that apply)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {expertiseOptions.filter(e => e !== 'All').map(e => (
                  <label key={e} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                    <input type="checkbox" /> {e}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Availability</label>
              <div style={{ display: 'flex', gap: 16 }}>
                {['Weekly', 'Biweekly', 'Monthly'].map(a => (
                  <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                    <input type="radio" name="availability" value={a} /> {a}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Why I want to mentor</label>
              <textarea rows={3} placeholder="What motivates you to give back to the entrepreneurial community?" style={{
                width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 13, resize: 'vertical',
              }} />
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Submit Application</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Heart size={18} style={{ color: 'var(--accent-light)' }} /> What Mentors Do
              </h3>
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                  <CheckCircle size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 1 }} />
                  <span style={{ listStyleType: 'none' }}>Commit 1-2 hours per month to meet with your mentee</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                  <CheckCircle size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 1 }} />
                  <span>Respond to mentee messages within 48 hours</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                  <CheckCircle size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 1 }} />
                  <span>Attend quarterly mentor meetups and networking events</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'start', gap: 8 }}>
                  <CheckCircle size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 1 }} />
                  <span>Share honest, constructive feedback to help mentees grow</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award size={18} style={{ color: 'var(--warning)' }} /> Mentor Impact
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--success)' }}>35%</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Average mentee revenue increase</div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent-light)' }}>94%</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Mentor satisfaction rate</div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--purple)' }}>72%</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Mentees who stay active at 12 months</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
