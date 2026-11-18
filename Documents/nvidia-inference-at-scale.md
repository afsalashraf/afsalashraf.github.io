# NVIDIA Inference at Enterprise Scale

**Type:** Capacity & serving guide  
**Audience:** ML platform / SRE  
**Updated:** 2026-01

## Purpose

Run high-throughput NVIDIA inference as a productized platform capability — with capacity classes, serving patterns, and cost governance.

## Workload classes

| Class | Goal | Isolation |
| --- | --- | --- |
| Interactive | Low latency | Dedicated pools / QoS |
| Batch embeddings | Throughput | Separate queues |
| Offline evaluation | Best effort | Burst / preemptible |

Do not mix interactive and batch on the same GPU pool without admission control.

## Serving stack

- Triton (or equivalent) for multi-model serving and dynamic batching.
- Model registry with versioned, signed, roll-backable artifacts.
- Clear autoscaling signals (queue depth, GPU util, p99 latency).

## Capacity & cost

1. Treat GPU SKUs and quotas as first-class architecture constraints.
2. Design burst + fallback regions and graceful CPU degradation where acceptable.
3. Per-team GPU hours, idle detection, and policies against zombie notebooks.

## Operations checklist

- [ ] Model version and rollback path documented
- [ ] p99 and error-rate SLOs per class
- [ ] Cost dashboards by team / workload
- [ ] Quota and burst playbooks

## Outcome

NVIDIA capacity is requested like a database — with SLOs, security baselines, and a clear owner.
