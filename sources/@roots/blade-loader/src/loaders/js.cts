export default function (source: string) {
  return [...source.matchAll(/@js(?<content>[\s\S]*?)@endjs/g)]
    .map(match => match.groups.content)
    .filter(Boolean)
    .join(`\n`)
}
