export default function (source: string) {
  return [...source.matchAll(/@ts(?<content>[\s\S]*?)@endts/g)]
    .map(match => match.groups.content)
    .filter(Boolean)
    .join(`\n`)
}
