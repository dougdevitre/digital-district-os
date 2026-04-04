# Decision Tree: Technology Selection

## Principle

Choose the simplest, most open, most secure technology that solves the problem. Prefer managed services over self-hosted. Prefer open standards over proprietary. Prefer serverless over servers.

## Layer 1: Infrastructure Decisions

### Cloud Provider

```
Do you have existing cloud infrastructure?
├── YES → Use what you have (AWS, Azure, GCP)
│         Switching costs > any marginal benefit
└── NO → Use AWS
         Rationale: Broadest service catalog, strongest serverless
         ecosystem, best documentation, most skills available in market
```

### Compute Model

```
What's your traffic pattern?
├── Unpredictable / bursty → Lambda (serverless)
│   - Zero cost at zero traffic
│   - Scales automatically
│   - No server management
├── Steady, moderate → Fargate (containers)
│   - More control than Lambda
│   - Still managed, no EC2
└── High-throughput, steady → ECS on EC2 or EKS
    - Only if you have the ops team to manage it
    - Most Digital Districts should NOT start here
```

### Database

```
What kind of data?
├── Key-value lookups, user profiles, sessions → DynamoDB
│   - Serverless, auto-scaling, pay-per-request
│   - Default choice for Digital District services
├── Complex queries, joins, reporting → PostgreSQL (RDS)
│   - Use Aurora Serverless v2 for auto-scaling
│   - Needed for analytics and reporting workloads
├── Full-text search → OpenSearch Serverless
│   - For directory search, content search
└── File storage → S3
    - Documents, images, exports, backups
    - Enable versioning and encryption by default
```

### Identity

```
Do you need to federate with existing institutional IdPs?
├── YES → Cognito User Pools + SAML/OIDC federation
│         - Handles federation complexity
│         - Built-in MFA, email verification
└── NO → Cognito User Pools (standalone)
         OR Auth0 if team has Auth0 experience
         - Simpler setup
         - Good for Phase 1 pilot
```

### Wi-Fi Infrastructure

```
Corridor length?
├── < 0.5 miles → 3-5 mesh nodes
│   Vendors: Ubiquiti, Cambium, Aruba Instant On
│   Budget: $15K-$50K
├── 0.5-2 miles → 5-15 mesh nodes
│   Vendors: Cambium, Ruckus, Cisco Meraki
│   Budget: $50K-$150K
└── > 2 miles → 15+ mesh nodes + backhaul planning
    Vendors: Ruckus, Cisco, purpose-built municipal systems
    Budget: $150K-$500K
    Consider: Phased deployment, start with highest-density segments
```

## Layer 2: Intelligence Decisions

### AI Model

```
What do you need AI to do?
├── General business assistance → Claude API (Sonnet for speed, Opus for depth)
│   - Best for document generation, analysis, decision support
│   - Strong MCP ecosystem for tool use
├── Code generation specifically → Claude API or Codex
├── Image generation → Not core to Digital District v1. Skip.
└── Custom/fine-tuned model → Only if you have 10,000+ domain-specific examples
    - Most Digital Districts should NOT fine-tune
    - Prompt engineering + skills solve 90% of needs
```

### Automation

```
Automation complexity?
├── Simple (< 5 steps, no branching) → Lambda + EventBridge
│   - Native AWS, no additional service
├── Medium (5-20 steps, some branching) → Step Functions
│   - Visual workflow, built-in error handling
│   - Good for onboarding pipelines, approval flows
└── Complex (user-facing, non-technical team manages) → n8n (self-hosted) or Make
    - Visual builder for non-engineers
    - Good for marketing automation, event workflows
```

## Layer 3: Application Decisions

```
Build vs. buy?
├── Core to Digital District value prop → BUILD
│   Examples: Onboarding pipeline, AI skill marketplace, directory
│   Stack: React + Vite + TypeScript (frontend)
│          Node.js + Express + TypeScript (backend)
│          DynamoDB (data)
│          Lambda + API Gateway (compute)
│
├── Commodity function → BUY / INTEGRATE
│   Examples: Payment processing (Stripe), email (SES/SendGrid),
│             calendar (Google Calendar API), CRM (HubSpot free tier)
│
└── Exists as open source → FORK + CUSTOMIZE
    Examples: Help center (Docusaurus), analytics dashboard (Grafana),
              project management (various OSS options)
```

## Decision Anti-Patterns

**Don't do this:**

| Anti-Pattern | Why It's Bad | Do This Instead |
|-------------|-------------|-----------------|
| Build a custom identity system | Security liability, maintenance burden | Use Cognito or Auth0 |
| Self-host databases on EC2 | Ops burden, scaling complexity | Use managed databases (DynamoDB, Aurora) |
| Start with Kubernetes | Massive complexity for small teams | Start with Lambda, move to containers if needed |
| Fine-tune an AI model in Phase 1 | Expensive, slow, premature optimization | Use prompt engineering and Claude skills |
| Build a custom CMS | Solved problem | Use Docusaurus, Astro, or similar |
| Use blockchain for identity | Complexity for no benefit at this stage | Use standard OIDC identity |
| Over-architect for scale before proving demand | Wasted effort and budget | Build for 1,000 users, refactor for 100,000 |

## Security Non-Negotiables

Regardless of technology choice:

- [ ] All secrets in SSM Parameter Store (SecureString) or environment variables — never in code
- [ ] TLS 1.3 for all endpoints
- [ ] Encryption at rest for all data stores
- [ ] Least-privilege IAM for all services
- [ ] Audit logging enabled for all API calls
- [ ] Dependency scanning in CI/CD pipeline
- [ ] No public S3 buckets (ever)
- [ ] VPC for any compute that touches user data
- [ ] WAF on API Gateway for public-facing endpoints
