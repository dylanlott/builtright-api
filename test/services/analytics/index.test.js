'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('analytics service', function() {
  it('registered the analytics service', () => {
    assert.ok(app.service('analytics'));
  });
});
