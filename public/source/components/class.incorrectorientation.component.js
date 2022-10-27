import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import ComponentSingleton from "../phaser.extends/extend.component.singleton.class.js";

bus.once('core.boot.preload', core => {
    // предзагрузка используемых для компонента ресурсов
    console.log('core.boot.preload', 'IncorrectOrientation');

    core.load.image('incorrect_orientation', config.gamePath + 'sprites/incorrect_orientation.png');
});


export default class IncorrectOrientation extends ComponentSingleton {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'IncorrectOrientation', addToStage, enableBody, physicsBodyType);
    }

    make() {
        // так как класс компонента наследуется от Phaser.Group то
        // использовать create для инициализации мы не можем, так
        // как у Phaser.Group уже есть метод create
        // Для компонентов унаследованных от ComponentSingleton
        // метод make вызывается ОДИН раз при первом создании компонента        
        console.log('Component.make', 'IncorrectOrientation');
        // this.alpha = 0.7;
        this.x = config.width / 2;
        this.y = config.height / 2;

        const state = this.game.state.getCurrentState();

        this.backSpr = state.add.graphics(0, 0, this);
        this.backSpr.anchor.set(0.5);
        this.backSpr.beginFill(0xffffff, 1);
        this.backSpr.drawRect(-0.5 * config.width, -0.5 * config.height, config.width, config.height);
        this.backSpr.inputEnabled = true;

        this.infoSpr = this.create(0, 0, 'incorrect_orientation');
        this.infoSpr.anchor.set(0.5);

        this.onGameSizeChange();

        this.game.scale.onSizeChange.add(this.onGameSizeChange, this);
    }

    onGameSizeChange() {
        var f = (this.game.scale.width >= this.game.scale.height);
        console.log('IncorrectOrientation.onGameSizeChange', f);
        this.visible = !f;

        if (!this.infoSpr) return;

        var sx = this.game.scale.scaleFactor.x;
        var sy = this.game.scale.scaleFactor.y;

        var s = 0.9 * this.game.scale.width / this.infoSpr.texture.frame.width;

        this.infoSpr.scale.x = sx * s / config.scale.x;
        this.infoSpr.scale.y = sy * s / config.scale.y;
    }


}