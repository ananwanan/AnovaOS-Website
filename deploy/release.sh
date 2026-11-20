#!/usr/bin/env bash
# GNU/Linux. Install this reviewed script once outside the runner workspace.
set -euo pipefail
umask 022
root=${ANOVA_SITE_ROOT:-/srv/anovaos}
mode=${1:-}
id=${2:-}
die() { echo "$*" >&2; exit 1; }
[[ $id =~ ^[0-9a-f]{40}(-[0-9]+-[0-9]+)?$ ]] || die "Expected a full commit SHA, optionally followed by run ID and attempt."
[[ $mode == publish || $mode == rollback ]] || die "Use publish ID DIST or rollback ID."
[[ -d $root/releases && -d $root/assets ]] || die "Initialize the release and asset directories first."
exec 9>"$root/.deploy.lock"
flock -x 9
stage=$(mktemp -d "$root/.stage.XXXXXXXX")
trap 'rm -rf -- "$stage"' EXIT
target="$root/releases/$id"
if [[ $mode == publish ]]; then
  [[ $# == 3 && -d $3 ]] || die "Expected the built dist directory."
  dist=$(realpath "$3")
  [[ -z $(find "$dist" ! -type d ! -type f -print -quit) ]] || die "Unexpected special file in build."
  for name in index.html en/index.html docs/index.html roadmap/index.html download/index.html robots.txt sitemap.xml; do
    [[ -s "$dist/$name" ]] || die "Incomplete build: $name"
  done
  [[ -d "$dist/_astro" ]] || die "Missing compiled assets."
  mkdir "$stage/site"
  cp -R -- "$dist/." "$stage/site/"
  (cd "$stage/site" && find . -type f -print0 | LC_ALL=C sort -z | xargs -0 sha256sum) > "$stage/manifest"
  if [[ -e $target ]]; then
    cmp -s "$target/.checksums" "$stage/manifest" || die "Release ID already has different contents."
  else
    # Old HTML can still request its content-addressed styles and fonts after the switch.
    while IFS= read -r -d '' file; do
      rel=${file#"$stage/site/_astro/"}
      asset="$root/assets/$rel"
      mkdir -p -- "$(dirname "$asset")"
      if [[ -e $asset ]]; then cmp -s "$file" "$asset" || die "Asset collision: $rel"
      else ln -- "$file" "$asset"; fi
    done < <(find "$stage/site/_astro" -type f -print0)
    rm -r -- "$stage/site/_astro"
    ln -s ../../assets "$stage/site/_astro"
    mv "$stage/manifest" "$stage/site/.checksums"
    mv -T "$stage/site" "$target"
  fi
fi
[[ -s $target/.checksums ]] || die "No verified release for $id."
(cd "$target" && sha256sum --quiet -c .checksums) || die "Release integrity check failed."
ln -s "releases/$id" "$stage/next"
mv -Tf "$stage/next" "$root/current"
echo "Active release: $id"

