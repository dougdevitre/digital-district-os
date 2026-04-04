# Identity Layer

## Purpose

A single digital identity that works across every node, service, and application in the Digital District ecosystem. Register once, access everything.

## Architecture

```
┌─────────────────────────────────────────────────┐
│              IDENTITY PROVIDER (IdP)             │
│            (AWS Cognito + federation)             │
├─────────────────────────────────────────────────┤
│                                                   │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐    │
│  │  Delmar   │  │  Cortex   │  │  39 North  │   │
│  │  Services │  │  Services │  │  Services  │   │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘   │
│        │               │               │         │
│        └───────────────┼───────────────┘         │
│                        │                          │
│              ┌─────────▼─────────┐               │
│              │   JWT Validation   │               │
│              │   (API Gateway)    │               │
│              └───────────────────┘               │
└─────────────────────────────────────────────────┘
```

## Identity Types

| Type | Description | Auth Method | Permissions |
|------|-------------|-------------|-------------|
| **Resident** | Individual user | Email/password + MFA | Access public services, AI tools, directory |
| **Business** | Registered business entity | Admin user + business verification | All resident permissions + business APIs, marketplace |
| **Node** | Connected Innovation District | Mutual TLS + API key | Cross-node data sharing, event federation |
| **Service** | Machine-to-machine | API key + IAM role | Scoped access to specific API domains |
| **Admin** | System administrator | SSO + MFA + hardware key | Full system access with audit trail |

## Registration Flow

```
User visits portal
       │
       ▼
  Email + Password
  (min 12 chars, complexity enforced)
       │
       ▼
  Email verification
  (magic link, 15-min expiry)
       │
       ▼
  Profile creation
  (name, neighborhood, interests — all optional except name)
       │
       ▼
  MFA setup
  (TOTP app recommended, SMS available)
       │
       ▼
  Identity active
  (JWT issued, 1-hour expiry, refresh token 30-day)
```

## Token Structure

```json
{
  "sub": "usr_def456",
  "iss": "https://auth.digitaldistrict.city",
  "aud": "digital-district-api",
  "iat": 1712246400,
  "exp": 1712250000,
  "scope": "resident:read resident:write ai:use",
  "node": "delmar",
  "roles": ["resident", "business_owner"],
  "mfa_verified": true
}
```

## Federation

When a new Innovation District joins as a node, identity federation enables their existing users to access Digital District services:

### Federation Protocol
1. Node registers its IdP with the Digital District IdP
2. SAML or OIDC trust relationship established
3. Node users authenticate with their existing credentials
4. Digital District IdP issues a DD JWT with federated identity claims
5. User accesses DD services without creating a new account

### Supported Federation Protocols
- OpenID Connect (preferred)
- SAML 2.0 (for legacy institutional IdPs)
- OAuth 2.0 (for social login fallback)

## Security Requirements

| Requirement | Implementation |
|------------|----------------|
| Password policy | Min 12 chars, no known-breached passwords (HaveIBeenPwned check) |
| MFA | Required for admin, recommended for all users |
| Token expiry | Access token: 1 hour; Refresh token: 30 days |
| Session management | Max 5 concurrent sessions per user |
| Brute force protection | Account lockout after 5 failed attempts (15-min cooldown) |
| Credential storage | bcrypt with cost factor 12 (Cognito default) |
| Transport | TLS 1.3 only for auth endpoints |

## Implementation (AWS Cognito)

```typescript
// cognito-config.ts
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const cognitoConfig = {
  userPoolId: process.env.COGNITO_USER_POOL_ID!,
  clientId: process.env.COGNITO_CLIENT_ID!,
  region: process.env.AWS_REGION || "us-east-2",
  passwordPolicy: {
    minimumLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false, // reduces friction without major security cost
  },
  mfa: {
    enabled: true,
    preferred: "TOTP",
    fallback: "SMS",
  },
};
```

## Data Minimization

The identity layer collects the minimum data needed:

**Required:** Email, display name
**Optional:** Neighborhood, business name, interests, preferred language
**Never collected:** SSN, date of birth, government ID numbers, biometric data

Users can delete their identity at any time. Deletion removes all L3/L4 data within 90 days. L1/L2 aggregated/anonymized data is retained.
