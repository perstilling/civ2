/* Setups managers and switches between scenes */

define(function (require){
    require('app/mapgenerator');
    require('app/state/gamestate');
    require('app/graphicsmanager');
    require('app/eventmanager');

    Gamemanager = function() {
        this.start = function() {
            // create game state
            var map = new Mapgenerator().generate();
            var gameState = new Gamestate();
            gameState.map = map;
            
            // create managers
            var graphicsManager = new Graphicsmanager();
            var eventManager = new Eventmanager();
            graphicsManager.eventManager = eventManager;
            eventManager.graphicsManager = graphicsManager;
            
            // activate game view
            graphicsManager.init();
            graphicsManager.renderGameView(gameState);
        }
    }
})