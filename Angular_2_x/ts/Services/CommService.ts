import { Injectable } from "@angular/core";
import {Http} from "@angular/http";
import { utils } from "./utils";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
// import "rxjs/Rx";
import "rxjs/add/operator/map";

// export
export interface Brick {
    id      : string;
    name    : string;
    type    : string[];
}
export interface MediaRenderer extends Brick {
    iconURL : string;
}
export interface MediaServer   extends Brick {
    iconURL     : string;
}
export interface DataDlnaDevices {
    mediaRenderers  : MediaRenderer[];
    mediaServers    : MediaServer  [];
}

export interface Directory {
    serverId    : string;
    name        : string;
    iconURL     : string;
    directoryId : string;
}

export interface Ressource {
    duration        : string;   // ex: 1:45:19.000
    size            : number;
    resolution      : string;   // ex: 720x304
    bitrate         : number;
    nrAudioChannels : number;
    protocolInfo    : string;
}

export interface Media {
    serverId        : string;
    date            : string;
    title           : string;
    icon            : string;
    mediaId         : string;
    creator         : string;
    actors          : string[];
    genres          : string[];
    albumarturi     : string;
    description     : string;
    longdescription : string;
    ressource       : string;
    duration        : string;   // ex: 1:45:19.000
    size            : number;
    resolution      : string;   // ex: 720x304
    bitrate         : number;
    nrAudioChannels : number;
    protocolInfo    : string;
    classe          : string;
}
export interface DataBrowse {
    directoryId : string;
    directories : Directory[];
    medias      : Media[];
    error       : string;
}

let initDone = false;
@Injectable()
export class CommService {
    mediaRenderers  : MediaRenderer[] = [];
    mediaServers    : MediaServer  [] = [];
    onupdate        : (operation: string, type: string, brick: MediaRenderer | MediaServer) => void;
    private parser	: DOMParser;
    constructor(private _http: Http) {
        this.parser = new DOMParser();
    }
    init( origin?: string ) : Observable<DataDlnaDevices> {
        origin = origin || location.origin;
        if(initDone) {throw "Cannot instantiate CommService multiple times...";} else {initDone = true;}
        utils.initIO( `${origin}/m2m` );
        return this._http.get(`${origin}/getContext`).map( (response) => {
            if(response.status !== 200) {console.error("Impossible to get context:", response); return;}
            let context = JSON.parse( response.text() );
            for(let i in context.bricks ) {
                this.onbrickAppear( context.bricks[i] );
            }
            utils.io.on	( "brickAppears", (brick: MediaRenderer | MediaServer) => {
                console.log( "brickAppears", brick );
                this.onbrickAppear( brick );
            });
            utils.io.on	( "brickDisappears", ( data ) => {
                console.log("brick brickDisappears", data.brickId);
                let index, hasId = function(brick, i) {index = i; return brick.id === data.brickId;};
                if( this.mediaRenderers.find( hasId ) ) {
                    this.mediaRenderers.splice(index, 1);
                    if(this.onupdate) {
                        this.onupdate("disappear", "BrickUPnP_MediaRenderer", data.brickId);
                    }
                }
                if( this.mediaServers.find  ( hasId ) ) {
                    this.mediaServers.splice(index, 1);
                    if(this.onupdate) {
                        this.onupdate( "disappear", "BrickUPnP_MediaServer"  , data.brickId );
                    }
                }
            });
            return {mediaRenderers: this.mediaRenderers, mediaServers: this.mediaServers};
        });
    }
    onbrickAppear(brick: MediaRenderer | MediaServer) : void {
        if( brick.type.indexOf("BrickUPnP_MediaRenderer") >= 0 ) {
            this.mediaRenderers.push( <MediaRenderer>brick );
            if(this.onupdate) {this.onupdate( "appear", "BrickUPnP_MediaRenderer", brick );}
        }
        if( brick.type.indexOf("BrickUPnP_MediaServer") >= 0 ) {
            this.mediaServers.push( <MediaServer>brick );
            if(this.onupdate) {this.onupdate( "appear", "BrickUPnP_MediaServer", brick );}
        }
    }
    call(objectId: string, method: string, params: any[], cb?:(data: any)=>void) : Promise<any> {
        return utils.call(objectId, method, params);
    }
    play(mediaRendererId: string) : Promise<any> {
        return utils.call(mediaRendererId, "Play" , []);
    }
    pause(mediaRendererId: string) : Promise<any> {
        return utils.call(mediaRendererId, "Pause", []);
    }
    stop(mediaRendererId: string) : Promise<any> {
        return utils.call(mediaRendererId, "Stop", []);
    }
    setVolume(mediaRendererId: string, volume: number) : Promise<any> {
        return utils.call(mediaRendererId, "setVolume", [volume]);
    }
    loadMedia(mediaRendererId: string, mediaServerId: string, itemId: string) : Promise<any> {
        return utils.call(mediaRendererId, "loadMedia", [mediaServerId, itemId]);
    }
    subscribe(brickId: string, eventName: string = "eventUPnP") : Observable<Object> {
        return Observable.create( (observer: Observer<Object>) => {
            utils.subscribeBrick(brickId, eventName, (data: Object) => {
                //console.log( "utils event", data );
                observer.next( data );
            });
        });
    }
    getMediaFromDIDL( descr: string | Element ) : Media {
        let media : Media, item : Element;
        if(typeof descr === "string") {
            let doc   = this.parser.parseFromString( descr, "text/xml" );
            item = doc?doc.querySelector("item"):null;
        } else {
            item = descr;
        }
        if(item) {
            let node: Element;
            let res = item.querySelector("res");
            media = {
                serverId        : undefined,
                date            : (node=item.querySelector("date"))?node.textContent:"inconnue",
                title           : (node=item.querySelector("title"))?node.textContent:"inconnu",
                icon            : (node=item.querySelector("icon"))?node.textContent:"images/media_icon.jpg",
                mediaId         : item.getAttribute("id"),
                creator         : (node=item.querySelector("creator"))?node.textContent:"inconnu",
                actors          : [],
                genres          : [],
                albumarturi     : (node=item.querySelector("albumarturi, albumArtURI, albumArtUri"))?node.textContent:"",
                description     : (node=item.querySelector("description"))?node.textContent:"",
                longdescription : (node=item.querySelector("longdescription, longDescription"))?node.textContent:"",
                ressource       : res?res.textContent:"",
                duration        : res?( res.getAttribute("duration"       )||""):"",
                size            : res?(+res.getAttribute("size"           )||0 ):0 ,
                resolution      : res?( res.getAttribute("resolution"     )||""):"",
                bitrate         : res?(+res.getAttribute("bitrate"        )||0 ):0 ,
                nrAudioChannels : res?(+res.getAttribute("nrAudioChannels")||0 ):0 ,
                protocolInfo    : res?( res.getAttribute("protocolInfo"   )||""):"",
                classe          : (node=item.querySelector("class"))?node.textContent:""
            };
            for(let actor of item.querySelectorAll( "actor" )) {
                media.actors.push( actor.textContent );
            }
            for(let genre of item.querySelectorAll( "genre" )) {
                media.genres.push( genre.textContent );
            }
        }
        console.log("media =>", media);
        return media;
    }
    browse(mediaServerId: string, directoryId: string = "0") : Promise<DataBrowse> {
        return utils.call( mediaServerId, "Browse", [directoryId] ).then( (dataString) => {
            let dataBrowse : DataBrowse = {
                directoryId : directoryId,
                directories : [],
                medias      : [],
                error       : null
            };
            try {
                let doc         = this.parser.parseFromString( dataString, "text/xml" );
                let Result      = doc.querySelector("Result");
                let ResultDoc   = this.parser.parseFromString(Result.textContent, "text/xml");
                console.log( ResultDoc );

                // Parse containers
                for(let container of ResultDoc.querySelectorAll("container")) {
                    let node    : Node;
                    dataBrowse.directories.push( {
                        serverId    : mediaServerId,
                        name        : (node=container.querySelector("title"))?node.textContent:"inconnu",
                        iconURL     : (node=container.querySelector("albumArtURI"))?node.textContent:"",
                        directoryId : container.getAttribute("id")} );
                } // End of containers parsing

                // Parse item
                for(let item of ResultDoc.querySelectorAll("item")) {
                    let media = this.getMediaFromDIDL(item);
                    media.serverId = mediaServerId;
                    if (media) {
                        dataBrowse.medias.push(media);
                    }
                } // End of items parsing
            } catch(err) {dataBrowse.error = err;}
            return dataBrowse;
    });
}}
