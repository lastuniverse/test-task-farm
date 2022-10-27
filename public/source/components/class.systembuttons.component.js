import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";
import ComponentSingleton from "../phaser.extends/extend.component.singleton.class.js";


bus.once('core.boot.preload', core => {
    // предзагрузка используемых для компонента ресурсов
    console.log('core.boot.preload', 'SystemButtons');

    core.load.spritesheet('top_buttons', config.gamePath + 'sprites/buttons/system_buttons.png', 54, 44, 10);
});


export default class SystemButtons extends ComponentSingleton {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'SystemButtons', addToStage, enableBody, physicsBodyType);
    }

    make() {
        // так как класс компонента наследуется от Phaser.Group то
        // использовать create для инициализации мы не можем, так
        // как у Phaser.Group уже есть метод create
        // Для компонентов унаследованных от ComponentSingleton
        // метод make вызывается ОДИН раз при первом создании компонента        
        console.log('Component.make', 'SystemButtons');
        this.alpha = 0.7;
        this.x = config.width;

        this.btnSound = new Phaser.Button(this.game, -108, 0, 'top_buttons', () => { this.onMutePress(false); }, this, 0, 0, 1);
        // this.btnSound.scale.set(scale.x, scale.y);
        this.addChild(this.btnSound);


        this.btnNoSound = new Phaser.Button(this.game, -108, 0, 'top_buttons', () => { this.onMutePress(true); }, this, 2, 2, 3);
        // this.btnNoSound.scale.set(scale.x, scale.y);
        this.addChild(this.btnNoSound);

        this.btnNoSound.visible = this.game.sound.mute;
        this.btnSound.visible = !this.game.sound.mute;

        this.btnFSOpen = new Phaser.Button(this.game, -54, 0, 'top_buttons', this.onFullscreenPress, this, 6, 6, 7);
        // this.btnFSOpen.scale.set(scale.x, scale.y);
        this.addChild(this.btnFSOpen);

        this.btnFSClose = new Phaser.Button(this.game, -54, 0, 'top_buttons', this.onFullscreenPress, this, 8, 8, 9);
        // this.btnFSClose.scale.set(scale.x, scale.y);
        this.btnFSClose.visible = false;
        this.addChild(this.btnFSClose);


        this.game.scale.onSizeChange.add(this.onGameSizeChange, this);
    }

    onGameSizeChange() {
        var screenWidth = this.game.scale.width;
        var screenHeight = this.game.scale.height;

        var sx = this.game.scale.scaleFactor.x;
        var sy = this.game.scale.scaleFactor.y;

        var btnHeight = 44 * config.scale.y;

        var s = this.game.device.desktop ? 0.06 : 0.09;
        var h = screenHeight < screenWidth ? screenHeight : screenWidth;
        var sprS = (s * h) / btnHeight;

        this.scale.x = sx * sprS;
        this.scale.y = sy * sprS;
    }




    onFullscreenPress() {
        console.log('SystemButtons.onFullscreenPress');
        if (!this.game.scale.compatibility.supportsFullScreen) return;

        const setButtonsVisible = enabled => {
            this.btnFSOpen.visible = enabled;
            this.btnFSClose.visible = !enabled;
        }

        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
            setButtonsVisible(true);
        }
        else {
            this.game.scale.startFullScreen(false);
            setButtonsVisible(false);
        }
    }

    onMutePress(enabled) {
        console.log('SystemButtons.onMutePress');
        this.btnSound.visible = enabled;
        this.btnNoSound.visible = !enabled;

        this.game.sound.mute = !enabled;
    }

}