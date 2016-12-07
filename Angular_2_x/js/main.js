System.register(["@angular/platform-browser-dynamic", "@angular/core", "@angular/platform-browser", "./m1m-multimedia-module", "alx-dragdrop/DragDropModule", "node_modules/jquery/dist/jquery.min.js", "node_modules/bootstrap/dist/js/bootstrap.min.js"], function(exports_1, context_1) {
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
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            // import { PolymerElement } from "@vaadin/angular2-polymer";
            // import "@vaadin/angular2-polymer";
            RootManager = class RootManager {
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
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_2.NgModule({
                    imports: [m1m_multimedia_module_1.M1mMultimediaModule, platform_browser_1.BrowserModule, DragDropModule_1.DragDropModule],
                    declarations: [RootManager,],
                    bootstrap: [RootManager],
                    schemas: [core_2.CUSTOM_ELEMENTS_SCHEMA]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSw2REFBNkQ7WUFDN0QscUNBQXFDO1lBUXJDO1lBQW1CLENBQUM7WUFOcEI7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDVixRQUFRLEVBQUcsY0FBYztvQkFDekIsUUFBUSxFQUFHOztPQUVMO2lCQUNOLENBQUM7OzJCQUFBO1lBR0YsbUJBQW1CO1lBT25CO1lBQXdCLENBQUM7WUFOekI7Z0JBQUMsZUFBUSxDQUFDO29CQUNULE9BQU8sRUFBTyxDQUFFLDJDQUFtQixFQUFFLGdDQUFhLEVBQUUsK0JBQWMsQ0FBRTtvQkFDcEUsWUFBWSxFQUFFLENBQUUsV0FBVyxFQUFJO29CQUMvQixTQUFTLEVBQUssQ0FBRSxXQUFXLENBQUU7b0JBQzFCLE9BQU8sRUFBTyxDQUFFLDZCQUFzQixDQUFHO2lCQUM1QyxDQUFDOzt5QkFBQTtZQUNGLGlDQUF5QixDQUFBO1lBRXpCLGlEQUFzQixFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljIH0gICBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljXCI7XG5pbXBvcnQge0NvbXBvbmVudH0gICAgICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9ICAgIFx0XHRmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgIH0gXHRcdFx0XHRmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBNMW1NdWx0aW1lZGlhTW9kdWxlIH0gXHRcdGZyb20gXCIuL20xbS1tdWx0aW1lZGlhLW1vZHVsZVwiO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBcdFx0XHRmcm9tIFwiYWx4LWRyYWdkcm9wL0RyYWdEcm9wTW9kdWxlXCI7XG5cbmltcG9ydCBcIm5vZGVfbW9kdWxlcy9qcXVlcnkvZGlzdC9qcXVlcnkubWluLmpzXCI7XG5pbXBvcnQgXCJub2RlX21vZHVsZXMvYm9vdHN0cmFwL2Rpc3QvanMvYm9vdHN0cmFwLm1pbi5qc1wiO1xuXG4vLyBpbXBvcnQgeyBQb2x5bWVyRWxlbWVudCB9IGZyb20gXCJAdmFhZGluL2FuZ3VsYXIyLXBvbHltZXJcIjtcbi8vIGltcG9ydCBcIkB2YWFkaW4vYW5ndWxhcjItcG9seW1lclwiO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3JcdDogXCJyb290LW1hbmFnZXJcIixcblx0dGVtcGxhdGVcdDogYDxjb21wLW11bHRpbWVkaWEtbWFuYWdlciB0aXRsZT1cIkdlc3Rpb24gZGVzIHNlcnZpY2VzIFVQblAvRExOQVwiIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFseC1kcmFnZHJvcD48L2NvbXAtbXVsdGltZWRpYS1tYW5hZ2VyPlxuXHRcdFx0XHQgIGBcbn0pXG5jbGFzcyBSb290TWFuYWdlciB7fVxuXG4vL2VuYWJsZVByb2RNb2RlKCk7XG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzICAgICA6IFsgTTFtTXVsdGltZWRpYU1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgRHJhZ0Ryb3BNb2R1bGUgXSxcblx0ZGVjbGFyYXRpb25zOiBbIFJvb3RNYW5hZ2VyLCAgXSxcblx0Ym9vdHN0cmFwICAgOiBbIFJvb3RNYW5hZ2VyIF0sXG4gICAgc2NoZW1hcyAgICAgOiBbIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG5cbnBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
