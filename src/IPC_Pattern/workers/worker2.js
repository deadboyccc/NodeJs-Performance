"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fib_1 = require("../mathLogic/fib");
process.on("message", function (n) {
    var _a;
    var result = (0, fib_1.fibonacciSeriesOptimized)(n);
    console.log("[Worker 2][".concat(process.pid, "] calling fib(").concat(n, ")"));
    (_a = process.send) === null || _a === void 0 ? void 0 : _a.call(process, result);
});
