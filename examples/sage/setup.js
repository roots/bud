const {execa} = require('@roots/bud-support');

console.log('Installing composer dependencies.');
execa.commandSync('composer install');

console.log('Building docker image');
execa.commandSync('docker-compose build');

console.log('Running docker image');
execa.commandSync('docker-compose up -d');

console.log('All set.');
console.log(
  'Run yarn dev to build the site & start the dev server',
);
