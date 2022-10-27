import Component from "./extend.component.class.js";

const singletons = {};

export default class ComponentSingleton extends Component {
    constructor(game, parent, name='default', addToStage, enableBody, physicsBodyType) {
        // делаем компонент singlton-м (один экзепляр на всех)
        const singleton = singletons[name];
        if (singleton) {
            // добавляем группу нашего компонента в parent
            if (parent) parent.addChild(singleton);
            
            // вызываем метод init() при создании каждого нового объекта от SystemButtons
            singleton.init();
            // вызываем оригинальный resumed для объекта этого класса
            singleton?.resumed?.();            
            singleton.forEach(item => {
                item?.init?.();
                item?.resumed?.();            
            });
            

            // возвращаем ранее созданный объект класса SystemButtons
            return singleton;
        }     

        super(game, parent, name, addToStage, enableBody, physicsBodyType);
        
        // this.ignoreDestroy = true;

        // запоминаем оригинальный this.init объектов этого класса
        this.initOrig = this.init;
        // подменяем оригинальный this.init объектов этого класса
        this.init = this.initHandler;    
        
        // запоминаем первый созданный экземпляр
        singletons[name] = this;        
    }

    initHandler(...args) {
        // восстанавливаем возможность ввода
        this.setIgnoreChildInput(false);

        // вызываем оригинальный init для объекта этого класса
        this?.initOrig?.(...args);
    }

    destroy() {
        // console.log('ComponentSingleton.destroy', 'MainMenuGui');
        // так как этот компонент у нас singlon, 
        // и существует все время, пока игра запущена
        // то ставим заглушку на его уничтожение
        // так как будет автоматически уничтожатся при смене state
        this.setIgnoreChildInput(true);
        this.forEach(item => {
            item?.paused?.();
        });       
        this?.paused?.();
    }
    
  

    setIgnoreChildInput(value) {
        this.isActive = !value;
        this.ignoreChildInput = value;
        this.enabled = value;
        this.forEach(item => {
            item?.setIgnoreChildInput?.(value);
            item.enabled = value;
        });
    }    

    
  
}
Phaser.Element = Component;



// Phaser.GameObjectFactory.prototype.element = function (parent, name, addToStage, enableBody, physicsBodyType) {
//     return new Phaser.Element(this.game, parent, name, addToStage, enableBody, physicsBodyType);
// }


// console.log(222, Phaser)