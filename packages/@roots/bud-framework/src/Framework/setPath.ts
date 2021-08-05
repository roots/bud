import {Framework} from '.'

interface setPath {
  (this: Framework, ...args): Framework
}

function setPath(this: Framework, ...args): Framework {
  if (typeof args[0] == 'string') {
    this.hooks.on(`location/${args[0]}`, args[1])
    return this
  }

  if (Object.entries(args[0]).length === 0) {
    this.error(
      `${args[0].toString()} cannot be empty. It should be an object with keys set to registered locations: ['src', 'dist', 'storage', 'publicPath', 'project']`,
      `Type error`,
    )
  }

  Object.entries(args[0]).map(([k, v]: [string, string]) => {
    this.when(k == 'project' && !v.startsWith('/'), () => {
      this.error(
        'The project path must be absolute',
        'Type error',
      )
    })

    this.when(
      !['project', 'publicPath'].includes(k) &&
        v.startsWith('/'),
      () => {
        this.warn(
          `Path: ${k} was defined as ${v}. This path should be relative to the project root. You should fix this.`,
        )

        v = v.replace(this.hooks.filter('location/project'), '')
      },
    )

    this.hooks.on(`location/${k}`, v)
  })

  return this
}

export {setPath}
