# Data Portability

## Principle

Entrepreneurs own their data. They can take it with them — between corridors, between cities, between Digital Districts. No lock-in.

## Portable Data Types

| Data Type | Format | Export Method | Import Method |
|-----------|--------|--------------|---------------|
| Business profile | JSON | API call: `GET /api/v1/businesses/{id}/export` | API call: `POST /api/v1/businesses/import` |
| Service catalog | JSON | Included in business export | Included in business import |
| AI interaction history | JSON | API call: `GET /api/v1/ai/history/export` | Not importable (district-specific context) |
| Analytics/metrics | CSV | Dashboard export button | Not importable (computed from activity) |
| Documents generated | PDF/DOCX | Download from document library | Upload to new district's document library |
| Contact/customer data | CSV | API call: `GET /api/v1/businesses/{id}/contacts/export` | API call: `POST /api/v1/businesses/{id}/contacts/import` |

## Export Format Standard

```json
{
  "export_version": "1.0",
  "export_date": "2026-04-04T14:30:00Z",
  "source_district": "dd_stl_delmar",
  "user_id": "usr_def456",
  "business": {
    "name": "Example Business",
    "category": "professional_services",
    "description": "...",
    "services": [ ... ],
    "created_at": "2025-06-15T10:00:00Z"
  },
  "contacts": [ ... ],
  "documents": [
    {
      "name": "Business Plan.pdf",
      "type": "application/pdf",
      "url": "https://export.dd.city/temp/doc_abc123",
      "expires_at": "2026-04-11T14:30:00Z"
    }
  ]
}
```

## User Rights

- Export is free and available at any time
- Export completes within 24 hours of request
- Exported data is downloadable for 7 days
- Deletion request can accompany export ("export and delete")
- No degradation of service during or after export

---

# Replication Playbook

## How Another City Deploys a Digital District

### Step 1: Fork (Day 1)

```bash
git clone https://github.com/[org]/digital-district-os.git
cd digital-district-os
# Replace all references to St. Louis with your city
```

### Step 2: Localize (Week 1-2)

| File/Section | What to Change |
|-------------|---------------|
| README.md | City name, corridor name, population numbers |
| 00-framework/thesis.md | Local examples, local Innovation Districts |
| 01-assessment/readiness-scorecard.md | Local indicators if different |
| 04-messaging/ | All pitches rewritten for local stakeholders |
| 09-case-studies/ | Add your city's case study, keep St. Louis as reference |
| templates/ | Budget numbers, city-specific language |

### Step 3: Assess (Week 2-3)

1. Complete the Readiness Scorecard for your city
2. Run the corridor selection process
3. Identify your path (A through E)
4. Complete the gap analysis

### Step 4: Build Coalition (Month 1-2)

1. Identify 1 city champion, 1 community org, 1 tech partner
2. Customize messaging from 04-messaging/ for initial stakeholder conversations
3. Secure initial endorsements
4. Begin funding conversations

### Step 5: Secure Funding (Month 2-4)

Use templates/city-proposal.md customized for your city.
Target sources: municipal budget, EDA grants, SBA programs, HUD, state economic development funds, foundations, impact investors.

### Step 6: Deploy Phase 1 (Month 4-10)

Follow 02-implementation/phase-1-street-to-system.md exactly.
Don't skip community engagement. Don't skip the measurement baseline.

### Step 7: Publish and Connect (Month 10+)

1. Publish your district manifest at `/.well-known/digital-district.json`
2. Submit to the Digital District Registry
3. Establish identity federation with at least one other district
4. Begin contributing improvements back to the shared repository

### Step 8: Document and Share (Ongoing)

Write your case study. Share what worked and what didn't. Help the next city.

## Estimated Cost by City Size

| City Population | Phase 1 Cost | Full Deployment (3 years) |
|----------------|-------------|--------------------------|
| < 100,000 | $100K - $250K | $400K - $1M |
| 100,000 - 500,000 | $200K - $500K | $800K - $3M |
| 500,000 - 1,000,000 | $300K - $750K | $1.5M - $5M |
| > 1,000,000 | $500K - $1.5M | $3M - $10M |

For comparison: a single Innovation District building typically costs $5M-$50M and serves 50-500 people.

---

# API Catalog Template

```json
{
  "$schema": "https://digitaldistrict.org/schemas/api-catalog/v1.json",
  "district_id": "dd_[city]_[corridor]",
  "district_name": "[City Name] Digital District",
  "catalog_version": "1.0",
  "last_updated": "2026-04-04T00:00:00Z",
  "base_url": "https://api.[corridor].digitaldistrict.[city]",
  "auth": {
    "type": "bearer_jwt",
    "token_endpoint": "https://auth.[corridor].digitaldistrict.[city]/oauth/token",
    "registration": "https://auth.[corridor].digitaldistrict.[city]/register"
  },
  "apis": [
    {
      "name": "Directory",
      "path": "/api/v1/directory",
      "version": "v1",
      "status": "stable",
      "auth_required": true,
      "rate_limit": "100/min",
      "data_classification": "L1",
      "description": "Search and browse the business directory",
      "openapi_spec_url": "https://api.[corridor].digitaldistrict.[city]/specs/directory-v1.yaml",
      "endpoints": [
        {"method": "GET", "path": "/search", "description": "Search businesses"},
        {"method": "GET", "path": "/categories", "description": "List categories"},
        {"method": "GET", "path": "/nodes", "description": "List connected nodes"}
      ]
    }
  ],
  "mcp_servers": [
    {
      "name": "dd-directory",
      "url": "https://mcp.[corridor].digitaldistrict.[city]/directory",
      "description": "MCP server for directory search via Claude"
    }
  ]
}
```
