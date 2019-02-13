'use strict';



;define("cfi2-coderdojo-site/app", ["exports", "cfi2-coderdojo-site/resolver", "ember-load-initializers", "cfi2-coderdojo-site/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/helpers/app-version", ["exports", "cfi2-coderdojo-site/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("cfi2-coderdojo-site/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "cfi2-coderdojo-site/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/initializers/export-application-global", ["exports", "cfi2-coderdojo-site/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/router", ["exports", "cfi2-coderdojo-site/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.route('parents');
  });
  var _default = Router;
  _exports.default = _default;
});
;define("cfi2-coderdojo-site/routes/parents", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({});

  _exports.default = _default;
});
;define("cfi2-coderdojo-site/services/ajax", ["exports", "ember-ajax/services/ajax"], function (_exports, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("cfi2-coderdojo-site/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "9wCGGCOJ",
    "block": "{\"symbols\":[],\"statements\":[[7,\"header\"],[11,\"class\",\"navbar navbar-inverse\"],[11,\"role\",\"banner\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"navbar-header\"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"CFI 2 Coder Dojo\"]],\"parameters\":[]},null],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"nav\"],[11,\"class\",\"collapse navbar-collapse\"],[11,\"role\",\"navigation\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"nav navbar-nav\"],[9],[0,\"\\n        \"],[7,\"li\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"parents\"],null,{\"statements\":[[0,\"For Parents\"]],\"parameters\":[]},null],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n  \"],[1,[21,\"outlet\"],false],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "cfi2-coderdojo-site/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("cfi2-coderdojo-site/templates/parents", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "iLDy56ET",
    "block": "{\"symbols\":[],\"statements\":[[7,\"article\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[0,\"Dear Parents\"],[10],[0,\"\\n  \"],[7,\"section\"],[9],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      Coder Dojo is a international movement of computer programming clubs for kids / by kids. You can read\\n      all about it \"],[7,\"a\"],[11,\"href\",\"https://coderdojo.com/movement/\"],[9],[0,\"here\"],[10],[0,\". Your student's dojo meets after school on\\n      Thursdays, but there are other ones that meet through out the city all the time. Feel free to check some\\n      of those out as well. There is also a state wide hackathon hosted by Coder Dojo Indiana, the statewide\\n      organization that lives inside of Techpoint Foundation for youth.\\n    \"],[10],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      Your student will start programming in a visual programmming environment called Scratch which is created and\\n      maintained by MIT. We will provide them with a scratch login and some getting started material via Google's\\n      CS First program. Scratch is just the tip of the iceberg.\\n      \"],[7,\"strong\"],[9],[0,\"Since the students are mostly under the age of 13, we need your help establishing an accoutn for them on a website called Github\"],[10],[0,\".\\n      Github is free for our use and it has become the defacto open source code storage for the entire internet. A Github account will allow your\\n      student to access a more robust environment called Code Anywhere and another service that we'll use called\\n      Glitch. It will also give your student a durable place to save their work and share their projects. Please see below\\n      for a more detailed explanation of each service / tool.\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"section\"],[9],[0,\"\\n    \"],[7,\"ul\"],[9],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://scratch.mit.edu\"],[9],[7,\"strong\"],[9],[0,\"Scratch\"],[10],[10],[0,\" - Scratch is a visual programming language,\\n        that represents code as a series of interconnected blocks. It enables easily creating games, interactive animations.\\n        Users can share their creations, view the source of other peoples creations and \\\"remix\\\" them to make them their own.\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://github.com\"],[9],[7,\"strong\"],[9],[0,\"Github\"],[10],[10],[0,\" - Git is a distributed version control system, which is a fancy\\n        way of saying it allows multiple people to work on a set of documents (code) and make sure that they don't accidentally\\n        delete or overwrite changes that other people have made. Github is a commercial host that acts as one of the distributed\\n        nodes in your Git. It also provides tools for sharing and reviewing code, wikis, hosted pages and loads more. Github provides\\n        an authentication mechanism that allows other sites to use Github as their authentication method (think login with Facebook or\\n        login with Google).\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://glitch.com\"],[9],[7,\"strong\"],[9],[0,\"Glitch\"],[10],[10],[0,\" - Glitch is similar to Scratch, but the language used to build\\n        applications is Javascript. It has similar features to Scratch where you can publish and share your work with other Glitch users,\\n        you can view the source code for other peoples' creations and it even uses the same language of remixing for copying and making\\n        someone else's project your own.\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://codeanywhere.com\"],[9],[7,\"strong\"],[9],[0,\"Code Anywhere\"],[10],[10],[0,\" - This one is serious. It gives students, for free, access\\n        to a full blown linux computer with administrator privileges for two hours a day. They can install whatever software they need,\\n        allowing them to create real applications that can be deployed into the world. It is full blown, professional developement\\n        environment. It will allow students to learn about more advanced topics like databases, different web programming languages, and\\n        the tools that professional developers use to create applications.\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"section\"],[9],[0,\"\\n    We may use other tools besides those listed here, but having a Github account will enable your student to more\\n    easily explore their interests as they develop.\\n  \"],[10],[0,\"\\n  \"],[7,\"h3\"],[9],[0,\"Thanks, CFI 2 Coder Dojo Volunteers\"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "cfi2-coderdojo-site/templates/parents.hbs"
    }
  });

  _exports.default = _default;
});
;

;define('cfi2-coderdojo-site/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("cfi2-coderdojo-site/app")["default"].create({"name":"cfi2-coderdojo-site","version":"0.0.0+e6bc504a"});
          }
        
//# sourceMappingURL=cfi2-coderdojo-site.map
