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

  const generate: Generate
  const stream: Stream
  export {generate, stream}
}
