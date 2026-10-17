import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';

import imglyzeApp from '../assets/projects/imglyze/app.png';
import imglyzeComparison from '../assets/projects/imglyze/comparison.png';
import hycoreShot from '../assets/projects/hycore/img_1.png';
import quijavaMenu from '../assets/projects/quijava/menu.png';
import quijavaGame from '../assets/projects/quijava/jogo.png';
import aranduChart from '../assets/projects/arandu/chart.png';
import aranduMeme from '../assets/projects/arandu/meme.jpg';
import aranduHome from '../assets/projects/arandu/arandu-home.png';
import aranduPlayground from '../assets/projects/arandu/arandu-playground.png';
import thesisCover from '../assets/projects/arandu/thesis-cover.png';
import rStats from '../assets/projects/rprojetos/estatisticas.png';
import rCauses from '../assets/projects/rprojetos/causas.png';
import mousseeCover from '../assets/projects/moussee/app-cover.png';
import mousseeMenu from '../assets/projects/moussee/menu.png';
import mousseeStudio from '../assets/projects/moussee/studio.png';
import fluxblocksGame from '../assets/projects/fluxblocks/game.png';

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
    id: 'arandu-lang',
    title: 'Arandu',
    category: 'systems',
    year: '2026',
    access: 'open',
    featured: true,
    accent: ['#e65c00', '#ff8a3d'],
    tagline: {
      en: 'A modern ownership-based systems language.',
      'pt-br': 'Linguagem de sistemas simples, segura e nativa.',
    },
    summary: {
      en: 'I created the Arandu programming language and its native Rust compiler, built around static ownership verification, escape analysis and Cranelift code generation — with an in-browser WebAssembly playground and full documentation at arandu-lang.dev.',
      'pt-br': 'Criei a linguagem de programação Arandu e seu compilador nativo em Rust, construído sobre verificação estática de posse, análise de escape e geração de código via Cranelift — com playground interativo em WebAssembly e documentação completa em arandu-lang.dev.',
    },
    highlights: {
      en: [
        'Creator and author of the Arandu programming language and compiler in Rust',
        'Official platform with docs, specifications and in-browser WASM playground at arandu-lang.dev',
        'Static affine ownership semantics, escape analysis and memory safety guarantees',
        'Automated test suites and empirical performance benchmarks against C and Rust',
      ],
      'pt-br': [
        'Criador e mantenedor da linguagem de programação Arandu e compilador em Rust',
        'Plataforma oficial com documentação completa e playground interativo em arandu-lang.dev',
        'Verificação estática de posse (ownership), análise de escape e geração nativa via Cranelift',
        'Suíte de testes, diagnósticos detalhados e benchmarks empíricos com máxima paridade contra C e Rust',
      ],
    },
    stack: ['Rust', 'Compilers', 'Cranelift', 'WebAssembly', 'Astro', 'TypeScript'],
    cover: aranduHome,
    gallery: [aranduPlayground],
    links: [
      { type: 'live', href: 'https://arandu-lang.dev' },
      { type: 'code', href: 'https://github.com/BrunoF2P/Arandu-Lang' },
    ],
  },
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
    id: 'moussee',
    title: 'Moussee.me',
    category: 'web',
    year: '2026',
    access: 'open',
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
        'SvelteKit 5 admin panel with a visual WYSIWYG page editor',
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
    cover: mousseeCover,
    gallery: [mousseeMenu, mousseeStudio],
    links: [{ type: 'live', href: 'https://app.moussee.me/' }],
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
      en: 'My thesis research in compiler engineering: it evaluates generational references as an automatic fallback when escape analysis cannot prove a lifetime at compile time — measured directly on the Arandu compiler.',
      'pt-br': 'Minha pesquisa de TCC em engenharia de compiladores: avalia referências geracionais como fallback automático quando a análise de escape não consegue provar um tempo de vida em compilação — medida diretamente no compilador Arandu.',
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
    cover: thesisCover,
    gallery: [aranduChart],
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
    cover: fluxblocksGame,
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
      en: 'A RESTful API for managing movies, showtimes and ticket reservations, built with Node, Express and PostgreSQL via Prisma, featuring relational data modeling, OpenAPI docs and full observability.',
      'pt-br': 'API RESTful para gerenciar filmes, sessões e reservas de ingressos, feita com Node, Express e PostgreSQL via Prisma, com modelagem relacional de dados, especificação OpenAPI e observabilidade.',
    },
    highlights: {
      en: [
        'Full CRUD for movies, sessions and reservations with JWT auth',
        'Prisma + PostgreSQL data layer with foreign keys and cascade rules',
        'Application performance monitoring with New Relic telemetry',
        'Documented with Swagger/OpenAPI and deployed to Koyeb',
      ],
      'pt-br': [
        'CRUD completo de filmes, sessões e reservas com autenticação JWT',
        'Camada de dados em Prisma + PostgreSQL com chaves e integridade referencial',
        'Monitoramento de performance da aplicação com telemetria New Relic',
        'Documentada com Swagger/OpenAPI e publicada no Koyeb',
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
export const experiments: Array<{ title: string; note: Record<Lang, string>; href?: string }> = [];

export const featuredProjects = projects.filter((p) => p.featured);
