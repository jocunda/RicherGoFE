'use strict';

const login = require('..');
const assert = require('assert').strict;

assert.strictEqual(login(), 'Hello from login');
console.info('login tests passed');
