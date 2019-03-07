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
    "id": "gncKZGma",
    "block": "{\"symbols\":[],\"statements\":[[7,\"header\"],[11,\"class\",\"navbar navbar-inverse\"],[11,\"role\",\"banner\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"container\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"navbar-header\"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"CFI 2 Coder Dojo\"]],\"parameters\":[]},null],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"nav\"],[11,\"class\",\"collapse navbar-collapse\"],[11,\"role\",\"navigation\"],[9],[0,\"\\n      \"],[7,\"ul\"],[11,\"class\",\"nav navbar-nav\"],[9],[0,\"\\n        \"],[7,\"li\"],[9],[0,\"\\n          \"],[4,\"link-to\",[\"parents\"],null,{\"statements\":[[0,\"For Parents\"]],\"parameters\":[]},null],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"section\"],[11,\"class\",\"site-content\"],[9],[0,\"\\n  \"],[1,[21,\"outlet\"],false],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
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
    "id": "ErMZfGoQ",
    "block": "{\"symbols\":[],\"statements\":[[7,\"article\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[0,\"Dear Parents\"],[10],[0,\"\\n  \"],[7,\"section\"],[9],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      Coder Dojo is a international movement of computer programming clubs for kids / by kids. You can read\\n      all about it \"],[7,\"a\"],[11,\"href\",\"https://coderdojo.com/movement/\"],[9],[0,\"here\"],[10],[0,\". Your student's dojo meets after school on\\n      Thursdays, but there are other ones that meet through out the city all the time. Feel free to check some\\n      of those out as well. There is also a state wide hackathon hosted by Coder Dojo Indiana, the statewide\\n      organization that lives inside of Techpoint Foundation for youth.\\n    \"],[10],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      Coder Dojo is free to participate in, however, we suggest at least a $5 donation\\n      (\"],[7,\"a\"],[11,\"href\",\"https://my.cheddarup.com/c/cfi-coder-dojo\"],[9],[0,\"online here\"],[10],[0,\" or send cash with your student), \\n      These donations go directly to the CFI 2 PTSA, which provides technology funds to the school to help replace things\\n      like headphones as they break and wear out. This helps keep the keep the computer lab full of quiet code ninjas.\\n    \"],[10],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      Your student will start programming in a visual programmming environment called Scratch which is created and\\n      maintained by MIT. We will provide them with a scratch login and some getting started material via Google's\\n      CS First program. Scratch is just the tip of the iceberg.\\n    \"],[10],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      \"],[7,\"strong\"],[9],[0,\"\\n        Since the students are mostly under the age of 13, we need your help establishing accounts for them\\n        at the following websites (see below for more detailed information about each one)\\n      \"],[10],[0,\"\\n      \"],[7,\"ul\"],[9],[0,\"\\n        \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"https://github.com\"],[11,\"target\",\"_blank\"],[11,\"rel\",\"noopener\"],[9],[0,\"Github\"],[10],[10],[0,\"\\n        \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"https://www.khanacademy.org\"],[11,\"target\",\"_blank\"],[11,\"rel\",\"noopener\"],[9],[0,\"Khan Academy\"],[10],[10],[0,\"\\n      \"],[10],[0,\"      \\n    \"],[10],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      We already have anonymized accounts via Google CS First to assign to each student and a Github account will gives\\n      students access to \"],[7,\"strong\"],[9],[0,\"Glitch\"],[10],[0,\" and \"],[7,\"strong\"],[9],[0,\"Code Anywhere\"],[10],[0,\" and many other tools not listed here.\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"section\"],[9],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"Here are resources that we utilize during Coder Dojo, please feel free to explore them.\"],[10],[0,\"\\n    \"],[7,\"ul\"],[9],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://scratch.mit.edu\"],[9],[7,\"strong\"],[9],[0,\"Scratch\"],[10],[10],[0,\" - Scratch is a visual programming language,\\n        that represents code as a series of interconnected blocks. It enables easily creating games, interactive animations.\\n        Users can share their creations, view the source of other peoples creations and \\\"remix\\\" them to make them their own.\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://www.cs-first.com/en/home\"],[9],[7,\"strong\"],[9],[0,\"CS First\"],[10],[10],[0,\" - Google CS First is a series of themed\\n        interactive programming lessons from game design to music creation. This is where all students start by default.\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://www.khanacademy.org/\"],[9],[7,\"strong\"],[9],[0,\"Khan Academy\"],[10],[10],[0,\" - Khan Academy is a free online school. They have\\n        lessons covering everything from Art History to Physics for learners of all levels (Kindergarten through Post College). We\\n        will use Khan Academy resources primarily for the Computer Programming courses.\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://github.com\"],[9],[7,\"strong\"],[9],[0,\"Github\"],[10],[10],[0,\" - Git is a distributed version control system, which is a fancy\\n        way of saying it allows multiple people to work on a set of documents (code) and make sure that they don't accidentally\\n        delete or overwrite changes that other people have made. Github is a commercial host that acts as one of the distributed\\n        nodes in your Git. It also provides tools for sharing and reviewing code, wikis, hosted pages and loads more. Github provides\\n        an authentication mechanism that allows other sites to use Github as their authentication method (think login with Facebook or\\n        login with Google).\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://glitch.com\"],[9],[7,\"strong\"],[9],[0,\"Glitch\"],[10],[10],[0,\" - Glitch is similar to Scratch, but the language used to build\\n        applications is Javascript. It has similar features to Scratch where you can publish and share your work with other Glitch users,\\n        you can view the source code for other peoples' creations and it even uses the same language of remixing for copying and making\\n        someone else's project your own.\\n      \"],[10],[0,\"\\n      \"],[7,\"li\"],[9],[0,\"\\n        \"],[7,\"a\"],[11,\"href\",\"https://codeanywhere.com\"],[9],[7,\"strong\"],[9],[0,\"Code Anywhere\"],[10],[10],[0,\" - This one is serious. It gives students, for free, access\\n        to a full blown linux computer with administrator privileges for two hours a day. They can install whatever software they need,\\n        allowing them to create real applications that can be deployed into the world. It is full blown, professional developement\\n        environment. It will allow students to learn about more advanced topics like databases, different web programming languages, and\\n        the tools that professional developers use to create applications.\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"Below you'll find links to games that encourage developing programming skills and teach internet safety.\"],[10],[0,\"\\n    \"],[7,\"ul\"],[9],[0,\"\\n      \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"https://codecombat.com/\"],[9],[0,\"Code Combat\"],[10],[10],[0,\"\\n      \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"https://beinternetawesome.withgoogle.com/\"],[9],[0,\"Be Internet Awesome!\"],[10],[10],[0,\"\\n      \"],[7,\"li\"],[9],[7,\"a\"],[11,\"href\",\"https://hourofcode.com/us/learn\"],[9],[0,\"Hour of Code\"],[10],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"section\"],[9],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      Please remind your student the purpose of the club is to dive into coding. Help them be ready to spend an hour creating with code. \\n      There will be time for play but not until the last 15 minutes of club. Also remind your students to keep their creativity \\n      school appropriate. If students feel the need to include violence and/or disrespectful content I’ll be reaching out\\n      to you. If you have any questions regarding what is considered violent or disrespectful please feel free to ask.  \\n    \"],[10],[0,\"\\n    \"],[7,\"p\"],[9],[0,\"\\n      As always engage your kids. Ask them to show you their projects and play the games that they've made. Have them teach\\n      you a new scratch piece they’ve learned. Encourage them to help their peers. Learning together is the CFI way!\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"h3\"],[9],[0,\"Thanks, CFI 2 Coder Dojo Champions\"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}",
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
            require("cfi2-coderdojo-site/app")["default"].create({"name":"cfi2-coderdojo-site","version":"0.0.0+d125751a"});
          }
        
//# sourceMappingURL=cfi2-coderdojo-site.map
