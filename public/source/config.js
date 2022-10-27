const config = {
    // фактический размер. влияет на качество графики и fps
    screenWidth: 1920,
    screenHeight: 1080,

    // внутреннее разрешение игры. 
    // не влияет на качество графики
    // (математика, позиционирование и прочее)
    width: 1280,
    height: 720,

    sharedPath: 'shared/',
    gamePath: '/',
}

// некоторые вычисляемые параметры

config.scale = {
    x: config.screenWidth/config.width,
    y: config.screenHeight/config.height,
}

config.center = {
    x: config.width/2,
    y: config.height/2,
}



export default config;

