/* control graphics rendering for each state of the game */

define(function (require){
    var PIXI = require('pixi');
    require("tween");
    require('app/constants');
    require('app/statsmanager');
    require('app/utils');

    Graphicsmanager = function () {
        var that = this;
        this.eventManager = null;
        var mapContainer = null;
        this.stage = null;
        this.renderer = null;
        this.init = function () {
            PIXI.dontSayHello = true;
            that.stage = new PIXI.Stage(0x888888, true);
            that.renderer = PIXI.autoDetectRenderer(Constants.Screen.width, Constants.Screen.height);
            document.body.appendChild(that.renderer.view);
            requestAnimFrame(that.animate);
        };
        this.animate = function() {
            Statsmanager.begin();
            requestAnimFrame(that.animate);
            TWEEN.update();
            that.renderer.render(that.stage);
            Statsmanager.end();
        };
        this.renderGameView = function (gameState) {
            that.drawMap(gameState.map);
        };
        this.drawMap = function (map) {
            mapContainer = new PIXI.DisplayObjectContainer();

            for (x = 0; x < Constants.Map.logicalSize; x += 1) {
                for (y = 0; y < Constants.Map.logicalSize; y += 1) {
                    var tileXPos = x * (Constants.Objects.spriteWidth / 2);
                    var tileYPos = (x % 2 == 0 ? 0 : (Constants.Objects.spriteHeight / 2)) + y * Constants.Objects.spriteHeight;
                    
                    var texture = PIXI.Texture.fromImage(Utils.getTerrainTexture(map[x][y] < 0.7 ? Constants.Textures.Terrain.grass : Constants.Textures.Terrain.water));
                    var tile = new PIXI.Sprite(texture);
                    tile.position.x = tileXPos;
                    tile.position.y = tileYPos;
                    tile.scale.x = Constants.Game.scale;
                    tile.scale.y = Constants.Game.scale;
                    tile.interactive = true;
                    tile.logicx = x;
                    tile.logicy = y;
                    tile.click = tile.tap = that.eventManager.onMapTileClicked;
                    mapContainer.addChild(tile);
                }
            }

            that.stage.addChild(mapContainer);
        };
        
        // TODO: Optimize offscreen tile performance. Set visibility of tiles not in view to false
        this.moveCameraAbs = function (x, y) {
            if (x <= Constants.Screen.halfWidth)
                mapContainer.position.x = 0;
            else if (x >= Constants.Map.width - Constants.Screen.halfWidth)
                mapContainer.position.x = -Constants.Map.width + Constants.Screen.width - (Constants.Objects.spriteWidth / 2);
            else
                mapContainer.position.x = -x + Constants.Screen.halfWidth;
            
            if (y <= Constants.Screen.halfHeight)
                mapContainer.position.y = 0;
            else if (y >= Constants.Map.height - Constants.Screen.halfHeight)
                mapContainer.position.y = -Constants.Map.height + Constants.Screen.height - (Constants.Objects.spriteHeight * 2);
            else
                mapContainer.position.y = -y + Constants.Screen.halfHeight;
            
            if (y > Constants.Screen.halfHeight && y < (Constants.Map.logicalSize * (Constants.Objects.spriteHeight / 2) - Constants.Screen.halfHeight))
                mapContainer.position.y = -y + Constants.Screen.halfHeight;
        }

        this.moveCameraLog = function(x, y) {
            var coords = that.getUnitCoordinates(x, y);
            that.moveCameraAbs(coords.x, coords.y);
        }
        
        this.unitInViewport = function (x, y) {
            var unitCords = that.getUnitCoordinates(x, y);
            var viewportXStart = -mapContainer.position.x + (mapContainer.position.x == 0 ? -Constants.Objects.spriteWidth : Constants.Objects.spriteWidth);
            var viewportXEnd = -mapContainer.position.x + Constants.Screen.width - 1.5 * Constants.Objects.spriteWidth;
            var viewportYStart = -mapContainer.position.y + (mapContainer.position.y == 0 ? -Constants.Objects.spriteHeight : Constants.Objects.spriteHeight);
            var viewportYEnd = -mapContainer.position.y + Constants.Screen.height - 1.5 * Constants.Objects.spriteHeight;
            
            return !(unitCords.x < viewportXStart || unitCords.x > viewportXEnd || unitCords.y < viewportYStart || unitCords.y > viewportYEnd);
        }

        this.getUnitCoordinates = function (logicX, logicY) {
            return {
                x: logicX * (Constants.Objects.spriteWidth / 2), 
                y: (logicX % 2 == 0 ? 0 : (Constants.Objects.spriteHeight / 2)) + logicY * Constants.Objects.spriteHeight - Constants.Objects.spriteHeight / 2
            };
        }
    }
})