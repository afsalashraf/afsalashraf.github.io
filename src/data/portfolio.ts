export const profile = {
  name: 'Afsal Ashraf',
  title: 'AI Platform Architect',
  subtitle: 'Cloud Architect · Generative & Agentic AI',
  tagline:
    '14+ years architecting enterprise-scale Azure, GCP, and AI/ML platforms — from multi-cloud PaaS to production Agentic AI at global scale.',
  email: 'email@afsalashraf.com',
  phone: '+971 508 852 463',
  location: 'Abu Dhabi, UAE',
  website: 'https://www.afsalashraf.com',
  linkedin: 'https://www.linkedin.com/in/afsalva',
  toptal: 'https://www.toptal.com/developers/resume/afsal-ashraf#onxbvE',
  resume: '/resume.pdf',
  available: true,
}

export const splitHero = {
  left: {
    label: 'cloud architect',
    description:
      'Designing enterprise multi-cloud platforms, Kubernetes PaaS, Terraform IaC, and DevSecOps pipelines that scale to thousands of engineers.',
    accent: '#22d3ee',
    bg: 'linear-gradient(135deg, rgba(10,15,30,0.95) 0%, rgba(6,78,120,0.15) 100%)',
  },
  right: {
    label: 'ai platform engineer',
    description:
      'Building production Agentic AI, RAG, and MLOps on Microsoft Foundry, Azure OpenAI, and NVIDIA AI — from landing zones to inference at scale.',
    accent: '#a78bfa',
    bg: 'linear-gradient(225deg, rgba(10,15,30,0.95) 0%, rgba(76,29,149,0.15) 100%)',
  },
}

export const stats = [
  { value: '14+', label: 'Years Experience', icon: 'calendar' },
  { value: '15+', label: 'Enterprise AI Apps', icon: 'brain' },
  { value: '5', label: 'AI Use Cases Delivered', icon: 'rocket' },
  { value: '10K+', label: 'Vehicles Connected (IoT)', icon: 'car' },
  { value: 'Top 3%', label: 'Toptal Talent', icon: 'star' },
  { value: '$2M+', label: 'Cloud Cost Savings', icon: 'trending' },
]

export const about = [
  'Cloud Architect & AI Platform Engineer with 14+ years designing enterprise-scale Azure cloud, AI/ML, and cloud-native platforms across GCP and hybrid environments.',
  'Specialized in Generative AI, Agentic AI, RAG, MLOps, Kubernetes, Platform Engineering, and DevSecOps — with hands-on experience across Microsoft Foundry, Azure OpenAI, Azure ML, and the NVIDIA AI stack (Enterprise, NIM, NeMo, Triton).',
  'Currently leading enterprise Azure AI platform delivery at ADCB — establishing AI landing zones, governance frameworks, and production Agentic AI solutions for banking workloads across the UAE region.',
]

export const experience = [
  {
    id: 'adcb',
    company: 'Abu Dhabi Commercial Bank (ADCB)',
    role: 'AI Platform Lead / Cloud Architect',
    period: 'Jan 2026 – Present',
    location: 'Abu Dhabi, UAE',
    logo: 'adcb',
    color: '#ed1b24',
    shortName: 'ADCB',
    impact: ['5 production AI use cases', '15+ governed AI apps', 'UAE-regional AI inference'],
    summary:
      'Leading the architecture and delivery of ADCB\'s enterprise Azure AI platform — secure foundations for production AI across banking.',
    highlights: [
      'Led architecture and delivery of an enterprise Azure AI platform establishing secure, scalable foundations for production AI workloads.',
      'Architected AI Landing Zone using Azure Citadel with standardized cloud foundations, security controls, networking, and governance.',
      'Designed AI inference across the UAE region integrating Core42 Compass and Azure OpenAI for regional deployment requirements.',
      'Architected AI solutions using Microsoft Foundry — Agentic AI and RAG workflows with GPT and open-source models.',
      'Designed and implemented Azure AI Gateway as centralized integration layer for enterprise model consumption.',
      'Delivered 5 enterprise AI use cases translating business requirements into production-ready solutions.',
      'Developed reusable Terraform modules for banking workloads, standardizing Azure service deployment.',
      'Implemented DevSecOps pipelines with GitHub Actions for secure, automated deployments.',
      'Established AI governance framework for data privacy, model bias, and ethical AI across 15+ applications.',
      'Built centralized Azure AI Gateway for secure, policy-driven model access across enterprise banking teams.',
      'Partnered with Core42 Compass to deliver sovereign AI inference aligned with UAE data residency requirements.',
    ],
    tags: ['Azure AI', 'Microsoft Foundry', 'Agentic AI', 'RAG', 'Terraform', 'Azure Citadel'],
  },
  {
    id: 'walmart',
    company: 'Walmart Inc',
    role: 'SDE 4 — Cloud & AI Platform Engineering',
    period: 'Sep 2020 – Dec 2025',
    location: 'Bengaluru, India',
    logo: 'walmart',
    color: '#007DC3',
    shortName: 'Walmart',
    impact: ['Multi-cloud PaaS at global scale', 'GPU infra for ML teams', 'Terraform AzureRM contributor'],
    summary:
      'Architected enterprise-scale multi-cloud PaaS serving thousands of internal developers — integrating Generative AI and GPU infrastructure at Walmart scale.',
    highlights: [
      'Architected multi-cloud platform engineering across GCP, Azure, and private cloud using GKE, AKS, and OpenShift.',
      'Designed multi-cloud PaaS enabling engineering teams to consume standardized cloud services via self-service patterns.',
      'Transformed cloud services into self-service PaaS using Electrode Framework — improving developer productivity globally.',
      'Standardized IaC with Terraform and Concord; contributed to the Terraform AzureRM Provider.',
      'Integrated Generative AI and Agentic AI into cloud platforms for AI-driven automation and workflows.',
      'Built multi-tenant GPU infrastructure with Kubernetes and NVIDIA AI Enterprise for global ML teams.',
      'Developed cloud-native AI patterns with NIM, Triton Inference Server, TensorRT-LLM, and GPU Operator.',
      'Enhanced platform security with DevSecOps practices and automated security scanning in CI/CD pipelines.',
      'Enabled self-service cloud consumption for thousands of engineers via standardized platform abstractions.',
      'Delivered $2M+ in cloud cost optimization through architecture reviews and FinOps-driven platform design.',
    ],
    tags: ['Kubernetes', 'NVIDIA AI', 'Terraform', 'PaaS', 'GKE', 'AKS'],
  },
  {
    id: 'techm',
    company: 'Tech Mahindra',
    role: 'Sr Azure Consultant',
    period: 'Nov 2018 – Aug 2020',
    location: 'Bengaluru, India',
    logo: 'techm',
    color: '#e31837',
    shortName: 'Tech Mahindra',
    impact: ['10K+ connected vehicles', 'Autonomous vehicle telemetry', 'Hybrid Azure + GCP MLOps'],
    summary:
      'Led Azure DevOps and hybrid cloud architectures for automotive engineering — connected vehicles, MLOps, and IoT at scale.',
    highlights: [
      'Led enterprise CI/CD and DevOps platforms using Azure DevOps for automotive engineering and MLOps lifecycle.',
      'Designed hybrid multi-cloud architectures across Azure and GCP for connected and autonomous vehicle workloads.',
      'Built GCP integration patterns with GKE, Cloud Storage, Pub/Sub, BigQuery, and Dataflow for vehicle telemetry.',
      'Supported autonomous vehicle initiatives for ZF TRW with real-time telemetry and ML-driven insights.',
      'Integrated PTC ThingWorx with Azure IoT Hub — real-time telemetry from 10,000+ vehicles.',
      'Engineered scalable MLOps workflows integrating cloud ML pipelines with real-time telemetry processing.',
      'Designed event-driven data pipelines with Pub/Sub and Dataflow for high-volume vehicle telemetry ingestion.',
      'Built CI/CD foundations for automotive engineering teams supporting continuous delivery of ML models.',
    ],
    tags: ['Azure DevOps', 'MLOps', 'IoT', 'GCP', 'ThingWorx'],
  },
  {
    id: 'xerox',
    company: 'Xerox Corp Inc',
    role: 'Sr Development Support Engineer',
    period: 'Aug 2015 – Nov 2018',
    location: 'Cochin, India',
    logo: 'xerox',
    color: '#d92228',
    shortName: 'Xerox',
    impact: ['Enterprise PLM at scale', 'Azure cloud migration', 'Legacy app modernization'],
    summary:
      'Enterprise PLM engineering and Azure cloud migration for Xerox printer product development at global scale.',
    highlights: [
      'Supported Siemens Teamcenter PLM for Xerox printer engineering — BOM, EBOM, revisions, and lifecycle workflows.',
      'Customized Teamcenter with BMIDE and C++ — business rules, data models, and PLM extensions.',
      'Led enterprise migration to Microsoft Azure with VMware-to-Azure transitions.',
      'Modernized legacy apps through containerization and cloud-native rearchitecture to Azure ASE.',
      'Developed custom Teamcenter reports and dashboards for engineering data access.',
      'Automated BOM and revision workflows reducing manual engineering data errors across product lines.',
      'Led VMware-to-Azure migration strategy for critical printer engineering workloads.',
    ],
    tags: ['Teamcenter', 'Azure', 'PLM', 'C++', 'BMIDE'],
  },
  {
    id: 'syntel',
    company: 'Syntel Ltd (Atos Syntel)',
    role: 'Systems Engineer',
    period: 'Jun 2012 – Aug 2015',
    location: 'Pune, India',
    logo: 'syntel',
    color: '#0596FF',
    shortName: 'Atos Syntel',
    impact: ['Insurance enterprise apps', 'Full SDLC delivery', 'Production IIS operations'],
    summary:
      'Full-stack .NET enterprise development and production support for insurance industry applications.',
    highlights: [
      'Developed enterprise ASP.NET/.NET applications across full SDLC for insurance workloads.',
      'Built and maintained IIS-hosted applications — availability, performance, and production support.',
      'Production troubleshooting, root-cause analysis, and Agile delivery with TFS and GitHub.',
      'Optimized IIS configurations and application pool settings for critical insurance apps.',
      'Delivered ASP.NET features end-to-end — requirements, development, testing, and production rollout.',
      'Supported 24/7 production operations with incident response and performance tuning for core systems.',
    ],
    tags: ['.NET', 'IIS', 'Agile', 'TFS', 'ASP.NET'],
  },
]

export const skillGroups = [
  {
    title: 'Cloud & AI Platforms',
    icon: 'cloud',
    skills: ['Microsoft Azure', 'Azure Citadel', 'Microsoft Foundry', 'Azure OpenAI', 'GCP / Vertex AI', 'AWS', 'Core42 Compass'],
  },
  {
    title: 'AI / Generative AI',
    icon: 'brain',
    skills: ['Agentic AI', 'RAG', 'MLOps', 'Model Serving', 'NVIDIA AI Enterprise', 'NIM / NeMo / Triton', 'TensorRT-LLM'],
  },
  {
    title: 'Platform Engineering',
    icon: 'layers',
    skills: ['Kubernetes', 'AKS / GKE / OpenShift', 'Docker', 'Terraform', 'Helm', 'Platform Engineering', 'IaC'],
  },
  {
    title: 'DevOps & Automation',
    icon: 'git',
    skills: ['GitHub Actions', 'Azure DevOps', 'DevSecOps', 'PowerShell', 'Python', 'Go', 'Concord'],
  },
  {
    title: 'Data & Observability',
    icon: 'chart',
    skills: ['BigQuery', 'Dataflow', 'Azure IoT Hub', 'Prometheus', 'Grafana', 'Log Analytics'],
  },
]

export const certifications = [
  {
    id: 'claude',
    name: 'Claude Certified Architect',
    issuer: 'Anthropic',
    year: '2025',
    color: '#d97757',
    logo: 'anthropic',
  },
  {
    id: 'azure-arch',
    name: 'Azure Solutions Architect Expert',
    issuer: 'Microsoft',
    year: '2022',
    color: '#0078d4',
    logo: 'microsoft',
  },
  {
    id: 'gcp',
    name: 'Professional Cloud Architect',
    issuer: 'Google Cloud',
    year: '2023',
    color: '#4285f4',
    logo: 'google',
  },
  {
    id: 'azure-devops',
    name: 'DevOps Engineer Expert',
    issuer: 'Microsoft',
    year: '2022',
    color: '#0078d4',
    logo: 'microsoft',
  },
]

export const floatingTech = [
  { id: 'azure', label: 'Azure', logo: 'azure', size: 48 },
  { id: 'gcp', label: 'GCP', logo: 'google', size: 44 },
  { id: 'k8s', label: 'Kubernetes', logo: 'kubernetes', size: 46 },
  { id: 'terraform', label: 'Terraform', logo: 'terraform', size: 42 },
  { id: 'nvidia', label: 'NVIDIA', logo: 'nvidia', size: 44 },
  { id: 'openai', label: 'OpenAI', logo: 'openai', size: 40 },
  { id: 'github', label: 'GitHub', logo: 'github', size: 40 },
  { id: 'docker', label: 'Docker', logo: 'docker', size: 42 },
  { id: 'python', label: 'Python', logo: 'python', size: 38 },
  { id: 'foundry', label: 'Foundry', logo: 'microsoft', size: 40 },
]

export const education = [
  {
    degree: 'Masters in Information Technology',
    school: 'Sikkim Manipal University',
    logo: 'smu',
    shortName: 'SMU',
  },
  {
    degree: 'Bachelors of Computer Applications',
    school: 'University of Calicut',
    logo: 'calicut',
    shortName: 'Calicut',
  },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certs' },
  { href: '#contact', label: 'Contact' },
]
