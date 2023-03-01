import {extract} from './index.cjs'

export const extension = `css`
export const pattern =
  /@module\(['"]css['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
