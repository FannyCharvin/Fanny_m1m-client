System.register(["@angular/core", "../Services/CommService", "hammerjs"], function(exports_1, context_1) {
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
            },
            function (_1) {}],
        execute: function() {
            (function (PLAY_STATE) {
                PLAY_STATE[PLAY_STATE["PLAY"] = 0] = "PLAY";
                PLAY_STATE[PLAY_STATE["PAUSE"] = 1] = "PAUSE";
                PLAY_STATE[PLAY_STATE["STOP"] = 2] = "STOP";
            })(PLAY_STATE || (PLAY_STATE = {}));
            M1mMediaRenderer = class M1mMediaRenderer {
                // tapped      = false;
                constructor(cs) {
                    this.cs = cs;
                    this.duration = "";
                    this.mute = false;
                    this.volume = 0;
                    this.playState = PLAY_STATE.STOP;
                    this.missedEvent = [];
                    //
                }
                processEvent(event) {
                    let data = event.data;
                    console.log("M1mMediaRenderer UPnP event", event.data.attribut);
                    this.state[data.serviceType][data.attribut] = data.value;
                    this.updateRenderingControl(this.state["urn:schemas-upnp-org:service:RenderingControl:1"]);
                    this.updateAVTransport(this.state["urn:schemas-upnp-org:service:AVTransport:1"]);
                    //
                    if (data.serviceType === "UPnP_Media" && data.attribut === "itemMetadata") {
                        this.currentMedia = this.cs.getMediaFromDIDL(data.value);
                    }
                }
                ngOnInit() {
                    // From TActHab
                    this.obsEvent = this.cs.subscribe(this.nf.id);
                    this.obsEvent.subscribe((event) => {
                        if (!this.state) {
                            this.missedEvent.push(event);
                        }
                        else {
                            this.processEvent(event);
                        }
                    });
                    this.cs.call(this.nf.id, "getMediasStates", []).then((state) => {
                        console.log("getMediasStates =>", state);
                        this.state = state;
                        let AVTransport = this.state["urn:schemas-upnp-org:service:AVTransport:1"], RenderingControl = this.state["urn:schemas-upnp-org:service:RenderingControl:1"], UPnP_Media = this.state["UPnP_Media"];
                        this.updateRenderingControl(RenderingControl);
                        this.updateAVTransport(AVTransport);
                        if (UPnP_Media && UPnP_Media.itemMetadata) {
                            this.currentMedia = this.cs.getMediaFromDIDL(UPnP_Media.itemMetadata);
                        }
                        // Process missed events
                        this.missedEvent.forEach(e => this.processEvent(e));
                        this.missedEvent = [];
                    });
                }
                Log(str) {
                    console.log("Log:", str);
                }
                /*toggleTap() {
                    this.tapped = !this.tapped;
                }*/
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvbTFtLW1lZGlhLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXdDQSxXQUFLLFVBQVU7Z0JBQUUsMkNBQUksQ0FBQTtnQkFBRSw2Q0FBSyxDQUFBO2dCQUFFLDJDQUFJLENBQUE7WUFBQSxDQUFDLEVBQTlCLFVBQVUsS0FBVixVQUFVLFFBQW9CO1lBT25DO2dCQWFJLHVCQUF1QjtnQkFDdkIsWUFBb0IsRUFBZTtvQkFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO29CQVJuQyxhQUFRLEdBQWtCLEVBQUUsQ0FBQztvQkFFN0IsU0FBSSxHQUFzQixLQUFLLENBQUM7b0JBQ2hDLFdBQU0sR0FBb0IsQ0FBQyxDQUFDO29CQUU1QixjQUFTLEdBQWlCLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQzFDLGdCQUFXLEdBQW1CLEVBQUUsQ0FBQztvQkFHN0IsRUFBRTtnQkFDTixDQUFDO2dCQUNELFlBQVksQ0FBQyxLQUFrQjtvQkFDM0IsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBRSw2QkFBNkIsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO29CQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDekQsSUFBSSxDQUFDLHNCQUFzQixDQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQyxDQUFDO29CQUM3RixJQUFJLENBQUMsaUJBQWlCLENBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFNLENBQUM7b0JBQzdGLEVBQUU7b0JBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLFFB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Y2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbVNlcnZpY2UsIE1lZGlhUmVuZGVyZXIsIE1lZGlhfSBmcm9tIFwiLi4vU2VydmljZXMvQ29tbVNlcnZpY2VcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCBcImhhbW1lcmpzXCI7XG5cbnR5cGUgUmVuZGVyaW5nQ29udHJvbFR5cGUgPSB7XG4gICAgTXV0ZSAgICAgICAgICAgIDogc3RyaW5nOyAvLyBcIjBcIiBvdSBcIjFcIlxuICAgIFByZXNldE5hbWVMaXN0ICA6IHN0cmluZzsgLy8gZXg6IFwiRmFjdG9yeURlZmF1bHRzXCJcbiAgICBWb2x1bWUgICAgICAgICAgOiBzdHJpbmc7IC8vIFwiMFwiIMOgIFwiMTAwXCJcbiAgICBWb2x1bWVEQiAgICAgICAgOiBzdHJpbmc7IC8vIGTDqWR1Y3Rpb24gZGVzIGTDqWNpYmVscywgb3Bwb3PDqSBkZSBWb2x1bWVcbn07XG50eXBlIEFWVHJhbnNwb3J0VHlwZSA9IHtcbiAgICBBVlRyYW5zcG9ydFVSSSAgICAgICAgICAgICAgOiBzdHJpbmc7IC8vIFVSSSBkdSBtw6lkaWFcbiAgICBBVlRyYW5zcG9ydFVSSU1ldGFEYXRhICAgICAgOiBzdHJpbmc7IC8vIFJlcHLDqXNlbnRlIGxlIERJREwtTGl0ZSBkdSBtw6lkaWFcbiAgICBDdXJyZW50TWVkaWFEdXJhdGlvbiAgICAgICAgOiBzdHJpbmc7IC8vIEZvcm1hdCB0eXBlIFwiMDE6MzY6NTBcIlxuICAgIEN1cnJlbnRQbGF5TW9kZSAgICAgICAgICAgICA6IHN0cmluZzsgLy8gZXg6IFwiTk9STUFMXCJcbiAgICBDdXJyZW50UmVjb3JkUXVhbGl0eU1vZGUgICAgOiBzdHJpbmc7IC8vIGV4OiBcIk5PVF9JTVBMRU1FTlRFRFwiXG4gICAgQ3VycmVudFRyYWNrICAgICAgICAgICAgICAgIDogc3RyaW5nOyAvLyBleDogXCIxXCJcbiAgICBDdXJyZW50VHJhY2tEdXJhdGlvbiAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIjAxOjM2OjUwXCJcbiAgICBDdXJyZW50VHJhY2tNZXRhRGF0YSAgICAgICAgOiBzdHJpbmc7IC8vIFJlcHLDqXNlbnRlIGxlIERJREwtTGl0ZSBkZSBsYSBwaXN0ZVxuICAgIEN1cnJlbnRUcmFja1VSSSAgICAgICAgICAgICA6IHN0cmluZzsgLy8gVVJJIGRlIGxhIHBpc3RlXG4gICAgQ3VycmVudFRyYW5zcG9ydEFjdGlvbnMgICAgIDogc3RyaW5nOyAvLyBBY3Rpb25zIHBvc3NpYmxlLCBleDogXCJQbGF5LFBhdXNlLFN0b3AsU2VlayxOZXh0LFByZXZpb3VzXCJcbiAgICBOZXh0QVZUcmFuc3BvcnRVUkkgICAgICAgICAgOiBzdHJpbmc7IC8vIFByb2NoYWluZSBVUklcbiAgICBOZXh0QVZUcmFuc3BvcnRVUklNZXRhRGF0YSAgOiBzdHJpbmc7IC8vIFByb2NoYWluIERJRExcbiAgICBOdW1iZXJPZlRyYWNrcyAgICAgICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIjFcIlxuICAgIFBsYXliYWNrU3RvcmFnZU1lZGl1bSAgICAgICA6IHN0cmluZzsgLy8gZXg6IFwiTk9ORVwiXG4gICAgUG9zc2libGVQbGF5YmFja1N0b3JhZ2VNZWRpYTogc3RyaW5nOyAvLyBleCBcIk5PTkUsTkVUV09SSyxIREQsQ0QtREEsVU5LTk9XTlwiXG4gICAgUG9zc2libGVSZWNvcmRRdWFsaXR5TW9kZXMgIDogc3RyaW5nOyAvLyBleDogXCJOT1RfSU1QTEVNRU5URURcIlxuICAgIFBvc3NpYmxlUmVjb3JkU3RvcmFnZU1lZGlhICA6IHN0cmluZzsgLy8gZXggXCJOT1RfSU1QTEVNRU5URURcIlxuICAgIFJlY29yZE1lZGl1bVdyaXRlU3RhdHVzICAgICA6IHN0cmluZzsgLy8gZXg6IFwiTk9UX0lNUExFTUVOVEVEXCJcbiAgICBSZWNvcmRTdG9yYWdlTWVkaXVtICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIk5PVF9JTVBMRU1FTlRFRFwiXG4gICAgVHJhbnNwb3J0UGxheVNwZWVkICAgICAgICAgIDogc3RyaW5nOyAvLyBleDogXCIxXCJcbiAgICBUcmFuc3BvcnRTdGF0ZSAgICAgICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIlBBVVNFRF9QTEFZQkFDS1wiXG4gICAgVHJhbnNwb3J0U3RhdHVzICAgICAgICAgICAgIDogc3RyaW5nOyAvLyBleDogXCJPS1wiXG59O1xudHlwZSBldmVudE1lZGlhUGxheWVyID0ge1xuICAgIHNlcnZpY2VUeXBlIDogc3RyaW5nO1xuICAgIGF0dHJpYnV0ICAgIDogc3RyaW5nO1xuICAgIHZhbHVlICAgICAgIDogbnVtYmVyIHwgc3RyaW5nO1xufTtcbmVudW0gUExBWV9TVEFURSB7UExBWSwgUEFVU0UsIFNUT1B9XG50eXBlIGV2ZW50UGxheWVyID0ge2V2ZW50TmFtZTogc3RyaW5nLCBkYXRhOiBldmVudE1lZGlhUGxheWVyfTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yXHRcdDogXCJtMW0tbWVkaWEtcmVuZGVyZXJcIixcbiAgICB0ZW1wbGF0ZVVybFx0XHQ6IFwidHMvQ29tcG9uZW50cy9tMW0tbWVkaWEtcmVuZGVyZXIuaHRtbFwiLFxuICAgIHN0eWxlVXJscyAgICAgICA6IFsgXCJ0cy9Db21wb25lbnRzL20xbS1tZWRpYS1yZW5kZXJlci5jc3NcIiBdXG59KVxuZXhwb3J0IGNsYXNzIE0xbU1lZGlhUmVuZGVyZXIgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIG5mXHQ6IE1lZGlhUmVuZGVyZXI7XG4gICAgb2JzRXZlbnQgICAgOiBPYnNlcnZhYmxlPGFueT47XG4gICAgc3RhdGUgICAgICAgOiB7IFwidXJuOnNjaGVtYXMtdXBucC1vcmc6c2VydmljZTpBVlRyYW5zcG9ydDoxXCIgICAgICAgIDogQVZUcmFuc3BvcnRUeXBlO1xuICAgICAgICAgICAgICAgICAgICBcInVybjpzY2hlbWFzLXVwbnAtb3JnOnNlcnZpY2U6UmVuZGVyaW5nQ29udHJvbDoxXCIgICA6IFJlbmRlcmluZ0NvbnRyb2xUeXBlO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICBkdXJhdGlvbiAgICA6IHN0cmluZyAgICA9IFwiXCI7XG4gICAgY3VycmVudE1lZGlhOiBNZWRpYTtcbiAgICBtdXRlICAgICAgICA6IGJvb2xlYW4gICA9IGZhbHNlO1xuICAgIHZvbHVtZSAgICAgIDogbnVtYmVyICAgID0gMDtcbiAgICB0aW1lb3V0Vm9sICA6IG51bWJlcjtcbiAgICBwbGF5U3RhdGUgICA6IFBMQVlfU1RBVEU9IFBMQVlfU1RBVEUuU1RPUDtcbiAgICBtaXNzZWRFdmVudCA6IGV2ZW50UGxheWVyW10gPSBbXTtcbiAgICAvLyB0YXBwZWQgICAgICA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3M6IENvbW1TZXJ2aWNlKSB7XG4gICAgICAgIC8vXG4gICAgfVxuICAgIHByb2Nlc3NFdmVudChldmVudDogZXZlbnRQbGF5ZXIpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBldmVudC5kYXRhO1xuICAgICAgICBjb25zb2xlLmxvZyggXCJNMW1NZWRpYVJlbmRlcmVyIFVQblAgZXZlbnRcIiwgZXZlbnQuZGF0YS5hdHRyaWJ1dCApO1xuICAgICAgICB0aGlzLnN0YXRlW2RhdGEuc2VydmljZVR5cGVdW2RhdGEuYXR0cmlidXRdID0gZGF0YS52YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVSZW5kZXJpbmdDb250cm9sICggdGhpcy5zdGF0ZVtcInVybjpzY2hlbWFzLXVwbnAtb3JnOnNlcnZpY2U6UmVuZGVyaW5nQ29udHJvbDoxXCJdKTtcbiAgICAgICAgdGhpcy51cGRhdGVBVlRyYW5zcG9ydCAgICAgICggdGhpcy5zdGF0ZVtcInVybjpzY2hlbWFzLXVwbnAtb3JnOnNlcnZpY2U6QVZUcmFuc3BvcnQ6MVwiXSAgICAgKTtcbiAgICAgICAgLy9cbiAgICAgICAgaWYgKGRhdGEuc2VydmljZVR5cGUgPT09IFwiVVBuUF9NZWRpYVwiICYmIGRhdGEuYXR0cmlidXQgPT09IFwiaXRlbU1ldGFkYXRhXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1lZGlhID0gdGhpcy5jcy5nZXRNZWRpYUZyb21ESURMKCBkYXRhLnZhbHVlIGFzIHN0cmluZyApO1xuICAgICAgICB9XG4gICAgfVxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBGcm9tIFRBY3RIYWJcbiAgICAgICAgdGhpcy5vYnNFdmVudCA9IHRoaXMuY3Muc3Vic2NyaWJlKCB0aGlzLm5mLmlkICk7XG4gICAgICAgIHRoaXMub2JzRXZlbnQuc3Vic2NyaWJlKCAoZXZlbnQ6IGV2ZW50UGxheWVyKSA9PiB7XG4gICAgICAgICAgICBpZiggIXRoaXMuc3RhdGUgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taXNzZWRFdmVudC5wdXNoKCBldmVudCApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NFdmVudChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNzLmNhbGwodGhpcy5uZi5pZCwgXCJnZXRNZWRpYXNTdGF0ZXNcIiwgW10pLnRoZW4oIChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coIFwiZ2V0TWVkaWFzU3RhdGVzID0+XCIsIHN0YXRlICk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICBsZXQgQVZUcmFuc3BvcnQgICAgICA9IHRoaXMuc3RhdGVbXCJ1cm46c2NoZW1hcy11cG5wLW9yZzpzZXJ2aWNlOkFWVHJhbnNwb3J0OjFcIl0sXG4gICAgICAgICAgICAgICAgUmVuZGVyaW5nQ29udHJvbCA9IHRoaXMuc3RhdGVbXCJ1cm46c2NoZW1hcy11cG5wLW9yZzpzZXJ2aWNlOlJlbmRlcmluZ0NvbnRyb2w6MVwiXSxcbiAgICAgICAgICAgICAgICBVUG5QX01lZGlhICAgICAgID0gdGhpcy5zdGF0ZVtcIlVQblBfTWVkaWFcIl07XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlbmRlcmluZ0NvbnRyb2wgKCBSZW5kZXJpbmdDb250cm9sICk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFWVHJhbnNwb3J0ICAgICAgKCBBVlRyYW5zcG9ydCAgICAgICk7XG4gICAgICAgICAgICBpZiAoIFVQblBfTWVkaWEgJiYgVVBuUF9NZWRpYS5pdGVtTWV0YWRhdGEgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWVkaWEgPSB0aGlzLmNzLmdldE1lZGlhRnJvbURJREwoIFVQblBfTWVkaWEuaXRlbU1ldGFkYXRhICk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50TWVkaWEuZHVyYXRpb24gPSBBVlRyYW5zcG9ydC5DdXJyZW50TWVkaWFEdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFByb2Nlc3MgbWlzc2VkIGV2ZW50c1xuICAgICAgICAgICAgdGhpcy5taXNzZWRFdmVudC5mb3JFYWNoKCBlID0+IHRoaXMucHJvY2Vzc0V2ZW50KGUpICk7XG4gICAgICAgICAgICB0aGlzLm1pc3NlZEV2ZW50ID0gW107XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBMb2coc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2c6XCIsIHN0cik7XG4gICAgfVxuICAgIC8qdG9nZ2xlVGFwKCkge1xuICAgICAgICB0aGlzLnRhcHBlZCA9ICF0aGlzLnRhcHBlZDtcbiAgICB9Ki9cbiAgICB1cGRhdGVSZW5kZXJpbmdDb250cm9sKHJlbmRlcmluZ0NvbnRyb2w6IFJlbmRlcmluZ0NvbnRyb2xUeXBlKSB7XG4gICAgICAgIGlmKCFyZW5kZXJpbmdDb250cm9sKSByZXR1cm47XG4gICAgICAgIHRoaXMubXV0ZSAgID0gcmVuZGVyaW5nQ29udHJvbC5NdXRlID09PSBcIjFcIiB8fCByZW5kZXJpbmdDb250cm9sLk11dGUgPT09IFwidHJ1ZVwiO1xuICAgICAgICB0aGlzLnZvbHVtZSA9K3JlbmRlcmluZ0NvbnRyb2wuVm9sdW1lO1xuICAgIH1cbiAgICB1cGRhdGVBVlRyYW5zcG9ydChBVlRyYW5zcG9ydDogQVZUcmFuc3BvcnRUeXBlKSB7XG4gICAgICAgIGlmKCFBVlRyYW5zcG9ydCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gQVZUcmFuc3BvcnQuQ3VycmVudE1lZGlhRHVyYXRpb247XG4gICAgICAgIHN3aXRjaChBVlRyYW5zcG9ydC5UcmFuc3BvcnRTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlNUT1BQRURcIiAgICAgICAgICA6IHRoaXMucGxheVN0YXRlID0gUExBWV9TVEFURS5TVE9QIDsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUExBWUlOR1wiICAgICAgICAgIDogdGhpcy5wbGF5U3RhdGUgPSBQTEFZX1NUQVRFLlBMQVkgOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQQVVTRURfUExBWUJBQ0tcIiAgOiB0aGlzLnBsYXlTdGF0ZSA9IFBMQVlfU1RBVEUuUEFVU0U7IGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFZvbHVtZSh2b2x1bWU6IG51bWJlcikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyggXCJzZXRWb2x1bWVcIiwgdm9sdW1lICk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRWb2wpO1xuICAgICAgICB0aGlzLnRpbWVvdXRWb2wgPSB3aW5kb3cuc2V0VGltZW91dCAoICgpID0+IHRoaXMuY3Muc2V0Vm9sdW1lKHRoaXMubmYuaWQsIHZvbHVtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCA1MCApO1xuICAgIH1cbiAgICBpc1BsYXlpbmcoKSA6IGJvb2xlYW4ge3JldHVybiB0aGlzLnBsYXlTdGF0ZSA9PT0gUExBWV9TVEFURS5QTEFZIDt9XG4gICAgaXNQYXVzZWQgKCkgOiBib29sZWFuIHtyZXR1cm4gdGhpcy5wbGF5U3RhdGUgPT09IFBMQVlfU1RBVEUuUEFVU0U7fVxuICAgIGlzU3RvcHBlZCgpIDogYm9vbGVhbiB7cmV0dXJuIHRoaXMucGxheVN0YXRlID09PSBQTEFZX1NUQVRFLlNUT1AgO31cbiAgICBwbGF5KCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5wbGF5KCB0aGlzLm5mLmlkICk7XG4gICAgfVxuICAgIHBhdXNlKCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5wYXVzZSggdGhpcy5uZi5pZCApO1xuICAgIH1cbiAgICBzdG9wKCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5zdG9wKCB0aGlzLm5mLmlkICk7XG4gICAgfVxuICAgIGlzTWVkaWEob2JqOiBhbnkpIDogYm9vbGVhbiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNNZWRpYVwiLCBvYmopO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9hZE1lZGlhKG1lZGlhOiBNZWRpYSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5mLmlkLCBcImxvYWRNZWRpYVwiLCBtZWRpYS5zZXJ2ZXJJZCwgbWVkaWEubWVkaWFJZCk7XG4gICAgICAgIHRoaXMuY3MubG9hZE1lZGlhKCB0aGlzLm5mLmlkLCBtZWRpYS5zZXJ2ZXJJZCwgbWVkaWEubWVkaWFJZCApLnRoZW4oIChyZXApID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVwOlwiLCByZXApO1xuICAgICAgICAgICAgdGhpcy5wbGF5KCkudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFN1YnNjcmliZSB0byBtZWRpYSBzZXJ2ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
