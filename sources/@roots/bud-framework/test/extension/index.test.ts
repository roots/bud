import {BudError} from '@roots/bud-support/errors'
import Logger from '@roots/bud-support/logger'
import {beforeAll, describe, expect, it, vi} from 'vitest'

import type {Bud} from '../../src/index.js'

import {
  DynamicOption,
  Extension,
  isDynamicOption,
} from '../../src/extension/index.js'

describe(`@roots/bud-framework/extension`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = {
      module: {
        import: vi.fn(async (...args: any[]) => {}),
        resolve: vi.fn(async (...args: any[]) => {}),
      },
      resolvePromises: vi.fn(async (...args: any[]) => {}),
    } as unknown as Bud
  })

  it(`should export the Extension base class`, async () => {
    expect(Extension).toBeInstanceOf(Function)
  })

  it(`should have a done method`, async () => {
    const extension = new Extension(bud)
    expect(extension.done).toBeInstanceOf(Function)
  })

  it(`should have an app getter`, async () => {
    const extension = new Extension(bud)
    expect(extension.app).toBe(bud)
  })

  it(`should have a get method`, async () => {
    const extension = new Extension(bud)
    expect(extension.get).toBeInstanceOf(Function)
  })

  it(`should have a set method`, async () => {
    const extension = new Extension(bud)
    expect(extension.set).toBeInstanceOf(Function)
  })

  it(`should be enabled`, async () => {
    const extension = new Extension(bud)
    expect(extension.enabled).toBe(true)
  })

  it(`should have a logger`, async () => {
    const extension = new Extension(bud)
    expect(extension.logger).toBe(Logger)
  })

  describe(`dynamic options`, async () => {
    it(`should have a DynamicOption class export`, async () => {
      expect(DynamicOption).toBeInstanceOf(Function)
    })

    it(`should have a isDynamicOption helper export`, async () => {
      expect(isDynamicOption).toBeInstanceOf(Function)
    })

    it(`isDynamicOption should return true for DynamicOption instances`, async () => {
      const dynamicOption = new DynamicOption(`foo`)
      expect(isDynamicOption(dynamicOption)).toBe(true)
    })
  })

  describe(`catch`, async () => {
    it(`should be a function`, async () => {
      const extension = new Extension(bud)
      expect(extension.catch).toBeInstanceOf(Function)
    })

    it(`should throw an BudError`, async () => {
      const extension = new Extension(bud)
      try {
        extension.catch(`error`)
      } catch (e) {
        expect(e).toBeInstanceOf(BudError)
        expect(e.message).toBe(`error`)
      }
    })
  })

  describe(`enable`, async () => {
    it(`should enable the extension`, async () => {
      const extension = new Extension(bud)
      expect(extension.enabled).toBe(true)

      extension.enabled = false
      expect(extension.enabled).toBe(false)

      extension.enable()
      expect(extension.enabled).toBe(true)
    })
  })

  describe(`setOption`, async () => {
    it(`should be equivalent to set`, async () => {
      const extension = new Extension(bud)
      expect(extension.setOption).toBe(extension.set)
    })
    it(`should set a non-function value`, async () => {
      const extension = new Extension(bud)
      const logSpy = vi.spyOn(extension.logger, `info`)

      extension.setOption(`foo`, `bar`)
      expect(logSpy).toHaveBeenCalledWith(
        `Set option:`,
        `foo`,
        `=>`,
        `bar`,
      )
      expect(extension.options).toHaveProperty(`foo`, `bar`)
    })

    it(`should set a function value`, async () => {
      const extension = new Extension(bud)
      const logSpy = vi.spyOn(extension.logger, `info`)

      const optionValue = vi.fn(() => `bar`)
      extension.setOption(`foo`, optionValue)

      expect(optionValue).toHaveBeenCalledOnce()
      expect(logSpy).toHaveBeenCalledWith(
        `Set option:`,
        `foo`,
        `=>`,
        `bar`,
      )
      expect(extension.options).toHaveProperty(`foo`, `bar`)
    })

    it(`should set a dynamic option value`, async () => {
      const extension = new Extension(bud)
      const logSpy = vi.spyOn(extension.logger, `info`)
      const dynamicFn = vi.fn(() => `foo`)
      const dynamicOption = new DynamicOption(dynamicFn)
      extension.setOption(`foo`, dynamicOption)

      expect(logSpy).toHaveBeenCalledWith(
        `Set option:`,
        `foo`,
        `=>`,
        dynamicOption,
      )
      expect(extension._options).toHaveProperty(`foo`, dynamicOption)
      expect(extension.get(`foo`)).toBe(`foo`)
      expect(extension.options.foo).toBe(`foo`)
    })
  })

  describe(`setOptions`, async () => {
    it(`should set options`, async () => {
      const extension = new Extension(bud)
      const logSpy = vi.spyOn(extension.logger, `info`)
      extension.setOptions({foo: `bar`})
      expect(logSpy).toHaveBeenCalledWith(
        `Set options:`,
        expect.objectContaining({foo: `bar`}),
      )
      expect(extension.options).toHaveProperty(`foo`, `bar`)
      expect(extension._options).toHaveProperty(`foo`, `bar`)
    })
  })

  describe(`resolve`, async () => {
    it(`should resolve a module`, async () => {
      const extension = new Extension(bud)
      await extension.resolve(`@roots/bud-support/logger`, import.meta.url)
      expect(bud.module.resolve).toHaveBeenCalledWith(
        `@roots/bud-support/logger`,
        import.meta.url,
      )
    })
  })

  describe(`import`, async () => {
    it(`should import a module`, async () => {
      const extension = new Extension(bud)
      await extension.import(`@roots/bud-support/logger`, import.meta.url)
      expect(bud.module.import).toHaveBeenCalledWith(
        `@roots/bud-support/logger`,
        import.meta.url,
        {bustCache: false, raw: false},
      )
    })
  })

  describe(`execute`, async () => {
    it(`should resolve promised tasks`, async () => {
      const extension = new Extension(bud)
      await extension.execute(`make`)
      expect(bud.resolvePromises).toHaveBeenCalledTimes(1)
    })

    describe(`make`, async () => {
      it(`should return false early if nothing to make`, async () => {
        const extension = new Extension(bud)
        const result = await extension.execute(`make`)
        expect(result).toBe(false)
      })

      it(`should return plugin if apply is available`, async () => {
        const apply = vi.fn(() => {})
        class TestExtension extends Extension {
          public apply = apply
        }
        const extension = new TestExtension(bud)
        const logSpy = vi.spyOn(extension.logger, `log`)
        const infoSpy = vi.spyOn(extension.logger, `info`)
        const result = await extension.execute(`make`)

        expect(logSpy).toHaveBeenCalledWith(
          `Produced hybrid compiler plugin / bud extension:`,
          extension.label,
        )
        expect(infoSpy).toHaveBeenCalledOnce()
        expect(result).toHaveProperty(`apply`)
      })

      it(`should return plugin if plugin is available`, async () => {
        const plugin: any = vi.fn(() => {
          apply: vi.fn(() => {})
        })
        class TestExtension extends Extension {
          public plugin = plugin
        }
        const extension = new TestExtension(bud)
        const logSpy = vi.spyOn(extension.logger, `log`)
        const infoSpy = vi.spyOn(extension.logger, `info`)
        await extension.execute(`make`)

        expect(logSpy).toHaveBeenCalledWith(
          `Produced compiler plugin:`,
          extension.label,
        )
        expect(infoSpy).toHaveBeenCalledOnce()
      })

      it(`should return make result if make is available`, async () => {
        const make: any = vi.fn(() => {})
        class TestExtension extends Extension {
          public make = make
        }
        const extension = new TestExtension(bud)
        const logSpy = vi.spyOn(extension.logger, `log`)
        const infoSpy = vi.spyOn(extension.logger, `info`)
        await extension.execute(`make`)

        expect(logSpy).toHaveBeenCalledWith(
          `Produced make plugin:`,
          extension.label,
        )
        expect(infoSpy).toHaveBeenCalledOnce()
        expect(make).toHaveBeenCalledWith(bud, extension.options)
      })
    })

    describe(`register`, async () => {
      it(`should return false early if nothing to register`, async () => {
        const extension = new Extension(bud)
        const result = await extension.execute(`register`)
        expect(result).toBe(false)
      })

      it(`should return true if register was called`, async () => {
        const register: any = vi.fn(() => {})
        class TestExtension extends Extension {
          public register = register
        }
        const extension = new TestExtension(bud)
        const result = await extension.execute(`register`)

        expect(register).toHaveBeenCalledWith(bud)
        expect(result).toBe(true)
      })
    })

    describe(`boot`, async () => {
      it(`should return false early if nothing to boot`, async () => {
        const extension = new Extension(bud)
        const result = await extension.execute(`boot`)
        expect(result).toBe(false)
      })

      it(`should return true if boot was called`, async () => {
        const boot: any = vi.fn(() => {})
        class TestExtension extends Extension {
          public boot = boot
        }
        const extension = new TestExtension(bud)
        const result = await extension.execute(`boot`)

        expect(boot).toHaveBeenCalledWith(bud)
        expect(result).toBe(true)
      })
    })

    describe(`buildBefore`, async () => {
      it(`should return false early if nothing to buildBefore`, async () => {
        const extension = new Extension(bud)
        const result = await extension.execute(`buildBefore`)
        expect(result).toBe(false)
      })

      it(`should return true if buildBefore was called`, async () => {
        const buildBefore: any = vi.fn(() => {})
        class TestExtension extends Extension {
          public buildBefore = buildBefore
        }
        const extension = new TestExtension(bud)
        const result = await extension.execute(`buildBefore`)

        expect(buildBefore).toHaveBeenCalledWith(bud)
        expect(result).toBe(true)
      })
    })

    describe(`buildAfter`, async () => {
      it(`should return false early if nothing to buildAfter`, async () => {
        const extension = new Extension(bud)
        const result = await extension.execute(`buildAfter`)
        expect(result).toBe(false)
      })

      it(`should return true if buildAfter was called`, async () => {
        const buildAfter: any = vi.fn(() => {})
        class TestExtension extends Extension {
          public buildAfter = buildAfter
        }
        const extension = new TestExtension(bud)
        const result = await extension.execute(`buildAfter`)

        expect(buildAfter).toHaveBeenCalledWith(bud)
        expect(result).toBe(true)
      })
    })

    describe(`compilerDone`, async () => {
      it(`should return false early if nothing to compilerDone`, async () => {
        const extension = new Extension(bud)
        const result = await extension.execute(`compilerDone`)
        expect(result).toBe(false)
      })

      it(`should return true if compilerDone was called`, async () => {
        const configAfter: any = vi.fn(() => {})
        class TestExtension extends Extension {
          public configAfter = configAfter
        }
        const extension = new TestExtension(bud)
        const result = await extension.execute(`configAfter`)

        expect(configAfter).toHaveBeenCalledWith(bud)
        expect(result).toBe(true)
      })
    })

    describe(`compilerDone`, async () => {
      it(`should return false early if nothing to compilerDone`, async () => {
        const extension = new Extension(bud)
        const result = await extension.execute(`compilerDone`)
        expect(result).toBe(false)
      })

      it(`should return true if compilerDone was called`, async () => {
        const compilerDone: any = vi.fn(() => {})
        class TestExtension extends Extension {
          public compilerDone = compilerDone
        }
        const extension = new TestExtension(bud)
        const result = await extension.execute(`compilerDone`)

        expect(compilerDone).toHaveBeenCalledWith(bud)
        expect(result).toBe(true)
      })
    })
  })
})
