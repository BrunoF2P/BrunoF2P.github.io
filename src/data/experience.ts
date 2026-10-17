import type { Lang } from '../i18n/ui';

export type TimelineKind = 'education' | 'experience' | 'course' | 'milestone';

export type TimelineItem = {
  kind: TimelineKind;
  /** Chave de ordenação (ano/mês). */
  from: string;
  period: Record<Lang, string>;
  current?: boolean;
  title: Record<Lang, string>;
  org: Record<Lang, string>;
  desc: Record<Lang, string>;
  tags?: string[];
  href?: string;
};

export const timeline: TimelineItem[] = [
  {
    kind: 'education',
    from: '2023-03',
    period: { en: '2023 — Now', 'pt-br': '2023 — Atual' },
    current: true,
    title: { en: 'Software Engineering', 'pt-br': 'Engenharia de Software' },
    org: { en: 'State University of Bahia (UNEB) · Campus II', 'pt-br': 'Universidade do Estado da Bahia (UNEB) · Campus II' },
    desc: {
      en: 'Undergraduate degree focused on software architecture, systems, algorithms and data. Final project on compiler engineering.',
      'pt-br': 'Graduação com foco em arquitetura de software, sistemas, algoritmos e dados. Trabalho de conclusão na área de engenharia de compiladores.',
    },
    tags: ['UNEB', 'Campus II'],
  },
  {
    kind: 'milestone',
    from: '2026-09',
    period: { en: '2026 — Now', 'pt-br': '2026 — Atual' },
    current: true,
    title: {
      en: 'Thesis — Generational references',
      'pt-br': 'TCC — Referências geracionais',
    },
    org: { en: 'Compiler engineering research', 'pt-br': 'Pesquisa em engenharia de compiladores' },
    desc: {
      en: 'Experimental evaluation of generational references as an automatic fallback to strict rejection in ownership-based languages, measured on the Arandu compiler.',
      'pt-br': 'Avaliação experimental de referências geracionais como fallback automático à rejeição estrita em linguagens com posse, medida no compilador Arandu.',
    },
    tags: ['Rust', 'Compilers', 'Memory safety'],
  },
  {
    kind: 'milestone',
    from: '2026-01',
    period: { en: '2026', 'pt-br': '2026' },
    title: { en: 'Open source & product work', 'pt-br': 'Open source e produtos' },
    org: { en: 'Hycore · Nanquink · Apito · Moussee.me', 'pt-br': 'Hycore · Nanquink · Apito · Moussee.me' },
    desc: {
      en: 'A year of shipping: a lightweight game launcher with 10 stars, a local-first writing app, a Rust simulation engine and a Cloudflare-first platform.',
      'pt-br': 'Um ano entregando: um launcher leve com 10 estrelas, um app de escrita local-first, uma engine de simulação em Rust e uma plataforma Cloudflare-first.',
    },
    tags: ['Rust', 'Tauri', 'Cloudflare'],
  },
  {
    kind: 'experience',
    from: '2020-11',
    period: { en: '2020 — 2022', 'pt-br': '2020 — 2022' },
    title: { en: 'Administrative Assistant', 'pt-br': 'Auxiliar Administrativo' },
    org: { en: 'Atacadão Pinto', 'pt-br': 'Atacadão Pinto' },
    desc: {
      en: 'Product and supplier registration, pricing and management of merchandise budgets. Where I learned to be precise with data.',
      'pt-br': 'Cadastro de produtos e fornecedores, precificação e gestão de verbas de mercadoria. Onde aprendi a ser preciso com dados.',
    },
    tags: ['Data', 'Process'],
  },
  {
    kind: 'course',
    from: '2018-01',
    period: { en: '2018', 'pt-br': '2018' },
    title: { en: 'Administrative Assistant', 'pt-br': 'Auxiliar Administrativo' },
    org: { en: 'Concretta Escola da Construção', 'pt-br': 'Concretta Escola da Construção' },
    desc: {
      en: 'Professional course in administrative routines.',
      'pt-br': 'Curso profissionalizante de rotinas administrativas.',
    },
  },
  {
    kind: 'course',
    from: '2013-01',
    period: { en: '2013', 'pt-br': '2013' },
    title: { en: 'Professional Computing', 'pt-br': 'Informática Profissionalizante' },
    org: { en: 'Líder Cursos', 'pt-br': 'Líder Cursos' },
    desc: {
      en: 'My first contact with computing — the spark.',
      'pt-br': 'Meu primeiro contato com computação — a faísca inicial.',
    },
  },
];
