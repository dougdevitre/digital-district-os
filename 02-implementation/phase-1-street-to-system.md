# Phase 1: From Street to System

## Objective

Transform a single physical corridor into a functioning Digital Mainstreet — the foundational unit of the Digital District ecosystem.

## Prerequisites

- Corridor selected (see `03-decision-trees/corridor-selection.md`)
- Readiness Scorecard completed with total score ≥ 11
- At least one institutional champion identified
- Seed funding secured ($100K-500K for pilot)

## Duration: 3-6 Months

## Workstreams

### 1.1 Community Engagement (Weeks 1-4)

**Objective:** Build trust and co-design the deployment with the corridor community.

| Task | Owner | Deliverable | Deadline |
|------|-------|-------------|----------|
| Host 3 community listening sessions | Community Lead | Summary report with themes | Week 2 |
| Identify 10 local business partners for pilot | Business Dev | Signed LOIs | Week 3 |
| Establish community advisory board (7-12 members) | Governance Lead | Charter + roster | Week 4 |
| Create public-facing project page | Communications | Live website | Week 4 |

**Critical rule:** No technology deploys before community engagement is complete. Technology without trust produces backlash, not adoption.

### 1.2 Layer 1 Infrastructure Deployment (Weeks 3-12)

**Objective:** Deploy foundational connectivity and cloud infrastructure on the corridor.

| Task | Owner | Deliverable | Deadline |
|------|-------|-------------|----------|
| Conduct corridor Wi-Fi site survey | Infrastructure Lead | Coverage map + equipment spec | Week 4 |
| Procure and install mesh Wi-Fi nodes | Infrastructure Lead | Operational Wi-Fi covering 80%+ of corridor | Week 10 |
| Provision cloud environment (AWS) | DevOps | Production AWS account with IAM, VPC, basic services | Week 5 |
| Deploy identity/auth system | DevOps | User registration + auth flow operational | Week 8 |
| Set up monitoring and alerting | DevOps | CloudWatch dashboards + PagerDuty alerts | Week 8 |
| Establish data pipeline backbone | Data Engineer | EventBridge + basic ETL operational | Week 12 |

**Architecture reference:**

```
┌─────────────────────────────────────────┐
│         CORRIDOR WI-FI MESH             │
│    (5-15 nodes depending on length)     │
└──────────────┬──────────────────────────┘
               │
    ┌──────────▼──────────────┐
    │     API GATEWAY          │
    │   (AWS API Gateway)      │
    └──────────┬──────────────┘
               │
    ┌──────────▼──────────────┐
    │    COMPUTE LAYER         │
    │   (Lambda + containers)  │
    └──────────┬──────────────┘
               │
    ┌──────────▼──────────────┐
    │    DATA LAYER            │
    │   (DynamoDB + S3)        │
    └──────────┬──────────────┘
               │
    ┌──────────▼──────────────┐
    │    IDENTITY/AUTH         │
    │   (Cognito + SSO)        │
    └─────────────────────────┘
```

### 1.3 Layer 2 Intelligence Pilot (Weeks 8-16)

**Objective:** Deploy AI-powered tools for the pilot business partners.

| Task | Owner | Deliverable | Deadline |
|------|-------|-------------|----------|
| Identify top 5 tasks pilot businesses need help with | Product Lead | Prioritized task list | Week 9 |
| Build 3 domain-specific AI prompts/skills | AI Engineer | Deployed Claude skills | Week 12 |
| Deploy document generation for common business needs | AI Engineer | Working doc generator (invoices, proposals, etc.) | Week 14 |
| Set up 1 automation workflow per pilot business | Automation Lead | 10 operational automations | Week 16 |

### 1.4 Measurement Baseline (Weeks 1-4, then ongoing)

**Objective:** Establish the metrics baseline so you can prove impact.

| Metric | Baseline Measurement | Measurement Method | Frequency |
|--------|---------------------|-------------------|-----------|
| Businesses on corridor with digital presence | Count at start | Manual audit | Monthly |
| Wi-Fi active users | 0 at launch | Network analytics | Weekly |
| AI tool usage (sessions/month) | 0 at launch | Application analytics | Weekly |
| New business registrations on corridor | Historical baseline | City records | Monthly |
| Community satisfaction score | Baseline survey | Survey instrument | Quarterly |
| Revenue impact for pilot businesses | Baseline financials | Self-reported | Quarterly |

## Phase 1 Exit Criteria

All must be true to proceed to Phase 2:

- [ ] Wi-Fi operational with ≥ 80% corridor coverage
- [ ] Cloud infrastructure deployed and secured
- [ ] Identity system operational with ≥ 50 registered users
- [ ] At least 3 AI tools deployed and in active use
- [ ] At least 10 businesses actively using the system
- [ ] Community advisory board met at least 2 times
- [ ] Measurement baseline established for all KPIs
- [ ] No unresolved community concerns blocking expansion

## Budget Estimate

| Category | Low Estimate | High Estimate | Notes |
|----------|-------------|---------------|-------|
| Wi-Fi infrastructure | $50,000 | $200,000 | Depends on corridor length and density |
| Cloud services (6 months) | $3,000 | $12,000 | AWS consumption-based |
| AI model API costs (6 months) | $2,000 | $10,000 | Depends on usage volume |
| Staff / contractors | $40,000 | $150,000 | 1-3 FTEs or contractors |
| Community engagement | $5,000 | $25,000 | Events, materials, stipends |
| Monitoring / tools | $1,000 | $5,000 | SaaS subscriptions |
| **Total** | **$101,000** | **$402,000** | |

**Comparison:** A single building renovation in a legacy Innovation District typically costs $5M-50M. Phase 1 of a Digital Mainstreet costs 1-2% of that.

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Community resistance to "tech overlay" | Medium | High | Lead with community engagement; co-design, don't impose |
| Wi-Fi deployment delays (permits, weather) | Medium | Medium | Start procurement early; have indoor backup plan |
| Low adoption among pilot businesses | Medium | High | Provide hands-on onboarding; don't just deploy and leave |
| Funding shortfall mid-deployment | Low | High | Secure full Phase 1 funding before starting |
| Security incident | Low | High | Secure-by-default architecture; incident response plan |
