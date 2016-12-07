System.register(["@angular/core", "../Services/CommService", "jquery"], function(exports_1, context_1) {
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
    var core_1, CommService_1, $;
    var CompMultimediaManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            },
            function ($_1) {
                $ = $_1;
            }],
        execute: function() {
            console.log("$ =", $);
            CompMultimediaManager = class CompMultimediaManager {
                constructor(comm) {
                    this.comm = comm;
                    this.mediaRenderers = [];
                    this.mediaServers = [];
                    //console.log( "CommService:", comm);
                    comm.init(localStorage.getItem("TActHab_adresse")).subscribe((data) => {
                        //console.log( "init =>", data );
                        this.mediaRenderers = data.mediaRenderers;
                        this.mediaServers = data.mediaServers;
                    });
                }
                Play(media) {
                    console.log("Play", media);
                    let index = $("#carousel-Renderers  *.item.active").index();
                    console.log("index", index);
                    try {
                        let mediaRenderer = this.mediaRenderers[0];
                        this.comm.loadMedia(mediaRenderer.id, media.serverId, media.mediaId).then(() => {
                            this.comm.play(mediaRenderer.id).then(() => this.playingRenderer = mediaRenderer);
                        });
                    }
                    catch (err) {
                        console.error("Error playing", media, "on renderer at index", index, ":\n", err);
                    }
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], CompMultimediaManager.prototype, "title", void 0);
            CompMultimediaManager = __decorate([
                core_1.Component({
                    selector: "comp-multimedia-manager",
                    templateUrl: "ts/Components/m1m-multimedia-manager.html",
                    styleUrls: ["ts/Components/m1m-multimedia-manager.css"]
                }), 
                __metadata('design:paramtypes', [CommService_1.CommService])
            ], CompMultimediaManager);
            exports_1("CompMultimediaManager", CompMultimediaManager);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvbTFtLW11bHRpbWVkaWEtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUdBLE9BQU8sQ0FBQyxHQUFHLENBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBT3ZCO2dCQUtJLFlBQW9CLElBQWlCO29CQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO29CQUhyQyxtQkFBYyxHQUFzQixFQUFFLENBQUM7b0JBQ3ZDLGlCQUFZLEdBQXdCLEVBQUUsQ0FBQztvQkFHbkMscUNBQXFDO29CQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFFLFlBQVksQ0FBQyxPQUFPLENBQUUsaUJBQWlCLENBQUUsQ0FBRSxDQUFDLFNBQVMsQ0FBRSxDQUFDLElBQXFCO3dCQUNwRixpQ0FBaUM7d0JBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLFlBQVksR0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELElBQUksQ0FBQyxLQUFZO29CQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMzQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzVCLElBQUksQ0FBQzt3QkFDRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBRTs0QkFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBRSxNQUFNLElBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDLENBQUM7d0JBQ3ZGLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUU7b0JBQUEsS0FBSyxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDckYsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQXpCRztnQkFBQyxZQUFLLEVBQUU7O2dFQUFBO1lBTlo7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUkseUJBQXlCO29CQUNyQyxXQUFXLEVBQUcsMkNBQTJDO29CQUN6RCxTQUFTLEVBQUssQ0FBRSwwQ0FBMEMsQ0FBRTtpQkFDL0QsQ0FBQzs7cUNBQUE7WUFDRix5REEwQkMsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL20xbS1tdWx0aW1lZGlhLW1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IFx0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tU2VydmljZSwgRGF0YURsbmFEZXZpY2VzLCBNZWRpYVNlcnZlciwgTWVkaWEsIE1lZGlhUmVuZGVyZXJ9IGZyb20gXCIuLi9TZXJ2aWNlcy9Db21tU2VydmljZVwiO1xuaW1wb3J0ICogYXMgJCBmcm9tIFwianF1ZXJ5XCI7XG5jb25zb2xlLmxvZyggXCIkID1cIiwgJCk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yXHRcdDogXCJjb21wLW11bHRpbWVkaWEtbWFuYWdlclwiLFxuICAgIHRlbXBsYXRlVXJsIDogXCJ0cy9Db21wb25lbnRzL20xbS1tdWx0aW1lZGlhLW1hbmFnZXIuaHRtbFwiLFxuICAgIHN0eWxlVXJscyAgIDogWyBcInRzL0NvbXBvbmVudHMvbTFtLW11bHRpbWVkaWEtbWFuYWdlci5jc3NcIiBdXG59KVxuZXhwb3J0IGNsYXNzIENvbXBNdWx0aW1lZGlhTWFuYWdlciB7XG4gICAgQElucHV0KCkgdGl0bGVcdDogc3RyaW5nO1xuICAgIG1lZGlhUmVuZGVyZXJzICA6IE1lZGlhUmVuZGVyZXJbXSA9IFtdO1xuICAgIG1lZGlhU2VydmVycyAgICA6IE1lZGlhU2VydmVyICBbXSA9IFtdO1xuICAgIHBsYXlpbmdSZW5kZXJlciA6IE1lZGlhUmVuZGVyZXI7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21tOiBDb21tU2VydmljZSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBcIkNvbW1TZXJ2aWNlOlwiLCBjb21tKTtcbiAgICAgICAgY29tbS5pbml0KCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggXCJUQWN0SGFiX2FkcmVzc2VcIiApICkuc3Vic2NyaWJlKCAoZGF0YTogRGF0YURsbmFEZXZpY2VzKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCBcImluaXQgPT5cIiwgZGF0YSApO1xuICAgICAgICAgICAgdGhpcy5tZWRpYVJlbmRlcmVycyA9IGRhdGEubWVkaWFSZW5kZXJlcnM7XG4gICAgICAgICAgICB0aGlzLm1lZGlhU2VydmVycyAgID0gZGF0YS5tZWRpYVNlcnZlcnM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBQbGF5KG1lZGlhOiBNZWRpYSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXlcIiwgbWVkaWEpO1xuICAgICAgICBsZXQgaW5kZXggPSAkKFwiI2Nhcm91c2VsLVJlbmRlcmVycyAgKi5pdGVtLmFjdGl2ZVwiKS5pbmRleCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImluZGV4XCIsIGluZGV4KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBtZWRpYVJlbmRlcmVyID0gdGhpcy5tZWRpYVJlbmRlcmVyc1swXTtcbiAgICAgICAgICAgIHRoaXMuY29tbS5sb2FkTWVkaWEobWVkaWFSZW5kZXJlci5pZCwgbWVkaWEuc2VydmVySWQsIG1lZGlhLm1lZGlhSWQpLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW0ucGxheShtZWRpYVJlbmRlcmVyLmlkKS50aGVuKCAoKSA9PiB0aGlzLnBsYXlpbmdSZW5kZXJlciA9IG1lZGlhUmVuZGVyZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGxheWluZ1wiLCBtZWRpYSwgXCJvbiByZW5kZXJlciBhdCBpbmRleFwiLCBpbmRleCwgXCI6XFxuXCIsIGVycik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
