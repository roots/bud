import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'

export const options: Framework.Extension.Options = ({fs}) => ({
  outputPath: fs.getBase(),
  keepCircularReferences: true,
})

export const make: Framework.Extension.Make = (options: {
  outputPath: string
}) => new WebpackConfigDumpPlugin(options)
