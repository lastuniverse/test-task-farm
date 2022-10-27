export default class Keyboard {
    constructor(lesteners = {}, context) {
        // тут будут флаги отслеживания нажатия кнопок
        this.keys = {};

        // тут запомним текущие обработчики кнопок
        this.listeners = {};

        this.isActive = false;

        // устанавливаем слушатели на нажатия, удержание и отжатия кнопок
        window.addEventListener("keydown", this.downListener.bind(this),false);
        window.addEventListener("keyup", this.upListener.bind(this),false);

        this.setListeners(lesteners, context??this);
    }

    stop(){
        this.isActive = false;
    }
    start(){
        this.isActive = true;
    }

    setListeners(list, context) {
        if (!list || typeof list !== 'object') return;
        if (!context) context = null;
        this.listeners = {};
        Object.keys(list).forEach(function (key) {
            if (typeof list[key] !== 'function') return;
            this.listeners[key] = function (key) {
                list[key].call(context, key);
            };
        }, this)
    }

    downListener(event) {
        if(!this.isActive) return;
        const key = event.code.replace(/^(Key|Digit)/i, '').toUpperCase();
        console.log('onDown', key, this.keys[key], this.listeners);

        if (this.keys[key]) return;
        this.keys[key] = true;

        if (this.listeners[key])
            this.listeners[key](key);
        // console.log('onDown', key);
    }
    upListener(event) {
        if(!this.isActive) return;
        const key = event.code.replace(/^(Key|Digit)/i, '').toUpperCase();
        this.keys[key] = false;

        // console.log('onUp',key);
        // this.emit(key, 'up');
    }
    pressListener(key) {
        if(!this.isActive) return;
        // key = key.toUpperCase();
        // console.log('onPress',key);
        // this.emit(key, 'press');

    }
}

