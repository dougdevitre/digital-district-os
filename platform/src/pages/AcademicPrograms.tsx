import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface MajorPathway {
  major: string;
  color: string;
  workstreams: string[];
  tools: { name: string; path: string }[];
  tracks: string[];
  skills: string[];
  semester1: string;
  semester2: string;
  semester3: string;
  career: string[];
}

const majors: MajorPathway[] = [
  { major: 'Computer Science', color: '#3b82f6', workstreams: ['Infrastructure (cloud, APIs)', 'Intelligence (AI tools, MCP)', 'Platform development'], tools: [{ name: 'Timeline', path: '/timeline' }, { name: 'Dashboard', path: '/dashboard' }], tracks: ['Cloud Infrastructure Lab', 'AI Business Tools Development', 'API Integration Engineering'], skills: ['AWS/Cloud Architecture', 'TypeScript/React', 'Prompt Engineering', 'Serverless Architecture'], semester1: 'AWS fundamentals, serverless patterns, DD codebase orientation', semester2: 'Build and deploy a cloud service or AI tool for the DD', semester3: 'Lead a technical workstream, mentor new students', career: ['Cloud Engineer at DD Authority', 'AI Engineer at civic tech org', 'CTO of DD-launched startup'] },
  { major: 'Data Science', color: '#3b82f6', workstreams: ['Metrics & analytics', 'EII computation', 'Equity audits', 'Dashboard development'], tools: [{ name: 'Dashboard', path: '/dashboard' }, { name: 'Community Dashboard', path: '/community' }], tracks: ['Economic Impact Analysis', 'Digital Equity Audit'], skills: ['Python/SQL', 'Data Visualization', 'Statistical Analysis', 'Impact Evaluation'], semester1: 'DD data sources, EII framework, baseline data collection', semester2: 'Build equity dashboards, produce neighborhood-level analysis', semester3: 'Lead quarterly impact report, design automated reporting', career: ['Data Analyst at city government', 'Impact analyst at foundation', 'Analytics lead at DD Authority'] },
  { major: 'Urban Planning', color: '#8b5cf6', workstreams: ['Corridor selection', 'Community engagement', 'Equity analysis', 'Policy design'], tools: [{ name: 'Corridor Selector', path: '/corridor' }, { name: 'Scorecard', path: '/scorecard' }], tracks: ['Community Engagement Research', 'Digital Equity Audit'], skills: ['GIS Analysis', 'Community Facilitation', 'Policy Analysis', 'Mixed Methods Research'], semester1: 'DD framework, corridor assessment methodology, community mapping', semester2: 'Conduct site assessments, facilitate listening sessions, write policy briefs', semester3: 'Lead community engagement for new corridor expansion', career: ['Digital equity planner at city', 'Community development specialist', 'Urban tech consultant'] },
  { major: 'Public Policy', color: '#8b5cf6', workstreams: ['Funding models', 'Regulatory frameworks', 'Data governance', 'Digital equity policy'], tools: [{ name: 'Proposal Builder', path: '/proposal' }, { name: 'Objection Handler', path: '/objections' }], tracks: ['Legal & Policy Framework', 'Grant Writing & Funding'], skills: ['Policy Analysis', 'Grant Writing', 'Regulatory Compliance', 'Stakeholder Engagement'], semester1: 'DD policy landscape, existing regulations, funding mechanisms', semester2: 'Draft data governance policies, write grant applications', semester3: 'Lead policy working group, testify at council hearings', career: ['Policy analyst at city', 'Program officer at foundation', 'Government relations at tech org'] },
  { major: 'Business / Entrepreneurship', color: '#10b981', workstreams: ['Business formation pipeline', 'Vertical acceleration tracks', 'Marketplace', 'Mentorship'], tools: [{ name: 'Messaging Generator', path: '/messaging' }, { name: 'Proposal Builder', path: '/proposal' }], tracks: ['Entrepreneurship in Residence', 'Grant Writing & Funding'], skills: ['Business Planning', 'Financial Modeling', 'Market Analysis', 'Pitch Development'], semester1: 'DD ecosystem overview, AI-assisted business planning tools', semester2: 'Launch a business using DD tools, document the process', semester3: 'Mentor next cohort, lead vertical acceleration track', career: ['Founder of DD-launched business', 'Ecosystem manager at DD Authority', 'Innovation consultant'] },
  { major: 'Economics', color: '#10b981', workstreams: ['Economic impact analysis', 'EII development', 'Cost-benefit analysis', 'ROI modeling'], tools: [{ name: 'Dashboard', path: '/dashboard' }, { name: 'Scorecard', path: '/scorecard' }], tracks: ['Economic Impact Analysis'], skills: ['Econometrics', 'Impact Evaluation', 'Cost Modeling', 'Public Finance'], semester1: 'EII framework, public finance of digital infrastructure', semester2: 'Conduct cost-benefit analysis, build economic models', semester3: 'Publish research, present at conferences', career: ['Economic analyst at city', 'Research economist at think tank', 'Impact evaluator'] },
  { major: 'Communications / Journalism', color: '#ec4899', workstreams: ['PR strategy', 'Press releases', 'Social media', 'Community storytelling'], tools: [{ name: 'Communications', path: '/communications' }, { name: 'Messaging Generator', path: '/messaging' }], tracks: ['Data Journalism & Storytelling'], skills: ['Media Relations', 'Content Strategy', 'Data Journalism', 'Storytelling'], semester1: 'DD communication plan, media landscape, key stakeholders', semester2: 'Write press materials, produce newsletter, manage social channels', semester3: 'Lead communications strategy for major milestone', career: ['Communications director at DD', 'Civic tech journalist', 'Public affairs specialist'] },
  { major: 'Graphic Design / UX', color: '#06b6d4', workstreams: ['Platform UI/UX', 'Dashboard design', 'Community interfaces', 'Brand identity'], tools: [{ name: 'Community Dashboard', path: '/community' }], tracks: ['UX/UI Design Studio'], skills: ['Figma', 'User Research', 'Accessibility Design', 'Design Systems'], semester1: 'DD user personas, accessibility requirements, existing interfaces', semester2: 'Design and test new interfaces with real entrepreneurs', semester3: 'Lead design system, mentor junior designers', career: ['Product designer at civic tech', 'UX lead at DD Authority', 'Design consultant'] },
  { major: 'Social Work', color: '#ef4444', workstreams: ['Community engagement', 'Equity audits', 'Digital literacy', 'Support systems'], tools: [{ name: 'Stakeholder Tracker', path: '/stakeholders' }, { name: 'Community Dashboard', path: '/community' }], tracks: ['Community Engagement Research', 'Digital Equity Audit'], skills: ['Community Organizing', 'Cultural Competency', 'Needs Assessment', 'Program Evaluation'], semester1: 'DD equity framework, community asset mapping', semester2: 'Facilitate listening sessions, conduct needs assessments', semester3: 'Lead equity subcommittee of advisory board', career: ['Community program manager', 'Digital equity coordinator', 'Nonprofit director'] },
  { major: 'Law', color: '#f59e0b', workstreams: ['Data governance', 'Partnership agreements', 'Privacy policies', 'Regulatory navigation'], tools: [{ name: 'Proposal Builder', path: '/proposal' }, { name: 'Objection Handler', path: '/objections' }], tracks: ['Legal & Policy Framework'], skills: ['Contract Drafting', 'Privacy Law', 'Municipal Law', 'IP Policy'], semester1: 'DD legal landscape, data governance frameworks, existing agreements', semester2: 'Draft MOUs, privacy policies, data sharing agreements', semester3: 'Advise on cross-city legal framework for DDIS compliance', career: ['Municipal technology counsel', 'Privacy officer', 'Tech policy attorney'] },
  { major: 'Education', color: '#06b6d4', workstreams: ['Digital literacy curriculum', 'AI training programs', 'Community workshops'], tools: [{ name: 'Presentations', path: '/presentations' }], tracks: ['Community Engagement Research'], skills: ['Curriculum Design', 'Adult Education', 'Instructional Design', 'Assessment'], semester1: 'Digital literacy landscape, DD tools and capabilities', semester2: 'Design and pilot AI literacy curriculum', semester3: 'Train community facilitators, scale to all wards', career: ['Digital literacy program director', 'Instructional designer', 'EdTech specialist'] },
  { major: 'Electrical Engineering', color: '#f59e0b', workstreams: ['Wi-Fi mesh design', 'IoT sensors', 'Edge computing', 'Network engineering'], tools: [{ name: 'Timeline', path: '/timeline' }, { name: 'Tracker', path: '/tracker' }], tracks: ['Wi-Fi Network Design'], skills: ['RF Engineering', 'Network Design', 'Embedded Systems', 'Site Surveying'], semester1: 'Mesh networking fundamentals, corridor assessment methods', semester2: 'Design and test Wi-Fi deployment for new corridor', semester3: 'Lead infrastructure expansion to additional corridors', career: ['Network engineer at ISP/municipal', 'IoT infrastructure engineer', 'Smart city consultant'] },
  { major: 'Information Science', color: '#3b82f6', workstreams: ['Data management', 'API design', 'Interoperability standards', 'Knowledge bases'], tools: [{ name: 'Directory', path: '/directory' }, { name: 'Network', path: '/network' }], tracks: ['API Integration Engineering'], skills: ['Information Architecture', 'Metadata Standards', 'API Design', 'Data Standards'], semester1: 'DD data model, DDIS standard, existing API catalog', semester2: 'Design data standards, build knowledge base architecture', semester3: 'Lead interoperability working group', career: ['Data architect', 'Standards engineer', 'Knowledge manager'] },
  { major: 'Public Health', color: '#ef4444', workstreams: ['Health data integration', 'Community health metrics', 'Digital health access'], tools: [{ name: 'Dashboard', path: '/dashboard' }, { name: 'Community Dashboard', path: '/community' }], tracks: ['Digital Equity Audit'], skills: ['Epidemiology', 'Health Informatics', 'Community Health Assessment', 'Data Analysis'], semester1: 'Health equity frameworks, DD health-adjacent metrics', semester2: 'Design health outcome tracking for DD entrepreneurs', semester3: 'Publish health impact research', career: ['Health informatics specialist', 'Community health analyst', 'Digital health equity researcher'] },
  { major: 'Political Science', color: '#8b5cf6', workstreams: ['Governance models', 'Stakeholder analysis', 'Coalition building', 'Policy advocacy'], tools: [{ name: 'Stakeholder Tracker', path: '/stakeholders' }], tracks: ['Grant Writing & Funding'], skills: ['Political Analysis', 'Coalition Building', 'Public Administration', 'Advocacy'], semester1: 'DD governance model, stakeholder landscape, political dynamics', semester2: 'Map stakeholders, support council briefings, analyze politics', semester3: 'Lead governance transition planning', career: ['Policy advisor', 'Government affairs director', 'Civic innovation manager'] },
];

const skillsMatrix = [
  { skill: 'Cloud Architecture', demand: 'Very High', workstreams: ['Infrastructure', 'Platform Dev'] },
  { skill: 'AI / Prompt Engineering', demand: 'Very High', workstreams: ['Intelligence', 'Applications'] },
  { skill: 'Data Analysis', demand: 'High', workstreams: ['Metrics', 'Equity', 'Impact'] },
  { skill: 'Community Engagement', demand: 'High', workstreams: ['Community', 'Governance'] },
  { skill: 'Policy Writing', demand: 'High', workstreams: ['Policy', 'Governance', 'Funding'] },
  { skill: 'UX Design', demand: 'High', workstreams: ['Platform Dev', 'Applications'] },
  { skill: 'API Development', demand: 'High', workstreams: ['Infrastructure', 'Integration'] },
  { skill: 'Project Management', demand: 'Medium', workstreams: ['All workstreams'] },
  { skill: 'Public Speaking', demand: 'Medium', workstreams: ['Communications', 'Governance'] },
  { skill: 'Grant Writing', demand: 'Medium', workstreams: ['Funding', 'Policy'] },
  { skill: 'Data Visualization', demand: 'High', workstreams: ['Metrics', 'Communications'] },
  { skill: 'Technical Writing', demand: 'Medium', workstreams: ['Infrastructure', 'Integration'] },
  { skill: 'Stakeholder Management', demand: 'High', workstreams: ['Governance', 'Community'] },
  { skill: 'Equity Analysis', demand: 'High', workstreams: ['Equity', 'Community', 'Metrics'] },
  { skill: 'Full-Stack Development', demand: 'Very High', workstreams: ['Platform Dev', 'Applications'] },
];

export default function AcademicPrograms() {
  const [selectedMajor, setSelectedMajor] = useState<string>('Computer Science');

  const pathway = majors.find(m => m.major === selectedMajor);

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Academic Integration</span>
        <h1>Academic Programs & Pathways</h1>
        <p>Every major can contribute to building a Digital District. Select yours to see exactly how your studies connect to real-world impact.</p>
      </div>

      {/* Major Selector */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3>Select Your Major</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {majors.map(m => (
            <button
              key={m.major}
              className={`btn btn-sm ${selectedMajor === m.major ? 'btn-primary' : 'btn-secondary'}`}
              style={selectedMajor === m.major ? { background: m.color, borderColor: m.color } : {}}
              onClick={() => setSelectedMajor(m.major)}
            >
              {m.major}
            </button>
          ))}
        </div>
      </div>

      {pathway && (
        <>
          {/* Pathway Overview */}
          <div className="card" style={{ borderLeft: `4px solid ${pathway.color}`, marginBottom: 24 }}>
            <h2 style={{ marginBottom: 12 }}>{pathway.major}</h2>
            <div className="grid-2">
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>DD Workstreams You Can Contribute To</div>
                <ul style={{ fontSize: 13, paddingLeft: 16, lineHeight: 2 }}>
                  {pathway.workstreams.map(w => <li key={w}>{w}</li>)}
                </ul>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>Skills You'll Develop</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {pathway.skills.map(s => <span key={s} className="tag" style={{ background: `${pathway.color}22`, color: pathway.color }}>{s}</span>)}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>Platform Tools Most Relevant to You</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {pathway.tools.map(t => (
                  <Link key={t.path} to={t.path} className="btn btn-sm btn-secondary">
                    {t.name} <ArrowRight size={12} />
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>Recommended Program Tracks</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {pathway.tracks.map(t => (
                  <Link key={t} to="/students" className="tag tag-green" style={{ textDecoration: 'none' }}>{t}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* Semester Timeline */}
          <div className="card" style={{ marginBottom: 24 }}>
            <h3>Your Learning Pathway</h3>
            <div style={{ display: 'flex', gap: 1, background: 'var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginTop: 12 }}>
              {[
                { label: 'Semester 1: Foundation', content: pathway.semester1, color: '#f59e0b' },
                { label: 'Semester 2: Contribution', content: pathway.semester2, color: '#3b82f6' },
                { label: 'Semester 3: Leadership', content: pathway.semester3, color: '#10b981' },
              ].map((sem, i) => (
                <div key={i} style={{ flex: 1, background: 'var(--bg-card)', padding: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: sem.color, marginBottom: 6 }}>{sem.label}</div>
                  <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{sem.content}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: 16, background: 'var(--bg)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--cyan)', marginBottom: 6 }}>Post-Graduation Career Paths</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {pathway.career.map(c => <span key={c} className="tag tag-cyan">{c}</span>)}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Skills Matrix */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3>Skills Development Matrix</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Skills you'll develop through DD work, their employer demand, and which workstreams develop them.</p>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Skill</th>
                <th>Employer Demand</th>
                <th>Developed In</th>
              </tr>
            </thead>
            <tbody>
              {skillsMatrix.map(s => (
                <tr key={s.skill}>
                  <td style={{ fontWeight: 600 }}>{s.skill}</td>
                  <td>
                    <span className={`tag ${s.demand === 'Very High' ? 'tag-green' : s.demand === 'High' ? 'tag-blue' : 'tag-yellow'}`}>
                      {s.demand}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {s.workstreams.map(w => <span key={w} className="tag tag-purple" style={{ fontSize: 10 }}>{w}</span>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit & Recognition */}
      <div className="card">
        <h3>Credit & Recognition</h3>
        <div className="grid-2">
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>Academic Credit Options</div>
            <ul style={{ fontSize: 13, paddingLeft: 16, lineHeight: 2 }}>
              <li><strong>Independent Study</strong> — 1-3 credits, flexible schedule</li>
              <li><strong>Capstone/Thesis</strong> — 3-6 credits, major deliverable</li>
              <li><strong>Service Learning</strong> — 1-3 credits, community focus</li>
              <li><strong>Research Assistantship</strong> — Stipend + tuition, graduate students</li>
              <li><strong>Practicum/Internship</strong> — 3-6 credits, paid position</li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>What Goes on Your Resume</div>
            <ul style={{ fontSize: 13, paddingLeft: 16, lineHeight: 2 }}>
              <li>Real deployed infrastructure (not class projects)</li>
              <li>Published research, policy briefs, and data journalism</li>
              <li>Open-source code contributions with your name on them</li>
              <li>Community engagement with measurable outcomes</li>
              <li>Letters of recommendation from city leaders</li>
              <li>Direct employment pipeline at DD Authority or partners</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
