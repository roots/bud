import {lodash as _, yargs} from '@roots/bud-support'

declare type Flag = boolean
declare type Param = string
declare type Arr = Array<string>

const {argv: args} = yargs

const flag: (key: string) => Flag = key =>
  args.hasOwnProperty(key) ? true : false

const parseMode = () => {
  const valid = ['development', 'production', 'none']
  const {mode} = args

  if (!_.isString(mode) || !valid.includes(mode)) {
    console.error(
      'Mode must be one of: production, development, none.',
    )

    process.exit(1)
  }
}

export const hot: Flag = flag('hot')
export const html: Flag = flag('html')
export const minify: Flag = flag('minify')
export const mode = (parseMode() as unknown) as string
