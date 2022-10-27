import config from '../config.js';

// описание класса Phaser.State https://photonstorm.github.io/phaser-ce/Phaser.State.html
export default class State extends Phaser.State {
    constructor(...args) {
        super(...args);
        // console.log('State.constructor');

        // запоминаем оригинальный this.init объектов этого класса
        this.initOrig = this.init;
        // подменяем оригинальный this.init объектов этого класса
        this.init = this.initHandler;

        // запоминаем оригинальный this.update объектов этого класса
        // this.updateOrig = this.update;
        // подменяем оригинальный this.update объектов этого класса
        // this.update = this.updateHandler;

    }

    // updateHandler(...args) {
    //     // вызываем оригинальный init для объекта этого класса
    //     this?.updateOrig?.(...args);
    //     // console.log(1);
    // }

    // описание метода init https://photonstorm.github.io/phaser-ce/Phaser.State.html#init
    initHandler(...args) {
        // console.log('State.init');
        // хитрые манипуляции со scale. суть в следующем:
        // хочу задавать фиксированный размер канваса,
        // но при этом иметь другой фиксированный размер сцен

        // создаем группу, которую будем дополнительно масштабировать
        this.group = this.add.group();

        // подменяем группу мира в this.add на созданную группу
        // при этом this.world остается прежним
        this.add.world = this.group;

        // вызываем оригинальный init для объекта этого класса
        this.initOrig(...args);

        // устанавливаем для сцены режим scale по умолчанию.
        // по факту будет менятся scale группы this.world
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.refresh();

        // устанавливаем для группы this.group такой scale, чтобы она
        // четко вписалась в текущий размер канваса имея размер, 
        // заданный в конфиге
        this.group.scale.set(
            config.scale.x,
            config.scale.y
        );
    }
}
