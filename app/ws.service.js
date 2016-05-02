System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var WebSocketService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            WebSocketService = (function () {
                function WebSocketService() {
                    this.onColumnAdd = new core_1.EventEmitter();
                    this.onCardAdd = new core_1.EventEmitter();
                    this.onColumnUpdate = new core_1.EventEmitter();
                    this.onCardUpdate = new core_1.EventEmitter();
                }
                WebSocketService.prototype.connect = function () {
                    var _this = this;
                    this.socket = io.connect('http://localhost:4000');
                    this.socket.on('addColumn', function (data) {
                        _this.onColumnAdd.emit(data.column);
                    });
                    this.socket.on('addCard', function (data) {
                        _this.onCardAdd.emit(data.card);
                    });
                    this.socket.on('updateColumn', function (data) {
                        _this.onColumnUpdate.emit(data.column);
                    });
                    this.socket.on('updateCard', function (data) {
                        _this.onCardUpdate.emit(data.card);
                    });
                };
                WebSocketService.prototype.join = function (boardId) {
                    this.socket.emit('joinBoard', boardId);
                };
                WebSocketService.prototype.addColumn = function (boardId, column) {
                    this.socket.emit('addColumn', { boardId: boardId, column: column });
                };
                WebSocketService.prototype.addCard = function (boardId, card) {
                    this.socket.emit('addCard', { boardId: boardId, card: card });
                };
                WebSocketService.prototype.updateColumn = function (boardId, column) {
                    this.socket.emit('updateColumn', { boardId: boardId, column: column });
                };
                WebSocketService.prototype.updateCard = function (boardId, card) {
                    this.socket.emit('updateCard', { boardId: boardId, card: card });
                };
                WebSocketService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], WebSocketService);
                return WebSocketService;
            }());
            exports_1("WebSocketService", WebSocketService);
        }
    }
});
//# sourceMappingURL=ws.service.js.map