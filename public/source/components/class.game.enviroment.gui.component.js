import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";
import ComponentSingleton from "../phaser.extends/extend.component.singleton.class.js";
import Keyboard from '../tools/class.keyboard.js';


bus.once('core.preload', core => {
    console.log('core.preload', 'GameEnviromentGui');
    core.load.atlas('tileset_grass',
        config.gamePath + 'sprites/tileset_grass.png',
        config.gamePath + 'sprites/tileset_grass.json'
    );
    core.load.atlas('tileset_tree',
        config.gamePath + 'sprites/tileset_tree.png',
        config.gamePath + 'sprites/tileset_tree.json'
    );
    core.load.atlas('tileset_field',
        config.gamePath + 'sprites/tileset_field.png',
        config.gamePath + 'sprites/tileset_field.json'
    );

});



export default class GameEnviromentGui extends Component {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'GameEnviromentGui', addToStage, enableBody, physicsBodyType);
    }

    make() {
        // так как класс компонента наследуется от Phaser.Group то
        // использовать create для инициализации мы не можем, так
        // как у Phaser.Group уже есть метод create
        console.log('Component.make', 'GameEnviromentGui');

        // создаем графические элементы сцены
        const size = 1.1;
        const width = size * config.width / 17;
        const height = size * config.height / 17;


        for (let y = 0; y <= config.height + height; y += height) {
            for (let x = 0; x <= config.width + width; x += width) {
                const wy = y - config.center.y * 1.5;
                const wx = x - config.center.x;
                const dist = Math.hypot(wx, wy * 1.25);
                let tilesSet = 'forest';
                if (dist < 650) tilesSet = 'dry';
                if (dist < 550) tilesSet = 'far';
                if (dist < 450) tilesSet = 'near';

                const spriteData = getSpriteInfo(tilesSet)

                const sprite = new Phaser.Sprite(
                    this.game,
                    x + width * 0.2 * (Math.random() - 0.5),
                    y + height * 0.2 * (Math.random() - 0.5),
                    spriteData.spriteName
                );
                sprite.frameName = spriteData.frameName;
                sprite.anchor.set(0.5, 0.75);
                sprite.scale.set(size * 0.49);
                this.addChild(sprite);
            }
        }
    }

    update(game) {
        const elapsed = game.time.elapsedMS;
        const timer = game.time.time;
    }

    paused() {
        console.log('!!!!!!!! Component.paused', 'GameEnviromentGui');
    }

    resumed() {
        console.log('!!!!!!!! Component.resumed', 'GameEnviromentGui');
    }

}



function getSpriteInfo(presetName) {
    const tilesPreset = tilesPresets[presetName];
    const keys = Object.keys(tilesPreset);
    const amount = keys.reduce((acc, key) => acc += tilesPreset[key], 0);
    const r = Math.random() * amount;
    let tilesetName;
    let count = 0;
    keys.some(key => {
        count += tilesPreset[key];
        if (count > r) tilesetName = key
        return !!tilesetName;
    });
    const data = tilesPresetsData[tilesetName];
    return {
        ...data,
        frameName: data.frames[Math.floor(data.frames.length * Math.random())]
    }

}





// пресеты спрайтов
var tilesPresets = {
    near: {
        // nearfield: 1,
        greengrass: 1,
    },
    far: {
        greengrass: 2,
        drygrass: 1,
    },
    dry: {
        // greengrass: 3,
        stounegrass: 1,
        drygrass: 2,
    },
    forest: {
        greengrass: 1,
        stounegrass: 1,
        drygrass: 2,
        pinetree: 6,
        aldertree: 2,
    },
}


// наборы спрайтов
var tilesPresetsData = {
    pinetree: {
        spriteName: 'tileset_tree',
        frames: [
            'tree.pine.middle.00.1', 'tree.pine.middle.00.2', 'tree.pine.middle.00.3', 'tree.pine.middle.00.4',
            'tree.pine.middle.01.1', 'tree.pine.middle.01.2', 'tree.pine.middle.01.3', 'tree.pine.middle.01.4',
            'tree.pine.small.01.1', 'tree.pine.small.01.2', 'tree.pine.small.01.3', 'tree.pine.small.01.4',
        ]
    },
    aldertree: {
        spriteName: 'tileset_tree',
        frames: [
            'tree.alder.middle.00.1', 'tree.alder.middle.00.2', 'tree.alder.middle.00.3', 'tree.alder.middle.00.4',
            'tree.alder.middle.01.1', 'tree.alder.middle.01.2', 'tree.alder.middle.01.3', 'tree.alder.middle.01.4',
            'tree.alder.small.00.1', 'tree.alder.small.00.2', 'tree.alder.small.00.3', 'tree.alder.small.00.4',
            'tree.alder.small.01.1', 'tree.alder.small.01.2', 'tree.alder.small.01.3', 'tree.alder.small.01.4',
        ]
    },
    stounegrass: {
        spriteName: 'tileset_grass',
        frames: [
            'grass.stone.type.00.1', 'grass.stone.type.00.2', 'grass.stone.type.00.3', 'grass.stone.type.00.4',
            'grass.stone.type.01.1', 'grass.stone.type.01.2', 'grass.stone.type.01.3', 'grass.stone.type.01.4',
            'grass.stone.type.02.1', 'grass.stone.type.02.2', 'grass.stone.type.02.3', 'grass.stone.type.02.4',
            'grass.stone.type.03.1', 'grass.stone.type.03.2', 'grass.stone.type.03.3', 'grass.stone.type.03.4',
        ]
    },    
    drygrass: {
        spriteName: 'tileset_grass',
        frames: [
            'grass.dry.type.00.1', 'grass.dry.type.00.2', 'grass.dry.type.00.3', 'grass.dry.type.00.4',
            'grass.dry.type.01.1', 'grass.dry.type.01.2', 'grass.dry.type.01.3', 'grass.dry.type.01.4',
            'grass.dry.type.02.1', 'grass.dry.type.02.2', 'grass.dry.type.02.3', 'grass.dry.type.02.4',
            'grass.dry.type.03.1', 'grass.dry.type.03.2', 'grass.dry.type.03.3', 'grass.dry.type.03.4',
            'grass.dry.type.04.1', 'grass.dry.type.04.2', 'grass.dry.type.04.3', 'grass.dry.type.04.4',
            'grass.dry.type.05.1', 'grass.dry.type.05.2', 'grass.dry.type.05.3', 'grass.dry.type.05.4',
            'grass.dry.type.06.1', 'grass.dry.type.06.2', 'grass.dry.type.06.3', 'grass.dry.type.06.4',
            // 'grass.dry.type.07.1',    'grass.dry.type.07.2',    'grass.dry.type.07.3',    'grass.dry.type.07.4',
            // 'grass.dry.type.08.1',    'grass.dry.type.08.2',    'grass.dry.type.08.3',    'grass.dry.type.08.4',
            'grass.dry.type.09.1', 'grass.dry.type.09.2', 'grass.dry.type.09.3', 'grass.dry.type.09.4',
        ]
    },
    greengrass: {
        spriteName: 'tileset_grass',
        frames: [
            'grass.type.00.1', 'grass.type.00.2', 'grass.type.00.3', 'grass.type.00.4',
            // 'grass.type.01.1',    // 'grass.type.01.2',    // 'grass.type.01.3',    // 'grass.type.01.4',
            'grass.type.02.1', 'grass.type.02.2', 'grass.type.02.3', 'grass.type.02.4',
            'grass.type.03.1', 'grass.type.03.2', 'grass.type.03.3', 'grass.type.03.4',
            // 'grass.type.04.1',    'grass.type.04.2',    'grass.type.04.3',    'grass.type.04.4',
            'grass.type.05.1', 'grass.type.05.2', 'grass.type.05.3', 'grass.type.05.4',
            'grass.type.06.1', 'grass.type.06.2', 'grass.type.06.3', 'grass.type.06.4',
            // 'grass.type.07.1',    'grass.type.07.2',    'grass.type.07.3',    'grass.type.07.4',
            'grass.type.08.1', 'grass.type.08.2', 'grass.type.08.3', 'grass.type.08.4',
            'grass.type.09.1', 'grass.type.09.2', 'grass.type.09.3', 'grass.type.09.4',
            'grass.type.10.1', 'grass.type.10.2', 'grass.type.10.3', 'grass.type.10.4',
        ]
    }
}