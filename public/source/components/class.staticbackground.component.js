import config from '../config.js';
import bus from '../tools/tool.events.bus.js'
import Component from "../phaser.extends/extend.component.class.js";
import ComponentSingleton from "../phaser.extends/extend.component.singleton.class.js";



bus.once('core.boot.preload', core => {
    console.log('core.boot.preload', 'StaticBacground');
    core.load.image('loading_back', config.gamePath + 'sprites/preloader/preloader.background.jpg');

    core.load.atlas('clouds',
        config.gamePath + 'sprites/preloader/atlas.clouds.v2.png',
        config.gamePath + 'sprites/preloader/atlas.clouds.v2.json',
        Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );
});

export default class StaticBacground extends ComponentSingleton {
    constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
        super(game, parent, 'StaticBacground', addToStage, enableBody, physicsBodyType);
    }

    make() {
        // так как класс компонента наследуется от Phaser.Group то
        // использовать create для инициализации мы не можем, так
        // как у Phaser.Group уже есть метод create
        // Для компонентов унаследованных от ComponentSingleton
        // метод make вызывается ОДИН раз при первом создании компонента        
        console.log('Component.make', 'StaticBacground');

        this.backSprite = this.create(0, 0, 'loading_back');
        this.backSprite.width = config.width;
        this.backSprite.height = config.height;

        this.cloudsGroup = new Phaser.Group(this.game, this);
        this.cloudsGroup.position.set(config.center.x, config.center.y);
        // this.cloudsGroup.scale.set(0.9)
        this.cloudsGroup.alpha = 0;
        this.clouds = [];

        this.logoSprite = this.create(config.center.x, config.center.y, 'loading_logo', 0);
        this.logoSprite.anchor.set(0.5, 0.5);
        this.logoSprite.scale.set(0.20);
        this.logoSprite.alpha = 0.8;

        // создаем облака
        this.ratio = 1.3;
        const maxDist = Math.max(config.center.x, config.center.y) * 1.2;
        let q = 50;
        for (let dist = 50; dist <= maxDist; dist += q) {
            q *= 1.5;
            const deltaAngle = Math.random() * Math.PI * 2;
            for (let count = 0; count <= Math.PI * 2; count += Math.PI / 7) {
                const angle = deltaAngle + count;
                const rotation = angle - Math.PI / 2;
                const scale = (0.4 + (Math.pow(dist, 2) / Math.pow(maxDist, 2)) * 4.0) * 1.8;
                const brightness = 0.15 + (1 - (dist / maxDist)) * 0.9;
                const speed = (1.0 + dist / maxDist) * Math.PI / 1800;

                const dr = dist + dist * (Math.random() - 0.5) * 0.2;
                const sx = dr * Math.cos(angle) * this.ratio;
                const sy = dr * Math.sin(angle) * 1 / this.ratio;
                const frame = ('000' + Math.floor(Math.random() * 25)).substr(-3);
                const sprite = this.cloudsGroup.create(sx, sy, 'clouds', frame);
                sprite.anchor.setTo(0.5, 0.5);
                // sprite.scale.set(scale, scale*1.5);
                sprite.scale.set(scale);
                sprite.rotation = rotation;
                sprite.alpha = this.cloudsGroup.alpha;

                const dbr = brightness * 0.8 * Math.random();
                const br = Math.min(1, brightness + (dbr - dbr / 2));
                sprite.tint =
                    ((0xff * br) << 16) +
                    ((0xf4 * br) << 8) +
                    ((0xe0 * br) << 0);

                this.clouds.push({
                    angle,
                    rotation,
                    scale,
                    frame,
                    speed,
                    dist: dr,
                    brightness: br,
                    sprite
                });
            }
        }

    }

    update(game) {
        const elapsed = game.time.elapsedMS;
        const timer = game.time.timeExpected;

        // вращение и масштабирование логотипа построенное на математике
        this.yoyo = ((this?.yoyo ?? 0) + elapsed / 40000) % 2;

        let yoyo = Math.abs(this.yoyo-1);
        yoyo = yoyo * 1.2 - 0.1;
        yoyo = Math.min(1, Math.max(0, yoyo));
        yoyo = 1-Math.pow(yoyo, 2);

        this.logoSprite.scale.set(yoyo * 0.9);
        this.logoSprite.alpha = 0.50 + yoyo * 0.5;
        
        this._rotation = this._rotation??0;
        const rotation = (1-yoyo) * 8 * Math.PI;
        this.logoSprite.rotation += Math.abs(this._rotation - rotation);
        this._rotation = rotation;

        // движение облаков
        this.cloudsGroup.alpha = Math.min(0.8, this.cloudsGroup.alpha + 0.0025);
        this.clouds.forEach(item => {
            item.angle += item.speed;
            item.rotation = item.angle - Math.PI / 2;

            const sx = item.dist * Math.cos(item.angle) * this.ratio;
            const sy = item.dist * Math.sin(item.angle) * 1 / this.ratio;


            item.sprite.rotation = item.rotation;
            item.sprite.position.set(sx, sy);
            item.sprite.alpha = this.cloudsGroup.alpha;
        });
    }

}