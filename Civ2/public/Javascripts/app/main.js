define(function (require) {
    require('app/gamemanager');

    var gameMgr = new Gamemanager();
    gameMgr.start();

    /*require('app/constants');
    require('app/terrain');
    require('app/statsmanager');
    require("tween");
    var KeyboardJS = require('keyboard');
    var PIXI = require('pixi');

    var movingUnit = false;


    
    function loadMap() {

        var map = generateTerrainMap(Constants.Map.logicalSize, 1, 4);

        for (x = 0; x < Constants.Map.logicalSize; x += 1) {
            for (y = 0; y < Constants.Map.logicalSize; y += 1) {
                var tileXPos = x * (Constants.Objects.spriteWidth / 2);
                var tileYPos = (x % 2 == 0 ? 0 : (Constants.Objects.spriteHeight / 2)) + y * Constants.Objects.spriteHeight;
                
                var texture = PIXI.Texture.fromImage('/images/' + (map[x][y] < 0.7 ? 'water.gif' : 'grass.gif'));
                var tile = new PIXI.Sprite(texture);
                tile.position.x = tileXPos;
                tile.position.y = tileYPos;
                tile.scale.x = Constants.Game.scale;
                tile.scale.y = Constants.Game.scale;
                tile.interactive = true;
                tile.logicx = x;
                tile.logicy = y;

                tile.click = tile.tap = function () {
                    moveCameraAbs(this.position.x, this.position.y);
                };

                mapCont.addChild(tile);
            }
        }
    }
    
    function moveCameraLog(x, y) {
        var coords = getUnitCoordinates(x, y);
        moveCameraAbs(coords.x, coords.y);
    }
    
    function unitInViewport(x, y) {
        var unitCords = getUnitCoordinates(x, y);
        var viewportXStart = -mapCont.position.x + (mapCont.position.x == 0 ? -Constants.Objects.spriteWidth : Constants.Objects.spriteWidth);
        var viewportXEnd = -mapCont.position.x + Constants.Screen.width - 1.5*Constants.Objects.spriteWidth;
        var viewportYStart = -mapCont.position.y + (mapCont.position.y == 0 ? -Constants.Objects.spriteHeight : Constants.Objects.spriteHeight);
        var viewportYEnd = -mapCont.position.y + Constants.Screen.height - 1.5*Constants.Objects.spriteHeight;
        
        return !(unitCords.x < viewportXStart || unitCords.x > viewportXEnd || unitCords.y < viewportYStart || unitCords.y > viewportYEnd);
    }

    function moveCameraAbs(x, y) {
        if (x <= Constants.Screen.halfWidth)
            mapCont.position.x = 0;
        else if (x >= Constants.Map.width - Constants.Screen.halfWidth)
            mapCont.position.x = -Constants.Map.width + Constants.Screen.width - (Constants.Objects.spriteWidth / 2);
        else
            mapCont.position.x = -x + Constants.Screen.halfWidth;
        
        if (y <= Constants.Screen.halfHeight)
            mapCont.position.y = 0;
        else if (y >= Constants.Map.height - Constants.Screen.halfHeight)
            mapCont.position.y = -Constants.Map.height + Constants.Screen.height - (Constants.Objects.spriteHeight * 2);
        else
            mapCont.position.y = -y + Constants.Screen.halfHeight;
        
        if (y > Constants.Screen.halfHeight && y < (Constants.Map.logicalSize * (Constants.Objects.spriteHeight / 2) - Constants.Screen.halfHeight))
            mapCont.position.y = -y + Constants.Screen.halfHeight;
    }
    
    function getUnitCoordinates(logicX, logicY) {
        return {
            x: logicX * (Constants.Objects.spriteWidth / 2), 
            y: (logicX % 2 == 0 ? 0 : (Constants.Objects.spriteHeight / 2)) + logicY * Constants.Objects.spriteHeight - Constants.Objects.spriteHeight / 2
        };
    }
    
    var CurrSettlerPos = { x: 4, y: 4 };
    
    var settlerTex = PIXI.Texture.fromImage("/images/settler.gif");
    var settler = new PIXI.Sprite(settlerTex);
    settler.scale.x = Constants.Game.scale;
    settler.scale.y = Constants.Game.scale;
    mapCont.addChild(settler);
    
    function moveUnit(unit, x, y) {
        moveUnitAnimate(unit, x, y, 0);
    }
    
    function moveUnitAnimate(unit, x, y, speed) {
        if (movingUnit)
            return;
        movingUnit = true;
        if (!unitInViewport(x, y)) {
            moveCameraLog(x, y);
        }
        
        var unitPos = getUnitCoordinates(x, y);

        new TWEEN.Tween(unit).to({ x: unitPos.x, y: unitPos.y }, speed).onComplete(function () {
            movingUnit = false;
        }).start();
    }
    
    function moveSettler() {
        moveUnitAnimate(settler, CurrSettlerPos.x, CurrSettlerPos.y, 150);
    }

    moveUnit(settler, CurrSettlerPos.x, CurrSettlerPos.y);

    KeyboardJS.on('w', function () {
        if ((CurrSettlerPos.y > 0 || (CurrSettlerPos.y == 0 && CurrSettlerPos.x % 2 != 0)) && CurrSettlerPos.x > 0) {
            CurrSettlerPos.y = CurrSettlerPos.x % 2 == 0 ? CurrSettlerPos.y - 1 : CurrSettlerPos.y;
            CurrSettlerPos.x--;
            moveSettler();
        }
    });
    
    KeyboardJS.on('e', function () {
        if ((CurrSettlerPos.y > 0 || (CurrSettlerPos.y == 0 && CurrSettlerPos.x % 2 != 0)) && CurrSettlerPos.x < Constants.Map.logicalSize - 1) {
            CurrSettlerPos.y = CurrSettlerPos.x % 2 == 0 ? CurrSettlerPos.y - 1 : CurrSettlerPos.y;
            CurrSettlerPos.x++;
            moveSettler();
        }
    });

    KeyboardJS.on('s', function () {
        if (CurrSettlerPos.x > 0 && (CurrSettlerPos.y < Constants.Map.logicalSize - 1 || (CurrSettlerPos.y == Constants.Map.logicalSize - 1 && CurrSettlerPos.x % 2 == 0))) {
            CurrSettlerPos.y = CurrSettlerPos.x % 2 == 0 ? CurrSettlerPos.y : CurrSettlerPos.y + 1;
            CurrSettlerPos.x--;
            moveSettler();
        }
    });

    KeyboardJS.on('d', function () {
        if (CurrSettlerPos.x < Constants.Map.logicalSize - 1 && (CurrSettlerPos.y < Constants.Map.logicalSize - 1 || (CurrSettlerPos.y == Constants.Map.logicalSize - 1 && CurrSettlerPos.x % 2 == 0))) {
            CurrSettlerPos.y = CurrSettlerPos.x % 2 == 0 ? CurrSettlerPos.y : CurrSettlerPos.y + 1;
            CurrSettlerPos.x++;
            moveSettler();
        }
    });

    KeyboardJS.on('up', function () {
        if (CurrSettlerPos.y > 0) {
            CurrSettlerPos.y--;
            moveSettler();
        }
    });

    KeyboardJS.on('down', function () {
        if (CurrSettlerPos.y < Constants.Map.logicalSize - 1) {
            CurrSettlerPos.y++;
            moveSettler();
        }
    });

    KeyboardJS.on('left', function () {
        if (CurrSettlerPos.x > 1) {
            CurrSettlerPos.x -= 2;
            moveSettler();
        }
    });

    KeyboardJS.on('right', function () {
        if (CurrSettlerPos.x < Constants.Map.logicalSize - 2) {
            CurrSettlerPos.x += 2;
            moveSettler();
        }
    });*/

    
});