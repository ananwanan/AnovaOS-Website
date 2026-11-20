import type { APIRoute } from 'astro';
import { pages } from '../lib/site';
export const GET: APIRoute = ({ site }) => {
  const entries = site
    ? [...pages('zh'), ...pages('en')]
        .map((p) => '<url><loc>' + new URL(p, site).href + '</loc></url>')
        .join('')
    : '';
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      entries +
      '</urlset>',
    { headers: { 'content-type': 'application/xml' } },
  );
};
