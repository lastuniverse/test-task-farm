import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";
import ComponentSingleton from "../phaser.extends/extend.component.singleton.class.js";
import Keyboard from '../tools/class.keyboard.js';


bus.once('core.preload', core => {
    console.log('core.preload', 'MainMenuGui');
    core.load.bitmapFont('fnt_20',
        config.gamePath + 'fonts/fnt_20.png',
        config.gamePath + 'fonts/fnt_20.xml'
    );

    core.load.atlas('atlas_main_menu_gui',
        config.gamePath + 'sprites/atlas_main_menu_gui.png',
        config.gamePath + 'sprites/atlas_main_menu_gui.json'
    );

    core.load.audio('snd_menu_button', config.gamePath + 'sounds/snd_button.mp3');
    core.load.audio('snd_skin_switch', config.gamePath + 'sounds/snd_betswitch.mp3');
});



export default class MainMenuGui extends ComponentSingleton {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'MainMenuGui', addToStage, enableBody, physicsBodyType);
    }

    make() {
        // так как класс компонента наследуется от Phaser.Group то
        // использовать create для инициализации мы не можем, так
        // как у Phaser.Group уже есть метод create
        // Для компонентов унаследованных от ComponentSingleton
        // метод make вызывается ОДИН раз при первом создании компонента        
        console.log('Component.make', 'MainMenuGui');

        // создаем графические элементы сцены
        this.snd_button = this.game.add.audio('snd_menu_button');
        this.snd_button_switch = this.game.add.audio('snd_skin_switch');


        this.x = config.width * 0.5;
        // this.y = config.height * 0.5;
        // this.alpha = 0.85;
        this.scale.set(0.7);

        this.playButton = new Phaser.Button(this.game, 0, 900, 'atlas_main_menu_gui', this.onPlayPressed, this, 'button_play_default', 'button_play_default', 'button_play_pressed', 'button_play_default');
        this.addChild(this.playButton);
        this.playButton.scale.y = 1.2;
        this.playButton.anchor.set(0.5);

        // this.plussButton = new Phaser.Button(this.game, -215, 120, 'atlas_main_menu_gui', this.onSwitchSkinLeftPressed, this, 'button_prev_default', 'button_prev_default', 'button_prev_pressed', 'button_prev_default');
        // this.addChild(this.plussButton);
        // this.plussButton.anchor.set(0.5);

        // this.minusButton = new Phaser.Button(this.game, 215, 120, 'atlas_main_menu_gui', this.onSwitchSkinRightPressed, this, 'button_next_default', 'button_next_default', 'button_next_pressed', 'button_next_default', this);
        // this.addChild(this.minusButton);
        // this.minusButton.anchor.set(0.5);

        // this.frameSprite = this.create(1, 122, 'atlas_main_menu_gui', 'frame_simple');
        // this.frameSprite.anchor.set(0.5);

        // this.skinText = new Phaser.BitmapText(this.game, 0, 122, 'fnt_20', '', 100);
        // this.skinText.anchor.set(0.5, 0.15);
        // this.skinText.scale.set(4);
        // this.skinText.smoothed = false;
        // this.addChild(this.skinText);


        this.keyboard = new Keyboard({
            // ARROWLEFT: this.onSwitchSkinLeftPressed,
            // ARROWRIGHT: this.onSwitchSkinRightPressed,
            ENTER: this.onPlayPressed,
            SPACE: this.onPlayPressed,
        }, this);
    }

    init() {
        // метод init вызывается после метода make при создании компонента                
        console.log('Component.init', 'MainMenuGui');

        // инициализируем текущее состояние
        // this.skins = ['skin1','skin2','skin3'];
        // this.skinIndex = 0;

        // this.skinText.text = this.skins[this.skinIndex];
        this.keyboard.start();
    }

    update(game) {
        // const elapsed = game.time.elapsedMS;
        // const timer = game.time.timeExpected;

        // this.yoyo = ((this?.yoyo ?? 1) + elapsed / 10000) % 2;
        // const scale = Math.abs(this.yoyo - 1) / 10;

        // this.scale.set(0.67 + scale);
    }

    paused() {
        console.log('!!!!!!!! Component.paused', 'MainMenuGui');
        this.keyboard.stop();
    }

    resumed() {
        console.log('!!!!!!!! Component.resumed', 'MainMenuGui');
        this.keyboard.start();
    }

    onPlayPressed() {
        console.log('MainMenuGui.onPlayPressed');
        this.snd_button.play();
        this.game.state.start('GameState');
    }

    // onSwitchSkinLeftPressed() {
    //     console.log('MainMenuGui.onSwitchSkinLeftPressed');

    //     this.skinIndex = (this.skins.length+this.skinIndex-1)%this.skins.length;
    //     this.snd_button_switch.play();
    //     console.log('!!!!!!!!!!! <<<', this.skinIndex, this.skins[this.skinIndex])
    //     this.skinText.text = this.skins[this.skinIndex];
    // }

    // onSwitchSkinRightPressed() {
    //     console.log('MainMenuGui.onSwitchSkinRightPressed');

    //     this.skinIndex = (this.skins.length+this.skinIndex+1)%this.skins.length;
    //     this.snd_button_switch.play();
    //     console.log('!!!!!!!!!!! >>>', this.skinIndex, this.skins[this.skinIndex])
    //     this.skinText.text = this.skins[this.skinIndex];
    // }

}