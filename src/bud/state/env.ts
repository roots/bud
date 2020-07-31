import dotenv from 'dotenv'

const envRepository = function (framework: any) {
  return dotenv.config({
    path: framework.fs.path.join(framework.paths.get('project'), '.env'),
  }).parsed ?? {}
}

export {envRepository}
