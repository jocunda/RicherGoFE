'use strict';

const home = require('..');
const assert = require('assert').strict;

assert.strictEqual(home(), 'Hello from home');
console.info('home tests passed');
