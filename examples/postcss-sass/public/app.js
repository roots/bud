/******/ ;(() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ 807:
      /*!*******************************************************!*\
  !*** ../../node_modules/ansi-html-community/index.js ***!
  \*******************************************************/
      /***/ module => {
        'use strict'

        module.exports = ansiHTML

        // Reference to https://github.com/sindresorhus/ansi-regex
        var _regANSI =
          /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

        var _defColors = {
          reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
          black: '000',
          red: 'ff0000',
          green: '209805',
          yellow: 'e8bf03',
          blue: '0000ff',
          magenta: 'ff00ff',
          cyan: '00ffee',
          lightgrey: 'f0f0f0',
          darkgrey: '888',
        }
        var _styles = {
          30: 'black',
          31: 'red',
          32: 'green',
          33: 'yellow',
          34: 'blue',
          35: 'magenta',
          36: 'cyan',
          37: 'lightgrey',
        }
        var _openTags = {
          1: 'font-weight:bold', // bold
          2: 'opacity:0.5', // dim
          3: '<i>', // italic
          4: '<u>', // underscore
          8: 'display:none', // hidden
          9: '<del>', // delete
        }
        var _closeTags = {
          23: '</i>', // reset italic
          24: '</u>', // reset underscore
          29: '</del>', // reset delete
        }

        ;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
          _closeTags[n] = '</span>'
        })

        /**
         * Converts text with ANSI color codes to HTML markup.
         * @param {String} text
         * @returns {*}
         */
        function ansiHTML(text) {
          // Returns the text if the string has no ANSI escape code.
          if (!_regANSI.test(text)) {
            return text
          }

          // Cache opened sequence.
          var ansiCodes = []
          // Replace with markup.
          var ret = text.replace(
            /\033\[(\d+)m/g,
            function (match, seq) {
              var ot = _openTags[seq]
              if (ot) {
                // If current sequence has been opened, close it.
                if (!!~ansiCodes.indexOf(seq)) {
                  // eslint-disable-line no-extra-boolean-cast
                  ansiCodes.pop()
                  return '</span>'
                }
                // Open tag.
                ansiCodes.push(seq)
                return ot[0] === '<'
                  ? ot
                  : '<span style="' + ot + ';">'
              }

              var ct = _closeTags[seq]
              if (ct) {
                // Pop sequence
                ansiCodes.pop()
                return ct
              }
              return ''
            },
          )

          // Make sure tags are closed.
          var l = ansiCodes.length
          l > 0 && (ret += Array(l + 1).join('</span>'))

          return ret
        }

        /**
         * Customize colors.
         * @param {Object} colors reference to _defColors
         */
        ansiHTML.setColors = function (colors) {
          if (typeof colors !== 'object') {
            throw new Error(
              '`colors` parameter must be an Object.',
            )
          }

          var _finalColors = {}
          for (var key in _defColors) {
            var hex = colors.hasOwnProperty(key)
              ? colors[key]
              : null
            if (!hex) {
              _finalColors[key] = _defColors[key]
              continue
            }
            if ('reset' === key) {
              if (typeof hex === 'string') {
                hex = [hex]
              }
              if (
                !Array.isArray(hex) ||
                hex.length === 0 ||
                hex.some(function (h) {
                  return typeof h !== 'string'
                })
              ) {
                throw new Error(
                  'The value of `' +
                    key +
                    '` property must be an Array and each item could only be a hex string, e.g.: FF0000',
                )
              }
              var defHexColor = _defColors[key]
              if (!hex[0]) {
                hex[0] = defHexColor[0]
              }
              if (hex.length === 1 || !hex[1]) {
                hex = [hex[0]]
                hex.push(defHexColor[1])
              }

              hex = hex.slice(0, 2)
            } else if (typeof hex !== 'string') {
              throw new Error(
                'The value of `' +
                  key +
                  '` property must be a hex string, e.g.: FF0000',
              )
            }
            _finalColors[key] = hex
          }
          _setTags(_finalColors)
        }

        /**
         * Reset colors.
         */
        ansiHTML.reset = function () {
          _setTags(_defColors)
        }

        /**
         * Expose tags, including open and close.
         * @type {Object}
         */
        ansiHTML.tags = {}

        if (Object.defineProperty) {
          Object.defineProperty(ansiHTML.tags, 'open', {
            get: function () {
              return _openTags
            },
          })
          Object.defineProperty(ansiHTML.tags, 'close', {
            get: function () {
              return _closeTags
            },
          })
        } else {
          ansiHTML.tags.open = _openTags
          ansiHTML.tags.close = _closeTags
        }

        function _setTags(colors) {
          // reset all
          _openTags['0'] =
            'font-weight:normal;opacity:1;color:#' +
            colors.reset[0] +
            ';background:#' +
            colors.reset[1]
          // inverse
          _openTags['7'] =
            'color:#' +
            colors.reset[1] +
            ';background:#' +
            colors.reset[0]
          // dark grey
          _openTags['90'] = 'color:#' + colors.darkgrey

          for (var code in _styles) {
            var color = _styles[code]
            var oriColor = colors[color] || '000'
            _openTags[code] = 'color:#' + oriColor
            code = parseInt(code)
            _openTags[(code + 10).toString()] =
              'background:#' + oriColor
          }
        }

        ansiHTML.reset()

        /***/
      },

    /***/ 937:
      /*!**********************************************!*\
  !*** ../../node_modules/ansi-regex/index.js ***!
  \**********************************************/
      /***/ module => {
        'use strict'

        module.exports = ({onlyFirst = false} = {}) => {
          const pattern = [
            '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
            '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
          ].join('|')

          return new RegExp(pattern, onlyFirst ? undefined : 'g')
        }

        /***/
      },

    /***/ 557:
      /*!***************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[11].use[1]!../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[11].use[2]!./src/app.scss ***!
  \***************************************************************************************************************************************************************************************/
      /***/ (
        module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(
          __webpack_exports__,
          {
            /* harmony export */ default: () =>
              __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          },
        )
        /* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ 601,
          )
        /* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__,
          )
        /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../../../node_modules/css-loader/dist/runtime/api.js */ 609,
          )
        /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__,
          )
        // Imports

        var ___CSS_LOADER_EXPORT___ =
          _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
            _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default(),
          )
        // Module
        ___CSS_LOADER_EXPORT___.push([
          module.id,
          'html,\nbody {\n  padding: 0;\n  margin: 0;\n}\n\nbody {\n  background: blue;\n}\nbody div {\n  border: white;\n}',
          '',
        ])
        // Exports
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          ___CSS_LOADER_EXPORT___

        /***/
      },

    /***/ 609:
      /*!*********************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************/
      /***/ module => {
        'use strict'

        /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
        module.exports = function (cssWithMappingToString) {
          var list = [] // return the list of modules as css string

          list.toString = function toString() {
            return this.map(function (item) {
              var content = ''
              var needLayer = typeof item[5] !== 'undefined'

              if (item[4]) {
                content += '@supports ('.concat(item[4], ') {')
              }

              if (item[2]) {
                content += '@media '.concat(item[2], ' {')
              }

              if (needLayer) {
                content += '@layer'.concat(
                  item[5].length > 0 ? ' '.concat(item[5]) : '',
                  ' {',
                )
              }

              content += cssWithMappingToString(item)

              if (needLayer) {
                content += '}'
              }

              if (item[2]) {
                content += '}'
              }

              if (item[4]) {
                content += '}'
              }

              return content
            }).join('')
          } // import a list of modules into the list

          list.i = function i(
            modules,
            media,
            dedupe,
            supports,
            layer,
          ) {
            if (typeof modules === 'string') {
              modules = [[null, modules, undefined]]
            }

            var alreadyImportedModules = {}

            if (dedupe) {
              for (var _i = 0; _i < this.length; _i++) {
                var id = this[_i][0]

                if (id != null) {
                  alreadyImportedModules[id] = true
                }
              }
            }

            for (var _i2 = 0; _i2 < modules.length; _i2++) {
              var item = [].concat(modules[_i2])

              if (dedupe && alreadyImportedModules[item[0]]) {
                continue
              }

              if (typeof layer !== 'undefined') {
                if (typeof item[5] === 'undefined') {
                  item[5] = layer
                } else {
                  item[1] = '@layer'
                    .concat(
                      item[5].length > 0
                        ? ' '.concat(item[5])
                        : '',
                      ' {',
                    )
                    .concat(item[1], '}')
                  item[5] = layer
                }
              }

              if (media) {
                if (!item[2]) {
                  item[2] = media
                } else {
                  item[1] = '@media '
                    .concat(item[2], ' {')
                    .concat(item[1], '}')
                  item[2] = media
                }
              }

              if (supports) {
                if (!item[4]) {
                  item[4] = ''.concat(supports)
                } else {
                  item[1] = '@supports ('
                    .concat(item[4], ') {')
                    .concat(item[1], '}')
                  item[4] = supports
                }
              }

              list.push(item)
            }
          }

          return list
        }

        /***/
      },

    /***/ 601:
      /*!******************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \******************************************************************/
      /***/ module => {
        'use strict'

        module.exports = function (i) {
          return i[1]
        }

        /***/
      },

    /***/ 392:
      /*!*****************************************************!*\
  !*** ../../node_modules/html-entities/lib/index.js ***!
  \*****************************************************/
      /***/ function (
        __unused_webpack_module,
        exports,
        __webpack_require__,
      ) {
        'use strict'

        var __assign =
          (this && this.__assign) ||
          function () {
            __assign =
              Object.assign ||
              function (t) {
                for (
                  var s, i = 1, n = arguments.length;
                  i < n;
                  i++
                ) {
                  s = arguments[i]
                  for (var p in s)
                    if (
                      Object.prototype.hasOwnProperty.call(s, p)
                    )
                      t[p] = s[p]
                }
                return t
              }
            return __assign.apply(this, arguments)
          }
        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        var named_references_1 = __webpack_require__(
          /*! ./named-references */ 820,
        )
        var numeric_unicode_map_1 = __webpack_require__(
          /*! ./numeric-unicode-map */ 946,
        )
        var surrogate_pairs_1 = __webpack_require__(
          /*! ./surrogate-pairs */ 265,
        )
        var allNamedReferences = __assign(
          __assign({}, named_references_1.namedReferences),
          {all: named_references_1.namedReferences.html5},
        )
        var encodeRegExps = {
          specialChars: /[<>'"&]/g,
          nonAscii:
            /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
          nonAsciiPrintable:
            /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
          extensive:
            /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
        }
        var defaultEncodeOptions = {
          mode: 'specialChars',
          level: 'all',
          numeric: 'decimal',
        }
        /** Encodes all the necessary (specified by `level`) characters in the text */
        function encode(text, _a) {
          var _b = _a === void 0 ? defaultEncodeOptions : _a,
            _c = _b.mode,
            mode = _c === void 0 ? 'specialChars' : _c,
            _d = _b.numeric,
            numeric = _d === void 0 ? 'decimal' : _d,
            _e = _b.level,
            level = _e === void 0 ? 'all' : _e
          if (!text) {
            return ''
          }
          var encodeRegExp = encodeRegExps[mode]
          var references = allNamedReferences[level].characters
          var isHex = numeric === 'hexadecimal'
          encodeRegExp.lastIndex = 0
          var _b = encodeRegExp.exec(text)
          var _c
          if (_b) {
            _c = ''
            var _d = 0
            do {
              if (_d !== _b.index) {
                _c += text.substring(_d, _b.index)
              }
              var _e = _b[0]
              var result_1 = references[_e]
              if (!result_1) {
                var code_1 =
                  _e.length > 1
                    ? surrogate_pairs_1.getCodePoint(_e, 0)
                    : _e.charCodeAt(0)
                result_1 =
                  (isHex
                    ? '&#x' + code_1.toString(16)
                    : '&#' + code_1) + ';'
              }
              _c += result_1
              _d = _b.index + _e.length
            } while ((_b = encodeRegExp.exec(text)))
            if (_d !== text.length) {
              _c += text.substring(_d)
            }
          } else {
            _c = text
          }
          return _c
        }
        exports.encode = encode
        var defaultDecodeOptions = {
          scope: 'body',
          level: 'all',
        }
        var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g
        var attribute =
          /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g
        var baseDecodeRegExps = {
          xml: {
            strict: strict,
            attribute: attribute,
            body: named_references_1.bodyRegExps.xml,
          },
          html4: {
            strict: strict,
            attribute: attribute,
            body: named_references_1.bodyRegExps.html4,
          },
          html5: {
            strict: strict,
            attribute: attribute,
            body: named_references_1.bodyRegExps.html5,
          },
        }
        var decodeRegExps = __assign(
          __assign({}, baseDecodeRegExps),
          {all: baseDecodeRegExps.html5},
        )
        var fromCharCode = String.fromCharCode
        var outOfBoundsChar = fromCharCode(65533)
        var defaultDecodeEntityOptions = {
          level: 'all',
        }
        /** Decodes a single entity */
        function decodeEntity(entity, _a) {
          var _b = (
              _a === void 0 ? defaultDecodeEntityOptions : _a
            ).level,
            level = _b === void 0 ? 'all' : _b
          if (!entity) {
            return ''
          }
          var _b = entity
          var decodeEntityLastChar_1 = entity[entity.length - 1]
          if (false) {
          } else if (false) {
          } else {
            var decodeResultByReference_1 =
              allNamedReferences[level].entities[entity]
            if (decodeResultByReference_1) {
              _b = decodeResultByReference_1
            } else if (entity[0] === '&' && entity[1] === '#') {
              var decodeSecondChar_1 = entity[2]
              var decodeCode_1 =
                decodeSecondChar_1 == 'x' ||
                decodeSecondChar_1 == 'X'
                  ? parseInt(entity.substr(3), 16)
                  : parseInt(entity.substr(2))
              _b =
                decodeCode_1 >= 0x10ffff
                  ? outOfBoundsChar
                  : decodeCode_1 > 65535
                  ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                  : fromCharCode(
                      numeric_unicode_map_1.numericUnicodeMap[
                        decodeCode_1
                      ] || decodeCode_1,
                    )
            }
          }
          return _b
        }
        exports.decodeEntity = decodeEntity
        /** Decodes all entities in the text */
        function decode(text, _a) {
          var decodeSecondChar_1 =
              _a === void 0 ? defaultDecodeOptions : _a,
            decodeCode_1 = decodeSecondChar_1.level,
            level =
              decodeCode_1 === void 0 ? 'all' : decodeCode_1,
            _b = decodeSecondChar_1.scope,
            scope =
              _b === void 0
                ? level === 'xml'
                  ? 'strict'
                  : 'body'
                : _b
          if (!text) {
            return ''
          }
          var decodeRegExp = decodeRegExps[level][scope]
          var references = allNamedReferences[level].entities
          var isAttribute = scope === 'attribute'
          var isStrict = scope === 'strict'
          decodeRegExp.lastIndex = 0
          var replaceMatch_1 = decodeRegExp.exec(text)
          var replaceResult_1
          if (replaceMatch_1) {
            replaceResult_1 = ''
            var replaceLastIndex_1 = 0
            do {
              if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(
                  replaceLastIndex_1,
                  replaceMatch_1.index,
                )
              }
              var replaceInput_1 = replaceMatch_1[0]
              var decodeResult_1 = replaceInput_1
              var decodeEntityLastChar_2 =
                replaceInput_1[replaceInput_1.length - 1]
              if (
                isAttribute &&
                decodeEntityLastChar_2 === '='
              ) {
                decodeResult_1 = replaceInput_1
              } else if (
                isStrict &&
                decodeEntityLastChar_2 !== ';'
              ) {
                decodeResult_1 = replaceInput_1
              } else {
                var decodeResultByReference_2 =
                  references[replaceInput_1]
                if (decodeResultByReference_2) {
                  decodeResult_1 = decodeResultByReference_2
                } else if (
                  replaceInput_1[0] === '&' &&
                  replaceInput_1[1] === '#'
                ) {
                  var decodeSecondChar_2 = replaceInput_1[2]
                  var decodeCode_2 =
                    decodeSecondChar_2 == 'x' ||
                    decodeSecondChar_2 == 'X'
                      ? parseInt(replaceInput_1.substr(3), 16)
                      : parseInt(replaceInput_1.substr(2))
                  decodeResult_1 =
                    decodeCode_2 >= 0x10ffff
                      ? outOfBoundsChar
                      : decodeCode_2 > 65535
                      ? surrogate_pairs_1.fromCodePoint(
                          decodeCode_2,
                        )
                      : fromCharCode(
                          numeric_unicode_map_1
                            .numericUnicodeMap[decodeCode_2] ||
                            decodeCode_2,
                        )
                }
              }
              replaceResult_1 += decodeResult_1
              replaceLastIndex_1 =
                replaceMatch_1.index + replaceInput_1.length
            } while ((replaceMatch_1 = decodeRegExp.exec(text)))
            if (replaceLastIndex_1 !== text.length) {
              replaceResult_1 += text.substring(
                replaceLastIndex_1,
              )
            }
          } else {
            replaceResult_1 = text
          }
          return replaceResult_1
        }
        exports.decode = decode

        /***/
      },

    /***/ 820:
      /*!****************************************************************!*\
  !*** ../../node_modules/html-entities/lib/named-references.js ***!
  \****************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        'use strict'
        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.bodyRegExps = {
          xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
          html4:
            /&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
          html5:
            /&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
        }
        exports.namedReferences = {
          xml: {
            entities: {
              '&lt;': '<',
              '&gt;': '>',
              '&quot;': '"',
              '&apos;': "'",
              '&amp;': '&',
            },
            characters: {
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&apos;',
              '&': '&amp;',
            },
          },
          html4: {
            entities: {
              '&apos;': "'",
              '&nbsp': ' ',
              '&nbsp;': ' ',
              '&iexcl': '¡',
              '&iexcl;': '¡',
              '&cent': '¢',
              '&cent;': '¢',
              '&pound': '£',
              '&pound;': '£',
              '&curren': '¤',
              '&curren;': '¤',
              '&yen': '¥',
              '&yen;': '¥',
              '&brvbar': '¦',
              '&brvbar;': '¦',
              '&sect': '§',
              '&sect;': '§',
              '&uml': '¨',
              '&uml;': '¨',
              '&copy': '©',
              '&copy;': '©',
              '&ordf': 'ª',
              '&ordf;': 'ª',
              '&laquo': '«',
              '&laquo;': '«',
              '&not': '¬',
              '&not;': '¬',
              '&shy': '­',
              '&shy;': '­',
              '&reg': '®',
              '&reg;': '®',
              '&macr': '¯',
              '&macr;': '¯',
              '&deg': '°',
              '&deg;': '°',
              '&plusmn': '±',
              '&plusmn;': '±',
              '&sup2': '²',
              '&sup2;': '²',
              '&sup3': '³',
              '&sup3;': '³',
              '&acute': '´',
              '&acute;': '´',
              '&micro': 'µ',
              '&micro;': 'µ',
              '&para': '¶',
              '&para;': '¶',
              '&middot': '·',
              '&middot;': '·',
              '&cedil': '¸',
              '&cedil;': '¸',
              '&sup1': '¹',
              '&sup1;': '¹',
              '&ordm': 'º',
              '&ordm;': 'º',
              '&raquo': '»',
              '&raquo;': '»',
              '&frac14': '¼',
              '&frac14;': '¼',
              '&frac12': '½',
              '&frac12;': '½',
              '&frac34': '¾',
              '&frac34;': '¾',
              '&iquest': '¿',
              '&iquest;': '¿',
              '&Agrave': 'À',
              '&Agrave;': 'À',
              '&Aacute': 'Á',
              '&Aacute;': 'Á',
              '&Acirc': 'Â',
              '&Acirc;': 'Â',
              '&Atilde': 'Ã',
              '&Atilde;': 'Ã',
              '&Auml': 'Ä',
              '&Auml;': 'Ä',
              '&Aring': 'Å',
              '&Aring;': 'Å',
              '&AElig': 'Æ',
              '&AElig;': 'Æ',
              '&Ccedil': 'Ç',
              '&Ccedil;': 'Ç',
              '&Egrave': 'È',
              '&Egrave;': 'È',
              '&Eacute': 'É',
              '&Eacute;': 'É',
              '&Ecirc': 'Ê',
              '&Ecirc;': 'Ê',
              '&Euml': 'Ë',
              '&Euml;': 'Ë',
              '&Igrave': 'Ì',
              '&Igrave;': 'Ì',
              '&Iacute': 'Í',
              '&Iacute;': 'Í',
              '&Icirc': 'Î',
              '&Icirc;': 'Î',
              '&Iuml': 'Ï',
              '&Iuml;': 'Ï',
              '&ETH': 'Ð',
              '&ETH;': 'Ð',
              '&Ntilde': 'Ñ',
              '&Ntilde;': 'Ñ',
              '&Ograve': 'Ò',
              '&Ograve;': 'Ò',
              '&Oacute': 'Ó',
              '&Oacute;': 'Ó',
              '&Ocirc': 'Ô',
              '&Ocirc;': 'Ô',
              '&Otilde': 'Õ',
              '&Otilde;': 'Õ',
              '&Ouml': 'Ö',
              '&Ouml;': 'Ö',
              '&times': '×',
              '&times;': '×',
              '&Oslash': 'Ø',
              '&Oslash;': 'Ø',
              '&Ugrave': 'Ù',
              '&Ugrave;': 'Ù',
              '&Uacute': 'Ú',
              '&Uacute;': 'Ú',
              '&Ucirc': 'Û',
              '&Ucirc;': 'Û',
              '&Uuml': 'Ü',
              '&Uuml;': 'Ü',
              '&Yacute': 'Ý',
              '&Yacute;': 'Ý',
              '&THORN': 'Þ',
              '&THORN;': 'Þ',
              '&szlig': 'ß',
              '&szlig;': 'ß',
              '&agrave': 'à',
              '&agrave;': 'à',
              '&aacute': 'á',
              '&aacute;': 'á',
              '&acirc': 'â',
              '&acirc;': 'â',
              '&atilde': 'ã',
              '&atilde;': 'ã',
              '&auml': 'ä',
              '&auml;': 'ä',
              '&aring': 'å',
              '&aring;': 'å',
              '&aelig': 'æ',
              '&aelig;': 'æ',
              '&ccedil': 'ç',
              '&ccedil;': 'ç',
              '&egrave': 'è',
              '&egrave;': 'è',
              '&eacute': 'é',
              '&eacute;': 'é',
              '&ecirc': 'ê',
              '&ecirc;': 'ê',
              '&euml': 'ë',
              '&euml;': 'ë',
              '&igrave': 'ì',
              '&igrave;': 'ì',
              '&iacute': 'í',
              '&iacute;': 'í',
              '&icirc': 'î',
              '&icirc;': 'î',
              '&iuml': 'ï',
              '&iuml;': 'ï',
              '&eth': 'ð',
              '&eth;': 'ð',
              '&ntilde': 'ñ',
              '&ntilde;': 'ñ',
              '&ograve': 'ò',
              '&ograve;': 'ò',
              '&oacute': 'ó',
              '&oacute;': 'ó',
              '&ocirc': 'ô',
              '&ocirc;': 'ô',
              '&otilde': 'õ',
              '&otilde;': 'õ',
              '&ouml': 'ö',
              '&ouml;': 'ö',
              '&divide': '÷',
              '&divide;': '÷',
              '&oslash': 'ø',
              '&oslash;': 'ø',
              '&ugrave': 'ù',
              '&ugrave;': 'ù',
              '&uacute': 'ú',
              '&uacute;': 'ú',
              '&ucirc': 'û',
              '&ucirc;': 'û',
              '&uuml': 'ü',
              '&uuml;': 'ü',
              '&yacute': 'ý',
              '&yacute;': 'ý',
              '&thorn': 'þ',
              '&thorn;': 'þ',
              '&yuml': 'ÿ',
              '&yuml;': 'ÿ',
              '&quot': '"',
              '&quot;': '"',
              '&amp': '&',
              '&amp;': '&',
              '&lt': '<',
              '&lt;': '<',
              '&gt': '>',
              '&gt;': '>',
              '&OElig;': 'Œ',
              '&oelig;': 'œ',
              '&Scaron;': 'Š',
              '&scaron;': 'š',
              '&Yuml;': 'Ÿ',
              '&circ;': 'ˆ',
              '&tilde;': '˜',
              '&ensp;': ' ',
              '&emsp;': ' ',
              '&thinsp;': ' ',
              '&zwnj;': '‌',
              '&zwj;': '‍',
              '&lrm;': '‎',
              '&rlm;': '‏',
              '&ndash;': '–',
              '&mdash;': '—',
              '&lsquo;': '‘',
              '&rsquo;': '’',
              '&sbquo;': '‚',
              '&ldquo;': '“',
              '&rdquo;': '”',
              '&bdquo;': '„',
              '&dagger;': '†',
              '&Dagger;': '‡',
              '&permil;': '‰',
              '&lsaquo;': '‹',
              '&rsaquo;': '›',
              '&euro;': '€',
              '&fnof;': 'ƒ',
              '&Alpha;': 'Α',
              '&Beta;': 'Β',
              '&Gamma;': 'Γ',
              '&Delta;': 'Δ',
              '&Epsilon;': 'Ε',
              '&Zeta;': 'Ζ',
              '&Eta;': 'Η',
              '&Theta;': 'Θ',
              '&Iota;': 'Ι',
              '&Kappa;': 'Κ',
              '&Lambda;': 'Λ',
              '&Mu;': 'Μ',
              '&Nu;': 'Ν',
              '&Xi;': 'Ξ',
              '&Omicron;': 'Ο',
              '&Pi;': 'Π',
              '&Rho;': 'Ρ',
              '&Sigma;': 'Σ',
              '&Tau;': 'Τ',
              '&Upsilon;': 'Υ',
              '&Phi;': 'Φ',
              '&Chi;': 'Χ',
              '&Psi;': 'Ψ',
              '&Omega;': 'Ω',
              '&alpha;': 'α',
              '&beta;': 'β',
              '&gamma;': 'γ',
              '&delta;': 'δ',
              '&epsilon;': 'ε',
              '&zeta;': 'ζ',
              '&eta;': 'η',
              '&theta;': 'θ',
              '&iota;': 'ι',
              '&kappa;': 'κ',
              '&lambda;': 'λ',
              '&mu;': 'μ',
              '&nu;': 'ν',
              '&xi;': 'ξ',
              '&omicron;': 'ο',
              '&pi;': 'π',
              '&rho;': 'ρ',
              '&sigmaf;': 'ς',
              '&sigma;': 'σ',
              '&tau;': 'τ',
              '&upsilon;': 'υ',
              '&phi;': 'φ',
              '&chi;': 'χ',
              '&psi;': 'ψ',
              '&omega;': 'ω',
              '&thetasym;': 'ϑ',
              '&upsih;': 'ϒ',
              '&piv;': 'ϖ',
              '&bull;': '•',
              '&hellip;': '…',
              '&prime;': '′',
              '&Prime;': '″',
              '&oline;': '‾',
              '&frasl;': '⁄',
              '&weierp;': '℘',
              '&image;': 'ℑ',
              '&real;': 'ℜ',
              '&trade;': '™',
              '&alefsym;': 'ℵ',
              '&larr;': '←',
              '&uarr;': '↑',
              '&rarr;': '→',
              '&darr;': '↓',
              '&harr;': '↔',
              '&crarr;': '↵',
              '&lArr;': '⇐',
              '&uArr;': '⇑',
              '&rArr;': '⇒',
              '&dArr;': '⇓',
              '&hArr;': '⇔',
              '&forall;': '∀',
              '&part;': '∂',
              '&exist;': '∃',
              '&empty;': '∅',
              '&nabla;': '∇',
              '&isin;': '∈',
              '&notin;': '∉',
              '&ni;': '∋',
              '&prod;': '∏',
              '&sum;': '∑',
              '&minus;': '−',
              '&lowast;': '∗',
              '&radic;': '√',
              '&prop;': '∝',
              '&infin;': '∞',
              '&ang;': '∠',
              '&and;': '∧',
              '&or;': '∨',
              '&cap;': '∩',
              '&cup;': '∪',
              '&int;': '∫',
              '&there4;': '∴',
              '&sim;': '∼',
              '&cong;': '≅',
              '&asymp;': '≈',
              '&ne;': '≠',
              '&equiv;': '≡',
              '&le;': '≤',
              '&ge;': '≥',
              '&sub;': '⊂',
              '&sup;': '⊃',
              '&nsub;': '⊄',
              '&sube;': '⊆',
              '&supe;': '⊇',
              '&oplus;': '⊕',
              '&otimes;': '⊗',
              '&perp;': '⊥',
              '&sdot;': '⋅',
              '&lceil;': '⌈',
              '&rceil;': '⌉',
              '&lfloor;': '⌊',
              '&rfloor;': '⌋',
              '&lang;': '〈',
              '&rang;': '〉',
              '&loz;': '◊',
              '&spades;': '♠',
              '&clubs;': '♣',
              '&hearts;': '♥',
              '&diams;': '♦',
            },
            characters: {
              "'": '&apos;',
              ' ': '&nbsp;',
              '¡': '&iexcl;',
              '¢': '&cent;',
              '£': '&pound;',
              '¤': '&curren;',
              '¥': '&yen;',
              '¦': '&brvbar;',
              '§': '&sect;',
              '¨': '&uml;',
              '©': '&copy;',
              ª: '&ordf;',
              '«': '&laquo;',
              '¬': '&not;',
              '­': '&shy;',
              '®': '&reg;',
              '¯': '&macr;',
              '°': '&deg;',
              '±': '&plusmn;',
              '²': '&sup2;',
              '³': '&sup3;',
              '´': '&acute;',
              µ: '&micro;',
              '¶': '&para;',
              '·': '&middot;',
              '¸': '&cedil;',
              '¹': '&sup1;',
              º: '&ordm;',
              '»': '&raquo;',
              '¼': '&frac14;',
              '½': '&frac12;',
              '¾': '&frac34;',
              '¿': '&iquest;',
              À: '&Agrave;',
              Á: '&Aacute;',
              Â: '&Acirc;',
              Ã: '&Atilde;',
              Ä: '&Auml;',
              Å: '&Aring;',
              Æ: '&AElig;',
              Ç: '&Ccedil;',
              È: '&Egrave;',
              É: '&Eacute;',
              Ê: '&Ecirc;',
              Ë: '&Euml;',
              Ì: '&Igrave;',
              Í: '&Iacute;',
              Î: '&Icirc;',
              Ï: '&Iuml;',
              Ð: '&ETH;',
              Ñ: '&Ntilde;',
              Ò: '&Ograve;',
              Ó: '&Oacute;',
              Ô: '&Ocirc;',
              Õ: '&Otilde;',
              Ö: '&Ouml;',
              '×': '&times;',
              Ø: '&Oslash;',
              Ù: '&Ugrave;',
              Ú: '&Uacute;',
              Û: '&Ucirc;',
              Ü: '&Uuml;',
              Ý: '&Yacute;',
              Þ: '&THORN;',
              ß: '&szlig;',
              à: '&agrave;',
              á: '&aacute;',
              â: '&acirc;',
              ã: '&atilde;',
              ä: '&auml;',
              å: '&aring;',
              æ: '&aelig;',
              ç: '&ccedil;',
              è: '&egrave;',
              é: '&eacute;',
              ê: '&ecirc;',
              ë: '&euml;',
              ì: '&igrave;',
              í: '&iacute;',
              î: '&icirc;',
              ï: '&iuml;',
              ð: '&eth;',
              ñ: '&ntilde;',
              ò: '&ograve;',
              ó: '&oacute;',
              ô: '&ocirc;',
              õ: '&otilde;',
              ö: '&ouml;',
              '÷': '&divide;',
              ø: '&oslash;',
              ù: '&ugrave;',
              ú: '&uacute;',
              û: '&ucirc;',
              ü: '&uuml;',
              ý: '&yacute;',
              þ: '&thorn;',
              ÿ: '&yuml;',
              '"': '&quot;',
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              Œ: '&OElig;',
              œ: '&oelig;',
              Š: '&Scaron;',
              š: '&scaron;',
              Ÿ: '&Yuml;',
              ˆ: '&circ;',
              '˜': '&tilde;',
              ' ': '&ensp;',
              ' ': '&emsp;',
              ' ': '&thinsp;',
              '‌': '&zwnj;',
              '‍': '&zwj;',
              '‎': '&lrm;',
              '‏': '&rlm;',
              '–': '&ndash;',
              '—': '&mdash;',
              '‘': '&lsquo;',
              '’': '&rsquo;',
              '‚': '&sbquo;',
              '“': '&ldquo;',
              '”': '&rdquo;',
              '„': '&bdquo;',
              '†': '&dagger;',
              '‡': '&Dagger;',
              '‰': '&permil;',
              '‹': '&lsaquo;',
              '›': '&rsaquo;',
              '€': '&euro;',
              ƒ: '&fnof;',
              Α: '&Alpha;',
              Β: '&Beta;',
              Γ: '&Gamma;',
              Δ: '&Delta;',
              Ε: '&Epsilon;',
              Ζ: '&Zeta;',
              Η: '&Eta;',
              Θ: '&Theta;',
              Ι: '&Iota;',
              Κ: '&Kappa;',
              Λ: '&Lambda;',
              Μ: '&Mu;',
              Ν: '&Nu;',
              Ξ: '&Xi;',
              Ο: '&Omicron;',
              Π: '&Pi;',
              Ρ: '&Rho;',
              Σ: '&Sigma;',
              Τ: '&Tau;',
              Υ: '&Upsilon;',
              Φ: '&Phi;',
              Χ: '&Chi;',
              Ψ: '&Psi;',
              Ω: '&Omega;',
              α: '&alpha;',
              β: '&beta;',
              γ: '&gamma;',
              δ: '&delta;',
              ε: '&epsilon;',
              ζ: '&zeta;',
              η: '&eta;',
              θ: '&theta;',
              ι: '&iota;',
              κ: '&kappa;',
              λ: '&lambda;',
              μ: '&mu;',
              ν: '&nu;',
              ξ: '&xi;',
              ο: '&omicron;',
              π: '&pi;',
              ρ: '&rho;',
              ς: '&sigmaf;',
              σ: '&sigma;',
              τ: '&tau;',
              υ: '&upsilon;',
              φ: '&phi;',
              χ: '&chi;',
              ψ: '&psi;',
              ω: '&omega;',
              ϑ: '&thetasym;',
              ϒ: '&upsih;',
              ϖ: '&piv;',
              '•': '&bull;',
              '…': '&hellip;',
              '′': '&prime;',
              '″': '&Prime;',
              '‾': '&oline;',
              '⁄': '&frasl;',
              '℘': '&weierp;',
              ℑ: '&image;',
              ℜ: '&real;',
              '™': '&trade;',
              ℵ: '&alefsym;',
              '←': '&larr;',
              '↑': '&uarr;',
              '→': '&rarr;',
              '↓': '&darr;',
              '↔': '&harr;',
              '↵': '&crarr;',
              '⇐': '&lArr;',
              '⇑': '&uArr;',
              '⇒': '&rArr;',
              '⇓': '&dArr;',
              '⇔': '&hArr;',
              '∀': '&forall;',
              '∂': '&part;',
              '∃': '&exist;',
              '∅': '&empty;',
              '∇': '&nabla;',
              '∈': '&isin;',
              '∉': '&notin;',
              '∋': '&ni;',
              '∏': '&prod;',
              '∑': '&sum;',
              '−': '&minus;',
              '∗': '&lowast;',
              '√': '&radic;',
              '∝': '&prop;',
              '∞': '&infin;',
              '∠': '&ang;',
              '∧': '&and;',
              '∨': '&or;',
              '∩': '&cap;',
              '∪': '&cup;',
              '∫': '&int;',
              '∴': '&there4;',
              '∼': '&sim;',
              '≅': '&cong;',
              '≈': '&asymp;',
              '≠': '&ne;',
              '≡': '&equiv;',
              '≤': '&le;',
              '≥': '&ge;',
              '⊂': '&sub;',
              '⊃': '&sup;',
              '⊄': '&nsub;',
              '⊆': '&sube;',
              '⊇': '&supe;',
              '⊕': '&oplus;',
              '⊗': '&otimes;',
              '⊥': '&perp;',
              '⋅': '&sdot;',
              '⌈': '&lceil;',
              '⌉': '&rceil;',
              '⌊': '&lfloor;',
              '⌋': '&rfloor;',
              '〈': '&lang;',
              '〉': '&rang;',
              '◊': '&loz;',
              '♠': '&spades;',
              '♣': '&clubs;',
              '♥': '&hearts;',
              '♦': '&diams;',
            },
          },
          html5: {
            entities: {
              '&AElig': 'Æ',
              '&AElig;': 'Æ',
              '&AMP': '&',
              '&AMP;': '&',
              '&Aacute': 'Á',
              '&Aacute;': 'Á',
              '&Abreve;': 'Ă',
              '&Acirc': 'Â',
              '&Acirc;': 'Â',
              '&Acy;': 'А',
              '&Afr;': '𝔄',
              '&Agrave': 'À',
              '&Agrave;': 'À',
              '&Alpha;': 'Α',
              '&Amacr;': 'Ā',
              '&And;': '⩓',
              '&Aogon;': 'Ą',
              '&Aopf;': '𝔸',
              '&ApplyFunction;': '⁡',
              '&Aring': 'Å',
              '&Aring;': 'Å',
              '&Ascr;': '𝒜',
              '&Assign;': '≔',
              '&Atilde': 'Ã',
              '&Atilde;': 'Ã',
              '&Auml': 'Ä',
              '&Auml;': 'Ä',
              '&Backslash;': '∖',
              '&Barv;': '⫧',
              '&Barwed;': '⌆',
              '&Bcy;': 'Б',
              '&Because;': '∵',
              '&Bernoullis;': 'ℬ',
              '&Beta;': 'Β',
              '&Bfr;': '𝔅',
              '&Bopf;': '𝔹',
              '&Breve;': '˘',
              '&Bscr;': 'ℬ',
              '&Bumpeq;': '≎',
              '&CHcy;': 'Ч',
              '&COPY': '©',
              '&COPY;': '©',
              '&Cacute;': 'Ć',
              '&Cap;': '⋒',
              '&CapitalDifferentialD;': 'ⅅ',
              '&Cayleys;': 'ℭ',
              '&Ccaron;': 'Č',
              '&Ccedil': 'Ç',
              '&Ccedil;': 'Ç',
              '&Ccirc;': 'Ĉ',
              '&Cconint;': '∰',
              '&Cdot;': 'Ċ',
              '&Cedilla;': '¸',
              '&CenterDot;': '·',
              '&Cfr;': 'ℭ',
              '&Chi;': 'Χ',
              '&CircleDot;': '⊙',
              '&CircleMinus;': '⊖',
              '&CirclePlus;': '⊕',
              '&CircleTimes;': '⊗',
              '&ClockwiseContourIntegral;': '∲',
              '&CloseCurlyDoubleQuote;': '”',
              '&CloseCurlyQuote;': '’',
              '&Colon;': '∷',
              '&Colone;': '⩴',
              '&Congruent;': '≡',
              '&Conint;': '∯',
              '&ContourIntegral;': '∮',
              '&Copf;': 'ℂ',
              '&Coproduct;': '∐',
              '&CounterClockwiseContourIntegral;': '∳',
              '&Cross;': '⨯',
              '&Cscr;': '𝒞',
              '&Cup;': '⋓',
              '&CupCap;': '≍',
              '&DD;': 'ⅅ',
              '&DDotrahd;': '⤑',
              '&DJcy;': 'Ђ',
              '&DScy;': 'Ѕ',
              '&DZcy;': 'Џ',
              '&Dagger;': '‡',
              '&Darr;': '↡',
              '&Dashv;': '⫤',
              '&Dcaron;': 'Ď',
              '&Dcy;': 'Д',
              '&Del;': '∇',
              '&Delta;': 'Δ',
              '&Dfr;': '𝔇',
              '&DiacriticalAcute;': '´',
              '&DiacriticalDot;': '˙',
              '&DiacriticalDoubleAcute;': '˝',
              '&DiacriticalGrave;': '`',
              '&DiacriticalTilde;': '˜',
              '&Diamond;': '⋄',
              '&DifferentialD;': 'ⅆ',
              '&Dopf;': '𝔻',
              '&Dot;': '¨',
              '&DotDot;': '⃜',
              '&DotEqual;': '≐',
              '&DoubleContourIntegral;': '∯',
              '&DoubleDot;': '¨',
              '&DoubleDownArrow;': '⇓',
              '&DoubleLeftArrow;': '⇐',
              '&DoubleLeftRightArrow;': '⇔',
              '&DoubleLeftTee;': '⫤',
              '&DoubleLongLeftArrow;': '⟸',
              '&DoubleLongLeftRightArrow;': '⟺',
              '&DoubleLongRightArrow;': '⟹',
              '&DoubleRightArrow;': '⇒',
              '&DoubleRightTee;': '⊨',
              '&DoubleUpArrow;': '⇑',
              '&DoubleUpDownArrow;': '⇕',
              '&DoubleVerticalBar;': '∥',
              '&DownArrow;': '↓',
              '&DownArrowBar;': '⤓',
              '&DownArrowUpArrow;': '⇵',
              '&DownBreve;': '̑',
              '&DownLeftRightVector;': '⥐',
              '&DownLeftTeeVector;': '⥞',
              '&DownLeftVector;': '↽',
              '&DownLeftVectorBar;': '⥖',
              '&DownRightTeeVector;': '⥟',
              '&DownRightVector;': '⇁',
              '&DownRightVectorBar;': '⥗',
              '&DownTee;': '⊤',
              '&DownTeeArrow;': '↧',
              '&Downarrow;': '⇓',
              '&Dscr;': '𝒟',
              '&Dstrok;': 'Đ',
              '&ENG;': 'Ŋ',
              '&ETH': 'Ð',
              '&ETH;': 'Ð',
              '&Eacute': 'É',
              '&Eacute;': 'É',
              '&Ecaron;': 'Ě',
              '&Ecirc': 'Ê',
              '&Ecirc;': 'Ê',
              '&Ecy;': 'Э',
              '&Edot;': 'Ė',
              '&Efr;': '𝔈',
              '&Egrave': 'È',
              '&Egrave;': 'È',
              '&Element;': '∈',
              '&Emacr;': 'Ē',
              '&EmptySmallSquare;': '◻',
              '&EmptyVerySmallSquare;': '▫',
              '&Eogon;': 'Ę',
              '&Eopf;': '𝔼',
              '&Epsilon;': 'Ε',
              '&Equal;': '⩵',
              '&EqualTilde;': '≂',
              '&Equilibrium;': '⇌',
              '&Escr;': 'ℰ',
              '&Esim;': '⩳',
              '&Eta;': 'Η',
              '&Euml': 'Ë',
              '&Euml;': 'Ë',
              '&Exists;': '∃',
              '&ExponentialE;': 'ⅇ',
              '&Fcy;': 'Ф',
              '&Ffr;': '𝔉',
              '&FilledSmallSquare;': '◼',
              '&FilledVerySmallSquare;': '▪',
              '&Fopf;': '𝔽',
              '&ForAll;': '∀',
              '&Fouriertrf;': 'ℱ',
              '&Fscr;': 'ℱ',
              '&GJcy;': 'Ѓ',
              '&GT': '>',
              '&GT;': '>',
              '&Gamma;': 'Γ',
              '&Gammad;': 'Ϝ',
              '&Gbreve;': 'Ğ',
              '&Gcedil;': 'Ģ',
              '&Gcirc;': 'Ĝ',
              '&Gcy;': 'Г',
              '&Gdot;': 'Ġ',
              '&Gfr;': '𝔊',
              '&Gg;': '⋙',
              '&Gopf;': '𝔾',
              '&GreaterEqual;': '≥',
              '&GreaterEqualLess;': '⋛',
              '&GreaterFullEqual;': '≧',
              '&GreaterGreater;': '⪢',
              '&GreaterLess;': '≷',
              '&GreaterSlantEqual;': '⩾',
              '&GreaterTilde;': '≳',
              '&Gscr;': '𝒢',
              '&Gt;': '≫',
              '&HARDcy;': 'Ъ',
              '&Hacek;': 'ˇ',
              '&Hat;': '^',
              '&Hcirc;': 'Ĥ',
              '&Hfr;': 'ℌ',
              '&HilbertSpace;': 'ℋ',
              '&Hopf;': 'ℍ',
              '&HorizontalLine;': '─',
              '&Hscr;': 'ℋ',
              '&Hstrok;': 'Ħ',
              '&HumpDownHump;': '≎',
              '&HumpEqual;': '≏',
              '&IEcy;': 'Е',
              '&IJlig;': 'Ĳ',
              '&IOcy;': 'Ё',
              '&Iacute': 'Í',
              '&Iacute;': 'Í',
              '&Icirc': 'Î',
              '&Icirc;': 'Î',
              '&Icy;': 'И',
              '&Idot;': 'İ',
              '&Ifr;': 'ℑ',
              '&Igrave': 'Ì',
              '&Igrave;': 'Ì',
              '&Im;': 'ℑ',
              '&Imacr;': 'Ī',
              '&ImaginaryI;': 'ⅈ',
              '&Implies;': '⇒',
              '&Int;': '∬',
              '&Integral;': '∫',
              '&Intersection;': '⋂',
              '&InvisibleComma;': '⁣',
              '&InvisibleTimes;': '⁢',
              '&Iogon;': 'Į',
              '&Iopf;': '𝕀',
              '&Iota;': 'Ι',
              '&Iscr;': 'ℐ',
              '&Itilde;': 'Ĩ',
              '&Iukcy;': 'І',
              '&Iuml': 'Ï',
              '&Iuml;': 'Ï',
              '&Jcirc;': 'Ĵ',
              '&Jcy;': 'Й',
              '&Jfr;': '𝔍',
              '&Jopf;': '𝕁',
              '&Jscr;': '𝒥',
              '&Jsercy;': 'Ј',
              '&Jukcy;': 'Є',
              '&KHcy;': 'Х',
              '&KJcy;': 'Ќ',
              '&Kappa;': 'Κ',
              '&Kcedil;': 'Ķ',
              '&Kcy;': 'К',
              '&Kfr;': '𝔎',
              '&Kopf;': '𝕂',
              '&Kscr;': '𝒦',
              '&LJcy;': 'Љ',
              '&LT': '<',
              '&LT;': '<',
              '&Lacute;': 'Ĺ',
              '&Lambda;': 'Λ',
              '&Lang;': '⟪',
              '&Laplacetrf;': 'ℒ',
              '&Larr;': '↞',
              '&Lcaron;': 'Ľ',
              '&Lcedil;': 'Ļ',
              '&Lcy;': 'Л',
              '&LeftAngleBracket;': '⟨',
              '&LeftArrow;': '←',
              '&LeftArrowBar;': '⇤',
              '&LeftArrowRightArrow;': '⇆',
              '&LeftCeiling;': '⌈',
              '&LeftDoubleBracket;': '⟦',
              '&LeftDownTeeVector;': '⥡',
              '&LeftDownVector;': '⇃',
              '&LeftDownVectorBar;': '⥙',
              '&LeftFloor;': '⌊',
              '&LeftRightArrow;': '↔',
              '&LeftRightVector;': '⥎',
              '&LeftTee;': '⊣',
              '&LeftTeeArrow;': '↤',
              '&LeftTeeVector;': '⥚',
              '&LeftTriangle;': '⊲',
              '&LeftTriangleBar;': '⧏',
              '&LeftTriangleEqual;': '⊴',
              '&LeftUpDownVector;': '⥑',
              '&LeftUpTeeVector;': '⥠',
              '&LeftUpVector;': '↿',
              '&LeftUpVectorBar;': '⥘',
              '&LeftVector;': '↼',
              '&LeftVectorBar;': '⥒',
              '&Leftarrow;': '⇐',
              '&Leftrightarrow;': '⇔',
              '&LessEqualGreater;': '⋚',
              '&LessFullEqual;': '≦',
              '&LessGreater;': '≶',
              '&LessLess;': '⪡',
              '&LessSlantEqual;': '⩽',
              '&LessTilde;': '≲',
              '&Lfr;': '𝔏',
              '&Ll;': '⋘',
              '&Lleftarrow;': '⇚',
              '&Lmidot;': 'Ŀ',
              '&LongLeftArrow;': '⟵',
              '&LongLeftRightArrow;': '⟷',
              '&LongRightArrow;': '⟶',
              '&Longleftarrow;': '⟸',
              '&Longleftrightarrow;': '⟺',
              '&Longrightarrow;': '⟹',
              '&Lopf;': '𝕃',
              '&LowerLeftArrow;': '↙',
              '&LowerRightArrow;': '↘',
              '&Lscr;': 'ℒ',
              '&Lsh;': '↰',
              '&Lstrok;': 'Ł',
              '&Lt;': '≪',
              '&Map;': '⤅',
              '&Mcy;': 'М',
              '&MediumSpace;': ' ',
              '&Mellintrf;': 'ℳ',
              '&Mfr;': '𝔐',
              '&MinusPlus;': '∓',
              '&Mopf;': '𝕄',
              '&Mscr;': 'ℳ',
              '&Mu;': 'Μ',
              '&NJcy;': 'Њ',
              '&Nacute;': 'Ń',
              '&Ncaron;': 'Ň',
              '&Ncedil;': 'Ņ',
              '&Ncy;': 'Н',
              '&NegativeMediumSpace;': '​',
              '&NegativeThickSpace;': '​',
              '&NegativeThinSpace;': '​',
              '&NegativeVeryThinSpace;': '​',
              '&NestedGreaterGreater;': '≫',
              '&NestedLessLess;': '≪',
              '&NewLine;': '\n',
              '&Nfr;': '𝔑',
              '&NoBreak;': '⁠',
              '&NonBreakingSpace;': ' ',
              '&Nopf;': 'ℕ',
              '&Not;': '⫬',
              '&NotCongruent;': '≢',
              '&NotCupCap;': '≭',
              '&NotDoubleVerticalBar;': '∦',
              '&NotElement;': '∉',
              '&NotEqual;': '≠',
              '&NotEqualTilde;': '≂̸',
              '&NotExists;': '∄',
              '&NotGreater;': '≯',
              '&NotGreaterEqual;': '≱',
              '&NotGreaterFullEqual;': '≧̸',
              '&NotGreaterGreater;': '≫̸',
              '&NotGreaterLess;': '≹',
              '&NotGreaterSlantEqual;': '⩾̸',
              '&NotGreaterTilde;': '≵',
              '&NotHumpDownHump;': '≎̸',
              '&NotHumpEqual;': '≏̸',
              '&NotLeftTriangle;': '⋪',
              '&NotLeftTriangleBar;': '⧏̸',
              '&NotLeftTriangleEqual;': '⋬',
              '&NotLess;': '≮',
              '&NotLessEqual;': '≰',
              '&NotLessGreater;': '≸',
              '&NotLessLess;': '≪̸',
              '&NotLessSlantEqual;': '⩽̸',
              '&NotLessTilde;': '≴',
              '&NotNestedGreaterGreater;': '⪢̸',
              '&NotNestedLessLess;': '⪡̸',
              '&NotPrecedes;': '⊀',
              '&NotPrecedesEqual;': '⪯̸',
              '&NotPrecedesSlantEqual;': '⋠',
              '&NotReverseElement;': '∌',
              '&NotRightTriangle;': '⋫',
              '&NotRightTriangleBar;': '⧐̸',
              '&NotRightTriangleEqual;': '⋭',
              '&NotSquareSubset;': '⊏̸',
              '&NotSquareSubsetEqual;': '⋢',
              '&NotSquareSuperset;': '⊐̸',
              '&NotSquareSupersetEqual;': '⋣',
              '&NotSubset;': '⊂⃒',
              '&NotSubsetEqual;': '⊈',
              '&NotSucceeds;': '⊁',
              '&NotSucceedsEqual;': '⪰̸',
              '&NotSucceedsSlantEqual;': '⋡',
              '&NotSucceedsTilde;': '≿̸',
              '&NotSuperset;': '⊃⃒',
              '&NotSupersetEqual;': '⊉',
              '&NotTilde;': '≁',
              '&NotTildeEqual;': '≄',
              '&NotTildeFullEqual;': '≇',
              '&NotTildeTilde;': '≉',
              '&NotVerticalBar;': '∤',
              '&Nscr;': '𝒩',
              '&Ntilde': 'Ñ',
              '&Ntilde;': 'Ñ',
              '&Nu;': 'Ν',
              '&OElig;': 'Œ',
              '&Oacute': 'Ó',
              '&Oacute;': 'Ó',
              '&Ocirc': 'Ô',
              '&Ocirc;': 'Ô',
              '&Ocy;': 'О',
              '&Odblac;': 'Ő',
              '&Ofr;': '𝔒',
              '&Ograve': 'Ò',
              '&Ograve;': 'Ò',
              '&Omacr;': 'Ō',
              '&Omega;': 'Ω',
              '&Omicron;': 'Ο',
              '&Oopf;': '𝕆',
              '&OpenCurlyDoubleQuote;': '“',
              '&OpenCurlyQuote;': '‘',
              '&Or;': '⩔',
              '&Oscr;': '𝒪',
              '&Oslash': 'Ø',
              '&Oslash;': 'Ø',
              '&Otilde': 'Õ',
              '&Otilde;': 'Õ',
              '&Otimes;': '⨷',
              '&Ouml': 'Ö',
              '&Ouml;': 'Ö',
              '&OverBar;': '‾',
              '&OverBrace;': '⏞',
              '&OverBracket;': '⎴',
              '&OverParenthesis;': '⏜',
              '&PartialD;': '∂',
              '&Pcy;': 'П',
              '&Pfr;': '𝔓',
              '&Phi;': 'Φ',
              '&Pi;': 'Π',
              '&PlusMinus;': '±',
              '&Poincareplane;': 'ℌ',
              '&Popf;': 'ℙ',
              '&Pr;': '⪻',
              '&Precedes;': '≺',
              '&PrecedesEqual;': '⪯',
              '&PrecedesSlantEqual;': '≼',
              '&PrecedesTilde;': '≾',
              '&Prime;': '″',
              '&Product;': '∏',
              '&Proportion;': '∷',
              '&Proportional;': '∝',
              '&Pscr;': '𝒫',
              '&Psi;': 'Ψ',
              '&QUOT': '"',
              '&QUOT;': '"',
              '&Qfr;': '𝔔',
              '&Qopf;': 'ℚ',
              '&Qscr;': '𝒬',
              '&RBarr;': '⤐',
              '&REG': '®',
              '&REG;': '®',
              '&Racute;': 'Ŕ',
              '&Rang;': '⟫',
              '&Rarr;': '↠',
              '&Rarrtl;': '⤖',
              '&Rcaron;': 'Ř',
              '&Rcedil;': 'Ŗ',
              '&Rcy;': 'Р',
              '&Re;': 'ℜ',
              '&ReverseElement;': '∋',
              '&ReverseEquilibrium;': '⇋',
              '&ReverseUpEquilibrium;': '⥯',
              '&Rfr;': 'ℜ',
              '&Rho;': 'Ρ',
              '&RightAngleBracket;': '⟩',
              '&RightArrow;': '→',
              '&RightArrowBar;': '⇥',
              '&RightArrowLeftArrow;': '⇄',
              '&RightCeiling;': '⌉',
              '&RightDoubleBracket;': '⟧',
              '&RightDownTeeVector;': '⥝',
              '&RightDownVector;': '⇂',
              '&RightDownVectorBar;': '⥕',
              '&RightFloor;': '⌋',
              '&RightTee;': '⊢',
              '&RightTeeArrow;': '↦',
              '&RightTeeVector;': '⥛',
              '&RightTriangle;': '⊳',
              '&RightTriangleBar;': '⧐',
              '&RightTriangleEqual;': '⊵',
              '&RightUpDownVector;': '⥏',
              '&RightUpTeeVector;': '⥜',
              '&RightUpVector;': '↾',
              '&RightUpVectorBar;': '⥔',
              '&RightVector;': '⇀',
              '&RightVectorBar;': '⥓',
              '&Rightarrow;': '⇒',
              '&Ropf;': 'ℝ',
              '&RoundImplies;': '⥰',
              '&Rrightarrow;': '⇛',
              '&Rscr;': 'ℛ',
              '&Rsh;': '↱',
              '&RuleDelayed;': '⧴',
              '&SHCHcy;': 'Щ',
              '&SHcy;': 'Ш',
              '&SOFTcy;': 'Ь',
              '&Sacute;': 'Ś',
              '&Sc;': '⪼',
              '&Scaron;': 'Š',
              '&Scedil;': 'Ş',
              '&Scirc;': 'Ŝ',
              '&Scy;': 'С',
              '&Sfr;': '𝔖',
              '&ShortDownArrow;': '↓',
              '&ShortLeftArrow;': '←',
              '&ShortRightArrow;': '→',
              '&ShortUpArrow;': '↑',
              '&Sigma;': 'Σ',
              '&SmallCircle;': '∘',
              '&Sopf;': '𝕊',
              '&Sqrt;': '√',
              '&Square;': '□',
              '&SquareIntersection;': '⊓',
              '&SquareSubset;': '⊏',
              '&SquareSubsetEqual;': '⊑',
              '&SquareSuperset;': '⊐',
              '&SquareSupersetEqual;': '⊒',
              '&SquareUnion;': '⊔',
              '&Sscr;': '𝒮',
              '&Star;': '⋆',
              '&Sub;': '⋐',
              '&Subset;': '⋐',
              '&SubsetEqual;': '⊆',
              '&Succeeds;': '≻',
              '&SucceedsEqual;': '⪰',
              '&SucceedsSlantEqual;': '≽',
              '&SucceedsTilde;': '≿',
              '&SuchThat;': '∋',
              '&Sum;': '∑',
              '&Sup;': '⋑',
              '&Superset;': '⊃',
              '&SupersetEqual;': '⊇',
              '&Supset;': '⋑',
              '&THORN': 'Þ',
              '&THORN;': 'Þ',
              '&TRADE;': '™',
              '&TSHcy;': 'Ћ',
              '&TScy;': 'Ц',
              '&Tab;': '\t',
              '&Tau;': 'Τ',
              '&Tcaron;': 'Ť',
              '&Tcedil;': 'Ţ',
              '&Tcy;': 'Т',
              '&Tfr;': '𝔗',
              '&Therefore;': '∴',
              '&Theta;': 'Θ',
              '&ThickSpace;': '  ',
              '&ThinSpace;': ' ',
              '&Tilde;': '∼',
              '&TildeEqual;': '≃',
              '&TildeFullEqual;': '≅',
              '&TildeTilde;': '≈',
              '&Topf;': '𝕋',
              '&TripleDot;': '⃛',
              '&Tscr;': '𝒯',
              '&Tstrok;': 'Ŧ',
              '&Uacute': 'Ú',
              '&Uacute;': 'Ú',
              '&Uarr;': '↟',
              '&Uarrocir;': '⥉',
              '&Ubrcy;': 'Ў',
              '&Ubreve;': 'Ŭ',
              '&Ucirc': 'Û',
              '&Ucirc;': 'Û',
              '&Ucy;': 'У',
              '&Udblac;': 'Ű',
              '&Ufr;': '𝔘',
              '&Ugrave': 'Ù',
              '&Ugrave;': 'Ù',
              '&Umacr;': 'Ū',
              '&UnderBar;': '_',
              '&UnderBrace;': '⏟',
              '&UnderBracket;': '⎵',
              '&UnderParenthesis;': '⏝',
              '&Union;': '⋃',
              '&UnionPlus;': '⊎',
              '&Uogon;': 'Ų',
              '&Uopf;': '𝕌',
              '&UpArrow;': '↑',
              '&UpArrowBar;': '⤒',
              '&UpArrowDownArrow;': '⇅',
              '&UpDownArrow;': '↕',
              '&UpEquilibrium;': '⥮',
              '&UpTee;': '⊥',
              '&UpTeeArrow;': '↥',
              '&Uparrow;': '⇑',
              '&Updownarrow;': '⇕',
              '&UpperLeftArrow;': '↖',
              '&UpperRightArrow;': '↗',
              '&Upsi;': 'ϒ',
              '&Upsilon;': 'Υ',
              '&Uring;': 'Ů',
              '&Uscr;': '𝒰',
              '&Utilde;': 'Ũ',
              '&Uuml': 'Ü',
              '&Uuml;': 'Ü',
              '&VDash;': '⊫',
              '&Vbar;': '⫫',
              '&Vcy;': 'В',
              '&Vdash;': '⊩',
              '&Vdashl;': '⫦',
              '&Vee;': '⋁',
              '&Verbar;': '‖',
              '&Vert;': '‖',
              '&VerticalBar;': '∣',
              '&VerticalLine;': '|',
              '&VerticalSeparator;': '❘',
              '&VerticalTilde;': '≀',
              '&VeryThinSpace;': ' ',
              '&Vfr;': '𝔙',
              '&Vopf;': '𝕍',
              '&Vscr;': '𝒱',
              '&Vvdash;': '⊪',
              '&Wcirc;': 'Ŵ',
              '&Wedge;': '⋀',
              '&Wfr;': '𝔚',
              '&Wopf;': '𝕎',
              '&Wscr;': '𝒲',
              '&Xfr;': '𝔛',
              '&Xi;': 'Ξ',
              '&Xopf;': '𝕏',
              '&Xscr;': '𝒳',
              '&YAcy;': 'Я',
              '&YIcy;': 'Ї',
              '&YUcy;': 'Ю',
              '&Yacute': 'Ý',
              '&Yacute;': 'Ý',
              '&Ycirc;': 'Ŷ',
              '&Ycy;': 'Ы',
              '&Yfr;': '𝔜',
              '&Yopf;': '𝕐',
              '&Yscr;': '𝒴',
              '&Yuml;': 'Ÿ',
              '&ZHcy;': 'Ж',
              '&Zacute;': 'Ź',
              '&Zcaron;': 'Ž',
              '&Zcy;': 'З',
              '&Zdot;': 'Ż',
              '&ZeroWidthSpace;': '​',
              '&Zeta;': 'Ζ',
              '&Zfr;': 'ℨ',
              '&Zopf;': 'ℤ',
              '&Zscr;': '𝒵',
              '&aacute': 'á',
              '&aacute;': 'á',
              '&abreve;': 'ă',
              '&ac;': '∾',
              '&acE;': '∾̳',
              '&acd;': '∿',
              '&acirc': 'â',
              '&acirc;': 'â',
              '&acute': '´',
              '&acute;': '´',
              '&acy;': 'а',
              '&aelig': 'æ',
              '&aelig;': 'æ',
              '&af;': '⁡',
              '&afr;': '𝔞',
              '&agrave': 'à',
              '&agrave;': 'à',
              '&alefsym;': 'ℵ',
              '&aleph;': 'ℵ',
              '&alpha;': 'α',
              '&amacr;': 'ā',
              '&amalg;': '⨿',
              '&amp': '&',
              '&amp;': '&',
              '&and;': '∧',
              '&andand;': '⩕',
              '&andd;': '⩜',
              '&andslope;': '⩘',
              '&andv;': '⩚',
              '&ang;': '∠',
              '&ange;': '⦤',
              '&angle;': '∠',
              '&angmsd;': '∡',
              '&angmsdaa;': '⦨',
              '&angmsdab;': '⦩',
              '&angmsdac;': '⦪',
              '&angmsdad;': '⦫',
              '&angmsdae;': '⦬',
              '&angmsdaf;': '⦭',
              '&angmsdag;': '⦮',
              '&angmsdah;': '⦯',
              '&angrt;': '∟',
              '&angrtvb;': '⊾',
              '&angrtvbd;': '⦝',
              '&angsph;': '∢',
              '&angst;': 'Å',
              '&angzarr;': '⍼',
              '&aogon;': 'ą',
              '&aopf;': '𝕒',
              '&ap;': '≈',
              '&apE;': '⩰',
              '&apacir;': '⩯',
              '&ape;': '≊',
              '&apid;': '≋',
              '&apos;': "'",
              '&approx;': '≈',
              '&approxeq;': '≊',
              '&aring': 'å',
              '&aring;': 'å',
              '&ascr;': '𝒶',
              '&ast;': '*',
              '&asymp;': '≈',
              '&asympeq;': '≍',
              '&atilde': 'ã',
              '&atilde;': 'ã',
              '&auml': 'ä',
              '&auml;': 'ä',
              '&awconint;': '∳',
              '&awint;': '⨑',
              '&bNot;': '⫭',
              '&backcong;': '≌',
              '&backepsilon;': '϶',
              '&backprime;': '‵',
              '&backsim;': '∽',
              '&backsimeq;': '⋍',
              '&barvee;': '⊽',
              '&barwed;': '⌅',
              '&barwedge;': '⌅',
              '&bbrk;': '⎵',
              '&bbrktbrk;': '⎶',
              '&bcong;': '≌',
              '&bcy;': 'б',
              '&bdquo;': '„',
              '&becaus;': '∵',
              '&because;': '∵',
              '&bemptyv;': '⦰',
              '&bepsi;': '϶',
              '&bernou;': 'ℬ',
              '&beta;': 'β',
              '&beth;': 'ℶ',
              '&between;': '≬',
              '&bfr;': '𝔟',
              '&bigcap;': '⋂',
              '&bigcirc;': '◯',
              '&bigcup;': '⋃',
              '&bigodot;': '⨀',
              '&bigoplus;': '⨁',
              '&bigotimes;': '⨂',
              '&bigsqcup;': '⨆',
              '&bigstar;': '★',
              '&bigtriangledown;': '▽',
              '&bigtriangleup;': '△',
              '&biguplus;': '⨄',
              '&bigvee;': '⋁',
              '&bigwedge;': '⋀',
              '&bkarow;': '⤍',
              '&blacklozenge;': '⧫',
              '&blacksquare;': '▪',
              '&blacktriangle;': '▴',
              '&blacktriangledown;': '▾',
              '&blacktriangleleft;': '◂',
              '&blacktriangleright;': '▸',
              '&blank;': '␣',
              '&blk12;': '▒',
              '&blk14;': '░',
              '&blk34;': '▓',
              '&block;': '█',
              '&bne;': '=⃥',
              '&bnequiv;': '≡⃥',
              '&bnot;': '⌐',
              '&bopf;': '𝕓',
              '&bot;': '⊥',
              '&bottom;': '⊥',
              '&bowtie;': '⋈',
              '&boxDL;': '╗',
              '&boxDR;': '╔',
              '&boxDl;': '╖',
              '&boxDr;': '╓',
              '&boxH;': '═',
              '&boxHD;': '╦',
              '&boxHU;': '╩',
              '&boxHd;': '╤',
              '&boxHu;': '╧',
              '&boxUL;': '╝',
              '&boxUR;': '╚',
              '&boxUl;': '╜',
              '&boxUr;': '╙',
              '&boxV;': '║',
              '&boxVH;': '╬',
              '&boxVL;': '╣',
              '&boxVR;': '╠',
              '&boxVh;': '╫',
              '&boxVl;': '╢',
              '&boxVr;': '╟',
              '&boxbox;': '⧉',
              '&boxdL;': '╕',
              '&boxdR;': '╒',
              '&boxdl;': '┐',
              '&boxdr;': '┌',
              '&boxh;': '─',
              '&boxhD;': '╥',
              '&boxhU;': '╨',
              '&boxhd;': '┬',
              '&boxhu;': '┴',
              '&boxminus;': '⊟',
              '&boxplus;': '⊞',
              '&boxtimes;': '⊠',
              '&boxuL;': '╛',
              '&boxuR;': '╘',
              '&boxul;': '┘',
              '&boxur;': '└',
              '&boxv;': '│',
              '&boxvH;': '╪',
              '&boxvL;': '╡',
              '&boxvR;': '╞',
              '&boxvh;': '┼',
              '&boxvl;': '┤',
              '&boxvr;': '├',
              '&bprime;': '‵',
              '&breve;': '˘',
              '&brvbar': '¦',
              '&brvbar;': '¦',
              '&bscr;': '𝒷',
              '&bsemi;': '⁏',
              '&bsim;': '∽',
              '&bsime;': '⋍',
              '&bsol;': '\\',
              '&bsolb;': '⧅',
              '&bsolhsub;': '⟈',
              '&bull;': '•',
              '&bullet;': '•',
              '&bump;': '≎',
              '&bumpE;': '⪮',
              '&bumpe;': '≏',
              '&bumpeq;': '≏',
              '&cacute;': 'ć',
              '&cap;': '∩',
              '&capand;': '⩄',
              '&capbrcup;': '⩉',
              '&capcap;': '⩋',
              '&capcup;': '⩇',
              '&capdot;': '⩀',
              '&caps;': '∩︀',
              '&caret;': '⁁',
              '&caron;': 'ˇ',
              '&ccaps;': '⩍',
              '&ccaron;': 'č',
              '&ccedil': 'ç',
              '&ccedil;': 'ç',
              '&ccirc;': 'ĉ',
              '&ccups;': '⩌',
              '&ccupssm;': '⩐',
              '&cdot;': 'ċ',
              '&cedil': '¸',
              '&cedil;': '¸',
              '&cemptyv;': '⦲',
              '&cent': '¢',
              '&cent;': '¢',
              '&centerdot;': '·',
              '&cfr;': '𝔠',
              '&chcy;': 'ч',
              '&check;': '✓',
              '&checkmark;': '✓',
              '&chi;': 'χ',
              '&cir;': '○',
              '&cirE;': '⧃',
              '&circ;': 'ˆ',
              '&circeq;': '≗',
              '&circlearrowleft;': '↺',
              '&circlearrowright;': '↻',
              '&circledR;': '®',
              '&circledS;': 'Ⓢ',
              '&circledast;': '⊛',
              '&circledcirc;': '⊚',
              '&circleddash;': '⊝',
              '&cire;': '≗',
              '&cirfnint;': '⨐',
              '&cirmid;': '⫯',
              '&cirscir;': '⧂',
              '&clubs;': '♣',
              '&clubsuit;': '♣',
              '&colon;': ':',
              '&colone;': '≔',
              '&coloneq;': '≔',
              '&comma;': ',',
              '&commat;': '@',
              '&comp;': '∁',
              '&compfn;': '∘',
              '&complement;': '∁',
              '&complexes;': 'ℂ',
              '&cong;': '≅',
              '&congdot;': '⩭',
              '&conint;': '∮',
              '&copf;': '𝕔',
              '&coprod;': '∐',
              '&copy': '©',
              '&copy;': '©',
              '&copysr;': '℗',
              '&crarr;': '↵',
              '&cross;': '✗',
              '&cscr;': '𝒸',
              '&csub;': '⫏',
              '&csube;': '⫑',
              '&csup;': '⫐',
              '&csupe;': '⫒',
              '&ctdot;': '⋯',
              '&cudarrl;': '⤸',
              '&cudarrr;': '⤵',
              '&cuepr;': '⋞',
              '&cuesc;': '⋟',
              '&cularr;': '↶',
              '&cularrp;': '⤽',
              '&cup;': '∪',
              '&cupbrcap;': '⩈',
              '&cupcap;': '⩆',
              '&cupcup;': '⩊',
              '&cupdot;': '⊍',
              '&cupor;': '⩅',
              '&cups;': '∪︀',
              '&curarr;': '↷',
              '&curarrm;': '⤼',
              '&curlyeqprec;': '⋞',
              '&curlyeqsucc;': '⋟',
              '&curlyvee;': '⋎',
              '&curlywedge;': '⋏',
              '&curren': '¤',
              '&curren;': '¤',
              '&curvearrowleft;': '↶',
              '&curvearrowright;': '↷',
              '&cuvee;': '⋎',
              '&cuwed;': '⋏',
              '&cwconint;': '∲',
              '&cwint;': '∱',
              '&cylcty;': '⌭',
              '&dArr;': '⇓',
              '&dHar;': '⥥',
              '&dagger;': '†',
              '&daleth;': 'ℸ',
              '&darr;': '↓',
              '&dash;': '‐',
              '&dashv;': '⊣',
              '&dbkarow;': '⤏',
              '&dblac;': '˝',
              '&dcaron;': 'ď',
              '&dcy;': 'д',
              '&dd;': 'ⅆ',
              '&ddagger;': '‡',
              '&ddarr;': '⇊',
              '&ddotseq;': '⩷',
              '&deg': '°',
              '&deg;': '°',
              '&delta;': 'δ',
              '&demptyv;': '⦱',
              '&dfisht;': '⥿',
              '&dfr;': '𝔡',
              '&dharl;': '⇃',
              '&dharr;': '⇂',
              '&diam;': '⋄',
              '&diamond;': '⋄',
              '&diamondsuit;': '♦',
              '&diams;': '♦',
              '&die;': '¨',
              '&digamma;': 'ϝ',
              '&disin;': '⋲',
              '&div;': '÷',
              '&divide': '÷',
              '&divide;': '÷',
              '&divideontimes;': '⋇',
              '&divonx;': '⋇',
              '&djcy;': 'ђ',
              '&dlcorn;': '⌞',
              '&dlcrop;': '⌍',
              '&dollar;': '$',
              '&dopf;': '𝕕',
              '&dot;': '˙',
              '&doteq;': '≐',
              '&doteqdot;': '≑',
              '&dotminus;': '∸',
              '&dotplus;': '∔',
              '&dotsquare;': '⊡',
              '&doublebarwedge;': '⌆',
              '&downarrow;': '↓',
              '&downdownarrows;': '⇊',
              '&downharpoonleft;': '⇃',
              '&downharpoonright;': '⇂',
              '&drbkarow;': '⤐',
              '&drcorn;': '⌟',
              '&drcrop;': '⌌',
              '&dscr;': '𝒹',
              '&dscy;': 'ѕ',
              '&dsol;': '⧶',
              '&dstrok;': 'đ',
              '&dtdot;': '⋱',
              '&dtri;': '▿',
              '&dtrif;': '▾',
              '&duarr;': '⇵',
              '&duhar;': '⥯',
              '&dwangle;': '⦦',
              '&dzcy;': 'џ',
              '&dzigrarr;': '⟿',
              '&eDDot;': '⩷',
              '&eDot;': '≑',
              '&eacute': 'é',
              '&eacute;': 'é',
              '&easter;': '⩮',
              '&ecaron;': 'ě',
              '&ecir;': '≖',
              '&ecirc': 'ê',
              '&ecirc;': 'ê',
              '&ecolon;': '≕',
              '&ecy;': 'э',
              '&edot;': 'ė',
              '&ee;': 'ⅇ',
              '&efDot;': '≒',
              '&efr;': '𝔢',
              '&eg;': '⪚',
              '&egrave': 'è',
              '&egrave;': 'è',
              '&egs;': '⪖',
              '&egsdot;': '⪘',
              '&el;': '⪙',
              '&elinters;': '⏧',
              '&ell;': 'ℓ',
              '&els;': '⪕',
              '&elsdot;': '⪗',
              '&emacr;': 'ē',
              '&empty;': '∅',
              '&emptyset;': '∅',
              '&emptyv;': '∅',
              '&emsp13;': ' ',
              '&emsp14;': ' ',
              '&emsp;': ' ',
              '&eng;': 'ŋ',
              '&ensp;': ' ',
              '&eogon;': 'ę',
              '&eopf;': '𝕖',
              '&epar;': '⋕',
              '&eparsl;': '⧣',
              '&eplus;': '⩱',
              '&epsi;': 'ε',
              '&epsilon;': 'ε',
              '&epsiv;': 'ϵ',
              '&eqcirc;': '≖',
              '&eqcolon;': '≕',
              '&eqsim;': '≂',
              '&eqslantgtr;': '⪖',
              '&eqslantless;': '⪕',
              '&equals;': '=',
              '&equest;': '≟',
              '&equiv;': '≡',
              '&equivDD;': '⩸',
              '&eqvparsl;': '⧥',
              '&erDot;': '≓',
              '&erarr;': '⥱',
              '&escr;': 'ℯ',
              '&esdot;': '≐',
              '&esim;': '≂',
              '&eta;': 'η',
              '&eth': 'ð',
              '&eth;': 'ð',
              '&euml': 'ë',
              '&euml;': 'ë',
              '&euro;': '€',
              '&excl;': '!',
              '&exist;': '∃',
              '&expectation;': 'ℰ',
              '&exponentiale;': 'ⅇ',
              '&fallingdotseq;': '≒',
              '&fcy;': 'ф',
              '&female;': '♀',
              '&ffilig;': 'ﬃ',
              '&fflig;': 'ﬀ',
              '&ffllig;': 'ﬄ',
              '&ffr;': '𝔣',
              '&filig;': 'ﬁ',
              '&fjlig;': 'fj',
              '&flat;': '♭',
              '&fllig;': 'ﬂ',
              '&fltns;': '▱',
              '&fnof;': 'ƒ',
              '&fopf;': '𝕗',
              '&forall;': '∀',
              '&fork;': '⋔',
              '&forkv;': '⫙',
              '&fpartint;': '⨍',
              '&frac12': '½',
              '&frac12;': '½',
              '&frac13;': '⅓',
              '&frac14': '¼',
              '&frac14;': '¼',
              '&frac15;': '⅕',
              '&frac16;': '⅙',
              '&frac18;': '⅛',
              '&frac23;': '⅔',
              '&frac25;': '⅖',
              '&frac34': '¾',
              '&frac34;': '¾',
              '&frac35;': '⅗',
              '&frac38;': '⅜',
              '&frac45;': '⅘',
              '&frac56;': '⅚',
              '&frac58;': '⅝',
              '&frac78;': '⅞',
              '&frasl;': '⁄',
              '&frown;': '⌢',
              '&fscr;': '𝒻',
              '&gE;': '≧',
              '&gEl;': '⪌',
              '&gacute;': 'ǵ',
              '&gamma;': 'γ',
              '&gammad;': 'ϝ',
              '&gap;': '⪆',
              '&gbreve;': 'ğ',
              '&gcirc;': 'ĝ',
              '&gcy;': 'г',
              '&gdot;': 'ġ',
              '&ge;': '≥',
              '&gel;': '⋛',
              '&geq;': '≥',
              '&geqq;': '≧',
              '&geqslant;': '⩾',
              '&ges;': '⩾',
              '&gescc;': '⪩',
              '&gesdot;': '⪀',
              '&gesdoto;': '⪂',
              '&gesdotol;': '⪄',
              '&gesl;': '⋛︀',
              '&gesles;': '⪔',
              '&gfr;': '𝔤',
              '&gg;': '≫',
              '&ggg;': '⋙',
              '&gimel;': 'ℷ',
              '&gjcy;': 'ѓ',
              '&gl;': '≷',
              '&glE;': '⪒',
              '&gla;': '⪥',
              '&glj;': '⪤',
              '&gnE;': '≩',
              '&gnap;': '⪊',
              '&gnapprox;': '⪊',
              '&gne;': '⪈',
              '&gneq;': '⪈',
              '&gneqq;': '≩',
              '&gnsim;': '⋧',
              '&gopf;': '𝕘',
              '&grave;': '`',
              '&gscr;': 'ℊ',
              '&gsim;': '≳',
              '&gsime;': '⪎',
              '&gsiml;': '⪐',
              '&gt': '>',
              '&gt;': '>',
              '&gtcc;': '⪧',
              '&gtcir;': '⩺',
              '&gtdot;': '⋗',
              '&gtlPar;': '⦕',
              '&gtquest;': '⩼',
              '&gtrapprox;': '⪆',
              '&gtrarr;': '⥸',
              '&gtrdot;': '⋗',
              '&gtreqless;': '⋛',
              '&gtreqqless;': '⪌',
              '&gtrless;': '≷',
              '&gtrsim;': '≳',
              '&gvertneqq;': '≩︀',
              '&gvnE;': '≩︀',
              '&hArr;': '⇔',
              '&hairsp;': ' ',
              '&half;': '½',
              '&hamilt;': 'ℋ',
              '&hardcy;': 'ъ',
              '&harr;': '↔',
              '&harrcir;': '⥈',
              '&harrw;': '↭',
              '&hbar;': 'ℏ',
              '&hcirc;': 'ĥ',
              '&hearts;': '♥',
              '&heartsuit;': '♥',
              '&hellip;': '…',
              '&hercon;': '⊹',
              '&hfr;': '𝔥',
              '&hksearow;': '⤥',
              '&hkswarow;': '⤦',
              '&hoarr;': '⇿',
              '&homtht;': '∻',
              '&hookleftarrow;': '↩',
              '&hookrightarrow;': '↪',
              '&hopf;': '𝕙',
              '&horbar;': '―',
              '&hscr;': '𝒽',
              '&hslash;': 'ℏ',
              '&hstrok;': 'ħ',
              '&hybull;': '⁃',
              '&hyphen;': '‐',
              '&iacute': 'í',
              '&iacute;': 'í',
              '&ic;': '⁣',
              '&icirc': 'î',
              '&icirc;': 'î',
              '&icy;': 'и',
              '&iecy;': 'е',
              '&iexcl': '¡',
              '&iexcl;': '¡',
              '&iff;': '⇔',
              '&ifr;': '𝔦',
              '&igrave': 'ì',
              '&igrave;': 'ì',
              '&ii;': 'ⅈ',
              '&iiiint;': '⨌',
              '&iiint;': '∭',
              '&iinfin;': '⧜',
              '&iiota;': '℩',
              '&ijlig;': 'ĳ',
              '&imacr;': 'ī',
              '&image;': 'ℑ',
              '&imagline;': 'ℐ',
              '&imagpart;': 'ℑ',
              '&imath;': 'ı',
              '&imof;': '⊷',
              '&imped;': 'Ƶ',
              '&in;': '∈',
              '&incare;': '℅',
              '&infin;': '∞',
              '&infintie;': '⧝',
              '&inodot;': 'ı',
              '&int;': '∫',
              '&intcal;': '⊺',
              '&integers;': 'ℤ',
              '&intercal;': '⊺',
              '&intlarhk;': '⨗',
              '&intprod;': '⨼',
              '&iocy;': 'ё',
              '&iogon;': 'į',
              '&iopf;': '𝕚',
              '&iota;': 'ι',
              '&iprod;': '⨼',
              '&iquest': '¿',
              '&iquest;': '¿',
              '&iscr;': '𝒾',
              '&isin;': '∈',
              '&isinE;': '⋹',
              '&isindot;': '⋵',
              '&isins;': '⋴',
              '&isinsv;': '⋳',
              '&isinv;': '∈',
              '&it;': '⁢',
              '&itilde;': 'ĩ',
              '&iukcy;': 'і',
              '&iuml': 'ï',
              '&iuml;': 'ï',
              '&jcirc;': 'ĵ',
              '&jcy;': 'й',
              '&jfr;': '𝔧',
              '&jmath;': 'ȷ',
              '&jopf;': '𝕛',
              '&jscr;': '𝒿',
              '&jsercy;': 'ј',
              '&jukcy;': 'є',
              '&kappa;': 'κ',
              '&kappav;': 'ϰ',
              '&kcedil;': 'ķ',
              '&kcy;': 'к',
              '&kfr;': '𝔨',
              '&kgreen;': 'ĸ',
              '&khcy;': 'х',
              '&kjcy;': 'ќ',
              '&kopf;': '𝕜',
              '&kscr;': '𝓀',
              '&lAarr;': '⇚',
              '&lArr;': '⇐',
              '&lAtail;': '⤛',
              '&lBarr;': '⤎',
              '&lE;': '≦',
              '&lEg;': '⪋',
              '&lHar;': '⥢',
              '&lacute;': 'ĺ',
              '&laemptyv;': '⦴',
              '&lagran;': 'ℒ',
              '&lambda;': 'λ',
              '&lang;': '⟨',
              '&langd;': '⦑',
              '&langle;': '⟨',
              '&lap;': '⪅',
              '&laquo': '«',
              '&laquo;': '«',
              '&larr;': '←',
              '&larrb;': '⇤',
              '&larrbfs;': '⤟',
              '&larrfs;': '⤝',
              '&larrhk;': '↩',
              '&larrlp;': '↫',
              '&larrpl;': '⤹',
              '&larrsim;': '⥳',
              '&larrtl;': '↢',
              '&lat;': '⪫',
              '&latail;': '⤙',
              '&late;': '⪭',
              '&lates;': '⪭︀',
              '&lbarr;': '⤌',
              '&lbbrk;': '❲',
              '&lbrace;': '{',
              '&lbrack;': '[',
              '&lbrke;': '⦋',
              '&lbrksld;': '⦏',
              '&lbrkslu;': '⦍',
              '&lcaron;': 'ľ',
              '&lcedil;': 'ļ',
              '&lceil;': '⌈',
              '&lcub;': '{',
              '&lcy;': 'л',
              '&ldca;': '⤶',
              '&ldquo;': '“',
              '&ldquor;': '„',
              '&ldrdhar;': '⥧',
              '&ldrushar;': '⥋',
              '&ldsh;': '↲',
              '&le;': '≤',
              '&leftarrow;': '←',
              '&leftarrowtail;': '↢',
              '&leftharpoondown;': '↽',
              '&leftharpoonup;': '↼',
              '&leftleftarrows;': '⇇',
              '&leftrightarrow;': '↔',
              '&leftrightarrows;': '⇆',
              '&leftrightharpoons;': '⇋',
              '&leftrightsquigarrow;': '↭',
              '&leftthreetimes;': '⋋',
              '&leg;': '⋚',
              '&leq;': '≤',
              '&leqq;': '≦',
              '&leqslant;': '⩽',
              '&les;': '⩽',
              '&lescc;': '⪨',
              '&lesdot;': '⩿',
              '&lesdoto;': '⪁',
              '&lesdotor;': '⪃',
              '&lesg;': '⋚︀',
              '&lesges;': '⪓',
              '&lessapprox;': '⪅',
              '&lessdot;': '⋖',
              '&lesseqgtr;': '⋚',
              '&lesseqqgtr;': '⪋',
              '&lessgtr;': '≶',
              '&lesssim;': '≲',
              '&lfisht;': '⥼',
              '&lfloor;': '⌊',
              '&lfr;': '𝔩',
              '&lg;': '≶',
              '&lgE;': '⪑',
              '&lhard;': '↽',
              '&lharu;': '↼',
              '&lharul;': '⥪',
              '&lhblk;': '▄',
              '&ljcy;': 'љ',
              '&ll;': '≪',
              '&llarr;': '⇇',
              '&llcorner;': '⌞',
              '&llhard;': '⥫',
              '&lltri;': '◺',
              '&lmidot;': 'ŀ',
              '&lmoust;': '⎰',
              '&lmoustache;': '⎰',
              '&lnE;': '≨',
              '&lnap;': '⪉',
              '&lnapprox;': '⪉',
              '&lne;': '⪇',
              '&lneq;': '⪇',
              '&lneqq;': '≨',
              '&lnsim;': '⋦',
              '&loang;': '⟬',
              '&loarr;': '⇽',
              '&lobrk;': '⟦',
              '&longleftarrow;': '⟵',
              '&longleftrightarrow;': '⟷',
              '&longmapsto;': '⟼',
              '&longrightarrow;': '⟶',
              '&looparrowleft;': '↫',
              '&looparrowright;': '↬',
              '&lopar;': '⦅',
              '&lopf;': '𝕝',
              '&loplus;': '⨭',
              '&lotimes;': '⨴',
              '&lowast;': '∗',
              '&lowbar;': '_',
              '&loz;': '◊',
              '&lozenge;': '◊',
              '&lozf;': '⧫',
              '&lpar;': '(',
              '&lparlt;': '⦓',
              '&lrarr;': '⇆',
              '&lrcorner;': '⌟',
              '&lrhar;': '⇋',
              '&lrhard;': '⥭',
              '&lrm;': '‎',
              '&lrtri;': '⊿',
              '&lsaquo;': '‹',
              '&lscr;': '𝓁',
              '&lsh;': '↰',
              '&lsim;': '≲',
              '&lsime;': '⪍',
              '&lsimg;': '⪏',
              '&lsqb;': '[',
              '&lsquo;': '‘',
              '&lsquor;': '‚',
              '&lstrok;': 'ł',
              '&lt': '<',
              '&lt;': '<',
              '&ltcc;': '⪦',
              '&ltcir;': '⩹',
              '&ltdot;': '⋖',
              '&lthree;': '⋋',
              '&ltimes;': '⋉',
              '&ltlarr;': '⥶',
              '&ltquest;': '⩻',
              '&ltrPar;': '⦖',
              '&ltri;': '◃',
              '&ltrie;': '⊴',
              '&ltrif;': '◂',
              '&lurdshar;': '⥊',
              '&luruhar;': '⥦',
              '&lvertneqq;': '≨︀',
              '&lvnE;': '≨︀',
              '&mDDot;': '∺',
              '&macr': '¯',
              '&macr;': '¯',
              '&male;': '♂',
              '&malt;': '✠',
              '&maltese;': '✠',
              '&map;': '↦',
              '&mapsto;': '↦',
              '&mapstodown;': '↧',
              '&mapstoleft;': '↤',
              '&mapstoup;': '↥',
              '&marker;': '▮',
              '&mcomma;': '⨩',
              '&mcy;': 'м',
              '&mdash;': '—',
              '&measuredangle;': '∡',
              '&mfr;': '𝔪',
              '&mho;': '℧',
              '&micro': 'µ',
              '&micro;': 'µ',
              '&mid;': '∣',
              '&midast;': '*',
              '&midcir;': '⫰',
              '&middot': '·',
              '&middot;': '·',
              '&minus;': '−',
              '&minusb;': '⊟',
              '&minusd;': '∸',
              '&minusdu;': '⨪',
              '&mlcp;': '⫛',
              '&mldr;': '…',
              '&mnplus;': '∓',
              '&models;': '⊧',
              '&mopf;': '𝕞',
              '&mp;': '∓',
              '&mscr;': '𝓂',
              '&mstpos;': '∾',
              '&mu;': 'μ',
              '&multimap;': '⊸',
              '&mumap;': '⊸',
              '&nGg;': '⋙̸',
              '&nGt;': '≫⃒',
              '&nGtv;': '≫̸',
              '&nLeftarrow;': '⇍',
              '&nLeftrightarrow;': '⇎',
              '&nLl;': '⋘̸',
              '&nLt;': '≪⃒',
              '&nLtv;': '≪̸',
              '&nRightarrow;': '⇏',
              '&nVDash;': '⊯',
              '&nVdash;': '⊮',
              '&nabla;': '∇',
              '&nacute;': 'ń',
              '&nang;': '∠⃒',
              '&nap;': '≉',
              '&napE;': '⩰̸',
              '&napid;': '≋̸',
              '&napos;': 'ŉ',
              '&napprox;': '≉',
              '&natur;': '♮',
              '&natural;': '♮',
              '&naturals;': 'ℕ',
              '&nbsp': ' ',
              '&nbsp;': ' ',
              '&nbump;': '≎̸',
              '&nbumpe;': '≏̸',
              '&ncap;': '⩃',
              '&ncaron;': 'ň',
              '&ncedil;': 'ņ',
              '&ncong;': '≇',
              '&ncongdot;': '⩭̸',
              '&ncup;': '⩂',
              '&ncy;': 'н',
              '&ndash;': '–',
              '&ne;': '≠',
              '&neArr;': '⇗',
              '&nearhk;': '⤤',
              '&nearr;': '↗',
              '&nearrow;': '↗',
              '&nedot;': '≐̸',
              '&nequiv;': '≢',
              '&nesear;': '⤨',
              '&nesim;': '≂̸',
              '&nexist;': '∄',
              '&nexists;': '∄',
              '&nfr;': '𝔫',
              '&ngE;': '≧̸',
              '&nge;': '≱',
              '&ngeq;': '≱',
              '&ngeqq;': '≧̸',
              '&ngeqslant;': '⩾̸',
              '&nges;': '⩾̸',
              '&ngsim;': '≵',
              '&ngt;': '≯',
              '&ngtr;': '≯',
              '&nhArr;': '⇎',
              '&nharr;': '↮',
              '&nhpar;': '⫲',
              '&ni;': '∋',
              '&nis;': '⋼',
              '&nisd;': '⋺',
              '&niv;': '∋',
              '&njcy;': 'њ',
              '&nlArr;': '⇍',
              '&nlE;': '≦̸',
              '&nlarr;': '↚',
              '&nldr;': '‥',
              '&nle;': '≰',
              '&nleftarrow;': '↚',
              '&nleftrightarrow;': '↮',
              '&nleq;': '≰',
              '&nleqq;': '≦̸',
              '&nleqslant;': '⩽̸',
              '&nles;': '⩽̸',
              '&nless;': '≮',
              '&nlsim;': '≴',
              '&nlt;': '≮',
              '&nltri;': '⋪',
              '&nltrie;': '⋬',
              '&nmid;': '∤',
              '&nopf;': '𝕟',
              '&not': '¬',
              '&not;': '¬',
              '&notin;': '∉',
              '&notinE;': '⋹̸',
              '&notindot;': '⋵̸',
              '&notinva;': '∉',
              '&notinvb;': '⋷',
              '&notinvc;': '⋶',
              '&notni;': '∌',
              '&notniva;': '∌',
              '&notnivb;': '⋾',
              '&notnivc;': '⋽',
              '&npar;': '∦',
              '&nparallel;': '∦',
              '&nparsl;': '⫽⃥',
              '&npart;': '∂̸',
              '&npolint;': '⨔',
              '&npr;': '⊀',
              '&nprcue;': '⋠',
              '&npre;': '⪯̸',
              '&nprec;': '⊀',
              '&npreceq;': '⪯̸',
              '&nrArr;': '⇏',
              '&nrarr;': '↛',
              '&nrarrc;': '⤳̸',
              '&nrarrw;': '↝̸',
              '&nrightarrow;': '↛',
              '&nrtri;': '⋫',
              '&nrtrie;': '⋭',
              '&nsc;': '⊁',
              '&nsccue;': '⋡',
              '&nsce;': '⪰̸',
              '&nscr;': '𝓃',
              '&nshortmid;': '∤',
              '&nshortparallel;': '∦',
              '&nsim;': '≁',
              '&nsime;': '≄',
              '&nsimeq;': '≄',
              '&nsmid;': '∤',
              '&nspar;': '∦',
              '&nsqsube;': '⋢',
              '&nsqsupe;': '⋣',
              '&nsub;': '⊄',
              '&nsubE;': '⫅̸',
              '&nsube;': '⊈',
              '&nsubset;': '⊂⃒',
              '&nsubseteq;': '⊈',
              '&nsubseteqq;': '⫅̸',
              '&nsucc;': '⊁',
              '&nsucceq;': '⪰̸',
              '&nsup;': '⊅',
              '&nsupE;': '⫆̸',
              '&nsupe;': '⊉',
              '&nsupset;': '⊃⃒',
              '&nsupseteq;': '⊉',
              '&nsupseteqq;': '⫆̸',
              '&ntgl;': '≹',
              '&ntilde': 'ñ',
              '&ntilde;': 'ñ',
              '&ntlg;': '≸',
              '&ntriangleleft;': '⋪',
              '&ntrianglelefteq;': '⋬',
              '&ntriangleright;': '⋫',
              '&ntrianglerighteq;': '⋭',
              '&nu;': 'ν',
              '&num;': '#',
              '&numero;': '№',
              '&numsp;': ' ',
              '&nvDash;': '⊭',
              '&nvHarr;': '⤄',
              '&nvap;': '≍⃒',
              '&nvdash;': '⊬',
              '&nvge;': '≥⃒',
              '&nvgt;': '>⃒',
              '&nvinfin;': '⧞',
              '&nvlArr;': '⤂',
              '&nvle;': '≤⃒',
              '&nvlt;': '<⃒',
              '&nvltrie;': '⊴⃒',
              '&nvrArr;': '⤃',
              '&nvrtrie;': '⊵⃒',
              '&nvsim;': '∼⃒',
              '&nwArr;': '⇖',
              '&nwarhk;': '⤣',
              '&nwarr;': '↖',
              '&nwarrow;': '↖',
              '&nwnear;': '⤧',
              '&oS;': 'Ⓢ',
              '&oacute': 'ó',
              '&oacute;': 'ó',
              '&oast;': '⊛',
              '&ocir;': '⊚',
              '&ocirc': 'ô',
              '&ocirc;': 'ô',
              '&ocy;': 'о',
              '&odash;': '⊝',
              '&odblac;': 'ő',
              '&odiv;': '⨸',
              '&odot;': '⊙',
              '&odsold;': '⦼',
              '&oelig;': 'œ',
              '&ofcir;': '⦿',
              '&ofr;': '𝔬',
              '&ogon;': '˛',
              '&ograve': 'ò',
              '&ograve;': 'ò',
              '&ogt;': '⧁',
              '&ohbar;': '⦵',
              '&ohm;': 'Ω',
              '&oint;': '∮',
              '&olarr;': '↺',
              '&olcir;': '⦾',
              '&olcross;': '⦻',
              '&oline;': '‾',
              '&olt;': '⧀',
              '&omacr;': 'ō',
              '&omega;': 'ω',
              '&omicron;': 'ο',
              '&omid;': '⦶',
              '&ominus;': '⊖',
              '&oopf;': '𝕠',
              '&opar;': '⦷',
              '&operp;': '⦹',
              '&oplus;': '⊕',
              '&or;': '∨',
              '&orarr;': '↻',
              '&ord;': '⩝',
              '&order;': 'ℴ',
              '&orderof;': 'ℴ',
              '&ordf': 'ª',
              '&ordf;': 'ª',
              '&ordm': 'º',
              '&ordm;': 'º',
              '&origof;': '⊶',
              '&oror;': '⩖',
              '&orslope;': '⩗',
              '&orv;': '⩛',
              '&oscr;': 'ℴ',
              '&oslash': 'ø',
              '&oslash;': 'ø',
              '&osol;': '⊘',
              '&otilde': 'õ',
              '&otilde;': 'õ',
              '&otimes;': '⊗',
              '&otimesas;': '⨶',
              '&ouml': 'ö',
              '&ouml;': 'ö',
              '&ovbar;': '⌽',
              '&par;': '∥',
              '&para': '¶',
              '&para;': '¶',
              '&parallel;': '∥',
              '&parsim;': '⫳',
              '&parsl;': '⫽',
              '&part;': '∂',
              '&pcy;': 'п',
              '&percnt;': '%',
              '&period;': '.',
              '&permil;': '‰',
              '&perp;': '⊥',
              '&pertenk;': '‱',
              '&pfr;': '𝔭',
              '&phi;': 'φ',
              '&phiv;': 'ϕ',
              '&phmmat;': 'ℳ',
              '&phone;': '☎',
              '&pi;': 'π',
              '&pitchfork;': '⋔',
              '&piv;': 'ϖ',
              '&planck;': 'ℏ',
              '&planckh;': 'ℎ',
              '&plankv;': 'ℏ',
              '&plus;': '+',
              '&plusacir;': '⨣',
              '&plusb;': '⊞',
              '&pluscir;': '⨢',
              '&plusdo;': '∔',
              '&plusdu;': '⨥',
              '&pluse;': '⩲',
              '&plusmn': '±',
              '&plusmn;': '±',
              '&plussim;': '⨦',
              '&plustwo;': '⨧',
              '&pm;': '±',
              '&pointint;': '⨕',
              '&popf;': '𝕡',
              '&pound': '£',
              '&pound;': '£',
              '&pr;': '≺',
              '&prE;': '⪳',
              '&prap;': '⪷',
              '&prcue;': '≼',
              '&pre;': '⪯',
              '&prec;': '≺',
              '&precapprox;': '⪷',
              '&preccurlyeq;': '≼',
              '&preceq;': '⪯',
              '&precnapprox;': '⪹',
              '&precneqq;': '⪵',
              '&precnsim;': '⋨',
              '&precsim;': '≾',
              '&prime;': '′',
              '&primes;': 'ℙ',
              '&prnE;': '⪵',
              '&prnap;': '⪹',
              '&prnsim;': '⋨',
              '&prod;': '∏',
              '&profalar;': '⌮',
              '&profline;': '⌒',
              '&profsurf;': '⌓',
              '&prop;': '∝',
              '&propto;': '∝',
              '&prsim;': '≾',
              '&prurel;': '⊰',
              '&pscr;': '𝓅',
              '&psi;': 'ψ',
              '&puncsp;': ' ',
              '&qfr;': '𝔮',
              '&qint;': '⨌',
              '&qopf;': '𝕢',
              '&qprime;': '⁗',
              '&qscr;': '𝓆',
              '&quaternions;': 'ℍ',
              '&quatint;': '⨖',
              '&quest;': '?',
              '&questeq;': '≟',
              '&quot': '"',
              '&quot;': '"',
              '&rAarr;': '⇛',
              '&rArr;': '⇒',
              '&rAtail;': '⤜',
              '&rBarr;': '⤏',
              '&rHar;': '⥤',
              '&race;': '∽̱',
              '&racute;': 'ŕ',
              '&radic;': '√',
              '&raemptyv;': '⦳',
              '&rang;': '⟩',
              '&rangd;': '⦒',
              '&range;': '⦥',
              '&rangle;': '⟩',
              '&raquo': '»',
              '&raquo;': '»',
              '&rarr;': '→',
              '&rarrap;': '⥵',
              '&rarrb;': '⇥',
              '&rarrbfs;': '⤠',
              '&rarrc;': '⤳',
              '&rarrfs;': '⤞',
              '&rarrhk;': '↪',
              '&rarrlp;': '↬',
              '&rarrpl;': '⥅',
              '&rarrsim;': '⥴',
              '&rarrtl;': '↣',
              '&rarrw;': '↝',
              '&ratail;': '⤚',
              '&ratio;': '∶',
              '&rationals;': 'ℚ',
              '&rbarr;': '⤍',
              '&rbbrk;': '❳',
              '&rbrace;': '}',
              '&rbrack;': ']',
              '&rbrke;': '⦌',
              '&rbrksld;': '⦎',
              '&rbrkslu;': '⦐',
              '&rcaron;': 'ř',
              '&rcedil;': 'ŗ',
              '&rceil;': '⌉',
              '&rcub;': '}',
              '&rcy;': 'р',
              '&rdca;': '⤷',
              '&rdldhar;': '⥩',
              '&rdquo;': '”',
              '&rdquor;': '”',
              '&rdsh;': '↳',
              '&real;': 'ℜ',
              '&realine;': 'ℛ',
              '&realpart;': 'ℜ',
              '&reals;': 'ℝ',
              '&rect;': '▭',
              '&reg': '®',
              '&reg;': '®',
              '&rfisht;': '⥽',
              '&rfloor;': '⌋',
              '&rfr;': '𝔯',
              '&rhard;': '⇁',
              '&rharu;': '⇀',
              '&rharul;': '⥬',
              '&rho;': 'ρ',
              '&rhov;': 'ϱ',
              '&rightarrow;': '→',
              '&rightarrowtail;': '↣',
              '&rightharpoondown;': '⇁',
              '&rightharpoonup;': '⇀',
              '&rightleftarrows;': '⇄',
              '&rightleftharpoons;': '⇌',
              '&rightrightarrows;': '⇉',
              '&rightsquigarrow;': '↝',
              '&rightthreetimes;': '⋌',
              '&ring;': '˚',
              '&risingdotseq;': '≓',
              '&rlarr;': '⇄',
              '&rlhar;': '⇌',
              '&rlm;': '‏',
              '&rmoust;': '⎱',
              '&rmoustache;': '⎱',
              '&rnmid;': '⫮',
              '&roang;': '⟭',
              '&roarr;': '⇾',
              '&robrk;': '⟧',
              '&ropar;': '⦆',
              '&ropf;': '𝕣',
              '&roplus;': '⨮',
              '&rotimes;': '⨵',
              '&rpar;': ')',
              '&rpargt;': '⦔',
              '&rppolint;': '⨒',
              '&rrarr;': '⇉',
              '&rsaquo;': '›',
              '&rscr;': '𝓇',
              '&rsh;': '↱',
              '&rsqb;': ']',
              '&rsquo;': '’',
              '&rsquor;': '’',
              '&rthree;': '⋌',
              '&rtimes;': '⋊',
              '&rtri;': '▹',
              '&rtrie;': '⊵',
              '&rtrif;': '▸',
              '&rtriltri;': '⧎',
              '&ruluhar;': '⥨',
              '&rx;': '℞',
              '&sacute;': 'ś',
              '&sbquo;': '‚',
              '&sc;': '≻',
              '&scE;': '⪴',
              '&scap;': '⪸',
              '&scaron;': 'š',
              '&sccue;': '≽',
              '&sce;': '⪰',
              '&scedil;': 'ş',
              '&scirc;': 'ŝ',
              '&scnE;': '⪶',
              '&scnap;': '⪺',
              '&scnsim;': '⋩',
              '&scpolint;': '⨓',
              '&scsim;': '≿',
              '&scy;': 'с',
              '&sdot;': '⋅',
              '&sdotb;': '⊡',
              '&sdote;': '⩦',
              '&seArr;': '⇘',
              '&searhk;': '⤥',
              '&searr;': '↘',
              '&searrow;': '↘',
              '&sect': '§',
              '&sect;': '§',
              '&semi;': ';',
              '&seswar;': '⤩',
              '&setminus;': '∖',
              '&setmn;': '∖',
              '&sext;': '✶',
              '&sfr;': '𝔰',
              '&sfrown;': '⌢',
              '&sharp;': '♯',
              '&shchcy;': 'щ',
              '&shcy;': 'ш',
              '&shortmid;': '∣',
              '&shortparallel;': '∥',
              '&shy': '­',
              '&shy;': '­',
              '&sigma;': 'σ',
              '&sigmaf;': 'ς',
              '&sigmav;': 'ς',
              '&sim;': '∼',
              '&simdot;': '⩪',
              '&sime;': '≃',
              '&simeq;': '≃',
              '&simg;': '⪞',
              '&simgE;': '⪠',
              '&siml;': '⪝',
              '&simlE;': '⪟',
              '&simne;': '≆',
              '&simplus;': '⨤',
              '&simrarr;': '⥲',
              '&slarr;': '←',
              '&smallsetminus;': '∖',
              '&smashp;': '⨳',
              '&smeparsl;': '⧤',
              '&smid;': '∣',
              '&smile;': '⌣',
              '&smt;': '⪪',
              '&smte;': '⪬',
              '&smtes;': '⪬︀',
              '&softcy;': 'ь',
              '&sol;': '/',
              '&solb;': '⧄',
              '&solbar;': '⌿',
              '&sopf;': '𝕤',
              '&spades;': '♠',
              '&spadesuit;': '♠',
              '&spar;': '∥',
              '&sqcap;': '⊓',
              '&sqcaps;': '⊓︀',
              '&sqcup;': '⊔',
              '&sqcups;': '⊔︀',
              '&sqsub;': '⊏',
              '&sqsube;': '⊑',
              '&sqsubset;': '⊏',
              '&sqsubseteq;': '⊑',
              '&sqsup;': '⊐',
              '&sqsupe;': '⊒',
              '&sqsupset;': '⊐',
              '&sqsupseteq;': '⊒',
              '&squ;': '□',
              '&square;': '□',
              '&squarf;': '▪',
              '&squf;': '▪',
              '&srarr;': '→',
              '&sscr;': '𝓈',
              '&ssetmn;': '∖',
              '&ssmile;': '⌣',
              '&sstarf;': '⋆',
              '&star;': '☆',
              '&starf;': '★',
              '&straightepsilon;': 'ϵ',
              '&straightphi;': 'ϕ',
              '&strns;': '¯',
              '&sub;': '⊂',
              '&subE;': '⫅',
              '&subdot;': '⪽',
              '&sube;': '⊆',
              '&subedot;': '⫃',
              '&submult;': '⫁',
              '&subnE;': '⫋',
              '&subne;': '⊊',
              '&subplus;': '⪿',
              '&subrarr;': '⥹',
              '&subset;': '⊂',
              '&subseteq;': '⊆',
              '&subseteqq;': '⫅',
              '&subsetneq;': '⊊',
              '&subsetneqq;': '⫋',
              '&subsim;': '⫇',
              '&subsub;': '⫕',
              '&subsup;': '⫓',
              '&succ;': '≻',
              '&succapprox;': '⪸',
              '&succcurlyeq;': '≽',
              '&succeq;': '⪰',
              '&succnapprox;': '⪺',
              '&succneqq;': '⪶',
              '&succnsim;': '⋩',
              '&succsim;': '≿',
              '&sum;': '∑',
              '&sung;': '♪',
              '&sup1': '¹',
              '&sup1;': '¹',
              '&sup2': '²',
              '&sup2;': '²',
              '&sup3': '³',
              '&sup3;': '³',
              '&sup;': '⊃',
              '&supE;': '⫆',
              '&supdot;': '⪾',
              '&supdsub;': '⫘',
              '&supe;': '⊇',
              '&supedot;': '⫄',
              '&suphsol;': '⟉',
              '&suphsub;': '⫗',
              '&suplarr;': '⥻',
              '&supmult;': '⫂',
              '&supnE;': '⫌',
              '&supne;': '⊋',
              '&supplus;': '⫀',
              '&supset;': '⊃',
              '&supseteq;': '⊇',
              '&supseteqq;': '⫆',
              '&supsetneq;': '⊋',
              '&supsetneqq;': '⫌',
              '&supsim;': '⫈',
              '&supsub;': '⫔',
              '&supsup;': '⫖',
              '&swArr;': '⇙',
              '&swarhk;': '⤦',
              '&swarr;': '↙',
              '&swarrow;': '↙',
              '&swnwar;': '⤪',
              '&szlig': 'ß',
              '&szlig;': 'ß',
              '&target;': '⌖',
              '&tau;': 'τ',
              '&tbrk;': '⎴',
              '&tcaron;': 'ť',
              '&tcedil;': 'ţ',
              '&tcy;': 'т',
              '&tdot;': '⃛',
              '&telrec;': '⌕',
              '&tfr;': '𝔱',
              '&there4;': '∴',
              '&therefore;': '∴',
              '&theta;': 'θ',
              '&thetasym;': 'ϑ',
              '&thetav;': 'ϑ',
              '&thickapprox;': '≈',
              '&thicksim;': '∼',
              '&thinsp;': ' ',
              '&thkap;': '≈',
              '&thksim;': '∼',
              '&thorn': 'þ',
              '&thorn;': 'þ',
              '&tilde;': '˜',
              '&times': '×',
              '&times;': '×',
              '&timesb;': '⊠',
              '&timesbar;': '⨱',
              '&timesd;': '⨰',
              '&tint;': '∭',
              '&toea;': '⤨',
              '&top;': '⊤',
              '&topbot;': '⌶',
              '&topcir;': '⫱',
              '&topf;': '𝕥',
              '&topfork;': '⫚',
              '&tosa;': '⤩',
              '&tprime;': '‴',
              '&trade;': '™',
              '&triangle;': '▵',
              '&triangledown;': '▿',
              '&triangleleft;': '◃',
              '&trianglelefteq;': '⊴',
              '&triangleq;': '≜',
              '&triangleright;': '▹',
              '&trianglerighteq;': '⊵',
              '&tridot;': '◬',
              '&trie;': '≜',
              '&triminus;': '⨺',
              '&triplus;': '⨹',
              '&trisb;': '⧍',
              '&tritime;': '⨻',
              '&trpezium;': '⏢',
              '&tscr;': '𝓉',
              '&tscy;': 'ц',
              '&tshcy;': 'ћ',
              '&tstrok;': 'ŧ',
              '&twixt;': '≬',
              '&twoheadleftarrow;': '↞',
              '&twoheadrightarrow;': '↠',
              '&uArr;': '⇑',
              '&uHar;': '⥣',
              '&uacute': 'ú',
              '&uacute;': 'ú',
              '&uarr;': '↑',
              '&ubrcy;': 'ў',
              '&ubreve;': 'ŭ',
              '&ucirc': 'û',
              '&ucirc;': 'û',
              '&ucy;': 'у',
              '&udarr;': '⇅',
              '&udblac;': 'ű',
              '&udhar;': '⥮',
              '&ufisht;': '⥾',
              '&ufr;': '𝔲',
              '&ugrave': 'ù',
              '&ugrave;': 'ù',
              '&uharl;': '↿',
              '&uharr;': '↾',
              '&uhblk;': '▀',
              '&ulcorn;': '⌜',
              '&ulcorner;': '⌜',
              '&ulcrop;': '⌏',
              '&ultri;': '◸',
              '&umacr;': 'ū',
              '&uml': '¨',
              '&uml;': '¨',
              '&uogon;': 'ų',
              '&uopf;': '𝕦',
              '&uparrow;': '↑',
              '&updownarrow;': '↕',
              '&upharpoonleft;': '↿',
              '&upharpoonright;': '↾',
              '&uplus;': '⊎',
              '&upsi;': 'υ',
              '&upsih;': 'ϒ',
              '&upsilon;': 'υ',
              '&upuparrows;': '⇈',
              '&urcorn;': '⌝',
              '&urcorner;': '⌝',
              '&urcrop;': '⌎',
              '&uring;': 'ů',
              '&urtri;': '◹',
              '&uscr;': '𝓊',
              '&utdot;': '⋰',
              '&utilde;': 'ũ',
              '&utri;': '▵',
              '&utrif;': '▴',
              '&uuarr;': '⇈',
              '&uuml': 'ü',
              '&uuml;': 'ü',
              '&uwangle;': '⦧',
              '&vArr;': '⇕',
              '&vBar;': '⫨',
              '&vBarv;': '⫩',
              '&vDash;': '⊨',
              '&vangrt;': '⦜',
              '&varepsilon;': 'ϵ',
              '&varkappa;': 'ϰ',
              '&varnothing;': '∅',
              '&varphi;': 'ϕ',
              '&varpi;': 'ϖ',
              '&varpropto;': '∝',
              '&varr;': '↕',
              '&varrho;': 'ϱ',
              '&varsigma;': 'ς',
              '&varsubsetneq;': '⊊︀',
              '&varsubsetneqq;': '⫋︀',
              '&varsupsetneq;': '⊋︀',
              '&varsupsetneqq;': '⫌︀',
              '&vartheta;': 'ϑ',
              '&vartriangleleft;': '⊲',
              '&vartriangleright;': '⊳',
              '&vcy;': 'в',
              '&vdash;': '⊢',
              '&vee;': '∨',
              '&veebar;': '⊻',
              '&veeeq;': '≚',
              '&vellip;': '⋮',
              '&verbar;': '|',
              '&vert;': '|',
              '&vfr;': '𝔳',
              '&vltri;': '⊲',
              '&vnsub;': '⊂⃒',
              '&vnsup;': '⊃⃒',
              '&vopf;': '𝕧',
              '&vprop;': '∝',
              '&vrtri;': '⊳',
              '&vscr;': '𝓋',
              '&vsubnE;': '⫋︀',
              '&vsubne;': '⊊︀',
              '&vsupnE;': '⫌︀',
              '&vsupne;': '⊋︀',
              '&vzigzag;': '⦚',
              '&wcirc;': 'ŵ',
              '&wedbar;': '⩟',
              '&wedge;': '∧',
              '&wedgeq;': '≙',
              '&weierp;': '℘',
              '&wfr;': '𝔴',
              '&wopf;': '𝕨',
              '&wp;': '℘',
              '&wr;': '≀',
              '&wreath;': '≀',
              '&wscr;': '𝓌',
              '&xcap;': '⋂',
              '&xcirc;': '◯',
              '&xcup;': '⋃',
              '&xdtri;': '▽',
              '&xfr;': '𝔵',
              '&xhArr;': '⟺',
              '&xharr;': '⟷',
              '&xi;': 'ξ',
              '&xlArr;': '⟸',
              '&xlarr;': '⟵',
              '&xmap;': '⟼',
              '&xnis;': '⋻',
              '&xodot;': '⨀',
              '&xopf;': '𝕩',
              '&xoplus;': '⨁',
              '&xotime;': '⨂',
              '&xrArr;': '⟹',
              '&xrarr;': '⟶',
              '&xscr;': '𝓍',
              '&xsqcup;': '⨆',
              '&xuplus;': '⨄',
              '&xutri;': '△',
              '&xvee;': '⋁',
              '&xwedge;': '⋀',
              '&yacute': 'ý',
              '&yacute;': 'ý',
              '&yacy;': 'я',
              '&ycirc;': 'ŷ',
              '&ycy;': 'ы',
              '&yen': '¥',
              '&yen;': '¥',
              '&yfr;': '𝔶',
              '&yicy;': 'ї',
              '&yopf;': '𝕪',
              '&yscr;': '𝓎',
              '&yucy;': 'ю',
              '&yuml': 'ÿ',
              '&yuml;': 'ÿ',
              '&zacute;': 'ź',
              '&zcaron;': 'ž',
              '&zcy;': 'з',
              '&zdot;': 'ż',
              '&zeetrf;': 'ℨ',
              '&zeta;': 'ζ',
              '&zfr;': '𝔷',
              '&zhcy;': 'ж',
              '&zigrarr;': '⇝',
              '&zopf;': '𝕫',
              '&zscr;': '𝓏',
              '&zwj;': '‍',
              '&zwnj;': '‌',
            },
            characters: {
              Æ: '&AElig;',
              '&': '&amp;',
              Á: '&Aacute;',
              Ă: '&Abreve;',
              Â: '&Acirc;',
              А: '&Acy;',
              '𝔄': '&Afr;',
              À: '&Agrave;',
              Α: '&Alpha;',
              Ā: '&Amacr;',
              '⩓': '&And;',
              Ą: '&Aogon;',
              '𝔸': '&Aopf;',
              '⁡': '&af;',
              Å: '&angst;',
              '𝒜': '&Ascr;',
              '≔': '&coloneq;',
              Ã: '&Atilde;',
              Ä: '&Auml;',
              '∖': '&ssetmn;',
              '⫧': '&Barv;',
              '⌆': '&doublebarwedge;',
              Б: '&Bcy;',
              '∵': '&because;',
              ℬ: '&bernou;',
              Β: '&Beta;',
              '𝔅': '&Bfr;',
              '𝔹': '&Bopf;',
              '˘': '&breve;',
              '≎': '&bump;',
              Ч: '&CHcy;',
              '©': '&copy;',
              Ć: '&Cacute;',
              '⋒': '&Cap;',
              ⅅ: '&DD;',
              ℭ: '&Cfr;',
              Č: '&Ccaron;',
              Ç: '&Ccedil;',
              Ĉ: '&Ccirc;',
              '∰': '&Cconint;',
              Ċ: '&Cdot;',
              '¸': '&cedil;',
              '·': '&middot;',
              Χ: '&Chi;',
              '⊙': '&odot;',
              '⊖': '&ominus;',
              '⊕': '&oplus;',
              '⊗': '&otimes;',
              '∲': '&cwconint;',
              '”': '&rdquor;',
              '’': '&rsquor;',
              '∷': '&Proportion;',
              '⩴': '&Colone;',
              '≡': '&equiv;',
              '∯': '&DoubleContourIntegral;',
              '∮': '&oint;',
              ℂ: '&complexes;',
              '∐': '&coprod;',
              '∳': '&awconint;',
              '⨯': '&Cross;',
              '𝒞': '&Cscr;',
              '⋓': '&Cup;',
              '≍': '&asympeq;',
              '⤑': '&DDotrahd;',
              Ђ: '&DJcy;',
              Ѕ: '&DScy;',
              Џ: '&DZcy;',
              '‡': '&ddagger;',
              '↡': '&Darr;',
              '⫤': '&DoubleLeftTee;',
              Ď: '&Dcaron;',
              Д: '&Dcy;',
              '∇': '&nabla;',
              Δ: '&Delta;',
              '𝔇': '&Dfr;',
              '´': '&acute;',
              '˙': '&dot;',
              '˝': '&dblac;',
              '`': '&grave;',
              '˜': '&tilde;',
              '⋄': '&diamond;',
              ⅆ: '&dd;',
              '𝔻': '&Dopf;',
              '¨': '&uml;',
              '⃜': '&DotDot;',
              '≐': '&esdot;',
              '⇓': '&dArr;',
              '⇐': '&lArr;',
              '⇔': '&iff;',
              '⟸': '&xlArr;',
              '⟺': '&xhArr;',
              '⟹': '&xrArr;',
              '⇒': '&rArr;',
              '⊨': '&vDash;',
              '⇑': '&uArr;',
              '⇕': '&vArr;',
              '∥': '&spar;',
              '↓': '&downarrow;',
              '⤓': '&DownArrowBar;',
              '⇵': '&duarr;',
              '̑': '&DownBreve;',
              '⥐': '&DownLeftRightVector;',
              '⥞': '&DownLeftTeeVector;',
              '↽': '&lhard;',
              '⥖': '&DownLeftVectorBar;',
              '⥟': '&DownRightTeeVector;',
              '⇁': '&rightharpoondown;',
              '⥗': '&DownRightVectorBar;',
              '⊤': '&top;',
              '↧': '&mapstodown;',
              '𝒟': '&Dscr;',
              Đ: '&Dstrok;',
              Ŋ: '&ENG;',
              Ð: '&ETH;',
              É: '&Eacute;',
              Ě: '&Ecaron;',
              Ê: '&Ecirc;',
              Э: '&Ecy;',
              Ė: '&Edot;',
              '𝔈': '&Efr;',
              È: '&Egrave;',
              '∈': '&isinv;',
              Ē: '&Emacr;',
              '◻': '&EmptySmallSquare;',
              '▫': '&EmptyVerySmallSquare;',
              Ę: '&Eogon;',
              '𝔼': '&Eopf;',
              Ε: '&Epsilon;',
              '⩵': '&Equal;',
              '≂': '&esim;',
              '⇌': '&rlhar;',
              ℰ: '&expectation;',
              '⩳': '&Esim;',
              Η: '&Eta;',
              Ë: '&Euml;',
              '∃': '&exist;',
              ⅇ: '&exponentiale;',
              Ф: '&Fcy;',
              '𝔉': '&Ffr;',
              '◼': '&FilledSmallSquare;',
              '▪': '&squf;',
              '𝔽': '&Fopf;',
              '∀': '&forall;',
              ℱ: '&Fscr;',
              Ѓ: '&GJcy;',
              '>': '&gt;',
              Γ: '&Gamma;',
              Ϝ: '&Gammad;',
              Ğ: '&Gbreve;',
              Ģ: '&Gcedil;',
              Ĝ: '&Gcirc;',
              Г: '&Gcy;',
              Ġ: '&Gdot;',
              '𝔊': '&Gfr;',
              '⋙': '&ggg;',
              '𝔾': '&Gopf;',
              '≥': '&geq;',
              '⋛': '&gtreqless;',
              '≧': '&geqq;',
              '⪢': '&GreaterGreater;',
              '≷': '&gtrless;',
              '⩾': '&ges;',
              '≳': '&gtrsim;',
              '𝒢': '&Gscr;',
              '≫': '&gg;',
              Ъ: '&HARDcy;',
              ˇ: '&caron;',
              '^': '&Hat;',
              Ĥ: '&Hcirc;',
              ℌ: '&Poincareplane;',
              ℋ: '&hamilt;',
              ℍ: '&quaternions;',
              '─': '&boxh;',
              Ħ: '&Hstrok;',
              '≏': '&bumpeq;',
              Е: '&IEcy;',
              Ĳ: '&IJlig;',
              Ё: '&IOcy;',
              Í: '&Iacute;',
              Î: '&Icirc;',
              И: '&Icy;',
              İ: '&Idot;',
              ℑ: '&imagpart;',
              Ì: '&Igrave;',
              Ī: '&Imacr;',
              ⅈ: '&ii;',
              '∬': '&Int;',
              '∫': '&int;',
              '⋂': '&xcap;',
              '⁣': '&ic;',
              '⁢': '&it;',
              Į: '&Iogon;',
              '𝕀': '&Iopf;',
              Ι: '&Iota;',
              ℐ: '&imagline;',
              Ĩ: '&Itilde;',
              І: '&Iukcy;',
              Ï: '&Iuml;',
              Ĵ: '&Jcirc;',
              Й: '&Jcy;',
              '𝔍': '&Jfr;',
              '𝕁': '&Jopf;',
              '𝒥': '&Jscr;',
              Ј: '&Jsercy;',
              Є: '&Jukcy;',
              Х: '&KHcy;',
              Ќ: '&KJcy;',
              Κ: '&Kappa;',
              Ķ: '&Kcedil;',
              К: '&Kcy;',
              '𝔎': '&Kfr;',
              '𝕂': '&Kopf;',
              '𝒦': '&Kscr;',
              Љ: '&LJcy;',
              '<': '&lt;',
              Ĺ: '&Lacute;',
              Λ: '&Lambda;',
              '⟪': '&Lang;',
              ℒ: '&lagran;',
              '↞': '&twoheadleftarrow;',
              Ľ: '&Lcaron;',
              Ļ: '&Lcedil;',
              Л: '&Lcy;',
              '⟨': '&langle;',
              '←': '&slarr;',
              '⇤': '&larrb;',
              '⇆': '&lrarr;',
              '⌈': '&lceil;',
              '⟦': '&lobrk;',
              '⥡': '&LeftDownTeeVector;',
              '⇃': '&downharpoonleft;',
              '⥙': '&LeftDownVectorBar;',
              '⌊': '&lfloor;',
              '↔': '&leftrightarrow;',
              '⥎': '&LeftRightVector;',
              '⊣': '&dashv;',
              '↤': '&mapstoleft;',
              '⥚': '&LeftTeeVector;',
              '⊲': '&vltri;',
              '⧏': '&LeftTriangleBar;',
              '⊴': '&trianglelefteq;',
              '⥑': '&LeftUpDownVector;',
              '⥠': '&LeftUpTeeVector;',
              '↿': '&upharpoonleft;',
              '⥘': '&LeftUpVectorBar;',
              '↼': '&lharu;',
              '⥒': '&LeftVectorBar;',
              '⋚': '&lesseqgtr;',
              '≦': '&leqq;',
              '≶': '&lg;',
              '⪡': '&LessLess;',
              '⩽': '&les;',
              '≲': '&lsim;',
              '𝔏': '&Lfr;',
              '⋘': '&Ll;',
              '⇚': '&lAarr;',
              Ŀ: '&Lmidot;',
              '⟵': '&xlarr;',
              '⟷': '&xharr;',
              '⟶': '&xrarr;',
              '𝕃': '&Lopf;',
              '↙': '&swarrow;',
              '↘': '&searrow;',
              '↰': '&lsh;',
              Ł: '&Lstrok;',
              '≪': '&ll;',
              '⤅': '&Map;',
              М: '&Mcy;',
              ' ': '&MediumSpace;',
              ℳ: '&phmmat;',
              '𝔐': '&Mfr;',
              '∓': '&mp;',
              '𝕄': '&Mopf;',
              Μ: '&Mu;',
              Њ: '&NJcy;',
              Ń: '&Nacute;',
              Ň: '&Ncaron;',
              Ņ: '&Ncedil;',
              Н: '&Ncy;',
              '​': '&ZeroWidthSpace;',
              '\n': '&NewLine;',
              '𝔑': '&Nfr;',
              '⁠': '&NoBreak;',
              ' ': '&nbsp;',
              ℕ: '&naturals;',
              '⫬': '&Not;',
              '≢': '&nequiv;',
              '≭': '&NotCupCap;',
              '∦': '&nspar;',
              '∉': '&notinva;',
              '≠': '&ne;',
              '≂̸': '&nesim;',
              '∄': '&nexists;',
              '≯': '&ngtr;',
              '≱': '&ngeq;',
              '≧̸': '&ngeqq;',
              '≫̸': '&nGtv;',
              '≹': '&ntgl;',
              '⩾̸': '&nges;',
              '≵': '&ngsim;',
              '≎̸': '&nbump;',
              '≏̸': '&nbumpe;',
              '⋪': '&ntriangleleft;',
              '⧏̸': '&NotLeftTriangleBar;',
              '⋬': '&ntrianglelefteq;',
              '≮': '&nlt;',
              '≰': '&nleq;',
              '≸': '&ntlg;',
              '≪̸': '&nLtv;',
              '⩽̸': '&nles;',
              '≴': '&nlsim;',
              '⪢̸': '&NotNestedGreaterGreater;',
              '⪡̸': '&NotNestedLessLess;',
              '⊀': '&nprec;',
              '⪯̸': '&npreceq;',
              '⋠': '&nprcue;',
              '∌': '&notniva;',
              '⋫': '&ntriangleright;',
              '⧐̸': '&NotRightTriangleBar;',
              '⋭': '&ntrianglerighteq;',
              '⊏̸': '&NotSquareSubset;',
              '⋢': '&nsqsube;',
              '⊐̸': '&NotSquareSuperset;',
              '⋣': '&nsqsupe;',
              '⊂⃒': '&vnsub;',
              '⊈': '&nsubseteq;',
              '⊁': '&nsucc;',
              '⪰̸': '&nsucceq;',
              '⋡': '&nsccue;',
              '≿̸': '&NotSucceedsTilde;',
              '⊃⃒': '&vnsup;',
              '⊉': '&nsupseteq;',
              '≁': '&nsim;',
              '≄': '&nsimeq;',
              '≇': '&ncong;',
              '≉': '&napprox;',
              '∤': '&nsmid;',
              '𝒩': '&Nscr;',
              Ñ: '&Ntilde;',
              Ν: '&Nu;',
              Œ: '&OElig;',
              Ó: '&Oacute;',
              Ô: '&Ocirc;',
              О: '&Ocy;',
              Ő: '&Odblac;',
              '𝔒': '&Ofr;',
              Ò: '&Ograve;',
              Ō: '&Omacr;',
              Ω: '&ohm;',
              Ο: '&Omicron;',
              '𝕆': '&Oopf;',
              '“': '&ldquo;',
              '‘': '&lsquo;',
              '⩔': '&Or;',
              '𝒪': '&Oscr;',
              Ø: '&Oslash;',
              Õ: '&Otilde;',
              '⨷': '&Otimes;',
              Ö: '&Ouml;',
              '‾': '&oline;',
              '⏞': '&OverBrace;',
              '⎴': '&tbrk;',
              '⏜': '&OverParenthesis;',
              '∂': '&part;',
              П: '&Pcy;',
              '𝔓': '&Pfr;',
              Φ: '&Phi;',
              Π: '&Pi;',
              '±': '&pm;',
              ℙ: '&primes;',
              '⪻': '&Pr;',
              '≺': '&prec;',
              '⪯': '&preceq;',
              '≼': '&preccurlyeq;',
              '≾': '&prsim;',
              '″': '&Prime;',
              '∏': '&prod;',
              '∝': '&vprop;',
              '𝒫': '&Pscr;',
              Ψ: '&Psi;',
              '"': '&quot;',
              '𝔔': '&Qfr;',
              ℚ: '&rationals;',
              '𝒬': '&Qscr;',
              '⤐': '&drbkarow;',
              '®': '&reg;',
              Ŕ: '&Racute;',
              '⟫': '&Rang;',
              '↠': '&twoheadrightarrow;',
              '⤖': '&Rarrtl;',
              Ř: '&Rcaron;',
              Ŗ: '&Rcedil;',
              Р: '&Rcy;',
              ℜ: '&realpart;',
              '∋': '&niv;',
              '⇋': '&lrhar;',
              '⥯': '&duhar;',
              Ρ: '&Rho;',
              '⟩': '&rangle;',
              '→': '&srarr;',
              '⇥': '&rarrb;',
              '⇄': '&rlarr;',
              '⌉': '&rceil;',
              '⟧': '&robrk;',
              '⥝': '&RightDownTeeVector;',
              '⇂': '&downharpoonright;',
              '⥕': '&RightDownVectorBar;',
              '⌋': '&rfloor;',
              '⊢': '&vdash;',
              '↦': '&mapsto;',
              '⥛': '&RightTeeVector;',
              '⊳': '&vrtri;',
              '⧐': '&RightTriangleBar;',
              '⊵': '&trianglerighteq;',
              '⥏': '&RightUpDownVector;',
              '⥜': '&RightUpTeeVector;',
              '↾': '&upharpoonright;',
              '⥔': '&RightUpVectorBar;',
              '⇀': '&rightharpoonup;',
              '⥓': '&RightVectorBar;',
              ℝ: '&reals;',
              '⥰': '&RoundImplies;',
              '⇛': '&rAarr;',
              ℛ: '&realine;',
              '↱': '&rsh;',
              '⧴': '&RuleDelayed;',
              Щ: '&SHCHcy;',
              Ш: '&SHcy;',
              Ь: '&SOFTcy;',
              Ś: '&Sacute;',
              '⪼': '&Sc;',
              Š: '&Scaron;',
              Ş: '&Scedil;',
              Ŝ: '&Scirc;',
              С: '&Scy;',
              '𝔖': '&Sfr;',
              '↑': '&uparrow;',
              Σ: '&Sigma;',
              '∘': '&compfn;',
              '𝕊': '&Sopf;',
              '√': '&radic;',
              '□': '&square;',
              '⊓': '&sqcap;',
              '⊏': '&sqsubset;',
              '⊑': '&sqsubseteq;',
              '⊐': '&sqsupset;',
              '⊒': '&sqsupseteq;',
              '⊔': '&sqcup;',
              '𝒮': '&Sscr;',
              '⋆': '&sstarf;',
              '⋐': '&Subset;',
              '⊆': '&subseteq;',
              '≻': '&succ;',
              '⪰': '&succeq;',
              '≽': '&succcurlyeq;',
              '≿': '&succsim;',
              '∑': '&sum;',
              '⋑': '&Supset;',
              '⊃': '&supset;',
              '⊇': '&supseteq;',
              Þ: '&THORN;',
              '™': '&trade;',
              Ћ: '&TSHcy;',
              Ц: '&TScy;',
              '\t': '&Tab;',
              Τ: '&Tau;',
              Ť: '&Tcaron;',
              Ţ: '&Tcedil;',
              Т: '&Tcy;',
              '𝔗': '&Tfr;',
              '∴': '&therefore;',
              Θ: '&Theta;',
              '  ': '&ThickSpace;',
              ' ': '&thinsp;',
              '∼': '&thksim;',
              '≃': '&simeq;',
              '≅': '&cong;',
              '≈': '&thkap;',
              '𝕋': '&Topf;',
              '⃛': '&tdot;',
              '𝒯': '&Tscr;',
              Ŧ: '&Tstrok;',
              Ú: '&Uacute;',
              '↟': '&Uarr;',
              '⥉': '&Uarrocir;',
              Ў: '&Ubrcy;',
              Ŭ: '&Ubreve;',
              Û: '&Ucirc;',
              У: '&Ucy;',
              Ű: '&Udblac;',
              '𝔘': '&Ufr;',
              Ù: '&Ugrave;',
              Ū: '&Umacr;',
              _: '&lowbar;',
              '⏟': '&UnderBrace;',
              '⎵': '&bbrk;',
              '⏝': '&UnderParenthesis;',
              '⋃': '&xcup;',
              '⊎': '&uplus;',
              Ų: '&Uogon;',
              '𝕌': '&Uopf;',
              '⤒': '&UpArrowBar;',
              '⇅': '&udarr;',
              '↕': '&varr;',
              '⥮': '&udhar;',
              '⊥': '&perp;',
              '↥': '&mapstoup;',
              '↖': '&nwarrow;',
              '↗': '&nearrow;',
              ϒ: '&upsih;',
              Υ: '&Upsilon;',
              Ů: '&Uring;',
              '𝒰': '&Uscr;',
              Ũ: '&Utilde;',
              Ü: '&Uuml;',
              '⊫': '&VDash;',
              '⫫': '&Vbar;',
              В: '&Vcy;',
              '⊩': '&Vdash;',
              '⫦': '&Vdashl;',
              '⋁': '&xvee;',
              '‖': '&Vert;',
              '∣': '&smid;',
              '|': '&vert;',
              '❘': '&VerticalSeparator;',
              '≀': '&wreath;',
              ' ': '&hairsp;',
              '𝔙': '&Vfr;',
              '𝕍': '&Vopf;',
              '𝒱': '&Vscr;',
              '⊪': '&Vvdash;',
              Ŵ: '&Wcirc;',
              '⋀': '&xwedge;',
              '𝔚': '&Wfr;',
              '𝕎': '&Wopf;',
              '𝒲': '&Wscr;',
              '𝔛': '&Xfr;',
              Ξ: '&Xi;',
              '𝕏': '&Xopf;',
              '𝒳': '&Xscr;',
              Я: '&YAcy;',
              Ї: '&YIcy;',
              Ю: '&YUcy;',
              Ý: '&Yacute;',
              Ŷ: '&Ycirc;',
              Ы: '&Ycy;',
              '𝔜': '&Yfr;',
              '𝕐': '&Yopf;',
              '𝒴': '&Yscr;',
              Ÿ: '&Yuml;',
              Ж: '&ZHcy;',
              Ź: '&Zacute;',
              Ž: '&Zcaron;',
              З: '&Zcy;',
              Ż: '&Zdot;',
              Ζ: '&Zeta;',
              ℨ: '&zeetrf;',
              ℤ: '&integers;',
              '𝒵': '&Zscr;',
              á: '&aacute;',
              ă: '&abreve;',
              '∾': '&mstpos;',
              '∾̳': '&acE;',
              '∿': '&acd;',
              â: '&acirc;',
              а: '&acy;',
              æ: '&aelig;',
              '𝔞': '&afr;',
              à: '&agrave;',
              ℵ: '&aleph;',
              α: '&alpha;',
              ā: '&amacr;',
              '⨿': '&amalg;',
              '∧': '&wedge;',
              '⩕': '&andand;',
              '⩜': '&andd;',
              '⩘': '&andslope;',
              '⩚': '&andv;',
              '∠': '&angle;',
              '⦤': '&ange;',
              '∡': '&measuredangle;',
              '⦨': '&angmsdaa;',
              '⦩': '&angmsdab;',
              '⦪': '&angmsdac;',
              '⦫': '&angmsdad;',
              '⦬': '&angmsdae;',
              '⦭': '&angmsdaf;',
              '⦮': '&angmsdag;',
              '⦯': '&angmsdah;',
              '∟': '&angrt;',
              '⊾': '&angrtvb;',
              '⦝': '&angrtvbd;',
              '∢': '&angsph;',
              '⍼': '&angzarr;',
              ą: '&aogon;',
              '𝕒': '&aopf;',
              '⩰': '&apE;',
              '⩯': '&apacir;',
              '≊': '&approxeq;',
              '≋': '&apid;',
              "'": '&apos;',
              å: '&aring;',
              '𝒶': '&ascr;',
              '*': '&midast;',
              ã: '&atilde;',
              ä: '&auml;',
              '⨑': '&awint;',
              '⫭': '&bNot;',
              '≌': '&bcong;',
              '϶': '&bepsi;',
              '‵': '&bprime;',
              '∽': '&bsim;',
              '⋍': '&bsime;',
              '⊽': '&barvee;',
              '⌅': '&barwedge;',
              '⎶': '&bbrktbrk;',
              б: '&bcy;',
              '„': '&ldquor;',
              '⦰': '&bemptyv;',
              β: '&beta;',
              ℶ: '&beth;',
              '≬': '&twixt;',
              '𝔟': '&bfr;',
              '◯': '&xcirc;',
              '⨀': '&xodot;',
              '⨁': '&xoplus;',
              '⨂': '&xotime;',
              '⨆': '&xsqcup;',
              '★': '&starf;',
              '▽': '&xdtri;',
              '△': '&xutri;',
              '⨄': '&xuplus;',
              '⤍': '&rbarr;',
              '⧫': '&lozf;',
              '▴': '&utrif;',
              '▾': '&dtrif;',
              '◂': '&ltrif;',
              '▸': '&rtrif;',
              '␣': '&blank;',
              '▒': '&blk12;',
              '░': '&blk14;',
              '▓': '&blk34;',
              '█': '&block;',
              '=⃥': '&bne;',
              '≡⃥': '&bnequiv;',
              '⌐': '&bnot;',
              '𝕓': '&bopf;',
              '⋈': '&bowtie;',
              '╗': '&boxDL;',
              '╔': '&boxDR;',
              '╖': '&boxDl;',
              '╓': '&boxDr;',
              '═': '&boxH;',
              '╦': '&boxHD;',
              '╩': '&boxHU;',
              '╤': '&boxHd;',
              '╧': '&boxHu;',
              '╝': '&boxUL;',
              '╚': '&boxUR;',
              '╜': '&boxUl;',
              '╙': '&boxUr;',
              '║': '&boxV;',
              '╬': '&boxVH;',
              '╣': '&boxVL;',
              '╠': '&boxVR;',
              '╫': '&boxVh;',
              '╢': '&boxVl;',
              '╟': '&boxVr;',
              '⧉': '&boxbox;',
              '╕': '&boxdL;',
              '╒': '&boxdR;',
              '┐': '&boxdl;',
              '┌': '&boxdr;',
              '╥': '&boxhD;',
              '╨': '&boxhU;',
              '┬': '&boxhd;',
              '┴': '&boxhu;',
              '⊟': '&minusb;',
              '⊞': '&plusb;',
              '⊠': '&timesb;',
              '╛': '&boxuL;',
              '╘': '&boxuR;',
              '┘': '&boxul;',
              '└': '&boxur;',
              '│': '&boxv;',
              '╪': '&boxvH;',
              '╡': '&boxvL;',
              '╞': '&boxvR;',
              '┼': '&boxvh;',
              '┤': '&boxvl;',
              '├': '&boxvr;',
              '¦': '&brvbar;',
              '𝒷': '&bscr;',
              '⁏': '&bsemi;',
              '\\': '&bsol;',
              '⧅': '&bsolb;',
              '⟈': '&bsolhsub;',
              '•': '&bullet;',
              '⪮': '&bumpE;',
              ć: '&cacute;',
              '∩': '&cap;',
              '⩄': '&capand;',
              '⩉': '&capbrcup;',
              '⩋': '&capcap;',
              '⩇': '&capcup;',
              '⩀': '&capdot;',
              '∩︀': '&caps;',
              '⁁': '&caret;',
              '⩍': '&ccaps;',
              č: '&ccaron;',
              ç: '&ccedil;',
              ĉ: '&ccirc;',
              '⩌': '&ccups;',
              '⩐': '&ccupssm;',
              ċ: '&cdot;',
              '⦲': '&cemptyv;',
              '¢': '&cent;',
              '𝔠': '&cfr;',
              ч: '&chcy;',
              '✓': '&checkmark;',
              χ: '&chi;',
              '○': '&cir;',
              '⧃': '&cirE;',
              ˆ: '&circ;',
              '≗': '&cire;',
              '↺': '&olarr;',
              '↻': '&orarr;',
              'Ⓢ': '&oS;',
              '⊛': '&oast;',
              '⊚': '&ocir;',
              '⊝': '&odash;',
              '⨐': '&cirfnint;',
              '⫯': '&cirmid;',
              '⧂': '&cirscir;',
              '♣': '&clubsuit;',
              ':': '&colon;',
              ',': '&comma;',
              '@': '&commat;',
              '∁': '&complement;',
              '⩭': '&congdot;',
              '𝕔': '&copf;',
              '℗': '&copysr;',
              '↵': '&crarr;',
              '✗': '&cross;',
              '𝒸': '&cscr;',
              '⫏': '&csub;',
              '⫑': '&csube;',
              '⫐': '&csup;',
              '⫒': '&csupe;',
              '⋯': '&ctdot;',
              '⤸': '&cudarrl;',
              '⤵': '&cudarrr;',
              '⋞': '&curlyeqprec;',
              '⋟': '&curlyeqsucc;',
              '↶': '&curvearrowleft;',
              '⤽': '&cularrp;',
              '∪': '&cup;',
              '⩈': '&cupbrcap;',
              '⩆': '&cupcap;',
              '⩊': '&cupcup;',
              '⊍': '&cupdot;',
              '⩅': '&cupor;',
              '∪︀': '&cups;',
              '↷': '&curvearrowright;',
              '⤼': '&curarrm;',
              '⋎': '&cuvee;',
              '⋏': '&cuwed;',
              '¤': '&curren;',
              '∱': '&cwint;',
              '⌭': '&cylcty;',
              '⥥': '&dHar;',
              '†': '&dagger;',
              ℸ: '&daleth;',
              '‐': '&hyphen;',
              '⤏': '&rBarr;',
              ď: '&dcaron;',
              д: '&dcy;',
              '⇊': '&downdownarrows;',
              '⩷': '&eDDot;',
              '°': '&deg;',
              δ: '&delta;',
              '⦱': '&demptyv;',
              '⥿': '&dfisht;',
              '𝔡': '&dfr;',
              '♦': '&diams;',
              ϝ: '&gammad;',
              '⋲': '&disin;',
              '÷': '&divide;',
              '⋇': '&divonx;',
              ђ: '&djcy;',
              '⌞': '&llcorner;',
              '⌍': '&dlcrop;',
              $: '&dollar;',
              '𝕕': '&dopf;',
              '≑': '&eDot;',
              '∸': '&minusd;',
              '∔': '&plusdo;',
              '⊡': '&sdotb;',
              '⌟': '&lrcorner;',
              '⌌': '&drcrop;',
              '𝒹': '&dscr;',
              ѕ: '&dscy;',
              '⧶': '&dsol;',
              đ: '&dstrok;',
              '⋱': '&dtdot;',
              '▿': '&triangledown;',
              '⦦': '&dwangle;',
              џ: '&dzcy;',
              '⟿': '&dzigrarr;',
              é: '&eacute;',
              '⩮': '&easter;',
              ě: '&ecaron;',
              '≖': '&eqcirc;',
              ê: '&ecirc;',
              '≕': '&eqcolon;',
              э: '&ecy;',
              ė: '&edot;',
              '≒': '&fallingdotseq;',
              '𝔢': '&efr;',
              '⪚': '&eg;',
              è: '&egrave;',
              '⪖': '&eqslantgtr;',
              '⪘': '&egsdot;',
              '⪙': '&el;',
              '⏧': '&elinters;',
              ℓ: '&ell;',
              '⪕': '&eqslantless;',
              '⪗': '&elsdot;',
              ē: '&emacr;',
              '∅': '&varnothing;',
              ' ': '&emsp13;',
              ' ': '&emsp14;',
              ' ': '&emsp;',
              ŋ: '&eng;',
              ' ': '&ensp;',
              ę: '&eogon;',
              '𝕖': '&eopf;',
              '⋕': '&epar;',
              '⧣': '&eparsl;',
              '⩱': '&eplus;',
              ε: '&epsilon;',
              ϵ: '&varepsilon;',
              '=': '&equals;',
              '≟': '&questeq;',
              '⩸': '&equivDD;',
              '⧥': '&eqvparsl;',
              '≓': '&risingdotseq;',
              '⥱': '&erarr;',
              ℯ: '&escr;',
              η: '&eta;',
              ð: '&eth;',
              ë: '&euml;',
              '€': '&euro;',
              '!': '&excl;',
              ф: '&fcy;',
              '♀': '&female;',
              ﬃ: '&ffilig;',
              ﬀ: '&fflig;',
              ﬄ: '&ffllig;',
              '𝔣': '&ffr;',
              ﬁ: '&filig;',
              fj: '&fjlig;',
              '♭': '&flat;',
              ﬂ: '&fllig;',
              '▱': '&fltns;',
              ƒ: '&fnof;',
              '𝕗': '&fopf;',
              '⋔': '&pitchfork;',
              '⫙': '&forkv;',
              '⨍': '&fpartint;',
              '½': '&half;',
              '⅓': '&frac13;',
              '¼': '&frac14;',
              '⅕': '&frac15;',
              '⅙': '&frac16;',
              '⅛': '&frac18;',
              '⅔': '&frac23;',
              '⅖': '&frac25;',
              '¾': '&frac34;',
              '⅗': '&frac35;',
              '⅜': '&frac38;',
              '⅘': '&frac45;',
              '⅚': '&frac56;',
              '⅝': '&frac58;',
              '⅞': '&frac78;',
              '⁄': '&frasl;',
              '⌢': '&sfrown;',
              '𝒻': '&fscr;',
              '⪌': '&gtreqqless;',
              ǵ: '&gacute;',
              γ: '&gamma;',
              '⪆': '&gtrapprox;',
              ğ: '&gbreve;',
              ĝ: '&gcirc;',
              г: '&gcy;',
              ġ: '&gdot;',
              '⪩': '&gescc;',
              '⪀': '&gesdot;',
              '⪂': '&gesdoto;',
              '⪄': '&gesdotol;',
              '⋛︀': '&gesl;',
              '⪔': '&gesles;',
              '𝔤': '&gfr;',
              ℷ: '&gimel;',
              ѓ: '&gjcy;',
              '⪒': '&glE;',
              '⪥': '&gla;',
              '⪤': '&glj;',
              '≩': '&gneqq;',
              '⪊': '&gnapprox;',
              '⪈': '&gneq;',
              '⋧': '&gnsim;',
              '𝕘': '&gopf;',
              ℊ: '&gscr;',
              '⪎': '&gsime;',
              '⪐': '&gsiml;',
              '⪧': '&gtcc;',
              '⩺': '&gtcir;',
              '⋗': '&gtrdot;',
              '⦕': '&gtlPar;',
              '⩼': '&gtquest;',
              '⥸': '&gtrarr;',
              '≩︀': '&gvnE;',
              ъ: '&hardcy;',
              '⥈': '&harrcir;',
              '↭': '&leftrightsquigarrow;',
              ℏ: '&plankv;',
              ĥ: '&hcirc;',
              '♥': '&heartsuit;',
              '…': '&mldr;',
              '⊹': '&hercon;',
              '𝔥': '&hfr;',
              '⤥': '&searhk;',
              '⤦': '&swarhk;',
              '⇿': '&hoarr;',
              '∻': '&homtht;',
              '↩': '&larrhk;',
              '↪': '&rarrhk;',
              '𝕙': '&hopf;',
              '―': '&horbar;',
              '𝒽': '&hscr;',
              ħ: '&hstrok;',
              '⁃': '&hybull;',
              í: '&iacute;',
              î: '&icirc;',
              и: '&icy;',
              е: '&iecy;',
              '¡': '&iexcl;',
              '𝔦': '&ifr;',
              ì: '&igrave;',
              '⨌': '&qint;',
              '∭': '&tint;',
              '⧜': '&iinfin;',
              '℩': '&iiota;',
              ĳ: '&ijlig;',
              ī: '&imacr;',
              ı: '&inodot;',
              '⊷': '&imof;',
              Ƶ: '&imped;',
              '℅': '&incare;',
              '∞': '&infin;',
              '⧝': '&infintie;',
              '⊺': '&intercal;',
              '⨗': '&intlarhk;',
              '⨼': '&iprod;',
              ё: '&iocy;',
              į: '&iogon;',
              '𝕚': '&iopf;',
              ι: '&iota;',
              '¿': '&iquest;',
              '𝒾': '&iscr;',
              '⋹': '&isinE;',
              '⋵': '&isindot;',
              '⋴': '&isins;',
              '⋳': '&isinsv;',
              ĩ: '&itilde;',
              і: '&iukcy;',
              ï: '&iuml;',
              ĵ: '&jcirc;',
              й: '&jcy;',
              '𝔧': '&jfr;',
              ȷ: '&jmath;',
              '𝕛': '&jopf;',
              '𝒿': '&jscr;',
              ј: '&jsercy;',
              є: '&jukcy;',
              κ: '&kappa;',
              ϰ: '&varkappa;',
              ķ: '&kcedil;',
              к: '&kcy;',
              '𝔨': '&kfr;',
              ĸ: '&kgreen;',
              х: '&khcy;',
              ќ: '&kjcy;',
              '𝕜': '&kopf;',
              '𝓀': '&kscr;',
              '⤛': '&lAtail;',
              '⤎': '&lBarr;',
              '⪋': '&lesseqqgtr;',
              '⥢': '&lHar;',
              ĺ: '&lacute;',
              '⦴': '&laemptyv;',
              λ: '&lambda;',
              '⦑': '&langd;',
              '⪅': '&lessapprox;',
              '«': '&laquo;',
              '⤟': '&larrbfs;',
              '⤝': '&larrfs;',
              '↫': '&looparrowleft;',
              '⤹': '&larrpl;',
              '⥳': '&larrsim;',
              '↢': '&leftarrowtail;',
              '⪫': '&lat;',
              '⤙': '&latail;',
              '⪭': '&late;',
              '⪭︀': '&lates;',
              '⤌': '&lbarr;',
              '❲': '&lbbrk;',
              '{': '&lcub;',
              '[': '&lsqb;',
              '⦋': '&lbrke;',
              '⦏': '&lbrksld;',
              '⦍': '&lbrkslu;',
              ľ: '&lcaron;',
              ļ: '&lcedil;',
              л: '&lcy;',
              '⤶': '&ldca;',
              '⥧': '&ldrdhar;',
              '⥋': '&ldrushar;',
              '↲': '&ldsh;',
              '≤': '&leq;',
              '⇇': '&llarr;',
              '⋋': '&lthree;',
              '⪨': '&lescc;',
              '⩿': '&lesdot;',
              '⪁': '&lesdoto;',
              '⪃': '&lesdotor;',
              '⋚︀': '&lesg;',
              '⪓': '&lesges;',
              '⋖': '&ltdot;',
              '⥼': '&lfisht;',
              '𝔩': '&lfr;',
              '⪑': '&lgE;',
              '⥪': '&lharul;',
              '▄': '&lhblk;',
              љ: '&ljcy;',
              '⥫': '&llhard;',
              '◺': '&lltri;',
              ŀ: '&lmidot;',
              '⎰': '&lmoustache;',
              '≨': '&lneqq;',
              '⪉': '&lnapprox;',
              '⪇': '&lneq;',
              '⋦': '&lnsim;',
              '⟬': '&loang;',
              '⇽': '&loarr;',
              '⟼': '&xmap;',
              '↬': '&rarrlp;',
              '⦅': '&lopar;',
              '𝕝': '&lopf;',
              '⨭': '&loplus;',
              '⨴': '&lotimes;',
              '∗': '&lowast;',
              '◊': '&lozenge;',
              '(': '&lpar;',
              '⦓': '&lparlt;',
              '⥭': '&lrhard;',
              '‎': '&lrm;',
              '⊿': '&lrtri;',
              '‹': '&lsaquo;',
              '𝓁': '&lscr;',
              '⪍': '&lsime;',
              '⪏': '&lsimg;',
              '‚': '&sbquo;',
              ł: '&lstrok;',
              '⪦': '&ltcc;',
              '⩹': '&ltcir;',
              '⋉': '&ltimes;',
              '⥶': '&ltlarr;',
              '⩻': '&ltquest;',
              '⦖': '&ltrPar;',
              '◃': '&triangleleft;',
              '⥊': '&lurdshar;',
              '⥦': '&luruhar;',
              '≨︀': '&lvnE;',
              '∺': '&mDDot;',
              '¯': '&strns;',
              '♂': '&male;',
              '✠': '&maltese;',
              '▮': '&marker;',
              '⨩': '&mcomma;',
              м: '&mcy;',
              '—': '&mdash;',
              '𝔪': '&mfr;',
              '℧': '&mho;',
              µ: '&micro;',
              '⫰': '&midcir;',
              '−': '&minus;',
              '⨪': '&minusdu;',
              '⫛': '&mlcp;',
              '⊧': '&models;',
              '𝕞': '&mopf;',
              '𝓂': '&mscr;',
              μ: '&mu;',
              '⊸': '&mumap;',
              '⋙̸': '&nGg;',
              '≫⃒': '&nGt;',
              '⇍': '&nlArr;',
              '⇎': '&nhArr;',
              '⋘̸': '&nLl;',
              '≪⃒': '&nLt;',
              '⇏': '&nrArr;',
              '⊯': '&nVDash;',
              '⊮': '&nVdash;',
              ń: '&nacute;',
              '∠⃒': '&nang;',
              '⩰̸': '&napE;',
              '≋̸': '&napid;',
              ŉ: '&napos;',
              '♮': '&natural;',
              '⩃': '&ncap;',
              ň: '&ncaron;',
              ņ: '&ncedil;',
              '⩭̸': '&ncongdot;',
              '⩂': '&ncup;',
              н: '&ncy;',
              '–': '&ndash;',
              '⇗': '&neArr;',
              '⤤': '&nearhk;',
              '≐̸': '&nedot;',
              '⤨': '&toea;',
              '𝔫': '&nfr;',
              '↮': '&nleftrightarrow;',
              '⫲': '&nhpar;',
              '⋼': '&nis;',
              '⋺': '&nisd;',
              њ: '&njcy;',
              '≦̸': '&nleqq;',
              '↚': '&nleftarrow;',
              '‥': '&nldr;',
              '𝕟': '&nopf;',
              '¬': '&not;',
              '⋹̸': '&notinE;',
              '⋵̸': '&notindot;',
              '⋷': '&notinvb;',
              '⋶': '&notinvc;',
              '⋾': '&notnivb;',
              '⋽': '&notnivc;',
              '⫽⃥': '&nparsl;',
              '∂̸': '&npart;',
              '⨔': '&npolint;',
              '↛': '&nrightarrow;',
              '⤳̸': '&nrarrc;',
              '↝̸': '&nrarrw;',
              '𝓃': '&nscr;',
              '⊄': '&nsub;',
              '⫅̸': '&nsubseteqq;',
              '⊅': '&nsup;',
              '⫆̸': '&nsupseteqq;',
              ñ: '&ntilde;',
              ν: '&nu;',
              '#': '&num;',
              '№': '&numero;',
              ' ': '&numsp;',
              '⊭': '&nvDash;',
              '⤄': '&nvHarr;',
              '≍⃒': '&nvap;',
              '⊬': '&nvdash;',
              '≥⃒': '&nvge;',
              '>⃒': '&nvgt;',
              '⧞': '&nvinfin;',
              '⤂': '&nvlArr;',
              '≤⃒': '&nvle;',
              '<⃒': '&nvlt;',
              '⊴⃒': '&nvltrie;',
              '⤃': '&nvrArr;',
              '⊵⃒': '&nvrtrie;',
              '∼⃒': '&nvsim;',
              '⇖': '&nwArr;',
              '⤣': '&nwarhk;',
              '⤧': '&nwnear;',
              ó: '&oacute;',
              ô: '&ocirc;',
              о: '&ocy;',
              ő: '&odblac;',
              '⨸': '&odiv;',
              '⦼': '&odsold;',
              œ: '&oelig;',
              '⦿': '&ofcir;',
              '𝔬': '&ofr;',
              '˛': '&ogon;',
              ò: '&ograve;',
              '⧁': '&ogt;',
              '⦵': '&ohbar;',
              '⦾': '&olcir;',
              '⦻': '&olcross;',
              '⧀': '&olt;',
              ō: '&omacr;',
              ω: '&omega;',
              ο: '&omicron;',
              '⦶': '&omid;',
              '𝕠': '&oopf;',
              '⦷': '&opar;',
              '⦹': '&operp;',
              '∨': '&vee;',
              '⩝': '&ord;',
              ℴ: '&oscr;',
              ª: '&ordf;',
              º: '&ordm;',
              '⊶': '&origof;',
              '⩖': '&oror;',
              '⩗': '&orslope;',
              '⩛': '&orv;',
              ø: '&oslash;',
              '⊘': '&osol;',
              õ: '&otilde;',
              '⨶': '&otimesas;',
              ö: '&ouml;',
              '⌽': '&ovbar;',
              '¶': '&para;',
              '⫳': '&parsim;',
              '⫽': '&parsl;',
              п: '&pcy;',
              '%': '&percnt;',
              '.': '&period;',
              '‰': '&permil;',
              '‱': '&pertenk;',
              '𝔭': '&pfr;',
              φ: '&phi;',
              ϕ: '&varphi;',
              '☎': '&phone;',
              π: '&pi;',
              ϖ: '&varpi;',
              ℎ: '&planckh;',
              '+': '&plus;',
              '⨣': '&plusacir;',
              '⨢': '&pluscir;',
              '⨥': '&plusdu;',
              '⩲': '&pluse;',
              '⨦': '&plussim;',
              '⨧': '&plustwo;',
              '⨕': '&pointint;',
              '𝕡': '&popf;',
              '£': '&pound;',
              '⪳': '&prE;',
              '⪷': '&precapprox;',
              '⪹': '&prnap;',
              '⪵': '&prnE;',
              '⋨': '&prnsim;',
              '′': '&prime;',
              '⌮': '&profalar;',
              '⌒': '&profline;',
              '⌓': '&profsurf;',
              '⊰': '&prurel;',
              '𝓅': '&pscr;',
              ψ: '&psi;',
              ' ': '&puncsp;',
              '𝔮': '&qfr;',
              '𝕢': '&qopf;',
              '⁗': '&qprime;',
              '𝓆': '&qscr;',
              '⨖': '&quatint;',
              '?': '&quest;',
              '⤜': '&rAtail;',
              '⥤': '&rHar;',
              '∽̱': '&race;',
              ŕ: '&racute;',
              '⦳': '&raemptyv;',
              '⦒': '&rangd;',
              '⦥': '&range;',
              '»': '&raquo;',
              '⥵': '&rarrap;',
              '⤠': '&rarrbfs;',
              '⤳': '&rarrc;',
              '⤞': '&rarrfs;',
              '⥅': '&rarrpl;',
              '⥴': '&rarrsim;',
              '↣': '&rightarrowtail;',
              '↝': '&rightsquigarrow;',
              '⤚': '&ratail;',
              '∶': '&ratio;',
              '❳': '&rbbrk;',
              '}': '&rcub;',
              ']': '&rsqb;',
              '⦌': '&rbrke;',
              '⦎': '&rbrksld;',
              '⦐': '&rbrkslu;',
              ř: '&rcaron;',
              ŗ: '&rcedil;',
              р: '&rcy;',
              '⤷': '&rdca;',
              '⥩': '&rdldhar;',
              '↳': '&rdsh;',
              '▭': '&rect;',
              '⥽': '&rfisht;',
              '𝔯': '&rfr;',
              '⥬': '&rharul;',
              ρ: '&rho;',
              ϱ: '&varrho;',
              '⇉': '&rrarr;',
              '⋌': '&rthree;',
              '˚': '&ring;',
              '‏': '&rlm;',
              '⎱': '&rmoustache;',
              '⫮': '&rnmid;',
              '⟭': '&roang;',
              '⇾': '&roarr;',
              '⦆': '&ropar;',
              '𝕣': '&ropf;',
              '⨮': '&roplus;',
              '⨵': '&rotimes;',
              ')': '&rpar;',
              '⦔': '&rpargt;',
              '⨒': '&rppolint;',
              '›': '&rsaquo;',
              '𝓇': '&rscr;',
              '⋊': '&rtimes;',
              '▹': '&triangleright;',
              '⧎': '&rtriltri;',
              '⥨': '&ruluhar;',
              '℞': '&rx;',
              ś: '&sacute;',
              '⪴': '&scE;',
              '⪸': '&succapprox;',
              š: '&scaron;',
              ş: '&scedil;',
              ŝ: '&scirc;',
              '⪶': '&succneqq;',
              '⪺': '&succnapprox;',
              '⋩': '&succnsim;',
              '⨓': '&scpolint;',
              с: '&scy;',
              '⋅': '&sdot;',
              '⩦': '&sdote;',
              '⇘': '&seArr;',
              '§': '&sect;',
              ';': '&semi;',
              '⤩': '&tosa;',
              '✶': '&sext;',
              '𝔰': '&sfr;',
              '♯': '&sharp;',
              щ: '&shchcy;',
              ш: '&shcy;',
              '­': '&shy;',
              σ: '&sigma;',
              ς: '&varsigma;',
              '⩪': '&simdot;',
              '⪞': '&simg;',
              '⪠': '&simgE;',
              '⪝': '&siml;',
              '⪟': '&simlE;',
              '≆': '&simne;',
              '⨤': '&simplus;',
              '⥲': '&simrarr;',
              '⨳': '&smashp;',
              '⧤': '&smeparsl;',
              '⌣': '&ssmile;',
              '⪪': '&smt;',
              '⪬': '&smte;',
              '⪬︀': '&smtes;',
              ь: '&softcy;',
              '/': '&sol;',
              '⧄': '&solb;',
              '⌿': '&solbar;',
              '𝕤': '&sopf;',
              '♠': '&spadesuit;',
              '⊓︀': '&sqcaps;',
              '⊔︀': '&sqcups;',
              '𝓈': '&sscr;',
              '☆': '&star;',
              '⊂': '&subset;',
              '⫅': '&subseteqq;',
              '⪽': '&subdot;',
              '⫃': '&subedot;',
              '⫁': '&submult;',
              '⫋': '&subsetneqq;',
              '⊊': '&subsetneq;',
              '⪿': '&subplus;',
              '⥹': '&subrarr;',
              '⫇': '&subsim;',
              '⫕': '&subsub;',
              '⫓': '&subsup;',
              '♪': '&sung;',
              '¹': '&sup1;',
              '²': '&sup2;',
              '³': '&sup3;',
              '⫆': '&supseteqq;',
              '⪾': '&supdot;',
              '⫘': '&supdsub;',
              '⫄': '&supedot;',
              '⟉': '&suphsol;',
              '⫗': '&suphsub;',
              '⥻': '&suplarr;',
              '⫂': '&supmult;',
              '⫌': '&supsetneqq;',
              '⊋': '&supsetneq;',
              '⫀': '&supplus;',
              '⫈': '&supsim;',
              '⫔': '&supsub;',
              '⫖': '&supsup;',
              '⇙': '&swArr;',
              '⤪': '&swnwar;',
              ß: '&szlig;',
              '⌖': '&target;',
              τ: '&tau;',
              ť: '&tcaron;',
              ţ: '&tcedil;',
              т: '&tcy;',
              '⌕': '&telrec;',
              '𝔱': '&tfr;',
              θ: '&theta;',
              ϑ: '&vartheta;',
              þ: '&thorn;',
              '×': '&times;',
              '⨱': '&timesbar;',
              '⨰': '&timesd;',
              '⌶': '&topbot;',
              '⫱': '&topcir;',
              '𝕥': '&topf;',
              '⫚': '&topfork;',
              '‴': '&tprime;',
              '▵': '&utri;',
              '≜': '&trie;',
              '◬': '&tridot;',
              '⨺': '&triminus;',
              '⨹': '&triplus;',
              '⧍': '&trisb;',
              '⨻': '&tritime;',
              '⏢': '&trpezium;',
              '𝓉': '&tscr;',
              ц: '&tscy;',
              ћ: '&tshcy;',
              ŧ: '&tstrok;',
              '⥣': '&uHar;',
              ú: '&uacute;',
              ў: '&ubrcy;',
              ŭ: '&ubreve;',
              û: '&ucirc;',
              у: '&ucy;',
              ű: '&udblac;',
              '⥾': '&ufisht;',
              '𝔲': '&ufr;',
              ù: '&ugrave;',
              '▀': '&uhblk;',
              '⌜': '&ulcorner;',
              '⌏': '&ulcrop;',
              '◸': '&ultri;',
              ū: '&umacr;',
              ų: '&uogon;',
              '𝕦': '&uopf;',
              υ: '&upsilon;',
              '⇈': '&uuarr;',
              '⌝': '&urcorner;',
              '⌎': '&urcrop;',
              ů: '&uring;',
              '◹': '&urtri;',
              '𝓊': '&uscr;',
              '⋰': '&utdot;',
              ũ: '&utilde;',
              ü: '&uuml;',
              '⦧': '&uwangle;',
              '⫨': '&vBar;',
              '⫩': '&vBarv;',
              '⦜': '&vangrt;',
              '⊊︀': '&vsubne;',
              '⫋︀': '&vsubnE;',
              '⊋︀': '&vsupne;',
              '⫌︀': '&vsupnE;',
              в: '&vcy;',
              '⊻': '&veebar;',
              '≚': '&veeeq;',
              '⋮': '&vellip;',
              '𝔳': '&vfr;',
              '𝕧': '&vopf;',
              '𝓋': '&vscr;',
              '⦚': '&vzigzag;',
              ŵ: '&wcirc;',
              '⩟': '&wedbar;',
              '≙': '&wedgeq;',
              '℘': '&wp;',
              '𝔴': '&wfr;',
              '𝕨': '&wopf;',
              '𝓌': '&wscr;',
              '𝔵': '&xfr;',
              ξ: '&xi;',
              '⋻': '&xnis;',
              '𝕩': '&xopf;',
              '𝓍': '&xscr;',
              ý: '&yacute;',
              я: '&yacy;',
              ŷ: '&ycirc;',
              ы: '&ycy;',
              '¥': '&yen;',
              '𝔶': '&yfr;',
              ї: '&yicy;',
              '𝕪': '&yopf;',
              '𝓎': '&yscr;',
              ю: '&yucy;',
              ÿ: '&yuml;',
              ź: '&zacute;',
              ž: '&zcaron;',
              з: '&zcy;',
              ż: '&zdot;',
              ζ: '&zeta;',
              '𝔷': '&zfr;',
              ж: '&zhcy;',
              '⇝': '&zigrarr;',
              '𝕫': '&zopf;',
              '𝓏': '&zscr;',
              '‍': '&zwj;',
              '‌': '&zwnj;',
            },
          },
        }

        /***/
      },

    /***/ 946:
      /*!*******************************************************************!*\
  !*** ../../node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \*******************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        'use strict'
        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.numericUnicodeMap = {
          0: 65533,
          128: 8364,
          130: 8218,
          131: 402,
          132: 8222,
          133: 8230,
          134: 8224,
          135: 8225,
          136: 710,
          137: 8240,
          138: 352,
          139: 8249,
          140: 338,
          142: 381,
          145: 8216,
          146: 8217,
          147: 8220,
          148: 8221,
          149: 8226,
          150: 8211,
          151: 8212,
          152: 732,
          153: 8482,
          154: 353,
          155: 8250,
          156: 339,
          158: 382,
          159: 376,
        }

        /***/
      },

    /***/ 265:
      /*!***************************************************************!*\
  !*** ../../node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        'use strict'
        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.fromCodePoint =
          String.fromCodePoint ||
          function (astralCodePoint) {
            return String.fromCharCode(
              Math.floor((astralCodePoint - 65536) / 1024) +
                55296,
              ((astralCodePoint - 65536) % 1024) + 56320,
            )
          }
        exports.getCodePoint = String.prototype.codePointAt
          ? function (input, position) {
              return input.codePointAt(position)
            }
          : function (input, position) {
              return (
                (input.charCodeAt(position) - 55296) * 1024 +
                input.charCodeAt(position + 1) -
                56320 +
                65536
              )
            }
        exports.highSurrogateFrom = 55296
        exports.highSurrogateTo = 56319

        /***/
      },

    /***/ 673:
      /*!**********************************************!*\
  !*** ../../node_modules/strip-ansi/index.js ***!
  \**********************************************/
      /***/ (
        module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        'use strict'

        const ansiRegex = __webpack_require__(
          /*! ansi-regex */ 937,
        )

        module.exports = string =>
          typeof string === 'string'
            ? string.replace(ansiRegex(), '')
            : string

        /***/
      },

    /***/ 307:
      /*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
      /***/ (
        module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(
          __webpack_exports__,
          {
            /* harmony export */ default: () =>
              __WEBPACK_DEFAULT_EXPORT__,
            /* harmony export */
          },
        )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ 62,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ 36,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ 793,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ 892,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ 173,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ 464,
          )
        /* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default =
          /*#__PURE__*/ __webpack_require__.n(
            _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__,
          )
        /* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[11].use[1]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[11].use[2]!./app.scss */ 557,
          )

        var options = {}

        options.styleTagTransform =
          _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default()
        options.setAttributes =
          _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default()

        options.insert =
          _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(
            null,
            'head',
          )

        options.domAPI =
          _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default()
        options.insertStyleElement =
          _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default()

        var update =
          _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(
            _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
              'default'
            ],
            options,
          )

        if (true) {
          if (
            !_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
              'default'
            ].locals ||
            module.hot.invalidate
          ) {
            var isEqualLocals = function isEqualLocals(
              a,
              b,
              isNamedExport,
            ) {
              if ((!a && b) || (a && !b)) {
                return false
              }

              var p

              for (p in a) {
                if (isNamedExport && p === 'default') {
                  // eslint-disable-next-line no-continue
                  continue
                }

                if (a[p] !== b[p]) {
                  return false
                }
              }

              for (p in b) {
                if (isNamedExport && p === 'default') {
                  // eslint-disable-next-line no-continue
                  continue
                }

                if (!a[p]) {
                  return false
                }
              }

              return true
            }
            var isNamedExport =
              !_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
                'default'
              ].locals
            var oldLocals = isNamedExport
              ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__
              : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
                  'default'
                ].locals

            module.hot.accept(
              /*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[11].use[1]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[11].use[2]!./app.scss */ 557,
              __WEBPACK_OUTDATED_DEPENDENCIES__ => {
                /* harmony import */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__ =
                  __webpack_require__(
                    /*! !!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[11].use[1]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[11].use[2]!./app.scss */ 557,
                  )
                ;(function () {
                  if (
                    !isEqualLocals(
                      oldLocals,
                      isNamedExport
                        ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__
                        : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
                            'default'
                          ].locals,
                      isNamedExport,
                    )
                  ) {
                    module.hot.invalidate()

                    return
                  }

                  oldLocals = isNamedExport
                    ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__
                    : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
                        'default'
                      ].locals

                  update(
                    _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
                      'default'
                    ],
                  )
                })(__WEBPACK_OUTDATED_DEPENDENCIES__)
              },
            )
          }

          module.hot.dispose(function () {
            update()
          })
        }

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
            'default'
          ] &&
          _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
            'default'
          ].locals
            ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_1_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_oneOf_11_use_2_app_scss__WEBPACK_IMPORTED_MODULE_6__[
                'default'
              ].locals
            : undefined

        /***/
      },

    /***/ 62:
      /*!********************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************/
      /***/ module => {
        'use strict'

        var stylesInDOM = []

        function getIndexByIdentifier(identifier) {
          var result = -1

          for (var i = 0; i < stylesInDOM.length; i++) {
            if (stylesInDOM[i].identifier === identifier) {
              result = i
              break
            }
          }

          return result
        }

        function modulesToDom(list, options) {
          var idCountMap = {}
          var identifiers = []

          for (var i = 0; i < list.length; i++) {
            var item = list[i]
            var id = options.base
              ? item[0] + options.base
              : item[0]
            var count = idCountMap[id] || 0
            var identifier = ''.concat(id, ' ').concat(count)
            idCountMap[id] = count + 1
            var indexByIdentifier =
              getIndexByIdentifier(identifier)
            var obj = {
              css: item[1],
              media: item[2],
              sourceMap: item[3],
              supports: item[4],
              layer: item[5],
            }

            if (indexByIdentifier !== -1) {
              stylesInDOM[indexByIdentifier].references++
              stylesInDOM[indexByIdentifier].updater(obj)
            } else {
              var updater = addElementStyle(obj, options)
              options.byIndex = i
              stylesInDOM.splice(i, 0, {
                identifier: identifier,
                updater: updater,
                references: 1,
              })
            }

            identifiers.push(identifier)
          }

          return identifiers
        }

        function addElementStyle(obj, options) {
          var api = options.domAPI(options)
          api.update(obj)

          var updater = function updater(newObj) {
            if (newObj) {
              if (
                newObj.css === obj.css &&
                newObj.media === obj.media &&
                newObj.sourceMap === obj.sourceMap &&
                newObj.supports === obj.supports &&
                newObj.layer === obj.layer
              ) {
                return
              }

              api.update((obj = newObj))
            } else {
              api.remove()
            }
          }

          return updater
        }

        module.exports = function (list, options) {
          options = options || {}
          list = list || []
          var lastIdentifiers = modulesToDom(list, options)
          return function update(newList) {
            newList = newList || []

            for (var i = 0; i < lastIdentifiers.length; i++) {
              var identifier = lastIdentifiers[i]
              var index = getIndexByIdentifier(identifier)
              stylesInDOM[index].references--
            }

            var newLastIdentifiers = modulesToDom(
              newList,
              options,
            )

            for (var _i = 0; _i < lastIdentifiers.length; _i++) {
              var _identifier = lastIdentifiers[_i]

              var _index = getIndexByIdentifier(_identifier)

              if (stylesInDOM[_index].references === 0) {
                stylesInDOM[_index].updater()

                stylesInDOM.splice(_index, 1)
              }
            }

            lastIdentifiers = newLastIdentifiers
          }
        }

        /***/
      },

    /***/ 793:
      /*!************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************/
      /***/ module => {
        'use strict'

        var memo = {}
        /* istanbul ignore next  */

        function getTarget(target) {
          if (typeof memo[target] === 'undefined') {
            var styleTarget = document.querySelector(target) // Special case to return head of iframe instead of iframe itself

            if (
              window.HTMLIFrameElement &&
              styleTarget instanceof window.HTMLIFrameElement
            ) {
              try {
                // This will throw an exception if access to iframe is blocked
                // due to cross-origin restrictions
                styleTarget = styleTarget.contentDocument.head
              } catch (e) {
                // istanbul ignore next
                styleTarget = null
              }
            }

            memo[target] = styleTarget
          }

          return memo[target]
        }
        /* istanbul ignore next  */

        function insertBySelector(insert, style) {
          var target = getTarget(insert)

          if (!target) {
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
            )
          }

          target.appendChild(style)
        }

        module.exports = insertBySelector

        /***/
      },

    /***/ 173:
      /*!**************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************/
      /***/ module => {
        'use strict'

        /* istanbul ignore next  */
        function insertStyleElement(options) {
          var element = document.createElement('style')
          options.setAttributes(element, options.attributes)
          options.insert(element, options.options)
          return element
        }

        module.exports = insertStyleElement

        /***/
      },

    /***/ 892:
      /*!**************************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************/
      /***/ (
        module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        'use strict'

        /* istanbul ignore next  */
        function setAttributesWithoutAttributes(styleElement) {
          var nonce = true ? __webpack_require__.nc : 0

          if (nonce) {
            styleElement.setAttribute('nonce', nonce)
          }
        }

        module.exports = setAttributesWithoutAttributes

        /***/
      },

    /***/ 36:
      /*!*******************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************/
      /***/ module => {
        'use strict'

        /* istanbul ignore next  */
        function apply(styleElement, options, obj) {
          var css = ''

          if (obj.supports) {
            css += '@supports ('.concat(obj.supports, ') {')
          }

          if (obj.media) {
            css += '@media '.concat(obj.media, ' {')
          }

          var needLayer = typeof obj.layer !== 'undefined'

          if (needLayer) {
            css += '@layer'.concat(
              obj.layer.length > 0 ? ' '.concat(obj.layer) : '',
              ' {',
            )
          }

          css += obj.css

          if (needLayer) {
            css += '}'
          }

          if (obj.media) {
            css += '}'
          }

          if (obj.supports) {
            css += '}'
          }

          var sourceMap = obj.sourceMap

          if (sourceMap && typeof btoa !== 'undefined') {
            css +=
              '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
                btoa(
                  unescape(
                    encodeURIComponent(
                      JSON.stringify(sourceMap),
                    ),
                  ),
                ),
                ' */',
              )
          } // For old IE

          /* istanbul ignore if  */

          options.styleTagTransform(
            css,
            styleElement,
            options.options,
          )
        }

        function removeStyleElement(styleElement) {
          // istanbul ignore if
          if (styleElement.parentNode === null) {
            return false
          }

          styleElement.parentNode.removeChild(styleElement)
        }
        /* istanbul ignore next  */

        function domAPI(options) {
          var styleElement = options.insertStyleElement(options)
          return {
            update: function update(obj) {
              apply(styleElement, options, obj)
            },
            remove: function remove() {
              removeStyleElement(styleElement)
            },
          }
        }

        module.exports = domAPI

        /***/
      },

    /***/ 464:
      /*!*************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************/
      /***/ module => {
        'use strict'

        /* istanbul ignore next  */
        function styleTagTransform(css, styleElement) {
          if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css
          } else {
            while (styleElement.firstChild) {
              styleElement.removeChild(styleElement.firstChild)
            }

            styleElement.appendChild(
              document.createTextNode(css),
            )
          }
        }

        module.exports = styleTagTransform

        /***/
      },

    /***/ 163:
      /*!*********************************************!*\
  !*** ../../node_modules/tslib/tslib.es6.js ***!
  \*********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        'use strict'
        __webpack_require__.r(__webpack_exports__)
        /* harmony export */ __webpack_require__.d(
          __webpack_exports__,
          {
            /* harmony export */ __extends: () =>
              /* binding */ __extends,
            /* harmony export */ __assign: () =>
              /* binding */ __assign,
            /* harmony export */ __rest: () =>
              /* binding */ __rest,
            /* harmony export */ __decorate: () =>
              /* binding */ __decorate,
            /* harmony export */ __param: () =>
              /* binding */ __param,
            /* harmony export */ __metadata: () =>
              /* binding */ __metadata,
            /* harmony export */ __awaiter: () =>
              /* binding */ __awaiter,
            /* harmony export */ __generator: () =>
              /* binding */ __generator,
            /* harmony export */ __createBinding: () =>
              /* binding */ __createBinding,
            /* harmony export */ __exportStar: () =>
              /* binding */ __exportStar,
            /* harmony export */ __values: () =>
              /* binding */ __values,
            /* harmony export */ __read: () =>
              /* binding */ __read,
            /* harmony export */ __spread: () =>
              /* binding */ __spread,
            /* harmony export */ __spreadArrays: () =>
              /* binding */ __spreadArrays,
            /* harmony export */ __spreadArray: () =>
              /* binding */ __spreadArray,
            /* harmony export */ __await: () =>
              /* binding */ __await,
            /* harmony export */ __asyncGenerator: () =>
              /* binding */ __asyncGenerator,
            /* harmony export */ __asyncDelegator: () =>
              /* binding */ __asyncDelegator,
            /* harmony export */ __asyncValues: () =>
              /* binding */ __asyncValues,
            /* harmony export */ __makeTemplateObject: () =>
              /* binding */ __makeTemplateObject,
            /* harmony export */ __importStar: () =>
              /* binding */ __importStar,
            /* harmony export */ __importDefault: () =>
              /* binding */ __importDefault,
            /* harmony export */ __classPrivateFieldGet: () =>
              /* binding */ __classPrivateFieldGet,
            /* harmony export */ __classPrivateFieldSet: () =>
              /* binding */ __classPrivateFieldSet,
            /* harmony export */
          },
        )
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        /* global Reflect, Promise */

        var extendStatics = function (d, b) {
          extendStatics =
            Object.setPrototypeOf ||
            ({__proto__: []} instanceof Array &&
              function (d, b) {
                d.__proto__ = b
              }) ||
            function (d, b) {
              for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                  d[p] = b[p]
            }
          return extendStatics(d, b)
        }

        function __extends(d, b) {
          if (typeof b !== 'function' && b !== null)
            throw new TypeError(
              'Class extends value ' +
                String(b) +
                ' is not a constructor or null',
            )
          extendStatics(d, b)
          function __() {
            this.constructor = d
          }
          d.prototype =
            b === null
              ? Object.create(b)
              : ((__.prototype = b.prototype), new __())
        }

        var __assign = function () {
          __assign =
            Object.assign ||
            function __assign(t) {
              for (
                var s, i = 1, n = arguments.length;
                i < n;
                i++
              ) {
                s = arguments[i]
                for (var p in s)
                  if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p]
              }
              return t
            }
          return __assign.apply(this, arguments)
        }

        function __rest(s, e) {
          var t = {}
          for (var p in s)
            if (
              Object.prototype.hasOwnProperty.call(s, p) &&
              e.indexOf(p) < 0
            )
              t[p] = s[p]
          if (
            s != null &&
            typeof Object.getOwnPropertySymbols === 'function'
          )
            for (
              var i = 0, p = Object.getOwnPropertySymbols(s);
              i < p.length;
              i++
            ) {
              if (
                e.indexOf(p[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(
                  s,
                  p[i],
                )
              )
                t[p[i]] = s[p[i]]
            }
          return t
        }

        function __decorate(decorators, target, key, desc) {
          var c = arguments.length,
            r =
              c < 3
                ? target
                : desc === null
                ? (desc = Object.getOwnPropertyDescriptor(
                    target,
                    key,
                  ))
                : desc,
            d
          if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
          )
            r = Reflect.decorate(decorators, target, key, desc)
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if ((d = decorators[i]))
                r =
                  (c < 3
                    ? d(r)
                    : c > 3
                    ? d(target, key, r)
                    : d(target, key)) || r
          return (
            c > 3 && r && Object.defineProperty(target, key, r),
            r
          )
        }

        function __param(paramIndex, decorator) {
          return function (target, key) {
            decorator(target, key, paramIndex)
          }
        }

        function __metadata(metadataKey, metadataValue) {
          if (
            typeof Reflect === 'object' &&
            typeof Reflect.metadata === 'function'
          )
            return Reflect.metadata(metadataKey, metadataValue)
        }

        function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value)
                })
          }
          return new (P || (P = Promise))(function (
            resolve,
            reject,
          ) {
            function fulfilled(value) {
              try {
                step(generator.next(value))
              } catch (e) {
                reject(e)
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value))
              } catch (e) {
                reject(e)
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected)
            }
            step(
              (generator = generator.apply(
                thisArg,
                _arguments || [],
              )).next(),
            )
          })
        }

        function __generator(thisArg, body) {
          var _ = {
              label: 0,
              sent: function () {
                if (t[0] & 1) throw t[1]
                return t[1]
              },
              trys: [],
              ops: [],
            },
            f,
            y,
            t,
            g
          return (
            (g = {
              next: verb(0),
              throw: verb(1),
              return: verb(2),
            }),
            typeof Symbol === 'function' &&
              (g[Symbol.iterator] = function () {
                return this
              }),
            g
          )
          function verb(n) {
            return function (v) {
              return step([n, v])
            }
          }
          function step(op) {
            if (f)
              throw new TypeError(
                'Generator is already executing.',
              )
            while (_)
              try {
                if (
                  ((f = 1),
                  y &&
                    (t =
                      op[0] & 2
                        ? y['return']
                        : op[0]
                        ? y['throw'] ||
                          ((t = y['return']) && t.call(y), 0)
                        : y.next) &&
                    !(t = t.call(y, op[1])).done)
                )
                  return t
                if (((y = 0), t)) op = [op[0] & 2, t.value]
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op
                    break
                  case 4:
                    _.label++
                    return {value: op[1], done: false}
                  case 5:
                    _.label++
                    y = op[1]
                    op = [0]
                    continue
                  case 7:
                    op = _.ops.pop()
                    _.trys.pop()
                    continue
                  default:
                    if (
                      !((t = _.trys),
                      (t = t.length > 0 && t[t.length - 1])) &&
                      (op[0] === 6 || op[0] === 2)
                    ) {
                      _ = 0
                      continue
                    }
                    if (
                      op[0] === 3 &&
                      (!t || (op[1] > t[0] && op[1] < t[3]))
                    ) {
                      _.label = op[1]
                      break
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1]
                      t = op
                      break
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2]
                      _.ops.push(op)
                      break
                    }
                    if (t[2]) _.ops.pop()
                    _.trys.pop()
                    continue
                }
                op = body.call(thisArg, _)
              } catch (e) {
                op = [6, e]
                y = 0
              } finally {
                f = t = 0
              }
            if (op[0] & 5) throw op[1]
            return {value: op[0] ? op[1] : void 0, done: true}
          }
        }

        var __createBinding = Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k]
                },
              })
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              o[k2] = m[k]
            }

        function __exportStar(m, o) {
          for (var p in m)
            if (
              p !== 'default' &&
              !Object.prototype.hasOwnProperty.call(o, p)
            )
              __createBinding(o, m, p)
        }

        function __values(o) {
          var s =
              typeof Symbol === 'function' && Symbol.iterator,
            m = s && o[s],
            i = 0
          if (m) return m.call(o)
          if (o && typeof o.length === 'number')
            return {
              next: function () {
                if (o && i >= o.length) o = void 0
                return {value: o && o[i++], done: !o}
              },
            }
          throw new TypeError(
            s
              ? 'Object is not iterable.'
              : 'Symbol.iterator is not defined.',
          )
        }

        function __read(o, n) {
          var m =
            typeof Symbol === 'function' && o[Symbol.iterator]
          if (!m) return o
          var i = m.call(o),
            r,
            ar = [],
            e
          try {
            while (
              (n === void 0 || n-- > 0) &&
              !(r = i.next()).done
            )
              ar.push(r.value)
          } catch (error) {
            e = {error: error}
          } finally {
            try {
              if (r && !r.done && (m = i['return'])) m.call(i)
            } finally {
              if (e) throw e.error
            }
          }
          return ar
        }

        /** @deprecated */
        function __spread() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]))
          return ar
        }

        /** @deprecated */
        function __spreadArrays() {
          for (
            var s = 0, i = 0, il = arguments.length;
            i < il;
            i++
          )
            s += arguments[i].length
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (
              var a = arguments[i], j = 0, jl = a.length;
              j < jl;
              j++, k++
            )
              r[k] = a[j]
          return r
        }

        function __spreadArray(to, from, pack) {
          if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
              if (ar || !(i in from)) {
                if (!ar)
                  ar = Array.prototype.slice.call(from, 0, i)
                ar[i] = from[i]
              }
            }
          return to.concat(
            ar || Array.prototype.slice.call(from),
          )
        }

        function __await(v) {
          return this instanceof __await
            ? ((this.v = v), this)
            : new __await(v)
        }

        function __asyncGenerator(
          thisArg,
          _arguments,
          generator,
        ) {
          if (!Symbol.asyncIterator)
            throw new TypeError(
              'Symbol.asyncIterator is not defined.',
            )
          var g = generator.apply(thisArg, _arguments || []),
            i,
            q = []
          return (
            (i = {}),
            verb('next'),
            verb('throw'),
            verb('return'),
            (i[Symbol.asyncIterator] = function () {
              return this
            }),
            i
          )
          function verb(n) {
            if (g[n])
              i[n] = function (v) {
                return new Promise(function (a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v)
                })
              }
          }
          function resume(n, v) {
            try {
              step(g[n](v))
            } catch (e) {
              settle(q[0][3], e)
            }
          }
          function step(r) {
            r.value instanceof __await
              ? Promise.resolve(r.value.v).then(fulfill, reject)
              : settle(q[0][2], r)
          }
          function fulfill(value) {
            resume('next', value)
          }
          function reject(value) {
            resume('throw', value)
          }
          function settle(f, v) {
            if ((f(v), q.shift(), q.length))
              resume(q[0][0], q[0][1])
          }
        }

        function __asyncDelegator(o) {
          var i, p
          return (
            (i = {}),
            verb('next'),
            verb('throw', function (e) {
              throw e
            }),
            verb('return'),
            (i[Symbol.iterator] = function () {
              return this
            }),
            i
          )
          function verb(n, f) {
            i[n] = o[n]
              ? function (v) {
                  return (p = !p)
                    ? {
                        value: __await(o[n](v)),
                        done: n === 'return',
                      }
                    : f
                    ? f(v)
                    : v
                }
              : f
          }
        }

        function __asyncValues(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError(
              'Symbol.asyncIterator is not defined.',
            )
          var m = o[Symbol.asyncIterator],
            i
          return m
            ? m.call(o)
            : ((o =
                typeof __values === 'function'
                  ? __values(o)
                  : o[Symbol.iterator]()),
              (i = {}),
              verb('next'),
              verb('throw'),
              verb('return'),
              (i[Symbol.asyncIterator] = function () {
                return this
              }),
              i)
          function verb(n) {
            i[n] =
              o[n] &&
              function (v) {
                return new Promise(function (resolve, reject) {
                  ;(v = o[n](v)),
                    settle(resolve, reject, v.done, v.value)
                })
              }
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function (v) {
              resolve({value: v, done: d})
            }, reject)
          }
        }

        function __makeTemplateObject(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, 'raw', {value: raw})
          } else {
            cooked.raw = raw
          }
          return cooked
        }

        var __setModuleDefault = Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {
                enumerable: true,
                value: v,
              })
            }
          : function (o, v) {
              o['default'] = v
            }

        function __importStar(mod) {
          if (mod && mod.__esModule) return mod
          var result = {}
          if (mod != null)
            for (var k in mod)
              if (
                k !== 'default' &&
                Object.prototype.hasOwnProperty.call(mod, k)
              )
                __createBinding(result, mod, k)
          __setModuleDefault(result, mod)
          return result
        }

        function __importDefault(mod) {
          return mod && mod.__esModule ? mod : {default: mod}
        }

        function __classPrivateFieldGet(
          receiver,
          state,
          kind,
          f,
        ) {
          if (kind === 'a' && !f)
            throw new TypeError(
              'Private accessor was defined without a getter',
            )
          if (
            typeof state === 'function'
              ? receiver !== state || !f
              : !state.has(receiver)
          )
            throw new TypeError(
              'Cannot read private member from an object whose class did not declare it',
            )
          return kind === 'm'
            ? f
            : kind === 'a'
            ? f.call(receiver)
            : f
            ? f.value
            : state.get(receiver)
        }

        function __classPrivateFieldSet(
          receiver,
          state,
          value,
          kind,
          f,
        ) {
          if (kind === 'm')
            throw new TypeError('Private method is not writable')
          if (kind === 'a' && !f)
            throw new TypeError(
              'Private accessor was defined without a setter',
            )
          if (
            typeof state === 'function'
              ? receiver !== state || !f
              : !state.has(receiver)
          )
            throw new TypeError(
              'Cannot write private member to an object whose class did not declare it',
            )
          return (
            kind === 'a'
              ? f.call(receiver, value)
              : f
              ? (f.value = value)
              : state.set(receiver, value),
            value
          )
        }

        /***/
      },

    /***/ 766:
      /*!*******************************************************************!*\
  !*** ../../node_modules/webpack-hot-middleware/client-overlay.js ***!
  \*******************************************************************/
      /***/ (
        module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        /*eslint-env browser*/

        var clientOverlay = document.createElement('div')
        clientOverlay.id = 'webpack-hot-middleware-clientOverlay'
        var styles = {
          background: 'rgba(0,0,0,0.85)',
          color: '#e8e8e8',
          lineHeight: '1.6',
          whiteSpace: 'pre',
          fontFamily: 'Menlo, Consolas, monospace',
          fontSize: '13px',
          position: 'fixed',
          zIndex: 9999,
          padding: '10px',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto',
          dir: 'ltr',
          textAlign: 'left',
        }

        var ansiHTML = __webpack_require__(
          /*! ansi-html-community */ 807,
        )
        var colors = {
          reset: ['transparent', 'transparent'],
          black: '181818',
          red: 'ff3348',
          green: '3fff4f',
          yellow: 'ffd30e',
          blue: '169be0',
          magenta: 'f840b7',
          cyan: '0ad8e9',
          lightgrey: 'ebe7e3',
          darkgrey: '6d7891',
        }

        var htmlEntities = __webpack_require__(
          /*! html-entities */ 392,
        )

        function showProblems(type, lines) {
          clientOverlay.innerHTML = ''
          lines.forEach(function (msg) {
            msg = ansiHTML(htmlEntities.encode(msg))
            var div = document.createElement('div')
            div.style.marginBottom = '26px'
            div.innerHTML = problemType(type) + ' in ' + msg
            clientOverlay.appendChild(div)
          })
          if (document.body) {
            document.body.appendChild(clientOverlay)
          }
        }

        function clear() {
          if (document.body && clientOverlay.parentNode) {
            document.body.removeChild(clientOverlay)
          }
        }

        function problemType(type) {
          var problemColors = {
            errors: colors.red,
            warnings: colors.yellow,
          }
          var color = problemColors[type] || colors.red
          return (
            '<span style="background-color:#' +
            color +
            '; color:#000000; padding:3px 6px; border-radius: 4px;">' +
            type.slice(0, -1).toUpperCase() +
            '</span>'
          )
        }

        module.exports = function (options) {
          for (var color in options.ansiColors) {
            if (color in colors) {
              colors[color] = options.ansiColors[color]
            }
            ansiHTML.setColors(colors)
          }

          for (var style in options.overlayStyles) {
            styles[style] = options.overlayStyles[style]
          }

          for (var key in styles) {
            clientOverlay.style[key] = styles[key]
          }

          return {
            showProblems: showProblems,
            clear: clear,
          }
        }

        module.exports.clear = clear
        module.exports.showProblems = showProblems

        /***/
      },

    /***/ 81:
      /*!***********************************************************!*\
  !*** ../../node_modules/webpack-hot-middleware/client.js ***!
  \***********************************************************/
      /***/ (
        module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        /* module decorator */ module =
          __webpack_require__.nmd(module)
        /*eslint-env browser*/
        /*global __resourceQuery __webpack_public_path__*/

        var options = {
          path: '/__webpack_hmr',
          timeout: 20 * 1000,
          overlay: true,
          reload: false,
          log: true,
          warn: true,
          name: '',
          autoConnect: true,
          overlayStyles: {},
          overlayWarnings: false,
          ansiColors: {},
        }
        if (false) {
          var overrides, querystring
        }

        if (typeof window === 'undefined') {
          // do nothing
        } else if (typeof window.EventSource === 'undefined') {
          console.warn(
            "webpack-hot-middleware's client requires EventSource to work. " +
              'You should include a polyfill if you want to support this browser: ' +
              'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools',
          )
        } else {
          if (options.autoConnect) {
            connect()
          }
        }

        /* istanbul ignore next */
        function setOptionsAndConnect(overrides) {
          setOverrides(overrides)
          connect()
        }

        function setOverrides(overrides) {
          if (overrides.autoConnect)
            options.autoConnect = overrides.autoConnect == 'true'
          if (overrides.path) options.path = overrides.path
          if (overrides.timeout)
            options.timeout = overrides.timeout
          if (overrides.overlay)
            options.overlay = overrides.overlay !== 'false'
          if (overrides.reload)
            options.reload = overrides.reload !== 'false'
          if (overrides.noInfo && overrides.noInfo !== 'false') {
            options.log = false
          }
          if (overrides.name) {
            options.name = overrides.name
          }
          if (overrides.quiet && overrides.quiet !== 'false') {
            options.log = false
            options.warn = false
          }

          if (overrides.dynamicPublicPath) {
            options.path = __webpack_require__.p + options.path
          }

          if (overrides.ansiColors)
            options.ansiColors = JSON.parse(overrides.ansiColors)
          if (overrides.overlayStyles)
            options.overlayStyles = JSON.parse(
              overrides.overlayStyles,
            )

          if (overrides.overlayWarnings) {
            options.overlayWarnings =
              overrides.overlayWarnings == 'true'
          }
        }

        function EventSourceWrapper() {
          var source
          var lastActivity = new Date()
          var listeners = []

          init()
          var timer = setInterval(function () {
            if (new Date() - lastActivity > options.timeout) {
              handleDisconnect()
            }
          }, options.timeout / 2)

          function init() {
            source = new window.EventSource(options.path)
            source.onopen = handleOnline
            source.onerror = handleDisconnect
            source.onmessage = handleMessage
          }

          function handleOnline() {
            if (options.log) console.log('[HMR] connected')
            lastActivity = new Date()
          }

          function handleMessage(event) {
            lastActivity = new Date()
            for (var i = 0; i < listeners.length; i++) {
              listeners[i](event)
            }
          }

          function handleDisconnect() {
            clearInterval(timer)
            source.close()
            setTimeout(init, options.timeout)
          }

          return {
            addMessageListener: function (fn) {
              listeners.push(fn)
            },
          }
        }

        function getEventSourceWrapper() {
          if (!window.__whmEventSourceWrapper) {
            window.__whmEventSourceWrapper = {}
          }
          if (!window.__whmEventSourceWrapper[options.path]) {
            // cache the wrapper for other entries loaded on
            // the same page with the same options.path
            window.__whmEventSourceWrapper[options.path] =
              EventSourceWrapper()
          }
          return window.__whmEventSourceWrapper[options.path]
        }

        function connect() {
          getEventSourceWrapper().addMessageListener(
            handleMessage,
          )

          function handleMessage(event) {
            if (event.data == '\uD83D\uDC93') {
              return
            }
            try {
              processMessage(JSON.parse(event.data))
            } catch (ex) {
              if (options.warn) {
                console.warn(
                  'Invalid HMR message: ' +
                    event.data +
                    '\n' +
                    ex,
                )
              }
            }
          }
        }

        // the reporter needs to be a singleton on the page
        // in case the client is being used by multiple bundles
        // we only want to report once.
        // all the errors will go to all clients
        var singletonKey = '__webpack_hot_middleware_reporter__'
        var reporter
        if (typeof window !== 'undefined') {
          if (!window[singletonKey]) {
            window[singletonKey] = createReporter()
          }
          reporter = window[singletonKey]
        }

        function createReporter() {
          var strip = __webpack_require__(/*! strip-ansi */ 673)

          var overlay
          if (
            typeof document !== 'undefined' &&
            options.overlay
          ) {
            overlay = __webpack_require__(
              /*! ./client-overlay */ 766,
            )({
              ansiColors: options.ansiColors,
              overlayStyles: options.overlayStyles,
            })
          }

          var styles = {
            errors: 'color: #ff0000;',
            warnings: 'color: #999933;',
          }
          var previousProblems = null
          function log(type, obj) {
            var newProblems = obj[type]
              .map(function (msg) {
                return strip(msg)
              })
              .join('\n')
            if (previousProblems == newProblems) {
              return
            } else {
              previousProblems = newProblems
            }

            var style = styles[type]
            var name = obj.name ? "'" + obj.name + "' " : ''
            var title =
              '[HMR] bundle ' +
              name +
              'has ' +
              obj[type].length +
              ' ' +
              type
            // NOTE: console.warn or console.error will print the stack trace
            // which isn't helpful here, so using console.log to escape it.
            if (console.group && console.groupEnd) {
              console.group('%c' + title, style)
              console.log('%c' + newProblems, style)
              console.groupEnd()
            } else {
              console.log(
                '%c' +
                  title +
                  '\n\t%c' +
                  newProblems.replace(/\n/g, '\n\t'),
                style + 'font-weight: bold;',
                style + 'font-weight: normal;',
              )
            }
          }

          return {
            cleanProblemsCache: function () {
              previousProblems = null
            },
            problems: function (type, obj) {
              if (options.warn) {
                log(type, obj)
              }
              if (overlay) {
                if (
                  options.overlayWarnings ||
                  type === 'errors'
                ) {
                  overlay.showProblems(type, obj[type])
                  return false
                }
                overlay.clear()
              }
              return true
            },
            success: function () {
              if (overlay) overlay.clear()
            },
            useCustomOverlay: function (customOverlay) {
              overlay = customOverlay
            },
          }
        }

        var processUpdate = __webpack_require__(
          /*! ./process-update */ 844,
        )

        var customHandler
        var subscribeAllHandler
        function processMessage(obj) {
          switch (obj.action) {
            case 'building':
              if (options.log) {
                console.log(
                  '[HMR] bundle ' +
                    (obj.name ? "'" + obj.name + "' " : '') +
                    'rebuilding',
                )
              }
              break
            case 'built':
              if (options.log) {
                console.log(
                  '[HMR] bundle ' +
                    (obj.name ? "'" + obj.name + "' " : '') +
                    'rebuilt in ' +
                    obj.time +
                    'ms',
                )
              }
            // fall through
            case 'sync':
              if (
                obj.name &&
                options.name &&
                obj.name !== options.name
              ) {
                return
              }
              var applyUpdate = true
              if (obj.errors.length > 0) {
                if (reporter) reporter.problems('errors', obj)
                applyUpdate = false
              } else if (obj.warnings.length > 0) {
                if (reporter) {
                  var overlayShown = reporter.problems(
                    'warnings',
                    obj,
                  )
                  applyUpdate = overlayShown
                }
              } else {
                if (reporter) {
                  reporter.cleanProblemsCache()
                  reporter.success()
                }
              }
              if (applyUpdate) {
                processUpdate(obj.hash, obj.modules, options)
              }
              break
            default:
              if (customHandler) {
                customHandler(obj)
              }
          }

          if (subscribeAllHandler) {
            subscribeAllHandler(obj)
          }
        }

        if (module) {
          module.exports = {
            subscribeAll: function subscribeAll(handler) {
              subscribeAllHandler = handler
            },
            subscribe: function subscribe(handler) {
              customHandler = handler
            },
            useCustomOverlay: function useCustomOverlay(
              customOverlay,
            ) {
              if (reporter)
                reporter.useCustomOverlay(customOverlay)
            },
            setOptionsAndConnect: setOptionsAndConnect,
          }
        }

        /***/
      },

    /***/ 844:
      /*!*******************************************************************!*\
  !*** ../../node_modules/webpack-hot-middleware/process-update.js ***!
  \*******************************************************************/
      /***/ (
        module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        /**
         * Based heavily on https://github.com/webpack/webpack/blob/
         *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
         * Original copyright Tobias Koppers @sokra (MIT license)
         */

        /* global window __webpack_hash__ */

        if (false) {
        }

        var hmrDocsUrl =
          'https://webpack.js.org/concepts/hot-module-replacement/' // eslint-disable-line max-len

        var lastHash
        var failureStatuses = {abort: 1, fail: 1}
        var applyOptions = {
          ignoreUnaccepted: true,
          ignoreDeclined: true,
          ignoreErrored: true,
          onUnaccepted: function (data) {
            console.warn(
              'Ignored an update to unaccepted module ' +
                data.chain.join(' -> '),
            )
          },
          onDeclined: function (data) {
            console.warn(
              'Ignored an update to declined module ' +
                data.chain.join(' -> '),
            )
          },
          onErrored: function (data) {
            console.error(data.error)
            console.warn(
              'Ignored an error while updating module ' +
                data.moduleId +
                ' (' +
                data.type +
                ')',
            )
          },
        }

        function upToDate(hash) {
          if (hash) lastHash = hash
          return lastHash == __webpack_require__.h()
        }

        module.exports = function (hash, moduleMap, options) {
          var reload = options.reload
          if (!upToDate(hash) && module.hot.status() == 'idle') {
            if (options.log)
              console.log(
                '[HMR] Checking for updates on the server...',
              )
            check()
          }

          function check() {
            var cb = function (err, updatedModules) {
              if (err) return handleError(err)

              if (!updatedModules) {
                if (options.warn) {
                  console.warn(
                    '[HMR] Cannot find update (Full reload needed)',
                  )
                  console.warn(
                    '[HMR] (Probably because of restarting the server)',
                  )
                }
                performReload()
                return null
              }

              var applyCallback = function (
                applyErr,
                renewedModules,
              ) {
                if (applyErr) return handleError(applyErr)

                if (!upToDate()) check()

                logUpdates(updatedModules, renewedModules)
              }

              var applyResult = module.hot.apply(
                applyOptions,
                applyCallback,
              )
              // webpack 2 promise
              if (applyResult && applyResult.then) {
                // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
                applyResult.then(function (outdatedModules) {
                  applyCallback(null, outdatedModules)
                })
                applyResult.catch(applyCallback)
              }
            }

            var result = module.hot.check(false, cb)
            // webpack 2 promise
            if (result && result.then) {
              result.then(function (updatedModules) {
                cb(null, updatedModules)
              })
              result.catch(cb)
            }
          }

          function logUpdates(updatedModules, renewedModules) {
            var unacceptedModules = updatedModules.filter(
              function (moduleId) {
                return (
                  renewedModules &&
                  renewedModules.indexOf(moduleId) < 0
                )
              },
            )

            if (unacceptedModules.length > 0) {
              if (options.warn) {
                console.warn(
                  "[HMR] The following modules couldn't be hot updated: " +
                    '(Full reload needed)\n' +
                    'This is usually because the modules which have changed ' +
                    '(and their parents) do not know how to hot reload themselves. ' +
                    'See ' +
                    hmrDocsUrl +
                    ' for more details.',
                )
                unacceptedModules.forEach(function (moduleId) {
                  console.warn(
                    '[HMR]  - ' +
                      (moduleMap[moduleId] || moduleId),
                  )
                })
              }
              performReload()
              return
            }

            if (options.log) {
              if (
                !renewedModules ||
                renewedModules.length === 0
              ) {
                console.log('[HMR] Nothing hot updated.')
              } else {
                console.log('[HMR] Updated modules:')
                renewedModules.forEach(function (moduleId) {
                  console.log(
                    '[HMR]  - ' +
                      (moduleMap[moduleId] || moduleId),
                  )
                })
              }

              if (upToDate()) {
                console.log('[HMR] App is up to date.')
              }
            }
          }

          function handleError(err) {
            if (module.hot.status() in failureStatuses) {
              if (options.warn) {
                console.warn(
                  '[HMR] Cannot check for update (Full reload needed)',
                )
                console.warn(
                  '[HMR] ' + (err.stack || err.message),
                )
              }
              performReload()
              return
            }
            if (options.warn) {
              console.warn(
                '[HMR] Update check failed: ' +
                  (err.stack || err.message),
              )
            }
          }

          function performReload() {
            if (reload) {
              if (options.warn)
                console.warn('[HMR] Reloading page')
              window.location.reload()
            }
          }
        }

        /***/
      },

    /***/ 121:
      /*!*********************************************************************************!*\
  !*** ../../workspaces/@roots/bud-server/lib/cjs/client/ErrorOverlay/Component.js ***!
  \*********************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.Component = void 0
        /**
         * Component container
         *
         * @public
         */
        class Component extends HTMLElement {
          /**
           * @public
           */
          static get observedAttributes() {
            return ['type']
          }
          /**
           * @public
           */
          render() {
            this.innerHTML = `
      <style>
        #bud-overlay__component {
          backdrop-filter: blur(10px);
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          align-content: center;
          max-height: 100%;
          max-width: 100%;
          flex-wrap: wrap;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease-in-out;
        }
      </style>

      <div id="bud-overlay__component">
        <bud-inner>
          <bud-message>
            ${this.innerHTML}
          </bud-message>
        </bud-inner>
      </div>
    `
          }
          /**
           * @public
           */
          connectedCallback() {
            if (!this.rendered) {
              this.render()
              this.rendered = true
            }
          }
        }
        exports.Component = Component
        //# sourceMappingURL=Component.js.map

        /***/
      },

    /***/ 852:
      /*!*****************************************************************************!*\
  !*** ../../workspaces/@roots/bud-server/lib/cjs/client/ErrorOverlay/Inner.js ***!
  \*****************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.Inner = void 0
        class Inner extends HTMLElement {
          render() {
            this.innerHTML = `
      ${this.innerHTML}
    `
            this.style.position = `relative`
            this.style.display = `flex`
            this.style.flexWrap = `flex-wrap`
            this.style.flexDirection = `column`
            this.style.alignContent = `center`
            this.style.justifyContent = `center`
            this.style.alignItems = `center`
            this.style.justifyItems = `center`
            this.style.padding = `0.5rem`
            this.style.margin = `1rem`
            this.style.height = `100%`
            this.style.width = `100%`
            this.style.maxWidth = `100%`
            this.style.maxHeight = `100%`
          }
          connectedCallback() {
            if (!this.rendered) {
              this.render()
              this.rendered = true
            }
          }
          attributeChangedCallback() {
            this.render()
          }
        }
        exports.Inner = Inner
        //# sourceMappingURL=Inner.js.map

        /***/
      },

    /***/ 344:
      /*!*******************************************************************************!*\
  !*** ../../workspaces/@roots/bud-server/lib/cjs/client/ErrorOverlay/Message.js ***!
  \*******************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.Message = void 0
        /**
         * Error message
         *
         * @remarks
         * sub-component of the ErrorOverlay component.
         *
         * @public
         */
        class Message extends HTMLElement {
          /**
           * Render component
           *
           * @public
           */
          render() {
            this.innerHTML = `
      <span>
        <code>${this.innerHTML.replace(process.cwd(), '')}</code>
      </span>
    `
            this.style.maxWidth = `60%`
            this.style.maxHeight = `60%`
            this.style.overflowY = `scroll`
            this.style.padding = `0.5rem`
            this.style.borderTop = `2px solid rgba(220, 38, 38, 1)`
            this.style.color = `rgba(31, 41, 55, 1)`
            this.style.background = `rgba(255, 255, 255, 1)`
            this.style.overflowX = `scroll`
            this.style.fontSize = `0.6rem`
            this.style.borderRadius = `8px`
            this.style.boxShadow = `
      0 6px 10px 0 rgba(0,0,0,0.14),
      0 1px 18px 0 rgba(0,0,0,0.12),
      0 3px 5px -1px rgba(0,0,0,0.20)
    `
            this.style.transition = `all 0.2s ease-in-out`
            this.style.transitionDelay = `0.15s`
          }
          /**
           * Component reactivity handler
           *
           * @public
           */
          connectedCallback() {
            if (!this.rendered) {
              this.render()
              this.rendered = true
            }
          }
        }
        exports.Message = Message
        //# sourceMappingURL=Message.js.map

        /***/
      },

    /***/ 403:
      /*!*****************************************************************************!*\
  !*** ../../workspaces/@roots/bud-server/lib/cjs/client/ErrorOverlay/index.js ***!
  \*****************************************************************************/
      /***/ (
        __unused_webpack_module,
        exports,
        __webpack_require__,
      ) => {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.overlay = void 0
        const Component_1 = __webpack_require__(
          /*! ./Component */ 121,
        )
        const Inner_1 = __webpack_require__(/*! ./Inner */ 852)
        const Message_1 = __webpack_require__(
          /*! ./Message */ 344,
        )
        const template_1 = __webpack_require__(
          /*! ./template */ 771,
        )
        /**
         * Client controller for ErrorOverlay component
         *
         * @public
         */
        exports.overlay = {
          /**
           * Initialize component
           *
           * @public
           */
          init() {
            customElements.define(
              'bud-overlay',
              Component_1.Component,
            )
            customElements.define('bud-inner', Inner_1.Inner)
            customElements.define(
              'bud-message',
              Message_1.Message,
            )
            this.node = document.createElement('div')
            return this
          },
          /**
           * Render errors to DOM
           *
           * @public
           */
          showProblems(type, lines) {
            this.node.innerHTML = (0, template_1.template)(
              lines.reduce(
                (all, current) => `
        ${all}${current.trimStart().trimEnd()}
      `,
                ``,
              ),
            )
            document.body && document.body.appendChild(this.node)
          },
          /**
           * Clear component
           *
           * @public
           */
          clear() {
            document.body &&
              this.node.parentNode &&
              document.body.removeChild(this.node)
          },
        }
        //# sourceMappingURL=index.js.map

        /***/
      },

    /***/ 771:
      /*!********************************************************************************!*\
  !*** ../../workspaces/@roots/bud-server/lib/cjs/client/ErrorOverlay/template.js ***!
  \********************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.template = void 0
        const template = content => `
<bud-overlay>
  ${content}
</bud-overlay>
`
        exports.template = template
        //# sourceMappingURL=template.js.map

        /***/
      },

    /***/ 647:
      /*!******************************************************************************!*\
  !*** ../../workspaces/@roots/bud-server/lib/cjs/client/Indicator/Indicator.js ***!
  \******************************************************************************/
      /***/ (__unused_webpack_module, exports) => {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.Indicator = void 0
        /**
         * CSS animation for reload indicator
         *
         * @public
         */
        const makePulse = (name, color) => `
  .${name} {
    transform: scale(1);
    background: rgba(${color[0]}, ${color[1]}, ${color[2]}, 1);
    box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 1);
    animation: ${name}__pulse 2s infinite;
  }

  @keyframes ${name}__pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);
    }
  }
`
        /**
         * Indicator web component
         *
         * @public
         */
        class Indicator extends HTMLElement {
          constructor() {
            super(...arguments)
            /**
             * Component name
             *
             * @public
             */
            this.name = `bud-activity-indicator`
            /**
             * Status indicator colors
             *
             * @public
             */
            this.colors = {
              success: [4, 120, 87],
              error: [220, 38, 38],
              warn: [252, 211, 77],
              pending: [59, 130, 246],
            }
          }
          /**
           * Get accessor: has errors
           *
           * @public
           */
          get hasErrors() {
            return this.getAttribute('has-errors') == 'true'
          }
          /**
           * Get accessor: has warnings
           *
           * @public
           */
          get hasWarnings() {
            return this.getAttribute('has-warnings') == 'true'
          }
          /**
           * Compilation is ongoing
           *
           * @public
           */
          get isPending() {
            var _a, _b, _c, _d, _e
            return (
              !((_b =
                (_a = this.payload) === null || _a === void 0
                  ? void 0
                  : _a.errors) === null || _b === void 0
                ? void 0
                : _b.length) &&
              !((_d =
                (_c = this.payload) === null || _c === void 0
                  ? void 0
                  : _c.warnings) === null || _d === void 0
                ? void 0
                : _d.length) &&
              ((_e = this.payload) === null || _e === void 0
                ? void 0
                : _e.action) == 'building'
            )
          }
          /**
           * Render status indicator
           *
           * @public
           */
          render() {
            this.classList.add(this.name)
            this.innerHTML = `
    <style>
      .${this.name} {
        position: fixed;
        width: 10px;
        height: 10px;
        left: 10px;
        bottom: 10px;
        z-index: 9998;
        margin: 10px;
        padding: 5px;
        transition: opacity ease 1500ms;
        pointer-events: none;
        border-radius: 50%;
      }

      ${makePulse(`${this.name}__success`, this.colors.success)}
      ${makePulse(`${this.name}__error`, this.colors.error)}
      ${makePulse(`${this.name}__warning`, this.colors.warn)}
      ${makePulse(`${this.name}__pending`, this.colors.pending)}

      .${this.name}__visible {
        opacity: 1;
      }

      .${this.name}__hidden {
        opacity: 0;
      }
    </style>
    `
          }
          /**
           * Show status indicator
           *
           * @public
           */
          show() {
            clearTimeout(this.hideTimeout)
            this.classList.remove(`${this.name}__hidden`)
          }
          /**
           * Hide status indicator
           */
          hide() {
            this.hideTimeout = setTimeout(() => {
              this.classList.remove(
                `${this.name}__error`,
                `${this.name}__warning`,
                `${this.name}__success`,
                `${this.name}__pending`,
              )
              this.classList.add(`${this.name}__hidden`)
            }, 2000)
          }
          /**
           * Status is pending
           *
           * @public
           */
          pending() {
            this.show()
            this.classList.remove(
              `${this.name}__error`,
              `${this.name}__warning`,
              `${this.name}__success`,
            )
            this.classList.add(`${this.name}__pending`)
            this.hide()
          }
          /**
           * Status is success
           *
           * @public
           */
          success() {
            this.show()
            this.classList.remove(
              `${this.name}__error`,
              `${this.name}__warning`,
              `${this.name}__pending`,
            )
            this.classList.add(`${this.name}__success`)
            this.hide()
          }
          /**
           * Status is error
           *
           * @public
           */
          error() {
            this.show()
            this.classList.remove(
              `${this.name}__warning`,
              `${this.name}__success`,
              `${this.name}__pending`,
            )
            this.classList.add(`${this.name}__error`)
          }
          /**
           * Status is warning
           *
           * @public
           */
          warning() {
            this.show()
            this.classList.remove(
              `${this.name}__error`,
              `${this.name}__success`,
              `${this.name}__pending`,
            )
            this.classList.add(`${this.name}__warning`)
            this.hide()
          }
          /**
           * Update status
           *
           * @public
           */
          update() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k
            if (
              !((_b =
                (_a = this.payload) === null || _a === void 0
                  ? void 0
                  : _a.errors) === null || _b === void 0
                ? void 0
                : _b.length) &&
              !((_d =
                (_c = this.payload) === null || _c === void 0
                  ? void 0
                  : _c.warnings) === null || _d === void 0
                ? void 0
                : _d.length) &&
              this.payload.action == 'built'
            ) {
              this.success()
              return
            }
            if (
              ((_e = this.payload) === null || _e === void 0
                ? void 0
                : _e.action) == 'building' ||
              ((_f = this.payload) === null || _f === void 0
                ? void 0
                : _f.action) == 'sync'
            ) {
              this.pending()
              return
            }
            if (
              (_h =
                (_g = this.payload) === null || _g === void 0
                  ? void 0
                  : _g.errors) === null || _h === void 0
                ? void 0
                : _h.length
            ) {
              this.error()
              return
            }
            if (
              (_k =
                (_j = this.payload) === null || _j === void 0
                  ? void 0
                  : _j.warnings) === null || _k === void 0
                ? void 0
                : _k.length
            ) {
              this.warning()
              return
            }
          }
          static get observedAttributes() {
            return ['has-errors', 'has-warnings', 'action']
          }
          attributeChangedCallback() {
            this.update()
          }
          connectedCallback() {
            if (!this.rendered) {
              this.render()
              this.rendered = true
            }
          }
        }
        exports.Indicator = Indicator
        //# sourceMappingURL=Indicator.js.map

        /***/
      },

    /***/ 198:
      /*!**************************************************************************!*\
  !*** ../../workspaces/@roots/bud-server/lib/cjs/client/Indicator/index.js ***!
  \**************************************************************************/
      /***/ (
        __unused_webpack_module,
        exports,
        __webpack_require__,
      ) => {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.indicator = void 0
        const Indicator_1 = __webpack_require__(
          /*! ./Indicator */ 647,
        )
        /**
         * Activity indicator controller
         *
         * @public
         */
        exports.indicator = {
          /**
           * DOM node
           *
           * @public
           */
          node: null,
          /**
           * Active WHM payload
           *
           * @public
           */
          payload: null,
          /**
           * Initialization
           *
           * @public
           */
          init() {
            customElements.define(
              'bud-activity-indicator',
              Indicator_1.Indicator,
            )
            this.node = document.createElement(
              'bud-activity-indicator',
            )
            document.body && document.body.appendChild(this.node)
            return this
          },
          /**
           * Update activity indicator
           *
           * @public
           */
          update(payload) {
            var _a, _b
            this.node.payload = payload
            this.node.setAttribute(
              'has-warnings',
              (_a = payload.errors) === null || _a === void 0
                ? void 0
                : _a.length,
            )
            this.node.setAttribute(
              'has-errors',
              (_b = payload.warnings) === null || _b === void 0
                ? void 0
                : _b.length,
            )
          },
        }
        //# sourceMappingURL=index.js.map

        /***/
      },

    /***/ 73:
      /*!****************************************************************!*\
  !*** ../../workspaces/@roots/bud-server/lib/cjs/client/index.js ***!
  \****************************************************************/
      /***/ (
        __unused_webpack_module,
        exports,
        __webpack_require__,
      ) => {
        'use strict'

        /* eslint-disable react-hooks/rules-of-hooks */
        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        const tslib_1 = __webpack_require__(/*! tslib */ 163)
        const {subscribeAll, useCustomOverlay} =
          __webpack_require__(
            /*! webpack-hot-middleware/client */ 81,
          )
        const ErrorOverlay_1 = __webpack_require__(
          /*! ./ErrorOverlay */ 403,
        )
        const Indicator_1 = __webpack_require__(
          /*! ./Indicator */ 198,
        )
        const indicatorEl = Indicator_1.indicator.init()
        const overlayEl = ErrorOverlay_1.overlay.init()
        ;(() =>
          (0, tslib_1.__awaiter)(
            void 0,
            void 0,
            void 0,
            function* () {
              const res = yield fetch('/__roots/config.json')
              const server = yield res.json()
              useCustomOverlay(overlayEl)
              subscribeAll(payload => {
                var _a
                server.browser.indicator &&
                  indicatorEl.update(payload)
                server.browser.overlay &&
                  ((_a =
                    payload === null || payload === void 0
                      ? void 0
                      : payload.errors) === null || _a === void 0
                    ? void 0
                    : _a.length) &&
                  ErrorOverlay_1.overlay.showProblems(
                    'errors',
                    payload.errors,
                  )
                if (payload.action === 'reload')
                  window.location.reload()
              })
            },
          ))()
        //# sourceMappingURL=index.js.map

        /***/
      },

    /******/
  }
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {}
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule =
      __webpack_module_cache__[moduleId]
    /******/ if (cachedModule !== undefined) {
      /******/ if (cachedModule.error !== undefined)
        throw cachedModule.error
      /******/ return cachedModule.exports
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ id: moduleId,
      /******/ loaded: false,
      /******/ exports: {},
      /******/
    })
    /******/
    /******/ // Execute the module function
    /******/ try {
      /******/ var execOptions = {
        id: moduleId,
        module: module,
        factory: __webpack_modules__[moduleId],
        require: __webpack_require__,
      }
      /******/ __webpack_require__.i.forEach(function (handler) {
        handler(execOptions)
      })
      /******/ module = execOptions.module
      /******/ execOptions.factory.call(
        module.exports,
        module,
        module.exports,
        execOptions.require,
      )
      /******/
    } catch (e) {
      /******/ module.error = e
      /******/ throw e
      /******/
    }
    /******/
    /******/ // Flag the module as loaded
    /******/ module.loaded = true
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports
    /******/
  }
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = __webpack_modules__
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = __webpack_module_cache__
  /******/
  /******/ // expose the module execution interceptor
  /******/ __webpack_require__.i =
    [] /* webpack/runtime/compat get default export */
  /******/
  /************************************************************************/
  /******/
  /******/
  ;(() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = module => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module['default']
          : /******/ () => module
      /******/ __webpack_require__.d(getter, {a: getter})
      /******/ return getter
      /******/
    }
    /******/
  })() /* webpack/runtime/define property getters */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          })
          /******/
        }
        /******/
      }
      /******/
    }
    /******/
  })() /* webpack/runtime/get javascript update chunk filename */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ // This function allow to reference all chunks
    /******/ __webpack_require__.hu = chunkId => {
      /******/ // return url for filenames based on template
      /******/ return (
        '' +
        chunkId +
        '.' +
        __webpack_require__.h() +
        '.hot-update.js'
      )
      /******/
    }
    /******/
  })() /* webpack/runtime/get update manifest filename */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ __webpack_require__.hmrF = () =>
      'app.' + __webpack_require__.h() + '.hot-update.json'
    /******/
  })() /* webpack/runtime/getFullHash */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ __webpack_require__.h = () => '5d69c1e75ce6e9c7fb0e'
    /******/
  })() /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop)
    /******/
  })() /* webpack/runtime/load script */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ var inProgress = {}
    /******/ var dataWebpackPrefix = 'example-sass:'
    /******/ // loadScript function to load a script via script tag
    /******/ __webpack_require__.l = (
      url,
      done,
      key,
      chunkId,
    ) => {
      /******/ if (inProgress[url]) {
        inProgress[url].push(done)
        return
      }
      /******/ var script, needAttach
      /******/ if (key !== undefined) {
        /******/ var scripts =
          document.getElementsByTagName('script')
        /******/ for (var i = 0; i < scripts.length; i++) {
          /******/ var s = scripts[i]
          /******/ if (
            s.getAttribute('src') == url ||
            s.getAttribute('data-webpack') ==
              dataWebpackPrefix + key
          ) {
            script = s
            break
          }
          /******/
        }
        /******/
      }
      /******/ if (!script) {
        /******/ needAttach = true
        /******/ script = document.createElement('script')
        /******/
        /******/ script.charset = 'utf-8'
        /******/ script.timeout = 120
        /******/ if (__webpack_require__.nc) {
          /******/ script.setAttribute(
            'nonce',
            __webpack_require__.nc,
          )
          /******/
        }
        /******/ script.setAttribute(
          'data-webpack',
          dataWebpackPrefix + key,
        )
        /******/ script.src = url
        /******/
      }
      /******/ inProgress[url] = [done]
      /******/ var onScriptComplete = (prev, event) => {
        /******/ // avoid mem leaks in IE.
        /******/ script.onerror = script.onload = null
        /******/ clearTimeout(timeout)
        /******/ var doneFns = inProgress[url]
        /******/ delete inProgress[url]
        /******/ script.parentNode &&
          script.parentNode.removeChild(script)
        /******/ doneFns && doneFns.forEach(fn => fn(event))
        /******/ if (prev) return prev(event)
        /******/
      }
      /******/ /******/ var timeout = setTimeout(
        onScriptComplete.bind(null, undefined, {
          type: 'timeout',
          target: script,
        }),
        120000,
      )
      /******/ script.onerror = onScriptComplete.bind(
        null,
        script.onerror,
      )
      /******/ script.onload = onScriptComplete.bind(
        null,
        script.onload,
      )
      /******/ needAttach && document.head.appendChild(script)
      /******/
    }
    /******/
  })() /* webpack/runtime/make namespace object */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = exports => {
      /******/ if (
        typeof Symbol !== 'undefined' &&
        Symbol.toStringTag
      ) {
        /******/ Object.defineProperty(
          exports,
          Symbol.toStringTag,
          {value: 'Module'},
        )
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', {
        value: true,
      })
      /******/
    }
    /******/
  })() /* webpack/runtime/node module decorator */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ __webpack_require__.nmd = module => {
      /******/ module.paths = []
      /******/ if (!module.children) module.children = []
      /******/ return module
      /******/
    }
    /******/
  })() /* webpack/runtime/hot module replacement */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ var currentModuleData = {}
    /******/ var installedModules = __webpack_require__.c
    /******/
    /******/ // module and require creation
    /******/ var currentChildModule
    /******/ var currentParents = []
    /******/
    /******/ // status
    /******/ var registeredStatusHandlers = []
    /******/ var currentStatus = 'idle'
    /******/
    /******/ // while downloading
    /******/ var blockingPromises
    /******/
    /******/ // The update info
    /******/ var currentUpdateApplyHandlers
    /******/ var queuedInvalidatedModules
    /******/
    /******/ // eslint-disable-next-line no-unused-vars
    /******/ __webpack_require__.hmrD = currentModuleData
    /******/
    /******/ __webpack_require__.i.push(function (options) {
      /******/ var module = options.module
      /******/ var require = createRequire(
        options.require,
        options.id,
      )
      /******/ module.hot = createModuleHotObject(
        options.id,
        module,
      )
      /******/ module.parents = currentParents
      /******/ module.children = []
      /******/ currentParents = []
      /******/ options.require = require
      /******/
    })
    /******/
    /******/ __webpack_require__.hmrC = {}
    /******/ __webpack_require__.hmrI = {}
    /******/
    /******/ function createRequire(require, moduleId) {
      /******/ var me = installedModules[moduleId]
      /******/ if (!me) return require
      /******/ var fn = function (request) {
        /******/ if (me.hot.active) {
          /******/ if (installedModules[request]) {
            /******/ var parents =
              installedModules[request].parents
            /******/ if (parents.indexOf(moduleId) === -1) {
              /******/ parents.push(moduleId)
              /******/
            }
            /******/
          } else {
            /******/ currentParents = [moduleId]
            /******/ currentChildModule = request
            /******/
          }
          /******/ if (me.children.indexOf(request) === -1) {
            /******/ me.children.push(request)
            /******/
          }
          /******/
        } else {
          /******/ console.warn(
            /******/ '[HMR] unexpected require(' +
              /******/ request +
              /******/ ') from disposed module ' +
              /******/ moduleId,
            /******/
          )
          /******/ currentParents = []
          /******/
        }
        /******/ return require(request)
        /******/
      }
      /******/ var createPropertyDescriptor = function (name) {
        /******/ return {
          /******/ configurable: true,
          /******/ enumerable: true,
          /******/ get: function () {
            /******/ return require[name]
            /******/
          },
          /******/ set: function (value) {
            /******/ require[name] = value
            /******/
          },
          /******/
        }
        /******/
      }
      /******/ for (var name in require) {
        /******/ if (
          Object.prototype.hasOwnProperty.call(require, name) &&
          name !== 'e'
        ) {
          /******/ Object.defineProperty(
            fn,
            name,
            createPropertyDescriptor(name),
          )
          /******/
        }
        /******/
      }
      /******/ fn.e = function (chunkId) {
        /******/ return trackBlockingPromise(require.e(chunkId))
        /******/
      }
      /******/ return fn
      /******/
    }
    /******/
    /******/ function createModuleHotObject(moduleId, me) {
      /******/ var _main = currentChildModule !== moduleId
      /******/ var hot = {
        /******/ // private stuff
        /******/ _acceptedDependencies: {},
        /******/ _acceptedErrorHandlers: {},
        /******/ _declinedDependencies: {},
        /******/ _selfAccepted: false,
        /******/ _selfDeclined: false,
        /******/ _selfInvalidated: false,
        /******/ _disposeHandlers: [],
        /******/ _main: _main,
        /******/ _requireSelf: function () {
          /******/ currentParents = me.parents.slice()
          /******/ currentChildModule = _main
            ? undefined
            : moduleId
          /******/ __webpack_require__(moduleId)
          /******/
        },
        /******/
        /******/ // Module API
        /******/ active: true,
        /******/ accept: function (dep, callback, errorHandler) {
          /******/ if (dep === undefined)
            hot._selfAccepted = true
          /******/ else if (typeof dep === 'function')
            hot._selfAccepted = dep
          /******/ else if (
            typeof dep === 'object' &&
            dep !== null
          ) {
            /******/ for (var i = 0; i < dep.length; i++) {
              /******/ hot._acceptedDependencies[dep[i]] =
                callback || function () {}
              /******/ hot._acceptedErrorHandlers[dep[i]] =
                errorHandler
              /******/
            }
            /******/
          } else {
            /******/ hot._acceptedDependencies[dep] =
              callback || function () {}
            /******/ hot._acceptedErrorHandlers[dep] =
              errorHandler
            /******/
          }
          /******/
        },
        /******/ decline: function (dep) {
          /******/ if (dep === undefined)
            hot._selfDeclined = true
          /******/ else if (
            typeof dep === 'object' &&
            dep !== null
          )
            /******/ for (var i = 0; i < dep.length; i++)
              /******/ hot._declinedDependencies[dep[i]] = true
          /******/ else hot._declinedDependencies[dep] = true
          /******/
        },
        /******/ dispose: function (callback) {
          /******/ hot._disposeHandlers.push(callback)
          /******/
        },
        /******/ addDisposeHandler: function (callback) {
          /******/ hot._disposeHandlers.push(callback)
          /******/
        },
        /******/ removeDisposeHandler: function (callback) {
          /******/ var idx =
            hot._disposeHandlers.indexOf(callback)
          /******/ if (idx >= 0)
            hot._disposeHandlers.splice(idx, 1)
          /******/
        },
        /******/ invalidate: function () {
          /******/ this._selfInvalidated = true
          /******/ switch (currentStatus) {
            /******/ case 'idle':
              /******/ currentUpdateApplyHandlers = []
              /******/ Object.keys(
                __webpack_require__.hmrI,
              ).forEach(function (key) {
                /******/ __webpack_require__.hmrI[key](
                  /******/ moduleId,
                  /******/ currentUpdateApplyHandlers,
                  /******/
                )
                /******/
              })
              /******/ setStatus('ready')
              /******/ break
            /******/ case 'ready':
              /******/ Object.keys(
                __webpack_require__.hmrI,
              ).forEach(function (key) {
                /******/ __webpack_require__.hmrI[key](
                  /******/ moduleId,
                  /******/ currentUpdateApplyHandlers,
                  /******/
                )
                /******/
              })
              /******/ break
            /******/ case 'prepare':
            /******/ case 'check':
            /******/ case 'dispose':
            /******/ case 'apply':
              /******/ ;(queuedInvalidatedModules =
                queuedInvalidatedModules || []).push(
                /******/ moduleId,
                /******/
              )
              /******/ break
            /******/ default:
              /******/ // ignore requests in error states
              /******/ break
            /******/
          }
          /******/
        },
        /******/
        /******/ // Management API
        /******/ check: hotCheck,
        /******/ apply: hotApply,
        /******/ status: function (l) {
          /******/ if (!l) return currentStatus
          /******/ registeredStatusHandlers.push(l)
          /******/
        },
        /******/ addStatusHandler: function (l) {
          /******/ registeredStatusHandlers.push(l)
          /******/
        },
        /******/ removeStatusHandler: function (l) {
          /******/ var idx = registeredStatusHandlers.indexOf(l)
          /******/ if (idx >= 0)
            registeredStatusHandlers.splice(idx, 1)
          /******/
        },
        /******/
        /******/ //inherit from previous dispose call
        /******/ data: currentModuleData[moduleId],
        /******/
      }
      /******/ currentChildModule = undefined
      /******/ return hot
      /******/
    }
    /******/
    /******/ function setStatus(newStatus) {
      /******/ currentStatus = newStatus
      /******/ var results = []
      /******/
      /******/ for (
        var i = 0;
        i < registeredStatusHandlers.length;
        i++
      )
        /******/ results[i] = registeredStatusHandlers[i].call(
          null,
          newStatus,
        )
      /******/
      /******/ return Promise.all(results)
      /******/
    }
    /******/
    /******/ function trackBlockingPromise(promise) {
      /******/ switch (currentStatus) {
        /******/ case 'ready':
          /******/ setStatus('prepare')
          /******/ blockingPromises.push(promise)
          /******/ waitForBlockingPromises(function () {
            /******/ return setStatus('ready')
            /******/
          })
          /******/ return promise
        /******/ case 'prepare':
          /******/ blockingPromises.push(promise)
          /******/ return promise
        /******/ default:
          /******/ return promise
        /******/
      }
      /******/
    }
    /******/
    /******/ function waitForBlockingPromises(fn) {
      /******/ if (blockingPromises.length === 0) return fn()
      /******/ var blocker = blockingPromises
      /******/ blockingPromises = []
      /******/ return Promise.all(blocker).then(function () {
        /******/ return waitForBlockingPromises(fn)
        /******/
      })
      /******/
    }
    /******/
    /******/ function hotCheck(applyOnUpdate) {
      /******/ if (currentStatus !== 'idle') {
        /******/ throw new Error(
          'check() is only allowed in idle status',
        )
        /******/
      }
      /******/ return setStatus('check')
        /******/ .then(__webpack_require__.hmrM)
        /******/ .then(function (update) {
          /******/ if (!update) {
            /******/ return setStatus(
              applyInvalidatedModules() ? 'ready' : 'idle',
            ).then(
              /******/ function () {
                /******/ return null
                /******/
              },
              /******/
            )
            /******/
          }
          /******/
          /******/ return setStatus('prepare').then(function () {
            /******/ var updatedModules = []
            /******/ blockingPromises = []
            /******/ currentUpdateApplyHandlers = []
            /******/
            /******/ return Promise.all(
              /******/ Object.keys(
                __webpack_require__.hmrC,
              ).reduce(
                function (
                  /******/ promises,
                  /******/ key,
                  /******/
                ) {
                  /******/ __webpack_require__.hmrC[key](
                    /******/ update.c,
                    /******/ update.r,
                    /******/ update.m,
                    /******/ promises,
                    /******/ currentUpdateApplyHandlers,
                    /******/ updatedModules,
                    /******/
                  )
                  /******/ return promises
                  /******/
                },
                /******/ [],
              ),
              /******/
            ).then(function () {
              /******/ return waitForBlockingPromises(
                function () {
                  /******/ if (applyOnUpdate) {
                    /******/ return internalApply(applyOnUpdate)
                    /******/
                  } else {
                    /******/ return setStatus('ready').then(
                      function () {
                        /******/ return updatedModules
                        /******/
                      },
                    )
                    /******/
                  }
                  /******/
                },
              )
              /******/
            })
            /******/
          })
          /******/
        })
      /******/
    }
    /******/
    /******/ function hotApply(options) {
      /******/ if (currentStatus !== 'ready') {
        /******/ return Promise.resolve().then(function () {
          /******/ throw new Error(
            'apply() is only allowed in ready status',
          )
          /******/
        })
        /******/
      }
      /******/ return internalApply(options)
      /******/
    }
    /******/
    /******/ function internalApply(options) {
      /******/ options = options || {}
      /******/
      /******/ applyInvalidatedModules()
      /******/
      /******/ var results = currentUpdateApplyHandlers.map(
        function (handler) {
          /******/ return handler(options)
          /******/
        },
      )
      /******/ currentUpdateApplyHandlers = undefined
      /******/
      /******/ var errors = results
        /******/ .map(function (r) {
          /******/ return r.error
          /******/
        })
        /******/ .filter(Boolean)
      /******/
      /******/ if (errors.length > 0) {
        /******/ return setStatus('abort').then(function () {
          /******/ throw errors[0]
          /******/
        })
        /******/
      }
      /******/
      /******/ // Now in "dispose" phase
      /******/ var disposePromise = setStatus('dispose')
      /******/
      /******/ results.forEach(function (result) {
        /******/ if (result.dispose) result.dispose()
        /******/
      })
      /******/
      /******/ // Now in "apply" phase
      /******/ var applyPromise = setStatus('apply')
      /******/
      /******/ var error
      /******/ var reportError = function (err) {
        /******/ if (!error) error = err
        /******/
      }
      /******/
      /******/ var outdatedModules = []
      /******/ results.forEach(function (result) {
        /******/ if (result.apply) {
          /******/ var modules = result.apply(reportError)
          /******/ if (modules) {
            /******/ for (var i = 0; i < modules.length; i++) {
              /******/ outdatedModules.push(modules[i])
              /******/
            }
            /******/
          }
          /******/
        }
        /******/
      })
      /******/
      /******/ return Promise.all([
        disposePromise,
        applyPromise,
      ]).then(function () {
        /******/ // handle errors in accept handlers and self accepted module load
        /******/ if (error) {
          /******/ return setStatus('fail').then(function () {
            /******/ throw error
            /******/
          })
          /******/
        }
        /******/
        /******/ if (queuedInvalidatedModules) {
          /******/ return internalApply(options).then(function (
            list,
          ) {
            /******/ outdatedModules.forEach(function (
              moduleId,
            ) {
              /******/ if (list.indexOf(moduleId) < 0)
                list.push(moduleId)
              /******/
            })
            /******/ return list
            /******/
          })
          /******/
        }
        /******/
        /******/ return setStatus('idle').then(function () {
          /******/ return outdatedModules
          /******/
        })
        /******/
      })
      /******/
    }
    /******/
    /******/ function applyInvalidatedModules() {
      /******/ if (queuedInvalidatedModules) {
        /******/ if (!currentUpdateApplyHandlers)
          currentUpdateApplyHandlers = []
        /******/ Object.keys(__webpack_require__.hmrI).forEach(
          function (key) {
            /******/ queuedInvalidatedModules.forEach(function (
              moduleId,
            ) {
              /******/ __webpack_require__.hmrI[key](
                /******/ moduleId,
                /******/ currentUpdateApplyHandlers,
                /******/
              )
              /******/
            })
            /******/
          },
        )
        /******/ queuedInvalidatedModules = undefined
        /******/ return true
        /******/
      }
      /******/
    }
    /******/
  })() /* webpack/runtime/publicPath */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ __webpack_require__.p = ''
    /******/
  })() /* webpack/runtime/jsonp chunk loading */
  /******/
  /******/
  /******/
  ;(() => {
    /******/ // no baseURI
    /******/
    /******/ // object to store loaded and loading chunks
    /******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
    /******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    /******/ var installedChunks =
      (__webpack_require__.hmrS_jsonp =
        __webpack_require__.hmrS_jsonp || {
          /******/ app: 0,
          /******/
        })
    /******/
    /******/ // no chunk on demand loading
    /******/
    /******/ // no prefetching
    /******/
    /******/ // no preloaded
    /******/
    /******/ var currentUpdatedModulesList
    /******/ var waitingUpdateResolves = {}
    /******/ function loadUpdateChunk(chunkId) {
      /******/ return new Promise((resolve, reject) => {
        /******/ waitingUpdateResolves[chunkId] = resolve
        /******/ // start update chunk loading
        /******/ var url =
          __webpack_require__.p + __webpack_require__.hu(chunkId)
        /******/ // create error before stack unwound to get useful stacktrace later
        /******/ var error = new Error()
        /******/ var loadingEnded = event => {
          /******/ if (waitingUpdateResolves[chunkId]) {
            /******/ waitingUpdateResolves[chunkId] = undefined
            /******/ var errorType =
              event &&
              (event.type === 'load' ? 'missing' : event.type)
            /******/ var realSrc =
              event && event.target && event.target.src
            /******/ error.message =
              'Loading hot update chunk ' +
              chunkId +
              ' failed.\n(' +
              errorType +
              ': ' +
              realSrc +
              ')'
            /******/ error.name = 'ChunkLoadError'
            /******/ error.type = errorType
            /******/ error.request = realSrc
            /******/ reject(error)
            /******/
          }
          /******/
        }
        /******/ __webpack_require__.l(url, loadingEnded)
        /******/
      })
      /******/
    }
    /******/
    /******/ globalThis['webpackHotUpdateexample_sass'] = (
      chunkId,
      moreModules,
      runtime,
    ) => {
      /******/ for (var moduleId in moreModules) {
        /******/ if (
          __webpack_require__.o(moreModules, moduleId)
        ) {
          /******/ currentUpdate[moduleId] =
            moreModules[moduleId]
          /******/ if (currentUpdatedModulesList)
            currentUpdatedModulesList.push(moduleId)
          /******/
        }
        /******/
      }
      /******/ if (runtime) currentUpdateRuntime.push(runtime)
      /******/ if (waitingUpdateResolves[chunkId]) {
        /******/ waitingUpdateResolves[chunkId]()
        /******/ waitingUpdateResolves[chunkId] = undefined
        /******/
      }
      /******/
    }
    /******/
    /******/ var currentUpdateChunks
    /******/ var currentUpdate
    /******/ var currentUpdateRemovedChunks
    /******/ var currentUpdateRuntime
    /******/ function applyHandler(options) {
      /******/ if (__webpack_require__.f)
        delete __webpack_require__.f.jsonpHmr
      /******/ currentUpdateChunks = undefined
      /******/ function getAffectedModuleEffects(
        updateModuleId,
      ) {
        /******/ var outdatedModules = [updateModuleId]
        /******/ var outdatedDependencies = {}
        /******/
        /******/ var queue = outdatedModules.map(function (id) {
          /******/ return {
            /******/ chain: [id],
            /******/ id: id,
            /******/
          }
          /******/
        })
        /******/ while (queue.length > 0) {
          /******/ var queueItem = queue.pop()
          /******/ var moduleId = queueItem.id
          /******/ var chain = queueItem.chain
          /******/ var module = __webpack_require__.c[moduleId]
          /******/ if (
            /******/ !module ||
            /******/ (module.hot._selfAccepted &&
              !module.hot._selfInvalidated)
            /******/
          )
            /******/ continue
          /******/ if (module.hot._selfDeclined) {
            /******/ return {
              /******/ type: 'self-declined',
              /******/ chain: chain,
              /******/ moduleId: moduleId,
              /******/
            }
            /******/
          }
          /******/ if (module.hot._main) {
            /******/ return {
              /******/ type: 'unaccepted',
              /******/ chain: chain,
              /******/ moduleId: moduleId,
              /******/
            }
            /******/
          }
          /******/ for (
            var i = 0;
            i < module.parents.length;
            i++
          ) {
            /******/ var parentId = module.parents[i]
            /******/ var parent = __webpack_require__.c[parentId]
            /******/ if (!parent) continue
            /******/ if (
              parent.hot._declinedDependencies[moduleId]
            ) {
              /******/ return {
                /******/ type: 'declined',
                /******/ chain: chain.concat([parentId]),
                /******/ moduleId: moduleId,
                /******/ parentId: parentId,
                /******/
              }
              /******/
            }
            /******/ if (
              outdatedModules.indexOf(parentId) !== -1
            )
              continue
            /******/ if (
              parent.hot._acceptedDependencies[moduleId]
            ) {
              /******/ if (!outdatedDependencies[parentId])
                /******/ outdatedDependencies[parentId] = []
              /******/ addAllToSet(
                outdatedDependencies[parentId],
                [moduleId],
              )
              /******/ continue
              /******/
            }
            /******/ delete outdatedDependencies[parentId]
            /******/ outdatedModules.push(parentId)
            /******/ queue.push({
              /******/ chain: chain.concat([parentId]),
              /******/ id: parentId,
              /******/
            })
            /******/
          }
          /******/
        }
        /******/
        /******/ return {
          /******/ type: 'accepted',
          /******/ moduleId: updateModuleId,
          /******/ outdatedModules: outdatedModules,
          /******/ outdatedDependencies: outdatedDependencies,
          /******/
        }
        /******/
      }
      /******/
      /******/ function addAllToSet(a, b) {
        /******/ for (var i = 0; i < b.length; i++) {
          /******/ var item = b[i]
          /******/ if (a.indexOf(item) === -1) a.push(item)
          /******/
        }
        /******/
      }
      /******/
      /******/ // at begin all updates modules are outdated
      /******/ // the "outdated" status can propagate to parents if they don't accept the children
      /******/ var outdatedDependencies = {}
      /******/ var outdatedModules = []
      /******/ var appliedUpdate = {}
      /******/
      /******/ var warnUnexpectedRequire =
        function warnUnexpectedRequire(module) {
          /******/ console.warn(
            /******/ '[HMR] unexpected require(' +
              module.id +
              ') to disposed module',
            /******/
          )
          /******/
        }
      /******/
      /******/ for (var moduleId in currentUpdate) {
        /******/ if (
          __webpack_require__.o(currentUpdate, moduleId)
        ) {
          /******/ var newModuleFactory = currentUpdate[moduleId]
          /******/ /** @type {TODO} */
          /******/ var result
          /******/ if (newModuleFactory) {
            /******/ result = getAffectedModuleEffects(moduleId)
            /******/
          } else {
            /******/ result = {
              /******/ type: 'disposed',
              /******/ moduleId: moduleId,
              /******/
            }
            /******/
          }
          /******/ /** @type {Error|false} */
          /******/ var abortError = false
          /******/ var doApply = false
          /******/ var doDispose = false
          /******/ var chainInfo = ''
          /******/ if (result.chain) {
            /******/ chainInfo =
              '\nUpdate propagation: ' +
              result.chain.join(' -> ')
            /******/
          }
          /******/ switch (result.type) {
            /******/ case 'self-declined':
              /******/ if (options.onDeclined)
                options.onDeclined(result)
              /******/ if (!options.ignoreDeclined)
                /******/ abortError = new Error(
                  /******/ 'Aborted because of self decline: ' +
                    /******/ result.moduleId +
                    /******/ chainInfo,
                  /******/
                )
              /******/ break
            /******/ case 'declined':
              /******/ if (options.onDeclined)
                options.onDeclined(result)
              /******/ if (!options.ignoreDeclined)
                /******/ abortError = new Error(
                  /******/ 'Aborted because of declined dependency: ' +
                    /******/ result.moduleId +
                    /******/ ' in ' +
                    /******/ result.parentId +
                    /******/ chainInfo,
                  /******/
                )
              /******/ break
            /******/ case 'unaccepted':
              /******/ if (options.onUnaccepted)
                options.onUnaccepted(result)
              /******/ if (!options.ignoreUnaccepted)
                /******/ abortError = new Error(
                  /******/ 'Aborted because ' +
                    moduleId +
                    ' is not accepted' +
                    chainInfo,
                  /******/
                )
              /******/ break
            /******/ case 'accepted':
              /******/ if (options.onAccepted)
                options.onAccepted(result)
              /******/ doApply = true
              /******/ break
            /******/ case 'disposed':
              /******/ if (options.onDisposed)
                options.onDisposed(result)
              /******/ doDispose = true
              /******/ break
            /******/ default:
              /******/ throw new Error(
                'Unexception type ' + result.type,
              )
            /******/
          }
          /******/ if (abortError) {
            /******/ return {
              /******/ error: abortError,
              /******/
            }
            /******/
          }
          /******/ if (doApply) {
            /******/ appliedUpdate[moduleId] = newModuleFactory
            /******/ addAllToSet(
              outdatedModules,
              result.outdatedModules,
            )
            /******/ for (moduleId in result.outdatedDependencies) {
              /******/ if (
                __webpack_require__.o(
                  result.outdatedDependencies,
                  moduleId,
                )
              ) {
                /******/ if (!outdatedDependencies[moduleId])
                  /******/ outdatedDependencies[moduleId] = []
                /******/ addAllToSet(
                  /******/ outdatedDependencies[moduleId],
                  /******/ result.outdatedDependencies[moduleId],
                  /******/
                )
                /******/
              }
              /******/
            }
            /******/
          }
          /******/ if (doDispose) {
            /******/ addAllToSet(outdatedModules, [
              result.moduleId,
            ])
            /******/ appliedUpdate[moduleId] =
              warnUnexpectedRequire
            /******/
          }
          /******/
        }
        /******/
      }
      /******/ currentUpdate = undefined
      /******/
      /******/ // Store self accepted outdated modules to require them later by the module system
      /******/ var outdatedSelfAcceptedModules = []
      /******/ for (var j = 0; j < outdatedModules.length; j++) {
        /******/ var outdatedModuleId = outdatedModules[j]
        /******/ var module =
          __webpack_require__.c[outdatedModuleId]
        /******/ if (
          /******/ module &&
          /******/ (module.hot._selfAccepted ||
            module.hot._main) &&
          /******/ // removed self-accepted modules should not be required
          /******/ appliedUpdate[outdatedModuleId] !==
            warnUnexpectedRequire &&
          /******/ // when called invalidate self-accepting is not possible
          /******/ !module.hot._selfInvalidated
          /******/
        ) {
          /******/ outdatedSelfAcceptedModules.push({
            /******/ module: outdatedModuleId,
            /******/ require: module.hot._requireSelf,
            /******/ errorHandler: module.hot._selfAccepted,
            /******/
          })
          /******/
        }
        /******/
      }
      /******/
      /******/ var moduleOutdatedDependencies
      /******/
      /******/ return {
        /******/ dispose: function () {
          /******/ currentUpdateRemovedChunks.forEach(function (
            chunkId,
          ) {
            /******/ delete installedChunks[chunkId]
            /******/
          })
          /******/ currentUpdateRemovedChunks = undefined
          /******/
          /******/ var idx
          /******/ var queue = outdatedModules.slice()
          /******/ while (queue.length > 0) {
            /******/ var moduleId = queue.pop()
            /******/ var module = __webpack_require__.c[moduleId]
            /******/ if (!module) continue
            /******/
            /******/ var data = {}
            /******/
            /******/ // Call dispose handlers
            /******/ var disposeHandlers =
              module.hot._disposeHandlers
            /******/ for (
              j = 0;
              j < disposeHandlers.length;
              j++
            ) {
              /******/ disposeHandlers[j].call(null, data)
              /******/
            }
            /******/ __webpack_require__.hmrD[moduleId] = data
            /******/
            /******/ // disable module (this disables requires from this module)
            /******/ module.hot.active = false
            /******/
            /******/ // remove module from cache
            /******/ delete __webpack_require__.c[moduleId]
            /******/
            /******/ // when disposing there is no need to call dispose handler
            /******/ delete outdatedDependencies[moduleId]
            /******/
            /******/ // remove "parents" references from all children
            /******/ for (
              j = 0;
              j < module.children.length;
              j++
            ) {
              /******/ var child =
                __webpack_require__.c[module.children[j]]
              /******/ if (!child) continue
              /******/ idx = child.parents.indexOf(moduleId)
              /******/ if (idx >= 0) {
                /******/ child.parents.splice(idx, 1)
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
          /******/ // remove outdated dependency from module children
          /******/ var dependency
          /******/ for (var outdatedModuleId in outdatedDependencies) {
            /******/ if (
              __webpack_require__.o(
                outdatedDependencies,
                outdatedModuleId,
              )
            ) {
              /******/ module =
                __webpack_require__.c[outdatedModuleId]
              /******/ if (module) {
                /******/ moduleOutdatedDependencies =
                  /******/ outdatedDependencies[outdatedModuleId]
                /******/ for (
                  j = 0;
                  j < moduleOutdatedDependencies.length;
                  j++
                ) {
                  /******/ dependency =
                    moduleOutdatedDependencies[j]
                  /******/ idx =
                    module.children.indexOf(dependency)
                  /******/ if (idx >= 0)
                    module.children.splice(idx, 1)
                  /******/
                }
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
        },
        /******/ apply: function (reportError) {
          /******/ // insert new code
          /******/ for (var updateModuleId in appliedUpdate) {
            /******/ if (
              __webpack_require__.o(
                appliedUpdate,
                updateModuleId,
              )
            ) {
              /******/ __webpack_require__.m[updateModuleId] =
                appliedUpdate[updateModuleId]
              /******/
            }
            /******/
          }
          /******/
          /******/ // run new runtime modules
          /******/ for (
            var i = 0;
            i < currentUpdateRuntime.length;
            i++
          ) {
            /******/ currentUpdateRuntime[i](__webpack_require__)
            /******/
          }
          /******/
          /******/ // call accept handlers
          /******/ for (var outdatedModuleId in outdatedDependencies) {
            /******/ if (
              __webpack_require__.o(
                outdatedDependencies,
                outdatedModuleId,
              )
            ) {
              /******/ var module =
                __webpack_require__.c[outdatedModuleId]
              /******/ if (module) {
                /******/ moduleOutdatedDependencies =
                  /******/ outdatedDependencies[outdatedModuleId]
                /******/ var callbacks = []
                /******/ var errorHandlers = []
                /******/ var dependenciesForCallbacks = []
                /******/ for (
                  var j = 0;
                  j < moduleOutdatedDependencies.length;
                  j++
                ) {
                  /******/ var dependency =
                    moduleOutdatedDependencies[j]
                  /******/ var acceptCallback =
                    /******/ module.hot._acceptedDependencies[
                      dependency
                    ]
                  /******/ var errorHandler =
                    /******/ module.hot._acceptedErrorHandlers[
                      dependency
                    ]
                  /******/ if (acceptCallback) {
                    /******/ if (
                      callbacks.indexOf(acceptCallback) !== -1
                    )
                      continue
                    /******/ callbacks.push(acceptCallback)
                    /******/ errorHandlers.push(errorHandler)
                    /******/ dependenciesForCallbacks.push(
                      dependency,
                    )
                    /******/
                  }
                  /******/
                }
                /******/ for (
                  var k = 0;
                  k < callbacks.length;
                  k++
                ) {
                  /******/ try {
                    /******/ callbacks[k].call(
                      null,
                      moduleOutdatedDependencies,
                    )
                    /******/
                  } catch (err) {
                    /******/ if (
                      typeof errorHandlers[k] === 'function'
                    ) {
                      /******/ try {
                        /******/ errorHandlers[k](err, {
                          /******/ moduleId: outdatedModuleId,
                          /******/ dependencyId:
                            dependenciesForCallbacks[k],
                          /******/
                        })
                        /******/
                      } catch (err2) {
                        /******/ if (options.onErrored) {
                          /******/ options.onErrored({
                            /******/ type: 'accept-error-handler-errored',
                            /******/ moduleId: outdatedModuleId,
                            /******/ dependencyId:
                              dependenciesForCallbacks[k],
                            /******/ error: err2,
                            /******/ originalError: err,
                            /******/
                          })
                          /******/
                        }
                        /******/ if (!options.ignoreErrored) {
                          /******/ reportError(err2)
                          /******/ reportError(err)
                          /******/
                        }
                        /******/
                      }
                      /******/
                    } else {
                      /******/ if (options.onErrored) {
                        /******/ options.onErrored({
                          /******/ type: 'accept-errored',
                          /******/ moduleId: outdatedModuleId,
                          /******/ dependencyId:
                            dependenciesForCallbacks[k],
                          /******/ error: err,
                          /******/
                        })
                        /******/
                      }
                      /******/ if (!options.ignoreErrored) {
                        /******/ reportError(err)
                        /******/
                      }
                      /******/
                    }
                    /******/
                  }
                  /******/
                }
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
          /******/ // Load self accepted modules
          /******/ for (
            var o = 0;
            o < outdatedSelfAcceptedModules.length;
            o++
          ) {
            /******/ var item = outdatedSelfAcceptedModules[o]
            /******/ var moduleId = item.module
            /******/ try {
              /******/ item.require(moduleId)
              /******/
            } catch (err) {
              /******/ if (
                typeof item.errorHandler === 'function'
              ) {
                /******/ try {
                  /******/ item.errorHandler(err, {
                    /******/ moduleId: moduleId,
                    /******/ module:
                      __webpack_require__.c[moduleId],
                    /******/
                  })
                  /******/
                } catch (err2) {
                  /******/ if (options.onErrored) {
                    /******/ options.onErrored({
                      /******/ type: 'self-accept-error-handler-errored',
                      /******/ moduleId: moduleId,
                      /******/ error: err2,
                      /******/ originalError: err,
                      /******/
                    })
                    /******/
                  }
                  /******/ if (!options.ignoreErrored) {
                    /******/ reportError(err2)
                    /******/ reportError(err)
                    /******/
                  }
                  /******/
                }
                /******/
              } else {
                /******/ if (options.onErrored) {
                  /******/ options.onErrored({
                    /******/ type: 'self-accept-errored',
                    /******/ moduleId: moduleId,
                    /******/ error: err,
                    /******/
                  })
                  /******/
                }
                /******/ if (!options.ignoreErrored) {
                  /******/ reportError(err)
                  /******/
                }
                /******/
              }
              /******/
            }
            /******/
          }
          /******/
          /******/ return outdatedModules
          /******/
        },
        /******/
      }
      /******/
    }
    /******/ __webpack_require__.hmrI.jsonp = function (
      moduleId,
      applyHandlers,
    ) {
      /******/ if (!currentUpdate) {
        /******/ currentUpdate = {}
        /******/ currentUpdateRuntime = []
        /******/ currentUpdateRemovedChunks = []
        /******/ applyHandlers.push(applyHandler)
        /******/
      }
      /******/ if (
        !__webpack_require__.o(currentUpdate, moduleId)
      ) {
        /******/ currentUpdate[moduleId] =
          __webpack_require__.m[moduleId]
        /******/
      }
      /******/
    }
    /******/ __webpack_require__.hmrC.jsonp = function (
      /******/ chunkIds,
      /******/ removedChunks,
      /******/ removedModules,
      /******/ promises,
      /******/ applyHandlers,
      /******/ updatedModulesList,
      /******/
    ) {
      /******/ applyHandlers.push(applyHandler)
      /******/ currentUpdateChunks = {}
      /******/ currentUpdateRemovedChunks = removedChunks
      /******/ currentUpdate = removedModules.reduce(function (
        obj,
        key,
      ) {
        /******/ obj[key] = false
        /******/ return obj
        /******/
      },
      {})
      /******/ currentUpdateRuntime = []
      /******/ chunkIds.forEach(function (chunkId) {
        /******/ if (
          /******/ __webpack_require__.o(
            installedChunks,
            chunkId,
          ) &&
          /******/ installedChunks[chunkId] !== undefined
          /******/
        ) {
          /******/ promises.push(
            loadUpdateChunk(chunkId, updatedModulesList),
          )
          /******/ currentUpdateChunks[chunkId] = true
          /******/
        }
        /******/
      })
      /******/ if (__webpack_require__.f) {
        /******/ __webpack_require__.f.jsonpHmr = function (
          chunkId,
          promises,
        ) {
          /******/ if (
            /******/ currentUpdateChunks &&
            /******/ !__webpack_require__.o(
              currentUpdateChunks,
              chunkId,
            ) &&
            /******/ __webpack_require__.o(
              installedChunks,
              chunkId,
            ) &&
            /******/ installedChunks[chunkId] !== undefined
            /******/
          ) {
            /******/ promises.push(loadUpdateChunk(chunkId))
            /******/ currentUpdateChunks[chunkId] = true
            /******/
          }
          /******/
        }
        /******/
      }
      /******/
    }
    /******/
    /******/ __webpack_require__.hmrM = () => {
      /******/ if (typeof fetch === 'undefined')
        throw new Error('No browser support: need fetch API')
      /******/ return fetch(
        __webpack_require__.p + __webpack_require__.hmrF(),
      ).then(response => {
        /******/ if (response.status === 404) return // no update available
        /******/ if (!response.ok)
          throw new Error(
            'Failed to fetch update manifest ' +
              response.statusText,
          )
        /******/ return response.json()
        /******/
      })
      /******/
    }
    /******/
    /******/ // no on chunks loaded
    /******/
    /******/ // no jsonp function
    /******/
  })()
  /******/
  /************************************************************************/
  /******/
  /******/ // module cache are used so entry inlining is disabled
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ __webpack_require__(307)
  /******/ var __webpack_exports__ = __webpack_require__(73)
  /******/
  /******/
})()
