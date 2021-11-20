/* eslint-disable tsdoc/syntax */
/* eslint-disable no-console */
const {
  createReadStream,
  ensureDir,
  writeFile,
  remove,
} = require('fs-extra')
const {createInterface} = require('readline')
const {parse, join} = require('path')
const globby = require('globby')
const execa = require('execa')

/**
 * Adapted from faast.js' api-extractor/docusaurus adapter
 * {@link https://github.com/faastjs/faast.js/blob/master/build/make-docs.js}
 */

const getPkgs = async () => {
  pkgs = await globby(
    [`packages/@roots/*`, `!packages/@roots/bud-support`],
    {
      onlyDirectories: true,
    },
  )

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

  try {
    await Promise.all(
      pkgs.map(async pkg => {
        console.log(
          `Running api-extractor on ${pkg.extractorConfig}`,
        )
        const child = execa('yarn', [
          'api-extractor',
          'run',
          '--local',
          '--verbose',
          '--config',
          pkg.extractorConfig,
        ])

        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
        await child
      }),
    )
  } catch (e) {
    console.error(e)
  }
}

async function runDocumenter() {
  console.log('Running api-documentor')

  const projects = await globby(
    join(process.cwd(), 'site/src/api/*'),
    {
      onlyDirectories: true,
    },
  )

  await Promise.all(
    projects.map(async project => {
      project = project.split('/').pop()
      await execa('yarn', [
        'api-documenter',
        'markdown',
        '-i',
        `site/src/api/${project}/`,
        '-o',
        `site/api/${project}/`,
      ])
    }),
  )

  const files = await globby(`${process.cwd()}/site/api/*/*`, {
    onlyFiles: true,
  })

  for (const file of files) {
    try {
      const {name: id, ext, dir} = parse(file)

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
         * It causes a pretty obvious issues with mdx.
         */
        line = line.replaceAll(/\<void\>/g, '', 'g')
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
        id === 'index' ? `order: 1` : false,
        '---',
      ].filter(Boolean)

      const writePath = join(dir, `${id}.md`)
      const final = header.concat(output).join('\n')
      await writeFile(writePath, final)
    } catch (err) {
      console.error(`Could not process ${file}: ${err}`)
    }
  }
}

const main = async () => {
  try {
    const apiOuts = await globby(
      join(process.cwd(), 'site/src/api/*'),
      {onlyDirectories: true, absolute: true},
    )
    await Promise.all(
      apiOuts.map(async out => {
        const path = join(out, 'md')
        console.log(`ensuring ${path} exists`)
        await ensureDir(join(out, 'md'))
        return
      }),
    )
  } catch (e) {
    console.error(e)
  }

  try {
    await runExtractor()
  } catch (e) {
    console.error(e)
  }

  try {
    await runDocumenter()
  } catch (e) {
    console.error(e)
  }
}

main()
