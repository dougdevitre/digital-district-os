export interface CorridorCriteria {
  id: string;
  name: string;
  weight: number;
  description: string;
  levels: string[];
}

export const corridorCriteria: CorridorCriteria[] = [
  {
    id: 'cultural',
    name: 'Cultural Identity',
    weight: 0.20,
    description: 'Does this corridor have a name, a story, and a community that identifies with it?',
    levels: [
      'No identity — generic commercial strip',
      'Some local recognition but no cultural significance',
      'Known locally, some cultural programming',
      'Strong cultural identity, regular events, media coverage',
      'Nationally recognized cultural corridor with deep community roots',
    ],
  },
  {
    id: 'transit',
    name: 'Transit Connectivity',
    weight: 0.15,
    description: 'Can people get there without a car?',
    levels: [
      'Car-dependent, no transit',
      'Infrequent bus service only',
      'Regular bus service, some bike infrastructure',
      'Multi-modal (bus + rail or BRT), good pedestrian access',
      'High-frequency multi-modal transit hub',
    ],
  },
  {
    id: 'business',
    name: 'Existing Business Density',
    weight: 0.15,
    description: 'Are there businesses already operating that can benefit immediately?',
    levels: [
      '< 10 active businesses',
      '10-25 active businesses',
      '25-50 active businesses',
      '50-100 active businesses',
      '100+ active businesses with diverse categories',
    ],
  },
  {
    id: 'diversity',
    name: 'Socioeconomic Diversity',
    weight: 0.20,
    description: 'Does this corridor bridge different communities, especially underserved ones?',
    levels: [
      'Serves a single, already-advantaged demographic',
      'Low diversity, limited connection to underserved areas',
      'Some diversity, adjacent to different income areas',
      'Sits between distinct communities, serves as a bridge',
      'Directly bridges a socioeconomic divide with deep community on both sides',
    ],
  },
  {
    id: 'physical',
    name: 'Physical Suitability',
    weight: 0.10,
    description: 'Can Wi-Fi mesh nodes be deployed?',
    levels: [
      'Hostile environment — no mounting points, extreme distances',
      'Difficult — scattered buildings, poor line-of-sight',
      'Workable with significant engineering',
      'Good — regular building spacing, available mounting points',
      'Ideal — dense, regular structure, existing utility infrastructure',
    ],
  },
  {
    id: 'trust',
    name: 'Community Trust',
    weight: 0.15,
    description: 'Will the community welcome this, or resist it?',
    levels: [
      'Active distrust of institutional projects',
      'Skepticism, history of broken promises',
      'Neutral, willing to listen',
      'Positive, existing community organizations ready to partner',
      'Enthusiastic, community organizations actively requesting digital infrastructure',
    ],
  },
  {
    id: 'strategic',
    name: 'Strategic Significance',
    weight: 0.05,
    description: 'Does this corridor tell a compelling story for media, funders, and other cities?',
    levels: [
      'No strategic narrative',
      'Locally interesting',
      'Regionally significant',
      'Nationally noteworthy',
      'Iconic — deploying here makes national news',
    ],
  },
];

export function getRecommendation(score: number) {
  if (score >= 4.0) return { text: 'Strong candidate — proceed to community engagement', color: '#10b981' };
  if (score >= 3.0) return { text: 'Viable with investment — identify and address weak dimensions', color: '#3b82f6' };
  if (score >= 2.0) return { text: 'Risky — consider a different corridor or address fundamentals first', color: '#f59e0b' };
  return { text: 'Not suitable — choose a different corridor', color: '#ef4444' };
}
