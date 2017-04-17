'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('builds service', function() {
  it('registered the builds service', () => {
    assert.ok(app.service('builds'));
  });
});
