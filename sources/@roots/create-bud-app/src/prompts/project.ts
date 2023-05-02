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
    "url": "https://github.com/\${username}/\${name}.git",
  },
  "license": "\${license:MIT}",
  "scripts": {
    "build": "bud build production",
    "dev": "bud build development",
    "ci": "bud build --no-cache"
  },
  "devDependencies": {
    "@roots/bud": "latest",
  }
}
`,
})

export const run = async () => {
  try {
    set(`package`, (await prompt.run()).result)
  } catch (error) {
    throw new Error(error)
  }
}
