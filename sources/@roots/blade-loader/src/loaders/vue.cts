import {extract} from './index.cjs'

export const extension = `vue`
export const pattern =
  /@module\(['"]vue['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
