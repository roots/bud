import {extract} from '@roots/blade-loader/module-loader/handlers'

export const extension = `js`
export const pattern =
  /@module\(['"]js['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
