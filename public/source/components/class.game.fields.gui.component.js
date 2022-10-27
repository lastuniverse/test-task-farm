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
    console.log('core.preload', 'GameWorldGui');

    core.load.image('fade_black', config.gamePath + 'sprites/buttons/fade.black.png');
    core.load.audio('snd_entity_set', config.gamePath + 'sounds/snd_entity_set1.mp3');
});





export default class GameWorldGui extends Component {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'GameWorldGui', addToStage, enableBody, physicsBodyType);
    }

    /**
     * НЕСТАНДАРТНЫЙ метод функционал которого добавлен в `extend.component.class.js`)
     * так как класс компонента наследуется от Phaser.Group то
     * использовать create для инициализации мы не можем, так
     * как у Phaser.Group уже есть метод create
     */
    make() {
        console.log('Component.make', 'GameWorldGui');

        this.position.set(config.center.x, config.center.y + 100)

        // подключаем курсор (является сингтоном)
        this.crosshair = new Crosshair(this.game);

        this.snd_entity_set = this.game.add.audio('snd_entity_set');

        // создаем слои
        this.layers = {
            ceil: new Phaser.Group(this.game, this),
            entity: new Phaser.Group(this.game, this),
            fade: new Phaser.Group(this.game, this),
        };

        // создаем хранилище графических элементы сцены (ячеек фермы)
        this.fields = Array(8).fill(null).map(
            (a, y) => Array(8).fill(null).map(
                (a, x) => {
                    const xx = (x - 3.5) * 95;
                    const yy = (y - 3.5) * 55;

                    // спрайт затемнения каждой ячейки фермы
                    const sprite = new Phaser.Sprite(this.game, xx, yy, 'fade_black', 0);
                    sprite.anchor.set(0.5, 0.5);
                    sprite.scale.set(3.2, 1.9);
                    sprite.alpha = 0.15;
                    sprite.tint = 0xd0d0b0;
                    this.layers.ceil.addChild(sprite);

                    // возвращаем данные ячейки
                    const field = {
                        x, y, // индексы ячейки в `this.fields`
                        xx, yy, // координаты ячейки в слое
                        ceil: sprite, // спрайт затемнения ячейки
                    };

                    return field;
                }
            )
        );


        // Прозрачный объект, накрывающий все поле. Нужен для перехвата событий
        // нажатия на ячейки фермы. От установки обработчиков на каждую ячейку отказался 
        // по следующей причине:
        // Спрайты используемые в ячейках отрендерены в разрешении 512х512 и имеют
        // достаточно обширные пустые области, которые тем не менее попадают в boundbox
        // в результате чего спрайты перекрывают друг друга и непредсказуемо 
        // срабатывают на нажатие. Обрезать спрайты сохранив привязку к правильному 
        // pivot-у задача не тривиальная и требующая большого объема ручной работы.
        this.inputLayer = new Phaser.Button(
            this.game, 0, 0, 'fade_black',
            (button, pointer) => { this.onPress(button, pointer); }, this,
            0, 0, 0, 0
        );

        this.inputLayer.input.useHandCursor = false;
        this.inputLayer.scale.set(24, 14);
        this.inputLayer.anchor.set(0.5, 0.5);
        this.inputLayer.alpha = 0.0;
        // this.inputLayer.visible = false;    
        this.layers.fade.addChild(this.inputLayer);
    }

    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */
    update(game) {
        const elapsed = game.time.elapsedMS;
        const timer = game.time.time;
    }

    /**
     * обработчик нажатия на this.inputLayer
     * @param {Phaser.Button} button иконка на которую произведен клик
     * @param {Phaser.Pointr} pointer данные собития нажатия
     * @returns 
     */
    onPress(button, pointer) {
        // переращитываем координаты клика в индексы для `this.fields`
        const wx = pointer.x / config.scale.x;
        const wy = pointer.y / config.scale.y;
        const lx = wx - this.x + this.inputLayer.width / 2;
        const ly = wy - this.y + this.inputLayer.height / 2;
        const xx = Math.floor(lx * 8 / this.inputLayer.width);
        const yy = Math.floor(ly * 8 / this.inputLayer.height);

        // получаем данные ячейки фермы по которой был произведен клик
        const field = this.fields?.[yy]?.[xx];
        if (!field) return;

        // если на панели сущностей выбрана одна из сущностей то получаем ее класс 
        const Entity = entities[this.crosshair.crosshairName]
        if (Entity) {
            // если на панели сущностей выбрана одна из сущностей

            // если в ячейке фермы уже установлена сущность - удаляе ее
            if (field.entity) field.entity.destroy()

            field.entity = new Entity(this.game, this.layers.entity);
            field.entity.position.set(field.xx, field.yy - 35);
            field.entityName = this.crosshair.crosshairName;
            field.entity.wx = wx;
            field.entity.wy = wy;

            // сортируем спрайты (нижние будут перекрывать верхние)
            this.layers.entity.sort('y', Phaser.Group.SORT_ASCENDING);

            this.snd_entity_set.play();
        } else {
            // если на панели сущностей НЕ выбрана ни одна из сущностей
            // пытаемся собрать урожай)
            if (field?.entity?.collect?.()) {
                // и если получилось - отправляем данные в шину событий
                bus.emit('entity.collect', {
                    ...field,
                    wx, wy
                });
            } else {
                // или покормить
                bus.emit('entity.feed', 'wheat', 1, field.entity);
            }
        }
    }
}
