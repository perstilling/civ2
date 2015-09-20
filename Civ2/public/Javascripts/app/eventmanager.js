/* Setups managers and switches between scenes */

define(function (require) {
    Eventmanager = function () {
        var that = this;
        this.graphicsManager = null;
        this.onMapTileClicked = function (interaction) {
            that.graphicsManager.moveCameraAbs(interaction.target.position.x, interaction.target.position.y);
        };
    }
})