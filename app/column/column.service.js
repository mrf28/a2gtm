System.register(['angular2/core', '../httpclient'], function(exports_1, context_1) {
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
    var core_1, httpclient_1;
    var baseUrl, apiUrl, ColumnService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (httpclient_1_1) {
                httpclient_1 = httpclient_1_1;
            }],
        execute: function() {
            baseUrl = 'http://localhost:3001';
            apiUrl = baseUrl + '/column';
            ColumnService = (function () {
                function ColumnService(_http) {
                    this._http = _http;
                }
                ColumnService.prototype.getAll = function () {
                    return this._http.get(apiUrl)
                        .map(function (res) { return res.json().data; });
                };
                ColumnService.prototype.get = function (id) {
                    return this._http.get(apiUrl + '/' + id)
                        .map(function (res) { return res.json().data; });
                };
                ColumnService.prototype.getCards = function (id) {
                    return this._http.get(apiUrl + '/' + id + '/cards')
                        .map(function (res) { return res.json().data; });
                };
                ColumnService.prototype.put = function (column) {
                    return this._http
                        .put(apiUrl + '/' + column._id, JSON.stringify(column))
                        .toPromise();
                };
                ColumnService.prototype.post = function (column) {
                    ;
                    return this._http.post(apiUrl, JSON.stringify(column))
                        .map(function (res) { return res.json().data; });
                };
                ColumnService.prototype.delete = function (column) {
                    return this._http.delete(apiUrl + '/' + column._id)
                        .toPromise();
                };
                ColumnService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [httpclient_1.HttpClient])
                ], ColumnService);
                return ColumnService;
            }());
            exports_1("ColumnService", ColumnService);
        }
    }
});
//# sourceMappingURL=column.service.js.map