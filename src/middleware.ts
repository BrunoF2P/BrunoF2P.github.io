import { defineMiddleware } from 'astro:middleware';
import { resolveLang } from './i18n/detect';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname, search } = context.url;

  if (pathname === '/' || pathname === '') {
    const lang = resolveLang(
      context.cookies.get('lang')?.value,
      context.request.headers.get('accept-language'),
    );
    return context.redirect(`/${lang}/${search}`);
  }

  return next();
});
