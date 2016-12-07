System.register(["@angular/core", "@angular/http", "./utils", "rxjs/Observable", "rxjs/add/operator/map"], function(exports_1, context_1) {
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
    var core_1, http_1, utils_1, Observable_1;
    var initDone, CommService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            initDone = false;
            CommService = class CommService {
                constructor(_http) {
                    this._http = _http;
                    this.mediaRenderers = [];
                    this.mediaServers = [];
                    this.parser = new DOMParser();
                }
                init(origin) {
                    origin = origin || location.origin;
                    if (initDone) {
                        throw "Cannot instantiate CommService multiple times...";
                    }
                    else {
                        initDone = true;
                    }
                    utils_1.utils.initIO(`${origin}/m2m`);
                    return this._http.get(`${origin}/getContext`).map((response) => {
                        if (response.status !== 200) {
                            console.error("Impossible to get context:", response);
                            return;
                        }
                        let context = JSON.parse(response.text());
                        for (let i in context.bricks) {
                            this.onbrickAppear(context.bricks[i]);
                        }
                        utils_1.utils.io.on("brickAppears", (brick) => {
                            console.log("brickAppears", brick);
                            this.onbrickAppear(brick);
                        });
                        utils_1.utils.io.on("brickDisappears", (data) => {
                            console.log("brick brickDisappears", data.brickId);
                            let index, hasId = function (brick, i) { index = i; return brick.id === data.brickId; };
                            if (this.mediaRenderers.find(hasId)) {
                                this.mediaRenderers.splice(index, 1);
                                if (this.onupdate) {
                                    this.onupdate("disappear", "BrickUPnP_MediaRenderer", data.brickId);
                                }
                            }
                            if (this.mediaServers.find(hasId)) {
                                this.mediaServers.splice(index, 1);
                                if (this.onupdate) {
                                    this.onupdate("disappear", "BrickUPnP_MediaServer", data.brickId);
                                }
                            }
                        });
                        return { mediaRenderers: this.mediaRenderers, mediaServers: this.mediaServers };
                    });
                }
                onbrickAppear(brick) {
                    if (brick.type.indexOf("BrickUPnP_MediaRenderer") >= 0) {
                        this.mediaRenderers.push(brick);
                        if (this.onupdate) {
                            this.onupdate("appear", "BrickUPnP_MediaRenderer", brick);
                        }
                    }
                    if (brick.type.indexOf("BrickUPnP_MediaServer") >= 0) {
                        this.mediaServers.push(brick);
                        if (this.onupdate) {
                            this.onupdate("appear", "BrickUPnP_MediaServer", brick);
                        }
                    }
                }
                call(objectId, method, params, cb) {
                    return utils_1.utils.call(objectId, method, params);
                }
                play(mediaRendererId) {
                    return utils_1.utils.call(mediaRendererId, "Play", []);
                }
                pause(mediaRendererId) {
                    return utils_1.utils.call(mediaRendererId, "Pause", []);
                }
                stop(mediaRendererId) {
                    return utils_1.utils.call(mediaRendererId, "Stop", []);
                }
                setVolume(mediaRendererId, volume) {
                    return utils_1.utils.call(mediaRendererId, "setVolume", [volume]);
                }
                loadMedia(mediaRendererId, mediaServerId, itemId) {
                    return utils_1.utils.call(mediaRendererId, "loadMedia", [mediaServerId, itemId]);
                }
                subscribe(brickId, eventName = "eventUPnP") {
                    return Observable_1.Observable.create((observer) => {
                        utils_1.utils.subscribeBrick(brickId, eventName, (data) => {
                            //console.log( "utils event", data );
                            observer.next(data);
                        });
                    });
                }
                getMediaFromDIDL(descr) {
                    let media, item;
                    if (typeof descr === "string") {
                        let doc = this.parser.parseFromString(descr, "text/xml");
                        item = doc ? doc.querySelector("item") : null;
                    }
                    else {
                        item = descr;
                    }
                    if (item) {
                        let node;
                        let res = item.querySelector("res");
                        media = {
                            serverId: undefined,
                            date: (node = item.querySelector("date")) ? node.textContent : "inconnue",
                            title: (node = item.querySelector("title")) ? node.textContent : "inconnu",
                            icon: (node = item.querySelector("icon")) ? node.textContent : "images/media_icon.jpg",
                            mediaId: item.getAttribute("id"),
                            creator: (node = item.querySelector("creator")) ? node.textContent : "inconnu",
                            actors: [],
                            genres: [],
                            albumarturi: (node = item.querySelector("albumarturi, albumArtURI, albumArtUri")) ? node.textContent : "",
                            description: (node = item.querySelector("description")) ? node.textContent : "",
                            longdescription: (node = item.querySelector("longdescription, longDescription")) ? node.textContent : "",
                            ressource: res ? res.textContent : "",
                            duration: res ? (res.getAttribute("duration") || "") : "",
                            size: res ? (+res.getAttribute("size") || 0) : 0,
                            resolution: res ? (res.getAttribute("resolution") || "") : "",
                            bitrate: res ? (+res.getAttribute("bitrate") || 0) : 0,
                            nrAudioChannels: res ? (+res.getAttribute("nrAudioChannels") || 0) : 0,
                            protocolInfo: res ? (res.getAttribute("protocolInfo") || "") : "",
                            classe: (node = item.querySelector("class")) ? node.textContent : ""
                        };
                        for (let actor of item.querySelectorAll("actor")) {
                            media.actors.push(actor.textContent);
                        }
                        for (let genre of item.querySelectorAll("genre")) {
                            media.genres.push(genre.textContent);
                        }
                    }
                    console.log("media =>", media);
                    return media;
                }
                browse(mediaServerId, directoryId = "0") {
                    return utils_1.utils.call(mediaServerId, "Browse", [directoryId]).then((dataString) => {
                        let dataBrowse = {
                            directoryId: directoryId,
                            directories: [],
                            medias: [],
                            error: null
                        };
                        try {
                            let doc = this.parser.parseFromString(dataString, "text/xml");
                            let Result = doc.querySelector("Result");
                            let ResultDoc = this.parser.parseFromString(Result.textContent, "text/xml");
                            console.log(ResultDoc);
                            // Parse containers
                            for (let container of ResultDoc.querySelectorAll("container")) {
                                let node;
                                dataBrowse.directories.push({
                                    serverId: mediaServerId,
                                    name: (node = container.querySelector("title")) ? node.textContent : "inconnu",
                                    iconURL: (node = container.querySelector("albumArtURI")) ? node.textContent : "",
                                    directoryId: container.getAttribute("id") });
                            } // End of containers parsing
                            // Parse item
                            for (let item of ResultDoc.querySelectorAll("item")) {
                                let media = this.getMediaFromDIDL(item);
                                media.serverId = mediaServerId;
                                if (media) {
                                    dataBrowse.medias.push(media);
                                }
                            } // End of items parsing
                        }
                        catch (err) {
                            dataBrowse.error = err;
                        }
                        return dataBrowse;
                    });
                }
            };
            CommService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], CommService);
            exports_1("CommService", CommService);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL0NvbW1TZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFxRUksUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBUixRQUFRLEdBQUcsS0FBSyxDQUFDO1lBRXJCO2dCQUtJLFlBQW9CLEtBQVc7b0JBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtvQkFKL0IsbUJBQWMsR0FBc0IsRUFBRSxDQUFDO29CQUN2QyxpQkFBWSxHQUF3QixFQUFFLENBQUM7b0JBSW5DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDbEMsQ0FBQztnQkFDRCxJQUFJLENBQUUsTUFBZTtvQkFDakIsTUFBTSxHQUFHLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO29CQUNuQyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUFBLE1BQU0sa0RBQWtELENBQUM7b0JBQUEsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFBQSxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2hHLGFBQUssQ0FBQyxNQUFNLENBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBRSxDQUFDO29CQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDLFFBQVE7d0JBQ3hELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFBQSxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUFDLE1BQU0sQ0FBQzt3QkFBQSxDQUFDO3dCQUM1RixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO3dCQUM1QyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQzs0QkFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7d0JBQzVDLENBQUM7d0JBQ0QsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUcsY0FBYyxFQUFFLENBQUMsS0FBa0M7NEJBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUUsY0FBYyxFQUFFLEtBQUssQ0FBRSxDQUFDOzRCQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFFLEtBQUssQ0FBRSxDQUFDO3dCQUNoQyxDQUFDLENBQUMsQ0FBQzt3QkFDSCxhQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBRyxpQkFBaUIsRUFBRSxDQUFFLElBQUk7NEJBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUNuRCxJQUFJLEtBQUssRUFBRSxLQUFLLEdBQUcsVUFBUyxLQUFLLEVBQUUsQ0FBQyxJQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQyxDQUFDOzRCQUNyRixFQUFFLENBQUEsQ0FBRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBRSxLQUFLLENBQUcsQ0FBQyxDQUFDLENBQUM7Z0NBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDckMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0NBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dDQUN4RSxDQUFDOzRCQUNMLENBQUM7NEJBQ0QsRUFBRSxDQUFBLENBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUksS0FBSyxDQUFHLENBQUMsQ0FBQyxDQUFDO2dDQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBQ25DLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29DQUNmLElBQUksQ0FBQyxRQUFRLENBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFJLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQztnQ0FDMUUsQ0FBQzs0QkFDTCxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFDO3dCQUNILE1BQU0sQ0FBQyxFQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUM7b0JBQ2xGLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ0QsYUFBYSxDQUFDLEtBQWtDO29CQUM1QyxFQUFFLENBQUEsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3RELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFpQixLQUFLLENBQUUsQ0FBQzt3QkFDakQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBRSxRQUFRLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxDQUFFLENBQUM7d0JBQUEsQ0FBQztvQkFDcEYsQ0FBQztvQkFDRCxFQUFFLENBQUEsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFlLEtBQUssQ0FBRSxDQUFDO3dCQUM3QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFBQSxJQUFJLENBQUMsUUFBUSxDQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLENBQUUsQ0FBQzt3QkFBQSxDQUFDO29CQUNsRixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLE1BQWEsRUFBRSxFQUFxQjtvQkFDdkUsTUFBTSxDQUFDLGFBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztnQkFDRCxJQUFJLENBQUMsZUFBdUI7b0JBQ3hCLE1BQU0sQ0FBQyxhQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBQ0QsS0FBSyxDQUFDLGVBQXVCO29CQUN6QixNQUFNLENBQUMsYUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUNELElBQUksQ0FBQyxlQUF1QjtvQkFDeEIsTUFBTSxDQUFDLGFBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFDRCxTQUFTLENBQUMsZUFBdUIsRUFBRSxNQUFjO29CQUM3QyxNQUFNLENBQUMsYUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztnQkFDRCxTQUFTLENBQUMsZUFBdUIsRUFBRSxhQUFxQixFQUFFLE1BQWM7b0JBQ3BFLE1BQU0sQ0FBQyxhQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDN0UsQ0FBQztnQkFDRCxTQUFTLENBQUMsT0FBZSxFQUFFLFNBQVMsR0FBVyxXQUFXO29CQUN0RCxNQUFNLENBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUUsQ0FBQyxRQUEwQjt3QkFDakQsYUFBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsSUFBWTs0QkFDbEQscUNBQXFDOzRCQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO3dCQUMxQixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELGdCQUFnQixDQUFFLEtBQXVCO29CQUNyQyxJQUFJLEtBQWEsRUFBRSxJQUFjLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLElBQUksR0FBRyxHQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFFLEtBQUssRUFBRSxVQUFVLENBQUUsQ0FBQzt3QkFDN0QsSUFBSSxHQUFHLEdBQUcsR0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFDLElBQUksQ0FBQztvQkFDOUMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUNqQixDQUFDO29CQUNELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ04sSUFBSSxJQUFhLENBQUM7d0JBQ2xCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3BDLEtBQUssR0FBRzs0QkFDSixRQUFRLEVBQVUsU0FBUzs0QkFDM0IsSUFBSSxFQUFjLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLFVBQVU7NEJBQy9FLEtBQUssRUFBYSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxTQUFTOzRCQUMvRSxJQUFJLEVBQWMsQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsdUJBQXVCOzRCQUM1RixPQUFPLEVBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7NEJBQ3pDLE9BQU8sRUFBVyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxTQUFTOzRCQUNqRixNQUFNLEVBQVksRUFBRTs0QkFDcEIsTUFBTSxFQUFZLEVBQUU7NEJBQ3BCLFdBQVcsRUFBTyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLEVBQUU7NEJBQ3hHLFdBQVcsRUFBTyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxFQUFFOzRCQUM5RSxlQUFlLEVBQUcsQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxFQUFFOzRCQUNuRyxTQUFTLEVBQVMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUMsRUFBRTs0QkFDeEMsUUFBUSxFQUFVLEdBQUcsR0FBQyxDQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFRLElBQUUsRUFBRSxDQUFDLEdBQUMsRUFBRTs0QkFDbkUsSUFBSSxFQUFjLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQVksSUFBRSxDQUFDLENBQUUsR0FBQyxDQUFDOzRCQUNsRSxVQUFVLEVBQVEsR0FBRyxHQUFDLENBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQU0sSUFBRSxFQUFFLENBQUMsR0FBQyxFQUFFOzRCQUNuRSxPQUFPLEVBQVcsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBUyxJQUFFLENBQUMsQ0FBRSxHQUFDLENBQUM7NEJBQ2xFLGVBQWUsRUFBRyxHQUFHLEdBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBRSxDQUFDLENBQUUsR0FBQyxDQUFDOzRCQUNsRSxZQUFZLEVBQU0sR0FBRyxHQUFDLENBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUksSUFBRSxFQUFFLENBQUMsR0FBQyxFQUFFOzRCQUNuRSxNQUFNLEVBQVksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsRUFBRTt5QkFDM0UsQ0FBQzt3QkFDRixHQUFHLENBQUEsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUUsT0FBTyxDQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNoRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxLQUFLLENBQUMsV0FBVyxDQUFFLENBQUM7d0JBQzNDLENBQUM7d0JBQ0QsR0FBRyxDQUFBLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFFLE9BQU8sQ0FBRSxDQUFDLENBQUMsQ0FBQzs0QkFDaEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBRSxDQUFDO3dCQUMzQyxDQUFDO29CQUNMLENBQUM7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLGFBQXFCLEVBQUUsV0FBVyxHQUFXLEdBQUc7b0JBQ25ELE1BQU0sQ0FBQyxhQUFLLENBQUMsSUFBSSxDQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBRSxDQUFDLFVBQVU7d0JBQ3pFLElBQUksVUFBVSxHQUFnQjs0QkFDMUIsV0FBVyxFQUFHLFdBQVc7NEJBQ3pCLFdBQVcsRUFBRyxFQUFFOzRCQUNoQixNQUFNLEVBQVEsRUFBRTs0QkFDaEIsS0FBSyxFQUFTLElBQUk7eUJBQ3JCLENBQUM7d0JBQ0YsSUFBSSxDQUFDOzRCQUNELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFFLFVBQVUsRUFBRSxVQUFVLENBQUUsQ0FBQzs0QkFDeEUsSUFBSSxNQUFNLEdBQVEsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDOUMsSUFBSSxTQUFTLEdBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQzs0QkFDOUUsT0FBTyxDQUFDLEdBQUcsQ0FBRSxTQUFTLENBQUUsQ0FBQzs0QkFFekIsbUJBQW1COzRCQUNuQixHQUFHLENBQUEsQ0FBQyxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMzRCxJQUFJLElBQWMsQ0FBQztnQ0FDbkIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUU7b0NBQ3pCLFFBQVEsRUFBTSxhQUFhO29DQUMzQixJQUFJLEVBQVUsQ0FBQyxJQUFJLEdBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsU0FBUztvQ0FDaEYsT0FBTyxFQUFPLENBQUMsSUFBSSxHQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFDLEVBQUU7b0NBQy9FLFdBQVcsRUFBRyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUUsQ0FBQzs0QkFDdEQsQ0FBQyxDQUFDLDRCQUE0Qjs0QkFFOUIsYUFBYTs0QkFDYixHQUFHLENBQUEsQ0FBQyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDO2dDQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29DQUNSLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNsQyxDQUFDOzRCQUNMLENBQUMsQ0FBQyx1QkFBdUI7d0JBQzdCLENBQUU7d0JBQUEsS0FBSyxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFBQSxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzt3QkFBQSxDQUFDO3dCQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQUEsQ0FBQztZQTNKRjtnQkFBQyxpQkFBVSxFQUFFOzsyQkFBQTtZQUNiLHFDQTBKRSxDQUFBIiwiZmlsZSI6IlNlcnZpY2VzL0NvbW1TZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gXCJyeGpzL09ic2VydmVyXCI7XG4vLyBpbXBvcnQgXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuLy8gZXhwb3J0XG5leHBvcnQgaW50ZXJmYWNlIEJyaWNrIHtcbiAgICBpZCAgICAgIDogc3RyaW5nO1xuICAgIG5hbWUgICAgOiBzdHJpbmc7XG4gICAgdHlwZSAgICA6IHN0cmluZ1tdO1xufVxuZXhwb3J0IGludGVyZmFjZSBNZWRpYVJlbmRlcmVyIGV4dGVuZHMgQnJpY2sge1xuICAgIGljb25VUkwgOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhU2VydmVyICAgZXh0ZW5kcyBCcmljayB7XG4gICAgaWNvblVSTCAgICAgOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIERhdGFEbG5hRGV2aWNlcyB7XG4gICAgbWVkaWFSZW5kZXJlcnMgIDogTWVkaWFSZW5kZXJlcltdO1xuICAgIG1lZGlhU2VydmVycyAgICA6IE1lZGlhU2VydmVyICBbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3Rvcnkge1xuICAgIHNlcnZlcklkICAgIDogc3RyaW5nO1xuICAgIG5hbWUgICAgICAgIDogc3RyaW5nO1xuICAgIGljb25VUkwgICAgIDogc3RyaW5nO1xuICAgIGRpcmVjdG9yeUlkIDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3NvdXJjZSB7XG4gICAgZHVyYXRpb24gICAgICAgIDogc3RyaW5nOyAgIC8vIGV4OiAxOjQ1OjE5LjAwMFxuICAgIHNpemUgICAgICAgICAgICA6IG51bWJlcjtcbiAgICByZXNvbHV0aW9uICAgICAgOiBzdHJpbmc7ICAgLy8gZXg6IDcyMHgzMDRcbiAgICBiaXRyYXRlICAgICAgICAgOiBudW1iZXI7XG4gICAgbnJBdWRpb0NoYW5uZWxzIDogbnVtYmVyO1xuICAgIHByb3RvY29sSW5mbyAgICA6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYSB7XG4gICAgc2VydmVySWQgICAgICAgIDogc3RyaW5nO1xuICAgIGRhdGUgICAgICAgICAgICA6IHN0cmluZztcbiAgICB0aXRsZSAgICAgICAgICAgOiBzdHJpbmc7XG4gICAgaWNvbiAgICAgICAgICAgIDogc3RyaW5nO1xuICAgIG1lZGlhSWQgICAgICAgICA6IHN0cmluZztcbiAgICBjcmVhdG9yICAgICAgICAgOiBzdHJpbmc7XG4gICAgYWN0b3JzICAgICAgICAgIDogc3RyaW5nW107XG4gICAgZ2VucmVzICAgICAgICAgIDogc3RyaW5nW107XG4gICAgYWxidW1hcnR1cmkgICAgIDogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uICAgICA6IHN0cmluZztcbiAgICBsb25nZGVzY3JpcHRpb24gOiBzdHJpbmc7XG4gICAgcmVzc291cmNlICAgICAgIDogc3RyaW5nO1xuICAgIGR1cmF0aW9uICAgICAgICA6IHN0cmluZzsgICAvLyBleDogMTo0NToxOS4wMDBcbiAgICBzaXplICAgICAgICAgICAgOiBudW1iZXI7XG4gICAgcmVzb2x1dGlvbiAgICAgIDogc3RyaW5nOyAgIC8vIGV4OiA3MjB4MzA0XG4gICAgYml0cmF0ZSAgICAgICAgIDogbnVtYmVyO1xuICAgIG5yQXVkaW9DaGFubmVscyA6IG51bWJlcjtcbiAgICBwcm90b2NvbEluZm8gICAgOiBzdHJpbmc7XG4gICAgY2xhc3NlICAgICAgICAgIDogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBEYXRhQnJvd3NlIHtcbiAgICBkaXJlY3RvcnlJZCA6IHN0cmluZztcbiAgICBkaXJlY3RvcmllcyA6IERpcmVjdG9yeVtdO1xuICAgIG1lZGlhcyAgICAgIDogTWVkaWFbXTtcbiAgICBlcnJvciAgICAgICA6IHN0cmluZztcbn1cblxubGV0IGluaXREb25lID0gZmFsc2U7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tbVNlcnZpY2Uge1xuICAgIG1lZGlhUmVuZGVyZXJzICA6IE1lZGlhUmVuZGVyZXJbXSA9IFtdO1xuICAgIG1lZGlhU2VydmVycyAgICA6IE1lZGlhU2VydmVyICBbXSA9IFtdO1xuICAgIG9udXBkYXRlICAgICAgICA6IChvcGVyYXRpb246IHN0cmluZywgdHlwZTogc3RyaW5nLCBicmljazogTWVkaWFSZW5kZXJlciB8IE1lZGlhU2VydmVyKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgcGFyc2VyXHQ6IERPTVBhcnNlcjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwKSB7XG4gICAgICAgIHRoaXMucGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgIH1cbiAgICBpbml0KCBvcmlnaW4/OiBzdHJpbmcgKSA6IE9ic2VydmFibGU8RGF0YURsbmFEZXZpY2VzPiB7XG4gICAgICAgIG9yaWdpbiA9IG9yaWdpbiB8fCBsb2NhdGlvbi5vcmlnaW47XG4gICAgICAgIGlmKGluaXREb25lKSB7dGhyb3cgXCJDYW5ub3QgaW5zdGFudGlhdGUgQ29tbVNlcnZpY2UgbXVsdGlwbGUgdGltZXMuLi5cIjt9IGVsc2Uge2luaXREb25lID0gdHJ1ZTt9XG4gICAgICAgIHV0aWxzLmluaXRJTyggYCR7b3JpZ2lufS9tMm1gICk7XG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChgJHtvcmlnaW59L2dldENvbnRleHRgKS5tYXAoIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtjb25zb2xlLmVycm9yKFwiSW1wb3NzaWJsZSB0byBnZXQgY29udGV4dDpcIiwgcmVzcG9uc2UpOyByZXR1cm47fVxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBKU09OLnBhcnNlKCByZXNwb25zZS50ZXh0KCkgKTtcbiAgICAgICAgICAgIGZvcihsZXQgaSBpbiBjb250ZXh0LmJyaWNrcyApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uYnJpY2tBcHBlYXIoIGNvbnRleHQuYnJpY2tzW2ldICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1dGlscy5pby5vblx0KCBcImJyaWNrQXBwZWFyc1wiLCAoYnJpY2s6IE1lZGlhUmVuZGVyZXIgfCBNZWRpYVNlcnZlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImJyaWNrQXBwZWFyc1wiLCBicmljayApO1xuICAgICAgICAgICAgICAgIHRoaXMub25icmlja0FwcGVhciggYnJpY2sgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXRpbHMuaW8ub25cdCggXCJicmlja0Rpc2FwcGVhcnNcIiwgKCBkYXRhICkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYnJpY2sgYnJpY2tEaXNhcHBlYXJzXCIsIGRhdGEuYnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4LCBoYXNJZCA9IGZ1bmN0aW9uKGJyaWNrLCBpKSB7aW5kZXggPSBpOyByZXR1cm4gYnJpY2suaWQgPT09IGRhdGEuYnJpY2tJZDt9O1xuICAgICAgICAgICAgICAgIGlmKCB0aGlzLm1lZGlhUmVuZGVyZXJzLmZpbmQoIGhhc0lkICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVkaWFSZW5kZXJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5vbnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbnVwZGF0ZShcImRpc2FwcGVhclwiLCBcIkJyaWNrVVBuUF9NZWRpYVJlbmRlcmVyXCIsIGRhdGEuYnJpY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIHRoaXMubWVkaWFTZXJ2ZXJzLmZpbmQgICggaGFzSWQgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYVNlcnZlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5vbnVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbnVwZGF0ZSggXCJkaXNhcHBlYXJcIiwgXCJCcmlja1VQblBfTWVkaWFTZXJ2ZXJcIiAgLCBkYXRhLmJyaWNrSWQgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHttZWRpYVJlbmRlcmVyczogdGhpcy5tZWRpYVJlbmRlcmVycywgbWVkaWFTZXJ2ZXJzOiB0aGlzLm1lZGlhU2VydmVyc307XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbmJyaWNrQXBwZWFyKGJyaWNrOiBNZWRpYVJlbmRlcmVyIHwgTWVkaWFTZXJ2ZXIpIDogdm9pZCB7XG4gICAgICAgIGlmKCBicmljay50eXBlLmluZGV4T2YoXCJCcmlja1VQblBfTWVkaWFSZW5kZXJlclwiKSA+PSAwICkge1xuICAgICAgICAgICAgdGhpcy5tZWRpYVJlbmRlcmVycy5wdXNoKCA8TWVkaWFSZW5kZXJlcj5icmljayApO1xuICAgICAgICAgICAgaWYodGhpcy5vbnVwZGF0ZSkge3RoaXMub251cGRhdGUoIFwiYXBwZWFyXCIsIFwiQnJpY2tVUG5QX01lZGlhUmVuZGVyZXJcIiwgYnJpY2sgKTt9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIGJyaWNrLnR5cGUuaW5kZXhPZihcIkJyaWNrVVBuUF9NZWRpYVNlcnZlclwiKSA+PSAwICkge1xuICAgICAgICAgICAgdGhpcy5tZWRpYVNlcnZlcnMucHVzaCggPE1lZGlhU2VydmVyPmJyaWNrICk7XG4gICAgICAgICAgICBpZih0aGlzLm9udXBkYXRlKSB7dGhpcy5vbnVwZGF0ZSggXCJhcHBlYXJcIiwgXCJCcmlja1VQblBfTWVkaWFTZXJ2ZXJcIiwgYnJpY2sgKTt9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FsbChvYmplY3RJZDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgcGFyYW1zOiBhbnlbXSwgY2I/OihkYXRhOiBhbnkpPT52b2lkKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB1dGlscy5jYWxsKG9iamVjdElkLCBtZXRob2QsIHBhcmFtcyk7XG4gICAgfVxuICAgIHBsYXkobWVkaWFSZW5kZXJlcklkOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNhbGwobWVkaWFSZW5kZXJlcklkLCBcIlBsYXlcIiAsIFtdKTtcbiAgICB9XG4gICAgcGF1c2UobWVkaWFSZW5kZXJlcklkOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNhbGwobWVkaWFSZW5kZXJlcklkLCBcIlBhdXNlXCIsIFtdKTtcbiAgICB9XG4gICAgc3RvcChtZWRpYVJlbmRlcmVySWQ6IHN0cmluZykgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdXRpbHMuY2FsbChtZWRpYVJlbmRlcmVySWQsIFwiU3RvcFwiLCBbXSk7XG4gICAgfVxuICAgIHNldFZvbHVtZShtZWRpYVJlbmRlcmVySWQ6IHN0cmluZywgdm9sdW1lOiBudW1iZXIpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNhbGwobWVkaWFSZW5kZXJlcklkLCBcInNldFZvbHVtZVwiLCBbdm9sdW1lXSk7XG4gICAgfVxuICAgIGxvYWRNZWRpYShtZWRpYVJlbmRlcmVySWQ6IHN0cmluZywgbWVkaWFTZXJ2ZXJJZDogc3RyaW5nLCBpdGVtSWQ6IHN0cmluZykgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdXRpbHMuY2FsbChtZWRpYVJlbmRlcmVySWQsIFwibG9hZE1lZGlhXCIsIFttZWRpYVNlcnZlcklkLCBpdGVtSWRdKTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGJyaWNrSWQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcgPSBcImV2ZW50VVBuUFwiKSA6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSggKG9ic2VydmVyOiBPYnNlcnZlcjxPYmplY3Q+KSA9PiB7XG4gICAgICAgICAgICB1dGlscy5zdWJzY3JpYmVCcmljayhicmlja0lkLCBldmVudE5hbWUsIChkYXRhOiBPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCBcInV0aWxzIGV2ZW50XCIsIGRhdGEgKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KCBkYXRhICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldE1lZGlhRnJvbURJREwoIGRlc2NyOiBzdHJpbmcgfCBFbGVtZW50ICkgOiBNZWRpYSB7XG4gICAgICAgIGxldCBtZWRpYSA6IE1lZGlhLCBpdGVtIDogRWxlbWVudDtcbiAgICAgICAgaWYodHlwZW9mIGRlc2NyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgZG9jICAgPSB0aGlzLnBhcnNlci5wYXJzZUZyb21TdHJpbmcoIGRlc2NyLCBcInRleHQveG1sXCIgKTtcbiAgICAgICAgICAgIGl0ZW0gPSBkb2M/ZG9jLnF1ZXJ5U2VsZWN0b3IoXCJpdGVtXCIpOm51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtID0gZGVzY3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaXRlbSkge1xuICAgICAgICAgICAgbGV0IG5vZGU6IEVsZW1lbnQ7XG4gICAgICAgICAgICBsZXQgcmVzID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwicmVzXCIpO1xuICAgICAgICAgICAgbWVkaWEgPSB7XG4gICAgICAgICAgICAgICAgc2VydmVySWQgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGRhdGUgICAgICAgICAgICA6IChub2RlPWl0ZW0ucXVlcnlTZWxlY3RvcihcImRhdGVcIikpP25vZGUudGV4dENvbnRlbnQ6XCJpbmNvbm51ZVwiLFxuICAgICAgICAgICAgICAgIHRpdGxlICAgICAgICAgICA6IChub2RlPWl0ZW0ucXVlcnlTZWxlY3RvcihcInRpdGxlXCIpKT9ub2RlLnRleHRDb250ZW50OlwiaW5jb25udVwiLFxuICAgICAgICAgICAgICAgIGljb24gICAgICAgICAgICA6IChub2RlPWl0ZW0ucXVlcnlTZWxlY3RvcihcImljb25cIikpP25vZGUudGV4dENvbnRlbnQ6XCJpbWFnZXMvbWVkaWFfaWNvbi5qcGdcIixcbiAgICAgICAgICAgICAgICBtZWRpYUlkICAgICAgICAgOiBpdGVtLmdldEF0dHJpYnV0ZShcImlkXCIpLFxuICAgICAgICAgICAgICAgIGNyZWF0b3IgICAgICAgICA6IChub2RlPWl0ZW0ucXVlcnlTZWxlY3RvcihcImNyZWF0b3JcIikpP25vZGUudGV4dENvbnRlbnQ6XCJpbmNvbm51XCIsXG4gICAgICAgICAgICAgICAgYWN0b3JzICAgICAgICAgIDogW10sXG4gICAgICAgICAgICAgICAgZ2VucmVzICAgICAgICAgIDogW10sXG4gICAgICAgICAgICAgICAgYWxidW1hcnR1cmkgICAgIDogKG5vZGU9aXRlbS5xdWVyeVNlbGVjdG9yKFwiYWxidW1hcnR1cmksIGFsYnVtQXJ0VVJJLCBhbGJ1bUFydFVyaVwiKSk/bm9kZS50ZXh0Q29udGVudDpcIlwiLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uICAgICA6IChub2RlPWl0ZW0ucXVlcnlTZWxlY3RvcihcImRlc2NyaXB0aW9uXCIpKT9ub2RlLnRleHRDb250ZW50OlwiXCIsXG4gICAgICAgICAgICAgICAgbG9uZ2Rlc2NyaXB0aW9uIDogKG5vZGU9aXRlbS5xdWVyeVNlbGVjdG9yKFwibG9uZ2Rlc2NyaXB0aW9uLCBsb25nRGVzY3JpcHRpb25cIikpP25vZGUudGV4dENvbnRlbnQ6XCJcIixcbiAgICAgICAgICAgICAgICByZXNzb3VyY2UgICAgICAgOiByZXM/cmVzLnRleHRDb250ZW50OlwiXCIsXG4gICAgICAgICAgICAgICAgZHVyYXRpb24gICAgICAgIDogcmVzPyggcmVzLmdldEF0dHJpYnV0ZShcImR1cmF0aW9uXCIgICAgICAgKXx8XCJcIik6XCJcIixcbiAgICAgICAgICAgICAgICBzaXplICAgICAgICAgICAgOiByZXM/KCtyZXMuZ2V0QXR0cmlidXRlKFwic2l6ZVwiICAgICAgICAgICApfHwwICk6MCAsXG4gICAgICAgICAgICAgICAgcmVzb2x1dGlvbiAgICAgIDogcmVzPyggcmVzLmdldEF0dHJpYnV0ZShcInJlc29sdXRpb25cIiAgICAgKXx8XCJcIik6XCJcIixcbiAgICAgICAgICAgICAgICBiaXRyYXRlICAgICAgICAgOiByZXM/KCtyZXMuZ2V0QXR0cmlidXRlKFwiYml0cmF0ZVwiICAgICAgICApfHwwICk6MCAsXG4gICAgICAgICAgICAgICAgbnJBdWRpb0NoYW5uZWxzIDogcmVzPygrcmVzLmdldEF0dHJpYnV0ZShcIm5yQXVkaW9DaGFubmVsc1wiKXx8MCApOjAgLFxuICAgICAgICAgICAgICAgIHByb3RvY29sSW5mbyAgICA6IHJlcz8oIHJlcy5nZXRBdHRyaWJ1dGUoXCJwcm90b2NvbEluZm9cIiAgICl8fFwiXCIpOlwiXCIsXG4gICAgICAgICAgICAgICAgY2xhc3NlICAgICAgICAgIDogKG5vZGU9aXRlbS5xdWVyeVNlbGVjdG9yKFwiY2xhc3NcIikpP25vZGUudGV4dENvbnRlbnQ6XCJcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvcihsZXQgYWN0b3Igb2YgaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCBcImFjdG9yXCIgKSkge1xuICAgICAgICAgICAgICAgIG1lZGlhLmFjdG9ycy5wdXNoKCBhY3Rvci50ZXh0Q29udGVudCApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGxldCBnZW5yZSBvZiBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIFwiZ2VucmVcIiApKSB7XG4gICAgICAgICAgICAgICAgbWVkaWEuZ2VucmVzLnB1c2goIGdlbnJlLnRleHRDb250ZW50ICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJtZWRpYSA9PlwiLCBtZWRpYSk7XG4gICAgICAgIHJldHVybiBtZWRpYTtcbiAgICB9XG4gICAgYnJvd3NlKG1lZGlhU2VydmVySWQ6IHN0cmluZywgZGlyZWN0b3J5SWQ6IHN0cmluZyA9IFwiMFwiKSA6IFByb21pc2U8RGF0YUJyb3dzZT4ge1xuICAgICAgICByZXR1cm4gdXRpbHMuY2FsbCggbWVkaWFTZXJ2ZXJJZCwgXCJCcm93c2VcIiwgW2RpcmVjdG9yeUlkXSApLnRoZW4oIChkYXRhU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YUJyb3dzZSA6IERhdGFCcm93c2UgPSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5SWQgOiBkaXJlY3RvcnlJZCxcbiAgICAgICAgICAgICAgICBkaXJlY3RvcmllcyA6IFtdLFxuICAgICAgICAgICAgICAgIG1lZGlhcyAgICAgIDogW10sXG4gICAgICAgICAgICAgICAgZXJyb3IgICAgICAgOiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgZG9jICAgICAgICAgPSB0aGlzLnBhcnNlci5wYXJzZUZyb21TdHJpbmcoIGRhdGFTdHJpbmcsIFwidGV4dC94bWxcIiApO1xuICAgICAgICAgICAgICAgIGxldCBSZXN1bHQgICAgICA9IGRvYy5xdWVyeVNlbGVjdG9yKFwiUmVzdWx0XCIpO1xuICAgICAgICAgICAgICAgIGxldCBSZXN1bHREb2MgICA9IHRoaXMucGFyc2VyLnBhcnNlRnJvbVN0cmluZyhSZXN1bHQudGV4dENvbnRlbnQsIFwidGV4dC94bWxcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFJlc3VsdERvYyApO1xuXG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgY29udGFpbmVyc1xuICAgICAgICAgICAgICAgIGZvcihsZXQgY29udGFpbmVyIG9mIFJlc3VsdERvYy5xdWVyeVNlbGVjdG9yQWxsKFwiY29udGFpbmVyXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlICAgIDogTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUJyb3dzZS5kaXJlY3Rvcmllcy5wdXNoKCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJJZCAgICA6IG1lZGlhU2VydmVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lICAgICAgICA6IChub2RlPWNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwidGl0bGVcIikpP25vZGUudGV4dENvbnRlbnQ6XCJpbmNvbm51XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVVJMICAgICA6IChub2RlPWNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiYWxidW1BcnRVUklcIikpP25vZGUudGV4dENvbnRlbnQ6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeUlkIDogY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImlkXCIpfSApO1xuICAgICAgICAgICAgICAgIH0gLy8gRW5kIG9mIGNvbnRhaW5lcnMgcGFyc2luZ1xuXG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgaXRlbVxuICAgICAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiBSZXN1bHREb2MucXVlcnlTZWxlY3RvckFsbChcIml0ZW1cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lZGlhID0gdGhpcy5nZXRNZWRpYUZyb21ESURMKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBtZWRpYS5zZXJ2ZXJJZCA9IG1lZGlhU2VydmVySWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUJyb3dzZS5tZWRpYXMucHVzaChtZWRpYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IC8vIEVuZCBvZiBpdGVtcyBwYXJzaW5nXG4gICAgICAgICAgICB9IGNhdGNoKGVycikge2RhdGFCcm93c2UuZXJyb3IgPSBlcnI7fVxuICAgICAgICAgICAgcmV0dXJuIGRhdGFCcm93c2U7XG4gICAgfSk7XG59fVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
