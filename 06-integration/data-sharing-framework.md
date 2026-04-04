# Data Sharing Framework

## Purpose

Define what data flows between nodes, services, and external systems within the Digital District ecosystem — and what doesn't. This framework governs all data exchange at every layer of the stack.

## Data Classification

Every piece of data in the ecosystem falls into one of four classification levels:

| Level | Label | Description | Sharing Rules |
|-------|-------|-------------|--------------|
| **L1** | Public | Business listings, event calendars, aggregated metrics, API documentation | Open — share freely, no consent required |
| **L2** | Ecosystem | Usage patterns (anonymized), cross-node referral data, skill availability | Network-only — shared between authenticated nodes, aggregated/anonymized |
| **L3** | Protected | Individual user profiles, business financials, AI interaction history | Consent-required — user must explicitly opt in per recipient |
| **L4** | Restricted | Authentication credentials, encryption keys, PII (SSN, DOB), health data | Never shared — stored encrypted, accessed only by the owning service |

## Data Flow Map

```
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL CONSUMERS                        │
│  (Public website, open data portal, media, researchers)      │
│  ── Access: L1 data only ──                                  │
└──────────────────────────┬──────────────────────────────────┘
                           │ L1
┌──────────────────────────▼──────────────────────────────────┐
│                     API GATEWAY                              │
│  (Authentication, rate limiting, logging)                     │
└──────────┬───────────────┬───────────────┬──────────────────┘
           │ L1+L2         │ L1+L2+L3      │ L1+L2
┌──────────▼─────┐  ┌──────▼──────┐  ┌─────▼──────────┐
│  NETWORK NODES │  │ AUTHORIZED  │  │  ANALYTICS     │
│  (Cortex, 39N) │  │ USERS       │  │  ENGINE        │
│  See: catalogs,│  │ See: their  │  │  See: aggregate│
│  events, agg.  │  │ own data +  │  │  patterns only │
│  metrics       │  │ opted-in    │  │  (anonymized)  │
└────────────────┘  └─────────────┘  └────────────────┘
```

## Consent Model

### Opt-In by Default

No user data (L3) is shared with any third party unless the user explicitly opts in. Opt-in is:

- **Granular:** Per-recipient, per-data-type (not a blanket "share everything" toggle)
- **Revocable:** Users can revoke consent at any time; data stops flowing within 24 hours
- **Visible:** Users can see exactly what data they've shared, with whom, and when
- **Time-limited:** Consent expires after 12 months and must be renewed

### Consent Record Schema

```json
{
  "consent_id": "con_abc123",
  "user_id": "usr_def456",
  "recipient_node_id": "node_cortex",
  "data_types": ["business_profile", "service_catalog"],
  "granted_at": "2026-04-04T14:00:00Z",
  "expires_at": "2027-04-04T14:00:00Z",
  "revoked_at": null,
  "consent_method": "in_app_toggle",
  "version": "1.0"
}
```

## Data Retention

| Data Type | Retention Period | Deletion Method |
|-----------|-----------------|-----------------|
| Active user profiles | Duration of account + 90 days | Soft delete → hard delete after 90 days |
| AI interaction logs | 90 days | Auto-purge |
| Business listings | Duration of account + 30 days | Soft delete → hard delete after 30 days |
| Aggregated analytics | Indefinite (no PII) | N/A |
| Authentication logs | 2 years | Auto-purge |
| Consent records | Duration of account + 3 years (legal compliance) | Hard delete after 3 years post-account-closure |
| Financial transaction data | 7 years (tax compliance) | Hard delete after 7 years |

## User Data Rights

Every user has the right to:

1. **Access:** Download a complete copy of all data the system holds about them
2. **Correct:** Request correction of inaccurate data
3. **Delete:** Request deletion of their data (subject to legal retention requirements)
4. **Port:** Export their data in a standard format (JSON) for use in another system
5. **Object:** Object to specific data processing activities
6. **Know:** See exactly which nodes/services have accessed their data

### Data Export Format

```json
{
  "export_date": "2026-04-04T14:30:00Z",
  "user": {
    "id": "usr_def456",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "created_at": "2025-06-15T10:00:00Z"
  },
  "businesses": [ ... ],
  "ai_interactions": [ ... ],
  "consent_records": [ ... ],
  "activity_log": [ ... ]
}
```

## Cross-Node Data Sharing Protocol

When Node A shares data with Node B:

### Pre-Sharing Checklist
- [ ] Data Sharing Agreement (DSA) signed between nodes
- [ ] Data classification confirmed (only L1 and L2 flow without user consent)
- [ ] API authentication established (mutual TLS or API key exchange)
- [ ] Data format agreed (JSON, matching published schemas)
- [ ] Audit logging active on both sides
- [ ] Incident response contacts exchanged

### Data Sharing Agreement Template

A DSA must include:

1. **Parties:** Which nodes are sharing
2. **Data types:** Exactly what data is shared (by classification level)
3. **Purpose:** Why the data is being shared (specific, not "business purposes")
4. **Duration:** How long the agreement lasts
5. **Security requirements:** Encryption, access controls, audit requirements
6. **Incident notification:** Timeline for breach notification (24 hours max)
7. **Termination:** How either party can end the agreement and what happens to shared data
8. **Governing law:** Jurisdiction for disputes

## Security Requirements

### Encryption
- In transit: TLS 1.3 minimum for all API communication
- At rest: AES-256 for all stored data (L2 and above)
- Key management: AWS KMS with automatic rotation

### Access Control
- Least privilege: Every service account has minimum required permissions
- Role-based: Access tied to roles, not individuals
- MFA: Required for all administrative access
- API keys: Rotated every 90 days minimum

### Monitoring
- All data access logged with: timestamp, user/service, data accessed, action taken
- Anomaly detection for unusual access patterns
- Weekly audit review of access logs
- Quarterly penetration testing

### Incident Response
- Security incidents classified: Critical (data breach) / High (unauthorized access attempt) / Medium (policy violation) / Low (configuration issue)
- Critical incidents: Response within 1 hour, user notification within 24 hours
- Post-incident review within 5 business days
- Root cause analysis published (redacted) within 30 days

## Privacy Impact Assessment Triggers

A Privacy Impact Assessment (PIA) must be completed before:

- Adding a new data type to the ecosystem
- Connecting a new node that will share or receive user data
- Deploying a new AI model that processes user data
- Changing data retention policies
- Expanding data sharing to a new jurisdiction

## Compliance Notes

This framework is designed to be compatible with:
- CCPA / CPRA (California)
- State-level privacy laws (growing rapidly)
- FERPA (if education data is involved)
- HIPAA (if health data is involved — avoid unless necessary)
- Municipal data governance ordinances

**Important:** This framework provides structure but is not legal advice. Consult with a privacy attorney before deploying in production, especially when handling health or education data.
