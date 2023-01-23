export default function (source: string) {
  return source
    .match(/@scss([\s\S]*?)@endscss/g)
    .join(`\n`)
    .replace(`@scss`, ``)
    .replace(`@endscss`, ``)
}
