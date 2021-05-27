import {Container} from '@roots/container'

describe('container', function () {
  it('is constructable', () => {
    expect(new Container()).toBeInstanceOf(Container)
  })

  it("returns undefined when getting something that doesn't exist", () => {
    expect(new Container().get('foo')).toEqual(undefined)
  })

  it('returns itself when setting something', () => {
    expect(new Container().set('foo', 'bar')).toBeInstanceOf(
      Container,
    )
  })

  it('has a set method that adds a value to the repository', () => {
    expect(new Container().set('foo', 'bar')).toEqual({
      repository: {
        foo: 'bar',
      },
    })
  })
})

export {}
