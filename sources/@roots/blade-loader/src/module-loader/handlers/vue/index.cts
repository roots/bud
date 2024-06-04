import {extract} from '@roots/blade-loader/module-loader/handlers'

export const extension = `vue`
export const pattern =
  /@module\(['"]vue['"]\)(?<content>[\s\S]*?)@endmodule/g

export default (source: string) => extract(source, pattern)
