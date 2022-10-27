/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/source/components/class.crosshair.component.js":
/*!***************************************************************!*\
  !*** ./public/source/components/class.crosshair.component.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Crosshair; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  core.load.image('crosshair_arrow', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/crosshairs/arrow.png');
}); // проверяем наличие мышки

var mouseIsPresent = false;

var mouseMoveHandler = function mouseMoveHandler(e) {
  mouseIsPresent = true;
  window.removeEventListener('mousemove', mouseMoveHandler);
};

window.addEventListener('mousemove', mouseMoveHandler);

var Crosshair = /*#__PURE__*/function (_ComponentSingleton) {
  _inherits(Crosshair, _ComponentSingleton);

  var _super = _createSuper(Crosshair);

  function Crosshair(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, Crosshair);

    return _super.call(this, game, parent, 'Crosshair', addToStage, enableBody, physicsBodyType);
  }

  _createClass(Crosshair, [{
    key: "make",
    value: function make() {
      var _this = this;

      // так как класс компонента наследуется от Phaser.Group то
      // использовать create для инициализации мы не можем, так
      // как у Phaser.Group уже есть метод create
      // Для компонентов унаследованных от ComponentSingleton
      // метод make вызывается ОДИН раз при первом создании компонента
      console.log('Component.make', 'Crosshair');
      this.updateOnlyExistingChildren = true;
      this.crosshairs = [];
      var sprite = new Phaser.Sprite(this.game, 0, 0, 'crosshair_arrow');
      sprite.anchor.set(0, 0);
      sprite.scale.set(0.05);
      sprite.alpha = 0.7;
      this.setCrosshair('arrow', sprite); // this.game.input.addMoveCallback((pointer, x, y) => {
      //     // pointer returns the active pointer, x and y return the position on the canvas
      //     if (!mouseIsPresent) return;
      //     this.x = x / config.scale.x;
      //     this.y = y / config.scale.y;
      // });

      var canvas = this.game.canvas;
      canvas.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        _this.x = (e.clientX - rect.left) * _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width / canvas.clientWidth;
        _this.y = (e.clientY - rect.top) * _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].height / canvas.clientHeight;
      });
      canvas.addEventListener('mouseover', function () {
        _this.visible = true;
        _this.game.canvas.style.cursor = 'none';
      });
      canvas.addEventListener('mouseout', function () {
        _this.visible = false;
        _this.game.canvas.style.cursor = 'auto';
      });
    }
    /**
     * регистрирует курсор с именем `name` привязывая к имени изображение `crosshair`
     * @param {string} name  название курсора
     * @param {PIXI.DisplayObject} [crosshair] любой объект, унаследованный от PIXI.DisplayObject
     */

  }, {
    key: "addCrosshair",
    value: function addCrosshair(name, crosshair) {
      var data = this.crosshairs.find(function (item) {
        return item.name === name;
      });

      if (!data) {
        this.crosshairs.push({
          name: name,
          crosshair: crosshair
        });
      } else {
        console.warn("A crosshair named '".concat(name, "' already exists but has now been replaced with a new one"));
        this.removeChild(crosshair);
        data.crosshair = crosshair;
      }

      crosshair.exists = false;
      crosshair.visible = false;
      this.addChild(crosshair);
    }
    /**
     * включает заранее зарегестрированный курсор с именем `name`. 
     * Если задан параметр `crosshair` то узображение курсора с именем `name` будет
     * заменено на `crosshair`
     * @param {string} name  название курсора
     * @param {PIXI.DisplayObject} [crosshair] любой объект, унаследованный от PIXI.DisplayObject
     */

  }, {
    key: "setCrosshair",
    value: function setCrosshair(name, crosshair) {
      if (crosshair) this.addCrosshair(name, crosshair);
      var data = this.crosshairs.find(function (item) {
        return item.name === name;
      });

      if (!data) {
        console.warn("Cursor named '".concat(name, "' does not exist"));
        this.game.canvas.style.cursor = 'auto';
        delete this.crosshair;
        delete this.crosshairName;
        return;
      }

      this.crosshair = data.crosshair;
      this.crosshairName = name;
      this.game.canvas.style.cursor = 'none';
      this.crosshairs.forEach(function (item) {
        if (item.name === name) {
          item.crosshair.exists = true;
          item.crosshair.visible = true;
        } else {
          item.crosshair.exists = false;
          item.crosshair.visible = false;
        }
      });
    }
    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(dt) {
      // к сожалению нормально отключение курсора в браузере не работает, поэтому флаги и костыли)))
      this.game.canvas.style.cursor = this.visible && this.crosshairName ? 'none' : 'auto';
    }
  }]);

  return Crosshair;
}(_phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ }),

/***/ "./public/source/components/class.entity.animal.component.js":
/*!*******************************************************************!*\
  !*** ./public/source/components/class.entity.animal.component.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EntityAnimal; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _components_class_entity_base_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/class.entity.base.component.js */ "./public/source/components/class.entity.base.component.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var EntityAnimal = /*#__PURE__*/function (_EntityBase) {
  _inherits(EntityAnimal, _EntityBase);

  var _super = _createSuper(EntityAnimal);

  function EntityAnimal(game, parent) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'EntityAnimal';
    var addToStage = arguments.length > 3 ? arguments[3] : undefined;
    var enableBody = arguments.length > 4 ? arguments[4] : undefined;
    var physicsBodyType = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, EntityAnimal);

    return _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
  }

  _createClass(EntityAnimal, [{
    key: "make",
    value: function make() {
      _get(_getPrototypeOf(EntityAnimal.prototype), "make", this).call(this); // счетчики еды


      this.foodCounter = 0;
      this.foodTime = 0;
      this.foodProgress = 0;
    }
    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {
      _get(_getPrototypeOf(EntityAnimal.prototype), "update", this).call(this, game);

      var elapsed = game.time.elapsedMS; // const timer = game.time.time;

      if (this.foodTime) {
        var _this$foodStatus, _this$foodStatus$setS;

        this.isProductProgressPaused = true;
        if (this.foodCounter === 0) return;
        this.isProductProgressPaused = false;
        this.foodProgress += elapsed;

        if (this.foodProgress >= this.foodTime) {
          this.foodProgress -= this.foodTime;
          this.foodCounter -= 1;
        }

        this === null || this === void 0 ? void 0 : (_this$foodStatus = this.foodStatus) === null || _this$foodStatus === void 0 ? void 0 : (_this$foodStatus$setS = _this$foodStatus.setStaus) === null || _this$foodStatus$setS === void 0 ? void 0 : _this$foodStatus$setS.call(_this$foodStatus, this.foodProgress, this.foodCounter);
      }
    }
    /**
     * покормить животинку
     * @param {number} amount количество еды
     * @returns {boolean} если удалось собрать урожай то `true` иначе `false`
     */

  }, {
    key: "feed",
    value: function feed(amount) {
      var _this$foodStatus2, _this$foodStatus2$set, _this$snd_feed, _this$snd_feed$play;

      if (!this.foodTime) return false;
      this.foodCounter += amount;
      this === null || this === void 0 ? void 0 : (_this$foodStatus2 = this.foodStatus) === null || _this$foodStatus2 === void 0 ? void 0 : (_this$foodStatus2$set = _this$foodStatus2.setStaus) === null || _this$foodStatus2$set === void 0 ? void 0 : _this$foodStatus2$set.call(_this$foodStatus2, this.foodProgress, this.foodCounter);
      this === null || this === void 0 ? void 0 : (_this$snd_feed = this.snd_feed) === null || _this$snd_feed === void 0 ? void 0 : (_this$snd_feed$play = _this$snd_feed.play) === null || _this$snd_feed$play === void 0 ? void 0 : _this$snd_feed$play.call(_this$snd_feed);
      return true;
    }
  }]);

  return EntityAnimal;
}(_components_class_entity_base_component_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.entity.base.component.js":
/*!*****************************************************************!*\
  !*** ./public/source/components/class.entity.base.component.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EntityBase; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var EntityBase = /*#__PURE__*/function (_Component) {
  _inherits(EntityBase, _Component);

  var _super = _createSuper(EntityBase);

  function EntityBase(game, parent) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'EntityBase';
    var addToStage = arguments.length > 3 ? arguments[3] : undefined;
    var enableBody = arguments.length > 4 ? arguments[4] : undefined;
    var physicsBodyType = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, EntityBase);

    return _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
  }

  _createClass(EntityBase, [{
    key: "make",
    value: function make() {
      // счетчики еды и продукта
      this.productTime = 0;
      this.productProgress = 0;
    }
    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {
      var elapsed = game.time.elapsedMS; // const timer = game.time.time;

      if (this.isProductProgressPaused) return;

      if (this.productTime) {
        var _this$productStatus, _this$productStatus$s;

        this.productProgress += elapsed;
        this === null || this === void 0 ? void 0 : (_this$productStatus = this.productStatus) === null || _this$productStatus === void 0 ? void 0 : (_this$productStatus$s = _this$productStatus.setStaus) === null || _this$productStatus$s === void 0 ? void 0 : _this$productStatus$s.call(_this$productStatus, Math.min(1, this.productProgress / this.productTime));

        if (this.autoCollect) {
          if (this.productProgress >= this.productTime) {
            var _this$snd_collect, _this$snd_collect$pla;

            this.productProgress -= this.productTime;
            _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].emit('entity.collect', {
              // ...field,
              wx: this.wx,
              wy: this.wy,
              entityName: this.entityName
            });
            this === null || this === void 0 ? void 0 : (_this$snd_collect = this.snd_collect) === null || _this$snd_collect === void 0 ? void 0 : (_this$snd_collect$pla = _this$snd_collect.play) === null || _this$snd_collect$pla === void 0 ? void 0 : _this$snd_collect$pla.call(_this$snd_collect);
          }
        }
      }
    }
    /**
     * собрать произведенный продукт
     * @returns {boolean} если удалось собрать урожай то `true` иначе `false`
     */

  }, {
    key: "collect",
    value: function collect() {
      var _this$productStatus2, _this$productStatus2$, _this$snd_collect2, _this$snd_collect2$pl;

      if (!this.productTime) return false;
      if (this.productProgress < this.productTime) return false;
      this.productProgress = 0;
      this === null || this === void 0 ? void 0 : (_this$productStatus2 = this.productStatus) === null || _this$productStatus2 === void 0 ? void 0 : (_this$productStatus2$ = _this$productStatus2.setStaus) === null || _this$productStatus2$ === void 0 ? void 0 : _this$productStatus2$.call(_this$productStatus2, Math.min(1, this.productProgress / this.productTime));
      this === null || this === void 0 ? void 0 : (_this$snd_collect2 = this.snd_collect) === null || _this$snd_collect2 === void 0 ? void 0 : (_this$snd_collect2$pl = _this$snd_collect2.play) === null || _this$snd_collect2$pl === void 0 ? void 0 : _this$snd_collect2$pl.call(_this$snd_collect2);
      return true;
    }
  }]);

  return EntityBase;
}(_phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.entity.chicken.component.js":
/*!********************************************************************!*\
  !*** ./public/source/components/class.entity.chicken.component.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EntityChicken; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _components_class_entity_animal_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/class.entity.animal.component.js */ "./public/source/components/class.entity.animal.component.js");
/* harmony import */ var _components_class_entity_food_status_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/class.entity.food.status.component.js */ "./public/source/components/class.entity.food.status.component.js");
/* harmony import */ var _components_class_entity_product_status_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/class.entity.product.status.component.js */ "./public/source/components/class.entity.product.status.component.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





 // ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'EntityChicken');
  core.load.atlas('entity_chicken', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_chicken.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_chicken.json');
  core.load.audio('snd_chicken_feed1', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_chicken_feed1.mp3');
  core.load.audio('snd_chicken_feed2', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_chicken_feed2.mp3');
  core.load.audio('snd_collect_egg', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_collect_egg.mp3');
});

var EntityChicken = /*#__PURE__*/function (_EntityAnimal) {
  _inherits(EntityChicken, _EntityAnimal);

  var _super = _createSuper(EntityChicken);

  function EntityChicken(game, parent) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'EntityChicken';
    var addToStage = arguments.length > 3 ? arguments[3] : undefined;
    var enableBody = arguments.length > 4 ? arguments[4] : undefined;
    var physicsBodyType = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, EntityChicken);

    return _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
  }
  /**
   * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
   * так как класс компонента наследуется от Phaser.Group то
   * использовать create для инициализации мы не можем, так
   * как у Phaser.Group уже есть метод create
   */


  _createClass(EntityChicken, [{
    key: "make",
    value: function make() {
      _get(_getPrototypeOf(EntityChicken.prototype), "make", this).call(this); // имя существа


      this.entityName = 'chicken'; // автосбор продукта

      this.autoCollect = true; // ограничения таймеров

      this.foodTime = 30000;
      this.productTime = 10000; // звук нажатия на иконку

      this.snd_collect = this.game.add.audio('snd_collect_egg');
      this.snd_feed = this.game.add.audio('snd_chicken_feed1'); // создаем спрайт курицы

      this.sprite = new Phaser.Sprite(this.game, 0, 15, 'entity_chicken', 'chicken_default');
      this.sprite.anchor.set(0.5, 0.25);
      this.sprite.scale.set(0.12);
      this.addChild(this.sprite);
      this.productStatus = new _components_class_entity_product_status_component_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.game, this);
      this.productStatus.position.set(-10, 5);
      this.foodStatus = new _components_class_entity_food_status_component_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.game, this);
      this.foodStatus.position.set(-10, -5);
    }
    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {
      _get(_getPrototypeOf(EntityChicken.prototype), "update", this).call(this, game);
    }
  }]);

  return EntityChicken;
}(_components_class_entity_animal_component_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.entity.cow.component.js":
/*!****************************************************************!*\
  !*** ./public/source/components/class.entity.cow.component.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EntityCow; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _components_class_entity_animal_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/class.entity.animal.component.js */ "./public/source/components/class.entity.animal.component.js");
/* harmony import */ var _components_class_entity_food_status_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/class.entity.food.status.component.js */ "./public/source/components/class.entity.food.status.component.js");
/* harmony import */ var _components_class_entity_product_status_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/class.entity.product.status.component.js */ "./public/source/components/class.entity.product.status.component.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





 // ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'EntityCow');
  core.load.atlas('entity_cow', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_cow.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_cow.json');
  core.load.atlas('icons_state', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_state.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_state.json');
  core.load.audio('snd_cow_feed1', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_cow_feed1.mp3');
  core.load.audio('snd_cow_feed2', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_cow_feed2.mp3');
  core.load.audio('snd_collect_milk', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_collect_milk.mp3');
});

var EntityCow = /*#__PURE__*/function (_EntityAnimal) {
  _inherits(EntityCow, _EntityAnimal);

  var _super = _createSuper(EntityCow);

  function EntityCow(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, EntityCow);

    return _super.call(this, game, parent, 'EntityCow', addToStage, enableBody, physicsBodyType);
  }
  /**
   * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
   * так как класс компонента наследуется от Phaser.Group то
   * использовать create для инициализации мы не можем, так
   * как у Phaser.Group уже есть метод create
   */


  _createClass(EntityCow, [{
    key: "make",
    value: function make() {
      _get(_getPrototypeOf(EntityCow.prototype), "make", this).call(this); // имя существа


      this.entityName = 'cow'; // автосбор продукта

      this.autoCollect = true; // ограничения таймеров

      this.foodTime = 20000;
      this.productTime = 20000; // звук нажатия на иконку

      this.snd_collect = this.game.add.audio('snd_collect_milk');
      this.snd_feed = this.game.add.audio('snd_cow_feed1');
      this.snd_feed.volume = 0.5; // создаем спрайт коровы

      this.sprite = new Phaser.Sprite(this.game, 0, 10, 'entity_cow', 'cow_default');
      this.sprite.anchor.set(0.5, 0.35);
      this.sprite.scale.set(0.18);
      this.addChild(this.sprite);
      this.productStatus = new _components_class_entity_product_status_component_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.game, this);
      this.productStatus.position.set(-10, -8);
      this.foodStatus = new _components_class_entity_food_status_component_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.game, this);
      this.foodStatus.position.set(-10, -18);
    }
    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {
      _get(_getPrototypeOf(EntityCow.prototype), "update", this).call(this, game);
    }
  }]);

  return EntityCow;
}(_components_class_entity_animal_component_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.entity.food.status.component.js":
/*!************************************************************************!*\
  !*** ./public/source/components/class.entity.food.status.component.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FoodStatus; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



 // ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'FoodStatus');
  core.load.atlas('icons_state', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_state.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_state.json');
  core.load.bitmapFont('fnt_20', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'fonts/fnt_20.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'fonts/fnt_20.xml');
});

var FoodStatus = /*#__PURE__*/function (_Component) {
  _inherits(FoodStatus, _Component);

  var _super = _createSuper(FoodStatus);

  function FoodStatus(game, parent) {
    var _this;

    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'FoodStatus';
    var addToStage = arguments.length > 3 ? arguments[3] : undefined;
    var enableBody = arguments.length > 4 ? arguments[4] : undefined;
    var physicsBodyType = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, FoodStatus);

    console.log('FoodStatus.constructor()', 1);
    _this = _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    console.log('FoodStatus.constructor()', 2);
    return _this;
  }
  /**
   * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
   * так как класс компонента наследуется от Phaser.Group то
   * использовать create для инициализации мы не можем, так
   * как у Phaser.Group уже есть метод create
   */


  _createClass(FoodStatus, [{
    key: "make",
    value: function make() {
      // спрайты статуса
      this.statusSprite = new Phaser.Sprite(this.game, 0, 0, 'icons_state', 'wheat');
      this.statusSprite.anchor.set(0.5, 0.5);
      this.statusSprite.scale.set(0.1);
      this.statusSprite.alpha = 0.8;
      this.statusSprite.smoothed = false;
      this.addChild(this.statusSprite);
      this.statusText = new Phaser.BitmapText(this.game, 20, 0, 'fnt_20', '', 40);
      this.statusText.anchor.set(0.5, 0.15);
      this.statusText.scale.set(2.5);
      this.statusText.alpha = 0.7;
      this.statusText.smoothed = false; // this.statusText.text = 0;

      this.setStaus(0, 0);
      this.addChild(this.statusText);
    }
  }, {
    key: "setStaus",
    value: function setStaus(progress, counter) {
      this.statusText.text = counter;
    }
  }]);

  return FoodStatus;
}(_phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.entity.product.status.component.js":
/*!***************************************************************************!*\
  !*** ./public/source/components/class.entity.product.status.component.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ProductStatus; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



 // ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'ProductStatus');
  core.load.spritesheet('loading_bar', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/preloader/bar.png', 18, 10, 3);
});

var ProductStatus = /*#__PURE__*/function (_Component) {
  _inherits(ProductStatus, _Component);

  var _super = _createSuper(ProductStatus);

  function ProductStatus(game, parent) {
    var _this;

    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ProductStatus';
    var addToStage = arguments.length > 3 ? arguments[3] : undefined;
    var enableBody = arguments.length > 4 ? arguments[4] : undefined;
    var physicsBodyType = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, ProductStatus);

    console.log('ProductStatus.constructor()', 1);
    _this = _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    console.log('ProductStatus.constructor()', 2);
    return _this;
  }
  /**
   * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
   * так как класс компонента наследуется от Phaser.Group то
   * использовать create для инициализации мы не можем, так
   * как у Phaser.Group уже есть метод create
   */


  _createClass(ProductStatus, [{
    key: "make",
    value: function make() {
      // спрайты статуса
      var width = 60;
      var height = 5; // отрисовываем статусбар загрузки

      this.barBackSprite = new Phaser.TileSprite(this.game, 11 - width / 2, -height / 2, width, height, 'loading_bar', 1);
      this.barBackSprite.anchor.set(0, 0.5);
      this.barBackSprite.tint = 0x000000;
      this.barBackSprite.alpha = 0.4;
      this.barBackSprite.scale.set(1, height / 10);
      this.addChild(this.barBackSprite);
      this.barSprite = new Phaser.TileSprite(this.game, 11 - width / 2, -height / 2, width, height, 'loading_bar', 2);
      this.barSprite.anchor.set(0, 0.5); // this.barSprite.tint = 0x5555ff;

      this.barSprite.alpha = 0.6;
      this.barSprite.scale.set(1, height / 10);
      this.setStaus(0);
      this.addChild(this.barSprite); // this.statusSprite = new Phaser.Sprite(this.game, 0, 0, 'icons_state', 'wheat');
      // this.statusSprite.anchor.set(0.5, 0.5);
      // this.statusSprite.scale.set(0.1);
      // this.statusSprite.alpha = 0.8;
      // this.statusSprite.smoothed = false;
      // this.addChild(this.statusSprite);
      // this.statusText = new Phaser.BitmapText(this.game, 20, 0, 'fnt_20', '', 40);
      // this.statusText.anchor.set(0.5, 0.15);
      // this.statusText.scale.set(2.5);
      // this.statusText.alpha = 0.7;
      // this.statusText.smoothed = false;
      // // this.statusText.text = 0;
      // this.addChild(this.statusText);
    }
  }, {
    key: "setStaus",
    value: function setStaus(progress) {
      this.barSprite.width = this.barBackSprite.width * progress;
    }
  }]);

  return ProductStatus;
}(_phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.entity.wheat.component.js":
/*!******************************************************************!*\
  !*** ./public/source/components/class.entity.wheat.component.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EntityWheat; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _components_class_entity_base_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/class.entity.base.component.js */ "./public/source/components/class.entity.base.component.js");
/* harmony import */ var _components_class_entity_product_status_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/class.entity.product.status.component.js */ "./public/source/components/class.entity.product.status.component.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




 // ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'EntityWheat');
  core.load.atlas('entity_wheat', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/tileset_wheat.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/tileset_wheat.json');
  core.load.audio('snd_collect_wheat', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_collect_wheat.mp3');
});

var EntityWheat = /*#__PURE__*/function (_EntityBase) {
  _inherits(EntityWheat, _EntityBase);

  var _super = _createSuper(EntityWheat);

  function EntityWheat(game, parent) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'EntityWheat';
    var addToStage = arguments.length > 3 ? arguments[3] : undefined;
    var enableBody = arguments.length > 4 ? arguments[4] : undefined;
    var physicsBodyType = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, EntityWheat);

    return _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
  }
  /**
   * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
   * так как класс компонента наследуется от Phaser.Group то
   * использовать create для инициализации мы не можем, так
   * как у Phaser.Group уже есть метод create
   * Для компонентов унаследованных от ComponentSingleton
   * метод make вызывается ОДИН раз при первом создании компонента     
   */


  _createClass(EntityWheat, [{
    key: "make",
    value: function make() {
      var _this = this;

      _get(_getPrototypeOf(EntityWheat.prototype), "make", this).call(this);

      this.updateOnlyExistingChildren = true; // имя существа

      this.entityName = 'chicken'; // ограничения таймеров

      this.productTime = 10000; // звук нажатия на иконку

      this.snd_collect = this.game.add.audio('snd_collect_wheat');
      this.sector = ('00' + Math.floor(1 + Math.random() * 8)).substr(-2); // создаем спрайты

      this.sprites = Array(8).fill(null).map(function (_, index) {
        var progress = ('00' + index).substr(-2);
        var frameName = "wheat.".concat(progress, ".").concat(_this.sector);
        var isCurrent = index === Math.floor(8 * _this.productProgress / _this.productTime);
        var sprite = new Phaser.Sprite(_this.game, 0, 10, 'entity_wheat', frameName);
        sprite.anchor.set(0.5, 0.75);
        sprite.scale.set(0.5, 0.5);
        sprite.visible = isCurrent;
        sprite.exists = isCurrent;

        _this.addChild(sprite);

        if (isCurrent) _this.sprite = sprite;
        return sprite;
      });
      this.productStatus = new _components_class_entity_product_status_component_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.game, this);
      this.productStatus.position.set(-10, 5);
    }
    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {
      _get(_getPrototypeOf(EntityWheat.prototype), "update", this).call(this, game);

      var progress = Math.min(7, Math.floor(8 * this.productProgress / this.productTime));

      if (this.sprite) {
        this.sprite.visible = false;
        this.sprite.exists = false;
      }

      this.sprite = this.sprites[progress];

      if (this.sprite) {
        this.sprite.visible = true;
        this.sprite.exists = true;
      }
    }
  }]);

  return EntityWheat;
}(_components_class_entity_base_component_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.game.entity.gui.component.js":
/*!*********************************************************************!*\
  !*** ./public/source/components/class.game.entity.gui.component.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GameEntityGui; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
/* harmony import */ var _tools_class_keyboard_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/class.keyboard.js */ "./public/source/tools/class.keyboard.js");
/* harmony import */ var _components_class_crosshair_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/class.crosshair.component.js */ "./public/source/components/class.crosshair.component.js");
/* harmony import */ var _components_index_entity_components_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/index.entity.components.js */ "./public/source/components/index.entity.components.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







 // ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'GameEntityGui');
  core.load.image('icons_plate', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/plates/icons_plate.png');
  core.load.atlas('icons_chicken', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_chicken.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_chicken.json');
  core.load.atlas('icons_cow', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_cow.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_cow.json');
  core.load.atlas('icons_wheat', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_wheat.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_wheat.json');
  core.load.audio('snd_entity_button', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_entity_button.mp3');
});

var GameEntityGui = /*#__PURE__*/function (_ComponentSingleton) {
  _inherits(GameEntityGui, _ComponentSingleton);

  var _super = _createSuper(GameEntityGui);

  function GameEntityGui(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, GameEntityGui);

    return _super.call(this, game, parent, 'GameEntityGui', addToStage, enableBody, physicsBodyType);
  }

  _createClass(GameEntityGui, [{
    key: "make",
    value: function make() {
      var _this = this;

      // так как класс компонента наследуется от Phaser.Group то
      // использовать create для инициализации мы не можем, так
      // как у Phaser.Group уже есть метод create
      // Для компонентов унаследованных от ComponentSingleton
      // метод make вызывается ОДИН раз при первом создании компонента        
      console.log('Component.make', 'GameEntityGui'); // this.position.set(config.center.x, config.center.y + 70)
      // подключаем курсор (является сингтоном)

      this.crosshair = new _components_class_crosshair_component_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.game); // звук нажатия на иконку

      this.snd_button = this.game.add.audio('snd_entity_button'); // создаем плашку под иконки

      this.plateSprite = new Phaser.Sprite(this.game, -25, 0, 'icons_plate');
      this.plateSprite.anchor.set(0, 0);
      this.plateSprite.scale.set(0.8, 0.8);
      this.plateSprite.alpha = 0.75;
      this.addChild(this.plateSprite); // создаем иконки

      this.icons = Object.keys(_components_index_entity_components_js__WEBPACK_IMPORTED_MODULE_6__["default"]).reduce(function (a, n, i) {
        var spriteName = 'icons_' + n;
        var crosshair = new Phaser.Sprite(_this.game, 0, 0, spriteName);
        crosshair.anchor.set(0.5, 0.5);
        crosshair.scale.set(0.1);
        crosshair.alpha = 0.6;
        crosshair.smoothed = false;

        _this.crosshair.addCrosshair(n, crosshair);

        var sprite = new Phaser.Button(_this.game, 50, 75 + i * 100, spriteName, function (button, pointer) {
          _this.onIconPress(n, button, pointer);
        }, _this, "".concat(n, "_over"), "".concat(n, "_up"), "".concat(n, "_down"), "".concat(n, "_up"));
        sprite.input.useHandCursor = false;
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.2);
        sprite.alpha = 0.8;
        sprite.smoothed = false;

        _this.addChild(sprite);

        a[n] = {
          sprite: sprite // shadow,

        };
        return a;
      }, {});
    }
  }, {
    key: "update",
    value: function update(game) {
      // const elapsed = game.time.elapsedMS;
      // const timer = game.time.time;
      if (!this.game.input.activePointer.rightButton.isDown) return;
      if (!_components_index_entity_components_js__WEBPACK_IMPORTED_MODULE_6__["default"][this.crosshair.crosshairName]) return;
      this.crosshair.setCrosshair('arrow');
    }
  }, {
    key: "paused",
    value: function paused() {
      console.log('!!!!!!!! Component.paused', 'GameEntityGui');
    }
  }, {
    key: "resumed",
    value: function resumed() {
      console.log('!!!!!!!! Component.resumed', 'GameEntityGui');
    }
  }, {
    key: "onIconPress",
    value: function onIconPress(name, button, pointer) {
      this.snd_button.play();
      this.crosshair.setCrosshair(name);
    }
  }]);

  return GameEntityGui;
}(_phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ }),

/***/ "./public/source/components/class.game.enviroment.gui.component.js":
/*!*************************************************************************!*\
  !*** ./public/source/components/class.game.enviroment.gui.component.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GameEnviromentGui; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
/* harmony import */ var _tools_class_keyboard_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/class.keyboard.js */ "./public/source/tools/class.keyboard.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'GameEnviromentGui');
  core.load.atlas('tileset_grass', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/tileset_grass.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/tileset_grass.json');
  core.load.atlas('tileset_tree', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/tileset_tree.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/tileset_tree.json');
  core.load.atlas('tileset_field', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/tileset_field.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/tileset_field.json');
});

var GameEnviromentGui = /*#__PURE__*/function (_Component) {
  _inherits(GameEnviromentGui, _Component);

  var _super = _createSuper(GameEnviromentGui);

  function GameEnviromentGui(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, GameEnviromentGui);

    return _super.call(this, game, parent, 'GameEnviromentGui', addToStage, enableBody, physicsBodyType);
  }

  _createClass(GameEnviromentGui, [{
    key: "make",
    value: function make() {
      // так как класс компонента наследуется от Phaser.Group то
      // использовать create для инициализации мы не можем, так
      // как у Phaser.Group уже есть метод create
      console.log('Component.make', 'GameEnviromentGui'); // создаем графические элементы сцены

      var size = 1.1;
      var width = size * _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width / 17;
      var height = size * _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].height / 17;

      for (var y = 0; y <= _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].height + height; y += height) {
        for (var x = 0; x <= _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width + width; x += width) {
          var wy = y - _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.y * 1.5;
          var wx = x - _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.x;
          var dist = Math.hypot(wx, wy * 1.25);
          var tilesSet = 'forest';
          if (dist < 650) tilesSet = 'dry';
          if (dist < 550) tilesSet = 'far';
          if (dist < 450) tilesSet = 'near';
          var spriteData = getSpriteInfo(tilesSet);
          var sprite = new Phaser.Sprite(this.game, x + width * 0.2 * (Math.random() - 0.5), y + height * 0.2 * (Math.random() - 0.5), spriteData.spriteName);
          sprite.frameName = spriteData.frameName;
          sprite.anchor.set(0.5, 0.75);
          sprite.scale.set(size * 0.49);
          this.addChild(sprite);
        }
      }
    }
  }, {
    key: "update",
    value: function update(game) {
      var elapsed = game.time.elapsedMS;
      var timer = game.time.time;
    }
  }, {
    key: "paused",
    value: function paused() {
      console.log('!!!!!!!! Component.paused', 'GameEnviromentGui');
    }
  }, {
    key: "resumed",
    value: function resumed() {
      console.log('!!!!!!!! Component.resumed', 'GameEnviromentGui');
    }
  }]);

  return GameEnviromentGui;
}(_phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



function getSpriteInfo(presetName) {
  var tilesPreset = tilesPresets[presetName];
  var keys = Object.keys(tilesPreset);
  var amount = keys.reduce(function (acc, key) {
    return acc += tilesPreset[key];
  }, 0);
  var r = Math.random() * amount;
  var tilesetName;
  var count = 0;
  keys.some(function (key) {
    count += tilesPreset[key];
    if (count > r) tilesetName = key;
    return !!tilesetName;
  });
  var data = tilesPresetsData[tilesetName];
  return _objectSpread(_objectSpread({}, data), {}, {
    frameName: data.frames[Math.floor(data.frames.length * Math.random())]
  });
} // пресеты спрайтов


var tilesPresets = {
  near: {
    // nearfield: 1,
    greengrass: 1
  },
  far: {
    greengrass: 2,
    drygrass: 1
  },
  dry: {
    // greengrass: 3,
    stounegrass: 1,
    drygrass: 2
  },
  forest: {
    greengrass: 1,
    stounegrass: 1,
    drygrass: 2,
    pinetree: 6,
    aldertree: 2
  }
}; // наборы спрайтов

var tilesPresetsData = {
  pinetree: {
    spriteName: 'tileset_tree',
    frames: ['tree.pine.middle.00.1', 'tree.pine.middle.00.2', 'tree.pine.middle.00.3', 'tree.pine.middle.00.4', 'tree.pine.middle.01.1', 'tree.pine.middle.01.2', 'tree.pine.middle.01.3', 'tree.pine.middle.01.4', 'tree.pine.small.01.1', 'tree.pine.small.01.2', 'tree.pine.small.01.3', 'tree.pine.small.01.4']
  },
  aldertree: {
    spriteName: 'tileset_tree',
    frames: ['tree.alder.middle.00.1', 'tree.alder.middle.00.2', 'tree.alder.middle.00.3', 'tree.alder.middle.00.4', 'tree.alder.middle.01.1', 'tree.alder.middle.01.2', 'tree.alder.middle.01.3', 'tree.alder.middle.01.4', 'tree.alder.small.00.1', 'tree.alder.small.00.2', 'tree.alder.small.00.3', 'tree.alder.small.00.4', 'tree.alder.small.01.1', 'tree.alder.small.01.2', 'tree.alder.small.01.3', 'tree.alder.small.01.4']
  },
  stounegrass: {
    spriteName: 'tileset_grass',
    frames: ['grass.stone.type.00.1', 'grass.stone.type.00.2', 'grass.stone.type.00.3', 'grass.stone.type.00.4', 'grass.stone.type.01.1', 'grass.stone.type.01.2', 'grass.stone.type.01.3', 'grass.stone.type.01.4', 'grass.stone.type.02.1', 'grass.stone.type.02.2', 'grass.stone.type.02.3', 'grass.stone.type.02.4', 'grass.stone.type.03.1', 'grass.stone.type.03.2', 'grass.stone.type.03.3', 'grass.stone.type.03.4']
  },
  drygrass: {
    spriteName: 'tileset_grass',
    frames: ['grass.dry.type.00.1', 'grass.dry.type.00.2', 'grass.dry.type.00.3', 'grass.dry.type.00.4', 'grass.dry.type.01.1', 'grass.dry.type.01.2', 'grass.dry.type.01.3', 'grass.dry.type.01.4', 'grass.dry.type.02.1', 'grass.dry.type.02.2', 'grass.dry.type.02.3', 'grass.dry.type.02.4', 'grass.dry.type.03.1', 'grass.dry.type.03.2', 'grass.dry.type.03.3', 'grass.dry.type.03.4', 'grass.dry.type.04.1', 'grass.dry.type.04.2', 'grass.dry.type.04.3', 'grass.dry.type.04.4', 'grass.dry.type.05.1', 'grass.dry.type.05.2', 'grass.dry.type.05.3', 'grass.dry.type.05.4', 'grass.dry.type.06.1', 'grass.dry.type.06.2', 'grass.dry.type.06.3', 'grass.dry.type.06.4', // 'grass.dry.type.07.1',    'grass.dry.type.07.2',    'grass.dry.type.07.3',    'grass.dry.type.07.4',
    // 'grass.dry.type.08.1',    'grass.dry.type.08.2',    'grass.dry.type.08.3',    'grass.dry.type.08.4',
    'grass.dry.type.09.1', 'grass.dry.type.09.2', 'grass.dry.type.09.3', 'grass.dry.type.09.4']
  },
  greengrass: {
    spriteName: 'tileset_grass',
    frames: ['grass.type.00.1', 'grass.type.00.2', 'grass.type.00.3', 'grass.type.00.4', // 'grass.type.01.1',    // 'grass.type.01.2',    // 'grass.type.01.3',    // 'grass.type.01.4',
    'grass.type.02.1', 'grass.type.02.2', 'grass.type.02.3', 'grass.type.02.4', 'grass.type.03.1', 'grass.type.03.2', 'grass.type.03.3', 'grass.type.03.4', // 'grass.type.04.1',    'grass.type.04.2',    'grass.type.04.3',    'grass.type.04.4',
    'grass.type.05.1', 'grass.type.05.2', 'grass.type.05.3', 'grass.type.05.4', 'grass.type.06.1', 'grass.type.06.2', 'grass.type.06.3', 'grass.type.06.4', // 'grass.type.07.1',    'grass.type.07.2',    'grass.type.07.3',    'grass.type.07.4',
    'grass.type.08.1', 'grass.type.08.2', 'grass.type.08.3', 'grass.type.08.4', 'grass.type.09.1', 'grass.type.09.2', 'grass.type.09.3', 'grass.type.09.4', 'grass.type.10.1', 'grass.type.10.2', 'grass.type.10.3', 'grass.type.10.4']
  }
};

/***/ }),

/***/ "./public/source/components/class.game.fields.gui.component.js":
/*!*********************************************************************!*\
  !*** ./public/source/components/class.game.fields.gui.component.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GameWorldGui; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
/* harmony import */ var _tools_class_keyboard_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/class.keyboard.js */ "./public/source/tools/class.keyboard.js");
/* harmony import */ var _components_class_crosshair_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/class.crosshair.component.js */ "./public/source/components/class.crosshair.component.js");
/* harmony import */ var _components_index_entity_components_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/index.entity.components.js */ "./public/source/components/index.entity.components.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







 // ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'GameWorldGui');
  core.load.image('fade_black', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/buttons/fade.black.png');
  core.load.audio('snd_entity_set', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_entity_set1.mp3');
});

var GameWorldGui = /*#__PURE__*/function (_Component) {
  _inherits(GameWorldGui, _Component);

  var _super = _createSuper(GameWorldGui);

  function GameWorldGui(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, GameWorldGui);

    return _super.call(this, game, parent, 'GameWorldGui', addToStage, enableBody, physicsBodyType);
  }
  /**
   * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
   * так как класс компонента наследуется от Phaser.Group то
   * использовать create для инициализации мы не можем, так
   * как у Phaser.Group уже есть метод create
   */


  _createClass(GameWorldGui, [{
    key: "make",
    value: function make() {
      var _this = this;

      console.log('Component.make', 'GameWorldGui');
      this.position.set(_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.x, _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.y + 100); // подключаем курсор (является сингтоном)

      this.crosshair = new _components_class_crosshair_component_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.game);
      this.snd_entity_set = this.game.add.audio('snd_entity_set'); // создаем слои

      this.layers = {
        ceil: new Phaser.Group(this.game, this),
        entity: new Phaser.Group(this.game, this),
        fade: new Phaser.Group(this.game, this)
      }; // создаем хранилище графических элементы сцены (ячеек фермы)

      this.fields = Array(8).fill(null).map(function (a, y) {
        return Array(8).fill(null).map(function (a, x) {
          var xx = (x - 3.5) * 95;
          var yy = (y - 3.5) * 55; // спрайт затемнения каждой ячейки фермы

          var sprite = new Phaser.Sprite(_this.game, xx, yy, 'fade_black', 0);
          sprite.anchor.set(0.5, 0.5);
          sprite.scale.set(3.2, 1.9);
          sprite.alpha = 0.15;
          sprite.tint = 0xd0d0b0;

          _this.layers.ceil.addChild(sprite); // возвращаем данные ячейки


          var field = {
            x: x,
            y: y,
            // индексы ячейки в `this.fields`
            xx: xx,
            yy: yy,
            // координаты ячейки в слое
            ceil: sprite // спрайт затемнения ячейки

          };
          return field;
        });
      }); // Прозрачный объект, накрывающий все поле. Нужен для перехвата событий
      // нажатия на ячейки фермы. От установки обработчиков на каждую ячейку отказался 
      // по следующей причине:
      // Спрайты используемые в ячейках отрендерены в разрешении 512х512 и имеют
      // достаточно обширные пустые области, которые тем не менее попадают в boundbox
      // в результате чего спрайты перекрывают друг друга и непредсказуемо 
      // срабатывают на нажатие. Обрезать спрайты сохранив привязку к правильному 
      // pivot-у задача не тривиальная и требующая большого объема ручной работы.

      this.inputLayer = new Phaser.Button(this.game, 0, 0, 'fade_black', function (button, pointer) {
        _this.onPress(button, pointer);
      }, this, 0, 0, 0, 0);
      this.inputLayer.input.useHandCursor = false;
      this.inputLayer.scale.set(24, 14);
      this.inputLayer.anchor.set(0.5, 0.5);
      this.inputLayer.alpha = 0.0; // this.inputLayer.visible = false;    

      this.layers.fade.addChild(this.inputLayer);
    }
    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {
      var elapsed = game.time.elapsedMS;
      var timer = game.time.time;
    }
    /**
     * обработчик нажатия на this.inputLayer
     * @param {Phaser.Button} button иконка на которую произведен клик
     * @param {Phaser.Pointr} pointer данные собития нажатия
     * @returns 
     */

  }, {
    key: "onPress",
    value: function onPress(button, pointer) {
      var _this$fields, _this$fields$yy;

      // переращитываем координаты клика в индексы для `this.fields`
      var wx = pointer.x / _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].scale.x;
      var wy = pointer.y / _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].scale.y;
      var lx = wx - this.x + this.inputLayer.width / 2;
      var ly = wy - this.y + this.inputLayer.height / 2;
      var xx = Math.floor(lx * 8 / this.inputLayer.width);
      var yy = Math.floor(ly * 8 / this.inputLayer.height); // получаем данные ячейки фермы по которой был произведен клик

      var field = (_this$fields = this.fields) === null || _this$fields === void 0 ? void 0 : (_this$fields$yy = _this$fields[yy]) === null || _this$fields$yy === void 0 ? void 0 : _this$fields$yy[xx];
      if (!field) return; // если на панели сущностей выбрана одна из сущностей то получаем ее класс 

      var Entity = _components_index_entity_components_js__WEBPACK_IMPORTED_MODULE_6__["default"][this.crosshair.crosshairName];

      if (Entity) {
        // если на панели сущностей выбрана одна из сущностей
        // если в ячейке фермы уже установлена сущность - удаляе ее
        if (field.entity) field.entity.destroy();
        field.entity = new Entity(this.game, this.layers.entity);
        field.entity.position.set(field.xx, field.yy - 35);
        field.entityName = this.crosshair.crosshairName;
        field.entity.wx = wx;
        field.entity.wy = wy; // сортируем спрайты (нижние будут перекрывать верхние)

        this.layers.entity.sort('y', Phaser.Group.SORT_ASCENDING);
        this.snd_entity_set.play();
      } else {
        var _field$entity, _field$entity$collect;

        // если на панели сущностей НЕ выбрана ни одна из сущностей
        // пытаемся собрать урожай)
        if (field !== null && field !== void 0 && (_field$entity = field.entity) !== null && _field$entity !== void 0 && (_field$entity$collect = _field$entity.collect) !== null && _field$entity$collect !== void 0 && _field$entity$collect.call(_field$entity)) {
          // и если получилось - отправляем данные в шину событий
          _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].emit('entity.collect', _objectSpread(_objectSpread({}, field), {}, {
            wx: wx,
            wy: wy
          }));
        } else {
          // или покормить
          _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].emit('entity.feed', 'wheat', 1, field.entity);
        }
      }
    }
  }]);

  return GameWorldGui;
}(_phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.game.state.gui.component.js":
/*!********************************************************************!*\
  !*** ./public/source/components/class.game.state.gui.component.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GameStateGui; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
/* harmony import */ var _tools_class_keyboard_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/class.keyboard.js */ "./public/source/tools/class.keyboard.js");
/* harmony import */ var _components_class_crosshair_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/class.crosshair.component.js */ "./public/source/components/class.crosshair.component.js");
/* harmony import */ var _components_index_entity_components_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/index.entity.components.js */ "./public/source/components/index.entity.components.js");
/* harmony import */ var _tools_class_vector_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tools/class.vector.js */ "./public/source/tools/class.vector.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








 // ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'GameStateGui');
  core.load.image('icons_plate', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/plates/icons_plate.png');
  core.load.atlas('icons_state', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_state.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/entity/icons_state.json');
  core.load.bitmapFont('fnt_20', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'fonts/fnt_20.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'fonts/fnt_20.xml');
  core.load.audio('snd_money', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_money.mp3');
});

var GameStateGui = /*#__PURE__*/function (_ComponentSingleton) {
  _inherits(GameStateGui, _ComponentSingleton);

  var _super = _createSuper(GameStateGui);

  function GameStateGui(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, GameStateGui);

    return _super.call(this, game, parent, 'GameStateGui', addToStage, enableBody, physicsBodyType);
  }
  /**
   * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
   * так как класс компонента наследуется от Phaser.Group то
   * использовать create для инициализации мы не можем, так
   * как у Phaser.Group уже есть метод create
   * Для компонентов унаследованных от ComponentSingleton
   * метод make вызывается ОДИН раз при первом создании компонента     
   */


  _createClass(GameStateGui, [{
    key: "make",
    value: function make() {
      var _this = this;

      console.log('Component.make', 'GameStateGui'); // this.position.set(config.center.x, config.center.y + 70)
      // соответствие сущьностей и ресурсов

      this.entityNames = {
        wheat: 'wheat',
        chicken: 'egg',
        cow: 'milk',
        gold: 'gold'
      }; // названия иконок

      this.iconNames = Object.values(this.entityNames); // анимируемые элементы (при сборе летят с поля к панели статуса)

      this.collectedElements = []; // кеш для созданных спрайтов, чтобы не пересоздавать их

      this.collectedSpriteCache = this.iconNames.reduce(function (a, n) {
        a[n] = [];
        return a;
      }, {}); // подключаем курсор (является сингтоном)

      this.crosshair = new _components_class_crosshair_component_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.game); // звук нажатия на иконку

      this.snd_money = this.game.add.audio('snd_money'); // создаем плашку под иконки

      this.plateSprite = new Phaser.Sprite(this.game, 0, 0, 'icons_plate');
      this.plateSprite.anchor.set(0.5, 0.5);
      this.plateSprite.angle = 90;
      this.plateSprite.scale.set(-0.8, 1.0);
      this.plateSprite.alpha = 0.85;
      this.addChild(this.plateSprite); // создаем иконки

      this.icons = this.iconNames.reduce(function (a, frameName, i) {
        var sprite;

        if (frameName !== 'gold') {
          sprite = new Phaser.Button(_this.game, -300 + i * 160, 30, 'icons_state', function (button, pointer) {
            var item = _this.icons[frameName];
            if (!item) return;
            if (item.counter < 1) return;
            item.counter--;
            item.amount.text = item.counter;

            _this.snd_money.play();

            _this.startCollectAnimation(_this.x + i * 160 - 300, _this.y + 30, 'gold', Math.PI * 0.5);
          }, _this, frameName, frameName, frameName, frameName);
        } else {
          sprite = new Phaser.Sprite(_this.game, -300 + i * 160, 30, 'icons_state', frameName);
        }

        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.3);
        sprite.alpha = 0.8;
        sprite.smoothed = false;

        _this.addChild(sprite);

        var amount = new Phaser.BitmapText(_this.game, -255 + i * 160, 30, 'fnt_20', '', 40);
        amount.anchor.set(0.5, 0.15);
        amount.scale.set(4);
        amount.alpha = 0.7;
        amount.smoothed = false;
        amount.text = 0;

        _this.addChild(amount);

        a[frameName] = {
          frameName: frameName,
          sprite: sprite,
          amount: amount
        };
        return a;
      }, {});
      this.resetCounters(); // ловим событие сбора урожая

      _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].on('entity.collect', function (field) {
        console.log('collect', 1); // field:
        //   wx, wy, // координаты ячейки в пространстве разрешения игры (config.width,config.height)
        //   entityName // наименование сущьности

        var resourceName = _this.entityNames[field.entityName];
        if (!resourceName) return;

        _this.startCollectAnimation(field.wx, field.wy, _this.entityNames[field.entityName]);
      }); // ловим событие кормления животины

      _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].on('entity.feed', function (resourceName, amount, entity) {
        var _entity$feed;

        var item = _this.icons[resourceName];
        if (!item) return;
        if (item.counter < amount) return;
        if (!(entity !== null && entity !== void 0 && (_entity$feed = entity.feed) !== null && _entity$feed !== void 0 && _entity$feed.call(entity, amount))) return;
        item.counter -= amount;
        item.amount.text = item.counter;
      });
    }
    /**
     * обнуляет показания счетчиков
     */

  }, {
    key: "resetCounters",
    value: function resetCounters() {
      var _this2 = this;

      this.iconNames.forEach(function (iconName) {
        var item = _this2.icons[iconName];
        item.counter = 0;
        item.amount.text = 0;
      });
    }
  }, {
    key: "startCollectAnimation",
    value: function startCollectAnimation(fromX, fromY, name, angle) {
      var target = this.icons[name];
      if (!target) return; // переводим координаты в координаты относительно места 
      // установки плашки с ресурсами

      var x = fromX - this.x;
      var y = fromY - this.y; // создаем спрайт ресурса для анимации

      var sprite;

      if (this.collectedSpriteCache[name].length > 0) {
        sprite = this.collectedSpriteCache[name].shift();
        sprite.position.set(x, y);
        sprite.visible = true;
      } else {
        sprite = new Phaser.Sprite(this.game, x, y, 'icons_state', name);
      }

      sprite.anchor.set(0.5, 0.5);
      sprite.scale.set(0.3);
      sprite.alpha = 0.8;
      sprite.smoothed = false;
      sprite.targetOptions = {
        name: name,
        target: target,
        velocity: new _tools_class_vector_js__WEBPACK_IMPORTED_MODULE_7__.Vector2(angle !== null && angle !== void 0 ? angle : Math.random() * Math.PI * 2, 4000, 'rad')
      };
      this.addChild(sprite);
      this.collectedElements.push(sprite);
    }
    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {
      var _this3 = this;

      var elapsed = game.time.elapsedMS; // const timer = game.time.time;

      this.collectedElements = this.collectedElements.filter(function (item) {
        var options = item.targetOptions;
        var target = item.targetOptions.target;
        var dx = target.sprite.x - item.x;
        var dy = target.sprite.y - item.y;
        var distance = Math.hypot(dx, dy);

        if (distance < 50 && item.distance < distance) {
          target.counter++;
          target.amount.text = target.counter;
          item.visible = false;

          _this3.removeChild(item);

          _this3.collectedSpriteCache[options.name].push(item);

          return false;
        }

        item.distance = distance;
        var direction = new _tools_class_vector_js__WEBPACK_IMPORTED_MODULE_7__.Vector2(dx, dy);
        options.velocity = options.velocity.multiply(0.9).add(direction);
        var velocity = options.velocity.normalize().multiply(elapsed);
        item.x += velocity.x;
        item.y += velocity.y; // console.log(options.velocity,direction,velocity)

        return true;
      });
      if (!this.game.input.activePointer.rightButton.isDown) return;
      if (!_components_index_entity_components_js__WEBPACK_IMPORTED_MODULE_6__["default"][this.crosshair.crosshairName]) return;
      this.crosshair.setCrosshair('arrow');
    }
  }]);

  return GameStateGui;
}(_phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ }),

/***/ "./public/source/components/class.incorrectorientation.component.js":
/*!**************************************************************************!*\
  !*** ./public/source/components/class.incorrectorientation.component.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ IncorrectOrientation; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.boot.preload', function (core) {
  // предзагрузка используемых для компонента ресурсов
  console.log('core.boot.preload', 'IncorrectOrientation');
  core.load.image('incorrect_orientation', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/incorrect_orientation.png');
});

var IncorrectOrientation = /*#__PURE__*/function (_ComponentSingleton) {
  _inherits(IncorrectOrientation, _ComponentSingleton);

  var _super = _createSuper(IncorrectOrientation);

  function IncorrectOrientation(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, IncorrectOrientation);

    return _super.call(this, game, parent, 'IncorrectOrientation', addToStage, enableBody, physicsBodyType);
  }

  _createClass(IncorrectOrientation, [{
    key: "make",
    value: function make() {
      // так как класс компонента наследуется от Phaser.Group то
      // использовать create для инициализации мы не можем, так
      // как у Phaser.Group уже есть метод create
      // Для компонентов унаследованных от ComponentSingleton
      // метод make вызывается ОДИН раз при первом создании компонента        
      console.log('Component.make', 'IncorrectOrientation'); // this.alpha = 0.7;

      this.x = _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width / 2;
      this.y = _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].height / 2;
      var state = this.game.state.getCurrentState();
      this.backSpr = state.add.graphics(0, 0, this);
      this.backSpr.anchor.set(0.5);
      this.backSpr.beginFill(0xffffff, 1);
      this.backSpr.drawRect(-0.5 * _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width, -0.5 * _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].height, _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width, _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].height);
      this.backSpr.inputEnabled = true;
      this.infoSpr = this.create(0, 0, 'incorrect_orientation');
      this.infoSpr.anchor.set(0.5);
      this.onGameSizeChange();
      this.game.scale.onSizeChange.add(this.onGameSizeChange, this);
    }
  }, {
    key: "onGameSizeChange",
    value: function onGameSizeChange() {
      var f = this.game.scale.width >= this.game.scale.height;
      console.log('IncorrectOrientation.onGameSizeChange', f);
      this.visible = !f;
      if (!this.infoSpr) return;
      var sx = this.game.scale.scaleFactor.x;
      var sy = this.game.scale.scaleFactor.y;
      var s = 0.9 * this.game.scale.width / this.infoSpr.texture.frame.width;
      this.infoSpr.scale.x = sx * s / _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].scale.x;
      this.infoSpr.scale.y = sy * s / _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].scale.y;
    }
  }]);

  return IncorrectOrientation;
}(_phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/components/class.mainmenu.gui.component.js":
/*!******************************************************************!*\
  !*** ./public/source/components/class.mainmenu.gui.component.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MainMenuGui; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
/* harmony import */ var _tools_class_keyboard_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/class.keyboard.js */ "./public/source/tools/class.keyboard.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'MainMenuGui');
  core.load.bitmapFont('fnt_20', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'fonts/fnt_20.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'fonts/fnt_20.xml');
  core.load.atlas('atlas_main_menu_gui', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/atlas_main_menu_gui.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/atlas_main_menu_gui.json');
  core.load.audio('snd_menu_button', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_button.mp3');
  core.load.audio('snd_skin_switch', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_betswitch.mp3');
});

var MainMenuGui = /*#__PURE__*/function (_ComponentSingleton) {
  _inherits(MainMenuGui, _ComponentSingleton);

  var _super = _createSuper(MainMenuGui);

  function MainMenuGui(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, MainMenuGui);

    return _super.call(this, game, parent, 'MainMenuGui', addToStage, enableBody, physicsBodyType);
  }

  _createClass(MainMenuGui, [{
    key: "make",
    value: function make() {
      // так как класс компонента наследуется от Phaser.Group то
      // использовать create для инициализации мы не можем, так
      // как у Phaser.Group уже есть метод create
      // Для компонентов унаследованных от ComponentSingleton
      // метод make вызывается ОДИН раз при первом создании компонента        
      console.log('Component.make', 'MainMenuGui'); // создаем графические элементы сцены

      this.snd_button = this.game.add.audio('snd_menu_button');
      this.snd_button_switch = this.game.add.audio('snd_skin_switch');
      this.x = _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width * 0.5; // this.y = config.height * 0.5;
      // this.alpha = 0.85;

      this.scale.set(0.7);
      this.playButton = new Phaser.Button(this.game, 0, 900, 'atlas_main_menu_gui', this.onPlayPressed, this, 'button_play_default', 'button_play_default', 'button_play_pressed', 'button_play_default');
      this.addChild(this.playButton);
      this.playButton.scale.y = 1.2;
      this.playButton.anchor.set(0.5); // this.plussButton = new Phaser.Button(this.game, -215, 120, 'atlas_main_menu_gui', this.onSwitchSkinLeftPressed, this, 'button_prev_default', 'button_prev_default', 'button_prev_pressed', 'button_prev_default');
      // this.addChild(this.plussButton);
      // this.plussButton.anchor.set(0.5);
      // this.minusButton = new Phaser.Button(this.game, 215, 120, 'atlas_main_menu_gui', this.onSwitchSkinRightPressed, this, 'button_next_default', 'button_next_default', 'button_next_pressed', 'button_next_default', this);
      // this.addChild(this.minusButton);
      // this.minusButton.anchor.set(0.5);
      // this.frameSprite = this.create(1, 122, 'atlas_main_menu_gui', 'frame_simple');
      // this.frameSprite.anchor.set(0.5);
      // this.skinText = new Phaser.BitmapText(this.game, 0, 122, 'fnt_20', '', 100);
      // this.skinText.anchor.set(0.5, 0.15);
      // this.skinText.scale.set(4);
      // this.skinText.smoothed = false;
      // this.addChild(this.skinText);

      this.keyboard = new _tools_class_keyboard_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
        // ARROWLEFT: this.onSwitchSkinLeftPressed,
        // ARROWRIGHT: this.onSwitchSkinRightPressed,
        ENTER: this.onPlayPressed,
        SPACE: this.onPlayPressed
      }, this);
    }
  }, {
    key: "init",
    value: function init() {
      // метод init вызывается после метода make при создании компонента                
      console.log('Component.init', 'MainMenuGui'); // инициализируем текущее состояние
      // this.skins = ['skin1','skin2','skin3'];
      // this.skinIndex = 0;
      // this.skinText.text = this.skins[this.skinIndex];

      this.keyboard.start();
    }
  }, {
    key: "update",
    value: function update(game) {// const elapsed = game.time.elapsedMS;
      // const timer = game.time.timeExpected;
      // this.yoyo = ((this?.yoyo ?? 1) + elapsed / 10000) % 2;
      // const scale = Math.abs(this.yoyo - 1) / 10;
      // this.scale.set(0.67 + scale);
    }
  }, {
    key: "paused",
    value: function paused() {
      console.log('!!!!!!!! Component.paused', 'MainMenuGui');
      this.keyboard.stop();
    }
  }, {
    key: "resumed",
    value: function resumed() {
      console.log('!!!!!!!! Component.resumed', 'MainMenuGui');
      this.keyboard.start();
    }
  }, {
    key: "onPlayPressed",
    value: function onPlayPressed() {
      console.log('MainMenuGui.onPlayPressed');
      this.snd_button.play();
      this.game.state.start('GameState');
    } // onSwitchSkinLeftPressed() {
    //     console.log('MainMenuGui.onSwitchSkinLeftPressed');
    //     this.skinIndex = (this.skins.length+this.skinIndex-1)%this.skins.length;
    //     this.snd_button_switch.play();
    //     console.log('!!!!!!!!!!! <<<', this.skinIndex, this.skins[this.skinIndex])
    //     this.skinText.text = this.skins[this.skinIndex];
    // }
    // onSwitchSkinRightPressed() {
    //     console.log('MainMenuGui.onSwitchSkinRightPressed');
    //     this.skinIndex = (this.skins.length+this.skinIndex+1)%this.skins.length;
    //     this.snd_button_switch.play();
    //     console.log('!!!!!!!!!!! >>>', this.skinIndex, this.skins[this.skinIndex])
    //     this.skinText.text = this.skins[this.skinIndex];
    // }

  }]);

  return MainMenuGui;
}(_phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ }),

/***/ "./public/source/components/class.staticbackground.component.js":
/*!**********************************************************************!*\
  !*** ./public/source/components/class.staticbackground.component.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ StaticBacground; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.boot.preload', function (core) {
  console.log('core.boot.preload', 'StaticBacground');
  core.load.image('loading_back', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/preloader/preloader.background.jpg');
  core.load.atlas('clouds', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/preloader/atlas.clouds.v2.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/preloader/atlas.clouds.v2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
});

var StaticBacground = /*#__PURE__*/function (_ComponentSingleton) {
  _inherits(StaticBacground, _ComponentSingleton);

  var _super = _createSuper(StaticBacground);

  function StaticBacground(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, StaticBacground);

    return _super.call(this, game, parent, 'StaticBacground', addToStage, enableBody, physicsBodyType);
  }

  _createClass(StaticBacground, [{
    key: "make",
    value: function make() {
      // так как класс компонента наследуется от Phaser.Group то
      // использовать create для инициализации мы не можем, так
      // как у Phaser.Group уже есть метод create
      // Для компонентов унаследованных от ComponentSingleton
      // метод make вызывается ОДИН раз при первом создании компонента        
      console.log('Component.make', 'StaticBacground');
      this.backSprite = this.create(0, 0, 'loading_back');
      this.backSprite.width = _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width;
      this.backSprite.height = _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].height;
      this.cloudsGroup = new Phaser.Group(this.game, this);
      this.cloudsGroup.position.set(_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.x, _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.y); // this.cloudsGroup.scale.set(0.9)

      this.cloudsGroup.alpha = 0;
      this.clouds = [];
      this.logoSprite = this.create(_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.x, _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.y, 'loading_logo', 0);
      this.logoSprite.anchor.set(0.5, 0.5);
      this.logoSprite.scale.set(0.20);
      this.logoSprite.alpha = 0.8; // создаем облака

      this.ratio = 1.3;
      var maxDist = Math.max(_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.x, _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.y) * 1.2;
      var q = 50;

      for (var dist = 50; dist <= maxDist; dist += q) {
        q *= 1.5;
        var deltaAngle = Math.random() * Math.PI * 2;

        for (var count = 0; count <= Math.PI * 2; count += Math.PI / 7) {
          var angle = deltaAngle + count;
          var rotation = angle - Math.PI / 2;
          var scale = (0.4 + Math.pow(dist, 2) / Math.pow(maxDist, 2) * 4.0) * 1.8;
          var brightness = 0.15 + (1 - dist / maxDist) * 0.9;
          var speed = (1.0 + dist / maxDist) * Math.PI / 1800;
          var dr = dist + dist * (Math.random() - 0.5) * 0.2;
          var sx = dr * Math.cos(angle) * this.ratio;
          var sy = dr * Math.sin(angle) * 1 / this.ratio;
          var frame = ('000' + Math.floor(Math.random() * 25)).substr(-3);
          var sprite = this.cloudsGroup.create(sx, sy, 'clouds', frame);
          sprite.anchor.setTo(0.5, 0.5); // sprite.scale.set(scale, scale*1.5);

          sprite.scale.set(scale);
          sprite.rotation = rotation;
          sprite.alpha = this.cloudsGroup.alpha;
          var dbr = brightness * 0.8 * Math.random();
          var br = Math.min(1, brightness + (dbr - dbr / 2));
          sprite.tint = (0xff * br << 16) + (0xf4 * br << 8) + (0xe0 * br << 0);
          this.clouds.push({
            angle: angle,
            rotation: rotation,
            scale: scale,
            frame: frame,
            speed: speed,
            dist: dr,
            brightness: br,
            sprite: sprite
          });
        }
      }
    }
  }, {
    key: "update",
    value: function update(game) {
      var _this$yoyo,
          _this$_rotation,
          _this = this;

      var elapsed = game.time.elapsedMS;
      var timer = game.time.timeExpected; // вращение и масштабирование логотипа построенное на математике

      this.yoyo = (((_this$yoyo = this === null || this === void 0 ? void 0 : this.yoyo) !== null && _this$yoyo !== void 0 ? _this$yoyo : 0) + elapsed / 40000) % 2;
      var yoyo = Math.abs(this.yoyo - 1);
      yoyo = yoyo * 1.2 - 0.1;
      yoyo = Math.min(1, Math.max(0, yoyo));
      yoyo = 1 - Math.pow(yoyo, 2);
      this.logoSprite.scale.set(yoyo * 0.9);
      this.logoSprite.alpha = 0.50 + yoyo * 0.5;
      this._rotation = (_this$_rotation = this._rotation) !== null && _this$_rotation !== void 0 ? _this$_rotation : 0;
      var rotation = (1 - yoyo) * 8 * Math.PI;
      this.logoSprite.rotation += Math.abs(this._rotation - rotation);
      this._rotation = rotation; // движение облаков

      this.cloudsGroup.alpha = Math.min(0.8, this.cloudsGroup.alpha + 0.0025);
      this.clouds.forEach(function (item) {
        item.angle += item.speed;
        item.rotation = item.angle - Math.PI / 2;

        var sx = item.dist * Math.cos(item.angle) * _this.ratio;

        var sy = item.dist * Math.sin(item.angle) * 1 / _this.ratio;

        item.sprite.rotation = item.rotation;
        item.sprite.position.set(sx, sy);
        item.sprite.alpha = _this.cloudsGroup.alpha;
      });
    }
  }]);

  return StaticBacground;
}(_phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ }),

/***/ "./public/source/components/class.systembuttons.component.js":
/*!*******************************************************************!*\
  !*** ./public/source/components/class.systembuttons.component.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SystemButtons; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_component_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
/* harmony import */ var _phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../phaser.extends/extend.component.singleton.class.js */ "./public/source/phaser.extends/extend.component.singleton.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.boot.preload', function (core) {
  // предзагрузка используемых для компонента ресурсов
  console.log('core.boot.preload', 'SystemButtons');
  core.load.spritesheet('top_buttons', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/buttons/system_buttons.png', 54, 44, 10);
});

var SystemButtons = /*#__PURE__*/function (_ComponentSingleton) {
  _inherits(SystemButtons, _ComponentSingleton);

  var _super = _createSuper(SystemButtons);

  function SystemButtons(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, SystemButtons);

    return _super.call(this, game, parent, 'SystemButtons', addToStage, enableBody, physicsBodyType);
  }

  _createClass(SystemButtons, [{
    key: "make",
    value: function make() {
      var _this = this;

      // так как класс компонента наследуется от Phaser.Group то
      // использовать create для инициализации мы не можем, так
      // как у Phaser.Group уже есть метод create
      // Для компонентов унаследованных от ComponentSingleton
      // метод make вызывается ОДИН раз при первом создании компонента        
      console.log('Component.make', 'SystemButtons');
      this.alpha = 0.7;
      this.x = _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width;
      this.btnSound = new Phaser.Button(this.game, -108, 0, 'top_buttons', function () {
        _this.onMutePress(false);
      }, this, 0, 0, 1); // this.btnSound.scale.set(scale.x, scale.y);

      this.addChild(this.btnSound);
      this.btnNoSound = new Phaser.Button(this.game, -108, 0, 'top_buttons', function () {
        _this.onMutePress(true);
      }, this, 2, 2, 3); // this.btnNoSound.scale.set(scale.x, scale.y);

      this.addChild(this.btnNoSound);
      this.btnNoSound.visible = this.game.sound.mute;
      this.btnSound.visible = !this.game.sound.mute;
      this.btnFSOpen = new Phaser.Button(this.game, -54, 0, 'top_buttons', this.onFullscreenPress, this, 6, 6, 7); // this.btnFSOpen.scale.set(scale.x, scale.y);

      this.addChild(this.btnFSOpen);
      this.btnFSClose = new Phaser.Button(this.game, -54, 0, 'top_buttons', this.onFullscreenPress, this, 8, 8, 9); // this.btnFSClose.scale.set(scale.x, scale.y);

      this.btnFSClose.visible = false;
      this.addChild(this.btnFSClose);
      this.game.scale.onSizeChange.add(this.onGameSizeChange, this);
    }
  }, {
    key: "onGameSizeChange",
    value: function onGameSizeChange() {
      var screenWidth = this.game.scale.width;
      var screenHeight = this.game.scale.height;
      var sx = this.game.scale.scaleFactor.x;
      var sy = this.game.scale.scaleFactor.y;
      var btnHeight = 44 * _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].scale.y;
      var s = this.game.device.desktop ? 0.06 : 0.09;
      var h = screenHeight < screenWidth ? screenHeight : screenWidth;
      var sprS = s * h / btnHeight;
      this.scale.x = sx * sprS;
      this.scale.y = sy * sprS;
    }
  }, {
    key: "onFullscreenPress",
    value: function onFullscreenPress() {
      var _this2 = this;

      console.log('SystemButtons.onFullscreenPress');
      if (!this.game.scale.compatibility.supportsFullScreen) return;

      var setButtonsVisible = function setButtonsVisible(enabled) {
        _this2.btnFSOpen.visible = enabled;
        _this2.btnFSClose.visible = !enabled;
      };

      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
        setButtonsVisible(true);
      } else {
        this.game.scale.startFullScreen(false);
        setButtonsVisible(false);
      }
    }
  }, {
    key: "onMutePress",
    value: function onMutePress(enabled) {
      console.log('SystemButtons.onMutePress');
      this.btnSound.visible = enabled;
      this.btnNoSound.visible = !enabled;
      this.game.sound.mute = !enabled;
    }
  }]);

  return SystemButtons;
}(_phaser_extends_extend_component_singleton_class_js__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ }),

/***/ "./public/source/components/index.entity.components.js":
/*!*************************************************************!*\
  !*** ./public/source/components/index.entity.components.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_class_entity_wheat_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/class.entity.wheat.component.js */ "./public/source/components/class.entity.wheat.component.js");
/* harmony import */ var _components_class_entity_cow_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/class.entity.cow.component.js */ "./public/source/components/class.entity.cow.component.js");
/* harmony import */ var _components_class_entity_chicken_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/class.entity.chicken.component.js */ "./public/source/components/class.entity.chicken.component.js");



var entities = {
  chicken: _components_class_entity_chicken_component_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  cow: _components_class_entity_cow_component_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  wheat: _components_class_entity_wheat_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (entities);

/***/ }),

/***/ "./public/source/config.js":
/*!*********************************!*\
  !*** ./public/source/config.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var config = {
  // фактический размер. влияет на качество графики и fps
  screenWidth: 1920,
  screenHeight: 1080,
  // внутреннее разрешение игры. 
  // не влияет на качество графики
  // (математика, позиционирование и прочее)
  width: 1280,
  height: 720,
  sharedPath: 'shared/',
  gamePath: '/'
}; // некоторые вычисляемые параметры

config.scale = {
  x: config.screenWidth / config.width,
  y: config.screenHeight / config.height
};
config.center = {
  x: config.width / 2,
  y: config.height / 2
};
/* harmony default export */ __webpack_exports__["default"] = (config);

/***/ }),

/***/ "./public/source/phaser.extends/extend.component.class.js":
/*!****************************************************************!*\
  !*** ./public/source/phaser.extends/extend.component.class.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Component; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import bus from '../tools/tool.events.bus.js'
var Component = /*#__PURE__*/function (_Phaser$Group) {
  _inherits(Component, _Phaser$Group);

  var _super = _createSuper(Component);

  function Component(game, parent, name, addToStage, enableBody, physicsBodyType) {
    var _assertThisInitialize, _assertThisInitialize2, _assertThisInitialize3, _assertThisInitialize4;

    var _this;

    _classCallCheck(this, Component);

    _this = _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType); // console.log('!!!!!!! Component.constructor', game, parent, name, addToStage, enableBody, physicsBodyType);

    _this.game = game; // this.state = this.game.state.getCurrentState();
    // запоминаем оригинальный this.update объектов этого класса

    _this.updateOrig = _this.update; // подменяем оригинальный this.update объектов этого класса

    _this.update = _this.updateHandler; // запоминаем оригинальный this.destroy объектов этого класса

    _this.destroyOrig = _this.destroy; // подменяем оригинальный this.destroy объектов этого класса

    _this.destroy = _this.destroyHandler; // запоминаем оригинальный this.stop объектов этого класса

    _this.stopOrig = _this.stop; // подменяем оригинальный this.stop объектов этого класса

    _this.stop = _this.stopHandler; // запоминаем оригинальный this.start объектов этого класса

    _this.startOrig = _this.start; // подменяем оригинальный this.start объектов этого класса

    _this.start = _this.startHandler;
    (_assertThisInitialize = _assertThisInitialized(_this)) === null || _assertThisInitialize === void 0 ? void 0 : (_assertThisInitialize2 = _assertThisInitialize.make) === null || _assertThisInitialize2 === void 0 ? void 0 : _assertThisInitialize2.call(_assertThisInitialize);
    (_assertThisInitialize3 = _assertThisInitialized(_this)) === null || _assertThisInitialize3 === void 0 ? void 0 : (_assertThisInitialize4 = _assertThisInitialize3.init) === null || _assertThisInitialize4 === void 0 ? void 0 : _assertThisInitialize4.call(_assertThisInitialize3);
    _this.isMake = true;
    _this.isActive = true;
    return _this;
  }

  _createClass(Component, [{
    key: "updateHandler",
    value: function updateHandler() {
      var _this$updateOrig;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // вызываем оригинальный update для объекта этого класса
      if (this.isMake && this.exists && this.game && this.isActive) this === null || this === void 0 ? void 0 : (_this$updateOrig = this.updateOrig) === null || _this$updateOrig === void 0 ? void 0 : _this$updateOrig.call(this, this.game);
      this.forEach(function (item) {
        var _item$update;

        item === null || item === void 0 ? void 0 : (_item$update = item.update) === null || _item$update === void 0 ? void 0 : _item$update.call.apply(_item$update, [item].concat(args));
      }); // const elapsed = game.time.elapsedMS;
      // const timer = game.time.timeExpected;
      // console.log(1);
    }
  }, {
    key: "destroyHandler",
    value: function destroyHandler() {
      var _this$shutdown;

      this.forEach(function (item) {
        var _item$shutdown;

        item === null || item === void 0 ? void 0 : (_item$shutdown = item.shutdown) === null || _item$shutdown === void 0 ? void 0 : _item$shutdown.call(item);
      });
      this === null || this === void 0 ? void 0 : (_this$shutdown = this.shutdown) === null || _this$shutdown === void 0 ? void 0 : _this$shutdown.call(this);
      this.destroyOrig.apply(this, arguments);
    }
  }, {
    key: "stopHandler",
    value: function stopHandler() {
      var _this$paused;

      if (!this.isActive) return;
      this.isActive = false;
      this.forEach(function (item) {
        var _item$paused;

        item === null || item === void 0 ? void 0 : (_item$paused = item.paused) === null || _item$paused === void 0 ? void 0 : _item$paused.call(item);
      });
      this === null || this === void 0 ? void 0 : (_this$paused = this.paused) === null || _this$paused === void 0 ? void 0 : _this$paused.call(this);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this === null || this === void 0 ? void 0 : this.stopOrig.apply(this, args);
    }
  }, {
    key: "startHandler",
    value: function startHandler() {
      var _this$resumed;

      if (this.isActive) return;
      this.isActive = true;
      this === null || this === void 0 ? void 0 : (_this$resumed = this.resumed) === null || _this$resumed === void 0 ? void 0 : _this$resumed.call(this);
      this.forEach(function (item) {
        var _item$resumed;

        item === null || item === void 0 ? void 0 : (_item$resumed = item.resumed) === null || _item$resumed === void 0 ? void 0 : _item$resumed.call(item);
      });

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this === null || this === void 0 ? void 0 : this.startOrig.apply(this, args);
    }
  }]);

  return Component;
}(Phaser.Group);


Phaser.Element = Component; // Phaser.GameObjectFactory.prototype.element = function (parent, name, addToStage, enableBody, physicsBodyType) {
//     return new Phaser.Element(this.game, parent, name, addToStage, enableBody, physicsBodyType);
// }
// console.log(222, Phaser)

/***/ }),

/***/ "./public/source/phaser.extends/extend.component.singleton.class.js":
/*!**************************************************************************!*\
  !*** ./public/source/phaser.extends/extend.component.singleton.class.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ComponentSingleton; }
/* harmony export */ });
/* harmony import */ var _extend_component_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extend.component.class.js */ "./public/source/phaser.extends/extend.component.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var singletons = {};

var ComponentSingleton = /*#__PURE__*/function (_Component) {
  _inherits(ComponentSingleton, _Component);

  var _super = _createSuper(ComponentSingleton);

  function ComponentSingleton(game, parent) {
    var _this;

    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';
    var addToStage = arguments.length > 3 ? arguments[3] : undefined;
    var enableBody = arguments.length > 4 ? arguments[4] : undefined;
    var physicsBodyType = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, ComponentSingleton);

    // делаем компонент singlton-м (один экзепляр на всех)
    var singleton = singletons[name];

    if (singleton) {
      var _singleton$resumed;

      // добавляем группу нашего компонента в parent
      if (parent) parent.addChild(singleton); // вызываем метод init() при создании каждого нового объекта от SystemButtons

      singleton.init(); // вызываем оригинальный resumed для объекта этого класса

      singleton === null || singleton === void 0 ? void 0 : (_singleton$resumed = singleton.resumed) === null || _singleton$resumed === void 0 ? void 0 : _singleton$resumed.call(singleton);
      singleton.forEach(function (item) {
        var _item$init, _item$resumed;

        item === null || item === void 0 ? void 0 : (_item$init = item.init) === null || _item$init === void 0 ? void 0 : _item$init.call(item);
        item === null || item === void 0 ? void 0 : (_item$resumed = item.resumed) === null || _item$resumed === void 0 ? void 0 : _item$resumed.call(item);
      }); // возвращаем ранее созданный объект класса SystemButtons

      return _possibleConstructorReturn(_this, singleton);
    }

    _this = _super.call(this, game, parent, name, addToStage, enableBody, physicsBodyType); // this.ignoreDestroy = true;
    // запоминаем оригинальный this.init объектов этого класса

    _this.initOrig = _this.init; // подменяем оригинальный this.init объектов этого класса

    _this.init = _this.initHandler; // запоминаем первый созданный экземпляр

    singletons[name] = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(ComponentSingleton, [{
    key: "initHandler",
    value: function initHandler() {
      var _this$initOrig;

      // восстанавливаем возможность ввода
      this.setIgnoreChildInput(false); // вызываем оригинальный init для объекта этого класса

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this === null || this === void 0 ? void 0 : (_this$initOrig = this.initOrig) === null || _this$initOrig === void 0 ? void 0 : _this$initOrig.call.apply(_this$initOrig, [this].concat(args));
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this$paused;

      // console.log('ComponentSingleton.destroy', 'MainMenuGui');
      // так как этот компонент у нас singlon, 
      // и существует все время, пока игра запущена
      // то ставим заглушку на его уничтожение
      // так как будет автоматически уничтожатся при смене state
      this.setIgnoreChildInput(true);
      this.forEach(function (item) {
        var _item$paused;

        item === null || item === void 0 ? void 0 : (_item$paused = item.paused) === null || _item$paused === void 0 ? void 0 : _item$paused.call(item);
      });
      this === null || this === void 0 ? void 0 : (_this$paused = this.paused) === null || _this$paused === void 0 ? void 0 : _this$paused.call(this);
    }
  }, {
    key: "setIgnoreChildInput",
    value: function setIgnoreChildInput(value) {
      this.isActive = !value;
      this.ignoreChildInput = value;
      this.enabled = value;
      this.forEach(function (item) {
        var _item$setIgnoreChildI;

        item === null || item === void 0 ? void 0 : (_item$setIgnoreChildI = item.setIgnoreChildInput) === null || _item$setIgnoreChildI === void 0 ? void 0 : _item$setIgnoreChildI.call(item, value);
        item.enabled = value;
      });
    }
  }]);

  return ComponentSingleton;
}(_extend_component_class_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


Phaser.Element = _extend_component_class_js__WEBPACK_IMPORTED_MODULE_0__["default"]; // Phaser.GameObjectFactory.prototype.element = function (parent, name, addToStage, enableBody, physicsBodyType) {
//     return new Phaser.Element(this.game, parent, name, addToStage, enableBody, physicsBodyType);
// }
// console.log(222, Phaser)

/***/ }),

/***/ "./public/source/phaser.extends/extend.state.class.js":
/*!************************************************************!*\
  !*** ./public/source/phaser.extends/extend.state.class.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ State; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

 // описание класса Phaser.State https://photonstorm.github.io/phaser-ce/Phaser.State.html

var State = /*#__PURE__*/function (_Phaser$State) {
  _inherits(State, _Phaser$State);

  var _super = _createSuper(State);

  function State() {
    var _this;

    _classCallCheck(this, State);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args)); // console.log('State.constructor');
    // запоминаем оригинальный this.init объектов этого класса

    _this.initOrig = _this.init; // подменяем оригинальный this.init объектов этого класса

    _this.init = _this.initHandler; // запоминаем оригинальный this.update объектов этого класса
    // this.updateOrig = this.update;
    // подменяем оригинальный this.update объектов этого класса
    // this.update = this.updateHandler;

    return _this;
  } // updateHandler(...args) {
  //     // вызываем оригинальный init для объекта этого класса
  //     this?.updateOrig?.(...args);
  //     // console.log(1);
  // }
  // описание метода init https://photonstorm.github.io/phaser-ce/Phaser.State.html#init


  _createClass(State, [{
    key: "initHandler",
    value: function initHandler() {
      // console.log('State.init');
      // хитрые манипуляции со scale. суть в следующем:
      // хочу задавать фиксированный размер канваса,
      // но при этом иметь другой фиксированный размер сцен
      // создаем группу, которую будем дополнительно масштабировать
      this.group = this.add.group(); // подменяем группу мира в this.add на созданную группу
      // при этом this.world остается прежним

      this.add.world = this.group; // вызываем оригинальный init для объекта этого класса

      this.initOrig.apply(this, arguments); // устанавливаем для сцены режим scale по умолчанию.
      // по факту будет менятся scale группы this.world

      this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      this.game.scale.refresh(); // устанавливаем для группы this.group такой scale, чтобы она
      // четко вписалась в текущий размер канваса имея размер, 
      // заданный в конфиге

      this.group.scale.set(_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].scale.x, _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].scale.y);
    }
  }]);

  return State;
}(Phaser.State);



/***/ }),

/***/ "./public/source/states/state.boot.js":
/*!********************************************!*\
  !*** ./public/source/states/state.boot.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BootState; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _components_class_staticbackground_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/class.staticbackground.component.js */ "./public/source/components/class.staticbackground.component.js");
/* harmony import */ var _components_class_systembuttons_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/class.systembuttons.component.js */ "./public/source/components/class.systembuttons.component.js");
/* harmony import */ var _components_class_incorrectorientation_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/class.incorrectorientation.component.js */ "./public/source/components/class.incorrectorientation.component.js");
/* harmony import */ var _phaser_extends_extend_state_class_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../phaser.extends/extend.state.class.js */ "./public/source/phaser.extends/extend.state.class.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






 // ловим событие 'core.boot.preload' и производим
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.boot.preload', function (core) {
  console.log('core.boot.preload', 'BootState');
  core.load.image('loading_logo', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/preloader/preloader.logo.png');
  core.load.image('loading_back', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/preloader/preloader.background.jpg');
  core.load.spritesheet('loading_bar', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sprites/preloader/bar.png', 18, 10, 3);
  core.load.bitmapFont('gl_fnt_lucida_10_rgba_ye', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'fonts/gl_fnt_arial_14_bold_ye_bl_rgba.png', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'fonts/gl_fnt_arial_14_bold_ye_bl_rgba.xml', null, -3, 0);
});

var BootState = /*#__PURE__*/function (_State) {
  _inherits(BootState, _State);

  var _super = _createSuper(BootState);

  function BootState() {
    _classCallCheck(this, BootState);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _super.call.apply(_super, [this].concat(args));
  }
  /**
   * стандартный метод класса Phaser.State
   * https://photonstorm.github.io/phaser-ce/Phaser.State.html#init
   */


  _createClass(BootState, [{
    key: "init",
    value: function init() {
      console.log('State.init', 'BootState'); // некоторые параметры)))

      this.BAR_WIDTH = 0.25 * _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].width;
      this.BAR_HEIGHT = 10;
      this.position = {
        x: _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.x,
        y: _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.y * 1.75
      }; // устанавливаем обработчики предварительной загрузки ресурсоов загрузочного экрана

      this.load.onFileComplete.add(this.bootFileComplete, this);
      this.load.onLoadComplete.add(this.bootLoadComplete, this); // отключаем контекствоное меню по ПКМ

      this.game.canvas.oncontextmenu = function (e) {
        e.preventDefault();
      };
    } // стандартный обработчик паузы компонента Phaser.State

  }, {
    key: "paused",
    value: function paused() {
      // не даем загрузчику становиться на паузу
      this.state.resume();
      this.game.paused = false;
    } // обработчики предварительной загрузки ресурсоов загрузочного экрана

  }, {
    key: "bootFileComplete",
    value: function bootFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {// console.log('bootFileComplete', totalLoaded, '/', totalFiles);
    }
  }, {
    key: "bootLoadComplete",
    value: function bootLoadComplete() {
      // console.log('State.bootpreoad.complete', 'BootState');
      this.load.onFileComplete.remove(this.bootFileComplete, this);
      this.load.onLoadComplete.remove(this.bootLoadComplete, this);
    } // обработчики предварительной загрузки ресурсоов всей игры

  }, {
    key: "gameFileComplete",
    value: function gameFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
      // console.log('gameFileComplete', totalLoaded, '/', totalFiles);
      this.barSprite.width = Math.floor(this.BAR_WIDTH * progress / 100);
      this.statusText.text = 'loading ' + totalLoaded + ' of ' + totalFiles; // this.logoSprite.alpha = 1-(progress / 100)
    }
  }, {
    key: "gameLoadComplete",
    value: function gameLoadComplete() {
      // console.log('State.preload.complate', 'BootState');
      this.load.onFileComplete.remove(this.gameFileComplete, this);
      this.load.onLoadComplete.remove(this.gameLoadComplete, this);
      this.isLoaded = true;
      this.statusText.text = this.connectionStatusText || 'load complete';
      this.next();
    }
    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#preload
     */

  }, {
    key: "preload",
    value: function preload() {
      // оповещаем все заинтересованные компоненты о возможости загрузить свои ресурсы
      // до запуска сцены прелоадера. Имеет смысл для компонентов, которые используются 
      // в прелоадере
      _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].emit('core.boot.preload', this);
    }
    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#create
     */

  }, {
    key: "create",
    value: function create() {
      var _this = this;

      console.log('State.create', 'BootState'); // подключаем заставку с облаками в качестве фона

      this.back = new _components_class_staticbackground_component_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.game, this.group); // отрисовываем статусбар загрузки

      this.barBackSprite = this.add.tileSprite(this.position.x - this.BAR_WIDTH * 0.5, this.position.y - this.BAR_HEIGHT, this.BAR_WIDTH, this.BAR_HEIGHT, 'loading_bar', 1, this.group);
      this.barBackSprite.tint = 0xcaba00;
      this.barBackSprite.scale.set(1);
      this.barSprite = this.add.tileSprite(this.position.x - this.BAR_WIDTH * 0.5, this.position.y - this.BAR_HEIGHT, this.BAR_WIDTH, this.BAR_HEIGHT, 'loading_bar', 2, this.group);
      this.barSprite.width = 0;
      this.barSprite.scale.set(1);
      this.statusText = this.add.bitmapText(this.position.x, this.position.y, 'gl_fnt_lucida_10_rgba_ye', 'loading', 100, this.group);
      this.statusText.anchor.x = 0.5; // поверх подключаем синглтон компоненты: системные кнопки и неправильная ориентация экрана        

      new _components_class_incorrectorientation_component_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.game, this.group);
      new _components_class_systembuttons_component_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.game, this.group); // отвязываемся от синхронности

      setTimeout(function () {
        // устанавливаем обработчики процесса загрузки ресурсов
        _this.load.onFileComplete.add(_this.gameFileComplete, _this);

        _this.load.onLoadComplete.add(_this.gameLoadComplete, _this); // сообщаем всем заинтересованным о том что пора дать ссылки на загружаенмые ресурсы


        _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].emit('core.preload', _this); // запускаем загрузку всех ресурсов

        _this.load.start();
      }, 0);
    }
    /**
     * вызов метода передает управление следующей сцене 'MainMenuState'
     */

  }, {
    key: "next",
    value: function next() {
      var _this2 = this;

      console.log('BootState.next'); // сообщаем всем заинтересованным о том что загрузка ресурсов завершена 
      // и можно приступить к созданию объектов, использующих загруженные ресурсы

      _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].emit('core.create', this); // задержка не несет никакого функционала
      // и сделана только для того, чтобы увидеть
      // последние сообщения от клиента

      setTimeout(function () {
        // передаем управление в сцену главного меню
        _this2.state.start('MainMenuState');
      }, 300);
    }
  }]);

  return BootState;
}(_phaser_extends_extend_state_class_js__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./public/source/states/state.game.js":
/*!********************************************!*\
  !*** ./public/source/states/state.game.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GameState; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_state_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.state.class.js */ "./public/source/phaser.extends/extend.state.class.js");
/* harmony import */ var _components_class_systembuttons_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/class.systembuttons.component.js */ "./public/source/components/class.systembuttons.component.js");
/* harmony import */ var _components_class_incorrectorientation_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/class.incorrectorientation.component.js */ "./public/source/components/class.incorrectorientation.component.js");
/* harmony import */ var _components_class_game_enviroment_gui_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/class.game.enviroment.gui.component.js */ "./public/source/components/class.game.enviroment.gui.component.js");
/* harmony import */ var _components_class_game_fields_gui_component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/class.game.fields.gui.component.js */ "./public/source/components/class.game.fields.gui.component.js");
/* harmony import */ var _components_class_game_entity_gui_component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/class.game.entity.gui.component.js */ "./public/source/components/class.game.entity.gui.component.js");
/* harmony import */ var _components_class_game_state_gui_component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/class.game.state.gui.component.js */ "./public/source/components/class.game.state.gui.component.js");
/* harmony import */ var _components_class_crosshair_component_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/class.crosshair.component.js */ "./public/source/components/class.crosshair.component.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }










 // ловим событие 'core.preload' и производим
// предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'GameState');
});

var GameState = /*#__PURE__*/function (_State) {
  _inherits(GameState, _State);

  var _super = _createSuper(GameState);

  function GameState() {
    var _this;

    _classCallCheck(this, GameState);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.name = 'game'; // setTimeout(() => {
    //     this.state.start('MainMenuState');
    // }, 5000);        

    return _this;
  }
  /**
   * стандартный метод класса Phaser.State
   * https://photonstorm.github.io/phaser-ce/Phaser.State.html#init
   */


  _createClass(GameState, [{
    key: "init",
    value: function init() {
      console.log('State.init', 'GameState');
      this.layers = {
        game: new Phaser.Group(this.game, this.group),
        system: new Phaser.Group(this.game, this.group)
      }; // const seed = Math.trunc(Math.random() * 99999);
      // const seed = 4851;

      var seed = 47323;
      console.log('seed', seed);
    }
    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#create
     */

  }, {
    key: "create",
    value: function create() {
      console.log('State.create', 'GameState'); // this.back = new StaticBacground(this.game, this.layers.baskground);
      // this.logo = this.layers.foregraund.create(config.center.x, config.center.y, 'logo');
      // this.logo.anchor.set(0.5);
      // this.layers.road.alpha = 0.3;
      // this.gameWorld.road.points.forEach(point => {
      //     point.sprite = new Phaser.Sprite(this.game, point.x, point.y, 'point', 0);
      //     point.sprite.anchor.set(0.5);
      //     point.sprite.scale.set(0.015);
      //     this.layers.road.addChild(point.sprite);
      // });

      new _components_class_incorrectorientation_component_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.game, this.layers.system);
      new _components_class_systembuttons_component_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.game, this.layers.system);
      this.crosshair = new _components_class_crosshair_component_js__WEBPACK_IMPORTED_MODULE_9__["default"](this.game, this.layers.system);
      new _components_class_game_enviroment_gui_component_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.game, this.layers.game);
      new _components_class_game_fields_gui_component_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.game, this.layers.game);
      this.entityPanel = new _components_class_game_entity_gui_component_js__WEBPACK_IMPORTED_MODULE_7__["default"](this.game, this.layers.game);
      this.entityPanel.position.set(0, 80);
      this.statePanel = new _components_class_game_state_gui_component_js__WEBPACK_IMPORTED_MODULE_8__["default"](this.game, this.layers.game);
      this.statePanel.position.set(_config_js__WEBPACK_IMPORTED_MODULE_0__["default"].center.x, 0);
    }
    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {// const elapsed = game.time.elapsedMS;
      // const timer = game.time.time;
      // console.log(game.time, timer - (this?.latsUnitstimer??0));
      // this.layers.entity.sort('y', Phaser.Group.SORT_ASCENDING);
    }
  }, {
    key: "start",
    value: function start() {
      console.log('State.start', 'GameState');
    }
    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#render
     */

  }, {
    key: "render",
    value: function render() {
      this.game.debug.inputInfo(32, 32);
    }
  }]);

  return GameState;
}(_phaser_extends_extend_state_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/states/state.mainmenu.js":
/*!************************************************!*\
  !*** ./public/source/states/state.mainmenu.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MainMenuState; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config.js */ "./public/source/config.js");
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _phaser_extends_extend_state_class_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../phaser.extends/extend.state.class.js */ "./public/source/phaser.extends/extend.state.class.js");
/* harmony import */ var _components_class_staticbackground_component_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/class.staticbackground.component.js */ "./public/source/components/class.staticbackground.component.js");
/* harmony import */ var _components_class_systembuttons_component_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/class.systembuttons.component.js */ "./public/source/components/class.systembuttons.component.js");
/* harmony import */ var _components_class_mainmenu_gui_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/class.mainmenu.gui.component.js */ "./public/source/components/class.mainmenu.gui.component.js");
/* harmony import */ var _components_class_incorrectorientation_component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/class.incorrectorientation.component.js */ "./public/source/components/class.incorrectorientation.component.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







 // ловим событие 'core.preload' и производим предзагрузку необходимых на данной стадии ресурсов

_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_1__["default"].once('core.preload', function (core) {
  console.log('core.preload', 'Menu');
  core.load.audio('snd_menu_bgm', _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].gamePath + 'sounds/snd_main_bgm_v1.mp3');
});

var MainMenuState = /*#__PURE__*/function (_State) {
  _inherits(MainMenuState, _State);

  var _super = _createSuper(MainMenuState);

  function MainMenuState() {
    _classCallCheck(this, MainMenuState);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _super.call.apply(_super, [this].concat(args));
  }
  /**
   * стандартный метод класса Phaser.State
   * https://photonstorm.github.io/phaser-ce/Phaser.State.html#init
   */


  _createClass(MainMenuState, [{
    key: "init",
    value: function init() {
      console.log('State.menu.init');
    } // стандартный обработчик паузы компонента Phaser.State

  }, {
    key: "paused",
    value: function paused() {
      // this.state.resume();
      // this.game.stage.paused = false;
      this.snd_background.pause();
      console.log('paused');
    } // стандартный обработчик снятия паузы компонента Phaser.State

  }, {
    key: "resumed",
    value: function resumed() {
      this.snd_background.resume();
      console.log('resumed');
    } // стандартный обработчик остановки компонента Phaser.State

  }, {
    key: "shutdown",
    value: function shutdown() {
      this.snd_background.stop();
      console.log('shutdown');
    }
    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#create
     */

  }, {
    key: "create",
    value: function create() {
      console.log('State.menu.create');
      this.snd_background = this.game.add.audio('snd_menu_bgm');
      this.snd_background.play('', 0, 1, true);
      this.back = new _components_class_staticbackground_component_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.game, this.group);
      this.gui = new _components_class_mainmenu_gui_component_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.game, this.group);
      new _components_class_incorrectorientation_component_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.game, this.group);
      new _components_class_systembuttons_component_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.game, this.group); // console.log(this.state);
      // setInterval(() => {
      //     this.state.start('Menu');
      // setTimeout(() => {
      //     this.state.start('Disconnect', false);
      // }, 1000);
      // }, 2000);
    }
    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */

  }, {
    key: "update",
    value: function update(game) {// const elapsed = game.time.elapsedMS;
      // const timer = game.time.timeExpected;
      // this.yoyo = ((this?.yoyo ?? 1) + elapsed / 5000) % 2;
      // const scale = Math.abs(this.yoyo - 1)/10;
      // this.foreSprite.scale.set(0.73 + scale);
    }
  }]);

  return MainMenuState;
}(_phaser_extends_extend_state_class_js__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/source/tools/class.extend.event.emitter.js":
/*!***********************************************************!*\
  !*** ./public/source/tools/class.extend.event.emitter.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ExtendEventEmitter; }
/* harmony export */ });
/* harmony import */ var _tool_compare_path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tool.compare.path.js */ "./public/source/tools/tool.compare.path.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


/**
 * класс ExtendEventEmitter - упрощенный вариант EventEmitter-а из NodeJs но имеющий 
 * при этом существенное дополнение - в именах событий поддерживаются простые шаблоны,
 * что позволяет более гибко устанавливать обработчики событий, и вызывать их.
 * Пример ниже дает представление о возможностях использования данных шаблонов:
 * ```
 *  'aaa'       === 'aaa'
 *  'aaa'       !== 'bbb'
 *  'aaa.bbb'   === 'aaa.bbb'
 *  'aaa.bbb'   !== 'aaa.ccc'
 *  'aaa.*'     === 'aaa'
 *  'aaa.*'     === 'aaa.*'
 *  'aaa.*'     === 'aaa.bbb'
 *  'aaa.*.ccc' !== 'aaa'
 *  'aaa.*.ccc' === 'aaa.*'
 *  'aaa.*.ccc' !== 'aaa.bbb'
 *  'aaa.*.*'   === 'aaa.bbb'
 *  'aaa.*.ccc' === 'aaa.bbb.*'
 *  'aaa.*.ccc' === 'aaa.bbb.ccc'
 *  '*'         === 'aaa'
 *  '*'         === 'aaa.bbb'
 *  '*'         === 'aaa.bbb.ccc'
 * ```
 */

var ExtendEventEmitter = /*#__PURE__*/function () {
  /**
   * This callback is displayed as part of the MyClass class.
   * @callback ExtendEventEmitter~FuncCallback
   * @param {any} arguments - любые аргументы (функция примет те аргументы, которые были переданы методу {@link ExtendEventEmitter#emit ExtendEventEmitter.emit()} начиная со второго параметра)
   */

  /**
   * @constructor
   * @param {boolean} isAsync - принимет значения true и false. По умолчанию false
   */
  function ExtendEventEmitter(isAsync) {
    _classCallCheck(this, ExtendEventEmitter);

    // // Классический метод защиты от конструкторов, не вызываемых с помощью new
    // if (!(this instanceof ExtendEventEmitter)) {
    //     return new ExtendEventEmitter(isAsync);
    // }
    this.__isAsync = isAsync;
    this.__e = {};
    this.splitter = '.';
  }
  /**
   * Производит поиск обработчиков с соответсвующим шаблоном пути.
   * Принцип сравнения шаблонов раскрывает следующий пример
   * ```
   *  'aaa'       === 'aaa'
   *  'aaa'       !== 'bbb'
   *  'aaa.bbb'   === 'aaa.bbb'
   *  'aaa.bbb'   !== 'aaa.ccc'
   *  'aaa.*'     === 'aaa'
   *  'aaa.*'     === 'aaa.*'
   *  'aaa.*'     === 'aaa.bbb'
   *  'aaa.*.ccc' !== 'aaa'
   *  'aaa.*.ccc' === 'aaa.*'
   *  'aaa.*.ccc' !== 'aaa.bbb'
   *  'aaa.*.*'   === 'aaa.bbb'
   *  'aaa.*.ccc' === 'aaa.bbb.*'
   *  'aaa.*.ccc' === 'aaa.bbb.ccc'
   *  '*'         === 'aaa'
   *  '*'         === 'aaa.bbb'
   *  '*'         === 'aaa.bbb.ccc'
   * ```
   * @param {string} eventName 
   * @returns {array} список обработчиков событий, положительно прошедших проверку
   */


  _createClass(ExtendEventEmitter, [{
    key: "getListeners",
    value: function getListeners(eventName) {
      var path1 = eventName.split('.');
      var list = Object.values(this.__e).reduce(function (acc, item) {
        if ((0,_tool_compare_path_js__WEBPACK_IMPORTED_MODULE_0__["default"])(path1, item.path)) acc.push.apply(acc, _toConsumableArray(item.listeners));
        return acc;
      }, []);
      return list;
    }
    /** @lends ExtendEventEmitter.prototype */

    /**
     * Устанавливает постоянный обработчик `listener` события `eventName`
     * @param  {String}   eventName    название события
     * @param  {ExtendEventEmitter~FuncCallback} listener обработчик события
     * @param  {object} context контекст, в котором будет вызван обработчик события
     * 
     * @returns {Function} установленный обработчик события
     */

  }, {
    key: "on",
    value: function on(eventName, listener, context) {
      if (typeof listener !== 'function') return;
      if (!context) context = null;

      if (_typeof(this.__e[eventName]) !== 'object') {
        this.__e[eventName] = {
          path: eventName.split(this.splitter),
          listeners: []
        };
      }

      this.__e[eventName].listeners.push({
        listener: listener,
        context: context
      });

      return listener;
    }
    /**
     * Удаляет обработчик listener события eventName
     *
     * @param  {String}   eventName    название события
     * @param  {Function} listener обработчик события
     */

  }, {
    key: "removeListener",
    value: function removeListener(eventName, listener) {
      // const list = this.__e[eventName]?.listeners;
      var list = this.getListeners(eventName);
      if (!Array.isArray(list)) return;
      var idx = list.findIndex(function (item) {
        return listener === item.listener;
      }, this);
      if (idx < 0) return;
      list.splice(idx, 1);
      if (!list.length) delete this.__e[eventName];
    }
    /**
     * Создает событие event вызывая все зарегестрированные для него обработчики
     *
     * @param  {String}   eventName    название события
     * @param  {any} arguments  аргументы для обработчиков событий
     */

  }, {
    key: "emit",
    value: function emit(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // console.log('EVENT',eventName,args)
      // const list = this.__e[eventName]?.listeners;
      var list = this.getListeners(eventName);
      if (!Array.isArray(list)) return;

      if (this.__isAsync) {
        list.slice(0).forEach(function (item) {
          setImmediate(function () {
            item.listener.apply(item.context, args);
          });
        });
      } else {
        list.slice(0).forEach(function (item) {
          // if(eventName!=='game.update') console.log(eventName, "args",...args);
          item.listener.apply(item.context, args);
        });
      }
    }
    /**
     * Устанавливает одноразовый обработчик listener события eventName
     *
     * @param  {String}   eventName    название события
     * @param  {ExtendEventEmitter~FuncCallback} listener обработчик события
     * @param  {object} context контекст, в котором будет вызван обработчик события
     * 
     * @returns {Function} установленный обработчик события
     */

  }, {
    key: "once",
    value: function once(eventName, listener, context) {
      var _this = this;

      if (!context) context = null;

      var _self = this;

      var g = function g() {
        // console.log('removeListener', 1, eventName, (Array.isArray(_self.__e[eventName])?_self.__e[eventName].length:0))
        _this.removeListener(eventName, g);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        listener.apply(context, args); // console.log('removeListener', 2, eventName, (Array.isArray(_self.__e[eventName])?_self.__e[eventName].length:0))
      };

      this.on(eventName, g);
      return listener;
    }
  }]);

  return ExtendEventEmitter;
}(); // function getListeners(eventName1, eventName2){
//     const path1 = eventName1.split('.');
//     const path2 = eventName2.split('.');
//     const len1 = path1.length;
//     const len2 = path2.length;
//     const len = Math.max(len1, len2);
//     let isEqual = true;
//     for(let i=0; i<len; i++){
//         const key1 = path1[i];
//         const key2 = path2[i];
//         if(key1==='*' && len1===i+1 ) break;
//         if(key2==='*' && len2===i+1 ) break;
//         if(key1==='*' || key2==='*' || key1===key2) continue;
//         isEqual = false;
//         break;
//     }
//     if( isEqual ){
//         console.log(eventName1, "===", eventName2)
//     }else{
//         console.log(eventName1, "!==",eventName2)
//     }
// };
// getListeners('aaa', 'aaa');
// getListeners('aaa', 'bbb');
// getListeners('aaa.bbb', 'aaa.bbb')
// getListeners('aaa.bbb', 'aaa.ccc')
// getListeners('aaa.*', 'aaa')
// getListeners('aaa.*', 'aaa.*')
// getListeners('aaa.*', 'aaa.bbb')
// getListeners('aaa.*.ccc', 'aaa')
// getListeners('aaa.*.ccc', 'aaa.*')
// getListeners('aaa.*.ccc', 'aaa.bbb')
// getListeners('aaa.*.*', 'aaa.bbb')
// getListeners('aaa.*.ccc', 'aaa.bbb.*')
// getListeners('aaa.*.ccc', 'aaa.bbb.ccc')
// getListeners('*', 'aaa')
// getListeners('*', 'aaa.bbb')
// getListeners('*', 'aaa.bbb.ccc')




/***/ }),

/***/ "./public/source/tools/class.keyboard.js":
/*!***********************************************!*\
  !*** ./public/source/tools/class.keyboard.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Keyboard; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Keyboard = /*#__PURE__*/function () {
  function Keyboard() {
    var lesteners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var context = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Keyboard);

    // тут будут флаги отслеживания нажатия кнопок
    this.keys = {}; // тут запомним текущие обработчики кнопок

    this.listeners = {};
    this.isActive = false; // устанавливаем слушатели на нажатия, удержание и отжатия кнопок

    window.addEventListener("keydown", this.downListener.bind(this), false);
    window.addEventListener("keyup", this.upListener.bind(this), false);
    this.setListeners(lesteners, context !== null && context !== void 0 ? context : this);
  }

  _createClass(Keyboard, [{
    key: "stop",
    value: function stop() {
      this.isActive = false;
    }
  }, {
    key: "start",
    value: function start() {
      this.isActive = true;
    }
  }, {
    key: "setListeners",
    value: function setListeners(list, context) {
      if (!list || _typeof(list) !== 'object') return;
      if (!context) context = null;
      this.listeners = {};
      Object.keys(list).forEach(function (key) {
        if (typeof list[key] !== 'function') return;

        this.listeners[key] = function (key) {
          list[key].call(context, key);
        };
      }, this);
    }
  }, {
    key: "downListener",
    value: function downListener(event) {
      if (!this.isActive) return;
      var key = event.code.replace(/^(Key|Digit)/i, '').toUpperCase();
      console.log('onDown', key, this.keys[key], this.listeners);
      if (this.keys[key]) return;
      this.keys[key] = true;
      if (this.listeners[key]) this.listeners[key](key); // console.log('onDown', key);
    }
  }, {
    key: "upListener",
    value: function upListener(event) {
      if (!this.isActive) return;
      var key = event.code.replace(/^(Key|Digit)/i, '').toUpperCase();
      this.keys[key] = false; // console.log('onUp',key);
      // this.emit(key, 'up');
    }
  }, {
    key: "pressListener",
    value: function pressListener(key) {
      if (!this.isActive) return; // key = key.toUpperCase();
      // console.log('onPress',key);
      // this.emit(key, 'press');
    }
  }]);

  return Keyboard;
}();



/***/ }),

/***/ "./public/source/tools/class.vector.js":
/*!*********************************************!*\
  !*** ./public/source/tools/class.vector.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Matrix": function() { return /* binding */ Matrix; },
/* harmony export */   "Vector2": function() { return /* binding */ Vector2; },
/* harmony export */   "Vector3": function() { return /* binding */ Vector3; }
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Matrix = /*#__PURE__*/function () {
  function Matrix() {
    _classCallCheck(this, Matrix);
  }

  _createClass(Matrix, null, [{
    key: "multiply",
    value: function multiply(a, b) {
      var m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          m[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j] + a[i][2] * b[2][j] + a[i][3] * b[3][j];
        }
      }

      return m;
    }
  }, {
    key: "getTranslation",
    value: function getTranslation(dx, dy, dz) {
      return [[1, 0, 0, dx], [0, 1, 0, dy], [0, 0, 1, dz], [0, 0, 0, 1]];
    }
  }, {
    key: "getScale",
    value: function getScale(sx, sy, sz) {
      return [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]];
    }
  }, {
    key: "getRotationX",
    value: function getRotationX(angle) {
      // const rad = Math.PI / 180 * angle;
      return [[1, 0, 0, 0], [0, Math.cos(angle), -Math.sin(angle), 0], [0, Math.sin(angle), Math.cos(angle), 0], [0, 0, 0, 1]];
    }
  }, {
    key: "getRotationY",
    value: function getRotationY(angle) {
      // const rad = Math.PI / 180 * angle;
      return [[Math.cos(angle), 0, Math.sin(angle), 0], [0, 1, 0, 0], [-Math.sin(angle), 0, Math.cos(angle), 0], [0, 0, 0, 1]];
    }
  }, {
    key: "getRotationZ",
    value: function getRotationZ(angle) {
      // const rad = Math.PI / 180 * angle;
      return [[Math.cos(angle), -Math.sin(angle), 0, 0], [Math.sin(angle), Math.cos(angle), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }
  }, {
    key: "getLookAt",
    value: function getLookAt(from, target, up) {
      var vz = from.subtract(target).normalize();
      var vx = up.normalize().cross(vz);
      var vy = vz.normalize().cross(vx);
      return Matrix.multiply(Matrix.getTranslation(-from.x, -from.y, -eye.z), [[vx.x, vx.y, vx.z, 0], [vy.x, vy.y, vy.z, 0], [vz.x, vz.y, vz.z, 0], [0, 0, 0, 1]]);
    }
  }, {
    key: "getPerspectiveProjection",
    value: function getPerspectiveProjection(fovy, aspect, n, f) {
      var radians = Math.PI / 180 * fovy;
      var sx = 1 / Math.tan(radians / 2) / aspect;
      var sy = 1 / Math.tan(radians / 2);
      var sz = (f + n) / (f - n);
      var dz = -2 * f * n / (f - n);
      return [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, sz, dz], [0, 0, -1, 0]];
    }
  }, {
    key: "multiplyVector",
    value: function multiplyVector(m, v) {
      return new Vector3(m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z + m[0][3] * v.w, m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z + m[1][3] * v.w, m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z + m[2][3] * v.w, m[3][0] * v.x + m[3][1] * v.y + m[3][2] * v.z + m[3][3] * v.w);
    }
  }, {
    key: "divideVector",
    value: function divideVector(m, v) {
      return new Vector3(m[0][0] / v.x + m[0][1] / v.y + m[0][2] / v.z + m[0][3] / v.w, m[1][0] / v.x + m[1][1] / v.y + m[1][2] / v.z + m[1][3] / v.w, m[2][0] / v.x + m[2][1] / v.y + m[2][2] / v.z + m[2][3] / v.w, m[3][0] / v.x + m[3][1] / v.y + m[3][2] / v.z + m[3][3] / v.w);
    }
  }]);

  return Matrix;
}();
var Vector3 = /*#__PURE__*/function () {
  function Vector3(x, y, z) {
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck(this, Vector3);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "z", 0);

    _defineProperty(this, "w", 1);

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  } // инвертировать вектор


  _createClass(Vector3, [{
    key: "negative",
    value: function negative() {
      return new Vector3(-this.x, -this.y, -this.z);
    }
  }, {
    key: "add",
    value: // сложить с вектором или скаляром
    function add(v) {
      if (v instanceof Vector3) return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);else return new Vector3(this.x + v, this.y + v, this.z + v);
    } // вычесть вектор или скаляр

  }, {
    key: "subtract",
    value: function subtract(v) {
      if (v instanceof Vector3) return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);else return new Vector3(this.x - v, this.y - v, this.z - v);
    }
  }, {
    key: "multiply",
    value: // умножить на вектор или скаляр
    function multiply(v) {
      if (v instanceof Vector3) return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);else return new Vector3(this.x * v, this.y * v, this.z * v);
    }
  }, {
    key: "divide",
    value: // разделить на вектор или скаляр
    function divide(v) {
      if (v instanceof Vector3) return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);else return new Vector3(this.x / v, this.y / v, this.z / v);
    }
  }, {
    key: "length",
    value: // длинна вектора
    function length() {
      return Math.hypot(this.x, this.y, this.z);
    }
  }, {
    key: "normalize",
    value: // нормализация вектора (длина вектора становится равна 1)	
    function normalize() {
      return this.divide(this.length());
    }
  }, {
    key: "dot",
    value: // скалярное перемножение векторов	
    function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    } // получить нормаль к вектору

  }, {
    key: "normal",
    value: function normal() {
      return new Vector3(-this.y, this.x, this.z);
    }
  }]);

  return Vector3;
}();
var Vector2 = /*#__PURE__*/function () {
  function Vector2(x, y, type) {
    _classCallCheck(this, Vector2);

    this.init(x, y, type);
  } // переинициализировать вектор


  _createClass(Vector2, [{
    key: "init",
    value: function init(x, y, type) {
      if (type === 'rad') {
        this.angle = x;
        this.dist = y;
        this.x = this.dist * Math.cos(this.angle);
        this.y = this.dist * Math.sin(this.angle);
      } else if (type === 'grad') {
        this.angle = x * Math.PI / 180;
        this.dist = y;
        this.x = this.dist * Math.cos(this.angle);
        this.y = this.dist * Math.sin(this.angle);
      } else {
        this.x = x !== null && x !== void 0 ? x : 0;
        this.y = y !== null && y !== void 0 ? y : 0;
        var angle = this.toAngle();
        this.angle = isNaN(angle) ? this.angle || 0 : angle;
        this.dist = this.length();
      }

      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(deltaAngle) {
      this.angle += deltaAngle * Math.PI / 180;
      this.x = this.dist * Math.cos(this.angle);
      this.y = this.dist * Math.sin(this.angle);
    }
  }, {
    key: "rotateRad",
    value: function rotateRad(deltaAngle) {
      this.angle += deltaAngle;
      this.x = this.dist * Math.cos(this.angle);
      this.y = this.dist * Math.sin(this.angle);
    } // инвертировать вектор

  }, {
    key: "negative",
    value: function negative() {
      return new Vector2(-this.x, -this.y);
    }
  }, {
    key: "add",
    value: // сложить с вектором или скаляром
    function add(v) {
      if (v instanceof Vector2) return new Vector2(this.x + v.x, this.y + v.y);else return new Vector2(this.x + v, this.y + v);
    }
  }, {
    key: "subtract",
    value: // вычесть вектор или скаляр
    function subtract(v) {
      if (v instanceof Vector2) return new Vector2(this.x - v.x, this.y - v.y);else return new Vector2(this.x - v, this.y - v);
    }
  }, {
    key: "multiply",
    value: // умножить на вектор или скаляр
    function multiply(v) {
      if (v instanceof Vector2) return new Vector2(this.x * v.x, this.y * v.y);else return new Vector2(this.x * v, this.y * v);
    }
  }, {
    key: "divide",
    value: // разделить на вектор или скаляр
    function divide(v) {
      if (v instanceof Vector2) return new Vector2(this.x / v.x, this.y / v.y);else return new Vector2(this.x / v, this.y / v);
    }
  }, {
    key: "equals",
    value: // сравнить с вектором
    function equals(v) {
      return this.x == v.x && this.y == v.y;
    }
  }, {
    key: "dot",
    value: // скалярное перемножение векторов	
    function dot(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "cross",
    value: // ???
    function cross(v) {
      return new Vector2(this.y * v.x - this.x * v.y, this.x * v.y - this.y * v.x);
    }
  }, {
    key: "length",
    value: // длинна вектора
    function length() {
      return Math.hypot(this.x, this.y);
    }
  }, {
    key: "unit",
    value: // нормализация вектора
    function unit() {
      return this.divide(this.length());
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.divide(this.length() || 0.00000000001);
    }
  }, {
    key: "min",
    value: function min() {
      return Math.min(this.x, this.y);
    }
  }, {
    key: "max",
    value: function max() {
      return Math.max(this.x, this.y);
    }
  }, {
    key: "toAngle",
    value: // получение угла между вектором и осью X
    function toAngle() {
      // return Math.asin(this.y / this.length());
      return Math.atan2(this.y, this.x);
    }
  }, {
    key: "angleTo",
    value: // получение угла между двумя вектороми
    function angleTo(v) {
      return Math.acos(this.dot(v) / (this.length() * v.length()));
    }
  }, {
    key: "toArray",
    value: // создать массив из вектора
    function toArray(n) {
      return [this.x, this.y].slice(0, n || 3);
    }
  }, {
    key: "clone",
    value: // слонировать вектор
    function clone() {
      return new Vector2(this.x, this.y);
    }
  }, {
    key: "normal",
    value: // получить нормаль к вектору
    function normal() {
      return new Vector2(-this.y, this.x);
    }
  }, {
    key: "toLocate",
    value: // получить объект Point
    function toLocate() {
      return {
        x: this.x,
        y: this.y
      };
    } // Vector2.fromAngle = function(angle) {
    // 	return new Vector2(Math.cos(angle), Math.sin(angle));
    // };
    // Vector2.randomDirection = function() {
    // 	return Vector2.fromAngle(Math.random() * Math.PI * 2);
    // };
    // Vector2.min = function(a, b) {
    // 	return new Vector2(Math.min(a.x, b.x), Math.min(a.y, b.y));
    // };
    // Vector2.max = function(a, b) {
    // 	return new Vector2(Math.max(a.x, b.x), Math.max(a.y, b.y));
    // };
    // Vector2.lerp = function(a, b, fraction) {
    // 	return b.subtract(a).multiply(fraction).add(a);
    // };
    // Vector2.fromArray = function(a) {
    // 	return new Vector2(a[0], a[1]);
    // };
    // Vector2.angleBetween = function(a, b) {
    // 	return a.angleTo(b);
    // };	

  }]);

  return Vector2;
}();
;

/***/ }),

/***/ "./public/source/tools/tool.compare.path.js":
/*!**************************************************!*\
  !*** ./public/source/tools/tool.compare.path.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ comparePaths; }
/* harmony export */ });
/**
 * Утилита для сопоставления путей и их простые шаблонов.
 * Пример ниже дает представление о возможностях использования данных шаблонов:
 * ```
 *  'aaa'       === 'aaa'
 *  'aaa'       !== 'bbb'
 *  'aaa.bbb'   === 'aaa.bbb'
 *  'aaa.bbb'   !== 'aaa.ccc'
 *  'aaa.*'     === 'aaa'
 *  'aaa.*'     === 'aaa.*'
 *  'aaa.*'     === 'aaa.bbb'
 *  'aaa.*.ccc' !== 'aaa'
 *  'aaa.*.ccc' === 'aaa.*'
 *  'aaa.*.ccc' !== 'aaa.bbb'
 *  'aaa.*.*'   === 'aaa.bbb'
 *  'aaa.*.ccc' === 'aaa.bbb.*'
 *  'aaa.*.ccc' === 'aaa.bbb.ccc'
 *  '*'         === 'aaa'
 *  '*'         === 'aaa.bbb'
 *  '*'         === 'aaa.bbb.ccc'
 * ```
 */
var re = /[\\\/\.]/;
/**
 * Функция сравнивает пути и шаблоны путей
 * @param {string} path1 or template
 * @param {string} path2 or template 
 * @returns {boolean} вернет true если совпадают, иначе false
 */

function comparePaths(pathName1, pathName2) {
  var path1 = Array.isArray(pathName1) ? pathName1 : pathName1.split(re);
  var len1 = path1.length;
  var path2 = Array.isArray(pathName2) ? pathName2 : pathName2.split(re);
  var len2 = path2.length;
  var len = Math.max(len1, len2);
  var isEqual = true;

  for (var i = 0; i < len; i++) {
    var key1 = path1[i];
    var key2 = path2[i];
    if (key1 === '*' && len1 === i + 1) break;
    if (key2 === '*' && len2 === i + 1) break;
    if (key1 === '*' || key2 === '*' || key1 === key2) continue;
    isEqual = false;
    break;
  }

  return isEqual;
} // comparePaths('aaa', 'aaa');
// comparePaths('aaa', 'bbb');
// comparePaths('aaa.bbb', 'aaa.bbb')
// comparePaths('aaa.bbb', 'aaa.ccc')
// comparePaths('aaa.*', 'aaa')
// comparePaths('aaa.*', 'aaa.*')
// comparePaths('aaa.*', 'aaa.bbb')
// comparePaths('aaa.*.ccc', 'aaa')
// comparePaths('aaa.*.ccc', 'aaa.*')
// comparePaths('aaa.*.ccc', 'aaa.bbb')
// comparePaths('aaa.*.*', 'aaa.bbb')
// comparePaths('aaa.*.ccc', 'aaa.bbb.*')
// comparePaths('aaa.*.ccc', 'aaa.bbb.ccc')
// comparePaths('*', 'aaa')
// comparePaths('*', 'aaa.bbb')
// comparePaths('*', 'aaa.bbb.ccc')

/***/ }),

/***/ "./public/source/tools/tool.events.bus.js":
/*!************************************************!*\
  !*** ./public/source/tools/tool.events.bus.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_extend_event_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class.extend.event.emitter.js */ "./public/source/tools/class.extend.event.emitter.js");

var bus = new _class_extend_event_emitter_js__WEBPACK_IMPORTED_MODULE_0__["default"](false);
/* harmony default export */ __webpack_exports__["default"] = (bus);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*******************************!*\
  !*** ./public/source/main.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Game; }
/* harmony export */ });
/* harmony import */ var _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/tool.events.bus.js */ "./public/source/tools/tool.events.bus.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./public/source/config.js");
/* harmony import */ var _states_state_boot_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./states/state.boot.js */ "./public/source/states/state.boot.js");
/* harmony import */ var _states_state_mainmenu_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./states/state.mainmenu.js */ "./public/source/states/state.mainmenu.js");
/* harmony import */ var _states_state_game_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./states/state.game.js */ "./public/source/states/state.game.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var Game = /*#__PURE__*/function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  var _super = _createSuper(Game);

  function Game() {
    var _this;

    _classCallCheck(this, Game);

    _this = _super.call(this, {
      width: _config_js__WEBPACK_IMPORTED_MODULE_1__["default"].screenWidth,
      height: _config_js__WEBPACK_IMPORTED_MODULE_1__["default"].screenHeight,
      renderer: Phaser.WEBGL,
      antialias: true,
      multiTexture: true // pixelArt: true,

    });
    console.log('Game.constructor'); // подключаем сцены

    _this.state.add('BootState', _states_state_boot_js__WEBPACK_IMPORTED_MODULE_2__["default"], false);

    _this.state.add('MainMenuState', _states_state_mainmenu_js__WEBPACK_IMPORTED_MODULE_3__["default"], false);

    _this.state.add('GameState', _states_state_game_js__WEBPACK_IMPORTED_MODULE_4__["default"], false); // подменяем update


    _this.updateOrig = _this.update;

    _this.update = function () {
      var _this2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_this2 = _this).updateOrig.apply(_this2, args);

      _tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_0__["default"].emit.apply(_tools_tool_events_bus_js__WEBPACK_IMPORTED_MODULE_0__["default"], ['core.update', _assertThisInitialized(_this)].concat(args));
    }; // запускаем сцену загрузки


    _this.state.start('BootState');

    console.log(_assertThisInitialized(_this));
    return _this;
  } // gamePaused(event) {
  //     console.log('Game.onPause', event)
  //     this.state.pause()
  //     // return true; 
  // }
  // gameResumed(event) {
  //     console.log('Game.onResume', event)
  // }


  return _createClass(Game);
}(Phaser.Game);


var game = new Game();
}();
/******/ })()
;
//# sourceMappingURL=main.js.map