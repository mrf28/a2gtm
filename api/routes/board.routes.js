var _ = require('lodash');
var Board = require('../models/board.js');
var Card = require('../models/card.js');
var Column = require('../models/column.js');
var log = require('../../dev-logger.js');

module.exports = function(app) {
    log('starting board routes');
    /* Create */
    app.post('/board', function (req, res) {
        log('POST /board', req.body);
        var newBoard = new Board(req.body);
        newBoard.save(function(err, newBoard) {
            if (err) {
                res.json({info: 'error during board create', error: err});
            };
            res.json({info: 'board created successfully', data: newBoard});
        });
    });

    /* Read */
    app.get('/board', function (req, res) {
        log('GET /board');
        Board.find(function(err, boards) {
            if (err) {
                res.json({info: 'error during find boards', error: err});
            };
            res.json({info: 'boards found successfully', data: boards});
        });
    });

    app.get('/board/:id', function (req, res) {
        console.log('GET /board/:id', req.params.id);
        Board.findById(req.params.id, function(err, board) {
            if (err) {
                console.error(err);
                res.json({info: 'error during find board', error: err});
            };
            if (board) {
                res.json({info: 'board found successfully', data: board});    
            } else {
                res.json({info: 'board not found'});
            }
        });
    });

    app.get('/board/:id/columns', function (req, res) {
        log('GET /board/:id');
        Board.findById(req.params.id, function(err, board) {
            if (err) {
                res.json({info: 'error during find board', error: err});
            };
            if (board) {
                Column.find({boardId: req.params.id}).sort({order: 1}).exec({ boardId: req.params.id }, function (err, columns) {
                    res.json({info: 'Columns found successfully', data: columns});    
                })
            } else {
                res.json({info: 'board not found'});
            }
        });
    });

    app.get('/board/:id/cards', function (req, res) {
        log('GET /column/:id');
        Board.findById(req.params.id, function(err, board) {
            if (err) {
                res.json({info: 'error during find board', error: err});
            };
            if (board) {
                Card.find({ boardId: req.params.id }).sort({order: 1}).exec(function (err, cards){
                    res.json({info: 'Cards found successfully', data: cards});
                });
            } else {
                res.json({info: 'board not found'});
            }
        });
    });

    /* Update */
    app.put('/board/:id', function (req, res) {
        log('PUT /board/:id', req.body);
        Board.findById(req.params.id, function(err, board) {
            if (err) {
                res.json({info: 'error during find board', error: err});
            };
            if (board) {
                log('POST /board', board);
                _.merge(board, req.body);
                log('POST /board', board);
                board.save(function(err) {
                    if (err) {
                        res.json({info: 'error during board update', error: err});
                    };
                    res.json({info: 'board updated successfully'});
                });
            } else {
                res.json({info: 'board not found'});
            }

        });
    });

    /* Delete */
    app.delete('/board/:id', function (req, res) {
        log('DELETE /board/:id');
        Board.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove board', error: err});
            };
            res.json({info: 'board removed successfully'});
        });
    });
};
