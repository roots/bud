/* eslint-disable tsdoc/syntax */
/* eslint-disable no-console */
const {
  ensureDir,
  ensureFile,
  writeFile,
  createReadStream,
  remove,
} = require('fs-extra')
const {createInterface} = require('readline')
const {parse, join} = require('path')
const globby = require('globby')
const execa = require('execa')
const {format} = require('prettier')
const {chunk} = require('lodash')

/**
 * Adapted from faast.js' api-extractor/docusaurus adapter
 * {@link https://github.com/faastjs/faast.js/blob/master/build/make-docs.js}
 */
//

/**
 * Ensure the directories exist
 * @internal
 */
const ensureDirs = async () => {
  try {
    const apiOuts = await globby(
      join(process.cwd(), 'sources/docs/src/api/*'),
      {onlyDirectories: true, absolute: true},
    )

    const packages = await getPackages()

    await Promise.all(
      packages.map(async package => {
        package.name = package.name.split('/').pop()

        const path = join(
          process.cwd(),
          'sources',
          'docs',
          'src',
          'api',
          package.name,
          'md',
        )
        const tmpPath = join(
          process.cwd(),
          'sources',
          'docs',
          'src',
          'api',
          package.name,
          'tmp',
        )

        console.log(`ensuring ${path} exists`)
        await ensureDir(path)

        console.log(`ensuring ${path} exists`)
        await ensureDir(tmpPath)
        return
      }),
    )
  } catch (e) {
    throw new Error(e)
  }
}

const getPackages = async () => {
  packages = await globby([`sources/@roots/*`, `!sources/@roots/bud-support`], {
    onlyDirectories: true,
  })

  return packages
    .filter(pkg => pkg !== 'sources/@roots')
    .map(pkg => ({
      name: pkg.replace(/^packages\/@roots\//, '@roots/'),
      extractorConfig: pkg.concat('/api-extractor.json'),
    }))
    .filter(Boolean)
}

const runExtractor = async () => {
  console.log(`Running api-extractor`)

  const packages = await getPackages()

  try {
    await chunk(packages, 5).reduce(async (promised, chunk) => {
      await promised

      await Promise.all(
        chunk.map(async pkg => {
          console.log(`Running api-extractor on ${pkg.extractorConfig}`)

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
    }, Promise.resolve())
  } catch (e) {
    console.error(e)
  }
}

const runDocumenter = async () => {
  console.log('Running api-documentor')

  const projects = await globby(
    join(
      process.cwd(),
      'sources/docs/src/api/{bud-hooks,bud-api,bud-extensions}',
    ),
    {
      onlyDirectories: true,
    },
  )

  await chunk(projects, 5).reduce(async (promised, chunk) => {
    await promised
    await Promise.all(
      chunk.map(async project => {
        project = project.split('/').pop()
        await execa('yarn', [
          'api-documenter',
          'markdown',
          '-i',
          `sources/docs/src/api/${project}/`,
          '-o',
          `sources/docs/api/raw/${project}/`,
        ])
      }),
    )
  }, Promise.resolve())
}

async function formatMarkdown() {
  const files = await globby(
    `${process.cwd()}/sources/docs/api/raw/{bud-hooks,bud-api,bud-extensions}/**/*`,
    `!${process.cwd()}/sources/docs/api/raw/index`,
    `!${process.cwd()}/sources/docs/api/raw/{bud-hooks,bud-api,bud-extensions}/index`,
    {
      onlyFiles: true,
    },
  )

  await Promise.all(
    files.map(async file => {
      try {
        let {name: filename, ext} = parse(file)

        if (filename == 'index') return

        const input = createReadStream(file)
        const lines = createInterface({
          input,
          crlfDelay: Infinity,
        })

        let title = ''

        const pathParts = filename.split('.').filter(Boolean)
        const outputFile = [
          process.cwd(),
          'sources',
          'docs',
          'api',
          ...pathParts,
        ]
          .join('/')
          .concat(ext)
          .replaceAll(/\_/g, '', 'g')

        const output = []

        lines.on('line', async line => {
          let skip = false

          if (line.match(/\[Home\]\((.*)\).*?/)) {
            skip = true
          }

          if (!title) {
            const titleLine = line.match(/## (.*)/)

            if (titleLine) {
              title = titleLine[1].replace(/## (.*)/, '# $1').toLowerCase()
            }
          }

          line = line
            .replaceAll(
              /\.\/(.*)\.md/g,
              (match, p1) => `/api/${p1.split('.').join('/')}`,
              'g',
            )
            .replaceAll(/\/md/g, '', 'g')
            .replaceAll(/_constructor_/g, 'constructor', 'g')

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
          line = line
            .replaceAll(/\<!-- --\>/g, '')
            .replaceAll(/\\n\\n/g, /\\n/, 'g')

          /**
           * This tag `<void>` is used, totally unescaped because... 🤷🏼‍♂️
           * It causes a pretty obvious issues with mdx.
           */
          line = line
            .replaceAll(/\<b\>/g, '', 'g')
            .replaceAll(/\<\/b\>/g, '', 'g')
            .replaceAll(/\/_/g, '_', 'g')

          if (!skip) {
            output.push(line)
          }
        })

        await new Promise(resolve => lines.once('close', resolve))

        const shortTitle = (
          title
            .split('.')
            .splice(title.split('.').length - 1)
            .join('.') ?? title
        ).toLowerCase()

        const frontmatter = [
          '---',
          `id: ${filename}`,
          `title: ${shortTitle}`,
          `sidebar_label: ${shortTitle}`,
          `hide_title: true`,
          `sidebar: 'api'`,
          `slug: ${outputFile
            .split('/')
            .pop()
            .replace('.md', '')
            .replaceAll(/\_/g, '', 'g')}`,
          '---',
        ].filter(Boolean)

        await ensureFile(outputFile)

        await writeFile(
          outputFile,
          format(frontmatter.concat(output).join('\n').trim(), {
            parser: 'mdx',
          }),
        )
      } catch (err) {
        throw new Error(err)
      }
    }),
  )

  await remove('sources/docs/api/raw')
}

const main = async () => {
  try {
    await ensureDirs()
  } catch (e) {
    console.error(e)
  }

  try {
    await runExtractor()
  } catch (e) {
    console.error(e)
  }

  try {
    console.log('documenting')
    await runDocumenter()

    console.log('formatting')
    await formatMarkdown()
  } catch (e) {
    console.error(e)
  }
}

main()
