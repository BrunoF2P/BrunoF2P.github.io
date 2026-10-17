export type StackGroupId = 'languages' | 'frontend' | 'backend' | 'desktop' | 'tools';

export type StackItem = {
  name: string;
  icon: string;
  hue: string;
};

export type StackGroup = {
  id: StackGroupId;
  span?: boolean;
  items: StackItem[];
};

export const stack: StackGroup[] = [
  {
    id: 'languages',
    span: true,
    items: [
      { name: 'Rust', icon: 'devicon:rust', hue: '#ff7a45' },
      { name: 'TypeScript', icon: 'devicon:typescript', hue: '#3178c6' },
      { name: 'JavaScript', icon: 'devicon:javascript', hue: '#f7df1e' },
      { name: 'Kotlin', icon: 'devicon:kotlin', hue: '#a97bff' },
      { name: 'Java', icon: 'devicon:java', hue: '#f89820' },
      { name: 'Python', icon: 'devicon:python', hue: '#ffd845' },
      { name: 'C', icon: 'devicon:c', hue: '#5e9bd8' },
      { name: 'C#', icon: 'devicon:csharp', hue: '#68217a' },
      { name: 'Dart', icon: 'devicon:dart', hue: '#00b4ab' },
      { name: 'R', icon: 'devicon:r', hue: '#276dc3' },
      { name: 'SQL', icon: 'devicon:azuresqldatabase', hue: '#e38c00' },
    ],
  },
  {
    id: 'frontend',
    items: [
      { name: 'React', icon: 'devicon:react', hue: '#61dafb' },
      { name: 'Svelte', icon: 'devicon:svelte', hue: '#ff3e00' },
      { name: 'Astro', icon: 'simple-icons:astro', hue: '#ff5d01' },
      { name: 'Tailwind', icon: 'devicon:tailwindcss', hue: '#38bdf8' },
      { name: 'Flutter', icon: 'devicon:flutter', hue: '#45d1fd' },
      { name: 'Compose', icon: 'devicon:jetpackcompose', hue: '#4285f4' },
      { name: 'HTML5', icon: 'devicon:html5', hue: '#e34f26' },
      { name: 'CSS3', icon: 'devicon:css3', hue: '#1572b6' },
    ],
  },
  {
    id: 'backend',
    items: [
      { name: 'Spring Boot', icon: 'devicon:spring', hue: '#6db33f' },
      { name: 'Node.js', icon: 'devicon:nodejs', hue: '#5fa04e' },
      { name: 'Express', icon: 'devicon:express', hue: '#f5f5f5' },
      { name: 'PostgreSQL', icon: 'devicon:postgresql', hue: '#4169e1' },
      { name: 'Prisma', icon: 'devicon:prisma', hue: '#5a67d8' },
      { name: 'SQLite', icon: 'devicon:sqlite', hue: '#7ec4de' },
      { name: 'Hibernate', icon: 'devicon:hibernate', hue: '#bcae79' },
      { name: 'gRPC', icon: 'devicon:grpc', hue: '#6ba0f5' },
      { name: '.NET', icon: 'devicon:dotnetcore', hue: '#7d4fd8' },
    ],
  },
  {
    id: 'desktop',
    items: [
      { name: 'Tauri', icon: 'devicon:tauri', hue: '#24c8db' },
      { name: 'Unity', icon: 'devicon:unity', hue: '#f5f5f5' },
      { name: 'JavaFX', icon: 'devicon:java', hue: '#f89820' },
      { name: 'FXGL', icon: 'devicon:java', hue: '#7ee787' },
      { name: 'Docker', icon: 'devicon:docker', hue: '#2496ed' },
      { name: 'Linux', icon: 'devicon:linux', hue: '#f6c445' },
      { name: 'Nix', icon: 'devicon:nixos', hue: '#7ebae4' },
    ],
  },
  {
    id: 'tools',
    items: [
      { name: 'Git', icon: 'devicon:git', hue: '#f05033' },
      { name: 'GitHub', icon: 'devicon:github', hue: '#f5f5f5' },
      { name: 'Cloudflare', icon: 'devicon:cloudflare', hue: '#f6821f' },
      { name: 'Vite', icon: 'devicon:vitejs', hue: '#9499ff' },
      { name: 'Gradle', icon: 'devicon:gradle', hue: '#4fc3f7' },
      { name: 'Neovim', icon: 'devicon:neovim', hue: '#57a143' },
    ],
  },
];
