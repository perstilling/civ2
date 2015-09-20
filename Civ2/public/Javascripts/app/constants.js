Constants = {};

Constants.Game = {
    scale : 0.2
}

Constants.Screen = {
    width : 800,
    height : 600
}
Constants.Screen.halfWidth = Math.ceil(Constants.Screen.width / 2);
Constants.Screen.halfHeight = Math.ceil(Constants.Screen.height / 2);

Constants.Objects = {
    spriteWidth : Constants.Game.scale * 64,
    spriteHeight : Constants.Game.scale * 32
}

Constants.Map = {
    logicalSize : 128
}
Constants.Map.width = Constants.Map.logicalSize * (Constants.Objects.spriteWidth / 2);
Constants.Map.height = Constants.Map.logicalSize * Constants.Objects.spriteHeight - (Constants.Objects.spriteHeight * 1.5);

Constants.Textures = {}
Constants.Textures.Terrain = {
    water : 'water',
    grass : 'grass'
};
Constants.Textures.Units = {
    settler : 'settler'
};

