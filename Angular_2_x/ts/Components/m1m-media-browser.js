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
    var M1mMediaBrowser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            }],
        execute: function() {
            let M1mMediaBrowser = class M1mMediaBrowser {
                constructor(cs) {
                    this.cs = cs;
                    this.breadcrumb = [];
                    // console.log( "CommService:", cs);
                }
                browseMediaServer(ms) {
                    this.breadcrumb = [];
                    this.ms = ms;
                    this.data = null;
                    if (ms) {
                        this.browse();
                    }
                }
                browse(directory) {
                    let directoryId;
                    if (directory) {
                        directoryId = directory.directoryId;
                        let keep = true;
                        this.breadcrumb = this.breadcrumb.filter(D => keep && (keep = D !== directory));
                        this.breadcrumb.push(directory);
                    }
                    else {
                        directoryId = "0";
                    }
                    this.data = null;
                    return this.cs.browse(this.ms.id, directoryId).then((data) => {
                        console.log("Browse", this.ms.id, directoryId, "=>", data);
                        this.data = data;
                    });
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array)
            ], M1mMediaBrowser.prototype, "devices", void 0);
            M1mMediaBrowser = __decorate([
                core_1.Component({
                    selector: "m1m-media-browser",
                    templateUrl: "ts/Components/m1m-media-browser.html",
                    styleUrls: ["ts/Components/m1m-media-browser.css"
                    ]
                }), 
                __metadata('design:paramtypes', [CommService_1.CommService])
            ], M1mMediaBrowser);
            exports_1("M1mMediaBrowser", M1mMediaBrowser);
        }
    }
});
//# sourceMappingURL=m1m-media-browser.js.map