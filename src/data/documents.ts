import aksNimLab from '../../Documents/aks-nim-llm-inference-on-azure.md?raw'
import azureAgentic from '../../Documents/azure-agentic-ai-platform.md?raw'
import multiCloudK8s from '../../Documents/multi-cloud-kubernetes-paas.md?raw'
import nvidiaInference from '../../Documents/nvidia-inference-at-scale.md?raw'
import nimVsStack from '../../Documents/nvidia-nim-vs-vllm-vs-triton-vs-tensorrt-llm.md?raw'

export type TechDocument = {
  slug: string
  title: string
  type: string
  audience: string
  updated: string
  tags: string[]
  summary: string
  file: string
  markdown: string
}

export const documents: TechDocument[] = [
  {
    slug: 'aks-nim-llm-inference-on-azure',
    title: 'Self-Host an LLM on AKS with NVIDIA GPU Operator and NIM',
    type: 'Hands-on lab',
    audience: 'Cloud / AI Platform Architects',
    updated: '2026-11-20',
    tags: ['Azure', 'AKS', 'NVIDIA', 'NIM', 'GPU'],
    summary:
      'End-to-end lab: AKS + GPU Operator + NVIDIA NIM + optional chat UI — scripts, manifests, and lessons from a real eastus run.',
    file: 'Documents/aks-nim-llm-inference-on-azure.md',
    markdown: aksNimLab,
  },
  {
    slug: 'nvidia-nim-vs-vllm-vs-triton-vs-tensorrt-llm',
    title: 'NVIDIA NIM vs vLLM vs Triton vs TensorRT-LLM',
    type: 'Deep-dive comparison',
    audience: 'Cloud / AI Platform Architects',
    updated: '2026-11-19',
    tags: ['NVIDIA', 'NIM', 'vLLM', 'Triton', 'TensorRT-LLM'],
    summary:
      'Architect guide to NIM, vLLM, Triton, and TensorRT-LLM — decision criteria, ops/SLOs, security, and when to choose each.',
    file: 'Documents/nvidia-nim-vs-vllm-vs-triton-vs-tensorrt-llm.md',
    markdown: nimVsStack,
  },
  {
    slug: 'azure-agentic-ai-platform',
    title: 'Azure Agentic AI Platform Reference',
    type: 'Architecture reference',
    audience: 'Platform / AI architects',
    updated: '2026-03-01',
    tags: ['Azure', 'Agentic AI', 'MLOps'],
    summary:
      'Production pattern for Agentic AI on Azure — landing zones, Foundry, tool governance, RAG, and operations.',
    file: 'Documents/azure-agentic-ai-platform.md',
    markdown: azureAgentic,
  },
  {
    slug: 'multi-cloud-kubernetes-paas',
    title: 'Multi-Cloud Kubernetes PaaS Reference',
    type: 'Platform playbook',
    audience: 'Cloud / platform engineering',
    updated: '2026-02-01',
    tags: ['Kubernetes', 'Azure', 'GCP'],
    summary:
      'Shared AKS and GKE PaaS patterns — GitOps, policy, golden paths, and observability across clouds.',
    file: 'Documents/multi-cloud-kubernetes-paas.md',
    markdown: multiCloudK8s,
  },
  {
    slug: 'nvidia-inference-at-scale',
    title: 'NVIDIA Inference at Enterprise Scale',
    type: 'Capacity & serving guide',
    audience: 'ML platform / SRE',
    updated: '2026-01-01',
    tags: ['NVIDIA', 'Inference', 'MLOps'],
    summary:
      'GPU capacity classes, Triton serving, and cost governance for high-throughput enterprise inference.',
    file: 'Documents/nvidia-inference-at-scale.md',
    markdown: nvidiaInference,
  },
]

export function getDocumentBySlug(slug: string): TechDocument | undefined {
  return documents.find((d) => d.slug === slug)
}
