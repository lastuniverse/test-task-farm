import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";
import ComponentSingleton from "../phaser.extends/extend.component.singleton.class.js";
import Keyboard from '../tools/class.keyboard.js';
import Crosshair from '../components/class.crosshair.component.js'
import entities from '../components/index.entity.components.js'

// ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'GameEntityGui');

    core.load.image('icons_plate', config.gamePath + 'sprites/plates/icons_plate.png');

    core.load.atlas('icons_chicken',
        config.gamePath + 'sprites/entity/icons_chicken.png',
        config.gamePath + 'sprites/entity/icons_chicken.json'
    );
    core.load.atlas('icons_cow',
        config.gamePath + 'sprites/entity/icons_cow.png',
        config.gamePath + 'sprites/entity/icons_cow.json'
    );
    core.load.atlas('icons_wheat',
        config.gamePath + 'sprites/entity/icons_wheat.png',
        config.gamePath + 'sprites/entity/icons_wheat.json'
    );
    core.load.audio('snd_entity_button', config.gamePath + 'sounds/snd_entity_button.mp3');

});


export default class GameEntityGui extends ComponentSingleton {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'GameEntityGui', addToStage, enableBody, physicsBodyType);
    }

    make() {
        // так как класс компонента наследуется от Phaser.Group то
        // использовать create для инициализации мы не можем, так
        // как у Phaser.Group уже есть метод create
        // Для компонентов унаследованных от ComponentSingleton
        // метод make вызывается ОДИН раз при первом создании компонента        
        console.log('Component.make', 'GameEntityGui');

        // this.position.set(config.center.x, config.center.y + 70)

        // подключаем курсор (является сингтоном)
        this.crosshair = new Crosshair(this.game);


        // звук нажатия на иконку
        this.snd_button = this.game.add.audio('snd_entity_button');

        // создаем плашку под иконки
        this.plateSprite = new Phaser.Sprite(this.game, -25, 0, 'icons_plate');
        this.plateSprite.anchor.set(0, 0);
        this.plateSprite.scale.set(0.8, 0.8);
        this.plateSprite.alpha = 0.75;
        this.addChild(this.plateSprite);

        // создаем иконки
        this.icons = Object.keys(entities).reduce((a, n, i) => {
            const spriteName = 'icons_' + n;

            const crosshair = new Phaser.Sprite(this.game, 0, 0, spriteName);
            crosshair.anchor.set(0.5, 0.5);
            crosshair.scale.set(0.1);
            crosshair.alpha = 0.6;
            crosshair.smoothed = false;
            this.crosshair.addCrosshair(n, crosshair);


            const sprite = new Phaser.Button(
                this.game,
                50, 75 + i * 100,
                spriteName,
                (button, pointer) => { this.onIconPress(n, button, pointer); },
                this,
                `${n}_over`, `${n}_up`, `${n}_down`, `${n}_up`
            );
            sprite.input.useHandCursor = false;
            sprite.anchor.set(0.5, 0.5);
            sprite.scale.set(0.2);
            sprite.alpha = 0.8;
            sprite.smoothed = false;
            this.addChild(sprite);




            a[n] = {
                sprite,
                // shadow,
            };
            return a;
        }, {})


    }

    update(game) {
        // const elapsed = game.time.elapsedMS;
        // const timer = game.time.time;
        if(!entities[this.crosshair.crosshairName]) return;

        // проверяе на ПКМ или дабл клик/тап и спрасываем курсор в стрелку
        if(this.game.input.activePointer.rightButton.isDown) return this.crosshair.setCrosshair('arrow');
        if(this.game.input.activePointer.msSinceLastClick<220) return this.crosshair.setCrosshair('arrow');
        
    }

    paused() {
        console.log('!!!!!!!! Component.paused', 'GameEntityGui');
    }

    resumed() {
        console.log('!!!!!!!! Component.resumed', 'GameEntityGui');
    }

    onIconPress(name, button, pointer) {
        this.snd_button.play();
        this.crosshair.setCrosshair(name);

    }
}

