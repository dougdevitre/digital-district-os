# Digital District Interoperability Standard (DDIS) v1.0

## Purpose

Define the minimum technical and governance requirements for Digital Districts to interoperate — enabling entrepreneurs to move between cities, data to flow between ecosystems, and services to compose across boundaries.

## Scope

This standard applies to any entity that wants to:
- Be recognized as a Digital District in the network
- Share data with other Digital Districts
- Allow users from other districts to access services
- Be listed in the Digital District registry

## Conformance Levels

| Level | Name | Requirements | Use Case |
|-------|------|-------------|----------|
| **Level 1** | Observable | Publish a district manifest + public API catalog | "We exist and here's what we offer" |
| **Level 2** | Connectable | Identity federation + at least 3 shared API endpoints | "Our users can access your services" |
| **Level 3** | Composable | Full API interop + data sharing agreements + shared metrics | "Our ecosystems work as one network" |

## District Manifest

Every conforming Digital District must publish a machine-readable manifest at a well-known URL:

```
https://{district-domain}/.well-known/digital-district.json
```

### Manifest Schema

```json
{
  "$schema": "https://digitaldistrict.org/schemas/manifest/v1.json",
  "district_id": "dd_stl_delmar",
  "name": "Delmar Digital Mainstreet",
  "city": "St. Louis",
  "state": "MO",
  "country": "US",
  "operator": "Digital District Authority of St. Louis",
  "conformance_level": 2,
  "launched": "2026-06-01",
  "api_catalog_url": "https://api.delmar.digitaldistrict.city/catalog.json",
  "identity_provider": {
    "protocol": "oidc",
    "issuer": "https://auth.delmar.digitaldistrict.city",
    "jwks_uri": "https://auth.delmar.digitaldistrict.city/.well-known/jwks.json"
  },
  "contact": {
    "technical": "tech@delmar.digitaldistrict.city",
    "governance": "governance@delmar.digitaldistrict.city"
  },
  "nodes": [
    {
      "node_id": "node_cortex",
      "name": "Cortex Innovation Community",
      "type": "innovation_district",
      "specialization": "biotech_tech"
    },
    {
      "node_id": "node_39north",
      "name": "39 North",
      "type": "innovation_district",
      "specialization": "agtech"
    }
  ],
  "metrics_endpoint": "https://api.delmar.digitaldistrict.city/api/v1/metrics/ecosystem",
  "last_updated": "2026-04-04T00:00:00Z"
}
```

## API Catalog Standard

Each district publishes an API catalog listing available services:

```json
{
  "district_id": "dd_stl_delmar",
  "apis": [
    {
      "name": "Directory",
      "version": "v1",
      "base_url": "https://api.delmar.digitaldistrict.city/api/v1/directory",
      "auth_required": true,
      "auth_method": "bearer_jwt",
      "openapi_spec": "https://api.delmar.digitaldistrict.city/specs/directory-v1.yaml",
      "rate_limit": "100/min",
      "data_classification": "L1",
      "status": "stable"
    },
    {
      "name": "Intelligence",
      "version": "v1",
      "base_url": "https://api.delmar.digitaldistrict.city/api/v1/ai",
      "auth_required": true,
      "auth_method": "bearer_jwt",
      "openapi_spec": "https://api.delmar.digitaldistrict.city/specs/intelligence-v1.yaml",
      "rate_limit": "50/min",
      "data_classification": "L2",
      "status": "stable"
    }
  ],
  "mcp_servers": [
    {
      "name": "dd-directory",
      "url": "https://mcp.delmar.digitaldistrict.city/directory",
      "description": "Search and browse the business directory"
    }
  ]
}
```

## Identity Federation Requirements

For Level 2+ conformance, districts must support cross-district authentication:

### Protocol
- OpenID Connect (required)
- SAML 2.0 (optional, for legacy institutional IdPs)

### Claims Mapping
When a user from District A authenticates to access services in District B:

```json
{
  "sub": "usr_def456@dd_stl_delmar",
  "home_district": "dd_stl_delmar",
  "visiting_district": "dd_chi_wicker",
  "federation_level": "resident",
  "permissions": ["directory:read", "events:read", "ai:use"],
  "verified_at": "2026-04-04T14:00:00Z"
}
```

### Permission Mapping for Visiting Users

| Home Permission | Visiting Permission | Rationale |
|----------------|--------------------|-----------| 
| Full resident access | Read-only directory + events + basic AI | Visiting users get discovery, not full write access |
| Business owner | Read-only + marketplace listing (if opted in) | Businesses can list in other districts' marketplaces |
| Admin | No admin access | Admin rights don't transfer across districts |

## Shared Metrics Standard

For Level 3 conformance, districts publish standardized metrics:

```json
{
  "district_id": "dd_stl_delmar",
  "reporting_period": "2026-Q1",
  "metrics": {
    "businesses_registered": 342,
    "businesses_active_30d": 287,
    "entrepreneurs_onboarded": 156,
    "ai_tool_sessions": 12847,
    "cross_node_interactions": 891,
    "events_hosted": 23,
    "jobs_created_estimated": 89,
    "equity_index": {
      "pct_underserved_neighborhoods": 0.43,
      "pct_minority_founders": 0.51,
      "pct_women_founders": 0.38
    }
  },
  "published_at": "2026-04-01T00:00:00Z"
}
```

## Replication Playbook

### How Another City Forks This Model

1. **Fork the repository:** Clone `digital-district-os` to your GitHub org
2. **Localize the framework:** Replace St. Louis references with your city; update corridor names, institutions, demographics
3. **Run the Readiness Scorecard:** Establish your baseline
4. **Choose your path:** Use the start decision tree to determine your entry point
5. **Deploy Phase 1:** Follow the street-to-system playbook on your pilot corridor
6. **Publish your manifest:** Create your `digital-district.json` at your well-known URL
7. **Register with the network:** Submit your manifest to the Digital District Registry
8. **Connect:** Establish identity federation with at least one other district

### Localization Checklist

- [ ] City name, state, and geography updated throughout
- [ ] Corridor candidates identified and documented
- [ ] Local Innovation Districts listed as potential nodes
- [ ] Anchor institutions mapped
- [ ] Local government structure reflected in governance model
- [ ] Demographics and equity metrics localized
- [ ] Funding sources identified (local grants, federal programs, philanthropy)
- [ ] Community partners identified
- [ ] Language accessibility needs assessed
- [ ] Regulatory environment reviewed

### Estimated Time to Replication

| City Readiness | Time to Operational Pilot |
|---------------|--------------------------|
| High (score 25+): Existing tech ecosystem, supportive policy | 3-6 months |
| Medium (score 15-24): Some infrastructure, willing institutions | 6-12 months |
| Low (score <15): Starting from scratch | 12-24 months |

## Governance of the Standard

This standard is maintained by the Digital District Working Group (to be established). Proposed changes follow a public comment period of 30 days before adoption. Any conforming district can propose changes via pull request to the repository.

### Versioning
- Major versions (v2, v3): Breaking changes — 12-month migration period
- Minor versions (v1.1, v1.2): Additive changes — backward compatible
- Patch versions (v1.0.1): Clarifications and corrections only
