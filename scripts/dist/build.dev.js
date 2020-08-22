"use strict";

var execa = require('execa');

var build = function build() {
  return regeneratorRuntime.async(function build$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(execa('yarn', ['workspace', '@roots/bud-typings', 'build']));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(execa('yarn', ['build']).stdout.pipe(process.stdout));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = build;