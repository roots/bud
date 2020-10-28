import HtmlHardDiskPlugin from 'html-webpack-harddisk-plugin'

export const make: Framework.Extension.Make = () =>
  new HtmlHardDiskPlugin()

export const when: Framework.Extension.When = ({features}) => {
  return features.enabled('html')
}
