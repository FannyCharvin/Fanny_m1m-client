System.register(["socket.io-client"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SIO;
    var Utils, utils;
    return {
        setters:[
            function (SIO_1) {
                SIO = SIO_1;
            }],
        execute: function() {
            //sconsole.log( "SIO", SIO );
            Utils = class Utils {
                initIO(url) {
                    //console.log( "SIO:", url, SIO );
                    this.io = this.io || SIO.connect(url);
                    return this;
                }
                subscribeBrick(brickId, eventName, cb) {
                    let cbEventName = brickId + "::" + eventName;
                    this.io.emit("subscribeBrick", { brickId: brickId,
                        eventName: eventName,
                        cbEventName: cbEventName
                    });
                    this.io.on(cbEventName, cb);
                    return this;
                }
                call(objectId, method, params, cb) {
                    let call = { objectId: objectId,
                        method: method,
                        params: JSON.stringify(params)
                    };
                    // console.log( "Calling", call);
                    return new Promise((resolve) => {
                        this.io.emit("call", call, (data) => {
                            // console.log("Call", call.callId, " returns", data);
                            if (cb) {
                                cb(data);
                            }
                            resolve(data);
                        });
                    });
                }
            };
            exports_1("utils", utils = new Utils());
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7ZUF3Q1csS0FBSzs7Ozs7OztZQXRDaEIsNkJBQTZCO1lBRTdCO2dCQUVJLE1BQU0sQ0FBQyxHQUFXO29CQUNkLGtDQUFrQztvQkFDbEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsY0FBYyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRTtvQkFDakMsSUFBSSxXQUFXLEdBQUcsT0FBTyxHQUFHLElBQUksR0FBRyxTQUFTLENBQUM7b0JBQzdDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFHLGdCQUFnQixFQUN6QixFQUFFLE9BQU8sRUFBSSxPQUFPO3dCQUNoQixTQUFTLEVBQUcsU0FBUzt3QkFDckIsV0FBVyxFQUFHLFdBQVc7cUJBQzlCLENBQ0osQ0FBQztvQkFDRixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBRyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLE1BQWEsRUFBRSxFQUFxQjtvQkFDdkUsSUFBSSxJQUFJLEdBQUcsRUFBRSxRQUFRLEVBQUcsUUFBUTt3QkFDMUIsTUFBTSxFQUFHLE1BQU07d0JBQ2YsTUFBTSxFQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsTUFBTSxDQUFFO3FCQUN0QyxDQUFDO29CQUNGLGlDQUFpQztvQkFDakMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFRLENBQUMsT0FBTzt3QkFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUcsTUFBTSxFQUFFLElBQUksRUFDckIsQ0FBQyxJQUFJOzRCQUNILHNEQUFzRDs0QkFDdEQsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQUEsQ0FBQzs0QkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixDQUFDLENBQ0osQ0FBQztvQkFDTixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQztZQUVVLG1CQUFBLEtBQUssR0FBVyxJQUFJLEtBQUssRUFBRSxDQUFBLENBQUMiLCJmaWxlIjoiU2VydmljZXMvdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTSU8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuLy9zY29uc29sZS5sb2coIFwiU0lPXCIsIFNJTyApO1xuXG5jbGFzcyBVdGlscyB7XG4gICAgaW8gOiBTb2NrZXRJT0NsaWVudC5Tb2NrZXQ7XG4gICAgaW5pdElPKHVybDogc3RyaW5nKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coIFwiU0lPOlwiLCB1cmwsIFNJTyApO1xuICAgICAgICB0aGlzLmlvID0gdGhpcy5pbyB8fCBTSU8uY29ubmVjdCh1cmwpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc3Vic2NyaWJlQnJpY2soYnJpY2tJZCwgZXZlbnROYW1lLCBjYikge1xuICAgICAgICBsZXQgY2JFdmVudE5hbWUgPSBicmlja0lkICsgXCI6OlwiICsgZXZlbnROYW1lO1xuICAgICAgICB0aGlzLmlvLmVtaXRcdCggXCJzdWJzY3JpYmVCcmlja1wiXG4gICAgICAgICAgICAsIHsgYnJpY2tJZFx0XHQ6IGJyaWNrSWRcbiAgICAgICAgICAgICAgICAsIGV2ZW50TmFtZVx0OiBldmVudE5hbWVcbiAgICAgICAgICAgICAgICAsIGNiRXZlbnROYW1lXHQ6IGNiRXZlbnROYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW8ub25cdCggY2JFdmVudE5hbWUsIGNiKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhbGwob2JqZWN0SWQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55W10sIGNiPzooZGF0YTogYW55KT0+dm9pZCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgY2FsbCA9XHR7IG9iamVjdElkXHQ6IG9iamVjdElkXG4gICAgICAgICAgICAsIG1ldGhvZFx0OiBtZXRob2RcbiAgICAgICAgICAgICwgcGFyYW1zXHQ6IEpTT04uc3RyaW5naWZ5KCBwYXJhbXMgKVxuICAgICAgICB9O1xuICAgICAgICAvLyBjb25zb2xlLmxvZyggXCJDYWxsaW5nXCIsIGNhbGwpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Plx0KCAocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pby5lbWl0XHQoIFwiY2FsbFwiLCBjYWxsXG4gICAgICAgICAgICAgICAgLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNhbGxcIiwgY2FsbC5jYWxsSWQsIFwiIHJldHVybnNcIiwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNiKSB7Y2IoZGF0YSk7fVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGxldCB1dGlscyA6IFV0aWxzID0gbmV3IFV0aWxzKCk7XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==
