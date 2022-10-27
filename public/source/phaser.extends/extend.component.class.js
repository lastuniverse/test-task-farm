// import bus from '../tools/tool.events.bus.js'

export default class Component extends Phaser.Group {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, name, addToStage, enableBody, physicsBodyType);

        // console.log('!!!!!!! Component.constructor', game, parent, name, addToStage, enableBody, physicsBodyType);
        this.game = game;
        // this.state = this.game.state.getCurrentState();

        // запоминаем оригинальный this.update объектов этого класса
        this.updateOrig = this.update;
        // подменяем оригинальный this.update объектов этого класса
        this.update = this.updateHandler;


        // запоминаем оригинальный this.destroy объектов этого класса
        this.destroyOrig = this.destroy;
        // подменяем оригинальный this.destroy объектов этого класса
        this.destroy = this.destroyHandler;


        // запоминаем оригинальный this.stop объектов этого класса
        this.stopOrig = this.stop;
        // подменяем оригинальный this.stop объектов этого класса
        this.stop = this.stopHandler;        


        // запоминаем оригинальный this.start объектов этого класса
        this.startOrig = this.start;
        // подменяем оригинальный this.start объектов этого класса
        this.start = this.startHandler;        


        this?.make?.();
        this?.init?.();
        this.isMake = true;
        this.isActive = true;
    }

    updateHandler(...args) {
        // вызываем оригинальный update для объекта этого класса
        if (this.isMake && this.exists && this.game && this.isActive) this?.updateOrig?.(this.game);
        this.forEach(item => {
            item?.update?.(...args);
        });
        // const elapsed = game.time.elapsedMS;
        // const timer = game.time.timeExpected;

        // console.log(1);
    }

    destroyHandler(...args) {
        this.forEach(item => {
            item?.shutdown?.();
        });          
        this?.shutdown?.();

        this.destroyOrig(...args);
    }

    stopHandler(...args) {
        if (!this.isActive) return;
        this.isActive = false;
        this.forEach(item => {
            item?.paused?.();
        });        
        this?.paused?.();
        this?.stopOrig(...args)
    }

    startHandler(...args) {
        if (this.isActive) return;
        this.isActive = true;
        this?.resumed?.();
        this.forEach(item => {
            item?.resumed?.();
        });          
        this?.startOrig(...args)
    }
}
Phaser.Element = Component;



// Phaser.GameObjectFactory.prototype.element = function (parent, name, addToStage, enableBody, physicsBodyType) {
//     return new Phaser.Element(this.game, parent, name, addToStage, enableBody, physicsBodyType);
// }


// console.log(222, Phaser)