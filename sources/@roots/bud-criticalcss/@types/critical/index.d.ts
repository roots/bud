declare module 'critical' {
  interface Stream {
    (params: any): any
  }
  interface Generate {
    (params: any, cb?: any): any
  }
  interface Generate {
    stream: typeof stream
  }

  declare const generate: Generate
  declare const stream: Stream
  export {generate, stream}
}
