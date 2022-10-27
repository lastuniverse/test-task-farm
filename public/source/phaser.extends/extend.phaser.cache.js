Phaser.Cache.prototype.addTextureAtlas = function (key, url, data, atlasData, format) {
    var obj = {
        key: key,
        url: url,
        data: data,
        json: atlasData, // иначе никак))))
        base: new PIXI.BaseTexture(data)
    };

    if (format === Phaser.Loader.TEXTURE_ATLAS_XML_STARLING)
    {
        obj.frameData = Phaser.AnimationParser.XMLData(this.game, atlasData, key);
    }
    else if (format === Phaser.Loader.TEXTURE_ATLAS_JSON_PYXEL)
    {
        obj.frameData = Phaser.AnimationParser.JSONDataPyxel(this.game, atlasData, key);
    }
    else
    {
        //  Let's just work it out from the frames array
        if (Array.isArray(atlasData.frames))
        {
            obj.frameData = Phaser.AnimationParser.JSONData(this.game, atlasData, key);
        }
        else
        {
            obj.frameData = Phaser.AnimationParser.JSONDataHash(this.game, atlasData, key);
        }
    }

    this._cache.image[key] = obj;

    this._resolveURL(url, obj);

};
