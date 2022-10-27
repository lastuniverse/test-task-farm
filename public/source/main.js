import bus from './tools/tool.events.bus.js';

import config from './config.js';

import BootState from './states/state.boot.js';
import MainMenuState from './states/state.mainmenu.js';
import GameState from './states/state.game.js';




export default class Game extends Phaser.Game {
    constructor() {
        super({
            width: config.screenWidth,
            height: config.screenHeight,
            renderer: Phaser.WEBGL,
            antialias: true,
            multiTexture: true,
            // pixelArt: true,
        });
        
        console.log('Game.constructor');

        // подключаем сцены
        this.state.add('BootState', BootState, false);
        this.state.add('MainMenuState', MainMenuState, false);
        this.state.add('GameState', GameState, false);


        // подменяем update
        this.updateOrig = this.update;
        this.update = (...args) => {
            this.updateOrig(...args);
            bus.emit('core.update', this, ...args);
        }

        // запускаем сцену загрузки
        this.state.start('BootState');

        console.log(this)

    }


    // gamePaused(event) {
    //     console.log('Game.onPause', event)
    //     this.state.pause()
    //     // return true; 
    // }
    // gameResumed(event) {
    //     console.log('Game.onResume', event)
    // }
   

}


const game = new Game();