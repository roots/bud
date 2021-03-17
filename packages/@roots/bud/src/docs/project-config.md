## Static project configuration

Specify configuration with static JSON. You can put this under the `bud` key in the project's `package.json` or create a new file for it: `bud.project.json`.

```json
{
  "ci": false,
  "server": {
    "watch": {
      "files": [
        "**/*.html",
        "**/*.php",
        "**/*.ejs",
        "!node_modules",
        "!vendor"
      ],
      "options": {
        "persistant": true
      }
    },
    "middleware": {
      "dev": true,
      "hot": true,
      "proxy": false
    }
  },
  "bail": true,
  "entry": {},
  "alias": {},
  "cache": true,
  "clean": true,
  "define": {},
  "devtool": false,
  "discover": false,
  "externals": {},
  "fileFormat": "[name]",
  "hash": false,
  "hashFormat": "[name].[hash]",
  "html": true,
  "template": null,
  "install": false,
  "log": false,
  "namedModules": true,
  "noEmit": true,
  "node": {
    "module": "empty",
    "dns": "mock",
    "fs": "empty",
    "http2": "empty",
    "net": "empty",
    "tls": "empty",
    "child_process": "empty"
  },
  "stats": false,
  "target": "web",
  "location": {
    "project": "/srv/www/html/example.com",
    "src": "src",
    "dist": "dist",
    "modules": "node_modules",
    "publicPath": "/",
    "records": "records.json",
    "storage": ".bud"
  },
  "manifest": true,
  "minify": true,
  "mode": "production",
  "profile": false,
  "runtimeChunk": false,
  "splitChunksEnabled": false,
  "splitChunks": {
    "chunks": "async",
    "minSize": 20000,
    "maxSize": 0,
    "minChunks": 1,
    "maxAsyncRequests": 30,
    "maxInitialRequests": 30
  },
  "parallelism": 1,
  "resolve": {
    "extensions": [".wasm", ".mjs", ".js", ".css", ".json"],
    "modules": []
  },
  "theme": {
    "spacing": 1,
    "colors": {
      "foreground": "#FFFFFF",
      "faded": "#6C758F",
      "primary": "#545DD7",
      "primaryAlt": "#663399",
      "error": "#dc3545",
      "errorAlt": "#b22222",
      "warning": "#FF611A",
      "success": "#46D46A",
      "accent": "#ff69b4",
      "flavor": "#78C5D7"
    },
    "screens": [
      [0, 40],
      [41, 60],
      [61, 80],
      [81, Infinity]
    ],
    "columns": 12
  }
}
```
