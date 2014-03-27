/*globals describe, it, beforeEach */
var assert = require('assert');
var Tree = require('../..');
var valueFactory = require('../../lib/factory/value.js');

var FunctionExpression = require('../../lib/nodes/FunctionExpression.js');

describe('FunctionExpression objects', function () {
  beforeEach(function () {
    this.func = new Tree('var a = function () { "use strict"; }');
    this.func2 = new Tree('var a = function () { somecall(); }');
  });

  it('#type is FunctionExpression', function () {
    assert.equal(this.func.var('a').value().type, 'FunctionExpression');
  });

  describe('#body', function () {
    describe('#append()', function () {
      it('append code to the end of the function body', function () {
        this.func2.var('a').value().body.append('callFunc()');
        assert.equal(this.func2.toString(), 'var a = function () {\n    somecall();\n    callFunc();\n};');
      });

      it('append multiple lines', function () {
        this.func.var('a').value().body.append('callFunc(); foo();');
        assert.equal(this.func.toString(),
          'var a = function () {\n    \'use strict\';\n    callFunc();\n    foo();\n};');
      });
    });

    describe('#prepend()', function () {
      it('prepend code the the beginning of a function body', function () {
        this.func2.var('a').value().body.prepend('callFunc()');
        assert.equal(this.func2.toString(), 'var a = function () {\n    callFunc();\n    somecall();\n};');
      });

      it('insert code after "use strict" statement', function () {
        this.func.var('a').value().body.prepend('callFunc()');
        assert.equal(this.func.toString(), 'var a = function () {\n    \'use strict\';\n    callFunc();\n};');
      });

      it('prepend multiple lines', function () {
        this.func.var('a').value().body.prepend('callFunc(); foo();');
        assert.equal(this.func.toString(),
          'var a = function () {\n    \'use strict\';\n    callFunc();\n    foo();\n};');
      });
    });
  });
});