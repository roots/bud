export default function (source: string) {
  return source.match(/@js([\s\S]*?)@endjs/g).join(`\n`).replace(`@js`, ``).replace(`@endjs`, ``)
}
