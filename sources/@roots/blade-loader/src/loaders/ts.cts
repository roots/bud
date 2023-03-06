import {extract} from './index.cjs'

export const extension = `ts`
export const pattern =
  /@module\(['"]ts['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
