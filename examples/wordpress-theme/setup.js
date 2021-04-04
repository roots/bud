const {execa} = require('@roots/bud-support')

console.log('Installing composer dependencies.')
execa.commandSync('composer install')

console.log('Running docker image')
execa.commandSync('docker-compose up -d')

console.log('All set.')
