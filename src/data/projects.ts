import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

import imglyzeApp from '../assets/projects/imglyze/app.png';
import imglyzeComparison from '../assets/projects/imglyze/comparison.png';
import hycoreShot from '../assets/projects/hycore/img_1.png';
import quijavaMenu from '../assets/projects/quijava/menu.png';
import quijavaGame from '../assets/projects/quijava/jogo.png';
import aranduChart from '../assets/projects/arandu/chart.png';
import aranduMeme from '../assets/projects/arandu/meme.jpg';
import rStats from '../assets/projects/rprojetos/estatisticas.png';
import rCauses from '../assets/projects/rprojetos/causas.png';

export type Category = 'desktop' | 'web' | 'systems' | 'data' | 'games' | 'research';
export type Access = 'open' | 'private' | 'research';
export type LinkType = 'code' | 'live' | 'case';

export type ProjectLink = {
  type: LinkType;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  category: Category;
  year: string;
  access: Access;
  featured?: boolean;
  accent: [string, string];
  tagline: Record<Lang, string>;
  summary: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  stack: string[];
  cover?: ImageMetadata;
  gallery?: ImageMetadata[];
  links?: ProjectLink[];
};

export const categories: Category[] = ['desktop', 'web', 'systems', 'data', 'games', 'research'];

export const projects: Project[] = [
  {
    id: 'imglyze',
    title: 'Imglyze',
    category: 'desktop',
    year: '2026',
    access: 'open',
    featured: true,
    accent: ['#0a84ff', '#64d2ff'],
    tagline: {
      en: 'Your images, lighter.',
      'pt-br': 'Suas imagens, com menos peso.',
    },
    summary: {
      en: 'A local desktop app to optimize, convert and resize images in batch — with before/after comparison and processing that never leaves your machine.',
      'pt-br': 'Aplicativo desktop local para otimizar, converter e redimensionar imagens em lote — com comparação antes/depois e processamento que não sai da sua máquina.',
    },
    highlights: {
      en: [
        'Parallel batch compression with per-format quality targets',
        'Import JPEG, PNG, WebP, BMP, AVIF — export the same set, plus rasterized SVG',
        'Reusable named presets and a virtualized queue for huge batches',
        'Light/dark themes, Portuguese and English, keyboard-first dialogs',
      ],
      'pt-br': [
        'Compressão em lote paralela com qualidade configurável por formato',
        'Importa JPEG, PNG, WebP, BMP e AVIF — exporta o mesmo conjunto e SVG rasterizado',
        'Presets nomeados reutilizáveis e fila virtualizada para lotes enormes',
        'Temas claro/escuro, português e inglês, diálogos navegáveis por teclado',
      ],
    },
    stack: ['Rust', 'Tauri 2', 'React', 'TypeScript'],
    cover: imglyzeApp,
    gallery: [imglyzeComparison],
    links: [{ type: 'code', href: 'https://github.com/BrunoF2P/Imglyze' }],
  },
  {
    id: 'hycore',
    title: 'Hycore',
    category: 'desktop',
    year: '2026',
    access: 'open',
    featured: true,
    accent: ['#bf5af2', '#0a84ff'],
    tagline: {
      en: 'The launcher Hytale deserves.',
      'pt-br': 'O launcher que o Hytale merece.',
    },
    summary: {
      en: 'An open-source, ultralight game launcher built on Tauri instead of Electron — native Rust performance, mod management, isolated profiles and sub-10 MB builds.',
      'pt-br': 'Um launcher de jogos open source e ultraleve, feito em Tauri em vez de Electron — performance nativa em Rust, gestão de mods, perfis isolados e builds abaixo de 10 MB.',
    },
    highlights: {
      en: [
        'Rust + Tauri core: tiny binaries, low RAM, smooth on modest machines',
        'Mod install/remove/update and multi-version management',
        'Isolated profiles ("Vanilla", "Magic Mods", "PVP")',
        'Discord Rich Presence and four languages (EN, PT-BR, ES, RU)',
      ],
      'pt-br': [
        'Núcleo Rust + Tauri: binários minúsculos, pouca RAM, fluido em máquinas modestas',
        'Instalar, remover e atualizar mods, com gestão de múltiplas versões',
        'Perfis isolados ("Vanilla", "Magic Mods", "PVP")',
        'Discord Rich Presence e quatro idiomas (EN, PT-BR, ES, RU)',
      ],
    },
    stack: ['Rust', 'Tauri', 'React', 'Tailwind CSS'],
    cover: hycoreShot,
    links: [{ type: 'code', href: 'https://github.com/BrunoF2P/HyCore-Launcher' }],
  },
  {
    id: 'apito',
    title: 'Apito',
    category: 'systems',
    year: '2026',
    access: 'private',
    featured: true,
    accent: ['#32d74b', '#0a84ff'],
    tagline: {
      en: 'A football simulation engine, in Rust.',
      'pt-br': 'Uma engine de simulação de futebol, em Rust.',
    },
    summary: {
      en: 'A Football-Manager-style simulation engine in Rust that powers the Unity game "Manager\u2019s Legacy". Five acyclic layers, a gRPC/Protobuf protocol and 23 specified modules.',
      'pt-br': 'Engine de simulação estilo Football Manager em Rust que alimenta o jogo "Manager\u2019s Legacy", em Unity. Cinco camadas acíclicas, protocolo gRPC/Protobuf e 23 módulos especificados.',
    },
    highlights: {
      en: [
        'Rust engine with a strict five-layer acyclic architecture',
        'gRPC/Protobuf contract between engine and the Unity (URP 2D) client',
        '23 documented modules: scope, business rules, data schema, rollout',
        'New-game wizard, coach creation, licensing and roleplay flows',
      ],
      'pt-br': [
        'Engine em Rust com arquitetura estrita de cinco camadas acíclicas',
        'Contrato gRPC/Protobuf entre a engine e o cliente Unity (URP 2D)',
        '23 módulos documentados: escopo, regras de negócio, esquema de dados e plano',
        'Wizard de novo jogo, criação de treinador, licenciamento e fluxos de roleplay',
      ],
    },
    stack: ['Rust', 'gRPC', 'Protobuf', 'Unity', 'C#'],
  },
  {
    id: 'nanquink',
    title: 'Nanquink',
    category: 'desktop',
    year: '2026',
    access: 'private',
    featured: true,
    accent: ['#ff9f0a', '#ff375f'],
    tagline: {
      en: 'Write books, together. Offline first.',
      'pt-br': 'Escreva livros, junto. Offline primeiro.',
    },
    summary: {
      en: 'A book-writing app with local-first collaboration. It blends Scrivener\u2019s spatial organization, Google Docs\u2019 transparent sync and background intelligence — all offline and open (GPL-2.0).',
      'pt-br': 'Software de escrita de livros com colaboração local-first. Combina a organização espacial do Scrivener, a sincronização transparente do Google Docs e inteligência de fundo — tudo offline e aberto (GPL-2.0).',
    },
    highlights: {
      en: [
        'Local-first with CRDT (Loro) — the data lives on your disk, the cloud is a replica',
        'Narrative-oriented document model: scenes, chapters, story bibles',
        'Rust + Tauri 2 core, React 19 + Jotai + Tailwind v4 shell',
        'SQLite + FTS5 storage and a planned Axum/Tokio sync relay',
      ],
      'pt-br': [
        'Local-first com CRDT (Loro) — o dado mora no seu disco, a nuvem é réplica',
        'Modelo de documento pensado para narrativa: cenas, capítulos, fichas',
        'Núcleo Rust + Tauri 2, casca em React 19 + Jotai + Tailwind v4',
        'Persistência em SQLite + FTS5 e relay de sync planejado em Axum/Tokio',
      ],
    },
    stack: ['Rust', 'Tauri 2', 'React 19', 'TypeScript', 'Loro CRDT', 'SQLite'],
  },
  {
    id: 'quijava',
    title: 'QuiJava',
    category: 'desktop',
    year: '2025',
    access: 'open',
    featured: true,
    accent: ['#5e5ce6', '#bf5af2'],
    tagline: {
      en: 'A desktop quiz platform.',
      'pt-br': 'Uma plataforma desktop de quizzes.',
    },
    summary: {
      en: 'An interactive platform to create and play quizzes, with authentication, ranking and history — a Material Design 3 desktop client over a Spring Boot backend.',
      'pt-br': 'Plataforma interativa para criar e jogar quizzes, com autenticação, ranking e histórico — cliente desktop em Material Design 3 sobre backend Spring Boot.',
    },
    highlights: {
      en: [
        'Jetpack Compose Desktop UI with Material Design 3',
        'Spring Boot + Hibernate/JPA persistence and Koin dependency injection',
        'Quiz creation, live gameplay with animated timer, ranking and history',
        'Structured as a real product: auth, profiles, scoring',
      ],
      'pt-br': [
        'Interface em Jetpack Compose Desktop com Material Design 3',
        'Persistência Spring Boot + Hibernate/JPA e injeção com Koin',
        'Criação de quizzes, partida com timer animado, ranking e histórico',
        'Estruturado como produto real: autenticação, perfis e pontuação',
      ],
    },
    stack: ['Kotlin', 'Compose Desktop', 'Spring Boot', 'Hibernate', 'HSQLDB'],
    cover: quijavaMenu,
    gallery: [quijavaGame],
    links: [{ type: 'code', href: 'https://github.com/BrunoF2P/quijava' }],
  },
  {
    id: 'moussee',
    title: 'Moussee.me',
    category: 'web',
    year: '2026',
    access: 'private',
    featured: true,
    accent: ['#ff375f', '#ff9f0a'],
    tagline: {
      en: 'Identity and links for creators, at near-zero cost.',
      'pt-br': 'Identidade e links para criadores, a custo quase zero.',
    },
    summary: {
      en: 'A high-performance link-in-bio platform with a Cloudflare-first architecture and full domain decoupling — a monorepo spanning a SvelteKit studio and an edge gateway.',
      'pt-br': 'Plataforma link-in-bio de alto desempenho com arquitetura Cloudflare-first e desacoplamento total de domínio — monorepo com estúdio em SvelteKit e gateway de borda.',
    },
    highlights: {
      en: [
        'SvelteKit 5 admin panel with a WYSIWYG page editor',
        'Cloudflare Worker gateway for edge routing and custom domains',
        'Deterministic static renderer with critical CSS, plus a canonical theme catalog',
        'Zod data contracts, D1/R2 storage, CDN purge and analytics',
      ],
      'pt-br': [
        'Painel administrativo em SvelteKit 5 com editor WYSIWYG',
        'Gateway em Cloudflare Worker para roteamento de borda e domínios próprios',
        'Motor determinístico de renderização estática com CSS crítico e catálogo de temas',
        'Contratos de dados em Zod, armazenamento D1/R2, purge de CDN e analytics',
      ],
    },
    stack: ['SvelteKit', 'TypeScript', 'Cloudflare Workers', 'D1', 'R2', 'Zod'],
  },
  {
    id: 'urdimbre',
    title: 'Urdimbre',
    category: 'systems',
    year: '2026',
    access: 'private',
    accent: ['#64d2ff', '#5e5ce6'],
    tagline: {
      en: 'An authoritative multiplayer game backend.',
      'pt-br': 'Um backend autoritativo de jogo multiplayer.',
    },
    summary: {
      en: 'An authoritative monorepo for a card-driven multiplayer game: Unity client, shared Protobuf contracts, a Go platform API, a .NET authoritative match server and Rust tuning algorithms.',
      'pt-br': 'Monorepo autoritativo de um jogo multiplayer de cartas: cliente Unity, contratos Protobuf compartilhados, API de plataforma em Go, servidor autoritativo de partida em .NET e algoritmos de balanceamento em Rust.',
    },
    highlights: {
      en: [
        'Authoritative match state across .NET, Go and Rust services',
        'Shared Protobuf contract as the single source of truth',
        'Docker-backed private session allocator',
        'PostgreSQL migrations and a reproducible local Compose environment',
      ],
      'pt-br': [
        'Estado de partida autoritativo entre serviços .NET, Go e Rust',
        'Contrato Protobuf compartilhado como fonte única de verdade',
        'Alocador de sessões privado baseado em Docker',
        'Migrações PostgreSQL e ambiente local reproduzível via Compose',
      ],
    },
    stack: ['Go', '.NET', 'Rust', 'Unity', 'Protobuf', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'pncp',
    title: 'PNCP Caçador',
    category: 'data',
    year: '2026',
    access: 'private',
    accent: ['#ffd60a', '#ff9f0a'],
    tagline: {
      en: 'Hunting overpricing in public procurement.',
      'pt-br': 'Caçando sobrepreço em compras públicas.',
    },
    summary: {
      en: 'A tool that explores Brazil\u2019s public procurement portal and flags outliers, with a Next.js dashboard for suppliers, geospatial views and price anomalies over a Python data pipeline.',
      'pt-br': 'Ferramenta que explora o Portal Nacional de Contratações Públicas e sinaliza anomalias, com dashboard em Next.js para fornecedores, visão geográfica e outliers de preço sobre um pipeline de dados em Python.',
    },
    highlights: {
      en: [
        'Ingests and normalizes public procurement data',
        'Outlier and overpricing detection across items and suppliers',
        'Dashboard with supplier, flag and map views',
        'Python pipeline feeding a Next.js app',
      ],
      'pt-br': [
        'Ingere e normaliza dados de contratações públicas',
        'Detecção de outliers e sobrepreço por item e fornecedor',
        'Dashboard com visões de fornecedores, sinalizações e mapa',
        'Pipeline em Python alimentando uma aplicação Next.js',
      ],
    },
    stack: ['Next.js', 'Python', 'JavaScript'],
  },
  {
    id: 'tcc',
    title: 'Thesis — Generational References',
    category: 'research',
    year: '2026',
    access: 'research',
    accent: ['#5e5ce6', '#64d2ff'],
    tagline: {
      en: 'An alternative to strict rejection in ownership languages.',
      'pt-br': 'Uma alternativa à rejeição estrita em linguagens com posse.',
    },
    summary: {
      en: 'Compiler-engineering research evaluating generational references as an automatic fallback when an escape analysis cannot prove a lifetime at compile time — measured on the Arandu compiler.',
      'pt-br': 'Pesquisa em engenharia de compiladores avaliando referências geracionais como fallback automático quando a análise de escape não consegue provar um tempo de vida em compilação — medida no compilador Arandu.',
    },
    highlights: {
      en: [
        'Decision tree: native reference, static error, or generational fallback',
        'O(1) slot + generation handle that traps on stale access',
        'Measures acceptance rate, time/memory overhead and re-promotion rate',
        'Aimed at a peer-reviewed evaluation, not engineering docs',
      ],
      'pt-br': [
        'Árvore de decisão: referência nativa, erro estático ou fallback geracional',
        'Handle {slot, geração} em O(1) que dispara trap em acesso obsoleto',
        'Mede taxa de aceitação, overhead de tempo/memória e taxa de re-promoção',
        'Mira em avaliação revisada por pares, não em documentação de engenharia',
      ],
    },
    stack: ['Rust', 'Compilers', 'Arandu'],
  },
  {
    id: 'fluxblocks',
    title: 'FluxBlocks',
    category: 'games',
    year: '2025',
    access: 'open',
    accent: ['#ff2d55', '#bf5af2'],
    tagline: {
      en: 'Tetris, reimagined in Java.',
      'pt-br': 'Tetris, reimaginado em Java.',
    },
    summary: {
      en: 'A modern Tetris reinterpretation built with Java and FXGL — local multiplayer, T-Spins and combos, particle effects and a modular, interface-driven architecture.',
      'pt-br': 'Reimaginação moderna do Tetris feita em Java com FXGL — multiplayer local, T-Spins e combos, efeitos de partículas e arquitetura modular baseada em interfaces.',
    },
    highlights: {
      en: [
        'Faithful official Tetris rules with an advanced scoring system',
        'Local two-player split-screen mode',
        'Particles, animations and rich visual feedback',
        'Customizable keybinds and clean, extensible design patterns',
      ],
      'pt-br': [
        'Regras oficiais do Tetris com sistema de pontuação avançado',
        'Modo local para dois jogadores em tela dividida',
        'Partículas, animações e feedback visual rico',
        'Teclas customizáveis e padrões de projeto limpos e extensíveis',
      ],
    },
    stack: ['Java', 'FXGL', 'JavaFX', 'Gradle'],
    links: [{ type: 'code', href: 'https://github.com/BrunoF2P/FluxBlocks' }],
  },
  {
    id: 'cinematech',
    title: 'Cinema Tech API',
    category: 'web',
    year: '2024',
    access: 'open',
    accent: ['#64d2ff', '#0a84ff'],
    tagline: {
      en: 'A cinema REST API, with a live demo.',
      'pt-br': 'Uma API REST de cinema, com demo ao vivo.',
    },
    summary: {
      en: 'A RESTful API for managing movies, showtimes and ticket reservations, built with Node, Express and PostgreSQL via Prisma, with AI-assisted features and observability.',
      'pt-br': 'API RESTful para gerenciar filmes, sessões e reservas de ingressos, feita com Node, Express e PostgreSQL via Prisma, com recursos assistidos por IA e observabilidade.',
    },
    highlights: {
      en: [
        'Full CRUD for movies, sessions and reservations',
        'Prisma + PostgreSQL data layer with authentication',
        'Gemini integration and New Relic monitoring',
        'Documented with Swagger and deployed to Koyeb',
      ],
      'pt-br': [
        'CRUD completo de filmes, sessões e reservas',
        'Camada de dados em Prisma + PostgreSQL com autenticação',
        'Integração com Gemini e monitoramento New Relic',
        'Documentada com Swagger e publicada no Koyeb',
      ],
    },
    stack: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Swagger'],
    links: [
      { type: 'code', href: 'https://github.com/BrunoF2P/cinema-tech-api' },
      { type: 'live', href: 'https://roasted-haley-cinema-tech-02703ea5.koyeb.app/' },
    ],
  },
  {
    id: 'arandu',
    title: 'Arandu Fibonacci Benchmarks',
    category: 'research',
    year: '2026',
    access: 'open',
    accent: ['#bf5af2', '#ff375f'],
    tagline: {
      en: 'Rust, C and Arandu in the same ring.',
      'pt-br': 'Rust, C e Arandu no mesmo ringue.',
    },
    summary: {
      en: 'A benchmark suite that puts Rust, C (gcc/clang) and the Arandu compiler head-to-head on the exact same algorithms under maximum optimization — with an automated runner and a published article.',
      'pt-br': 'Suíte de benchmarks que coloca Rust, C (gcc/clang) e o compilador Arandu frente a frente nos mesmos algoritmos sob otimização máxima — com runner automatizado e artigo publicado.',
    },
    highlights: {
      en: [
        'Five scenarios: naive recursion, Binet, iterative DP, fast doubling, comptime',
        'Parity-checked results across every language and backend',
        'Reproducible runs with warmup and min/median reporting',
        'Companion article: "Lies, Damned Lies and Fibonacci Benchmarks"',
      ],
      'pt-br': [
        'Cinco cenários: recursão ingênua, Binet, DP iterativo, fast doubling, comptime',
        'Resultados com verificação de paridade entre linguagens e backends',
        'Execuções reproduzíveis com warmup e relatório de mínima/mediana',
        'Artigo companheiro: "Lies, Damned Lies and Fibonacci Benchmarks"',
      ],
    },
    stack: ['Python', 'Rust', 'C'],
    cover: aranduChart,
    gallery: [aranduMeme],
    links: [{ type: 'code', href: 'https://github.com/BrunoF2P/arandu-fibonacci-benchmarks' }],
  },
  {
    id: 'protonscope',
    title: 'ProtonScope',
    category: 'data',
    year: '2026',
    access: 'open',
    accent: ['#0a84ff', '#32d74b'],
    tagline: {
      en: 'Linux/Proton compatibility, analyzed.',
      'pt-br': 'Compatibilidade Linux/Proton sob análise.',
    },
    summary: {
      en: 'A Python toolkit that ingests ProtonDB compatibility reports and turns them into analyzable time series, documenting schema changes and historical quirks.',
      'pt-br': 'Toolkit em Python que ingere os relatórios de compatibilidade do ProtonDB e os transforma em séries temporais analisáveis, documentando mudanças de esquema e particularidades históricas.',
    },
    highlights: {
      en: [
        'Normalizes a heterogeneous, evolving JSON schema',
        'Documents historical breakpoints (e.g. the Feb/2022 changes)',
        'Bridges raw community reports and usable datasets',
      ],
      'pt-br': [
        'Normaliza um esquema JSON heterogêneo e em evolução',
        'Documenta pontos de quebra históricos (ex.: mudanças de fev/2022)',
        'Conecta relatórios brutos da comunidade a datasets utilizáveis',
      ],
    },
    stack: ['Python', 'Docker'],
    links: [{ type: 'code', href: 'https://github.com/BrunoF2P/ProtonScope' }],
  },
  {
    id: 'rprojetos',
    title: 'Accident Analysis',
    category: 'data',
    year: '2024',
    access: 'open',
    accent: ['#32d74b', '#ffd60a'],
    tagline: {
      en: 'Who dies on the roads, and why.',
      'pt-br': 'Quem morre nas estradas, e por quê.',
    },
    summary: {
      en: 'An exploratory data analysis of traffic accidents (2017\u20132023) in R: causes, injuries, weather conditions and the probability of a fatal outcome by time of day.',
      'pt-br': 'Análise exploratória de dados de acidentes de trânsito (2017\u20132023) em R: causas, lesões, condições meteorológicas e probabilidade de desfecho fatal por fase do dia.',
    },
    highlights: {
      en: [
        'Cleaning and modeling of multi-year accident data',
        'Visualizations for causes, injuries and weather',
        'Regression on the factors most tied to fatalities',
      ],
      'pt-br': [
        'Limpeza e modelagem de dados de acidentes de vários anos',
        'Visualizações de causas, lesões e clima',
        'Regressão sobre os fatores mais ligados a fatalidades',
      ],
    },
    stack: ['R'],
    cover: rStats,
    gallery: [rCauses],
    links: [{ type: 'code', href: 'https://github.com/BrunoF2P/r-projetos' }],
  },
];

/** Experimentos menores, exibidos numa faixa compacta. */
export const experiments: Array<{ title: string; note: Record<Lang, string>; href?: string }> = [
  { title: 'live-usb', note: { en: 'Nix flake for building a live USB', 'pt-br': 'Flake Nix para gerar um live USB' }, href: 'https://github.com/BrunoF2P/live-usb' },
  { title: 'arch-install', note: { en: 'Shell scripts to bootstrap Arch Linux', 'pt-br': 'Scripts shell para automatizar o Arch Linux' }, href: 'https://github.com/BrunoF2P/arch-install' },
  { title: 'calculadora-imc', note: { en: 'A tiny BMI calculator', 'pt-br': 'Uma calculadora de IMC' }, href: 'https://github.com/BrunoF2P/calculadora-imc' },
  { title: 'Laminar', note: { en: 'A Rust DSL, animation and asset framework', 'pt-br': 'Framework Rust com DSL, animação e assets' } },
  { title: 'Exile-Forge', note: { en: 'A Tauri + React knowledge tool', 'pt-br': 'Ferramenta de conhecimento em Tauri + React' } },
];

export const featuredProjects = projects.filter((p) => p.featured);
