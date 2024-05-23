import {extract} from '@roots/blade-loader/module-loader/handlers'

export const extension = `ts`
export const pattern =
  /@module\(['"]ts['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
