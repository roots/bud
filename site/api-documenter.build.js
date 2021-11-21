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
const {prettier} = require('@roots/bud-support')

/**
 * Adapted from faast.js' api-extractor/docusaurus adapter
 * {@link https://github.com/faastjs/faast.js/blob/master/build/make-docs.js}
 */

const ensureDirs = async () => {
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
    throw new Error(e)
  }
}

const getPackages = async () => {
  packages = await globby(
    [`packages/@roots/*`, `!packages/@roots/bud-support`],
    {
      onlyDirectories: true,
    },
  )

  return packages
    .filter(pkg => pkg !== 'packages/@roots')
    .map(pkg => ({
      name: pkg.replace(/^packages\/@roots\//, '@roots/'),
      extractorConfig: pkg.concat('/api-extractor.json'),
    }))
    .filter(Boolean)
}

const runExtractor = async () => {
  const packages = await getPackages()

  try {
    await Promise.all(
      packages.map(async pkg => {
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

const runDocumenter = async () => {
  console.log('Running api-documentor')

  const projects = await globby(
    join(
      process.cwd(),
      'site/src/api/{bud-hooks,bud-api,bud-extensions}',
    ),
    {
      onlyDirectories: true,
    },
  )

  console.log(projects)

  await Promise.all(
    projects.map(async project => {
      project = project.split('/').pop()
      await execa('yarn', [
        'api-documenter',
        'markdown',
        '-i',
        `site/src/api/${project}/`,
        '-o',
        `site/api/raw/${project}/`,
      ])
    }),
  )
}

async function formatMarkdown() {
  const files = await globby(
    `${process.cwd()}/site/api/raw/{bud-hooks,bud-api,bud-extensions}/**/*`,
    `!${process.cwd()}/site/api/raw/index`,
    `!${process.cwd()}/site/api/raw/{bud-hooks,bud-api,bud-extensions}/index`,
    {
      onlyFiles: true,
    },
  )

  console.log(files)

  await Promise.all(
    files.map(async file => {
      try {
        let {name: filename, dir, ext} = parse(file)

        if (filename == 'index') return

        const input = await createReadStream(file)

        const lines = createInterface({
          input,
          crlfDelay: Infinity,
        })

        let title = ''

        const pathParts = filename.split('.').filter(Boolean)
        const outputFile = [
          process.cwd(),
          'site',
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
              title = titleLine[1]
                .replace(/## (.*)/, '# $1')
                .toLowerCase()
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
            .replaceAll(/<!--(.*?)-->/g, '', 'g')
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

        await new Promise(resolve =>
          lines.once('close', resolve),
        )

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
          prettier.format(
            frontmatter.concat(output).join('\n').trim(),
            {
              parser: 'mdx',
            },
          ),
        )
      } catch (err) {
        throw new Error(err)
      }
    }),
  )
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
