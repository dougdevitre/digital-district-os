# Layer 1: Infrastructure Deployment Checklist

## Connectivity

- [ ] Corridor Wi-Fi site survey completed (coverage map, node placement, power sources)
- [ ] Wi-Fi vendor selected and hardware procured
- [ ] Mounting agreements with building owners signed
- [ ] Wi-Fi mesh nodes installed and tested
- [ ] Coverage validated: ≥80% of corridor with signal strength ≥ -70 dBm
- [ ] Captive portal configured (branded, minimal-friction login)
- [ ] Bandwidth provisioned: minimum 50 Mbps aggregate per node
- [ ] Backhaul connection to ISP established and redundant
- [ ] Network monitoring deployed (uptime, usage, alerts)

## Cloud Compute

- [ ] AWS account created with Organizations structure
- [ ] IAM roles and policies configured (least privilege)
- [ ] VPC deployed with public/private subnets
- [ ] Lambda functions operational for core services
- [ ] API Gateway deployed with custom domain and TLS certificate
- [ ] CloudWatch logging and alerting configured
- [ ] Cost alerts set (billing alarm at 80% and 100% of budget)
- [ ] WAF rules deployed on public-facing endpoints

## Data Storage

- [ ] DynamoDB tables created for core entities (users, businesses, events)
- [ ] S3 buckets created for file storage (versioning enabled, encryption enabled)
- [ ] Backup strategy configured (point-in-time recovery for DynamoDB, S3 replication)
- [ ] Data retention policies documented and enforced
- [ ] No public S3 buckets (verified)

## Identity and Auth

- [ ] Cognito User Pool created with password policy enforced
- [ ] Email verification flow operational
- [ ] MFA configured (TOTP recommended, SMS fallback)
- [ ] JWT token issuance and validation working
- [ ] Refresh token rotation enabled
- [ ] Admin user creation and management flow operational
- [ ] Brute force protection configured (account lockout after 5 attempts)

## Security Baseline

- [ ] All secrets stored in SSM Parameter Store (SecureString)
- [ ] No hardcoded credentials in any codebase (verified via scan)
- [ ] TLS 1.3 enforced on all endpoints
- [ ] CORS allowlist configured (no wildcards)
- [ ] Dependency vulnerability scanning in CI/CD
- [ ] Security incident response plan documented
- [ ] Penetration test scheduled (within 30 days of launch)

## Operations

- [ ] CI/CD pipeline operational (GitHub Actions → deployment)
- [ ] Staging environment mirrors production
- [ ] Health check endpoint returning service status
- [ ] Runbook for common operational tasks documented
- [ ] On-call rotation established (even if it's one person)
- [ ] Infrastructure as Code (CDK or CloudFormation) for all resources
