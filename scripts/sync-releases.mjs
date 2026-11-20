import { writeFile, rename } from 'node:fs/promises';
const repo = 'ananwanan/AnovaOS';
const releases = [];
for (let page = 1; ; page++) {
  const result = await fetch(
    'https://api.github.com/repos/' + repo + '/releases?per_page=100&page=' + page,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'AnovaOS-Website-build',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: 'Bearer ' + process.env.GITHUB_TOKEN }
          : {}),
      },
    },
  );
  if (!result.ok)
    throw new Error('GitHub Releases returned ' + result.status + '; kept previous snapshot.');
  const batch = await result.json();
  for (const r of batch.filter((entry) => !entry.draft)) {
    const allowed = (s) => {
      if (typeof s !== 'string' || !s.startsWith('https://github.com/' + repo + '/releases/'))
        throw new Error('Unexpected asset or release URL');
      return s;
    };
    releases.push({
      tag: r.tag_name,
      name: r.name || r.tag_name,
      url: allowed(r.html_url),
      prerelease: r.prerelease,
      date: r.published_at.slice(0, 10),
      assets: r.assets
        .filter((a) => a.state === 'uploaded')
        .map((a) => ({
          name: a.name,
          url: allowed(a.browser_download_url),
          digest: a.digest || null,
        })),
    });
  }
  if (batch.length < 100) break;
}
const path = new URL('../src/content/releases.json', import.meta.url),
  temp = new URL(path.href + '.tmp');
await writeFile(
  temp,
  JSON.stringify({ checked: new Date().toISOString().slice(0, 10), releases }, null, 2) + '\n',
);
await rename(temp, path);
console.log('Synchronized ' + releases.length + ' published release records.');
