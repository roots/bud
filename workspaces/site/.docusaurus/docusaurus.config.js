export default {
  "title": "bud.js",
  "tagline": "⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix",
  "url": "https://budjs.netlify.app",
  "baseUrl": "/",
  "onBrokenLinks": "warn",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "https://roots.io/favicon.ico",
  "organizationName": "Roots Foundation, LLC",
  "projectName": "bud.js",
  "customFields": {
    "name": "bud.js",
    "description": "⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix",
    "logo": "https://cdn.roots.io/app/uploads/logo-bud.svg",
    "url": {
      "discourse": "https://discourse.roots.io/c/bud/24",
      "docs": "https://budjs.netlify.app",
      "git": "git@github.com:roots/bud",
      "web": "https://github.com/roots/bud"
    },
    "organization": {
      "name": "Roots Foundation, LLC",
      "site": "https://roots.io",
      "twitter": "https://twitter.com/rootswp",
      "favicon": "https://roots.io/favicon.ico"
    },
    "contributors": {
      "kellymears": {
        "type": [
          "🚀 steward",
          "💻 dev",
          "✍🏽 docs"
        ]
      },
      "qwp6t": {
        "type": [
          "🚀 steward",
          "💻 dev",
          "✍🏽 docs"
        ]
      },
      "retlehs": {
        "type": [
          "🚀 steward"
        ]
      },
      "swalkinshaw": {
        "type": [
          "🚀 steward",
          "✍🏽 docs"
        ]
      },
      "clayrisser": {
        "type": [
          "✍🏽 docs"
        ]
      },
      "catgofire": {
        "type": [
          "✍🏽 docs"
        ]
      }
    },
    "core": [
      "@roots/bud",
      "@roots/bud-api",
      "@roots/bud-build",
      "@roots/bud-cache",
      "@roots/bud-compiler",
      "@roots/bud-dashboard",
      "@roots/bud-extensions",
      "@roots/bud-framework",
      "@roots/bud-hooks",
      "@roots/bud-server",
      "@roots/bud-support"
    ],
    "extensions": [
      "@roots/bud-babel",
      "@roots/bud-compress",
      "@roots/bud-criticalcss",
      "@roots/bud-emotion",
      "@roots/bud-entrypoints",
      "@roots/bud-esbuild",
      "@roots/bud-eslint",
      "@roots/bud-library",
      "@roots/bud-mdx",
      "@roots/bud-postcss",
      "@roots/bud-preset-recommend",
      "@roots/bud-prettier",
      "@roots/bud-purgecss",
      "@roots/bud-react",
      "@roots/bud-sass",
      "@roots/bud-solid",
      "@roots/bud-stylelint",
      "@roots/bud-tailwindcss",
      "@roots/bud-terser",
      "@roots/bud-typescript",
      "@roots/bud-vue",
      "@roots/bud-wordpress-dependencies",
      "@roots/bud-wordpress-externals",
      "@roots/bud-wordpress-manifests",
      "@roots/sage"
    ],
    "libraries": [
      "@roots/container",
      "@roots/critical-css-webpack-plugin",
      "@roots/dependencies",
      "@roots/entrypoints-webpack-plugin",
      "@roots/filesystem",
      "@roots/ink-prettier"
    ],
    "sponsors": [
      {
        "image": "https://cdn.roots.io/app/uploads/kinsta.svg",
        "title": "Kinsta",
        "url": "https://kinsta.com/?kaid=OFDHAJIXUDIV"
      },
      {
        "image": "https://cdn.roots.io/app/uploads/km-digital.svg",
        "title": "KM Digital",
        "url": "https://k-m.com/"
      },
      {
        "image": "https://cdn.roots.io/app/uploads/carrot.svg",
        "title": "Carrot",
        "url": "https://carrot.com/"
      },
      {
        "image": "https://cdn.roots.io/app/uploads/c21redwood.svg",
        "title": "C21 Redwood Realty",
        "url": "https://www.c21redwood.com/"
      },
      {
        "image": "https://cdn.roots.io/app/uploads/wordpress.svg",
        "title": "WordPress.com",
        "url": "https://wordpress.com/"
      },
      {
        "image": "https://cdn.roots.io/app/uploads/pantheon.svg",
        "title": "Pantheon",
        "url": "https://pantheon.io/"
      }
    ]
  },
  "themeConfig": {
    "announcementBar": {
      "id": "announcementBar-2",
      "content": "🧹 We're working hard to get the docs up to date with Bud v5. Thanks for your understanding!",
      "isCloseable": true
    },
    "hideableSidebar": true,
    "prism": {
      "additionalLanguages": [
        "php"
      ],
      "darkTheme": {
        "plain": {
          "color": "#F8F8F2",
          "backgroundColor": "#282A36"
        },
        "styles": [
          {
            "types": [
              "prolog",
              "constant",
              "builtin"
            ],
            "style": {
              "color": "rgb(189, 147, 249)"
            }
          },
          {
            "types": [
              "inserted",
              "function"
            ],
            "style": {
              "color": "rgb(80, 250, 123)"
            }
          },
          {
            "types": [
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 85)"
            }
          },
          {
            "types": [
              "changed"
            ],
            "style": {
              "color": "rgb(255, 184, 108)"
            }
          },
          {
            "types": [
              "punctuation",
              "symbol"
            ],
            "style": {
              "color": "rgb(248, 248, 242)"
            }
          },
          {
            "types": [
              "string",
              "char",
              "tag",
              "selector"
            ],
            "style": {
              "color": "rgb(255, 121, 198)"
            }
          },
          {
            "types": [
              "keyword",
              "variable"
            ],
            "style": {
              "color": "rgb(189, 147, 249)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(98, 114, 164)"
            }
          },
          {
            "types": [
              "attr-name"
            ],
            "style": {
              "color": "rgb(241, 250, 140)"
            }
          }
        ]
      },
      "theme": {
        "plain": {
          "color": "#393A34",
          "backgroundColor": "#f6f8fa"
        },
        "styles": [
          {
            "types": [
              "comment",
              "prolog",
              "doctype",
              "cdata"
            ],
            "style": {
              "color": "#999988",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "opacity": 0.7
            }
          },
          {
            "types": [
              "string",
              "attr-value"
            ],
            "style": {
              "color": "#e3116c"
            }
          },
          {
            "types": [
              "punctuation",
              "operator"
            ],
            "style": {
              "color": "#393A34"
            }
          },
          {
            "types": [
              "entity",
              "url",
              "symbol",
              "number",
              "boolean",
              "variable",
              "constant",
              "property",
              "regex",
              "inserted"
            ],
            "style": {
              "color": "#36acaa"
            }
          },
          {
            "types": [
              "atrule",
              "keyword",
              "attr-name",
              "selector"
            ],
            "style": {
              "color": "#00a4db"
            }
          },
          {
            "types": [
              "function",
              "deleted",
              "tag"
            ],
            "style": {
              "color": "#d73a49"
            }
          },
          {
            "types": [
              "function-variable"
            ],
            "style": {
              "color": "#6f42c1"
            }
          },
          {
            "types": [
              "tag",
              "selector",
              "keyword"
            ],
            "style": {
              "color": "#00009f"
            }
          }
        ]
      }
    },
    "navbar": {
      "hideOnScroll": true,
      "logo": {
        "alt": "bud.js",
        "src": "https://cdn.roots.io/app/uploads/logo-bud.svg"
      },
      "items": [
        {
          "type": "doc",
          "docId": "introduction",
          "position": "left",
          "label": "Guides",
          "docsPluginId": "guides"
        },
        {
          "type": "doc",
          "docId": "index",
          "position": "left",
          "label": "Docs"
        },
        {
          "type": "doc",
          "docId": "index",
          "position": "left",
          "label": "Extensions",
          "docsPluginId": "extensions"
        },
        {
          "to": "/blog",
          "label": "Blog",
          "position": "left"
        },
        {
          "href": "/api",
          "label": "Api",
          "position": "right",
          "className": "header-github-link",
          "aria-label": "Bud API documentation"
        },
        {
          "href": "/releases",
          "label": "Releases",
          "position": "right",
          "className": "header-github-link",
          "aria-label": "Release notes"
        },
        {
          "href": "https://github.com/roots/bud",
          "label": "GitHub",
          "position": "right",
          "className": "header-github-link",
          "aria-label": "GitHub repository"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Links",
          "items": [
            {
              "label": "Getting started",
              "to": "/guides/getting-started/"
            },
            {
              "label": "Documentation",
              "to": "/docs/"
            },
            {
              "label": "Extensions",
              "to": "/extensions/"
            },
            {
              "label": "Releases",
              "to": "/releases/"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Twitter",
              "href": "https://twitter.com/rootswp"
            },
            {
              "label": "Discourse",
              "href": "https://discourse.roots.io/c/bud/24"
            }
          ]
        },
        {
          "title": "More",
          "items": [
            {
              "label": "Blog",
              "to": "/blog"
            },
            {
              "label": "GitHub",
              "href": "https://github.com/roots/bud"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2021 Roots Foundation, LLC."
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadata": [],
    "tableOfContents": {
      "minHeadingLevel": 2,
      "maxHeadingLevel": 3
    }
  },
  "presets": [
    [
      "/bud/site/node_modules/@docusaurus/preset-classic/lib/index.js",
      {
        "docs": {
          "path": "docs",
          "sidebarPath": "/bud/site/sidebars/docs.js",
          "editUrl": "https:/github.com/roots/bud/edit/next/site/docs/"
        },
        "blog": {
          "path": "./blog",
          "showReadingTime": true
        },
        "pages": {
          "path": "pages"
        },
        "theme": {
          "customCss": "/bud/site/src/css/custom.css"
        }
      }
    ]
  ],
  "plugins": [
    [
      "/bud/site/node_modules/@docusaurus/plugin-content-blog/lib/index.js",
      {
        "id": "releases",
        "path": "./releases",
        "routeBasePath": "releases",
        "include": [
          "**/*.md",
          "**/*.mdx"
        ]
      }
    ],
    [
      "/bud/site/node_modules/@docusaurus/plugin-content-docs/lib/index.js",
      {
        "id": "api",
        "path": "./api",
        "routeBasePath": "api",
        "sidebarPath": "./sidebars/docs.js",
        "include": [
          "**/*.md",
          "**/*.mdx"
        ]
      }
    ],
    [
      "/bud/site/node_modules/@docusaurus/plugin-content-docs/lib/index.js",
      {
        "id": "guides",
        "path": "./guides",
        "routeBasePath": "guides",
        "sidebarPath": "./sidebars/docs.js",
        "include": [
          "**/*.md",
          "**/*.mdx"
        ]
      }
    ],
    [
      "/bud/site/node_modules/@docusaurus/plugin-content-docs/lib/index.js",
      {
        "id": "extensions",
        "path": "./extensions",
        "routeBasePath": "extensions",
        "sidebarPath": "./sidebars/docs.js",
        "include": [
          "**/*.md",
          "**/*.mdx"
        ]
      }
    ],
    [
      "/bud/site/node_modules/docusaurus-lunr-search/src/index.js",
      {
        "excludeRoutes": [
          "blog/**/*",
          "pages/**/*"
        ]
      }
    ]
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "staticDirectories": [
    "static"
  ],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};