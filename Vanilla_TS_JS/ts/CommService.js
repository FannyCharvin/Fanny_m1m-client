/// <reference path="utils.ts"/>
let CommService = {
    mediaRenderers: [],
    mediaServers: [],
    onupdate: null,
    parser: null,
    initDone: false,
    init: (origin) => {
        origin = origin || location.origin;
        if (CommService.initDone) {
            throw "Cannot instantiate CommService multiple times...";
        }
        else {
            CommService.initDone = true;
        }
        utils.initIO(`${origin}/m2m`);
        return utils.XHR("GET", `${origin}/getContext`).then((response) => {
            if (response.status !== 200) {
                console.error("Impossible to get context:", response);
                return;
            }
            let context = JSON.parse(response.responseText);
            for (let i in context.bricks) {
                CommService.onbrickAppear(context.bricks[i]);
            }
            utils.io.on("brickAppears", (brick) => {
                console.log("brickAppears", brick);
                CommService.onbrickAppear(brick);
            });
            utils.io.on("brickDisappears", (data) => {
                console.log("brick brickDisappears", data.brickId);
                let index, hasId = function (brick, i) { index = i; return brick.id === data.brickId; };
                if (CommService.mediaRenderers.find(hasId)) {
                    CommService.mediaRenderers.splice(index, 1);
                    if (CommService.onupdate) {
                        CommService.onupdate("disappear", "BrickUPnP_MediaRenderer", data.brickId);
                    }
                }
                if (CommService.mediaServers.find(hasId)) {
                    CommService.mediaServers.splice(index, 1);
                    if (CommService.onupdate) {
                        CommService.onupdate("disappear", "BrickUPnP_MediaServer", data.brickId);
                    }
                }
            });
            return { mediaRenderers: CommService.mediaRenderers, mediaServers: CommService.mediaServers };
        });
    },
    onbrickAppear: (brick) => {
        if (brick.type.indexOf("BrickUPnP_MediaRenderer") >= 0) {
            CommService.mediaRenderers.push(brick);
            if (CommService.onupdate) {
                CommService.onupdate("appear", "BrickUPnP_MediaRenderer", brick);
            }
        }
        if (brick.type.indexOf("BrickUPnP_MediaServer") >= 0) {
            CommService.mediaServers.push(brick);
            if (CommService.onupdate) {
                CommService.onupdate("appear", "BrickUPnP_MediaServer", brick);
            }
        }
    },
    play: (mediaRendererId) => {
        return utils.call(mediaRendererId, "Play", []);
    },
    pause: (mediaRendererId) => {
        return utils.call(mediaRendererId, "Pause", []);
    },
    stop: (mediaRendererId) => {
        return utils.call(mediaRendererId, "Stop", []);
    },
    setVolume: (mediaRendererId, volume) => {
        return utils.call(mediaRendererId, "setVolume", [volume]);
    },
    loadMedia: (mediaRendererId, mediaServerId, itemId) => {
        return utils.call(mediaRendererId, "loadMedia", [mediaServerId, itemId]);
    },
    browse: (mediaServerId, directoryId = "0") => {
        return utils.call(mediaServerId, "Browse", [directoryId]).then((dataString) => {
            let dataBrowse = {
                parentDirectory: directoryId,
                directories: [],
                medias: [],
                error: null
            };
            try {
                let doc = CommService.parser.parseFromString(dataString, "text/xml");
                let Result = doc.querySelector("Result");
                let ResultDoc = CommService.parser.parseFromString(Result.textContent, "text/xml");
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
                    let node;
                    let media;
                    dataBrowse.medias.push(media = {
                        serverId: mediaServerId,
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
                        ressource: (node = item.querySelector("res")) ? node.textContent : "",
                        classe: (node = item.querySelector("class")) ? node.textContent : ""
                    });
                    for (let actor of item.querySelectorAll("actor")) {
                        media.actors.push(actor.textContent);
                    }
                    for (let genre of item.querySelectorAll("genre")) {
                        media.genres.push(genre.textContent);
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
//# sourceMappingURL=CommService.js.map