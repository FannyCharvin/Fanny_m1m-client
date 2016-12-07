/// <reference path="../typings/index.d.ts" />
System.register(["@angular/platform-browser-dynamic", "@angular/core", "@angular/platform-browser", "./m1m-multimedia-module", "./DragDrop/DragDropModule"], function(exports_1, context_1) {
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
    var platform_browser_dynamic_1, core_1, platform_browser_1, core_2, m1m_multimedia_module_1, DragDropModule_1;
    var RootManager, AppModule;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (m1m_multimedia_module_1_1) {
                m1m_multimedia_module_1 = m1m_multimedia_module_1_1;
            },
            function (DragDropModule_1_1) {
                DragDropModule_1 = DragDropModule_1_1;
            }],
        execute: function() {
            let RootManager = class RootManager {
            };
            RootManager = __decorate([
                core_1.Component({
                    selector: "root-manager",
                    template: `<comp-multimedia-manager title="Gestion des services UPnP/DLNA" 
											alx-dragdrop></comp-multimedia-manager>
				  `
                }), 
                __metadata('design:paramtypes', [])
            ], RootManager);
            //enableProdMode();
            let AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_2.NgModule({
                    imports: [m1m_multimedia_module_1.M1mMultimediaModule, platform_browser_1.BrowserModule, DragDropModule_1.DragDropModule],
                    declarations: [RootManager],
                    bootstrap: [RootManager]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
        }
    }
});
//# sourceMappingURL=main.js.map