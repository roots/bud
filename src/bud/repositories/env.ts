import dotenv from 'dotenv'

const env = function (framework: any) {
  return (
    dotenv.config({
      path: framework.fs.path.join(framework.paths.get('project'), '.env'),
    }).parsed ?? {}
  )
}

export {env}
