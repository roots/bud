import {extract} from './index.cjs'

export const extension = `scss`
export const pattern =
  /@module\(['"]scss['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
