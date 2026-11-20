import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
const value =
  process.env.SITE_URL || loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '').SITE_URL;
const site = value ? new URL(value) : undefined;
if (
  site &&
  (site.protocol !== 'https:' ||
    site.pathname !== '/' ||
    site.search ||
    site.hash ||
    site.username ||
    site.password)
) {
  throw new Error('SITE_URL must be a public HTTPS origin without a path or credentials.');
}
export default defineConfig({
  site: site?.origin,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: 'github-dark' } },
  server: { host: process.env.SITES_MANAGED_LINUX_CONTAINER === '1' },
});
