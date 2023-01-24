export default function (source: string) {
  return [...source.matchAll(/@scss(?<content>[\s\S]*?)@endscss/g)]
    .map(match => match.groups.content)
    .filter(Boolean)
    .join(`\n`)
}
