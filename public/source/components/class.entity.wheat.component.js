import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import EntityBase from "../components/class.entity.base.component.js";
import ProductStatus from "../components/class.entity.product.status.component.js";


// ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'EntityWheat');

    core.load.atlas('entity_wheat',
        config.gamePath + 'sprites/tileset_wheat.png',
        config.gamePath + 'sprites/tileset_wheat.json'
    );
    core.load.audio('snd_collect_wheat', config.gamePath + 'sounds/snd_collect_wheat.mp3');

});





export default class EntityWheat extends EntityBase {
    constructor(game, parent, name='EntityWheat', addToStage, enableBody, physicsBodyType) {
        super(game, parent, name, addToStage, enableBody, physicsBodyType);
    }

    /**
     * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
     * так как класс компонента наследуется от Phaser.Group то
     * использовать create для инициализации мы не можем, так
     * как у Phaser.Group уже есть метод create
     * Для компонентов унаследованных от ComponentSingleton
     * метод make вызывается ОДИН раз при первом создании компонента     
     */
    make() {
        super.make();

        this.updateOnlyExistingChildren = true;

        // имя существа
        this.entityName = 'chicken';

        // ограничения таймеров
        this.productTime = 10000;

        // звук нажатия на иконку
        this.snd_collect = this.game.add.audio('snd_collect_wheat');

        this.sector = ('00' + Math.floor(1 + Math.random() * 8)).substr(-2);


        // создаем спрайты
        this.sprites = Array(8).fill(null).map((_, index) => {
            const progress = ('00' + index).substr(-2);
            const frameName = `wheat.${progress}.${this.sector}`

            const isCurrent = index === Math.floor(8 * this.productProgress / this.productTime);

            const sprite = new Phaser.Sprite(this.game, 0, 10, 'entity_wheat', frameName);
            sprite.anchor.set(0.5, 0.75);
            sprite.scale.set(0.5, 0.5);
            sprite.visible = isCurrent;
            sprite.exists = isCurrent;
            this.addChild(sprite);

            if (isCurrent) this.sprite = sprite;
            return sprite
        })

        this.productStatus = new ProductStatus(this.game, this);
        this.productStatus.position.set(-10, 5);        
    }

    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */
     update(game) {
        super.update(game);

        const progress = Math.min(7, Math.floor(8 * this.productProgress / this.productTime))

        if (this.sprite) {
            this.sprite.visible = false;
            this.sprite.exists = false;
        }

        this.sprite = this.sprites[progress]

        if (this.sprite) {
            this.sprite.visible = true;
            this.sprite.exists = true;
        }
    }
}

