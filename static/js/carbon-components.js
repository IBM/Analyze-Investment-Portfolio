var CarbonComponents = (function (exports) {
'use strict';

/**
 * Settings.
 * @exports CarbonComponents.settings
 * @type Object
 * @property {boolean} [disableAutoInit]
 *   Disables automatic instantiation of components.
 *   By default (`CarbonComponents.disableAutoInit` is `false`),
 *   carbon-components attempts to instantiate components automatically
 *   by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
 *   or upon DOM events (e.g. clicking) on such elements.
 *   See each components' static `.init()` methods for details.
 * @property {string} [prefix=bx]
 *   Brand prefix. Should be in sync with `$prefix` Sass variable in carbon-components/src/globals/scss/_vars.scss.
 */
var settings = {
  prefix: 'bx'
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * @param {Array} a An array.
 * @returns {Array} The flattened version of the given array.
 */
function flatten(a) {
  return a.reduce(function (result, item) {
    if (Array.isArray(item)) {
      result.push.apply(result, toConsumableArray(flatten(item)));
    } else {
      result.push(item);
    }
    return result;
  }, []);
}

/**
 * An interface for defining mix-in classes. Used with {@link mixin}.
 * @function mixinfn
 * @param {Class} ToMix The class to mix.
 * @returns {Class} The class mixed-in with the given ToMix class.
 */

/**
 * @function mixin
 * @param {...mixinfn} mixinfns The functions generating mix-ins.
 * @returns {Class} The class generated with the given mix-ins.
 */
function mixin() {
  for (var _len = arguments.length, mixinfns = Array(_len), _key = 0; _key < _len; _key++) {
    mixinfns[_key] = arguments[_key];
  }

  return flatten(mixinfns).reduce(function (Class, mixinfn) {
    return mixinfn(Class);
  }, function () {
    function _class() {
      classCallCheck(this, _class);
    }

    return _class;
  }());
}

var createComponent = function (ToMix) {
  var CreateComponent = function (_ToMix) {
    inherits(CreateComponent, _ToMix);

    /**
     * Mix-in class to manage lifecycle of component.
     * The constructor sets up this component's effective options,
     * and registers this component't instance associated to an element.
     * @implements Handle
     * @param {HTMLElement} element The element working as this component.
     * @param {Object} [options] The component options.
     */
    function CreateComponent(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, CreateComponent);

      var _this = possibleConstructorReturn(this, (CreateComponent.__proto__ || Object.getPrototypeOf(CreateComponent)).call(this, element, options));

      _this.children = [];


      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      /**
       * The element the component is of.
       * @type {Element}
       */
      _this.element = element;

      /**
       * The component options.
       * @type {Object}
       */
      _this.options = Object.assign(Object.create(_this.constructor.options), options);

      _this.constructor.components.set(_this.element, _this);
      return _this;
    }

    /**
     * Instantiates this component of the given element.
     * @param {HTMLElement} element The element.
     */

    /**
     * The component instances managed by this component.
     * Releasing this component also releases the components in `this.children`.
     * @type {Component[]}
     */


    createClass(CreateComponent, [{
      key: 'release',


      /**
       * Releases this component's instance from the associated element.
       */
      value: function release() {
        for (var child = this.children.pop(); child; child = this.children.pop()) {
          child.release();
        }
        this.constructor.components.delete(this.element);
        return null;
      }
    }], [{
      key: 'create',
      value: function create(element, options) {
        return this.components.get(element) || new this(element, options);
      }
    }]);
    return CreateComponent;
  }(ToMix);

  return CreateComponent;
};

var initComponentBySearch = function (ToMix) {
  /**
   * Mix-in class to instantiate components by searching for their root elements.
   * @class InitComponentBySearch
   */
  var InitComponentBySearch = function (_ToMix) {
    inherits(InitComponentBySearch, _ToMix);

    function InitComponentBySearch() {
      classCallCheck(this, InitComponentBySearch);
      return possibleConstructorReturn(this, (InitComponentBySearch.__proto__ || Object.getPrototypeOf(InitComponentBySearch)).apply(this, arguments));
    }

    createClass(InitComponentBySearch, null, [{
      key: 'init',

      /**
       * Instantiates component in the given node.
       * If the given element indicates that it's an component of this class, instantiates it.
       * Otherwise, instantiates components by searching for components in the given node.
       * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
       * @param {Object} [options] The component options.
       * @param {boolean} [options.selectorInit] The CSS selector to find components.
       */
      value: function init() {
        var _this2 = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = Object.assign(Object.create(this.options), options);
        if (!target || target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new TypeError('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target, options);
        } else {
          [].concat(toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this2.create(element, options);
          });
        }
      }
    }]);
    return InitComponentBySearch;
  }(ToMix);

  return InitComponentBySearch;
};

var handles = function (ToMix) {
  /**
   * Mix-in class to manage handles in component.
   * Managed handles are automatically released when the component with this class mixed in is released.
   * @class Handles
   * @implements Handle
   */
  var Handles = function (_ToMix) {
    inherits(Handles, _ToMix);

    function Handles() {
      var _ref;

      var _temp, _this, _ret;

      classCallCheck(this, Handles);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Handles.__proto__ || Object.getPrototypeOf(Handles)).call.apply(_ref, [this].concat(args))), _this), _this.handles = new Set(), _temp), possibleConstructorReturn(_this, _ret);
    }
    /**
     * The handled managed by this component.
     * Releasing this component releases the handles.
     * @type {Set<Handle>}
     */


    createClass(Handles, [{
      key: "manage",


      /**
       * Manages the given handle.
       * @param {Handle} handle The handle to manage.
       * @returns {Handle} The given handle.
       */
      value: function manage(handle) {
        this.handles.add(handle);
        return handle;
      }

      /**
       * Stop managing the given handle.
       * @param {Handle} handle The handle to stop managing.
       * @returns {Handle} The given handle.
       */

    }, {
      key: "unmanage",
      value: function unmanage(handle) {
        this.handles.delete(handle);
        return handle;
      }
    }, {
      key: "release",
      value: function release() {
        var _this2 = this;

        this.handles.forEach(function (handle) {
          handle.release();
          _this2.handles.delete(handle);
        });
        return get(Handles.prototype.__proto__ || Object.getPrototypeOf(Handles.prototype), "release", this).call(this);
      }
    }]);
    return Handles;
  }(ToMix);

  return Handles;
};

function on(element) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  element.addEventListener.apply(element, args);
  return {
    release: function release() {
      element.removeEventListener.apply(element, args);
      return null;
    }
  };
}

var stateChangeTypes = {
  true: 'true',
  false: 'false',
  mixed: 'mixed'
};

var Checkbox = function (_mixin) {
  inherits(Checkbox, _mixin);

  /**
   * Checkbox UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a checkbox UI.
   */

  function Checkbox(element, options) {
    classCallCheck(this, Checkbox);

    var _this = possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, element, options));

    _this.manage(on(_this.element, 'click', function (event) {
      _this._handleClick(event);
    }));
    _this.manage(on(_this.element, 'focus', function (event) {
      _this._handleFocus(event);
    }));
    _this.manage(on(_this.element, 'blur', function (event) {
      _this._handleBlur(event);
    }));

    _this._indeterminateCheckbox();
    _this._initCheckbox();
    return _this;
  }

  createClass(Checkbox, [{
    key: '_handleClick',
    value: function _handleClick() {
      if (this.element.checked === true) {
        this.element.setAttribute('checked', '');
        this.element.setAttribute('aria-checked', 'true');
        this.element.checked = true;

        // nested checkboxes inside labels
        if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
          this.element.parentElement.setAttribute('data-contained-checkbox-state', 'true');
        }
      } else if (this.element.checked === false) {
        this.element.removeAttribute('checked');
        this.element.setAttribute('aria-checked', 'false');
        this.element.checked = false;

        // nested checkboxes inside labels
        if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
          this.element.parentElement.setAttribute('data-contained-checkbox-state', 'false');
        }
      }
    }
  }, {
    key: '_handleFocus',
    value: function _handleFocus() {
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.classList.add('bx--checkbox-label__focus');
      }
    }
  }, {
    key: '_handleBlur',
    value: function _handleBlur() {
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.classList.remove('bx--checkbox-label__focus');
      }
    }

    /**
     * Sets the new checkbox state.
     * @param {boolean|string} [state]
     *   The new checkbox state to set. `mixed` to put checkbox in indeterminate state.
     *   If omitted, this method simply makes the style reflect `aria-checked` attribute.
     */

  }, {
    key: 'setState',
    value: function setState(state) {
      if (state === undefined || stateChangeTypes[state] === undefined) {
        throw new TypeError('setState expects a value of true, false or mixed.');
      }

      this.element.setAttribute('aria-checked', state);
      this.element.indeterminate = state === stateChangeTypes.mixed;
      this.element.checked = state === stateChangeTypes.true;

      var container = this.element.closest('[data-contained-checkbox-state]');
      if (container) {
        container.setAttribute('data-contained-checkbox-state', state);
      }
    }
  }, {
    key: 'setDisabled',
    value: function setDisabled(value) {
      if (value === undefined) {
        throw new TypeError('setDisabled expects a boolean value of true or false');
      }
      if (value === true) {
        this.element.setAttribute('disabled', true);
      } else if (value === false) {
        this.element.removeAttribute('disabled');
      }
      var container = this.element.closest('[data-contained-checkbox-disabled]');
      if (container) {
        container.setAttribute('data-contained-checkbox-disabled', value);
      }
    }
  }, {
    key: '_indeterminateCheckbox',
    value: function _indeterminateCheckbox() {
      if (this.element.getAttribute('aria-checked') === 'mixed') {
        this.element.indeterminate = true;
      }
      if (this.element.indeterminate === true) {
        this.element.setAttribute('aria-checked', 'mixed');
      }
      if (this.element.parentElement.classList.contains('bx--checkbox-label') && this.element.indeterminate === true) {
        this.element.parentElement.setAttribute('data-contained-checkbox-state', 'mixed');
      }
    }
  }, {
    key: '_initCheckbox',
    value: function _initCheckbox() {
      if (this.element.checked === true) {
        this.element.setAttribute('aria-checked', 'true');
      }
      if (this.element.parentElement.classList.contains('bx--checkbox-label') && this.element.checked) {
        this.element.parentElement.setAttribute('data-contained-checkbox-state', 'true');
      }
      if (this.element.parentElement.classList.contains('bx--checkbox-label')) {
        this.element.parentElement.setAttribute('data-contained-checkbox-disabled', 'false');
      }
      if (this.element.parentElement.classList.contains('bx--checkbox-label') && this.element.disabled) {
        this.element.parentElement.setAttribute('data-contained-checkbox-disabled', 'true');
      }
    }

    /**
     * The map associating DOM element and copy button UI instance.
     * @member Checkbox.components
     * @type {WeakMap}
     */


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode Checkbox.create .create()}, or {@linkcode Checkbox.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode Checkbox.init .init()} works.
     * @member Checkbox.options
     * @type {Object}
     * @property {string} selectorInit The data attribute to find copy button UIs.
     */

  }]);
  return Checkbox;
}(mixin(createComponent, initComponentBySearch, handles));

Checkbox.components = new WeakMap();
Checkbox.options = {
  selectorInit: '.bx--checkbox'
};
Checkbox.stateChangeTypes = stateChangeTypes;

var eventedState = function (ToMix) {
  /**
   * Mix-in class to manage events associated with states.
   * @class EventedState
   */
  var EventedState = function (_ToMix) {
    inherits(EventedState, _ToMix);

    function EventedState() {
      classCallCheck(this, EventedState);
      return possibleConstructorReturn(this, (EventedState.__proto__ || Object.getPrototypeOf(EventedState)).apply(this, arguments));
    }

    createClass(EventedState, [{
      key: '_changeState',

      // eslint-disable-next-line jsdoc/check-param-names
      /**
       * The internal implementation for {@link EventedState#changeState `.changeState()`}, performing actual change in state.
       * @param {string} [state] The new state. Can be an omitted, which means toggling.
       * @param {Object} [detail]
       *   The object that should be put to event details that is fired before/after changing state.
       *   Can have a `group` property, which specifies what state to be changed.
       * @param {EventedState~changeStateCallback} callback The callback called once changing state is finished or is canceled.
       * @private
       */
      value: function _changeState() {
        throw new Error('_changeState() should be overriden to perform actual change in state.');
      }

      // eslint-disable-next-line jsdoc/check-param-names
      /**
       * Changes the state of this component.
       * @param {string} [state] The new state. Can be an omitted, which means toggling.
       * @param {Object} [detail]
       *   The object that should be put to event details that is fired before/after changing state.
       *   Can have a `group` property, which specifies what state to be changed.
       * @param {EventedState~changeStateCallback} [callback] The callback called once changing state is finished or is canceled.
       */

    }, {
      key: 'changeState',
      value: function changeState() {
        var _this2 = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var state = typeof args[0] === 'string' ? args.shift() : undefined;
        var detail = Object(args[0]) === args[0] && typeof args[0] !== 'function' ? args.shift() : undefined;
        var callback = typeof args[0] === 'function' ? args.shift() : undefined;

        if (typeof this.shouldStateBeChanged === 'function' && !this.shouldStateBeChanged(state, detail)) {
          if (callback) {
            callback(null, true);
          }
          return;
        }

        var data = {
          group: detail && detail.group,
          state: state
        };

        var eventNameSuffix = [data.group, state].filter(Boolean).join('-').split('-') // Group or state may contain hyphen
        .map(function (item) {
          return item[0].toUpperCase() + item.substr(1);
        }).join('');

        var eventStart = new CustomEvent(this.options['eventBefore' + eventNameSuffix], {
          bubbles: true,
          cancelable: true,
          detail: detail
        });

        var fireOnNode = detail && detail.delegatorNode || this.element;
        var canceled = !fireOnNode.dispatchEvent(eventStart);

        if (canceled) {
          if (callback) {
            var error = new Error('Changing state (' + JSON.stringify(data) + ') has been canceled.');
            error.canceled = true;
            callback(error);
          }
        } else {
          var changeStateArgs = [state, detail].filter(Boolean);
          this._changeState.apply(this, toConsumableArray(changeStateArgs).concat([function () {
            fireOnNode.dispatchEvent(new CustomEvent(_this2.options['eventAfter' + eventNameSuffix], {
              bubbles: true,
              cancelable: true,
              detail: detail
            }));
            if (callback) {
              callback();
            }
          }]));
        }
      }

      /**
       * Tests if change in state should happen or not.
       * Classes inheriting {@link EventedState `EventedState`} should override this function.
       * @function EventedState#shouldStateBeChanged
       * @param {string} [state] The new state. Can be an omitted, which means toggling.
       * @param {Object} [detail]
       *   The object that should be put to event details that is fired before/after changing state.
       *   Can have a `group` property, which specifies what state to be changed.
       * @returns {boolean}
       *   `false` if change in state shouldn't happen, e.g. when the given new state is the same as the current one.
       */

    }]);
    return EventedState;
  }(ToMix);

  /**
   * The callback called once changing state is finished or is canceled.
   * @callback EventedState~changeStateCallback
   * @param {Error} error
   *   An error object with `true` in its `canceled` property if changing state is canceled.
   *   Cancellation happens if the handler of a custom event, that is fired before changing state happens,
   *   calls `.preventDefault()` against the event.
   * @param {boolean} keptState
   *   `true` if the call to {@link EventedState#changeState `.changeState()`} didn't cause actual change in state.
   */

  return EventedState;
};

/**
 * @param {Event} event The event.
 * @param {string} selector The selector.
 * @returns {Element}
 *   The closest ancestor of the event target (or the event target itself) which matches the selectors given in parameter.
 */
function eventMatches(event, selector) {
  // <svg> in IE does not have `Element#msMatchesSelector()` (that should be copied to `Element#matches()` by a polyfill).
  // Also a weird behavior is seen in IE where DOM tree seems broken when `event.target` is on <svg>.
  // Therefore this function simply returns `undefined` when `event.target` is on <svg>.
  var target = event.target,
      currentTarget = event.currentTarget;

  if (typeof target.matches === 'function') {
    if (target.matches(selector)) {
      // If event target itself matches the given selector, return it
      return target;
    } else if (target.matches(selector + ' *')) {
      var closest = target.closest(selector);
      if ((currentTarget.nodeType === Node.DOCUMENT_NODE ? currentTarget.documentElement : currentTarget).contains(closest)) {
        return closest;
      }
    }
  }
  return undefined;
}

var FileUploader = function (_mixin) {
  inherits(FileUploader, _mixin);

  /**
   * File uploader.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends eventedState
   * @extends Handles
   * @param {HTMLElement} element The element working as a file uploader.
   * @param {Object} [options] The component options. See static options.
   */
  function FileUploader(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, FileUploader);

    var _this = possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, element, options));

    _this._changeState = function (state, detail, callback) {
      if (state === 'delete-filename-fileuploader') {
        _this.container.removeChild(detail.filenameElement);
      }
      if (typeof callback === 'function') {
        callback();
      }
    };

    _this._handleDeleteButton = function (evt) {
      var target = eventMatches(evt, '[data-for=' + _this.inputId + ']');
      if (target) {
        _this._changeState('delete-filename-fileuploader', {
          initialEvt: evt,
          filenameElement: target.parentNode
        });
      }
    };

    _this.input = _this.element.querySelector(_this.options.selectorInput);
    _this.container = _this.element.querySelector(_this.options.selectorContainer);

    if (!_this.input) {
      throw new TypeError('Cannot find the file input box.');
    }

    if (!_this.container) {
      throw new TypeError('Cannot find the file names container.');
    }

    _this.inputId = _this.input.getAttribute('id');
    _this.manage(on(_this.input, 'change', function () {
      return _this._displayFilenames();
    }));
    _this.manage(on(_this.container, 'click', _this._handleDeleteButton));
    return _this;
  }

  createClass(FileUploader, [{
    key: '_filenamesHTML',
    value: function _filenamesHTML(name, id) {
      return '<span class="' + this.options.classSelectedFile + '">\n      <p class="' + this.options.classFileName + '">' + name + '</p>\n      <span data-for="' + id + '" class="' + this.options.classStateContainer + '"></span>\n    </span>';
    }
  }, {
    key: '_uploadHTML',
    value: function _uploadHTML() {
      return '\n      <div data-loading class="' + this.options.classLoading + '">\n        <svg class="' + this.options.classLoadingSvg + '" viewBox="-42 -42 84 84">\n          <circle cx="0" cy="0" r="37.5" />\n        </svg>\n      </div>';
    }
  }, {
    key: '_closeButtonHTML',
    value: function _closeButtonHTML() {
      return '\n      <svg class="' + this.options.classFileClose + '" tabindex="0" viewBox="0 0 16 16" fill-rule="evenodd" width="16" height="16">\n        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8\n          9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />\n      </svg>';
    }
  }, {
    key: '_checkmarkHTML',
    value: function _checkmarkHTML() {
      return '\n      <svg class="' + this.options.classFileComplete + '" viewBox="0 0 16 16" fill-rule="evenodd" width="16" height="16">\n       <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM6.7 11.5L3.4 8.1l1.4-1.4 1.9 1.9 4.1-4.1 1.4 1.4-5.5 5.6z"/>\n      </svg>';
    }
  }, {
    key: '_getStateContainers',
    value: function _getStateContainers() {
      var stateContainers = [].concat(toConsumableArray(this.element.querySelectorAll('[data-for=' + this.inputId + ']')));

      if (stateContainers.length === 0) {
        throw new TypeError('State container elements not found; invoke _displayFilenames() first');
      }

      if (stateContainers[0].dataset.for !== this.inputId) {
        throw new TypeError('File input id must equal [data-for] attribute');
      }

      return stateContainers;
    }

    /**
     * Inject selected files into DOM. Invoked on change event.
     */

  }, {
    key: '_displayFilenames',
    value: function _displayFilenames() {
      var _this2 = this;

      var container = this.element.querySelector(this.options.selectorContainer);
      var HTMLString = [].concat(toConsumableArray(this.input.files)).map(function (file) {
        return _this2._filenamesHTML(file.name, _this2.inputId);
      }).join('');

      container.insertAdjacentHTML('afterbegin', HTMLString);
    }
  }, {
    key: '_removeState',
    value: function _removeState(element) {
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }, {
    key: '_handleStateChange',
    value: function _handleStateChange(elements, selectIndex, html) {
      var _this3 = this;

      if (selectIndex === undefined) {
        elements.forEach(function (el) {
          _this3._removeState(el);
          el.insertAdjacentHTML('beforeend', html);
        });
      } else {
        elements.forEach(function (el, index) {
          if (index === selectIndex) {
            _this3._removeState(el);
            el.insertAdjacentHTML('beforeend', html);
          }
        });
      }
    }

    /**
     * Handles delete button.
     * @param {Event} evt The event triggering this action.
     * @private
     */

  }, {
    key: 'setState',
    value: function setState(state, selectIndex) {
      var stateContainers = this._getStateContainers();

      if (state === 'edit') {
        this._handleStateChange(stateContainers, selectIndex, this._closeButtonHTML());
      }

      if (state === 'upload') {
        this._handleStateChange(stateContainers, selectIndex, this._uploadHTML());
      }

      if (state === 'complete') {
        this._handleStateChange(stateContainers, selectIndex, this._checkmarkHTML());
      }
    }

    /**
     * The map associating DOM element and file uploader instance.
     * @member FileUploader.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-file]',
        selectorInput: 'input[type="file"].' + prefix + '--file-input',
        selectorContainer: '[data-file-container]',
        selectorCloseButton: '.' + prefix + '--file-close',
        classLoading: prefix + '--loading',
        classLoadingSvg: prefix + '--loading__svg',
        classFileName: prefix + '--file-filename',
        classFileClose: prefix + '--file-close',
        classFileComplete: prefix + '--file-complete',
        classSelectedFile: prefix + '--file__selected-file',
        classStateContainer: prefix + '--file__state-container',
        eventBeforeDeleteFilenameFileuploader: 'fileuploader-before-delete-filename',
        eventAfterDeleteFilenameFileuploader: 'fileuploader-after-delete-filename'
      };
    }
  }]);
  return FileUploader;
}(mixin(createComponent, initComponentBySearch, eventedState, handles));

FileUploader.components = new WeakMap();

var initComponentByEvent = function (ToMix) {
  /**
   * Mix-in class to instantiate components upon events.
   * @class InitComponentByEvent
   */
  var InitComponentByEvent = function (_ToMix) {
    inherits(InitComponentByEvent, _ToMix);

    function InitComponentByEvent() {
      classCallCheck(this, InitComponentByEvent);
      return possibleConstructorReturn(this, (InitComponentByEvent.__proto__ || Object.getPrototypeOf(InitComponentByEvent)).apply(this, arguments));
    }

    createClass(InitComponentByEvent, null, [{
      key: 'init',


      /**
       * Instantiates this component in the given element.
       * If the given element indicates that it's an component of this class, instantiates it.
       * Otherwise, instantiates this component by clicking on this component in the given node.
       * @param {Node} target The DOM node to instantiate this component in. Should be a document or an element.
       * @param {Object} [options] The component options.
       * @param {string} [options.selectorInit] The CSS selector to find this component.
       * @returns {Handle} The handle to remove the event listener to handle clicking.
       */
      value: function init() {
        var _this2 = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = Object.assign(Object.create(this.options), options);
        if (!target || target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new TypeError('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target, options);
        } else {
          // To work around non-bubbling `focus` event, use `focusin` event instead of it's available, and "capture mode" otherwise
          var hasFocusin = 'onfocusin' in (target.nodeType === Node.ELEMENT_NODE ? target.ownerDocument : target).defaultView;
          var handles = effectiveOptions.initEventNames.map(function (name) {
            var eventName = name === 'focus' && hasFocusin ? 'focusin' : name;
            return on(target, eventName, function (event) {
              var element = eventMatches(event, effectiveOptions.selectorInit);
              // Instantiated components handles events by themselves
              if (element && !_this2.components.has(element)) {
                var component = _this2.create(element, options);
                if (typeof component.createdByEvent === 'function') {
                  component.createdByEvent(event);
                }
              }
            }, name === 'focus' && !hasFocusin);
          });
          return {
            release: function release() {
              for (var handle = handles.pop(); handle; handle = handles.pop()) {
                handle.release();
              }
            }
          };
        }
        return '';
      }
      /**
       * `true` suggests that this component is lazily initialized upon an action/event, etc.
       * @type {boolean}
       */

    }]);
    return InitComponentByEvent;
  }(ToMix);

  InitComponentByEvent.forLazyInit = true;

  return InitComponentByEvent;
};

var FabButton = function (_mixin) {
  inherits(FabButton, _mixin);

  /**
   * Floating action button.
   * @extends CreateComponent
   * @extends InitComponentByEvent
   * @extends Handles
   * @param {HTMLElement} element The element working as a floting action button.
   */
  function FabButton(element) {
    classCallCheck(this, FabButton);

    var _this = possibleConstructorReturn(this, (FabButton.__proto__ || Object.getPrototypeOf(FabButton)).call(this, element));

    _this.manage(on(element, 'click', function (event) {
      _this.toggle(event);
    }));
    return _this;
  }

  /**
   * A method called when this widget is created upon clicking.
   * @param {Event} event The event triggering the creation.
   */


  createClass(FabButton, [{
    key: 'createdByEvent',
    value: function createdByEvent(event) {
      this.toggle(event);
    }

    /**
     * Toggles this floating action button.
     * @param {Event} event The event triggering this method.
     */

  }, {
    key: 'toggle',
    value: function toggle(event) {
      if (this.element.tagName === 'A') {
        event.preventDefault();
      }

      if (this.element.dataset.state === 'closed') {
        this.element.dataset.state = 'open';
      } else {
        this.element.dataset.state = 'closed';
      }
    }

    /**
     * Instantiates floating action button of the given element.
     * @param {HTMLElement} element The element.
     */

  }], [{
    key: 'create',
    value: function create(element) {
      return this.components.get(element) || new this(element);
    }

    /**
     * The map associating DOM element and floating action button instance.
     * @member FabButton.components
     * @type {WeakMap}
     */


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode FabButton.create .create()}, or {@linkcode FabButton.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode FabButton.init .init()} works.
     * @member FabButton.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find floating action buttons.
     */

  }]);
  return FabButton;
}(mixin(createComponent, initComponentByEvent, handles));

FabButton.components = new WeakMap();
FabButton.options = {
  selectorInit: '[data-fab]',
  initEventNames: ['click']
};

var ContentSwitcher = function (_mixin) {
  inherits(ContentSwitcher, _mixin);

  /**
   * Set of content switcher buttons.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends EventedState
   * @extends Handles
   * @param {HTMLElement} element The element working as a set of content switcher buttons.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
   * @param {string} [options.classActive] The CSS class for switcher button's selected state.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a switcher button is selected.
   *   Cancellation of this event stops selection of content switcher button.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
   */
  function ContentSwitcher(element, options) {
    classCallCheck(this, ContentSwitcher);

    var _this = possibleConstructorReturn(this, (ContentSwitcher.__proto__ || Object.getPrototypeOf(ContentSwitcher)).call(this, element, options));

    _this.manage(on(_this.element, 'click', function (event) {
      _this._handleClick(event);
    }));
    return _this;
  }

  /**
   * Handles click on content switcher button set.
   * If the click is on a content switcher button, activates it.
   * @param {Event} event The event triggering this method.
   */


  createClass(ContentSwitcher, [{
    key: '_handleClick',
    value: function _handleClick(event) {
      var button = eventMatches(event, this.options.selectorButton);

      if (button) {
        this.changeState({
          group: 'selected',
          item: button,
          launchingEvent: event
        });
      }
    }

    /**
     * Internal method of {@linkcode ContentSwitcher#setActive .setActive()}, to select a content switcher button.
     * @private
     * @param {Object} detail The detail of the event trigging this action.
     * @param {HTMLElement} detail.item The button to be selected.
     * @param {Function} callback Callback called when change in state completes.
     */

  }, {
    key: '_changeState',
    value: function _changeState(detail, callback) {
      var _this2 = this;

      var item = detail.item;
      // `options.selectorLink` is not defined in this class itself, code here primary is for inherited classes
      var itemLink = item.querySelector(this.options.selectorLink);
      if (itemLink) {
        [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorLink))).forEach(function (link) {
          if (link !== itemLink) {
            link.setAttribute('aria-selected', 'false');
          }
        });
        itemLink.setAttribute('aria-selected', 'true');
      }

      var selectorButtons = [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorButton)));

      selectorButtons.forEach(function (button) {
        if (button !== item) {
          button.setAttribute('aria-selected', false);
          button.classList.toggle(_this2.options.classActive, false);
          [].concat(toConsumableArray(button.ownerDocument.querySelectorAll(button.dataset.target))).forEach(function (element) {
            element.setAttribute('hidden', '');
            element.setAttribute('aria-hidden', 'true');
          });
        }
      });

      item.classList.toggle(this.options.classActive, true);
      item.setAttribute('aria-selected', true);
      [].concat(toConsumableArray(item.ownerDocument.querySelectorAll(item.dataset.target))).forEach(function (element) {
        element.removeAttribute('hidden');
        element.setAttribute('aria-hidden', 'false');
      });

      if (callback) {
        callback();
      }
    }

    /**
     * Selects a content switcher button.
     * If the selected button has `data-target` attribute, DOM elements it points to as a CSS selector will be shown.
     * DOM elements associated with unselected buttons in the same way will be hidden.
     * @param {HTMLElement} item The button to be selected.
     * @param {ChangeState~callback} callback The callback is called once selection is finished
     * or is canceled. Will only invoke callback if it's passed in.
     */

  }, {
    key: 'setActive',
    value: function setActive(item, callback) {
      this.changeState({
        group: 'selected',
        item: item
      }, function (error) {
        if (error) {
          if (callback) {
            callback(Object.assign(error, { item: item }));
          }
        } else if (callback) {
          callback(null, item);
        }
      });
    }

    /**
     * The map associating DOM element and content switcher set instance.
     * @member ContentSwitcher.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor,
     * {@linkcode ContentSwitcher.create .create()}, or {@linkcode ContentSwitcher.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode ContentSwitcher.init .init()} works.
     * @member ContentSwitcher.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find content switcher button set.
     * @property {string} [selectorButton] The CSS selector to find switcher buttons.
     * @property {string} [selectorButtonSelected] The CSS selector to find the selected switcher button.
     * @property {string} [classActive] The CSS class for switcher button's selected state.
     * @property {string} [eventBeforeSelected]
     *   The name of the custom event fired before a switcher button is selected.
     *   Cancellation of this event stops selection of content switcher button.
     * @property {string} [eventAfterSelected] The name of the custom event fired after a switcher button is selected.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-content-switcher]',
        selectorButton: 'input[type="radio"], .' + prefix + '--content-switcher-btn',
        classActive: prefix + '--content-switcher--selected',
        eventBeforeSelected: 'content-switcher-beingselected',
        eventAfterSelected: 'content-switcher-selected'
      };
    }
  }]);
  return ContentSwitcher;
}(mixin(createComponent, initComponentBySearch, eventedState, handles));

ContentSwitcher.components = new WeakMap();

var Tab = function (_ContentSwitcher) {
  inherits(Tab, _ContentSwitcher);

  /**
   * Container of tabs.
   * @extends ContentSwitcher
   * @param {HTMLElement} element The element working as a container of tabs.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
   * @param {string} [options.selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
   * @param {string} [options.selectorTriggerText]
   *   The CSS selector to find the element used in narrow mode showing the selected tab item.
   * @param {string} [options.selectorButton] The CSS selector to find tab containers.
   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected tab.
   * @param {string} [options.selectorLink] The CSS selector to find the links in tabs.
   * @param {string} [options.classActive] The CSS class for tab's selected state.
   * @param {string} [options.classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a tab is selected.
   *   Cancellation of this event stops selection of tab.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a tab is selected.
   */
  function Tab(element, options) {
    classCallCheck(this, Tab);

    var _this = possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, element, options));

    _this.manage(on(_this.element, 'keydown', function (event) {
      _this._handleKeyDown(event);
    }));

    var selected = _this.element.querySelector(_this.options.selectorButtonSelected);
    if (selected) {
      _this._updateTriggerText(selected);
    }
    return _this;
  }

  /**
   * Internal method of {@linkcode Tab#setActive .setActive()}, to select a tab item.
   * @private
   * @param {Object} detail The detail of the event trigging this action.
   * @param {HTMLElement} detail.item The tab item to be selected.
   * @param {Function} callback Callback called when change in state completes.
   */


  createClass(Tab, [{
    key: '_changeState',
    value: function _changeState(detail, callback) {
      var _this2 = this;

      get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), '_changeState', this).call(this, detail, function (error) {
        for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          data[_key - 1] = arguments[_key];
        }

        if (!error) {
          _this2._updateTriggerText(detail.item);
        }
        callback.apply(undefined, [error].concat(data));
      });
    }

    /**
     * Handles click on tab container.
     * * If the click is on a tab, activates it.
     * * If the click is on the button to open the drop down menu, does so.
     * @param {Event} event The event triggering this method.
     */

  }, {
    key: '_handleClick',
    value: function _handleClick(event) {
      var button = eventMatches(event, this.options.selectorButton);
      var trigger = eventMatches(event, this.options.selectorTrigger);
      if (button) {
        get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), '_handleClick', this).call(this, event);
        this._updateMenuState(false);
      }
      if (trigger) {
        this._updateMenuState();
      }
    }

    /**
     * Handles arrow keys on tab container.
     * * Left keys are used to go to previous tab.
     * * Right keys are used to go to next tab.
     * @param {Event} event The event triggering this method.
     */

  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(event) {
      var _this3 = this;

      var triggerNode = eventMatches(event, this.options.selectorTrigger);
      if (triggerNode) {
        if (event.which === 13) {
          this._updateMenuState();
        }
        return;
      }

      var direction = {
        37: this.constructor.NAVIGATE.BACKWARD,
        39: this.constructor.NAVIGATE.FORWARD
      }[event.which];

      if (direction) {
        var buttons = [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorButton)));
        var button = this.element.querySelector(this.options.selectorButtonSelected);
        var nextIndex = Math.max(buttons.indexOf(button) + direction, -1 /* For `button` not found in `buttons` */);
        var nextIndexLooped = nextIndex >= 0 && nextIndex < buttons.length ? nextIndex : nextIndex - Math.sign(nextIndex) * buttons.length;
        this.setActive(buttons[nextIndexLooped], function (error, item) {
          if (item) {
            var link = item.querySelector(_this3.options.selectorLink);
            if (link) {
              link.focus();
            }
          }
        });
        event.preventDefault();
      }
    }

    /**
     * Shows/hides the drop down menu used in narrow mode.
     * @param {boolean} [force] `true` to show the menu, `false` to hide the menu, otherwise toggles the menu.
     */

  }, {
    key: '_updateMenuState',
    value: function _updateMenuState(force) {
      var menu = this.element.querySelector(this.options.selectorMenu);
      if (menu) {
        menu.classList.toggle(this.options.classHidden, typeof force === 'undefined' ? force : !force);
      }
    }

    /**
     * Updates the text indicating the currently selected tab item.
     * @param {HTMLElement} target The newly selected tab item.
     */

  }, {
    key: '_updateTriggerText',
    value: function _updateTriggerText(target) {
      var triggerText = this.element.querySelector(this.options.selectorTriggerText);
      if (triggerText) {
        triggerText.textContent = target.textContent;
      }
    }

    /**
     * The map associating DOM element and tab container instance.
     * @member Tab.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode ContentSwitcher.create .create()}, or {@linkcode Tab.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode Tab.init .init()} works.
     * @member Tab.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find tab containers.
     * @property {string} [selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
     * @property {string} [selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
     * @property {string} [selectorTriggerText]
     *   The CSS selector to find the element used in narrow mode showing the selected tab item.
     * @property {string} [selectorButton] The CSS selector to find tab containers.
     * @property {string} [selectorButtonSelected] The CSS selector to find the selected tab.
     * @property {string} [selectorLink] The CSS selector to find the links in tabs.
     * @property {string} [classActive] The CSS class for tab's selected state.
     * @property {string} [classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
     * @property {string} [eventBeforeSelected]
     *   The name of the custom event fired before a tab is selected.
     *   Cancellation of this event stops selection of tab.
     * @property {string} [eventAfterSelected] The name of the custom event fired after a tab is selected.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return Object.assign(Object.create(ContentSwitcher.options), {
        selectorInit: '[data-tabs]',
        selectorMenu: '.' + prefix + '--tabs__nav',
        selectorTrigger: '.' + prefix + '--tabs-trigger',
        selectorTriggerText: '.' + prefix + '--tabs-trigger-text',
        selectorButton: '.' + prefix + '--tabs__nav-item',
        selectorButtonSelected: '.' + prefix + '--tabs__nav-item--selected',
        selectorLink: '.' + prefix + '--tabs__nav-link',
        classActive: prefix + '--tabs__nav-item--selected',
        classHidden: prefix + '--tabs__nav--hidden',
        eventBeforeSelected: 'tab-beingselected',
        eventAfterSelected: 'tab-selected'
      });
    }

    /**
     * Enum for navigating backward/forward.
     * @readonly
     * @member Tab.NAVIGATE
     * @type {Object}
     * @property {number} BACKWARD Navigating backward.
     * @property {number} FORWARD Navigating forward.
     */

  }]);
  return Tab;
}(ContentSwitcher);

Tab.components = new WeakMap();
Tab.NAVIGATE = {
  BACKWARD: -1,
  FORWARD: 1
};

function getLaunchingDetails(evt) {
  if (!evt || typeof evt === 'function') {
    return {
      launchingElement: null,
      launchingEvent: null
    };
  }

  var launchingElement = evt.delegateTarget || evt.currentTarget || evt;
  var launchingEvent = evt.currentTarget && evt;

  if (launchingElement && !launchingElement.nodeType) {
    throw new TypeError('DOM Node should be given for launching element.');
  }

  if (launchingEvent && !launchingEvent.type) {
    throw new TypeError('DOM event should be given for launching event.');
  }

  return {
    launchingElement: launchingElement,
    launchingEvent: launchingEvent
  };
}

function eventedShowHideState(ToMix) {
  /**
   * Mix-in class to launch a floating menu.
   * @class EventedShowHideState
   */
  var EventedShowHideState = function (_ToMix) {
    inherits(EventedShowHideState, _ToMix);

    function EventedShowHideState() {
      classCallCheck(this, EventedShowHideState);
      return possibleConstructorReturn(this, (EventedShowHideState.__proto__ || Object.getPrototypeOf(EventedShowHideState)).apply(this, arguments));
    }

    createClass(EventedShowHideState, [{
      key: 'show',

      /**
       */
      /**
       * Switch to 'shown' state.
       * @param [evtOrElem] The launching event or element.
       * @param {EventedState~changeStateCallback} [callback] The callback.
       */
      value: function show(evtOrElem, callback) {
        if (!evtOrElem || typeof evtOrElem === 'function') {
          callback = evtOrElem; // eslint-disable-line no-param-reassign
        }
        this.changeState('shown', getLaunchingDetails(evtOrElem), callback);
      }

      /**
       * Switch to 'hidden' state.
       * @param [evtOrElem] The launching event or element.
       * @param {EventedState~changeStateCallback} [callback] The callback.
       */

    }, {
      key: 'hide',
      value: function hide(evtOrElem, callback) {
        if (!evtOrElem || typeof evtOrElem === 'function') {
          callback = evtOrElem; // eslint-disable-line no-param-reassign
        }
        this.changeState('hidden', getLaunchingDetails(evtOrElem), callback);
      }
    }]);
    return EventedShowHideState;
  }(ToMix);

  return EventedShowHideState;
}

var exports$1 = [eventedState, eventedShowHideState];

function trackBlur(ToMix) {
  var TrackBlur = function (_ToMix) {
    inherits(TrackBlur, _ToMix);

    /**
     * Mix-in class to add an handler for losing focus.
     * @extends Handles
     * @param {HTMLElement} element The element working as this component.
     * @param {Object} [options] The component options.
     */
    function TrackBlur(element, options) {
      classCallCheck(this, TrackBlur);

      var _this = possibleConstructorReturn(this, (TrackBlur.__proto__ || Object.getPrototypeOf(TrackBlur)).call(this, element, options));

      var hasFocusin = 'onfocusin' in window;
      var focusinEventName = hasFocusin ? 'focusin' : 'focus';
      _this.manage(on(_this.element.ownerDocument, focusinEventName, function (event) {
        if (!_this.element.contains(event.target)) {
          _this.handleBlur(event);
        }
      }, !hasFocusin));
      return _this;
    }

    /**
     * The method called when this component loses focus.
     * @abstract
     */


    createClass(TrackBlur, [{
      key: 'handleBlur',
      value: function handleBlur() {
        throw new Error('Components inheriting TrackBlur mix-in must implement handleBlur() method.');
      }
    }]);
    return TrackBlur;
  }(ToMix);

  return TrackBlur;
}

var exports$2 = [handles, trackBlur];

// mdn resize function

var optimizedResize = function optimizedResize() {
  var callbacks = [];
  var running = false;

  // run the actual callbacks
  function runCallbacks() {
    callbacks.forEach(function (callback) {
      callback();
    });

    running = false;
  }

  // fired on resize event
  function resize() {
    if (!running) {
      running = true;
      window.requestAnimationFrame(runCallbacks);
    }
  }

  // adds callback to loop
  function addCallback(callback) {
    if (callback) {
      var index = callbacks.indexOf(callback);
      if (index < 0) {
        callbacks.push(callback);
      }
    }
  }

  return {
    // public method to add additional callback
    add: function add(callback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
      return {
        release: function release() {
          var index = callbacks.indexOf(callback);
          if (index >= 0) {
            callbacks.splice(index, 1);
          }
        }
      };
    }
  };
}();

/**
 * The structure for the position of floating menu.
 * @typedef {Object} FloatingMenu~position
 * @property {number} left The left position.
 * @property {number} top The top position.
 * @property {number} right The right position.
 * @property {number} bottom The bottom position.
 */

/**
 * The structure for the size of floating menu.
 * @typedef {Object} FloatingMenu~size
 * @property {number} width The width.
 * @property {number} height The height.
 */

/**
 * The structure for the position offset of floating menu.
 * @typedef {Object} FloatingMenu~offset
 * @property {number} top The top position.
 * @property {number} left The left position.
 */

var DIRECTION_LEFT = 'left';
var DIRECTION_TOP = 'top';
var DIRECTION_RIGHT = 'right';
var DIRECTION_BOTTOM = 'bottom';

/**
 * @param {Object} params The parameters.
 * @param {FloatingMenu~size} params.menuSize The size of the menu.
 * @param {FloatingMenu~position} params.refPosition The position of the triggering element.
 * @param {FloatingMenu~offset} [params.offset={ left: 0, top: 0 }] The position offset of the menu.
 * @param {string} [params.direction=bottom] The menu direction.
 * @param {number} [params.scrollX=0] The scroll position of the viewport.
 * @param {number} [params.scrollY=0] The scroll position of the viewport.
 * @returns {FloatingMenu~offset} The position of the menu, relative to the top-left corner of the viewport.
 * @private
 */
var getFloatingPosition = function getFloatingPosition(_ref) {
  var _DIRECTION_LEFT$DIREC;

  var menuSize = _ref.menuSize,
      refPosition = _ref.refPosition,
      _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? {} : _ref$offset,
      _ref$direction = _ref.direction,
      direction = _ref$direction === undefined ? DIRECTION_BOTTOM : _ref$direction,
      _ref$scrollX = _ref.scrollX,
      scrollX = _ref$scrollX === undefined ? 0 : _ref$scrollX,
      _ref$scrollY = _ref.scrollY,
      scrollY = _ref$scrollY === undefined ? 0 : _ref$scrollY;
  var _refPosition$left = refPosition.left,
      refLeft = _refPosition$left === undefined ? 0 : _refPosition$left,
      _refPosition$top = refPosition.top,
      refTop = _refPosition$top === undefined ? 0 : _refPosition$top,
      _refPosition$right = refPosition.right,
      refRight = _refPosition$right === undefined ? 0 : _refPosition$right,
      _refPosition$bottom = refPosition.bottom,
      refBottom = _refPosition$bottom === undefined ? 0 : _refPosition$bottom;
  var width = menuSize.width,
      height = menuSize.height;
  var _offset$top = offset.top,
      top = _offset$top === undefined ? 0 : _offset$top,
      _offset$left = offset.left,
      left = _offset$left === undefined ? 0 : _offset$left;

  var refCenterHorizontal = (refLeft + refRight) / 2;
  var refCenterVertical = (refTop + refBottom) / 2;

  return (_DIRECTION_LEFT$DIREC = {}, defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_LEFT, {
    left: refLeft - width + scrollX - left,
    top: refCenterVertical - height / 2 + scrollY + top
  }), defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_TOP, {
    left: refCenterHorizontal - width / 2 + scrollX + left,
    top: refTop - height + scrollY - top
  }), defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_RIGHT, {
    left: refRight + scrollX + left,
    top: refCenterVertical - height / 2 + scrollY + top
  }), defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_BOTTOM, {
    left: refCenterHorizontal - width / 2 + scrollX + left,
    top: refBottom + scrollY + top
  }), _DIRECTION_LEFT$DIREC)[direction];
};

var FloatingMenu = function (_mixin) {
  inherits(FloatingMenu, _mixin);

  /**
   * Floating menu.
   * @extends CreateComponent
   * @extends EventedShowHideState
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorContainer] The CSS selector to find the container to put this menu in.
   * @param {string} [options.attribDirection] The attribute name to specify menu placement direction (top/right/bottom/left).
   * @param {string} [options.classShown] The CSS class for shown state, for the menu.
   * @param {string} [options.classRefShown] The CSS class for shown state, for the trigger button.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this menu is shown.
   *   Cancellation of this event stops hiding the menu.
   * @param {string} [options.eventAfterShown]
   *   The name of the custom event telling that menu is sure shown
   *   without being canceled by the event handler named by `eventBeforeShown` option (`floating-menu-beingshown`).
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this menu is hidden.
   *   Cancellation of this event stops hiding the menu.
   * @param {string} [options.eventAfterHidden]
   *   The name of the custom event telling that menu is sure hidden
   *   without being canceled by the event handler named by `eventBeforeHidden` option (`floating-menu-beinghidden`).
   * @param {Element} [options.refNode] The launching element of the menu. Used for calculating the geometry of the menu.
   * @param {Object} [options.offset] The offset to adjust the geometry of the menu. Should have `top`/`left` properties.
   */
  function FloatingMenu(element, options) {
    classCallCheck(this, FloatingMenu);

    var _this = possibleConstructorReturn(this, (FloatingMenu.__proto__ || Object.getPrototypeOf(FloatingMenu)).call(this, element, options));

    var attribDirectionValue = _this.element.getAttribute(_this.options.attribDirection);
    if (!_this.options.direction) {
      _this.options.direction = attribDirectionValue || 'bottom';
    }
    if (!attribDirectionValue) {
      // Update attribute for styling
      _this.element.setAttribute(_this.options.attribDirection, _this.options.direction);
    }
    return _this;
  }

  /**
   * Focuses back on the trigger button if this component loses focus.
   */


  createClass(FloatingMenu, [{
    key: 'handleBlur',
    value: function handleBlur(event) {
      if (this.element.classList.contains(this.options.classShown)) {
        this.changeState('hidden', getLaunchingDetails(event));
        var refNode = this.options.refNode;

        if (this.element.contains(event.relatedTarget) && refNode && event.target !== refNode) {
          HTMLElement.prototype.focus.call(refNode); // SVGElement in IE11 does not have `.focus()` method
        }
      }
    }

    /**
     * @private
     * @returns {Element} The element that this menu should be placed to.
     */

  }, {
    key: '_getContainer',
    value: function _getContainer() {
      return this.element.closest(this.options.selectorContainer) || this.element.ownerDocument.body;
    }

    /**
     * @private
     * @returns {Object} The menu position, with `top` and `left` properties.
     */

  }, {
    key: '_getPos',
    value: function _getPos() {
      var element = this.element;
      var _options = this.options,
          refNode = _options.refNode,
          offset = _options.offset,
          direction = _options.direction;


      if (!refNode) {
        throw new Error('Cannot find the refernce node for positioning floating menu.');
      }

      return getFloatingPosition({
        menuSize: element.getBoundingClientRect(),
        refPosition: refNode.getBoundingClientRect(),
        offset: typeof offset !== 'function' ? offset : offset(element, direction),
        direction: direction,
        scrollX: refNode.ownerDocument.defaultView.pageXOffset,
        scrollY: refNode.ownerDocument.defaultView.pageYOffset
      });
    }

    /**
     * Sees if the computed style is what this floating menu expects.
     * @private
     */

  }, {
    key: '_testStyles',
    value: function _testStyles() {
      if (!this.options.debugStyle) {
        return;
      }
      var element = this.element;
      var computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
      var styles = {
        position: 'absolute',
        right: 'auto',
        margin: 0
      };
      Object.keys(styles).forEach(function (key) {
        var expected = typeof styles[key] === 'number' ? parseFloat(styles[key]) : styles[key];
        var actual = computedStyle.getPropertyValue(key);
        if (expected !== actual) {
          // eslint-disable-next-line no-console
          console.warn('Floating menu component expects ' + key + ': ' + styles[key] + ' style.');
        }
      });
    }

    /**
     * Places the menu.
     * @private
     */

  }, {
    key: '_place',
    value: function _place() {
      var element = this.element;

      var _getPos2 = this._getPos(),
          left = _getPos2.left,
          top = _getPos2.top;

      element.style.left = left + 'px';
      element.style.top = top + 'px';
      this._testStyles();
    }

    /**
     * @param {string} state The new state.
     * @returns {boolean} `true` of the current state is different from the given new state.
     */

  }, {
    key: 'shouldStateBeChanged',
    value: function shouldStateBeChanged(state) {
      return (state === 'shown' || state === 'hidden') && state !== (this.element.classList.contains(this.options.classShown) ? 'shown' : 'hidden');
    }

    /**
     * Changes the shown/hidden state.
     * @private
     * @param {string} state The new state.
     * @param {Object} detail The detail of the event trigging this action.
     * @param {Function} callback Callback called when change in state completes.
     */

  }, {
    key: '_changeState',
    value: function _changeState(state, detail, callback) {
      var _this2 = this;

      var shown = state === 'shown';
      var _options2 = this.options,
          refNode = _options2.refNode,
          classShown = _options2.classShown,
          classRefShown = _options2.classRefShown;

      if (!refNode) {
        throw new TypeError('Cannot find the refernce node for changing the style.');
      }
      this.element.classList.toggle(classShown, shown);
      if (classRefShown) {
        refNode.classList.toggle(classRefShown, shown);
      }
      if (state === 'shown') {
        if (!this.hResize) {
          this.hResize = optimizedResize.add(function () {
            _this2._place();
          });
        }
        this._getContainer().appendChild(this.element);
        this._place();
        // IE11 puts focus on elements with `.focus()`, even ones without `tabindex` attribute
        if (!this.element.hasAttribute(this.options.attribAvoidFocusOnOpen)) {
          (this.element.querySelector(this.options.selectorPrimaryFocus) || this.element).focus();
        }
      }
      if (state === 'hidden' && this.hResize) {
        this.hResize.release();
        this.hResize = null;
      }
      callback();
    }
  }, {
    key: 'release',
    value: function release() {
      if (this.hResize) {
        this.hResize.release();
        this.hResize = null;
      }
      get(FloatingMenu.prototype.__proto__ || Object.getPrototypeOf(FloatingMenu.prototype), 'release', this).call(this);
    }
  }]);
  return FloatingMenu;
}(mixin(createComponent, exports$1, exports$2));

FloatingMenu.options = {
  selectorContainer: '[data-floating-menu-container]',
  selectorPrimaryFocus: '[data-floating-menu-primary-focus]',
  attribDirection: 'data-floating-menu-direction',
  attribAvoidFocusOnOpen: 'data-avoid-focus-on-open',
  classShown: '', // Should be provided from options arg in constructor
  classRefShown: '', // Should be provided from options arg in constructor
  eventBeforeShown: 'floating-menu-beingshown',
  eventAfterShown: 'floating-menu-shown',
  eventBeforeHidden: 'floating-menu-beinghidden',
  eventAfterHidden: 'floating-menu-hidden',
  refNode: null, // Should be provided from options arg in constructor
  offset: {
    left: 0,
    top: 0
  }
};
FloatingMenu.components = new WeakMap();

var _triggerButtonPositio;
var _triggerButtonPositio2;

/**
 * The CSS property names of the arrow keyed by the floating menu direction.
 * @type {Object<string, string>}
 */
var triggerButtonPositionProps = (_triggerButtonPositio = {}, defineProperty(_triggerButtonPositio, DIRECTION_TOP, 'bottom'), defineProperty(_triggerButtonPositio, DIRECTION_BOTTOM, 'top'), _triggerButtonPositio);

/**
 * Determines how the position of arrow should affect the floating menu position.
 * @type {Object<string, number>}
 */
var triggerButtonPositionFactors = (_triggerButtonPositio2 = {}, defineProperty(_triggerButtonPositio2, DIRECTION_TOP, -2), defineProperty(_triggerButtonPositio2, DIRECTION_BOTTOM, -1), _triggerButtonPositio2);

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @param {string} direction The floating menu direction.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
var getMenuOffset = function getMenuOffset(menuBody, direction) {
  var triggerButtonPositionProp = triggerButtonPositionProps[direction];
  var triggerButtonPositionFactor = triggerButtonPositionFactors[direction];
  if (!triggerButtonPositionProp || !triggerButtonPositionFactor) {
    console.warn('Wrong floating menu direction:', direction); // eslint-disable-line no-console
  }
  var menuWidth = menuBody.offsetWidth;
  var arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(menuBody, ':before');
  var values = [triggerButtonPositionProp, 'left', 'width', 'height', 'border-top-width'].reduce(function (o, name) {
    return _extends({}, o, defineProperty({}, name, Number((/^([\d-.]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1])));
  }, {});
  if (Object.keys(values).every(function (name) {
    return !isNaN(values[name]);
  })) {
    var left = values.left,
        width = values.width,
        height = values.height,
        borderTopWidth = values['border-top-width'];

    return {
      left: menuWidth / 2 - (left + Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2),
      top: Math.sqrt(Math.pow(borderTopWidth, 2) * 2) + triggerButtonPositionFactor * values[triggerButtonPositionProp]
    };
  }
  return undefined;
};

var OverflowMenu = function (_mixin) {
  inherits(OverflowMenu, _mixin);

  /**
   * Overflow menu.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorOptionMenu] The CSS selector to find the menu.
   * @param {string} [options.classShown] The CSS class for the shown state, for the trigger UI.
   * @param {string} [options.classMenuShown] The CSS class for the shown state, for the menu.
   * @param {string} [options.classMenuFlip] The CSS class for the flipped state of the menu.
   * @param {Object} [options.objMenuOffset] The offset locating the menu for the non-flipped state.
   * @param {Object} [options.objMenuOffsetFlip] The offset locating the menu for the flipped state.
   */
  function OverflowMenu(element, options) {
    classCallCheck(this, OverflowMenu);

    var _this = possibleConstructorReturn(this, (OverflowMenu.__proto__ || Object.getPrototypeOf(OverflowMenu)).call(this, element, options));

    _this.manage(on(_this.element.ownerDocument, 'click', function (event) {
      _this._handleDocumentClick(event);
      _this.wasOpenBeforeClick = undefined;
    }));
    _this.manage(on(_this.element.ownerDocument, 'keypress', function (event) {
      _this._handleKeyPress(event);
    }));
    _this.manage(on(_this.element, 'mousedown', function () {
      _this.wasOpenBeforeClick = element.classList.contains(_this.options.classShown);
    }));
    return _this;
  }

  /**
   * Changes the shown/hidden state.
   * @param {string} state The new state.
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */


  createClass(OverflowMenu, [{
    key: 'changeState',
    value: function changeState(state, detail, callback) {
      if (!this.optionMenu) {
        var optionMenu = this.element.querySelector(this.options.selectorOptionMenu);
        if (!optionMenu) {
          throw new Error('Cannot find the target menu.');
        }

        // Lazily create a component instance for menu
        this.optionMenu = FloatingMenu.create(optionMenu, {
          refNode: this.element,
          classShown: this.options.classMenuShown,
          classRefShown: this.options.classShown,
          offset: this.options.objMenuOffset
        });
        this.children.push(this.optionMenu);
      }
      if (this.optionMenu.element.classList.contains(this.options.classMenuFlip)) {
        this.optionMenu.options.offset = this.options.objMenuOffsetFlip;
      }

      // Delegates the action of changing state to the menu.
      // (And thus the before/after shown/hidden events are fired from the menu)
      this.optionMenu.changeState(state, Object.assign(detail, { delegatorNode: this.element }), callback);
    }

    /**
     * Handles click on document.
     * @param {Event} event The triggering event.
     * @private
     */

  }, {
    key: '_handleDocumentClick',
    value: function _handleDocumentClick(event) {
      var element = this.element,
          optionMenu = this.optionMenu,
          wasOpenBeforeClick = this.wasOpenBeforeClick;

      var isOfSelf = element.contains(event.target);
      var isOfMenu = optionMenu && optionMenu.element.contains(event.target);
      var shouldBeOpen = isOfSelf && !wasOpenBeforeClick;
      var state = shouldBeOpen ? 'shown' : 'hidden';

      if (isOfSelf) {
        if (element.tagName === 'A') {
          event.preventDefault();
        }
        event.delegateTarget = element; // eslint-disable-line no-param-reassign
      }

      this.changeState(state, getLaunchingDetails(event), function () {
        if (state === 'hidden' && isOfMenu) {
          element.focus();
        }
      });
    }

    /**
     * Handles key press on document.
     * @param {Event} event The triggering event.
     * @private
     */

  }, {
    key: '_handleKeyPress',
    value: function _handleKeyPress(event) {
      var key = event.which;
      if (key === 13) {
        var element = this.element,
            optionMenu = this.optionMenu,
            options = this.options;

        var isOfSelf = element.contains(event.target);
        var isOfMenu = optionMenu && optionMenu.element.contains(event.target);
        var shouldBeOpen = isOfSelf && !element.classList.contains(options.classShown);
        var state = shouldBeOpen ? 'shown' : 'hidden';

        if (isOfSelf) {
          if (element.tagName === 'A') {
            event.preventDefault();
          }
          event.delegateTarget = element; // eslint-disable-line no-param-reassign
        }

        this.changeState(state, getLaunchingDetails(event), function () {
          if (state === 'hidden' && isOfMenu) {
            element.focus();
          }
        });
      }
    }
  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-overflow-menu]',
        selectorOptionMenu: '.' + prefix + '--overflow-menu-options',
        classShown: prefix + '--overflow-menu--open',
        classMenuShown: prefix + '--overflow-menu-options--open',
        classMenuFlip: prefix + '--overflow-menu--flip',
        objMenuOffset: getMenuOffset,
        objMenuOffsetFlip: getMenuOffset
      };
    }
  }]);
  return OverflowMenu;
}(mixin(createComponent, initComponentBySearch, exports$1, handles));

OverflowMenu.components = new WeakMap();

var initComponentByLauncher = function (ToMix) {
  /**
   * Mix-in class to instantiate components events on launcher button.
   * @class InitComponentByLauncher
   */
  var InitComponentByLauncher = function (_ToMix) {
    inherits(InitComponentByLauncher, _ToMix);

    function InitComponentByLauncher() {
      classCallCheck(this, InitComponentByLauncher);
      return possibleConstructorReturn(this, (InitComponentByLauncher.__proto__ || Object.getPrototypeOf(InitComponentByLauncher)).apply(this, arguments));
    }

    createClass(InitComponentByLauncher, null, [{
      key: 'init',


      /**
       * Instantiates this component in the given element.
       * If the given element indicates that it's an component of this class, instantiates it.
       * Otherwise, instantiates this component by clicking on launcher buttons
       * (buttons with attribute that `options.attribInitTarget` points to) of this component in the given node.
       * @param {Node} target The DOM node to instantiate this component in. Should be a document or an element.
       * @param {Object} [options] The component options.
       * @param {string} [options.selectorInit] The CSS selector to find this component.
       * @param {string} [options.attribInitTarget] The attribute name in the launcher buttons to find target component.
       * @returns {Handle} The handle to remove the event listener to handle clicking.
       */
      value: function init() {
        var _this2 = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = Object.assign(Object.create(this.options), options);
        if (!target || target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new TypeError('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target, options);
        } else {
          var handles = effectiveOptions.initEventNames.map(function (name) {
            return on(target, name, function (event) {
              var launcher = eventMatches(event, '[' + effectiveOptions.attribInitTarget + ']');

              if (launcher) {
                event.delegateTarget = launcher; // eslint-disable-line no-param-reassign
                var elements = [].concat(toConsumableArray(launcher.ownerDocument.querySelectorAll(launcher.getAttribute(effectiveOptions.attribInitTarget))));
                if (elements.length > 1) {
                  throw new Error('Target widget must be unique.');
                }

                if (elements.length === 1) {
                  if (launcher.tagName === 'A') {
                    event.preventDefault();
                  }

                  var component = _this2.create(elements[0], options);
                  if (typeof component.createdByLauncher === 'function') {
                    component.createdByLauncher(event);
                  }
                }
              }
            });
          });
          return {
            release: function release() {
              for (var handle = handles.pop(); handle; handle = handles.pop()) {
                handle.release();
              }
            }
          };
        }
        return '';
      }
      /**
       * `true` suggests that this component is lazily initialized upon an action/event, etc.
       * @type {boolean}
       */

    }]);
    return InitComponentByLauncher;
  }(ToMix);

  InitComponentByLauncher.forLazyInit = true;

  return InitComponentByLauncher;
};

var Modal = function (_mixin) {
  inherits(Modal, _mixin);

  /**
   * Modal dialog.
   * @extends CreateComponent
   * @extends InitComponentByLauncher
   * @extends EventedShowHideState
   * @extends Handles
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {Object} [options] The component options.
   * @param {string} [options.classVisible] The CSS class for the visible state.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this modal is shown.
   *   Cancellation of this event stops showing the modal.
   * @param {string} [options.eventAfterShown]
   *   The name of the custom event telling that modal is sure shown
   *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this modal is hidden.
   *   Cancellation of this event stops hiding the modal.
   * @param {string} [options.eventAfterHidden]
   *   The name of the custom event telling that modal is sure hidden
   *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
   */
  function Modal(element, options) {
    classCallCheck(this, Modal);

    var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, element, options));

    _this._handleFocusin = function (evt) {
      if (_this.element.classList.contains(_this.options.classVisible) && !_this.element.contains(evt.target) && _this.options.selectorsFloatingMenus.every(function (selector) {
        return !eventMatches(evt, selector);
      })) {
        _this.element.focus();
      }
    };

    _this._hookCloseActions();
    return _this;
  }

  /**
   * The handle for `focusin` event listener.
   * Used for "focus-wrap" feature.
   * @type {Handle}
   * @private
   */


  /**
   * The handle for `keydown` event listener.
   * Used for "close-on-escape-key" feature.
   * @type {Handle}
   * @private
   */


  createClass(Modal, [{
    key: 'createdByLauncher',


    /**
     * A method that runs when `.init()` is called from `initComponentByLauncher`.
     * @param {Event} evt The event fired on the launcher button.
     */
    value: function createdByLauncher(evt) {
      this.show(evt);
    }

    /**
     * Determines whether or not to emit events and callback function when `.changeState()` is called from `eventedState`.
     * @param {string} state The new state.
     * @returns {boolean} `true` if the given `state` is different from current state.
     */

  }, {
    key: 'shouldStateBeChanged',
    value: function shouldStateBeChanged(state) {
      if (state === 'shown') {
        return !this.element.classList.contains(this.options.classVisible);
      }

      return this.element.classList.contains(this.options.classVisible);
    }

    /**
     * Changes the shown/hidden state.
     * @private
     * @param {string} state The new state.
     * @param {Object} detail The detail data to be included in the event that will be fired.
     * @param {Function} callback Callback called when change in state completes.
     */

  }, {
    key: '_changeState',
    value: function _changeState(state, detail, callback) {
      var _this2 = this;

      var handleTransitionEnd = void 0;
      var transitionEnd = function transitionEnd() {
        if (handleTransitionEnd) {
          handleTransitionEnd = _this2.unmanage(handleTransitionEnd).release();
        }
        if (state === 'shown' && _this2.element.offsetWidth > 0 && _this2.element.offsetHeight > 0) {
          (_this2.element.querySelector(_this2.options.selectorPrimaryFocus) || _this2.element).focus();
        }
        callback();
      };

      if (this._handleFocusinListener) {
        this._handleFocusinListener = this.unmanage(this._handleFocusinListener).release();
      }

      if (state === 'shown') {
        var hasFocusin = 'onfocusin' in this.element.ownerDocument.defaultView;
        var focusinEventName = hasFocusin ? 'focusin' : 'focus';
        this._handleFocusinListener = this.manage(on(this.element.ownerDocument, focusinEventName, this._handleFocusin, !hasFocusin));
      }

      if (state === 'hidden') {
        this.element.classList.toggle(this.options.classVisible, false);
      } else if (state === 'shown') {
        this.element.classList.toggle(this.options.classVisible, true);
      }
      handleTransitionEnd = this.manage(on(this.element, 'transitionend', transitionEnd));
    }
  }, {
    key: '_hookCloseActions',
    value: function _hookCloseActions() {
      var _this3 = this;

      this.manage(on(this.element, 'click', function (evt) {
        var closeButton = eventMatches(evt, _this3.options.selectorModalClose);
        if (closeButton) {
          evt.delegateTarget = closeButton; // eslint-disable-line no-param-reassign
        }
        if (closeButton || evt.target === _this3.element) {
          _this3.hide(evt);
        }
      }));

      if (this._handleKeydownListener) {
        this._handleKeydownListener = this.unmanage(this._handleKeydownListener).release();
      }

      this._handleKeydownListener = this.manage(on(this.element.ownerDocument.body, 'keydown', function (evt) {
        if (evt.which === 27) {
          _this3.hide(evt);
        }
      }));
    }

    /**
     * Handles `focusin` (or `focus` depending on browser support of `focusin`) event to do wrap-focus behavior.
     * @param {Event} evt The event.
     * @private
     */


    /**
     * The map associating DOM element and modal instance.
     * @member Modal.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode Modal.create .create()}, or {@linkcode Modal.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode Modal.init .init()} works.
     * @member Modal.options
     * @type {Object}
     * @property {string} selectorInit The CSS class to find modal dialogs.
     * @property {string} attribInitTarget The attribute name in the launcher buttons to find target modal dialogs.
     * @property {string[]} [selectorsFloatingMenu]
     *   The CSS selectors of floating menus.
     *   Used for detecting if focus-wrap behavior should be disabled temporarily.
     * @property {string} [classVisible] The CSS class for the visible state.
     * @property {string} [classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
     * @property {string} [eventBeforeShown]
     *   The name of the custom event fired before this modal is shown.
     *   Cancellation of this event stops showing the modal.
     * @property {string} [eventAfterShown]
     *   The name of the custom event telling that modal is sure shown
     *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
     * @property {string} [eventBeforeHidden]
     *   The name of the custom event fired before this modal is hidden.
     *   Cancellation of this event stops hiding the modal.
     * @property {string} [eventAfterHidden]
     *   The name of the custom event telling that modal is sure hidden
     *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-modal]',
        selectorModalClose: '[data-modal-close]',
        selectorPrimaryFocus: '[data-modal-primary-focus]',
        selectorsFloatingMenus: ['.' + prefix + '--overflow-menu-options', '.' + prefix + '--tooltip', '.flatpickr-calendar'],
        classVisible: 'is-visible',
        attribInitTarget: 'data-modal-target',
        initEventNames: ['click'],
        eventBeforeShown: 'modal-beingshown',
        eventAfterShown: 'modal-shown',
        eventBeforeHidden: 'modal-beinghidden',
        eventAfterHidden: 'modal-hidden'
      };
    }
  }]);
  return Modal;
}(mixin(createComponent, initComponentByLauncher, exports$1, handles));

Modal.components = new WeakMap();

var Loading = function (_mixin) {
  inherits(Loading, _mixin);

  /**
   * Spinner indicating loading state.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a spinner.
   * @param {Object} [options] The component options.
   * @param {boolean} [options.active] `true` if this spinner should roll.
   */
  function Loading(element, options) {
    classCallCheck(this, Loading);

    var _this = possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, element, options));

    _this.active = _this.options.active;

    // Initialize spinner
    _this.set(_this.active);
    return _this;
  }

  /**
   * Sets active/inactive state.
   * @param {boolean} active `true` if this spinner should roll.
   */


  createClass(Loading, [{
    key: 'set',
    value: function set$$1(active) {
      if (typeof active !== 'boolean') {
        throw new TypeError('set expects a boolean.');
      }

      this.active = active;
      this.element.classList.toggle(this.options.classLoadingStop, !this.active);

      /**
       * If overlay is the parentNode then toggle it too.
       */
      var parentNode = this.element.parentNode;

      if (parentNode && parentNode.classList.contains(this.options.classLoadingOverlay)) {
        parentNode.classList.toggle(this.options.classLoadingOverlayStop, !this.active);
      }

      return this;
    }

    /**
     * Toggles active/inactive state.
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      return this.set(!this.active);
    }

    /**
     * @returns {boolean} `true` if this spinner is rolling.
     */

  }, {
    key: 'isActive',
    value: function isActive() {
      return this.active;
    }

    /**
     * Sets state to inactive and deletes the loading element.
     */

  }, {
    key: 'end',
    value: function end() {
      var _this2 = this;

      this.set(false);
      var handleAnimationEnd = this.manage(on(this.element, 'animationend', function (evt) {
        if (handleAnimationEnd) {
          handleAnimationEnd = _this2.unmanage(handleAnimationEnd).release();
        }
        if (evt.animationName === 'rotate-end-p2') {
          _this2._deleteElement();
        }
      }));
    }

    /**
     * Delete component from the DOM.
     */

  }, {
    key: '_deleteElement',
    value: function _deleteElement() {
      var parentNode = this.element.parentNode;

      parentNode.removeChild(this.element);

      if (parentNode.classList.contains(this.options.selectorLoadingOverlay)) {
        parentNode.remove();
      }
    }

    /**
     * The map associating DOM element and spinner instance.
     * @member Loading.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode Loading.create .create()}, or {@linkcode Loading.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode Loading.init .init()} works.
     * @member Loading.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find spinners.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-loading]',
        selectorLoadingOverlay: '.' + prefix + '--loading-overlay',
        classLoadingOverlay: prefix + '--loading-overlay',
        classLoadingStop: prefix + '--loading--stop',
        classLoadingOverlayStop: prefix + '--loading-overlay--stop',
        active: true
      };
    }
  }]);
  return Loading;
}(mixin(createComponent, initComponentBySearch, handles));

Loading.components = new WeakMap();

/**
 * Toggles the given attribute of the given element.
 * @param {Element} elem The element.
 * @param {string} name The attribute name.
 * @param {boolean} add `true` to set the attribute.
 */
function toggleAttribute(elem, name, add) {
  if (add) {
    elem.setAttribute(name, '');
  } else {
    elem.removeAttribute(name);
  }
}

var InlineLoading = function (_mixin) {
  inherits(InlineLoading, _mixin);

  /**
   * Spinner indicating loading state.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a spinner.
   * @param {Object} [options] The component options.
   * @param {string} [options.initialState] The initial state, should be `inactive`, `active` or `finished`.
   */
  function InlineLoading(element, options) {
    classCallCheck(this, InlineLoading);

    // Sets the initial state
    var _this = possibleConstructorReturn(this, (InlineLoading.__proto__ || Object.getPrototypeOf(InlineLoading)).call(this, element, options));

    var initialState = _this.options.initialState;
    if (initialState) {
      _this.setState(initialState);
    }
    return _this;
  }

  /**
   * Sets active/inactive state.
   * @param {string} state The new state, should be `inactive`, `active` or `finished`.
   */


  createClass(InlineLoading, [{
    key: 'setState',
    value: function setState(state) {
      var states = this.constructor.states;
      var values = Object.keys(states).map(function (key) {
        return states[key];
      });
      if (values.indexOf(state) < 0) {
        throw new Error('One of the following value should be given as the state: ' + values.join(', '));
      }

      var elem = this.element;
      var _options = this.options,
          selectorSpinner = _options.selectorSpinner,
          selectorFinished = _options.selectorFinished,
          selectorTextActive = _options.selectorTextActive,
          selectorTextFinished = _options.selectorTextFinished;

      var spinner = elem.querySelector(selectorSpinner);
      var finished = elem.querySelector(selectorFinished);
      var textActive = elem.querySelector(selectorTextActive);
      var textFinished = elem.querySelector(selectorTextFinished);

      if (spinner) {
        spinner.classList.toggle(this.options.classLoadingStop, state !== states.ACTIVE);
        toggleAttribute(spinner, 'hidden', state === states.FINISHED);
      }

      if (finished) {
        toggleAttribute(finished, 'hidden', state !== states.FINISHED);
      }

      if (textActive) {
        toggleAttribute(textActive, 'hidden', state !== states.ACTIVE);
      }

      if (textFinished) {
        toggleAttribute(textFinished, 'hidden', state !== states.FINISHED);
      }

      return this;
    }

    /**
     * The list of states.
     * @type {Object<string, string>}
     */


    /**
     * The map associating DOM element and spinner instance.
     * @member InlineLoading.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode InlineLoading.create .create()},
     * or {@linkcode InlineLoading.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode InlineLoading.init .init()} works.
     * @member InlineLoading.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find inline loading components.
     * @property {string} selectorSpinner The CSS selector to find the spinner.
     * @property {string} selectorFinished The CSS selector to find the "finished" icon.
     * @property {string} selectorTextActive The CSS selector to find the text describing the active state.
     * @property {string} selectorTextFinished The CSS selector to find the text describing the finished state.
     * @property {string} classLoadingStop The CSS class for spinner's stopped state.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-inline-loading]',
        selectorSpinner: '[data-inline-loading-spinner]',
        selectorFinished: '[data-inline-loading-finished]',
        selectorTextActive: '[data-inline-loading-text-active]',
        selectorTextFinished: '[data-inline-loading-text-finished]',
        classLoadingStop: prefix + '--loading--stop'
      };
    }
  }]);
  return InlineLoading;
}(mixin(createComponent, initComponentBySearch, handles));

InlineLoading.states = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  FINISHED: 'finished'
};
InlineLoading.components = new WeakMap();

var Dropdown = function (_mixin) {
  inherits(Dropdown, _mixin);

  /**
   * A selector with drop downs.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends TrackBlur
   * @param {HTMLElement} element The element working as a selector.
   * @param {Object} [options] The component options.
   * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
   * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
   * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
   * @param {string} [options.classOpen] The CSS class for the open state.
   * @param {string} [options.classDisabled] The CSS class for the disabled state.
   * @param {string} [options.eventBeforeSelected]
   *   The name of the custom event fired before a drop down item is selected.
   *   Cancellation of this event stops selection of drop down item.
   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
   */
  function Dropdown(element, options) {
    classCallCheck(this, Dropdown);

    var _this = possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, element, options));

    _this.manage(on(_this.element.ownerDocument, 'click', function (event) {
      _this._toggle(event);
    }));
    _this.manage(on(_this.element, 'keydown', function (event) {
      _this._handleKeyDown(event);
    }));
    _this.manage(on(_this.element, 'click', function (event) {
      var item = eventMatches(event, _this.options.selectorItem);
      if (item) {
        _this.select(item);
      }
    }));
    return _this;
  }

  /**
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   */


  createClass(Dropdown, [{
    key: '_handleKeyDown',
    value: function _handleKeyDown(event) {
      var isOpen = this.element.classList.contains(this.options.classOpen);
      var direction = {
        38: this.constructor.NAVIGATE.BACKWARD,
        40: this.constructor.NAVIGATE.FORWARD
      }[event.which];
      if (isOpen && direction !== undefined) {
        this.navigate(direction);
        event.preventDefault(); // Prevents up/down keys from scrolling container
      } else {
        this._toggle(event);
      }
    }

    /**
     * Opens and closes the dropdown menu.
     * @param {Event} [event] The event triggering this method.
     */

  }, {
    key: '_toggle',
    value: function _toggle(event) {
      var _this2 = this;

      var isDisabled = this.element.classList.contains(this.options.classDisabled);

      if (isDisabled) {
        return;
      }

      if ([13, 32, 40].indexOf(event.which) >= 0 && !event.target.matches(this.options.selectorItem) || event.which === 27 || event.type === 'click') {
        var isOpen = this.element.classList.contains(this.options.classOpen);
        var isOfSelf = this.element.contains(event.target);
        var actions = {
          add: isOfSelf && event.which === 40 && !isOpen,
          remove: (!isOfSelf || event.which === 27) && isOpen,
          toggle: isOfSelf && event.which !== 27 && event.which !== 40
        };
        Object.keys(actions).forEach(function (action) {
          if (actions[action]) {
            _this2.element.classList[action](_this2.options.classOpen);
            _this2.element.focus();
          }
        });
        var listItems = [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorItem)));
        listItems.forEach(function (item) {
          if (_this2.element.classList.contains(_this2.options.classOpen)) {
            item.tabIndex = 0;
          } else {
            item.tabIndex = -1;
          }
        });
      }
    }

    /**
     * @returns {Element} Currently highlighted element.
     */

  }, {
    key: 'getCurrentNavigation',
    value: function getCurrentNavigation() {
      var focused = this.element.ownerDocument.activeElement;
      return focused.nodeType === Node.ELEMENT_NODE && focused.matches(this.options.selectorItem) ? focused : null;
    }

    /**
     * Moves up/down the focus.
     * @param {number} direction The direction of navigating.
     */

  }, {
    key: 'navigate',
    value: function navigate(direction) {
      var items = [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorItem)));
      var start = this.getCurrentNavigation() || this.element.querySelector(this.options.selectorItemSelected);
      var getNextItem = function getNextItem(old) {
        var handleUnderflow = function handleUnderflow(i, l) {
          return i + (i >= 0 ? 0 : l);
        };
        var handleOverflow = function handleOverflow(i, l) {
          return i - (i < l ? 0 : l);
        };
        // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
        var index = Math.max(items.indexOf(old) + direction, -1);
        return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
      };
      for (var current = getNextItem(start); current && current !== start; current = getNextItem(current)) {
        if (!current.matches(this.options.selectorItemSelected)) {
          current.focus();
          break;
        }
      }
    }

    /**
     * Handles clicking on the dropdown options, doing the following:
     * * Change Dropdown text to selected option.
     * * Remove selected option from options when selected.
     * * Emit custom events.
     * @param {HTMLElement} itemToSelect The element to be activated.
     */

  }, {
    key: 'select',
    value: function select(itemToSelect) {
      var _this3 = this;

      var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
        bubbles: true,
        cancelable: true,
        detail: { item: itemToSelect }
      });

      if (this.element.dispatchEvent(eventStart)) {
        if (this.element.dataset.dropdownType !== 'navigation') {
          var selectorText = this.element.dataset.dropdownType !== 'inline' ? this.options.selectorText : this.options.selectorTextInner;
          var text = this.element.querySelector(selectorText);
          if (text) {
            text.innerHTML = itemToSelect.innerHTML;
          }
          itemToSelect.classList.add(this.options.classSelected);
        }
        this.element.dataset.value = itemToSelect.parentElement.dataset.value;

        [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorItemSelected))).forEach(function (item) {
          if (itemToSelect !== item) {
            item.classList.remove(_this3.options.classSelected);
          }
        });

        this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
          bubbles: true,
          cancelable: true,
          detail: { item: itemToSelect }
        }));
      }
    }

    /**
     * Closes the dropdown menu if this component loses focus.
     */

  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.element.classList.remove(this.options.classOpen);
    }

    /**
     * The map associating DOM element and selector instance.
     * @member Dropdown.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode Dropdown.create .create()}, or {@linkcode Dropdown.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode Dropdown.init .init()} works.
     * @member Dropdown.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find selectors.
     * @property {string} [selectorText] The CSS selector to find the element showing the selected item.
     * @property {string} [selectorTextInner] The CSS selector to find the element showing the selected item, used for inline mode.
     * @property {string} [selectorItem] The CSS selector to find clickable areas in dropdown items.
     * @property {string} [selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
     * @property {string} [classSelected] The CSS class for the selected dropdown item.
     * @property {string} [classOpen] The CSS class for the open state.
     * @property {string} [classDisabled] The CSS class for the disabled state.
     * @property {string} [eventBeforeSelected]
     *   The name of the custom event fired before a drop down item is selected.
     *   Cancellation of this event stops selection of drop down item.
     * @property {string} [eventAfterSelected] The name of the custom event fired after a drop down item is selected.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-dropdown]',
        selectorText: '.' + prefix + '--dropdown-text',
        selectorTextInner: '.' + prefix + '--dropdown-text__inner',
        selectorItem: '.' + prefix + '--dropdown-link',
        selectorItemSelected: '.' + prefix + '--dropdown--selected',
        classSelected: prefix + '--dropdown--selected',
        classOpen: prefix + '--dropdown--open',
        classDisabled: prefix + '--dropdown--disabled',
        eventBeforeSelected: 'dropdown-beingselected',
        eventAfterSelected: 'dropdown-selected'
      };
    }

    /**
     * Enum for navigating backward/forward.
     * @readonly
     * @member Dropdown.NAVIGATE
     * @type {Object}
     * @property {number} BACKWARD Navigating backward.
     * @property {number} FORWARD Navigating forward.
     */

  }]);
  return Dropdown;
}(mixin(createComponent, initComponentBySearch, exports$2));

Dropdown.components = new WeakMap();
Dropdown.NAVIGATE = {
  BACKWARD: -1,
  FORWARD: 1
};

var NumberInput = function (_mixin) {
  inherits(NumberInput, _mixin);

  /**
   * Number input UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a number input UI.
   */
  function NumberInput(element, options) {
    classCallCheck(this, NumberInput);

    // Broken DOM tree is seen with up/down arrows <svg> in IE, which breaks event delegation.
    // <svg> does not have `Element.classList` in IE11
    var _this = possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, element, options));

    _this.manage(on(_this.element.querySelector('.up-icon'), 'click', function (event) {
      _this._handleClick(event);
    }));
    _this.manage(on(_this.element.querySelector('.down-icon'), 'click', function (event) {
      _this._handleClick(event);
    }));
    return _this;
  }

  /**
   * Increase/decrease number by clicking on up/down icons.
   * @param {Event} event The event triggering this method.
   */


  createClass(NumberInput, [{
    key: '_handleClick',
    value: function _handleClick(event) {
      var numberInput = this.element.querySelector(this.options.selectorInput);
      var target = event.currentTarget.getAttribute('class').split(' ');

      if (target.indexOf('up-icon') >= 0) {
        ++numberInput.value;
      } else if (target.indexOf('down-icon') >= 0) {
        --numberInput.value;
      }

      // Programmatic change in value (including `stepUp()`/`stepDown()`) won't fire change event
      numberInput.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        cancelable: false
      }));
    }

    /**
     * The map associating DOM element and number input UI instance.
     * @member NumberInput.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor,
     * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
     * @member NumberInput.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find number input UIs.
     * @property {string} [selectorInput] The CSS selector to find the `<input>` element.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-numberinput]',
        selectorInput: '.' + prefix + '--number input'
      };
    }
  }]);
  return NumberInput;
}(mixin(createComponent, initComponentBySearch, handles));

NumberInput.components = new WeakMap();

var DataTable = function (_mixin) {
  inherits(DataTable, _mixin);

  /**
   * Data Table
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends EventedState
   * @extends Handles
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorExpandCells] css selector for expand
   * @param {string} [options.expandableRow] css selector for expand
   * @param {string} [options.selectorParentRows] css selector for rows housing expansion
   * @param {string} [options.selectorTableBody] root css for table body
   * @param {string} [options.eventTrigger] selector for event bubble capture points
   * @param {string} [options.eventParentContainer] used find the bubble container
   */
  function DataTable(element, options) {
    classCallCheck(this, DataTable);

    var _this = possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, element, options));

    _initialiseProps.call(_this);

    _this.container = element.parentNode; // requires the immediate parent to be the container
    _this.tableBody = _this.element.querySelector(_this.options.selectorTableBody);
    _this.expandCells = [];
    _this.expandableRows = [];
    _this.parentRows = [];
    _this.overflowInitialized = false;

    _this.refreshRows();

    _this.manage(on(_this.element, 'click', function (evt) {
      var eventElement = eventMatches(evt, _this.options.eventTrigger);
      if (eventElement) {
        _this._toggleState(eventElement, evt);
      }
    }));

    _this.manage(on(_this.element, 'keydown', function (evt) {
      if (evt.which === 13) {
        var eventElement = eventMatches(evt, _this.options.eventTrigger);
        if (eventElement) {
          _this._toggleState(eventElement, evt);
        }
      }
    }));
    return _this;
  }

  /**
   * Toggles the given state.
   * @private
   * @param {Object} detail The detail of the event trigging this action.
   * @param {Function} callback Callback called when change in state completes.
   */


  createClass(DataTable, [{
    key: '_changeState',
    value: function _changeState(detail, callback) {
      this[this.constructor.eventHandlers[detail.group]](detail);
      callback();
    }

    /**
     * Toggles the state of this component specified by `data-event` attribute of the given element.
     * @param {HTMLElement} element The element.
     * @param {Event} evt The event trigging this action.
     */


    /**
     * Zebra stripes - done in javascript to handle expandable rows
     */


    /**
     * Find all expandable rows and remove them from the DOM
     */


    /**
     * On trigger, insert the expandable row back in
     */


    /**
     * On trigger, flip the sort icon
     */


    /**
     * On trigger, check all checkboxes
     */


    /**
     * On fire, create the parent child rows + striping
     */

  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-responsive-table]',
        selectorExpandCells: '.' + prefix + '--table-expand',
        selectorExpandableRows: '.' + prefix + '--expandable-row',
        selectorParentRows: '.' + prefix + '--parent-row',
        selectorTableBody: '.' + prefix + '--table-body',
        selectorCheckbox: '.' + prefix + '--checkbox',
        classParentRowEven: prefix + '--parent-row--even',
        classExpandableRow: prefix + '--expandable-row',
        classExpandableRowEven: prefix + '--expandable-row--even',
        classExpandableRowHidden: prefix + '--expandable-row--hidden',
        classTableSortAscending: prefix + '--table-sort--ascending',
        eventBeforeExpand: 'responsive-table-beforetoggleexpand',
        eventAfterExpand: 'responsive-table-aftertoggleexpand',
        eventBeforeSort: 'responsive-table-beforetogglesort',
        eventAfterSort: 'responsive-table-aftertogglesort',
        eventBeforeSelectAll: 'responsive-table-beforetoggleselectall',
        eventAfterSelectAll: 'responsive-table-aftertoggleselectall',
        eventTrigger: '[data-event]',
        eventParentContainer: '[data-parent-row]'
      };
    }
  }]);
  return DataTable;
}(mixin(createComponent, initComponentBySearch, eventedState, handles));

DataTable.components = new WeakMap();
DataTable.eventHandlers = {
  expand: '_toggleRowExpand',
  sort: '_toggleSort',
  'select-all': '_toggleSelectAll'
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._toggleState = function (element, evt) {
    var data = element.dataset;
    var label = data.label ? data.label : '';
    var previousValue = data.previousValue ? data.previousValue : '';
    var initialEvt = evt;
    _this2.changeState({
      group: data.event,
      element: element,
      label: label,
      previousValue: previousValue,
      initialEvt: initialEvt
    });
  };

  this._zebraStripe = function (parentRows) {
    parentRows.forEach(function (item, index) {
      if (index % 2 === 0) {
        item.classList.add(_this2.options.classParentRowEven);
        if (item.nextElementSibling && item.nextElementSibling.classList.contains(_this2.options.classExpandableRow)) {
          item.nextElementSibling.classList.add(_this2.options.classExpandableRowEven);
        }
      } else {
        item.classList.remove(_this2.options.classParentRowEven);
      }
    });
  };

  this._initExpandableRows = function (expandableRows) {
    expandableRows.forEach(function (item) {
      item.classList.remove(_this2.options.classExpandableRowHidden);
      _this2.tableBody.removeChild(item);
    });
  };

  this._toggleRowExpand = function (detail) {
    var element = detail.element;
    var parent = eventMatches(detail.initialEvt, _this2.options.eventParentContainer);

    var index = _this2.expandCells.indexOf(element);
    if (element.dataset.previousValue === undefined || element.dataset.previousValue === 'expanded') {
      element.dataset.previousValue = 'collapsed';
      _this2.tableBody.insertBefore(_this2.expandableRows[index], _this2.parentRows[index + 1]);
    } else {
      _this2.tableBody.removeChild(parent.nextElementSibling);
      element.dataset.previousValue = 'expanded';
    }
  };

  this._toggleSort = function (detail) {
    var element = detail.element,
        previousValue = detail.previousValue;


    if (!previousValue || previousValue === 'descending') {
      element.dataset.previousValue = 'ascending';
      element.classList.add(_this2.options.classTableSortAscending);
    } else {
      element.dataset.previousValue = 'descending';
      element.classList.remove(_this2.options.classTableSortAscending);
    }
  };

  this._toggleSelectAll = function (detail) {
    var element = detail.element,
        previousValue = detail.previousValue;

    var inputs = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorCheckbox)));
    if (!previousValue || previousValue === 'toggled') {
      inputs.forEach(function (item) {
        item.checked = true; // eslint-disable-line no-param-reassign
      });
      element.dataset.previousValue = 'off';
    } else {
      inputs.forEach(function (item) {
        item.checked = false; // eslint-disable-line no-param-reassign
      });
      element.dataset.previousValue = 'toggled';
    }
  };

  this.refreshRows = function () {
    var newExpandCells = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorExpandCells)));
    var newExpandableRows = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorExpandableRows)));
    var newParentRows = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorParentRows)));

    // check if this is a refresh or the first time
    if (_this2.parentRows.length > 0) {
      var diffParentRows = newParentRows.filter(function (newRow) {
        return !_this2.parentRows.some(function (oldRow) {
          return oldRow === newRow;
        });
      });

      // check if there are expandable rows
      if (newExpandableRows.length > 0) {
        var diffExpandableRows = diffParentRows.map(function (newRow) {
          return newRow.nextElementSibling;
        });
        var mergedExpandableRows = [].concat(toConsumableArray(_this2.expandableRows), toConsumableArray(diffExpandableRows));
        _this2._initExpandableRows(diffExpandableRows);
        _this2.expandableRows = mergedExpandableRows;
      }

      _this2._zebraStripe(newParentRows);
    } else {
      _this2._zebraStripe(newParentRows);

      if (newExpandableRows.length > 0) {
        _this2._initExpandableRows(newExpandableRows);
        _this2.expandableRows = newExpandableRows;
      }
    }

    _this2.expandCells = newExpandCells;
    _this2.parentRows = newParentRows;
  };
};

var DataTableV2 = function (_mixin) {
  inherits(DataTableV2, _mixin);

  /**
   * Data Table
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends   EventedState
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorExpandCells] css selector for expand
   * @param {string} [options.expandableRow] css selector for expand
   * @param {string} [options.selectorParentRows] css selector for rows housing expansion
   * @param {string} [options.selectorTableBody] root css for table body
   * @param {string} [options.eventTrigger] selector for event bubble capture points
   * @param {string} [options.eventParentContainer] used find the bubble container
   */
  function DataTableV2(element, options) {
    classCallCheck(this, DataTableV2);

    var _this = possibleConstructorReturn(this, (DataTableV2.__proto__ || Object.getPrototypeOf(DataTableV2)).call(this, element, options));

    _initialiseProps$1.call(_this);

    _this.container = element.parentNode;
    _this.toolbarEl = _this.element.querySelector(_this.options.selectorToolbar);
    _this.batchActionEl = _this.element.querySelector(_this.options.selectorActions);
    _this.countEl = _this.element.querySelector(_this.options.selectorCount);
    _this.cancelEl = _this.element.querySelector(_this.options.selectorActionCancel);
    _this.tableHeaders = _this.element.querySelectorAll('th');
    _this.tableBody = _this.element.querySelector(_this.options.selectorTableBody);
    _this.expandCells = [];
    _this.expandableRows = [];
    _this.parentRows = [];

    _this.refreshRows();

    _this.element.addEventListener('mouseover', function (evt) {
      var eventElement = eventMatches(evt, _this.options.selectorChildRow);

      if (eventElement) {
        _this._expandableHoverToggle(eventElement, true);
      }
    });

    _this.element.addEventListener('click', function (evt) {
      var eventElement = eventMatches(evt, _this.options.eventTrigger);
      if (eventElement) {
        _this._toggleState(eventElement, evt);
      }
    });

    _this.element.addEventListener('keydown', _this._keydownHandler);

    _this.state = {
      checkboxCount: 0
    };
    return _this;
  }

  createClass(DataTableV2, [{
    key: '_changeState',
    value: function _changeState(detail, callback) {
      this[this.constructor.eventHandlers[detail.group]](detail);
      callback();
    }

    // UI Events

  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-table-v2]',
        selectorToolbar: '.' + prefix + '--table--toolbar',
        selectorActions: '.' + prefix + '--batch-actions',
        selectorCount: '[data-items-selected]',
        selectorActionCancel: '.' + prefix + '--batch-summary__cancel',
        selectorCheckbox: '.' + prefix + '--checkbox',
        selectorExpandCells: '.' + prefix + '--table-expand-v2',
        selectorExpandableRows: '.' + prefix + '--expandable-row-v2',
        selectorParentRows: '.' + prefix + '--parent-row-v2',
        selectorChildRow: '[data-child-row]',
        selectorTableBody: 'tbody',
        selectorTableSort: '.' + prefix + '--table-sort-v2',
        selectorTableSelected: '.' + prefix + '--data-table-v2--selected',
        classExpandableRow: prefix + '--expandable-row-v2',
        classExpandableRowHidden: prefix + '--expandable-row--hidden-v2',
        classExpandableRowHover: prefix + '--expandable-row--hover-v2',
        classTableSortAscending: prefix + '--table-sort-v2--ascending',
        classTableSortActive: prefix + '--table-sort-v2--active',
        classActionBarActive: prefix + '--batch-actions--active',
        classTableSelected: prefix + '--data-table-v2--selected',
        eventBeforeExpand: 'data-table-v2-beforetoggleexpand',
        eventAfterExpand: 'data-table-v2-aftertoggleexpand',
        eventBeforeSort: 'data-table-v2-beforetogglesort',
        eventAfterSort: 'data-table-v2-aftertogglesort',
        eventTrigger: '[data-event]',
        eventParentContainer: '[data-parent-row]'
      };
    }
  }]);
  return DataTableV2;
}(mixin(createComponent, initComponentBySearch, eventedState));

DataTableV2.components = new WeakMap();
DataTableV2.eventHandlers = {
  expand: '_rowExpandToggle',
  sort: '_sortToggle',
  select: '_selectToggle',
  'select-all': '_selectAllToggle',
  'action-bar-cancel': '_actionBarCancel'
};

var _initialiseProps$1 = function _initialiseProps() {
  var _this2 = this;

  this._sortToggle = function (detail) {
    var element = detail.element,
        previousValue = detail.previousValue;


    [].concat(toConsumableArray(_this2.tableHeaders)).forEach(function (header) {
      var sortEl = header.querySelector(_this2.options.selectorTableSort);

      if (sortEl !== null && sortEl !== element) {
        sortEl.classList.remove(_this2.options.classTableSortActive);
        sortEl.classList.remove(_this2.options.classTableSortAscending);
      }
    });

    if (!previousValue || previousValue === 'descending') {
      element.dataset.previousValue = 'ascending';
      element.classList.add(_this2.options.classTableSortActive);
      element.classList.add(_this2.options.classTableSortAscending);
    } else {
      element.dataset.previousValue = 'descending';
      element.classList.add(_this2.options.classTableSortActive);
      element.classList.remove(_this2.options.classTableSortAscending);
    }
  };

  this._selectToggle = function (detail) {
    var element = detail.element;

    var checked = element.checked;

    // increment the  count
    _this2.state.checkboxCount += checked ? 1 : -1;
    _this2.countEl.textContent = _this2.state.checkboxCount;

    var row = element.parentNode.parentNode;

    row.classList.toggle(_this2.options.classTableSelected);

    // toggle on/off batch action bar
    _this2._actionBarToggle(_this2.state.checkboxCount > 0);
  };

  this._selectAllToggle = function (detail) {
    var checked = detail.element.checked;

    var inputs = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorCheckbox)));

    _this2.state.checkboxCount = checked ? inputs.length - 1 : 0;

    inputs.forEach(function (item) {
      item.checked = checked;

      var row = item.parentNode.parentNode;
      if (checked && row) {
        row.classList.add(_this2.options.classTableSelected);
      } else {
        row.classList.remove(_this2.options.classTableSelected);
      }
    });

    _this2._actionBarToggle(_this2.state.checkboxCount > 0);

    if (_this2.batchActionEl) {
      _this2.countEl.textContent = _this2.state.checkboxCount;
    }
  };

  this._actionBarCancel = function () {
    var inputs = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorCheckbox)));
    var row = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorTableSelected)));

    row.forEach(function (item) {
      item.classList.remove(_this2.options.classTableSelected);
    });

    inputs.forEach(function (item) {
      item.checked = false;
    });

    _this2.state.checkboxCount = 0;
    _this2._actionBarToggle(false);

    if (_this2.batchActionEl) {
      _this2.countEl.textContent = _this2.state.checkboxCount;
    }
  };

  this._actionBarToggle = function (toggleOn) {
    var transition = function transition(evt) {
      _this2.batchActionEl.removeEventListener('transitionend', transition);

      if (evt.target.matches(_this2.options.selectorActions)) {
        if (_this2.batchActionEl.dataset.active === 'false') {
          _this2.batchActionEl.setAttribute('tabIndex', -1);
        } else {
          _this2.batchActionEl.setAttribute('tabIndex', 0);
        }
      }
    };

    if (toggleOn) {
      _this2.batchActionEl.dataset.active = true;
      _this2.batchActionEl.classList.add(_this2.options.classActionBarActive);
    } else if (_this2.batchActionEl) {
      _this2.batchActionEl.dataset.active = false;
      _this2.batchActionEl.classList.remove(_this2.options.classActionBarActive);
    }
    if (_this2.batchActionEl) {
      _this2.batchActionEl.addEventListener('transitionend', transition);
    }
  };

  this._expandableRowsInit = function (expandableRows) {
    expandableRows.forEach(function (item) {
      item.classList.remove(_this2.options.classExpandableRowHidden);
      _this2.tableBody.removeChild(item);
    });
  };

  this._rowExpandToggle = function (detail) {
    var element = detail.element;
    var parent = eventMatches(detail.initialEvt, _this2.options.eventParentContainer);

    var index = _this2.expandCells.indexOf(element);
    if (element.dataset.previousValue === undefined || element.dataset.previousValue === 'expanded') {
      element.dataset.previousValue = 'collapsed';
      parent.classList.add(_this2.options.classExpandableRow);
      _this2.tableBody.insertBefore(_this2.expandableRows[index], _this2.parentRows[index + 1]);
    } else {
      parent.classList.remove(_this2.options.classExpandableRow);
      _this2.tableBody.removeChild(parent.nextElementSibling);
      element.dataset.previousValue = 'expanded';
    }
  };

  this._expandableHoverToggle = function (element) {
    element.previousElementSibling.classList.add(_this2.options.classExpandableRowHover);

    var mouseout = function mouseout() {
      element.previousElementSibling.classList.remove(_this2.options.classExpandableRowHover);
      element.removeEventListener('mouseout', mouseout);
    };

    element.addEventListener('mouseout', mouseout);
  };

  this._toggleState = function (element, evt) {
    var data = element.dataset;
    var label = data.label ? data.label : '';
    var previousValue = data.previousValue ? data.previousValue : '';
    var initialEvt = evt;

    _this2.changeState({
      group: data.event,
      element: element,
      label: label,
      previousValue: previousValue,
      initialEvt: initialEvt
    });
  };

  this._keydownHandler = function (evt) {
    if (evt.which === 27) {
      _this2._actionBarCancel();
    }
  };

  this.refreshRows = function () {
    var newExpandCells = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorExpandCells)));
    var newExpandableRows = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorExpandableRows)));
    var newParentRows = [].concat(toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorParentRows)));

    // check if this is a refresh or the first time
    if (_this2.parentRows.length > 0) {
      var diffParentRows = newParentRows.filter(function (newRow) {
        return !_this2.parentRows.some(function (oldRow) {
          return oldRow === newRow;
        });
      });

      // check if there are expandable rows
      if (newExpandableRows.length > 0) {
        var diffExpandableRows = diffParentRows.map(function (newRow) {
          return newRow.nextElementSibling;
        });
        var mergedExpandableRows = [].concat(toConsumableArray(_this2.expandableRows), toConsumableArray(diffExpandableRows));
        _this2._expandableRowsInit(diffExpandableRows);
        _this2.expandableRows = mergedExpandableRows;
      }
    } else if (newExpandableRows.length > 0) {
      _this2._expandableRowsInit(newExpandableRows);
      _this2.expandableRows = newExpandableRows;
    }

    _this2.expandCells = newExpandCells;
    _this2.parentRows = newParentRows;
  };
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var flatpickr_1$1 = createCommonjsModule(function (module) {
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! flatpickr v2.6.3, @license MIT */
function Flatpickr(element, config) {
	var self = this;

	self._ = {};
	self._.afterDayAnim = afterDayAnim;
	self.changeMonth = changeMonth;
	self.changeYear = changeYear;
	self.clear = clear;
	self.close = close;
	self._createElement = createElement;
	self.destroy = destroy;
	self.isEnabled = isEnabled;
	self.jumpToDate = jumpToDate;
	self.open = open;
	self.redraw = redraw;
	self.set = set;
	self.setDate = setDate;
	self.toggle = toggle;

	function init() {
		self.element = self.input = element;
		self.instanceConfig = config || {};
		self.parseDate = Flatpickr.prototype.parseDate.bind(self);
		self.formatDate = Flatpickr.prototype.formatDate.bind(self);

		setupFormats();
		parseConfig();
		setupLocale();
		setupInputs();
		setupDates();
		setupHelperFunctions();

		self.isOpen = false;

		self.isMobile = !self.config.disableMobile && !self.config.inline && self.config.mode === "single" && !self.config.disable.length && !self.config.enable.length && !self.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		if (!self.isMobile) build();

		bindEvents();

		if (self.selectedDates.length || self.config.noCalendar) {
			if (self.config.enableTime) {
				setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj || self.config.minDate : null);
			}
			updateValue();
		}

		if (self.config.weekNumbers) {
			self.calendarContainer.style.width = self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
		}

		self.showTimeInput = self.selectedDates.length > 0 || self.config.noCalendar;

		if (!self.isMobile) positionCalendar();

		triggerEvent("Ready");
	}

	/**
  * Binds a function to the current flatpickr instance
  * @param {Function} fn the function
  * @return {Function} the function bound to the instance
  */
	function bindToInstance(fn) {
		return fn.bind(self);
	}

	/**
  * The handler for all events targeting the time inputs
  * @param {Event} e the event - "input", "wheel", "increment", etc
  */
	function updateTime(e) {
		if (self.config.noCalendar && !self.selectedDates.length)
			// picking time only
			self.selectedDates = [self.now];

		timeWrapper(e);

		if (!self.selectedDates.length) return;

		if (!self.minDateHasTime || e.type !== "input" || e.target.value.length >= 2) {
			setHoursFromInputs();
			updateValue();
		} else {
			setTimeout(function () {
				setHoursFromInputs();
				updateValue();
			}, 1000);
		}
	}

	/**
  * Syncs the selected date object time with user's time input
  */
	function setHoursFromInputs() {
		if (!self.config.enableTime) return;

		var hours = (parseInt(self.hourElement.value, 10) || 0) % (self.amPM ? 12 : 24),
		    minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60,
		    seconds = self.config.enableSeconds ? (parseInt(self.secondElement.value, 10) || 0) % 60 : 0;

		if (self.amPM !== undefined) hours = hours % 12 + 12 * (self.amPM.textContent === "PM");

		if (self.minDateHasTime && compareDates(self.latestSelectedDateObj, self.config.minDate) === 0) {

			hours = Math.max(hours, self.config.minDate.getHours());
			if (hours === self.config.minDate.getHours()) minutes = Math.max(minutes, self.config.minDate.getMinutes());
		}

		if (self.maxDateHasTime && compareDates(self.latestSelectedDateObj, self.config.maxDate) === 0) {
			hours = Math.min(hours, self.config.maxDate.getHours());
			if (hours === self.config.maxDate.getHours()) minutes = Math.min(minutes, self.config.maxDate.getMinutes());
		}

		setHours(hours, minutes, seconds);
	}

	/**
  * Syncs time input values with a date
  * @param {Date} dateObj the date to sync with
  */
	function setHoursFromDate(dateObj) {
		var date = dateObj || self.latestSelectedDateObj;

		if (date) setHours(date.getHours(), date.getMinutes(), date.getSeconds());
	}

	/**
  * Sets the hours, minutes, and optionally seconds
  * of the latest selected date object and the
  * corresponding time inputs
  * @param {Number} hours the hour. whether its military
  *                 or am-pm gets inferred from config
  * @param {Number} minutes the minutes
  * @param {Number} seconds the seconds (optional)
  */
	function setHours(hours, minutes, seconds) {
		if (self.selectedDates.length) {
			self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
		}

		if (!self.config.enableTime || self.isMobile) return;

		self.hourElement.value = self.pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * (hours % 12 === 0) : hours);

		self.minuteElement.value = self.pad(minutes);

		if (!self.config.time_24hr) self.amPM.textContent = hours >= 12 ? "PM" : "AM";

		if (self.config.enableSeconds === true) self.secondElement.value = self.pad(seconds);
	}

	/**
  * Handles the year input and incrementing events
  * @param {Event} event the keyup or increment event
  */
	function onYearInput(event) {
		var year = event.target.value;
		if (event.delta) year = (parseInt(year) + event.delta).toString();

		if (year.length === 4 || event.key === "Enter") {
			self.currentYearElement.blur();
			if (!/[^\d]/.test(year)) changeYear(year);
		}
	}

	/**
  * Essentially addEventListener + tracking
  * @param {Element} element the element to addEventListener to
  * @param {String} event the event name
  * @param {Function} handler the event handler
  */
	function bind(element, event, handler) {
		if (event instanceof Array) return event.forEach(function (ev) {
			return bind(element, ev, handler);
		});

		if (element instanceof Array) return element.forEach(function (el) {
			return bind(el, event, handler);
		});

		element.addEventListener(event, handler);
		self._handlers.push({ element: element, event: event, handler: handler });
	}

	/**
  * A mousedown handler which mimics click.
  * Minimizes latency, since we don't need to wait for mouseup in most cases.
  * Also, avoids handling right clicks.
  *
  * @param {Function} handler the event handler
  */
	function onClick(handler) {
		return function (evt) {
			return evt.which === 1 && handler(evt);
		};
	}

	/**
  * Adds all the necessary event listeners
  */
	function bindEvents() {
		self._handlers = [];
		self._animationLoop = [];
		if (self.config.wrap) {
			["open", "close", "toggle", "clear"].forEach(function (evt) {
				Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
					return bind(el, "mousedown", onClick(self[evt]));
				});
			});
		}

		if (self.isMobile) return setupMobile();

		self.debouncedResize = debounce(onResize, 50);
		self.triggerChange = function () {
			triggerEvent("Change");
		};
		self.debouncedChange = debounce(self.triggerChange, 300);

		if (self.config.mode === "range" && self.daysContainer) bind(self.daysContainer, "mouseover", function (e) {
			return onMouseOver(e.target);
		});

		bind(window.document.body, "keydown", onKeyDown);

		if (!self.config.static) bind(self._input, "keydown", onKeyDown);

		if (!self.config.inline && !self.config.static) bind(window, "resize", self.debouncedResize);

		if (window.ontouchstart !== undefined) bind(window.document, "touchstart", documentClick);

		bind(window.document, "mousedown", onClick(documentClick));
		bind(self._input, "blur", documentClick);

		if (self.config.clickOpens === true) bind(self._input, "focus", self.open);

		if (!self.config.noCalendar) {
			self.monthNav.addEventListener("wheel", function (e) {
				return e.preventDefault();
			});
			bind(self.monthNav, "wheel", debounce(onMonthNavScroll, 10));
			bind(self.monthNav, "mousedown", onClick(onMonthNavClick));

			bind(self.monthNav, ["keyup", "increment"], onYearInput);
			bind(self.daysContainer, "mousedown", onClick(selectDate));

			if (self.config.animate) {
				bind(self.daysContainer, ["webkitAnimationEnd", "animationend"], animateDays);
				bind(self.monthNav, ["webkitAnimationEnd", "animationend"], animateMonths);
			}
		}

		if (self.config.enableTime) {
			var selText = function selText(e) {
				return e.target.select();
			};
			bind(self.timeContainer, ["wheel", "input", "increment"], updateTime);
			bind(self.timeContainer, "mousedown", onClick(timeIncrement));

			bind(self.timeContainer, ["wheel", "increment"], self.debouncedChange);
			bind(self.timeContainer, "input", self.triggerChange);

			bind([self.hourElement, self.minuteElement], "focus", selText);

			if (self.secondElement !== undefined) bind(self.secondElement, "focus", function () {
				return self.secondElement.select();
			});

			if (self.amPM !== undefined) {
				bind(self.amPM, "mousedown", onClick(function (e) {
					updateTime(e);
					self.triggerChange(e);
				}));
			}
		}
	}

	function processPostDayAnimation() {
		for (var i = self._animationLoop.length; i--;) {
			self._animationLoop[i]();
			self._animationLoop.splice(i, 1);
		}
	}

	/**
  * Removes the day container that slided out of view
  * @param {Event} e the animation event
  */
	function animateDays(e) {
		if (self.daysContainer.childNodes.length > 1) {
			switch (e.animationName) {
				case "fpSlideLeft":
					self.daysContainer.lastChild.classList.remove("slideLeftNew");
					self.daysContainer.removeChild(self.daysContainer.firstChild);
					self.days = self.daysContainer.firstChild;
					processPostDayAnimation();

					break;

				case "fpSlideRight":
					self.daysContainer.firstChild.classList.remove("slideRightNew");
					self.daysContainer.removeChild(self.daysContainer.lastChild);
					self.days = self.daysContainer.firstChild;
					processPostDayAnimation();

					break;

				default:
					break;
			}
		}
	}

	/**
  * Removes the month element that animated out of view
  * @param {Event} e the animation event
  */
	function animateMonths(e) {
		switch (e.animationName) {
			case "fpSlideLeftNew":
			case "fpSlideRightNew":
				self.navigationCurrentMonth.classList.remove("slideLeftNew");
				self.navigationCurrentMonth.classList.remove("slideRightNew");
				var nav = self.navigationCurrentMonth;

				while (nav.nextSibling && /curr/.test(nav.nextSibling.className)) {
					self.monthNav.removeChild(nav.nextSibling);
				}while (nav.previousSibling && /curr/.test(nav.previousSibling.className)) {
					self.monthNav.removeChild(nav.previousSibling);
				}self.oldCurMonth = null;
				break;
		}
	}

	/**
  * Set the calendar view to a particular date.
  * @param {Date} jumpDate the date to set the view to
  */
	function jumpToDate(jumpDate) {
		jumpDate = jumpDate ? self.parseDate(jumpDate) : self.latestSelectedDateObj || (self.config.minDate > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate < self.now ? self.config.maxDate : self.now);

		try {
			self.currentYear = jumpDate.getFullYear();
			self.currentMonth = jumpDate.getMonth();
		} catch (e) {
			/* istanbul ignore next */
			console.error(e.stack);
			/* istanbul ignore next */
			console.warn("Invalid date supplied: " + jumpDate);
		}

		self.redraw();
	}

	/**
  * The up/down arrow handler for time inputs
  * @param {Event} e the click event
  */
	function timeIncrement(e) {
		if (~e.target.className.indexOf("arrow")) incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
	}

	/**
  * Increments/decrements the value of input associ-
  * ated with the up/down arrow by dispatching an
  * "increment" event on the input.
  *
  * @param {Event} e the click event
  * @param {Number} delta the diff (usually 1 or -1)
  * @param {Element} inputElem the input element
  */
	function incrementNumInput(e, delta, inputElem) {
		var input = inputElem || e.target.parentNode.childNodes[0];
		var event = createEvent("increment");
		event.delta = delta;
		input.dispatchEvent(event);
	}

	function createNumberInput(inputClassName) {
		var wrapper = createElement("div", "numInputWrapper"),
		    numInput = createElement("input", "numInput " + inputClassName),
		    arrowUp = createElement("span", "arrowUp"),
		    arrowDown = createElement("span", "arrowDown");

		numInput.type = "text";
		numInput.pattern = "\\d*";

		wrapper.appendChild(numInput);
		wrapper.appendChild(arrowUp);
		wrapper.appendChild(arrowDown);

		return wrapper;
	}

	function build() {
		var fragment = window.document.createDocumentFragment();
		self.calendarContainer = createElement("div", "flatpickr-calendar");
		self.calendarContainer.tabIndex = -1;

		if (!self.config.noCalendar) {
			fragment.appendChild(buildMonthNav());
			self.innerContainer = createElement("div", "flatpickr-innerContainer");

			if (self.config.weekNumbers) self.innerContainer.appendChild(buildWeeks());

			self.rContainer = createElement("div", "flatpickr-rContainer");
			self.rContainer.appendChild(buildWeekdays());

			if (!self.daysContainer) {
				self.daysContainer = createElement("div", "flatpickr-days");
				self.daysContainer.tabIndex = -1;
			}

			buildDays();
			self.rContainer.appendChild(self.daysContainer);

			self.innerContainer.appendChild(self.rContainer);
			fragment.appendChild(self.innerContainer);
		}

		if (self.config.enableTime) fragment.appendChild(buildTime());

		toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
		toggleClass(self.calendarContainer, "animate", self.config.animate);

		self.calendarContainer.appendChild(fragment);

		var customAppend = self.config.appendTo && self.config.appendTo.nodeType;

		if (self.config.inline || self.config.static) {
			self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");

			if (self.config.inline && !customAppend) {
				return self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
			}

			if (self.config.static) {
				var wrapper = createElement("div", "flatpickr-wrapper");
				self.element.parentNode.insertBefore(wrapper, self.element);
				wrapper.appendChild(self.element);

				if (self.altInput) wrapper.appendChild(self.altInput);

				wrapper.appendChild(self.calendarContainer);
				return;
			}
		}

		(customAppend ? self.config.appendTo : window.document.body).appendChild(self.calendarContainer);
	}

	function createDay(className, date, dayNumber, i) {
		var dateIsEnabled = isEnabled(date, true),
		    dayElement = createElement("span", "flatpickr-day " + className, date.getDate());

		dayElement.dateObj = date;
		dayElement.$i = i;
		dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));

		if (compareDates(date, self.now) === 0) {
			self.todayDateElem = dayElement;
			dayElement.classList.add("today");
		}

		if (dateIsEnabled) {
			dayElement.tabIndex = -1;
			if (isDateSelected(date)) {
				dayElement.classList.add("selected");
				self.selectedDateElem = dayElement;
				if (self.config.mode === "range") {
					toggleClass(dayElement, "startRange", compareDates(date, self.selectedDates[0]) === 0);

					toggleClass(dayElement, "endRange", compareDates(date, self.selectedDates[1]) === 0);
				}
			}
		} else {
			dayElement.classList.add("disabled");
			if (self.selectedDates[0] && date > self.minRangeDate && date < self.selectedDates[0]) self.minRangeDate = date;else if (self.selectedDates[0] && date < self.maxRangeDate && date > self.selectedDates[0]) self.maxRangeDate = date;
		}

		if (self.config.mode === "range") {
			if (isDateInRange(date) && !isDateSelected(date)) dayElement.classList.add("inRange");

			if (self.selectedDates.length === 1 && (date < self.minRangeDate || date > self.maxRangeDate)) dayElement.classList.add("notAllowed");
		}

		if (self.config.weekNumbers && className !== "prevMonthDay" && dayNumber % 7 === 1) {
			self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" + self.config.getWeek(date) + "</span>");
		}

		triggerEvent("DayCreate", dayElement);

		return dayElement;
	}

	function focusOnDay(currentIndex, offset) {
		var newIndex = currentIndex + offset || 0,
		    targetNode = currentIndex !== undefined ? self.days.childNodes[newIndex] : self.selectedDateElem || self.todayDateElem || self.days.childNodes[0],
		    focus = function focus() {
			targetNode = targetNode || self.days.childNodes[newIndex];
			targetNode.focus();

			if (self.config.mode === "range") onMouseOver(targetNode);
		};

		if (targetNode === undefined && offset !== 0) {
			if (offset > 0) {
				self.changeMonth(1);
				newIndex = newIndex % 42;
			} else if (offset < 0) {
				self.changeMonth(-1);
				newIndex += 42;
			}

			return afterDayAnim(focus);
		}

		focus();
	}

	function afterDayAnim(fn) {
		if (self.config.animate === true) return self._animationLoop.push(fn);
		fn();
	}

	function buildDays(delta) {
		var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7,
		    isRangeMode = self.config.mode === "range";

		self.prevMonthDays = self.utils.getDaysinMonth((self.currentMonth - 1 + 12) % 12);
		self.selectedDateElem = undefined;
		self.todayDateElem = undefined;

		var daysInMonth = self.utils.getDaysinMonth(),
		    days = window.document.createDocumentFragment();

		var dayNumber = self.prevMonthDays + 1 - firstOfMonth,
		    dayIndex = 0;

		if (self.config.weekNumbers && self.weekNumbers.firstChild) self.weekNumbers.textContent = "";

		if (isRangeMode) {
			// const dateLimits = self.config.enable.length || self.config.disable.length || self.config.mixDate || self.config.maxDate;
			self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
			self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
		}

		// prepend days from the ending of previous month
		for (; dayNumber <= self.prevMonthDays; dayNumber++, dayIndex++) {
			days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
		}

		// Start at 1 since there is no 0th day
		for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
			days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
		}

		// append days from the next month
		for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
			days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
		}

		if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
			self._hidePrevMonthArrow = self._hidePrevMonthArrow || self.minRangeDate > days.childNodes[0].dateObj;

			self._hideNextMonthArrow = self._hideNextMonthArrow || self.maxRangeDate < new Date(self.currentYear, self.currentMonth + 1, 1);
		} else updateNavigationCurrentMonth();

		var dayContainer = createElement("div", "dayContainer");
		dayContainer.appendChild(days);

		if (!self.config.animate || delta === undefined) clearNode(self.daysContainer);else {
			while (self.daysContainer.childNodes.length > 1) {
				self.daysContainer.removeChild(self.daysContainer.firstChild);
			}
		}

		if (delta >= 0) self.daysContainer.appendChild(dayContainer);else self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);

		self.days = self.daysContainer.firstChild;
		return self.daysContainer;
	}

	function clearNode(node) {
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}

	function buildMonthNav() {
		var monthNavFragment = window.document.createDocumentFragment();
		self.monthNav = createElement("div", "flatpickr-month");

		self.prevMonthNav = createElement("span", "flatpickr-prev-month");
		self.prevMonthNav.innerHTML = self.config.prevArrow;

		self.currentMonthElement = createElement("span", "cur-month");
		self.currentMonthElement.title = self.l10n.scrollTitle;

		var yearInput = createNumberInput("cur-year");
		self.currentYearElement = yearInput.childNodes[0];
		self.currentYearElement.title = self.l10n.scrollTitle;

		if (self.config.minDate) self.currentYearElement.min = self.config.minDate.getFullYear();

		if (self.config.maxDate) {
			self.currentYearElement.max = self.config.maxDate.getFullYear();

			self.currentYearElement.disabled = self.config.minDate && self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
		}

		self.nextMonthNav = createElement("span", "flatpickr-next-month");
		self.nextMonthNav.innerHTML = self.config.nextArrow;

		self.navigationCurrentMonth = createElement("span", "flatpickr-current-month");
		self.navigationCurrentMonth.appendChild(self.currentMonthElement);
		self.navigationCurrentMonth.appendChild(yearInput);

		monthNavFragment.appendChild(self.prevMonthNav);
		monthNavFragment.appendChild(self.navigationCurrentMonth);
		monthNavFragment.appendChild(self.nextMonthNav);
		self.monthNav.appendChild(monthNavFragment);

		Object.defineProperty(self, "_hidePrevMonthArrow", {
			get: function get() {
				return this.__hidePrevMonthArrow;
			},
			set: function set(bool) {
				if (this.__hidePrevMonthArrow !== bool) self.prevMonthNav.style.display = bool ? "none" : "block";
				this.__hidePrevMonthArrow = bool;
			}
		});

		Object.defineProperty(self, "_hideNextMonthArrow", {
			get: function get() {
				return this.__hideNextMonthArrow;
			},
			set: function set(bool) {
				if (this.__hideNextMonthArrow !== bool) self.nextMonthNav.style.display = bool ? "none" : "block";
				this.__hideNextMonthArrow = bool;
			}
		});

		updateNavigationCurrentMonth();

		return self.monthNav;
	}

	function buildTime() {
		self.calendarContainer.classList.add("hasTime");
		if (self.config.noCalendar) self.calendarContainer.classList.add("noCalendar");
		self.timeContainer = createElement("div", "flatpickr-time");
		self.timeContainer.tabIndex = -1;
		var separator = createElement("span", "flatpickr-time-separator", ":");

		var hourInput = createNumberInput("flatpickr-hour");
		self.hourElement = hourInput.childNodes[0];

		var minuteInput = createNumberInput("flatpickr-minute");
		self.minuteElement = minuteInput.childNodes[0];

		self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;

		self.hourElement.value = self.pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getHours() : self.config.defaultHour);

		self.minuteElement.value = self.pad(self.latestSelectedDateObj ? self.latestSelectedDateObj.getMinutes() : self.config.defaultMinute);

		self.hourElement.step = self.config.hourIncrement;
		self.minuteElement.step = self.config.minuteIncrement;

		self.hourElement.min = self.config.time_24hr ? 0 : 1;
		self.hourElement.max = self.config.time_24hr ? 23 : 12;

		self.minuteElement.min = 0;
		self.minuteElement.max = 59;

		self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;

		self.timeContainer.appendChild(hourInput);
		self.timeContainer.appendChild(separator);
		self.timeContainer.appendChild(minuteInput);

		if (self.config.time_24hr) self.timeContainer.classList.add("time24hr");

		if (self.config.enableSeconds) {
			self.timeContainer.classList.add("hasSeconds");

			var secondInput = createNumberInput("flatpickr-second");
			self.secondElement = secondInput.childNodes[0];

			self.secondElement.value = self.latestSelectedDateObj ? self.pad(self.latestSelectedDateObj.getSeconds()) : "00";

			self.secondElement.step = self.minuteElement.step;
			self.secondElement.min = self.minuteElement.min;
			self.secondElement.max = self.minuteElement.max;

			self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
			self.timeContainer.appendChild(secondInput);
		}

		if (!self.config.time_24hr) {
			// add self.amPM if appropriate
			self.amPM = createElement("span", "flatpickr-am-pm", ["AM", "PM"][self.hourElement.value > 11 | 0]);
			self.amPM.title = self.l10n.toggleTitle;
			self.amPM.tabIndex = -1;
			self.timeContainer.appendChild(self.amPM);
		}

		return self.timeContainer;
	}

	function buildWeekdays() {
		if (!self.weekdayContainer) self.weekdayContainer = createElement("div", "flatpickr-weekdays");

		var firstDayOfWeek = self.l10n.firstDayOfWeek;
		var weekdays = self.l10n.weekdays.shorthand.slice();

		if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
			weekdays = [].concat(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
		}

		self.weekdayContainer.innerHTML = "\n\t\t<span class=flatpickr-weekday>\n\t\t\t" + weekdays.join("</span><span class=flatpickr-weekday>") + "\n\t\t</span>\n\t\t";

		return self.weekdayContainer;
	}

	/* istanbul ignore next */
	function buildWeeks() {
		self.calendarContainer.classList.add("hasWeeks");
		self.weekWrapper = createElement("div", "flatpickr-weekwrapper");
		self.weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
		self.weekNumbers = createElement("div", "flatpickr-weeks");
		self.weekWrapper.appendChild(self.weekNumbers);

		return self.weekWrapper;
	}

	function changeMonth(value, is_offset, animate) {
		is_offset = is_offset === undefined || is_offset;
		var delta = is_offset ? value : value - self.currentMonth;
		var skipAnimations = !self.config.animate || animate === false;

		if (delta < 0 && self._hidePrevMonthArrow || delta > 0 && self._hideNextMonthArrow) return;

		self.currentMonth += delta;

		if (self.currentMonth < 0 || self.currentMonth > 11) {
			self.currentYear += self.currentMonth > 11 ? 1 : -1;
			self.currentMonth = (self.currentMonth + 12) % 12;

			triggerEvent("YearChange");
		}

		buildDays(!skipAnimations ? delta : undefined);

		if (skipAnimations) {
			triggerEvent("MonthChange");
			return updateNavigationCurrentMonth();
		}

		// remove possible remnants from clicking too fast
		var nav = self.navigationCurrentMonth;
		if (delta < 0) {
			while (nav.nextSibling && /curr/.test(nav.nextSibling.className)) {
				self.monthNav.removeChild(nav.nextSibling);
			}
		} else if (delta > 0) {
			while (nav.previousSibling && /curr/.test(nav.previousSibling.className)) {
				self.monthNav.removeChild(nav.previousSibling);
			}
		}

		self.oldCurMonth = self.navigationCurrentMonth;

		self.navigationCurrentMonth = self.monthNav.insertBefore(self.oldCurMonth.cloneNode(true), delta > 0 ? self.oldCurMonth.nextSibling : self.oldCurMonth);

		if (delta > 0) {
			self.daysContainer.firstChild.classList.add("slideLeft");
			self.daysContainer.lastChild.classList.add("slideLeftNew");

			self.oldCurMonth.classList.add("slideLeft");
			self.navigationCurrentMonth.classList.add("slideLeftNew");
		} else if (delta < 0) {
			self.daysContainer.firstChild.classList.add("slideRightNew");
			self.daysContainer.lastChild.classList.add("slideRight");

			self.oldCurMonth.classList.add("slideRight");
			self.navigationCurrentMonth.classList.add("slideRightNew");
		}

		self.currentMonthElement = self.navigationCurrentMonth.firstChild;
		self.currentYearElement = self.navigationCurrentMonth.lastChild.childNodes[0];

		updateNavigationCurrentMonth();
		self.oldCurMonth.firstChild.textContent = self.utils.monthToStr(self.currentMonth - delta);

		triggerEvent("MonthChange");

		if (document.activeElement && document.activeElement.$i) {
			var index = document.activeElement.$i;
			afterDayAnim(function () {
				focusOnDay(index, 0);
			});
		}
	}

	function clear(triggerChangeEvent) {
		self.input.value = "";

		if (self.altInput) self.altInput.value = "";

		if (self.mobileInput) self.mobileInput.value = "";

		self.selectedDates = [];
		self.latestSelectedDateObj = undefined;
		self.showTimeInput = false;

		self.redraw();

		if (triggerChangeEvent !== false)
			// triggerChangeEvent is true (default) or an Event
			triggerEvent("Change");
	}

	function close() {
		self.isOpen = false;

		if (!self.isMobile) {
			self.calendarContainer.classList.remove("open");
			self._input.classList.remove("active");
		}

		triggerEvent("Close");
	}

	function destroy() {
		for (var i = self._handlers.length; i--;) {
			var h = self._handlers[i];
			h.element.removeEventListener(h.event, h.handler);
		}

		self._handlers = [];

		if (self.mobileInput) {
			if (self.mobileInput.parentNode) self.mobileInput.parentNode.removeChild(self.mobileInput);
			self.mobileInput = null;
		} else if (self.calendarContainer && self.calendarContainer.parentNode) self.calendarContainer.parentNode.removeChild(self.calendarContainer);

		if (self.altInput) {
			self.input.type = "text";
			if (self.altInput.parentNode) self.altInput.parentNode.removeChild(self.altInput);
			delete self.altInput;
		}

		if (self.input) {
			self.input.type = self.input._type;
			self.input.classList.remove("flatpickr-input");
			self.input.removeAttribute("readonly");
			self.input.value = "";
		}

		["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function (k) {
			return delete self[k];
		});
	}

	function isCalendarElem(elem) {
		if (self.config.appendTo && self.config.appendTo.contains(elem)) return true;

		return self.calendarContainer.contains(elem);
	}

	function documentClick(e) {
		if (self.isOpen && !self.config.inline) {
			var isCalendarElement = isCalendarElem(e.target);
			var isInput = e.target === self.input || e.target === self.altInput || self.element.contains(e.target) ||
			// web components
			e.path && e.path.indexOf && (~e.path.indexOf(self.input) || ~e.path.indexOf(self.altInput));

			var lostFocus = e.type === "blur" ? isInput && e.relatedTarget && !isCalendarElem(e.relatedTarget) : !isInput && !isCalendarElement;

			if (lostFocus) {
				e.preventDefault();
				self.close();

				if (self.config.mode === "range" && self.selectedDates.length === 1) {
					self.clear(false);
					self.redraw();
				}
			}
		}
	}

	function changeYear(newYear) {
		if (!newYear || self.currentYearElement.min && newYear < self.currentYearElement.min || self.currentYearElement.max && newYear > self.currentYearElement.max) return;

		var newYearNum = parseInt(newYear, 10),
		    isNewYear = self.currentYear !== newYearNum;

		self.currentYear = newYearNum || self.currentYear;

		if (self.config.maxDate && self.currentYear === self.config.maxDate.getFullYear()) {
			self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
		} else if (self.config.minDate && self.currentYear === self.config.minDate.getFullYear()) {
			self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
		}

		if (isNewYear) {
			self.redraw();
			triggerEvent("YearChange");
		}
	}

	function isEnabled(date, timeless) {
		if (self.config.minDate && compareDates(date, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0 || self.config.maxDate && compareDates(date, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0) return false;

		if (!self.config.enable.length && !self.config.disable.length) return true;

		var dateToCheck = self.parseDate(date, null, true); // timeless

		var bool = self.config.enable.length > 0,
		    array = bool ? self.config.enable : self.config.disable;

		for (var i = 0, d; i < array.length; i++) {
			d = array[i];

			if (d instanceof Function && d(dateToCheck)) // disabled by function
				return bool;else if (d instanceof Date && d.getTime() === dateToCheck.getTime())
				// disabled by date
				return bool;else if (typeof d === "string" && self.parseDate(d, null, true).getTime() === dateToCheck.getTime())
				// disabled by date string
				return bool;else if ( // disabled by range
			(typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" && d.from && d.to && dateToCheck >= d.from && dateToCheck <= d.to) return bool;
		}

		return !bool;
	}

	function onKeyDown(e) {
		var isInput = e.target === self._input;
		var calendarElem = isCalendarElem(e.target);
		var allowInput = self.config.allowInput;
		var allowKeydown = self.isOpen && (!allowInput || !isInput);
		var allowInlineKeydown = self.config.inline && isInput && !allowInput;

		if (e.key === "Enter" && allowInput && isInput) {
			self.setDate(self._input.value, true, e.target === self.altInput ? self.config.altFormat : self.config.dateFormat);
			return e.target.blur();
		} else if (calendarElem || allowKeydown || allowInlineKeydown) {
			var isTimeObj = self.timeContainer && self.timeContainer.contains(e.target);
			switch (e.key) {
				case "Enter":
					if (isTimeObj) updateValue();else selectDate(e);

					break;

				case "Escape":
					// escape
					e.preventDefault();
					self.close();
					break;

				case "ArrowLeft":
				case "ArrowRight":
					if (!isTimeObj) {
						e.preventDefault();

						if (self.daysContainer) {
							var _delta = e.key === "ArrowRight" ? 1 : -1;

							if (!e.ctrlKey) focusOnDay(e.target.$i, _delta);else changeMonth(_delta, true);
						} else if (self.config.enableTime && !isTimeObj) self.hourElement.focus();
					}

					break;

				case "ArrowUp":
				case "ArrowDown":
					e.preventDefault();
					var delta = e.key === "ArrowDown" ? 1 : -1;

					if (self.daysContainer) {
						if (e.ctrlKey) {
							changeYear(self.currentYear - delta);
							focusOnDay(e.target.$i, 0);
						} else if (!isTimeObj) focusOnDay(e.target.$i, delta * 7);
					} else if (self.config.enableTime) {
						if (!isTimeObj) self.hourElement.focus();
						updateTime(e);
					}

					break;

				case "Tab":
					if (e.target === self.hourElement) {
						e.preventDefault();
						self.minuteElement.select();
					} else if (e.target === self.minuteElement && (self.secondElement || self.amPM)) {
						e.preventDefault();
						(self.secondElement || self.amPM).focus();
					} else if (e.target === self.secondElement) {
						e.preventDefault();
						self.amPM.focus();
					}

					break;

				case "a":
					if (e.target === self.amPM) {
						self.amPM.textContent = "AM";
						setHoursFromInputs();
						updateValue();
					}
					break;

				case "p":
					if (e.target === self.amPM) {
						self.amPM.textContent = "PM";
						setHoursFromInputs();
						updateValue();
					}
					break;

				default:
					break;

			}

			triggerEvent("KeyDown", e);
		}
	}

	function onMouseOver(elem) {
		if (self.selectedDates.length !== 1 || !elem.classList.contains("flatpickr-day")) return;

		var hoverDate = elem.dateObj,
		    initialDate = self.parseDate(self.selectedDates[0], null, true),
		    rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()),
		    rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()),
		    containsDisabled = false;

		for (var t = rangeStartDate; t < rangeEndDate; t += self.utils.duration.DAY) {
			if (!isEnabled(new Date(t))) {
				containsDisabled = true;
				break;
			}
		}

		var _loop = function _loop(timestamp, i) {
			var outOfRange = timestamp < self.minRangeDate.getTime() || timestamp > self.maxRangeDate.getTime(),
			    dayElem = self.days.childNodes[i];

			if (outOfRange) {
				self.days.childNodes[i].classList.add("notAllowed");
				["inRange", "startRange", "endRange"].forEach(function (c) {
					dayElem.classList.remove(c);
				});
				return "continue";
			} else if (containsDisabled && !outOfRange) return "continue";

			["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
				dayElem.classList.remove(c);
			});

			var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate),
			    maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);

			elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");

			if (initialDate < hoverDate && timestamp === initialDate.getTime()) dayElem.classList.add("startRange");else if (initialDate > hoverDate && timestamp === initialDate.getTime()) dayElem.classList.add("endRange");

			if (timestamp >= minRangeDate && timestamp <= maxRangeDate) dayElem.classList.add("inRange");
		};

		for (var timestamp = self.days.childNodes[0].dateObj.getTime(), i = 0; i < 42; i++, timestamp += self.utils.duration.DAY) {
			var _ret = _loop(timestamp, i);

			if (_ret === "continue") continue;
		}
	}

	function onResize() {
		if (self.isOpen && !self.config.static && !self.config.inline) positionCalendar();
	}

	function open(e) {
		if (self.isMobile) {
			if (e) {
				e.preventDefault();
				e.target.blur();
			}

			setTimeout(function () {
				self.mobileInput.click();
			}, 0);

			triggerEvent("Open");
			return;
		}

		if (self.isOpen || self._input.disabled || self.config.inline) return;

		self.isOpen = true;
		self.calendarContainer.classList.add("open");
		positionCalendar();
		self._input.classList.add("active");

		triggerEvent("Open");
	}

	function minMaxDateSetter(type) {
		return function (date) {
			var dateObj = self.config["_" + type + "Date"] = self.parseDate(date);

			var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
			var isValidDate = date && dateObj instanceof Date;

			if (isValidDate) {
				self[type + "DateHasTime"] = dateObj.getHours() || dateObj.getMinutes() || dateObj.getSeconds();
			}

			if (self.selectedDates) {
				self.selectedDates = self.selectedDates.filter(function (d) {
					return isEnabled(d);
				});
				if (!self.selectedDates.length && type === "min") setHoursFromDate(dateObj);
				updateValue();
			}

			if (self.daysContainer) {
				redraw();

				if (isValidDate) self.currentYearElement[type] = dateObj.getFullYear();else self.currentYearElement.removeAttribute(type);

				self.currentYearElement.disabled = inverseDateObj && dateObj && inverseDateObj.getFullYear() === dateObj.getFullYear();
			}
		};
	}

	function parseConfig() {
		var boolOpts = ["utc", "wrap", "weekNumbers", "allowInput", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"];

		var hooks = ["onChange", "onClose", "onDayCreate", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange"];

		self.config = Object.create(Flatpickr.defaultConfig);

		var userConfig = _extends({}, self.instanceConfig, JSON.parse(JSON.stringify(self.element.dataset || {})));

		self.config.parseDate = userConfig.parseDate;
		self.config.formatDate = userConfig.formatDate;

		_extends(self.config, userConfig);

		if (!userConfig.dateFormat && userConfig.enableTime) {
			self.config.dateFormat = self.config.noCalendar ? "H:i" + (self.config.enableSeconds ? ":S" : "") : Flatpickr.defaultConfig.dateFormat + " H:i" + (self.config.enableSeconds ? ":S" : "");
		}

		if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
			self.config.altFormat = self.config.noCalendar ? "h:i" + (self.config.enableSeconds ? ":S K" : " K") : Flatpickr.defaultConfig.altFormat + (" h:i" + (self.config.enableSeconds ? ":S" : "") + " K");
		}

		Object.defineProperty(self.config, "minDate", {
			get: function get() {
				return this._minDate;
			},
			set: minMaxDateSetter("min")
		});

		Object.defineProperty(self.config, "maxDate", {
			get: function get() {
				return this._maxDate;
			},
			set: minMaxDateSetter("max")
		});

		self.config.minDate = userConfig.minDate;
		self.config.maxDate = userConfig.maxDate;

		for (var i = 0; i < boolOpts.length; i++) {
			self.config[boolOpts[i]] = self.config[boolOpts[i]] === true || self.config[boolOpts[i]] === "true";
		}for (var _i = hooks.length; _i--;) {
			if (self.config[hooks[_i]] !== undefined) {
				self.config[hooks[_i]] = arrayify(self.config[hooks[_i]] || []).map(bindToInstance);
			}
		}

		for (var _i2 = 0; _i2 < self.config.plugins.length; _i2++) {
			var pluginConf = self.config.plugins[_i2](self) || {};
			for (var key in pluginConf) {

				if (self.config[key] instanceof Array || ~hooks.indexOf(key)) {
					self.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self.config[key]);
				} else if (typeof userConfig[key] === "undefined") self.config[key] = pluginConf[key];
			}
		}

		triggerEvent("ParseConfig");
	}

	function setupLocale() {
		if (_typeof(self.config.locale) !== "object" && typeof Flatpickr.l10ns[self.config.locale] === "undefined") console.warn("flatpickr: invalid locale " + self.config.locale);

		self.l10n = _extends(Object.create(Flatpickr.l10ns.default), _typeof(self.config.locale) === "object" ? self.config.locale : self.config.locale !== "default" ? Flatpickr.l10ns[self.config.locale] || {} : {});
	}

	function positionCalendar() {
		if (self.calendarContainer === undefined) return;

		var calendarHeight = self.calendarContainer.offsetHeight,
		    calendarWidth = self.calendarContainer.offsetWidth,
		    configPos = self.config.position,
		    inputBounds = self._positionElement.getBoundingClientRect(),
		    distanceFromBottom = window.innerHeight - inputBounds.bottom,
		    showOnTop = configPos === "above" || configPos !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;

		var top = window.pageYOffset + inputBounds.top + (!showOnTop ? self._positionElement.offsetHeight + 2 : -calendarHeight - 2);

		toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
		toggleClass(self.calendarContainer, "arrowBottom", showOnTop);

		if (self.config.inline) return;

		var left = window.pageXOffset + inputBounds.left;
		var right = window.document.body.offsetWidth - inputBounds.right;
		var rightMost = left + calendarWidth > window.document.body.offsetWidth;

		toggleClass(self.calendarContainer, "rightMost", rightMost);

		if (self.config.static) return;

		self.calendarContainer.style.top = top + "px";

		if (!rightMost) {
			self.calendarContainer.style.left = left + "px";
			self.calendarContainer.style.right = "auto";
		} else {
			self.calendarContainer.style.left = "auto";
			self.calendarContainer.style.right = right + "px";
		}
	}

	function redraw() {
		if (self.config.noCalendar || self.isMobile) return;

		buildWeekdays();
		updateNavigationCurrentMonth();
		buildDays();
	}

	function selectDate(e) {
		e.preventDefault();
		e.stopPropagation();

		if (!e.target.classList.contains("flatpickr-day") || e.target.classList.contains("disabled") || e.target.classList.contains("notAllowed")) return;

		var selectedDate = self.latestSelectedDateObj = new Date(e.target.dateObj.getTime());

		var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth && self.config.mode !== "range";

		self.selectedDateElem = e.target;

		if (self.config.mode === "single") self.selectedDates = [selectedDate];else if (self.config.mode === "multiple") {
			var selectedIndex = isDateSelected(selectedDate);
			if (selectedIndex) self.selectedDates.splice(selectedIndex, 1);else self.selectedDates.push(selectedDate);
		} else if (self.config.mode === "range") {
			if (self.selectedDates.length === 2) self.clear();

			self.selectedDates.push(selectedDate);

			// unless selecting same date twice, sort ascendingly
			if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort(function (a, b) {
				return a.getTime() - b.getTime();
			});
		}

		setHoursFromInputs();

		if (shouldChangeMonth) {
			var isNewYear = self.currentYear !== selectedDate.getFullYear();
			self.currentYear = selectedDate.getFullYear();
			self.currentMonth = selectedDate.getMonth();

			if (isNewYear) triggerEvent("YearChange");

			triggerEvent("MonthChange");
		}

		buildDays();

		if (self.minDateHasTime && self.config.enableTime && compareDates(selectedDate, self.config.minDate) === 0) setHoursFromDate(self.config.minDate);

		updateValue();

		if (self.config.enableTime) setTimeout(function () {
			return self.showTimeInput = true;
		}, 50);

		if (self.config.mode === "range") {
			if (self.selectedDates.length === 1) {
				onMouseOver(e.target);

				self._hidePrevMonthArrow = self._hidePrevMonthArrow || self.minRangeDate > self.days.childNodes[0].dateObj;

				self._hideNextMonthArrow = self._hideNextMonthArrow || self.maxRangeDate < new Date(self.currentYear, self.currentMonth + 1, 1);
			} else updateNavigationCurrentMonth();
		}

		triggerEvent("Change");

		// maintain focus
		if (!shouldChangeMonth) focusOnDay(e.target.$i, 0);else afterDayAnim(function () {
			return self.selectedDateElem.focus();
		});

		if (self.config.enableTime) setTimeout(function () {
			return self.hourElement.select();
		}, 451);

		if (self.config.closeOnSelect) {
			var single = self.config.mode === "single" && !self.config.enableTime;
			var range = self.config.mode === "range" && self.selectedDates.length === 2 && !self.config.enableTime;

			if (single || range) self.close();
		}
	}

	function set(option, value) {
		self.config[option] = value;
		self.redraw();
		jumpToDate();
	}

	function setSelectedDate(inputDate, format) {
		if (inputDate instanceof Array) self.selectedDates = inputDate.map(function (d) {
			return self.parseDate(d, format);
		});else if (inputDate instanceof Date || !isNaN(inputDate)) self.selectedDates = [self.parseDate(inputDate, format)];else if (inputDate && inputDate.substring) {
			switch (self.config.mode) {
				case "single":
					self.selectedDates = [self.parseDate(inputDate, format)];
					break;

				case "multiple":
					self.selectedDates = inputDate.split("; ").map(function (date) {
						return self.parseDate(date, format);
					});
					break;

				case "range":
					self.selectedDates = inputDate.split(self.l10n.rangeSeparator).map(function (date) {
						return self.parseDate(date, format);
					});

					break;

				default:
					break;
			}
		}

		self.selectedDates = self.selectedDates.filter(function (d) {
			return d instanceof Date && isEnabled(d, false);
		});

		self.selectedDates.sort(function (a, b) {
			return a.getTime() - b.getTime();
		});
	}

	function setDate(date, triggerChange, format) {
		if (!date) return self.clear(triggerChange);

		setSelectedDate(date, format);

		self.showTimeInput = self.selectedDates.length > 0;
		self.latestSelectedDateObj = self.selectedDates[0];

		self.redraw();
		jumpToDate();

		setHoursFromDate();
		updateValue(triggerChange);

		if (triggerChange) triggerEvent("Change");
	}

	function setupDates() {
		function parseDateRules(arr) {
			for (var i = arr.length; i--;) {
				if (typeof arr[i] === "string" || +arr[i]) arr[i] = self.parseDate(arr[i], null, true);else if (arr[i] && arr[i].from && arr[i].to) {
					arr[i].from = self.parseDate(arr[i].from);
					arr[i].to = self.parseDate(arr[i].to);
				}
			}

			return arr.filter(function (x) {
				return x;
			}); // remove falsy values
		}

		self.selectedDates = [];
		self.now = new Date();

		if (self.config.disable.length) self.config.disable = parseDateRules(self.config.disable);

		if (self.config.enable.length) self.config.enable = parseDateRules(self.config.enable);

		var preloadedDate = self.config.defaultDate || self.input.value;
		if (preloadedDate) setSelectedDate(preloadedDate, self.config.dateFormat);

		var initialDate = self.selectedDates.length ? self.selectedDates[0] : self.config.minDate && self.config.minDate.getTime() > self.now ? self.config.minDate : self.config.maxDate && self.config.maxDate.getTime() < self.now ? self.config.maxDate : self.now;

		self.currentYear = initialDate.getFullYear();
		self.currentMonth = initialDate.getMonth();

		if (self.selectedDates.length) self.latestSelectedDateObj = self.selectedDates[0];

		self.minDateHasTime = self.config.minDate && (self.config.minDate.getHours() || self.config.minDate.getMinutes() || self.config.minDate.getSeconds());

		self.maxDateHasTime = self.config.maxDate && (self.config.maxDate.getHours() || self.config.maxDate.getMinutes() || self.config.maxDate.getSeconds());

		Object.defineProperty(self, "latestSelectedDateObj", {
			get: function get() {
				return self._selectedDateObj || self.selectedDates[self.selectedDates.length - 1];
			},
			set: function set(date) {
				self._selectedDateObj = date;
			}
		});

		if (!self.isMobile) {
			Object.defineProperty(self, "showTimeInput", {
				get: function get() {
					return self._showTimeInput;
				},
				set: function set(bool) {
					self._showTimeInput = bool;
					if (self.calendarContainer) toggleClass(self.calendarContainer, "showTimeInput", bool);
					positionCalendar();
				}
			});
		}
	}

	function setupHelperFunctions() {
		self.utils = {
			duration: {
				DAY: 86400000
			},
			getDaysinMonth: function getDaysinMonth(month, yr) {
				month = typeof month === "undefined" ? self.currentMonth : month;

				yr = typeof yr === "undefined" ? self.currentYear : yr;

				if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) return 29;

				return self.l10n.daysInMonth[month];
			},
			monthToStr: function monthToStr(monthNumber, shorthand) {
				shorthand = typeof shorthand === "undefined" ? self.config.shorthandCurrentMonth : shorthand;

				return self.l10n.months[(shorthand ? "short" : "long") + "hand"][monthNumber];
			}
		};
	}

	/* istanbul ignore next */
	function setupFormats() {
		["D", "F", "J", "M", "W", "l"].forEach(function (f) {
			self.formats[f] = Flatpickr.prototype.formats[f].bind(self);
		});

		self.revFormat.F = Flatpickr.prototype.revFormat.F.bind(self);
		self.revFormat.M = Flatpickr.prototype.revFormat.M.bind(self);
	}

	function setupInputs() {
		self.input = self.config.wrap ? self.element.querySelector("[data-input]") : self.element;

		/* istanbul ignore next */
		if (!self.input) return console.warn("Error: invalid input element specified", self.input);

		self.input._type = self.input.type;
		self.input.type = "text";

		self.input.classList.add("flatpickr-input");
		self._input = self.input;

		if (self.config.altInput) {
			// replicate self.element
			self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
			self._input = self.altInput;
			self.altInput.placeholder = self.input.placeholder;
			self.altInput.disabled = self.input.disabled;
			self.altInput.type = "text";
			self.input.type = "hidden";

			if (!self.config.static && self.input.parentNode) self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
		}

		if (!self.config.allowInput) self._input.setAttribute("readonly", "readonly");

		self._positionElement = self.config.positionElement || self._input;
	}

	function setupMobile() {
		var inputType = self.config.enableTime ? self.config.noCalendar ? "time" : "datetime-local" : "date";

		self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
		self.mobileInput.step = "any";
		self.mobileInput.tabIndex = 1;
		self.mobileInput.type = inputType;
		self.mobileInput.disabled = self.input.disabled;
		self.mobileInput.placeholder = self.input.placeholder;

		self.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";

		if (self.selectedDates.length) {
			self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
		}

		if (self.config.minDate) self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");

		if (self.config.maxDate) self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");

		self.input.type = "hidden";
		if (self.config.altInput) self.altInput.type = "hidden";

		try {
			self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
		} catch (e) {
			//
		}

		self.mobileInput.addEventListener("change", function (e) {
			self.setDate(e.target.value, false, self.mobileFormatStr);
			triggerEvent("Change");
			triggerEvent("Close");
		});
	}

	function toggle() {
		if (self.isOpen) return self.close();
		self.open();
	}

	function triggerEvent(event, data) {
		var hooks = self.config["on" + event];

		if (hooks !== undefined && hooks.length > 0) {
			for (var i = 0; hooks[i] && i < hooks.length; i++) {
				hooks[i](self.selectedDates, self.input.value, self, data);
			}
		}

		if (event === "Change") {
			self.input.dispatchEvent(createEvent("change"));

			// many front-end frameworks bind to the input event
			self.input.dispatchEvent(createEvent("input"));
		}
	}

	/**
  * Creates an Event, normalized across browsers
  * @param {String} name the event name, e.g. "click"
  * @return {Event} the created event
  */
	function createEvent(name) {
		if (self._supportsEvents) return new Event(name, { bubbles: true });

		self._[name + "Event"] = document.createEvent("Event");
		self._[name + "Event"].initEvent(name, true, true);
		return self._[name + "Event"];
	}

	function isDateSelected(date) {
		for (var i = 0; i < self.selectedDates.length; i++) {
			if (compareDates(self.selectedDates[i], date) === 0) return "" + i;
		}

		return false;
	}

	function isDateInRange(date) {
		if (self.config.mode !== "range" || self.selectedDates.length < 2) return false;
		return compareDates(date, self.selectedDates[0]) >= 0 && compareDates(date, self.selectedDates[1]) <= 0;
	}

	function updateNavigationCurrentMonth() {
		if (self.config.noCalendar || self.isMobile || !self.monthNav) return;

		self.currentMonthElement.textContent = self.utils.monthToStr(self.currentMonth) + " ";
		self.currentYearElement.value = self.currentYear;

		self._hidePrevMonthArrow = self.config.minDate && (self.currentYear === self.config.minDate.getFullYear() ? self.currentMonth <= self.config.minDate.getMonth() : self.currentYear < self.config.minDate.getFullYear());

		self._hideNextMonthArrow = self.config.maxDate && (self.currentYear === self.config.maxDate.getFullYear() ? self.currentMonth + 1 > self.config.maxDate.getMonth() : self.currentYear > self.config.maxDate.getFullYear());
	}

	/**
  * Updates the values of inputs associated with the calendar
  * @return {void}
  */
	function updateValue(triggerChange) {
		if (!self.selectedDates.length) return self.clear(triggerChange);

		if (self.isMobile) {
			self.mobileInput.value = self.selectedDates.length ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr) : "";
		}

		var joinChar = self.config.mode !== "range" ? "; " : self.l10n.rangeSeparator;

		self.input.value = self.selectedDates.map(function (dObj) {
			return self.formatDate(dObj, self.config.dateFormat);
		}).join(joinChar);

		if (self.config.altInput) {
			self.altInput.value = self.selectedDates.map(function (dObj) {
				return self.formatDate(dObj, self.config.altFormat);
			}).join(joinChar);
		}
		triggerEvent("ValueUpdate");
	}

	function mouseDelta(e) {
		return Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
	}

	function onMonthNavScroll(e) {
		e.preventDefault();
		var isYear = self.currentYearElement.parentNode.contains(e.target);

		if (e.target === self.currentMonthElement || isYear) {

			var delta = mouseDelta(e);

			if (isYear) {
				changeYear(self.currentYear + delta);
				e.target.value = self.currentYear;
			} else self.changeMonth(delta, true, false);
		}
	}

	function onMonthNavClick(e) {
		var isPrevMonth = self.prevMonthNav.contains(e.target);
		var isNextMonth = self.nextMonthNav.contains(e.target);

		if (isPrevMonth || isNextMonth) changeMonth(isPrevMonth ? -1 : 1);else if (e.target === self.currentYearElement) {
			e.preventDefault();
			self.currentYearElement.select();
		} else if (e.target.className === "arrowUp") self.changeYear(self.currentYear + 1);else if (e.target.className === "arrowDown") self.changeYear(self.currentYear - 1);
	}

	/**
  * Creates an HTMLElement with given tag, class, and textual content
  * @param {String} tag the HTML tag
  * @param {String} className the new element's class name
  * @param {String} content The new element's text content
  * @return {HTMLElement} the created HTML element
  */
	function createElement(tag, className, content) {
		var e = window.document.createElement(tag);
		className = className || "";
		content = content || "";

		e.className = className;

		if (content !== undefined) e.textContent = content;

		return e;
	}

	function arrayify(obj) {
		if (obj instanceof Array) return obj;
		return [obj];
	}

	function toggleClass(elem, className, bool) {
		if (bool) return elem.classList.add(className);
		elem.classList.remove(className);
	}

	/* istanbul ignore next */
	function debounce(func, wait, immediate) {
		var timeout = void 0;
		return function () {
			var context = this,
			    args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			}, wait);
			if (immediate && !timeout) func.apply(context, args);
		};
	}

	/**
  * Compute the difference in dates, measured in ms
  * @param {Date} date1
  * @param {Date} date2
  * @param {Boolean} timeless whether to reset times of both dates to 00:00
  * @return {Number} the difference in ms
  */
	function compareDates(date1, date2, timeless) {
		if (!(date1 instanceof Date) || !(date2 instanceof Date)) return false;

		if (timeless !== false) {
			return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
		}

		return date1.getTime() - date2.getTime();
	}

	function timeWrapper(e) {
		e.preventDefault();

		var isKeyDown = e.type === "keydown",
		    isWheel = e.type === "wheel",
		    isIncrement = e.type === "increment",
		    input = e.target;

		if (self.amPM && e.target === self.amPM) return e.target.textContent = ["AM", "PM"][e.target.textContent === "AM" | 0];

		var min = Number(input.min),
		    max = Number(input.max),
		    step = Number(input.step),
		    curValue = parseInt(input.value, 10),
		    delta = e.delta || (!isKeyDown ? Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) || 0 : e.which === 38 ? 1 : -1);

		var newValue = curValue + step * delta;

		if (typeof input.value !== "undefined" && input.value.length === 2) {
			var isHourElem = input === self.hourElement,
			    isMinuteElem = input === self.minuteElement;

			if (newValue < min) {
				newValue = max + newValue + !isHourElem + (isHourElem && !self.amPM);

				if (isMinuteElem) incrementNumInput(null, -1, self.hourElement);
			} else if (newValue > max) {
				newValue = input === self.hourElement ? newValue - max - !self.amPM : min;

				if (isMinuteElem) incrementNumInput(null, 1, self.hourElement);
			}

			if (self.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) self.amPM.textContent = self.amPM.textContent === "PM" ? "AM" : "PM";

			input.value = self.pad(newValue);
		}
	}

	init();
	return self;
}

/* istanbul ignore next */
Flatpickr.defaultConfig = {
	mode: "single",

	position: "auto",

	animate: window.navigator.userAgent.indexOf("MSIE") === -1,

	/* if true, dates will be parsed, formatted, and displayed in UTC.
 preloading date strings w/ timezones is recommended but not necessary */
	utc: false,

	// wrap: see https://chmln.github.io/flatpickr/examples/#flatpickr-external-elements
	wrap: false,

	// enables week numbers
	weekNumbers: false,

	// allow manual datetime input
	allowInput: false,

	/*
 	clicking on input opens the date(time)picker.
 	disable if you wish to open the calendar manually with .open()
 */
	clickOpens: true,

	/*
 	closes calendar after date selection,
 	unless 'mode' is 'multiple' or enableTime is true
 */
	closeOnSelect: true,

	// display time picker in 24 hour mode
	time_24hr: false,

	// enables the time picker functionality
	enableTime: false,

	// noCalendar: true will hide the calendar. use for a time picker along w/ enableTime
	noCalendar: false,

	// more date format chars at https://chmln.github.io/flatpickr/#dateformat
	dateFormat: "Y-m-d",

	// date format used in aria-label for days
	ariaDateFormat: "F j, Y",

	// altInput - see https://chmln.github.io/flatpickr/#altinput
	altInput: false,

	// the created altInput element will have this class.
	altInputClass: "form-control input",

	// same as dateFormat, but for altInput
	altFormat: "F j, Y", // defaults to e.g. June 10, 2016

	// defaultDate - either a datestring or a date object. used for datetimepicker"s initial value
	defaultDate: null,

	// the minimum date that user can pick (inclusive)
	minDate: null,

	// the maximum date that user can pick (inclusive)
	maxDate: null,

	// dateparser that transforms a given string to a date object
	parseDate: null,

	// dateformatter that transforms a given date object to a string, according to passed format
	formatDate: null,

	getWeek: function getWeek(givenDate) {
		var date = new Date(givenDate.getTime());
		var onejan = new Date(date.getFullYear(), 0, 1);
		return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
	},


	// see https://chmln.github.io/flatpickr/#disable
	enable: [],

	// see https://chmln.github.io/flatpickr/#disable
	disable: [],

	// display the short version of month names - e.g. Sep instead of September
	shorthandCurrentMonth: false,

	// displays calendar inline. see https://chmln.github.io/flatpickr/#inline-calendar
	inline: false,

	// position calendar inside wrapper and next to the input element
	// leave at false unless you know what you"re doing
	"static": false,

	// DOM node to append the calendar to in *static* mode
	appendTo: null,

	// code for previous/next icons. this is where you put your custom icon code e.g. fontawesome
	prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
	nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",

	// enables seconds in the time picker
	enableSeconds: false,

	// step size used when scrolling/incrementing the hour element
	hourIncrement: 1,

	// step size used when scrolling/incrementing the minute element
	minuteIncrement: 5,

	// initial value in the hour element
	defaultHour: 12,

	// initial value in the minute element
	defaultMinute: 0,

	// disable native mobile datetime input support
	disableMobile: false,

	// default locale
	locale: "default",

	plugins: [],

	// called every time calendar is closed
	onClose: undefined, // function (dateObj, dateStr) {}

	// onChange callback when user selects a date or time
	onChange: undefined, // function (dateObj, dateStr) {}

	// called for every day element
	onDayCreate: undefined,

	// called every time the month is changed
	onMonthChange: undefined,

	// called every time calendar is opened
	onOpen: undefined, // function (dateObj, dateStr) {}

	// called after the configuration has been parsed
	onParseConfig: undefined,

	// called after calendar is ready
	onReady: undefined, // function (dateObj, dateStr) {}

	// called after input value updated
	onValueUpdate: undefined,

	// called every time the year is changed
	onYearChange: undefined,

	onKeyDown: undefined
};

/* istanbul ignore next */
Flatpickr.l10ns = {
	en: {
		weekdays: {
			shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		},
		months: {
			shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		},
		daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		firstDayOfWeek: 0,
		ordinal: function ordinal(nth) {
			var s = nth % 100;
			if (s > 3 && s < 21) return "th";
			switch (s % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		},
		rangeSeparator: " to ",
		weekAbbreviation: "Wk",
		scrollTitle: "Scroll to increment",
		toggleTitle: "Click to toggle"
	}
};

Flatpickr.l10ns.default = Object.create(Flatpickr.l10ns.en);
Flatpickr.localize = function (l10n) {
	return _extends(Flatpickr.l10ns.default, l10n || {});
};
Flatpickr.setDefaults = function (config) {
	return _extends(Flatpickr.defaultConfig, config || {});
};

Flatpickr.prototype = {
	formats: {
		// get the date in UTC
		Z: function Z(date) {
			return date.toISOString();
		},

		// weekday name, short, e.g. Thu
		D: function D(date) {
			return this.l10n.weekdays.shorthand[this.formats.w(date)];
		},

		// full month name e.g. January
		F: function F(date) {
			return this.utils.monthToStr(this.formats.n(date) - 1, false);
		},

		// padded hour 1-12
		G: function G(date) {
			return Flatpickr.prototype.pad(Flatpickr.prototype.formats.h(date));
		},

		// hours with leading zero e.g. 03
		H: function H(date) {
			return Flatpickr.prototype.pad(date.getHours());
		},

		// day (1-30) with ordinal suffix e.g. 1st, 2nd
		J: function J(date) {
			return date.getDate() + this.l10n.ordinal(date.getDate());
		},

		// AM/PM
		K: function K(date) {
			return date.getHours() > 11 ? "PM" : "AM";
		},

		// shorthand month e.g. Jan, Sep, Oct, etc
		M: function M(date) {
			return this.utils.monthToStr(date.getMonth(), true);
		},

		// seconds 00-59
		S: function S(date) {
			return Flatpickr.prototype.pad(date.getSeconds());
		},

		// unix timestamp
		U: function U(date) {
			return date.getTime() / 1000;
		},

		W: function W(date) {
			return this.config.getWeek(date);
		},

		// full year e.g. 2016
		Y: function Y(date) {
			return date.getFullYear();
		},

		// day in month, padded (01-30)
		d: function d(date) {
			return Flatpickr.prototype.pad(date.getDate());
		},

		// hour from 1-12 (am/pm)
		h: function h(date) {
			return date.getHours() % 12 ? date.getHours() % 12 : 12;
		},

		// minutes, padded with leading zero e.g. 09
		i: function i(date) {
			return Flatpickr.prototype.pad(date.getMinutes());
		},

		// day in month (1-30)
		j: function j(date) {
			return date.getDate();
		},

		// weekday name, full, e.g. Thursday
		l: function l(date) {
			return this.l10n.weekdays.longhand[date.getDay()];
		},

		// padded month number (01-12)
		m: function m(date) {
			return Flatpickr.prototype.pad(date.getMonth() + 1);
		},

		// the month number (1-12)
		n: function n(date) {
			return date.getMonth() + 1;
		},

		// seconds 0-59
		s: function s(date) {
			return date.getSeconds();
		},

		// number of the day of the week
		w: function w(date) {
			return date.getDay();
		},

		// last two digits of year e.g. 16 for 2016
		y: function y(date) {
			return String(date.getFullYear()).substring(2);
		}
	},

	/**
  * Formats a given Date object into a string based on supplied format
  * @param {Date} dateObj the date object
  * @param {String} frmt a string composed of formatting tokens e.g. "Y-m-d"
  * @return {String} The textual representation of the date e.g. 2017-02-03
  */
	formatDate: function formatDate(dateObj, frmt) {
		var _this = this;

		if (this.config !== undefined && this.config.formatDate !== undefined) return this.config.formatDate(dateObj, frmt);

		return frmt.split("").map(function (c, i, arr) {
			return _this.formats[c] && arr[i - 1] !== "\\" ? _this.formats[c](dateObj) : c !== "\\" ? c : "";
		}).join("");
	},


	revFormat: {
		D: function D() {},
		F: function F(dateObj, monthName) {
			dateObj.setMonth(this.l10n.months.longhand.indexOf(monthName));
		},
		G: function G(dateObj, hour) {
			dateObj.setHours(parseFloat(hour));
		},
		H: function H(dateObj, hour) {
			dateObj.setHours(parseFloat(hour));
		},
		J: function J(dateObj, day) {
			dateObj.setDate(parseFloat(day));
		},
		K: function K(dateObj, amPM) {
			var hours = dateObj.getHours();

			if (hours !== 12) dateObj.setHours(hours % 12 + 12 * /pm/i.test(amPM));
		},
		M: function M(dateObj, shortMonth) {
			dateObj.setMonth(this.l10n.months.shorthand.indexOf(shortMonth));
		},
		S: function S(dateObj, seconds) {
			dateObj.setSeconds(seconds);
		},
		U: function U(dateObj, unixSeconds) {
			return new Date(parseFloat(unixSeconds) * 1000);
		},

		W: function W(dateObj, weekNumber) {
			weekNumber = parseInt(weekNumber);
			return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0, 0);
		},
		Y: function Y(dateObj, year) {
			dateObj.setFullYear(year);
		},
		Z: function Z(dateObj, ISODate) {
			return new Date(ISODate);
		},

		d: function d(dateObj, day) {
			dateObj.setDate(parseFloat(day));
		},
		h: function h(dateObj, hour) {
			dateObj.setHours(parseFloat(hour));
		},
		i: function i(dateObj, minutes) {
			dateObj.setMinutes(parseFloat(minutes));
		},
		j: function j(dateObj, day) {
			dateObj.setDate(parseFloat(day));
		},
		l: function l() {},
		m: function m(dateObj, month) {
			dateObj.setMonth(parseFloat(month) - 1);
		},
		n: function n(dateObj, month) {
			dateObj.setMonth(parseFloat(month) - 1);
		},
		s: function s(dateObj, seconds) {
			dateObj.setSeconds(parseFloat(seconds));
		},
		w: function w() {},
		y: function y(dateObj, year) {
			dateObj.setFullYear(2000 + parseFloat(year));
		}
	},

	tokenRegex: {
		D: "(\\w+)",
		F: "(\\w+)",
		G: "(\\d\\d|\\d)",
		H: "(\\d\\d|\\d)",
		J: "(\\d\\d|\\d)\\w+",
		K: "(\\w+)",
		M: "(\\w+)",
		S: "(\\d\\d|\\d)",
		U: "(.+)",
		W: "(\\d\\d|\\d)",
		Y: "(\\d{4})",
		Z: "(.+)",
		d: "(\\d\\d|\\d)",
		h: "(\\d\\d|\\d)",
		i: "(\\d\\d|\\d)",
		j: "(\\d\\d|\\d)",
		l: "(\\w+)",
		m: "(\\d\\d|\\d)",
		n: "(\\d\\d|\\d)",
		s: "(\\d\\d|\\d)",
		w: "(\\d\\d|\\d)",
		y: "(\\d{2})"
	},

	pad: function pad(number) {
		return ("0" + number).slice(-2);
	},

	/**
  * Parses a date(+time) string into a Date object
  * @param {String} date the date string, e.g. 2017-02-03 14:45
  * @param {String} givenFormat the date format, e.g. Y-m-d H:i
  * @param {Boolean} timeless whether to reset the time of Date object
  * @return {Date} the parsed Date object
  */
	parseDate: function parseDate(date, givenFormat, timeless) {
		if (!date) return null;

		var date_orig = date;

		if (date instanceof Date) {
			date = new Date(date.getTime()); // create a copy
			date.fp_isUTC = date_orig.fp_isUTC;
		} else if (date.toFixed !== undefined) // timestamp
			date = new Date(date);else {
			// date string
			var format = givenFormat || (this.config || Flatpickr.defaultConfig).dateFormat;
			date = String(date).trim();

			if (date === "today") {
				date = new Date();
				timeless = true;
			} else if (/Z$/.test(date) || /GMT$/.test(date)) // datestrings w/ timezone
				date = new Date(date);else if (this.config && this.config.parseDate) date = this.config.parseDate(date, format);else {
				var parsedDate = !this.config || !this.config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));

				var matched = void 0;

				for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
					var token = format[i];
					var isBackSlash = token === "\\";
					var escaped = format[i - 1] === "\\" || isBackSlash;

					if (this.tokenRegex[token] && !escaped) {
						regexStr += this.tokenRegex[token];
						var match = new RegExp(regexStr).exec(date);
						if (match && (matched = true)) {
							parsedDate = this.revFormat[token](parsedDate, match[++matchIndex]) || parsedDate;
						}
					} else if (!isBackSlash) regexStr += "."; // don't really care
				}

				date = matched ? parsedDate : null;
			}
		}

		/* istanbul ignore next */
		if (!(date instanceof Date)) {
			console.warn("flatpickr: invalid date " + date_orig);
			console.info(this.element);
			return null;
		}

		if (this.config && this.config.utc && !date.fp_isUTC) date = date.fp_toUTC();

		if (timeless === true) date.setHours(0, 0, 0, 0);

		return date;
	}
};

/* istanbul ignore next */
function _flatpickr(nodeList, config) {
	var nodes = Array.prototype.slice.call(nodeList); // static list
	var instances = [];
	for (var i = 0; i < nodes.length; i++) {
		try {
			nodes[i]._flatpickr = new Flatpickr(nodes[i], config || {});
			instances.push(nodes[i]._flatpickr);
		} catch (e) {
			console.warn(e, e.stack);
		}
	}

	return instances.length === 1 ? instances[0] : instances;
}

/* istanbul ignore next */
if (typeof HTMLElement !== "undefined") {
	// browser env
	HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
		return _flatpickr(this, config);
	};

	HTMLElement.prototype.flatpickr = function (config) {
		return _flatpickr([this], config);
	};
}

/* istanbul ignore next */
if (typeof jQuery !== "undefined") {
	jQuery.fn.flatpickr = function (config) {
		return _flatpickr(this, config);
	};
}

Date.prototype.fp_incr = function (days) {
	return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(days, 10));
};

Date.prototype.fp_isUTC = false;
Date.prototype.fp_toUTC = function () {
	var newDate = new Date(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds());

	newDate.fp_isUTC = true;
	return newDate;
};

module.exports = Flatpickr;
});

/* eslint no-underscore-dangle: [2, { "allow": ["_input", "_updateClassNames", "_updateInputFields"], "allowAfterThis": true }] */

// `this.options` create-component mix-in creates prototype chain
// so that `options` given in constructor argument wins over the one defined in static `options` property
// 'Flatpickr' wants flat structure of object instead

function flattenOptions(options) {
  var o = {};
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (var key in options) {
    o[key] = options[key];
  }
  return o;
}

/**
 * Augments Flatpickr instance so that event objects Flatpickr fires is marked as non-user-triggered events.
 * @param {Flatpickr} calendar The Flatpickr instance.
 * @returns {Flatpickr} The augmented Flatpickr instance.
 * @private
 */
function augmentFlatpickr(calendar) {
  var container = calendar._;
  if (container) {
    if (container.changeEvent) {
      container._changeEvent = container.changeEvent; // eslint-disable-line no-underscore-dangle
    }
    Object.defineProperty(container, 'changeEvent', {
      get: function get$$1() {
        return this._changeEvent;
      },
      set: function set$$1(value) {
        value.detail = Object.assign(value.detail || {}, { fromFlatpickr: true });
        this._changeEvent = value;
      }
    });
  }
  return calendar;
}

// Weekdays shorthand for english locale
flatpickr_1$1.l10ns.en.weekdays.shorthand.forEach(function (day, index) {
  var currentDay = flatpickr_1$1.l10ns.en.weekdays.shorthand;
  if (currentDay[index] === 'Thu' || currentDay[index] === 'Th') {
    currentDay[index] = 'Th';
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

var DatePicker = function (_mixin) {
  inherits(DatePicker, _mixin);

  /**
   * DatePicker.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as an date picker.
   */
  function DatePicker(element, options) {
    classCallCheck(this, DatePicker);

    var _this = possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, element, options));

    _initialiseProps$2.call(_this);

    var type = _this.element.getAttribute(_this.options.attribType);
    _this.calendar = _this._initDatePicker(type);
    _this.manage(on(_this.element, 'keydown', function (e) {
      if (e.which === 40) {
        _this.calendar.calendarContainer.focus();
      }
    }));
    _this.manage(on(_this.calendar.calendarContainer, 'keydown', function (e) {
      if (e.which === 9 && type === 'range') {
        _this._updateClassNames(_this.calendar);
        _this.element.querySelector(_this.options.selectorDatePickerInputFrom).focus();
      }
    }));
    return _this;
  }

  /**
   * Opens the date picker dropdown when this component gets focus.
   * Used only for range mode for now.
   * @private
   */


  /**
   * Closes the date picker dropdown when this component loses focus.
   * Used only for range mode for now.
   * @private
   */


  createClass(DatePicker, [{
    key: '_rightArrowHTML',
    value: function _rightArrowHTML() {
      return '\n      <svg width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">\n        <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z"></path>\n      </svg>';
    }
  }, {
    key: '_leftArrowHTML',
    value: function _leftArrowHTML() {
      return '\n      <svg width="8" height="12" viewBox="0 0 8 12" fill-rule="evenodd">\n        <path d="M7.5 10.6L2.8 6l4.7-4.6L6.1 0 0 6l6.1 6z"></path>\n      </svg>';
    }
  }, {
    key: 'release',
    value: function release() {
      if (this._rangeInput && this._rangeInput.parentNode) {
        this._rangeInput.parentNode.removeChild(this._rangeInput);
      }
      if (this.calendar) {
        try {
          this.calendar.destroy();
        } catch (err) {} // eslint-disable-line no-empty
        this.calendar = null;
      }
      return get(DatePicker.prototype.__proto__ || Object.getPrototypeOf(DatePicker.prototype), 'release', this).call(this);
    }

    /**
     * The component options.
     * If `options` is specified in the constructor,
     * {@linkcode DatePicker.create .create()}, or {@linkcode DatePicker.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode DatePicker.init .init()} works.
     * @property {string} selectorInit The CSS selector to find date picker UIs.
     */

  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-date-picker]',
        selectorDatePickerInput: '[data-date-picker-input]',
        selectorDatePickerInputFrom: '[data-date-picker-input-from]',
        selectorDatePickerInputTo: '[data-date-picker-input-to]',
        selectorDatePickerIcon: '[data-date-picker-icon]',
        classCalendarContainer: prefix + '--date-picker__calendar',
        classMonth: prefix + '--date-picker__month',
        classWeekdays: prefix + '--date-picker__weekdays',
        classDays: prefix + '--date-picker__days',
        classWeekday: prefix + '--date-picker__weekday',
        classDay: prefix + '--date-picker__day',
        classFocused: prefix + '--focused',
        classVisuallyHidden: 'bx--visually-hidden',
        attribType: 'data-date-picker-type',
        dateFormat: 'm/d/Y'
      };
    }

    /**
     * The map associating DOM element and date picker UI instance.
     * @type {WeakMap}
     */

  }]);
  return DatePicker;
}(mixin(createComponent, initComponentBySearch, handles));

DatePicker.components = new WeakMap();

var _initialiseProps$2 = function _initialiseProps() {
  var _this2 = this;

  this._handleFocus = function () {
    if (_this2.calendar) {
      _this2.calendar.open();
    }
  };

  this._handleBlur = function (event) {
    if (_this2.calendar) {
      var focusTo = event.relatedTarget;
      if (!focusTo || !_this2.element.contains(focusTo) && !_this2.calendar.calendarContainer.contains(focusTo)) {
        _this2.calendar.close();
      }
    }
  };

  this._initDatePicker = function (type) {
    if (type === 'range') {
      // Given FlatPickr assumes one `<input>` even in range mode,
      // use a hidden `<input>` for such purpose, separate from our from/to `<input>`s
      var doc = _this2.element.ownerDocument;
      var rangeInput = doc.createElement('input');
      rangeInput.className = _this2.options.classVisuallyHidden;
      rangeInput.setAttribute('aria-hidden', 'true');
      doc.body.appendChild(rangeInput);
      _this2._rangeInput = rangeInput;

      // An attempt to open the date picker dropdown when this component gets focus,
      // and close the date picker dropdown when this component loses focus
      var w = doc.defaultView;
      var hasFocusin = 'onfocusin' in w;
      var hasFocusout = 'onfocusout' in w;
      var focusinEventName = hasFocusin ? 'focusin' : 'focus';
      var focusoutEventName = hasFocusout ? 'focusout' : 'blur';
      _this2.manage(on(_this2.element, focusinEventName, _this2._handleFocus, !hasFocusin));
      _this2.manage(on(_this2.element, focusoutEventName, _this2._handleBlur, !hasFocusout));
      _this2.manage(on(_this2.element.querySelector(_this2.options.selectorDatePickerIcon), focusoutEventName, _this2._handleBlur, !hasFocusout));

      // An attempt to disable Flatpickr's focus tracking system,
      // which has adverse effect with our old set up with two `<input>`s or our latest setup with a hidden `<input>`
      _this2.manage(on(doc, 'mousedown', function () {
        if (_this2.calendar.isOpen) {
          _this2.calendar.config.inline = true;
          setTimeout(function () {
            _this2.calendar.config.inline = false;
          }, 0);
        }
      }));
    }
    var self = _this2;
    var date = type === 'range' ? _this2._rangeInput : _this2.element.querySelector(_this2.options.selectorDatePickerInput);
    var _options = _this2.options,
        _onClose = _options.onClose,
        _onChange = _options.onChange,
        _onMonthChange = _options.onMonthChange,
        _onYearChange = _options.onYearChange,
        _onOpen = _options.onOpen,
        _onValueUpdate = _options.onValueUpdate;

    var calendar = new flatpickr_1$1(date, Object.assign(flattenOptions(_this2.options), {
      allowInput: true,
      mode: type,
      positionElement: type === 'range' && _this2.element.querySelector(_this2.options.selectorDatePickerInputFrom),
      onClose: function onClose(selectedDates) {
        for (var _len = arguments.length, remainder = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          remainder[_key - 1] = arguments[_key];
        }

        if (!_onClose || _onClose.call.apply(_onClose, [this, selectedDates].concat(toConsumableArray(remainder))) !== false) {
          self._updateClassNames(calendar);
          self._updateInputFields(selectedDates, type);
        }
      },
      onChange: function onChange() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        if (!_onChange || _onChange.call.apply(_onChange, [this].concat(toConsumableArray(args))) !== false) {
          self._updateClassNames(calendar);
          if (type === 'range') {
            if (calendar.selectedDates.length === 1 && calendar.isOpen) {
              self.element.querySelector(self.options.selectorDatePickerInputTo).classList.add(self.options.classFocused);
            } else {
              self.element.querySelector(self.options.selectorDatePickerInputTo).classList.remove(self.options.classFocused);
            }
          }
        }
      },
      onMonthChange: function onMonthChange() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        if (!_onMonthChange || _onMonthChange.call.apply(_onMonthChange, [this].concat(toConsumableArray(args))) !== false) {
          self._updateClassNames(calendar);
        }
      },
      onYearChange: function onYearChange() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        if (!_onYearChange || _onYearChange.call.apply(_onYearChange, [this].concat(toConsumableArray(args))) !== false) {
          self._updateClassNames(calendar);
        }
      },
      onOpen: function onOpen() {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        if (!_onOpen || _onOpen.call.apply(_onOpen, [this].concat(toConsumableArray(args))) !== false) {
          self._updateClassNames(calendar);
        }
      },
      onValueUpdate: function onValueUpdate() {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        if ((!_onValueUpdate || _onValueUpdate.call.apply(_onValueUpdate, [this].concat(toConsumableArray(args))) !== false) && type === 'range') {
          self._updateInputFields(self.calendar.selectedDates, type);
        }
      },

      nextArrow: _this2._rightArrowHTML(),
      prevArrow: _this2._leftArrowHTML()
    }));
    if (type === 'range') {
      _this2._addInputLogic(_this2.element.querySelector(_this2.options.selectorDatePickerInputFrom), 0);
      _this2._addInputLogic(_this2.element.querySelector(_this2.options.selectorDatePickerInputTo), 1);
    }
    _this2.manage(on(_this2.element.querySelector(_this2.options.selectorDatePickerIcon), 'click', function () {
      calendar.open();
    }));
    _this2._updateClassNames(calendar);
    if (type !== 'range') {
      _this2._addInputLogic(date);
    }
    return augmentFlatpickr(calendar);
  };

  this._addInputLogic = function (input, index) {
    if (!isNaN(index) && (index < 0 || index > 1)) {
      throw new RangeError('The index of <input> (' + index + ') is out of range.');
    }
    var inputField = input;
    _this2.manage(on(inputField, 'change', function (evt) {
      if (!evt.detail || !evt.detail.fromFlatpickr) {
        var inputDate = _this2.calendar.parseDate(inputField.value);
        if (inputDate && !isNaN(inputDate.valueOf())) {
          if (isNaN(index)) {
            _this2.calendar.setDate(inputDate);
          } else {
            var selectedDates = _this2.calendar.selectedDates;
            selectedDates[index] = inputDate;
            _this2.calendar.setDate(selectedDates);
          }
        }
      }
      _this2._updateClassNames(_this2.calendar);
    }));
    // An attempt to temporarily set the `<input>` being edited as the one FlatPicker manages,
    // as FlatPicker attempts to take over `keydown` event handler on `document` to run on the date picker dropdown.
    _this2.manage(on(inputField, 'keydown', function (evt) {
      var origInput = _this2.calendar._input;
      _this2.calendar._input = evt.target;
      setTimeout(function () {
        _this2.calendar._input = origInput;
      });
    }));
  };

  this._updateClassNames = function (calendar) {
    var calendarContainer = calendar.calendarContainer;
    calendarContainer.classList.add(_this2.options.classCalendarContainer);
    calendarContainer.querySelector('.flatpickr-month').classList.add(_this2.options.classMonth);
    calendarContainer.querySelector('.flatpickr-weekdays').classList.add(_this2.options.classWeekdays);
    calendarContainer.querySelector('.flatpickr-days').classList.add(_this2.options.classDays);
    [].concat(toConsumableArray(calendarContainer.querySelectorAll('.flatpickr-weekday'))).forEach(function (item) {
      var currentItem = item;
      currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, '');
      currentItem.classList.add(_this2.options.classWeekday);
    });
    [].concat(toConsumableArray(calendarContainer.querySelectorAll('.flatpickr-day'))).forEach(function (item) {
      item.classList.add(_this2.options.classDay);
      if (item.classList.contains('today') && calendar.selectedDates.length > 0) {
        item.classList.add('no-border');
      } else if (item.classList.contains('today') && calendar.selectedDates.length === 0) {
        item.classList.remove('no-border');
      }
    });
  };

  this._updateInputFields = function (selectedDates, type) {
    if (type === 'range') {
      if (selectedDates.length === 2) {
        _this2.element.querySelector(_this2.options.selectorDatePickerInputFrom).value = _this2._formatDate(selectedDates[0]);
        _this2.element.querySelector(_this2.options.selectorDatePickerInputTo).value = _this2._formatDate(selectedDates[1]);
      } else if (selectedDates.length === 1) {
        _this2.element.querySelector(_this2.options.selectorDatePickerInputFrom).value = _this2._formatDate(selectedDates[0]);
      }
    } else if (selectedDates.length === 1) {
      _this2.element.querySelector(_this2.options.selectorDatePickerInput).value = _this2._formatDate(selectedDates[0]);
    }
    _this2._updateClassNames(_this2.calendar);
  };

  this._formatDate = function (date) {
    return _this2.calendar.formatDate(date, _this2.calendar.config.dateFormat);
  };
};

var LeftNav = function (_mixin) {
  inherits(LeftNav, _mixin);

  /**
   * Left Navigation.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a left navigation.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
   * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
   * @param {string} [options.selectorLeftNavToggle]
   *   The data attribute selector for the button that will show and hide the left navigation.
   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @param {string} [options.selectorLeftNavNestedListItem]
   *   The data attribute selector for all nested list items in the left navigation.
   * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
   * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
   * @param {string} [options.selectorLeftNavSection]
   *   The data attribute selector for the three sections in the header of the left nav.
   * @param {string} [options.selectorLeftNavCurrentPage]
   *   The data attribute selector for the current section title in the left nav header.
   * @param {string} [options.selectorLeftNavMainNavHidden] The CSS selector for the hidden main nav.
   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
   * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
   * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
   * @param {string} [options.classTaxonomyIcon] The class name for the taxonomy icon.
   */
  function LeftNav(element, options) {
    classCallCheck(this, LeftNav);

    var _this = possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).call(this, element, options));

    _this.leftNavSectionActive = false;
    _this.hookOpenActions();
    _this.hookListSectionEvents();
    _this.hookListItemsEvents();
    _this.manage(on(_this.element.ownerDocument, 'click', function (evt) {
      _this.handleDocumentClick(evt);
    }));
    return _this;
  }

  /**
   * Closes the menu.
   */


  createClass(LeftNav, [{
    key: 'closeMenu',
    value: function closeMenu() {
      this.element.classList.remove(this.options.classActiveLeftNav);
      var toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
      toggleOpenNode.classList.remove(this.options.classActiveTrigger);
      this.element.querySelector(this.options.selectorLeftNav).parentNode.setAttribute('aria-expanded', 'false');
    }

    /**
     * Toggles the menu to open and close.
     */

  }, {
    key: 'toggleMenu',
    value: function toggleMenu() {
      var leftNavContainer = this.element.querySelector(this.options.selectorLeftNav).parentNode;
      this.element.classList.toggle(this.options.classActiveLeftNav);
      var toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
      toggleOpenNode.classList.toggle(this.options.classActiveTrigger);
      if (leftNavContainer.getAttribute('aria-expanded') === 'false') leftNavContainer.setAttribute('aria-expanded', 'true');else leftNavContainer.setAttribute('aria-expanded', 'false');
    }

    /**
     * Adds a transitional animation to the navSection
     */

  }, {
    key: 'animateNavSection',
    value: function animateNavSection(selectedNav) {
      var _this2 = this;

      var selectedNavValue = selectedNav.dataset.leftNavSection;
      var selectedNavLink = selectedNav.querySelector(this.options.selectorLeftNavSectionLink);
      var leftNav = this.element.querySelector(this.options.selectorLeftNav);
      var leftNavSections = this.element.querySelector(this.options.selectorLeftNavSections);

      selectedNav.classList.remove(this.options.classNavSection);
      selectedNav.classList.remove(this.options.classNavSection + '--' + selectedNavValue);
      selectedNav.classList.add(this.options.classNavSectionTransition);
      if (leftNavSections.children[0] === selectedNav) {
        selectedNav.classList.add(this.options.classNavSectionTransition + '--50'); // First child only move 50px
      } else {
        selectedNav.classList.add(this.options.classNavSectionTransition + '--100'); // Second move 100px
      }
      selectedNav.setAttribute('data-left-nav-section', selectedNavValue);
      /* Not sure what trick more performant */
      setTimeout(function () {
        selectedNav.classList.add(_this2.options.classNavSectionTransition + '--0');
      }, 100); // Could probably use a promise here

      selectedNavLink.classList.remove(this.options.classNavSectionLink);
      selectedNavLink.classList.add(this.options.classNavHeaderTitle);
      selectedNavLink.setAttribute('data-left-nav-current-section-title', '');
      selectedNavLink.removeAttribute('data-left-nav-section-link');

      this.element.insertBefore(selectedNav, leftNav);
    }

    /**
     * Adds a transitional animation to the navigation items on nav section click
     */

  }, {
    key: 'animateNavList',
    value: function animateNavList(selectedNavTitle) {
      var _this3 = this;

      var currentLeftNavList = this.element.querySelector(this.options.selectorLeftNavList + ':not(' + this.options.selectorLeftNavMainNavHidden + ')');
      var newLeftNavList = this.element.querySelector('[data-left-nav-list=' + selectedNavTitle + ']');
      var currentLeftNavItems = [].concat(toConsumableArray(currentLeftNavList.querySelectorAll(this.options.selectorLeftNavListItem))).reverse();
      var newLeftNavItems = [].concat(toConsumableArray(newLeftNavList.querySelectorAll(this.options.selectorLeftNavListItem)));

      var fadeOutTime = 300;
      var counter = 0;
      var counterIteration = fadeOutTime / currentLeftNavItems.length; // Length of animation divided by number of items
      currentLeftNavItems.forEach(function (item) {
        item.setAttribute('tabIndex', '-1');
        setTimeout(function () {
          item.classList.add(_this3.options.classItemFade);
        }, counter);
        counter += counterIteration;
      });

      newLeftNavItems.forEach(function (item) {
        item.setAttribute('tabIndex', '0');
        item.classList.remove(_this3.options.classItemFade);
      });

      setTimeout(function () {
        currentLeftNavList.classList.add(_this3.options.classListHidden);
        currentLeftNavList.classList.add(_this3.options.classListTop);
        currentLeftNavList.setAttribute('aria-hidden', 'true');
        newLeftNavList.classList.remove(_this3.options.classListHidden);
        setTimeout(function () {
          newLeftNavList.classList.remove(_this3.options.classListTop);
        }, 100);
        newLeftNavList.setAttribute('aria-hidden', 'false');
      }, fadeOutTime + 100); // Wait for items to fade out.
    }
  }, {
    key: 'hookOpenActions',
    value: function hookOpenActions() {
      var _this4 = this;

      var openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
      var closeBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleClose);

      this.manage(on(openBtn, 'click', function () {
        _this4.element.tabIndex = '0';
        _this4.toggleMenu();
      }));

      this.manage(on(openBtn, 'keydown', function (evt) {
        if (evt.which === 13) {
          _this4.element.tabIndex = '0';
          _this4.toggleMenu();
        }
      }));

      if (closeBtn) {
        this.manage(on(closeBtn, 'click', function () {
          _this4.element.tabIndex = '-1';
          _this4.closeMenu();
        }));

        this.manage(on(closeBtn, 'keydown', function (evt) {
          if (evt.which === 13) {
            _this4.element.tabIndex = '-1';
            _this4.closeMenu();
          }
        }));
      }

      this.manage(on(this.element.ownerDocument, 'keydown', function (evt) {
        if (evt.which === 27 && _this4.element.classList.contains(_this4.options.classActiveLeftNav)) {
          _this4.closeMenu();
        }
      }));
    }

    /**
     * Addes Event listeners to list sections
     */

  }, {
    key: 'hookListSectionEvents',
    value: function hookListSectionEvents() {
      var _this5 = this;

      var leftNavSections = this.element.querySelector(this.options.selectorLeftNavSections);
      this.manage(on(leftNavSections, 'click', function (evt) {
        _this5.handleSectionItemClick(evt, leftNavSections);
      }));

      this.manage(on(leftNavSections, 'keydown', function (evt) {
        if (evt.which === 13) {
          _this5.handleSectionItemClick(evt, leftNavSections);
          _this5.element.querySelector(_this5.options.selectorLeftNavCurrentSectionTitle).focus();
        }
      }));
    }

    /**
     * Adds event listeners to list items
     */

  }, {
    key: 'hookListItemsEvents',
    value: function hookListItemsEvents() {
      var _this6 = this;

      var leftNavList = [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavList)));
      leftNavList.forEach(function (list) {
        _this6.manage(on(list, 'click', function (evt) {
          var leftNavItem = eventMatches(evt, _this6.options.selectorLeftNavListItem);
          if (leftNavItem) {
            var childItem = eventMatches(evt, _this6.options.selectorLeftNavNestedListItem);
            var hasChildren = eventMatches(evt, _this6.options.selectorLeftNavListItemHasChildren);
            var flyoutItem = eventMatches(evt, _this6.options.selectorLeftNavFlyoutItem);
            if (flyoutItem) {
              _this6.addActiveListItem(flyoutItem);
            } else if (childItem) {
              if (childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu)) {
                var flyoutMenu = childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu);
                flyoutMenu.classList.toggle(_this6.options.classFlyoutDisplayed);
              } else {
                _this6.addActiveListItem(childItem);
              }
            } else if (hasChildren) {
              _this6.handleNestedListClick(leftNavItem);
            } else {
              _this6.addActiveListItem(leftNavItem);
            }
          }
        }));
        _this6.manage(on(list, 'keydown', function (evt) {
          if (evt.which === 13) {
            var leftNavItem = eventMatches(evt, _this6.options.selectorLeftNavListItem);
            if (leftNavItem) {
              var childItem = eventMatches(evt, _this6.options.selectorLeftNavNestedListItem);
              var hasChildren = eventMatches(evt, _this6.options.selectorLeftNavListItemHasChildren);
              var flyoutItem = eventMatches(evt, _this6.options.selectorLeftNavFlyoutItem);
              var hasLinkItem = !(leftNavItem.querySelector(_this6.options.selectorLeftNavListItemLink) === undefined);
              if (flyoutItem) {
                _this6.addActiveListItem(flyoutItem);
              } else if (childItem) {
                if (!childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu)) {
                  _this6.addActiveListItem(childItem);
                } else {
                  childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'false');
                  childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.top = childItem.offsetTop - _this6.element.querySelector(_this6.options.selectorLeftNav).scrollTop + 'px';
                  childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.left = childItem.offsetLeft + Math.round(childItem.offsetWidth) + 'px';
                }
              } else if (hasChildren) {
                _this6.handleNestedListClick(leftNavItem);
              } else if (hasLinkItem) {
                var link = leftNavItem.querySelector(_this6.options.selectorLeftNavListItemLink);
                link.click();
              } else {
                _this6.addActiveListItem(leftNavItem);
              }
            }
          }
        }));
      });
      var flyouts = [].concat(toConsumableArray(this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavListItemHasFlyout)));
      flyouts.forEach(function (flyout) {
        _this6.manage(on(flyout, 'mouseenter', function () {
          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'false');
          // eslint-disable-next-line no-param-reassign
          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.top = flyout.offsetTop - _this6.element.querySelector(_this6.options.selectorLeftNav).scrollTop + 'px';
          // eslint-disable-next-line no-param-reassign
          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.left = flyout.offsetLeft + Math.round(flyout.offsetWidth) + 'px';
          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).classList.toggle(_this6.options.classFlyoutDisplayed);
        }));
        _this6.manage(on(flyout, 'mouseleave', function () {
          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'true');
          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).classList.remove(_this6.options.classFlyoutDisplayed);
        }));
      });
    }

    /**
     * Hides all flyout menus.
     */

  }, {
    key: 'hideAllFlyoutMenus',
    value: function hideAllFlyoutMenus() {
      var _this7 = this;

      var flyoutMenus = [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavFlyoutMenu)));
      flyoutMenus.forEach(function (menu) {
        menu.setAttribute('aria-hidden', 'true');
        menu.classList.remove(_this7.options.classFlyoutDisplayed);
      });
    }

    /**
     * Sets a list item as active.
     * @param {Object} item The active list item.
     */

  }, {
    key: 'addActiveListItem',
    value: function addActiveListItem(item) {
      var _this8 = this;

      [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavAllListItems))).forEach(function (currentItem) {
        if (!(item === currentItem)) {
          if (!currentItem.contains(item)) {
            currentItem.classList.remove(_this8.options.classActiveLeftNavListItem);
          } else {
            currentItem.classList.add(_this8.options.classActiveLeftNavListItem);
          }
        }
      });
      [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem))).forEach(function (currentItem) {
        if (!(item === currentItem)) {
          currentItem.classList.remove(_this8.options.classActiveLeftNavListItem);
        }
      });
      item.classList.add(this.options.classActiveLeftNavListItem);
      this.closeMenu();
      this.hideAllFlyoutMenus();
      this.closeMenu();
    }

    /**
     * Handles click on the document.
     * Closes the left navigation when document is clicked outside the left navigation.
     * @param {Event} evt The event triggering this method.
     */

  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(evt) {
      var clickTarget = evt.target;
      var isOfSelf = this.element.contains(clickTarget);
      var isToggleBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).contains(clickTarget);
      var isOpen = this.element.classList.contains(this.options.classActiveLeftNav);
      var isUnifiedHeader = this.element.ownerDocument.querySelector('[data-unified-header]').contains(clickTarget);
      var shouldClose = !isOfSelf && isOpen && !isToggleBtn && !isUnifiedHeader;
      var flyoutOpen = void 0;
      if (this.element.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
        var leftnavFlyoutMenu = this.element.querySelector(this.options.selectorLeftNavFlyoutMenu);
        flyoutOpen = leftnavFlyoutMenu.classList.contains(this.options.classFlyoutDisplayed);
      }
      if (isOfSelf && this.element.tagName === 'A') {
        evt.preventDefault();
      }
      if (shouldClose) {
        this.closeMenu();
      }
      if (this.element.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
        if (flyoutOpen && !isOfSelf && isOpen) {
          this.element.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.remove(this.options.classFlyoutDisplayed);
        }
      }
    }

    /**
     * Handles click on a list item that contains a nested list in the left navigation.
     * It hides all flyout menus and switches the tab-index on the list items based on whether or not the list is expanded.
     * @param {HTMLElement} listItem The list item that was clicked.
     */

  }, {
    key: 'handleNestedListClick',
    value: function handleNestedListClick(listItem) {
      var _this9 = this;

      var isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
      this.hideAllFlyoutMenus();
      listItem.classList.toggle(this.options.classExpandedLeftNavListItem, !isOpen);
      var listItems = [].concat(toConsumableArray(listItem.querySelectorAll(this.options.selectorLeftNavNestedListItem)));
      listItems.forEach(function (item) {
        if (isOpen) {
          listItem.querySelector(_this9.options.selectorLeftNavNestedList).setAttribute('aria-hidden', 'true');
          // eslint-disable-next-line no-param-reassign
          item.querySelector(_this9.options.selectorLeftNavListItemLink).tabIndex = -1;
        } else {
          listItem.querySelector(_this9.options.selectorLeftNavNestedList).setAttribute('aria-hidden', 'false');
          // eslint-disable-next-line no-param-reassign
          item.querySelector(_this9.options.selectorLeftNavListItemLink).tabIndex = 0;
        }
      });
    }
  }, {
    key: 'handleSectionItemClick',
    value: function handleSectionItemClick(evt, leftNavSections) {
      var _this10 = this;

      // Sorry
      var leftNavSectionItem = eventMatches(evt, this.options.selectorLeftNavSection);
      if (leftNavSectionItem) {
        // currently selected
        var selectedLeftNavSectionItem = this.element.querySelector(this.options.selectorLeftNavCurrentSection);
        var selectedLeftNavSectionItemTitle = selectedLeftNavSectionItem.querySelector(this.options.selectorLeftNavCurrentSectionTitle);
        var selectedLeftNavSectionItemIcon = this.element.querySelector(this.options.selectorLeftNavCurrentSectionIcon);
        var selectedLeftNavSectionItemUse = selectedLeftNavSectionItemIcon.querySelector('use');
        var selectedLeftNavSectionValue = selectedLeftNavSectionItem.dataset.leftNavCurrentSection;

        // clicked on item
        var leftNavSectionItemLink = leftNavSectionItem.querySelector(this.options.selectorLeftNavSectionLink);
        var leftNavSectionItemIcon = leftNavSectionItem.querySelector(this.options.selectorLeftNavSectionIcon);
        var leftNavSectionItemIconUse = leftNavSectionItemIcon.querySelector('use');
        var leftNavSectionValue = leftNavSectionItem.dataset.leftNavSection;

        if (this.leftNavSectionActive) {
          return;
        }
        this.leftNavSectionActive = true;

        var newLeftNavSectionItem = document.createElement('li');
        newLeftNavSectionItem.setAttribute('data-left-nav-section', selectedLeftNavSectionValue);
        newLeftNavSectionItem.classList.add(this.options.classNavSection);
        newLeftNavSectionItem.classList.add(this.options.classNavSection + '--' + selectedLeftNavSectionValue);

        var newLeftNavSectionItemAnchor = document.createElement('a');
        newLeftNavSectionItemAnchor.setAttribute('href', 'javascript:void(0)'); // eslint-disable-line no-script-url
        newLeftNavSectionItemAnchor.setAttribute('tabindex', 0);
        newLeftNavSectionItemAnchor.classList.add(this.options.classNavSectionAnchor);

        var newLeftNavSectionItemIcon = selectedLeftNavSectionItemIcon.cloneNode(true);
        // IE11 doesn't support classList on SVG, must revert to className
        newLeftNavSectionItemIcon.setAttribute('class', this.options.classTaxonomyIcon);
        newLeftNavSectionItemIcon.removeAttribute('data-left-nav-current-section-icon');
        newLeftNavSectionItemIcon.setAttribute('data-left-nav-section-icon', selectedLeftNavSectionValue);

        var newLeftNavSectionItemLink = document.createElement('span');
        newLeftNavSectionItemLink.setAttribute('data-left-nav-section-link', '');
        newLeftNavSectionItemLink.classList.add(this.options.classNavSectionLink);
        newLeftNavSectionItemLink.textContent = selectedLeftNavSectionItemTitle.textContent;

        this.animateNavSection(leftNavSectionItem);
        this.animateNavList(leftNavSectionValue);

        newLeftNavSectionItemAnchor.appendChild(newLeftNavSectionItemIcon);
        newLeftNavSectionItemAnchor.appendChild(newLeftNavSectionItemLink);
        newLeftNavSectionItem.appendChild(newLeftNavSectionItemAnchor);
        leftNavSections.insertBefore(newLeftNavSectionItem, leftNavSections.firstChild);

        setTimeout(function () {
          selectedLeftNavSectionItemTitle.textContent = leftNavSectionItemLink.textContent;
          selectedLeftNavSectionItem.setAttribute('data-left-nav-current-section', leftNavSectionValue);
          selectedLeftNavSectionItemIcon.setAttribute('data-left-nav-current-section-icon', leftNavSectionValue);
          selectedLeftNavSectionItemUse.setAttribute('xlink:href', leftNavSectionItemIconUse.getAttribute('xlink:href'));

          leftNavSectionItem.parentNode.removeChild(leftNavSectionItem); // Cant use .remove() because of IE11
          _this10.leftNavSectionActive = false;
        }, 450); // Wait for nav items to animate
      }
    }

    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode LeftNav.create .create()}, or {@linkcode LeftNav.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode LeftNav.init .init()} works.
     * @member LeftNav.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find left nav containers.
     * @property {string} [selectorLeftNav] The data attribute selector for the nav element in the left nav container.
     * @property {string} [selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
     * @property {string} [selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
     * @property {string} [selectorLeftNavToggle]
     *   The data attribute selector for the button that will show and hide the left navigation.
     * @property {string} [selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
     * @property {string} [selectorLeftNavNestedListItem]
     *   The data attribute selector for all nested list items in the left navigation.
     * @property {string} [selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
     * @property {string} [selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
     * @property {string} [selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
     * @property {string} [selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
     * @property {string} [selectorLeftNavCurrentPage]
     *   The data attribute selector for the current section title in the left nav header.
     * @property {string} [selectorLeftNavMainNavHidden] The CSS selector for the hidden main nav.
     * @property {string} [classActiveLeftNav] The class name for when a left nav is active.
     * @property {string} [classActiveLeftNavListItem] The class name for when a left nav list item is active.
     * @property {string} [classExpandedLeftNavListItem] The class name for when a nested list is expanded.
     * @property {string} [classFlyoutDisplayed] The class name for when a flyout menu is displayed.
     * @property {string} [classActiveSection] The class name for an active section item in the left nav header.
     * @property {string} [classItemHasChildren] The class name for when a list item has children.
     * @property {string} [classTaxonomyIcon] The class name for the taxonomy icon.
     */

  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-left-nav-container]',
        // Data Attribute selectors
        selectorLeftNav: '[data-left-nav]',
        selectorLeftNavList: '[data-left-nav-list]',
        selectorLeftNavNestedList: '[data-left-nav-nested-list]',
        selectorLeftNavToggleOpen: '[data-left-nav-toggle="open"]',
        selectorLeftNavToggleClose: '[data-left-nav-toggle="close"]',
        selectorLeftNavListItem: '[data-left-nav-item]',
        selectorLeftNavListItemLink: '[data-left-nav-item-link]',
        selectorLeftNavNestedListItem: '[data-left-nav-nested-item]',
        selectorLeftNavArrowIcon: '[data-left-nav-icon]',
        selectorLeftNavFlyoutMenu: '[data-left-nav-flyout]',
        selectorLeftNavFlyoutItem: '[data-left-nav-flyout-item]',
        selectorLeftNavSections: '[data-left-nav-sections]',
        selectorLeftNavSection: '[data-left-nav-section]',
        selectorLeftNavSectionLink: '[data-left-nav-section-link]',
        selectorLeftNavSectionIcon: '[data-left-nav-section-icon]',
        selectorLeftNavCurrentSection: '[data-left-nav-current-section]',
        selectorLeftNavCurrentSectionTitle: '[data-left-nav-current-section-title]',
        selectorLeftNavCurrentSectionIcon: '[data-left-nav-current-section-icon]',
        selectorLeftNavListItemHasChildren: '[data-left-nav-item-with-children]',
        selectorLeftNavListItemHasFlyout: '[data-left-nav-has-flyout]',
        selectorLeftNavAllListItems: '[data-left-nav-item], [data-left-nav-nested-item], [data-left-nav-flyout-item]',
        selectorLeftNavMainNavHidden: '.' + prefix + '--left-nav__main-nav--hidden',
        // CSS Class Selectors
        classActiveTrigger: prefix + '--left-nav__trigger--active',
        classActiveLeftNav: prefix + '--left-nav--active',
        classActiveLeftNavListItem: prefix + '--active-list-item',
        classExpandedLeftNavListItem: prefix + '--main-nav__parent-item--expanded',
        classFlyoutDisplayed: prefix + '--nested-list__flyout-menu--displayed',
        classItemHasChildren: prefix + '--main-nav__parent-item--has-children',
        classNavSection: prefix + '--left-nav__section',
        classNavSectionTransition: prefix + '--left-nav__section--transition',
        classNavSectionAnchor: prefix + '--left-nav__section--anchor',
        classNavSectionLink: prefix + '--left-nav__section--link',
        classNavHeaderTitle: prefix + '--left-nav__header--title',
        classItemFade: prefix + '--main-nav__parent-item--fade',
        classItemHidden: prefix + '--main-nav__parent-item--hidden',
        classListHidden: prefix + '--left-nav__main-nav--hidden',
        classListTop: prefix + '--left-nav__main-nav--top',
        classTaxonomyIcon: prefix + '--left-nav__section--taxonomy-icon'
      };
    }

    /**
     * The map associating DOM element and left navigation instance.
     * @member LeftNav.components
     * @type {WeakMap}
     */

  }]);
  return LeftNav;
}(mixin(createComponent, initComponentBySearch, handles));

LeftNav.components = new WeakMap();

var ProfileSwitcher = function (_mixin) {
  inherits(ProfileSwitcher, _mixin);

  /**
   * Profile Switcher.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a profile switcher.
   * @param {Object} [options] The component options
   * @param {string} [options.selectorProfileSwitcher] The data attribute selector for the profile switcher.
   * @param {string} [options.selectorAccount]
   *   The data attribute selector for the element containing the account name in the profile switcher.
   * @param {string} [options.selectorOrg]
   *   The data attribute selector for the element containing the organization name in the profile switcher.
   * @param {string} [options.selectorSpace]
   *   The data attribute selector for the element containing the space name in the profile switcher.
   * @param {string} [options.selectorAccountDropdown]
   *   The data attribute selector for the dropdown item containing the current account name.
   * @param {string} [options.selectorOrgDropdown]
   *   The data attribute selector for the dropdown item containing the current organization name.
   * @param {string} [options.selectorSpaceDropdown]
   *   The data attribute selector for the dropdown item containing the current space name.
   */
  function ProfileSwitcher(element, options) {
    classCallCheck(this, ProfileSwitcher);

    var _this = possibleConstructorReturn(this, (ProfileSwitcher.__proto__ || Object.getPrototypeOf(ProfileSwitcher)).call(this, element, options));

    _this.manage(on(_this.element.ownerDocument, 'click', function (evt) {
      _this.handleDocumentClick(evt);
    }));

    _this.manage(on(_this.element, 'dropdown-beingselected', function (event) {
      if (event.target.querySelector(_this.options.selectorAccountDropdown) !== null) {
        var linkedIconNode = event.detail.item.querySelector(_this.options.classLinkedIcon);
        _this.element.isLinked = !!linkedIconNode;
        _this.element.linkedIcon = linkedIconNode && linkedIconNode.cloneNode(true);
        var linkedAccountNode = event.detail.item.querySelector(_this.options.selectorAccountSlLinked);
        _this.element.linkedAccount = linkedAccountNode && linkedAccountNode.cloneNode(true);
      }
    }));

    var toggleNode = _this.element.querySelector(_this.options.selectorToggle);
    if (toggleNode) {
      _this.manage(on(toggleNode, 'keydown', function (event) {
        _this.toggle(event);
      }));

      _this.manage(on(toggleNode, 'mouseenter', function (event) {
        _this.getLinkedData(event);
        _this.determineSwitcherValues(true);
      }));

      _this.manage(on(toggleNode, 'mouseleave', function (event) {
        _this.getLinkedData(event);
        _this.determineSwitcherValues(false);
      }));
    }

    _this.manage(on(_this.element.ownerDocument, 'keyup', function () {
      return _this.handleBlur();
    }));
    return _this;
  }

  /**
   * Opens and closes the menu.
   * @param {Event} event The event triggering this method.
   */


  createClass(ProfileSwitcher, [{
    key: 'toggle',
    value: function toggle(event) {
      var isOfSelf = this.element.contains(event.target);
      if (event.which === 13 || event.which === 32) {
        if (isOfSelf) {
          this.element.classList.toggle(this.options.classSwitcherOpen);
        } else if (!isOfSelf && this.element.classList.contains(this.options.classSwitcherOpen)) {
          this.element.classList.remove(this.options.classSwitcherOpen);
        }
      }
    }
  }, {
    key: 'getLinkedData',
    value: function getLinkedData(event) {
      if (event.target.querySelector(this.options.selectorLinkedAccount) !== null) {
        if (event.target.querySelector(this.options.selectorLinkedAccount).textContent.length > 1) {
          this.element.isLinked = true;
        } else {
          this.element.isLinked = false;
        }
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      if (!this.element.contains(document.activeElement)) {
        this.element.classList.remove(this.options.classSwitcherOpen);
      }
    }

    /**
     * Handles click on the document.
     * Closes the profile switcherwhen document is clicked outside the left navigation or
     * the user clicks the profile switcher while it is open.
     * @param {Event} evt The event triggering this method.
     */

  }, {
    key: 'handleDocumentClick',
    value: function handleDocumentClick(evt) {
      var clickTarget = evt.target;
      var isOfSelf = this.element.contains(clickTarget);
      var isToggle = eventMatches(evt, this.options.selectorToggle);
      var isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

      if (isOfSelf) {
        if (isToggle && isOpen) {
          this.element.classList.remove(this.options.classSwitcherOpen);
        } else if (isOpen) {
          this.determineSwitcherValues();
        } else {
          this.element.classList.add(this.options.classSwitcherOpen);
        }
      } else {
        this.element.classList.remove(this.options.classSwitcherOpen);
      }
    }

    /**
     * Handles logic to determine what text to display in profile switcher.
     * If the text is over 25 characters long, truncate and add ellipses.
     * Also adds logic to change the switcher width based on the width of the hovered
     * profile switcher
     * @param {boolean} isHovered boolean value passed by the event listener on bx--toggle.
     */

  }, {
    key: 'determineSwitcherValues',
    value: function determineSwitcherValues(isHovered) {
      var linkedElement = this.element.querySelector(this.options.selectorLinkedAccount);
      var nameElement = this.element.querySelector(this.options.selectorAccount);
      var regionElement = this.element.querySelector(this.options.selectorRegion);
      var orgElement = this.element.querySelector(this.options.selectorOrg);
      var spaceElement = this.element.querySelector(this.options.selectorSpace);
      var menuElement = this.element.querySelector(this.options.selectorMenu);
      var isOpen = this.element.classList.contains(this.options.classSwitcherOpen);

      if (linkedElement) {
        if (this.element.isLinked) {
          if (this.element.linkedAccount) {
            if (linkedElement.textContent.length) {
              linkedElement.querySelector(this.options.selectorAccountSlLinked).textContent = this.element.linkedAccount.textContent;
            } else {
              linkedElement.appendChild(this.element.linkedAccount);
              if (this.element.linkedIcon) {
                linkedElement.appendChild(this.element.linkedIcon);
              }
            }
          }
        } else {
          linkedElement.textContent = '';
        }
      }

      var nameDropdownValue = '';
      if (this.element.querySelector(this.options.selectorAccountDropdown)) {
        if (this.element.isLinked) {
          nameDropdownValue = this.element.querySelector(this.options.selectorAccountLinked).textContent;
        } else {
          nameDropdownValue = this.element.querySelector(this.options.selectorAccountDropdown).textContent;
        }
      }

      var regionDropdownValue = '';
      if (this.element.querySelector(this.options.selectorRegionDropdown)) {
        regionDropdownValue = this.element.querySelector(this.options.selectorRegionDropdown).textContent;
      }

      var orgDropdownValue = '';
      if (this.element.querySelector(this.options.selectorOrgDropdown)) {
        orgDropdownValue = this.element.querySelector(this.options.selectorOrgDropdown).textContent;
      }

      var spaceDropdownValue = '';
      if (this.element.querySelector(this.options.selectorSpaceDropdown)) {
        spaceDropdownValue = this.element.querySelector(this.options.selectorSpaceDropdown).textContent;
      }

      var nameShort = void 0;
      var orgShort = void 0;
      var spaceShort = void 0;

      if (isHovered && !isOpen) {
        if (nameElement) {
          nameElement.textContent = nameDropdownValue;
        }
        if (orgElement) {
          orgElement.textContent = orgDropdownValue;
        }
        if (spaceElement) {
          spaceElement.textContent = spaceDropdownValue;
        }
        if (regionElement) {
          regionElement.textContent = regionDropdownValue;
        }
        if (menuElement) {
          menuElement.style.width = this.element.getBoundingClientRect().width + 'px';
        }
      } else {
        if (nameElement) {
          if (nameDropdownValue.length > 25) {
            nameShort = nameDropdownValue.substr(0, 25) + '...';
            nameElement.textContent = nameShort;
          } else {
            nameElement.textContent = nameDropdownValue;
          }
        }

        if (orgElement) {
          if (orgDropdownValue.length > 25) {
            orgShort = orgDropdownValue.slice(0, 12) + '...' + orgDropdownValue.slice(-13);
            orgElement.textContent = orgShort;
          } else {
            orgElement.textContent = orgDropdownValue;
          }
        }

        if (spaceElement) {
          if (spaceDropdownValue.length > 25) {
            spaceShort = spaceDropdownValue.substr(0, 25) + '...';
            spaceElement.textContent = spaceShort;
          } else {
            spaceElement.textContent = spaceDropdownValue;
          }
        }

        if (regionElement) {
          regionElement.textContent = regionDropdownValue;
        }

        if (menuElement) {
          menuElement.style.width = this.element.getBoundingClientRect().width + 'px';
        }
      }
    }

    /**
     * The component options.
     * @member ProfileSwitcher.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find profile switchers.
     * @property {string} [selectorProfileSwitcher] The data attribute selector for the profile switcher.
     * @property {string} [selectorAccount]
     *   The data attribute selector for the element containing the account name in the profile switcher.
     * @property {string} [selectorOrg]
     *   The data attribute selector for the element containing the organization name in the profile switcher.
     * @property {string} [selectorSpace]
     *   The data attribute selector for the element containing the space name in the profile switcher.
     * @property {string} [selectorAccountDropdown]
     *   The data attribute selector for the dropdown item containing the current account name.
     * @property {string} [selectorOrgDropdown]
     *   The data attribute selector for the dropdown item containing the current organization name.
     * @property {string} [selectorSpaceDropdown]
     *   The data attribute selector for the dropdown item containing the current space name.
     */

  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-profile-switcher]',
        // Data Attribute selectors
        selectorProfileSwitcher: '[data-profile-switcher]',
        selectorToggle: '[data-profile-switcher-toggle]',
        selectorMenu: '[data-switcher-menu]',
        selectorLinkedAccount: '[data-switcher-account-sl]',
        selectorAccount: '[data-switcher-account]',
        selectorRegion: '[data-switcher-region]',
        selectorOrg: '[data-switcher-org]',
        selectorSpace: '[data-switcher-space]',
        selectorDropdown: '[data-dropdown]',
        selectorAccountDropdown: '[data-dropdown-account]',
        selectorAccountSlDropdown: '[data-dropdown-account-sl]',
        selectorAccountLinked: '[data-dropdown-account-linked]',
        selectorAccountSlLinked: '[data-dropdown-account-sl-linked]',
        selectorRegionDropdown: '[data-dropdown-region]',
        selectorOrgDropdown: '[data-dropdown-org]',
        selectorSpaceDropdown: '[data-dropdown-space]',
        classSwitcherOpen: prefix + '--account-switcher--open',
        classLinkedIcon: '.' + prefix + '--account-switcher__linked-icon'
      };
    }

    /**
     * The map associating DOM element and profile switcher instance.
     * @member ProfileSwitcher.components
     * @type {WeakMap}
     */

  }]);
  return ProfileSwitcher;
}(mixin(createComponent, initComponentBySearch, handles));

ProfileSwitcher.components = new WeakMap();

var Pagination = function (_mixin) {
  inherits(Pagination, _mixin);

  /**
   * Pagination component.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as a pagination component.
   * @param {Object} [options] The component options.
   * @property {string} [selectorInit] The CSS selector to find pagination components.
   * @property {string} [selectorItemsPerPageInput]
   *   The CSS selector to find the input that determines the number of items per page.
   * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
   * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
   * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
   * @property {string} [eventItemsPerPage]
   *   The name of the custom event fired when a user changes the number of items per page.
   *   event.detail.value contains the number of items a user wishes to see.
   * @property {string} [eventPageNumber]
   *   The name of the custom event fired when a user inputs a specific page number.
   *   event.detail.value contains the value that the user input.
   * @property {string} [eventPageChange]
   *   The name of the custom event fired when a user goes forward or backward a page.
   *   event.detail.direction contains the direction a user wishes to go.
   */
  function Pagination(element, options) {
    classCallCheck(this, Pagination);

    var _this = possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, element, options));

    _this._emitEvent = function (evtName, detail) {
      var event = new CustomEvent('' + evtName, {
        bubbles: true,
        cancelable: true,
        detail: detail
      });

      _this.element.dispatchEvent(event);
    };

    _this.manage(on(_this.element, 'click', function (evt) {
      if (evt.target.matches(_this.options.selectorPageBackward)) {
        var detail = {
          initialEvt: evt,
          element: evt.target,
          direction: 'backward'
        };
        _this._emitEvent(_this.options.eventPageChange, detail);
      } else if (evt.target.matches(_this.options.selectorPageForward)) {
        var _detail = {
          initialEvt: evt,
          element: evt.target,
          direction: 'forward'
        };
        _this._emitEvent(_this.options.eventPageChange, _detail);
      }
    }));

    _this.manage(on(_this.element, 'input', function (evt) {
      if (evt.target.matches(_this.options.selectorItemsPerPageInput)) {
        var detail = {
          initialEvt: evt,
          element: evt.target,
          value: evt.target.value
        };
        _this._emitEvent(_this.options.eventItemsPerPage, detail);
      } else if (evt.target.matches(_this.options.selectorPageNumberInput)) {
        var _detail2 = {
          initialEvt: evt,
          element: evt.target,
          value: evt.target.value
        };
        _this._emitEvent(_this.options.eventPageNumber, _detail2);
      }
    }));
    return _this;
  }

  /**
   * Dispatches a custom event
   * @param {string} evtName name of the event to be dispatched.
   * @param {Object} detail contains the original event and any other necessary details.
   */


  /**
   * The map associating DOM element and pagination instance.
   * @type {WeakMap}
   */


  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode Pagination.create .create()}, or {@linkcode Pagination.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Pagination.init .init()} works.
   * @property {string} [selectorInit] The CSS selector to find pagination components.
   * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines
   * the number of items per page.
   * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
   * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
   * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
   * @property {string} [eventItemsPerPage]
   *   The name of the custom event fired when a user changes the number of items per page.
   *   event.detail.value contains the number of items a user wishes to see.
   * @property {string} [eventPageNumber]
   *   The name of the custom event fired when a user inputs a specific page number.
   *   event.detail.value contains the value that the user input.
   * @property {string} [eventPageChange]
   *   The name of the custom event fired when a user goes forward or backward a page.
   *   event.detail.direction contains the direction a user wishes to go.
   */


  return Pagination;
}(mixin(createComponent, initComponentBySearch, handles));

Pagination.components = new WeakMap();
Pagination.options = {
  selectorInit: '[data-pagination]',
  selectorItemsPerPageInput: '[data-items-per-page]',
  selectorPageNumberInput: '[data-page-number-input]',
  selectorPageBackward: '[data-page-backward]',
  selectorPageForward: '[data-page-forward]',
  eventItemsPerPage: 'itemsPerPage',
  eventPageNumber: 'pageNumber',
  eventPageChange: 'pageChange'
};

function svgToggleClass(svg, name, forceAdd) {
  var list = svg.getAttribute('class').trim().split(/\s+/);
  var uniqueList = Object.keys(list.reduce(function (o, item) {
    return Object.assign(o, defineProperty({}, item, 1));
  }, {}));
  var index = uniqueList.indexOf(name);
  var found = index >= 0;
  var add = forceAdd === undefined ? !found : forceAdd;

  if (found === !add) {
    if (add) {
      uniqueList.push(name);
    } else {
      uniqueList.splice(index, 1);
    }
    svg.setAttribute('class', uniqueList.join(' '));
  }
}

var Search = function (_mixin) {
  inherits(Search, _mixin);

  /**
   * Search with Options.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as the search component.
   * @param {Object} [options] The component options
   * @property {string} [options.selectorInit]
   *   The selector to find search UIs with options.
   * @property {string} [options.selectorSearchView]
   *   The selector to find the search view icon containers.
   * @property {string} [options.selectorSearchInput]
   *   The selector to find the search input.
   * @property {string} [options.selectorClearIcon]
   *   The selector for the clear icon that clears the search box.
   * @property {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
   * @property {string} [options.classClearHidden] The class used to hide the clear icon.
   * @property {string} [options.classLayoutHidden] The class used to hide nonselected layout view.
   */
  function Search(element, options) {
    classCallCheck(this, Search);

    var _this = possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, element, options));

    var closeIcon = _this.element.querySelector(_this.options.selectorClearIcon);
    var input = _this.element.querySelector(_this.options.selectorSearchInput);
    if (!input) {
      throw new Error('Cannot find the search input.');
    }

    if (closeIcon) {
      _this.manage(on(closeIcon, 'click', function () {
        svgToggleClass(closeIcon, _this.options.classClearHidden, true);
        input.value = '';
        input.focus();
      }));
    }

    _this.manage(on(_this.element, 'click', function (evt) {
      var toggleItem = eventMatches(evt, _this.options.selectorIconContainer);
      if (toggleItem) _this.toggleLayout(toggleItem);
    }));

    _this.manage(on(input, 'input', function (evt) {
      if (closeIcon) _this.showClear(evt.target.value, closeIcon);
    }));
    return _this;
  }

  /**
   * Toggles between the grid and list layout.
   * @param {HTMLElement} element The element contining the layout toggle.
   */


  createClass(Search, [{
    key: 'toggleLayout',
    value: function toggleLayout(element) {
      var _this2 = this;

      [].concat(toConsumableArray(element.querySelectorAll(this.options.selectorSearchView))).forEach(function (item) {
        item.classList.toggle(_this2.options.classLayoutHidden);
      });
    }

    /**
     * Toggles the clear icon visibility
     * @param {HTMLElement} value The element serving as the search input.
     * @param {HTMLElement} icon The element serving as close icon.
     */

  }, {
    key: 'showClear',
    value: function showClear(value, icon) {
      svgToggleClass(icon, this.options.classClearHidden, value.length === 0);
    }

    /**
     * The component options.
     * If `options` is specified in the constructor,
     * {@linkcode Search.create .create()}, or {@linkcode Search.init .init()},
     * properties in this object are overriden for the instance being created
     * and how {@linkcode Search.init .init()} works.
     * @member Search.options
     * @type {Object}
     * @property {string} [options.selectorInit]
     *   The selector to find search UIs with options.
     * @property {string} [options.selectorSearchView]
     *   The selector to find the search view icon containers.
     * @property {string} [options.selectorSearchInput]
     *   The selector to find the search input.
     * @property {string} [options.selectorClearIcon]
     *   The selector for the clear icon that clears the search box.
     * @property {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
     * @property {string} [options.classClearHidden] The class used to hide the clear icon.
     * @property {string} [options.classLayoutHidden] The class used to hide nonselected layout view.
     */

  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-search]',
        selectorSearchView: '[data-search-view]',
        selectorSearchInput: '.' + prefix + '--search-input',
        selectorClearIcon: '.' + prefix + '--search-close',
        selectorIconContainer: '.' + prefix + '--search-button[data-search-toggle]',
        classClearHidden: prefix + '--search-close--hidden',
        classLayoutHidden: prefix + '--search-view--hidden'
      };
    }

    /**
     * The map associating DOM element and search instance.
     * @member Search.components
     * @type {WeakMap}
     */

  }]);
  return Search;
}(mixin(createComponent, initComponentBySearch, handles));

Search.components = new WeakMap();

var Accordion = function (_mixin) {
  inherits(Accordion, _mixin);

  /**
   * Accordion.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as an accordion.
   */
  function Accordion(element, options) {
    classCallCheck(this, Accordion);

    var _this = possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, element, options));

    _this.manage(on(_this.element, 'click', function (event) {
      var item = eventMatches(event, _this.options.selectorAccordionItem);
      if (item && !eventMatches(event, _this.options.selectorAccordionContent)) {
        _this._toggle(item);
      }
    }));

    /**
     *
     *  DEPRECATE in v8
     *
     *  Swapping to a button elemenet instead of a div
     *  automatically maps click events to keypress as well
     *  This event listener now is only added if user is using
     *  the older markup
     */

    if (!_this._checkIfButton()) {
      _this.manage(on(_this.element, 'keypress', function (event) {
        var item = eventMatches(event, _this.options.selectorAccordionItem);

        if (item && !eventMatches(event, _this.options.selectorAccordionContent)) {
          _this._handleKeypress(event);
        }
      }));
    }
    return _this;
  }

  createClass(Accordion, [{
    key: '_checkIfButton',
    value: function _checkIfButton() {
      return this.element.firstElementChild.firstElementChild.nodeName === 'BUTTON';
    }

    /**
     * Handles toggling of active state of accordion via keyboard
     * @param {Event} event The event triggering this method.
     */

  }, {
    key: '_handleKeypress',
    value: function _handleKeypress(event) {
      if (event.which === 13 || event.which === 32) {
        this._toggle(event.target);
      }
    }
  }, {
    key: '_toggle',
    value: function _toggle(element) {
      var heading = element.querySelector(this.options.selectorAccordionItemHeading);
      var expanded = heading.getAttribute('aria-expanded');

      if (expanded !== null) {
        heading.setAttribute('aria-expanded', expanded === 'true' ? 'false' : 'true');
      }

      element.classList.toggle(this.options.classActive);
    }

    /**
     * The component options.
     * If `options` is specified in the constructor,
     * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
     * @property {string} selectorInit The CSS selector to find accordion UIs.
     */

  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-accordion]',
        selectorAccordionItem: '.' + prefix + '--accordion__item',
        selectorAccordionItemHeading: '.' + prefix + '--accordion__heading',
        selectorAccordionContent: '.' + prefix + '--accordion__content',
        classActive: prefix + '--accordion__item--active'
      };
    }

    /**
     * The map associating DOM element and accordion UI instance.
     * @type {WeakMap}
     */

  }]);
  return Accordion;
}(mixin(createComponent, initComponentBySearch, handles));

Accordion.components = new WeakMap();

var CopyButton = function (_mixin) {
  inherits(CopyButton, _mixin);

  /**
   * CopyBtn UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a copy button UI.
   */
  function CopyButton(element, options) {
    classCallCheck(this, CopyButton);

    var _this = possibleConstructorReturn(this, (CopyButton.__proto__ || Object.getPrototypeOf(CopyButton)).call(this, element, options));

    _this.manage(on(_this.element, 'click', function () {
      return _this.handleClick();
    }));
    return _this;
  }

  /**
   * Show the feedback tooltip on click. Hide the feedback tooltip after specified timeout value.
   */


  createClass(CopyButton, [{
    key: 'handleClick',
    value: function handleClick() {
      var _this2 = this;

      var feedback = this.element.querySelector(this.options.feedbackTooltip);
      if (feedback) {
        feedback.classList.add(this.options.classShowFeedback);
        setTimeout(function () {
          feedback.classList.remove(_this2.options.classShowFeedback);
        }, this.options.timeoutValue);
      }
    }

    /**
     * The map associating DOM element and copy button UI instance.
     * @member CopyBtn.components
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode CopyBtn.create .create()}, or {@linkcode CopyBtn.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode CopyBtn.init .init()} works.
     * @member CopyBtn.options
     * @type {Object}
     * @property {string} selectorInit The data attribute to find copy button UIs.
     * @property {string} feedbackTooltip The data attribute to find feedback tooltip.
     * @property {string} classShowFeedback The CSS selector for showing the feedback tooltip.
     * @property {number} timeoutValue The specified timeout value before the feedback tooltip is hidden.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-copy-btn]',
        feedbackTooltip: '[data-feedback]',
        classShowFeedback: prefix + '--btn--copy__feedback--displayed',
        timeoutValue: 2000
      };
    }
  }]);
  return CopyButton;
}(mixin(createComponent, initComponentBySearch, handles));

CopyButton.components = new WeakMap();

var Notification = function (_mixin) {
  inherits(Notification, _mixin);

  /**
   * InlineNotification.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a InlineNotification.
   */
  function Notification(element, options) {
    classCallCheck(this, Notification);

    var _this = possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, element, options));

    _this._changeState = function (state, callback) {
      if (state === 'delete-notification') {
        _this.element.parentNode.removeChild(_this.element);
        _this.release();
      }
      callback();
    };

    _this.button = element.querySelector(_this.options.selectorButton);
    if (_this.button) {
      _this.manage(on(_this.button, 'click', function (evt) {
        if (evt.currentTarget === _this.button) {
          _this.remove();
        }
      }));
    }
    return _this;
  }

  createClass(Notification, [{
    key: 'remove',
    value: function remove() {
      this.changeState('delete-notification');
    }

    /**
     * The map associating DOM element and accordion UI instance.
     * @type {WeakMap}
     */


    /**
     * The component options.
     * @property {string} selectorInit The CSS selector to find InlineNotification.
     * @property {string} selectorButton The CSS selector to find close button.
     */

  }]);
  return Notification;
}(mixin(createComponent, initComponentBySearch, eventedState, handles));

Notification.components = new WeakMap();
Notification.options = {
  selectorInit: '[data-notification]',
  selectorButton: '[data-notification-btn]',
  eventBeforeDeleteNotification: 'notification-before-delete',
  eventAfterDeleteNotification: 'notification-after-delete'
};

var Toolbar = function (_mixin) {
  inherits(Toolbar, _mixin);

  /**
   * Toolbar.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as an toolbar.
   */
  function Toolbar(element, options) {
    classCallCheck(this, Toolbar);

    var _this = possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, element, options));

    if (!_this.element.dataset.tableTarget) {
      console.warn('There is no table bound to this toolbar!'); // eslint-disable-line no-console
    } else {
      var boundTable = _this.element.ownerDocument.querySelector(_this.element.dataset.tableTarget);
      var rowHeightBtns = _this.element.querySelector(_this.options.selectorRowHeight);
      if (rowHeightBtns) {
        _this.manage(on(rowHeightBtns, 'click', function (event) {
          _this._handleRowHeightChange(event, boundTable);
        }));
        // [...this.element.querySelectorAll(this.options.selectorRowHeight)].forEach((item) => {
        //   item.addEventListener('click', (event) => { this._handleRowHeightChange(event, boundTable); });
        // });
      }
    }

    _this.manage(on(_this.element.ownerDocument, 'keydown', function (evt) {
      _this._handleKeyDown(evt);
    }));
    _this.manage(on(_this.element.ownerDocument, 'click', function (evt) {
      _this._handleDocumentClick(evt);
    }));
    return _this;
  }

  /**
   * Handles toggling of active state of the toolbar search input
   * @param {Event} event The event triggering this method.
   */


  createClass(Toolbar, [{
    key: '_handleDocumentClick',
    value: function _handleDocumentClick(event) {
      var _this2 = this;

      var searchInput = eventMatches(event, this.options.selectorSearch);
      var isOfSelfSearchInput = searchInput && this.element.contains(searchInput);

      if (isOfSelfSearchInput) {
        var shouldBeOpen = isOfSelfSearchInput && !this.element.classList.contains(this.options.classSearchActive);
        searchInput.classList.toggle(this.options.classSearchActive, shouldBeOpen);
        if (shouldBeOpen) {
          searchInput.querySelector('input').focus();
        }
      }

      var targetComponentElement = eventMatches(event, this.options.selectorInit);
      [].concat(toConsumableArray(this.element.ownerDocument.querySelectorAll(this.options.selectorSearch))).forEach(function (item) {
        if (!targetComponentElement || !targetComponentElement.contains(item)) {
          item.classList.remove(_this2.options.classSearchActive);
        }
      });
    }

    /**
     * Handles toggling of active state of the toolbar search input via the keyboard
     * @param {Event} event The event triggering this method.
     */

  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(event) {
      var searchInput = eventMatches(event, this.options.selectorSearch);
      var isOfSelf = this.element.contains(event.target);
      var shouldBeOpen = isOfSelf && !this.element.classList.contains(this.options.classSearchActive);

      if (searchInput) {
        if ((event.which === 13 || event.which === 32) && !shouldBeOpen) {
          searchInput.classList.add(this.options.classSearchActive);
        }

        if (event.which === 27) {
          searchInput.classList.remove(this.options.classSearchActive);
        }
      }
    }

    /**
     * Handles toggling of the row height of the associated table
     * @param {Event} event The event triggering this method.
     * @param {HTMLElement} boundTable The table associated with the toolbar.
     */

  }, {
    key: '_handleRowHeightChange',
    value: function _handleRowHeightChange(event, boundTable) {
      var value = event.currentTarget.querySelector('input:checked').value;

      if (value === 'tall') {
        boundTable.classList.add(this.options.classTallRows);
      } else {
        boundTable.classList.remove(this.options.classTallRows);
      }
    }

    /**
     * The map associating DOM element and Toolbar UI instance.
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor,
     * properties in this object are overriden for the instance being created.
     * @property {string} selectorInit The CSS selector to find toolbar instances.
     * @property {string} selectorSearch The CSS selector to find search inputs in a toolbar.
     * @property {string} selectorRowHeight The CSS selector to find the row height inputs in a toolbar.
     * @property {string} classTallRows The CSS class for making table rows into tall rows.
     * @property {string} classSearchActive The CSS class the active state of the search input.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-toolbar]',
        selectorSearch: '[data-toolbar-search]',
        selectorRowHeight: '[data-row-height]',
        classTallRows: prefix + '--responsive-table--tall',
        classSearchActive: prefix + '--toolbar-search--active'
      };
    }
  }]);
  return Toolbar;
}(mixin(createComponent, initComponentBySearch, handles));

Toolbar.components = new WeakMap();

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;
var nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_debounce$1 = debounce;

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @param {string} menuDirection Where the floating menu menu should be placed relative to the trigger button.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
var getMenuOffset$1 = function getMenuOffset(menuBody, menuDirection) {
  var _DIRECTION_LEFT$DIREC, _DIRECTION_LEFT$DIREC2;

  var arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(menuBody, ':before');
  var arrowPositionProp = (_DIRECTION_LEFT$DIREC = {}, defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_LEFT, 'right'), defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_TOP, 'bottom'), defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_RIGHT, 'left'), defineProperty(_DIRECTION_LEFT$DIREC, DIRECTION_BOTTOM, 'top'), _DIRECTION_LEFT$DIREC)[menuDirection];
  var menuPositionAdjustmentProp = (_DIRECTION_LEFT$DIREC2 = {}, defineProperty(_DIRECTION_LEFT$DIREC2, DIRECTION_LEFT, 'left'), defineProperty(_DIRECTION_LEFT$DIREC2, DIRECTION_TOP, 'top'), defineProperty(_DIRECTION_LEFT$DIREC2, DIRECTION_RIGHT, 'left'), defineProperty(_DIRECTION_LEFT$DIREC2, DIRECTION_BOTTOM, 'top'), _DIRECTION_LEFT$DIREC2)[menuDirection];
  var values = [arrowPositionProp, 'border-bottom-width'].reduce(function (o, name) {
    return _extends({}, o, defineProperty({}, name, Number((/^([\d-.]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1])));
  }, {});
  values[arrowPositionProp] = values[arrowPositionProp] || -6; // IE, etc.
  if (Object.keys(values).every(function (name) {
    return !isNaN(values[name]);
  })) {
    var arrowPosition = values[arrowPositionProp],
        borderBottomWidth = values['border-bottom-width'];

    return defineProperty({
      left: 0,
      top: 0
    }, menuPositionAdjustmentProp, Math.sqrt(Math.pow(borderBottomWidth, 2) * 2) - arrowPosition);
  }
  return undefined;
};

var Tooltip = function (_mixin) {
  inherits(Tooltip, _mixin);

  /**
   * Tooltip.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   */
  function Tooltip(element, options) {
    classCallCheck(this, Tooltip);

    var _this = possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, element, options));

    _this._hasContextMenu = false;
    _this._debouncedHandleClick = lodash_debounce$1(_this._handleClick, 200);

    _this._hookOn(element);
    return _this;
  }

  /**
   * A flag to detect if `oncontextmenu` event is fired right before `focus`/`blur` events.
   * @type {boolean}
   */


  /**
   * The debounced version of the event handler.
   * @type {Function}
   * @private
   */


  createClass(Tooltip, [{
    key: 'createdByEvent',


    /**
     * A method called when this widget is created upon events.
     * @param {Event} event The event triggering the creation.
     */
    value: function createdByEvent(event) {
      var relatedTarget = event.relatedTarget,
          type = event.type;

      this._debouncedHandleClick({ relatedTarget: relatedTarget, type: type === 'focusin' ? 'focus' : type, details: getLaunchingDetails(event) });
    }

    /**
     * Changes the shown/hidden state.
     * @param {string} state The new state.
     * @param {Object} detail The detail of the event trigging this action.
     * @param {Function} callback Callback called when change in state completes.
     // */

  }, {
    key: 'changeState',
    value: function changeState(state, detail, callback) {
      if (!this.tooltip) {
        var tooltip = this.element.ownerDocument.querySelector(this.element.getAttribute(this.options.attribTooltipTarget));
        if (!tooltip) {
          throw new Error('Cannot find the target tooltip.');
        }

        // Lazily create a component instance for tooltip
        this.tooltip = FloatingMenu.create(tooltip, {
          refNode: this.element,
          classShown: this.options.classShown,
          offset: this.options.objMenuOffset
        });
        this._hookOn(tooltip);
        this.children.push(this.tooltip);
      }

      // Delegates the action of changing state to the tooltip.
      // (And thus the before/after shown/hidden events are fired from the tooltip)
      this.tooltip.changeState(state, Object.assign(detail, { delegatorNode: this.element }), callback);
    }

    /**
     * Attaches event handlers to show/hide the tooltip.
     * @param {Element} element The element to attach the events to.
     * @private
     */

  }, {
    key: '_hookOn',
    value: function _hookOn(element) {
      var _this2 = this;

      var hasFocusin = 'onfocusin' in window;
      var focusinEventName = hasFocusin ? 'focusin' : 'focus';
      [focusinEventName, 'blur', 'touchleave', 'touchcancel'].forEach(function (name) {
        _this2.manage(on(element, name, function (event) {
          var relatedTarget = event.relatedTarget,
              type = event.type;

          var hadContextMenu = _this2._hasContextMenu;
          _this2._hasContextMenu = type === 'contextmenu';
          _this2._debouncedHandleClick({
            relatedTarget: relatedTarget,
            type: type === 'focusin' ? 'focus' : type,
            hadContextMenu: hadContextMenu,
            details: getLaunchingDetails(event)
          });
        }, name === focusinEventName && !hasFocusin));
      });
    }

    /**
     * Handles click/focus events.
     * @param {Object} params The parameters.
     * @param {Element} params.relatedTarget The element that focus went to. (For `blur` event)
     * @param {string} params.type The event type triggering this method.
     * @param {boolean} params.hadContextMenu
     * @param {Object} params.details The event details.
     * @private
     */

  }, {
    key: '_handleClick',
    value: function _handleClick(_ref2) {
      var relatedTarget = _ref2.relatedTarget,
          type = _ref2.type,
          hadContextMenu = _ref2.hadContextMenu,
          details = _ref2.details;

      var state = {
        focus: 'shown',
        blur: 'hidden',
        touchleave: 'hidden',
        touchcancel: 'hidden'
      }[type];

      var shouldPreventClose = void 0;
      if (type === 'blur') {
        // Note: SVGElement in IE11 does not have `.contains()`
        var wentToSelf = relatedTarget && this.element.contains && this.element.contains(relatedTarget) || this.tooltip && this.tooltip.element.contains(relatedTarget);
        shouldPreventClose = hadContextMenu || wentToSelf;
      }
      if (!shouldPreventClose) {
        this.changeState(state, details);
      }
    }
  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-tooltip-trigger]',
        classShown: prefix + '--tooltip--shown',
        attribTooltipTarget: 'data-tooltip-target',
        objMenuOffset: getMenuOffset$1,
        initEventNames: ['focus']
      };
    }
  }]);
  return Tooltip;
}(mixin(createComponent, initComponentByEvent, exports$1, handles));

Tooltip.components = new WeakMap();

var ProgressIndicator = function (_mixin) {
  inherits(ProgressIndicator, _mixin);

  /**
   * ProgressIndicator.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element representing the ProgressIndicator.
   * @param {Object} [options] The component options.
   * @property {string} [options.selectorStepElement] The CSS selector to find step elements.
   * @property {string} [options.selectorCurrent] The CSS selector to find the current step element.
   * @property {string} [options.selectorIncomplete] The CSS class to find incomplete step elements.
   * @property {string} [options.selectorComplete] The CSS selector to find completed step elements.
   * @property {string} [options.classStep] The className for a step element.
   * @property {string} [options.classComplete] The className for a completed step element.
   * @property {string} [options.classCurrent] The className for the current step element.
   * @property {string} [options.classIncomplete] The className for a incomplete step element.
   */
  function ProgressIndicator(element, options) {
    classCallCheck(this, ProgressIndicator);

    /**
     * The component state.
     * @type {Object}
     */
    var _this = possibleConstructorReturn(this, (ProgressIndicator.__proto__ || Object.getPrototypeOf(ProgressIndicator)).call(this, element, options));

    _this.state = {
      /**
       * The current step index.
       * @type {number}
       */
      currentIndex: _this.getCurrent().index,

      /**
       * Total number of steps.
       * @type {number}
       */
      totalSteps: _this.getSteps().length
    };
    return _this;
  }

  /**
   * Returns all steps with details about element and index.
   */


  createClass(ProgressIndicator, [{
    key: 'getSteps',
    value: function getSteps() {
      return [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorStepElement))).map(function (element, index) {
        return {
          element: element,
          index: index
        };
      });
    }

    /**
     * Returns current step; gives detail about element and index.
     */

  }, {
    key: 'getCurrent',
    value: function getCurrent() {
      var currentEl = this.element.querySelector(this.options.selectorCurrent);
      return this.getSteps().filter(function (step) {
        return step.element === currentEl;
      })[0];
    }

    /**
     * Sets the current step.
     * * @param {Number} new step index or use default in `this.state.currentIndex`.
     */

  }, {
    key: 'setCurrent',
    value: function setCurrent() {
      var _this2 = this;

      var newCurrentStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.currentIndex;

      var changed = false;

      if (newCurrentStep !== this.state.currentIndex) {
        this.state.currentIndex = newCurrentStep;
        changed = true;
      }

      if (changed) {
        this.getSteps().forEach(function (step) {
          if (step.index < newCurrentStep) {
            _this2._updateStep({
              element: step.element,
              className: _this2.options.classComplete,
              html: _this2._getSVGComplete()
            });
          }

          if (step.index === newCurrentStep) {
            _this2._updateStep({
              element: step.element,
              className: _this2.options.classCurrent,
              html: _this2._getCurrentSVG()
            });
          }

          if (step.index > newCurrentStep) {
            _this2._updateStep({
              element: step.element,
              className: _this2.options.classIncomplete,
              html: _this2._getIncompleteSVG()
            });
          }
        });
      }
    }

    /**
     * Update step with correct inline SVG and className
     * @param {Object} args
     * @param {Object} [args.element] target element
     * @param {Object} [args.className] new className
     * @param {Object} [args.html] new inline SVG to insert
     */

  }, {
    key: '_updateStep',
    value: function _updateStep(args) {
      var element = args.element,
          className = args.className,
          html = args.html;


      if (element.firstElementChild) {
        element.removeChild(element.firstElementChild);
      }

      if (!element.classList.contains(className)) {
        element.setAttribute('class', this.options.classStep);
        element.classList.add(className);
      }

      element.insertAdjacentHTML('afterbegin', html);
    }

    /**
     * Returns HTML string for an SVG used to represent a compelted step (checkmark)
     */

  }, {
    key: '_getSVGComplete',
    value: function _getSVGComplete() {
      return '<svg width="24px" height="24px" viewBox="0 0 24 24">\n        <circle cx="12" cy="12" r="12"></circle>\n        <polygon points="10.3 13.6 7.7 11 6.3 12.4 10.3 16.4 17.8 9 16.4 7.6"></polygon>\n      </svg>';
    }

    /**
     * Returns HTML string for an SVG used to represent current step (circles, like a radio button, but not.)
     */

  }, {
    key: '_getCurrentSVG',
    value: function _getCurrentSVG() {
      return '<svg>\n        <circle cx="12" cy="12" r="12"></circle>\n        <circle cx="12" cy="12" r="6"></circle>\n      </svg>';
    }

    /**
     * Returns HTML string for an SVG used to represent incomple step (grey empty circle)
     */

  }, {
    key: '_getIncompleteSVG',
    value: function _getIncompleteSVG() {
      return '<svg>\n        <circle cx="12" cy="12" r="12"></circle>\n      </svg>';
    }
  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor,
     * {@linkcode ProgressIndicator.create .create()}, or {@linkcode ProgressIndicator.init .init()},
     * properties in this object are overriden for the instance being created.
     * @member ProgressIndicator.options
     * @type {Object}
     * @property {string} selectorInit The CSS selector to find content switcher button set.
     * @property {string} [selectorStepElement] The CSS selector to find step elements.
     * @property {string} [selectorCurrent] The CSS selector to find the current step element.
     * @property {string} [selectorIncomplete] The CSS class to find incomplete step elements.
     * @property {string} [selectorComplete] The CSS selector to find completed step elements.
     * @property {string} [classStep] The className for a step element.
     * @property {string} [classComplete] The className for a completed step element.
     * @property {string} [classCurrent] The className for the current step element.
     * @property {string} [classIncomplete] The className for a incomplete step element.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-progress]',
        selectorStepElement: '.' + prefix + '--progress-step',
        selectorCurrent: '.' + prefix + '--progress-step--current',
        selectorIncomplete: '.' + prefix + '--progress-step--incomplete',
        selectorComplete: '.' + prefix + '--progress-step--complete',
        classStep: prefix + '--progress-step',
        classComplete: prefix + '--progress-step--complete',
        classCurrent: prefix + '--progress-step--current',
        classIncomplete: prefix + '--progress-step--incomplete'
      };
    }
  }]);
  return ProgressIndicator;
}(mixin(createComponent, initComponentBySearch));

ProgressIndicator.components = new WeakMap();

var StructuredList = function (_mixin) {
  inherits(StructuredList, _mixin);

  /**
   * StructuredList
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The root element of tables
   * @param {Object} [options] the... options
   * @param {string} [options.selectorInit] selector initialization
   * @param {string} [options.selectorRow] css selector for selected row
   */
  function StructuredList(element, options) {
    classCallCheck(this, StructuredList);

    var _this = possibleConstructorReturn(this, (StructuredList.__proto__ || Object.getPrototypeOf(StructuredList)).call(this, element, options));

    _this.manage(on(_this.element, 'keydown', function (evt) {
      if (evt.which === 38 || evt.which === 40) {
        _this._handleKeydownArrow(evt);
      }
      if (evt.which === 13 || evt.which === 32) {
        _this._handleKeydownChecked(evt);
      }
    }));
    _this.manage(on(_this.element, 'click', function (evt) {
      _this._handleClick(evt);
    }));
    return _this;
  }

  createClass(StructuredList, [{
    key: '_direction',
    value: function _direction(evt) {
      return {
        38: -1, // backward
        40: 1 // forward
      }[evt.which];
    }
  }, {
    key: '_nextIndex',
    value: function _nextIndex(array, arrayItem, direction) {
      return array.indexOf(arrayItem) + direction; // returns -1, 0, 1, 2, 3, 4...
    }
  }, {
    key: '_getInput',
    value: function _getInput(index) {
      var rows = [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorRow)));
      return this.element.ownerDocument.querySelector(this.options.selectorListInput(rows[index].getAttribute('for')));
    }
  }, {
    key: '_handleInputChecked',
    value: function _handleInputChecked(index) {
      var input = this._getInput(index);
      input.checked = true;
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(evt) {
      var _this2 = this;

      var selectedRow = eventMatches(evt, this.options.selectorRow);
      [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorRow))).forEach(function (row) {
        return row.classList.remove(_this2.options.classActive);
      });
      if (selectedRow) {
        selectedRow.classList.add(this.options.classActive);
      }
    }

    // Handle Enter or Space keydown events for selecting <label> rows

  }, {
    key: '_handleKeydownChecked',
    value: function _handleKeydownChecked(evt) {
      var _this3 = this;

      var selectedRow = eventMatches(evt, this.options.selectorRow);
      [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorRow))).forEach(function (row) {
        return row.classList.remove(_this3.options.classActive);
      });
      if (selectedRow) {
        selectedRow.classList.add(this.options.classActive);
        var input = this.element.querySelector(this.options.selectorListInput(selectedRow.getAttribute('for')));
        input.checked = true;
      }
    }

    // Handle up and down keydown events for selecting <label> rows

  }, {
    key: '_handleKeydownArrow',
    value: function _handleKeydownArrow(evt) {
      var _this4 = this;

      var selectedRow = eventMatches(evt, this.options.selectorRow);
      var direction = this._direction(evt);

      if (direction && selectedRow !== undefined) {
        var rows = [].concat(toConsumableArray(this.element.querySelectorAll(this.options.selectorRow)));
        rows.forEach(function (row) {
          return row.classList.remove(_this4.options.classActive);
        });
        var firstIndex = 0;
        var nextIndex = this._nextIndex(rows, selectedRow, direction);
        var lastIndex = rows.length - 1;

        switch (nextIndex) {
          case -1:
            rows[lastIndex].classList.add(this.options.classActive);
            rows[lastIndex].focus();
            this._handleInputChecked(lastIndex);
            break;
          case rows.length:
            rows[firstIndex].classList.add(this.options.classActive);
            rows[firstIndex].focus();
            this._handleInputChecked(firstIndex);
            break;
          default:
            rows[nextIndex].classList.add(this.options.classActive);
            rows[nextIndex].focus();
            this._handleInputChecked(nextIndex);
            break;
        }
      }
    }
  }], [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-structured-list]',
        selectorRow: '[data-structured-list] .' + prefix + '--structured-list-tbody > label.' + prefix + '--structured-list-row',
        selectorListInput: function selectorListInput(id) {
          return '#' + id + '.' + prefix + '--structured-list-input';
        },
        classActive: prefix + '--structured-list-row--selected'
      };
    }
  }]);
  return StructuredList;
}(mixin(createComponent, initComponentBySearch, handles));

StructuredList.components = new WeakMap();

var Slider = function (_mixin) {
  inherits(Slider, _mixin);

  /**
   * Slider.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as an slider.
   */
  function Slider(element, options) {
    classCallCheck(this, Slider);

    var _this = possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, element, options));

    _this._changeState = function (state, detail, callback) {
      callback();
    };

    _this.sliderActive = false;
    _this.dragging = false;

    _this.track = _this.element.querySelector(_this.options.selectorTrack);
    _this.filledTrack = _this.element.querySelector(_this.options.selectorFilledTrack);
    _this.thumb = _this.element.querySelector(_this.options.selectorThumb);
    _this.input = _this.element.querySelector(_this.options.selectorInput);

    if (_this.element.dataset.sliderInputBox) {
      _this.boundInput = _this.element.ownerDocument.querySelector(_this.element.dataset.sliderInputBox);
      _this._updateInput();
      _this.manage(on(_this.boundInput, 'change', function (evt) {
        _this.setValue(evt.target.value);
      }));
      _this.manage(on(_this.boundInput, 'focus', function (evt) {
        evt.target.select();
      }));
      // workaround for safari
      _this.manage(on(_this.boundInput, 'mouseup', function (evt) {
        evt.preventDefault();
      }));
    }

    _this._updatePosition();

    _this.manage(on(_this.thumb, 'mousedown', function () {
      _this.sliderActive = true;
    }));
    _this.manage(on(_this.element.ownerDocument, 'mouseup', function () {
      _this.sliderActive = false;
    }));
    _this.manage(on(_this.element.ownerDocument, 'mousemove', function (evt) {
      var disabled = _this.element.classList.contains(_this.options.classDisabled);
      if (_this.sliderActive === true && !disabled) {
        _this._updatePosition(evt);
      }
    }));
    _this.manage(on(_this.thumb, 'keydown', function (evt) {
      var disabled = _this.element.classList.contains(_this.options.classDisabled);
      if (!disabled) {
        _this._updatePosition(evt);
      }
    }));
    _this.manage(on(_this.track, 'click', function (evt) {
      var disabled = _this.element.classList.contains(_this.options.classDisabled);
      if (!disabled) {
        _this._updatePosition(evt);
      }
    }));
    return _this;
  }

  createClass(Slider, [{
    key: '_updatePosition',
    value: function _updatePosition(evt) {
      var _this2 = this;

      var _calcValue2 = this._calcValue(evt),
          left = _calcValue2.left,
          newValue = _calcValue2.newValue;

      if (this.dragging) {
        return;
      }

      this.dragging = true;

      requestAnimationFrame(function () {
        _this2.dragging = false;
        _this2.thumb.style.left = left + '%';
        _this2.filledTrack.style.transform = 'translate(0%, -50%) scaleX(' + left / 100 + ')';
        _this2.input.value = newValue;
        _this2._updateInput();
        _this2.changeState('slider-value-change', { value: newValue });
      });
    }
  }, {
    key: '_calcValue',
    value: function _calcValue(evt) {
      var _getInputProps = this.getInputProps(),
          value = _getInputProps.value,
          min = _getInputProps.min,
          max = _getInputProps.max,
          step = _getInputProps.step;

      var range = max - min;
      var valuePercentage = (value - min) / range * 100;

      var left = void 0;
      var newValue = void 0;
      left = valuePercentage;
      newValue = value;

      if (evt) {
        var type = evt.type;


        if (type === 'keydown') {
          var direction = {
            40: -1, // decreasing
            37: -1, // decreasing
            38: 1, // increasing
            39: 1 // increasing
          }[evt.which];

          if (direction !== undefined) {
            var multiplier = evt.shiftKey === true ? range / step / this.options.stepMultiplier : 1;
            var stepMultiplied = step * multiplier;
            var stepSize = stepMultiplied / range * 100;
            left = valuePercentage + stepSize * direction;
            newValue = Number(value) + stepMultiplied * direction;
          }
        }
        if (type === 'mousemove' || type === 'click') {
          if (type === 'click') {
            this.element.querySelector(this.options.selectorThumb).classList.add(this.options.classThumbClicked);
          } else {
            this.element.querySelector(this.options.selectorThumb).classList.remove(this.options.classThumbClicked);
          }

          var track = this.track.getBoundingClientRect();
          var unrounded = (evt.clientX - track.left) / track.width;
          var rounded = Math.round(range * unrounded / step) * step;
          left = rounded / range * 100;
          newValue = rounded + min;
        }
      }

      if (newValue <= Number(min)) {
        left = 0;
        newValue = min;
      }
      if (newValue >= Number(max)) {
        left = 100;
        newValue = max;
      }

      return { left: left, newValue: newValue };
    }
  }, {
    key: '_updateInput',
    value: function _updateInput() {
      if (this.boundInput) {
        this.boundInput.value = this.input.value;
      }
    }
  }, {
    key: 'getInputProps',
    value: function getInputProps() {
      var values = {
        value: Number(this.input.value),
        min: Number(this.input.min),
        max: Number(this.input.max),
        step: this.input.step ? Number(this.input.step) : 1
      };
      return values;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.input.value = value;
      this._updatePosition();
    }
  }, {
    key: 'stepUp',
    value: function stepUp() {
      this.input.stepUp();
      this._updatePosition();
    }
  }, {
    key: 'stepDown',
    value: function stepDown() {
      this.input.stepDown();
      this._updatePosition();
    }

    /**
     * The map associating DOM element and Slider UI instance.
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor,
     * properties in this object are overriden for the instance being created.
     * @property {string} selectorInit The CSS selector to find slider instances.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-slider]',
        selectorTrack: '.' + prefix + '--slider__track',
        selectorFilledTrack: '.' + prefix + '--slider__filled-track',
        selectorThumb: '.' + prefix + '--slider__thumb',
        selectorInput: '.' + prefix + '--slider__input',
        classDisabled: prefix + '--slider--disabled',
        classThumbClicked: prefix + '--slider__thumb--clicked',
        eventBeforeSliderValueChange: 'slider-before-value-change',
        eventAfterSliderValueChange: 'slider-after-value-change',
        stepMultiplier: 4
      };
    }
  }]);
  return Slider;
}(mixin(createComponent, initComponentBySearch, eventedState, handles));

Slider.components = new WeakMap();

var Tile = function (_mixin) {
  inherits(Tile, _mixin);

  /**
   * Tile.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an Tile.
   */
  function Tile(element, options) {
    classCallCheck(this, Tile);

    var _this = possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).call(this, element, options));

    _this._getClass = function (type) {
      var typeObj = {
        expandable: _this.options.classExpandedTile,
        clickable: _this.options.classClickableTile,
        selectable: _this.options.classSelectableTile
      };
      return typeObj[type];
    };

    _this._hookActions = function (tileClass) {
      var isExpandable = _this.tileType === 'expandable';
      if (isExpandable) {
        var aboveTheFold = _this.element.querySelector(_this.options.selectorAboveTheFold);
        var getStyle = _this.element.ownerDocument.defaultView.getComputedStyle(_this.element, null);
        var tilePaddingTop = parseInt(getStyle.getPropertyValue('padding-top'), 10);
        var tilePaddingBottom = parseInt(getStyle.getPropertyValue('padding-bottom'), 10);
        var tilePadding = tilePaddingTop + tilePaddingBottom;
        if (aboveTheFold) {
          _this.tileHeight = _this.element.getBoundingClientRect().height;
          _this.atfHeight = aboveTheFold.getBoundingClientRect().height + tilePadding;
          _this.element.style.maxHeight = _this.atfHeight + 'px';
        }

        if (_this.element.classList.contains(_this.options.classExpandedTile)) {
          _this._setTileHeight();
        }
      }

      _this.element.addEventListener('click', function (evt) {
        var input = eventMatches(evt, _this.options.selectorTileInput);
        if (!input) {
          _this.element.classList.toggle(tileClass);
        }
        if (isExpandable) {
          _this._setTileHeight();
        }
      });
      _this.element.addEventListener('keydown', function (evt) {
        var input = _this.element.querySelector(_this.options.selectorTileInput);
        if (input) {
          if (evt.which === 13 || evt.which === 32) {
            if (!isExpandable) {
              _this.element.classList.toggle(tileClass);
              input.checked = !input.checked;
            }
          }
        }
      });
    };

    _this._setTileHeight = function () {
      var isExpanded = _this.element.classList.contains(_this.options.classExpandedTile);
      _this.element.style.maxHeight = isExpanded ? _this.tileHeight + 'px' : _this.atfHeight + 'px';
    };

    _this.tileType = _this.element.dataset.tile;
    _this.tileHeight = 0; // Tracks expandable tile height
    _this.atfHeight = 0; // Tracks above the fold height
    _this._hookActions(_this._getClass(_this.tileType));
    return _this;
  }

  createClass(Tile, [{
    key: 'release',
    value: function release() {
      get(Tile.prototype.__proto__ || Object.getPrototypeOf(Tile.prototype), 'release', this).call(this);
    }

    /**
     * The map associating DOM element and Tile UI instance.
     * @type {WeakMap}
     */

  }], [{
    key: 'options',


    /**
     * The component options.
     * If `options` is specified in the constructor,
     * properties in this object are overriden for the instance being created.
     * @property {string} selectorInit The CSS selector to find Tile instances.
     */
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-tile]',
        selectorAboveTheFold: '[data-tile-atf]',
        selectorTileInput: '[data-tile-input]',
        classExpandedTile: prefix + '--tile--is-expanded',
        classClickableTile: prefix + '--tile--is-clicked',
        classSelectableTile: prefix + '--tile--is-selected'
      };
    }
  }]);
  return Tile;
}(mixin(createComponent, initComponentBySearch));

Tile.components = new WeakMap();

var Carousel = function (_mixin) {
  inherits(Carousel, _mixin);

  /**
   * Carousel.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @param {HTMLElement} element The element working as an carousel.
   */
  function Carousel(element, options) {
    classCallCheck(this, Carousel);

    var _this = possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, element, options));

    _this.handleClick = function (evt) {
      if (evt.target.matches(_this.options.selectorScrollRight)) {
        _this.sideScroll('right');
      } else {
        _this.sideScroll('left');
      }
    };

    _this.sideScroll = function (direction) {
      var filmstripWidth = _this.filmstrip.getBoundingClientRect().width;
      var itemWidth = _this.carouselItem.getBoundingClientRect().width + 20;
      var re = /\.*translateX\((.*)px\)/i;

      var translateXValue = _this.filmstrip.style.transform ? Number(_this.filmstrip.style.transform.split(re)[1]) : 0;
      var directionValue = direction === 'right' ? -1 : 1;

      var itemWidthDirection = itemWidth * directionValue;
      var newTranslateValue = itemWidthDirection + translateXValue;
      if (newTranslateValue > 0) {
        newTranslateValue = 0;
      }
      if (newTranslateValue < filmstripWidth * -1) {
        newTranslateValue = filmstripWidth * -1;
      }
      _this.filmstrip.style.transform = 'translateX(' + newTranslateValue + 'px)';
    };

    _this.filmstrip = _this.element.querySelector(_this.options.selectorFilmstrip);
    _this.carouselItem = _this.element.querySelector(_this.options.selectorCarouselItem);

    _this.element.addEventListener('click', function (evt) {
      return _this.handleClick(evt);
    });
    return _this;
  }

  createClass(Carousel, null, [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-carousel]',
        selectorFilmstrip: '.' + prefix + '--filmstrip',
        selectorScrollRight: '[data-scroll-right]',
        selectorScrollLeft: '[data-scroll-left]',
        selectorCarouselBtn: '.' + prefix + '--carousel__btn',
        selectorCarouselItem: '.' + prefix + '--carousel__item'
      };
    }

    /**
     * The map associating DOM element and accordion UI instance.
     * @type {WeakMap}
     */

  }]);
  return Carousel;
}(mixin(createComponent, initComponentBySearch));

Carousel.components = new WeakMap();

var Lightbox = function (_mixin) {
  inherits(Lightbox, _mixin);

  function Lightbox(element, options) {
    classCallCheck(this, Lightbox);

    var _this = possibleConstructorReturn(this, (Lightbox.__proto__ || Object.getPrototypeOf(Lightbox)).call(this, element, options));

    _this.showLightbox = function (evt) {
      if (!evt.detail.launchingElement.dataset.carouselItemIndex) {
        throw new Error('launchingElement must have carouselItemIndex data attribute to indicated what item to display');
      }
      _this.activeIndex = evt.detail.launchingElement.dataset.carouselItemIndex;
      _this.updateSlide();
    };

    _this.handleClick = function (evt) {
      if (evt.target.matches(_this.options.selectorScrollRight)) {
        if (_this.activeIndex < _this.totalSlides) {
          _this.activeIndex++;
          _this.updateSlide();
        }
      }

      if (evt.target.matches(_this.options.selectorScrollLeft)) {
        if (_this.activeIndex > 0) {
          _this.activeIndex--;
          _this.updateSlide();
        }
      }
    };

    _this.updateSlide = function () {
      var items = [].concat(toConsumableArray(_this.element.querySelectorAll(_this.options.selectorLightboxItem)));
      if (_this.activeIndex < 0 || _this.activeIndex >= items.length) {
        throw new RangeError('carouselItemIndex data attribute must be in range of lightbox items length');
      }
      items.forEach(function (item) {
        return item.classList.remove(_this.options.classActiveItem);
      });
      items[_this.activeIndex].classList.add(_this.options.classActiveItem);
    };

    _this.activeIndex = _this.element.dataset.lightboxIndex;
    _this.totalSlides = _this.element.querySelectorAll(_this.options.selectorLightboxItem).length - 1;

    _this.updateSlide();

    _this.element.addEventListener('click', function (evt) {
      return _this.handleClick(evt);
    });
    _this.element.parentNode.addEventListener('modal-beingshown', function (evt) {
      return _this.showLightbox(evt);
    });
    return _this;
  }

  createClass(Lightbox, null, [{
    key: 'options',
    get: function get$$1() {
      var prefix = settings.prefix;

      return {
        selectorInit: '[data-lightbox]',
        selectorScrollRight: '[data-scroll-right]',
        selectorScrollLeft: '[data-scroll-left]',
        selectorLightboxItem: '.' + prefix + '--lightbox__item',
        classActiveItem: prefix + '--lightbox__item--shown'
      };
    }

    /**
     * The map associating DOM element and accordion UI instance.
     * @type {WeakMap}
     */

  }]);
  return Lightbox;
}(mixin(createComponent, initComponentBySearch));

Lightbox.components = new WeakMap();

var CodeSnippet = function (_mixin) {
  inherits(CodeSnippet, _mixin);

  /**
   * CodeSnippet UI.
   * @extends CreateComponent
   * @extends InitComponentBySearch
   * @extends Handles
   * @param {HTMLElement} element The element working as a CodeSnippet UI.
   */

  function CodeSnippet(element, options) {
    classCallCheck(this, CodeSnippet);

    var _this = possibleConstructorReturn(this, (CodeSnippet.__proto__ || Object.getPrototypeOf(CodeSnippet)).call(this, element, options));

    _this._initCodeSnippet();
    _this.element.querySelector(_this.options.classExpandBtn).addEventListener('click', function (evt) {
      return _this._handleClick(evt);
    });
    return _this;
  }

  createClass(CodeSnippet, [{
    key: '_handleClick',
    value: function _handleClick() {
      var expandBtn = this.element.querySelector(this.options.classExpandText);
      this.element.classList.toggle(this.options.classExpanded);

      if (this.element.classList.contains(this.options.classExpanded)) {
        expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowLessText);
      } else {
        expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowMoreText);
      }
    }
  }, {
    key: '_initCodeSnippet',
    value: function _initCodeSnippet() {
      var expandBtn = this.element.querySelector(this.options.classExpandText);
      if (!expandBtn) {
        throw new TypeError('Cannot find the expand button.');
      }

      expandBtn.textContent = expandBtn.getAttribute(this.options.attribShowMoreText);

      if (this.element.offsetHeight < this.options.minHeight) {
        this.element.classList.add(this.options.classHideExpand);
        this.element.classList.add(this.options.classExpanded);
      }
    }

    /**
     * The map associating DOM element and code snippet UI instance.
     * @member CodeSnippet.components
     * @type {WeakMap}
     */


    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode CodeSnippet.create .create()},
     * or {@linkcode CodeSnippet.init .init()},
     * properties in this object are overriden for the instance being create and how {@linkcode CodeSnippet.init .init()} works.
     * @member CodeSnippet.options
     * @type {Object}
     * @property {string} selectorInit The data attribute to find code snippet UIs.
     */

  }]);
  return CodeSnippet;
}(mixin(createComponent, initComponentBySearch, handles));

CodeSnippet.components = new WeakMap();
CodeSnippet.options = {
  selectorInit: '[data-code-snippet]',
  attribShowMoreText: 'data-show-more-text',
  attribShowLessText: 'data-show-less-text',
  minHeight: 288,
  classExpanded: 'bx--snippet--expand',
  classExpandBtn: '.bx--snippet-btn--expand',
  classExpandText: '.bx--snippet-btn--text',
  classHideExpand: 'bx--snippet-btn--expand--hide'
};



var components$1 = Object.freeze({
	Checkbox: Checkbox,
	FileUploader: FileUploader,
	FabButton: FabButton,
	ContentSwitcher: ContentSwitcher,
	Tab: Tab,
	OverflowMenu: OverflowMenu,
	Modal: Modal,
	Loading: Loading,
	InlineLoading: InlineLoading,
	Dropdown: Dropdown,
	NumberInput: NumberInput,
	DataTable: DataTable,
	DataTableV2: DataTableV2,
	DatePicker: DatePicker,
	LeftNav: LeftNav,
	ProfileSwitcher: ProfileSwitcher,
	Pagination: Pagination,
	Search: Search,
	Accordion: Accordion,
	CopyButton: CopyButton,
	Notification: Notification,
	Toolbar: Toolbar,
	Tooltip: Tooltip,
	ProgressIndicator: ProgressIndicator,
	FloatingMenu: FloatingMenu,
	StructuredList: StructuredList,
	Slider: Slider,
	Tile: Tile,
	Carousel: Carousel,
	Lightbox: Lightbox,
	CodeSnippet: CodeSnippet
});

var components = components$1;

/**
 * The handles for event handlers to lazily instantiate components.
 * @type {Handle[]}
 */
var lazyInitHandles = [];

/**
 * Instantiates components automatically
 * by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
 * or upon DOM events (e.g. clicking) on such elements.
 * See each components' static `.init()` methods for details.
 * @private
 */
var init = function init() {
  var componentClasses = Object.keys(components).map(function (key) {
    return components[key];
  }).filter(function (component) {
    return typeof component.init === 'function';
  });
  if (!settings.disableAutoInit) {
    componentClasses.forEach(function (Clz) {
      var h = Clz.init();
      if (h) {
        lazyInitHandles.push(h);
      }
    });
  }
};

/**
 * Replaces the list of components to initialize.
 * @param {Object} componentsToReplaceWith The new list of components.
 */


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  // Let consumer have chance to see if it wants automatic instantiation disabled, and then run automatic instantiation otherwise
  setTimeout(init, 0);
}

// ====================//
// Imports and Exports //
// ====================//

// Base Elements & Components
// -------------
// - JavaScript classes for use with components and base-elements.
// - The following statements import classes from actual locations to
//   be consumed from this file instead of their actual locations.

var forEach = Array.prototype.forEach;

var createAndReleaseComponentsUponDOMMutation = function createAndReleaseComponentsUponDOMMutation(records, componentClasses, componentClassesForWatchInit, options) {
  records.forEach(function (record) {
    forEach.call(record.addedNodes, function (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        componentClassesForWatchInit.forEach(function (Clz) {
          Clz.init(node, options);
        });
      }
    });
    forEach.call(record.removedNodes, function (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        componentClasses.forEach(function (Clz) {
          if (node.matches(Clz.options.selectorInit)) {
            var instance = Clz.components.get(node);
            if (instance) {
              instance.release();
            }
          } else {
            forEach.call(node.querySelectorAll(Clz.options.selectorInit), function (element) {
              var instance = Clz.components.get(element);
              if (instance) {
                instance.release();
              }
            });
          }
        });
      }
    });
  });
};

/**
 * Automatically instantiates/destroys components in the given element, by watching for DOM additions/removals.
 * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
 * @param {Object} [options] The component options.
 * @returns {Handle} The handle to stop watching.
 */
var watch = function () {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
    throw new TypeError('DOM document or DOM element should be given to watch for DOM node to create/release components.');
  }

  var componentClasses = Object.keys(components$1).map(function (key) {
    return components$1[key];
  }).filter(function (component) {
    return typeof component.init === 'function';
  });

  var handles = componentClasses.map(function (Clz) {
    return Clz.init(target, options);
  }).filter(Boolean);

  var componentClassesForWatchInit = componentClasses.filter(function (Clz) {
    return !Clz.forLazyInit;
  });

  var observer = new MutationObserver(function (records) {
    createAndReleaseComponentsUponDOMMutation(records, componentClasses, componentClassesForWatchInit, options);
  });
  observer.observe(target, {
    childList: true,
    subtree: true
  });
  return {
    release: function release() {
      for (var handle = handles.pop(); handle; handle = handles.pop()) {
        handle.release();
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }
  };
};

exports.watch = watch;
exports.settings = settings;
exports.Checkbox = Checkbox;
exports.FileUploader = FileUploader;
exports.FabButton = FabButton;
exports.ContentSwitcher = ContentSwitcher;
exports.Tab = Tab;
exports.OverflowMenu = OverflowMenu;
exports.Modal = Modal;
exports.Loading = Loading;
exports.InlineLoading = InlineLoading;
exports.Dropdown = Dropdown;
exports.NumberInput = NumberInput;
exports.DataTable = DataTable;
exports.DataTableV2 = DataTableV2;
exports.DatePicker = DatePicker;
exports.LeftNav = LeftNav;
exports.ProfileSwitcher = ProfileSwitcher;
exports.Pagination = Pagination;
exports.Search = Search;
exports.Accordion = Accordion;
exports.CopyButton = CopyButton;
exports.Notification = Notification;
exports.Toolbar = Toolbar;
exports.Tooltip = Tooltip;
exports.ProgressIndicator = ProgressIndicator;
exports.FloatingMenu = FloatingMenu;
exports.StructuredList = StructuredList;
exports.Slider = Slider;
exports.Tile = Tile;
exports.Carousel = Carousel;
exports.Lightbox = Lightbox;
exports.CodeSnippet = CodeSnippet;

return exports;

}({}));
