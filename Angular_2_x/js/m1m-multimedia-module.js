System.register(["@angular/core", "@angular/common", "@angular/forms", "@angular/http", "alx-dragdrop/DragDropModule", "./Components/m1m-multimedia-manager", "./Components/m1m-media-renderer", "./Components/m1m-media-browser", "./Services/CommService", "@vaadin/angular2-polymer"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, http_1, DragDropModule_1, m1m_multimedia_manager_1, m1m_media_renderer_1, m1m_media_browser_1, CommService_1, angular2_polymer_1;
    var M1mMultimediaModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (DragDropModule_1_1) {
                DragDropModule_1 = DragDropModule_1_1;
            },
            function (m1m_multimedia_manager_1_1) {
                m1m_multimedia_manager_1 = m1m_multimedia_manager_1_1;
            },
            function (m1m_media_renderer_1_1) {
                m1m_media_renderer_1 = m1m_media_renderer_1_1;
            },
            function (m1m_media_browser_1_1) {
                m1m_media_browser_1 = m1m_media_browser_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            },
            function (angular2_polymer_1_1) {
                angular2_polymer_1 = angular2_polymer_1_1;
            }],
        execute: function() {
            //import "@polymer/paper-slider";
            M1mMultimediaModule = class M1mMultimediaModule {
            };
            M1mMultimediaModule = __decorate([
                core_1.NgModule({
                    imports: [common_1.CommonModule, forms_1.FormsModule, http_1.HttpModule, DragDropModule_1.DragDropModule],
                    exports: [m1m_multimedia_manager_1.CompMultimediaManager],
                    declarations: [m1m_multimedia_manager_1.CompMultimediaManager, m1m_media_browser_1.M1mMediaBrowser, m1m_media_renderer_1.M1mMediaRenderer, angular2_polymer_1.PolymerElement("paper-slider")],
                    providers: [CommService_1.CommService],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
                }), 
                __metadata('design:paramtypes', [])
            ], M1mMultimediaModule);
            exports_1("M1mMultimediaModule", M1mMultimediaModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm0xbS1tdWx0aW1lZGlhLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWFBLGlDQUFpQztZQVVqQztZQUFrQyxDQUFDO1lBUG5DO2dCQUFDLGVBQVEsQ0FBQztvQkFDTixPQUFPLEVBQU8sQ0FBRSxxQkFBWSxFQUFFLG1CQUFXLEVBQUUsaUJBQVUsRUFBRSwrQkFBYyxDQUFDO29CQUN0RSxPQUFPLEVBQU8sQ0FBRSw4Q0FBcUIsQ0FBRTtvQkFDdkMsWUFBWSxFQUFFLENBQUUsOENBQXFCLEVBQUUsbUNBQWUsRUFBRSxxQ0FBZ0IsRUFBRSxpQ0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFFO29CQUMxRyxTQUFTLEVBQUssQ0FBRSx5QkFBVyxDQUFFO29CQUM3QixPQUFPLEVBQU8sQ0FBRSw2QkFBc0IsQ0FBRztpQkFDNUMsQ0FBQzs7bUNBQUE7WUFDRixxREFBbUMsQ0FBQSIsImZpbGUiOiJtMW0tbXVsdGltZWRpYS1tb2R1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSAgfSBcdFx0XHRcdGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gICAgICAgICAgICAgICBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9ICAgXHRcdFx0ZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gXHRcdFx0XHRmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9ICAgICAgICAgICBmcm9tIFwiYWx4LWRyYWdkcm9wL0RyYWdEcm9wTW9kdWxlXCI7XG5cbmltcG9ydCB7IENvbXBNdWx0aW1lZGlhTWFuYWdlciB9ICAgIGZyb20gXCIuL0NvbXBvbmVudHMvbTFtLW11bHRpbWVkaWEtbWFuYWdlclwiO1xuaW1wb3J0IHsgTTFtTWVkaWFSZW5kZXJlciB9ICAgICAgICAgZnJvbSBcIi4vQ29tcG9uZW50cy9tMW0tbWVkaWEtcmVuZGVyZXJcIjtcbmltcG9ydCB7IE0xbU1lZGlhQnJvd3NlciB9ICAgICAgICAgIGZyb20gXCIuL0NvbXBvbmVudHMvbTFtLW1lZGlhLWJyb3dzZXJcIjtcbmltcG9ydCB7IENvbW1TZXJ2aWNlIH0gICAgICAgICAgICAgIGZyb20gXCIuL1NlcnZpY2VzL0NvbW1TZXJ2aWNlXCI7XG5cbmltcG9ydCB7UG9seW1lckVsZW1lbnR9ICAgICAgICAgICAgIGZyb20gXCJAdmFhZGluL2FuZ3VsYXIyLXBvbHltZXJcIjtcbi8vaW1wb3J0IFwiQHBvbHltZXIvcGFwZXItc2xpZGVyXCI7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzICAgICA6IFsgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgSHR0cE1vZHVsZSwgRHJhZ0Ryb3BNb2R1bGVdLFxuICAgIGV4cG9ydHMgICAgIDogWyBDb21wTXVsdGltZWRpYU1hbmFnZXIgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFsgQ29tcE11bHRpbWVkaWFNYW5hZ2VyLCBNMW1NZWRpYUJyb3dzZXIsIE0xbU1lZGlhUmVuZGVyZXIsIFBvbHltZXJFbGVtZW50KFwicGFwZXItc2xpZGVyXCIpIF0sXG4gICAgcHJvdmlkZXJzICAgOiBbIENvbW1TZXJ2aWNlIF0sXG4gICAgc2NoZW1hcyAgICAgOiBbIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgIF1cbn0pXG5leHBvcnQgY2xhc3MgTTFtTXVsdGltZWRpYU1vZHVsZSB7fVxuXG4iXSwic291cmNlUm9vdCI6IiJ9
