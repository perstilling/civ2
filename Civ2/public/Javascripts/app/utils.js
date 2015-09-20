define(function (require) {
    Utils =  {
        getTerrainTexture : function (terrain) {
            return '/images/terrain/' + terrain + '.png';
        },
        getUnitTexture : function (unit) {
            return '/images/units/' + unit + '.png';
        }
    }
})