export const languages = {
  en: 'English',
  'pt-br': 'Português',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}

/** Resolve o idioma a partir do pathname da URL. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (isLang(first)) return first;
  return defaultLang;
}

/** Prefixa um caminho com o idioma atual. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${clean === '/' ? '' : clean}`;
}

export const ui = {
  en: {
    nav: {
      about: 'About',
      work: 'Journey',
      stack: 'Stack',
      projects: 'Projects',
      contact: 'Contact',
      resume: 'Resume',
      menu: 'Menu',
      close: 'Close',
      theme: 'Toggle theme',
      language: 'Language',
    },
    hero: {
      role: 'Software Engineer',
      status: 'Open to opportunities',
      titleLines: ['I build', 'software that', 'feels alive.'],
      lead:
        'Software Engineering student at UNEB and craft-obsessed developer. I design and ship desktop apps, distributed backends and data tooling — from Rust engines to interfaces that move.',
      ctaProjects: 'See the work',
      ctaResume: 'Download resume',
      scroll: 'Scroll to explore',
      based: 'Based in',
    },
    marquee: ['Rust', 'Tauri', 'React', 'TypeScript', 'Kotlin', 'Spring Boot', 'Java', 'Python', 'PostgreSQL', 'Docker', 'gRPC', 'FXGL'],
    about: {
      kicker: 'About',
      title: 'Engineering with an obsession for detail',
      p1: 'I am Bruno Bispo, a Software Engineering student at UNEB (Campus II, Alagoinhas) and a developer who treats side projects like products. My focus is on real-time and systems software: high-performance Rust components, desktop apps with Tauri, and backends that stay predictable under load.',
      p2: 'I like problems that need architecture, not just code — local-first sync, authoritatively-served game state, compiler-level memory safety. When I am not shipping, I document, benchmark and refine the ergonomics of everything I touch.',
      p3: 'Away from the keyboard I explore new toolchains, write in public and contribute to open source.',
      stats: [
        { value: '20+', label: 'projects shipped' },
        { value: '6', label: 'languages in production' },
        { value: '2023', label: 'studying at UNEB' },
        { value: '10★', label: 'on an open-source launcher' },
      ],
    },
    journey: {
      kicker: 'Journey',
      title: 'Education, experience and the path so far',
      now: 'Now',
      education: 'Education',
      experience: 'Experience',
      courses: 'Courses',
    },
    stack: {
      kicker: 'Stack',
      title: 'The tools I reach for',
      note: 'Grouped by how I actually use them.',
      groups: {
        languages: 'Languages',
        frontend: 'Frontend & UI',
        backend: 'Backend & Data',
        desktop: 'Desktop & Systems',
        tools: 'Tools & Infra',
      },
    },
    projects: {
      kicker: 'Selected work',
      title: 'Projects',
      lead: 'A slice of what I have designed, engineered and shipped — personal, academic and professional.',
      filters: {
        all: 'All',
        desktop: 'Desktop',
        web: 'Web',
        systems: 'Systems',
        data: 'Data',
        games: 'Games',
        research: 'Research',
      },
      more: 'More experiments',
      openSource: 'Open source',
      private: 'Private product',
      research: 'Research',
      viewCode: 'Code',
      viewLive: 'Live',
      viewCase: 'Case study',
      hover: 'Hover to preview',
      year: 'Year',
      stack: 'Stack',
      close: 'Close',
      count: 'projects',
    },
    os: {
      kicker: 'Open source',
      title: 'Built in the open',
      lead: 'Some of my work lives publicly on GitHub — free to read, fork and learn from.',
      stars: 'stars',
      license: 'MIT licensed',
      cta: 'Explore the GitHub',
    },
    contact: {
      kicker: 'Contact',
      title: "Let's build something worth shipping",
      lead: 'Available for internships and junior roles, freelance work and collaborations. The fastest way to reach me is e-mail.',
      email: 'Copy e-mail',
      copied: 'Copied!',
      or: 'or find me on',
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Designed & built by Bruno Bispo with Astro, Motion and a lot of coffee.',
      backToTop: 'Back to top',
    },
    resumePage: {
      title: 'Resume',
      download: 'Download PDF',
      print: 'Print / Save as PDF',
      summary: 'Summary',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Selected projects',
      courses: 'Complementary courses',
      languages: 'Languages',
      contact: 'Contact',
      present: 'Present',
    },
  },

  'pt-br': {
    nav: {
      about: 'Sobre',
      work: 'Trajetória',
      stack: 'Stack',
      projects: 'Projetos',
      contact: 'Contato',
      resume: 'Currículo',
      menu: 'Menu',
      close: 'Fechar',
      theme: 'Alternar tema',
      language: 'Idioma',
    },
    hero: {
      role: 'Engenheiro de Software',
      status: 'Aberto a oportunidades',
      titleLines: ['Eu construo', 'software que', 'parece vivo.'],
      lead:
        'Estudante de Engenharia de Software na UNEB e desenvolvedor obcecado por detalhe. Projeto e entrego apps desktop, backends distribuídos e ferramentas de dados — de engines em Rust a interfaces que se movem.',
      ctaProjects: 'Ver o trabalho',
      ctaResume: 'Baixar currículo',
      scroll: 'Role para explorar',
      based: 'Baseado em',
    },
    marquee: ['Rust', 'Tauri', 'React', 'TypeScript', 'Kotlin', 'Spring Boot', 'Java', 'Python', 'PostgreSQL', 'Docker', 'gRPC', 'FXGL'],
    about: {
      kicker: 'Sobre',
      title: 'Engenharia com obsessão por detalhe',
      p1: 'Sou Bruno Bispo, estudante de Engenharia de Software na UNEB (Campus II, Alagoinhas) e desenvolvedor que trata projetos pessoais como produtos. Meu foco é software de sistemas e tempo real: componentes em Rust de alta performance, apps desktop com Tauri e backends que se mantêm previsíveis sob carga.',
      p2: 'Gosto de problemas que pedem arquitetura, não só código — sincronização local-first, estado de jogo autoritativo, segurança de memória no nível do compilador. Quando não estou entregando, documento, faço benchmarks e refino a ergonomia de tudo que toco.',
      p3: 'Longe do teclado, exploro novas stacks, escrevo em público e contribuo com código aberto.',
      stats: [
        { value: '20+', label: 'projetos entregues' },
        { value: '6', label: 'linguagens em produção' },
        { value: '2023', label: 'estudando na UNEB' },
        { value: '10★', label: 'num launcher open source' },
      ],
    },
    journey: {
      kicker: 'Trajetória',
      title: 'Formação, experiência e o caminho até aqui',
      now: 'Atual',
      education: 'Formação',
      experience: 'Experiência',
      courses: 'Cursos',
    },
    stack: {
      kicker: 'Stack',
      title: 'As ferramentas que eu escolho',
      note: 'Agrupadas pelo jeito que eu realmente uso.',
      groups: {
        languages: 'Linguagens',
        frontend: 'Frontend & UI',
        backend: 'Backend & Dados',
        desktop: 'Desktop & Sistemas',
        tools: 'Ferramentas & Infra',
      },
    },
    projects: {
      kicker: 'Trabalho selecionado',
      title: 'Projetos',
      lead: 'Uma fatia do que já projetei, construí e entreguei — pessoal, acadêmico e profissional.',
      filters: {
        all: 'Todos',
        desktop: 'Desktop',
        web: 'Web',
        systems: 'Sistemas',
        data: 'Dados',
        games: 'Jogos',
        research: 'Pesquisa',
      },
      more: 'Mais experimentos',
      openSource: 'Código aberto',
      private: 'Produto privado',
      research: 'Pesquisa',
      viewCode: 'Código',
      viewLive: 'Ao vivo',
      viewCase: 'Case study',
      hover: 'Passe o mouse para pré-visualizar',
      year: 'Ano',
      stack: 'Stack',
      close: 'Fechar',
      count: 'projetos',
    },
    os: {
      kicker: 'Código aberto',
      title: 'Construído a céu aberto',
      lead: 'Parte do meu trabalho vive publicamente no GitHub — livre para ler, bifurcar e aprender.',
      stars: 'estrelas',
      license: 'Licença MIT',
      cta: 'Explorar o GitHub',
    },
    contact: {
      kicker: 'Contato',
      title: 'Vamos construir algo que valha a pena entregar',
      lead: 'Disponível para estágio e posições júnior, freelances e colaborações. O jeito mais rápido de me achar é por e-mail.',
      email: 'Copiar e-mail',
      copied: 'Copiado!',
      or: 'ou me encontre em',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
      builtWith: 'Projetado e construído por Bruno Bispo com Astro, Motion e bastante café.',
      backToTop: 'Voltar ao topo',
    },
    resumePage: {
      title: 'Currículo',
      download: 'Baixar PDF',
      print: 'Imprimir / Salvar em PDF',
      summary: 'Resumo',
      experience: 'Experiência',
      education: 'Formação',
      skills: 'Habilidades',
      projects: 'Projetos selecionados',
      courses: 'Cursos complementares',
      languages: 'Idiomas',
      contact: 'Contato',
      present: 'Atual',
    },
  },
} as const;

export type UI = (typeof ui)[typeof defaultLang];
