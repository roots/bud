#!/usr/bin/env node

import React from 'react'
import {render} from 'ink'
import yargs from 'yargs'
import Publish from './containers/Publish'
import {join, dirname} from 'path'
import {existsSync, copyFile, ensureDir} from 'fs-extra'

export = yargs
  .command(
    'build [options]',
    'Build source into compiled assets.',
    yargs =>
      yargs
        .option('config', {
          describe: 'Specify a custom configuration file',
          default: 'bud.config.js',
        })
        .option('env', {
          describe: 'Specify build mode',
          choices: ['development', 'production', 'none'],
          default: 'none',
        })
        .option('hot', {
          describe: 'Enable HMR',
          type: 'boolean',
          default: false,
        })
        .option('minify', {
          describe: 'Minify assets',
          type: 'boolean',
          default: false,
        })
        .option('gzip', {
          describe: 'Gzip static assets',
          type: 'boolean',
          default: false,
        })
        .option('hash', {
          describe: 'Hash asset filenames',
          type: 'boolean',
          default: false,
        })
        .option('brotli', {
          describe: 'Apply brotli compression to static assets',
          type: 'boolean',
          default: false,
        })
        .option('runtime', {
          describe: 'Generate runtime chunk',
          type: 'boolean',
          default: false,
        })
        .option('vendor', {
          describe: 'Generate vendor chunk',
          type: 'boolean',
          default: false,
        })
        .option('src', {
          describe: 'Override src directory',
          type: 'string',
        })
        .option('dest', {
          describe: 'Override destination directory',
          type: 'string',
        })
        .option('port', {
          describe: 'Dev port',
          type: 'number',
          default: 3000,
        })
        .option('host', {
          describe: 'Dev host',
          type: 'string',
          default: 'localhost',
        })
        .option('proxy', {
          describe: 'Hostname to proxy',
          type: 'string',
        })
        .option('ci', {
          describe: 'Run build in terminal compatibility mode.',
          type: 'boolean',
          default: false,
        })
        .option('html', {
          describe: 'Use an HTML5 boilerplate',
          type: 'boolean',
          default: true,
        })
        .option('log', {
          describe: 'Specify filepath to log to',
          type: 'string',
        })
        .usage('\n$0 build [options]')
        .example('Dev', 'bud build --env development --hot')
        .example(
          'Build',
          'bud build --env production --runtime --vendor --minify --gzip',
        )
        .example(
          'CI',
          'bud build --env production --runtime --vendor --minify --gzip --ci',
        )
        .hide('help')
        .hide('version')
        .showHelpOnFail(true),
    args => {
      const configPath = join(
        process.cwd(),
        args.config ?? 'bud.config.js',
      )

      if (!existsSync(configPath)) {
        return
      }

      import(configPath)
    },
  )
  .command(
    'publish <file>',
    'Publish an included template to your project.',
    yargs =>
      yargs
        .positional('file', {
          describe: 'template file to publish',
          type: 'string',
          choices: ['template.html', 'bud.config.js'],
        })
        .usage('$0 publish <file>')
        .showHelpOnFail(true),
    args => {
      const template = join(
        dirname(require.resolve('@roots/bud-support')),
        `../publish/${args.file}`,
      )
      const dest = join(process.cwd(), 'publish', args.file)

      ensureDir(dirname(dest)).then(() => {
        copyFile(template, dest).then(() => {
          render(<Publish file={args.file} />)
        })
      })
    },
  )
  .demandCommand(1, 'Try using one of the above commands.')
  .recommendCommands()
  .usage('\n$0 [command] [options]')
  .version()
  .wrap(yargs.terminalWidth())
  .showHelpOnFail(true)
  .epilog('https://github.com/roots/bud').argv
