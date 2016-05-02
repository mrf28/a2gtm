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
    var baseUrl, apiUrl, CardService;
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
            apiUrl = baseUrl + '/card';
            CardService = (function () {
                function CardService(_http) {
                    this._http = _http;
                }
                CardService.prototype.getAll = function () {
                    return this._http.get(apiUrl)
                        .map(function (res) { return res.json(); });
                };
                CardService.prototype.get = function (id) {
                    return this._http.get(apiUrl + '/' + id)
                        .map(function (res) { return res.json(); });
                };
                CardService.prototype.put = function (card) {
                    return this._http.put(apiUrl + '/' + card._id, JSON.stringify(card))
                        .toPromise();
                };
                CardService.prototype.post = function (card) {
                    return this._http.post(apiUrl, JSON.stringify(card))
                        .map(function (res) { return res.json().data; });
                };
                CardService.prototype.delete = function (card) {
                    return this._http.delete(apiUrl + '/' + card._id)
                        .toPromise();
                };
                CardService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [httpclient_1.HttpClient])
                ], CardService);
                return CardService;
            }());
            exports_1("CardService", CardService);
        }
    }
});
//# sourceMappingURL=card.service.js.map