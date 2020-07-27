(window.webpackJsonp = window.webpackJsonp || []).push([
  [133],
  {
    475: function (t, e, o) {
      "use strict";
      o.r(e);
      var r = o(25),
        _ = Object(r.a)(
          {},
          function () {
            var t = this,
              e = t.$createElement,
              o = t._self._c || e;
            return o(
              "ContentSlotsDistributor",
              { attrs: { "slot-key": t.$parent.slotKey } },
              [
                o("h1", { attrs: { id: "module-compiler-hooks-usestore" } }, [
                  o(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#module-compiler-hooks-usestore" },
                    },
                    [t._v("#")]
                  ),
                  t._v(' Module: "compiler/hooks/useStore"'),
                ]),
                t._v(" "),
                o("h2", { attrs: { id: "functions" } }, [
                  o(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#functions" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" Functions"),
                ]),
                t._v(" "),
                o("h3", { attrs: { id: "associateactions" } }, [
                  o(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#associateactions" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" associateActions"),
                ]),
                t._v(" "),
                o("p", [
                  t._v("▸ "),
                  o("strong", [t._v("associateActions")]),
                  t._v("("),
                  o("code", [t._v("store")]),
                  t._v(": any, "),
                  o("code", [t._v("actions")]),
                  t._v(": any): "),
                  o("em", [t._v("associatedActions")]),
                ]),
                t._v(" "),
                o("p", [
                  o("em", [
                    t._v("Defined in "),
                    o(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/compiler/hooks/useStore.js#L49",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [
                        t._v("src/compiler/hooks/useStore.js:49"),
                        o("OutboundLink"),
                      ],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                o("p", [o("strong", [t._v("Parameters:")])]),
                t._v(" "),
                o("table", [
                  o("thead", [
                    o("tr", [
                      o("th", [t._v("Name")]),
                      t._v(" "),
                      o("th", [t._v("Type")]),
                    ]),
                  ]),
                  t._v(" "),
                  o("tbody", [
                    o("tr", [
                      o("td", [o("code", [t._v("store")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("actions")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                o("p", [
                  o("strong", [t._v("Returns:")]),
                  t._v(" "),
                  o("em", [t._v("associatedActions")]),
                ]),
                t._v(" "),
                o("hr"),
                t._v(" "),
                o("h3", { attrs: { id: "setstate" } }, [
                  o(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#setstate" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" setState"),
                ]),
                t._v(" "),
                o("p", [
                  t._v("▸ "),
                  o("strong", [t._v("setState")]),
                  t._v("("),
                  o("code", [t._v("store")]),
                  t._v(": any, "),
                  o("code", [t._v("newState")]),
                  t._v(": any, "),
                  o("code", [t._v("afterUpdateCallback")]),
                  t._v(": any): "),
                  o("em", [t._v("void")]),
                ]),
                t._v(" "),
                o("p", [
                  o("em", [
                    t._v("Defined in "),
                    o(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/compiler/hooks/useStore.js#L4",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [
                        t._v("src/compiler/hooks/useStore.js:4"),
                        o("OutboundLink"),
                      ],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                o("p", [
                  t._v("Forked from "),
                  o(
                    "a",
                    {
                      attrs: {
                        href: "https://github.com/andregardi/use-global-hook",
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    },
                    [
                      t._v("https://github.com/andregardi/use-global-hook"),
                      o("OutboundLink"),
                    ],
                    1
                  ),
                ]),
                t._v(" "),
                o("p", [o("strong", [t._v("Parameters:")])]),
                t._v(" "),
                o("table", [
                  o("thead", [
                    o("tr", [
                      o("th", [t._v("Name")]),
                      t._v(" "),
                      o("th", [t._v("Type")]),
                    ]),
                  ]),
                  t._v(" "),
                  o("tbody", [
                    o("tr", [
                      o("td", [o("code", [t._v("store")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("newState")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("afterUpdateCallback")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                o("p", [
                  o("strong", [t._v("Returns:")]),
                  t._v(" "),
                  o("em", [t._v("void")]),
                ]),
                t._v(" "),
                o("hr"),
                t._v(" "),
                o("h3", { attrs: { id: "usecustom" } }, [
                  o(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#usecustom" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" useCustom"),
                ]),
                t._v(" "),
                o("p", [
                  t._v("▸ "),
                  o("strong", [t._v("useCustom")]),
                  t._v("("),
                  o("code", [t._v("store")]),
                  t._v(": any, "),
                  o("code", [t._v("React")]),
                  t._v(": any, "),
                  o("code", [t._v("mapState")]),
                  t._v(": any, "),
                  o("code", [t._v("mapActions")]),
                  t._v(": any): "),
                  o("em", [t._v("any[]")]),
                ]),
                t._v(" "),
                o("p", [
                  o("em", [
                    t._v("Defined in "),
                    o(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/compiler/hooks/useStore.js#L12",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [
                        t._v("src/compiler/hooks/useStore.js:12"),
                        o("OutboundLink"),
                      ],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                o("p", [o("strong", [t._v("Parameters:")])]),
                t._v(" "),
                o("table", [
                  o("thead", [
                    o("tr", [
                      o("th", [t._v("Name")]),
                      t._v(" "),
                      o("th", [t._v("Type")]),
                    ]),
                  ]),
                  t._v(" "),
                  o("tbody", [
                    o("tr", [
                      o("td", [o("code", [t._v("store")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("React")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("mapState")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("mapActions")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                o("p", [
                  o("strong", [t._v("Returns:")]),
                  t._v(" "),
                  o("em", [t._v("any[]")]),
                ]),
                t._v(" "),
                o("hr"),
                t._v(" "),
                o("h3", { attrs: { id: "const-usestore" } }, [
                  o(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#const-usestore" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" "),
                  o("code", [t._v("Const")]),
                  t._v(" useStore"),
                ]),
                t._v(" "),
                o("p", [
                  t._v("▸ "),
                  o("strong", [t._v("useStore")]),
                  t._v("("),
                  o("code", [t._v("React")]),
                  t._v(": any, "),
                  o("code", [t._v("initialState")]),
                  t._v(": any, "),
                  o("code", [t._v("actions")]),
                  t._v(": any, "),
                  o("code", [t._v("initializer")]),
                  t._v(": any): "),
                  o("em", [t._v("any")]),
                ]),
                t._v(" "),
                o("p", [
                  o("em", [
                    t._v("Defined in "),
                    o(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/compiler/hooks/useStore.js#L68",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [
                        t._v("src/compiler/hooks/useStore.js:68"),
                        o("OutboundLink"),
                      ],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                o("p", [o("strong", [t._v("Parameters:")])]),
                t._v(" "),
                o("table", [
                  o("thead", [
                    o("tr", [
                      o("th", [t._v("Name")]),
                      t._v(" "),
                      o("th", [t._v("Type")]),
                    ]),
                  ]),
                  t._v(" "),
                  o("tbody", [
                    o("tr", [
                      o("td", [o("code", [t._v("React")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("initialState")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("actions")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                    t._v(" "),
                    o("tr", [
                      o("td", [o("code", [t._v("initializer")])]),
                      t._v(" "),
                      o("td", [t._v("any")]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                o("p", [
                  o("strong", [t._v("Returns:")]),
                  t._v(" "),
                  o("em", [t._v("any")]),
                ]),
              ]
            );
          },
          [],
          !1,
          null,
          null,
          null
        );
      e.default = _.exports;
    },
  },
]);
