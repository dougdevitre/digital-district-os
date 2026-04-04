export interface PhaseTask {
  id: string;
  text: string;
  checked: boolean;
}

export interface Phase {
  id: number;
  name: string;
  subtitle: string;
  duration: string;
  budgetLow: string;
  budgetHigh: string;
  exitCriteria: PhaseTask[];
  workstreams: { name: string; tasks: string[] }[];
}

export const phases: Phase[] = [
  {
    id: 1,
    name: 'Street to System',
    subtitle: 'Transform a single corridor into a Digital Mainstreet',
    duration: '3-6 months',
    budgetLow: '$101K',
    budgetHigh: '$402K',
    exitCriteria: [
      { id: 'p1-1', text: 'Wi-Fi operational with >= 80% corridor coverage', checked: false },
      { id: 'p1-2', text: 'Cloud infrastructure deployed and secured', checked: false },
      { id: 'p1-3', text: 'Identity system operational with >= 50 registered users', checked: false },
      { id: 'p1-4', text: 'At least 3 AI tools deployed and in active use', checked: false },
      { id: 'p1-5', text: 'At least 10 businesses actively using the system', checked: false },
      { id: 'p1-6', text: 'Community advisory board met at least 2 times', checked: false },
      { id: 'p1-7', text: 'Measurement baseline established for all KPIs', checked: false },
      { id: 'p1-8', text: 'No unresolved community concerns blocking expansion', checked: false },
    ],
    workstreams: [
      {
        name: 'Community Engagement (Weeks 1-4)',
        tasks: [
          'Host 3 community listening sessions',
          'Identify 10 local business partners for pilot',
          'Establish community advisory board (7-12 members)',
          'Create public-facing project page',
        ],
      },
      {
        name: 'Infrastructure Deployment (Weeks 3-12)',
        tasks: [
          'Conduct corridor Wi-Fi site survey',
          'Procure and install mesh Wi-Fi nodes',
          'Provision cloud environment (AWS)',
          'Deploy identity/auth system',
          'Set up monitoring and alerting',
          'Establish data pipeline backbone',
        ],
      },
      {
        name: 'Intelligence Pilot (Weeks 8-16)',
        tasks: [
          'Identify top 5 tasks pilot businesses need help with',
          'Build 3 domain-specific AI prompts/skills',
          'Deploy document generation for common business needs',
          'Set up 1 automation workflow per pilot business',
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Connect Districts',
    subtitle: 'Link pilot to existing Innovation Districts as nodes',
    duration: '6-12 months',
    budgetLow: '$180K',
    budgetHigh: '$570K',
    exitCriteria: [
      { id: 'p2-1', text: 'At least 2 physical Innovation Districts connected as nodes', checked: false },
      { id: 'p2-2', text: 'Identity federation operational (SSO across nodes)', checked: false },
      { id: 'p2-3', text: 'At least 5 cross-node APIs deployed and documented', checked: false },
      { id: 'p2-4', text: 'At least 2 cross-node services operational', checked: false },
      { id: 'p2-5', text: 'Governance model includes node representatives', checked: false },
      { id: 'p2-6', text: 'Data sharing agreements signed and enforced', checked: false },
      { id: 'p2-7', text: 'Usage metrics show cross-node activity', checked: false },
    ],
    workstreams: [
      {
        name: 'Node Onboarding (Months 1-3)',
        tasks: [
          'Audit existing digital infrastructure per node',
          'Identify 3-5 services each node can expose',
          'Establish data sharing agreements',
          'Deploy identity federation (SSO)',
          'Create node profile in directory',
        ],
      },
      {
        name: 'API Integration Layer (Months 2-6)',
        tasks: [
          'Define API standards for node communication',
          'Build adapter APIs for existing systems',
          'Deploy API gateway with rate limiting and auth',
          'Create developer documentation',
          'Set up API health monitoring',
        ],
      },
      {
        name: 'Cross-Node Services (Months 4-9)',
        tasks: [
          'Build Unified Directory service',
          'Deploy Cross-Node Referral system',
          'Create Shared Intelligence Layer',
          'Launch Event Discovery service',
          'Build Talent Matching system',
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Citywide Layer',
    subtitle: 'Expand to a citywide digital operating system',
    duration: '12-24 months',
    budgetLow: '$1.25M',
    budgetHigh: '$4.3M',
    exitCriteria: [
      { id: 'p3-1', text: 'Wi-Fi coverage reaches >= 60% of city population', checked: false },
      { id: 'p3-2', text: '20+ AI tools deployed across multiple verticals', checked: false },
      { id: 'p3-3', text: 'Universal digital identity system operational', checked: false },
      { id: 'p3-4', text: 'At least 5 municipal services integrated via API', checked: false },
      { id: 'p3-5', text: 'Application marketplace live with 15+ apps', checked: false },
      { id: 'p3-6', text: 'Digital literacy programs active in every ward', checked: false },
      { id: 'p3-7', text: 'Citywide dashboard operational and public', checked: false },
      { id: 'p3-8', text: 'Cross-corridor usage demonstrated', checked: false },
    ],
    workstreams: [
      {
        name: 'Infrastructure Expansion (Months 1-12)',
        tasks: [
          'Expand Wi-Fi mesh to 5+ corridors',
          'Deploy edge compute at high-traffic locations',
          'Upgrade API gateway for citywide traffic',
          'Deploy citywide identity layer',
          'Integrate with municipal systems',
        ],
      },
      {
        name: 'Intelligence Layer Scaling (Months 3-18)',
        tasks: [
          'Expand AI tool library to 20+ vertical skills',
          'Deploy city-specific knowledge bases',
          'Build aggregated analytics dashboard',
          'Enable multilingual AI interfaces',
        ],
      },
      {
        name: 'Application Ecosystem (Months 6-24)',
        tasks: [
          'Launch open application marketplace',
          'Deploy business formation pipeline',
          'Integrate financial services',
          'Build workforce matching system',
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Enable Entrepreneurs',
    subtitle: 'Zero-friction entrepreneurial onboarding from any neighborhood',
    duration: '12-18 months',
    budgetLow: '$500K',
    budgetHigh: '$2M',
    exitCriteria: [
      { id: 'p4-1', text: 'Onboarding pipeline operational end-to-end', checked: false },
      { id: 'p4-2', text: 'At least 3 vertical acceleration tracks deployed', checked: false },
      { id: 'p4-3', text: 'AI copilot available 24/7 for entrepreneur guidance', checked: false },
      { id: 'p4-4', text: 'Mentor network with 50+ active mentors', checked: false },
      { id: 'p4-5', text: '500+ entrepreneurs onboarded in first year', checked: false },
      { id: 'p4-6', text: 'Median time-to-first-revenue < 30 days', checked: false },
      { id: 'p4-7', text: 'At least 40% of entrepreneurs from underserved neighborhoods', checked: false },
    ],
    workstreams: [
      {
        name: 'Onboarding Pipeline (Months 1-6)',
        tasks: [
          'Build discovery portal',
          'Deploy identity registration system',
          'Create AI readiness assessment',
          'Build AI business planner',
          'Implement tool provisioning',
          'Launch marketplace listing',
          'Create growth dashboard',
        ],
      },
      {
        name: 'Vertical Tracks (Months 3-12)',
        tasks: [
          'Deploy Retail/Commerce track',
          'Deploy Professional Services track',
          'Deploy Creative/Media track',
          'Deploy Tech/SaaS track',
          'Deploy Social Enterprise track',
        ],
      },
      {
        name: 'Support Ecosystem (Months 1-12)',
        tasks: [
          'Deploy AI copilot (Tier 0)',
          'Launch community forums (Tier 1)',
          'Build mentor matching system (Tier 2)',
          'Establish professional network (Tier 3)',
        ],
      },
    ],
  },
];
