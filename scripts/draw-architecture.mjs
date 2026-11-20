// Regenerate the isometric concept drawing with node scripts/draw-architecture.mjs.
import { writeFileSync } from 'node:fs';
const layers = [];
const point = (x, y, height) => [288 + (x - y) * 1.13, 295 + (x + y) * 0.45 - height];
const coords = (points) =>
  points.map((p) => p.map((n) => Number(n.toFixed(2))).join(',')).join(' ');
const face = (p, fill, stroke, width = 0.9) =>
  '<polygon points="' +
  coords(p) +
  '" fill="' +
  fill +
  '" stroke="' +
  stroke +
  '" stroke-width="' +
  width +
  '" stroke-linejoin="round"/>';
const line = (p, color, width = 0.7, extra = '') =>
  '<polyline points="' +
  coords(p) +
  '" fill="none" stroke="' +
  color +
  '" stroke-width="' +
  width +
  '" ' +
  extra +
  '/>';
function plate(size, z, depth, top, edge, side) {
  const rim = [
    [-size, -size],
    [size, -size],
    [size, size],
    [-size, size],
  ].map(([x, y]) => point(x, y, z));
  const bottom = rim.map(([x, y]) => [x, y + depth]);
  layers.push(
    face([rim[1], rim[2], bottom[2], bottom[1]], side, edge),
    face([rim[2], rim[3], bottom[3], bottom[2]], '#102531', edge),
    face(rim, top, edge, 1.25),
  );
  for (let i = -size + 5; i < size; i += 6) {
    const a = point(size, i, z),
      b = point(i, size, z);
    layers.push(
      line(
        [
          [a[0], a[1] + 2],
          [a[0], a[1] + depth - 1],
        ],
        edge,
        0.65,
      ),
      line(
        [
          [b[0], b[1] + 2],
          [b[0], b[1] + depth - 1],
        ],
        edge,
        0.65,
      ),
    );
  }
}
function traces(s, z, color) {
  const paths = [];
  for (let k = 0; k < 12; k++) {
    const n = ((k - 5.5) * s) / 7.7,
      bend = s * (0.42 + (k % 5) * 0.073);
    for (let side = 0; side < 4; side++) {
      const rotate = ([x, y]) =>
        side === 0 ? [x, y] : side === 1 ? [-y, x] : side === 2 ? [-x, -y] : [y, -x];
      const points = [
        [s - 3, n],
        [bend + 4, n],
        [bend - 4, n + 8],
        [s * 0.24, n + 8],
      ]
        .map(rotate)
        .map(([x, y]) => point(x, y, z));
      paths.push(line(points, color, 0.8));
      const [cx, cy] = points[3];
      paths.push(
        '<ellipse cx="' + cx + '" cy="' + cy + '" rx="1.45" ry=".8" fill="' + color + '"/>',
      );
    }
  }
  return paths.join('');
}
for (let n = -7; n <= 7; n++) {
  layers.push(
    line([point(n * 18, -128, -43), point(n * 18, 128, -43)], '#23404b', 0.5),
    line([point(-128, n * 18, -43), point(128, n * 18, -43)], '#23404b', 0.5),
  );
}
for (const [s, z, d, fill, stroke, side] of [
  [99, -16, 8, 'url(#base)', '#416a80', '#092333'],
  [94, 9, 6, '#152d3c', '#5b8296', '#24475a'],
  [91, 41, 7, 'url(#blue)', '#6fb8d0', '#224c60'],
  [85, 76, 9, 'url(#ice)', '#70d4e3', '#2b677a'],
  [75, 119, 10, 'url(#lid)', '#a2f7ff', '#347788'],
]) {
  for (const [x, y] of [
    [-s, -s],
    [s, -s],
    [s, s],
    [-s, s],
  ])
    layers.push(
      line([point(x, y, z - 7), point(x, y, z - 27)], '#4a8191', 0.7, 'stroke-dasharray="2 4"'),
    );
  plate(s, z, d, fill, stroke, side);
  layers.push(traces(s, z + 0.1, z > 70 ? '#67a9b9' : '#467082'));
  for (const [x, y] of [
    [s - 6, s - 6],
    [-s + 6, -s + 6],
    [s - 6, -s + 6],
    [-s + 6, s - 6],
  ]) {
    const [cx, cy] = point(x, y, z);
    layers.push(
      '<ellipse cx="' +
        cx +
        '" cy="' +
        cy +
        '" rx="3" ry="1.4" fill="#07141c" stroke="' +
        stroke +
        '" stroke-width=".7"/>',
    );
  }
}
plate(48, 123, 2, '#183b47', '#81d6e0', '#234653');
plate(42, 125, 1, 'url(#die)', '#50919c', '#234653');
const logo = [
  [-27, 22],
  [-6, -25],
  [5, -25],
  [26, 22],
  [13, 22],
  [0, -9],
  [-14, 22],
];
layers.push(
  face(
    logo.map(([x, y]) => point(x, y, 126)),
    '#9af4ff',
    '#b0f8ff',
  ),
  face(
    [
      [-6, 19],
      [0, 5],
      [6, 19],
    ].map(([x, y]) => point(x, y, 126)),
    '#9af4ff',
    '#9af4ff',
  ),
);
const draw =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 450"><defs>' +
  [
    ['base', '#192e3f', '#09141f'],
    ['blue', '#2d5266', '#152c40'],
    ['ice', '#38748a', '#16465a'],
    ['lid', '#366977', '#183f51'],
    ['die', '#2c5d69', '#1e424f'],
  ]
    .map(
      ([id, a, b]) =>
        '<linearGradient id="' +
        id +
        '" x2=".9" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="' +
        a +
        '"/><stop offset="1" stop-color="' +
        b +
        '"/></linearGradient>',
    )
    .join('') +
  '</defs>' +
  layers.join('') +
  '</svg>';
writeFileSync(new URL('../public/art/architecture.svg', import.meta.url), draw);
