var _ = require('lodash');
var Label = require('../models/label.js');
var log = require('../../dev-logger.js');

module.exports = function(app) {
    log('starting label routes');
    /* Create */
    app.post('/label', function (req, res) {
        log('POST /label');
        var newLabel = new Label(req.body);
        newLabel.save(function(err, newLabel) {
            if (err) {
                res.json({info: 'error during label create', error: err});
            };
            res.json({info: 'label created successfully', data: newLabel});
        });
    });

    /* Read */
    app.get('/label', function (req, res) {
        log('GET /label');
        Label.find(function(err, labels) {
            if (err) {
                res.json({info: 'error during find labels', error: err});
            };
            res.json({info: 'labels found successfully', data: labels});
        });
    });

    app.get('/label/:id', function (req, res) {
        console.log('GET /label/:id', req.params.id);
        Label.findById(req.params.id, function(err, label) {
            if (err) {
                log(err);
                res.json({info: 'error during find label', error: err});
            };
            if (label) {
                res.json({info: 'label found successfully', data: label});
            } else {
                res.json({info: 'label not found'});
            }
        });
    });

    /* Update */
    app.put('/label/:id', function (req, res) {
        log('PUT /label/:id', req.params.id);
        Label.findById(req.params.id, function(err, label) {
            if (err) {
                log(err);
                res.json({info: 'error during find label', error: err});
            };
            if (label) {
                _.merge(label, req.body);
                label.save(function(err) {
                    if (err) {
                        res.json({info: 'error during label update', error: err});
                    };
                    res.json({info: 'label updated successfully'});
                });
            } else {
                res.json({info: 'label not found'});
            }

        });
    });

    /* Delete */
    app.delete('/label/:id', function (req, res) {
        log('DELETE /label/:id');
        Label.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({info: 'error during remove label', error: err});
            };
            res.json({info: 'label removed successfully'});
        });
    });
};
