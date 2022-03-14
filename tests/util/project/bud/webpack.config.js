module.exports = {
  "bail": true,
  "cache": {
    "type": "filesystem",
    "version": "oze1hy0assga6f_22teoasfn68i_",
    "cacheDirectory": "/Users/kellymears/code/roots/dev/bud/tests/util/project/cache/webpack",
    "managedPaths": [
      "/Users/kellymears/code/roots/dev/bud/tests/util/project/node_modules"
    ],
    "buildDependencies": {
      "bud": [
        "/Users/kellymears/code/roots/dev/bud/tests/util/project/package.json",
        "/Users/kellymears/code/roots/dev/bud/tests/util/project/.eslintrc.js",
        "/Users/kellymears/code/roots/dev/bud/tests/util/project/bud.config.js",
        "/Users/kellymears/code/roots/dev/bud/tests/util/project/docker-compose.yml",
        "/Users/kellymears/code/roots/dev/bud/tests/util/project/tailwind.config.js",
        "/Users/kellymears/code/roots/dev/bud/tests/util/project/tsconfig.json"
      ]
    }
  },
  "context": "/Users/kellymears/code/roots/dev/bud/tests/util/project",
  "devtool": false,
  "infrastructureLogging": {
    "console": {
      "Console": {}
    }
  },
  "mode": "production",
  "module": {
    "noParse": {},
    "rules": [
      {
        "test": {},
        "parser": {
          "requireEnsure": false
        }
      },
      {
        "oneOf": [
          {
            "test": {},
            "use": [
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/babel-loader/lib/index.js",
                "options": {
                  "presets": [
                    [
                      "/Users/kellymears/code/roots/dev/bud/node_modules/@babel/preset-env/lib/index.js"
                    ]
                  ],
                  "plugins": [
                    [
                      "/Users/kellymears/code/roots/dev/bud/node_modules/@babel/plugin-transform-runtime/lib/index.js",
                      {
                        "helpers": false
                      }
                    ],
                    [
                      "/Users/kellymears/code/roots/dev/bud/node_modules/@babel/plugin-proposal-object-rest-spread/lib/index.js"
                    ],
                    [
                      "/Users/kellymears/code/roots/dev/bud/node_modules/@babel/plugin-syntax-dynamic-import/lib/index.js"
                    ],
                    [
                      "/Users/kellymears/code/roots/dev/bud/node_modules/@babel/plugin-proposal-class-properties/lib/index.js"
                    ]
                  ]
                }
              }
            ],
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ]
          },
          {
            "test": {},
            "use": [
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/mini-css-extract-plugin/dist/loader.js"
              },
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/css-loader/dist/cjs.js",
                "options": {
                  "importLoaders": 1,
                  "sourceMap": false
                }
              },
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/postcss-loader/dist/cjs.js",
                "options": {
                  "postcssOptions": {
                    "plugins": [
                      [
                        "/Users/kellymears/code/roots/dev/bud/node_modules/postcss-import/index.js"
                      ],
                      [
                        null
                      ],
                      [
                        null
                      ],
                      [
                        "/Users/kellymears/code/roots/dev/bud/node_modules/postcss-preset-env/dist/index.cjs",
                        {
                          "stage": 1,
                          "features": {
                            "focus-within-pseudo-class": false
                          }
                        }
                      ]
                    ]
                  },
                  "sourceMap": true
                }
              }
            ],
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ]
          },
          {
            "test": {},
            "use": [
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/mini-css-extract-plugin/dist/loader.js"
              },
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/css-loader/dist/cjs.js",
                "options": {
                  "importLoaders": 1,
                  "localIdentName": "[name]__[local]___[hash:base64:5]",
                  "modules": true,
                  "sourceMap": false
                }
              }
            ],
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ]
          },
          {
            "test": {},
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ],
            "type": "asset/resource",
            "generator": {
              "filename": "images/[name][ext]"
            }
          },
          {
            "test": {},
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ],
            "type": "asset/resource",
            "generator": {
              "filename": "images/[name][ext]"
            }
          },
          {
            "test": {},
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ],
            "type": "asset/resource",
            "generator": {
              "filename": "svg/[name][ext]"
            }
          },
          {
            "test": {},
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ],
            "type": "asset",
            "generator": {
              "filename": "fonts/[name][ext]"
            }
          },
          {
            "test": {},
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ],
            "type": "json",
            "parser": {}
          },
          {
            "test": {},
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ],
            "type": "json",
            "parser": {}
          },
          {
            "test": {},
            "use": [
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/html-loader/dist/cjs.js"
              }
            ],
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ]
          },
          {
            "test": {},
            "use": [
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/csv-loader/index.js"
              }
            ],
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ]
          },
          {
            "test": {},
            "use": [
              {
                "loader": "/Users/kellymears/code/roots/dev/bud/node_modules/xml-loader/index.js"
              }
            ],
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ]
          },
          {
            "test": {},
            "include": [
              "/Users/kellymears/code/roots/dev/bud/tests/util/project"
            ],
            "type": "json",
            "parser": {}
          }
        ]
      }
    ],
    "unsafeCache": false
  },
  "name": "bud",
  "node": false,
  "output": {
    "assetModuleFilename": "[name][ext]",
    "chunkFilename": "[name].js",
    "filename": "[name].js",
    "path": "/Users/kellymears/code/roots/dev/bud/tests/util/project",
    "pathinfo": false,
    "publicPath": "auto"
  },
  "optimization": {
    "emitOnErrors": false,
    "minimize": false,
    "minimizer": [
      "..."
    ]
  },
  "parallelism": 9,
  "performance": {
    "hints": false
  },
  "recordsPath": "/Users/kellymears/code/roots/dev/bud/tests/util/project/bud/modules.json",
  "stats": {
    "preset": "normal"
  },
  "target": "browserslist:/Users/kellymears/code/roots/dev/bud/tests/util/project/package.json",
  "plugins": [
    {
      "patterns": [
        {
          "from": "src/images/**/*",
          "context": "/Users/kellymears/code/roots/dev/bud/tests/util/project",
          "noErrorOnMissing": true
        }
      ],
      "options": {}
    },
    {
      "definitions": {
        "APP_TEST": "PUBLIC_VALUE"
      }
    },
    {
      "_sortedModulesCache": {},
      "options": {
        "filename": "[name].css",
        "ignoreOrder": false,
        "runtime": true,
        "chunkFilename": "[name].css"
      },
      "runtimeOptions": {
        "linkType": "text/css"
      }
    },
    {
      "key": "ESLintWebpackPlugin",
      "options": {
        "extensions": [
          "js",
          "jsx",
          "ts",
          "tsx",
          "vue"
        ],
        "emitError": true,
        "emitWarning": true,
        "failOnError": true,
        "cacheLocation": "/Users/kellymears/code/roots/dev/bud/tests/util/project/cache/eslint.json",
        "cacheStrategy": "content",
        "cwd": "/Users/kellymears/code/roots/dev/bud/tests/util/project",
        "eslintPath": "/Users/kellymears/code/roots/dev/bud/node_modules/eslint/lib/api.js",
        "resolvePluginsRelativeTo": "/Users/kellymears/code/roots/dev/bud/tests/util/project",
        "threads": 0
      }
    },
    {
      "options": {
        "emitHtml": false
      },
      "plugin": {
        "name": "EntrypointsManifestPlugin",
        "stage": null
      },
      "name": "entrypoints.json"
    },
    {
      "userOptions": {
        "alwaysWriteToDisk": true,
        "inject": true,
        "template": "src/index.html",
        "publicPath": "auto"
      },
      "version": 5
    },
    {
      "replacements": {
        "APP_TEST": "PUBLIC_VALUE"
      },
      "name": "interpolate-html-plugin"
    }
  ],
  "resolve": {
    "alias": {
      "@project": "/Users/kellymears/code/roots/dev/bud/tests/util/project",
      "@src": "/Users/kellymears/code/roots/dev/bud/tests/util/project",
      "@dist": "/Users/kellymears/code/roots/dev/bud/tests/util/project"
    },
    "extensions": [
      ".wasm",
      ".mjs",
      ".js",
      ".jsx",
      ".css",
      ".json",
      ".toml",
      ".yml"
    ],
    "modules": [
      null,
      "node_modules"
    ]
  },
  "entry": {
    "app": {
      "import": [
        "src/scripts/app.js",
        "src/styles/app.css"
      ]
    }
  }
}