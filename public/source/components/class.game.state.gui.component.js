import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";
import ComponentSingleton from "../phaser.extends/extend.component.singleton.class.js";
import Keyboard from '../tools/class.keyboard.js';
import Crosshair from '../components/class.crosshair.component.js'
import entities from '../components/index.entity.components.js'
import { Vector2 } from '../tools/class.vector.js'

// ловим событие 'core.preload' и производим 
// предзагрузку необходимых на данной стадии ресурсов
bus.once('core.preload', core => {
    console.log('core.preload', 'GameStateGui');
    core.load.image('icons_plate', config.gamePath + 'sprites/plates/icons_plate.png');

    core.load.atlas('icons_state',
        config.gamePath + 'sprites/entity/icons_state.png',
        config.gamePath + 'sprites/entity/icons_state.json'
    );

    core.load.bitmapFont('fnt_20',
        config.gamePath + 'fonts/fnt_20.png',
        config.gamePath + 'fonts/fnt_20.xml'
    );

    core.load.audio('snd_money', config.gamePath + 'sounds/snd_money.mp3');

});



export default class GameStateGui extends ComponentSingleton {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'GameStateGui', addToStage, enableBody, physicsBodyType);
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

        console.log('Component.make', 'GameStateGui');

        // this.position.set(config.center.x, config.center.y + 70)

        // соответствие сущьностей и ресурсов
        this.entityNames = {
            wheat: 'wheat',
            chicken: 'egg',
            cow: 'milk',
            gold: 'gold'
        };

        // названия иконок
        this.iconNames = Object.values(this.entityNames);

        // анимируемые элементы (при сборе летят с поля к панели статуса)
        this.collectedElements = [];

        // кеш для созданных спрайтов, чтобы не пересоздавать их
        this.collectedSpriteCache = this.iconNames.reduce((a, n) => {
            a[n] = [];
            return a
        }, {});

        // подключаем курсор (является сингтоном)
        this.crosshair = new Crosshair(this.game);

        // звук нажатия на иконку
        this.snd_money = this.game.add.audio('snd_money');

        // создаем плашку под иконки
        this.plateSprite = new Phaser.Sprite(this.game, 0, 0, 'icons_plate');
        this.plateSprite.anchor.set(0.5, 0.5);
        this.plateSprite.angle = 90;
        this.plateSprite.scale.set(-0.8, 1.0);
        this.plateSprite.alpha = 0.85;
        this.addChild(this.plateSprite);

        // создаем иконки

        this.icons = this.iconNames.reduce((a, frameName, i) => {

            let sprite;
            if (frameName !== 'gold') {
                sprite = new Phaser.Button(
                    this.game,
                    -300 + i * 160, 30,
                    'icons_state',
                    (button, pointer) => {

                        const item = this.icons[frameName];
                        if (!item) return;
                        if (item.counter < 1) return;
                        item.counter --;
                        item.amount.text = item.counter;

                        this.snd_money.play();
                        this.startCollectAnimation(
                            this.x + i * 160 - 300,
                            this.y + 30,
                            'gold',
                            Math.PI * 0.5
                        );
                    },
                    this,
                    frameName, frameName, frameName, frameName
                );
            } else {
                sprite = new Phaser.Sprite(
                    this.game,
                    -300 + i * 160, 30,
                    'icons_state', frameName
                );
            }

            sprite.anchor.set(0.5, 0.5);
            sprite.scale.set(0.3);
            sprite.alpha = 0.8;
            sprite.smoothed = false;
            this.addChild(sprite);

            const amount = new Phaser.BitmapText(
                this.game,
                -255 + i * 160, 30,
                'fnt_20',
                '',
                40
            );
            amount.anchor.set(0.5, 0.15);
            amount.scale.set(4);
            amount.alpha = 0.7;
            amount.smoothed = false;
            amount.text = 0;
            this.addChild(amount);


            a[frameName] = {
                frameName,
                sprite,
                amount,
            };
            return a;
        }, {});

        this.resetCounters();

        // ловим событие сбора урожая
        bus.on('entity.collect', field => {
            console.log('collect', 1)
            // field:
            //   wx, wy, // координаты ячейки в пространстве разрешения игры (config.width,config.height)
            //   entityName // наименование сущьности
            const resourceName = this.entityNames[field.entityName];
            if (!resourceName) return;
            this.startCollectAnimation(
                field.wx,
                field.wy,
                this.entityNames[field.entityName]
            );
        });

        // ловим событие кормления животины
        bus.on('entity.feed', (resourceName, amount, entity) => {
            const item = this.icons[resourceName];
            if (!item) return;
            if (item.counter < amount) return;
            if (!entity?.feed?.(amount)) return;
            item.counter -= amount;
            item.amount.text = item.counter;
        });
    }

    /**
     * обнуляет показания счетчиков
     */
    resetCounters() {
        this.iconNames.forEach(iconName => {
            const item = this.icons[iconName];
            item.counter = 0;
            item.amount.text = 0;
        });

    }

    startCollectAnimation(fromX, fromY, name, angle) {
        const target = this.icons[name];
        if (!target) return;


        // переводим координаты в координаты относительно места 
        // установки плашки с ресурсами
        const x = fromX - this.x;
        const y = fromY - this.y;

        // создаем спрайт ресурса для анимации
        let sprite;
        if (this.collectedSpriteCache[name].length > 0) {
            sprite = this.collectedSpriteCache[name].shift();
            sprite.position.set(x, y);
            sprite.visible = true;
        } else {
            sprite = new Phaser.Sprite(
                this.game,
                x, y,
                'icons_state', name
            );
        }

        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.3);
        sprite.alpha = 0.8;
        sprite.smoothed = false;
        sprite.targetOptions = {
            name,
            target,
            velocity: new Vector2(angle ?? (Math.random() * Math.PI * 2), 4000, 'rad')
        };
        this.addChild(sprite);

        this.collectedElements.push(sprite);

    }

    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */
    update(game) {
        const elapsed = game.time.elapsedMS;
        // const timer = game.time.time;
        this.collectedElements = this.collectedElements.filter(item => {
            const options = item.targetOptions;
            const target = item.targetOptions.target;
            const dx = target.sprite.x - item.x;
            const dy = target.sprite.y - item.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 50 && item.distance < distance) {
                target.counter++;
                target.amount.text = target.counter;
                item.visible = false;
                this.removeChild(item);
                this.collectedSpriteCache[options.name].push(item);
                return false;
            }
            item.distance = distance;
            const direction = (new Vector2(dx, dy));
            options.velocity = options.velocity.multiply(0.9).add(direction);
            const velocity = options.velocity.normalize().multiply(elapsed);
            item.x += velocity.x;
            item.y += velocity.y;
            // console.log(options.velocity,direction,velocity)
            return true;
        })

    }



}

