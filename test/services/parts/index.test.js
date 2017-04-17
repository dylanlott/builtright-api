'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('parts service', function() {
  it('registered the parts service', () => {
    assert.ok(app.service('parts'));
  });
});
