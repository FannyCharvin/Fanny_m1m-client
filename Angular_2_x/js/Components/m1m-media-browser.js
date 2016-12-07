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
            M1mMediaBrowser = class M1mMediaBrowser {
                constructor(cs) {
                    this.cs = cs;
                    this.mediaSelect = new core_1.EventEmitter();
                    this.breadcrumb = [];
                    // console.log( "CommService:", cs);
                }
                selectMedia(media) {
                    // console.log("selectMedia", media);
                    this.mediaSelect.emit(media);
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
                        // console.log( "Browse", this.ms.id, directoryId, "=>", data );
                        this.data = data;
                    });
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array)
            ], M1mMediaBrowser.prototype, "devices", void 0);
            __decorate([
                core_1.Output("on-media-select"), 
                __metadata('design:type', Object)
            ], M1mMediaBrowser.prototype, "mediaSelect", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvbTFtLW1lZGlhLWJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFTQTtnQkFNSSxZQUFvQixFQUFlO29CQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7b0JBSlIsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQVMsQ0FBQztvQkFDM0QsZUFBVSxHQUFvQixFQUFFLENBQUM7b0JBSXJDLG9DQUFvQztnQkFDeEMsQ0FBQztnQkFDRCxXQUFXLENBQUMsS0FBWTtvQkFDcEIscUNBQXFDO29CQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsQ0FBQztnQkFDRCxpQkFBaUIsQ0FBQyxFQUFlO29CQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLEVBQUUsR0FBVyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQVMsSUFBSSxDQUFDO29CQUN2QixFQUFFLENBQUEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNKLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQztnQkFDTCxDQUFDO2dCQUNELE1BQU0sQ0FBRSxTQUFxQjtvQkFDekIsSUFBSSxXQUFtQixDQUFDO29CQUN4QixFQUFFLENBQUEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNYLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO3dCQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksR0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUUsQ0FBQzt3QkFDaEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3BDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osV0FBVyxHQUFHLEdBQUcsQ0FBQztvQkFDdEIsQ0FBQztvQkFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBRSxDQUFDLElBQUksQ0FBRSxDQUFDLElBQUk7d0JBQ3hELGdFQUFnRTt3QkFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDO1lBcENHO2dCQUFDLFlBQUssRUFBRTs7NERBQUE7WUFDUjtnQkFBQyxhQUFNLENBQUMsaUJBQWlCLENBQUM7O2dFQUFBO1lBUjlCO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsUUFBUSxFQUFJLG1CQUFtQjtvQkFDL0IsV0FBVyxFQUFJLHNDQUFzQztvQkFDckQsU0FBUyxFQUFTLENBQUUscUNBQXFDO3FCQUN0QztpQkFDdEIsQ0FBQzs7K0JBQUE7WUFDRiw2Q0FxQ0MsQ0FBQSIsImZpbGUiOiJDb21wb25lbnRzL20xbS1tZWRpYS1icm93c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJcdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbVNlcnZpY2UsIERpcmVjdG9yeSwgTWVkaWFTZXJ2ZXIsIERhdGFCcm93c2UsIE1lZGlhfSBmcm9tIFwiLi4vU2VydmljZXMvQ29tbVNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3JcdFx0OiBcIm0xbS1tZWRpYS1icm93c2VyXCIsXG4gICAgdGVtcGxhdGVVcmxcdFx0OiBcInRzL0NvbXBvbmVudHMvbTFtLW1lZGlhLWJyb3dzZXIuaHRtbFwiLFxuICAgIHN0eWxlVXJscyAgICAgICA6IFsgXCJ0cy9Db21wb25lbnRzL20xbS1tZWRpYS1icm93c2VyLmNzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNMW1NZWRpYUJyb3dzZXIge1xuICAgIEBJbnB1dCgpICBkZXZpY2VzXHQ6IE1lZGlhU2VydmVyW107XG4gICAgQE91dHB1dChcIm9uLW1lZGlhLXNlbGVjdFwiKSBtZWRpYVNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8TWVkaWE+KCk7XG4gICAgcHJpdmF0ZSBicmVhZGNydW1iICA6IERpcmVjdG9yeSAgW10gPSBbXTtcbiAgICBwcml2YXRlIGRhdGEgICAgICAgIDogRGF0YUJyb3dzZTtcbiAgICBwcml2YXRlIG1zICAgICAgICAgIDogTWVkaWFTZXJ2ZXI7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjczogQ29tbVNlcnZpY2UpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coIFwiQ29tbVNlcnZpY2U6XCIsIGNzKTtcbiAgICB9XG4gICAgc2VsZWN0TWVkaWEobWVkaWE6IE1lZGlhKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2VsZWN0TWVkaWFcIiwgbWVkaWEpO1xuICAgICAgICB0aGlzLm1lZGlhU2VsZWN0LmVtaXQobWVkaWEpO1xuICAgIH1cbiAgICBicm93c2VNZWRpYVNlcnZlcihtczogTWVkaWFTZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5icmVhZGNydW1iID0gW107XG4gICAgICAgIHRoaXMubXMgICAgICAgICA9IG1zO1xuICAgICAgICB0aGlzLmRhdGEgICAgICAgPSBudWxsO1xuICAgICAgICBpZihtcykge1xuICAgICAgICAgICAgdGhpcy5icm93c2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBicm93c2UoIGRpcmVjdG9yeT86IERpcmVjdG9yeSApIHtcbiAgICAgICAgbGV0IGRpcmVjdG9yeUlkOiBzdHJpbmc7XG4gICAgICAgIGlmKGRpcmVjdG9yeSkge1xuICAgICAgICAgICAgZGlyZWN0b3J5SWQgPSBkaXJlY3RvcnkuZGlyZWN0b3J5SWQ7XG4gICAgICAgICAgICBsZXQga2VlcCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIgPSB0aGlzLmJyZWFkY3J1bWIuZmlsdGVyKCBEID0+IGtlZXAgJiYgKGtlZXA9RCAhPT0gZGlyZWN0b3J5KSApO1xuICAgICAgICAgICAgdGhpcy5icmVhZGNydW1iLnB1c2goZGlyZWN0b3J5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpcmVjdG9yeUlkID0gXCIwXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3MuYnJvd3NlKCB0aGlzLm1zLmlkLCBkaXJlY3RvcnlJZCApLnRoZW4oIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyggXCJCcm93c2VcIiwgdGhpcy5tcy5pZCwgZGlyZWN0b3J5SWQsIFwiPT5cIiwgZGF0YSApO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
