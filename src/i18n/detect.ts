import { defaultLang, languages, type Lang } from './ui';

/**
 * Resolução de idioma isomórfica: roda no servidor (header Accept-Language) ou no
 * cliente (navigator.languages, que tem o mesmo formato de lista).
 */

/** Escolhe o idioma a partir do header Accept-Language do navegador. */
export function detectLanguage(header: string | null): Lang {
  if (!header) return defaultLang;

  const parsed = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.trim().toLowerCase(), q: q ? Number.parseFloat(q) : 1 };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  for (const entry of parsed) {
    if (entry.tag === 'pt-br' || entry.tag === 'pt' || entry.tag.startsWith('pt-')) return 'pt-br';
    if (entry.tag === 'en' || entry.tag.startsWith('en-')) return 'en';
  }
  return defaultLang;
}

/** Resolve o idioma: cookie explícito tem prioridade sobre a detecção automática. */
export function resolveLang(cookieValue: string | undefined, header: string | null): Lang {
  if (cookieValue && cookieValue in languages) return cookieValue as Lang;
  return detectLanguage(header);
}
