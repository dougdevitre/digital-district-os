import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-react';

const disciplineColors: Record<string, string> = {
  'CS / Engineering': '#3b82f6',
  'Urban Planning / Policy': '#8b5cf6',
  'Business / Economics': '#10b981',
  'Communications / Design': '#ec4899',
  'Law / Social Work': '#f59e0b',
  'Education': '#06b6d4',
};

function getColor(discipline: string) {
  for (const [key, color] of Object.entries(disciplineColors)) {
    if (discipline.includes(key.split(' ')[0])) return color;
  }
  return '#94a3b8';
}

interface ProgramTrack {
  title: string;
  discipline: string;
  duration: string;
  description: string;
  learn: string[];
  deliver: string[];
}

const programTracks: ProgramTrack[] = [
  { title: 'Wi-Fi Network Design', discipline: 'Engineering', duration: '1 semester', description: 'Design mesh Wi-Fi coverage for a Digital Mainstreet corridor. Conduct site surveys, model coverage, and specify equipment.', learn: ['RF propagation and mesh networking', 'Site survey methodology', 'Municipal infrastructure permitting'], deliver: ['Coverage simulation map', 'Equipment specification document', 'Installation schedule'] },
  { title: 'Cloud Infrastructure Lab', discipline: 'CS / DevOps', duration: '1 semester', description: 'Set up the AWS environment powering a Digital District: Lambda, DynamoDB, Cognito, API Gateway, CloudWatch.', learn: ['Serverless architecture on AWS', 'IAM and security best practices', 'Infrastructure as Code (CDK)'], deliver: ['Working cloud stack', 'IAM policy documentation', 'Monitoring dashboards'] },
  { title: 'AI Business Tools Development', discipline: 'CS / AI', duration: '1-2 semesters', description: 'Build Claude-powered tools that help entrepreneurs write business plans, generate marketing copy, and create legal documents.', learn: ['Prompt engineering and Claude API', 'MCP server development', 'Product design for non-technical users'], deliver: ['3+ deployed AI skills', 'User documentation', 'Usage analytics dashboard'] },
  { title: 'Community Engagement Research', discipline: 'Urban Planning', duration: '1 semester', description: 'Design and facilitate community listening sessions. Build trust surveys and document community needs before technology deploys.', learn: ['Participatory design methods', 'Survey instrument design', 'Cross-cultural facilitation'], deliver: ['Engagement methodology guide', 'Trust survey instrument', 'Community needs report'] },
  { title: 'Economic Impact Analysis', discipline: 'Economics', duration: '1 semester', description: 'Build the Economic Inclusion Index measurement framework for a specific city. Establish baselines and create reporting systems.', learn: ['Impact evaluation methods', 'Composite index construction', 'Public data analysis'], deliver: ['EII baseline report', 'Data collection methodology', 'Dashboard prototype'] },
  { title: 'Digital Equity Audit', discipline: 'Public Policy', duration: '1 semester', description: 'Audit who benefits and who doesn\'t from Digital District deployment. Produce equity reports disaggregated by geography, race, gender, and income.', learn: ['Equity analysis frameworks', 'GIS and demographic data', 'Policy brief writing'], deliver: ['Equity audit report', 'Neighborhood-level heat maps', 'Policy recommendations'] },
  { title: 'UX/UI Design Studio', discipline: 'Design / HCI', duration: '1 semester', description: 'Design the interfaces entrepreneurs use daily: onboarding flows, dashboards, mobile tools, and community portals.', learn: ['User research with diverse populations', 'Accessible design (WCAG)', 'Design system creation'], deliver: ['Figma prototypes (5+ screens)', 'Design system', 'User research findings report'] },
  { title: 'API Integration Engineering', discipline: 'CS / Software Eng', duration: '1 semester', description: 'Build adapter APIs that connect existing Innovation District systems to the Digital District network.', learn: ['RESTful API design', 'OAuth/OIDC authentication', 'Integration testing'], deliver: ['Documented APIs (OpenAPI spec)', 'Integration test suite', 'Developer documentation'] },
  { title: 'Data Journalism & Storytelling', discipline: 'Communications', duration: '1 semester', description: 'Tell the stories of Digital District entrepreneurs through data. Produce articles, visualizations, and newsletter content.', learn: ['Data visualization (D3, Recharts)', 'Interviewing entrepreneurs', 'Narrative nonfiction'], deliver: ['5+ published stories', 'Data visualization portfolio', 'Newsletter content series'] },
  { title: 'Grant Writing & Funding', discipline: 'Public Admin', duration: '1 semester', description: 'Research funding sources and write grant applications for Digital District expansion. Analyze the funder landscape.', learn: ['Federal/state grant mechanisms', 'Logic model development', 'Budget narrative writing'], deliver: ['3+ grant applications', 'Funder landscape analysis', 'Sustainability plan'] },
  { title: 'Legal & Policy Framework', discipline: 'Law / Policy', duration: '1 semester', description: 'Draft data governance policies, partnership MOUs, open data mandates, and privacy policies for the Digital District.', learn: ['Municipal technology law', 'Data privacy regulations', 'Open-source licensing'], deliver: ['Policy template library', 'Legal analysis memo', 'Regulatory compliance guide'] },
  { title: 'Entrepreneurship in Residence', discipline: 'Business', duration: '1-2 semesters', description: 'Students actually start businesses using Digital District infrastructure. Build, launch, and document the experience.', learn: ['AI-assisted business planning', 'Customer discovery', 'Building in public'], deliver: ['Launched business', 'Case study document', '20+ mentorship hours logged'] },
];

interface CapstoneProject {
  title: string;
  disciplines: string[];
  abstract: string;
  questions: string[];
  output: string;
  duration: string;
}

const capstoneProjects: CapstoneProject[] = [
  { title: 'Measuring the Delmar Divide: Digital Infrastructure as an Equity Intervention', disciplines: ['Economics', 'Urban Planning'], abstract: 'Compare business formation rates on each side of Delmar Boulevard before and after Digital District deployment. Test whether digital infrastructure reduces the measured economic gap.', questions: ['Does corridor Wi-Fi and AI tool access increase business formation in below-median-income neighborhoods?', 'How does the cost-per-entrepreneur compare to physical incubator models?'], output: 'Peer-reviewed paper + policy brief', duration: '2 semesters' },
  { title: 'AI Literacy at Scale: Training Non-Technical Small Business Owners', disciplines: ['Education', 'HCI'], abstract: 'Design, deliver, and evaluate an AI literacy curriculum for small business owners who have never used AI tools. Measure skill acquisition and business impact.', questions: ['What curriculum design produces measurable AI skill acquisition in non-technical adults?', 'Does AI literacy training translate to measurable business outcomes within 90 days?'], output: 'Curriculum + evaluation study', duration: '2 semesters' },
  { title: 'Network Effects in Hybrid Physical-Digital Innovation Ecosystems', disciplines: ['Business', 'Innovation Studies'], abstract: 'Model how connecting physical Innovation Districts to digital layers changes innovation diffusion patterns. Use St. Louis (Cortex + Delmar) as case study.', questions: ['Do cross-node API connections increase the rate of new business formation?', 'How does identity federation change user behavior across physical and digital nodes?'], output: 'Quantitative model + case study', duration: '2 semesters' },
  { title: 'Privacy by Design in Community Wi-Fi Networks', disciplines: ['CS', 'Privacy/Law'], abstract: 'Implement and evaluate privacy-preserving analytics for corridor Wi-Fi. Design a system that provides useful usage data without tracking individuals.', questions: ['Can differential privacy techniques provide actionable corridor analytics?', 'What is the minimum data collection that satisfies operational needs?'], output: 'Working prototype + privacy audit', duration: '1-2 semesters' },
  { title: 'The 70/30 Rule: Optimal Physical vs. Digital Capital Allocation', disciplines: ['Economics', 'Public Finance'], abstract: 'Empirically test the proposed 70/30 digital/physical funding split using comparative case studies across cities with different allocation strategies.', questions: ['What is the ROI per dollar for physical vs. digital infrastructure investment?', 'Is there an optimal allocation ratio, and does it vary by city characteristics?'], output: 'Empirical analysis + policy framework', duration: '2 semesters' },
  { title: 'MCP as Public Infrastructure: AI Tool Interoperability for Government', disciplines: ['CS', 'Public Policy'], abstract: 'Design and prototype Model Context Protocol server standards for municipal AI services. Demonstrate how government services become AI-accessible.', questions: ['Can MCP provide a standard interface for diverse municipal services?', 'What governance is needed for public-sector AI tool interoperability?'], output: 'MCP server prototype + standards proposal', duration: '1-2 semesters' },
  { title: 'Community Trust Metrics: Validating Pre-Deployment Assessment', disciplines: ['Sociology', 'Psychology'], abstract: 'Develop and validate the community trust score instrument used before technology deployment. Test reliability and predictive validity across diverse communities.', questions: ['What constructs best predict community receptivity to digital infrastructure?', 'Does pre-deployment trust score predict post-deployment adoption rates?'], output: 'Validated instrument + psychometric study', duration: '2 semesters' },
  { title: 'Cross-District Identity Federation: Technical and Policy Analysis', disciplines: ['CS', 'Law'], abstract: 'Implement OpenID Connect federation between two Digital Districts and analyze the technical challenges and policy requirements for cross-jurisdictional identity.', questions: ['What are the minimum technical requirements for cross-district identity?', 'What legal frameworks are needed for cross-jurisdictional data portability?'], output: 'Working federation + legal analysis', duration: '2 semesters' },
];

interface Internship {
  role: string;
  duration: string;
  description: string;
  skills: string[];
  pay: string;
  discipline: string;
}

const internships: Internship[] = [
  { role: 'Infrastructure Intern', duration: '3-6 months', description: 'Help deploy and monitor Wi-Fi mesh and AWS cloud infrastructure. Troubleshoot, optimize, and document.', skills: ['AWS', 'Networking', 'Linux', 'Monitoring'], pay: '$18-25/hr', discipline: 'Engineering' },
  { role: 'AI Engineering Intern', duration: '3-6 months', description: 'Build AI-powered business tools using Claude API. Develop MCP servers and prompt engineering skills.', skills: ['TypeScript', 'Prompt Engineering', 'APIs', 'React'], pay: '$20-30/hr', discipline: 'CS' },
  { role: 'Community Engagement Intern', duration: '3-6 months', description: 'Organize listening sessions, manage advisory board logistics, document community feedback and themes.', skills: ['Facilitation', 'Writing', 'Cultural Competency', 'Event Planning'], pay: '$15-20/hr', discipline: 'Urban Planning' },
  { role: 'Data & Analytics Intern', duration: '3-6 months', description: 'Build dashboards, track KPIs, produce equity reports, and analyze business formation patterns.', skills: ['SQL', 'Python', 'Data Viz', 'Statistics'], pay: '$18-25/hr', discipline: 'Economics' },
  { role: 'Communications Intern', duration: '3-6 months', description: 'Write press releases, manage social media, produce newsletters, and create content for public dashboards.', skills: ['Writing', 'Social Media', 'Design', 'Photography'], pay: '$15-20/hr', discipline: 'Communications' },
  { role: 'Product Design Intern', duration: '3-6 months', description: 'Design UX for entrepreneur-facing tools. Conduct user research, build prototypes, test with real users.', skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility'], pay: '$18-25/hr', discipline: 'Design' },
];

const syllabi = [
  { code: 'CS 4XX', title: 'Building Digital Public Infrastructure', level: 'Upper-division CS', description: 'Students build real components of a Digital District: cloud infrastructure, AI tools, APIs, and dashboards.', modules: ['Serverless Architecture on AWS (weeks 1-3)', 'Identity Systems and Auth (weeks 4-5)', 'AI Tool Development with Claude API (weeks 6-9)', 'API Design and Integration (weeks 10-12)', 'Dashboard and Monitoring (weeks 13-15)'], tools: ['Cloud Infrastructure Lab', 'Timeline', 'Dashboard'], deliverable: 'Working cloud service deployed to Digital District staging environment' },
  { code: 'URBP 5XX', title: 'Digital Districts and Urban Equity', level: 'Graduate Urban Planning', description: 'Seminar examining how digital infrastructure can address or exacerbate urban inequality. Students conduct equity audits of real DD deployments.', modules: ['Innovation Districts: History and Critique (weeks 1-3)', 'The Place-to-Platform Thesis (weeks 4-5)', 'Community Engagement Design (weeks 6-8)', 'Equity Measurement Frameworks (weeks 9-11)', 'Policy Recommendations (weeks 12-15)'], tools: ['Readiness Scorecard', 'Corridor Selector', 'Community Dashboard'], deliverable: 'Equity audit report with policy recommendations for a specific corridor' },
  { code: 'BUS 3XX', title: 'Entrepreneurship in AI-Powered Ecosystems', level: 'Undergraduate Business', description: 'Students start real micro-businesses using Digital District AI tools. Learn business planning, customer discovery, and AI-assisted operations.', modules: ['The AI Entrepreneurship Landscape (weeks 1-2)', 'AI-Assisted Business Planning (weeks 3-5)', 'Customer Discovery and Validation (weeks 6-8)', 'Building with AI Tools (weeks 9-11)', 'Launch, Measure, Iterate (weeks 12-15)'], tools: ['Messaging Generator', 'Proposal Builder', 'Presentations'], deliverable: 'Launched micro-business with documented case study' },
];

type TabType = 'tracks' | 'capstone' | 'internships' | 'faculty';

export default function StudentHub() {
  const [tab, setTab] = useState<TabType>('tracks');
  const [expandedCapstone, setExpandedCapstone] = useState<Record<number, boolean>>({});
  const [expandedSyllabus, setExpandedSyllabus] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier2">Student Programs</span>
        <h1>Student Engagement Hub</h1>
        <p>Students are essential to building Digital Districts. Whether you study computer science, urban planning, business, design, or policy — there's a role for you with real impact, academic credit, and career value.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-light)' }}>12</div>
          <div className="stat-label">Program Tracks</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--purple)' }}>5</div>
          <div className="stat-label">Academic Disciplines</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>8</div>
          <div className="stat-label">Capstone Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--cyan)' }}>6</div>
          <div className="stat-label">Paid Internships</div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'tracks' ? 'active' : ''}`} onClick={() => setTab('tracks')}>Program Tracks</button>
        <button className={`tab ${tab === 'capstone' ? 'active' : ''}`} onClick={() => setTab('capstone')}>Capstone Projects</button>
        <button className={`tab ${tab === 'internships' ? 'active' : ''}`} onClick={() => setTab('internships')}>Internships</button>
        <button className={`tab ${tab === 'faculty' ? 'active' : ''}`} onClick={() => setTab('faculty')}>For Faculty</button>
      </div>

      {tab === 'tracks' && (
        <div className="grid-3">
          {programTracks.map((track, i) => {
            const color = getColor(track.discipline);
            return (
              <div key={i} className="card" style={{ borderLeft: `4px solid ${color}` }}>
                <h3 style={{ marginBottom: 4 }}>{track.title}</h3>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <span className="tag" style={{ background: `${color}22`, color }}>{track.discipline}</span>
                  <span className="tag tag-blue">{track.duration}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{track.description}</p>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>What You Learn</div>
                  <ul style={{ fontSize: 12, paddingLeft: 16, lineHeight: 1.8, color: 'var(--text)' }}>
                    {track.learn.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>What You Deliver</div>
                  <ul style={{ fontSize: 12, paddingLeft: 16, lineHeight: 1.8, color: 'var(--text)' }}>
                    {track.deliver.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'capstone' && (
        <div>
          {capstoneProjects.map((project, i) => {
            const isOpen = expandedCapstone[i] ?? false;
            return (
              <div key={i} className="accordion-item">
                <div className="accordion-header" onClick={() => setExpandedCapstone(prev => ({ ...prev, [i]: !prev[i] }))}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600 }}>{project.title}</span>
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      {project.disciplines.map(d => (
                        <span key={d} className="tag" style={{ background: `${getColor(d)}22`, color: getColor(d) }}>{d}</span>
                      ))}
                      <span className="tag tag-blue">{project.duration}</span>
                    </div>
                  </div>
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                {isOpen && (
                  <div className="accordion-body">
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>Abstract</div>
                      <p style={{ fontSize: 14, lineHeight: 1.7 }}>{project.abstract}</p>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>Research Questions</div>
                      <ol style={{ fontSize: 13, paddingLeft: 20, lineHeight: 1.8 }}>
                        {project.questions.map((q, j) => <li key={j}>{q}</li>)}
                      </ol>
                    </div>
                    <div style={{ display: 'flex', gap: 24 }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>Expected Output</div>
                        <p style={{ fontSize: 13 }}>{project.output}</p>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-secondary" style={{ marginTop: 12 }} onClick={() => handleCopy(`${project.title}\n\n${project.abstract}\n\nResearch Questions:\n${project.questions.map((q, j) => `${j + 1}. ${q}`).join('\n')}\n\nExpected Output: ${project.output}`, i)}>
                      {copied === i ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy Brief</>}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'internships' && (
        <div className="grid-2">
          {internships.map((intern, i) => {
            const color = getColor(intern.discipline);
            return (
              <div key={i} className="card" style={{ borderLeft: `4px solid ${color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                  <h3 style={{ marginBottom: 0 }}>{intern.role}</h3>
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--success)' }}>{intern.pay}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <span className="tag" style={{ background: `${color}22`, color }}>{intern.discipline}</span>
                  <span className="tag tag-blue">{intern.duration}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{intern.description}</p>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
                  {intern.skills.map(s => <span key={s} className="tag tag-blue">{s}</span>)}
                </div>
                <button className="btn btn-sm btn-primary">Express Interest</button>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'faculty' && (
        <div>
          <div className="card">
            <h3>Partnership Models</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16 }}>
              Four ways to integrate Digital District work into your courses:
            </p>
            <div className="grid-4">
              {[
                { model: 'Capstone Project', desc: 'Students complete a DD project as their senior capstone. Faculty advises, DD team mentors.', credit: '3-6 credits' },
                { model: 'Service Learning', desc: 'Course includes DD community engagement as service component. Works for planning, social work, education.', credit: '1-3 credits' },
                { model: 'Independent Study', desc: 'Individual students work on DD projects under faculty supervision. Flexible, self-directed.', credit: '1-3 credits' },
                { model: 'Research Assistantship', desc: 'Graduate students conduct DD research. Can lead to thesis/dissertation work. Funded positions available.', credit: 'Stipend + tuition' },
              ].map((m, i) => (
                <div key={i} className="stat-card" style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{m.model}</div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{m.desc}</p>
                  <span className="tag tag-green">{m.credit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Sample Course Integrations</h3>
            {syllabi.map((s, i) => {
              const isOpen = expandedSyllabus[i] ?? false;
              return (
                <div key={i} className="accordion-item">
                  <div className="accordion-header" onClick={() => setExpandedSyllabus(prev => ({ ...prev, [i]: !prev[i] }))}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{s.code}: {s.title}</span>
                      <span className="tag tag-purple" style={{ marginLeft: 8 }}>{s.level}</span>
                    </div>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  {isOpen && (
                    <div className="accordion-body">
                      <p style={{ fontSize: 14, marginBottom: 12 }}>{s.description}</p>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>Modules</div>
                        <ol style={{ fontSize: 13, paddingLeft: 20, lineHeight: 1.8 }}>
                          {s.modules.map((m, j) => <li key={j}>{m}</li>)}
                        </ol>
                      </div>
                      <div style={{ display: 'flex', gap: 24 }}>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>DD Tools Used</div>
                          <div style={{ display: 'flex', gap: 4 }}>{s.tools.map(t => <span key={t} className="tag tag-blue">{t}</span>)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>Student Deliverable</div>
                          <p style={{ fontSize: 13 }}>{s.deliverable}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="card">
            <h3>Credit & Assessment</h3>
            <div className="grid-2">
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>How Students Earn Credit</div>
                <ul style={{ fontSize: 13, paddingLeft: 16, lineHeight: 2 }}>
                  <li>Deliverables assessed by faculty advisor and DD team mentor</li>
                  <li>Weekly progress logs submitted to both faculty and DD team</li>
                  <li>End-of-term presentation at Student Showcase event</li>
                  <li>Peer review of fellow students' contributions</li>
                  <li>Reflection paper connecting experience to coursework</li>
                </ul>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 8 }}>Portfolio & Career Value</div>
                <ul style={{ fontSize: 13, paddingLeft: 16, lineHeight: 2 }}>
                  <li>Real deployed infrastructure on resume (not class projects)</li>
                  <li>Published research and policy briefs</li>
                  <li>Letters of recommendation from city leaders and DD team</li>
                  <li>Network of civic tech professionals and entrepreneurs</li>
                  <li>Direct employment pipeline for graduating students</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Faculty Interest Form</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Name</label>
                <input placeholder="Dr. Jane Smith" />
              </div>
              <div className="form-group">
                <label>Institution</label>
                <input placeholder="Washington University in St. Louis" />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input placeholder="Computer Science" />
              </div>
              <div className="form-group">
                <label>Interest Area</label>
                <select>
                  <option>Capstone Project Supervision</option>
                  <option>Course Integration</option>
                  <option>Research Collaboration</option>
                  <option>Student Referrals</option>
                  <option>Guest Lecture</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary">Submit Interest</button>
          </div>
        </div>
      )}
    </div>
  );
}
