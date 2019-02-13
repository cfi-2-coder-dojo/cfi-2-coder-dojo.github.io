'use strict';

define("cfi2-coderdojo-site/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/parents.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/parents.js should pass ESLint\n\n');
  });
});
define("cfi2-coderdojo-site/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('cfi2-coderdojo-site/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'cfi2-coderdojo-site/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('cfi2-coderdojo-site/templates/parents.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'cfi2-coderdojo-site/templates/parents.hbs should pass TemplateLint.\n\n');
  });
});
define("cfi2-coderdojo-site/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/parents-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/parents-test.js should pass ESLint\n\n');
  });
});
define("cfi2-coderdojo-site/tests/test-helper", ["cfi2-coderdojo-site/app", "cfi2-coderdojo-site/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("cfi2-coderdojo-site/tests/unit/routes/parents-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | parents', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:parents');
      assert.ok(route);
    });
  });
});
define('cfi2-coderdojo-site/config/environment', [], function() {
  var prefix = 'cfi2-coderdojo-site';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('cfi2-coderdojo-site/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
