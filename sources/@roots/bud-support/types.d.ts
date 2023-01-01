declare module 'highlight.js/lib/core' {
  interface hljs {
    [key: string]: any
  }
  declare const hljs: hljs
  export default hljs
}

declare module 'highlight.js/lib/languages/css' {
  export default function (hljs: any): void
}

declare module 'highlight.js/lib/languages/javascript' {
  export default function (hljs: any): void
}

declare module 'highlight.js/lib/languages/scss' {
  export default function (hljs: any): void
}

declare module 'highlight.js/lib/languages/typescript' {
  export default function (hljs: any): void
}

declare module 'common-path' {
  export default function (paths: string[]): string
}
