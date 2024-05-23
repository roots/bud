import {extract} from '@roots/blade-loader/module-loader/handlers'

export const extension = `css`
export const pattern =
  /@module\(['"]css['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
