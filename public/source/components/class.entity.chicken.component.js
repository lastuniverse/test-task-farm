import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import EntityAnimal from "../components/class.entity.animal.component.js";
import FoodStatus from "../components/class.entity.food.status.component.js";
import ProductStatus from "../components/class.entity.product.status.component.js";


// ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'EntityChicken');

    core.load.atlas('entity_chicken',
        config.gamePath + 'sprites/entity/icons_chicken.png',
        config.gamePath + 'sprites/entity/icons_chicken.json'
    );

    core.load.audio('snd_chicken_feed1', config.gamePath + 'sounds/snd_chicken_feed1.mp3');
    core.load.audio('snd_chicken_feed2', config.gamePath + 'sounds/snd_chicken_feed2.mp3');
    core.load.audio('snd_collect_egg', config.gamePath + 'sounds/snd_collect_egg.mp3');

});





export default class EntityChicken extends EntityAnimal {
    constructor(game, parent, name = 'EntityChicken', addToStage, enableBody, physicsBodyType) {
        super(game, parent, name, addToStage, enableBody, physicsBodyType);
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
        this.entityName = 'chicken';

        // автосбор продукта
        this.autoCollect = true;

        // ограничения таймеров
        this.foodTime = 30000;
        this.productTime = 10000;

        // звук нажатия на иконку
        this.snd_collect = this.game.add.audio('snd_collect_egg');
        this.snd_feed = this.game.add.audio('snd_chicken_feed1');


        // создаем спрайт курицы
        this.sprite = new Phaser.Sprite(this.game, 0, 15, 'entity_chicken', 'chicken_default');
        this.sprite.anchor.set(0.5, 0.25);
        this.sprite.scale.set(0.12);
        this.addChild(this.sprite);

        
        this.productStatus = new ProductStatus(this.game, this);
        this.productStatus.position.set(-10, 5);

        this.foodStatus = new FoodStatus(this.game, this);
        this.foodStatus.position.set(-10, -5);
    }

    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */
    update(game) {
        super.update(game);
    }
}

