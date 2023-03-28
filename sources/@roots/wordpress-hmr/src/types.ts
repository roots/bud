declare module global {
  interface Window {
    roots: {
      register: {
        blocks: (path: string) => void
        filters: (path: string) => void
        formats: (path: string) => void
        plugins: (path: string) => void
        styles: (path: string) => void
      }
    }
  }
}

declare module '@wordpress/data' {
  export function dispatch(namespace: string): any
  export function select(namespace: string): any
}
