import type { Lang } from '../i18n/ui';

export type TimelineKind = 'education' | 'experience' | 'course' | 'milestone';

export type Responsibility = {
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
};

export type TimelineItem = {
  kind: TimelineKind;
  /** Chave de ordenação (ano/mês). */
  from: string;
  period: Record<Lang, string>;
  current?: boolean;
  title: Record<Lang, string>;
  org: Record<Lang, string>;
  location?: Record<Lang, string>;
  employmentType?: Record<Lang, string>;
  desc: Record<Lang, string>;
  responsibilities?: Responsibility[];
  tags?: string[];
  href?: string;
};

export const timeline: TimelineItem[] = [
  {
    kind: 'education',
    from: '2023-03',
    period: { en: '2023 — Present', 'pt-br': '2023 — Atual' },
    current: true,
    title: { en: 'Bachelor of Software Engineering', 'pt-br': 'Bacharelado em Engenharia de Software' },
    org: { en: 'State University of Bahia (UNEB) · Campus II', 'pt-br': 'Universidade do Estado da Bahia (UNEB) · Campus II' },
    location: { en: 'Alagoinhas, Bahia, Brazil', 'pt-br': 'Alagoinhas, Bahia, Brasil' },
    desc: {
      en: 'Undergraduate degree focused on software architecture, systems, algorithms and data structures. Final thesis research in compiler engineering and memory safety models.',
      'pt-br': 'Graduação com foco em arquitetura de software, engenharia de sistemas, algoritmos e estruturas de dados. Trabalho de conclusão na área de engenharia de compiladores e modelos de segurança de memória.',
    },
    responsibilities: [
      {
        title: { en: 'Systems & Compilers Research', 'pt-br': 'Pesquisa em Compiladores e Sistemas' },
        desc: {
          en: 'In-depth study of formal grammars, intermediate representations (IR), escape analysis and memory ownership semantics.',
          'pt-br': 'Estudo aprofundado de gramáticas formais, representações intermediárias (IR), análise de escape e semântica de posse em memória.',
        },
      },
      {
        title: { en: 'Software Architecture & Data Structures', 'pt-br': 'Arquitetura de Software e Estruturas de Dados' },
        desc: {
          en: 'Practical implementation of distributed backends, algorithmic optimization, concurrent programming and design patterns.',
          'pt-br': 'Implementação prática de serviços distribuídos, otimização algorítmica, programação concorrente e padrões arquiteturais.',
        },
      },
    ],
    tags: ['UNEB', 'Campus II', 'Software Architecture', 'Compilers'],
  },
  {
    kind: 'milestone',
    from: '2026-09',
    period: { en: '2026 — Present', 'pt-br': '2026 — Atual' },
    current: true,
    title: {
      en: 'Undergraduate Thesis — Generational References in Compilers',
      'pt-br': 'TCC — Referências Geracionais em Compiladores',
    },
    org: { en: 'Compiler Engineering Research', 'pt-br': 'Pesquisa em Engenharia de Compiladores' },
    location: { en: 'UNEB · Academic Research', 'pt-br': 'UNEB · Pesquisa Acadêmica' },
    desc: {
      en: 'Experimental evaluation of generational references as an automatic fallback when escape analysis cannot prove lifetime at compile time, benchmarked on the Arandu compiler.',
      'pt-br': 'Avaliação experimental de referências geracionais como mecanismo de fallback automático quando a análise de escape não consegue provar o tempo de vida em compilação, avaliada no compilador Arandu.',
    },
    responsibilities: [
      {
        title: { en: 'Memory Model Design', 'pt-br': 'Projeto de Modelo de Memória' },
        desc: {
          en: 'Formulated a decision tree bridging static ownership verification and runtime safety through generation-indexed slot handles in O(1).',
          'pt-br': 'Formulação de árvore de decisão integrando verificação estática de posse e segurança em tempo de execução via handles de slot indexados por geração em O(1).',
        },
      },
      {
        title: { en: 'Empirical Benchmarking', 'pt-br': 'Benchmarks Empíricos' },
        desc: {
          en: 'Constructed comprehensive automated suites measuring acceptance rate, execution latency and heap overhead compared to standard Rust and C implementations.',
          'pt-br': 'Construção de suítes automatizadas medindo taxa de aceitação, latência de execução e sobrecarga de heap em comparação direta com implementações em Rust e C.',
        },
      },
    ],
    tags: ['Rust', 'Compilers', 'Memory Safety', 'Static Analysis'],
  },
  {
    kind: 'milestone',
    from: '2026-01',
    period: { en: '2026 — Present', 'pt-br': '2026 — Atual' },
    title: { en: 'Systems & Product Engineering', 'pt-br': 'Engenharia de Sistemas e Produtos' },
    org: { en: 'Independent Software Engineering', 'pt-br': 'Engenharia de Software Independente' },
    location: { en: 'Open Source & Remote', 'pt-br': 'Open Source e Remoto' },
    desc: {
      en: 'Architecture and delivery of production-grade systems: high-performance desktop applications in Tauri/Rust, scalable edge platforms on Cloudflare, and deterministic simulation engines.',
      'pt-br': 'Arquitetura e entrega de sistemas de produção: aplicações desktop de alta performance em Tauri/Rust, plataformas escaláveis na borda com Cloudflare e engines determinísticas de simulação.',
    },
    responsibilities: [
      {
        title: { en: 'Desktop & Tooling Delivery', 'pt-br': 'Aplicações Desktop e Ferramentas' },
        desc: {
          en: 'Built Imglyze (sub-millisecond parallel batch image processor) and HyCore Launcher (lightweight game client under 10 MB).',
          'pt-br': 'Criação do Imglyze (otimizador e conversor paralelo de imagens desktop) e do HyCore Launcher (cliente modular e ultraleve abaixo de 10 MB).',
        },
      },
      {
        title: { en: 'Cloud & Edge Infrastructure', 'pt-br': 'Infraestrutura de Nuvem e Borda' },
        desc: {
          en: 'Designed Moussee.me with Cloudflare Workers edge routing, D1/R2 storage, custom domain decoupling and sub-100ms response targets.',
          'pt-br': 'Arquitetura da plataforma Moussee.me utilizando Cloudflare Workers na borda, banco D1, storage R2 e tempo de resposta abaixo de 100ms.',
        },
      },
    ],
    tags: ['Rust', 'Tauri', 'Cloudflare Workers', 'TypeScript', 'Go'],
  },
  {
    kind: 'experience',
    from: '2020-11',
    period: { en: 'Nov 2020 — Aug 2022 · 1 yr 10 mos', 'pt-br': 'Nov de 2020 — Ago de 2022 · 1 ano 10 meses' },
    title: { en: 'Administrative Assistant', 'pt-br': 'Assistente Administrativo' },
    org: { en: 'Atacadão Pinto', 'pt-br': 'Atacadão Pinto' },
    location: { en: 'Alagoinhas, Bahia, Brazil · On-site', 'pt-br': 'Alagoinhas, Bahia, Brasil · Presencial' },
    employmentType: { en: 'Full-time', 'pt-br': 'Tempo integral' },
    desc: {
      en: 'Operational and commercial management responsible for database product catalog accuracy, market-driven dynamic pricing, inventory expiration risk mitigation, and promotional budget allocation.',
      'pt-br': 'Atuação administrativa e operacional responsável pela integridade cadastral de produtos no banco corporativo, precificação dinâmica e estratégica orientada a mercado, mitigação de perdas por validade e alocação de verbas promocionais.',
    },
    responsibilities: [
      {
        title: {
          en: 'Product Catalog & Database Integrity',
          'pt-br': 'Cadastro de Produtos e Entrada de Dados',
        },
        desc: {
          en: 'Managed precise data entry and ongoing updates of technical product details within the company database, ensuring 100% inventory accuracy and business continuity.',
          'pt-br': 'Gerenciei a inserção e atualização precisa das informações detalhadas de produtos no banco de dados da empresa, garantindo a acuracidade do inventário e a integridade dos dados para operações contínuas.',
        },
      },
      {
        title: {
          en: 'Pricing Optimization & Competitive Analysis',
          'pt-br': 'Otimização de Preços e Análise de Mercado',
        },
        desc: {
          en: 'Executed price adjustments and strategic pricing decisions based on market trends, competitive benchmarks, and internal fiscal policies, safeguarding competitiveness and profit margins.',
          'pt-br': 'Realizei ajustes de preços e decisões estratégicas de precificação com base em tendências de mercado, análise da concorrência e políticas internas da empresa, assegurando competitividade e margens de lucro.',
        },
      },
      {
        title: {
          en: 'Inventory Expiration & Cost Control',
          'pt-br': 'Monitoramento de Preços e Datas de Validade',
        },
        desc: {
          en: 'Monitored stock turnover, price variations, and expiration schedules across thousands of SKUs to minimize financial write-offs and enforce regulatory compliance standards.',
          'pt-br': 'Acompanhei preços e prazos de validade dos produtos para minimizar perdas financeiras, garantir conformidade de qualidade e atender aos padrões regulatórios.',
        },
      },
      {
        title: {
          en: 'Promotional Budget Allocation & ROI',
          'pt-br': 'Gestão de Orçamento Promocional',
        },
        desc: {
          en: 'Planned and allocated budgetary resources for discount campaigns and supplier promotions, optimizing cost efficiency and evaluating ROI to maximize volume and net margins.',
          'pt-br': 'Planejei e aloquei orçamentos para campanhas promocionais e descontos, otimizando a utilização de recursos e analisando ROI para maximizar desempenho de vendas e lucratividade.',
        },
      },
    ],
    tags: ['Database Management', 'Data Accuracy', 'Pricing Strategy', 'Inventory Auditing', 'ROI Analysis'],
  },
  {
    kind: 'course',
    from: '2018-01',
    period: { en: '2018', 'pt-br': '2018' },
    title: { en: 'Administrative Routines Professional Certificate', 'pt-br': 'Auxiliar Administrativo Profissionalizante' },
    org: { en: 'Concretta Escola da Construção', 'pt-br': 'Concretta Escola da Construção' },
    location: { en: 'Alagoinhas, Bahia', 'pt-br': 'Alagoinhas, Bahia' },
    desc: {
      en: 'Professional qualification in business processes, commercial documentation, resource planning and administrative workflows.',
      'pt-br': 'Formação profissionalizante em rotinas empresariais, documentação comercial, planejamento de recursos e processos administrativos.',
    },
  },
  {
    kind: 'course',
    from: '2013-01',
    period: { en: '2013', 'pt-br': '2013' },
    title: { en: 'Professional Computing & Systems Foundations', 'pt-br': 'Informática Profissionalizante e Fundamentos' },
    org: { en: 'Líder Cursos', 'pt-br': 'Líder Cursos' },
    location: { en: 'Alagoinhas, Bahia', 'pt-br': 'Alagoinhas, Bahia' },
    desc: {
      en: 'Comprehensive foundation in computing systems, operational workflows and early programming curiosity that sparked my career path.',
      'pt-br': 'Primeiro contato aprofundado com sistemas computacionais, fluxo operacional e lógica fundamental que despertou a vocação para engenharia.',
    },
  },
];
