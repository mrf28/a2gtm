System.register(['angular2/core', 'angular2/http', './board/board.service', './card/card.service', './column/column.service', './board/board.component', './httpclient', './ws.service'], function(exports_1, context_1) {
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
    var core_1, http_1, board_service_1, card_service_1, column_service_1, board_component_1, httpclient_1, ws_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (board_service_1_1) {
                board_service_1 = board_service_1_1;
            },
            function (card_service_1_1) {
                card_service_1 = card_service_1_1;
            },
            function (column_service_1_1) {
                column_service_1 = column_service_1_1;
            },
            function (board_component_1_1) {
                board_component_1 = board_component_1_1;
            },
            function (httpclient_1_1) {
                httpclient_1 = httpclient_1_1;
            },
            function (ws_service_1_1) {
                ws_service_1 = ws_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'gtm-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        directives: [board_component_1.BoardComponent],
                        providers: [http_1.HTTP_PROVIDERS, httpclient_1.HttpClient, ws_service_1.WebSocketService, board_service_1.BoardService, column_service_1.ColumnService, card_service_1.CardService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map