import * as SIO from "socket.io-client";

//sconsole.log( "SIO", SIO );

class Utils {
    io : SocketIOClient.Socket;
    initIO(url: string) {
        //console.log( "SIO:", url, SIO );
        this.io = this.io || SIO.connect(url);
        return this;
    }
    subscribeBrick(brickId, eventName, cb) {
        let cbEventName = brickId + "::" + eventName;
        this.io.emit	( "subscribeBrick"
            , { brickId		: brickId
                , eventName	: eventName
                , cbEventName	: cbEventName
            }
        );
        this.io.on	( cbEventName, cb);
        return this;
    }
    call(objectId: string, method: string, params: any[], cb?:(data: any)=>void) : Promise<any> {
        let call =	{ objectId	: objectId
            , method	: method
            , params	: JSON.stringify( params )
        };
        // console.log( "Calling", call);
        return new Promise<any>	( (resolve) => {
            this.io.emit	( "call", call
                , (data) => {
                    // console.log("Call", call.callId, " returns", data);
                    if(cb) {cb(data);}
                    resolve(data);
                }
            );
        });
    }
}

export let utils : Utils = new Utils();


