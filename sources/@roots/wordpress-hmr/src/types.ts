export declare module global {
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
