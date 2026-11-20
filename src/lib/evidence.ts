import data from '../content/evidence.json';
import { os, type Lang } from './site';
export { data };
export function source(lang: Lang, path: string) {
  return (
    os +
    '/blob/' +
    data.sha +
    '/' +
    (lang === 'zh' ? path.replace('docs/en/', 'docs/zh-CN/') : path)
  );
}
export const featureIcons: Record<string, string> = {
  kernel: 'cpu',
  process: 'layer',
  filesystem: 'disk',
  native: 'code',
  toolchain: 'terminal',
  linux: 'box',
  desktop: 'screen',
  terminal: 'terminal',
  devices: 'network',
};
