System.register(['angular2/core', './column', '../card/card.component', './column.service', '../ws.service', '../card/card.service', '../pipes/orderby.pipe', '../pipes/where.pipe'], function(exports_1, context_1) {
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
    var core_1, column_1, card_component_1, column_service_1, ws_service_1, card_service_1, orderby_pipe_1, where_pipe_1;
    var ColumnComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (column_1_1) {
                column_1 = column_1_1;
            },
            function (card_component_1_1) {
                card_component_1 = card_component_1_1;
            },
            function (column_service_1_1) {
                column_service_1 = column_service_1_1;
            },
            function (ws_service_1_1) {
                ws_service_1 = ws_service_1_1;
            },
            function (card_service_1_1) {
                card_service_1 = card_service_1_1;
            },
            function (orderby_pipe_1_1) {
                orderby_pipe_1 = orderby_pipe_1_1;
            },
            function (where_pipe_1_1) {
                where_pipe_1 = where_pipe_1_1;
            }],
        execute: function() {
            ColumnComponent = (function () {
                function ColumnComponent(el, _ws, _columnService, _cardService) {
                    this.el = el;
                    this._ws = _ws;
                    this._columnService = _columnService;
                    this._cardService = _cardService;
                    this.editingColumn = false;
                    this.addingCard = false;
                    this.onAddCard = new core_1.EventEmitter();
                    this.cardUpdate = new core_1.EventEmitter();
                }
                ColumnComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.setupView();
                    this._ws.onColumnUpdate.subscribe(function (column) {
                        if (_this.column._id === column._id) {
                            _this.column = column;
                        }
                    });
                    // this._ws.onCardUpdate.subscribe(card => {
                    //   // console.log('a');
                    //   this.cards.filter(c => c._id === card._id)[0] = card;
                    // });
                };
                ColumnComponent.prototype.setupView = function () {
                    var component = this;
                    var startColumn;
                    jQuery('.card-list').sortable({
                        connectWith: ".card-list",
                        placeholder: "card-placeholder",
                        dropOnEmpty: true,
                        tolerance: 'pointer',
                        start: function (event, ui) {
                            ui.placeholder.height(ui.item.outerHeight());
                            startColumn = ui.item.parent();
                        },
                        stop: function (event, ui) {
                            var senderColumnId = startColumn.attr('column-id');
                            var targetColumnId = ui.item.closest('.card-list').attr('column-id');
                            var cardId = ui.item.find('.card').attr('card-id');
                            component.updateCardsOrder({
                                columnId: targetColumnId || senderColumnId,
                                cardId: cardId
                            });
                        }
                    });
                    jQuery('.card-list').disableSelection();
                };
                ColumnComponent.prototype.updateCardsOrder = function (event) {
                    var _this = this;
                    var cardArr = jQuery('[column-id=' + event.columnId + '] .card'), i = 0, elBefore = -1, elAfter = -1, newOrder = 0;
                    for (i = 0; i < cardArr.length - 1; i++) {
                        if (cardArr[i].getAttribute('card-id') == event.cardId) {
                            break;
                        }
                    }
                    if (cardArr.length > 1) {
                        if (i > 0 && i < cardArr.length - 1) {
                            elBefore = +cardArr[i - 1].getAttribute('card-order');
                            elAfter = +cardArr[i + 1].getAttribute('card-order');
                            newOrder = elBefore + ((elAfter - elBefore) / 2);
                        }
                        else if (i == cardArr.length - 1) {
                            elBefore = +cardArr[i - 1].getAttribute('card-order');
                            newOrder = elBefore + 1000;
                        }
                        else if (i == 0) {
                            elAfter = +cardArr[i + 1].getAttribute('card-order');
                            newOrder = elAfter / 2;
                        }
                    }
                    else {
                        newOrder = 1000;
                    }
                    var card = this.cards.filter(function (x) { return x._id === event.cardId; })[0];
                    var oldColumnId = card.columnId;
                    card.order = newOrder;
                    card.columnId = event.columnId;
                    this._cardService.put(card).then(function (res) {
                        _this._ws.updateCard(_this.column.boardId, card);
                    });
                };
                ColumnComponent.prototype.blurOnEnter = function (event) {
                    if (event.keyCode === 13) {
                        event.target.blur();
                    }
                };
                ColumnComponent.prototype.addColumnOnEnter = function (event) {
                    if (event.keyCode === 13) {
                        this.updateColumn();
                    }
                    else if (event.keyCode === 27) {
                        this.cleadAddColumn();
                    }
                };
                ColumnComponent.prototype.addCard = function () {
                    var _this = this;
                    this.cards = this.cards || [];
                    var newCard = {
                        title: this.addCardText,
                        order: (this.cards.length + 1) * 1000,
                        columnId: this.column._id,
                        boardId: this.column.boardId
                    };
                    this._cardService.post(newCard)
                        .subscribe(function (card) {
                        //this.cards.push(card);
                        _this.onAddCard.emit(card);
                        _this._ws.addCard(card.boardId, card);
                    });
                };
                ColumnComponent.prototype.addCardOnEnter = function (event) {
                    if (event.keyCode === 13) {
                        if (this.addCardText && this.addCardText.trim() !== '') {
                            this.addCard();
                            this.addCardText = '';
                        }
                        else {
                            this.clearAddCard();
                        }
                    }
                    else if (event.keyCode === 27) {
                        this.clearAddCard();
                    }
                };
                ColumnComponent.prototype.updateColumn = function () {
                    var _this = this;
                    if (this.column.title && this.column.title.trim() !== '') {
                        this._columnService.put(this.column).then(function (res) {
                            _this._ws.updateColumn(_this.column.boardId, _this.column);
                        });
                        this.editingColumn = false;
                    }
                    else {
                        this.cleadAddColumn();
                    }
                };
                ColumnComponent.prototype.cleadAddColumn = function () {
                    this.column.title = this.currentTitle;
                    this.editingColumn = false;
                };
                ColumnComponent.prototype.editColumn = function () {
                    this.currentTitle = this.column.title;
                    this.editingColumn = true;
                    var input = this.el.nativeElement
                        .getElementsByClassName('column-header')[0]
                        .getElementsByTagName('input')[0];
                    setTimeout(function () { input.focus(); }, 0);
                };
                ColumnComponent.prototype.enableAddCard = function () {
                    this.addingCard = true;
                    var input = this.el.nativeElement
                        .getElementsByClassName('add-card')[0]
                        .getElementsByTagName('input')[0];
                    setTimeout(function () { input.focus(); }, 0);
                };
                ColumnComponent.prototype.updateColumnOnBlur = function () {
                    if (this.editingColumn) {
                        this.updateColumn();
                        this.clearAddCard();
                    }
                };
                ColumnComponent.prototype.addCardOnBlur = function () {
                    if (this.addingCard) {
                        if (this.addCardText && this.addCardText.trim() !== '') {
                            this.addCard();
                        }
                    }
                    this.clearAddCard();
                };
                ColumnComponent.prototype.clearAddCard = function () {
                    this.addingCard = false;
                    this.addCardText = '';
                };
                ColumnComponent.prototype.onCardUpdate = function (card) {
                    this.cardUpdate.emit(card);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', column_1.Column)
                ], ColumnComponent.prototype, "column", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ColumnComponent.prototype, "cards", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ColumnComponent.prototype, "onAddCard", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ColumnComponent.prototype, "cardUpdate", void 0);
                ColumnComponent = __decorate([
                    core_1.Component({
                        selector: 'gtm-column',
                        templateUrl: 'app/column/column.component.html',
                        styleUrls: ['app/column/column.component.css'],
                        directives: [card_component_1.CardComponent],
                        pipes: [orderby_pipe_1.OrderBy, where_pipe_1.Where]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, ws_service_1.WebSocketService, column_service_1.ColumnService, card_service_1.CardService])
                ], ColumnComponent);
                return ColumnComponent;
            }());
            exports_1("ColumnComponent", ColumnComponent);
        }
    }
});
//# sourceMappingURL=column.component.js.map