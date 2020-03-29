'use strict';

// Here's a JavaScript-based config file.
// If you need conditional logic, you might want to use this type of config.
// Otherwise, JSON or YAML is recommended.

module.exports = {
    extension: ['ts'],
    "require": "ts-node/register",
    'watch-files': ['test/**/*.ts'],
};