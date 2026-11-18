export type BlogPost = {
  slug: string
  title: string
  subtitle: string
  date: string
  readTime: string
  tags: string[]
  excerpt: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'production-agentic-ai-on-azure',
    title: 'Shipping Agentic AI on Azure Without the Chaos',
    subtitle: 'Landing zones, Foundry, guardrails, and the platform patterns that keep agent workloads production-ready.',
    date: '2026-03-12',
    readTime: '8 min',
    tags: ['Agentic AI', 'Azure', 'MLOps'],
    excerpt:
      'Most agent demos die in production because the platform was an afterthought. Here is the architecture path I use on Azure — from identity and networking to evaluation loops.',
    content: [
      'Agentic systems look magical in a notebook and fragile in production. The gap is rarely the model — it is identity, networking, evaluation, and the boring platform controls that make autonomous workflows safe to run at scale.',
      'When I design Agentic AI on Azure, I start with a landing zone, not a prompt. Private networking to Azure OpenAI / Foundry endpoints, managed identity for tool calls, Key Vault for secrets, and a clear separation between experiment and production subscriptions. Agents that can call tools are effectively distributed applications with credentials — treat them that way.',
      'A useful mental model is three planes: control (prompts, policies, routing), data (RAG indexes, memory stores, telemetry), and action (APIs, RPA, cloud control planes). Each plane needs its own blast-radius limits. I keep tool allowlists narrow, log every tool invocation with correlation IDs, and require human approval gates for high-impact actions.',
      'On the model side, Foundry and Azure OpenAI give you content filters, rate limits, and regional residency options. Pair that with Prompt Flow or your own evaluation harness so every prompt/tool change has regression checks before promotion. Agentic quality is not a vibe check — it is CI for behavior.',
      'For RAG, prefer curated enterprise indexes over dumping SharePoint into a vector store. Chunk with structure (headings, tables), store source lineage, and measure groundedness. Hallucination risk drops faster when retrieval quality is owned by the platform team, not left to each app team.',
      'Finally, operate it like a product. Dashboards for latency, token cost, tool failure rates, and policy blocks. SLOs for answer quality and safety incidents. The teams that win with Agentic AI are the ones who made the platform boring enough that product teams can move fast on top of it.',
    ],
  },
  {
    slug: 'multi-cloud-kubernetes-paas',
    title: 'Multi-Cloud Kubernetes PaaS That Engineers Actually Want',
    subtitle: 'Azure AKS and GKE patterns for a shared platform — GitOps, policy, and golden paths without forcing one cloud religion.',
    date: '2026-02-04',
    readTime: '7 min',
    tags: ['Kubernetes', 'Azure', 'GCP'],
    excerpt:
      'A platform that works on one cloud is a product. A platform that works on two is a discipline. Here is how I structure shared Kubernetes PaaS across Azure and GCP.',
    content: [
      'Enterprises rarely stay single-cloud forever. Acquisitions, data residency, GPU availability, and negotiating leverage all push teams toward multi-cloud. The mistake is copying YAML between AKS and GKE and calling it a platform.',
      'I treat the control plane as shared intent and the data plane as cloud-native. Cluster API or Terraform modules define baseline node pools, networking, and add-ons. GitOps (Flux or Argo CD) owns workload delivery. Policy-as-code (OPA / Kyverno / Gatekeeper) enforces the same guardrails regardless of cloud.',
      'Golden paths matter more than golden images. A developer should get a paved route: service scaffold, CI pipeline, progressive delivery, observability defaults, and a secure secret pattern. If the path is slower than shadow IT, they will leave it. Platform adoption is a UX problem as much as an infra problem.',
      'Networking is where multi-cloud platforms usually bleed. Private clusters, egress control, and consistent service discovery across clouds need explicit design. I prefer cloud-native load balancing at the edge and a clear contract for east-west traffic rather than inventing a universal mesh on day one.',
      'Observability has to be one pane. OpenTelemetry into a shared backend, cluster and app SLOs that look identical whether the pod runs on AKS or GKE, and cost attribution by team. Without that, multi-cloud becomes two platforms with twice the toil.',
      'The outcome you want is boring: teams ship the same way, security reviews the same controls, and cloud choice becomes a placement decision — not a rewrite.',
    ],
  },
  {
    slug: 'nvidia-ai-inference-at-scale',
    title: 'NVIDIA Inference at Enterprise Scale',
    subtitle: 'From GPU capacity planning to Triton serving patterns — how to run high-throughput inference without burning the budget.',
    date: '2026-01-18',
    readTime: '6 min',
    tags: ['NVIDIA', 'Inference', 'MLOps'],
    excerpt:
      'GPUs are scarce and expensive. Platform architecture decides whether your inference fleet is a strategic asset or a cost center that nobody can explain.',
    content: [
      'Inference at scale is a capacity and scheduling problem dressed up as an AI problem. Model choice matters, but so do batching, quantization, GPU packing, and the path from request to kernel.',
      'I start with workload classes: interactive latency-sensitive traffic, batch embedding jobs, and offline evaluation. Mixing them on the same GPU pool without isolation is how you get p99 spikes that nobody can debug. Separate queues or node pools, clear autoscaling signals, and admission control beat clever hacks.',
      'NVIDIA Triton (or equivalent serving stacks) shines when you need multi-model serving, dynamic batching, and consistent metrics. Pair it with model registries so every deployed artifact is versioned, signed, and roll-backable. Hot models should not be anonymous binaries on a node.',
      'On cloud, GPU SKUs and quotas are first-class architecture constraints. Design for burst capacity, fallback regions, and graceful degradation when accelerators are unavailable. CPU fallback for non-critical paths can save an incident.',
      'Cost governance belongs in the platform. Per-team GPU hours, idle detection, right-sizing reports, and policies that stop zombie notebooks from holding A100s overnight. Finance will ask — better to answer with dashboards than folklore.',
      'If you get this right, NVIDIA capacity becomes a productized platform capability: request GPUs like you request a database, with SLOs, security baselines, and a clear owner.',
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
