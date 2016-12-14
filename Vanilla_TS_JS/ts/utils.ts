/// <reference path="../typings/index.d.ts" />

let utils = {
    io                 : null,
    initIO             : (url: string) => {
        console.log( "initIO:", url, io );
        utils.io = utils.io || io.connect(url);
    },
    subscribeBrick      : (brickId, eventName, cb) => {
        let cbEventName = brickId + "::" + eventName;
        utils.io.emit	( "subscribeBrick"
            , { brickId		: brickId
                , eventName	: eventName
                , cbEventName	: cbEventName
            }
        );
        utils.io.on	( cbEventName, cb);
    },
    call: (objectId: string, method: string, params: any[], cb?:(data: any)=>void) => {
        let call =	{ objectId	: objectId
            , method	: method
            , params	: JSON.stringify( params )
        };
        // console.log( "Calling", call);
        return new Promise<any>	( (resolve) => {
            utils.io.emit	( "call", call
                , (data) => {
                    // console.log("Call", call.callId, " returns", data);
                    if(cb) {cb(data);}
                    resolve(data);
                }
            );
        });
    },
    XHR : (method: string, ad: string, params?: {form?: HTMLFormElement, variables?: Object}) : Promise<XMLHttpRequest> => {
        // method    : GET or POST
        // ad        : adress of the ressource to be loaded
        // params : An object containing two possible parameters.
        //        - onload    : a function taking no argument, response will be contains in object utils.
        //        - variables : an object containing a set of attribute<->value
        //        - form         : a reference to a HTML form node
        return new Promise( function(resolve, reject) {
             let xhr = new XMLHttpRequest();
             params = params || {};
             xhr.onload = function() {if(this.status >= 400) {reject(this);} else {resolve(this);}};
             xhr.open(method, ad, true);
             if(params.form || params.variables) {
                 let F: FormData;
                 if(params.form) F = new FormData( params.form );
                    else F = new FormData();
                 for(let i in params.variables) {
                     F.append(i, params.variables[i]);
                    }
                 xhr.send( F );
                } else {xhr.send();}
            } );
    }
}
