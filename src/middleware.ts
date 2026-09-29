import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const host = context.request.headers.get("host") || "";
  const url = context.url;

  // Redirigir permanentemente (301) cualquier tráfico del subdominio de Vercel al dominio oficial
  if (host.includes("vercel.app")) {
    return context.redirect(`https://otterock.tech${url.pathname}${url.search}`, 301);
  }

  return next();
});
