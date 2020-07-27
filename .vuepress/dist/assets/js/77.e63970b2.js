(window.webpackJsonp = window.webpackJsonp || []).push([
  [77],
  {
    419: function (t, e, s) {
      "use strict";
      s.r(e);
      var r = s(25),
        o = Object(r.a)(
          {},
          function () {
            var t = this,
              e = t.$createElement,
              s = t._self._c || e;
            return s(
              "ContentSlotsDistributor",
              { attrs: { "slot-key": t.$parent.slotKey } },
              [
                s("h1", { attrs: { id: "module-bud-state-configs" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#module-bud-state-configs" },
                    },
                    [t._v("#")]
                  ),
                  t._v(' Module: "bud/state/configs"'),
                ]),
                t._v(" "),
                s("h2", { attrs: { id: "functions" } }, [
                  s(
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
                s("h3", { attrs: { id: "const-config" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#const-config" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" "),
                  s("code", [t._v("Const")]),
                  t._v(" config"),
                ]),
                t._v(" "),
                s("p", [
                  t._v("▸ "),
                  s("strong", [t._v("config")]),
                  t._v("("),
                  s("code", [t._v("file")]),
                  t._v(": any): "),
                  s("em", [t._v("string")]),
                ]),
                t._v(" "),
                s("p", [
                  s("em", [
                    t._v("Defined in "),
                    s(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/bud/state/configs.ts#L12",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [t._v("src/bud/state/configs.ts:12"), s("OutboundLink")],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                s("p", [t._v("Config")]),
                t._v(" "),
                s("p", [s("strong", [t._v("Parameters:")])]),
                t._v(" "),
                s("table", [
                  s("thead", [
                    s("tr", [
                      s("th", [t._v("Name")]),
                      t._v(" "),
                      s("th", [t._v("Type")]),
                    ]),
                  ]),
                  t._v(" "),
                  s("tbody", [
                    s("tr", [
                      s("td", [s("code", [t._v("file")])]),
                      t._v(" "),
                      s("td", [t._v("any")]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                s("p", [
                  s("strong", [t._v("Returns:")]),
                  t._v(" "),
                  s("em", [t._v("string")]),
                ]),
                t._v(" "),
                s("p", [t._v("filePath")]),
                t._v(" "),
                s("hr"),
                t._v(" "),
                s("h3", { attrs: { id: "const-hasconfig" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#const-hasconfig" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" "),
                  s("code", [t._v("Const")]),
                  t._v(" hasConfig"),
                ]),
                t._v(" "),
                s("p", [
                  t._v("▸ "),
                  s("strong", [t._v("hasConfig")]),
                  t._v("("),
                  s("code", [t._v("file")]),
                  t._v(": any): "),
                  s("em", [t._v("any")]),
                ]),
                t._v(" "),
                s("p", [
                  s("em", [
                    t._v("Defined in "),
                    s(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/bud/state/configs.ts#L20",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [t._v("src/bud/state/configs.ts:20"), s("OutboundLink")],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                s("p", [t._v("Has config")]),
                t._v(" "),
                s("p", [s("strong", [t._v("Parameters:")])]),
                t._v(" "),
                s("table", [
                  s("thead", [
                    s("tr", [
                      s("th", [t._v("Name")]),
                      t._v(" "),
                      s("th", [t._v("Type")]),
                      t._v(" "),
                      s("th", [t._v("Description")]),
                    ]),
                  ]),
                  t._v(" "),
                  s("tbody", [
                    s("tr", [
                      s("td", [s("code", [t._v("file")])]),
                      t._v(" "),
                      s("td", [t._v("any")]),
                      t._v(" "),
                      s("td", [t._v("file path (relative to project root)")]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                s("p", [
                  s("strong", [t._v("Returns:")]),
                  t._v(" "),
                  s("em", [t._v("any")]),
                ]),
                t._v(" "),
                s("p", [t._v("true if file exists")]),
                t._v(" "),
                s("hr"),
                t._v(" "),
                s("h3", { attrs: { id: "const-maybeconfig" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#const-maybeconfig" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" "),
                  s("code", [t._v("Const")]),
                  t._v(" maybeConfig"),
                ]),
                t._v(" "),
                s("p", [
                  t._v("▸ "),
                  s("strong", [t._v("maybeConfig")]),
                  t._v("("),
                  s("code", [t._v("file")]),
                  t._v(": any, "),
                  s("code", [t._v("fallback")]),
                  t._v(": any): "),
                  s("em", [t._v("any")]),
                ]),
                t._v(" "),
                s("p", [
                  s("em", [
                    t._v("Defined in "),
                    s(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/bud/state/configs.ts#L28",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [t._v("src/bud/state/configs.ts:28"), s("OutboundLink")],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                s("p", [t._v("Maybe config")]),
                t._v(" "),
                s("p", [s("strong", [t._v("Parameters:")])]),
                t._v(" "),
                s("table", [
                  s("thead", [
                    s("tr", [
                      s("th", [t._v("Name")]),
                      t._v(" "),
                      s("th", [t._v("Type")]),
                      t._v(" "),
                      s("th", [t._v("Default")]),
                      t._v(" "),
                      s("th", [t._v("Description")]),
                    ]),
                  ]),
                  t._v(" "),
                  s("tbody", [
                    s("tr", [
                      s("td", [s("code", [t._v("file")])]),
                      t._v(" "),
                      s("td", [t._v("any")]),
                      t._v(" "),
                      s("td", [t._v("-")]),
                      t._v(" "),
                      s("td", [t._v("file path (relative to project root)")]),
                    ]),
                    t._v(" "),
                    s("tr", [
                      s("td", [s("code", [t._v("fallback")])]),
                      t._v(" "),
                      s("td", [t._v("any")]),
                      t._v(" "),
                      s("td", [t._v("null")]),
                      t._v(" "),
                      s("td", [t._v("-")]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                s("p", [
                  s("strong", [t._v("Returns:")]),
                  t._v(" "),
                  s("em", [t._v("any")]),
                ]),
                t._v(" "),
                s("h2", { attrs: { id: "object-literals" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#object-literals" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" Object literals"),
                ]),
                t._v(" "),
                s("h3", { attrs: { id: "const-configs" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#const-configs" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" "),
                  s("code", [t._v("Const")]),
                  t._v(" configs"),
                ]),
                t._v(" "),
                s("h3", { attrs: { id: "▪-configs-object" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#▪-configs-object" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" ▪ "),
                  s("strong", [t._v("configs")]),
                  t._v(": "),
                  s("em", [t._v("object")]),
                ]),
                t._v(" "),
                s("p", [
                  s("em", [
                    t._v("Defined in "),
                    s(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/bud/state/configs.ts#L39",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [t._v("src/bud/state/configs.ts:39"), s("OutboundLink")],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                s("p", [t._v("Project configuration files.")]),
                t._v(" "),
                s("p", [
                  s("strong", [s("code", [t._v("property")])]),
                  t._v(" {(string|boolean)} babel   - project babel.config.js"),
                ]),
                t._v(" "),
                s("p", [
                  s("strong", [s("code", [t._v("property")])]),
                  t._v(" {(string|boolean)} eslint  - project .eslintrc.js"),
                ]),
                t._v(" "),
                s("p", [
                  s("strong", [s("code", [t._v("property")])]),
                  t._v(
                    " {(string|boolean)} postcss - project postcss.config.js"
                  ),
                ]),
                t._v(" "),
                s("p", [
                  s("strong", [s("code", [t._v("property")])]),
                  t._v(
                    " {(string|boolean)} typescript - project tsconfig.json"
                  ),
                ]),
                t._v(" "),
                s("h3", { attrs: { id: "babel" } }, [
                  s(
                    "a",
                    { staticClass: "header-anchor", attrs: { href: "#babel" } },
                    [t._v("#")]
                  ),
                  t._v(" babel"),
                ]),
                t._v(" "),
                s("p", [
                  t._v("• "),
                  s("strong", [t._v("babel")]),
                  t._v(": "),
                  s("em", [t._v("any")]),
                  t._v(" = maybeConfig('babel.config.js')"),
                ]),
                t._v(" "),
                s("p", [
                  s("em", [
                    t._v("Defined in "),
                    s(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/bud/state/configs.ts#L40",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [t._v("src/bud/state/configs.ts:40"), s("OutboundLink")],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                s("h3", { attrs: { id: "eslint" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#eslint" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" eslint"),
                ]),
                t._v(" "),
                s("p", [
                  t._v("• "),
                  s("strong", [t._v("eslint")]),
                  t._v(": "),
                  s("em", [t._v("any")]),
                  t._v(" = maybeConfig('.eslintrc.js')"),
                ]),
                t._v(" "),
                s("p", [
                  s("em", [
                    t._v("Defined in "),
                    s(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/bud/state/configs.ts#L41",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [t._v("src/bud/state/configs.ts:41"), s("OutboundLink")],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                s("h3", { attrs: { id: "postcss" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#postcss" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" postCss"),
                ]),
                t._v(" "),
                s("p", [
                  t._v("• "),
                  s("strong", [t._v("postCss")]),
                  t._v(": "),
                  s("em", [t._v("any")]),
                  t._v(" = maybeConfig('postcss.config.js')"),
                ]),
                t._v(" "),
                s("p", [
                  s("em", [
                    t._v("Defined in "),
                    s(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/bud/state/configs.ts#L42",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [t._v("src/bud/state/configs.ts:42"), s("OutboundLink")],
                      1
                    ),
                  ]),
                ]),
                t._v(" "),
                s("h3", { attrs: { id: "typescript" } }, [
                  s(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#typescript" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" typescript"),
                ]),
                t._v(" "),
                s("p", [
                  t._v("• "),
                  s("strong", [t._v("typescript")]),
                  t._v(": "),
                  s("em", [t._v("any")]),
                  t._v(" = maybeConfig('tsconfig.json')"),
                ]),
                t._v(" "),
                s("p", [
                  s("em", [
                    t._v("Defined in "),
                    s(
                      "a",
                      {
                        attrs: {
                          href:
                            "https://github.com/roots/bud-support/blob/8b85437/src/bud/state/configs.ts#L43",
                          target: "_blank",
                          rel: "noopener noreferrer",
                        },
                      },
                      [t._v("src/bud/state/configs.ts:43"), s("OutboundLink")],
                      1
                    ),
                  ]),
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
      e.default = o.exports;
    },
  },
]);
