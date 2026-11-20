export type Lang = 'zh' | 'en';
export const os = 'https://github.com/ananwanan/AnovaOS';
export const website = 'https://github.com/ananwanan/AnovaOS-Website';
export const labels = {
  '': ['首页', 'Home'],
  features: ['特性', 'Features'],
  download: ['下载', 'Download'],
  roadmap: ['开发路线', 'Roadmap'],
  docs: ['文档', 'Docs'],
  contributing: ['参与贡献', 'Contributing'],
} as const;
export const docs = [
  'intro',
  'environment',
  'build',
  'qemu',
  'architecture',
  'sdk',
  'compatibility',
  'contributing',
] as const;
export type Doc = (typeof docs)[number];
export const docNames: Record<Doc, [string, string]> = {
  intro: ['项目介绍', 'Introduction'],
  environment: ['开发环境', 'Development environment'],
  build: ['编译与运行', 'Build and run'],
  qemu: ['QEMU 使用', 'Running QEMU'],
  architecture: ['系统架构', 'System architecture'],
  sdk: ['SDK 与应用开发', 'SDK and applications'],
  compatibility: ['兼容性边界', 'Compatibility'],
  contributing: ['开发贡献指南', 'Contribution guide'],
};
export const link = (lang: Lang, path = '') =>
  (lang === 'zh' ? '/' : '/en/') + (path ? path + '/' : '');
export const translator = (lang: Lang) => (zh: string, en: string) => (lang === 'zh' ? zh : en);
export const statusNames: Record<string, [string, string]> = {
  verified: ['已验证', 'Verified'],
  limited: ['有使用限制', 'Limited scope'],
  active: ['开发中', 'In development'],
  planned: ['计划中', 'Planned'],
  conditional: ['有条件推进', 'Conditional'],
};
export const pages = (lang: Lang) =>
  [...Object.keys(labels), ...docs.filter((v) => v !== 'intro').map((v) => 'docs/' + v)].map(
    (path) => link(lang, path),
  );
export const docPath = (lang: Lang, id: Doc) => link(lang, id === 'intro' ? 'docs' : 'docs/' + id);
