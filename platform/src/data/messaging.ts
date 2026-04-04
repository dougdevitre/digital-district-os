export interface AudienceOption {
  id: string;
  label: string;
  category: string;
}

export const audiences: AudienceOption[] = [
  { id: 'universal-30', label: 'Universal (30 seconds)', category: 'Universal' },
  { id: 'universal-60', label: 'Universal (60 seconds)', category: 'Universal' },
  { id: 'universal-2m', label: 'Universal (2 minutes)', category: 'Universal' },
  { id: 'mayor', label: 'Mayor', category: 'Government' },
  { id: 'council', label: 'City Council', category: 'Government' },
  { id: 'econ-dev', label: 'Economic Development', category: 'Government' },
  { id: 'vc', label: 'Venture Capitalists', category: 'Investors' },
  { id: 'impact', label: 'Impact Investors', category: 'Investors' },
  { id: 'small-biz', label: 'Small Business Owners', category: 'Community' },
  { id: 'residents', label: 'Residents', category: 'Community' },
  { id: 'community-orgs', label: 'Community Organizations', category: 'Community' },
  { id: 'journalists', label: 'Journalists', category: 'Media' },
  { id: 'podcast', label: 'Podcast Hosts', category: 'Media' },
  { id: 'university', label: 'University Leadership', category: 'Institutions' },
  { id: 'innovation-district', label: 'Innovation District Leadership', category: 'Institutions' },
];

export const pitchTemplates: Record<string, string> = {
  'universal-30': `We spent $1.3 billion building an Innovation District that serves a few blocks. For less than 1% of that cost, a Digital District can give every entrepreneur in {city} instant access to the same tools, intelligence, and infrastructure — from any neighborhood. We're not replacing what we built. We're giving the whole city a key to it.`,

  'universal-60': `Innovation Districts were designed when proximity was power — you had to be near the university, near the lab, near the investors. Cloud computing and AI broke that model. A founder in {area} now has access to the same AI tools, the same cloud infrastructure, and the same global markets as someone sitting inside {district}. The question isn't whether this shift is happening — it is. The question is whether {city} leads it or watches other cities do it first. A Digital District takes what {district} built and extends it to every corridor in the city through cloud infrastructure, AI tools, and open APIs. Same investment thesis — radically better economics.`,

  'universal-2m': `Twenty years ago, the best strategy for innovation was to cluster smart people in one building. Cities built Innovation Districts — real estate developments anchored by universities and hospitals. {city} did this better than most. {district} attracted significant investment and put us on the map.

But the assumptions underneath that model are cracking. Cloud computing means you don't need to be in the building to use the compute. AI means you don't need the university expert to get specialized knowledge. Remote work means talent can be anywhere.

A Digital District is the next version. It's an AI-powered, cloud-native ecosystem layered over a physical corridor — community Wi-Fi, AI business tools, open APIs, and a shared identity layer. Any entrepreneur can register, access tools, and start building in hours, from any neighborhood.

We're not asking anyone to abandon {district}. We're building the operating system that makes {district} accessible to the whole city. {corridor} is the pilot — a Digital Mainstreet that proves the model. Then we connect it to every node in the network. And then we scale it citywide.

The total cost for the citywide deployment is less than what one building renovation costs in a legacy district. And it serves 100x more people.`,

  'mayor': `Your Innovation District serves one neighborhood. For a fraction of the cost, a Digital District gives every neighborhood the same tools — AI, cloud infrastructure, business services. You'd be the first mayor in the country to deploy one in {city}. It's your legacy play.`,

  'council': `Every ward gets the same digital infrastructure — not just the wards near {district}. Your constituents get AI-powered business tools, free Wi-Fi, and a path to starting a business in hours instead of months. The cost is less than one road project.`,

  'econ-dev': `Your current model concentrates innovation in a physical zone. A Digital District distributes it citywide through cloud infrastructure and AI tools. You keep {district} — it becomes a specialized node. But the operating system that connects entrepreneurs to opportunities works from every neighborhood. The metrics you care about — business formation, job creation, tax revenue — all scale faster because entry barriers drop to near zero. And it's replicable: other cities will want to license {city}'s model.`,

  'vc': `A Digital District is a platform that produces deal flow. Hundreds of entrepreneurs using AI tools, cloud infrastructure, and shared services — all generating data on traction, market fit, and team quality. You get visibility into emerging companies in {city} earlier than anywhere else.`,

  'impact': `A Digital District delivers measurable economic inclusion at scale. We track business formation, revenue, and job creation by neighborhood, demographic, and income level. The unit economics are 100x better than physical incubators. And the model is open-source — every dollar you invest in {city} funds a replicable blueprint.`,

  'small-biz': `Free Wi-Fi on your block. AI tools that help you write marketing copy, manage invoices, and find new customers. A directory that puts your business in front of people across {city}. No subscription fees. No tech expertise required. Just tools that help you make more money.`,

  'residents': `Want to start a business? You used to need to go to {district}, find an incubator, apply to a program, and wait. Now you sign up online, tell the AI what you want to build, and get a plan, the tools, and the connections — from right here in your neighborhood in {city}.`,

  'community-orgs': `You've been doing this work for years — connecting people to opportunities, resources, and each other. The Digital District doesn't replace that. It amplifies it. Your constituents get AI-powered tools, free connectivity, and a digital identity that opens doors across {city}. And your organization gets a platform to distribute your services to anyone who needs them.`,

  'journalists': `{city} spent billions building one of the country's top Innovation Districts. Now it's building something that costs 99% less and reaches 100x more people — a Digital District on {corridor} that gives any entrepreneur instant access to AI tools and cloud infrastructure. It's the first city in America to try this. And the model is open-source.`,

  'podcast': `Here's the question: what happens when AI makes the Innovation District model obsolete? Cities poured billions into buildings and real estate. But cloud computing means you don't need the building. AI means you don't need the university expert. So what's left? Access. The Digital District model says: build the operating system, not the office park. {city} is the test case because we have both — a world-class Innovation District in {district}, and a cultural corridor on {corridor} that's the perfect pilot for the digital version.`,

  'university': `Your research and expertise become more valuable in a Digital District, not less. Right now, your technology transfer office reaches a few dozen entrepreneurs a year. In a Digital District, your knowledge base — digitized, AI-accessible, API-connected — reaches thousands. Your students get a live platform to build real companies in {city}. Your researchers get a larger pool of collaborators.`,

  'innovation-district': `We're not competing with you. We're building the network that makes {district} more valuable. Right now, {district} is a destination — you have to be there to benefit. In a Digital District model, {district} becomes a specialized node on a citywide network. Your capabilities are accessible to an entrepreneur in any neighborhood via AI and APIs. More people use your resources. More companies form. More of them need your space.`,
};
