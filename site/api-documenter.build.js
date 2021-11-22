/* eslint-disable tsdoc/syntax */
/* eslint-disable no-console */
const {
  createReadStream,
  ensureDir,
  writeFile,
} = require('fs-extra')
const {createInterface} = require('readline')
const {dirname, parse} = require('path')
const globby = require('globby')
const execa = require('execa')

/**
 * Adapted from faast.js' api-extractor/docusaurus adapter
 * {@link https://github.com/faastjs/faast.js/blob/master/build/make-docs.js}
 */

const getPkgs = async () => {
  pkgs = await globby(`packages/@roots/*`, {
    onlyDirectories: true,
  })

  return pkgs
    .filter(pkg => pkg !== 'packages/@roots')
    .map(pkg => ({
      name: pkg.replace(/^packages\/@roots\//, '@roots/'),
      extractorConfig: pkg.concat('/api-extractor.json'),
    }))
    .filter(Boolean)
}

const runExtractor = async () => {
  const pkgs = await getPkgs()

  pkgs.reduce(
    async (promised, pkg) => {
      await promised

      console.log(
        `Running api-extractor on ${pkg.extractorConfig}`,
      )
      return execa('yarn', [
        'api-extractor',
        'run',
        '--local',
        '--verbose',
        '--config',
        pkg.extractorConfig,
      ])
    },
    async () => Promise.resolve(),
  )
}

async function runDocumenter() {
  console.log('Running api-documentor')

  await execa('yarn', [
    'api-documenter',
    'markdown',
    '-i',
    'site/src/api/input/',
    '-o',
    'site/api/',
  ])

  const dir = `${process.cwd()}/site/api`
  const files = await globby(dir)

  for (const file of files) {
    try {
      const {name: id, ext} = parse(file)

      const input = createReadStream(file)

      const output = []

      const lines = createInterface({
        input,
        crlfDelay: Infinity,
      })

      let title = ''

      lines.on('line', async line => {
        let skip = false

        if (!title) {
          const titleLine = line.match(/## (.*)/)

          if (titleLine) {
            title = titleLine[1]
          }
        }

        /**
         * faast.js wrote:
         *
         * See issue #4. api-documenter expects \| to escape table
         * column delimiters, but docusaurus uses a markdown processor
         * that doesn't support this. Replace with an escape sequence
         * that renders |.
         */
        if (line.startsWith('|')) {
          line = line.replaceAll(/\\\|/g, '&#124;', 'g')
        }

        /**
         * For no reason that I can discern, api-documenter
         * outputs blank html comments in the markdown file.
         *
         * This removes them (they break mdx).
         */
        line = line.replaceAll(/<!-- -->/g, '', 'g')

        /**
         * This fixes the `returns` and `params` lines.
         * They try to escape the { and } characters with
         * literals `{` and `}`, which breaks mdx
         */
        if (line.startsWith('<b') || line.startsWith('<p')) {
          line = line
            .replaceAll(/\{/g, '`&#123;`', 'g')
            .replaceAll(/\}/g, `&#125;`, 'g')
        }

        /**
         * This tag `<void>` is used, totally unescaped because... 🤷🏼‍♂️
         * It causes a pretty obvious issues with mdx so
         * I escape with backticks.
         */
        line = line.replaceAll(
          /\<void\>/g,
          '{`<`}{`void`}{`>`}',
          'g',
        )

        if (!skip) {
          output.push(line)
        }
      })

      await new Promise(resolve => lines.once('close', resolve))

      input.close()

      const header = [
        '---',
        `id: ${id}`,
        `title: ${title}`,
        `hide_title: true`,
        `sidebar: 'api'`,
        '---',
      ]

      await ensureDir(dirname(`${process.cwd()}/site/api/${id}`))

      const writePath = `${process.cwd()}/site/api/${id}.md`

      await writeFile(
        writePath,
        header.concat(output).join('\n'),
      )
    } catch (err) {
      console.error(`Could not process ${file}: ${err}`)
    }
  }
}

const main = async () => {
  await runExtractor()

  await runDocumenter()
}

main()
