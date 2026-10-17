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
        'I write compilers, Rust and interfaces that are a pleasure to use. These days I am building the Arandu programming language (arandu-lang.dev) and studying Software Engineering at UNEB.',
      ctaProjects: 'See the work',
      ctaResume: 'Download resume',
      scroll: 'Scroll to explore',
      based: 'Based in',
    },
    marquee: ['Rust', 'Arandu', 'Tauri', 'React', 'TypeScript', 'Kotlin', 'Spring Boot', 'Java', 'Python', 'PostgreSQL', 'Docker', 'gRPC'],
    about: {
      kicker: 'About',
      title: 'Engineering with an obsession for detail',
      p1: 'Hi! I am Bruno Bispo, a software engineer from Bahia, Brazil, studying at UNEB. I am the creator of Arandu (arandu-lang.dev), a systems programming language with a native compiler built from scratch in Rust. My work centers on low-level engineering and tool design, spanning compiler architecture, memory safety analysis, and distributed systems at the edge.',
      p2: 'I have a clear obsession: building software that outclasses what is currently on the market. I aim for peak performance with minimal hardware footprint. I do not deal in temporary workarounds or quick patches. I focus on structured architecture, formal verification, and concurrency to polish every system until the user experience feels invisible and seamless.',
      p3: 'Outside the development workflow, I spend my time exploring emerging technical specifications, writing about compiler internals, and actively contributing to the open-source ecosystem.',
      stats: [
        { value: '20+', label: 'Projects Shipped' },
        { value: '6', label: 'Languages in Production' },
        { value: '2023', label: 'Undergraduate at UNEB' },
        { value: '10★', label: 'Open-Source Stars' },
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
      lead: 'A few things I have designed, engineered and shipped along the way — personal, academic and professional.',
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
      badge: 'Open',
      stats: {
        projects: 'projects',
        areas: 'areas',
        open: 'open source',
      },
      cta: {
        label: 'Keep exploring',
        title: 'Everything else lives on GitHub — free to read, fork and build on.',
        action: 'Browse my repositories',
      },
    },
    os: {
      kicker: 'Open source',
      title: 'Built in the open',
      lead: 'Part of my work lives in the open on GitHub — free to read, fork and build on.',
      stars: 'stars',
      license: 'MIT licensed',
      cta: 'Explore the GitHub',
    },
    contact: {
      kicker: 'Contact',
      title: "Let's build something worth shipping",
      lead: 'I am open to internships and junior roles, freelance work and collaborations. The fastest way to reach me is e-mail.',
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
        'Escrevo compiladores, código Rust e interfaces que dão gosto de usar. Hoje construo a linguagem de programação Arandu (arandu-lang.dev) e curso Engenharia de Software na UNEB.',
      ctaProjects: 'Ver o trabalho',
      ctaResume: 'Baixar currículo',
      scroll: 'Role para explorar',
      based: 'Baseado em',
    },
    marquee: ['Rust', 'Arandu', 'Tauri', 'React', 'TypeScript', 'Kotlin', 'Spring Boot', 'Java', 'Python', 'PostgreSQL', 'Docker', 'gRPC'],
    about: {
      kicker: 'Sobre',
      title: 'Engenharia com obsessão por detalhe',
      p1: 'Olá! Sou o Bruno Bispo, engenheiro de software baiano e estudante na UNEB. Sou o criador da Arandu (arandu-lang.dev), uma linguagem de programação com compilador nativo construído por mim em Rust. Minha atuação foca no desenvolvimento de baixo nível e no design de ferramentas, envolvendo engenharia de compiladores, análise de memória e sistemas distribuídos na borda.',
      p2: 'Tenho uma obsessão clara: criar softwares que superem o que já existe no mercado. Busco o teto do desempenho com o mínimo de consumo de hardware. Não trabalho com soluções temporárias ou gambiarras. Foco em arquitetura estruturada, verificação formal e concorrência para lapidar o sistema até que a experiência de uso seja invisível e fluida.',
      p3: 'Fora da rotina de desenvolvimento, divido meu tempo estudando novas especificações técnicas, escrevendo sobre compiladores e contribuindo ativamente com o ecossistema open source.',
      stats: [
        { value: '20+', label: 'Projetos Entregues' },
        { value: '6', label: 'Linguagens em Produção' },
        { value: '2023', label: 'Graduação na UNEB' },
        { value: '10★', label: 'Stars em Open Source' },
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
      lead: 'Algumas coisas que projetei, construí e entreguei pelo caminho — pessoais, acadêmicas e profissionais.',
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
      badge: 'Abrir',
      stats: {
        projects: 'projetos',
        areas: 'áreas',
        open: 'código aberto',
      },
      cta: {
        label: 'Continue explorando',
        title: 'O resto vive no GitHub — livre para ler, bifurcar e construir em cima.',
        action: 'Ver meus repositórios',
      },
    },
    os: {
      kicker: 'Código aberto',
      title: 'Construído a céu aberto',
      lead: 'Parte do meu trabalho vive aberta no GitHub — livre para ler, bifurcar e construir em cima.',
      stars: 'estrelas',
      license: 'Licença MIT',
      cta: 'Explorar o GitHub',
    },
    contact: {
      kicker: 'Contato',
      title: 'Vamos construir algo que valha a pena entregar',
      lead: 'Estou aberto a estágios e posições júnior, freelances e colaborações. O caminho mais rápido para falar comigo é o e-mail.',
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
