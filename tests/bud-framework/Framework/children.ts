import {Framework, setupBud, teardownBud} from '../../util'

describe('bud child compilers', () => {
  let bud: Framework

  beforeAll(done => {
    bud = setupBud()
    done()
  })

  afterAll(done => {
    bud = teardownBud(bud)
    done()
  })

  it("parent compiler's parent is this", done => {
    expect(bud.parent).toEqual(bud)
    done()
  })

  it('parent has no children', done => {
    expect(bud.children.all()).toEqual({})
    done()
  })

  it.only('bud can make a child compiler', done => {
    let childCompiler

    bud.make('child', child => {
      child.entry('foo', 'foo.js')
      childCompiler = child

      return child
    })

    expect(bud.get('child')).toEqual(childCompiler)
    done()
  })

  it.only('child compiler can return to parent compiler via `.parent` property', done => {
    expect(bud.get('child').parent).toEqual(bud)
    done()
  })

  it('bud.build.config returns parent compiler', done => {
    expect(bud.build.config.name).toBe('bud')
    done()
  })

  it.only('bud.get(`child`).build.config returns child compiler', done => {
    expect(bud.get('child').build.config.name).toBe('child')
    done()
  })
})
