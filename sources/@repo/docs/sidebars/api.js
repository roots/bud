const globby = require('globby')

const files = globby
  .sync(`${process.cwd()}/api/*`)
  .map(item => item.split('/').pop())

console.log(files)

const nav = files.reduce((bar, doc) => {
  const cat = doc.split('.')[0]
  const name = doc.replace('.md', '')
  const inner =
    name.split('.').length > 0 ? name.split('.')[0] : false

  return {
    ...bar,
    [`${cat}`]: [
      ...(bar[`${cat}`] ?? []),
      {
        id: name,
        type: 'doc',
        label: name.split('.').splice(1).join('.'),
      },
    ],
  }
}, {})

console.log(nav)

module.exports = nav
