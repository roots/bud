import {extract} from './index.cjs'

export const extension = `js`
export const pattern =
  /@module\(['"]js['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
