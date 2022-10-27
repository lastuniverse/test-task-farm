import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";


export default class EntityBase extends Component {
    constructor(game, parent, name = 'EntityBase', addToStage, enableBody, physicsBodyType) {
        super(game, parent, name, addToStage, enableBody, physicsBodyType);
    }

    make() {
        // счетчики еды и продукта
        this.productTime = 0;
        this.productProgress = 0;
    }


    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */
    update(game) {
        const elapsed = game.time.elapsedMS;
        // const timer = game.time.time;

        if (this.isProductProgressPaused) return;
        if (this.productTime) {
            this.productProgress += elapsed;
            this?.productStatus?.setStaus?.(Math.min(1,this.productProgress/this.productTime));
            if(this.autoCollect){
                if (this.productProgress >= this.productTime) {
                    this.productProgress -= this.productTime;
                    bus.emit('entity.collect', {
                        // ...field,
                        wx: this.wx,
                        wy: this.wy,
                        entityName: this.entityName
                    });
                    this?.snd_collect?.play?.();
                }
            }
        }
    }

    /**
     * собрать произведенный продукт
     * @returns {boolean} если удалось собрать урожай то `true` иначе `false`
     */
     collect() {
        if (!this.productTime) return false;
        if (this.productProgress < this.productTime) return false;
        this.productProgress = 0;
        this?.productStatus?.setStaus?.(Math.min(1,this.productProgress/this.productTime));
        this?.snd_collect?.play?.();
        return true;
    }    
}

