var _ = require('lodash');
var Column = require('../models/column.js');
var Card = require('../models/card.js');
var log = require('../../dev-logger.js');

module.exports = function(app) {
    log('starting column routes');
    /* Create */
    app.post('/column', function (req, res) {
        log('POST /column');
        var newColumn = new Column(req.body);
        newColumn.save(function(err, newColumn) {
            if (err) {
                res.json({info: 'error during column create', error: err});
            };
            res.json({info: 'column created successfully', data: newColumn});
        });
    });

    /* Read */
    app.get('/column', function (req, res) {
        log('GET /column');
        Column.find(function(err, columns) {
            if (err) {
                res.json({info: 'error during find columns', error: err});
            };
            res.json({info: 'columns found successfully', data: columns});
        });
    });

    app.get('/column/:id', function (req, res) {
        log('GET /column/:id');
        Column.findById(req.params.id, function(err, column) {
            if (err) {
                res.json({info: 'error during find column', error: err});
            };
            if (column) {
                res.json({info: 'column found successfully', data: column});
            } else {
                res.json({info: 'column not found'});
            }
        });
    });


    app.get('/column/:id/cards', function (req, res) {
        log('GET /column/:id');
        Column.findById(req.params.id, function(err, column) {
            if (err) {
                res.json({info: 'error during find column', error: err});
            };
            if (column) {
                Card.find({ columnId: req.params.id }).sort({order: 1}).exec(function (err, cards){
                    res.json({info: 'Cards found successfully', data: cards});
                });
            } else {
                res.json({info: 'column not found'});
            }
        });
    });

    /* Update */
    app.put('/column/:id', function (req, res) {
        log('PUT /column/:id');
        Column.findById(req.params.id, function(err, column) {
            if (err) {
                res.json({info: 'error during find column', error: err});
            };
            if (column) {
                _.merge(column, req.body);
                column.save(function(err) {
                    if (err) {
                        res.json({info: 'error during column update', error: err});
                    };
                    res.json({info: 'column updated successfully'});
                });
            } else {
                res.json({info: 'column not found'});
            }

        });
    });

    /* Delete */
    app.delete('/column/:id', function (req, res) {
        log('DELETE /column/:id');
        Column.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove column', error: err});
            };
            res.json({info: 'column removed successfully'});
        });
    });
};
