import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Layout, Wrench, BookOpen, CheckSquare, ExternalLink } from 'lucide-react';

type ResourceType = 'Guide' | 'Template' | 'Tool' | 'Reference' | 'Checklist';

interface Resource {
  id: number;
  title: string;
  type: ResourceType;
  phase: string;
  roles: string[];
  description: string;
  filePath?: string;
  linkedTool?: string;
  tags?: string[];
}

const phaseColors: Record<string, string> = {
  'Phase 0': '#f59e0b',
  'Phase 1': '#3b82f6',
  'Phase 2': '#8b5cf6',
  'Phase 3': '#06b6d4',
  'Phase 4': '#10b981',
  'All Phases': '#ec4899',
};

const typeIcons: Record<ResourceType, typeof FileText> = {
  Guide: FileText,
  Template: Layout,
  Tool: Wrench,
  Reference: BookOpen,
  Checklist: CheckSquare,
};

const typeColors: Record<ResourceType, string> = {
  Guide: '#3b82f6',
  Template: '#8b5cf6',
  Tool: '#f59e0b',
  Reference: '#06b6d4',
  Checklist: '#10b981',
};

const resources: Resource[] = [
  {
    id: 1,
    title: 'The Place to Platform Thesis',
    type: 'Guide',
    phase: 'Phase 0',
    roles: ['Project Lead'],
    description: 'The foundational argument for Digital Districts over Innovation Districts',
    filePath: '/00-framework/thesis.md',
    tags: ['thesis', 'framework', 'foundation', 'innovation district'],
  },
  {
    id: 2,
    title: '4-Layer Stack Model',
    type: 'Reference',
    phase: 'Phase 0',
    roles: ['Project Lead', 'DevOps Lead'],
    description: 'Architecture overview: Infrastructure \u2192 Intelligence \u2192 Applications \u2192 Distribution',
    tags: ['architecture', 'stack', 'infrastructure', 'layers'],
  },
  {
    id: 3,
    title: 'Readiness Scorecard',
    type: 'Tool',
    phase: 'Phase 0',
    roles: ['Project Lead'],
    description: '8-dimension city assessment',
    linkedTool: '/scorecard',
    tags: ['assessment', 'readiness', 'scorecard', 'city'],
  },
  {
    id: 4,
    title: 'Corridor Selection Framework',
    type: 'Tool',
    phase: 'Phase 0',
    roles: ['Project Lead', 'Community Lead'],
    description: '7-factor weighted scoring for choosing deployment corridor',
    linkedTool: '/corridor',
    tags: ['corridor', 'selection', 'scoring', 'deployment'],
  },
  {
    id: 5,
    title: 'Funding Allocation Decision Tree',
    type: 'Guide',
    phase: 'Phase 0',
    roles: ['Project Lead'],
    description: 'When to fund buildings vs. bandwidth',
    tags: ['funding', 'allocation', 'budget', 'decision'],
  },
  {
    id: 6,
    title: 'Partnership Model Selection',
    type: 'Guide',
    phase: 'Phase 0',
    roles: ['Project Lead', 'Governance Lead'],
    description: 'Choose the right public-private-community partnership structure',
    tags: ['partnership', 'public-private', 'community', 'governance'],
  },
  {
    id: 7,
    title: 'City Proposal Template',
    type: 'Template',
    phase: 'Phase 0',
    roles: ['Project Lead'],
    description: 'Full proposal generator with budget and equity commitments',
    linkedTool: '/proposal',
    tags: ['proposal', 'budget', 'equity', 'city', 'generator'],
  },
  {
    id: 8,
    title: 'Elevator Pitches by Audience',
    type: 'Template',
    phase: 'Phase 0',
    roles: ['Communications Lead'],
    description: '15+ customizable pitches for every stakeholder type',
    linkedTool: '/messaging',
    tags: ['pitch', 'elevator', 'stakeholder', 'messaging', 'communications'],
  },
  {
    id: 9,
    title: 'Stakeholder Mapping Guide',
    type: 'Guide',
    phase: 'Phase 0',
    roles: ['Project Lead'],
    description: 'How to map influence, interest, and engagement priority',
    linkedTool: '/stakeholders',
    tags: ['stakeholder', 'mapping', 'influence', 'engagement'],
  },
  {
    id: 10,
    title: 'Community Listening Session Guide',
    type: 'Guide',
    phase: 'Phase 1',
    roles: ['Community Lead'],
    description: 'How to design and facilitate community co-design sessions',
    tags: ['community', 'listening', 'co-design', 'facilitation'],
  },
  {
    id: 11,
    title: 'Wi-Fi Site Survey Checklist',
    type: 'Checklist',
    phase: 'Phase 1',
    roles: ['DevOps Lead'],
    description: 'Step-by-step corridor Wi-Fi planning and equipment specification',
    tags: ['wifi', 'site survey', 'equipment', 'infrastructure', 'checklist'],
  },
  {
    id: 12,
    title: 'Cloud Infrastructure Setup Guide',
    type: 'Guide',
    phase: 'Phase 1',
    roles: ['DevOps Lead'],
    description: 'AWS CDK deployment: Lambda, DynamoDB, Cognito, API Gateway',
    tags: ['aws', 'cloud', 'cdk', 'lambda', 'infrastructure', 'deployment'],
  },
  {
    id: 13,
    title: 'AI Tool Development Playbook',
    type: 'Guide',
    phase: 'Phase 1',
    roles: ['AI Engineer'],
    description: 'Building Claude-powered business tools with MCP servers',
    tags: ['ai', 'claude', 'mcp', 'tools', 'development'],
  },
  {
    id: 14,
    title: 'KPI Framework & EII Methodology',
    type: 'Reference',
    phase: 'Phase 1',
    roles: ['Data Engineer'],
    description: 'Economic Inclusion Index computation and all KPI definitions',
    linkedTool: '/dashboard',
    tags: ['kpi', 'eii', 'metrics', 'economic inclusion', 'measurement'],
  },
  {
    id: 15,
    title: 'Press Release Templates',
    type: 'Template',
    phase: 'Phase 1',
    roles: ['Communications Lead'],
    description: 'Launch announcement, milestone, and quarterly report templates',
    linkedTool: '/communications',
    tags: ['press', 'release', 'announcement', 'communications', 'media'],
  },
  {
    id: 16,
    title: 'Governance Model Specification',
    type: 'Reference',
    phase: 'Phase 1',
    roles: ['Governance Lead'],
    description: '9-seat board, RACI matrix, decision-making process, veto powers',
    tags: ['governance', 'board', 'raci', 'decision-making', 'veto'],
  },
  {
    id: 17,
    title: 'API Design Principles',
    type: 'Reference',
    phase: 'Phase 2',
    roles: ['DevOps Lead'],
    description: 'RESTful standards, versioning, authentication, rate limiting',
    tags: ['api', 'rest', 'versioning', 'authentication', 'standards'],
  },
  {
    id: 18,
    title: 'Data Sharing Agreement Template',
    type: 'Template',
    phase: 'Phase 2',
    roles: ['Governance Lead', 'Legal'],
    description: 'DSA template for cross-node data exchange',
    tags: ['data sharing', 'agreement', 'legal', 'cross-node', 'template'],
  },
  {
    id: 19,
    title: 'Identity Federation Guide',
    type: 'Guide',
    phase: 'Phase 2',
    roles: ['DevOps Lead'],
    description: 'OpenID Connect federation between Digital District nodes',
    tags: ['identity', 'federation', 'openid', 'authentication', 'sso'],
  },
  {
    id: 20,
    title: 'DDIS v1.0 Interoperability Standard',
    type: 'Reference',
    phase: 'Phase 2',
    roles: ['DevOps Lead'],
    description: 'Conformance levels, manifest schema, API catalog standard',
    tags: ['ddis', 'interoperability', 'standard', 'conformance', 'manifest'],
  },
  {
    id: 21,
    title: 'Digital Literacy Curriculum',
    type: 'Guide',
    phase: 'Phase 3',
    roles: ['Community Lead', 'Students'],
    description: 'AI literacy training program for community members',
    tags: ['literacy', 'curriculum', 'training', 'ai', 'education', 'community'],
  },
  {
    id: 22,
    title: 'Objection Response Playbook',
    type: 'Tool',
    phase: 'All Phases',
    roles: ['Project Lead'],
    description: '12 pre-built responses to stakeholder pushback',
    linkedTool: '/objections',
    tags: ['objections', 'responses', 'stakeholder', 'pushback', 'playbook'],
  },
  {
    id: 23,
    title: 'Student Program Catalog',
    type: 'Reference',
    phase: 'All Phases',
    roles: ['Students'],
    description: '12 tracks, 8 capstone briefs, 6 internships',
    linkedTool: '/students',
    tags: ['students', 'programs', 'capstone', 'internships', 'tracks'],
  },
  {
    id: 24,
    title: 'Replication Playbook',
    type: 'Guide',
    phase: 'Phase 4',
    roles: ['Project Lead'],
    description: '8-step guide for other cities to fork and deploy the model',
    linkedTool: '/network',
    tags: ['replication', 'cities', 'fork', 'deploy', 'scale'],
  },
];

const allPhases = ['All', 'Phase 0', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'All Phases'];
const allTypes: ('All' | ResourceType)[] = ['All', 'Guide', 'Template', 'Tool', 'Reference', 'Checklist'];
const allRoles = ['All', 'Project Lead', 'Community Lead', 'DevOps Lead', 'AI Engineer', 'Communications Lead', 'Data Engineer', 'Governance Lead', 'Students'];

export default function ResourceLibrary() {
  const [search, setSearch] = useState('');
  const [filterPhase, setFilterPhase] = useState('All');
  const [filterType, setFilterType] = useState<'All' | ResourceType>('All');
  const [filterRole, setFilterRole] = useState('All');

  const filtered = resources.filter((r) => {
    const matchesSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      (r.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesPhase = filterPhase === 'All' || r.phase === filterPhase;
    const matchesType = filterType === 'All' || r.type === filterType;
    const matchesRole = filterRole === 'All' || r.roles.includes(filterRole);

    return matchesSearch && matchesPhase && matchesType && matchesRole;
  });

  return (
    <div>
      <div className="page-header">
        <span className="page-badge badge-tier1">Knowledge Base</span>
        <h1>Resource Library</h1>
        <p>Find the right guide, template, or tool for every stage of Digital District deployment.</p>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            placeholder="Search resources by title, description, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text)',
              fontSize: 14,
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          marginBottom: 24,
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Phase
          </label>
          <select
            value={filterPhase}
            onChange={(e) => setFilterPhase(e.target.value)}
            style={{
              padding: '6px 10px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text)',
              fontSize: 13,
              fontFamily: 'inherit',
            }}
          >
            {allPhases.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'All' | ResourceType)}
            style={{
              padding: '6px 10px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text)',
              fontSize: 13,
              fontFamily: 'inherit',
            }}
          >
            {allTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Role
          </label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              padding: '6px 10px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text)',
              fontSize: 13,
              fontFamily: 'inherit',
            }}
          >
            {allRoles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> of {resources.length} resources
        </div>
      </div>

      {/* Resource List */}
      <div>
        {filtered.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
            No resources match your filters. Try broadening your search.
          </div>
        )}
        {filtered.map((resource, index) => {
          const Icon = typeIcons[resource.type];
          const typeColor = typeColors[resource.type];
          const pColor = phaseColors[resource.phase] || '#94a3b8';

          return (
            <div
              key={resource.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                background: index % 2 === 0 ? 'var(--bg-card)' : 'rgba(17, 24, 39, 0.5)',
                border: '1px solid var(--border)',
                borderBottom: index < filtered.length - 1 ? 'none' : '1px solid var(--border)',
                borderRadius: index === 0 ? '12px 12px 0 0' : index === filtered.length - 1 ? '0 0 12px 12px' : 0,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${typeColor}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={20} style={{ color: typeColor }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                  {resource.filePath ? (
                    <a
                      href={resource.filePath}
                      style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}
                    >
                      {resource.title}
                    </a>
                  ) : resource.linkedTool ? (
                    <Link
                      to={resource.linkedTool}
                      style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)' }}
                    >
                      {resource.title}
                    </Link>
                  ) : (
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{resource.title}</span>
                  )}

                  {/* Type Tag */}
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 600,
                      background: `${typeColor}20`,
                      color: typeColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {resource.type}
                  </span>

                  {/* Phase Tag */}
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 600,
                      background: `${pColor}20`,
                      color: pColor,
                      letterSpacing: '0.3px',
                    }}
                  >
                    {resource.phase}
                  </span>

                  {/* Role Tags */}
                  {resource.roles.map((role) => (
                    <span
                      key={role}
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 500,
                        background: 'rgba(148, 163, 184, 0.12)',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.3px',
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {resource.description}
                </p>
              </div>

              {/* Linked Tool Button */}
              {resource.linkedTool && (
                <Link
                  to={resource.linkedTool}
                  className="btn btn-secondary btn-sm"
                  style={{ flexShrink: 0, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <ExternalLink size={14} />
                  Open Tool
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
