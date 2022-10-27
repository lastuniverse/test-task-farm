import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import State from '../phaser.extends/extend.state.class.js';

import StaticBacground from '../components/class.staticbackground.component.js'
import SystemButtons from '../components/class.systembuttons.component.js';
import MainMenuGui from '../components/class.mainmenu.gui.component.js';
import IncorrectOrientation from '../components/class.incorrectorientation.component.js';

// ловим событие 'core.preload' и производим предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'Menu');

    core.load.audio('snd_menu_bgm', config.gamePath + 'sounds/snd_main_bgm_v1.mp3');
});

export default class MainMenuState extends State {
    constructor(...args) {
        super(...args);
    }

    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#init
     */
    init() {
        console.log('State.menu.init');
    }

    // стандартный обработчик паузы компонента Phaser.State
    paused() {
        // this.state.resume();
        // this.game.stage.paused = false;
        this.snd_background.pause();
        console.log('paused')
    }

    // стандартный обработчик снятия паузы компонента Phaser.State
    resumed() {
        this.snd_background.resume();
        console.log('resumed')
    }

    // стандартный обработчик остановки компонента Phaser.State
    shutdown() {
        this.snd_background.stop();
        console.log('shutdown')
    }

    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#create
     */
     create() {
        console.log('State.menu.create');
        this.snd_background = this.game.add.audio('snd_menu_bgm');
        this.snd_background.play('', 0, 1, true);


        this.back = new StaticBacground(this.game, this.group);
        
        this.gui = new MainMenuGui(this.game, this.group);

        new IncorrectOrientation(this.game, this.group);
        new SystemButtons(this.game, this.group);


        // console.log(this.state);
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
     update(game) {
        // const elapsed = game.time.elapsedMS;
        // const timer = game.time.timeExpected;
        // this.yoyo = ((this?.yoyo ?? 1) + elapsed / 5000) % 2;
        // const scale = Math.abs(this.yoyo - 1)/10;

        // this.foreSprite.scale.set(0.73 + scale);

    }

} 
