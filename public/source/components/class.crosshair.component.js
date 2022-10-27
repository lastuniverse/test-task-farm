import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from '../phaser.extends/extend.component.class.js';
import ComponentSingleton from '../phaser.extends/extend.component.singleton.class.js';



bus.once('core.preload', core => {
    core.load.image('crosshair_arrow', config.gamePath + 'sprites/crosshairs/arrow.png');
});





// проверяем наличие мышки
let mouseIsPresent = false;
const mouseMoveHandler = e => {
    mouseIsPresent = true;
    window.removeEventListener('mousemove', mouseMoveHandler);
};
window.addEventListener('mousemove', mouseMoveHandler);



export default class Crosshair extends ComponentSingleton {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'Crosshair', addToStage, enableBody, physicsBodyType);
    }

    make() {
        // так как класс компонента наследуется от Phaser.Group то
        // использовать create для инициализации мы не можем, так
        // как у Phaser.Group уже есть метод create
        // Для компонентов унаследованных от ComponentSingleton
        // метод make вызывается ОДИН раз при первом создании компонента
        console.log('Component.make', 'Crosshair');

        this.updateOnlyExistingChildren = true;

        this.crosshairs = [];

        const sprite = new Phaser.Sprite(this.game, 0, 0, 'crosshair_arrow');
        sprite.anchor.set(0, 0);
        sprite.scale.set(0.05);
        sprite.alpha = 0.7;

        this.setCrosshair('arrow', sprite);

        // this.game.input.addMoveCallback((pointer, x, y) => {
        //     // pointer returns the active pointer, x and y return the position on the canvas
        //     if (!mouseIsPresent) return;

        //     this.x = x / config.scale.x;
        //     this.y = y / config.scale.y;
        // });

        const canvas = this.game.canvas;
        canvas.addEventListener('mousemove', (e) => {
            var rect = canvas.getBoundingClientRect();
            this.x = (e.clientX - rect.left) * config.width / canvas.clientWidth;
            this.y = (e.clientY - rect.top) * config.height / canvas.clientHeight;
        });

        canvas.addEventListener('mouseover', () => {
            this.visible = true;
            this.game.canvas.style.cursor = 'none';
        });

        canvas.addEventListener('mouseout', () => {
            this.visible = false;
            this.game.canvas.style.cursor = 'auto';
        });

    }
    /**
     * регистрирует курсор с именем `name` привязывая к имени изображение `crosshair`
     * @param {string} name  название курсора
     * @param {PIXI.DisplayObject} [crosshair] любой объект, унаследованный от PIXI.DisplayObject
     */
    addCrosshair(name, crosshair) {
        const data = this.crosshairs.find(item => item.name === name);
        if (!data) {
            this.crosshairs.push({
                name,
                crosshair
            });
        } else {
            console.warn(`A crosshair named '${name}' already exists but has now been replaced with a new one`);
            this.removeChild(crosshair);
            data.crosshair = crosshair;
        }
        crosshair.exists = false;
        crosshair.visible = false;
        this.addChild(crosshair);
    }

    /**
     * включает заранее зарегестрированный курсор с именем `name`. 
     * Если задан параметр `crosshair` то узображение курсора с именем `name` будет
     * заменено на `crosshair`
     * @param {string} name  название курсора
     * @param {PIXI.DisplayObject} [crosshair] любой объект, унаследованный от PIXI.DisplayObject
     */
    setCrosshair(name, crosshair) {
        if (crosshair) this.addCrosshair(name, crosshair);

        const data = this.crosshairs.find(item => item.name === name);
        if (!data) {
            console.warn(`Cursor named '${name}' does not exist`);
            this.game.canvas.style.cursor = 'auto';
            delete this.crosshair;
            delete this.crosshairName;
            return;
        }
        this.crosshair = data.crosshair;
        this.crosshairName = name;
        this.game.canvas.style.cursor = 'none';



        this.crosshairs.forEach(item => {
            if (item.name === name) {
                item.crosshair.exists = true;
                item.crosshair.visible = true;
            } else {
                item.crosshair.exists = false;
                item.crosshair.visible = false;
            }
        });
    }

    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */  
    update(dt) {
        // к сожалению нормально отключение курсора в браузере не работает, поэтому флаги и костыли)))
        this.game.canvas.style.cursor = this.visible && this.crosshairName ? 'none' : 'auto';
    }
}
