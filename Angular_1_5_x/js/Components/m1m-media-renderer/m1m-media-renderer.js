var angular		= require( "angular" ),
    CommModule  = require( "../../Services/CommModule.js" ),
    template    = require( "./m1m-media-renderer.html" )
    ;

module.exports = "m1m-media-renderer-Module";

function controller($scope, CommService) {
    var $ctrl = this;
    this.play = function() {
        CommService.play( $ctrl.nf.id );
    }
}
controller.$inject = ["$scope", "CommService"];

angular .module     ( module.exports, [CommModule] )
    .component  ( "m1mMediaRenderer", {
        controller  : controller,
        bindings    : {nf: "<"},
        template	: template
});
