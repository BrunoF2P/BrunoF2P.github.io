/**
 * Dados globais do site: identidade, contatos e links.
 * Fonte única de verdade — edite aqui para refletir em todo o portfólio.
 */

export const site = {
  name: 'Bruno Bispo',
  fullName: 'Bruno Bispo dos Santos',
  handle: 'BrunoF2P',
  email: 'brunobispo.saints@gmail.com',
  location: 'Alagoinhas · Bahia · Brasil',
  city: 'Alagoinhas, Bahia',
  github: 'https://github.com/BrunoF2P',
  linkedin: 'https://www.linkedin.com/in/brunof2p',
  instagram: 'https://instagram.com/brunof2p',
  resume: '/bruno-bispo-cv.pdf',
  resumeEn: '/bruno-bispo-cv-en.pdf',
  university: 'Universidade do Estado da Bahia (UNEB)',
  course: 'Engenharia de Software',
} as const;

export type SocialKey = 'github' | 'linkedin' | 'instagram' | 'email';

export const socials: Array<{
  key: SocialKey;
  label: string;
  href: string;
  icon: string;
}> = [
  { key: 'github', label: 'GitHub', href: site.github, icon: 'simple-icons:github' },
  { key: 'linkedin', label: 'LinkedIn', href: site.linkedin, icon: 'simple-icons:linkedin' },
  { key: 'instagram', label: 'Instagram', href: site.instagram, icon: 'simple-icons:instagram' },
  { key: 'email', label: 'E-mail', href: `mailto:${site.email}`, icon: 'lucide:mail' },
];
