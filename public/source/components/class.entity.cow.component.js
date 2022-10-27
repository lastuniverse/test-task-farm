import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import EntityAnimal from "../components/class.entity.animal.component.js";
import FoodStatus from "../components/class.entity.food.status.component.js";
import ProductStatus from "../components/class.entity.product.status.component.js";


// ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'EntityCow');

    core.load.atlas('entity_cow',
        config.gamePath + 'sprites/entity/icons_cow.png',
        config.gamePath + 'sprites/entity/icons_cow.json'
    );

    core.load.atlas('icons_state',
        config.gamePath + 'sprites/entity/icons_state.png',
        config.gamePath + 'sprites/entity/icons_state.json'
    );

    core.load.audio('snd_cow_feed1', config.gamePath + 'sounds/snd_cow_feed1.mp3');
    core.load.audio('snd_cow_feed2', config.gamePath + 'sounds/snd_cow_feed2.mp3');
    core.load.audio('snd_collect_milk', config.gamePath + 'sounds/snd_collect_milk.mp3');

});





export default class EntityCow extends EntityAnimal {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'EntityCow', addToStage, enableBody, physicsBodyType);
    }

    /**
     * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
     * так как класс компонента наследуется от Phaser.Group то
     * использовать create для инициализации мы не можем, так
     * как у Phaser.Group уже есть метод create
     */
    make() {
        super.make();

        // имя существа
        this.entityName = 'cow';

        // автосбор продукта
        this.autoCollect = true;

        // ограничения таймеров
        this.foodTime = 20000;
        this.productTime = 20000;

        // звук нажатия на иконку
        this.snd_collect = this.game.add.audio('snd_collect_milk');
        this.snd_feed = this.game.add.audio('snd_cow_feed1');
        this.snd_feed.volume = 0.5;

        // создаем спрайт коровы
        this.sprite = new Phaser.Sprite(this.game, 0, 10, 'entity_cow', 'cow_default');
        this.sprite.anchor.set(0.5, 0.35);
        this.sprite.scale.set(0.18);
        this.addChild(this.sprite);

        this.productStatus = new ProductStatus(this.game, this);
        this.productStatus.position.set(-10, -8);

        this.foodStatus = new FoodStatus(this.game, this);
        this.foodStatus.position.set(-10, -18);
    }


    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */
    update(game) {
        super.update(game);
    }

}

