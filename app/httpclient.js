System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var HttpClient;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            HttpClient = (function () {
                function HttpClient(_http) {
                    this._http = _http;
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                    this.headers.append('Accept', 'application/json');
                    this.options = { headers: this.headers };
                }
                HttpClient.prototype.get = function (url, options) {
                    return this._http.get(url, options || this.options);
                };
                HttpClient.prototype.post = function (url, body, options) {
                    return this._http.post(url, body, options || this.options);
                };
                HttpClient.prototype.put = function (url, body, options) {
                    console.log(options || this.options);
                    return this._http.put(url, body, options || this.options);
                };
                HttpClient.prototype.delete = function (url, options) {
                    return this._http.delete(url, options || this.options);
                };
                HttpClient = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HttpClient);
                return HttpClient;
            }());
            exports_1("HttpClient", HttpClient);
        }
    }
});
//# sourceMappingURL=httpclient.js.map