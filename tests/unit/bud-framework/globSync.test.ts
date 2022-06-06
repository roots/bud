import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.globSync', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.globSync).toBeInstanceOf(Function)
  })

  it('returns glob results from string param', () => {
    const results = bud.globSync('@src/**/*.js')

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining('scripts/app.js'),
        expect.stringContaining('scripts/components/main.js'),
      ]),
    )
  })

  it('returns glob results without alias', () => {
    const results = bud.globSync('src/**/*.js')

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining('scripts/app.js'),
        expect.stringContaining('scripts/components/main.js'),
      ]),
    )
  })

  it('returns glob results from array', () => {
    const results = bud.globSync(['src/**/*.js', 'src/**/app.*'])

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining('scripts/app.js'),
        expect.stringContaining('styles/app.css'),
        expect.stringContaining('scripts/components/main.js'),
      ]),
    )
  })

  it('returns glob results from variadic params', () => {
    const results = bud.globSync('src/**/*.js', 'src/**/app.*')

    expect(results).toEqual(
      expect.arrayContaining([
        expect.stringContaining('scripts/app.js'),
        expect.stringContaining('styles/app.css'),
        expect.stringContaining('scripts/components/main.js'),
      ]),
    )
  })

  it('returns glob results with negation', () => {
    const results = bud.globSync('src/**/*.js', '!**/main.js')

    expect(results).toEqual(
      expect.arrayContaining([expect.stringContaining('scripts/app.js')]),
    )
  })
})
