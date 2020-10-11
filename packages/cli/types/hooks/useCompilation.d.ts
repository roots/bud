import {Stats} from 'webpack'
declare const useCompilation: ({
  compiler,
  server,
}: {
  compiler: any
  server: any
}) => {
  listening: boolean
  running: boolean
  watching: boolean
  progress: {
    percentage: number
    msg: string
  }
  stats: Stats.ToJsonOutput
  errors: any[]
  warnings: any[]
}
export {useCompilation as default}
//# sourceMappingURL=useCompilation.d.ts.map
