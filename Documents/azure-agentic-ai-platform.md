# Azure Agentic AI Platform Reference

**Type:** Architecture reference  
**Audience:** Platform / AI architects  
**Updated:** 2026-03

## Purpose

Define a production-ready pattern for Agentic AI on Azure — landing zones, Foundry / Azure OpenAI, tool governance, RAG, and operations.

## Scope

- Identity and private networking
- Model and agent hosting
- Tool / action plane controls
- Evaluation and promotion
- Observability and cost

## Control planes

| Plane | Responsibility | Azure building blocks |
| --- | --- | --- |
| Control | Prompts, policies, routing | Foundry, Prompt Flow, APIM |
| Data | Indexes, memory, lineage | AI Search, Storage, Cosmos DB |
| Action | Tools, APIs, approvals | Logic Apps, Functions, Managed Identity |

## Baseline requirements

1. Private endpoints for model and search traffic.
2. Managed identity for all tool calls — no long-lived secrets in agent runtime.
3. Tool allowlists with least privilege and human gates for high-impact actions.
4. Correlation IDs on every tool invocation and model call.
5. Evaluation harness before production promotion (groundedness, safety, regression).

## RAG guidance

- Prefer curated enterprise indexes over bulk dumps.
- Preserve source lineage on every chunk.
- Measure retrieval quality separately from generation quality.

## Operations checklist

- [ ] Latency and token cost dashboards
- [ ] Tool failure and policy-block alerts
- [ ] SLO for answer quality and safety incidents
- [ ] Runbook for model / index rollback

## Outcome

Agent workloads ship on a boring, governed platform so product teams can move fast without reinventing security and ops.
