# Phase 2: Connect Existing Districts as Nodes

## Objective

Link the pilot Digital Mainstreet to existing physical Innovation Districts, transforming them from isolated hubs into specialized nodes on a shared digital network.

## Prerequisites

- Phase 1 exit criteria met
- At least 1 existing Innovation District willing to participate
- API architecture defined (see `06-integration/api-design-principles.md`)
- Governance model agreed (see `05-collaboration/governance-model.md`)

## Duration: 6-12 Months

## Core Concept

The Innovation District doesn't disappear. It transitions from being **the center** of the ecosystem to being **a node** on it. Cortex becomes the biotech/tech node. 39 North becomes the AgTech node. Downtown North becomes the geospatial node. The digital layer connects them all.

```
Before (Fragmented):          After (Networked):

  [39 North]                    [39 North] ──────┐
                                                   │
  [Cortex]                      [Cortex] ─────────┤── Digital Layer
                                                   │
  [DTNO]                        [DTNO] ───────────┤
                                                   │
                                [Delmar] ─────────┘
                                (Digital Mainstreet)
```

## Workstreams

### 2.1 Node Onboarding (Months 1-3)

For each Innovation District joining the network:

| Task | Deliverable |
|------|------------|
| Audit existing digital infrastructure (APIs, data systems, user directories) | Node infrastructure inventory |
| Identify 3-5 services the node can expose to the network | Service catalog per node |
| Establish data sharing agreements | Signed DSAs with privacy terms |
| Deploy identity federation (SSO across nodes) | Users authenticate once, access all nodes |
| Create node profile in the digital district directory | Public-facing node listing |

### 2.2 API Integration Layer (Months 2-6)

| Task | Deliverable |
|------|------------|
| Define API standards for node-to-network communication | Published API specification |
| Build adapter APIs for each node's existing systems | Working integrations |
| Deploy API gateway with rate limiting, auth, and logging | Centralized API management |
| Create developer documentation for each exposed service | Published docs |
| Set up API health monitoring | Dashboard with uptime/latency metrics |

### 2.3 Cross-Node Services (Months 4-9)

Services that only become possible when nodes are connected:

| Service | Description | Value |
|---------|-------------|-------|
| **Unified Directory** | Search for resources, mentors, services across all nodes | Entrepreneurs find what they need regardless of location |
| **Cross-Node Referrals** | A biotech startup at Cortex can access AgTech resources at 39 North | Breaks down vertical silos |
| **Shared Intelligence Layer** | AI tools trained on aggregated (anonymized) data from all nodes | Better recommendations, richer insights |
| **Event Discovery** | Single calendar of opportunities across all nodes | No more missed events because they were at "the other district" |
| **Talent Matching** | Connect entrepreneurs with talent across the network | Distributed teams formed across nodes |

### 2.4 Governance Integration (Months 1-6)

| Task | Deliverable |
|------|------------|
| Extend governance model to include node representatives | Updated RACI matrix |
| Establish cross-node working group with monthly cadence | Meeting schedule + charter |
| Define data ownership and stewardship per node | Data governance document |
| Create conflict resolution process for cross-node disputes | Published process |

## Phase 2 Exit Criteria

- [ ] At least 2 physical Innovation Districts connected as nodes
- [ ] Identity federation operational (SSO across nodes)
- [ ] At least 5 cross-node APIs deployed and documented
- [ ] At least 2 cross-node services operational
- [ ] Governance model includes node representatives
- [ ] Data sharing agreements signed and enforced
- [ ] Usage metrics show cross-node activity (users accessing services outside their home node)

## Budget Estimate

| Category | Estimate |
|----------|----------|
| API development and integration | $50,000 - $150,000 |
| Identity federation deployment | $10,000 - $30,000 |
| Cross-node service development | $30,000 - $100,000 |
| Governance and legal (DSAs, agreements) | $10,000 - $40,000 |
| Staff / contractors (6-12 months) | $80,000 - $250,000 |
| **Total** | **$180,000 - $570,000** |
