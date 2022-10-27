import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import StaticBacground from '../components/class.staticbackground.component.js'
import SystemButtons from '../components/class.systembuttons.component.js';
import IncorrectOrientation from '../components/class.incorrectorientation.component.js';

import State from '../phaser.extends/extend.state.class.js';

// ловим событие 'core.boot.preload' и производим
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.boot.preload', core => {
    console.log('core.boot.preload', 'BootState');

    core.load.image('loading_logo', config.gamePath + 'sprites/preloader/preloader.logo.png');
    core.load.image('loading_back', config.gamePath + 'sprites/preloader/preloader.background.jpg');
    core.load.spritesheet('loading_bar', config.gamePath + 'sprites/preloader/bar.png', 18, 10, 3);
    core.load.bitmapFont('gl_fnt_lucida_10_rgba_ye', config.gamePath + 'fonts/gl_fnt_arial_14_bold_ye_bl_rgba.png', config.gamePath + 'fonts/gl_fnt_arial_14_bold_ye_bl_rgba.xml', null, -3, 0);
});



export default class BootState extends State {
    constructor(...args) {
        super(...args);
    }

    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#init
     */
    init() {
        console.log('State.init', 'BootState');

        // некоторые параметры)))
        this.BAR_WIDTH = 0.25 * config.width;
        this.BAR_HEIGHT = 10;
        this.position = {
            x: config.center.x,
            y: config.center.y * 1.75
        };

        // устанавливаем обработчики предварительной загрузки ресурсоов загрузочного экрана
        this.load.onFileComplete.add(this.bootFileComplete, this);
        this.load.onLoadComplete.add(this.bootLoadComplete, this);

        // отключаем контекствоное меню по ПКМ
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

    }

    // стандартный обработчик паузы компонента Phaser.State
    paused() {
        // не даем загрузчику становиться на паузу
        this.state.resume();
        this.game.paused = false;
    }

    // обработчики предварительной загрузки ресурсоов загрузочного экрана
    bootFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        // console.log('bootFileComplete', totalLoaded, '/', totalFiles);
    }
    bootLoadComplete() {
        // console.log('State.bootpreoad.complete', 'BootState');
        this.load.onFileComplete.remove(this.bootFileComplete, this);
        this.load.onLoadComplete.remove(this.bootLoadComplete, this);
    }

    // обработчики предварительной загрузки ресурсоов всей игры
    gameFileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        // console.log('gameFileComplete', totalLoaded, '/', totalFiles);
        this.barSprite.width = Math.floor(this.BAR_WIDTH * progress / 100);
        this.statusText.text = 'loading ' + totalLoaded + ' of ' + totalFiles;
        // this.logoSprite.alpha = 1-(progress / 100)
    }
    gameLoadComplete() {
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
     preload(...args) {
        // оповещаем все заинтересованные компоненты о возможости загрузить свои ресурсы
        // до запуска сцены прелоадера. Имеет смысл для компонентов, которые используются 
        // в прелоадере
        bus.emit('core.boot.preload', this);
    }

    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#create
     */
     create() {
        console.log('State.create', 'BootState');

        // подключаем заставку с облаками в качестве фона
        this.back = new StaticBacground(this.game, this.group);
       
        // отрисовываем статусбар загрузки
        this.barBackSprite = this.add.tileSprite(this.position.x - this.BAR_WIDTH * 0.5, this.position.y - this.BAR_HEIGHT, this.BAR_WIDTH, this.BAR_HEIGHT, 'loading_bar', 1, this.group);
        this.barBackSprite.tint = 0xcaba00;
        this.barBackSprite.scale.set(1);

        this.barSprite = this.add.tileSprite(this.position.x - this.BAR_WIDTH * 0.5, this.position.y - this.BAR_HEIGHT, this.BAR_WIDTH, this.BAR_HEIGHT, 'loading_bar', 2, this.group);
        this.barSprite.width = 0;
        this.barSprite.scale.set(1);

        this.statusText = this.add.bitmapText(this.position.x, this.position.y, 'gl_fnt_lucida_10_rgba_ye', 'loading', 100, this.group);
        this.statusText.anchor.x = 0.5;

        // поверх подключаем синглтон компоненты: системные кнопки и неправильная ориентация экрана        
        new IncorrectOrientation(this.game, this.group);
        new SystemButtons(this.game, this.group);

        // отвязываемся от синхронности
        setTimeout(() => {
            // устанавливаем обработчики процесса загрузки ресурсов
            this.load.onFileComplete.add(this.gameFileComplete, this);
            this.load.onLoadComplete.add(this.gameLoadComplete, this);

            // сообщаем всем заинтересованным о том что пора дать ссылки на загружаенмые ресурсы
            bus.emit('core.preload', this);

            // запускаем загрузку всех ресурсов
            this.load.start();

        }, 0);
    }

    /**
     * вызов метода передает управление следующей сцене 'MainMenuState'
     */
    next() {
        console.log('BootState.next');
        // сообщаем всем заинтересованным о том что загрузка ресурсов завершена 
        // и можно приступить к созданию объектов, использующих загруженные ресурсы
        bus.emit('core.create', this);

        // задержка не несет никакого функционала
        // и сделана только для того, чтобы увидеть
        // последние сообщения от клиента
        setTimeout(() => {
            // передаем управление в сцену главного меню
            this.state.start('MainMenuState');
        }, 300);
    }

} 
