export interface Dimension {
  id: number;
  name: string;
  question: string;
  indicators: string[];
}

export const dimensions: Dimension[] = [
  {
    id: 1,
    name: 'Digital Infrastructure Baseline',
    question: 'Does the corridor/city have foundational connectivity and cloud readiness?',
    indicators: [
      'Broadband coverage (% of target area)',
      'Public Wi-Fi availability',
      'Cloud infrastructure adoption (city systems)',
      'Open data portal',
    ],
  },
  {
    id: 2,
    name: 'AI and Intelligence Layer Readiness',
    question: 'Is there institutional or community capacity to deploy AI-powered tools?',
    indicators: [
      'AI literacy among city staff',
      'AI tools available to local businesses',
      'Prompt engineering / MCP capacity',
      'Automation workflow adoption',
    ],
  },
  {
    id: 3,
    name: 'Entrepreneurial Ecosystem Density',
    question: 'How active is the startup/small business community?',
    indicators: [
      'Active startups in target area',
      'Incubators/accelerators',
      'Venture capital activity (annual deals)',
      'Founder diversity (% non-white, non-male)',
    ],
  },
  {
    id: 4,
    name: 'Institutional Alignment',
    question: 'Are anchor institutions ready to participate?',
    indicators: [
      'University engagement with ecosystem',
      'Government digital service capacity',
      'Healthcare system data sharing',
      'Cross-institution collaboration',
    ],
  },
  {
    id: 5,
    name: 'Physical Assets and Transit',
    question: 'What physical infrastructure exists that can serve as substrate?',
    indicators: [
      'Transit connectivity to target corridor',
      'Commercial vacancy / available space',
      'Existing Innovation District',
      'Cultural/community anchors',
    ],
  },
  {
    id: 6,
    name: 'Policy and Funding Environment',
    question: 'Is the political and financial environment supportive?',
    indicators: [
      'Municipal broadband policy',
      'Digital infrastructure funding',
      'Regulatory environment for tech',
      'Open data / open API policy',
    ],
  },
  {
    id: 7,
    name: 'Community Engagement and Inclusion',
    question: 'Is the community bought in and does the model center inclusion?',
    indicators: [
      'Community awareness of digital ecosystem',
      'Digital literacy programs',
      'Representation in governance',
      'Economic benefit distribution',
    ],
  },
  {
    id: 8,
    name: 'Interoperability and Scalability',
    question: 'Can this system connect to other systems and scale?',
    indicators: [
      'API standards adoption',
      'Data format standardization',
      'Multi-corridor/city planning',
      'Open-source contribution',
    ],
  },
];

export function getStage(score: number) {
  if (score <= 10) return { stage: 'Pre-Readiness', color: '#ef4444', action: 'Build the case. Focus on awareness, policy advocacy, and coalition building.' };
  if (score <= 20) return { stage: 'Foundation', color: '#f59e0b', action: 'Lay groundwork. Deploy Layer 1 infrastructure on a single corridor.' };
  if (score <= 30) return { stage: 'Acceleration', color: '#3b82f6', action: 'Scale actively. Connect corridors, deploy Layers 2-3, onboard entrepreneurs.' };
  return { stage: 'Leadership', color: '#10b981', action: 'Lead the ecosystem. Focus on interoperability, replication, and contributing back.' };
}

export function getBottleneck(scores: number[]) {
  const min = Math.min(...scores);
  const idx = scores.indexOf(min);
  const advice = [
    'Infrastructure is the blocker. Prioritize broadband and cloud migration.',
    'AI readiness is the gap. Invest in staff training and tool deployment.',
    'You need more entrepreneurs. This is an ecosystem problem, not a tech problem.',
    'Institutional buy-in is missing. Focus on university and government partnerships.',
    'Physical substrate may not support a Digital Mainstreet. Consider a purely virtual model.',
    'Policy is the blocker. Advocate for broadband and open data policies.',
    'Community trust is missing. Address this before any technology deployment.',
    'You\'re building in isolation. Connect with other districts and adopt open standards.',
  ];
  return { dimension: dimensions[idx].name, advice: advice[idx], score: min };
}
