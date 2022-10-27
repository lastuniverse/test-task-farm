import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import EntityBase from "../components/class.entity.base.component.js";

export default class EntityAnimal extends EntityBase {
    constructor(game, parent, name = 'EntityAnimal', addToStage, enableBody, physicsBodyType) {
        super(game, parent, name, addToStage, enableBody, physicsBodyType);
    }

    make() {
        super.make();

        // счетчики еды
        this.foodCounter = 0;
        this.foodTime = 0;
        this.foodProgress = 0;        
    }
    

    /**
     * стандартный метод класса Phaser.Group
     * https://photonstorm.github.io/phaser-ce/Phaser.State.html#update
     */
    update(game) {
        super.update(game);

        const elapsed = game.time.elapsedMS;
        // const timer = game.time.time;

        if (this.foodTime) {
            this.isProductProgressPaused = true;
            if (this.foodCounter === 0) return;
            this.isProductProgressPaused = false;

            this.foodProgress += elapsed;
            if (this.foodProgress >= this.foodTime) {
                this.foodProgress -= this.foodTime;
                this.foodCounter -= 1;
            }
            this?.foodStatus?.setStaus?.(this.foodProgress, this.foodCounter);
        }


    }
    /**
     * покормить животинку
     * @param {number} amount количество еды
     * @returns {boolean} если удалось собрать урожай то `true` иначе `false`
     */
    feed(amount) {
        if (!this.foodTime) return false;
        this.foodCounter += amount;
        this?.foodStatus?.setStaus?.(this.foodProgress, this.foodCounter);
        this?.snd_feed?.play?.();
        return true;
    }
}

