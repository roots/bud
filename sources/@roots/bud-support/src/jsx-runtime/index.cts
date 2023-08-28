const React = require(`react`)
const Element = Symbol.for(`react.element`)
const Fragment = Symbol.for(`react.fragment`)

/** @ts-ignore */
const n = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
const p = {__self: !0, __source: !0, key: !0, ref: !0}

/** @ts-ignore */
function jsx(type, a, g) {
  let b
  let props: Record<string, any> = {}
  let key = null
  let ref = null

  void 0 !== g && (key = `${g}`)
  void 0 !== a.key && (key = `${a.key}`)
  void 0 !== a.ref && (ref = a.ref)

  /** @ts-ignore */
  for (b in a)
    Object.prototype.hasOwnProperty.call(a, b) && !p.hasOwnProperty(b) && (props[b] = a[b])

  if (type && type.defaultProps)
    /** @ts-ignore */
    for (b in ((a = type.defaultProps), a)) void 0 === d[b] && (d[b] = a[b])

  return {
    _owner: n.current,
    $$typeof: Element,
    key,
    props,
    ref,
    type,
  }
}

module.exports = {
  Fragment,
  jsx,
  jsxs: jsx,
}
