var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/nib-loader/lib/nib-class.js":
/*!********************************************************!*\
  !*** ./node_modules/@skpm/nib-loader/lib/nib-class.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-var, prefer-template, vars-on-top, no-underscore-dangle, prefer-arrow-callback, no-param-reassign */
/* globals NSUUID, MOClassDescription, NSBundle, NSObject, __command, MOPointer */
var ObjClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js").default;

function walkViewTree(rootView, fn) {
  function _visit(view) {
    fn(view);

    var subviews = view.subviews();
    for (var i = 0; i < subviews.count(); i++) {
      _visit(subviews.objectAtIndex(i));
    }
  }

  _visit(rootView);
}

var CONTAINS_EXT = /\.nib$/;

function NibClass(nibName, delegate, bundleURL) {
  if (CONTAINS_EXT.test(nibName)) {
    nibName = nibName.replace(CONTAINS_EXT, '');
  }
  var bundle = NSBundle.bundleWithURL(bundleURL || __command.pluginBundle().url());

  var nibOwner = (new ObjClass(delegate || {})).new();
  var root;

  var result = {
    getOwner() {
      return nibOwner;
    },
    getRoot() {
      return root;
    },
  };

  var topLevelObjectsPointer = MOPointer.alloc().initWithValue(null);

  var didManagedToLoad = bundle.loadNibNamed_owner_topLevelObjects(
    nibName,
    nibOwner,
    topLevelObjectsPointer,
  );

  if (!didManagedToLoad) {
    throw new Error('Error loading nib file ' + nibName + '.nib');
  }

  var topLevelObjects = topLevelObjectsPointer.value();
  for (var i = 0; i < topLevelObjects.count(); i++) {
    var obj = topLevelObjects.objectAtIndex(i);
    if (/View$/.test(String(obj.className()))) {
      root = obj;
      break;
    }
  }

  // find the views that have an identifier for easy access
  // we don't take the ones starting with _ since it's probably internal identifiers (used by cocoa)
  walkViewTree(root, function visit(view) {
    var id = String(view.identifier());
    if (id && id.indexOf('_') !== 0) {
      result[id] = view;
    }
  });

  return result;
}

module.exports = NibClass;


/***/ }),

/***/ "./node_modules/@skpm/xcodeproj-loader/lib/index.js?raw=true&publicPath=_webpack_resources&outputPath=../Resources/_webpack_resources!./node_modules/sketch-toolbar-item/SketchToolbarIcon.framework/SketchToolbarIcon":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@skpm/xcodeproj-loader/lib?raw=true&publicPath=_webpack_resources&outputPath=../Resources/_webpack_resources!./node_modules/sketch-toolbar-item/SketchToolbarIcon.framework/SketchToolbarIcon ***!
  \********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./node_modules/@skpm/xcodeproj-loader/lib/xcodeproj-class.js */ "./node_modules/@skpm/xcodeproj-loader/lib/xcodeproj-class.js")('_webpack_resources/SketchToolbarIcon.framework');

/***/ }),

/***/ "./node_modules/@skpm/xcodeproj-loader/lib/xcodeproj-class.js":
/*!********************************************************************!*\
  !*** ./node_modules/@skpm/xcodeproj-loader/lib/xcodeproj-class.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-var, prefer-template, prefer-arrow-callback, global-require, no-param-reassign, vars-on-top */
/* globals NSClassFromString, __command, __mocha__, NSURL */

var CONTAINS_EXT = /\.framework$/;

function xcodeprojClass(frameworkName) {
  if (typeof __command === 'undefined' || !__command.pluginBundle()) {
    throw new Error('missing plugin bundle :thinking_face:');
  }

  if (CONTAINS_EXT.test(frameworkName)) {
    frameworkName = frameworkName.replace(CONTAINS_EXT, '');
  }

  var frameworkPath = __command
    .pluginBundle()
    .url()
    .path()
    .stringByAppendingPathComponent('Contents')
    .stringByAppendingPathComponent('Resources');

  var parts = frameworkName.split('/');
  parts.forEach(function fixPath(part, i) {
    if (i !== parts.length - 1) {
      frameworkPath = frameworkPath.stringByAppendingPathComponent(part);
    } else {
      frameworkName = part;
    }
  });

  return {
    getClass(className) {
      var existingClass = NSClassFromString(className);
      if (!existingClass) {
        if (
          !__mocha__.loadFrameworkWithName_inDirectory(
            frameworkName,
            frameworkPath,
          )
        ) {
          throw new Error("Couldn't load framework " + frameworkName);
        }
        existingClass = NSClassFromString(className);
      }

      if (!existingClass) {
        throw new Error("Couldn't find class " + className);
      }

      return existingClass;
    },
    getNib(nibName, delegate) {
      var bundleURL = NSURL.fileURLWithPath(
        frameworkPath.stringByAppendingPathComponent(frameworkName) +
          '.framework',
      );

      try {
        return __webpack_require__(/*! @skpm/nib-loader/lib/nib-class */ "./node_modules/@skpm/nib-loader/lib/nib-class.js")(
          nibName,
          delegate,
          bundleURL,
        );
      } catch (err) {
        if (
          !__mocha__.loadFrameworkWithName_inDirectory(
            frameworkName,
            frameworkPath,
          )
        ) {
          throw new Error("Couldn't load framework " + frameworkName);
        }

        return __webpack_require__(/*! @skpm/nib-loader/lib/nib-class */ "./node_modules/@skpm/nib-loader/lib/nib-class.js")(
          nibName,
          delegate,
          bundleURL,
        );
      }
    },
  };
}

module.exports = xcodeprojClass;


/***/ }),

/***/ "./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(/*! ./runtime.js */ "./node_modules/cocoascript-class/lib/runtime.js");

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),

/***/ "./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),

/***/ "./node_modules/sketch-toolbar-item/sketch-toolbar-icon.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sketch-toolbar-item/sketch-toolbar-icon.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const SketchToolbarIconClass = __webpack_require__(/*! @skpm/xcodeproj-loader?raw=true&publicPath=_webpack_resources&outputPath=../Resources/_webpack_resources!./SketchToolbarIcon.framework/SketchToolbarIcon */ "./node_modules/@skpm/xcodeproj-loader/lib/index.js?raw=true&publicPath=_webpack_resources&outputPath=../Resources/_webpack_resources!./node_modules/sketch-toolbar-item/SketchToolbarIcon.framework/SketchToolbarIcon").getClass('SketchToolbarIcon');

module.exports = function() {

  let o = {};

  /**
  * @param {any} context - The current context
  * @param {string} commandID - The identifier of the command this item will trigger
  * @param {string} iconImagePath - A relative path to a 32x32px png image. To include a separate image path for dark mode use | to separate their path names
  */
  o.registerToolbarAction = function(context, commandID, iconImagePath) {
    SketchToolbarIconClass.registerToolbarAction_commandID_iconImagePath(context, commandID, iconImagePath);
  }

  /**
  * @param {any} context - The current context
  * @param {string} commandID - The identifier of the command this item will trigger
  * @param {string} iconImagePath - A relative path to a 32x32px png image. To include a separate image path for dark mode use | to separate their path names
  *  @returns {any} A toolbar item specifier which can be used to register a toolbar item group
  */
  o.specifierForToolbarAction = function(context, commandID, iconImagePath) {
    return SketchToolbarIconClass.specifierForToolbarAction_commandID_iconImagePath(context, commandID, iconImagePath);
  }

  /**
  * @param {any} context - The current context
  * @param {string} identifier - A unique identifier for the group item
  * @param {Array} specifiers - An array of specifiers created using `specifierForToolbarAction`
  */
  o.registerToolbarGroup = function (context, identifier, specifiers) {
    SketchToolbarIconClass.registerToolbarGroup_identifier_specifiers(context, identifier, specifiers);
  }

  /**
  * @param {any} context - The current context
  * @param {string} commandID - A unique identifier for the group item
  * @param {string} iconImagePath - A relative path to a 32x32px png image. To include a separate image path for dark mode use | to separate their path names
  * @returns {any} A menu item specifier to be used when registering a toolbar item with a dropdown menu
  */
  o.menuItemForToolbarAction = function(context, commandID, iconImagePath) {
    return SketchToolbarIconClass.menuItemForToolbarAction_commandID_iconImagePath(context, commandID, iconImagePath);
  }

  /**
  *  @returns {any} A separator menu item specifier to be used when registering a toolbar item with a dropdown menu
  */
  o.separatorMenuItem = function () {
    return SketchToolbarIconClass.separatorMenuItem();
  }

  /**
  * @param {any} context - The current context
  * @param {string} identifier - A unique identifier for the toolbar item
  * @param {string} title - The text to be displayed below in the toolbar item
  * @param {string} iconImagePath - A relative path to a 32x32px png image. To include a separate image path for dark mode use | to separate their path names
  * @param {Array} menuItems - An array of menu item specifiers created using `menuItemForToolbarAction` or `separatorMenuItem`
  */
  o.registerToolbarMenu = function (context, identifier, title, iconImagePath, menuItems) {
    SketchToolbarIconClass.registerToolbarMenu_identifier_title_iconImagePath_menuItems(context, identifier, title, iconImagePath, menuItems);
  }

  return o;

}();

/***/ }),

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: sayHello, sayNamaste, sayGoodbye, validateToolbarItem, registerToolbarActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sayHello", function() { return sayHello; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sayNamaste", function() { return sayNamaste; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sayGoodbye", function() { return sayGoodbye; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateToolbarItem", function() { return validateToolbarItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerToolbarActions", function() { return registerToolbarActions; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-toolbar-item */ "./node_modules/sketch-toolbar-item/sketch-toolbar-icon.js");
/* harmony import */ var sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1__);

 // Handlers for the toolbar item's run action

function sayHello() {
  sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].alert('Hello from the toolbar!', 'Have a great day 👋');
}
function sayNamaste() {
  sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].alert('Namaste from the toolbar!', 'Be cool 🙏');
}
function sayGoodbye() {
  sketch__WEBPACK_IMPORTED_MODULE_0__["UI"].alert('Goodbye from the toolbar!', 'See ya later, maybe ✌️');
} // The handler for the toolbar item's validate action
// If this method is not implemented, your toolbar item is always enabled
// NOTE: Keep this method light. Doing too much here will slow down Sketch

function validateToolbarItem(context) {
  // Get a reference to your toolbar item via context
  var toolbarItem = context.toolbarItem;
  var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = doc.selectedLayers; // As an example: enable the toolbar item if selection is not empty

  toolbarItem.enabled = !selectedLayers.isEmpty; // To change the item's icon during validation,
  // pass a relative path to another 32x32px image in your plugin's Resources folder:
  // This is entirely optional!
  // toolbarItem.iconImagePath = selectedLayers.isEmpty ? "hello-toolbar-icon-flipped.png" : "hello-toolbar-icon.png";
}
function registerToolbarActions(context) {
  // register a single toolbar item by passing:
  // 1. the current context
  // 2. the command identifier of the action this item will trigger
  // 3. the relative path to a 32x32px icon image in your plugin's Resources folder
  // To add a different image for dark mode, separate the image paths with a |
  sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.registerToolbarAction(context, 'goodbye', 'goodbye-toolbar-icon.png|goodbye-toolbar-icon-dark.png'); // ------------------------
  // to register a group of items, create specifiers for each item then register them as a group

  var item1 = sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.specifierForToolbarAction(context, 'namaste', 'namaste-toolbar-icon.png|namaste-toolbar-icon-dark.png');
  var item2 = sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.specifierForToolbarAction(context, 'hello', 'hello-toolbar-icon.png|hello-toolbar-icon-dark.png');
  sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.registerToolbarGroup(context, 'salutations', [item1, item2]); // ------------------------
  // to register a toolbar item with a dropdown menu, create a menuItem for each sub-item

  var menuItem1 = sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.menuItemForToolbarAction(context, 'hello', 'hello-toolbar-icon.png|hello-toolbar-icon-dark.png');
  var menuItem2 = sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.menuItemForToolbarAction(context, 'namaste', 'namaste-toolbar-icon.png|namaste-toolbar-icon-dark.png');
  var menuItem3 = sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.separatorMenuItem();
  var menuItem4 = sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.menuItemForToolbarAction(context, 'goodbye', 'goodbye-toolbar-icon.png|goodbye-toolbar-icon-dark.png'); // Then register them using the `registerToolbarMenu` method

  sketch_toolbar_item__WEBPACK_IMPORTED_MODULE_1___default.a.registerToolbarMenu(context, 'greetings', 'Greetings', 'greetings-toolbar-icon.png|greetings-toolbar-icon-dark.png', [menuItem1, menuItem2, menuItem3, menuItem4]);
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['sayHello'] = __skpm_run.bind(this, 'sayHello');
globalThis['validateToolbarItem'] = __skpm_run.bind(this, 'validateToolbarItem');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['sayNamaste'] = __skpm_run.bind(this, 'sayNamaste');
globalThis['validateToolbarItem'] = __skpm_run.bind(this, 'validateToolbarItem');
globalThis['sayGoodbye'] = __skpm_run.bind(this, 'sayGoodbye');
globalThis['validateToolbarItem'] = __skpm_run.bind(this, 'validateToolbarItem');
globalThis['registerToolbarActions'] = __skpm_run.bind(this, 'registerToolbarActions')

//# sourceMappingURL=__my-command.js.map