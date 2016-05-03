System.register(['angular2/core', './card', './card.service', '../ws.service'], function(exports_1, context_1) {
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
    var core_1, card_1, card_service_1, ws_service_1;
    var CardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (card_service_1_1) {
                card_service_1 = card_service_1_1;
            },
            function (ws_service_1_1) {
                ws_service_1 = ws_service_1_1;
            }],
        execute: function() {
            CardComponent = (function () {
                function CardComponent(el, _ref, _ws, _cardService) {
                    this.el = el;
                    this._ref = _ref;
                    this._ws = _ws;
                    this._cardService = _cardService;
                    this.editingCard = false;
                    this.zone = new core_1.NgZone({ enableLongStackTrace: false });
                    this.cardUpdate = new core_1.EventEmitter();
                }
                CardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._ws.onCardUpdate.subscribe(function (card) {
                        if (_this.card._id === card._id) {
                            _this.card.title = card.title;
                            _this.card.order = card.order;
                            _this.card.columnId = card.columnId;
                        }
                    });
                };
                CardComponent.prototype.blurOnEnter = function (event) {
                    if (event.keyCode === 13) {
                        event.target.blur();
                    }
                    else if (event.keyCode === 27) {
                        this.card.title = this.currentTitle;
                        this.editingCard = false;
                    }
                };
                CardComponent.prototype.editCard = function () {
                    this.editingCard = true;
                    this.currentTitle = this.card.title;
                    var textArea = this.el.nativeElement.getElementsByTagName('textarea')[0];
                    setTimeout(function () {
                        textArea.focus();
                    }, 0);
                };
                CardComponent.prototype.updateCard = function () {
                    var _this = this;
                    if (!this.card.title || this.card.title.trim() === '') {
                        this.card.title = this.currentTitle;
                    }
                    this._cardService.put(this.card).then(function (res) {
                        _this._ws.updateCard(_this.card.boardId, _this.card);
                    });
                    this.editingCard = false;
                };
                //TODO: check lifecycle
                CardComponent.prototype.ngOnDestroy = function () {
                    //this._ws.onCardUpdate.unsubscribe();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', card_1.Card)
                ], CardComponent.prototype, "card", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CardComponent.prototype, "cardUpdate", void 0);
                CardComponent = __decorate([
                    core_1.Component({
                        selector: 'gtm-card',
                        templateUrl: 'app/card/card.component.html',
                        styleUrls: ['app/card/card.component.css'],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef, ws_service_1.WebSocketService, card_service_1.CardService])
                ], CardComponent);
                return CardComponent;
            }());
            exports_1("CardComponent", CardComponent);
        }
    }
});
//# sourceMappingURL=card.component.js.map