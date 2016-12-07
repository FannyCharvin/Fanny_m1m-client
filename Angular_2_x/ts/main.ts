import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic";
import {Component}                  from "@angular/core";
import { BrowserModule }    		from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } 				from "@angular/core";

import { M1mMultimediaModule } 		from "./m1m-multimedia-module";
import { DragDropModule } 			from "alx-dragdrop/DragDropModule";

import "node_modules/jquery/dist/jquery.min.js";
import "node_modules/bootstrap/dist/js/bootstrap.min.js";

// import { PolymerElement } from "@vaadin/angular2-polymer";
// import "@vaadin/angular2-polymer";

@Component({
	selector	: "root-manager",
	template	: `<comp-multimedia-manager title="Gestion des services UPnP/DLNA" 
											alx-dragdrop></comp-multimedia-manager>
				  `
})
class RootManager {}

//enableProdMode();
@NgModule({
	imports     : [ M1mMultimediaModule, BrowserModule, DragDropModule ],
	declarations: [ RootManager,  ],
	bootstrap   : [ RootManager ],
    schemas     : [ CUSTOM_ELEMENTS_SCHEMA  ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
