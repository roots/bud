import {bud} from '@roots/bud'

bud
  .entry({
    app: ['@scripts/app', '@styles/app'],
    editor: ['@scripts/editor', '@styles/editor'],
  })
  .copyDir('images')
  .watch(['resources/views/*.blade.php'])
  .serve(3000)
  .proxy('http://example.test')

bud.wp.json
  .useTailwindColors('extend')
  .useTailwindFontFamily()
  .useTailwindFontSize()
  .useTailwindSpacing()
