export default function (source: string) {
  return source
    .match(/@ts([\s\S]*?)@endts/g)
    .join(`\n`)
    .replace(`@ts`, ``)
    .replace(`@endts`, ``)
}
