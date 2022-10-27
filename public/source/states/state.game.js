import config from '../config.js';

import bus from '../tools/tool.events.bus.js'
import State from '../phaser.extends/extend.state.class.js';


import SystemButtons from '../components/class.systembuttons.component.js';
import IncorrectOrientation from '../components/class.incorrectorientation.component.js';
import GameEnviromentGui from '../components/class.game.enviroment.gui.component.js'
import GameFieldsGui from '../components/class.game.fields.gui.component.js'
import GameEntityGui from '../components/class.game.entity.gui.component.js'
import GameStateGui from '../components/class.game.state.gui.component.js'
import Crosshair from '../components/class.crosshair.component.js'

// ловим событие 'core.preload' и производим
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'GameState');
});


export default class GameState extends State {
    constructor(...args) {
        super(...args);
        this.name = 'game';
        // setTimeout(() => {
        //     this.state.start('MainMenuState');
        // }, 5000);        
    }

    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#init
     */
     init() {
        console.log('State.init', 'GameState');

        this.layers = {
            game: new Phaser.Group(this.game, this.group),
            system: new Phaser.Group(this.game, this.group),
        };

        // const seed = Math.trunc(Math.random() * 99999);
        // const seed = 4851;
        const seed = 47323;

        console.log('seed', seed);

    }

    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#create
     */
    create() {
        console.log('State.create', 'GameState');


        // this.back = new StaticBacground(this.game, this.layers.baskground);

        // this.logo = this.layers.foregraund.create(config.center.x, config.center.y, 'logo');
        // this.logo.anchor.set(0.5);



        // this.layers.road.alpha = 0.3;
        // this.gameWorld.road.points.forEach(point => {
        //     point.sprite = new Phaser.Sprite(this.game, point.x, point.y, 'point', 0);
        //     point.sprite.anchor.set(0.5);
        //     point.sprite.scale.set(0.015);
        //     this.layers.road.addChild(point.sprite);

        // });
        new IncorrectOrientation(this.game, this.layers.system);
        new SystemButtons(this.game, this.layers.system);
        this.crosshair = new Crosshair(this.game, this.layers.system);

        new GameEnviromentGui(this.game, this.layers.game)
        new GameFieldsGui(this.game, this.layers.game)
        this.entityPanel = new GameEntityGui(this.game, this.layers.game)
        this.entityPanel.position.set(0, 80)

        this.statePanel = new GameStateGui(this.game, this.layers.game)
        this.statePanel.position.set(config.center.x, 0)

    }

    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */
    update(game) {
        // const elapsed = game.time.elapsedMS;
        // const timer = game.time.time;
        // console.log(game.time, timer - (this?.latsUnitstimer??0));
        // this.layers.entity.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    start() {
        console.log('State.start', 'GameState');
    }

    /**
     * стандартный метод класса Phaser.State
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#render
     */
    render() {
        this.game.debug.inputInfo(32, 32);
    }
}







