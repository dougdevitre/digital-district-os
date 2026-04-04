# API Design Principles for Digital Districts

## Core Standards

All Digital District APIs must follow these principles. Non-negotiable.

### 1. RESTful by Default

- Use standard HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Resource-oriented URLs: `/api/v1/businesses/{id}/services`
- Consistent response format across all endpoints
- HATEOAS links for discoverability where practical

### 2. Versioned

- URL-based versioning: `/api/v1/`, `/api/v2/`
- Never break existing versions — deprecate and sunset on a published schedule
- Minimum 12-month deprecation notice before removing a version

### 3. Authenticated and Authorized

- All endpoints require authentication (no anonymous access to district data)
- OAuth 2.0 / OpenID Connect for user authentication
- API keys for machine-to-machine communication
- Scoped permissions — request only the access you need
- Rate limiting enforced at the gateway level

```
Authorization: Bearer <jwt_token>
X-API-Key: <api_key>       // for M2M
X-Rate-Limit-Remaining: 95
X-Rate-Limit-Reset: 1704067200
```

### 4. Consistent Response Format

```json
{
  "status": "success",
  "data": { ... },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-04-04T14:30:00Z",
    "pagination": {
      "page": 1,
      "per_page": 25,
      "total": 142,
      "next": "/api/v1/businesses?page=2"
    }
  }
}
```

Error responses:
```json
{
  "status": "error",
  "error": {
    "code": "BUSINESS_NOT_FOUND",
    "message": "No business found with the given identifier.",
    "request_id": "req_abc123"
  }
}
```

### 5. Secure by Default

| Requirement | Implementation |
|------------|----------------|
| Encryption in transit | TLS 1.3 minimum, HSTS headers |
| Encryption at rest | AES-256 for stored data |
| Input validation | Strict schema validation on all inputs |
| Output sanitization | No raw database errors exposed |
| Audit logging | Every API call logged with timestamp, user, action |
| CORS | Allowlist-based, not wildcard |

## Standard API Domains

Every Digital District should expose APIs in these categories:

### Identity APIs
```
POST   /api/v1/auth/register        # Create digital identity
POST   /api/v1/auth/login            # Authenticate
POST   /api/v1/auth/token/refresh    # Refresh JWT
GET    /api/v1/auth/profile          # Get current user profile
PATCH  /api/v1/auth/profile          # Update profile
```

### Business APIs
```
POST   /api/v1/businesses            # Register a new business
GET    /api/v1/businesses             # List/search businesses
GET    /api/v1/businesses/{id}        # Get business details
PATCH  /api/v1/businesses/{id}        # Update business
GET    /api/v1/businesses/{id}/services  # List business services
```

### Directory APIs
```
GET    /api/v1/directory/search       # Search across all entities
GET    /api/v1/directory/categories   # List business categories
GET    /api/v1/directory/nodes        # List connected district nodes
GET    /api/v1/directory/nodes/{id}   # Get node details
```

### Intelligence APIs
```
POST   /api/v1/ai/generate           # Generate content (plans, docs, copy)
POST   /api/v1/ai/analyze            # Analyze data or documents
POST   /api/v1/ai/recommend          # Get recommendations
GET    /api/v1/ai/skills             # List available AI skills
```

### Metrics APIs
```
GET    /api/v1/metrics/ecosystem      # Aggregated ecosystem health
GET    /api/v1/metrics/corridors/{id} # Corridor-specific metrics
GET    /api/v1/metrics/businesses/{id} # Business-specific dashboard
```

### Events APIs
```
GET    /api/v1/events                 # List upcoming events
GET    /api/v1/events/{id}            # Event details
POST   /api/v1/events/{id}/register   # Register for event
```

## MCP Server Integration

For Claude-native integration, each API domain should have a corresponding MCP server:

```typescript
// Example: Digital District MCP Server
const server = new McpServer({
  name: "digital-district",
  version: "1.0.0",
  description: "Digital District ecosystem services"
});

server.tool("search_businesses", {
  query: z.string(),
  category: z.string().optional(),
  corridor: z.string().optional()
}, async ({ query, category, corridor }) => {
  // Call Digital District API
  const results = await ddClient.get('/api/v1/directory/search', {
    params: { q: query, category, corridor }
  });
  return { content: [{ type: "text", text: JSON.stringify(results.data) }] };
});
```

## Data Sharing Between Nodes

When Innovation Districts connect as nodes:

### What Gets Shared
- Public business listings (opt-in)
- Aggregated, anonymized ecosystem metrics
- Event listings
- Service catalogs
- API specifications

### What Does NOT Get Shared
- Individual user data (without explicit consent)
- Financial data
- Authentication credentials
- Usage analytics tied to individuals
- Any PII unless the user opts in per data sharing agreement

### Data Sharing Protocol
```
Node A                        Network                       Node B
  │                              │                              │
  │── POST /share/catalog ──────►│                              │
  │                              │── Validate schema ──────────►│
  │                              │── POST /receive/catalog ────►│
  │                              │                              │
  │                              │◄── ACK ─────────────────────│
  │◄── Share confirmed ─────────│                              │
```

## Reference Architecture (AWS)

```
┌────────────────────────────────────────────────┐
│                 CloudFront CDN                  │
└──────────────────┬─────────────────────────────┘
                   │
┌──────────────────▼─────────────────────────────┐
│             API Gateway (REST)                  │
│  Rate limiting · Auth · CORS · Logging          │
└──────────────────┬─────────────────────────────┘
                   │
┌──────────────────▼─────────────────────────────┐
│              Lambda Functions                    │
│  One function per API domain                    │
│  Node.js 22 · TypeScript · AWS SDK v3           │
└──────────────────┬─────────────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
┌───▼──┐     ┌────▼───┐    ┌────▼───┐
│Dynamo│     │   S3   │    │Cognito │
│  DB  │     │        │    │        │
└──────┘     └────────┘    └────────┘

Monitoring: CloudWatch + X-Ray
Secrets: SSM Parameter Store (SecureString)
CI/CD: GitHub Actions → CodePipeline
IaC: CDK (TypeScript)
```

## Implementation Checklist

- [ ] API Gateway deployed with custom domain and TLS
- [ ] Authentication flow operational (register → login → JWT)
- [ ] At least 5 API endpoints live and documented
- [ ] Rate limiting configured (100 req/min default, adjustable per client)
- [ ] CORS allowlist configured
- [ ] Audit logging to CloudWatch
- [ ] Error responses follow standard format
- [ ] API documentation published (OpenAPI 3.0 spec)
- [ ] Health check endpoint (`GET /api/v1/health`) returning service status
- [ ] MCP server wrapper deployed for Claude integration
