import {lodash} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'
import {Box, Newline, Static, Text} from 'ink'
import React from 'react'
import {StatsCompilation} from 'webpack'

const {isString} = lodash

export const Events = ({
  stats,
  stderr,
  stdout,
  theme,
}: {
  stats: StatsCompilation
  stderr: Array<string>
  stdout: Array<string>
  theme: Styles
}) => {
  const cleanErr = err =>
    err
      .split('    at')
      .splice(0, 1)
      .join(' ')
      .replaceAll(/\n/g, '')

  return (
    <Box flexDirection="column">
      {stats?.errorsCount > 0 && (
        <Static items={stats.errors}>
          {(out, k) => (
            <Box key={`webpack-error-${k}`}>
              {isString(out) && (
                <Box
                  flexDirection="column"
                  borderStyle="single"
                  borderColor={theme.colors.error}
                >
                  <Text>{out}</Text>
                </Box>
              )}

              {!isString(out) && (
                <Box
                  flexDirection="column"
                  borderStyle="single"
                  borderColor={theme.colors.error}
                >
                  <Text>
                    {`${
                      out.message ? cleanErr(out.message) : ''
                    }`}
                  </Text>
                </Box>
              )}
            </Box>
          )}
        </Static>
      )}

      {stderr?.length > 0 && (
        <Static items={stderr}>
          {(message, id) => (
            <Box
              key={`stderr-${id}`}
              flexDirection="column"
              borderStyle="single"
              borderColor={theme.colors.error}
            >
              <Text>{message ? cleanErr(message) : ''}</Text>
            </Box>
          )}
        </Static>
      )}

      {stdout?.length > 0 && (
        <Static items={stdout}>
          {(message, id) =>
            message ? (
              <Box
                key={`stdout-${id}`}
                marginTop={1}
                flexDirection="column"
                borderStyle="single"
                borderColor="white"
              >
                <Text>{message.trim()}</Text>
              </Box>
            ) : null
          }
        </Static>
      )}

      {stats?.warningsCount > 0 && (
        <Box marginTop={1}>
          <Static items={stats.warnings}>
            {(out, k) => (
              <Text key={`webpack-warn-${k}`}>
                {isString(out) && out}
                {!isString(out) && (
                  <Box flexDirection="column">
                    <Text>
                      <Newline />
                      {out.file ? `Warning in ${out.file}` : ``}
                    </Text>

                    <Text>{out.message ?? ''}</Text>
                  </Box>
                )}
              </Text>
            )}
          </Static>
        </Box>
      )}
    </Box>
  )
}
