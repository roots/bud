import {platform} from 'node:os'

import {Error} from '@roots/bud-dashboard/components/error'
import {BudError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'
import * as Ink from '@roots/bud-support/ink'

export const Doctor = ({name, timings}) => {
  return (
    <Ink.Box flexDirection="column" marginTop={1}>
      <Ink.Text underline>{`Diagnosis for ${name}\n`}</Ink.Text>
      <Ink.Text dimColor>
        {`Completed a dry run of your project's build (executed in
        ${timings.build} seconds). If the information provided by this
        command doesn't yield a solution consider running \`yarn bud repl\`
        and exploring the finalized config (\`bud.build.config\`).`}
      </Ink.Text>
      <Process />
    </Ink.Box>
  )
}

const Process = () => {
  return (
    <Ink.Box flexDirection="column" marginTop={1}>
      <Ink.Text color="blue">Checking system requirements{`\n`}</Ink.Text>

      <Ink.Box flexDirection="column">
        <Ink.Text>
          {process.version.match(/v1[6|7|8|9]/)
            ? figures.tick
            : figures.cross}
          {` `}
          node: {process.version}
        </Ink.Text>

        <Ink.Text>
          {platform() === `win32` ? figures.cross : figures.tick} os:{` `}
          {process.platform}
        </Ink.Text>

        {!process.version.match(/v1[6|7|8|9]/) && (
          <Error
            error={
              new BudError(`node-version`, {
                props: {
                  details: `Please upgrade to Node v18 for long-term support. You are running node ${process.version}.`,
                  docs: new URL(
                    `https://bud.js.org/guides/getting-started`,
                  ),
                },
              })
            }
          />
        )}
      </Ink.Box>
    </Ink.Box>
  )
}
