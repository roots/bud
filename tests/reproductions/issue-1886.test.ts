import {path} from '@repo/constants'
import execa from '@roots/bud-support/execa'
import {Filesystem} from '@roots/bud-support/filesystem'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`issue-1886`, () => {
  let fs: Filesystem

  beforeAll(async () => {
    fs = new Filesystem()
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: path(`tests`, `reproductions`, `issue-1886`),
    })
    await execa(`yarn`, [`bud`, `build`], {
      cwd: path(`tests`, `reproductions`, `issue-1886`),
    })
  })

  it(`should generate webp from png included in js source`, async () => {
    const manifest = await fs.read(
      path(
        `tests`,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `manifest.json`,
      ),
    )
    const targetPath = manifest[`images/bud.png?as=webp`]
    const image = await fs.read(
      path(`tests`, `reproductions`, `issue-1886`, `dist`, targetPath),
      `utf8`,
    )
    expect(image.length).toMatchInlineSnapshot(`8377`)
  })

  it(`should generate webp from png included in css source`, async () => {
    const manifest = await fs.read(
      path(
        `tests`,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `manifest.json`,
      ),
    )

    const targetPath =
      manifest[`images/bud-css.png?as=webp&width=1200&height=630`]

    const image = await fs.read(
      path(`tests`, `reproductions`, `issue-1886`, `dist`, targetPath),
      `utf8`,
    )
    expect(image.length).toMatchInlineSnapshot(`8377`)
  })

  it(`should inline svg when url appended with ?inline  in css source`, async () => {
    const css = await fs.read(
      path(
        `tests`,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `css`,
        `main.css`,
      ),
      `utf8`,
    )
    expect(css).toMatchInlineSnapshot(
      `"body{background:url(../images/generated.bud-css@1200x630.715bf314fbd1a288.webp)}div:before{content:url(../images/bud.svg);position:relative}div:after{content:url(\\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 81 77'%3E%3Cg fill='none' stroke='%23fff'%3E%3Cpath d='m79.9 38.1-7.2-22-12.8-4.2L52 1H28.8l-7.9 10.9L8.2 16 1 38.1 8.9 49v13.4L27.6 76l12.8-4.2L53.2 76 72 62.4V48.9z'/%3E%3Cpath d='m40.4 52.4-.5-.4-12.5-9.1 4.8-14.7.2-.6h16l5 15.3L42.3 51zm33.1-15.3L68 44.6l-8.9-2.9-5.4-16.5 5.5-7.6 8.9 2.9 5.4 16.6zM31.8 6.7h17.3l5.5 7.6-.8 1.1-4.7 6.5H31.7L27 15.3l-.7-1zM12.7 20.6l8.9-2.9 5.5 7.6-.1.2-5.3 16.2-8.9 2.9L7.3 37zm1.9 38.9v-9.4l1.1-.4 7.8-2.5 12.7 9.2 1.4 1v9.4l-8.9 2.9zm37.6 10.1-8.9-2.9v-9.4l1.2-.9 12.8-9.3 6.3 2.1 2.6.8v9.5z'/%3E%3C/g%3E%3C/svg%3E\\");position:relative}"`,
    )
  })

  it(`should inline svg when url appended with ?inline in js source`, async () => {
    const js = await fs.read(
      path(
        `tests`,
        `reproductions`,
        `issue-1886`,
        `dist`,
        `js`,
        `main.js`,
      ),
      `utf8`,
    )
    expect(js).toContain(
      `"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 81 77'%3e%3cg fill='none' stroke='white'%3e%3cpath d='m79.9 38.1-7.2-22-12.8-4.2L52 1H28.8l-7.9 10.9L8.2 16 1 38.1 8.9 49v13.4L27.6 76l12.8-4.2L53.2 76 72 62.4V48.9z'/%3e%3cpath d='m40.4 52.4-.5-.4-12.5-9.1 4.8-14.7.2-.6h16l5 15.3L42.3 51zM73.5 37.1 68 44.6l-8.9-2.9-5.4-16.5 5.5-7.6 8.9 2.9 5.4 16.6zM31.8 6.7h17.3l5.5 7.6-.8 1.1-4.7 6.5H31.7L27 15.3l-.7-1zM12.7 20.6l8.9-2.9 5.5 7.6-.1.2-5.3 16.2-8.9 2.9L7.3 37zM14.6 59.5v-9.4l1.1-.4 7.8-2.5 12.7 9.2 1.4 1v9.4l-8.9 2.9zM52.2 69.6l-8.9-2.9v-9.4l1.2-.9 12.8-9.3 6.3 2.1 2.6.8v9.5z'/%3e%3c/g%3e%3c/svg%3e"`,
    )
  })

  it.skip(`should work with disk caching`, async () => {
    await execa(`yarn`, [`bud`, `clean`], {
      cwd: path(`tests`, `reproductions`, `issue-1886`),
    })

    const res1 = await execa(`yarn`, [`bud`, `build`, `--no-clean`], {
      cwd: path(`tests`, `reproductions`, `issue-1886`),
    })
    const res2 = await execa(`yarn`, [`bud`, `build`, `--no-clean`], {
      cwd: path(`tests`, `reproductions`, `issue-1886`),
    })
    const res3 = await execa(`yarn`, [`bud`, `build`, `--no-clean`], {
      cwd: path(`tests`, `reproductions`, `issue-1886`),
    })

    expect([res1.exitCode, res2.exitCode, res3.exitCode]).toEqual(
      expect.arrayContaining([0, 0, 0]),
    )
    expect([res1.failed, res2.failed, res3.failed]).toEqual(
      expect.arrayContaining([false, false, false]),
    )

    const extractStats = (stdout: string) =>
      stdout.split(`./dist\n│`).pop()?.split(`\n`).slice(0, 13).join(`\n`)

    expect(extractStats(res1.stdout)).toMatchInlineSnapshot(`
      "
      │ main
      │  › js/runtime.js                                                     ✔ 1.45 kB
      │  › css/main.css                                                    ✔ 816 bytes
      │  › js/main.js                                                      ✔ 993 bytes
      │
      │ assets
      │  › images/bud@1200x630.08beca94ce91010d.jpeg                          17.75 kB
      │  › images/bud-css@1200x630.715bf314fbd1a288.webp                       8.78 kB
      │  › images/bud@1200x630.715bf314fbd1a288.webp                           8.78 kB
      │  › images/bud-50@1200x630.1a614db6c1484150.webp                        6.66 kB
      │  › images/bud.svg                                                  ✔ 585 bytes
      │  … 5 additional assets not shown"
    `)
    expect(extractStats(res2.stdout)).toMatchInlineSnapshot(`
      "
      │ main
      │  ≈ js/runtime.js                                                     ✔ 1.45 kB
      │  ≈ css/main.css                                                    ✔ 816 bytes
      │  › js/main.js                                                      ✔ 990 bytes
      │
      │ assets
      │  › images/bud.08beca94ce91010d.png?as=jpeg                            17.75 kB
      │  › images/bud.715bf314fbd1a288.png?as=webp                             8.78 kB
      │  › images/bud-50.1a614db6c1484150.png?as=webp50                       6.66 kB
      │  ≈ images/bud-css@1200x630.715bf314fbd1a288.webp                       8.78 kB
      │  ≈ images/bud.svg                                                  ✔ 585 bytes
      │  … 5 additional assets not shown"
    `)
    expect(extractStats(res3.stdout)).toMatchInlineSnapshot(`
      "
      │ main
      │  ≈ js/runtime.js                                                     ✔ 1.45 kB
      │  ≈ css/main.css                                                    ✔ 816 bytes
      │  ≈ js/main.js                                                      ✔ 990 bytes
      │
      │ assets
      │  › images/bud.08beca94ce91010d.png?as=jpeg                            17.75 kB
      │  › images/bud.715bf314fbd1a288.png?as=webp                             8.78 kB
      │  › images/bud-50.1a614db6c1484150.png?as=webp50                       6.66 kB
      │  ≈ images/bud-css@1200x630.715bf314fbd1a288.webp                       8.78 kB
      │  ≈ images/bud.svg                                                  ✔ 585 bytes
      │  … 5 additional assets not shown"
    `)
  })
}, 120000)
