define(function (require){
    require('app/constants');
    require('app/terrain');

    Mapgenerator = function() {
        this.generate = function(mapSize) {
            var size = mapSize || Constants.Map.logicalSize;
            return generateTerrainMap(size, 1, 4);
        }
    }
})