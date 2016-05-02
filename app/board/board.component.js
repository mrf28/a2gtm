System.register(['angular2/core', './board.service', '../column/column.service', '../ws.service', '../column/column.component', '../pipes/orderby.pipe', '../pipes/where.pipe'], function(exports_1, context_1) {
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
    var core_1, board_service_1, column_service_1, ws_service_1, column_component_1, orderby_pipe_1, where_pipe_1;
    var curYPos, curXPos, curDown, BoardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (board_service_1_1) {
                board_service_1 = board_service_1_1;
            },
            function (column_service_1_1) {
                column_service_1 = column_service_1_1;
            },
            function (ws_service_1_1) {
                ws_service_1 = ws_service_1_1;
            },
            function (column_component_1_1) {
                column_component_1 = column_component_1_1;
            },
            function (orderby_pipe_1_1) {
                orderby_pipe_1 = orderby_pipe_1_1;
            },
            function (where_pipe_1_1) {
                where_pipe_1 = where_pipe_1_1;
            }],
        execute: function() {
            curYPos = 0, curXPos = 0, curDown = false;
            BoardComponent = (function () {
                function BoardComponent(el, _ws, _boardService, _columnService) {
                    this.el = el;
                    this._ws = _ws;
                    this._boardService = _boardService;
                    this._columnService = _columnService;
                    this.addingColumn = false;
                    this.editingTilte = false;
                    this.columnsAdded = 0;
                }
                BoardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._ws.connect();
                    this._ws.onColumnAdd.subscribe(function (column) {
                        _this.board.columns.push(column);
                        _this.updateBoardWidth();
                    });
                    // this._ws.onColumnUpdate.subscribe(column => {
                    //   console.log(column, this.board.columns.filter(c => c._id === column._id)[0]);
                    //   this.board.columns.filter(c => c._id === column._id)[0] = column;
                    // });
                    // this._ws.onCardUpdate.subscribe(card => {
                    //   console.log('card update on board component');
                    //   this.board.cards.filter(c => c._id === card._id)[0] = card;
                    //   this.foreceUpdateCards();
                    // });
                    this._ws.onCardAdd.subscribe(function (card) {
                        _this.board.cards.push(card);
                    });
                    // this._boardService.get('5724b493303c3b6c214e7c2b').subscribe(board => {
                    this._boardService.get('5727939ee9c15e980bac3d18').subscribe(function (board) {
                        _this.board = board;
                        document.title = _this.board.title + " | Generic Task Manager";
                        _this._ws.join(_this.board._id);
                        _this.loadColumns();
                    });
                };
                BoardComponent.prototype.loadColumns = function () {
                    var _this = this;
                    this._boardService.getColumns(this.board._id).subscribe(function (cols) {
                        _this.board.columns = cols;
                        _this.loadCards();
                    });
                };
                BoardComponent.prototype.loadCards = function () {
                    var _this = this;
                    this._boardService.getCards(this.board._id).subscribe(function (cards) {
                        _this.board.cards = cards;
                        _this.setupView();
                    });
                };
                BoardComponent.prototype.setupView = function () {
                    var component = this;
                    var startColumn;
                    jQuery('#main').sortable({
                        items: '.sortable-column',
                        handler: '.header',
                        connectWith: "#main",
                        placeholder: "column-placeholder",
                        dropOnEmpty: true,
                        tolerance: 'pointer',
                        start: function (event, ui) {
                            ui.placeholder.height(ui.item.find('.column').outerHeight());
                            startColumn = ui.item.parent();
                        },
                        stop: function (event, ui) {
                            var columnId = ui.item.find('.column').attr('column-id');
                            component.updateColumnOrder({
                                columnId: columnId
                            });
                        }
                    });
                    component.updateBoardWidth();
                    window.addEventListener('resize', function (e) {
                        component.updateBoardWidth();
                    });
                    //component.bindPane();;
                };
                BoardComponent.prototype.bindPane = function () {
                    // let el = document.getElementById('content-wrapper');
                    // el.addEventListener('mousemove', function(e) {
                    //   e.preventDefault();
                    //   if (curDown === true) {
                    //     el.scrollLeft += (curXPos - e.pageX) * .25;// x > 0 ? x : 0;
                    //     el.scrollTop += (curYPos - e.pageY) * .25;// y > 0 ? y : 0;
                    //   }
                    // });
                    // el.addEventListener('mousedown', function(e) { 
                    //   curDown = true; curYPos = e.pageY; curXPos = e.pageX; 
                    // });
                    // el.addEventListener('mouseup', function(e) { 
                    //   curDown = false; 
                    // });
                };
                BoardComponent.prototype.updateBoardWidth = function () {
                    // this.boardWidth = ((this.board.columns.length + (this.columnsAdded > 0 ? 1 : 2)) * 280) + 10;
                    this.boardWidth = ((this.board.columns.length + 1) * 280) + 10;
                    if (this.boardWidth > document.body.scrollWidth) {
                        document.getElementById('main').style.width = this.boardWidth + 'px';
                    }
                    else {
                        document.getElementById('main').style.width = '100%';
                    }
                    if (this.columnsAdded > 0) {
                        var wrapper = document.getElementById('content-wrapper');
                        wrapper.scrollLeft = wrapper.scrollWidth;
                    }
                    this.columnsAdded++;
                };
                BoardComponent.prototype.updateBoard = function () {
                    if (this.board.title && this.board.title.trim() !== '') {
                        this._boardService.put(this.board);
                    }
                    else {
                        this.board.title = this.currentTitle;
                    }
                    this.editingTilte = false;
                    document.title = this.board.title + " | Generic Task Manager";
                };
                BoardComponent.prototype.editTitle = function () {
                    this.currentTitle = this.board.title;
                    this.editingTilte = true;
                    var input = this.el.nativeElement
                        .getElementsByClassName('board-title')[0]
                        .getElementsByTagName('input')[0];
                    setTimeout(function () { input.focus(); }, 0);
                };
                BoardComponent.prototype.updateColumnElements = function (column) {
                    var columnArr = jQuery('#main .column');
                    var columnEl = jQuery('#main .column[columnid=' + column._id + ']');
                    var i = 0;
                    for (; i < columnArr.length - 1; i++) {
                        column.order < +columnArr[i].getAttibute('column-order');
                        break;
                    }
                    columnEl.remove().insertBefore(columnArr[i]);
                };
                BoardComponent.prototype.updateColumnOrder = function (event) {
                    var _this = this;
                    var i = 0, elBefore = -1, elAfter = -1, newOrder = 0, columnEl = jQuery('#main'), columnArr = columnEl.find('.column');
                    for (i = 0; i < columnArr.length - 1; i++) {
                        if (columnEl.find('.column')[i].getAttribute('column-id') == event.columnId) {
                            break;
                        }
                    }
                    if (i > 0 && i < columnArr.length - 1) {
                        elBefore = +columnArr[i - 1].getAttribute('column-order');
                        elAfter = +columnArr[i + 1].getAttribute('column-order');
                        newOrder = elBefore + ((elAfter - elBefore) / 2);
                    }
                    else if (i == columnArr.length - 1) {
                        elBefore = +columnArr[i - 1].getAttribute('column-order');
                        newOrder = elBefore + 1000;
                    }
                    else if (i == 0) {
                        elAfter = +columnArr[i + 1].getAttribute('column-order');
                        newOrder = elAfter / 2;
                    }
                    var column = this.board.columns.filter(function (x) { return x._id === event.columnId; })[0];
                    column.order = newOrder;
                    this._columnService.put(column).then(function (res) {
                        _this._ws.updateColumn(_this.board._id, column);
                    });
                };
                BoardComponent.prototype.blurOnEnter = function (event) {
                    if (event.keyCode === 13) {
                        event.target.blur();
                    }
                };
                BoardComponent.prototype.enableAddColumn = function () {
                    this.addingColumn = true;
                    var input = jQuery('.add-column')[0]
                        .getElementsByTagName('input')[0];
                    setTimeout(function () { input.focus(); }, 0);
                };
                BoardComponent.prototype.addColumn = function () {
                    var _this = this;
                    var newColumn = {
                        title: this.addColumnText,
                        order: (this.board.columns.length + 1) * 1000,
                        boardId: this.board._id,
                    };
                    this._columnService.post(newColumn)
                        .subscribe(function (column) {
                        _this.board.columns.push(column);
                        console.log('column added');
                        _this.updateBoardWidth();
                        _this.addColumnText = '';
                        _this._ws.addColumn(_this.board._id, column);
                    });
                };
                BoardComponent.prototype.addColumnOnEnter = function (event) {
                    if (event.keyCode === 13) {
                        if (this.addColumnText && this.addColumnText.trim() !== '') {
                            this.addColumn();
                        }
                        else {
                            this.clearAddColumn();
                        }
                    }
                    else if (event.keyCode === 27) {
                        this.clearAddColumn();
                    }
                };
                BoardComponent.prototype.addColumnOnBlur = function () {
                    if (this.addColumnText && this.addColumnText.trim() !== '') {
                        this.addColumn();
                    }
                    this.clearAddColumn();
                };
                BoardComponent.prototype.clearAddColumn = function () {
                    this.addingColumn = false;
                    this.addColumnText = '';
                };
                BoardComponent.prototype.addCard = function (card) {
                    console.log(card);
                    this.board.cards.push(card);
                };
                BoardComponent.prototype.foreceUpdateCards = function () {
                    var cards = JSON.stringify(this.board.cards);
                    this.board.cards = JSON.parse(cards);
                };
                BoardComponent.prototype.onCardUpdate = function (card) {
                    this.foreceUpdateCards();
                };
                BoardComponent = __decorate([
                    core_1.Component({
                        selector: 'gtm-board',
                        templateUrl: 'app/board/board.component.html',
                        styleUrls: ['app/board/board.component.css'],
                        directives: [column_component_1.ColumnComponent],
                        pipes: [orderby_pipe_1.OrderBy, where_pipe_1.Where]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, ws_service_1.WebSocketService, board_service_1.BoardService, column_service_1.ColumnService])
                ], BoardComponent);
                return BoardComponent;
            }());
            exports_1("BoardComponent", BoardComponent);
        }
    }
});
//# sourceMappingURL=board.component.js.map