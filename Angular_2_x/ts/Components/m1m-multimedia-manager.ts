import { Component, Input 	} from "@angular/core";
import {CommService, DataDlnaDevices, MediaServer, Media, MediaRenderer} from "../Services/CommService";
import * as $ from "jquery";
console.log( "$ =", $);

@Component({
    selector		: "comp-multimedia-manager",
    templateUrl : "ts/Components/m1m-multimedia-manager.html",
    styleUrls   : [ "ts/Components/m1m-multimedia-manager.css" ]
})
export class CompMultimediaManager {
    @Input() title	: string;
    mediaRenderers  : MediaRenderer[] = [];
    mediaServers    : MediaServer  [] = [];
    playingRenderer : MediaRenderer;
    constructor(private comm: CommService) {
        //console.log( "CommService:", comm);
        comm.init( localStorage.getItem( "TActHab_adresse" ) ).subscribe( (data: DataDlnaDevices) => {
            //console.log( "init =>", data );
            this.mediaRenderers = data.mediaRenderers;
            this.mediaServers   = data.mediaServers;
        });
    }
    Play(media: Media) {
        console.log("Play", media);
        let index = $("#carousel-Renderers  *.item.active").index();
        console.log("index", index);
        try {
            let mediaRenderer = this.mediaRenderers[0];
            this.comm.loadMedia(mediaRenderer.id, media.serverId, media.mediaId).then( () => {
                this.comm.play(mediaRenderer.id).then( () => this.playingRenderer = mediaRenderer);
            });
        } catch(err) {
            console.error("Error playing", media, "on renderer at index", index, ":\n", err);
        }
    }
}
