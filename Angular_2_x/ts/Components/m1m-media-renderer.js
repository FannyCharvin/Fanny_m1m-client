System.register(["@angular/core", "../Services/CommService"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, CommService_1;
    var PLAY_STATE, M1mMediaRenderer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            }],
        execute: function() {
            (function (PLAY_STATE) {
                PLAY_STATE[PLAY_STATE["PLAY"] = 0] = "PLAY";
                PLAY_STATE[PLAY_STATE["PAUSE"] = 1] = "PAUSE";
                PLAY_STATE[PLAY_STATE["STOP"] = 2] = "STOP";
            })(PLAY_STATE || (PLAY_STATE = {}));
            let M1mMediaRenderer = class M1mMediaRenderer {
                constructor(cs) {
                    this.cs = cs;
                    this.duration = "";
                    this.mute = false;
                    this.volume = 0;
                    this.playState = PLAY_STATE.STOP;
                    // console.log( "CommService:", cs);
                }
                ngOnInit() {
                    this.obsEvent = this.cs.subscribe(this.nf.id);
                    this.obsEvent.subscribe((event) => {
                        let data = event.data;
                        //console.log( "M1mMediaRenderer UPnP event", event );
                        this.state[data.serviceType][data.attribut] = data.value;
                        this.updateRenderingControl(this.state["urn:schemas-upnp-org:service:RenderingControl:1"]);
                        this.updateAVTransport(this.state["urn:schemas-upnp-org:service:AVTransport:1"]);
                    });
                    this.cs.call(this.nf.id, "getMediasStates", []).then((state) => {
                        //console.log( "getMediasStates =>", state );
                        this.state = state;
                        this.updateRenderingControl(this.state["urn:schemas-upnp-org:service:RenderingControl:1"]);
                        this.updateAVTransport(this.state["urn:schemas-upnp-org:service:AVTransport:1"]);
                    });
                }
                updateRenderingControl(renderingControl) {
                    if (!renderingControl)
                        return;
                    this.mute = renderingControl.Mute === "1" || renderingControl.Mute === "true";
                    this.volume = +renderingControl.Volume;
                }
                updateAVTransport(AVTransport) {
                    if (!AVTransport)
                        return;
                    this.duration = AVTransport.CurrentMediaDuration;
                    switch (AVTransport.TransportState) {
                        case "STOPPED":
                            this.playState = PLAY_STATE.STOP;
                            break;
                        case "PLAYING":
                            this.playState = PLAY_STATE.PLAY;
                            break;
                        case "PAUSED_PLAYBACK":
                            this.playState = PLAY_STATE.PAUSE;
                            break;
                    }
                }
                setVolume(volume) {
                    // console.log( "setVolume", volume );
                    clearTimeout(this.timeoutVol);
                    this.timeoutVol = window.setTimeout(() => this.cs.setVolume(this.nf.id, volume), 50);
                }
                isPlaying() { return this.playState === PLAY_STATE.PLAY; }
                isPaused() { return this.playState === PLAY_STATE.PAUSE; }
                isStopped() { return this.playState === PLAY_STATE.STOP; }
                play() {
                    return this.cs.play(this.nf.id);
                }
                pause() {
                    return this.cs.pause(this.nf.id);
                }
                stop() {
                    return this.cs.stop(this.nf.id);
                }
                isMedia(obj) {
                    console.log("isMedia", obj);
                    return true;
                }
                loadMedia(media) {
                    console.log(this.nf.id, "loadMedia", media.serverId, media.mediaId);
                    this.cs.loadMedia(this.nf.id, media.serverId, media.mediaId).then((rep) => {
                        console.log("rep:", rep);
                        this.play().then(() => {
                            // Subscribe to media server
                        });
                    });
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], M1mMediaRenderer.prototype, "nf", void 0);
            M1mMediaRenderer = __decorate([
                core_1.Component({
                    selector: "m1m-media-renderer",
                    templateUrl: "ts/Components/m1m-media-renderer.html",
                    styleUrls: ["ts/Components/m1m-media-renderer.css"]
                }), 
                __metadata('design:paramtypes', [CommService_1.CommService])
            ], M1mMediaRenderer);
            exports_1("M1mMediaRenderer", M1mMediaRenderer);
        }
    }
});
//# sourceMappingURL=m1m-media-renderer.js.map