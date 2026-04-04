# Gap Analysis Guide

## Purpose

After completing the Readiness Scorecard and Asset Inventory, use this guide to systematically identify what's missing in each stack layer and prioritize the gaps that block progress.

## Process

### Step 1: Map Existing Assets to Stack Layers

Using your completed `asset-inventory-template.csv`, categorize every asset by its primary layer:

| Layer | What to Look For | Red Flag if Missing |
|-------|-----------------|---------------------|
| **Layer 1: Infrastructure** | Cloud accounts, Wi-Fi coverage, identity systems, data pipelines, storage | No cloud compute = nothing else works |
| **Layer 2: Intelligence** | AI model access, prompt systems, automation workflows, decision tools | No AI layer = still dependent on institutional gatekeepers |
| **Layer 3: Applications** | Business tools (legal, financial, marketing, communication) | No apps = entrepreneurs have infrastructure but nothing to use |
| **Layer 4: Distribution** | Public APIs, marketplace integrations, content channels, developer docs | No distribution = the ecosystem is closed |

### Step 2: Identify Gaps per Layer

For each layer, answer these questions:

**Layer 1: Infrastructure**
- Can any entrepreneur connect to the ecosystem from the target corridor? (Wi-Fi/broadband)
- Is there a cloud environment provisioned and secured? (Compute)
- Can users authenticate and maintain identity across services? (Identity)
- Can data flow between systems in real time? (Pipelines)
- **Gap = anything answered "no"**

**Layer 2: Intelligence**
- Can entrepreneurs access AI models for core tasks? (Generation, analysis, decision support)
- Are there domain-specific prompt systems for the target verticals? (Legal, financial, marketing)
- Are repetitive workflows automated? (Document creation, data entry, scheduling)
- Can the system provide real-time recommendations? (Market data, pricing, strategy)
- **Gap = anything answered "no"**

**Layer 3: Applications**
- Can entrepreneurs form a legal entity through the ecosystem? (Legal tech)
- Can they invoice, collect payments, and manage finances? (Financial tools)
- Can they create and distribute marketing content? (Marketing engines)
- Can they communicate with team and clients? (Communication tools)
- Can they manage projects and track progress? (Project management)
- **Gap = anything answered "no"**

**Layer 4: Distribution**
- Are district services accessible via public APIs? (Developer access)
- Can entrepreneurs list products/services on established marketplaces? (Market access)
- Is there a content distribution pipeline for visibility? (Content channels)
- Can third parties build on the district's platform? (Developer ecosystem)
- **Gap = anything answered "no"**

### Step 3: Classify Each Gap

| Classification | Definition | Action |
|---------------|------------|--------|
| **Blocking** | Progress on the current phase cannot continue without this | Immediate — deploy within 30 days |
| **Degrading** | The system works but poorly — users experience friction | Near-term — deploy within 90 days |
| **Missing** | A capability that should exist but doesn't yet affect current users | Planned — schedule for next phase |
| **Future** | Not needed yet but will be required for scaling | Backlog — document and revisit |

### Step 4: Prioritize Using the Impact-Effort Matrix

For each blocking or degrading gap:

```
                    LOW EFFORT          HIGH EFFORT
                ┌─────────────────┬─────────────────┐
   HIGH IMPACT  │  DO FIRST       │  PLAN CAREFULLY  │
                │  Quick wins that│  Major projects  │
                │  unblock growth │  with big payoff  │
                ├─────────────────┼─────────────────┤
   LOW IMPACT   │  DO IF EASY     │  SKIP FOR NOW    │
                │  Nice-to-have   │  Not worth the   │
                │  improvements   │  investment yet   │
                └─────────────────┴─────────────────┘
```

### Step 5: Document the Gap Register

| Gap ID | Layer | Description | Classification | Impact | Effort | Owner | Target Date | Dependencies |
|--------|-------|-------------|---------------|--------|--------|-------|-------------|-------------|
| G001 | 1 | No community Wi-Fi on target corridor | Blocking | High | High | City IT | Q2 2026 | Funding approval, vendor selection |
| G002 | 2 | No domain-specific AI tools for local businesses | Degrading | High | Medium | Tech team | Q3 2026 | Layer 1 Wi-Fi deployment |
| G003 | 3 | No integrated business formation tool | Missing | Medium | Low | App team | Q4 2026 | AI layer operational |
| G004 | 4 | No public API catalog | Future | Low | Medium | Platform team | 2027 | Layer 3 applications deployed |

## Common Gap Patterns

**Pattern 1: Infrastructure Desert**
No Layer 1 → nothing else matters. Stop planning Layer 3 applications until connectivity and cloud are deployed.

**Pattern 2: Intelligence Bypass**
Layer 1 exists, Layer 3 apps exist, but Layer 2 (AI/intelligence) was skipped. Result: apps are just digitized versions of legacy processes. The gatekeeper hasn't been replaced — just given a URL.

**Pattern 3: Distribution Neglect**
Layers 1-3 are solid but Layer 4 is absent. The ecosystem works for insiders but is invisible to the outside world. Growth stalls.

**Pattern 4: Community Gap**
All layers technically functional but community engagement (Readiness Scorecard Dimension 7) is low. Technology deployed without trust. Adoption fails.

## Output

The completed gap analysis produces:
1. A prioritized gap register (table above)
2. A clear "next 3 things to do" list
3. Dependencies mapped so nothing is deployed out of sequence
4. A rough timeline for gap closure

Feed these into the Implementation Playbooks (`02-implementation/`).
