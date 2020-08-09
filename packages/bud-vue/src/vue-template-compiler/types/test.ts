import {compile} from '.'

// check compile options
const compiled = compile('<div>hi</div>', {
  outputSourceRange: true,
  preserveWhitespace: false,
  whitespace: 'condense',
  modules: [
    {
      preTransformNode: el => el,
      transformNode: el => el,
      postTransformNode: el => {
        el.tag = 'p'
      },
      genData: el => el.tag,
      transformCode: (el, code) => code,
      staticKeys: ['test'],
    },
  ],
  directives: {
    test: (node, directiveMeta) => {
      node.tag
      directiveMeta.value
    },
  },
})

// can be passed to function constructor
new Function(compiled.render)
compiled.staticRenderFns.map(fn => new Function(fn))

// with outputSourceRange: true
// errors should be objects with range
compiled.errors.forEach(e => {
  console.log(e.msg)
})

// without option or without outputSourceRange: true, should be strings
const {errors} = compile(`foo`)
errors.forEach(e => {
  console.log(e.length)
})

const {errors: errors2} = compile(`foo`, {})
errors2.forEach(e => {
  console.log(e.length)
})

const {errors: errors3} = compile(`foo`, {
  outputSourceRange: false,
})
errors3.forEach(e => {
  console.log(e.length)
})
