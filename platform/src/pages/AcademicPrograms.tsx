import { useState } from 'react';
import { GraduationCap, Briefcase, Award, ChevronRight, Star, BookOpen, Users, Code, TrendingUp } from 'lucide-react';

interface MajorData {
  name: string;
  color: string;
  workstreams: string[];
  tools: string[];
  tracks: string[];
  skills: string[];
}

const majors: MajorData[] = [
  {
    name: 'Computer Science',
    color: '#3b82f6',
    workstreams: ['Infrastructure (cloud, APIs)', 'Intelligence (AI tools, MCP)', 'Platform development'],
    tools: ['Timeline', 'Dashboard'],
    tracks: ['Technical Infrastructure Track', 'AI/ML Engineering Track'],
    skills: ['AWS', 'TypeScript', 'Prompt engineering', 'Serverless architecture'],
  },
  {
    name: 'Data Science',
    color: '#3b82f6',
    workstreams: ['Metrics & analytics', 'EII computation', 'Equity audits', 'Dashboard development'],
    tools: ['Dashboard', 'Community Dashboard'],
    tracks: ['Data Analytics Track', 'Equity Measurement Track'],
    skills: ['Python', 'SQL', 'Data visualization', 'Statistical analysis'],
  },
  {
    name: 'Urban Planning',
    color: '#8b5cf6',
    workstreams: ['Corridor selection', 'Community engagement', 'Equity analysis', 'Policy design'],
    tools: ['Corridor Selector', 'Scorecard'],
    tracks: ['Community Planning Track', 'Equity Analysis Track'],
    skills: ['GIS', 'Community facilitation', 'Policy analysis', 'Mixed methods research'],
  },
  {
    name: 'Public Policy',
    color: '#8b5cf6',
    workstreams: ['Funding models', 'Regulatory frameworks', 'Data governance', 'Digital equity policy'],
    tools: ['Proposal Builder', 'Objection Handler'],
    tracks: ['Policy & Governance Track', 'Funding Strategy Track'],
    skills: ['Policy analysis', 'Grant writing', 'Regulatory compliance', 'Stakeholder engagement'],
  },
  {
    name: 'Business/Entrepreneurship',
    color: '#10b981',
    workstreams: ['Business formation pipeline', 'Vertical tracks', 'Marketplace', 'Mentorship'],
    tools: ['Messaging Generator', 'Proposal Builder'],
    tracks: ['Entrepreneur Support Track', 'Business Development Track'],
    skills: ['Business planning', 'Financial modeling', 'Market analysis', 'Pitch development'],
  },
  {
    name: 'Economics',
    color: '#10b981',
    workstreams: ['Economic impact analysis', 'EII development', 'Cost-benefit analysis', 'ROI modeling'],
    tools: ['Dashboard', 'Scorecard'],
    tracks: ['Impact Measurement Track', 'Economic Modeling Track'],
    skills: ['Econometrics', 'Impact evaluation', 'Cost modeling', 'Public finance'],
  },
  {
    name: 'Communications/Journalism',
    color: '#ec4899',
    workstreams: ['PR strategy', 'Press releases', 'Social media', 'Community storytelling'],
    tools: ['Communications', 'Messaging Generator', 'Presentations'],
    tracks: ['Communications Track', 'Community Storytelling Track'],
    skills: ['Media relations', 'Content strategy', 'Data journalism', 'Storytelling'],
  },
  {
    name: 'Graphic Design/UX',
    color: '#06b6d4',
    workstreams: ['Platform UI/UX', 'Dashboard design', 'Community-facing interfaces', 'Brand identity'],
    tools: ['Community Dashboard'],
    tracks: ['Design Systems Track', 'User Experience Track'],
    skills: ['Figma', 'User research', 'Accessibility design', 'Design systems'],
  },
  {
    name: 'Social Work',
    color: '#ef4444',
    workstreams: ['Community engagement', 'Equity audits', 'Digital literacy programs', 'Support systems'],
    tools: ['Stakeholder Tracker', 'Community Dashboard'],
    tracks: ['Community Engagement Track', 'Digital Equity Track'],
    skills: ['Community organizing', 'Cultural competency', 'Needs assessment', 'Program evaluation'],
  },
  {
    name: 'Law',
    color: '#f59e0b',
    workstreams: ['Data governance', 'Partnership agreements', 'Privacy policies', 'Regulatory navigation'],
    tools: ['Proposal Builder', 'Objection Handler'],
    tracks: ['Legal & Governance Track', 'Policy Compliance Track'],
    skills: ['Contract drafting', 'Privacy law', 'Municipal law', 'IP policy'],
  },
  {
    name: 'Education',
    color: '#10b981',
    workstreams: ['Digital literacy curriculum', 'AI training programs', 'Community workshops'],
    tools: ['Presentations'],
    tracks: ['Digital Literacy Track', 'Training & Workshop Track'],
    skills: ['Curriculum design', 'Adult education', 'Instructional design', 'Assessment'],
  },
  {
    name: 'Electrical Engineering',
    color: '#f59e0b',
    workstreams: ['Wi-Fi mesh design', 'IoT sensors', 'Edge computing', 'Network engineering'],
    tools: ['Timeline', 'Tracker'],
    tracks: ['Network Infrastructure Track', 'IoT Engineering Track'],
    skills: ['RF engineering', 'Network design', 'Embedded systems', 'Site surveying'],
  },
  {
    name: 'Information Science',
    color: '#3b82f6',
    workstreams: ['Data management', 'API design', 'Interoperability standards', 'Knowledge bases'],
    tools: ['Directory', 'Network'],
    tracks: ['Data Architecture Track', 'Platform Integration Track'],
    skills: ['Information architecture', 'Metadata', 'API design', 'Data standards'],
  },
  {
    name: 'Public Health',
    color: '#ef4444',
    workstreams: ['Health data integration', 'Community health metrics', 'Digital health access'],
    tools: ['Dashboard', 'Community Dashboard'],
    tracks: ['Health Informatics Track', 'Community Health Track'],
    skills: ['Epidemiology', 'Health informatics', 'Community health assessment'],
  },
  {
    name: 'Political Science',
    color: '#8b5cf6',
    workstreams: ['Governance models', 'Stakeholder analysis', 'Coalition building', 'Policy advocacy'],
    tools: ['Stakeholder Tracker', 'Governance model docs'],
    tracks: ['Governance & Policy Track', 'Coalition Building Track'],
    skills: ['Political analysis', 'Coalition building', 'Public administration'],
  },
];

const pathwaySteps = [
  {
    semester: 'Semester 1',
    title: 'Orientation & Foundations',
    description: 'Platform onboarding, DD fundamentals, foundational skill-building workshops, team assignment.',
    icon: BookOpen,
    color: '#3b82f6',
  },
  {
    semester: 'Semester 2',
    title: 'Active Contribution',
    description: 'Hands-on work in your assigned DD workstream, weekly deliverables, mentor pairing, portfolio building.',
    icon: Code,
    color: '#8b5cf6',
  },
  {
    semester: 'Semester 3 (Optional)',
    title: 'Leadership & Capstone',
    description: 'Lead a sub-team or complete a capstone project. Present findings to city stakeholders.',
    icon: Users,
    color: '#10b981',
  },
  {
    semester: 'Post-Graduation',
    title: 'Employment & Startup Pathway',
    description: 'Full-time roles in DD operations, civic tech startups, consulting, or municipal government positions.',
    icon: TrendingUp,
    color: '#ec4899',
  },
];

interface SkillRow {
  skill: string;
  workstreams: string[];
  inDemand: boolean;
}

const skillsMatrix: SkillRow[] = [
  { skill: 'Cloud Architecture', workstreams: ['Infrastructure', 'Platform Dev'], inDemand: true },
  { skill: 'AI/Prompt Engineering', workstreams: ['Intelligence', 'Platform Dev', 'Training'], inDemand: true },
  { skill: 'Data Analysis', workstreams: ['Metrics', 'EII', 'Health Data'], inDemand: true },
  { skill: 'Community Engagement', workstreams: ['Outreach', 'Equity Audits', 'Digital Literacy'], inDemand: false },
  { skill: 'Policy Writing', workstreams: ['Governance', 'Funding', 'Regulatory'], inDemand: false },
  { skill: 'UX Design', workstreams: ['Platform UI', 'Dashboards', 'Brand Identity'], inDemand: true },
  { skill: 'API Development', workstreams: ['Infrastructure', 'Data Management', 'Interoperability'], inDemand: true },
  { skill: 'Project Management', workstreams: ['All Workstreams', 'Timeline', 'Coordination'], inDemand: true },
  { skill: 'Public Speaking', workstreams: ['Community Engagement', 'Presentations', 'Advocacy'], inDemand: false },
  { skill: 'Grant Writing', workstreams: ['Funding', 'Proposals', 'Policy'], inDemand: false },
  { skill: 'Data Visualization', workstreams: ['Dashboards', 'Metrics', 'Community Reporting'], inDemand: true },
  { skill: 'Technical Writing', workstreams: ['Documentation', 'API Specs', 'Training Materials'], inDemand: false },
  { skill: 'Stakeholder Management', workstreams: ['Coalition Building', 'Governance', 'Outreach'], inDemand: true },
  { skill: 'Equity Analysis', workstreams: ['EII', 'Equity Audits', 'Community Health'], inDemand: false },
  { skill: 'Full-Stack Development', workstreams: ['Platform Dev', 'Infrastructure', 'Dashboards'], inDemand: true },
];

const creditPaths = [
  {
    title: 'Independent Study',
    description: 'Work with a faculty advisor to earn 3-6 credits while contributing to a DD workstream. Define learning objectives, deliverables, and assessment criteria aligned with your department.',
    icon: BookOpen,
  },
  {
    title: 'Capstone Project',
    description: 'Use your DD contributions as the basis for a senior capstone. Real stakeholders, real data, real impact -- the strongest possible portfolio piece.',
    icon: Award,
  },
  {
    title: 'Service Learning',
    description: 'Many departments offer service learning credit for community-facing work. DD projects in equity, outreach, and digital literacy qualify at most institutions.',
    icon: Users,
  },
  {
    title: 'Research Assistantship',
    description: 'Partner with faculty researching civic tech, digital equity, or economic development. DD provides unique datasets and real-world research opportunities.',
    icon: TrendingUp,
  },
];

export default function AcademicPrograms() {
  const [selectedMajor, setSelectedMajor] = useState<number>(0);

  const major = majors[selectedMajor];

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Academic Integration</span>
        <h1>Academic Programs & Pathways</h1>
        <p>
          Every major has a role in building a Digital District. Whether you study computer science or social work,
          urban planning or communications, your skills are needed. Find your pathway below.
        </p>
      </div>

      {/* Section 1: Major-to-Workstream Mapper */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <GraduationCap size={20} style={{ color: 'var(--accent)' }} />
          <h2 style={{ margin: 0 }}>Major-to-Workstream Mapper</h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          Select your major to see which DD workstreams, tools, and career tracks align with your studies.
        </p>

        <select
          value={selectedMajor}
          onChange={(e) => setSelectedMajor(Number(e.target.value))}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: 'var(--card)',
            color: 'var(--text)',
            fontSize: 15,
            marginBottom: 24,
            cursor: 'pointer',
          }}
        >
          {majors.map((m, i) => (
            <option key={m.name} value={i}>{m.name}</option>
          ))}
        </select>

        {/* Selected Major Detail */}
        <div style={{
          border: `2px solid ${major.color}`,
          borderRadius: 12,
          padding: 24,
          background: `linear-gradient(135deg, ${major.color}08, ${major.color}15)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: major.color,
            }} />
            <h3 style={{ margin: 0, fontSize: 20 }}>{major.name}</h3>
          </div>

          <div className="grid-2" style={{ gap: 20 }}>
            {/* Workstreams */}
            <div>
              <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.05em' }}>
                DD Workstreams
              </h4>
              {major.workstreams.map((ws) => (
                <div key={ws} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 0',
                  fontSize: 14,
                }}>
                  <ChevronRight size={14} style={{ color: major.color }} />
                  <span>{ws}</span>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div>
              <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.05em' }}>
                Platform Tools
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {major.tools.map((tool) => (
                  <span key={tool} className="tag tag-blue" style={{ fontSize: 12 }}>{tool}</span>
                ))}
              </div>

              <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10, marginTop: 20, letterSpacing: '0.05em' }}>
                Recommended Tracks
              </h4>
              {major.tracks.map((track) => (
                <a
                  key={track}
                  href="/students"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 0',
                    fontSize: 14,
                    color: major.color,
                    textDecoration: 'none',
                  }}
                >
                  <Briefcase size={14} />
                  <span>{track}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginTop: 20 }}>
            <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.05em' }}>
              Skills You Will Develop
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {major.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 500,
                    background: `${major.color}20`,
                    color: major.color,
                    border: `1px solid ${major.color}40`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Learning Pathway Visualization */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <BookOpen size={20} style={{ color: 'var(--accent)' }} />
          <h2 style={{ margin: 0 }}>Learning Pathway</h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
          Your journey from student to Digital District contributor and beyond.
        </p>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: 24,
            top: 40,
            bottom: 40,
            width: 2,
            background: 'var(--border)',
          }} />

          {pathwaySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.semester}
                style={{
                  display: 'flex',
                  gap: 20,
                  marginBottom: idx < pathwaySteps.length - 1 ? 32 : 0,
                  position: 'relative',
                }}
              >
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: `${step.color}20`,
                  border: `2px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                }}>
                  <Icon size={20} style={{ color: step.color }} />
                </div>
                <div style={{ paddingTop: 4 }}>
                  <span style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: step.color,
                  }}>
                    {step.semester}
                  </span>
                  <h4 style={{ margin: '4px 0 6px', fontSize: 16 }}>{step.title}</h4>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', maxWidth: 600 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Skills Development Matrix */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Star size={20} style={{ color: 'var(--accent)' }} />
          <h2 style={{ margin: 0 }}>Skills Development Matrix</h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          Key skills developed through DD participation. Skills marked with a star are most in-demand by employers.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 14,
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Skill
                </th>
                <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  DD Workstreams
                </th>
                <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  Employer Demand
                </th>
              </tr>
            </thead>
            <tbody>
              {skillsMatrix.map((row) => (
                <tr key={row.skill} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{
                    padding: '10px 12px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>
                    {row.skill}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {row.workstreams.map((ws) => (
                        <span key={ws} className="tag tag-purple" style={{ fontSize: 11 }}>{ws}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    {row.inDemand ? (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '3px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: 'var(--success)',
                      }}>
                        <Star size={12} fill="currentColor" /> High Demand
                      </span>
                    ) : (
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        background: 'var(--bg)',
                      }}>
                        Growing
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Progress bar summary */}
        <div style={{ marginTop: 20, padding: '16px 0 0', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: 'var(--text-muted)' }}>High-demand skills coverage</span>
            <span style={{ fontWeight: 600, color: 'var(--success)' }}>
              {skillsMatrix.filter(s => s.inDemand).length} of {skillsMatrix.length} skills
            </span>
          </div>
          <div style={{
            height: 8,
            borderRadius: 4,
            background: 'var(--bg)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${(skillsMatrix.filter(s => s.inDemand).length / skillsMatrix.length) * 100}%`,
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
            }} />
          </div>
        </div>
      </div>

      {/* Section 4: Credit & Recognition */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Award size={20} style={{ color: 'var(--accent)' }} />
          <h2 style={{ margin: 0 }}>Credit & Recognition</h2>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
          DD participation counts. Here is how your work translates to academic credit, career assets, and employment opportunities.
        </p>

        <div className="grid-2" style={{ marginBottom: 24 }}>
          {creditPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.title}
                style={{
                  padding: 20,
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'rgba(59, 130, 246, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon size={18} style={{ color: 'var(--accent)' }} />
                  </div>
                  <h4 style={{ margin: 0, fontSize: 15 }}>{path.title}</h4>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {path.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Portfolio, Letters, Employment */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 16,
        }}>
          <div style={{
            padding: 20,
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--bg)',
          }}>
            <h4 style={{ fontSize: 14, marginBottom: 8, color: '#3b82f6' }}>Portfolio Value</h4>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <li>Production-grade code contributions</li>
              <li>Published dashboards and data work</li>
              <li>Community impact documentation</li>
              <li>Cross-functional team experience</li>
            </ul>
          </div>
          <div style={{
            padding: 20,
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--bg)',
          }}>
            <h4 style={{ fontSize: 14, marginBottom: 8, color: '#8b5cf6' }}>Letters of Recommendation</h4>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <li>Faculty advisor endorsement</li>
              <li>City official reference letters</li>
              <li>Community partner testimonials</li>
              <li>Peer leadership evaluations</li>
            </ul>
          </div>
          <div style={{
            padding: 20,
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--bg)',
          }}>
            <h4 style={{ fontSize: 14, marginBottom: 8, color: '#10b981' }}>Employment Pipeline</h4>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <li>DD operations full-time roles</li>
              <li>Civic tech startup opportunities</li>
              <li>Municipal government positions</li>
              <li>Consulting and advisory roles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
