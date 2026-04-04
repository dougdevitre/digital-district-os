# KPI Framework

## Design Principles

1. **Measure outcomes, not outputs.** Businesses formed > workshops held.
2. **Equity is a first-class metric.** Every KPI has a demographic and geographic breakdown.
3. **Real-time where possible.** Monthly reporting minimum; weekly or real-time for operational KPIs.
4. **Publicly visible.** All KPIs published on a public dashboard. Accountability requires transparency.

## KPI Hierarchy

```
                    NORTH STAR
            ┌───────────────────────┐
            │  Economic Inclusion   │
            │  Index (EII)          │
            └───────────┬───────────┘
                        │
         ┌──────────────┼──────────────┐
         │              │              │
    ┌────▼────┐   ┌─────▼─────┐  ┌────▼────┐
    │ CREATE  │   │  SUSTAIN   │  │  SCALE  │
    │ metrics │   │  metrics   │  │ metrics │
    └─────────┘   └───────────┘  └─────────┘
```

## North Star: Economic Inclusion Index (EII)

A composite score (0-100) measuring whether the Digital District is delivering equitable economic outcomes:

```
EII = (Business_Formation × 0.25) + (Revenue_Generation × 0.25) + 
      (Equity_Distribution × 0.30) + (Sustainability × 0.20)
```

| Component | What It Measures | How It's Calculated |
|-----------|-----------------|---------------------|
| Business Formation | New businesses created through DD infrastructure | Registrations per quarter, normalized to population |
| Revenue Generation | Economic value created by DD businesses | Aggregate revenue, normalized to investment |
| Equity Distribution | Whether benefits reach underserved areas | Gini coefficient of business formation by neighborhood |
| Sustainability | Whether businesses survive and grow | 12-month retention rate of DD businesses |

## CREATE Metrics (Phase 1-2 Focus)

*How effectively is the Digital District enabling new business creation?*

| KPI | Definition | Target (Year 1) | Target (Year 3) | Frequency |
|-----|-----------|-----------------|-----------------|-----------|
| Businesses registered | New entities created via DD onboarding | 500 | 5,000 | Monthly |
| Time to first revenue | Median days from registration to first sale | < 30 days | < 14 days | Monthly |
| Onboarding completion rate | % of registrations that complete full onboarding | > 60% | > 80% | Weekly |
| AI tool adoption | % of registered businesses using AI tools weekly | > 40% | > 70% | Weekly |
| Digital identity registrations | Total users with DD identity | 2,000 | 20,000 | Monthly |

## SUSTAIN Metrics (Phase 2-3 Focus)

*Are businesses surviving and growing within the ecosystem?*

| KPI | Definition | Target (Year 1) | Target (Year 3) | Frequency |
|-----|-----------|-----------------|-----------------|-----------|
| 12-month retention | % of businesses still active after 12 months | > 60% | > 70% | Monthly |
| Revenue growth (cohort) | Median revenue growth of businesses quarter-over-quarter | > 10% QoQ | > 15% QoQ | Quarterly |
| Jobs created | Full-time equivalent positions created by DD businesses | 200 | 2,000 | Quarterly |
| Cross-node usage | % of users accessing services from 2+ nodes | > 10% | > 30% | Monthly |
| Net Promoter Score | Would entrepreneurs recommend the DD to others? | > 30 | > 50 | Quarterly |

## SCALE Metrics (Phase 3-4 Focus)

*Is the ecosystem growing beyond the pilot?*

| KPI | Definition | Target (Year 1) | Target (Year 3) | Frequency |
|-----|-----------|-----------------|-----------------|-----------|
| Corridors operational | Number of active Digital Mainstreet corridors | 1 | 5+ | Quarterly |
| API consumers | External applications using DD APIs | 5 | 50+ | Monthly |
| Marketplace listings | Products/services listed in DD marketplace | 100 | 2,000+ | Monthly |
| Replication cities | Other cities that have forked and deployed the model | 0 | 3+ | Quarterly |
| Community Wi-Fi coverage | % of city population within Wi-Fi coverage | 10% | 60%+ | Quarterly |

## EQUITY Metrics (Always Active)

*These are not optional. Every other metric must be disaggregated by these dimensions.*

| Dimension | Disaggregation | Why |
|-----------|---------------|-----|
| Geography | By neighborhood/ward/census tract | Ensure benefits aren't concentrated in already-advantaged areas |
| Race/ethnicity | Self-reported demographic category | Measure whether historically excluded groups are participating |
| Gender | Self-reported | Measure gender equity in business formation |
| Income | Estimated by neighborhood income data | Ensure low-income areas benefit proportionally |
| Age | Self-reported age band | Measure whether young and older entrepreneurs participate |

**Target:** At least 40% of DD-registered businesses should be in neighborhoods below the city median income. At least 50% of entrepreneurs should be from non-majority demographic groups.

## Infrastructure Metrics (Operational)

| KPI | Target | Frequency |
|-----|--------|-----------|
| Wi-Fi uptime | > 99.5% | Real-time |
| API response time (p95) | < 500ms | Real-time |
| API error rate | < 1% | Real-time |
| Identity system availability | > 99.9% | Real-time |
| Security incidents | 0 critical | Monthly |
| Cloud cost per user | < $5/month | Monthly |

## Dashboard Specification

The public dashboard should display:

### Executive View (Default)
- EII score (current + trend)
- Businesses registered (total + this month)
- Jobs created (total + this quarter)
- Equity distribution map (heat map by neighborhood)
- Active corridors status

### Operational View (Staff)
- All infrastructure metrics
- Onboarding funnel conversion rates
- AI tool usage patterns
- Support ticket volume and resolution time
- Cloud spend vs. budget

### Community View (Public)
- EII score with plain-language explanation
- Stories / spotlights on DD businesses
- Upcoming events
- How to join
- Impact by neighborhood

## Reporting Cadence

| Report | Audience | Frequency | Format |
|--------|----------|-----------|--------|
| Public Dashboard | Everyone | Real-time | Web dashboard |
| Monthly Snapshot | Board, community, media | Monthly | 1-page PDF |
| Quarterly Impact Report | Board, funders, government | Quarterly | 5-10 page report |
| Annual Report | All stakeholders | Annually | Full report + public presentation |

## Data Sources

| Metric Category | Primary Data Source | Collection Method |
|----------------|-------------------|-------------------|
| Business formation | Identity + onboarding system | Automated |
| Revenue | Self-reported + payment system (if integrated) | Semi-automated |
| AI tool usage | Application analytics | Automated |
| Wi-Fi / infrastructure | Network monitoring | Automated |
| Demographics | Self-reported at registration (optional) | User-provided |
| Geographic distribution | Registration address / neighborhood | Automated |
| Satisfaction / NPS | Survey instrument | Quarterly survey |
| Jobs created | Self-reported + public records | Semi-automated |
