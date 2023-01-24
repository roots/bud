export default function (source: string) {
  return [...source.matchAll(/@vue(?<content>[\s\S]*?)@endvue/g)]
    .map(match => match.groups.content)
    .filter(Boolean)
    .join(`\n`)
}
