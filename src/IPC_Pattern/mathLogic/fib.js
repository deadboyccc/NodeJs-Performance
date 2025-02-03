"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fibonacciSeriesOptimized = fibonacciSeriesOptimized;
function fibonacciSeriesOptimized(n) {
    var _a;
    if (n <= 0) {
        throw new Error("enter positive nums");
    }
    var a = 0, b = 1, sum = 0;
    for (var i = 0; i < n; i++) {
        sum += a;
        _a = [b, a + b], a = _a[0], b = _a[1];
    }
    return sum;
}
