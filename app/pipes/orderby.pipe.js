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
    var OrderBy;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            OrderBy = (function () {
                function OrderBy() {
                    this.tmp = [];
                }
                OrderBy._orderByComparator = function (a, b) {
                    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
                        //Isn't a number so lowercase the string to properly compare
                        if (a.toLowerCase() < b.toLowerCase())
                            return -1;
                        if (a.toLowerCase() > b.toLowerCase())
                            return 1;
                    }
                    else {
                        //Parse strings as numbers to compare properly
                        if (parseFloat(a) < parseFloat(b))
                            return -1;
                        if (parseFloat(a) > parseFloat(b))
                            return 1;
                    }
                    return 0; //equal each other
                };
                OrderBy.prototype.transform = function (input, _a) {
                    var _b = _a[0], config = _b === void 0 ? '+' : _b;
                    this.tmp.length = 0;
                    if (!Array.isArray(input))
                        return input;
                    var arr = [];
                    if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
                        var propertyToCheck = !Array.isArray(config) ? config : config[0];
                        var desc = propertyToCheck.substr(0, 1) == '-';
                        //Basic array
                        if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                            arr = !desc ? input.sort() : input.sort().reverse();
                        }
                        else {
                            var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                                ? propertyToCheck.substr(1)
                                : propertyToCheck;
                            arr = input.sort(function (a, b) {
                                return !desc
                                    ? OrderBy._orderByComparator(a[property], b[property])
                                    : -OrderBy._orderByComparator(a[property], b[property]);
                            });
                        }
                    }
                    else {
                        //Loop over property of the array in order and sort
                        arr = input.sort(function (a, b) {
                            for (var i = 0; i < config.length; i++) {
                                var desc = config[i].substr(0, 1) == '-';
                                var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                                    ? config[i].substr(1)
                                    : config[i];
                                var comparison = !desc
                                    ? OrderBy._orderByComparator(a[property], b[property])
                                    : -OrderBy._orderByComparator(a[property], b[property]);
                                //Don't return 0 yet in case of needing to sort by next property
                                if (comparison != 0)
                                    return comparison;
                            }
                            return 0; //equal each other
                        });
                    }
                    (_c = this.tmp).push.apply(_c, arr);
                    return this.tmp;
                    var _c;
                };
                OrderBy = __decorate([
                    core_1.Pipe({ name: 'orderBy', pure: false }), 
                    __metadata('design:paramtypes', [])
                ], OrderBy);
                return OrderBy;
            }());
            exports_1("OrderBy", OrderBy);
        }
    }
});
//# sourceMappingURL=orderby.pipe.js.map