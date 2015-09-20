/* The game map, including all game objects */

define(function (require) {
    Map = function (width, height) {
        var that = this;
        this.mapWidth = width;
        this.mapHeight = height;

        this.mapArr = [];
        for (i = 0; i < this.mapWidth; i++) {
            
            mapArr[i] = [];
            for (j = 0; j < this.mapHeight; j++) {
                mapArr[i][j] = new Tile();
            }
        }

        this.addTerrain = function (tile, x, y) {
            mapArr[x][y] = tile;
        }

        this.addUnit = function (type, x, y) {

        }
    }
})