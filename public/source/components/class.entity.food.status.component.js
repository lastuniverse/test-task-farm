import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";

// ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'FoodStatus');
    core.load.atlas('icons_state',
        config.gamePath + 'sprites/entity/icons_state.png',
        config.gamePath + 'sprites/entity/icons_state.json'
    );

    core.load.bitmapFont('fnt_20',
        config.gamePath + 'fonts/fnt_20.png',
        config.gamePath + 'fonts/fnt_20.xml'
    );    

});


export default class FoodStatus extends Component {
    constructor(game, parent, name='FoodStatus', addToStage, enableBody, physicsBodyType) {
        console.log('FoodStatus.constructor()',1);
        super(game, parent, name, addToStage, enableBody, physicsBodyType);
        console.log('FoodStatus.constructor()',2);
    }

    /**
     * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
     * так как класс компонента наследуется от Phaser.Group то
     * использовать create для инициализации мы не можем, так
     * как у Phaser.Group уже есть метод create
     */
    make() {
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
        this.statusText.smoothed = false;
        // this.statusText.text = 0;
        this.setStaus(0, 0)
        this.addChild(this.statusText);
    }
    
    setStaus(progress, counter){
        this.statusText.text = counter;
    }

}

