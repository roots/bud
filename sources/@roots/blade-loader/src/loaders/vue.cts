export default function (source: string) {
  return source.match(/@vue([\s\S]*?)@endvue/g)
    .join(`\n`)
    .replace(`@vue`, ``).replace(`@endvue`, ``)
}
