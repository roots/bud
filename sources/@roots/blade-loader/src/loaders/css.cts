export default function (source: string) {
  return [...source.matchAll(/@css(?<content>[\s\S]*?)@endcss/g)]
    .map(match => match.groups.content)
    .filter(Boolean)
    .join(`\n`)
}
