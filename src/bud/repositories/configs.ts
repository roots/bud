import type {Repository} from '../container'

const configFiles = [
  {
    name: 'babel',
    filename: 'babel.config.js',
  },
  {
    name: 'eslint',
    filename: '.eslintrc.js',
  },
  {
    name: 'postcss',
    filename: 'postcss.config.js',
  },
  {
    name: 'prettier',
    filename: 'prettier.config.js',
  },
  {
    name: 'stylelint',
    filename: 'stylelint.config.js',
  },
  {
    name: 'typescript',
    filename: 'tsconfig.json',
  },
  {
    name: 'js',
    filename: 'jsconfig.json',
  },
  {
    name: 'vue',
    filename: 'vue.config.js',
  },
]

const configs: (framework: any) => Repository = framework => {
  const repository = {}
  const {fs, paths} = framework

  configFiles.forEach(({name, filename}) => {
    const projectPath = fs.path.join(paths.get('project'), filename)

    if (fs.existsSync(projectPath)) {
      repository[name] = projectPath
    }
  })

  return repository
}

export {configs}
