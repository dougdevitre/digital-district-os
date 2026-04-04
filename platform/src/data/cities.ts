export interface CityEntry {
  id: string;
  name: string;
  state: string;
  conformanceLevel: 1 | 2 | 3;
  launched: string;
  corridors: number;
  businesses: number;
  eiiScore: number;
  specialization: string;
  status: 'operational' | 'pilot' | 'planning';
  nodes: { name: string; type: string }[];
}

export const cities: CityEntry[] = [
  {
    id: 'dd_stl_delmar',
    name: 'St. Louis',
    state: 'MO',
    conformanceLevel: 2,
    launched: '2026-06-01',
    corridors: 1,
    businesses: 342,
    eiiScore: 67,
    specialization: 'Biotech + Urban Innovation',
    status: 'pilot',
    nodes: [
      { name: 'Cortex Innovation Community', type: 'Biotech/Tech' },
      { name: '39 North', type: 'AgTech' },
      { name: 'Downtown North', type: 'Geospatial' },
    ],
  },
  {
    id: 'dd_det_woodward',
    name: 'Detroit',
    state: 'MI',
    conformanceLevel: 1,
    launched: '2026-09-01',
    corridors: 1,
    businesses: 128,
    eiiScore: 52,
    specialization: 'Mobility + Manufacturing',
    status: 'planning',
    nodes: [
      { name: 'TechTown Detroit', type: 'Tech/Startups' },
      { name: 'Michigan Central', type: 'Mobility' },
    ],
  },
  {
    id: 'dd_atl_sweet',
    name: 'Atlanta',
    state: 'GA',
    conformanceLevel: 1,
    launched: '2026-11-01',
    corridors: 2,
    businesses: 215,
    eiiScore: 58,
    specialization: 'FinTech + Media',
    status: 'planning',
    nodes: [
      { name: 'Atlanta Tech Village', type: 'Tech' },
      { name: 'Centergy One', type: 'FinTech' },
    ],
  },
  {
    id: 'dd_chi_wicker',
    name: 'Chicago',
    state: 'IL',
    conformanceLevel: 1,
    launched: '2027-01-15',
    corridors: 1,
    businesses: 89,
    eiiScore: 45,
    specialization: 'FoodTech + Logistics',
    status: 'planning',
    nodes: [
      { name: '1871', type: 'Tech Hub' },
      { name: 'mHUB', type: 'HardTech' },
    ],
  },
];

export const peerTopics = [
  {
    id: 1,
    title: 'Community Wi-Fi Deployment: Lessons from First 90 Days',
    author: 'St. Louis Digital District Team',
    city: 'St. Louis',
    date: '2026-03-15',
    replies: 12,
    tags: ['infrastructure', 'wifi', 'deployment'],
  },
  {
    id: 2,
    title: 'How We Got 40% Underserved Neighborhood Participation',
    author: 'Delmar Community Advisory Board',
    city: 'St. Louis',
    date: '2026-03-22',
    replies: 24,
    tags: ['equity', 'community', 'engagement'],
  },
  {
    id: 3,
    title: 'API Standards for Cross-Node Identity Federation',
    author: 'Detroit Tech Infrastructure Team',
    city: 'Detroit',
    date: '2026-03-28',
    replies: 8,
    tags: ['technical', 'api', 'identity'],
  },
  {
    id: 4,
    title: 'Funding Models: Municipal vs. Philanthropic vs. Hybrid',
    author: 'Atlanta Economic Development Office',
    city: 'Atlanta',
    date: '2026-04-01',
    replies: 18,
    tags: ['funding', 'policy', 'sustainability'],
  },
  {
    id: 5,
    title: 'Measuring AI Tool Impact on Small Business Revenue',
    author: 'Chicago Digital Equity Coalition',
    city: 'Chicago',
    date: '2026-04-03',
    replies: 6,
    tags: ['metrics', 'ai', 'impact'],
  },
];
