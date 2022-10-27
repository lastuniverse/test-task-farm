import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";

// ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'ProductStatus');
    core.load.spritesheet('loading_bar', config.gamePath + 'sprites/preloader/bar.png', 18, 10, 3);
});


export default class ProductStatus extends Component {
    constructor(game, parent, name = 'ProductStatus', addToStage, enableBody, physicsBodyType) {
        console.log('ProductStatus.constructor()', 1);
        super(game, parent, name, addToStage, enableBody, physicsBodyType);
        console.log('ProductStatus.constructor()', 2);
    }

    /**
     * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
     * так как класс компонента наследуется от Phaser.Group то
     * использовать create для инициализации мы не можем, так
     * как у Phaser.Group уже есть метод create
     */
    make() {
        // спрайты статуса
        const width = 60;
        const height = 5;
        // отрисовываем статусбар загрузки
        this.barBackSprite = new Phaser.TileSprite(this.game, 11 - width / 2, -height / 2, width, height, 'loading_bar', 1);
        this.barBackSprite.anchor.set(0, 0.5);
        this.barBackSprite.tint = 0x000000;
        this.barBackSprite.alpha = 0.4;
        this.barBackSprite.scale.set(1, height / 10);
        this.addChild(this.barBackSprite);

        this.barSprite = new Phaser.TileSprite(this.game, 11 - width / 2, -height / 2, width, height, 'loading_bar', 2);
        this.barSprite.anchor.set(0, 0.5);
        // this.barSprite.tint = 0x5555ff;
        this.barSprite.alpha = 0.6;
        this.barSprite.scale.set(1, height / 10);
        this.setStaus(0);
        this.addChild(this.barSprite);


        // this.statusSprite = new Phaser.Sprite(this.game, 0, 0, 'icons_state', 'wheat');
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

    setStaus(progress) {
        this.barSprite.width = this.barBackSprite.width * progress;
    }

}

