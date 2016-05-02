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
    var Where;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Where = (function () {
                function Where() {
                    this.tmp = [];
                }
                Where._whereComparer = function (a, b) {
                    if (a && b) {
                        for (var p in b) {
                            if (a[p] != b[p])
                                return false;
                        }
                        return true;
                    }
                    return false;
                };
                Where.prototype.transform = function (input, args) {
                    this.tmp.length = 0;
                    var clauses = args[0];
                    if (input) {
                        (_a = this.tmp).push.apply(_a, input.filter(function (item) { return Where._whereComparer(item, clauses); }));
                    }
                    return this.tmp;
                    var _a;
                };
                Where = __decorate([
                    core_1.Pipe({ name: 'where', pure: false }), 
                    __metadata('design:paramtypes', [])
                ], Where);
                return Where;
            }());
            exports_1("Where", Where);
        }
    }
});
//# sourceMappingURL=where.pipe.js.map