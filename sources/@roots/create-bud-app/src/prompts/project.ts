import Snippet from 'enquirer/lib/prompts/snippet.js'

import {set} from '../state.js'

const prompt = new Snippet({
  message: `Let's start with the project essentials`,
  required: true,
  fields: [
    {
      name: `name`,
      message: `Project name`,
    },
    {
      name: `username`,
      message: `Github user name`,
    },
    {
      name: `repository`,
      message: `Github repository`,
    },
  ],
  template: `{
  "name": "\${name}",
  "engines": {
    "node": ">=16"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/\${username}/\${name}.git"
  },
  "license": "\${license:MIT}",
  "type": "module",
  "scripts": {
    "build": "bud build production",
    "dev": "bud build development",
    "ci": "bud build --no-cache"
  },
  "devDependencies": {
    "@roots/bud": "latest"
  }
}
`,
})

export const run = async () => {
  try {
    const {result, values} = await prompt.run()

    set(`name`, values.name)
    process.stdout.write(`Project name set to ${values.name} \n`)

    set(`username`, values.username)
    process.stdout.write(`Github username set to ${values.username} \n`)

    set(`license`, values.license)
    process.stdout.write(`License set to ${values.license} \n`)

    set(`package`, result)
  } catch (error) {
    throw new Error(error)
  }
}
