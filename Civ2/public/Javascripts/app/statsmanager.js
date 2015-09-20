/* Controls FPS stats */

define(function (require) {
    require('stats');
    
    Statsmanager = {
        stats : null,
        initialize : function () {
            this.stats = new Stats()
            document.body.appendChild(this.stats.domElement);
            this.stats.domElement.style.position = "absolute";
            this.stats.domElement.style.top = "0px";
        },
        begin : function () {
            if (this.stats == null)
                this.initialize();
            this.stats.begin();
        },
        end : function () {
            this.stats.end();
        }
    }
})