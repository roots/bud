## Env configuration

All .env configuration is entirely optional.

```env
APP_HOST=localhost
APP_PORT=8000
APP_PROXY_HOST=localhost
APP_PROXY_PORT=3000

# Application locations
APP_PATH='' # Abs path to cwd
APP_SRC='src'
APP_DIST='dist'
APP_STORAGE='.bud'
APP_MODULES='node_modules'
APP_PUBLIC_PATH='/'
APP_RECORDS='records.json'

# Enable logging in browser
APP_BROWSER_LOG=true

# Enable build status indicator in browser
APP_BROWSER_INDICATOR=true

# Enable error overlay in browser
APP_BROWSER_ERROR_OVERLAY=true

# Enable development middleware
APP_MIDDLEWARE_DEV=true

# Enable hot middleware
APP_MIDDLEWARE_HOT=true

# Enable proxy middleware
APP_MIDDLEWARE_PROXY=false

# Run in CI mode
APP_CI=false

# Exit builds when encountering errors
APP_BAIL=true

# Enable compiler caches
APP_CACHE=true

# Clean stale assets
APP_CLEAN=true

# Generate config artifact
APP_DEBUG

# Webpack devtool setting
APP_DEVTOOL

# Auto-enable Bud extensions
APP_DISCOVER

# Filename format
APP_FILE_FORMAT='[name].[ext]'

# Enable filename hashing
APP_HASH=false

# Hashed filename format
APP_HASH_FORMAT='[name].[hash].[ext]'

# Enable hot middleware
APP_HOT=true

# Enable html template generation
APP_HTML=false

# Path to template file
APP_HTML_TEMPLATE=''

# Auto-install missing extension dependencies
APP_INSTALL=false

# Log build messages to console (very verbose)
APP_LOG=false

# Generate a manifest of built assets
APP_MANIFEST=true

# Minify built assets
APP_MINIFY=true

# Webpack compiler mode setting
APP_MODE='production'

# Application name
APP_NAME='bud'

# Use named modules
APP_NAMED_MODULES=true

# Don't emit new assets on error
APP_NO_EMIT_ON_ERRORS=true

# Concurrent build processes
APP_PARALLELISM=1

# Profile builds
APP_PROFILE=false

# Enable vendor chunks
APP_SPLITCHUNKS=false

# Generate build stats
APP_STATS=false

# Set build target
APP_TARGET='web'

# Terminal spacing unit
APP_THEME_SPACING=1

# Terminal colors
APP_THEME_FOREGROUND
APP_THEME_FADED
APP_THEME_PRIMARY
APP_THEME_PRIMARY_ALT
APP_THEME_ERROR
APP_THEME_ERROR_ALT
APP_THEME_WARNING
APP_THEME_SUCCESS
APP_THEME_ACCENT
APP_THEME_FLAVOR

# Terminal breakpoint boundaries
APP_THEME_SM_LOWER
APP_THEME_SM_LOWER
APP_THEME_MD_LOWER
APP_THEME_MD_LOWER
APP_THEME_LG_LOWER
APP_THEME_LG_UPPER
APP_THEME_XL_LOWER
APP_THEME_XL_UPPER
```
