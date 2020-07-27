(window.webpackJsonp = window.webpackJsonp || []).push([
  [101],
  {
    443: function (v, s, _) {
      "use strict";
      _.r(s);
      var e = _(25),
        t = Object(e.a)(
          {},
          function () {
            var v = this,
              s = v.$createElement,
              _ = v._self._c || s;
            return _(
              "ContentSlotsDistributor",
              { attrs: { "slot-key": v.$parent.slotKey } },
              [
                _("h1", { attrs: { id: "module-build-rules-css-module" } }, [
                  _(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#module-build-rules-css-module" },
                    },
                    [v._v("#")]
                  ),
                  v._v(' Module: "build/rules/css/module"'),
                ]),
                v._v(" "),
                _("h2", { attrs: { id: "functions" } }, [
                  _(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#functions" },
                    },
                    [v._v("#")]
                  ),
                  v._v(" Functions"),
                ]),
                v._v(" "),
                _("h3", { attrs: { id: "const-module" } }, [
                  _(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#const-module" },
                    },
                    [v._v("#")]
                  ),
                  v._v(" "),
                  _("code", [v._v("Const")]),
                  v._v(" module"),
                ]),
                v._v(" "),
                _("p", [
                  v._v("▸ "),
                  _("strong", [v._v("module")]),
                  v._v("("),
                  _("code", [v._v("bud")]),
                  v._v(": any): "),
                  _("em", [v._v("object")]),
                ]),
                v._v(" "),
                _("p", [v._v("Defined in src/build/rules/css/module.ts:11")]),
                v._v(" "),
                _("p", [v._v("CSS modules")]),
                v._v(" "),
                _("p", [_("strong", [v._v("Parameters:")])]),
                v._v(" "),
                _("table", [
                  _("thead", [
                    _("tr", [
                      _("th", [v._v("Name")]),
                      v._v(" "),
                      _("th", [v._v("Type")]),
                    ]),
                  ]),
                  v._v(" "),
                  _("tbody", [
                    _("tr", [
                      _("td", [_("code", [v._v("bud")])]),
                      v._v(" "),
                      _("td", [v._v("any")]),
                    ]),
                  ]),
                ]),
                v._v(" "),
                _("p", [
                  _("strong", [v._v("Returns:")]),
                  v._v(" "),
                  _("em", [v._v("object")]),
                ]),
                v._v(" "),
                _("ul", [
                  _("li", [
                    _("p", [
                      _("strong", [v._v("bud")]),
                      v._v(": "),
                      _("em", [v._v("any")]),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("p", [
                      _("strong", [v._v("miniCss")]),
                      v._v(": "),
                      _("em", [v._v("any")]),
                      v._v(" = loaders.miniCss"),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("p", [
                      _("strong", [v._v("output")]),
                      v._v("(): "),
                      _("em", [v._v("object")]),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("p", [
                      _("strong", [v._v("postCss")]),
                      v._v(": "),
                      _("em", [v._v("any")]),
                      v._v(" = postCss(bud).make()"),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("p", [
                      _("strong", [v._v("resolveUrl")]),
                      v._v(": "),
                      _("em", [v._v("any")]),
                      v._v(" = resolveUrl(bud).make()"),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("p", [
                      _("strong", [v._v("test")]),
                      v._v(": "),
                      _("em", [v._v("RegExp‹›")]),
                      v._v(" = patterns.cssModule"),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("p", [
                      _("strong", [v._v("make")]),
                      v._v("(): "),
                      _("em", [v._v("any")]),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("p", [
                      _("strong", [v._v("post")]),
                      v._v("(): "),
                      _("em", [v._v("void")]),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("p", [
                      _("strong", [v._v("pre")]),
                      v._v("(): "),
                      _("em", [v._v("void")]),
                    ]),
                  ]),
                  v._v(" "),
                  _("li", [
                    _("h3", { attrs: { id: "css-object" } }, [
                      _(
                        "a",
                        {
                          staticClass: "header-anchor",
                          attrs: { href: "#css-object" },
                        },
                        [v._v("#")]
                      ),
                      v._v(" "),
                      _("strong", [v._v("css")]),
                      v._v(": "),
                      _("em", [v._v("object")]),
                    ]),
                    v._v(" "),
                    _("ul", [
                      _("li", [
                        _("p", [
                          _("strong", [v._v("loader")]),
                          v._v(": "),
                          _("em", [v._v("string")]),
                          v._v(" = loaders.css"),
                        ]),
                      ]),
                      v._v(" "),
                      _("li", [
                        _("p", [
                          _("strong", [v._v("options")]),
                          v._v(": "),
                          _("em", [v._v("object")]),
                        ]),
                        v._v(" "),
                        _("ul", [
                          _("li", [
                            _("p", [
                              _("strong", [v._v("modules")]),
                              v._v(": "),
                              _("em", [v._v("boolean")]),
                              v._v(" = true"),
                            ]),
                          ]),
                          v._v(" "),
                          _("li", [
                            _("p", [
                              _("strong", [v._v("onlyLocals")]),
                              v._v(": "),
                              _("em", [v._v("boolean")]),
                              v._v(" = false"),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
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
      s.default = t.exports;
    },
  },
]);
