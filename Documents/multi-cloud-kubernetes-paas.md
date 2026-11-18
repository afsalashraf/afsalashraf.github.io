# Multi-Cloud Kubernetes PaaS Reference

**Type:** Platform playbook  
**Audience:** Cloud / platform engineering  
**Updated:** 2026-02

## Purpose

Shared Kubernetes PaaS patterns across Azure AKS and GCP GKE — GitOps, policy, golden paths, and observability without forcing a single-cloud religion.

## Design principles

1. **Shared intent, cloud-native data plane** — baselines via Terraform / Cluster API; delivery via GitOps.
2. **Golden paths over golden images** — scaffold, CI, progressive delivery, secrets, and observability as a paved road.
3. **Same guardrails everywhere** — OPA / Kyverno / Gatekeeper policies applied consistently.

## Building blocks

| Concern | Pattern |
| --- | --- |
| Cluster baseline | Terraform modules / Cluster API |
| Workload delivery | Flux or Argo CD |
| Policy | Gatekeeper / Kyverno |
| Secrets | External Secrets + cloud KMS / Key Vault |
| Observability | OpenTelemetry → shared backend |

## Networking notes

- Private clusters by default.
- Explicit egress control and east-west contracts.
- Prefer cloud-native edge load balancing before inventing a universal mesh on day one.

## Adoption criteria

If the paved path is slower than shadow IT, teams will leave it. Measure time-to-first-deploy and security review cycle time as platform KPIs.

## Outcome

Cloud choice becomes a placement decision — not a rewrite. Teams ship the same way on AKS and GKE.
