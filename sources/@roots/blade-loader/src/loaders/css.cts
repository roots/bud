export default function (source: string) {
  return source
    .match(/@css([\s\S]*?)@endcss/g)
    .join(`\n`)
    .replace(`@css`, ``)
    .replace(`@endcss`, ``)
}
